import { ADMIN_CREDENTIALS, analyticsData, faqItems, galleryItems, socialItems } from './data.js';
import { clearSession, getSession, getState, initState, makeId, setSession, updateState } from './state.js';

initState();

const body = document.body;
const page = body.dataset.page;
const state = () => getState();
const currency = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
const timeSlots = ['6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM'];
let specialsIndex = 0;
let menuEditId = null;

function injectShell() {
  const header = document.getElementById('site-header');
  const footer = document.getElementById('site-footer');
  const session = getSession();
  const userLabel = session ? `${session.firstName || 'Guest'}` : 'Login';

  if (header) {
    header.className = 'site-header';
    header.innerHTML = `
      <div class="shell navbar">
        <a class="brand-mark" href="./index.html"><strong>Aurelio House</strong><span>Fine Dining & Private Rooms</span></a>
        <div class="nav-links">
          <a href="./index.html">Home</a>
          <a href="./about.html">About Us</a>
          <a href="./menu.html">Menu</a>
          <a href="./gallery.html">Gallery</a>
          <a href="./contact.html">Contact Us</a>
        </div>
        <div class="nav-actions">
          <a class="btn btn-secondary" href="./auth.html">${userLabel}</a>
          <a class="btn btn-primary" href="./reservation.html">Reserve</a>
        </div>
        <button id="mobile-toggle" class="mobile-toggle" type="button">Menu</button>
      </div>
      <div class="shell nav-panel">
        <div class="nav-links">
          <a href="./index.html">Home</a>
          <a href="./about.html">About Us</a>
          <a href="./menu.html">Menu</a>
          <a href="./gallery.html">Gallery</a>
          <a href="./contact.html">Contact Us</a>
          <a href="./reservation.html">Reservation</a>
          <a href="./auth.html">Login / Sign Up</a>
        </div>
      </div>`;
  }

  if (footer) {
    const content = state().content;
    footer.className = 'footer';
    footer.innerHTML = `
      <div class="shell footer-grid">
        <div>
          <a class="brand-mark" href="./index.html"><strong>Aurelio House</strong><span>Waterfront dining</span></a>
          <p style="margin-top:16px;">${content.footerNote}</p>
          <form id="newsletter-form" class="newsletter-form">
            <input type="email" name="email" placeholder="Join the guest list" required>
            <button class="btn btn-primary" type="submit">Subscribe</button>
          </form>
          <p id="newsletter-feedback" class="form-feedback"></p>
        </div>
        <div class="footer-links">
          <span class="eyebrow">Quick links</span>
          <a href="./menu.html">Seasonal menu</a>
          <a href="./reservation.html">Reservations</a>
          <a href="./contact.html">Private dining</a>
          <a href="./privacy.html">Privacy policy</a>
          <a href="./terms.html">Terms & conditions</a>
        </div>
        <div>
          <span class="eyebrow">Contact</span>
          <p>48 Harbour Crescent, Marine District, Mumbai</p>
          <p>+91 22 6800 2148</p>
          <p>${content.supportEmail}</p>
        </div>
        <div class="footer-hours">
          <span class="eyebrow">Opening hours</span>
          <span>Mon - Thu: 5:30 PM - 11:00 PM</span>
          <span>Fri - Sat: 12:30 PM - 3:00 PM, 5:30 PM - 12:00 AM</span>
          <span>Sun: 12:30 PM - 10:30 PM</span>
        </div>
      </div>
      <div class="shell" style="margin-top:24px; color: var(--muted);">� 2026 Aurelio House. Crafted as a premium portfolio demo.</div>`;
  }
}

