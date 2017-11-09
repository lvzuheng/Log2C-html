var listening =false;
function decode( msg) {
	var message = JSON.parse(msg);
	switch(message.pid) {
		case 110:
			decodeLogin(message);
			break;
		case 111:
			decodeInfos( message);
			break;
		case 112:
			decodeController( message);
			break;
	}
}

function decodeLogin(message) {
	if(!message.status){
		alert("登陆失败，请检查用户密码！");
		returnLogin();
	}
}

function decodeController(message) {
	infosAppend(message.status?"开启监听":listening?"停止监听":"监听失败");
	listening = message.status;
}

function decodeInfos(message) {
	infosAppend("(服务器消息)"+message.info);
}

function infosAppend(msg){
	$('#textarea_infos').append(msg+"\r\n");
}
