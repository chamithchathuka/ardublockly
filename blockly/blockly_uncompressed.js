// Do not edit this file; automatically generated by build.py.
'use strict';

// 'this' is 'window' in a browser, or 'global' in node.js.
this.BLOCKLY_DIR = (function() {
  // Find name of current directory.
  var scripts = document.getElementsByTagName('script');
  var re = new RegExp('(.+)[\/]blockly_uncompressed\.js$');
  for (var x = 0, script; script = scripts[x]; x++) {
    var match = re.exec(script.src);
    if (match) {
      return match[1];
    }
  }
  alert('Could not detect Blockly\'s directory name.');
  return '';
})();

this.BLOCKLY_BOOT = function() {
// Execute after Closure has loaded.
if (!this.goog) {
  alert('Error: Closure not found.  Read this:\n' +
        'developers.google.com/blockly/hacking/closure');
}

// Build map of all dependencies (used and unused).
var dir = this.BLOCKLY_DIR.match(/[^\/]+$/)[0];
goog.addDependency("../../../" + dir + "/core/block.js", ['Blockly.Block'], ['Blockly.Blocks', 'Blockly.Comment', 'Blockly.Connection', 'Blockly.Input', 'Blockly.Mutator', 'Blockly.Warning', 'Blockly.Workspace', 'Blockly.Xml', 'goog.array', 'goog.asserts', 'goog.math.Coordinate', 'goog.string']);
goog.addDependency("../../../" + dir + "/core/block_svg.js", ['Blockly.BlockSvg'], ['Blockly.Block', 'Blockly.ContextMenu', 'goog.Timer', 'goog.asserts', 'goog.dom', 'goog.math.Coordinate']);
goog.addDependency("../../../" + dir + "/core/blockly.js", ['Blockly'], ['Blockly.BlockSvg', 'Blockly.FieldAngle', 'Blockly.FieldCheckbox', 'Blockly.FieldColour', 'Blockly.FieldDropdown', 'Blockly.FieldImage', 'Blockly.FieldTextInput', 'Blockly.FieldVariable', 'Blockly.Generator', 'Blockly.Msg', 'Blockly.Procedures', 'Blockly.Toolbox', 'Blockly.WidgetDiv', 'Blockly.WorkspaceSvg', 'Blockly.inject', 'Blockly.utils', 'goog.color', 'goog.userAgent']);
goog.addDependency("../../../" + dir + "/core/blocks.js", ['Blockly.Blocks'], []);
goog.addDependency("../../../" + dir + "/core/bubble.js", ['Blockly.Bubble'], ['Blockly.Workspace', 'goog.dom', 'goog.math', 'goog.userAgent']);
goog.addDependency("../../../" + dir + "/core/comment.js", ['Blockly.Comment'], ['Blockly.Bubble', 'Blockly.Icon', 'goog.userAgent']);
goog.addDependency("../../../" + dir + "/core/connection.js", ['Blockly.Connection', 'Blockly.ConnectionDB'], ['goog.dom']);
goog.addDependency("../../../" + dir + "/core/contextmenu.js", ['Blockly.ContextMenu'], ['goog.dom', 'goog.events', 'goog.style', 'goog.ui.Menu', 'goog.ui.MenuItem']);
goog.addDependency("../../../" + dir + "/core/css.js", ['Blockly.Css'], []);
goog.addDependency("../../../" + dir + "/core/field.js", ['Blockly.Field'], ['goog.asserts', 'goog.dom', 'goog.math.Size', 'goog.style', 'goog.userAgent']);
goog.addDependency("../../../" + dir + "/core/field_angle.js", ['Blockly.FieldAngle'], ['Blockly.FieldTextInput', 'goog.math', 'goog.userAgent']);
goog.addDependency("../../../" + dir + "/core/field_checkbox.js", ['Blockly.FieldCheckbox'], ['Blockly.Field']);
goog.addDependency("../../../" + dir + "/core/field_colour.js", ['Blockly.FieldColour'], ['Blockly.Field', 'goog.dom', 'goog.events', 'goog.style', 'goog.ui.ColorPicker']);
goog.addDependency("../../../" + dir + "/core/field_dropdown.js", ['Blockly.FieldDropdown'], ['Blockly.Field', 'goog.dom', 'goog.events', 'goog.style', 'goog.ui.Menu', 'goog.ui.MenuItem', 'goog.userAgent']);
goog.addDependency("../../../" + dir + "/core/field_image.js", ['Blockly.FieldImage'], ['Blockly.Field', 'goog.dom', 'goog.math.Size', 'goog.userAgent']);
goog.addDependency("../../../" + dir + "/core/field_label.js", ['Blockly.FieldLabel'], ['Blockly.Field', 'Blockly.Tooltip', 'goog.dom', 'goog.math.Size']);
goog.addDependency("../../../" + dir + "/core/field_textinput.js", ['Blockly.FieldTextInput'], ['Blockly.Field', 'Blockly.Msg', 'goog.asserts', 'goog.dom', 'goog.userAgent']);
goog.addDependency("../../../" + dir + "/core/field_variable.js", ['Blockly.FieldVariable'], ['Blockly.FieldDropdown', 'Blockly.Msg', 'Blockly.Variables', 'goog.string']);
goog.addDependency("../../../" + dir + "/core/flyout.js", ['Blockly.Flyout'], ['Blockly.Block', 'Blockly.Comment', 'Blockly.WorkspaceSvg', 'goog.dom', 'goog.events', 'goog.math.Rect', 'goog.userAgent']);
goog.addDependency("../../../" + dir + "/core/generator.js", ['Blockly.Generator'], ['Blockly.Block', 'goog.asserts']);
goog.addDependency("../../../" + dir + "/core/icon.js", ['Blockly.Icon'], ['goog.dom']);
goog.addDependency("../../../" + dir + "/core/inject.js", ['Blockly.inject'], ['Blockly.Css', 'Blockly.WorkspaceSvg', 'goog.dom', 'goog.ui.Component', 'goog.userAgent']);
goog.addDependency("../../../" + dir + "/core/input.js", ['Blockly.Input'], ['Blockly.Connection', 'Blockly.FieldLabel', 'goog.asserts']);
goog.addDependency("../../../" + dir + "/core/msg.js", ['Blockly.Msg'], []);
goog.addDependency("../../../" + dir + "/core/mutator.js", ['Blockly.Mutator'], ['Blockly.Bubble', 'Blockly.Icon', 'Blockly.WorkspaceSvg', 'goog.Timer', 'goog.dom']);
goog.addDependency("../../../" + dir + "/core/names.js", ['Blockly.Names'], []);
goog.addDependency("../../../" + dir + "/core/procedures.js", ['Blockly.Procedures'], ['Blockly.Field', 'Blockly.Names', 'Blockly.Workspace']);
goog.addDependency("../../../" + dir + "/core/scrollbar.js", ['Blockly.Scrollbar', 'Blockly.ScrollbarPair'], ['goog.dom', 'goog.events']);
goog.addDependency("../../../" + dir + "/core/static_typing.js", ['Blockly.StaticTyping'], ['Blockly.Block']);
goog.addDependency("../../../" + dir + "/core/toolbox.js", ['Blockly.Toolbox'], ['Blockly.Flyout', 'goog.dom', 'goog.events', 'goog.events.BrowserFeature', 'goog.html.SafeHtml', 'goog.math.Rect', 'goog.style', 'goog.ui.tree.TreeControl', 'goog.ui.tree.TreeNode']);
goog.addDependency("../../../" + dir + "/core/tooltip.js", ['Blockly.Tooltip'], ['goog.dom']);
goog.addDependency("../../../" + dir + "/core/trashcan.js", ['Blockly.Trashcan'], ['goog.Timer', 'goog.dom', 'goog.math', 'goog.math.Rect']);
goog.addDependency("../../../" + dir + "/core/utils.js", ['Blockly.utils'], ['goog.dom', 'goog.events.BrowserFeature', 'goog.math.Coordinate', 'goog.userAgent']);
goog.addDependency("../../../" + dir + "/core/variables.js", ['Blockly.Variables'], ['Blockly.Workspace', 'goog.string']);
goog.addDependency("../../../" + dir + "/core/warning.js", ['Blockly.Warning'], ['Blockly.Bubble', 'Blockly.Icon']);
goog.addDependency("../../../" + dir + "/core/widgetdiv.js", ['Blockly.WidgetDiv'], ['Blockly.Css', 'goog.dom', 'goog.style']);
goog.addDependency("../../../" + dir + "/core/workspace.js", ['Blockly.Workspace'], ['goog.math']);
goog.addDependency("../../../" + dir + "/core/workspace_svg.js", ['Blockly.WorkspaceSvg'], ['Blockly.ScrollbarPair', 'Blockly.Trashcan', 'Blockly.ZoomControls', 'Blockly.Workspace', 'Blockly.Xml', 'goog.dom', 'goog.math.Coordinate', 'goog.userAgent']);
goog.addDependency("../../../" + dir + "/core/xml.js", ['Blockly.Xml'], ['goog.dom']);
goog.addDependency("../../../" + dir + "/core/zoom_controls.js", ['Blockly.ZoomControls'], ['goog.dom']);
goog.addDependency("base.js", [], []);
goog.addDependency("a11y/aria/aria.js", ['goog.a11y.aria'], ['goog.a11y.aria.Role', 'goog.a11y.aria.State', 'goog.a11y.aria.datatables', 'goog.array', 'goog.asserts', 'goog.dom', 'goog.dom.TagName', 'goog.object', 'goog.string']);
goog.addDependency("a11y/aria/attributes.js", ['goog.a11y.aria.AutoCompleteValues', 'goog.a11y.aria.CheckedValues', 'goog.a11y.aria.DropEffectValues', 'goog.a11y.aria.ExpandedValues', 'goog.a11y.aria.GrabbedValues', 'goog.a11y.aria.InvalidValues', 'goog.a11y.aria.LivePriority', 'goog.a11y.aria.OrientationValues', 'goog.a11y.aria.PressedValues', 'goog.a11y.aria.RelevantValues', 'goog.a11y.aria.SelectedValues', 'goog.a11y.aria.SortValues', 'goog.a11y.aria.State'], []);
goog.addDependency("a11y/aria/datatables.js", ['goog.a11y.aria.datatables'], ['goog.a11y.aria.State', 'goog.object']);
goog.addDependency("a11y/aria/roles.js", ['goog.a11y.aria.Role'], []);
goog.addDependency("array/array.js", ['goog.array', 'goog.array.ArrayLike'], ['goog.asserts']);
goog.addDependency("asserts/asserts.js", ['goog.asserts', 'goog.asserts.AssertionError'], ['goog.debug.Error', 'goog.dom.NodeType', 'goog.string']);
goog.addDependency("async/freelist.js", ['goog.async.FreeList'], []);
goog.addDependency("async/nexttick.js", ['goog.async.nextTick', 'goog.async.throwException'], ['goog.debug.entryPointRegistry', 'goog.dom.TagName', 'goog.functions', 'goog.labs.userAgent.browser', 'goog.labs.userAgent.engine']);
goog.addDependency("async/run.js", ['goog.async.run'], ['goog.async.WorkQueue', 'goog.async.nextTick', 'goog.async.throwException']);
goog.addDependency("async/workqueue.js", ['goog.async.WorkItem', 'goog.async.WorkQueue'], ['goog.asserts', 'goog.async.FreeList']);
goog.addDependency("color/color.js", ['goog.color', 'goog.color.Hsl', 'goog.color.Hsv', 'goog.color.Rgb'], ['goog.color.names', 'goog.math']);
goog.addDependency("color/names.js", ['goog.color.names'], []);
goog.addDependency("debug/debug.js", ['goog.debug'], ['goog.array', 'goog.html.SafeHtml', 'goog.html.SafeUrl', 'goog.html.uncheckedconversions', 'goog.string.Const', 'goog.structs.Set', 'goog.userAgent']);
goog.addDependency("debug/entrypointregistry.js", ['goog.debug.EntryPointMonitor', 'goog.debug.entryPointRegistry'], ['goog.asserts']);
goog.addDependency("debug/error.js", ['goog.debug.Error'], []);
goog.addDependency("debug/logbuffer.js", ['goog.debug.LogBuffer'], ['goog.asserts', 'goog.debug.LogRecord']);
goog.addDependency("debug/logger.js", ['goog.debug.LogManager', 'goog.debug.Loggable', 'goog.debug.Logger', 'goog.debug.Logger.Level'], ['goog.array', 'goog.asserts', 'goog.debug', 'goog.debug.LogBuffer', 'goog.debug.LogRecord']);
goog.addDependency("debug/logrecord.js", ['goog.debug.LogRecord'], []);
goog.addDependency("disposable/disposable.js", ['goog.Disposable', 'goog.dispose', 'goog.disposeAll'], ['goog.disposable.IDisposable']);
goog.addDependency("disposable/idisposable.js", ['goog.disposable.IDisposable'], []);
goog.addDependency("dom/browserfeature.js", ['goog.dom.BrowserFeature'], ['goog.userAgent']);
goog.addDependency("dom/classlist.js", ['goog.dom.classlist'], ['goog.array']);
goog.addDependency("dom/dom.js", ['goog.dom', 'goog.dom.Appendable', 'goog.dom.DomHelper'], ['goog.array', 'goog.asserts', 'goog.dom.BrowserFeature', 'goog.dom.NodeType', 'goog.dom.TagName', 'goog.dom.safe', 'goog.html.SafeHtml', 'goog.math.Coordinate', 'goog.math.Size', 'goog.object', 'goog.string', 'goog.string.Unicode', 'goog.userAgent']);
goog.addDependency("dom/nodeiterator.js", ['goog.dom.NodeIterator'], ['goog.dom.TagIterator']);
goog.addDependency("dom/nodetype.js", ['goog.dom.NodeType'], []);
goog.addDependency("dom/safe.js", ['goog.dom.safe', 'goog.dom.safe.InsertAdjacentHtmlPosition'], ['goog.asserts', 'goog.html.SafeHtml', 'goog.html.SafeUrl', 'goog.html.TrustedResourceUrl', 'goog.string', 'goog.string.Const']);
goog.addDependency("dom/tagiterator.js", ['goog.dom.TagIterator', 'goog.dom.TagWalkType'], ['goog.dom', 'goog.dom.NodeType', 'goog.iter.Iterator', 'goog.iter.StopIteration']);
goog.addDependency("dom/tagname.js", ['goog.dom.TagName'], []);
goog.addDependency("dom/tags.js", ['goog.dom.tags'], ['goog.object']);
goog.addDependency("dom/vendor.js", ['goog.dom.vendor'], ['goog.string', 'goog.userAgent']);
goog.addDependency("events/browserevent.js", ['goog.events.BrowserEvent', 'goog.events.BrowserEvent.MouseButton'], ['goog.events.BrowserFeature', 'goog.events.Event', 'goog.events.EventType', 'goog.reflect', 'goog.userAgent']);
goog.addDependency("events/browserfeature.js", ['goog.events.BrowserFeature'], ['goog.userAgent']);
goog.addDependency("events/event.js", ['goog.events.Event', 'goog.events.EventLike'], ['goog.Disposable', 'goog.events.EventId']);
goog.addDependency("events/eventhandler.js", ['goog.events.EventHandler'], ['goog.Disposable', 'goog.events', 'goog.object']);
goog.addDependency("events/eventid.js", ['goog.events.EventId'], []);
goog.addDependency("events/events.js", ['goog.events', 'goog.events.CaptureSimulationMode', 'goog.events.Key', 'goog.events.ListenableType'], ['goog.asserts', 'goog.debug.entryPointRegistry', 'goog.events.BrowserEvent', 'goog.events.BrowserFeature', 'goog.events.Listenable', 'goog.events.ListenerMap']);
goog.addDependency("events/eventtarget.js", ['goog.events.EventTarget'], ['goog.Disposable', 'goog.asserts', 'goog.events', 'goog.events.Event', 'goog.events.Listenable', 'goog.events.ListenerMap', 'goog.object']);
goog.addDependency("events/eventtype.js", ['goog.events.EventType'], ['goog.userAgent']);
goog.addDependency("events/focushandler.js", ['goog.events.FocusHandler', 'goog.events.FocusHandler.EventType'], ['goog.events', 'goog.events.BrowserEvent', 'goog.events.EventTarget', 'goog.userAgent']);
goog.addDependency("events/keycodes.js", ['goog.events.KeyCodes'], ['goog.userAgent']);
goog.addDependency("events/keyhandler.js", ['goog.events.KeyEvent', 'goog.events.KeyHandler', 'goog.events.KeyHandler.EventType'], ['goog.events', 'goog.events.BrowserEvent', 'goog.events.EventTarget', 'goog.events.EventType', 'goog.events.KeyCodes', 'goog.userAgent']);
goog.addDependency("events/listenable.js", ['goog.events.Listenable', 'goog.events.ListenableKey'], ['goog.events.EventId']);
goog.addDependency("events/listener.js", ['goog.events.Listener'], ['goog.events.ListenableKey']);
goog.addDependency("events/listenermap.js", ['goog.events.ListenerMap'], ['goog.array', 'goog.events.Listener', 'goog.object']);
goog.addDependency("fs/url.js", ['goog.fs.url'], []);
goog.addDependency("functions/functions.js", ['goog.functions'], []);
goog.addDependency("html/legacyconversions.js", ['goog.html.legacyconversions'], ['goog.html.SafeHtml', 'goog.html.SafeStyle', 'goog.html.SafeUrl', 'goog.html.TrustedResourceUrl']);
goog.addDependency("html/safehtml.js", ['goog.html.SafeHtml'], ['goog.array', 'goog.asserts', 'goog.dom.TagName', 'goog.dom.tags', 'goog.html.SafeStyle', 'goog.html.SafeStyleSheet', 'goog.html.SafeUrl', 'goog.html.TrustedResourceUrl', 'goog.i18n.bidi.Dir', 'goog.i18n.bidi.DirectionalString', 'goog.object', 'goog.string', 'goog.string.Const', 'goog.string.TypedString']);
goog.addDependency("html/safescript.js", ['goog.html.SafeScript'], ['goog.asserts', 'goog.string.Const', 'goog.string.TypedString']);
goog.addDependency("html/safestyle.js", ['goog.html.SafeStyle'], ['goog.array', 'goog.asserts', 'goog.string', 'goog.string.Const', 'goog.string.TypedString']);
goog.addDependency("html/safestylesheet.js", ['goog.html.SafeStyleSheet'], ['goog.array', 'goog.asserts', 'goog.string', 'goog.string.Const', 'goog.string.TypedString']);
goog.addDependency("html/safeurl.js", ['goog.html.SafeUrl'], ['goog.asserts', 'goog.fs.url', 'goog.i18n.bidi.Dir', 'goog.i18n.bidi.DirectionalString', 'goog.string.Const', 'goog.string.TypedString']);
goog.addDependency("html/trustedresourceurl.js", ['goog.html.TrustedResourceUrl'], ['goog.asserts', 'goog.i18n.bidi.Dir', 'goog.i18n.bidi.DirectionalString', 'goog.string.Const', 'goog.string.TypedString']);
goog.addDependency("html/uncheckedconversions.js", ['goog.html.uncheckedconversions'], ['goog.asserts', 'goog.html.SafeHtml', 'goog.html.SafeScript', 'goog.html.SafeStyle', 'goog.html.SafeStyleSheet', 'goog.html.SafeUrl', 'goog.html.TrustedResourceUrl', 'goog.string', 'goog.string.Const']);
goog.addDependency("i18n/bidi.js", ['goog.i18n.bidi', 'goog.i18n.bidi.Dir', 'goog.i18n.bidi.DirectionalString', 'goog.i18n.bidi.Format'], []);
goog.addDependency("iter/iter.js", ['goog.iter', 'goog.iter.Iterable', 'goog.iter.Iterator', 'goog.iter.StopIteration'], ['goog.array', 'goog.asserts', 'goog.functions', 'goog.math']);
goog.addDependency("labs/useragent/browser.js", ['goog.labs.userAgent.browser'], ['goog.array', 'goog.labs.userAgent.util', 'goog.object', 'goog.string']);
goog.addDependency("labs/useragent/engine.js", ['goog.labs.userAgent.engine'], ['goog.array', 'goog.labs.userAgent.util', 'goog.string']);
goog.addDependency("labs/useragent/platform.js", ['goog.labs.userAgent.platform'], ['goog.labs.userAgent.util', 'goog.string']);
goog.addDependency("labs/useragent/util.js", ['goog.labs.userAgent.util'], ['goog.string']);
goog.addDependency("log/log.js", ['goog.log', 'goog.log.Level', 'goog.log.LogRecord', 'goog.log.Logger'], ['goog.debug', 'goog.debug.LogManager', 'goog.debug.LogRecord', 'goog.debug.Logger']);
goog.addDependency("math/box.js", ['goog.math.Box'], ['goog.math.Coordinate']);
goog.addDependency("math/coordinate.js", ['goog.math.Coordinate'], ['goog.math']);
goog.addDependency("math/math.js", ['goog.math'], ['goog.array', 'goog.asserts']);
goog.addDependency("math/rect.js", ['goog.math.Rect'], ['goog.math.Box', 'goog.math.Coordinate', 'goog.math.Size']);
goog.addDependency("math/size.js", ['goog.math.Size'], []);
goog.addDependency("object/object.js", ['goog.object'], []);
goog.addDependency("promise/promise.js", ['goog.Promise'], ['goog.Thenable', 'goog.asserts', 'goog.async.FreeList', 'goog.async.run', 'goog.async.throwException', 'goog.debug.Error', 'goog.promise.Resolver']);
goog.addDependency("promise/resolver.js", ['goog.promise.Resolver'], []);
goog.addDependency("promise/thenable.js", ['goog.Thenable'], []);
goog.addDependency("reflect/reflect.js", ['goog.reflect'], []);
goog.addDependency("string/const.js", ['goog.string.Const'], ['goog.asserts', 'goog.string.TypedString']);
goog.addDependency("string/string.js", ['goog.string', 'goog.string.Unicode'], []);
goog.addDependency("string/stringbuffer.js", ['goog.string.StringBuffer'], []);
goog.addDependency("string/typedstring.js", ['goog.string.TypedString'], []);
goog.addDependency("structs/collection.js", ['goog.structs.Collection'], []);
goog.addDependency("structs/map.js", ['goog.structs.Map'], ['goog.iter.Iterator', 'goog.iter.StopIteration', 'goog.object']);
goog.addDependency("structs/set.js", ['goog.structs.Set'], ['goog.structs', 'goog.structs.Collection', 'goog.structs.Map']);
goog.addDependency("structs/structs.js", ['goog.structs'], ['goog.array', 'goog.object']);
goog.addDependency("structs/trie.js", ['goog.structs.Trie'], ['goog.object', 'goog.structs']);
goog.addDependency("style/style.js", ['goog.style'], ['goog.array', 'goog.asserts', 'goog.dom', 'goog.dom.NodeType', 'goog.dom.TagName', 'goog.dom.vendor', 'goog.math.Box', 'goog.math.Coordinate', 'goog.math.Rect', 'goog.math.Size', 'goog.object', 'goog.string', 'goog.userAgent']);
goog.addDependency("timer/timer.js", ['goog.Timer'], ['goog.Promise', 'goog.events.EventTarget']);
goog.addDependency("ui/colorpalette.js", ['goog.ui.ColorPalette'], ['goog.array', 'goog.color', 'goog.dom.TagName', 'goog.style', 'goog.ui.Palette', 'goog.ui.PaletteRenderer']);
goog.addDependency("ui/colorpicker.js", ['goog.ui.ColorPicker', 'goog.ui.ColorPicker.EventType'], ['goog.ui.ColorPalette', 'goog.ui.Component']);
goog.addDependency("ui/component.js", ['goog.ui.Component', 'goog.ui.Component.Error', 'goog.ui.Component.EventType', 'goog.ui.Component.State'], ['goog.array', 'goog.asserts', 'goog.dom', 'goog.dom.NodeType', 'goog.dom.TagName', 'goog.events.EventHandler', 'goog.events.EventTarget', 'goog.object', 'goog.style', 'goog.ui.IdGenerator']);
goog.addDependency("ui/container.js", ['goog.ui.Container', 'goog.ui.Container.EventType', 'goog.ui.Container.Orientation'], ['goog.a11y.aria', 'goog.a11y.aria.State', 'goog.asserts', 'goog.dom', 'goog.events.EventType', 'goog.events.KeyCodes', 'goog.events.KeyHandler', 'goog.object', 'goog.style', 'goog.ui.Component', 'goog.ui.ContainerRenderer', 'goog.ui.Control']);
goog.addDependency("ui/containerrenderer.js", ['goog.ui.ContainerRenderer'], ['goog.a11y.aria', 'goog.array', 'goog.asserts', 'goog.dom.NodeType', 'goog.dom.TagName', 'goog.dom.classlist', 'goog.string', 'goog.style', 'goog.ui.registry', 'goog.userAgent']);
goog.addDependency("ui/control.js", ['goog.ui.Control'], ['goog.Disposable', 'goog.array', 'goog.dom', 'goog.events.BrowserEvent', 'goog.events.Event', 'goog.events.EventHandler', 'goog.events.EventType', 'goog.events.KeyCodes', 'goog.events.KeyHandler', 'goog.string', 'goog.ui.Component', 'goog.ui.ControlContent', 'goog.ui.ControlRenderer', 'goog.ui.decorate', 'goog.ui.registry', 'goog.userAgent']);
goog.addDependency("ui/controlcontent.js", ['goog.ui.ControlContent'], []);
goog.addDependency("ui/controlrenderer.js", ['goog.ui.ControlRenderer'], ['goog.a11y.aria', 'goog.a11y.aria.Role', 'goog.a11y.aria.State', 'goog.array', 'goog.asserts', 'goog.dom', 'goog.dom.TagName', 'goog.dom.classlist', 'goog.object', 'goog.string', 'goog.style', 'goog.ui.Component', 'goog.userAgent']);
goog.addDependency("ui/decorate.js", ['goog.ui.decorate'], ['goog.ui.registry']);
goog.addDependency("ui/idgenerator.js", ['goog.ui.IdGenerator'], []);
goog.addDependency("ui/menu.js", ['goog.ui.Menu', 'goog.ui.Menu.EventType'], ['goog.dom.TagName', 'goog.math.Coordinate', 'goog.string', 'goog.style', 'goog.ui.Component.EventType', 'goog.ui.Component.State', 'goog.ui.Container', 'goog.ui.Container.Orientation', 'goog.ui.MenuHeader', 'goog.ui.MenuItem', 'goog.ui.MenuRenderer', 'goog.ui.MenuSeparator']);
goog.addDependency("ui/menuheader.js", ['goog.ui.MenuHeader'], ['goog.ui.Component', 'goog.ui.Control', 'goog.ui.MenuHeaderRenderer', 'goog.ui.registry']);
goog.addDependency("ui/menuheaderrenderer.js", ['goog.ui.MenuHeaderRenderer'], ['goog.ui.ControlRenderer']);
goog.addDependency("ui/menuitem.js", ['goog.ui.MenuItem'], ['goog.a11y.aria.Role', 'goog.array', 'goog.dom', 'goog.dom.classlist', 'goog.math.Coordinate', 'goog.string', 'goog.ui.Component', 'goog.ui.Control', 'goog.ui.MenuItemRenderer', 'goog.ui.registry']);
goog.addDependency("ui/menuitemrenderer.js", ['goog.ui.MenuItemRenderer'], ['goog.a11y.aria.Role', 'goog.asserts', 'goog.dom', 'goog.dom.TagName', 'goog.dom.classlist', 'goog.ui.Component', 'goog.ui.ControlRenderer']);
goog.addDependency("ui/menurenderer.js", ['goog.ui.MenuRenderer'], ['goog.a11y.aria', 'goog.a11y.aria.Role', 'goog.a11y.aria.State', 'goog.asserts', 'goog.dom', 'goog.dom.TagName', 'goog.ui.ContainerRenderer', 'goog.ui.Separator']);
goog.addDependency("ui/menuseparator.js", ['goog.ui.MenuSeparator'], ['goog.ui.MenuSeparatorRenderer', 'goog.ui.Separator', 'goog.ui.registry']);
goog.addDependency("ui/menuseparatorrenderer.js", ['goog.ui.MenuSeparatorRenderer'], ['goog.dom', 'goog.dom.TagName', 'goog.dom.classlist', 'goog.ui.ControlRenderer']);
goog.addDependency("ui/palette.js", ['goog.ui.Palette'], ['goog.array', 'goog.dom', 'goog.events', 'goog.events.EventType', 'goog.events.KeyCodes', 'goog.math.Size', 'goog.ui.Component', 'goog.ui.Control', 'goog.ui.PaletteRenderer', 'goog.ui.SelectionModel']);
goog.addDependency("ui/paletterenderer.js", ['goog.ui.PaletteRenderer'], ['goog.a11y.aria', 'goog.a11y.aria.Role', 'goog.a11y.aria.State', 'goog.array', 'goog.asserts', 'goog.dom', 'goog.dom.NodeIterator', 'goog.dom.NodeType', 'goog.dom.TagName', 'goog.dom.classlist', 'goog.iter', 'goog.style', 'goog.ui.ControlRenderer', 'goog.userAgent']);
goog.addDependency("ui/registry.js", ['goog.ui.registry'], ['goog.asserts', 'goog.dom.classlist']);
goog.addDependency("ui/selectionmodel.js", ['goog.ui.SelectionModel'], ['goog.array', 'goog.events.EventTarget', 'goog.events.EventType']);
goog.addDependency("ui/separator.js", ['goog.ui.Separator'], ['goog.a11y.aria', 'goog.asserts', 'goog.ui.Component', 'goog.ui.Control', 'goog.ui.MenuSeparatorRenderer', 'goog.ui.registry']);
goog.addDependency("ui/tree/basenode.js", ['goog.ui.tree.BaseNode', 'goog.ui.tree.BaseNode.EventType'], ['goog.Timer', 'goog.a11y.aria', 'goog.asserts', 'goog.dom.safe', 'goog.events.Event', 'goog.events.KeyCodes', 'goog.html.SafeHtml', 'goog.html.SafeStyle', 'goog.html.legacyconversions', 'goog.string', 'goog.string.StringBuffer', 'goog.style', 'goog.ui.Component']);
goog.addDependency("ui/tree/treecontrol.js", ['goog.ui.tree.TreeControl'], ['goog.a11y.aria', 'goog.asserts', 'goog.dom.classlist', 'goog.events.EventType', 'goog.events.FocusHandler', 'goog.events.KeyHandler', 'goog.html.SafeHtml', 'goog.log', 'goog.ui.tree.BaseNode', 'goog.ui.tree.TreeNode', 'goog.ui.tree.TypeAhead', 'goog.userAgent']);
goog.addDependency("ui/tree/treenode.js", ['goog.ui.tree.TreeNode'], ['goog.ui.tree.BaseNode']);
goog.addDependency("ui/tree/typeahead.js", ['goog.ui.tree.TypeAhead', 'goog.ui.tree.TypeAhead.Offset'], ['goog.array', 'goog.events.KeyCodes', 'goog.string', 'goog.structs.Trie']);
goog.addDependency("useragent/useragent.js", ['goog.userAgent'], ['goog.labs.userAgent.browser', 'goog.labs.userAgent.engine', 'goog.labs.userAgent.platform', 'goog.labs.userAgent.util', 'goog.string']);

// Load Blockly.
goog.require('Blockly');
goog.require('Blockly.Block');
goog.require('Blockly.BlockSvg');
goog.require('Blockly.Blocks');
goog.require('Blockly.Bubble');
goog.require('Blockly.Comment');
goog.require('Blockly.Connection');
goog.require('Blockly.ConnectionDB');
goog.require('Blockly.ContextMenu');
goog.require('Blockly.Css');
goog.require('Blockly.Field');
goog.require('Blockly.FieldAngle');
goog.require('Blockly.FieldCheckbox');
goog.require('Blockly.FieldColour');
goog.require('Blockly.FieldDropdown');
goog.require('Blockly.FieldImage');
goog.require('Blockly.FieldLabel');
goog.require('Blockly.FieldTextInput');
goog.require('Blockly.FieldVariable');
goog.require('Blockly.Flyout');
goog.require('Blockly.Generator');
goog.require('Blockly.Icon');
goog.require('Blockly.Input');
goog.require('Blockly.Msg');
goog.require('Blockly.Mutator');
goog.require('Blockly.Names');
goog.require('Blockly.Procedures');
goog.require('Blockly.Scrollbar');
goog.require('Blockly.ScrollbarPair');
goog.require('Blockly.StaticTyping');
goog.require('Blockly.Toolbox');
goog.require('Blockly.Tooltip');
goog.require('Blockly.Trashcan');
goog.require('Blockly.Variables');
goog.require('Blockly.Warning');
goog.require('Blockly.WidgetDiv');
goog.require('Blockly.Workspace');
goog.require('Blockly.WorkspaceSvg');
goog.require('Blockly.Xml');
goog.require('Blockly.ZoomControls');
goog.require('Blockly.inject');
goog.require('Blockly.utils');

delete this.BLOCKLY_DIR;
delete this.BLOCKLY_BOOT;
};

if (typeof DOMParser == 'undefined' && typeof require == 'function') {
  // Node.js needs DOMParser loaded separately.
  var DOMParser = require('xmldom').DOMParser;
}

// Delete any existing Closure (e.g. Soy's nogoog_shim).
document.write('<script>var goog = undefined;</script>');
// Load fresh Closure Library.
document.write('<script src="' + this.BLOCKLY_DIR +
    '/../closure-library/closure/goog/base.js"></script>');
document.write('<script>this.BLOCKLY_BOOT()</script>');
