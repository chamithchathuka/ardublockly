// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="subtitle">et visuelt programmeringsmiljø</span><span id="blocklyMessage">Blockly</span><span id="codeTooltip">Se den genererede JavaScript kode.</span><span id="linkTooltip">Gem og link til blokke.</span><span id="runTooltip">Kør programmet, der er defineret af blokkene i \\narbejdsområdet. </span><span id="runProgram">Kør program</span><span id="resetProgram">Nulstil</span><span id="dialogOk">OK</span><span id="dialogCancel">Afbryd</span><span id="catLogic">Logik</span><span id="catLoops">Løkker</span><span id="catMath">Matematik</span><span id="catText">Tekst</span><span id="catLists">Lister</span><span id="catColour">Farve</span><span id="catVariables">Variabler</span><span id="catProcedures">Procedurer</span><span id="httpRequestError">Der var et problem med forespørgslen.</span><span id="linkAlert">Del dine blokke med dette link:\n\n%1</span><span id="hashError">Beklager, \'%1\' passer ikke med nogen gemt Blockly fil.</span><span id="xmlError">Kunne ikke hente din gemte fil.  Måske er den lavet med en anden udgave af Blockly?</span><span id="listVariable">liste</span><span id="textVariable">tekst</span></div>';
};


apps.dialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogShadow" class="dialogAnimate"></div><div id="dialogBorder"></div><div id="dialog"></div>';
};


apps.codeDialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogCode" class="dialogHiddenContent"><pre id="containerCode"></pre>' + apps.ok(null, null, opt_ijData) + '</div>';
};


apps.storageDialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogStorage" class="dialogHiddenContent"><div id="containerStorage"></div>' + apps.ok(null, null, opt_ijData) + '</div>';
};


apps.ok = function(opt_data, opt_ignored, opt_ijData) {
  return '<div class="farSide" style="padding: 1ex 3ex 0"><button class="secondary" onclick="BlocklyApps.hideDialog(true)">OK</button></div>';
};

;
// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof turtlepage == 'undefined') { var turtlepage = {}; }


turtlepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return apps.messages(null, null, opt_ijData) + '<div style="display: none"><span id="Turtle_moveTooltip">Bevæger skildpadden frem eller tilbage med den \\nangivne værdi. </span><span id="Turtle_moveForward">flyt fremad med</span><span id="Turtle_moveBackward">flyt bagud med</span><span id="Turtle_turnTooltip">Drejer skildpadden til venstre eller højre med \\ndet angivne antal grader. </span><span id="Turtle_turnRight">drej til højre med</span><span id="Turtle_turnLeft">drej til venstre med</span><span id="Turtle_widthTooltip">Ændrer bredden på pennen.</span><span id="Turtle_setWidth">sæt bredden til</span><span id="Turtle_colourTooltip">Ændrer farven på pennen.</span><span id="Turtle_setColour">sæt farve til</span><span id="Turtle_penTooltip">Løfter eller sænker pennen, for at stoppe eller \\nstarte tegning. </span><span id="Turtle_penUp">pennen op</span><span id="Turtle_penDown">pennen ned</span><span id="Turtle_turtleVisibilityTooltip">Gør skildpadden (cirkel og pil) synlig eller \\nusynlig. </span><span id="Turtle_hideTurtle">skjul skildpadde</span><span id="Turtle_showTurtle">vis skildpadde</span><span id="Turtle_printHelpUrl">http://da.wikipedia.org/wiki/Bogtryk</span><span id="Turtle_printTooltip">Skriver tekst i skildpaddens retning på dens \\nplacering. </span><span id="Turtle_print">skriv</span><span id="Turtle_fontHelpUrl">http://da.wikipedia.org/wiki/Skrifttype</span><span id="Turtle_fontTooltip">Angiver den skrifttype, der bruges af \\nskriveblokken. </span><span id="Turtle_font">skrifttype</span><span id="Turtle_fontSize">skriftstørrelse</span><span id="Turtle_fontNormal">normal</span><span id="Turtle_fontBold">fed</span><span id="Turtle_fontItalic">kursiv</span><span id="Turtle_unloadWarning">Hvis du forlader denne side vil det resultere i tab af dit arbejde.</span></div>';
};


