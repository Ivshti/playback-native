try { require("Common") } catch(e) { }

var voutType, voutPtr;

if (process.bridge && process.bridge.objc) { // so we can also test this in node.js
  var core = require("nodobjc/lib/core");
  var $ = process.bridge.objc;

  var win = new Window();
  win.visible = true;

  /*
  // Doing it with a sub-view
  var view = $.NSView("alloc")("initWithFrame", $.NSMakeRect(0, 0, 400, 400));
  win.native("contentView")("addSubview", view);
  win.native("contentView")("setAutoresizesSubviews", $.YES);
  view("setAutoresizingMask", $.NSViewHeightSizable | $.NSViewWidthSizable);
  // TODO make nsView opaque
  */

  var view = win.native("contentView");

  var layer = $.CALayer("alloc")("init");
  layer("setBackgroundColor", $.NSColor("blackColor")("CGColor"));
  view("setWantsLayer", $.YES);
  view("setLayer", layer); 

  voutType = "nsobject";
  voutPtr = core.unwrapValue(view, "@");
}


var WebChimera = require("./webchimera.js");
// { vlcargs: [  ], voutType: voutType, voutPtr: voutPtr }
var player = WebChimera.createPlayer([ /* "-vvv"  */ ]);
//player.onFrameReady = function(frame) { typeof(display)=="function" && display() };
if (view) player.setVout(voutPtr);
player.play("file:///Users/ivogeorgiev/Downloads/1.mkv");
global.player = player;


