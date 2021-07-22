const starIcon = document.querySelector('.css-star-icon');

window.addEventListener('scroll', (event) => {
    starIcon.dataset.spinMe = window.pageYOffset <= 512;
});