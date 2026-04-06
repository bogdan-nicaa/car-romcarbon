/* =============================================
   CAR Romcarbon – Interactive Logic
   Loan Simulator, Nav scroll, Animations
   ============================================= */

// --- Navbar scroll effect ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// --- Mobile hamburger menu ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
// Close menu when a link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// --- IntersectionObserver for fade-in animations ---
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // stagger slightly for sibling elements
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
fadeEls.forEach(el => observer.observe(el));

// --- Prosperity Bar animation ---
const prosperityFill = document.querySelector('.prosperity-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && prosperityFill) {
      const target = prosperityFill.dataset.target || '75';
      prosperityFill.style.width = target + '%';
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
if (prosperityFill) barObserver.observe(prosperityFill);

// --- Loan Simulator and Dynamic Content ---
const amountSlider = document.getElementById('amountSlider');
const periodSlider = document.getElementById('periodSlider');
const rateSelect = document.getElementById('rateSelect');

const amountDisplay = document.getElementById('amountDisplay');
const periodDisplay = document.getElementById('periodDisplay');
const rateDisplay = document.getElementById('rateDisplay');

const monthlyResult = document.getElementById('monthlyResult');
const totalResult = document.getElementById('totalResult');
const interestResult = document.getElementById('interestResult');
const costResult = document.getElementById('costResult');

function formatRON(value) {
  return new Intl.NumberFormat('ro-RO', { style: 'currency', currency: 'RON', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
}

const defaultRates = { standard: 9, promo: 8.5, green: 8, noguarantor: 10 };
let currentRates = { ...defaultRates };

function populateRatesAndCalculate() {
  const rs = document.getElementById('lblRateStandard');
  const rp = document.getElementById('lblRatePromo');
  const rg = document.getElementById('lblRateGreen');
  if(rs) rs.textContent = String(currentRates.standard).replace('.', ',') + '%';
  if(rp) rp.textContent = String(currentRates.promo).replace('.', ',') + '%';
  if(rg) rg.textContent = String(currentRates.green).replace('.', ',') + '%';

  if (rateSelect) {
    // Preserve current value if updating, or use standard as default
    const currentVal = rateSelect.value || currentRates.standard;
    rateSelect.innerHTML = `
      <option value="${currentRates.green}">${String(currentRates.green).replace('.', ',')}% – Împrumut Verde (cel mai avantajos)</option>
      <option value="${currentRates.promo}">${String(currentRates.promo).replace('.', ',')}% – Promoțional</option>
      <option value="${currentRates.standard}" ${currentVal == currentRates.standard ? 'selected' : ''}>${String(currentRates.standard).replace('.', ',')}% – Standard</option>
      <option value="${currentRates.noguarantor}">${String(currentRates.noguarantor).replace('.', ',')}% – Fără girant</option>
    `;
  }
  calculateLoan();
}

function calculateLoan() {
  if(!amountSlider || !periodSlider || !rateSelect) return;
  const principal = parseFloat(amountSlider.value);
  const months = parseInt(periodSlider.value);
  let annualRate = parseFloat(rateSelect.value);
  
  if (isNaN(annualRate)) annualRate = currentRates.standard;
  const monthlyRate = annualRate / 100 / 12;

  amountDisplay.textContent = formatRON(principal);
  periodDisplay.textContent = months + ' luni';
  rateDisplay.textContent = String(annualRate).replace('.', ',') + '%';

  if (monthlyRate === 0) {
    const monthly = principal / months;
    monthlyResult.textContent = formatRON(monthly) + ' / lună';
    totalResult.textContent = formatRON(principal);
    interestResult.textContent = formatRON(0);
    costResult.textContent = formatRON(1000 / months);
    return;
  }

  // Standard annuity formula
  const monthly = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  const total = monthly * months;
  const interest = total - principal;
  const costPer1000 = (1000 * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1));

  monthlyResult.textContent = formatRON(monthly) + ' / lună';
  totalResult.textContent = formatRON(total);
  interestResult.textContent = formatRON(interest);
  costResult.textContent = formatRON(costPer1000);
}

if (amountSlider) {
  amountSlider.addEventListener('input', calculateLoan);
  periodSlider.addEventListener('input', calculateLoan);
  rateSelect.addEventListener('change', calculateLoan);
}

// Fetch dynamic configuration
fetch('data/config.json')
  .then(res => res.json())
  .then(data => {
    if (data && data.rates) {
      currentRates = data.rates;
    }
    populateRatesAndCalculate();
  })
  .catch(err => {
    console.log("Using static default rates (failed to load config.json due to CORS/filepath).");
    populateRatesAndCalculate();
  });

// --- Contact Form (simulated submit) ---
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type=submit]');
    btn.textContent = 'Se trimite...';
    btn.disabled = true;
    setTimeout(() => {
      formSuccess.style.display = 'block';
      contactForm.reset();
      btn.textContent = 'Trimite Mesajul';
      btn.disabled = false;
      setTimeout(() => formSuccess.style.display = 'none', 5000);
    }, 1200);
  });
}

// --- Active nav link on scroll ---
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });
  navItems.forEach(link => {
    link.style.background = '';
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.background = 'rgba(21,66,18,0.08)';
      link.style.color = 'var(--primary)';
    }
  });
}, { passive: true });
