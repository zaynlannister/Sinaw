const langContainer = document.querySelector('.language');
const langDropDownMenu = document.querySelector('.language__menu');

langContainer.addEventListener('click', toggleMenu);

function toggleMenu() {
    langDropDownMenu.classList.toggle('active');
}