const langContainer = document.querySelector('.language__page');
const langDropDownMenu = document.querySelector('.language__menu');

langContainer.addEventListener('click', toggleMenu);

function toggleMenu() {
    langDropDownMenu.classList.toggle('active');
}