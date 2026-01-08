// ============================================
// AUTO CARE - JAVASCRIPT
// ============================================

// ============================================
// HAMBURGER MENU TOGGLE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const dropdowns = navMenu ? navMenu.querySelectorAll('.nav-dropdown') : [];

    // Function to close the menu
    function closeMenu() {
        if (hamburger) {
            hamburger.classList.remove('active');
        }
        if (navMenu) {
            navMenu.classList.remove('active');
        }
        dropdowns.forEach(drop => drop.classList.remove('open'));
    }

    // Function to toggle the menu
    function toggleMenu() {
        if (hamburger && navMenu) {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        }
    }

    if (hamburger && navMenu) {
        // Toggle menu when clicking hamburger
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });

        // Close menu when clicking on any navigation link (including Book Now button)
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Allow the link to navigate, but close the menu
                closeMenu();
            });
        });

        // Dropdown toggle for mobile/tablet
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            if (toggle) {
                toggle.addEventListener('click', function(e) {
                    if (window.innerWidth <= 1024) {
                        e.preventDefault();
                        dropdowns.forEach(d => {
                            if (d !== dropdown) d.classList.remove('open');
                        });
                        dropdown.classList.toggle('open');
                    }
                });
            }
        });

        // Specifically target the Book Now button to ensure it closes the menu
        const bookNowButton = navMenu.querySelector('.btn-book');
        if (bookNowButton) {
            bookNowButton.addEventListener('click', function(e) {
                closeMenu();
            });
        }

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (navMenu && navMenu.classList.contains('active')) {
                if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                    closeMenu();
                }
            }
        });

        // Close menu on window resize (optional - helps with responsive behavior)
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth > 1024) {
                    closeMenu();
                }
            }, 250);
        });
    }
});

// ============================================
// REVIEWS SLIDER
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const reviewsSlider = document.getElementById('reviewsSlider');
    const prevBtn = document.getElementById('prevReview');
    const nextBtn = document.getElementById('nextReview');
    const reviewDots = document.getElementById('reviewDots');

    if (reviewsSlider && prevBtn && nextBtn) {
        const reviewCards = reviewsSlider.querySelectorAll('.review-card');
        let currentIndex = 0;

        // Create dots
        if (reviewDots && reviewCards.length > 0) {
            reviewCards.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.className = 'dot' + (index === 0 ? ' active' : '');
                dot.addEventListener('click', () => goToSlide(index));
                reviewDots.appendChild(dot);
            });
        }

        function showSlide(index) {
            reviewCards.forEach((card, i) => {
                card.classList.toggle('active', i === index);
            });

            // Update dots
            const dots = reviewDots?.querySelectorAll('.dot');
            if (dots) {
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });
            }
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % reviewCards.length;
            showSlide(currentIndex);
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + reviewCards.length) % reviewCards.length;
            showSlide(currentIndex);
        }

        function goToSlide(index) {
            currentIndex = index;
            showSlide(currentIndex);
        }

        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        // Auto-play slider
        let autoPlayInterval = setInterval(nextSlide, 5000);

        // Pause on hover
        if (reviewsSlider) {
            reviewsSlider.addEventListener('mouseenter', () => {
                clearInterval(autoPlayInterval);
            });

            reviewsSlider.addEventListener('mouseleave', () => {
                autoPlayInterval = setInterval(nextSlide, 5000);
            });
        }
    }
});

// ============================================
// GALLERY FILTER
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.classList.remove('hide');
                        item.style.animation = 'fadeIn 0.5s ease';
                    } else {
                        item.classList.add('hide');
                    }
                });
            });
        });
    }
});

