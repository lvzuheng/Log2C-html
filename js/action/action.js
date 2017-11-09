

function loginAction(uname, passwd) {
	var action = {
		pid: 110,
		username: uname,
		password: passwd,
		status: true
	}
	return JSON.stringify(action);
}

function heartAction(uname, passwd) {
	var action = {
		pid: 101,
		username: uname,
		password: passwd,
		status: true
	}
	return JSON.stringify(action);
}

function controllerAction(stu) {
	var action = {
		pid: 112,
		status: stu
	}
	return JSON.stringify(action);
}