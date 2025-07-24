// Topbar Dropdown Toggle Start
document.querySelectorAll('.topbar-dropdown .dropdown-toggle').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation(); // Prevent event bubbling to document
  
      const dropdown = this.closest('.topbar-dropdown'); // safer than parentElement
  
      const isOpen = dropdown.classList.contains('open');
  
      // Close all dropdowns first
      document.querySelectorAll('.topbar-dropdown.open').forEach(d => d.classList.remove('open'));
  
      // Toggle current dropdown
      if (!isOpen) {
        dropdown.classList.add('open');
      }
    });
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.topbar-dropdown')) {
      document.querySelectorAll('.topbar-dropdown.open').forEach(d => d.classList.remove('open'));
    }
  });

// Search Suggestions Start
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput');
  const suggestionsBox = document.getElementById('searchSuggestions');

  // demo data
  const products = [
      "S23 Ultra",
      "SAMSUNG 65 4K Smart TV",
      "SAMSUNG Galaxy Z Flip",
      "Samsung Galaxy Z Fold6",
      "Samsung S24 Ultra",
      "Sandable Body Repair",
      "Science Fiction-Mythology",
      "Science Fiction-Mythology Number 1"
  ];

  searchInput.addEventListener('input', function() {
      const query = this.value.trim().toLowerCase();
      if (query.length === 0) {
          suggestionsBox.style.display = 'none';
          suggestionsBox.innerHTML = '';
          return;
      }
      // filter
      const filtered = products.filter(item => item.toLowerCase().includes(query));
      if (filtered.length === 0) {
          suggestionsBox.style.display = 'none';
          suggestionsBox.innerHTML = '';
          return;
      }
      // show suggestion
      suggestionsBox.innerHTML = filtered.map(item =>
          `<div class="search-suggestion-item"><i class="fa fa-search"></i> ${item}</div>`
      ).join('');
      suggestionsBox.style.display = 'block';
  });

  // suggestion click will be input
  suggestionsBox.addEventListener('click', function(e) {
      if (e.target.classList.contains('search-suggestion-item')) {
          searchInput.value = e.target.textContent.trim();
          suggestionsBox.style.display = 'none';
      }
  });

  // outside click will hide suggestion
  document.addEventListener('click', function(e) {
      if (!e.target.closest('.search-bar')) {
          suggestionsBox.style.display = 'none';
      }
  });

  // Main Slider Start 
  const slides = document.querySelectorAll('.slide');
  const controls = document.querySelector('.slider-controls');
  let current = 0;

  // Dynamic Dot
  controls.innerHTML = '';
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => showSlide(i));
    controls.appendChild(dot);
  });
  const dots = controls.querySelectorAll('.slider-dot');

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
      dots[i].classList.toggle('active', i === idx);
    });
    current = idx;
  }

  // Optional: auto-slide
  setInterval(() => {
    showSlide((current + 1) % slides.length);
  }, 5000);

  // Featured Product Slider Start
  const swiper = new Swiper('.featured-products-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    navigation: {
      nextEl: '.featured-button-next',
      prevEl: '.featured-button-prev',
    },
    pagination: {
      el: '.custom-featured-pagination',
      clickable: true,
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
      576: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      992: { slidesPerView: 4 },
      1200: { slidesPerView: 6 },
    }
  });

  // Product Modal Start
  document.querySelectorAll(".deal-eye").forEach(button => {
    button.addEventListener("click", function () {
      const modalId = this.getAttribute("data-modal-id");
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add("active");
        document.body.classList.add("modal-open");
      }
    });
  });

  document.querySelectorAll(".product-gallery-close").forEach(button => {
    button.addEventListener("click", function () {
      const modal = this.closest(".product-gallery-modal");
      modal.classList.remove("active"); 
      document.body.classList.remove("modal-open");
    });
  });

  document.querySelectorAll(".product-gallery-modal .product-gallery-overlay").forEach(overlay => {
    overlay.addEventListener("click", function () {
      const modal = this.closest(".product-gallery-modal");
      modal.classList.remove("active"); 
      document.body.classList.remove("modal-open");
    });
  });
  
  // Gallery thumbnail click logic
  document.querySelectorAll('.product-gallery-thumbnails').forEach(function(thumbsContainer) {
    thumbsContainer.addEventListener('click', function(e) {
      if (e.target.classList.contains('gallery-thumb')) {
        // Find the modal this thumbnail belongs to
        const modal = e.target.closest('.product-gallery-modal');
        // Find the main image inside this modal
        const mainImg = modal.querySelector('.product-gallery-main-img img');
        // Update main image src to the clicked thumbnail's data-img or src
        mainImg.src = e.target.getAttribute('data-img') || e.target.src;

        // Remove active class from all thumbs in this container
        thumbsContainer.querySelectorAll('.gallery-thumb').forEach(function(thumb) {
          thumb.classList.remove('active');
        });
        // Add active class to clicked thumb
        e.target.classList.add('active');
      }
    });
  });

  // Unique Swiper initialization
  new Swiper('.clearance-swiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    navigation: {
      nextEl: '.clearance-swiper-next',
      prevEl: '.clearance-swiper-prev',
    },
    pagination: {
      el: '.clearance-swiper-pagination',
      clickable: true,
    },
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    breakpoints: {
      576: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      992: { slidesPerView: 4 },
      1200: { slidesPerView: 5 },
    }
  });

  // New Arrivals Slider Start
  var newArrivalsSwiper = new Swiper('.new-arrivals-swiper', {
    slidesPerView: 4,
    spaceBetween: 24,
    loop: true,
    navigation: {
      nextEl: '.newarrivals-button-next',
      prevEl: '.newarrivals-button-prev',
    },
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    breakpoints: {
      992: { slidesPerView: 4 },
      768: { slidesPerView: 2 },
      0: { slidesPerView: 1 }
    }
  });

  // Brands Slider Start
  var brandsSwiper = new Swiper('.brands-swiper', {
    slidesPerView: 7,
    spaceBetween: 24,
    navigation: {
      nextEl: '.brands-button-next',
      prevEl: '.brands-button-prev',
    },
    breakpoints: {
      1200: { slidesPerView: 7 },
      992: { slidesPerView: 5 },
      768: { slidesPerView: 3 },
      0: { slidesPerView: 2 }
    }
  });

  // Scroll to top button functionality
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');
  if (!scrollToTopBtn) return;

  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
  });

  scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});

