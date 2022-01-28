var btn1 = document.getElementById("btn1");
var text = document.getElementById("editor");
var out = document.getElementById("outRes");
var f;

document.addEventListener('paste', event => {
	const text = event.clipboardData.getData('text/plain');
	//console.log(text);
});


btn1.addEventListener("click", start);

function start() {
	out.innerHTML = "";
	var bodyOfFunc = editor.getValue();

	try {
		f = createFunc(bodyOfFunc);
		myTest();
	} catch (e) {
		out.innerHTML = "<p style='color: red;'>Error: " + e + "</p>";
	}
}

function myEqual(rec, exp, spec) {
	if (myDeepEqual(rec, exp)) {
		out.innerHTML += "<p style='color: blue;'>OK</p>";
	} else {
		out.innerHTML += "<p style='color: red;'>Failed&nbsp;&nbsp;&nbsp;" + spec +
			"; expected: " + exp + "; result: " + rec + "</p>";
	}
}

function myDeepEqual(rec, exp) {
	if (typeof (rec) != "object" && typeof (exp) != "object") return rec === exp;
	else return JSON.stringify(rec) == JSON.stringify(exp);
}

function createFunc(text) {
	text = changeNameFunction(text);
	var arg = text.substring(text.indexOf("(") + 1, text.indexOf(")"));
	var body = text.substring(text.indexOf("{") + 1, text.lastIndexOf("}"));
	return new Function(arg, body);
}

function changeNameFunction(text) {
	let nameFunction = text.substring(text.indexOf('function ') + 9, text.indexOf("("));
	return text.replaceAll(nameFunction, 'f');
}

function isRecursion() {
	let text = editor.getValue();
	let nameFunction = text.substring(text.indexOf('function ') + 9, text.indexOf("("));
	console.log(text.match(new RegExp(nameFunction, 'gm')));
	return text.match(new RegExp(nameFunction, 'gm')).length > 1;
}

function checkRecursion() {
	if (!isRecursion()) {
		out.innerHTML += '<p><b style="color: orange;"><i class="fa fa-exclamation-triangle"></i> Warning:</b> завдання зробленно без використання <a href="https://learn.javascript.ru/recursion">рекурсії</p>';
	}
}