/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview General javaScript for Arduino app with material design.
 */
'use strict';

/**
 * Create a namespace for the application.
 */
var ArduinoMaterial = ArduinoMaterial || {};


/**
 * Initialize function for Ardublockly on page load.
 */
window.addEventListener('load', function load(event) {
  window.removeEventListener('load', load, false);
  // Inject Blockly into content_blocks
  ArduinoMaterial.injectBlockly(
    document.getElementById('content_blocks'), 'ardublockly_toolbox.xml');

  ArduinoMaterial.designJsInit();

  ArduinoMaterial.bindDesignEventListeners_();
  ArduinoMaterial.bindActionFunctions_();
  ArduinoMaterial.bindBlocklyEventListeners_();

  // Check if not running locally (including developer's local network IP)
  if (document.location.hostname != 'localhost' &&
      document.location.hostname != '192.168.0.7') {
    ArduinoMaterial.openNotConnectedModal();
  }

  // Check if running on the Desktop app
  if (navigator.userAgent.toLowerCase().indexOf('ardublockly') > -1) {
    // It is, so remove container padding and side menu button
    ArduinoMaterial.containerFullWidth();
    ArduinoMaterial.hideSideMenuButton();
  }
});

/**
 * Binds functions to each of the buttons, nav links, and related.
 * @private
 */
ArduinoMaterial.bindActionFunctions_ = function() {
  // Navigation buttons
  ArduinoMaterial.bindClick_('button_load', ArduinoMaterial.loadUserXmlFile);
  ArduinoMaterial.bindClick_('button_save', ArduinoMaterial.saveXmlFileAs);
  ArduinoMaterial.bindClick_('button_delete', ArduinoMaterial.discard);

  // Side menu buttons, they also close the side menu
  ArduinoMaterial.bindClick_('menu_load', function() {
      ArduinoMaterial.loadUserXmlFile();
      $('.button-collapse').sideNav('hide');
    });
  ArduinoMaterial.bindClick_('menu_save',  function() {
      ArduinoMaterial.saveXmlFileAs();
      $('.button-collapse').sideNav('hide');
    });
  ArduinoMaterial.bindClick_('menu_delete',  function() {
      ArduinoMaterial.discard();
      $('.button-collapse').sideNav('hide');
    });
  ArduinoMaterial.bindClick_('menu_settings', function() {
      ArduinoMaterial.openSettings();
      $('.button-collapse').sideNav('hide');
    });
  ArduinoMaterial.bindClick_('menu_example_1', function() {
      ArduinoMaterial.loadServerXmlFile('examples/blink.xml')});
  ArduinoMaterial.bindClick_('menu_example_2', function() {
      ArduinoMaterial.loadServerXmlFile('examples/serial_print_ascii_.xml')});
  ArduinoMaterial.bindClick_('menu_example_3', function() {
      ArduinoMaterial.loadServerXmlFile('examples/servo_knob.xml')});
  ArduinoMaterial.bindClick_('menu_example_4', function() {
      ArduinoMaterial.loadServerXmlFile('examples/stepper_knob.xml')});

  // Floating buttons
  ArduinoMaterial.bindClick_('button_run',
      ArduinoMaterial.sendCode);
  ArduinoMaterial.bindClick_('button_verify',
      ArduinoMaterial.functionNotImplemented);
  ArduinoMaterial.bindClick_('button_open_ide',
      ArduinoMaterial.functionNotImplemented);
  ArduinoMaterial.bindClick_('button_load_xml',
      ArduinoMaterial.XmlTextareaToBlocks);
  ArduinoMaterial.bindClick_(
      'button_toggle_toolbox', ArduinoMaterial.toogleToolbox);

  // Settings modal input field listeners
  ArduinoMaterial.bindClick_('settings_compiler_location', function() {
    ArduServerCompiler.requestNewCompilerLocation(
        ArduinoMaterial.setCompilerLocationHtml);
  });
  ArduinoMaterial.bindClick_('settings_sketch_location', function() {
    ArduServerCompiler.requestNewSketchLocation(
        ArduinoMaterial.setSketchLocationHtml);
  });
};

