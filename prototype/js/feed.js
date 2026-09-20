/**
 * TikMatch Prototype - Feed Video Controller (TikTok Vertical Scroll-Snap)
 */

import { sampleVideos, mockComments } from './data.js';
import { getLang, getText } from './i18n.js';

let showToastCallback = null;
let loginTriggerCallback = null;
let isUserLoggedIn = false;
let activeCommentVideoIndex = 0;

export function initFeed(toastCallback, onLoginTrigger) {
  showToastCallback = toastCallback;
  loginTriggerCallback = onLoginTrigger;
  renderAllVideos();
  bindFeedEvents();
}

export function updateFeedGuestState(isLoggedIn) {
  isUserLoggedIn = isLoggedIn;
}

/**
 * Render all 5 seeded videos into #feed-scroll-container
 * Each video is a full-height snap card (TikTok style)
 */
export function renderAllVideos() {
  const container = document.getElementById('feed-scroll-container');
  if (!container) return;

  container.innerHTML = sampleVideos.map((v, index) => `
    <div class="feed-card" id="card-${v.id}" data-index="${index}" style="background-image: url('${v.bgImage}')">
      <div class="floating-hearts-layer" id="hearts-layer-${index}"></div>

      <!-- Video Details Overlay Bottom -->
      <div class="video-overlay-bottom">
        <div class="creator-info">
          <span class="creator-name">@${v.author}</span>
          ${v.author === 'sara_angola_official' ? `
            <svg class="verified-badge-mini" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
          ` : ''}
          <span class="creator-loc-badge">📍 ${v.location}</span>
        </div>
        <p class="video-caption">${v.caption}</p>
        <div class="video-tags">
          ${v.tags.map(t => `<span class="tag-item">${t}</span>`).join('')}
        </div>
        <div class="music-marquee">
          <svg class="music-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
          <span>${v.music}</span>
        </div>
      </div>

      <!-- Side Actions Bar -->
      <div class="side-actions-bar">
        <!-- Author Avatar + Follow Button -->
        <div class="author-avatar-wrap">
          <img class="author-avatar" src="${v.avatar}" alt="${v.author}"/>
          <div class="follow-plus-btn ${v.isFollowed ? 'followed' : ''}" data-action="follow" data-index="${index}">
            ${v.isFollowed ? '✓' : '+'}
          </div>
        </div>

        <!-- Like Button -->
        <button class="action-btn-item ${v.isLiked ? 'liked' : ''}" data-action="like" data-index="${index}">
          <div class="action-circle-icon">
            <svg viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <span class="action-label like-label">${v.likes.toLocaleString()}</span>
        </button>

        <!-- Comments Button (Opens bottom sheet) -->
        <button class="action-btn-item" data-action="comment" data-index="${index}">
          <div class="action-circle-icon">
            <svg viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
            </svg>
          </div>
          <span class="action-label comment-label">${v.comments.toLocaleString()}</span>
        </button>

        <!-- Share Button -->
        <button class="action-btn-item" data-action="share" data-index="${index}">
          <div class="action-circle-icon">
            <svg viewBox="0 0 24 24">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
            </svg>
          </div>
          <span class="action-label">${v.shares.toLocaleString()}</span>
        </button>

        <!-- Rotating Music Disc -->
        <div class="music-disc">
          <img src="${v.avatar}" alt="disc"/>
        </div>
      </div>
    </div>
  `).join('');
}

