   document.addEventListener('DOMContentLoaded', function() {
        // Navbar scroll effect
        const header = document.querySelector('header');
        const logo = document.querySelector('.logo');
        const nav = document.querySelector('nav');
        const navLinks = document.querySelector('.nav-links');
        const btn = document.querySelector('.btn');
        
        // Set initial state (compressed)
        header.classList.remove('scrolled');
        logo.classList.remove('scrolled');
        nav.classList.remove('scrolled');
        navLinks.classList.remove('scrolled');
        if (btn) btn.classList.remove('scrolled');
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                // Expanded state when scrolled
                header.classList.add('scrolled');
                logo.classList.add('scrolled');
                nav.classList.add('scrolled');
                navLinks.classList.add('scrolled');
                if (btn) btn.classList.add('scrolled');
            } else {
                // Compressed state at top
                header.classList.remove('scrolled');
                logo.classList.remove('scrolled');
                nav.classList.remove('scrolled');
                navLinks.classList.remove('scrolled');
                if (btn) btn.classList.remove('scrolled');
            }
        });
        
        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu');
        
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', function() {
                navLinks.classList.toggle('active');
                mobileMenuBtn.classList.toggle('active');
            });
        }
    });
