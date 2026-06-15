// Seleccionamos los elementos del DOM (Document Object Model)
const track = document.getElementById('track');
const slides = Array.from(track.children);
const btnNext = document.getElementById('btnNext');
const btnPrev = document.getElementById('btnPrev');

// Obtenemos el ancho de una tarjeta para saber cuánto debemos desplazarnos
const slideWidth = slides[0].getBoundingClientRect().width;

// Organizamos las diapositivas una al lado de la otra
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
};
slides.forEach(setSlidePosition);

let currentIndex = 0;

// Evento para el botón "Siguiente"
btnNext.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) {
        const currentSlide = slides[currentIndex];
        const nextSlide = slides[currentIndex + 1];
        moveToSlide(track, currentSlide, nextSlide, currentIndex + 1);
    } else {
        // Si estamos en el último, volvemos al principio (Loop)
        moveToSlide(track, slides[currentIndex], slides[0], 0);
    }
});

// Evento para el botón "Anterior"
btnPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
        const currentSlide = slides[currentIndex];
        const prevSlide = slides[currentIndex - 1];
        moveToSlide(track, currentSlide, prevSlide, currentIndex - 1);
    } else {
        // Si estamos en el primero, vamos al último
        moveToSlide(track, slides[currentIndex], slides[slides.length - 1], slides.length - 1);
    }
});

