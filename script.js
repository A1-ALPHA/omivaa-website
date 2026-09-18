const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-toggle]');
const navigation = document.querySelector('[data-nav]');
const enquiryForm = document.querySelector('[data-enquiry-form]');
const formStatus = document.querySelector('[data-form-status]');

const updateHeader = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 18);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  navigation?.classList.toggle('is-open', !open);
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
  });
});

document.querySelector('[data-year]').textContent = new Date().getFullYear();

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
}

enquiryForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!enquiryForm.reportValidity()) return;

  const data = new FormData(enquiryForm);
  const name = String(data.get('name') || '').trim();
  const company = String(data.get('company') || '').trim();
  const interest = String(data.get('interest') || '').trim();
  const message = String(data.get('message') || '').trim();

  const lines = [
    'Hi Omivaa,',
    '',
    `My name is ${name}.`,
    company ? `Company / channel: ${company}` : '',
    `I am looking for: ${interest}`,
    '',
    message,
  ].filter(Boolean);

  const whatsappUrl = `https://wa.me/918500540352?text=${encodeURIComponent(lines.join('\n'))}`;
  formStatus.textContent = 'Opening WhatsApp with your enquiry…';
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
});