/**
 * Binds the event listeners relevant to Blockly.
 * @private
 */
ArduinoMaterial.bindBlocklyEventListeners_ = function() {
  // Renders the code and XML for every Blockly workspace event
  // As the toolbox inject is asynchronous we need to wait
  if (ArduinoMaterial.BLOCKLY_INJECTED == false) {
    setTimeout(ArduinoMaterial.bindBlocklyEventListeners_, 50);
  } else {
    ArduinoMaterial.workspace.addChangeListener(ArduinoMaterial.renderContent);
  }
};

/**
 * Loads an XML file from the server and adds the blocks into the Blockly
 * workspace.
 */
ArduinoMaterial.loadServerXmlFile = function(xmlFile) {
  // The loadXmlBlockFile loads the file asynchronously and needs a callback
  var loadXmlCallback = function(sucess) {
    if (sucess) {
      ArduinoMaterial.renderContent();
    } else {
      ArduinoMaterial.materialAlert(
          'Invalid XML',
          'The XML file was not successfully parsed into blocks.\
          Please review the XML code and try again.',
          false);
    }
  };

  var callbackConnectionError = function() {
    ArduinoMaterial.openNotConnectedModal();
  };

  ArduinoMaterial.loadXmlBlockFile(
      xmlFile, loadXmlCallback, callbackConnectionError);
};

/**
 * Loads an XML file from the users file system and adds the blocks into the
 * Blockly workspace.
 */
ArduinoMaterial.loadUserXmlFile = function() {
  // Create event listener function
  var parseInputXMLfile = function(e) {
    var files = e.target.files;
    var reader = new FileReader();
    reader.onload = function() {
      var success = ArduinoMaterial.replaceBlocksfromXml(reader.result);
      if (success) {
        ArduinoMaterial.renderContent();
      } else {
        ArduinoMaterial.materialAlert(
            'Invalid XML',
            'The XML file was not successfully parsed into blocks.\
            Please review the XML code and try again.',
            false);
      }
    };
    reader.readAsText(files[0]);
  };
  // Create once invisible browse button with event listener, and click it
  var selectFile = document.getElementById('select_file');
  if (selectFile == null) {
    var selectFileDom = document.createElement('INPUT');
    selectFileDom.type = 'file';
    selectFileDom.id = 'select_file';

    var selectFileWrapperDom = document.createElement('DIV');
    selectFileWrapperDom.id = 'select_file_wrapper';
    selectFileWrapperDom.style.display = 'none';
    selectFileWrapperDom.appendChild(selectFileDom);

    document.body.appendChild(selectFileWrapperDom);
    selectFile = document.getElementById('select_file');
    selectFile.addEventListener('change', parseInputXMLfile, false);
  }
  selectFile.click();
};

/**
 * Creates an XML file containing the blocks from the Blockly workspace and
 * prompts the users to save it into their local file system.
 */
ArduinoMaterial.saveXmlFileAs = function() {
  var xmlName = document.getElementById('sketch_name').value;
  var blob = new Blob(
      [ArduinoMaterial.generateXml()],
      {type: 'text/plain;charset=utf-8'});
  saveAs(blob, xmlName + '.xml');
};

/**
 * Creates an Arduino Sketch file containing the Arduino code generated from
 * the Blockly workspace and prompts the users to save it into their local file
 * system.
 */
ArduinoMaterial.saveSketchFileAs = function() {
  var sketchName = document.getElementById('sketch_name').value;
  var blob = new Blob(
      [ArduinoMaterial.generateArduino()],
      {type: 'text/plain;charset=utf-8'});
  saveAs(blob, sketchName + '.ino');
};

/**
 * Opens the modal that displays the "not connected to server" message.
 */
