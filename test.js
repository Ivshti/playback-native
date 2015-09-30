try { require("Common") } catch(e) { }

var WebView = require("WebView");
var win = new Window();
var webview = new WebView();
win.appendChild(webview);
webview.left = webview.right = webview.top = webview.bottom = 0;
webview.location = "file://"+__dirname+"/test.html";
win.visible = true;