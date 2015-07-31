require('Common');
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

var WebChimera = require("webchimera.js");
var player = WebChimera.createPlayer([  ]);
player.onFrameSetup = function(width, height, pixelFormat) { console.log("frame setup",width,height) };
player.onFrameReady = function(frame) { display() };
player.play("file:///Users/ivogeorgiev/Downloads/1.mkv");
global.player = player;
function Texture(gl, width, height, type) {
    this.type = typeof(type)=="undefined" ? gl.LUMINANCE : type;
    this.gl = gl;
    this.width = width; this.height = height;

    /*

    var texture = new Buffer(64);
    $.glGenTextures(1, texture);

    $.glBindTexture()
    this.texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, this.type, width, height, 0, this.type, gl.UNSIGNED_BYTE, null);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR); // gl.NEAREST on slow cases
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); // gl.NEAREST on slow cases
    
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    */
}