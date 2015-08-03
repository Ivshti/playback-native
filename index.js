try { require('Common') } catch(e) { }
if (process.bridge && process.bridge.objc) { // so we can also test this in node.js
var $ = process.bridge.objc;


//$.import('GLKit');

var win = new Window();
var view = $.NSView('alloc')('init');
// var opengl = $.NSOpenGLView('alloc')('initWithFrame', $.NSMakeRect(0,0,400,400), 'pixelFormat', $.NSOpenGLView('defaultPixelFormat'));

// figure out how to get the pointer to view
win.native('contentView')('addSubview', view);
view('setAutoresizingMask', $.NSViewHeightSizable | $.NSViewWidthSizable);
// TODO make nsView opaque
win.visible = true;





}


var WebChimera = require("./webchimera.js");
var player = WebChimera.createPlayer([ /* "-vvv"  */ ]);
//player.onFrameReady = function(frame) { typeof(display)=="function" && display() };
player.setVout(view.pointer);
player.play("file:///Users/ivogeorgiev/Downloads/1.mkv");
global.player = player;


