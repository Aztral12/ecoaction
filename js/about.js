// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Handle "Read More" links from index page
document.addEventListener('DOMContentLoaded', function() {
    // Check if there's a hash in the URL (from index page "Read More" links)
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            // Scroll to the target section after a short delay to ensure page is fully loaded
            setTimeout(function() {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }, 500);
        }
    }
});