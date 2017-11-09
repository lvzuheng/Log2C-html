//var uri = connectUrl + "login/";
//var uri = "http://120.55.162.188:8080/MobileSystem/" + "login/";

function init() {

}

function login_event() {

	if($("#login_username").val() != null && $("#login_password").val() != null && $("#login_ip").val() != null && 　$("#login_port").val()) {
		$.cookie("userName", $("#login_username").val(), { path: "/" });
		$.cookie("passWord", $("#login_password").val(), { path: "/" });
		$.cookie("ip", $("#login_ip").val(), { path: "/" });
		$.cookie("port", $("#login_port").val(), { path: "/" });
		location.href = "LogController.html";
	}
}