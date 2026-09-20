/**
 * TikMatch Prototype - i18n Localization Module
 * Languages: Vietnamese (VI) & Portuguese Angola (PT-AO)
 */

export const translations = {
  vi: {
    feedTab: "Video",
    matchTab: "Ghép Đôi",
    chatTab: "Tin Nhắn",
    profileTab: "Cá Nhân",
    guestChip: "👤 Khách",
    guestChipAction: "Đăng nhập",
    userChip: "Sara 🇦🇴",
    following: "Đang theo dõi",
    forYou: "Dành cho bạn",
    comments: "Bình luận",
    seedingBadge: "Tự động Seeding",
    writeComment: "Viết bình luận...",
    
    // Screen 2: Match
    matchHeaderTitle: "Ghép Đôi Thoại Ngẫu Nhiên",
    matchHeaderDesc: "Kết nối trò chuyện thoại tức thì không lộ mặt",
    dailyQuota: "Còn 5 lượt gọi hôm nay",
    filterGender: "Giới tính",
    filterAge: "Độ tuổi",
    genderAll: "Tất cả",
    genderFemale: "Nữ",
    genderMale: "Nam",
    startMatching: "Bắt đầu Tìm kiếm Ngẫu nhiên",
    connectingStatus: "Đang kết nối...",
    
    // Screen 2: Match Guest State
    matchGuestTitle: "Ghép Đôi Thoại Ngẫu Nhiên",
    matchGuestSubtitle: "Kết nối trò chuyện thoại tức thì không lộ mặt với bạn bè mới.",
    matchGuestBtn: "Bắt đầu ngay",

    // Screen 3: Call
    callingTitle: "Cuộc gọi thoại ngẫu nhiên",
    inCallStatus: "Đang thoại trực tiếp",
    followPrompt: "Thấy hợp gu? <strong>Bấm Theo dõi ngay</strong> trên màn hình để mở khóa Chat & Gọi không giới hạn sau 3 phút!",
    followBtn: "Theo dõi (Follow) để kết nối",
    followedBtn: "✓ Đã kết nối! Bạn có thể Chat",
    skipBtn: "Bỏ qua (Skip)",
    endCallBtn: "Kết thúc",

    // Screen 4: Chat Active
    chatHeader: "Tin nhắn & Bạn bè",
    matchedRecent: "Vừa ghép đôi",
    directNotice: "Hai bạn đã theo dõi chéo qua cuộc gọi thoại ngẫu nhiên",
    typeMessage: "Nhắn tin...",

    // Screen 4: Chat Guest State
    chatGuestTitle: "Đăng nhập vào TikMatch",
    chatGuestSubtitle: "Xem tin nhắn từ bạn bè và các thông báo mới nhất.",
    chatGuestBtn: "Đăng nhập",

    // Screen 5: Guest Profile
    guestTitle: "Hồ sơ của bạn",
    guestSubtitle: "Đăng nhập để theo dõi các nhà sáng tạo và chia sẻ video.",
    guestLoginBtn: "Đăng nhập",
    logoutBtn: "Đăng xuất",

    // Screen 5: User Profile
    profileVerifiedTitle: "Xác minh Tích Xanh",
    profileVerifiedDesc: "Gửi ảnh Bilhete de Identidade hoặc Passport Angola để nhận tích xanh",
    verifyAction: "Xác minh ngay",
    verifiedStatus: "Đã xác minh chính chủ",
    modalUploadTitle: "Tải giấy tờ xác minh (Angola)",
    modalUploadLabel: "Chạm để tải ảnh Mặt trước & Mặt sau",
    modalUploadHint: "Hỗ trợ Bilhete de Identidade (BI) hoặc Passaporte Angola",
    modalSubmit: "Gửi hồ sơ duyệt tích xanh",

    // Auth Modal
    authModalTitle: "Đăng nhập TikMatch Angola",
    authPhoneLabel: "Số điện thoại Angola (+244)",
    authSubmitBtn: "Xác nhận & Đăng nhập",
    authDemoBtn: "⚡ Đăng nhập thử nghiệm (Sara - Cô Gái Châu Phi)",
    toastFollowed: "Đã theo dõi nhau! Đã mở quyền nhắn tin & gọi điện trong tab Chat.",
    toastVerified: "Hồ sơ của bạn đã được duyệt! Đã cấp Tích Xanh chính chủ.",
    toastLoginSuccess: "Đăng nhập thành công! Chào mừng Sara trở lại.",
    toastLogout: "Đã đăng xuất. Bạn đang ở Chế độ Khách."
  },
  pt: {
    feedTab: "Vídeos",
    matchTab: "Conectar",
    chatTab: "Mensagens",
    profileTab: "Perfil",
    guestChip: "👤 Convidado",
    guestChipAction: "Entrar",
    userChip: "Sara 🇦🇴",
    following: "A Seguir",
    forYou: "Para Ti",
    comments: "Comentários",
    seedingBadge: "Seeding Automático",
    writeComment: "Escreva um comentário...",

    // Screen 2: Match
    matchHeaderTitle: "Ligação de Voz Aleatória",
    matchHeaderDesc: "Converse com pessoas novas sem mostrar o rosto",
    dailyQuota: "5 chamadas grátis hoje",
    filterGender: "Gênero",
    filterAge: "Idade",
    genderAll: "Todos",
    genderFemale: "Feminino",
    genderMale: "Masculino",
    startMatching: "Começar Conexão Aleatória",
    connectingStatus: "A conectar...",

    // Screen 2: Match Guest State
    matchGuestTitle: "Ligação de Voz Aleatória",
    matchGuestSubtitle: "Converse por voz com novas pessoas sem mostrar o rosto.",
    matchGuestBtn: "Começar agora",

    // Screen 3: Call
    callingTitle: "Chamada de Voz em Direto",
    inCallStatus: "Em chamada de voz",
    followPrompt: "Gostou da conversa? <strong>Clique em Seguir</strong> na tela para desbloquear Chat ilimitado!",
    followBtn: "Seguir para conectar",
    followedBtn: "✓ Conectados! Chat desbloqueado",
    skipBtn: "Passar",
    endCallBtn: "Desligar",

    // Screen 4: Chat Active
    chatHeader: "Conversas & Amigos",
    matchedRecent: "Conexões Recentes",
    directNotice: "Vocês se seguiram mutuamente na chamada de voz",
    typeMessage: "Mensagem...",

    // Screen 4: Chat Guest State
    chatGuestTitle: "Entrar no TikMatch",
    chatGuestSubtitle: "Veja as mensagens dos seus amigos e notificações recentes.",
    chatGuestBtn: "Entrar",

    // Screen 5: Guest Profile
    guestTitle: "O seu perfil",
    guestSubtitle: "Inicie sessão para seguir criadores e partilhar vídeos.",
    guestLoginBtn: "Entrar",
    logoutBtn: "Sair",

    // Screen 5: User Profile
    profileVerifiedTitle: "Verificação de Conta",
    profileVerifiedDesc: "Envie Bilhete de Identidade ou Passaporte de Angola para o selo oficial",
    verifyAction: "Verificar",
    verifiedStatus: "Conta Verificada Oficial",
    modalUploadTitle: "Enviar Documento (Angola)",
    modalUploadLabel: "Toque para enviar Frente e Verso",
    modalUploadHint: "Suporta Bilhete de Identidade ou Passaporte Angolano",
    modalSubmit: "Enviar para Verificação",

    // Auth Modal
    authModalTitle: "Entrar no TikMatch Angola",
    authPhoneLabel: "Telemóvel de Angola (+244)",
    authSubmitBtn: "Confirmar & Entrar",
    authDemoBtn: "⚡ Entrar Rápido (Conta de Teste da Sara)",
    toastFollowed: "Vocês estão conectados! Chat e chamadas ilimitadas desbloqueados.",
    toastVerified: "Parabéns! Sua conta recebeu o Selo Verificado Oficial.",
    toastLoginSuccess: "Bem-vinda de volta, Sara! Sessão iniciada.",
    toastLogout: "Sessão terminada. Modo Convidado ativado."
  }
};