// Bar icon show/hide on scroll
window.addEventListener('scroll', function() {
  const menuBarBtn = document.getElementById('menuBarBtn');
  const leftCategoryMenu = document.querySelector('.left-category-menu');
  const mainMenu = document.querySelector('.main-menu');
  const middleTopbar = document.querySelector('.middle-topbar');
  
  if (window.scrollY > 150) {
    if (middleTopbar) middleTopbar.classList.add('sticky-middle-topbar');
  } else {
    if (middleTopbar) middleTopbar.classList.remove('sticky-middle-topbar');
    if (menuBarBtn) menuBarBtn.classList.remove('active');
    if (leftCategoryMenu) leftCategoryMenu.classList.remove('sticky-active');
    if (mainMenu) mainMenu.classList.remove('sticky-active');
  }
});

// All category items with mega menu Start
const menuItems = document.querySelectorAll('.has-mega-menu');

menuItems.forEach(item => {
  const link = item.querySelector('.category-link');
  const megaMenu = item.querySelector('.mega-menu');

  // Mouse enter: show mega menu
  item.addEventListener('mouseenter', () => {
    megaMenu.style.display = 'grid'; 
  });

  // Mouse leave: hide mega menu
  item.addEventListener('mouseleave', () => {
    megaMenu.style.display = 'none';
  });

  // Touch/click (for mobile)
  if (link) {
    link.addEventListener('click', function(e) {
      // Prevent default link
      e.preventDefault();
      // Hide all other mega menus
      document.querySelectorAll('.mega-menu').forEach(menu => {
        if (menu !== megaMenu) menu.style.display = 'none';
      });
      // Toggle current
      megaMenu.style.display = megaMenu.style.display === 'grid' ? 'none' : 'grid';
    });
  }
});

// Optional: click outside to close all mega menus
document.addEventListener('click', function(e) {
  if (!e.target.closest('.has-mega-menu')) {
    document.querySelectorAll('.mega-menu').forEach(menu => {
      menu.style.display = 'none';
    });
  }
});

// Flash Deal Product Slider JS Start
document.querySelectorAll('.flash-deal-slider').forEach(function(sliderSection) {
  const slider = sliderSection.querySelector('.flash-deal-products');
  const leftArrows = sliderSection.querySelectorAll('.slider-arrow-left');
  const rightArrows = sliderSection.querySelectorAll('.slider-arrow-right');
  if (!slider || !leftArrows.length || !rightArrows.length) return;

  const card = slider.querySelector('.flash-deal-product-card');
  const gap = parseInt(getComputedStyle(slider).gap) || 0;
  const cardWidth = card ? card.offsetWidth + gap : 220;

  function scrollByCard(dir) {
    const scrollAmount = dir * cardWidth;
    if (dir > 0) {
      const isAtEnd = slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth - cardWidth - 2;
      if (isAtEnd) {
        stopAutoSlide();
        return;
      } else {
        slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    } else {
      if (slider.scrollLeft > 0) {
        slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  }

  leftArrows.forEach(function(leftArrow) {
    leftArrow.addEventListener('click', function (e) {
      e.preventDefault();
      scrollByCard(-1);
    });
  });

  rightArrows.forEach(function(rightArrow) {
    rightArrow.addEventListener('click', function (e) {
      e.preventDefault();
      scrollByCard(1);
    });
  });

  let autoSlideInterval;
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      scrollByCard(1);
    }, 3000);
  }
  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  slider.addEventListener('mouseenter', stopAutoSlide);
  slider.addEventListener('mouseleave', startAutoSlide);
  startAutoSlide();
});