ArduinoMaterial.openNotConnectedModal = function() {
  $('#not_running_dialog').openModal({
    dismissible: true,
    opacity: .5,
    in_duration: 200,
    out_duration: 250
  });
};

/**
 * Prepares and opens the settings modal.
 */
ArduinoMaterial.openSettings = function() {
  ArduinoMaterial.populateSettings();
  $('#settings_dialog').openModal({
    dismissible: true,
    opacity: .5,
    in_duration: 200,
    out_duration: 250
  });
};

/**
 * Retrieves the Settings from ArduServerCompiler and populates the form data
 * for the Settings modal dialog.
 */
ArduinoMaterial.populateSettings = function() {
  ArduServerCompiler.requestCompilerLocation(
      ArduinoMaterial.setCompilerLocationHtml);
  ArduServerCompiler.requestSketchLocation(
      ArduinoMaterial.setSketchLocationHtml);
  ArduServerCompiler.requestArduinoBoards(
      ArduinoMaterial.setArduinoBoardsHtml);
  ArduServerCompiler.requestSerialPorts(ArduinoMaterial.setSerialPortsHtml);
  ArduServerCompiler.requestIdeOptions(ArduinoMaterial.setIdeHtml);
};

/**
 * Sets the compiler location form data retrieve from an updated element.
 * @param {element} newEl New HTML element to replace the one in the current
 *                        DOM. Should contain a complete input text element.
 */
ArduinoMaterial.setCompilerLocationHtml = function(newEl) {
  if (newEl != null) {
    var compLocIp = document.getElementById('settings_compiler_location')
    if (compLocIp != null) {
      compLocIp.value = newEl.value;
    }
  } else {
    // If the element is Null, then Ardublockly server is not running 
    ArduinoMaterial.openNotConnectedModal();
  }
};

/**
 * Sets the sketch location form data retrieve from an updated element.
 * @param {element} newEl New HTML element to replace the one in the current
 *                        DOM. Should contain a complete input text element.
 */
ArduinoMaterial.setSketchLocationHtml = function(newEl) {
  if (newEl != null) {
    var sketchLocIp = document.getElementById('settings_sketch_location');
    if (sketchLocIp != null) {
      sketchLocIp.value = newEl.value;
    }
  } else {
    // If the element is Null, then Ardublockly server is not running 
    ArduinoMaterial.openNotConnectedModal();
  }
};

/**
 * Replaces the Arduino Boards form data with a new HTMl element.
 * Ensures there is a change listener to call 'setSerialPort' function
 * @param {element} newEl New HTML element to replace the one in the current
 *                        DOM. Should contain a complete select element.
 */
ArduinoMaterial.setArduinoBoardsHtml = function(newEl) {
  if (newEl != null) {
    var boardDropdown = document.getElementById('board');
    if (boardDropdown != null) {
      // Restarting the select elements built by materialize
      $('select').material_select('destroy');
      newEl.name = 'settings_board';
      newEl.id = 'board';
      newEl.onchange = ArduinoMaterial.setBoard;
      boardDropdown.parentNode.replaceChild(newEl, boardDropdown);
      // Refresh the materialize select menus
      $('select').material_select();
    }
  } else {
    // If the element is Null, then Ardublockly server is not running 
    ArduinoMaterial.openNotConnectedModal();
  }
};

/**
 * Sets the Arduino Board type with the selected user input from the drop down.
 */
ArduinoMaterial.setBoard = function() {
  var el = document.getElementById('board');
  var boardValue = el.options[el.selectedIndex].value;
  //TODO: check how ArduServerCompiler deals with invalid data and sanitise
  ArduServerCompiler.setArduinoBoard(
      boardValue, ArduinoMaterial.setArduinoBoardsHtml);
};

/**
 * Replaces the Serial Port form data with a new HTMl element.
 * Ensures there is a change listener to call 'setSerialPort' function
 * @param {element} newEl New HTML element to replace the one in the current
 *                        DOM. Should contain a complete select element.
 */
