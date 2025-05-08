
$(document).ready(function() {
    // Form submission
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        
        // In a real implementation, you would send the form data to a server
        // For this demo, we'll just show the success message
        $('#success-message').fadeIn();
        
        // Reset form
        $('#contact-form')[0].reset();
        
        // Hide success message after 5 seconds
        setTimeout(function() {
            $('#success-message').fadeOut();
        }, 5000);
    });
    
    // FAQ Accordion
    $('.accordion-header').on('click', function() {
        // Toggle active class on content
        $(this).next('.accordion-content').toggleClass('active');
        
        // Toggle icon
        const icon = $(this).find('i');
        if (icon.hasClass('fa-plus')) {
            icon.removeClass('fa-plus').addClass('fa-minus');
        } else {
            icon.removeClass('fa-minus').addClass('fa-plus');
        }
    });
});