// ============================================
// BOOKING FORM
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    const appointmentDate = document.getElementById('appointmentDate');
    const serviceType = document.getElementById('serviceType');
    const summaryService = document.getElementById('summaryService');
    const summaryDate = document.getElementById('summaryDate');
    const summaryTime = document.getElementById('summaryTime');

    // Set minimum date to today
    if (appointmentDate) {
        const today = new Date().toISOString().split('T')[0];
        appointmentDate.setAttribute('min', today);
    }

    // Update summary on form change
    function updateSummary() {
        if (serviceType && summaryService) {
            const selectedService = serviceType.options[serviceType.selectedIndex]?.text || '-';
            summaryService.textContent = selectedService;
        }

        if (appointmentDate && summaryDate) {
            const date = appointmentDate.value;
            if (date) {
                const formattedDate = new Date(date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                summaryDate.textContent = formattedDate;
            } else {
                summaryDate.textContent = '-';
            }
        }

        const timeSelect = document.getElementById('appointmentTime');
        if (timeSelect && summaryTime) {
            const selectedTime = timeSelect.options[timeSelect.selectedIndex]?.text || '-';
            summaryTime.textContent = selectedTime;
        }
    }

    if (serviceType) {
        serviceType.addEventListener('change', updateSummary);
    }

    if (appointmentDate) {
        appointmentDate.addEventListener('change', updateSummary);
    }

    const timeSelect = document.getElementById('appointmentTime');
    if (timeSelect) {
        timeSelect.addEventListener('change', updateSummary);
    }

    // Handle form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(bookingForm);
            const data = Object.fromEntries(formData);

            // Show success message (in a real application, this would send data to a server)
            alert('Booking confirmed! You will receive a confirmation email shortly.\n\n' +
                  'Service: ' + (serviceType?.options[serviceType.selectedIndex]?.text || '') + '\n' +
                  'Date: ' + (appointmentDate?.value || '') + '\n' +
                  'Time: ' + (timeSelect?.options[timeSelect.selectedIndex]?.text || ''));

            // Reset form
            bookingForm.reset();
            updateSummary();
        });
    }
});

// ============================================
// CONTACT FORM
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Show success message (in a real application, this would send data to a server)
            alert('Thank you for your message! We will get back to you soon.');

            // Reset form
            contactForm.reset();
        });
    }
});

// ============================================
// NEWSLETTER FORM
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForms = document.querySelectorAll('#newsletterForm');

    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput?.value;

            if (email) {
                // Show success message (in a real application, this would send data to a server)
                alert('Thank you for subscribing! You will receive our newsletter at ' + email);
                emailInput.value = '';
            }
        });
    });
});

// ============================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#' || href === '') {
                return;
            }

            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Account for sticky navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ============================================
