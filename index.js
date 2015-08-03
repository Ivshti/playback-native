try { require('Common') } catch(e) { }
if (process.bridge && process.bridge.objc) { // so we can also test this in node.js
var $ = process.bridge.objc;
/*
$.import('GLKit');

var glContext = null;

function compileShader(type, source)
{
  var shader = $.glCreateShader(type);
  var lenbuf = new Buffer(32/8); lenbuf.writeInt32BE(source.length, 0) // how?
  $.glShaderSource(shader, 1, source, lenbuf);
  $.glCompileShader(shader);
  return shader;
}

function initialize () 
{
  glContext = opengl('openGLContext');
  glContext('makeCurrentContext');

  var vertexShader = compileShader($.GL_VERTEX_SHADER, new Buffer([
      "attribute highp vec4 aVertexPosition;",
      "attribute vec2 aTextureCoord;",
      "varying highp vec2 vTextureCoord;",
      "void main(void) {",
      " gl_Position = aVertexPosition;",
      " vTextureCoord = aTextureCoord;", "}"].join("\n")));

  var fragmentShader = compileShader($.GL_FRAGMENT_SHADER, new Buffer([
      "precision highp float;",
      "varying lowp vec2 vTextureCoord;",
      "uniform sampler2D YTexture;",
      "uniform sampler2D UTexture;",
      "uniform sampler2D VTexture;",
      "const mat4 YUV2RGB = mat4",
      "(",
      " 1.1643828125, 0, 1.59602734375, -.87078515625,",
      " 1.1643828125, -.39176171875, -.81296875, .52959375,",
      " 1.1643828125, 2.017234375, 0, -1.081390625,",
      " 0, 0, 0, 1",
      ");", "void main(void) {",
      " gl_FragColor = vec4( texture2D(YTexture, vTextureCoord).x, texture2D(UTexture, vTextureCoord).x, texture2D(VTexture, vTextureCoord).x, 1) * YUV2RGB;", "}"
      ].join("\n")));

  var program = $.glCreateProgram();
  $.glAttachShader(program, vertexShader); 
  $.glAttachShader(program, fragmentShader);
  $.glLinkProgram(program);

  $.glUseProgram(program);

  if(!$.glGetProgramParameter(program, $.GL_LINK_STATUS)) {
      console.log("Shader link failed.");
  }

  var vertexPositionAttribute = $.glGetAttribLocation(program, "aVertexPosition");
  $.glEnableVertexAttribArray(vertexPositionAttribute);

  var textureCoordAttribute = $.glGetAttribLocation(program, "aTextureCoord");
  $.glEnableVertexAttribArray(textureCoordAttribute);
        
        var verticesBuffer = $.glCreateBuffer();
        $.glBindBuffer($.GL_ARRAY_BUFFER, verticesBuffer);
        $.glBufferData($.GL_ARRAY_BUFFER, new Float32Array([1.0, 1.0, 0.0, -1.0, 1.0, 0.0, 1.0, -1.0, 0.0, -1.0, -1.0, 0.0]), $.GL_STATIC_DRAW);
        $.glVertexAttribPointer(vertexPositionAttribute, 3, $.GL_FLOAT, false, 0, 0);

        var texCoordBuffer = $.glCreateBuffer();
        $.glBindBuffer($.GL_ARRAY_BUFFER, texCoordBuffer);
        $.glBufferData($.GL_ARRAY_BUFFER, new Float32Array([1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0]), $.GL_STATIC_DRAW);
        $.glVertexAttribPointer(textureCoordAttribute, 2, $.GL_FLOAT, false, 0, 0);

}
function display() 
{

 //glContext('makeCurrentContext');
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
*/

$.import('GLKit');

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


