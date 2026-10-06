document.addEventListener('DOMContentLoaded', () => {
  const weddingDate = new Date('2026-12-26T07:00:00');

  function updateCountdown() {
    const now = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
      document.getElementById('days').textContent = '00';
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  const form = document.getElementById('messageForm');
  const messageList = document.getElementById('messageList');

  function renderMessages() {
    const messages = JSON.parse(localStorage.getItem('weddingMessages') || '[]');
    messageList.innerHTML = '';

    messages.slice().reverse().forEach((item) => {
      const card = document.createElement('div');
      card.className = 'message-card';
      card.innerHTML = `
        <strong>${item.name}</strong>
        <p>“${item.message}”</p>
      `;
      messageList.appendChild(card);
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('guestName');
    const messageInput = document.getElementById('guestMessage');

    if (!nameInput.value.trim() || !messageInput.value.trim()) {
      alert('សូមបំពេញឈ្មោះ និងសារជូនពរ');
      return;
    }

    const messages = JSON.parse(localStorage.getItem('weddingMessages') || '[]');
    messages.push({
      name: nameInput.value.trim(),
      message: messageInput.value.trim(),
    });

    localStorage.setItem('weddingMessages', JSON.stringify(messages));
    nameInput.value = '';
    messageInput.value = '';
    renderMessages();
    alert('សារជូនពររបស់អ្នកបានផ្ញើដោយជោគជ័យ ❤');
  });

  const rsvpForm = document.getElementById('rsvpForm');

  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('rsvpName').value.trim();
    const attendance = document.querySelector('input[name="attendance"]:checked');

    if (!name || !attendance) {
      alert('សូមបំពេញឈ្មោះ និងជ្រើសរើសការចូលរួម');
      return;
    }

    const guestCount = document.getElementById('guestCount').value;
    const companionName = document.getElementById('companionName').value.trim();
    const extraNote = document.getElementById('extraNote').value.trim();

    const entries = JSON.parse(localStorage.getItem('weddingRSVP') || '[]');
    entries.push({
      name,
      attendance: attendance.value === 'yes' ? 'ចូលរួម' : 'មិនអាចចូលរួម',
      guestCount,
      companionName: companionName || 'N/A',
      extraNote: extraNote || 'N/A',
    });

    localStorage.setItem('weddingRSVP', JSON.stringify(entries));
    rsvpForm.reset();
    alert('បញ្ជាក់ការចូលរួមរបស់អ្នកបានទទួលដោយជោគជ័យ 🎉');
  });

  renderMessages();
});