function spawnFlyingHeart(cardIndex, x, y) {
  const layer = document.getElementById(`hearts-layer-${cardIndex}`);
  if (!layer) return;

  const heart = document.createElement('div');
  heart.className = 'flying-heart';
  heart.innerHTML = `<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
  heart.style.left = `${x || 200}px`;
  heart.style.bottom = `${y || 160}px`;
  layer.appendChild(heart);

  setTimeout(() => heart.remove(), 1200);
}

function bindFeedEvents() {
  const container = document.getElementById('feed-scroll-container');
  if (!container) return;

  // Live Button Click
  const liveBtn = document.getElementById('feed-live-btn');
  if (liveBtn) {
    liveBtn.addEventListener('click', () => {
      if (!isUserLoggedIn && loginTriggerCallback) {
        loginTriggerCallback();
      }
    });
  }

  // Delegated Click Events on Container (Like, Comment, Follow, Share)
  container.addEventListener('click', (e) => {
    // 1. Follow button
    const followBtn = e.target.closest('[data-action="follow"]');
    if (followBtn) {
      e.stopPropagation();
      const index = parseInt(followBtn.dataset.index, 10);
      const v = sampleVideos[index];

      if (!isUserLoggedIn) {
        if (showToastCallback) {
          showToastCallback(
            getLang() === 'vi' ? "Yêu cầu đăng nhập" : "Iniciar Sessão",
            getLang() === 'vi' ? "Đăng nhập để theo dõi nhà sáng tạo này nhé!" : "Inicie sessão para seguir criadores!"
          );
        }
        if (loginTriggerCallback) loginTriggerCallback();
        return;
      }

      v.isFollowed = !v.isFollowed;
      if (v.isFollowed) {
        followBtn.classList.add('followed');
        followBtn.innerHTML = '✓';
        if (showToastCallback) {
          showToastCallback(
            getLang() === 'vi' ? "Đã theo dõi!" : "A Seguir!",
            getLang() === 'vi' ? `Bạn đã theo dõi @${v.author}` : `Você começou a seguir @${v.author}`
          );
        }
      } else {
        followBtn.classList.remove('followed');
        followBtn.innerHTML = '+';
      }
      return;
    }

    // 2. Like button
    const likeBtn = e.target.closest('[data-action="like"]');
    if (likeBtn) {
      e.stopPropagation();
      const index = parseInt(likeBtn.dataset.index, 10);
      const v = sampleVideos[index];
      v.isLiked = !v.isLiked;

      const label = likeBtn.querySelector('.like-label');
      if (v.isLiked) {
        v.likes++;
        likeBtn.classList.add('liked');
        spawnFlyingHeart(index, 260, 180);
      } else {
        v.likes--;
        likeBtn.classList.remove('liked');
      }
      if (label) label.textContent = v.likes.toLocaleString();
      return;
    }

    // 3. Comment button -> OPENS BOTTOM SHEET
    const commentBtn = e.target.closest('[data-action="comment"]');
    if (commentBtn) {
      e.stopPropagation();
      const index = parseInt(commentBtn.dataset.index, 10);
      openCommentsSheet(index);
      return;
    }

    // 4. Share button
    const shareBtn = e.target.closest('[data-action="share"]');
    if (shareBtn) {
      e.stopPropagation();
      const index = parseInt(shareBtn.dataset.index, 10);
      const v = sampleVideos[index];
      if (showToastCallback) {
        showToastCallback(
          getLang() === 'vi' ? "Đã sao chép liên kết!" : "Link Copiado!",
          getLang() === 'vi' ? `Đã sao chép liên kết video @${v.author}` : `Link do vídeo de @${v.author} copiado`
        );
      }
      return;
    }
  });

  // Double Tap on Feed Cards for Hearts & Likes
  let lastTap = 0;
  container.addEventListener('click', (e) => {
    const card = e.target.closest('.feed-card');
    if (!card) return;
    if (e.target.closest('.side-actions-bar') || e.target.closest('.video-overlay-bottom')) return;

    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    if (tapLength < 320 && tapLength > 0) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - 15;
      const y = rect.bottom - e.clientY - 15;
      const index = parseInt(card.dataset.index, 10);
      spawnFlyingHeart(index, x, y);

      const v = sampleVideos[index];
      if (!v.isLiked) {
        v.isLiked = true;
        v.likes++;
        const likeBtn = card.querySelector('[data-action="like"]');
        if (likeBtn) {
          likeBtn.classList.add('liked');
          const label = likeBtn.querySelector('.like-label');
          if (label) label.textContent = v.likes.toLocaleString();
        }
      }
    }
    lastTap = currentTime;
  });

  // Close Comments Sheet Events
  const closeSheetBtn = document.getElementById('close-comments-btn');
  const commentsBackdrop = document.getElementById('comments-backdrop');

  if (closeSheetBtn) closeSheetBtn.addEventListener('click', closeCommentsSheet);
  if (commentsBackdrop) commentsBackdrop.addEventListener('click', closeCommentsSheet);

  // Send Comment Event
  const sendCommentBtn = document.getElementById('send-comment-btn');
  const commentInput = document.getElementById('comment-input');

  const addComment = () => {
    if (!commentInput) return;
    const text = commentInput.value.trim();
    if (!text) return;

    mockComments.unshift({
      user: isUserLoggedIn ? "sara_angola_official" : "voce_angola",
      text: text,
      time: "Vừa xong",
      avatar: isUserLoggedIn 
        ? "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"
        : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
    });
    commentInput.value = '';
    renderComments();

    const v = sampleVideos[activeCommentVideoIndex];
    if (v) {
      v.comments++;
      const card = document.getElementById(`card-${v.id}`);
      if (card) {
        const commentLabel = card.querySelector('.comment-label');
        if (commentLabel) commentLabel.textContent = v.comments.toLocaleString();
      }
      const sheetTitle = document.getElementById('sheet-title-text');
      if (sheetTitle) sheetTitle.textContent = `${getText('comments')} (${v.comments.toLocaleString()})`;
    }
  };

  if (sendCommentBtn) sendCommentBtn.addEventListener('click', addComment);
  if (commentInput) {
    commentInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') addComment();
    });
  }
}

function openCommentsSheet(videoIndex) {
  activeCommentVideoIndex = videoIndex;
  const v = sampleVideos[videoIndex];
  const sheet = document.getElementById('comments-sheet');
  const backdrop = document.getElementById('comments-backdrop');
  const title = document.getElementById('sheet-title-text');

  if (title && v) {
    title.textContent = `${getText('comments')} (${v.comments.toLocaleString()})`;
  }

  renderComments();
  if (sheet) sheet.classList.add('open');
  if (backdrop) backdrop.classList.add('open');
}

function closeCommentsSheet() {
  const sheet = document.getElementById('comments-sheet');
  const backdrop = document.getElementById('comments-backdrop');
  if (sheet) sheet.classList.remove('open');
  if (backdrop) backdrop.classList.remove('open');
}

function renderComments() {
  const list = document.getElementById('comments-list-body');
  if (!list) return;

  list.innerHTML = '';
  mockComments.forEach(c => {
    const row = document.createElement('div');
    row.className = 'comment-row';
    row.innerHTML = `
      <img src="${c.avatar}" class="comment-avatar" alt="${c.user}"/>
      <div class="comment-content">
        <div class="comment-author">@${c.user} <span class="comment-time">${c.time}</span></div>
        <div class="comment-text">${c.text}</div>
      </div>
    `;
    list.appendChild(row);
  });
}
