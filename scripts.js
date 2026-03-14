/* =============================================
   SCRIPTS.JS — RAY Digital
   Shared across all pages
   ============================================= */

// ---------- THEME ----------
(function () {
  var STORAGE_KEY = 'ray-theme';

  function getTheme() {
    return localStorage.getItem(STORAGE_KEY) || 'dark';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    updateButton(theme);
  }

  function updateButton(theme) {
    var btn = document.getElementById('themeToggle');
    if (!btn) return;
    var icon = btn.querySelector('.theme-icon');
    if (icon) {
      icon.textContent = theme === 'dark'
        ? String.fromCharCode(0x2600)
        : String.fromCharCode(0x263D);
    }
    btn.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  }

  function init() {
    var current = getTheme();
    document.documentElement.setAttribute('data-theme', current);
    updateButton(current);

    var btn = document.getElementById('themeToggle');
    if (btn) {
      btn.addEventListener('click', function () {
        var next = getTheme() === 'dark' ? 'light' : 'dark';
        setTheme(next);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

document.addEventListener('DOMContentLoaded', function () {

  // ---------- LOADER ----------
  window.addEventListener('load', function () {
    setTimeout(function () {
      var loader = document.getElementById('loader');
      if (loader) loader.classList.add('hide');
    }, 1600);
  });

  // ---------- PARTICLES ----------
  var canvas = document.getElementById('particles-canvas');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    var particles = [];
    var count = 55;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (var i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.4,
        dx: (Math.random() - 0.5) * 0.35,
        dy: (Math.random() - 0.5) * 0.35,
        alpha: Math.random() * 0.45 + 0.1
      });
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(function (p) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(45,212,191,' + p.alpha + ')';
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
          var dx = particles[i].x - particles[j].x;
          var dy = particles[i].y - particles[j].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(45,212,191,' + (0.1 * (1 - dist / 110)) + ')';
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(drawParticles);
    }
    drawParticles();
  }

  // ---------- NAVBAR SCROLL ----------
  var navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    });
  }

  // ---------- HAMBURGER ----------
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    });
  }

  // ---------- ACTIVE NAV LINK ----------
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    if (link.getAttribute('href') === path) {
      link.style.color = 'var(--text-primary)';
      link.style.fontWeight = '500';
    }
  });

  // ---------- STAT COUNTER ----------
  var counters = document.querySelectorAll('.stat-number');
  if (counters.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var num = parseInt(el.dataset.target);
          if (!Number.isNaN(num)) {
            var current = 0;
            var step = Math.ceil(num / 40);
            var timer = setInterval(function () {
              current += step;
              if (current >= num) { current = num; clearInterval(timer); }
              el.querySelector('.count-num').textContent = current;
            }, 30);
          }
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.3 });
    counters.forEach(function (c) { observer.observe(c); });
  }

  // ---------- FAQ TOGGLE ----------
  document.querySelectorAll('.faq-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panel = btn.nextElementSibling;
      var isOpen = panel.style.display === 'block';
      document.querySelectorAll('.faq-content').forEach(function (c) { c.style.display = 'none'; });
      panel.style.display = isOpen ? 'none' : 'block';
    });
  });

  // ---------- CONTACT FORM (index.html) ----------
  var SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw68Vc5Kthxfa89Jh_b60N3QdrhUCRNQBwYwZwvrp8pJ4utyN4kLNkeYZ3mNrfkLogG0Q/exec';

  var quickContact = document.getElementById('quickContact');
  if (quickContact) {
    quickContact.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = quickContact.querySelector('button[type="submit"]');
      btn.textContent = 'Sending...';
      btn.disabled = true;

      var data = {
        formType: 'contact',
        name: quickContact.querySelector('input[name="name"]').value.trim(),
        email: quickContact.querySelector('input[type="email"]').value.trim(),
        phone: quickContact.querySelector('input[type="tel"]').value.trim(),
        message: quickContact.querySelector('textarea').value.trim()
      };

      fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(data)
      })
        .then(function (res) { return res.json(); })
        .then(function () {
          var success = document.getElementById('quickContactSuccess');
          if (success) success.style.display = 'block';
          quickContact.reset();
          btn.textContent = 'Message Sent!';
        })
        .catch(function () {
          btn.textContent = 'Error. Try again.';
          btn.disabled = false;
        });
    });
  }

  // ---------- CONSULTATION FORM ----------
  var bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    // Pre-fill package from URL param
    var params = new URLSearchParams(window.location.search);
    var pkg = params.get('package');
    if (pkg) {
      var select = bookingForm.querySelector('select[name="package"]');
      if (select) {
        Array.from(select.options).forEach(function (opt) {
          if (opt.value === pkg) opt.selected = true;
        });
      }
    }

    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = bookingForm.querySelector('button[type="submit"]');
      btn.textContent = 'Sending...';
      btn.disabled = true;

      var data = {
        formType: 'booking',
        package: bookingForm.querySelector('select[name="package"]') ? bookingForm.querySelector('select[name="package"]').value : '',
        name: bookingForm.querySelector('input[name="name"]').value.trim(),
        email: bookingForm.querySelector('input[name="email"]').value.trim(),
        phone: bookingForm.querySelector('input[name="phone"]').value.trim(),
        address: bookingForm.querySelector('input[name="address"]') ? bookingForm.querySelector('input[name="address"]').value.trim() : '',
        date: bookingForm.querySelector('input[name="preferredDate"]') ? bookingForm.querySelector('input[name="preferredDate"]').value : '',
        time: bookingForm.querySelector('input[name="preferredTime"]') ? bookingForm.querySelector('input[name="preferredTime"]').value : ''
      };

      fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(data)
      })
        .then(function (res) { return res.json(); })
        .then(function () {
          var success = document.getElementById('successMsg');
          if (success) success.style.display = 'block';
          bookingForm.reset();
          btn.textContent = 'Booking Confirmed!';
        })
        .catch(function () {
          btn.textContent = 'Error. Try again.';
          btn.disabled = false;
        });
    });
  }

});
