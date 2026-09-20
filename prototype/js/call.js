/**
 * TikMatch Prototype - In-Call Voice Call Controller
 */

import { getText, getLang } from './i18n.js';

let callTimerInterval = null;
let callSecondsRemaining = 225; // 3 mins 45 secs
let isFollowed = false;
let toastCallback = null;
let addChatPartnerCallback = null;
let endCallCallback = null;

export function initCall(onToast, onAddChat, onEndCall) {
  toastCallback = onToast;
  addChatPartnerCallback = onAddChat;
  endCallCallback = onEndCall;
  bindCallEvents();
}

export function startVoiceCall() {
  isFollowed = false;
  callSecondsRemaining = 225;

  const followBtn = document.getElementById('in-call-follow-btn');
  const followText = document.getElementById('in-call-follow-text');
  if (followBtn) followBtn.classList.remove('connected');
  if (followText) followText.textContent = getText('followBtn');

  clearInterval(callTimerInterval);
  updateTimerDisplay();

  const dynamicIsland = document.getElementById('dynamic-island');
  if (dynamicIsland) dynamicIsland.classList.add('call-active');

  callTimerInterval = setInterval(() => {
    callSecondsRemaining--;
    updateTimerDisplay();
    if (callSecondsRemaining <= 0) {
      clearInterval(callTimerInterval);
      endVoiceCall();
    }
  }, 1000);
}

export function endVoiceCall() {
  clearInterval(callTimerInterval);
  callTimerInterval = null;

  const dynamicIsland = document.getElementById('dynamic-island');
  if (dynamicIsland) dynamicIsland.classList.remove('call-active');

  if (endCallCallback) endCallCallback();
}

function updateTimerDisplay() {
  const mins = Math.floor(callSecondsRemaining / 60);
  const secs = callSecondsRemaining % 60;
  const timerStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  const timerEl = document.getElementById('call-countdown-timer');
  const islandTimer = document.getElementById('island-timer');
  if (timerEl) timerEl.textContent = timerStr;
  if (islandTimer) islandTimer.textContent = timerStr;

  if (timerEl && timerEl.parentElement) {
    if (callSecondsRemaining <= 30) {
      timerEl.parentElement.classList.add('urgent');
    } else {
      timerEl.parentElement.classList.remove('urgent');
    }
  }
}

function bindCallEvents() {
  // Follow button on in-call screen
  const followBtn = document.getElementById('in-call-follow-btn');
  const followText = document.getElementById('in-call-follow-text');

  if (followBtn) {
    followBtn.addEventListener('click', () => {
      isFollowed = true;
      followBtn.classList.add('connected');
      if (followText) followText.textContent = getText('followedBtn');

      if (toastCallback) {
        toastCallback(
          getLang() === 'vi' ? "Kết nối thành công! 🎉" : "Conexão Estabelecida! 🎉",
          getText('toastFollowed')
        );
      }

      if (addChatPartnerCallback) {
        addChatPartnerCallback({
          name: "Esperança Manuel",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
          location: "Luanda, Maianga"
        });
      }
    });
  }

  // Skip button
  const skipBtn = document.getElementById('call-skip-btn');
  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      if (toastCallback) {
        toastCallback(
          getLang() === 'vi' ? "Chuyển lượt gọi khác" : "Próxima chamada",
          getLang() === 'vi' ? "Đang ghép nối với bạn trò chuyện mới tại Luanda..." : "A procurar novo utilizador em Luanda..."
        );
      }
      startVoiceCall();
    });
  }

  // Hangup button
  const hangupBtn = document.getElementById('call-hangup-btn');
  if (hangupBtn) {
    hangupBtn.addEventListener('click', () => {
      endVoiceCall();
    });
  }

  // Mute button
  const muteBtn = document.getElementById('call-mute-btn');
  if (muteBtn) {
    muteBtn.addEventListener('click', () => {
      muteBtn.classList.toggle('muted');
    });
  }
}
