(function () {
  'use strict';

  // Footer year
  var yearEl = document.querySelector('.footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Smooth scroll for anchor links (offset for fixed navbar)
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        var navbar = document.getElementById('navbar');
        var offset = navbar ? navbar.offsetHeight : 80;
        var top = el.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // Mobile menu toggle
  var menuToggle = document.getElementById('menu-toggle');
  var mobileMenu = document.getElementById('mobile-menu');
  var iconMenu = document.getElementById('icon-menu');
  var iconClose = document.getElementById('icon-close');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      var isHidden = mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden', !isHidden);
      if (iconMenu && iconClose) {
        iconMenu.classList.toggle('hidden', !isHidden);
        iconClose.classList.toggle('hidden', isHidden);
      }
    });
  }

  document.querySelectorAll('.menu-link').forEach(function (link) {
    link.addEventListener('click', function () {
      if (mobileMenu) mobileMenu.classList.add('hidden');
      if (iconMenu) iconMenu.classList.remove('hidden');
      if (iconClose) iconClose.classList.add('hidden');
    });
  });

  // Navbar scroll: animação suave de elevação + linha (em vez de borda/sombra dura)
  var navbar = document.getElementById('navbar');
  function onScroll() {
    if (!navbar) return;
    if (window.scrollY > 20) {
      navbar.classList.add('nav-scrolled');
    } else {
      navbar.classList.remove('nav-scrolled');
    }
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  // Accordion (How We Work)
  document.querySelectorAll('.accordion-trigger').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = this.closest('.accordion-item');
      var content = item.querySelector('.accordion-content');
      var iconWrap = item.querySelector('.accordion-icon');
      var isOpen = content.classList.contains('is-open');

      // Close all items (branding: closed state = #F3F3F3)
      document.querySelectorAll('.accordion-item').forEach(function (other) {
        var c = other.querySelector('.accordion-content');
        var iw = other.querySelector('.accordion-icon');
        var minus = iw && iw.querySelector('.icon-minus');
        var plus = iw && iw.querySelector('.icon-plus');
        other.classList.remove('bg-[#ccff00]');
        other.classList.add('bg-[#F3F3F3]');
        if (c) c.classList.remove('is-open');
        if (minus) minus.classList.add('hidden');
        if (plus) plus.classList.remove('hidden');
        if (iw) {
          iw.classList.remove('bg-black', 'text-white');
          iw.classList.add('bg-[#F3F3F3]', 'text-black');
        }
      });

      // If it was closed, open it
      if (!isOpen) {
        item.classList.remove('bg-[#F3F3F3]');
        item.classList.add('bg-[#ccff00]');
        content.classList.add('is-open');
        if (iconWrap) {
          var m = iconWrap.querySelector('.icon-minus');
          var p = iconWrap.querySelector('.icon-plus');
          if (m) m.classList.remove('hidden');
          if (p) p.classList.add('hidden');
          iconWrap.classList.remove('bg-[#F3F3F3]', 'text-black');
          iconWrap.classList.add('bg-black', 'text-white');
        }
      }
    });
  });

  // CTA map pins hover + touch
  document.querySelectorAll('.pin').forEach(function (pin) {
    var tooltip = pin.querySelector('.pin-tooltip');
    var dot = pin.querySelector('.pin-dot');

    function showPin() {
      if (tooltip) {
        tooltip.classList.remove('opacity-0', 'translate-y-1');
        tooltip.classList.add('opacity-100', 'translate-y-0');
      }
      if (dot) {
        dot.classList.remove('bg-[#ccff00]/30', 'border-[#ccff00]');
        dot.classList.add('bg-white', 'border-white', 'scale-150');
      }
    }

    function hidePin() {
      if (tooltip) {
        tooltip.classList.add('opacity-0', 'translate-y-1');
        tooltip.classList.remove('opacity-100', 'translate-y-0');
      }
      if (dot) {
        dot.classList.add('bg-[#ccff00]/30', 'border-[#ccff00]');
        dot.classList.remove('bg-white', 'border-white', 'scale-150');
      }
    }

    pin.addEventListener('mouseenter', showPin);
    pin.addEventListener('mouseleave', hidePin);

    pin.addEventListener('touchstart', function (e) {
      e.preventDefault();
      var isActive = tooltip && !tooltip.classList.contains('opacity-0');
      document.querySelectorAll('.pin').forEach(function (other) {
        var t = other.querySelector('.pin-tooltip');
        var d = other.querySelector('.pin-dot');
        if (t) { t.classList.add('opacity-0', 'translate-y-1'); t.classList.remove('opacity-100', 'translate-y-0'); }
        if (d) { d.classList.add('bg-[#ccff00]/30', 'border-[#ccff00]'); d.classList.remove('bg-white', 'border-white', 'scale-150'); }
      });
      if (!isActive) showPin();
    }, { passive: false });
  });

  document.addEventListener('touchstart', function (e) {
    if (!e.target.closest('.pin')) {
      document.querySelectorAll('.pin').forEach(function (pin) {
        var t = pin.querySelector('.pin-tooltip');
        var d = pin.querySelector('.pin-dot');
        if (t) { t.classList.add('opacity-0', 'translate-y-1'); t.classList.remove('opacity-100', 'translate-y-0'); }
        if (d) { d.classList.add('bg-[#ccff00]/30', 'border-[#ccff00]'); d.classList.remove('bg-white', 'border-white', 'scale-150'); }
      });
    }
  });
})();
