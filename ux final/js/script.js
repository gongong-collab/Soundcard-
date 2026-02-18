
// Performances HTML Script (YouTube Version with Transitions)
document.addEventListener('DOMContentLoaded', function() {
// ==========================================================
//  1. LOADER LOGIC 
// ==========================================================
const loader = document.getElementById('loader');

if (loader) {
    const pageLoadPromise = new Promise(resolve => {
        window.addEventListener('load', resolve);
    });
    
    const minTimePromise = new Promise(resolve => {
        setTimeout(resolve, 1000); // 2-second minimum
    });

    // Wait for BOTH promises to finish
    Promise.all([pageLoadPromise, minTimePromise]).then(() => {
        // First, trigger the fade-out animation
        loader.classList.add('hidden');

        // After the animation finishes (750ms), set display to none
        setTimeout(() => {
            loader.style.display = 'none';
        }, 750); // This time MUST match the transition duration in your CSS
    });
}
    // Safety Check: Make sure we are on the right page
    const playerFrame = document.getElementById('video-player-frame');
    if (!playerFrame) {
        return; // Exit if the player frame isn't on this page
    }

    // 1. Data for our performances
    const performances = [
        { title: 'Spectrum NYP Arts Festival', description: "As a featured act in Spectrum, NYP's largest annual arts festival 🎨, we had the honor of performing on the main stage. It was an incredible celebration showcasing the diverse creative talent from across the campus! ✨🙌", image: 'images/performance1.jpg', youtubeId: '9LM7h5Ac7WE' },
        { title: 'SoundCard Annual Production', description: 'Our biggest night of the year! 🏆 The annual production took the audience on a musical journey through different eras and genres 💫, from classic jazz 🎷 to modern pop hits 🎤, performed by our talented members and returning alumni.', image: 'images/performance2.jpg', youtubeId: '0QBVRlFPXl4' },
        { title: 'My Countdown', description: 'We ushered in the New Year with a bang! 🎆 This special countdown event was a night filled with incredible music, fun memories, and the promise of new beginnings. ✨', image: 'images/performance3.jpg', youtubeId: '0QBVRlFPXl4' },
        { title: 'NYP Got Talent', description: "Putting our vocal skills to the ultimate test! 🤩 We were thrilled to have our members compete in NYP's biggest talent showdown, going head-to-head with the best performers on campus. A nerve-wracking but amazing experience! 🎤", image: 'images/performance4.jpg', youtubeId: '2g8pjNOo-Xw' }
    ];

    // 2. Find the HTML elements we need
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');
    const playButton = document.getElementById('play-pause-btn');
    const performanceTitle = document.getElementById('performance-title');
    const performanceDescription = document.getElementById('performance-description');
    
    // NEW: An array of all elements we want to animate
    const contentToAnimate = [playerFrame, performanceTitle, performanceDescription];

    // 3. Keep track of the current item
    let currentIndex = 0;

    // 4. MODIFIED function to update the display WITH a transition
    function updatePerformance() {
        // --- FADE OUT ---
        contentToAnimate.forEach(el => el.classList.add('fade-out'));
        
        // --- WAIT for the fade-out to finish ---
        setTimeout(() => {
            // --- UPDATE the content while it's invisible ---
            const currentPerformance = performances[currentIndex];
            
            performanceTitle.textContent = currentPerformance.title;
            performanceDescription.textContent = currentPerformance.description;
            playerFrame.innerHTML = `<img src="${currentPerformance.image}" class="img-fluid" alt="${currentPerformance.title}">`;
            playButton.style.display = 'flex';

            // --- FADE IN the new content ---
            contentToAnimate.forEach(el => el.classList.remove('fade-out'));
        }, 300); // This time MUST match your CSS transition-duration (0.3s)
    }

    // 5. playVideo function (This function does not need to change)
    function playVideo() {
        const currentPerformance = performances[currentIndex];
        const youtubeEmbedUrl = `https://www.youtube.com/embed/${currentPerformance.youtubeId}?autoplay=1&rel=0`;
        playerFrame.innerHTML = `<iframe src="${youtubeEmbedUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        playButton.style.display = 'none';
    }

    // 6. Event listeners (The logic inside has been slightly simplified)
    nextButton.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % performances.length;
        updatePerformance(); // Call the updated function
    });

    prevButton.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + performances.length) % performances.length;
        updatePerformance(); // Call the updated function
    });

    playButton.addEventListener('click', playVideo);

    // 7. Initial load (no transition needed here)
    const firstPerformance = performances[currentIndex];
    performanceTitle.textContent = firstPerformance.title;
    performanceDescription.textContent = firstPerformance.description;
    playerFrame.innerHTML = `<img src="${firstPerformance.image}" class="img-fluid" alt="${firstPerformance.title}">`;
});

// js/script.js

// --- SIMPLER PARALLAX EFFECT ---
document.addEventListener("DOMContentLoaded", function() {

    // 1. Find the element we want to move
    const bg = document.querySelector('.parallax-background');

    // 2. A safety check: if the element doesn't exist on this page, do nothing.
    if (!bg) {
        return; 
    }

    // 3. Set how fast the background should move. 0.4 means 40% of the scroll speed.
    const speed = 0.4;

    // 4. Listen for when the user scrolls the page
    window.addEventListener('scroll', function() {
        
        // 5. Get the number of pixels the user has scrolled from the top
        const yPos = window.pageYOffset;

        // 6. Calculate the background's new vertical position
        const newY = yPos * speed;

        // 7. Apply the new position to the background element using CSS
        bg.style.transform = `translateY(${newY}px)`;
    });
});


// js/script.js

document.addEventListener("DOMContentLoaded", function() {

    // --- WORKSHOP FORM SUBMISSION SCRIPT ---
    
    // Find all the workshop forms on the page
    const workshopForms = document.querySelectorAll('.workshop-signup-form form');
    
    // Find the modal element we created in the HTML
    const confirmationModalElement = document.getElementById('confirmationModal');
    
    // Safety check: only run this code if the forms and modal exist
    if (workshopForms.length > 0 && confirmationModalElement) {
        
        // Create a Bootstrap Modal instance from our element
        const confirmationModal = new bootstrap.Modal(confirmationModalElement);

        // Loop through each form and add a 'submit' event listener
        workshopForms.forEach(form => {
            form.addEventListener('submit', function(event) {
                
                // 1. Prevent the default form submission (which navigates to another page)
                event.preventDefault();
                
                // 2. Show our confirmation pop-up
                confirmationModal.show();
                
                // 3. Reset the form fields so it's clean for the next use
                form.reset();
            });
        });
    }

    // ... your other scripts for parallax, etc. can go here ...
});



