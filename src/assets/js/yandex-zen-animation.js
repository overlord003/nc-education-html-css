const mainBlock = document.querySelector('.yandex-notification-block._animated');
const animatedBlock = document.querySelector('.yandex-animated-block');
const closeButton = document.querySelector('.yandex-close-button');

mainBlock.addEventListener('mouseenter', () => {
    animatedBlock.classList.add('_active');
});

mainBlock.addEventListener('mouseleave', () => {
    animatedBlock.classList.remove('_active');
    closeButton.classList.remove('_active');
});

animatedBlock.addEventListener('animationend', () => {
    closeButton.classList.add('_active');
});

closeButton.addEventListener('click', event => {
    mainBlock.classList.add('_hidden');
})