function setupGlobalUI() {
  const toggle = document.getElementById('mobile-toggle');
  const header = document.querySelector('.site-header');
  toggle?.addEventListener('click', () => header?.classList.toggle('open'));

  document.querySelectorAll('.password-toggle').forEach((button) => {
    button.addEventListener('click', () => {
      const input = button.parentElement.querySelector('input');
      const nextType = input.type === 'password' ? 'text' : 'password';
      input.type = nextType;
      button.textContent = nextType === 'password' ? 'Show' : 'Hide';
    });
  });

  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('in-view');
    });
  }, { threshold: 0.18 });
  document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));

  const modal = document.getElementById('video-modal');
  document.querySelectorAll('.video-trigger').forEach((button) => {
    button.addEventListener('click', () => {
      modal.innerHTML = `<iframe class="video-frame" src="https://www.youtube.com/embed/${button.dataset.videoId}?autoplay=1" title="Restaurant video" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    });
  });
  modal?.addEventListener('click', () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = '';
  });

  const newsletterForm = document.getElementById('newsletter-form');
  newsletterForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(newsletterForm);
    const email = formData.get('email').toString().trim();
    updateState((draft) => {
      draft.messages.unshift({ id: makeId('msg'), type: 'Newsletter', name: 'Newsletter Lead', email, phone: '-', subject: 'Newsletter signup', message: 'Requested to receive seasonal menus and event updates.' });
    });
    newsletterForm.reset();
    const feedback = document.getElementById('newsletter-feedback');
    if (feedback) feedback.textContent = 'Subscribed to seasonal menus and event updates.';
  });
}

function starString(rating) {
  return '?'.repeat(rating) + '?'.repeat(5 - rating);
}

function renderMenuCards(target, items) {
  target.innerHTML = items.map((item) => `
    <article class="menu-card reveal in-view">
      <div class="menu-head">
        <div>
          <span class="eyebrow">${item.category}</span>
          <h3>${item.name}</h3>
        </div>
        <div class="price">${currency.format(item.price)}</div>
      </div>
      <p>${item.description}</p>
      <div class="badge-row">
        ${item.popular ? '<span class="menu-label">Popular</span>' : ''}
        ${item.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
        ${item.dietary.map((label) => `<span class="chip">${label}</span>`).join('')}
      </div>
    </article>`).join('');
}
function renderHome() {
  const current = state();
  const featured = current.menuItems.filter((item) => item.popular).slice(0, 3);
  const approvedReviews = current.reviews.filter((review) => review.approved).slice(0, 3);
  const featuredDishes = document.getElementById('featured-dishes');
  if (featuredDishes) renderMenuCards(featuredDishes, featured);

  const testimonials = document.getElementById('home-testimonials');
  if (testimonials) {
    testimonials.innerHTML = approvedReviews.map((review) => `
      <article class="testimonial-card reveal in-view">
        <div class="stars">${starString(review.rating)}</div>
        <p>${review.comment}</p>
        <div class="review-meta"><div class="avatar">${review.avatar || review.name.slice(0, 2).toUpperCase()}</div><div><strong>${review.name}</strong><div style="color:var(--muted);">Verified guest</div></div></div>
      </article>`).join('');
    testimonials.insertAdjacentHTML('afterend', `
      <section class="section" style="padding-top:28px;">
        <div class="section-heading reveal in-view"><span class="eyebrow">Leave a review</span><h2 style="max-width:none;">Share your Aurelio House experience.</h2></div>
        <form id="review-form" class="form-card reveal in-view">
          <div class="form-grid two"><label>Name<input type="text" name="name" required></label><label>Rating<select name="rating" required><option value="">Select rating</option><option value="5">5 stars</option><option value="4">4 stars</option><option value="3">3 stars</option></select></label></div>
          <div class="form-grid two"><label>Avatar initials<input type="text" name="avatar" maxlength="2" placeholder="MS"></label><label>Photo URL (optional)<input type="url" name="photo"></label></div>
          <label>Comment<textarea name="comment" rows="4" required></textarea></label>
          <button class="btn btn-primary" type="submit">Submit Review</button>
          <p id="review-feedback" class="form-feedback"></p>
        </form>
      </section>`);
  }

  const galleryPreview = document.getElementById('gallery-preview');
  if (galleryPreview) {
    galleryPreview.innerHTML = galleryItems.slice(0, 4).map((item) => `<article class="gallery-card reveal in-view"><div><span class="eyebrow">Gallery</span><div class="overlay-title">${item}</div></div></article>`).join('');
  }

  const specialsCarousel = document.getElementById('specials-carousel');
  if (specialsCarousel) {
    const specials = current.menuItems.filter((item) => item.tags.includes('Chef recommended') || item.category === 'Special Dishes');
    const renderSpecials = () => {
      const rotated = [...specials.slice(specialsIndex), ...specials.slice(0, specialsIndex)].slice(0, 3);
      specialsCarousel.innerHTML = `<div class="carousel-row">${rotated.map((item) => `<article class="menu-card"><span class="eyebrow">Chef special</span><h3>${item.name}</h3><p>${item.description}</p><div class="price">${currency.format(item.price)}</div></article>`).join('')}</div>`;
    };
    renderSpecials();
    document.getElementById('specials-prev')?.addEventListener('click', () => {
      specialsIndex = (specialsIndex - 1 + specials.length) % specials.length;
      renderSpecials();
    });
    document.getElementById('specials-next')?.addEventListener('click', () => {
      specialsIndex = (specialsIndex + 1) % specials.length;
      renderSpecials();
    });
  }

  const socialFeed = document.getElementById('social-feed');
  if (socialFeed) {
    socialFeed.innerHTML = socialItems.map((item) => `<article class="social-tile reveal in-view"><span class="eyebrow">${item.title}</span><h3>${item.caption}</h3></article>`).join('');
  }

  const faqList = document.getElementById('faq-list');
  if (faqList) {
    faqList.innerHTML = faqItems.map((item, index) => `
      <article class="faq-item">
        <button class="faq-trigger" type="button">${item.question}<span>${index === 0 ? '-' : '+'}</span></button>
        <p class="${index === 0 ? '' : 'hidden'}">${item.answer}</p>
      </article>`).join('');
    faqList.querySelectorAll('.faq-trigger').forEach((button) => {
      button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        const isHidden = content.classList.contains('hidden');
        content.classList.toggle('hidden', !isHidden);
        button.querySelector('span').textContent = isHidden ? '-' : '+';
      });
    });
  }

  const urgencyHeading = document.querySelector('.urgency-card h3');
  if (urgencyHeading) urgencyHeading.textContent = current.content.urgencyText;
  const promoHeading = document.querySelector('.promo-banner h2');
  if (promoHeading) promoHeading.textContent = current.content.promoText;
  const heroTitle = document.querySelector('.hero-copy h1');
  if (heroTitle) heroTitle.textContent = current.content.heroTitle;

  const reviewForm = document.getElementById('review-form');
  reviewForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(reviewForm);
    updateState((draft) => {
      draft.reviews.unshift({
        id: makeId('rev'),
        name: formData.get('name').toString().trim(),
        rating: Number(formData.get('rating')),
        comment: formData.get('comment').toString().trim(),
        avatar: (formData.get('avatar').toString().trim() || formData.get('name').toString().slice(0, 2)).toUpperCase(),
        photo: formData.get('photo').toString().trim(),
        approved: false
      });
    });
    reviewForm.reset();
    const feedback = document.getElementById('review-feedback');
    if (feedback) feedback.textContent = 'Review submitted for admin approval.';
  });
}

function renderAbout() {
  const showcase = document.getElementById('interior-showcase');
  if (showcase) {
    showcase.innerHTML = galleryItems.slice(0, 4).map((item) => `<article class="gallery-card reveal in-view"><div><span class="eyebrow">Interior</span><div class="overlay-title">${item}</div></div></article>`).join('');
  }
}

function renderGallery() {
  const grid = document.getElementById('gallery-grid');
  if (grid) {
    grid.innerHTML = galleryItems.map((item, index) => `<article class="gallery-card reveal in-view" style="min-height:${index % 3 === 0 ? 300 : 240}px"><div><span class="eyebrow">Aurelio House</span><div class="overlay-title">${item}</div></div></article>`).join('');
  }
}

function renderMenuPage() {
  const skeletons = document.getElementById('menu-skeletons');
  const grid = document.getElementById('menu-grid');
  const filters = document.getElementById('menu-filters');
  const search = document.getElementById('menu-search');
  const categories = ['All', ...new Set(state().menuItems.map((item) => item.category))];
  let activeCategory = 'All';

  skeletons.innerHTML = Array.from({ length: 6 }, () => '<div class="skeleton-card"></div>').join('');
  filters.innerHTML = categories.map((category) => `<button class="filter-chip ${category === 'All' ? 'active' : ''}" type="button">${category}</button>`).join('');

  const applyMenu = () => {
    const query = search.value.trim().toLowerCase();
    const items = state().menuItems.filter((item) => {
      const categoryMatch = activeCategory === 'All' || item.category === activeCategory;
      const queryMatch = !query || `${item.name} ${item.description} ${item.tags.join(' ')} ${item.dietary.join(' ')}`.toLowerCase().includes(query);
      return categoryMatch && queryMatch;
    });
    renderMenuCards(grid, items);
  };

  setTimeout(() => {
    skeletons.classList.add('hidden');
    grid.classList.remove('hidden');
    applyMenu();
  }, 650);

  filters.querySelectorAll('.filter-chip').forEach((button) => {
    button.addEventListener('click', () => {
      filters.querySelectorAll('.filter-chip').forEach((chip) => chip.classList.remove('active'));
      button.classList.add('active');
      activeCategory = button.textContent;
      applyMenu();
    });
  });
  search.addEventListener('input', applyMenu);
}

function setupContactForm() {
  const form = document.getElementById('contact-form');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    updateState((draft) => {
      draft.messages.unshift({
        id: makeId('msg'),
        type: 'Inquiry',
        name: data.get('name').toString().trim(),
        email: data.get('email').toString().trim(),
        phone: data.get('phone').toString().trim(),
        subject: data.get('subject').toString().trim(),
        message: data.get('message').toString().trim()
      });
    });
    form.reset();
    document.getElementById('contact-feedback').textContent = 'Inquiry received. Our guest team will respond shortly.';
  });
}
function setupReservationPage() {
  const form = document.getElementById('reservation-form');
  if (!form) return;
  const dateInput = document.getElementById('reservation-date');
  const slotContainer = document.getElementById('time-slots');
  const timeInput = document.getElementById('selected-time');
  const summary = document.getElementById('reservation-summary');
  const successCard = document.getElementById('reservation-success');

  const today = new Date();
  const minDate = today.toISOString().split('T')[0];
  dateInput.min = minDate;
  dateInput.value = minDate;

  const renderSlots = () => {
    const selectedDate = dateInput.value;
    const booked = state().reservations.filter((reservation) => reservation.date === selectedDate).map((reservation) => reservation.time);
    slotContainer.innerHTML = timeSlots.map((slot, index) => {
      const disabled = booked.filter((time) => time === slot).length >= 2 || (index > 4 && selectedDate === minDate);
      return `<button class="slot-button" type="button" ${disabled ? 'disabled' : ''}>${slot}</button>`;
    }).join('');
    slotContainer.querySelectorAll('.slot-button:not([disabled])').forEach((button) => {
      button.addEventListener('click', () => {
        slotContainer.querySelectorAll('.slot-button').forEach((slot) => slot.classList.remove('active'));
        button.classList.add('active');
        timeInput.value = button.textContent;
        updateSummary();
      });
    });
  };

  const updateSummary = () => {
    const data = new FormData(form);
    summary.innerHTML = `
      <p><strong>Guest:</strong> ${data.get('name') || 'Your name'}</p>
      <p><strong>Date:</strong> ${data.get('date') || 'Select a date'}</p>
      <p><strong>Time:</strong> ${timeInput.value || 'Select a slot'}</p>
      <p><strong>Guests:</strong> ${data.get('guests') || 'Select guest count'}</p>
      <p><strong>Occasion:</strong> ${data.get('occasion') || 'Standard dining'}</p>`;
  };

  renderSlots();
  updateSummary();
  dateInput.addEventListener('change', () => {
    timeInput.value = '';
    renderSlots();
    updateSummary();
  });
  form.querySelectorAll('input, select, textarea').forEach((field) => field.addEventListener('input', updateSummary));

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    if (!timeInput.value) {
      document.getElementById('reservation-feedback').textContent = 'Please select an available seating time.';
      return;
    }
    updateState((draft) => {
      draft.reservations.unshift({
        id: makeId('res'),
        name: data.get('name').toString().trim(),
        email: data.get('email').toString().trim(),
        phone: data.get('phone').toString().trim(),
        date: data.get('date').toString(),
        time: data.get('time').toString(),
        guests: data.get('guests').toString(),
        occasion: data.get('occasion').toString() || 'Standard dining',
        request: data.get('request').toString().trim(),
        status: 'Pending'
      });
    });
    form.reset();
    dateInput.value = minDate;
    timeInput.value = '';
    renderSlots();
    updateSummary();
    successCard.classList.remove('hidden');
    document.getElementById('reservation-feedback').textContent = 'Reservation request submitted successfully.';
  });
}

function setupAuthPage() {
  const tabs = document.querySelectorAll('.auth-tab');
  if (!tabs.length) return;
  const forms = {
    login: document.getElementById('login-form'),
    signup: document.getElementById('signup-form'),
    forgot: document.getElementById('forgot-form')
  };
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((button) => button.classList.remove('active'));
      tab.classList.add('active');
      Object.entries(forms).forEach(([key, form]) => form.classList.toggle('hidden', key !== tab.dataset.authTab));
    });
  });

  forms.login.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(forms.login);
    const email = data.get('email').toString().trim().toLowerCase();
    const password = data.get('password').toString();
    const user = state().users.find((entry) => entry.email.toLowerCase() === email && entry.password === password);
    const feedback = document.getElementById('login-feedback');
    if (!user) {
      feedback.textContent = 'Invalid credentials. Try the demo admin account or a saved guest profile.';
      return;
    }
    setSession(user, Boolean(data.get('remember')));
    feedback.textContent = user.role === 'admin' ? 'Admin authenticated. Opening dashboard...' : 'Login successful. Redirecting to reservation page...';
    window.setTimeout(() => {
      window.location.href = user.role === 'admin' ? './admin.html' : './reservation.html';
    }, 800);
  });

  forms.signup.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(forms.signup);
    const email = data.get('email').toString().trim().toLowerCase();
    const exists = state().users.some((entry) => entry.email.toLowerCase() === email);
    const feedback = document.getElementById('signup-feedback');
    if (exists) {
      feedback.textContent = 'An account with this email already exists.';
      return;
    }
    const user = {
      id: makeId('user'),
      firstName: data.get('firstName').toString().trim(),
      lastName: data.get('lastName').toString().trim(),
      email,
      phone: data.get('phone').toString().trim(),
      password: data.get('password').toString(),
      role: 'guest'
    };
    updateState((draft) => draft.users.unshift(user));
    setSession(user, true);
    feedback.textContent = 'Account created. Redirecting you to reservations...';
    forms.signup.reset();
    window.setTimeout(() => { window.location.href = './reservation.html'; }, 900);
  });

  forms.forgot.addEventListener('submit', (event) => {
    event.preventDefault();
    document.getElementById('forgot-feedback').textContent = 'Demo reset link sent. In production, this would trigger email recovery.';
    forms.forgot.reset();
  });
}

function createRow(item, details, actions = '') {
  return `<article class="table-row"><div class="row-top"><strong>${item}</strong>${details[0] ? `<span class="eyebrow">${details[0]}</span>` : ''}</div><div>${details.slice(1).map((line) => `<p>${line}</p>`).join('')}</div>${actions ? `<div class="row-actions">${actions}</div>` : ''}</article>`;
}
function renderAdmin() {
  const adminLogin = document.getElementById('admin-login-panel');
  const adminApp = document.getElementById('admin-app');
  const session = getSession();
  const isAdmin = session?.email === ADMIN_CREDENTIALS.email && session?.password === ADMIN_CREDENTIALS.password;
  adminLogin.classList.toggle('hidden', isAdmin);
  adminApp.classList.toggle('hidden', !isAdmin);

  document.getElementById('admin-login-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email').toString().trim();
    const password = data.get('password').toString();
    const feedback = document.getElementById('admin-login-feedback');
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const adminUser = state().users.find((entry) => entry.email === email);
      setSession(adminUser, true);
      feedback.textContent = 'Authenticated. Loading dashboard...';
      window.setTimeout(() => window.location.reload(), 700);
    } else {
      feedback.textContent = 'Use the provided showcase credentials.';
    }
  });

  if (!isAdmin) return;

  document.querySelectorAll('.admin-nav-link').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.admin-nav-link').forEach((link) => link.classList.remove('active'));
      document.querySelectorAll('.admin-section').forEach((section) => section.classList.remove('active'));
      button.classList.add('active');
      document.querySelector(`[data-admin-section="${button.dataset.adminView}"]`).classList.add('active');
    });
  });
  document.getElementById('admin-logout')?.addEventListener('click', () => {
    clearSession();
    window.location.reload();
  });

  const current = state();
  document.getElementById('admin-stats').innerHTML = [
    ['Upcoming reservations', current.reservations.length],
    ['Approved reviews', current.reviews.filter((review) => review.approved).length],
    ['Menu items', current.menuItems.length],
    ['Guest accounts', current.users.length]
  ].map(([label, value]) => `<article class="admin-card stat-card"><span class="eyebrow">${label}</span><h3>${value}</h3><p>Live demo data</p></article>`).join('');

  document.getElementById('analytics-bars').innerHTML = analyticsData.map((value, index) => `<div class="analytics-bar" style="height:${value * 2}px">${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][index]}</div>`).join('');
  document.getElementById('notification-center').innerHTML = [
    `${current.reservations.filter((item) => item.status === 'Pending').length} pending reservations require review.`,
    `${current.reviews.filter((item) => !item.approved).length} new guest reviews are awaiting approval.`,
    `${current.messages.length} messages are available in the inbox.`,
    current.content.announcement
  ].map((note) => `<article class="notice-item"><p>${note}</p></article>`).join('');

  const renderReservations = () => {
    document.getElementById('admin-reservations').innerHTML = current.reservations.map((reservation) => createRow(`${reservation.name} � ${reservation.time}`, [reservation.status, `${reservation.date} for ${reservation.guests} guests`, reservation.request || 'No special request'], `<button data-action="confirm" data-id="${reservation.id}">Confirm</button><button data-action="pending" data-id="${reservation.id}">Mark Pending</button><button data-action="cancel" data-id="${reservation.id}" class="danger">Cancel</button>`)).join('');
  };

  const renderReviews = () => {
    document.getElementById('admin-reviews').innerHTML = current.reviews.map((review) => createRow(`${review.name} � ${starString(review.rating)}`, [review.approved ? 'Approved' : 'Pending', review.comment], `<button data-action="approve-review" data-id="${review.id}">Approve</button><button data-action="delete-review" data-id="${review.id}" class="danger">Delete</button>`)).join('');
  };

  const renderMenuAdmin = () => {
    document.getElementById('admin-menu').innerHTML = current.menuItems.map((item) => createRow(`${item.name} � ${currency.format(item.price)}`, [item.category, item.description], `<button data-action="edit-menu" data-id="${item.id}">Edit</button><button data-action="delete-menu" data-id="${item.id}" class="danger">Delete</button>`)).join('');
  };

  document.getElementById('admin-users').innerHTML = current.users.map((user) => createRow(`${user.firstName} ${user.lastName}`, [user.role, user.email, user.phone], '')).join('');
  document.getElementById('admin-messages').innerHTML = current.messages.map((message) => createRow(`${message.subject}`, [message.type, `${message.name} � ${message.email}`, message.message], '')).join('');

  const contentForm = document.getElementById('content-form');
  const settingsForm = document.getElementById('settings-form');
  ['heroTitle', 'promoText', 'footerNote'].forEach((field) => { contentForm.elements[field].value = current.content[field]; });
  ['urgencyText', 'supportEmail', 'announcement'].forEach((field) => { settingsForm.elements[field].value = current.content[field]; });
  const renderContentPreview = () => {
    document.getElementById('content-preview').innerHTML = `
      <div class="notice-item"><strong>Hero title</strong><p>${state().content.heroTitle}</p></div>
      <div class="notice-item"><strong>Promo banner</strong><p>${state().content.promoText}</p></div>
      <div class="notice-item"><strong>Footer note</strong><p>${state().content.footerNote}</p></div>
      <div class="notice-item"><strong>Urgency text</strong><p>${state().content.urgencyText}</p></div>`;
  };

  renderReservations();
  renderReviews();
  renderMenuAdmin();
  renderContentPreview();

  document.getElementById('admin-reservations').addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;
    updateState((draft) => {
      const item = draft.reservations.find((entry) => entry.id === button.dataset.id);
      if (!item) return;
      item.status = button.dataset.action === 'confirm' ? 'Confirmed' : button.dataset.action === 'pending' ? 'Pending' : 'Cancelled';
    });
    window.location.reload();
  });

  document.getElementById('admin-reviews').addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;
    updateState((draft) => {
      if (button.dataset.action === 'approve-review') {
        const review = draft.reviews.find((entry) => entry.id === button.dataset.id);
        if (review) review.approved = true;
      }
      if (button.dataset.action === 'delete-review') {
        draft.reviews = draft.reviews.filter((entry) => entry.id !== button.dataset.id);
      }
    });
    window.location.reload();
  });

  document.getElementById('admin-menu').addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.dataset.action === 'edit-menu') {
      const item = state().menuItems.find((entry) => entry.id === button.dataset.id);
      const form = document.getElementById('menu-item-form');
      menuEditId = item.id;
      form.elements.name.value = item.name;
      form.elements.price.value = item.price;
      form.elements.category.value = item.category;
      form.elements.tags.value = item.tags.join(', ');
      form.elements.description.value = item.description;
      document.getElementById('menu-item-feedback').textContent = `Editing ${item.name}. Save to update.`;
      return;
    }
    if (button.dataset.action === 'delete-menu') {
      updateState((draft) => {
        draft.menuItems = draft.menuItems.filter((entry) => entry.id !== button.dataset.id);
      });
      window.location.reload();
    }
  });

  document.getElementById('menu-item-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = { id: menuEditId || makeId('menu'), name: data.get('name').toString().trim(), category: data.get('category').toString(), price: Number(data.get('price')), tags: data.get('tags').toString().split(',').map((tag) => tag.trim()).filter(Boolean), dietary: [], popular: true, description: data.get('description').toString().trim() };
    updateState((draft) => {
      const index = draft.menuItems.findIndex((entry) => entry.id === payload.id);
      if (index >= 0) draft.menuItems[index] = { ...draft.menuItems[index], ...payload };
      else draft.menuItems.unshift(payload);
    });
    event.currentTarget.reset();
    menuEditId = null;
    document.getElementById('menu-item-feedback').textContent = 'Menu item saved.';
    window.setTimeout(() => window.location.reload(), 500);
  });

  contentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    updateState((draft) => {
      draft.content.heroTitle = data.get('heroTitle').toString().trim();
      draft.content.promoText = data.get('promoText').toString().trim();
      draft.content.footerNote = data.get('footerNote').toString().trim();
    });
    document.getElementById('content-feedback').textContent = 'Homepage content updated.';
    renderContentPreview();
  });

  settingsForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    updateState((draft) => {
      draft.content.urgencyText = data.get('urgencyText').toString().trim();
      draft.content.supportEmail = data.get('supportEmail').toString().trim();
      draft.content.announcement = data.get('announcement').toString().trim();
    });
    document.getElementById('settings-feedback').textContent = 'Operational settings saved.';
    renderContentPreview();
  });
}

function route() {
  injectShell();
  setupGlobalUI();
  if (page === 'home') renderHome();
  if (page === 'about') renderAbout();
  if (page === 'gallery') renderGallery();
  if (page === 'menu') renderMenuPage();
  if (page === 'contact') setupContactForm();
  if (page === 'reservation') setupReservationPage();
  if (page === 'auth') setupAuthPage();
  if (page === 'admin') renderAdmin();
}

route();
