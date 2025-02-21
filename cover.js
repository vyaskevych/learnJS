var goTest = document.getElementById("goTest");
var loadLast = document.getElementById("loadLast");
var text = document.getElementById("editor");
var out = document.getElementById("outRes");
var f;
let tests = { total: 0, passed: 0 };

document.addEventListener('paste', event => {
	const text = event.clipboardData.getData('text/plain');
	//console.log(text);
});


goTest.addEventListener("click", start);

function start() {
	out.innerHTML = "";
	var bodyOfFunc = editor.getValue();
	tests = { total: 0, passed: 0 }
	sessionStorage.setItem('last_code', bodyOfFunc);
	loadLast.disabled = !sessionStorage.getItem('last_code');

	try {
		f = createFunc(bodyOfFunc);
		myTest();
		setTimeout(() => out.insertAdjacentHTML("afterbegin", `<p class="test">${tests.passed}/${tests.total} тестів пройдено успішно!</p>`), 100);
		window.scrollTo(0, document.body.scrollHeight);
	} catch (e) {
		out.innerHTML = "<p style='color: red;'>Error: " + e + "</p>";
	}
}

function myEqual(rec, exp, spec) {
	tests.total++
	if (myDeepEqual(rec, exp)) {
		tests.passed++;
		out.insertAdjacentHTML("beforeend", `<div class="test"><p class="ok">OK&nbsp;&nbsp;&nbsp;${JSON.stringify(spec)};</p><p>expected:</p><pre>${JSON.stringify(exp)}</pre> result: <pre>${JSON.stringify(rec)}</pre></div>`);
	} else {
		out.insertAdjacentHTML("beforeend", `<div class="test"><p class="failed">Failed&nbsp;&nbsp;&nbsp;${JSON.stringify(spec)};</p><p>expected:</p><pre>${JSON.stringify(exp)}</pre> result: <pre>${JSON.stringify(rec)}</pre></div>`);
	}

}

function myDeepEqual(rec, exp) {
	if(typeof (rec) === "string" && typeof (exp) === "string") return rec.trim() === exp.trim();
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

window.addEventListener('load', () => { loadLast.disabled = !sessionStorage.getItem('last_code') })

loadLast.addEventListener('click', () => {
	editor.setValue(sessionStorage.getItem('last_code'));
})