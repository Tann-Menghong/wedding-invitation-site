document.addEventListener('DOMContentLoaded', () => {
  // Countdown Timer
  const weddingDate = new Date('2026-12-26T07:00:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = weddingDate - now;

    if (timeLeft < 0) {
      document.querySelectorAll('.countdown-value').forEach(el => el.textContent = '00');
      return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Message Form
  const messageForm = document.getElementById('messageForm');
  const messageList = document.getElementById('messageList');

  function renderMessages() {
    const messages = JSON.parse(localStorage.getItem('weddingMessages') || '[]');
    messageList.innerHTML = '';

    if (messages.length === 0) {
      messageList.innerHTML = '<p style="text-align: center; color: #5f5a68; padding: 30px;">No messages yet. Be the first to share!</p>';
      return;
    }

    messages.slice().reverse().forEach((msg) => {
      const card = document.createElement('div');
      card.className = 'message-card';
      card.innerHTML = `
        <strong>${escapeHtml(msg.name)}</strong>
        <p>"${escapeHtml(msg.message)}"</p>
      `;
      messageList.appendChild(card);
    });
  }

  messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('guestName').value.trim();
    const message = document.getElementById('guestMessage').value.trim();

    if (!name || !message) {
      alert('Please fill in all fields');
      return;
    }

    const messages = JSON.parse(localStorage.getItem('weddingMessages') || '[]');
    messages.push({ name, message });
    localStorage.setItem('weddingMessages', JSON.stringify(messages));

    messageForm.reset();
    renderMessages();
    alert('Thank you for your wishes! ❤️');
  });

  // RSVP Form
  const rsvpForm = document.getElementById('rsvpForm');
  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('rsvpName').value.trim();
    const attendance = document.querySelector('input[name="attendance"]:checked');

    if (!name || !attendance) {
      alert('Please fill in all required fields');
      return;
    }

    const rsvpData = {
      name,
      attendance: attendance.value === 'yes' ? 'Attending' : 'Not Attending',
      guestCount: document.getElementById('guestCount').value,
      companion: document.getElementById('companionName').value.trim() || 'N/A',
      notes: document.getElementById('extraNote').value.trim() || 'N/A',
      timestamp: new Date().toLocaleString()
    };

    const rsvpList = JSON.parse(localStorage.getItem('weddingRSVP') || '[]');
    rsvpList.push(rsvpData);
    localStorage.setItem('weddingRSVP', JSON.stringify(rsvpList));

    rsvpForm.reset();
    alert('Thank you for confirming your attendance! 🎉');
    console.log('RSVP:', rsvpData);
  });

  // Utility
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Initial render
  renderMessages();

  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
  }

  // Smooth scroll for nav links
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        if (navMenu) navMenu.style.display = 'none';
      }
    });
  });
});
