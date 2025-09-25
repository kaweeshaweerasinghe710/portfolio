// Project data
const projects = {
    1: {
        title: "E-commerce Platform",
        description: "A full-featured e-commerce platform built with React and Node.js. Features include user authentication, product catalog, shopping cart, payment integration with Stripe, and admin dashboard for managing products and orders.",
        image: "https://images.pexels.com/photos/326505/pexels-photo-326505.jpeg?auto=compress&cs=tinysrgb&w=800",
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
        image: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpg?auto=compress&cs=tinysrgb&w=800",
        technologies: ["Vue.js", "PHP", "MySQL", "Bootstrap", "PayPal API", "Google Maps API"],
        liveLink: "#",
        githubLink: "#"
    },
    
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

// Navigation functionality
function initNavigation() {
    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            showSection(targetId);
            
            // Update active nav link
            navLinks.forEach(nl => nl.classList.remove('active'));
            link.classList.add('active');
            
            // Close mobile menu
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Button navigation
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            if (targetId && document.getElementById(targetId)) {
                showSection(targetId);
                updateActiveNavLink(targetId);
            }
        });
    });
}

function showSection(targetId) {
    // Hide all sections
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

function updateActiveNavLink(targetId) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${targetId}`) {
            link.classList.add('active');
        }
    });
}

// Portfolio modal functionality
function initPortfolio() {
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            showProjectModal(projectId);
        });
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function showProjectModal(projectId) {
    const project = projects[projectId];
    if (!project) return;

    // Update modal content
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalDescription').textContent = project.description;
    document.getElementById('modalImage').src = project.image;
    document.getElementById('modalLiveLink').href = project.liveLink;
    document.getElementById('modalGithubLink').href = project.githubLink;

    // Update technologies
    const techContainer = document.getElementById('modalTechnologies');
    techContainer.innerHTML = '';
    project.technologies.forEach(tech => {
        const techTag = document.createElement('span');
        techTag.className = 'tech-tag';
        techTag.textContent = tech;
        techContainer.appendChild(techTag);
    });

    // Show modal
    modal.style.display = 'block';
}

// Contact form functionality

function initContactForm() {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors();
        
        // Validate form
        const formData = new FormData(contactForm);
        const errors = validateForm(formData);
        
        if (Object.keys(errors).length === 0) {
            // ✅ Send via EmailJS
            const SERVICE_ID = "service_kja4ii4";    // replace with your EmailJS service ID
            const TEMPLATE_ID = "template_emdhsap";  // replace with your EmailJS template ID
            const PUBLIC_KEY = "ji6zAfcJWUmLTJsRp";    // replace with your EmailJS public key

            emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, contactForm, PUBLIC_KEY)
              .then(() => {
                  showSuccessMessage();  // your existing success popup
                  contactForm.reset();
              })
              .catch(() => {
                  alert("❌ Failed to send. Please try again.");
              });
        } else {
            // Show errors
            showErrors(errors);
        }
    });

    // Real-time validation
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
    
    // Name validation
    const name = formData.get('name').trim();
    if (!name) {
        errors.name = 'Name is required';
    } else if (name.length < 2) {
        errors.name = 'Name must be at least 2 characters';
    }
    
    // Email validation
    const email = formData.get('email').trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        errors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
        errors.email = 'Please enter a valid email';
    }
    
    
    
    // Message validation
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
    // Create success message
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
    
    // Insert before form
    contactForm.parentNode.insertBefore(successDiv, contactForm);
    
    // Remove after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize all functionality
function init() {
    initNavigation();
    initPortfolio();
    initContactForm();
    initSmoothScrolling();
    
    // Show home section by default
    showSection('home');
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', init);

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add loading states and animations
function addLoadingAnimations() {
    // Add fade-in animation to sections when they become active
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all sections
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Initialize animations after DOM load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(addLoadingAnimations, 100);
});