/**
 * TikMatch Prototype - Chat 1-1 Controller (WhatsApp Style)
 */

import { getLang } from './i18n.js';

let quickCallCallback = null;
let loginTriggerCallback = null;

export function initChat(onQuickCall, onLoginTrigger) {
  quickCallCallback = onQuickCall;
  loginTriggerCallback = onLoginTrigger;
  bindChatEvents();
}

export function updateChatGuestState(isLoggedIn) {
  const guestView = document.getElementById('chat-guest-view');
  const activeView = document.getElementById('chat-active-view');

  if (guestView && activeView) {
    if (isLoggedIn) {
      guestView.style.display = 'none';
      activeView.style.display = 'flex';
    } else {
      guestView.style.display = 'flex';
      activeView.style.display = 'none';
    }
  }
}

export function addMatchedPartner(partner) {
  const container = document.getElementById('matched-stories-list');
  if (!container) return;

  const existing = document.getElementById('story-partner-dynamic');
  if (!existing) {
    const item = document.createElement('div');
    item.className = 'match-story-item';
    item.id = 'story-partner-dynamic';
    item.innerHTML = `
      <div class="story-ring">
        <img src="${partner.avatar}" alt="${partner.name}"/>
        <div class="online-dot"></div>
      </div>
      <span class="story-name">${partner.name.split(' ')[0]}</span>
    `;
    item.addEventListener('click', () => {
      openDirectChat(partner.name, partner.avatar);
    });
    container.prepend(item);
  }
}

function bindChatEvents() {
  // Guest login button
  const guestLoginBtn = document.getElementById('chat-guest-login-btn');
  if (guestLoginBtn) {
    guestLoginBtn.addEventListener('click', () => {
      if (loginTriggerCallback) loginTriggerCallback();
    });
  }

  // Existing thread clicks
  document.querySelectorAll('.conv-item').forEach(item => {
    item.addEventListener('click', () => {
      const name = item.dataset.name;
      const avatar = item.dataset.avatar;
      openDirectChat(name, avatar);
    });
  });

  // Back button
  const backBtn = document.getElementById('back-chat-btn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      const windowEl = document.getElementById('direct-chat-window');
      if (windowEl) windowEl.classList.remove('open');
    });
  }

  // Send message
  const sendBtn = document.getElementById('chat-send-btn');
  const inputEl = document.getElementById('chat-msg-input');

  const handleSend = () => {
    if (!inputEl) return;
    const text = inputEl.value.trim();
    if (!text) return;

    appendBubble(text, 'me');
    inputEl.value = '';

    // Simulated reply
    setTimeout(() => {
      const replies = getLang() === 'vi'
        ? ["Rất vui được nói chuyện với bạn!", "Bạn có đang ở Luanda không?", "Giọng bạn lúc gọi nghe ấm áp lắm đấy! 😊"]
        : ["Que bom falar contigo!", "Estás em Luanda agora?", "Foi ótimo o nosso papo na chamada! 😊"];
      const reply = replies[Math.floor(Math.random() * replies.length)];
      appendBubble(reply, 'them');
    }, 1200);
  };

  if (sendBtn) sendBtn.addEventListener('click', handleSend);
  if (inputEl) {
    inputEl.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSend();
    });
  }

  // Quick call shortcut in direct chat room
  const callShortcut = document.getElementById('chat-call-shortcut');
  if (callShortcut) {
    callShortcut.addEventListener('click', () => {
      const windowEl = document.getElementById('direct-chat-window');
      if (windowEl) windowEl.classList.remove('open');
      if (quickCallCallback) quickCallCallback();
    });
  }
}

export function openDirectChat(name, avatar) {
  const windowEl = document.getElementById('direct-chat-window');
  const nameEl = document.getElementById('room-partner-name');
  const avatarEl = document.getElementById('room-partner-avatar');

  if (nameEl) nameEl.textContent = name;
  if (avatarEl) avatarEl.src = avatar;
  if (windowEl) windowEl.classList.add('open');
}

function appendBubble(text, sender) {
  const container = document.getElementById('chat-messages-box');
  if (!container) return;

  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${sender}`;
  bubble.innerHTML = `
    <div>${text}</div>
    <div class="chat-bubble-time">${timeStr}</div>
  `;
  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
}
