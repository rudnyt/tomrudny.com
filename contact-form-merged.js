// Contact Form Handler - Combined Version
// This includes your existing validation + new Google Sheets submission

// IMPORTANT: Replace this with your actual Google Apps Script web app URL
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyNUKFv9od-JNJX3OCCvjSA3YDFqOcIE28wtNIyt47MSu_TT5wxaSDG-rfQQjDXDHLEAA/exec';

// Navigation toggle function
function toggleMenu() {
  document.querySelector("nav ul").classList.toggle("active");
}

// Form elements
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const organisationInput = document.getElementById('organisation');
const messageInput = document.getElementById('message');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

// Validation messages
const validationMessages = {
  name: "Please let me know your name so I can address you properly.",
  email: "I'll need your email address to get back to you.",
  emailInvalid: "That doesn't look like a valid email address. Mind double-checking?",
  organisation: "Knowing where you work helps me understand the context.",
  message: "Could you share a bit more about what you're trying to solve? The more context, the better I can help."
};

function showError(input, message) {
  const errorElement = document.getElementById(input.id + 'Error');
  if (errorElement) {
    errorElement.textContent = message;
    input.classList.add('error');
  }
}

function clearError(input) {
  const errorElement = document.getElementById(input.id + 'Error');
  if (errorElement) {
    errorElement.textContent = '';
    input.classList.remove('error');
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Form status display (for Google Sheets submission)
function showStatus(message, type) {
  if (formStatus) {
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
      setTimeout(() => {
        formStatus.className = 'form-status';
      }, 5000);
    }
  }
}

// Real-time validation
nameInput.addEventListener('blur', function() {
  if (!this.value.trim()) {
    showError(this, validationMessages.name);
  } else {
    clearError(this);
  }
});

emailInput.addEventListener('blur', function() {
  if (!this.value.trim()) {
    showError(this, validationMessages.email);
  } else if (!validateEmail(this.value)) {
    showError(this, validationMessages.emailInvalid);
  } else {
    clearError(this);
  }
});

organisationInput.addEventListener('blur', function() {
  if (!this.value.trim()) {
    showError(this, validationMessages.organisation);
  } else {
    clearError(this);
  }
});

messageInput.addEventListener('blur', function() {
  if (!this.value.trim()) {
    showError(this, validationMessages.message);
  } else {
    clearError(this);
  }
});

// Form submission - combines validation + Google Sheets submission
form.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  let isValid = true;
  
  // Validate name
  if (!nameInput.value.trim()) {
    showError(nameInput, validationMessages.name);
    isValid = false;
  }
  
  // Validate email
  if (!emailInput.value.trim()) {
    showError(emailInput, validationMessages.email);
    isValid = false;
  } else if (!validateEmail(emailInput.value)) {
    showError(emailInput, validationMessages.emailInvalid);
    isValid = false;
  }
  
  // Validate organisation
  if (!organisationInput.value.trim()) {
    showError(organisationInput, validationMessages.organisation);
    isValid = false;
  }
  
  // Validate message
  if (!messageInput.value.trim()) {
    showError(messageInput, validationMessages.message);
    isValid = false;
  }
  
  // If validation fails, stop here
  if (!isValid) {
    return;
  }
  
  // If validation passes, submit to Google Sheets
  submitBtn.disabled = true;
  showStatus('Sending your message...', 'loading');
  
  // Collect form data
  const formData = {
    name: nameInput.value,
    email: emailInput.value,
    organisation: organisationInput.value,
    message: messageInput.value,
    timestamp: new Date().toISOString()
  };
  
  try {
    // Send to Google Sheets
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    
    // Show success message
    showStatus('Thank you! Your message has been sent. I\'ll get back to you within 2 working days.', 'success');
    form.reset();
    
  } catch (error) {
    console.error('Error:', error);
    showStatus('Oops! Something went wrong. Please try again or email me directly at hello@klaudiarudna.com', 'error');
  } finally {
    submitBtn.disabled = false;
  }
});
