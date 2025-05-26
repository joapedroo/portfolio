const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        const whatsappText = `Olá João Pedro!\n\n*Nome:* ${name}\n*Email:* ${email}\n*Assunto:* ${subject}\n\n*Mensagem:*\n${message}\n\n(Enviado através do seu portfólio)`;
        
        const encodedMessage = encodeURIComponent(whatsappText);
        
        const whatsappNumber = '5583999175098';
        
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        window.open(whatsappLink, '_blank');
        
        contactForm.reset();
    });
}

const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const siteLogo = document.getElementById('siteLogo');
const atsLogo = document.getElementById('atsLogo');

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    
    themeToggle.innerHTML = newTheme === 'dark' 
        ? '<i class="fas fa-moon"></i>' 
        : '<i class="fas fa-sun"></i>';
    
    const logoPath = newTheme === 'dark' ? "assets/image/logo.png" : "assets/image/logo1.png";
    siteLogo.src = logoPath;
    atsLogo.src = logoPath;
    
    localStorage.setItem('theme', newTheme);
});

const savedTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', savedTheme);

themeToggle.innerHTML = savedTheme === 'dark' 
    ? '<i class="fas fa-moon"></i>' 
    : '<i class="fas fa-sun"></i>';

const initialLogoPath = savedTheme === 'dark' ? "assets/image/logo.png" : "assets/image/logo1.png";
siteLogo.src = initialLogoPath;
atsLogo.src = initialLogoPath;


const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(element => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

particlesJS('particles-js', {
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": getComputedStyle(document.documentElement).getPropertyValue('--particle-color').trim()
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            }
        },
        "opacity": {
            "value": 0.5,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": getComputedStyle(document.documentElement).getPropertyValue('--particle-color').trim(),
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "grab"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 140,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});

document.body.addEventListener('themeChanged', function() {
    const particles = window.pJSDom[0].pJS;
    particles.particles.color.value = getComputedStyle(document.documentElement).getPropertyValue('--particle-color').trim();
    particles.particles.line_linked.color = getComputedStyle(document.documentElement).getPropertyValue('--particle-color').trim();
    particles.fn.particlesRefresh();
});

const originalSetAttribute = Element.prototype.setAttribute;
Element.prototype.setAttribute = function(name, value) {
    originalSetAttribute.apply(this, arguments);
    if (name === 'data-theme') {
        document.body.dispatchEvent(new CustomEvent('themeChanged'));
    }
};
