var selectTheme = "chrome";

var editor = ace.edit("editor", {
    theme: "ace/theme/" + selectTheme,
    mode: "ace/mode/javascript",
    maxLines: 50,
    minLines: 3,
    wrap: true,
    autoScrollEditorIntoView: true,
});

var beautify = ace.require("ace/ext/beautify");

editor.commands.addCommand({
    name: 'format document',
    bindKey: { win: "Shift-Alt-F", mac: "Shift-Option-F" },
    exec: function (editor) {
        beautify.beautify(editor.session);
    }
});

document.getElementById("selectTheme").addEventListener("change", function () {
    selectTheme = this.options[this.selectedIndex].text;
    editor.setTheme("ace/theme/" + selectTheme);
});

var font_size = document.getElementById("font_size");
font_size.value = parseInt(window.getComputedStyle(document.getElementById("editor")).fontSize);
font_size.addEventListener("change", function () {
    document.getElementById('editor').style.fontSize = font_size.value + 'px';
});		