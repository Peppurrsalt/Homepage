$(document).ready(function() {
    // Toggle dark mode on body and boxes
    $('.dark-btn').click(function() {
        $('body').toggleClass('dark');
        $('.box').toggleClass('dark');
    });

    // Toggle spin animation on boxes
    $('.spin-btn').click(function() {
        $('.box').toggleClass('spin');
    });

    // Reveal the chair (makes it visible)
    $('.reveal-btn').click(function() {
        // $('.chair').addClass('reveal');
        // $('.chair').css('display', 'block');
        $('.chair').show();
        $('.reveal-btn').hide();
    });
});

$('.draggable').draggable({ snap: true,
containment: '.container',
scroll: false
stack: '.draggable'

});