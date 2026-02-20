// shared-components.js
// Place this file in your root directory or a /js folder

// Dynamic path helper - detects if we're in a subfolder
function getBasePath() {
  const path = window.location.pathname;
  // If we're in /case-studies/, /articles/, /videos/, or /services/ subfolder, go up one level
  if (path.includes('/case-studies/') || path.includes('/articles/') || path.includes('/videos/') || path.includes('/services/')) {
    return '../';
  }
  // Otherwise we're at root level
  return '';
}

function getNavigationHTML(basePath) {
  return `
    <header class="container">
      <nav>
        <a href="${basePath}index.html" class="logo">
          <img src="${basePath}img/tir.png" alt="Tom (Tomasz) Rudny" />
          Tom Rudny
        </a>
        <div class="burger-menu" onclick="toggleMenu()">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <ul>
          <li><a href="${basePath}articles.html" data-page="articles">Articles</a></li>
          <li><a href="${basePath}about.html" data-page="about">About</a></li>
          <li><a href="${basePath}contact.html" data-page="contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  `;
}

function getFooterHTML(basePath) {
  return `
    <footer id="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-main">
            <h2>Let's Talk</h2>
            <p><img class="icon-before-text" src="${basePath}img/icon-email.svg" alt="Email Icon"><a href="mailto:rudnyt@gmail.com"> rudnyt@gmail.com</a></p>
            <p><img class="icon-before-text" src="${basePath}img/icon-location.svg" alt="Location Icon"> Cheshire, UK</p>
          </div>
          
          <div class="footer-social">
            <h3>Follow</h3>
            <div class="social-icons">
              <a href="https://www.linkedin.com/in/tomaszrudny/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@tom-rudny-chess" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
                </svg>
              </a>
            </div>
            <a href="https://tomrudny.substack.com/subscribe" class="footer-subscribe-btn" target="_blank" rel="noopener noreferrer">Subscribe to Newsletter</a>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p class="small">&copy; 2026 Tom Rudny. All rights reserved.</p>
          <div class="footer-links">
            <a href="${basePath}privacy-policy.html" class="footer-link">Privacy Policy</a>
            <a href="${basePath}terms-conditions.html" class="footer-link">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}

// Function to load navigation
function loadNavigation() {
  const navContainer = document.getElementById('nav-placeholder');
  if (navContainer) {
    const basePath = getBasePath();
    navContainer.innerHTML = getNavigationHTML(basePath);
    
    // Set active page based on data-active attribute on body
    const activePage = document.body.getAttribute('data-active-page');
    if (activePage) {
      const activeLink = document.querySelector(`nav a[data-page="${activePage}"]`);
      if (activeLink) {
        activeLink.classList.add('active-page');
      }
    }
  }
}

// Function to load footer
function loadFooter() {
  const footerContainer = document.getElementById('footer-placeholder');
  if (footerContainer) {
    const basePath = getBasePath();
    footerContainer.innerHTML = getFooterHTML(basePath);
  }
}

// Function to toggle mobile menu (keep your existing functionality)
function toggleMenu() {
  document.querySelector("nav ul").classList.toggle("active");
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  loadNavigation();
  loadFooter();
});