ArduinoMaterial.setSerialPortsHtml = function(newEl) {
  if (newEl != null) {
    var serialDropdown = document.getElementById('serial_port');
    if (serialDropdown != null) {
      // Restarting the select elements built by materialize
      $('select').material_select('destroy');
      newEl.name = 'settings_serial';
      newEl.id = 'serial_port';
      newEl.onchange = ArduinoMaterial.setSerial;
      serialDropdown.parentNode.replaceChild(newEl, serialDropdown);
      // Refresh the materialize select menus
      $('select').material_select();
    }
  } else {
    // If the element is Null, then Ardublockly server is not running 
    ArduinoMaterial.openNotConnectedModal();
  }
};

/**
 * Sets the Serial Port with the selected user input from the drop down.
 */
ArduinoMaterial.setSerial = function() {
  var el = document.getElementById('serial_port');
  var serialValue = el.options[el.selectedIndex].value;
  //TODO: check how ArduServerCompiler deals with invalid data and sanitise
  ArduServerCompiler.setSerialPort(
      serialValue, ArduinoMaterial.setSerialPortsHtml);
};

/**
 * Replaces IDE options form data with a new HTMl element.
 * Ensures there is a change listener to call 'setIdeSettings' function
 * @param {element} newEl New HTML element to replace the one in the current
 *                        DOM. Should contain a complete select element.
 */
ArduinoMaterial.setIdeHtml = function(newEl) {
  if (newEl != null) {
    var ideDropdown = document.getElementById('ide_settings');
    if (ideDropdown != null) {
      // Restarting the select elements built by materialize
      $('select').material_select('destroy');
      newEl.name = 'settings_ide';
      newEl.id = 'ide_settings';
      newEl.onchange = ArduinoMaterial.setIdeSettings;
      ideDropdown.parentNode.replaceChild(newEl, ideDropdown);
      // Refresh the materialize select menus
      $('select').material_select();
    }
  } else {
    // If the element is Null, then Ardublockly server is not running 
    ArduinoMaterial.openNotConnectedModal();
  }
};

/**
 * Sets the IDE settings data with the selected user input from the drop down.
 */
ArduinoMaterial.setIdeSettings = function() {
  var el = document.getElementById('ide_settings');
  var ideValue = el.options[el.selectedIndex].value;
  //TODO: check how ArduServerCompiler deals with invalid data and sanitise here
  ArduServerCompiler.setIdeOptions(ideValue, ArduinoMaterial.setIdeHtml);
};

/**
 * Send the Arduino Code to the ArduServerCompiler to process.
 * Shows a loader around the button, blocking it (unblocked upon received
 * message from server).
 */
ArduinoMaterial.sendCode = function() {
  Materialize.toast('Sending sketch to Arduino IDE...', 4000);
  ArduinoMaterial.runButtonSpinner(true);
  ArduServerCompiler.sendSketchToServer(
      ArduinoMaterial.generateArduino(), ArduinoMaterial.sendCodeReturn);
};

/**
 * Receives the IDE data back to be displayed and stops spinner.
 * @param {element} dataBack New HTML elements to include in the modal to
 *                           display the data back from the compiler.
 */
ArduinoMaterial.sendCodeReturn = function(dataBack) {
  ArduinoMaterial.runButtonSpinner(false);
  if (dataBack != null) {
    ArduinoMaterial.arduinoIdeOutput(dataBack);
  } else {
    // If the element is Null, then Ardublockly server is not running 
    ArduinoMaterial.openNotConnectedModal();
  }
};

/**
 * Populate the currently selected panel with content generated from the blocks.
 */
ArduinoMaterial.XmlTextareaToBlocks = function() {
  var success = ArduinoMaterial.replaceBlocksfromXml(
      document.getElementById('content_xml').value);
  if (success) {
    ArduinoMaterial.renderContent();
  } else {
    ArduinoMaterial.materialAlert(
        'Invalid XML',
        'The XML inputted into the text area was not successfully parsed into \
        blocks. Please review the XML code and try again.',
        false);
  }
};

