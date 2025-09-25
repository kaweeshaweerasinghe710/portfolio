// Project data (no changes)
const projects = {
    1: {
        title: "E-commerce Platform",
        description: "A full-featured e-commerce platform built with React and Node.js. Features include user authentication, product catalog, shopping cart, payment integration with Stripe, and admin dashboard for managing products and orders.",
        image: "jewellery.jpeg",
        technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe API", "JWT", "Tailwind CSS"],
        liveLink: "#",
        githubLink: "#"
    },
    2: {
        title: "Task Management App",
        description: "A collaborative task management application with real-time updates. Users can create projects, assign tasks, set deadlines, and track progress. Features drag-and-drop functionality and team collaboration tools.",
        image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800",
        technologies: ["React", "Firebase", "Material-UI", "Socket.io", "Redux", "PWA"],
        liveLink: "#",
        githubLink: "#"
    },
    3: {
        title: "Weather Dashboard",
        description: "An interactive weather dashboard that provides current weather conditions, 7-day forecast, and weather maps. Features location-based weather data, favorite locations, and detailed weather analytics.",
        image: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800",
        technologies: ["JavaScript", "OpenWeather API", "Chart.js", "CSS3", "Geolocation API"],
        liveLink: "#",
        githubLink: "#"
    },
    4: {
        title: "Portfolio Website",
        description: "A responsive portfolio website showcasing projects and skills. Built with modern web technologies, features smooth animations, contact form integration, and optimized performance for all devices.",
        image: "https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg?auto=compress&cs=tinysrgb&w=800",
        technologies: ["HTML5", "CSS3", "JavaScript", "SCSS", "Responsive Design", "Performance Optimization"],
        liveLink: "#",
        githubLink: "#"
    },
    5: {
        title: "Restaurant Website",
        description: "A modern restaurant website with online reservation system, menu display, and customer reviews. Features include table booking, order management, and integration with social media platforms.",
        image: "rstuarant.jpeg",
        technologies: ["Vue.js", "PHP", "MySQL", "Bootstrap", "PayPal API", "Google Maps API"],
        liveLink: "#",
        githubLink: "#"
    },
    6: {
        title: "Fitness Tracker",
        description: "A comprehensive fitness tracking application that monitors workouts, nutrition, and progress. Features include workout planning, calorie tracking, progress charts, and social features for motivation.",
        image: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800",
        technologies: ["React Native", "Express.js", "PostgreSQL", "Chart.js", "Health APIs", "Push Notifications"],
        liveLink: "#",
        githubLink: "#"
    }
};

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('projectModal');
const closeModal = document.querySelector('.close');
const contactForm = document.getElementById('contactForm');

// Navigation functionality (No changes)
function initNavigation() {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            
            // Close mobile menu
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');

            // Scroll to the section
            document.getElementById(targetId).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Update active nav link
            updateActiveNavLink(targetId);
        });
    });

    // Button navigation
    document.querySelectorAll('.btn[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            if (targetId && document.getElementById(targetId)) {
                document.getElementById(targetId).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                updateActiveNavLink(targetId);
            }
        });
    });
}

function updateActiveNavLink(targetId) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${targetId}`) {
            link.classList.add('active');
        }
    });
}

// Portfolio modal functionality (no changes)
function initPortfolio() {
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            showProjectModal(projectId);
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function showProjectModal(projectId) {
    const project = projects[projectId];
    if (!project) return;

    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalDescription').textContent = project.description;
    document.getElementById('modalImage').src = project.image;
    document.getElementById('modalLiveLink').href = project.liveLink;
    document.getElementById('modalGithubLink').href = project.githubLink;

    const techContainer = document.getElementById('modalTechnologies');
    techContainer.innerHTML = '';
    project.technologies.forEach(tech => {
        const techTag = document.createElement('span');
        techTag.className = 'tech-tag';
        techTag.textContent = tech;
        techContainer.appendChild(techTag);
    });

    modal.style.display = 'block';
}

// Contact form functionality (no changes)
function initContactForm() {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        clearErrors();
        
        const formData = new FormData(contactForm);
        const errors = validateForm(formData);
        
        if (Object.keys(errors).length === 0) {
            showSuccessMessage();
            contactForm.reset();
        } else {
            showErrors(errors);
        }
    });

    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });
        
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });
}

function validateForm(formData) {
    const errors = {};
    const name = formData.get('name').trim();
    if (!name) {
        errors.name = 'Name is required';
    } else if (name.length < 2) {
        errors.name = 'Name must be at least 2 characters';
    }
    const email = formData.get('email').trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        errors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
        errors.email = 'Please enter a valid email';
    }
    const subject = formData.get('subject').trim();
    if (!subject) {
        errors.subject = 'Subject is required';
    } else if (subject.length < 5) {
        errors.subject = 'Subject must be at least 5 characters';
    }
    const message = formData.get('message').trim();
    if (!message) {
        errors.message = 'Message is required';
    } else if (message.length < 10) {
        errors.message = 'Message must be at least 10 characters';
    }
    return errors;
}

function validateField(field) {
    const formData = new FormData();
    formData.set(field.name, field.value);
    const errors = validateForm(formData);
    const errorElement = field.nextElementSibling;
    
    if (errors[field.name]) {
        field.classList.add('error');
        errorElement.textContent = errors[field.name];
    } else {
        field.classList.remove('error');
        errorElement.textContent = '';
    }
}

function clearErrors() {
    const errorElements = contactForm.querySelectorAll('.error-message');
    const inputElements = contactForm.querySelectorAll('input, textarea');
    
    errorElements.forEach(el => el.textContent = '');
    inputElements.forEach(el => el.classList.remove('error'));
}

function showErrors(errors) {
    Object.keys(errors).forEach(fieldName => {
        const field = contactForm.querySelector(`[name="${fieldName}"]`);
        const errorElement = field.nextElementSibling;
        field.classList.add('error');
        errorElement.textContent = errors[fieldName];
    });
}

function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = `
        background: #10B981;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        text-align: center;
        font-weight: 500;
    `;
    successDiv.textContent = 'Thank you! Your message has been sent successfully.';
    
    contactForm.parentNode.insertBefore(successDiv, contactForm);
    
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Intersection Observer for Animations
function initAnimations() {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Initialize all functionality
function init() {
    initNavigation();
    initPortfolio();
    initContactForm();
    initAnimations();
    
    // Set up scroll listener for active nav link
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });
        updateActiveNavLink(current);
    });
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', init);

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});