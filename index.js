try { require('Common') } catch(e) { }
if (process.bridge && process.bridge.objc) { // so we can also test this in node.js
var $ = process.bridge.objc;
$.import('GLKit');

var glContext = null;

function initialize () 
{
  glContext = opengl('openGLContext');
  glContext('makeCurrentContext');
  $.glMatrixMode($.GL_PROJECTION);
  $.glViewport(0, 0, win.width, win.height);
  $.glMatrixMode($.GL_PROJECTION);
  $.glLoadIdentity();
  $.gluPerspective(45, win.width / win.height, 1.0, 500.0);
  $.glMatrixMode($.GL_MODELVIEW);
  $.glShadeModel($.GL_SMOOTH);
  $.glClearDepth(1.0); 
  $.glEnable($.GL_DEPTH_TEST);
  $.glDepthFunc($.GL_LEQUAL);
  $.glHint($.GL_PERSPECTIVE_CORRECTION_HINT, $.GL_NICEST);
  glContext('flushBuffer');              
}
function display() 
{

  glContext('makeCurrentContext');
  $.glClear($.GL_COLOR_BUFFER_BIT | $.GL_DEPTH_BUFFER_BIT);
  $.glLoadIdentity();
  $.glTranslatef(0.0,0.0,-3.0);      
  $.glBegin($.GL_TRIANGLES);          
    $.glColor3f(0.0,0.0,1.0);      
    $.glVertex3f( 0.0, 1.0, 0.0);    
    $.glColor3f(0.0,1.0,0.0);      
    $.glVertex3f(-1.0,-1.0, 0.0);    
    $.glColor3f(1.0,0.0,0.0);      
    $.glVertex3f( 1.0,-1.0, 0.0);    
  $.glEnd();
  $.glFlush();           
}

var win = new Window();
var opengl = $.NSOpenGLView('alloc')('initWithFrame', $.NSMakeRect(0,0,400,400), 'pixelFormat', $.NSOpenGLView('defaultPixelFormat'));

win.native('contentView')('addSubview', opengl);
win.visible = true;

initialize();

function Texture(gl, width, height, type) {
    this.type = typeof(type)=="undefined" ? $.GL_LUMINANCE : type;
    this.gl = gl;
    this.width = width; this.height = height;

    this.texture = new Buffer(64);
    $.glGenTextures(1, this.texture);
    $.glBindTexture($.GL_TEXTURE_2D, this.texture);
    $.gltexImage2D($.GL_TEXTURE_2D, 0, this.type, width, height, 0, this.type, $.GL_UNSIGNED_BYTE, null);

    $.glTexParameteri($.GL_TEXTURE_2D, $.GL_TEXTURE_MAG_FILTER, $.GL_LINEAR); 
    $.glTexParameteri($.GL_TEXTURE_2D, $.GL_TEXTURE_MIN_FILTER, $.GL_LINEAR);
    
    $.glTexParameteri($.GL_TEXTURE_2D, $.GL_TEXTURE_WRAP_S, $.GL_CLAMP_TO_EDGE);
    $.glTexParameteri($.GL_TEXTURE_2D, $.GL_TEXTURE_WRAP_T, $.GL_CLAMP_TO_EDGE);
}
}

var WebChimera = require("webchimera.js");
var player = WebChimera.createPlayer([ "-vvv" ]);
player.onFrameSetup = function(width, height, pixelFormat) { console.log("frame setup",width,height) };
player.onFrameReady = function(frame) { typeof("display")=="function" && display() };
player.play("file:///Users/ivogeorgiev/Downloads/1.mkv");
global.player = player;

