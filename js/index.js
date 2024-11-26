let currentIndex = 0;

const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;

document.querySelector('.next').addEventListener('click', () => {
    items[currentIndex].style.display = 'none';
    currentIndex = (currentIndex + 1) % totalItems;
    items[currentIndex].style.display = 'block';
});

document.querySelector('.prev').addEventListener('click', () => {
    items[currentIndex].style.display = 'none';
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    items[currentIndex].style.display = 'block';
});

// Inicializar el carrusel
items.forEach((item, index) => {
    item.style.display = index === 0 ? 'block' : 'none';
});
