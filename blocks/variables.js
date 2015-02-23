/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Variable blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.variables');

goog.require('Blockly.Blocks');


Blockly.Blocks.variables.HUE = 330;

Blockly.Blocks['variables_get'] = {
  /**
   * Block for variable getter.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.VARIABLES_GET_HELPURL);
    this.setColour(Blockly.Blocks.variables.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.VARIABLES_GET_TITLE)
        .appendField(new Blockly.FieldVariable(
        Blockly.Msg.VARIABLES_GET_ITEM), 'VAR')
        .appendField(Blockly.Msg.VARIABLES_GET_TAIL);
    this.setOutput(true);
    this.setTooltip(Blockly.Msg.VARIABLES_GET_TOOLTIP);
    this.contextMenuMsg_ = Blockly.Msg.VARIABLES_GET_CREATE_SET;
    this.contextMenuType_ = 'variables_set';
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setFieldValue(newName, 'VAR');
    }
  },
  /**
   * Add menu option to create getter/setter block for this setter/getter.
   * @param {!Array} options List of menu options to add to.
   * @this Blockly.Block
   */
  customContextMenu: function(options) {
    var option = {enabled: true};
    var name = this.getFieldValue('VAR');
    option.text = this.contextMenuMsg_.replace('%1', name);
    var xmlField = goog.dom.createDom('field', null, name);
    xmlField.setAttribute('name', 'VAR');
    var xmlBlock = goog.dom.createDom('block', null, xmlField);
    xmlBlock.setAttribute('type', this.contextMenuType_);
    option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
    options.push(option);
  },
  /**
   * Finds the type of the selected variable. Need to find the original
   * variable set block to save the type into the varType block variable.
   * @this Blockly.Block
   * @param {Array<string>} existingVars List of variables already defined.
   * @return {string} String to indicate the type if it has not been defined
   *                  before.
   */
  getVarType: function(existingVars) {
    var varName = this.getFieldValue('VAR');
    var varType = null;

    // Check if variable has been defined already add if it has been.
    for (var name in existingVars) {
      if (name === varName) {
        varType = existingVars[varName];
        this.varType = varType;
        break;
      }
    }

    // This block needs the variable to be define before use, so warn user.
    if (varType == null) {
      this.setWarningText('This variable needs to be set to something before' +
                          ' it can be used!');
    } else {
      this.setWarningText(null);
    }

    return varType;
  },
  /**
   * Contains the type of the variable selected from the first set block.
   */
  varType: 'nonono',
  /**
   * Retrieves the type of the selected variable, defined at getVarType.
   * @this Blockly.Block
   */
  getType: function() {
    return this.varType;
  }
};

Blockly.Blocks['variables_set'] = {
  /**
   * Block for variable setter.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.VARIABLES_SET_HELPURL);
    this.setColour(Blockly.Blocks.variables.HUE);
    this.interpolateMsg(
        // TODO: Combine these messages instead of using concatenation.
        Blockly.Msg.VARIABLES_SET_TITLE + ' %1 ' +
        Blockly.Msg.VARIABLES_SET_TAIL + ' %2',
        ['VAR', new Blockly.FieldVariable(Blockly.Msg.VARIABLES_SET_ITEM)],
        ['VALUE', null, Blockly.ALIGN_RIGHT],
        Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.VARIABLES_SET_TOOLTIP);
    this.contextMenuMsg_ = Blockly.Msg.VARIABLES_SET_CREATE_GET;
    this.contextMenuType_ = 'variables_get';
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setFieldValue(newName, 'VAR');
    }
  },
  customContextMenu: Blockly.Blocks['variables_get'].customContextMenu,
  /**
   * Searches through the nested blocks to find a variable type.
   * @this Blockly.Block
   * @param {Array<string>} existingVars List of variables already defined.
   * @return {string} String to indicate the type if it has not been defined
   *                  before.
   */
  getVarType: function(existingVars) {
    var varName = this.getFieldValue('VAR');
    var varType = null;

    // Check what this block type should be
    var nextBlock = [this];
    while ((nextBlock[0].getType == null) &&
           (nextBlock[0].getChildren().length > 0)) {
      nextBlock = nextBlock[0].getChildren();
    }
    if (nextBlock[0] === this) {
      // Set variable block is empty
      varType = 'defineme';
    } else {
      var func = nextBlock[0].getType;
      if (func) {
        varType = nextBlock[0].getType();
      } else {
        varType = 'innerBlockNoType';
      }
    }

    // Check if variable has been defined already
    var unique = true;
    for (var name in existingVars) {
      if (name == varName) {
        unique = false;
        break;
      }
    }

    // Only set the type if the variable has not been defined before
    if (unique) {
      this.setWarningText(null);
      return varType;
    } else if ((existingVars[varName] != varType) && (nextBlock[0] != this)) {
      this.setWarningText('This block is using a different type than what ' +
          'was set on the first use of this variable.\nFirst use type: ' +
          existingVars[varName] + '\nThis block type: ' + varType);
      return null;
    } else {
      this.setWarningText(null);
      return null;
    }
  }
};
