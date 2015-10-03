try { require("Common") } catch(e) { }

var WebView = require("WebView");
var win = new Window();
win.backgroundColor = 'rgba(0,0,0,0)';
//win.frame = false;
win.alpha = 1;

var webview = new WebView();
win.appendChild(webview);
webview.left = webview.right = webview.top = webview.bottom = 0;
//webview.backgroundColor = 'rgba(0,0,0,0)';
webview.transparent = true;

webview.location = "file://"+__dirname+"/test.html";
//webview.location = "http://mobile.strem.io/";
win.visible = true;
