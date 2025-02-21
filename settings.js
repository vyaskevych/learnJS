const savedSelectTheme = localStorage.getItem('themeAce', selectTheme);
var selectTheme = savedSelectTheme ? savedSelectTheme : "chrome";

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

var langTools = ace.require("ace/ext/language_tools");

editor.setOptions({
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    enableSnippets: true
  });

document.getElementById("selectTheme").addEventListener("change", function () {
    selectTheme = this.options[this.selectedIndex].text;
    editor.setTheme("ace/theme/" + selectTheme);
    localStorage.setItem('themeAce', selectTheme);
});

var font_size = document.getElementById("font_size");
font_size.value = parseInt(window.getComputedStyle(document.getElementById("editor")).fontSize);
font_size.addEventListener("change", function () {
    document.getElementById('editor').style.fontSize = font_size.value + 'px';
});


const toggleTheme = () => {
    const rootElement = document.documentElement;
    const currentTheme = rootElement.getAttribute('data-theme');
    const themeIcon = document.querySelector('#theme-toggle i');

    if (currentTheme === 'dark') {
        rootElement.removeAttribute('data-theme');
        editor.setTheme("ace/theme/chrome"); // Світла тема для редактора
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon'); // Змінити на місяць
        localStorage.setItem('theme', 'light');
    } else {
        rootElement.setAttribute('data-theme', 'dark');
        editor.setTheme("ace/theme/twilight"); // Темна тема для редактора
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun'); // Змінити на сонце
        localStorage.setItem('theme', 'dark');
    }
};

// Перевірка збереженої теми при завантаженні сторінки
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
}



// Додавання обробника подій для кнопки перемикання теми
const themeToggleButton = document.createElement('button');
themeToggleButton.id = 'theme-toggle';
themeToggleButton.innerHTML = `<i class="fas fa-moon"></i>`
//themeToggleButton.textContent = 'Перемкнути тему';
themeToggleButton.addEventListener('click', toggleTheme);
document.body.prepend(themeToggleButton);



// Створюємо елемент <link>
const linkElement = document.createElement('link');

// Встановлюємо атрибути
linkElement.rel = 'stylesheet';
linkElement.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';

// Додаємо елемент до <head>
document.head.appendChild(linkElement);