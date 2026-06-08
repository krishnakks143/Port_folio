// ---
const hamMenuBtn = document.querySelector('.header__main-ham-menu-cont')
const smallMenu = document.querySelector('.header__sm-menu')
const headerHamMenuBtn = document.querySelector('.header__main-ham-menu')
const headerHamMenuCloseBtn = document.querySelector(
  '.header__main-ham-menu-close'
)
const headerSmallMenuLinks = document.querySelectorAll('.header__sm-menu-link')

hamMenuBtn.addEventListener('click', () => {
  if (smallMenu.classList.contains('header__sm-menu--active')) {
    smallMenu.classList.remove('header__sm-menu--active')
  } else {
    smallMenu.classList.add('header__sm-menu--active')
  }
  if (headerHamMenuBtn.classList.contains('d-none')) {
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  } else {
    headerHamMenuBtn.classList.add('d-none')
    headerHamMenuCloseBtn.classList.remove('d-none')
  }
})

for (let i = 0; i < headerSmallMenuLinks.length; i++) {
  headerSmallMenuLinks[i].addEventListener('click', () => {
    smallMenu.classList.remove('header__sm-menu--active')
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  })
}

// ---
const headerLogoConatiner = document.querySelector('.header__logo-container')

headerLogoConatiner.addEventListener('click', () => {
  location.href = 'index.html'
})

// --- Typewriter Effect ---
const typedTextSpan = document.getElementById("typed-text");
const textArray = [
  "Revenue Cloud (RCA) Solutions",
  "Intelligent CPQ pricing engines",
  "Agentforce AI custom agents",
  "High-performance REST API integrations"
];
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (typedTextSpan) {
    if (charIndex < textArray[textArrayIndex].length) {
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, 80);
    } else {
      setTimeout(erase, 2000);
    }
  }
}

function erase() {
  if (typedTextSpan) {
    if (charIndex > 0) {
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, 40);
    } else {
      textArrayIndex = (textArrayIndex + 1) % textArray.length;
      setTimeout(type, 500);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (typedTextSpan) {
    typedTextSpan.textContent = "";
    setTimeout(type, 1000);
  }
});

// --- Dynamic Formspree AJAX Submission ---
const contactForm = document.querySelector('.contact__form');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('.contact__btn');
    const originalBtnText = submitBtn.textContent;
    
    // Change button text to indicate loading
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    const formData = new FormData(contactForm);
    const formAction = contactForm.getAttribute('action');
    
    if (formAction.includes('YOUR_FORMSPREE_FORM_ID')) {
      alert("Please replace 'YOUR_FORMSPREE_FORM_ID' with your actual Formspree ID inside index.html and index.js!");
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
      return;
    }
    
    try {
      const response = await fetch(formAction, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        // Show success state
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.background = '#10b981'; // Success Green
        contactForm.reset();
        
        setTimeout(() => {
          submitBtn.textContent = originalBtnText;
          submitBtn.style.background = ''; // reset to default CSS
          submitBtn.disabled = false;
        }, 5000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      submitBtn.textContent = 'Error sending message';
      submitBtn.style.background = '#ef4444'; // Error Red
      
      setTimeout(() => {
        submitBtn.textContent = originalBtnText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 5000);
    }
  });
}


