const langContainer = document.querySelector('.language');
const langDropDownMenu = document.querySelector('.language__menu');

let allLanguages = ['ru', 'en'];

langContainer.addEventListener('click', toggleMenu);

function toggleMenu() {
    langDropDownMenu.classList.toggle('active');
}

function renderLanguages() {
    allLanguages.forEach(item => {
        langDropDownMenu.innerHTML += getLanguagesTemplate(item);
    })
}

function getLanguagesTemplate(lang) {
    return `<a class="language__link" data-language="${lang}">${lang}</a>`
}

renderLanguages();