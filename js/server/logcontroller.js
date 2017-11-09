var webSocket;
var username;
var passwd;
var ip;
var port;
var infoDialog;


function init() {
	
	if($.cookie("userName") ==null || $.cookie("passWord") == null || $.cookie("ip") == null ||$.cookie("port") ==null){
		location.href="Login.html";
	}
	username = $.cookie("userName");
	passwd = $.cookie("passWord");
	ip = $.cookie("ip");
	port = $.cookie("port");
	
	
	infoDialog = load_dialog("登录中。。。");
	infoDialog.show();	
	connect();
	
}

function stopHtml() {
	send(controllerAction(false));
}

function connect() {
	webSocket = new WebSocket("ws:" + ip + ":" + port + "/websocket");
	webSocket.onopen = function(e) {
		onOpen();
	}
	webSocket.onmessage = function(e) {
		onMessage(e.data);
	};
	webSocket.onerror = function(e) {
		onError(e);
	}
	webSocket.onclose = function(e) {

	}
}

function onOpen() {
	console.log("建立连接");
	login();
	setTimeout(function() {
		infoDialog.close();
		if(webSocket.readyState != 1) {
			webSocket = null;
			infoDialog.content("连接失败，请验证ip地址重新登录");
			setTimeout(function(){returnLogin();},2000);
		} else {
			$("#div_body").css("visibility","visible");
		}
	}, 1500);
}

function onMessage(msg) {
	console.log(msg);
	decode(msg);
}

function onError(error) {
	if(webSocket.readyState == 3) {
		infoDialog.content("连接已经关闭或不可用");
		setTimeout(function(){returnLogin();},2000);
	}
}

function onClose(e) {
	if(webSocket.readyState != 1)
		connect();
}

function login() {
	setTimeout(function() {
		if(webSocket.readyState == 1) {
			var jsonStr = loginAction(username, $.md5(passwd));
			send(jsonStr);
			sendHeartAction();
		} else {
			login();
		}
	}, 1000);
}

function send(msg) {
	if(webSocket.readyState == 1) {
		webSocket.send(msg);
	}
}

function stringToByte(str) {
	var bytes = new Array();
	var len, c;
	len = str.length;
	for(var i = 0; i < len; i++) {
		c = str.charCodeAt(i);
		if(c >= 0x010000 && c <= 0x10FFFF) {
			bytes.push(((c >> 18) & 0x07) | 0xF0);
			bytes.push(((c >> 12) & 0x3F) | 0x80);
			bytes.push(((c >> 6) & 0x3F) | 0x80);
			bytes.push((c & 0x3F) | 0x80);
		} else if(c >= 0x000800 && c <= 0x00FFFF) {
			bytes.push(((c >> 12) & 0x0F) | 0xE0);
			bytes.push(((c >> 6) & 0x3F) | 0x80);
			bytes.push((c & 0x3F) | 0x80);
		} else if(c >= 0x000080 && c <= 0x0007FF) {
			bytes.push(((c >> 6) & 0x1F) | 0xC0);
			bytes.push((c & 0x3F) | 0x80);
		} else {
			bytes.push(c & 0xFF);
		}
	}
	return bytes;

}

function byteToString(arr) {
	if(typeof arr === 'string') {
		return arr;
	}
	var str = '',
		_arr = arr;
	for(var i = 0; i < _arr.length; i++) {
		var one = _arr[i].toString(2),
			v = one.match(/^1+?(?=0)/);
		if(v && one.length == 8) {
			var bytesLength = v[0].length;
			var store = _arr[i].toString(2).slice(7 - bytesLength);
			for(var st = 1; st < bytesLength; st++) {
				store += _arr[st + i].toString(2).slice(2);
			}
			str += String.fromCharCode(parseInt(store, 2));
			i += bytesLength - 1;
		} else {
			str += String.fromCharCode(_arr[i]);
		}
	}
	return str;
}

function sendHeartAction() {
	setInterval(function() {
		webSocket.send(heartAction(null, null));
	}, 10000);
}

function startEvent() {
	webSocket.send(controllerAction(true));
}

function stopEvent() {
	webSocket.send(controllerAction(false));
}

function returnLogin() {
	location.href = "Login.html";
}

function load_dialog(content) {
	var info = dialog({
		content: content,
		width: "auto",
		quickClose: false
	});
	return info;
}

function info_dialog(content) {
	var info = dialog({
		content: content,
		width: "auto",
		quickClose: true
	});
	return info;
}