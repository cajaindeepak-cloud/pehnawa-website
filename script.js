// ===== PRELOADER =====
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('loaded');
    }, 600);
});

// ===== COMBINED SCROLL HANDLER (perf: single listener) =====
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');

let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrollY = window.scrollY;

            // Navbar scroll effect
            navbar.classList.toggle('scrolled', scrollY > 50);

            // Active nav tracking
            let current = '';
            sections.forEach(section => {
                if (scrollY >= section.offsetTop - 100) {
                    current = section.getAttribute('id');
                }
            });
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === '#' + current);
            });

            // Back to top visibility
            backToTop.classList.toggle('visible', scrollY > 600);

            ticking = false;
        });
        ticking = true;
    }
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

// ===== COLLECTION FILTER (with smooth animation) =====
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        productCards.forEach(card => {
            const match = filter === 'all' || card.dataset.category === filter;
            if (match) {
                card.classList.remove('hidden');
                // Trigger reflow then fade in
                requestAnimationFrame(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                });
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                setTimeout(() => card.classList.add('hidden'), 300);
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