turtlepage.start = function(opt_data, opt_ignored, opt_ijData) {
  return turtlepage.messages(null, null, opt_ijData) + '<table width="100%"><tr><td><h1><span id="title"><a href="../index.html">Blockly</a> : Skildpaddegrafik</span></h1></td><td class="farSide"><select id="languageMenu"></select></td></tr></table><div id="visualization"><canvas id="scratch" width="400" height="400" style="display: none"></canvas><canvas id="display" width="400" height="400"></canvas></div><table style="padding-top: 1em;"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><script type="text/javascript" src="../slider.js"><\/script><svg id="slider" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="150" height="50"><!-- Slow icon. --><clipPath id="slowClipPath"><rect width=26 height=12 x=5 y=14 /></clipPath><image xlink:href="icons.png" height=42 width=84 x=-21 y=-10 clip-path="url(#slowClipPath)" /><!-- Fast icon. --><clipPath id="fastClipPath"><rect width=26 height=16 x=120 y=10 /></clipPath><image xlink:href="icons.png" height=42 width=84 x=120 y=-11 clip-path="url(#fastClipPath)" /></svg></td><td style="width: 15px;"><img id="spinner" style="visibility: hidden;" src="loading.gif" height=15 width=15></td><td style="width: 190px; text-align: center"><button id="runButton" class="primary" title="Får skildpadden til at gøre det blokkene siger."><img src="../../media/1x1.gif" class="run icon21">Kør program</button><button id="resetButton" class="primary" style="display: none"><img src="../../media/1x1.gif" class="stop icon21"> Nulstil</button></td></tr></table><div id="toolbarDiv"><button id="codeButton" class="notext" title="Se den genererede JavaScript kode."><img src=\'../../media/1x1.gif\' class="code icon21"></button><button id="linkButton" class="notext" title="Gem og link til blokke."><img src=\'../../media/1x1.gif\' class="link icon21"></button><button class="notext" id="captureButton" title="Gem tegningen."><img src=\'../../media/1x1.gif\' class="img icon21"></button><a id="downloadImageLink" download="tegning.png"></a></div><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../blocks_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + turtlepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div>' + apps.dialog(null, null, opt_ijData) + apps.codeDialog(null, null, opt_ijData) + apps.storageDialog(null, null, opt_ijData);
};


turtlepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none"><category name="Skildpadde"><block type="draw_move"><value name="VALUE"><block type="math_number"><title name="NUM">10</title></block></value></block><block type="draw_turn"><value name="VALUE"><block type="math_number"><title name="NUM">90</title></block></value></block><block type="draw_width"><value name="WIDTH"><block type="math_number"><title name="NUM">1</title></block></value></block><block type="draw_pen"></block><block type="turtle_visibility"></block><block type="draw_print"><value name="TEXT"><block type="text"></block></value></block><block type="draw_font"></block></category><category name="Farve"><block type="draw_colour"><value name="COLOUR"><block type="colour_picker"></block></value></block><block type="colour_picker"></block><block type="colour_random"></block><block type="colour_rgb"></block><block type="colour_blend"></block></category><category name="Logik"><block type="controls_if"></block><block type="logic_compare"></block><block type="logic_operation"></block><block type="logic_negate"></block><block type="logic_boolean"></block><block type="logic_ternary"></block></category><category name="Løkker"><block type="controls_repeat_ext"><value name="TIMES"><block type="math_number"><title name="NUM">10</title></block></value></block><block type="controls_whileUntil"></block><block type="controls_for"><value name="FROM"><block type="math_number"><title name="NUM">1</title></block></value><value name="TO"><block type="math_number"><title name="NUM">10</title></block></value><value name="BY"><block type="math_number"><title name="NUM">1</title></block></value></block><block type="controls_forEach"></block><block type="controls_flow_statements"></block></category><category name="Matematik"><block type="math_number"></block><block type="math_arithmetic"></block><block type="math_single"></block><block type="math_trig"></block><block type="math_constant"></block><block type="math_number_property"></block><block type="math_change"><value name="DELTA"><block type="math_number"><title name="NUM">1</title></block></value></block><block type="math_round"></block><block type="math_on_list"></block><block type="math_modulo"></block><block type="math_constrain"><value name="LOW"><block type="math_number"><title name="NUM">1</title></block></value><value name="HIGH"><block type="math_number"><title name="NUM">100</title></block></value></block><block type="math_random_int"><value name="FROM"><block type="math_number"><title name="NUM">1</title></block></value><value name="TO"><block type="math_number"><title name="NUM">100</title></block></value></block><block type="math_random_float"></block></category><category name="Lister"><block type="lists_create_empty"></block><block type="lists_create_with"></block><block type="lists_repeat"><value name="NUM"><block type="math_number"><title name="NUM">5</title></block></value></block><block type="lists_length"></block><block type="lists_isEmpty"></block><block type="lists_indexOf"><value name="VALUE"><block type="variables_get"><title name="VAR">liste</title></block></value></block><block type="lists_getIndex"><value name="VALUE"><block type="variables_get"><title name="VAR">liste</title></block></value></block><block type="lists_setIndex"><value name="LIST"><block type="variables_get"><title name="VAR">liste</title></block></value></block><block type="lists_getSublist"><value name="LIST"><block type="variables_get"><title name="VAR">liste</title></block></value></block></category><category name="Variabler" custom="VARIABLE"></category><category name="Procedurer" custom="PROCEDURE"></category></xml>';
};
