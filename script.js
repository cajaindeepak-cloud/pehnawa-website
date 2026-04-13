// ===== PRELOADER =====
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('loaded');
    }, 600);
});

// ===== NAVBAR SCROLL =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== HAMBURGER MENU =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
});

// Close menu on link click
navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navMenu.classList.remove('open');
    });
});

// ===== ACTIVE NAV TRACKING =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 100;
        if (window.scrollY >= top) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
});

// ===== COLLECTION FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        productCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 600);
});
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== PRODUCT ORDER → WHATSAPP =====
document.querySelectorAll('.btn-whatsapp-order').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const product = btn.dataset.product;
        const text = encodeURIComponent(`Hi! I'm interested in ordering the "${product}" from pehnawabyss.com. Please share details.`);
        window.open(`https://wa.me/919323331444?text=${text}`, '_blank');
    });
});

// ===== CONTACT FORM → WHATSAPP =====
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const interest = form.interest.value;
    const message = form.message.value.trim();

    let text = `Hi! I'm ${name}.\n`;
    text += `Phone: ${phone}\n`;
    text += `Interested in: ${interest}\n`;
    if (message) text += `Details: ${message}`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/919323331444?text=${encoded}`, '_blank');
});
