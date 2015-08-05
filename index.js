try { require("Common") } catch(e) { }

var voutType, voutPtr;

if (process.bridge && process.bridge.objc) { // so we can also test this in node.js
  var core = require("nodobjc/lib/core");
  var $ = process.bridge.objc;

  var win = new Window();
  win.visible = true;

  var backColor = $.NSColor("blackColor")

  var playerView = $.NSView.extend("playerView");
  playerView.addMethod("drawRect:", [$.void, [playerView,$.selector,$.NSRect]], function (self, _cmd, rect) {
    backColor("set");
    $.NSRectFill(rect);
  });
  
  playerView.addMethod("isOpaque:", [$.void, [playerView,$.selector,$.NSRect]], function(self, _cmd, rect) {
    return $.YES;
  });
  
  playerView.register();

  var size = win.native("contentView")("frame").size;
  var view = playerView("alloc")("initWithFrame", $.NSMakeRect(0,0,size.width,size.height));
  win.native("contentView")("addSubview", view);
  win.native("contentView")("setAutoresizesSubviews", $.YES);
  view("setAutoresizingMask", $.NSViewHeightSizable | $.NSViewWidthSizable);
  

/*
  var view = win.native("contentView");

  var layer = $.CALayer("alloc")("init");
  layer("setBackgroundColor", $.NSColor("blackColor")("CGColor"));
  view("setWantsLayer", $.YES);
  view("setLayer", layer); 
*/

  voutType = "nsobject";
  voutPtr = core.unwrapValue(view, "@");
}

/*
var WebView = require("WebView");
var win = new Window();
var webview = new WebView();
win.appendChild(webview);
webview.left = webview.right = webview.top = webview.bottom = 0;
webview.location = "http://localhost:8100";
win.visible = true;
*/


var WebChimera = require("./webchimera.js");
// { vlcargs: [  ], voutType: voutType, voutPtr: voutPtr }
var player = WebChimera.createPlayer([ /* "-vvv"  */ ]);
//player.onFrameReady = function(frame) { typeof(display)=="function" && display() };
if (view) player.setVout(voutPtr);
player.play("file:///Users/ivogeorgiev/Downloads/1.mkv");
global.player = player;


