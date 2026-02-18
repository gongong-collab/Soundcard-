
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
  




// =========================
//HERO IMAGE ROTATION LOGIC
//================================

const heroSection = document.querySelector('.hero-section');

if (heroSection) { // Only run if on the page with the hero section
    const images = [
        'images/singer-background.jpeg',
        'images/singer-background2.jpg'
        // Add more images here if you want
    ];
    let currentImageIndex = 0;

    function changeBackgroundImage() {
        // Construct the URL using the CURRENT image index.
        const newImageUrl = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${images[currentImageIndex]}')`;
        
        // Apply the new background image to the hero section.
        heroSection.style.backgroundImage = newImageUrl;

        // IMPORTANT: Increment the index AFTER setting the image, so it's ready for the NEXT rotation.
        currentImageIndex = (currentImageIndex + 1) % images.length;
    }

    // 1. Set the very first image immediately when the page loads.
    changeBackgroundImage();

    // 2. Start the rotation interval. The first change will happen after 5 seconds.
    setInterval(changeBackgroundImage, 5000);
}



    // ================================
    //  END OF HERO IMAGE ROTATION LOGIC
    //================================


    // ================================
    //  COUNTDOWN TIMER LOGIC
    //================================
    const timerContainer = document.getElementById('timer-container');
    if (timerContainer) { // Only run if on the page with the countdown
        const workshopDate = new Date("Aug 16, 2025 14:00:00").getTime();
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        const countdownInterval = setInterval(function() {
            const now = new Date().getTime();
            const distance = workshopDate - now;
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            function formatTime(time) { return time < 10 ? `0${time}` : time; }

            if (daysEl) daysEl.innerHTML = formatTime(days);
            if (hoursEl) hoursEl.innerHTML = formatTime(hours);
            if (minutesEl) minutesEl.innerHTML = formatTime(minutes);
            if (secondsEl) secondsEl.innerHTML = formatTime(seconds);

            if (distance < 0) {
                clearInterval(countdownInterval);
                timerContainer.innerHTML = "<h3 class='w-100'>The Workshop has started!</h3>";
            }
        }, 1000);
    }
    
    // ================================
    //  END OF COUNTDOWN TIMER LOGIC
    //================================



    // ================================
    //  WORKSHOP PREVIEW HOVER LOGIC
    //================================
    const workshopContainer = document.querySelector('.workshop-preview-container');
    if(workshopContainer){ // Only run if the preview element exists
        const workshopPopup = document.querySelector('.workshop-popup-card');
        if (workshopPopup) { // Add a check for the popup too, just in case
            workshopContainer.addEventListener('mouseenter', () => workshopPopup.classList.add('visible'));
            workshopContainer.addEventListener('mouseleave', () => workshopPopup.classList.remove('visible'));
        }
    }

    // ================================
    //  END OF WORKSHOP PREVIEW HOVER LOGIC
    //================================




    // ==================================
    // MEMBERSHIP FORM VALIDATION LOGIC 
    //=================================

    const membershipForm = document.getElementById('membership-form');
     if (membershipForm){ // Exit if the form doesn't exist on this page

    // Get references to all the input fields
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const birthDate = document.getElementById('birthDate');
    const gender = document.getElementById('gender');
    const phoneNumber = document.getElementById('phoneNumber');
    const email = document.getElementById('email');

    // Get references to the modal and its components
    const successModal = new bootstrap.Modal(document.getElementById('submissionModal'));
    const modalTitle = document.getElementById('submissionModalLabel');
    const summaryContainer = document.getElementById('submission-summary');
    const successMessage = document.getElementById('success-message');
    const editBtn = document.getElementById('modal-edit-btn');
    const confirmBtn = document.getElementById('modal-confirm-btn');
    const okBtn = document.getElementById('modal-ok-btn');


    /*=================
        Functions
    ===================*/


    // Function to validate ALL fields at once (used on final submit)
    function validateAllFields() {
        let isFormValid = true;
        fieldsToValidate.forEach(field => {  
        //must use a callback function    " => "   instead of normal function because addEventListener 
        // is designed to take a function as its instruction for what to do when an event happens in the future

            // If any single field fails validation, the whole form is invalid
            if (!validateField(field)) {
                isFormValid = false;
            }
        });
        return isFormValid;
    }

    // Function to display the summary in the modal
    function displaySummary() {
        summaryContainer.innerHTML = `
            <p>Please review your information before submitting:</p>
            <ul class="summary-list">
                <li><strong>First Name:</strong> ${firstName.value}</li>
                <li><strong>Last Name:</strong> ${lastName.value}</li>
                <li><strong>Birth Date:</strong> ${birthDate.value}</li>
                <li><strong>Gender:</strong> ${gender.options[gender.selectedIndex].text}</li>
                <li><strong>Phone:</strong> ${phoneNumber.value}</li>
                <li><strong>Email:</strong> ${email.value}</li>
            </ul>
        `;
    }

       // this function takes an input field and an error message. It adds a
        // red border to the field and displays the message right below it
    function showError(inputElement, message) { 
        inputElement.classList.add('is-invalid');
        const errorContainer = inputElement.nextElementSibling;
        if(errorContainer) errorContainer.textContent = message;
    }
    
    // Function to clear an error for a SINGLE field
    function clearError(inputElement) {
        inputElement.classList.remove('is-invalid');
        const errorContainer = inputElement.nextElementSibling;
        if(errorContainer) errorContainer.textContent = '';
    }

    // Function to clear ALL errors from the form called before a new
    // validation check or when the form is reset
    function clearAllErrors() {
        membershipForm.querySelectorAll('.is-invalid').forEach(field => field.classList.remove('is-invalid'));
        membershipForm.querySelectorAll('.error-message').forEach(msg => msg.textContent = '');
    }




    // dynamic feedback
    // add event listeners to validate each field per input or click away.
    const fieldsToValidate = [firstName, lastName, birthDate, gender, phoneNumber, email];
    fieldsToValidate.forEach(field => {
        // 'blur' checks if field is valid when the user clicks away from a field
        field.addEventListener('blur', () => {
            validateField(field);
        });
        // 'input' checks if field is valid every time the user types
        field.addEventListener('input', () => {
            validateField(field);
        });
    });



    // Main event listener for the "Submit" button click
    membershipForm.addEventListener('submit', function(event){
        event.preventDefault();
        
        // Run a final validation check on all fields. If it passes...
        if (validateAllFields()) {
            // Suggestion 4: Show a summary to the user before final submission.
            displaySummary();
            successModal.show();
        }
    });

    // Event listener for the "Confirm & Submit" button inside the modal
    confirmBtn.addEventListener('click', function() {
        // Show the final success state
        modalTitle.textContent = 'Success!';
        summaryContainer.classList.add('d-none');
        successMessage.classList.remove('d-none');
        editBtn.classList.add('d-none');
        confirmBtn.classList.add('d-none');
        okBtn.classList.remove('d-none');

        // Typically send the data to a server.
        // but for this project im just reseting the form.
        form.reset();
        clearAllErrors();
    });

    // When the modal is closed, reset it to its initial "summary" state
    document.getElementById('submissionModal').addEventListener('hidden.bs.modal', function() {
        modalTitle.textContent = 'Confirm Your Details';
        summaryContainer.classList.remove('d-none');
        successMessage.classList.add('d-none');
        editBtn.classList.remove('d-none');
        confirmBtn.classList.remove('d-none');
        okBtn.classList.add('d-none');
    });


    // Function to validate a SINGLE field (used for real-time feedback)
    function validateField(field) {
        const id = field.id;
        let isValid = true;
        let message = '';
        
        //  advanced field checks are done below.
        if (id === 'firstName' || id === 'lastName') {

             if (!/^[a-zA-Z]+$/.test(field.value.trim())) { // the [] Regex checks for letters only
                // ^ and $ mean the id field.value must match anything inbetween ^ and $
                // [a-zA-Z]: This part checks for any uppercase or lowercase letter.
                // /s is whitespace character
                isValid = false;
                message = 'Name can only contain letters.';
            }
        }
        else if (id === 'birthDate') {
            const today = new Date();
            const inputDate = new Date(field.value);
            if (!field.value) {
                isValid = false;
                message = 'Please select your birth date.';
            } else if (inputDate > today) {
                isValid = false;
                message = 'Birth date cannot be in the future.';
            }
        }
        else if (id === 'gender') {
            if (field.value === '') {
                isValid = false;
                message = 'Please select a gender.';
            }
        }
        else if (id === 'phoneNumber') {
            // Simple regex: allows for numbers, spaces, dashes, and parentheses
            if (!/^[0-9\s\-()+]+$/.test(field.value.trim()) || field.value.trim().length < 8) {
                isValid = false;
                message = 'Please enter a valid phone number (at least 8 digits).';
            }
        }
        else if (id === 'email') {
            // Simple regex to check for a basic email format
            // \S is any character that is not a whitespace
            // \. is for a dot only, need the \
            if (!/^\S+@\S+\.\S+$/.test(field.value.trim())) {
                isValid = false;
                message = 'Please enter a valid email address.';
            }
        }

        // Show or clear the error text based on validation result
        if (!isValid) {
            showError(field, message);
        } else {
            clearError(field);
        }
        return isValid;
    }
     }

    // ===================
    //  END OF MEMBERSHIP FORM VALIDATION LOGIC 
    //====================




    // ===================
    //  FAQ SEARCH LOGIC 
    //====================
    const faqPage = document.getElementById('faq-page');

    if (faqPage) { // Only run this logic if we are on the FAQ page
        const searchForm = document.getElementById('faq-search-form');
        const searchInput = document.getElementById('faq-search-input');
        const featuredContainer = document.getElementById('featured-questions-container');
        const popularAccordion = document.getElementById('faq-accordion');

        searchForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Stop the form from reloading the page
            
            const query = searchInput.value.toLowerCase().trim();
            featuredContainer.innerHTML = ''; // Clear previous results

            if (query === '') {
                return; // Do nothing if search is empty
            }

            let resultsFound = false;
            const allQuestions = popularAccordion.querySelectorAll('.accordion-item');

            allQuestions.forEach(questionItem => {
                const questionText = questionItem.dataset.question.toLowerCase();

                if (questionText.includes(query)) {
                    // We found a match!
                    resultsFound = true;
                    
                    // Clone the original question to display in "Featured"
                    const clone = questionItem.cloneNode(true);
                    
                    // IMPORTANT: Cloned accordions need unique IDs to work.
                    // se'll add a 'featured-' prefix to the IDs of the cloned elements.
                    const newIdSuffix = clone.querySelector('.accordion-collapse').id;
                    const featuredButton = clone.querySelector('.accordion-button');
                    const featuredCollapse = clone.querySelector('.accordion-collapse');
                    
                    featuredButton.setAttribute('data-bs-target', '#featured-' + newIdSuffix);
                    featuredButton.setAttribute('aria-controls', 'featured-' + newIdSuffix);
                    featuredCollapse.setAttribute('id', 'featured-' + newIdSuffix);
                    
                    // This tells the clone its new parent is the featured container.
                    featuredCollapse.setAttribute('data-bs-parent', '#featured-questions-container');    
                    
                    featuredContainer.appendChild(clone);
                }
            });

            if (!resultsFound) {
                featuredContainer.innerHTML = '<p class="text-white-50">No questions found matching your search.</p>';
            }
        });
    }
    // ===================
    //  END OF FAQ SEARCH
    //====================





    // ===========================================================================
    // CONTACT FORM VALIDATION LOGIC (almost the same as membership application)
    // ===========================================================================
    const contactForm = document.getElementById('contact-form');
    
    // The Gatekeeper: Only run this code if the contact form exists on the current page.
    if (contactForm) {
        // --- 1. Get references to all the elements we need ---
        const contactName = document.getElementById('contact-name');
        const contactEmail = document.getElementById('contact-email');
        const contactPhone = document.getElementById('contact-phone');
        const contactSubject = document.getElementById('contact-subject');
        const contactMessage = document.getElementById('contact-message'); // This is the correct variable

        const successModal = new bootstrap.Modal(document.getElementById('submissionModal'));
        const modalTitle = document.getElementById('submissionModalLabel');
        const summaryContainer = document.getElementById('submission-summary');
        const successMessage = document.getElementById('success-message');
        const editBtn = document.getElementById('modal-edit-btn');
        const confirmBtn = document.getElementById('modal-confirm-btn');
        const okBtn = document.getElementById('modal-ok-btn');

        
        // --- Dynamic, Real-Time Feedback ---
        const contactFieldsToValidate = [contactName, contactEmail, contactPhone, contactSubject, contactMessage];
        
        contactFieldsToValidate.forEach(field => {
            field.addEventListener('blur', () => {
                validateContactField(field);
            });
            field.addEventListener('input', () => {
                validateContactField(field);
            });
        });

        
        //  "Send Message" Button Logic ---
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            
            if (validateAllContactFields()) {
                displayContactSummary();
                successModal.show();
            }
        });

        
        // --- Modal "Confirm & Submit" Button Logic ---
        confirmBtn.addEventListener('click', function() {
            if (!contactForm.classList.contains('is-submitting')) return;

            modalTitle.textContent = 'Message Sent!';
            summaryContainer.classList.add('d-none');
            successMessage.innerHTML = 'Thank you for your message! We will get back to you shortly.';
            successMessage.classList.remove('d-none');
            editBtn.classList.add('d-none');
            confirmBtn.classList.add('d-none');
            okBtn.classList.remove('d-none');

            contactForm.reset();
            clearAllContactErrors();
            contactForm.classList.remove('is-submitting');
        });

        
        // --- Functions ---