// Flash Deal Countdown Timer Start
(function() {
  // Set your target end date/time here (YYYY-MM-DDTHH:MM:SS format)
  const endDate = new Date('2026-11-12T23:59:59');

  const daysEl = document.getElementById('flash-days');
  const hoursEl = document.getElementById('flash-hours');
  const minutesEl = document.getElementById('flash-minutes');
  const secondsEl = document.getElementById('flash-seconds');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  function updateCountdown() {
    const now = new Date();
    let diff = Math.max(0, endDate - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);
    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * (1000 * 60);
    const seconds = Math.floor(diff / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
})();


// Deal of the day Countdown Timer Start
(function() {
  // Set your target end date/time here (YYYY-MM-DDTHH:MM:SS format)
  const endDate = new Date('2026-11-12T23:59:59');

  const daysEl = document.getElementById('deal-days');
  const hoursEl = document.getElementById('deal-hours');
  const minutesEl = document.getElementById('deal-minutes');
  const secondsEl = document.getElementById('deal-seconds');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  function updateCountdown() {
    const now = new Date();
    let diff = Math.max(0, endDate - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);
    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * (1000 * 60);
    const seconds = Math.floor(diff / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
})();
  
// Mobile Hamburger & Drawer Logic
(function() {
  const hamburger = document.getElementById('mobileHamburgerBtn');
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('mobileDrawerOverlay');
  const closeBtn = document.getElementById('mobileDrawerClose');

  function openDrawer() {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  if (hamburger && drawer && overlay && closeBtn) {
    hamburger.addEventListener('click', openDrawer);
    closeBtn.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);
    // ESC key closes drawer
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeDrawer();
    });
  }
})();

// Mobile Drawer Category Toggle & Mega Menu Fix (final, only one mega menu open)
(function () {
  const drawer = document.getElementById('mobileDrawer');
  if (!drawer) return;

  // Hide category-list by default
  const catMenu = drawer.querySelector('.left-category-menu');
  const catToggle = catMenu?.querySelector('.category-toggle');
  const catList = catMenu?.querySelector('.category-list');

  if (catList) catList.style.display = 'none';

  if (catToggle && catList) {
    catToggle.addEventListener('click', function (e) {
      e.preventDefault();
      catList.style.display = (catList.style.display === 'block') ? 'none' : 'block';
    });
  }

  // Mega menu toggle on click (mobile)
  drawer.querySelectorAll('.category-list > .has-mega-menu > a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const parent = link.parentElement;
      const megaMenu = parent.querySelector('.mega-menu');
      if (!megaMenu) return;

      const isAlreadyOpen = parent.classList.contains('open'); // Save state BEFORE closing others

      // Close all mega menus
      drawer.querySelectorAll('.category-list > .has-mega-menu').forEach(li => {
        li.classList.remove('open');
      });
      drawer.querySelectorAll('.category-list > .has-mega-menu .mega-menu').forEach(mm => {
        mm.style.setProperty('display', 'none', 'important');
      });

      // If it wasn't already open, now open it
      if (!isAlreadyOpen) {
        parent.classList.add('open');
        megaMenu.style.setProperty('display', 'block', 'important');
      }
    });
  });
})();

// Mobile dropdown toggle
(function () {
  const mainMenuLinks = document.querySelectorAll('.main-menu .has-dropdown > a');

  mainMenuLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      // Only apply on mobile (less than 992px width)
      if (window.innerWidth >= 992) return;

      e.preventDefault();
      const parent = link.parentElement;
      const dropdown = parent.querySelector('.dropdown-menu');

      if (!dropdown) return;

      const isOpen = parent.classList.contains('open');

      // Close all
      document.querySelectorAll('.main-menu .has-dropdown').forEach(item => {
        item.classList.remove('open');
        const dd = item.querySelector('.dropdown-menu');
        if (dd) dd.style.display = 'none';
      });

      // Open current
      if (!isOpen) {
        parent.classList.add('open');
        dropdown.style.display = 'block';
      }
    });
  });

  // Optional: close dropdowns on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 992) {
      document.querySelectorAll('.main-menu .dropdown-menu').forEach(dd => {
        dd.style.display = '';
      });
      document.querySelectorAll('.main-menu .has-dropdown').forEach(item => {
        item.classList.remove('open');
      });
    }
  });
})();
