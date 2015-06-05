#!/usr/bin/env python2
# -*- coding: utf-8 -*- #
#
# Builds the Ardublockly application for the Windows operating system.
#
# Copyright (c) 2015 carlosperate https://github.com/carlosperate/
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
# IMPORTANT: This script is designed to be located one directory level under the
#            project root folder.
#
import os
import sys
import shutil
import fnmatch
from distutils.core import setup
from glob import glob
try:
    from cefpython3 import cefpython
    import py2exe
except ImportError:
    raise SystemExit("You need to have cefpython3, and py2exe installed!")

exec_folder_name = "arduexec"
script_tag = "[Ardublockly build] "
script_tab = "                    "

# set up directories
project_root_dir = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
executable_dir = os.path.join(project_root_dir, exec_folder_name)

# Enable the ArdublocklyServer package access the sys path for py2exe to find
sys.path.append(project_root_dir)


def remove_directory(dir_to_remove):
    """ Removes the a given directory. """
    if os.path.exists(dir_to_remove):
        print(script_tab + "Removing directory %s" % dir_to_remove)
        shutil.rmtree(dir_to_remove)
    else:
        print(script_tab + "Directory %s was not found." % dir_to_remove)


def get_data_files():
    """ Collects the required redistributable dlls and CEF files. """
    cef_path = os.path.dirname(cefpython.__file__)
    data_files = [
        ("", [
            # CEF core library
            "%s/libcef.dll" % cef_path,
            "%s/cefpython_py27.pyd" % cef_path,
            "%s/subprocess.exe" % cef_path,
            # ICU data for unicode support
            "%s/icudt.dll" % cef_path,
            # Angle and Direct3D support
            "%s/d3dcompiler_43.dll" % cef_path,  # Win XP
            "%s/d3dcompiler_46.dll" % cef_path,  # Vista and larger
            "%s/libEGL.dll" % cef_path,
            "%s/libGLESv2.dll" % cef_path,
            # FFmpeg audio and video support for HTML5 audio and video
            "%s/ffmpegsumo.dll" % cef_path,
            # WebKit image and inspector resources
            "%s/devtools_resources.pak" % cef_path,
            "%s/cef.pak" % cef_path]),
        # Localized resources
        ("locales", glob(r"%s/locales/*.*" % cef_path)),
        # Microsoft compiler redistributable dlls
        ("Microsoft.VC90.CRT", glob(r"msvcm90\*.*"))]
    return data_files


def get_options():
    """ Prepares and returns the py2exe options dictionary. """
    # We don't really need a few of the pywin32 includes
    excludes = ["pywin", "pywin.debugger", "pywin.debugger.dbgcon",
                "pywin.dialogs", "pywin.dialogs.list", "win32com.server"]

    # We don't need this packages either
    excludes.extend(["unittest", "_ssl", "doctest", "pdb", "difflib", "email"])

    # Py2exe options: http://www.py2exe.org/index.cgi/ListOfOptions
    py2exe_options = {
        "py2exe": {"dist_dir": executable_dir,
                   "compressed": False,
                   "bundle_files": 3,
                   "skip_archive": True,
                   "optimize": 0,
                   "packages": ["ArdublocklyServer"],
                   "dll_excludes": ["msvcp90.dll", "msvcm90.dll"],
                   "excludes": excludes}}
    return py2exe_options


def get_py_files():
    """
    Returns the scripts to package, Ardublockly only needs the CEF entry
    point to work, everything else is imported.
    """
    start_file = os.path.join(project_root_dir, "start_cef.py")
    return [start_file]


def build_exe(args):
    """ Sets up the disutils for py2exe and runs it to build project. """
    setup(data_files=get_data_files(),
          #windows=get_py_files(),
          console=get_py_files(),
          options=get_options(),
          script_args=args)


def create_run_batch_file():
    """
    Creates a batch file into the project root to be able to easily launch the
    Ardublockly application.
    """
    batch_text = "@echo off\n" + \
                 "start %s\start_cef.exe \"%%cd%%\"" % exec_folder_name
    try:
        batch_file = open(("%s/ardublockly_run.bat" % project_root_dir), 'w')
        batch_file.write(batch_text)
        batch_file.close()
        print(script_tab + "Batch file created in %s" % project_root_dir)
    except Exception as e:
        print("%s\n" % e + script_tab +
              "Batch file to run Ardublockly could not be created !")


if __name__ == "__main__":
    print(script_tag + "Building Ardublockly for Windows.")

    print(script_tag + "Removing old build directory.")
    remove_directory(os.path.join(os.getcwd(), "build"))

    print(script_tag + "Removing old executable directory.")
    remove_directory(executable_dir)

    print(script_tag + "Building Ardublockly using py2exe.")
    if len(sys.argv) <= 1:
        build_exe(['py2exe'])
    else:
        build_exe()

    print(script_tag + "Removing recent build directory.")
    remove_directory(os.path.join(os.getcwd(), "build"))

    print(script_tag + "Creating a batch file to launch Ardublockly.")
    create_run_batch_file()
