# -*- coding: utf-8 -*-
#
# SketchCreator class creates an Arduino Sketch source code file.
#
# Copyright (c) 2017 carlosperate https://github.com/carlosperate/
# Licensed under the Apache License, Version 2.0 (the "License"):
#   http://www.apache.org/licenses/LICENSE-2.0
#
from __future__ import unicode_literals, absolute_import, print_function
import codecs
import os

from ardublocklyserver.six import six

# Default blinky sketch
default_sketch_code = """int led = 13;
void setup() {
  pinMode(led, OUTPUT);
}
void loop() {
  digitalWrite(led, HIGH);
  delay(1000);
  digitalWrite(led, LOW);
  delay(1000);
}
"""

# Default sketch name
default_sketch_name = 'ArdublocklySketch'


def create_sketch(sketch_dir, sketch_name=None, sketch_code=None):
    """Create an Arduino Sketch file into the given directory.

    Creates an Arduino sketch with either the default blinky code or the
    code defined in the input parameter.

    :param sketch_dir: Location for the sketch.
    :param sketch_name: Optional name for the sketch.
    :param sketch_code: Optional unicode string with the code for the sketch.
    :return: Unicode string with full path to the sketch file
             Return None indicates an error has occurred.
    """
    # Check the code first, to not create sketch file if invalid
    if sketch_code is None:
        code_to_write = default_sketch_code
    else:
        if isinstance(sketch_code, six.string_types):
            code_to_write = sketch_code
        else:
            print('The sketch code given is not a valid string !!!')
            return None
    # Check validity and create the sketch path
    if sketch_name is None:
        sketch_name = default_sketch_name
    sketch_path = build_sketch_path(sketch_dir, sketch_name)
    try:
        with codecs.open(sketch_path, 'wb+', encoding='utf-8') as sketch_f:
            sketch_f.write(code_to_write)
    except Exception as e:
        print(e)
        print('Arduino sketch could not be created !!!')
        return None

    return sketch_path


def build_sketch_path(sketch_dir, sketch_name):
    """Create the Arduino Sketch folder required for a valid Sketch.

    If a valid directory is provided, it creates the Arduino sketch folder
    (if it does not exists already) and returns a string pointing to the
    sketch file path.
    :return: unicode string with full path to the sketch file.
             Return None indicates an error has occurred.
    """
    sketch_path = None
    if os.path.isdir(sketch_dir):
        sketch_path = os.path.join(sketch_dir, sketch_name)
        if not os.path.exists(sketch_path):
            os.makedirs(sketch_path)
        sketch_path = os.path.join(sketch_path, sketch_name + '.ino')
    else:
        print('The sketch directory "%s" does not exists !!!' % sketch_dir)
    return sketch_path