/**
 * Private variable to save the previous version of the Arduino Code.
 * @type {!String}
 * @private
 */
ArduinoMaterial.PREVIOUS_ARDUINO_CODE_ = 
    'void setup() {\n\n}\n\n\nvoid loop() {\n\n}';

/**
 * Populate the Arduino Code and Blocks XML panels with content generated from
 * the blocks.
 */
ArduinoMaterial.renderContent = function() {
  // Only regenerate the code if a block is not being dragged
  if (ArduinoMaterial.blocklyIsDragging()) {
    return;
  }

  // Render Arduino Code with latest change highlight and syntax highlighting
  var arduinoCode = ArduinoMaterial.generateArduino();
  if (arduinoCode !== ArduinoMaterial.PREVIOUS_ARDUINO_CODE_) {
    var arduinoContent = document.getElementById('content_arduino');
    if (typeof prettyPrintOne == 'function') {
      var diff = JsDiff.diffWords(ArduinoMaterial.PREVIOUS_ARDUINO_CODE_,
                                  arduinoCode);
      var resultStringArray = [];
      for (var i=0; i < diff.length; i++) {
        if (diff[i].added) {
          resultStringArray.push(
            '<span class="code_highlight_new">' + diff[i].value + '</span>');
        } else if (!diff[i].removed) {
          resultStringArray.push(diff[i].value);
        }
      }
      var codeHtml = prettyPrintOne(resultStringArray.join(''), 'cpp');
      arduinoContent.innerHTML = codeHtml;
    } else {
      arduinoContent.textContent = arduinoCode;
    }
    ArduinoMaterial.PREVIOUS_ARDUINO_CODE_ = arduinoCode;
  }

  // Generate plain XML into element
  var xmlContent = document.getElementById('content_xml');
  xmlContent.value = ArduinoMaterial.generateXml();
};

/**
 * Private variable to indicate if the toolbox is meant to be shown.
 * @type {!boolean}
 * @private
 */
ArduinoMaterial.TOOLBAR_SHOWING_ = true;

/**
 * Toggles the toolbox and respective button On and Off
 */
ArduinoMaterial.toogleToolbox = function() {
  if (ArduinoMaterial.TOOLBAR_SHOWING_ == true ) {
    // showToolbox() takes a callback function as its second argument
    ArduinoMaterial.showToolbox(false, 
        function() { ArduinoMaterial.showToolboxButtonState(false); });
    ArduinoMaterial.workspace.toolbox_.flyout_.hide();
  } else {
    ArduinoMaterial.showToolboxButtonState(true);
    ArduinoMaterial.showToolbox(true);
  }
  ArduinoMaterial.TOOLBAR_SHOWING_ = !ArduinoMaterial.TOOLBAR_SHOWING_;
};

/**
 * Returns a boolean indicating if the toolbox is currently visible.
 * @return {boolean} Indicates if the toolbox is currently visible.
 */
ArduinoMaterial.isToolboxVisible = function() {
  return ArduinoMaterial.TOOLBAR_SHOWING_;
};

/**
 * Bind a function to a button's click event.
 * On touch enabled browsers, ontouchend is treated as equivalent to onclick.
 * @param {!Element|string} el Button element or ID thereof.
 * @param {!function} func Event handler to bind.
 * @private
 */
ArduinoMaterial.bindClick_ = function(el, func) {
  if (typeof el == 'string') {
    el = document.getElementById(el);
  }
  // Need to ensure both, touch and click, events don't fire for the same thing
  var propagateOnce = function(e) {
    e.stopPropagation();
    e.preventDefault();
    func();
  };
  el.addEventListener('ontouchend', propagateOnce);
  el.addEventListener('click', propagateOnce);
};

/**
 * Populate the currently selected panel with content generated from the blocks.
 */
ArduinoMaterial.functionNotImplemented = function() {
  Materialize.toast('Function not yet implemented', 4000);
};
