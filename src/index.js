let currentIndex = 0;
const carouselItems = document.querySelectorAll('.slide');

function goToSlide(index) {
    if (index === 0) {
        index = carouselItems.length + 1;
    } else if (index === carouselItems.length) {
        index = 0;
    }
    currentIndex = index;
    document.querySelector('.slider-container').style.transform = `translateX(-${currentIndex * 100}%)`;
}

function goToNextSlide() {
    goToSlide(currentIndex + 1);
}

function goToPrevSlide() {
    goToSlide(currentIndex - 1);
}
document.querySelector('.slider-prev').addEventListener('click', () => goToNextSlide());
document.querySelector('.slider-prev').addEventListener('click', () => goToPrevSlide());