let currentLang = 'vi';

export function getLang() {
  return currentLang;
}

export function setLang(lang) {
  if (translations[lang]) {
    currentLang = lang;
    updateTexts();
  }
}

export function getText(key) {
  return translations[currentLang][key] || key;
}

export function updateTexts() {
  const dict = translations[currentLang];

  // Bottom Nav items
  const feedLabel = document.getElementById('nav-label-feed');
  const matchLabel = document.getElementById('nav-label-match');
  const chatLabel = document.getElementById('nav-label-chat');
  const profileLabel = document.getElementById('nav-label-profile');
  if (feedLabel) feedLabel.textContent = dict.feedTab;
  if (matchLabel) matchLabel.textContent = dict.matchTab;
  if (chatLabel) chatLabel.textContent = dict.chatTab;
  if (profileLabel) profileLabel.textContent = dict.profileTab;

  // Screen 1: Feed
  const tabFollowing = document.getElementById('tab-following');
  const tabForyou = document.getElementById('tab-foryou');
  const guestChipText = document.getElementById('guest-chip-text');
  const sheetTitle = document.getElementById('sheet-title-text');
  const seedingBadge = document.getElementById('seeding-badge-text');
  const commentInput = document.getElementById('comment-input');
  if (tabFollowing) tabFollowing.textContent = dict.following;
  if (tabForyou) tabForyou.textContent = dict.forYou;
  if (guestChipText) guestChipText.textContent = dict.guestChip;
  if (sheetTitle) sheetTitle.textContent = dict.comments;
  if (seedingBadge) seedingBadge.textContent = dict.seedingBadge;
  if (commentInput) commentInput.placeholder = dict.writeComment;

  // Screen 2: Match Active
  const matchTitle = document.getElementById('match-h-title');
  const matchDesc = document.getElementById('match-h-desc');
  const quota = document.getElementById('quota-text');
  const filterGender = document.getElementById('filter-gender-label');
  const filterAge = document.getElementById('filter-age-label');
  const pillAll = document.getElementById('pill-all');
  const pillFemale = document.getElementById('pill-female');
  const pillMale = document.getElementById('pill-male');
  const startBtnText = document.getElementById('start-matching-btn-text');
  if (matchTitle) matchTitle.textContent = dict.matchHeaderTitle;
  if (matchDesc) matchDesc.textContent = dict.matchHeaderDesc;
  if (quota) quota.textContent = dict.dailyQuota;
  if (filterGender) filterGender.textContent = dict.filterGender;
  if (filterAge) filterAge.textContent = dict.filterAge;
  if (pillAll) pillAll.textContent = dict.genderAll;
  if (pillFemale) pillFemale.textContent = dict.genderFemale;
  if (pillMale) pillMale.textContent = dict.genderMale;
  if (startBtnText) startBtnText.textContent = dict.startMatching;

  // Screen 2: Match Guest State
  const matchGuestTitle = document.getElementById('match-guest-title');
  const matchGuestSubtitle = document.getElementById('match-guest-subtitle');
  const matchGuestBtnText = document.getElementById('match-guest-btn-text');
  if (matchGuestTitle) matchGuestTitle.textContent = dict.matchGuestTitle;
  if (matchGuestSubtitle) matchGuestSubtitle.textContent = dict.matchGuestSubtitle;
  if (matchGuestBtnText) matchGuestBtnText.textContent = dict.matchGuestBtn;

  // Screen 3: Call
  const callStatus = document.getElementById('call-status-text');
  const followPrompt = document.getElementById('follow-prompt-text');
  const inCallFollowText = document.getElementById('in-call-follow-text');
  const inCallBtn = document.getElementById('in-call-follow-btn');
  if (callStatus) callStatus.textContent = dict.inCallStatus;
  if (followPrompt) followPrompt.innerHTML = dict.followPrompt;
  if (inCallFollowText && inCallBtn) {
    if (inCallBtn.classList.contains('connected')) {
      inCallFollowText.textContent = dict.followedBtn;
    } else {
      inCallFollowText.textContent = dict.followBtn;
    }
  }

  // Screen 4: Chat Active
  const chatTitle = document.getElementById('chat-header-title');
  const directNotice = document.getElementById('chat-direct-notice');
  const chatMsgInput = document.getElementById('chat-msg-input');
  if (chatTitle) chatTitle.textContent = dict.chatHeader;
  if (directNotice) directNotice.textContent = dict.directNotice;
  if (chatMsgInput) chatMsgInput.placeholder = dict.typeMessage;

  // Screen 4: Chat Guest State
  const chatGuestTitle = document.getElementById('chat-guest-title');
  const chatGuestSubtitle = document.getElementById('chat-guest-subtitle');
  const chatGuestBtnText = document.getElementById('chat-guest-btn-text');
  if (chatGuestTitle) chatGuestTitle.textContent = dict.chatGuestTitle;
  if (chatGuestSubtitle) chatGuestSubtitle.textContent = dict.chatGuestSubtitle;
  if (chatGuestBtnText) chatGuestBtnText.textContent = dict.chatGuestBtn;

  // Screen 5: Profile (Guest + User)
  const guestTitle = document.getElementById('guest-title');
  const guestSubtitle = document.getElementById('guest-subtitle');
  const guestLoginBtn = document.getElementById('guest-login-btn');
  const guestLoginBtnText = document.getElementById('guest-login-btn-text');
  const logoutBtn = document.getElementById('logout-btn');
  if (guestTitle) guestTitle.textContent = dict.guestTitle;
  if (guestSubtitle) guestSubtitle.textContent = dict.guestSubtitle;
  if (guestLoginBtnText) guestLoginBtnText.textContent = dict.guestLoginBtn;
  else if (guestLoginBtn) guestLoginBtn.textContent = dict.guestLoginBtn;
  if (logoutBtn) logoutBtn.textContent = dict.logoutBtn;

  const verifyCardTitle = document.getElementById('verify-card-title');
  const verifyCardDesc = document.getElementById('verify-card-desc');
  const verifyActionText = document.getElementById('verify-action-btn-text');
  const modalUploadTitle = document.getElementById('modal-upload-title');
  const modalUploadLabel = document.getElementById('modal-upload-label');
  const modalUploadHint = document.getElementById('modal-upload-hint');
  const modalSubmitBtn = document.getElementById('modal-submit-btn');
  if (verifyCardTitle) verifyCardTitle.textContent = dict.profileVerifiedTitle;
  if (verifyCardDesc) verifyCardDesc.textContent = dict.profileVerifiedDesc;
  if (verifyActionText) verifyActionText.textContent = dict.verifyAction;
  if (modalUploadTitle) modalUploadTitle.textContent = dict.modalUploadTitle;
  if (modalUploadLabel) modalUploadLabel.textContent = dict.modalUploadLabel;
  if (modalUploadHint) modalUploadHint.textContent = dict.modalUploadHint;
  if (modalSubmitBtn) modalSubmitBtn.textContent = dict.modalSubmit;

  // Auth Modal
  const authModalTitle = document.getElementById('auth-modal-title');
  const authSubmitBtn = document.getElementById('auth-submit-btn');
  const authDemoBtn = document.getElementById('auth-demo-btn');
  if (authModalTitle) authModalTitle.textContent = dict.authModalTitle;
  if (authSubmitBtn) authSubmitBtn.textContent = dict.authSubmitBtn;
  if (authDemoBtn) authDemoBtn.textContent = dict.authDemoBtn;
}
