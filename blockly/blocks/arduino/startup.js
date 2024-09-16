'use strict';

goog.provide('Blockly.Blocks.startup');

goog.require('Blockly.Blocks');


Blockly.Blocks['starter_block'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Startup Code for OTA");
    this.setInputsInline(false);
    this.setNextStatement(true, null);
    this.setColour(165);
 this.setTooltip("create automatic hotspot");
 this.setHelpUrl("https://wikipedia.org");
  }
};