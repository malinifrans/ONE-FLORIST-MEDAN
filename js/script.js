// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Hero Slider
const sliderContainer = document.querySelector('.slider-container');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-slide');
const nextBtn = document.querySelector('.next-slide');

let currentSlide = 0;
const slideCount = slides.length;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    showSlide(currentSlide);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto slide change
let slideInterval = setInterval(nextSlide, 5000);

// Pause on hover
sliderContainer.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

sliderContainer.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
});

// Product Filter
const categoryFilter = document.getElementById('category-filter');
const priceFilter = document.getElementById('price-filter');
const productItems = document.querySelectorAll('.product-item');

function filterProducts() {
    const categoryValue = categoryFilter.value;
    const priceValue = priceFilter.value;
    
    productItems.forEach(item => {
        const category = item.dataset.category;
        const price = parseInt(item.dataset.price);
        
        let categoryMatch = categoryValue === 'all' || category.includes(categoryValue);
        let priceMatch = true;
        
        if (priceValue === '0-500') {
            priceMatch = price <= 500;
        } else if (priceValue === '500-1000') {
            priceMatch = price > 500 && price <= 1000;
        } else if (priceValue === '1000+') {
            priceMatch = price > 1000;
        }
        
        if (categoryMatch && priceMatch) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

categoryFilter.addEventListener('change', filterProducts);
priceFilter.addEventListener('change', filterProducts);

// Lightbox
const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');
const lightboxes = document.querySelectorAll('.lightbox');
const closeLightboxes = document.querySelectorAll('.close-lightbox');

lightboxTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = trigger.getAttribute('href');
        const lightbox = document.querySelector(targetId);
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

closeLightboxes.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        const lightbox = closeBtn.closest('.lightbox');
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
});

// Close lightbox when clicking outside
lightboxes.forEach(lightbox => {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// Sticky Navigation
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.sticky-nav');
    if (window.scrollY > 50) {
        nav.style.padding = '10px 0';
        nav.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        nav.style.padding = '15px 0';
        nav.style.background = 'rgba(0, 0, 0, 0.9)';
    }
});

// Initialize AOS
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
});