// SCROLL TO TOP BUTTON (Optional Enhancement)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Create scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        z-index: 999;
        transition: all 0.3s ease;
    `;

    document.body.appendChild(scrollTopBtn);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    // Scroll to top on click
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effect
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.4)';
    });

    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
    });
});

// ============================================
// LAZY LOADING IMAGES (Performance Enhancement)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

// ============================================
// FORM VALIDATION ENHANCEMENTS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');

    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            // Remove non-numeric characters except +, -, (, ), and spaces
            this.value = this.value.replace(/[^\d+\-() ]/g, '');
        });
    });

    const emailInputs = document.querySelectorAll('input[type="email"]');

    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            const email = this.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && !emailRegex.test(email)) {
                this.style.borderColor = '#dc3545';
                this.setCustomValidity('Please enter a valid email address');
            } else {
                this.style.borderColor = '#ddd';
                this.setCustomValidity('');
            }
        });
    });
});

// ============================================
// ANIMATION ON SCROLL (Optional Enhancement)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        const animateObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                    animateObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        // Observe elements that should animate on scroll
        const animateElements = document.querySelectorAll('.service-card, .highlight-card, .blog-card, .testimonial-card, .team-card');
        animateElements.forEach(el => {
            el.style.opacity = '0';
            animateObserver.observe(el);
        });
    }
});

// ============================================
// ADMIN DASHBOARD FUNCTIONALITY
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Sidebar Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const adminSidebar = document.getElementById('adminSidebar');

    if (mobileMenuToggle && adminSidebar) {
        mobileMenuToggle.addEventListener('click', function() {
            adminSidebar.classList.add('active');
        });
    }

    if (sidebarToggle && adminSidebar) {
        sidebarToggle.addEventListener('click', function() {
            adminSidebar.classList.remove('active');
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 1024 && adminSidebar) {
            if (!adminSidebar.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                adminSidebar.classList.remove('active');
            }
        }
    });

    // Section Navigation
    const navItems = document.querySelectorAll('.nav-item');
    const adminSections = document.querySelectorAll('.admin-section');
    const pageTitle = document.querySelector('.page-title');

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');

            // Remove active class from all nav items and sections
            navItems.forEach(nav => nav.classList.remove('active'));
            adminSections.forEach(section => section.classList.remove('active'));

            // Add active class to clicked nav item
            this.classList.add('active');

            // Show corresponding section
            const section = document.getElementById(targetSection);
            if (section) {
                section.classList.add('active');
            }

            // Update page title
            if (pageTitle) {
                const titles = {
                    'dashboard': 'Dashboard',
                    'bookings': 'Bookings',
                    'customers': 'Customers',
                    'services': 'Services',
                    'reviews': 'Reviews',
                    'settings': 'Settings'
                };
                pageTitle.textContent = titles[targetSection] || 'Dashboard';
            }

            // Close sidebar on mobile after navigation
            if (window.innerWidth <= 1024 && adminSidebar) {
                adminSidebar.classList.remove('active');
            }
        });
    });

    // Handle hash navigation on page load
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const navItem = document.querySelector(`.nav-item[data-section="${hash}"]`);
        if (navItem) {
            navItem.click();
        }
    }

    // Table row selection
    const tableCheckboxes = document.querySelectorAll('.admin-table tbody input[type="checkbox"]');
    tableCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const row = this.closest('tr');
            if (this.checked) {
                row.style.backgroundColor = '#f0f7ff';
            } else {
                row.style.backgroundColor = '';
            }
        });
    });

    // Select all checkbox functionality
    const selectAllCheckboxes = document.querySelectorAll('.admin-table thead input[type="checkbox"]');
    selectAllCheckboxes.forEach(selectAll => {
        selectAll.addEventListener('change', function() {
            const table = this.closest('table');
            const rowCheckboxes = table.querySelectorAll('tbody input[type="checkbox"]');
            rowCheckboxes.forEach(cb => {
                cb.checked = this.checked;
                const row = cb.closest('tr');
                if (this.checked) {
                    row.style.backgroundColor = '#f0f7ff';
                } else {
                    row.style.backgroundColor = '';
                }
            });
        });
    });

    // Action button handlers
    const actionButtons = document.querySelectorAll('.btn-icon');
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const action = this.getAttribute('title') || this.querySelector('i').className;
            
            // In a real application, these would trigger modals or API calls
            if (action.includes('Delete') || action.includes('trash')) {
                if (confirm('Are you sure you want to delete this item?')) {
                    // Delete functionality would go here
                    console.log('Delete action triggered');
                }
            } else if (action.includes('Edit') || action.includes('edit')) {
                // Edit functionality would go here
                console.log('Edit action triggered');
            } else if (action.includes('View') || action.includes('eye')) {
                // View functionality would go here
                console.log('View action triggered');
            }
        });
    });

    // Settings form submission
    const settingsForms = document.querySelectorAll('.settings-form');
    settingsForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Settings saved successfully!');
            // In a real application, this would send data to a server
        });
    });

    // Review approval/rejection
    const reviewActionButtons = document.querySelectorAll('.review-actions .btn');
    reviewActionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.textContent.trim();
            const reviewCard = this.closest('.review-admin-card');
            
            if (action.includes('Approve')) {
                if (confirm('Approve this review?')) {
                    reviewCard.style.opacity = '0.5';
                    alert('Review approved!');
                }
            } else if (action.includes('Reject')) {
                if (confirm('Reject this review?')) {
                    reviewCard.style.display = 'none';
                    alert('Review rejected!');
                }
            }
        });
    });

    // Period select change handler
    const periodSelects = document.querySelectorAll('.period-select');
    periodSelects.forEach(select => {
        select.addEventListener('change', function() {
            // In a real application, this would update the chart data
            console.log('Period changed to:', this.value);
        });
    });

    // Filter application
    const filterButtons = document.querySelectorAll('.filters-bar .btn');
    filterButtons.forEach(button => {
        if (button.textContent.includes('Apply')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                // In a real application, this would filter the table data
                alert('Filters applied!');
            });
        }
    });

    // Logout functionality
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to logout?')) {
                // In a real application, this would clear session and redirect
                window.location.href = 'index.html';
            }
        });
    }
});