function validateContactField(field) {
    const id = field.id;
    let isValid = true;
    let message = '';

    // Check for 'contact-name'
    if (id === 'contact-name') {
        if (!/^[a-zA-Z\s]+$/.test(field.value.trim())) {
            isValid = false;
            message = 'Name must start with letter and can only contain letters and spaces.';
        }
    
    // Check for 'contact-email'
    } else if (id === 'contact-email') {
        if (!/^\S+@\S+\.\S+$/.test(field.value.trim())) {
            isValid = false;
            message = 'Please enter a valid email address.';
        }

    // Check for 'contact-phone'
    } else if (id === 'contact-phone') {
        if (!/^[0-9\s\-()+]+$/.test(field.value.trim()) || field.value.trim().length < 8) {
            isValid = false;
            message = 'Please enter a valid phone number (at least 8 digits).';
        }

    // Check for 'contact-subject' or 'contact-message'
    } else if (id === 'contact-subject' || id === 'contact-message') {
        if (field.value.trim() === '') {
            isValid = false;
            message = 'This field is required.';
        }
    }
    
    // Show or clear the error based on the final validation result
    if (!isValid) {
        showContactError(field, message);
    } else {
        clearContactError(field);
    }
    
    return isValid;
}

        function validateAllContactFields() {
            let isFormValid = true;
            contactFieldsToValidate.forEach(field => {
                if (!validateContactField(field)) { isFormValid = false; }
            });
            return isFormValid;
        }

        function displayContactSummary() {
            contactForm.classList.add('is-submitting');
            summaryContainer.innerHTML = `
                <p>Please review your message before sending:</p>
                <ul class="summary-list">
                    <li><strong>Your Name:</strong> ${contactName.value}</li>
                    <li><strong>Email:</strong> ${contactEmail.value}</li>
                    <li><strong>Phone:</strong> ${contactPhone.value}</li>
                    <li><strong>Subject:</strong> ${contactSubject.options[contactSubject.selectedIndex].text}</li>
                </ul>
            `;
        }
        
        function showContactError(inputElement, message) { 
            inputElement.classList.add('is-invalid');
            const errorContainer = inputElement.nextElementSibling;
            if (errorContainer) errorContainer.textContent = message;
        }

        function clearContactError(inputElement) {
            inputElement.classList.remove('is-invalid');
            const errorContainer = inputElement.nextElementSibling;
            if (errorContainer) errorContainer.textContent = '';
        }

        function clearAllContactErrors() {
            contactForm.querySelectorAll('.is-invalid').forEach(field => field.classList.remove('is-invalid'));
            contactForm.querySelectorAll('.error-message').forEach(msg => msg.textContent = '');
        }
    } 



}); // --- End of DOMContentLoaded ---