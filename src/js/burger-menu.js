const menuToggle = document.querySelector('#menuToggle');
const navMenu = document.querySelector('.header__nav-links');

function openOrCloseNavigationMenu() {
    navMenu.classList.toggle('active')
}

menuToggle.addEventListener('click', function() {
    if (this.getAttribute('data-status') === 'closed') {
        openOrCloseNavigationMenu()
        this.setAttribute('data-status', 'opened')
        document.body.classList.add('stop-scroll')
    } else {
        openOrCloseNavigationMenu()
        this.setAttribute('data-status', 'closed')
        document.body.classList.remove('stop-scroll')
    }
})

navMenu.addEventListener('click', () => {
    navMenu.classList.remove('active');
})

