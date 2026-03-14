/* =============================================
   COMPONENTS.JS — RAY Digital
   Nav, Footer, Loader inject karta hai
   ============================================= */

const loaderHTML = `
<div id="loader">
  <div class="loader-logo">
    <span class="accent" style="animation-delay:0.0s">"</span>
    <span style="animation-delay:0.1s">R</span>
    <span style="animation-delay:0.2s">A</span>
    <span style="animation-delay:0.3s">Y</span>
    <span style="animation-delay:0.4s">&nbsp;</span>
    <span style="animation-delay:0.5s">D</span>
    <span style="animation-delay:0.6s">i</span>
    <span style="animation-delay:0.7s">g</span>
    <span style="animation-delay:0.8s">i</span>
    <span style="animation-delay:0.9s">t</span>
    <span style="animation-delay:1.0s">a</span>
    <span style="animation-delay:1.1s">l</span>
  </div>
  <div class="loader-bar"></div>
</div>
<canvas id="particles-canvas"></canvas>`;

const navHTML = `
<nav class="nav" id="navbar">
  <div class="container nav-wrap">
    <a class="logo" href="../index.html">RAY Digital</a>
    <ul class="nav-links" id="navLinks">
      <li><a href="../index.html">Home</a></li>
      <li><a href="../services.html">Services</a></li>
      <li><a href="../pricing.html">Pricing</a></li>
      <li><a href="../about.html">About Us</a></li>
      <li><a href="../blog.html">Blog</a></li>
      <li><a href="../consultation.html">Consultation</a></li>
    </ul>
    <div class="nav-controls">
      <button id="themeToggle" class="theme-btn" aria-label="Toggle theme">
        <span class="theme-icon">&#9728;</span>
      </button>
      <button class="hamburger" id="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</nav>`;

const footerHTML = `
<footer>
  <div class="container footer-grid">
    <div>
      <a class="logo" href="../index.html">RAY Digital</a>
      <p>We help businesses evolve digitally, not just exist online.</p>
      <div class="social-links">
        <a href="https://www.linkedin.com/company/raydigital-in" aria-label="LinkedIn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
        </a>
        <a href="https://www.instagram.com/ray_digital.in/" aria-label="Instagram">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
        </a>
        <a href="https://www.youtube.com/@RayDigitalDevelopment" aria-label="YouTube">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 
0 0 0 1.46 6.42C1 8.13 1 12 1 12s0 3.87.46 5.58a2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96C23 15.87 23 12 23 12s0-3.87-.46-5.58zM10 15V9l5 3-5 3z"/></svg>
        </a>
        <a href="#" aria-label="Facebook">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
        </a>
      </div>
    </div>
    <div><h3>Quick Links</h3><ul><li><a href="../index.html">Home</a></li><li><a href="../services.html">Services</a></li><li><a href="../pricing.html">Pricing</a></li><li><a href="../about.html">About Us</a></li><li><a href="../blog.html">Blog</a></li></ul></div>
    <div><h3>Services</h3><ul><li>Website Development</li><li>Automation Solutions</li><li>SEO Services</li><li>SaaS Development</li></ul></div>
    <div><h3>Contact</h3><ul><li>help.raydigital@gmail.com</li><li>+91 83900 47240</li></ul></div>
  </div>
  <div class="copyright">&copy; 2026 RAY Digital. All rights reserved.</div>
</footer>`;

document.addEventListener('DOMContentLoaded', function () {
  document.body.insertAdjacentHTML('afterbegin', loaderHTML);
  document.body.insertAdjacentHTML('afterbegin', navHTML);
  var existingFooter = document.querySelector('footer');
  if (existingFooter) {
    existingFooter.outerHTML = footerHTML;
  } else {
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }
});
