document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor with performance optimization
    const cursor = document.querySelector('.cursor');
    let cursorRequestId;
    let cursorX = 0;
    let cursorY = 0;
    let currentCursorX = 0;
    let currentCursorY = 0;
    
    document.addEventListener('mousemove', function(e) {
        cursorX = e.clientX;
        cursorY = e.clientY;
        
        if (!cursorRequestId) {
            cursorRequestId = requestAnimationFrame(updateCursor);
        }
    });
    
    function updateCursor() {
        currentCursorX += (cursorX - currentCursorX) * 0.2;
        currentCursorY += (cursorY - currentCursorY) * 0.2;
        
        cursor.style.transform = `translate(${currentCursorX}px, ${currentCursorY}px)`;
        
        cursorRequestId = requestAnimationFrame(updateCursor);
    }
    
    document.addEventListener('mousedown', function() {
        cursor.classList.add('click');
        playMeowSound();
    });
    
    document.addEventListener('mouseup', function() {
        cursor.classList.remove('click');
    });
    
    // Reduced number of floating cats for better performance
    const floatingCats = document.querySelector('.floating-cats');
    const catImages = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png'];
    
    // Reduced from 10 to 5 cats
    for (let i = 0; i < 5; i++) {
        const cat = document.createElement('div');
        cat.classList.add('floating-cat');
        cat.style.backgroundImage = `url(${catImages[i % catImages.length]})`;
        cat.style.left = `${Math.random() * 100}%`;
        cat.style.animationDuration = `${20 + Math.random() * 10}s`; // Slower animations
        cat.style.animationDelay = `${Math.random() * 5}s`;
        floatingCats.appendChild(cat);
    }
    
    // Reduced number of floating heads
    const floatingHeads = document.querySelector('.floating-heads');
    
    // Reduced from 15 to 6 heads
    for (let i = 0; i < 6; i++) {
        const head = document.createElement('div');
        head.classList.add('floating-head');
        head.style.backgroundImage = `url(${catImages[i % catImages.length]})`;
        head.style.left = `${Math.random() * 100}%`;
        head.style.top = `${Math.random() * 100}%`;
        head.style.animationDuration = `${15 + Math.random() * 5}s`; // More consistent timing
        head.style.animationDelay = `${Math.random() * 5}s`;
        floatingHeads.appendChild(head);
    }
    
    // Get Stuck popup
    const stuckButton = document.getElementById('stuckButton');
    const stuckPopup = document.getElementById('stuckPopup');
    const closePopup = document.querySelector('.close-popup');
    
    stuckButton.addEventListener('click', function() {
        stuckPopup.classList.add('active');
    });
    
    closePopup.addEventListener('click', function() {
        stuckPopup.classList.remove('active');
    });
    
    // Close popup when clicking outside
    stuckPopup.addEventListener('click', function(e) {
        if (e.target === stuckPopup) {
            stuckPopup.classList.remove('active');
        }
    });
    
    // Sound control - optimized to use less resources
    const soundToggle = document.getElementById('soundToggle');
    const bgMusic = document.getElementById('bgMusic');
    const meowSound = document.getElementById('meowSound');
    let soundEnabled = false;
    
    soundToggle.addEventListener('click', function() {
        if (bgMusic.paused) {
            bgMusic.volume = 0.5; // Reduced volume
            bgMusic.play().catch(() => {
                console.log('Audio playback was prevented by the browser');
            });
            soundToggle.classList.add('sound-active');
            soundEnabled = true;
        } else {
            bgMusic.pause();
            soundToggle.classList.remove('sound-active');
            soundEnabled = false;
        }
    });
    
    function playMeowSound() {
        if (!soundEnabled) return;
        
        meowSound.currentTime = 0;
        meowSound.volume = 0.4; // Reduced volume
        meowSound.play().catch(() => {});
    }
    
    // Twitter button meow sound - using event delegation to improve performance
    document.addEventListener('mouseenter', function(e) {
        if (e.target.closest('.twitter-button, .footer-twitter')) {
            playMeowSound();
        }
    }, true);
    
    // Optimized scroll handling - using throttled approach with requestAnimationFrame
    let ticking = false;
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        lastScrollY = window.scrollY;
        
        if (!ticking) {
            requestAnimationFrame(function() {
                // We don't actually modify the scroll position anymore
                // This removes the elastic scrolling that was causing performance issues
                ticking = false;
            });
            
            ticking = true;
        }
    }, { passive: true }); // Using passive event listener for better performance
    
    // Simplified card hover effects to improve performance
    const storyCards = document.querySelectorAll('.story-card');
    
    storyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Using simpler transform for better performance
            card.style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'scale(1)';
        });
    });
}); 