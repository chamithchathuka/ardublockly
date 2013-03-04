// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof mazepage == 'undefined') { var mazepage = {}; }


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<table width="100%" height="100%"><tr><td width="410" valign="top"><h1><a href="http://blockly.googlecode.com/">Blockly</a> &gt; <a href="../index.html">Apps</a> &gt; ' + soy.$$escapeHtml(opt_ijData.MSG.title) + '</h1><p class="levelLine">' + soy.$$escapeHtml(opt_ijData.MSG.level) + ': &nbsp;';
  for (var i8 = 1; i8 < 11; i8++) {
    output += (i8 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i8) + '</span>' : '<a class="tab" href="?level=' + soy.$$escapeHtml(i8) + '">' + soy.$$escapeHtml(i8) + '</a>';
  }
  output += '</p><div id="bubble"><div id="hint">' + soy.$$escapeHtml(opt_ijData.MSG.hints[opt_ijData.level]) + '</div><div id="capacity"></div></div><img id="pegman_bubble" height=42 width=55 src="pegman_bubble.png"><div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="400px"></div><table width="100%"><tr><td id="toolbarDiv"><button title="' + soy.$$escapeHtml(opt_ijData.MSG.codeTooltip) + '" onclick="Maze.showCode();"><img src=\'../../media/1x1.gif\' class="code"></button><button id="linkButton" title="' + soy.$$escapeHtml(opt_ijData.MSG.linkTooltip) + '" onclick="BlocklyStorage.link();"><img src=\'../../media/1x1.gif\' class="link"></button></td><td id="buttonDiv"><button id="runButton" class="launch" onclick="Maze.runButtonClick();">' + soy.$$escapeHtml(opt_ijData.MSG.runProgram) + '</button><button id="resetButton" class="launch" onclick="Maze.resetButtonClick();" style="display: none">' + soy.$$escapeHtml(opt_ijData.MSG.resetProgram) + '</button></td></tr></table></td><td valign="top">' + mazepage.toolbox(null, null, opt_ijData) + '<iframe src="frame.html?' + soy.$$escapeHtml(opt_ijData.frameSrc) + '"></iframe></td></tr></table>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return (opt_ijData.level < 10) ? '<xml id="toolbox" style="display: none"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level > 4) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 7) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>' : '<xml id="toolbox" style="display: none"><category name="' + soy.$$escapeHtml(opt_ijData.MSG.catMaze) + '"><block type="maze_move"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block><block type="maze_isPath"></block><block type="maze_getX"></block><block type="maze_getY"></block><block type="maze_getDirection"></block></category><category name="' + soy.$$escapeHtml(opt_ijData.MSG.catControl) + '"><block type="controls_if"></block><block type="controls_repeat"></block><block type="controls_whileUntil"></block><block type="controls_for"><value name="FROM"><block type="math_number"><title name="NUM">1</title></block></value><value name="TO"><block type="math_number"><title name="NUM">10</title></block></value></block><block type="controls_forEach"></block><block type="controls_flow_statements"></block></category><category name="' + soy.$$escapeHtml(opt_ijData.MSG.catLogic) + '"><block type="logic_compare"></block><block type="logic_operation"></block><block type="logic_negate"></block><block type="logic_boolean"></block><block type="logic_null"></block><block type="logic_ternary"></block></category><category name="' + soy.$$escapeHtml(opt_ijData.MSG.catMath) + '"><block type="math_number"></block><block type="math_arithmetic"></block><block type="math_single"></block><block type="math_trig"></block><block type="math_constant"></block><block type="math_number_property"></block><block type="math_change"><value name="DELTA"><block type="math_number"><title name="NUM">1</title></block></value></block><block type="math_round"></block><block type="math_on_list"></block><block type="math_modulo"></block><block type="math_constrain"><value name="LOW"><block type="math_number"><title name="NUM">1</title></block></value><value name="HIGH"><block type="math_number"><title name="NUM">100</title></block></value></block><block type="math_random_int"><value name="FROM"><block type="math_number"><title name="NUM">1</title></block></value><value name="TO"><block type="math_number"><title name="NUM">100</title></block></value></block><block type="math_random_float"></block></category><category name="' + soy.$$escapeHtml(opt_ijData.MSG.catLists) + '"><block type="lists_create_empty"></block><block type="lists_create_with"></block><block type="lists_repeat"><value name="NUM"><block type="math_number"><title name="NUM">5</title></block></value></block><block type="lists_length"></block><block type="lists_isEmpty"></block><block type="lists_indexOf"><value name="VALUE"><block type="variables_get"><title name="VAR">list</title></block></value></block><block type="lists_getIndex"><value name="VALUE"><block type="variables_get"><title name="VAR">list</title></block></value></block><block type="lists_setIndex"><value name="LIST"><block type="variables_get"><title name="VAR">list</title></block></value></block><block type="lists_getSublist"><value name="LIST"><block type="variables_get"><title name="VAR">list</title></block></value></block></category><category name="' + soy.$$escapeHtml(opt_ijData.MSG.catVariables) + '" custom="VARIABLE"></category><category name="' + soy.$$escapeHtml(opt_ijData.MSG.catProcedures) + '" custom="PROCEDURE"></category></xml>';
};
