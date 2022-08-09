const menuToggle = document.querySelector('#menuToggle');
const navMenu = document.querySelector('.header__nav-links');

menuToggle.addEventListener('click', function() {
    if (this.getAttribute('data-status') === 'closed') {
        navMenu.classList.add('active');
        this.setAttribute('data-status', 'opened');
        document.body.classList.add('stop-scroll');
    } else {
        navMenu.classList.remove('active');
        this.setAttribute('data-status', 'closed');
        document.body.classList.remove('stop-scroll');
    }
})

navMenu.addEventListener('click', () => {
    navMenu.classList.remove('active');
})

