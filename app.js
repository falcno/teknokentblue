/**
 * DIJITALPARK TEKNOKENT CONNECT
 * Core Application Logic, Authentication, Active Session Lock & True Real-time Synchronization
 */

// Storage Keys
const STORAGE_KEY = 'dijitalpark_connect_v2';
const AUTH_KEY = 'dijitalpark_active_auth_v2';
const SESSIONS_KEY = 'dijitalpark_active_sessions_v2';
const THEME_KEY = 'dijitalpark_theme';

// Registered Accounts
const ACCOUNTS = {
  erdemcarkit: {
    id: 'user_enes',
    username: 'erdemcarkit',
    password: '31316969',
    name: 'Enes Erdem Çarkıt',
    title: 'Kurucu Ortak & Lead AI Engineer',
    company: 'Neurologic AI',
    campus: 'Dijitalpark Çekmeköy Yerleşkesi',
    avatar: './assets/avatar_erdem.jpg',
    bio: 'Yapay zeka, derin öğrenme ve otonom ajan mimarileri üzerine Ar-Ge yürütüyoruz. Dijitalpark Teknokent Çekmeköy Yerleşkesi 3. Kat B304 ofisindeyiz.',
    skills: ['Yapay Zeka', 'Python', 'LLM Agents', 'PyTorch', 'Ar-Ge'],
    postsCount: 18,
    connectionsCount: 540,
    profileViews: 1420,
    online: true,
    verified: true
  },
  aliniyya: {
    id: 'user_ali',
    username: 'aliniyya',
    password: '31316969',
    name: 'Ali Nihat Eryürek',
    title: 'Senior Cloud & Systems Architect',
    company: 'CloudScale Tech',
    campus: 'Dijitalpark Ataşehir Yerleşkesi',
    avatar: './assets/avatar_ali.jpg',
    bio: 'Yüksek ölçekli bulut mimarileri, Kubernetes, mikroservisler ve DevOps optimizasyonları. Teknokent firmalarıyla açık kaynak ve ortak Ar-Ge projelerine her zaman açığım.',
    skills: ['Kubernetes', 'Cloud Native', 'Go', 'AWS/GCP', 'DevOps'],
    postsCount: 12,
    connectionsCount: 390,
    profileViews: 980,
    online: true,
    verified: true
  },
  bakugan: {
    id: 'user_batuhan',
    username: 'bakugan',
    password: '31316969',
    name: 'Batuhan Akyazı',
    title: 'Head of Product & Growth Partner',
    company: 'Core Innovation Hub',
    campus: 'Dijitalpark Çekmeköy Yerleşkesi',
    avatar: './assets/avatar_batuhan.jpg',
    bio: 'B2B SaaS büyüme stratejileri, ürün yönetimi ve girişim hızlandırma. Teknokent girişimcilerine mentörlük sağlıyor ve küresel açılım destekleri sunuyorum.',
    skills: ['Product Growth', 'B2B SaaS', 'Girişimcilik', 'UX Strategy'],
    postsCount: 24,
    connectionsCount: 710,
    profileViews: 2350,
    online: true,
    verified: true
  }
};

// Default Initial State
const DEFAULT_STATE = {
  users: JSON.parse(JSON.stringify(ACCOUNTS)),
  companies: [
    {
      id: 'comp_1',
      name: 'Neurologic AI',
      sector: 'Yapay Zeka & Derin Teknoloji',
      campus: 'Çekmeköy - Ofis B304',
      size: '12-25 Kişi',
      founder: 'Enes Erdem Çarkıt',
      logoEmoji: '🧠',
      isFollowing: true
    },
    {
      id: 'comp_2',
      name: 'CloudScale Tech',
      sector: 'Bulut Bilişim & Siber Güvenlik',
      campus: 'Ataşehir - Ofis A112',
      size: '8-15 Kişi',
      founder: 'Ali Nihat Eryürek',
      logoEmoji: '☁️',
      isFollowing: false
    },
    {
      id: 'comp_3',
      name: 'Core Innovation Hub',
      sector: 'Girişim Hızlandırıcı & B2B SaaS',
      campus: 'Çekmeköy - Girişim Vadisi',
      size: '5-10 Kişi',
      founder: 'Batuhan Akyazı',
      logoEmoji: '🚀',
      isFollowing: true
    },
    {
      id: 'comp_4',
      name: 'Dijitalpark Yönetim A.Ş.',
      sector: 'Teknoloji Geliştirme Bölgesi',
      campus: 'Çekmeköy & Ataşehir',
      size: '50+ Kişi',
      founder: 'TGB İdaresi',
      logoEmoji: '🏛️',
      isFollowing: true
    }
  ],
  posts: [
    {
      id: 'post_1',
      authorUsername: 'erdemcarkit',
      authorType: 'user',
      timestamp: '25 dakika önce',
      createdAt: Date.now() - 25 * 60 * 1000,
      content: 'Dijitalpark Teknokent Çekmeköy kampüsümüzdeki yeni otonom yapay zeka laboratuvarımızda ilk büyük prototip testini tamamladık! 🚀🤖\n\nEkosistemdeki diğer Ar-Ge ekipleriyle gerçek zamanlı veri akışı ve edge-computing modellerini test etmek istiyoruz. İlgilenen ekipler çay-kahveye bekleriz! ☕️',
      tags: ['YapayZeka', 'ArGe', 'AkıllıKampüs', 'Dijitalpark'],
      category: 'arge',
      image: './assets/post_office.jpg',
      likes: ['aliniyya', 'bakugan'],
      reposts: 4,
      comments: [
        {
          id: 'comm_1',
          authorUsername: 'aliniyya',
          time: '18 dk önce',
          text: 'Tebrikler Erdem! Laboratuvar gerçekten muazzam olmuş. Bulut gecikme sürelerini düşürmek için bizim micro-gateway altyapısıyla entegre edebiliriz, öğleden sonra uğruyorum!'
        },
        {
          id: 'comm_2',
          authorUsername: 'bakugan',
          time: '10 dk önce',
          text: 'Harika bir hamle Erdem. Cuma günü düzenleyeceğimiz Teknokent Girişimcilik Demo Günü için de bir sunum planlayalım derim!'
        }
      ]
    },
    {
      id: 'post_2',
      authorUsername: 'bakugan',
      authorType: 'user',
      timestamp: '1 saat önce',
      createdAt: Date.now() - 60 * 60 * 1000,
      content: 'Büyük gün! Yeni hızlandırma programımızın demo gününde ekiplerimiz uluslararası yatırımcılarla buluştu. 🎉✨\n\nDijitalpark Teknokent çatısı altındaki 6 girişimimizin ilk yatırım turlarını kapatmasını kutluyoruz. Büyümeye ve Türkiye’den küresel teknoloji markaları çıkarmaya devam!',
      tags: ['Girişimcilik', 'Lansman', 'Yatırım', 'BridgeToBalkans'],
      category: 'startup',
      image: './assets/post_team.jpg',
      likes: ['erdemcarkit', 'aliniyya'],
      reposts: 7,
      comments: [
        {
          id: 'comm_3',
          authorUsername: 'erdemcarkit',
          time: '45 dk önce',
          text: 'Tüm ekipleri gönülden kutlarım Batuhan! Ekosistemin enerjisi her geçen gün katlanarak artıyor.'
        }
      ]
    },
    {
      id: 'post_3',
      authorUsername: 'aliniyya',
      authorType: 'user',
      timestamp: '3 saat önce',
      createdAt: Date.now() - 3 * 60 * 60 * 1000,
      content: 'Ataşehir yerleşkesinde perşembe günü 15:30’da "Zero-Trust Cloud Mimarisi ve Teknokent Firmaları İçin Güvenlik Standartları" atölyesi düzenliyoruz. 🛡️💻\n\nKatılmak isteyen yazılımcı ve sistem yöneticisi arkadaşlar DM atabilir, kontenjan 30 kişiyle sınırlıdır!',
      tags: ['CloudNative', 'SiberGüvenlik', 'DevOps', 'Etkinlik'],
      category: 'etkinlik',
      image: null,
      likes: ['erdemcarkit'],
      reposts: 2,
      comments: []
    }
  ],
  messages: {
    'aliniyya_erdemcarkit': [
      { sender: 'aliniyya', text: 'Selam Erdem, yeni AI modeli testleri nasıl gidiyor?', time: '14:20' },
      { sender: 'erdemcarkit', text: 'Selam Ali! Gayet başarılı, biraz önce yeni laboratuvardan post paylaştım.', time: '14:22' },
      { sender: 'aliniyya', text: 'Gördüm az önce yorum da yazdım. Çekmeköy kampüsüne gelince kahve içelim.', time: '14:25' }
    ],
    'bakugan_erdemcarkit': [
      { sender: 'bakugan', text: 'Erdem selam, Cuma günkü Teknokent Demo Day için 10 dakikalık bir slot ayırdım sana.', time: '11:15' },
      { sender: 'erdemcarkit', text: 'Harika olur Batuhan! Prototipi canlı demoda çalıştırabiliriz.', time: '11:18' }
    ],
    'aliniyya_bakugan': [
      { sender: 'bakugan', text: 'Ali selam, Ataşehir kampüsündeki workshop için salon hazır mı?', time: 'Dün' },
      { sender: 'aliniyya', text: 'Evet Batuhan, yönetimle konuştuk A Blok Konferans Salonu ayrıldı.', time: 'Dün' }
    ]
  }
};

// Global Runtime State
let appState = loadAppState();
let currentAuthUser = null;
let currentSessionId = 'sess_' + Math.random().toString(36).substring(2, 9) + Date.now();
let heartbeatInterval = null;
let activeChatPartner = 'aliniyya';
let isChatDockOpen = true;
let currentFeedCategory = 'all';

// BroadcastChannel for TRUE REAL-TIME MULTI-TAB & MULTI-USER SYNCHRONIZATION
let realTimeChannel = null;
try {
  realTimeChannel = new BroadcastChannel('dijitalpark_realtime_channel_v2');
  realTimeChannel.onmessage = handleRealTimeEvent;
} catch (e) {
  console.warn('BroadcastChannel not supported in this environment, falling back to storage listener', e);
}

// Fallback Cross-Tab Storage Listener
window.addEventListener('storage', (e) => {
  if (e.key === STORAGE_KEY) {
    appState = loadAppState();
    if (currentAuthUser) {
      renderFeed();
      renderChatDock();
      renderActiveChatWindow();
      renderOnlineMembersList();
    }
  } else if (e.key === SESSIONS_KEY) {
    checkActiveSessionHealth();
  }
});

function loadAppState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Ensure default users exist with latest photos
      for (const key in ACCOUNTS) {
        if (!parsed.users[key] || !parsed.users[key].avatar) {
          parsed.users[key] = JSON.parse(JSON.stringify(ACCOUNTS[key]));
        } else {
          // Always ensure latest avatar path
          parsed.users[key].avatar = ACCOUNTS[key].avatar;
        }
      }
      return parsed;
    }
  } catch (e) {
    console.warn('Storage read error', e);
  }
  return JSON.parse(JSON.stringify(DEFAULT_STATE));
}

function saveAppState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  } catch (e) {
    console.error('Storage save failed', e);
  }
}

// -----------------------------------------------------------------------------
// APP STARTUP & AUTHENTICATION
// -----------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setupEventListeners();

  // Check existing session
  const savedUsername = localStorage.getItem(AUTH_KEY);
  if (savedUsername && ACCOUNTS[savedUsername]) {
    // Check if session is already occupied elsewhere
    if (isAccountActiveElsewhere(savedUsername)) {
      showLoginScreen(`⚠️ "@${savedUsername}" hesabı şu anda başka bir sekmede aktif. Oturum açmak için giriş yapın.`);
    } else {
      performLogin(savedUsername, ACCOUNTS[savedUsername].password, false);
    }
  } else {
    showLoginScreen();
  }
});

function showLoginScreen(alertMsg) {
  const loginScreen = document.getElementById('login-screen');
  const mainApp = document.getElementById('main-app-screen');
  const alertBox = document.getElementById('login-alert-banner');

  if (loginScreen) loginScreen.style.display = 'flex';
  if (mainApp) mainApp.style.display = 'none';

  if (alertBox) {
    if (alertMsg) {
      alertBox.textContent = alertMsg;
      alertBox.style.display = 'block';
    } else {
      alertBox.style.display = 'none';
    }
  }

  // Clear active heartbeat if any
  if (heartbeatInterval) clearInterval(heartbeatInterval);
  currentAuthUser = null;
  localStorage.removeItem(AUTH_KEY);
}

function showMainApp() {
  const loginScreen = document.getElementById('login-screen');
  const mainApp = document.getElementById('main-app-screen');

  if (loginScreen) loginScreen.style.display = 'none';
  if (mainApp) mainApp.style.display = 'block';

  renderNavbar();
  renderProfileCard();
  renderComposer();
  renderFeed();
  renderOnlineMembersList();
  renderCompaniesList();
  renderChatDock();
  renderActiveChatWindow();
}

// Single active user rule (Tek kullanıcı oturum kontrolü)
function isAccountActiveElsewhere(username) {
  try {
    const rawSessions = localStorage.getItem(SESSIONS_KEY);
    if (!rawSessions) return false;
    const sessions = JSON.parse(rawSessions);
    const session = sessions[username];
    if (session && session.sessionId !== currentSessionId) {
      // Check if heartbeat is alive within last 12 seconds
      if (Date.now() - session.timestamp < 12000) {
        return true;
      }
    }
  } catch (e) {}
  return false;
}

function registerActiveSession(username) {
  try {
    let sessions = {};
    const raw = localStorage.getItem(SESSIONS_KEY);
    if (raw) sessions = JSON.parse(raw);

    sessions[username] = {
      sessionId: currentSessionId,
      timestamp: Date.now()
    };
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));

    // Broadcast session lock
    broadcastEvent({
      type: 'SESSION_LOCK',
      username: username,
      sessionId: currentSessionId
    });

    // Start Heartbeat every 4 seconds
    if (heartbeatInterval) clearInterval(heartbeatInterval);
    heartbeatInterval = setInterval(() => {
      if (!currentAuthUser) return;
      try {
        let currentSessions = {};
        const r = localStorage.getItem(SESSIONS_KEY);
        if (r) currentSessions = JSON.parse(r);
        currentSessions[currentAuthUser] = {
          sessionId: currentSessionId,
          timestamp: Date.now()
        };
        localStorage.setItem(SESSIONS_KEY, JSON.stringify(currentSessions));
      } catch (e) {}
    }, 4000);
  } catch (e) {}
}

function releaseActiveSession(username) {
  try {
    const raw = localStorage.getItem(SESSIONS_KEY);
    if (raw) {
      let sessions = JSON.parse(raw);
      if (sessions[username] && sessions[username].sessionId === currentSessionId) {
        delete sessions[username];
        localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
      }
    }
  } catch (e) {}
}

function checkActiveSessionHealth() {
  if (!currentAuthUser) return;
  try {
    const raw = localStorage.getItem(SESSIONS_KEY);
    if (raw) {
      const sessions = JSON.parse(raw);
      const session = sessions[currentAuthUser];
      // If another tab took over this user session
      if (session && session.sessionId !== currentSessionId) {
        alert(`Oturumunuz başka bir pencere veya cihazda açıldığı için sonlandırıldı.`);
        logout();
      }
    }
  } catch (e) {}
}

// -----------------------------------------------------------------------------
// LOGIN / LOGOUT HANDLERS
// -----------------------------------------------------------------------------

function handleLoginSubmit(event) {
  if (event) event.preventDefault();
  const usernameInput = document.getElementById('login-username-input');
  const passwordInput = document.getElementById('login-password-input');

  const username = usernameInput ? usernameInput.value.trim().toLowerCase() : '';
  const password = passwordInput ? passwordInput.value.trim() : '';

  if (!username || !password) {
    showLoginAlert('Lütfen kullanıcı adı ve şifrenizi girin!');
    return;
  }

  performLogin(username, password, false);
}

function quickSelectUser(username) {
  const usernameInput = document.getElementById('login-username-input');
  const passwordInput = document.getElementById('login-password-input');
  if (usernameInput) usernameInput.value = username;
  if (passwordInput) passwordInput.value = '31316969';

  performLogin(username, '31316969', false);
}

function performLogin(username, password, forceTakeover) {
  const account = ACCOUNTS[username];
  if (!account) {
    showLoginAlert(`Geçersiz kullanıcı adı! Kayıtlı hesaplar: erdemcarkit, aliniyya, bakugan`);
    return;
  }

  if (password !== account.password) {
    showLoginAlert(`Hatalı şifre! (Belirlenen şifre: 31316969)`);
    return;
  }

  // Check single active user constraint
  if (!forceTakeover && isAccountActiveElsewhere(username)) {
    const alertBox = document.getElementById('login-alert-banner');
    if (alertBox) {
      alertBox.innerHTML = `
        <div style="margin-bottom: 0.5rem;">⚠️ <strong>@${username}</strong> hesabı şu anda başka bir sekmede aktif! Aynı anda sadece 1 kişi oturum açabilir.</div>
        <button onclick="performLogin('${username}', '${password}', true)" style="background:var(--brand-red); color:#fff; border:none; padding:0.35rem 0.75rem; border-radius:4px; font-weight:700; cursor:pointer;">
          Oturumu Devral (Diğerini Kapat)
        </button>
      `;
      alertBox.style.display = 'block';
    }
    return;
  }

  // Login successful
  currentAuthUser = username;
  localStorage.setItem(AUTH_KEY, username);
  registerActiveSession(username);

  // Set default partner for chat
  const otherUsers = Object.keys(ACCOUNTS).filter(u => u !== username);
  activeChatPartner = otherUsers[0] || 'aliniyya';

  showMainApp();
  showToast(`Hoş geldin, ${account.name}! 👋`);
}

function logout() {
  if (currentAuthUser) {
    releaseActiveSession(currentAuthUser);
    broadcastEvent({
      type: 'USER_LOGOUT',
      username: currentAuthUser
    });
  }
  if (heartbeatInterval) clearInterval(heartbeatInterval);
  currentAuthUser = null;
  localStorage.removeItem(AUTH_KEY);
  showLoginScreen('Başarıyla çıkış yapıldı.');
}

function showLoginAlert(msg) {
  const alertBox = document.getElementById('login-alert-banner');
  if (alertBox) {
    alertBox.textContent = msg;
    alertBox.style.display = 'block';
  }
}

// -----------------------------------------------------------------------------
// REAL-TIME EVENT BUS (BROADCAST & STORAGE SYNC)
// -----------------------------------------------------------------------------

function broadcastEvent(payload) {
  if (realTimeChannel) {
    try {
      realTimeChannel.postMessage(payload);
    } catch (e) {
      console.warn('Broadcast failed', e);
    }
  }
}

function handleRealTimeEvent(event) {
  const data = event.data;
  if (!data) return;

  if (data.type === 'CHAT_MESSAGE') {
    handleIncomingMessage(data);
  } else if (data.type === 'NEW_POST') {
    handleIncomingPost(data);
  } else if (data.type === 'POST_LIKE' || data.type === 'POST_COMMENT') {
    appState = loadAppState();
    renderFeed();
  } else if (data.type === 'SESSION_LOCK') {
    if (currentAuthUser && currentAuthUser === data.username && data.sessionId !== currentSessionId) {
      alert(`Oturumunuz başka bir pencerede devralındı.`);
      logout();
    }
  } else if (data.type === 'USER_LOGOUT') {
    appState = loadAppState();
    renderOnlineMembersList();
    renderChatDock();
  }
}

function handleIncomingMessage(msgData) {
  // Reload state from local storage to have the message
  appState = loadAppState();

  // If this message is intended for or involves the current user
  if (currentAuthUser && (msgData.sender === currentAuthUser || msgData.recipient === currentAuthUser)) {
    playChimeSound();

    renderChatDock();
    renderActiveChatWindow();

    // If message is from someone else, show toast notification
    if (msgData.sender !== currentAuthUser) {
      const senderAcc = ACCOUNTS[msgData.sender] || { name: msgData.sender };
      showToast(`💬 @${msgData.sender}: "${msgData.text.substring(0, 32)}..."`);
    }
  }
}

function handleIncomingPost(postData) {
  appState = loadAppState();
  renderFeed();
  if (currentAuthUser && postData.authorUsername !== currentAuthUser) {
    showToast(`📢 @${postData.authorUsername} yeni bir gönderi paylaştı!`);
  }
}

// Pleasant Native Web Audio Chime (Zero External Files)
function playChimeSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.36);
  } catch (e) {
    // audio context may be muted or blocked by browser gesture
  }
}

// -----------------------------------------------------------------------------
// UI RENDERING: NAVBAR, PROFILES, FEED, COMPANIES
// -----------------------------------------------------------------------------

function renderNavbar() {
  if (!currentAuthUser) return;
  const user = ACCOUNTS[currentAuthUser];
  if (!user) return;

  const pillAvatar = document.getElementById('nav-user-avatar');
  const pillName = document.getElementById('nav-user-name');
  const pillRole = document.getElementById('nav-user-role');

  if (pillAvatar) pillAvatar.src = user.avatar;
  if (pillName) pillName.textContent = user.name;
  if (pillRole) pillRole.textContent = `@${user.username}`;
}

function renderProfileCard() {
  if (!currentAuthUser) return;
  const user = ACCOUNTS[currentAuthUser];
  if (!user) return;

  const avatar = document.getElementById('sidebar-user-avatar');
  const name = document.getElementById('sidebar-user-name');
  const headline = document.getElementById('sidebar-user-headline');
  const campusBadge = document.getElementById('sidebar-user-campus');
  const statPosts = document.getElementById('stat-posts-count');
  const statConnections = document.getElementById('stat-connections-count');
  const statViews = document.getElementById('stat-views-count');

  if (avatar) avatar.src = user.avatar;
  if (name) name.innerHTML = `${user.name} <span class="verified-badge"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></span>`;
  if (headline) headline.textContent = `${user.title} • @${user.username}`;
  if (campusBadge) campusBadge.innerHTML = `📍 ${user.campus}`;
  if (statPosts) statPosts.textContent = user.postsCount || 18;
  if (statConnections) statConnections.textContent = user.connectionsCount || 540;
  if (statViews) statViews.textContent = user.profileViews || '1.4K';
}

function renderComposer() {
  if (!currentAuthUser) return;
  const user = ACCOUNTS[currentAuthUser];
  if (!user) return;

  const composerAvatar = document.getElementById('composer-active-avatar');
  if (composerAvatar) composerAvatar.src = user.avatar;

  const postAsSelect = document.getElementById('post-as-select');
  if (postAsSelect) {
    postAsSelect.innerHTML = `
      <option value="user">${user.name} (@${user.username})</option>
      <option value="company">${user.company} (Şirket Adına)</option>
    `;
  }
}

function renderFeed() {
  const container = document.getElementById('feed-posts-container');
  if (!container) return;

  let filtered = [...appState.posts];
  if (currentFeedCategory !== 'all') {
    filtered = filtered.filter(p => p.category === currentFeedCategory);
  }

  filtered.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="card-base" style="padding: 2.5rem; text-align: center; color: var(--text-secondary);">
        <p style="font-weight: 700; font-size: 1.1rem;">Bu kategoride henüz gönderi yok.</p>
        <p style="font-size: 0.85rem; margin-top: 0.4rem;">İlk paylaşımı yaparak Teknokent ekosistemine ilham verin!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(post => {
    const isCompany = post.authorType === 'company';
    let authorName = '';
    let authorHandle = '';
    let authorTitle = '';
    let authorAvatar = '';
    let campus = '';

    if (isCompany) {
      authorName = post.companyName || 'Şirket';
      authorHandle = 'kurumsal';
      authorTitle = 'Teknokent Ar-Ge Şirketi';
      authorAvatar = './assets/logo.jpg';
      campus = 'Dijitalpark Teknokent';
    } else {
      const acc = ACCOUNTS[post.authorUsername] || {
        name: 'Teknokent Üyesi',
        username: 'uye',
        title: 'Girişimci',
        avatar: './assets/avatar_enes.jpg',
        campus: 'Dijitalpark Çekmeköy'
      };
      authorName = acc.name;
      authorHandle = acc.username;
      authorTitle = acc.title;
      authorAvatar = acc.avatar;
      campus = acc.campus;
    }

    const isLiked = post.likes && post.likes.includes(currentAuthUser);
    const likeCount = post.likes ? post.likes.length : 0;
    const commentCount = post.comments ? post.comments.length : 0;

    const formattedContent = escapeHtml(post.content).replace(/#([a-zA-Z0-9ığüşöçİĞÜŞÖÇ_]+)/g, '<a href="javascript:void(0)" class="hashtag">#$1</a>');

    return `
      <article class="card-base post-card" id="post-${post.id}">
        <div class="post-header">
          <div class="post-author-wrapper">
            <div class="post-avatar-box">
              <img src="${authorAvatar}" class="post-avatar" alt="${authorName}" />
              <div class="online-status-dot"></div>
            </div>
            <div class="post-author-meta">
              <div class="post-author-name-row">
                <span class="post-author-name">${authorName}</span>
                <span style="font-size:0.75rem; color:var(--text-muted);">@${authorHandle}</span>
                <span class="verified-badge">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                </span>
              </div>
              <span class="post-author-title">${authorTitle}</span>
              <div class="post-meta-details">
                <span class="campus-tag">${campus}</span>
                <span>•</span>
                <span>${post.timestamp}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="post-content-body">${formattedContent}</div>

        ${post.image ? `
          <div class="post-image-container">
            <img src="${post.image}" class="post-attached-image" alt="Gönderi Görseli" onclick="openImageLightbox('${post.image}')" />
          </div>
        ` : ''}

        <div class="post-stats-bar">
          <span>❤️ ${likeCount} Beğeni</span>
          <span>💬 ${commentCount} Yorum • 🔄 ${post.reposts || 0} Paylaşım</span>
        </div>

        <div class="post-actions-toolbar">
          <button class="post-action-btn ${isLiked ? 'liked' : ''}" onclick="toggleLike('${post.id}')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            <span>${isLiked ? 'Beğenildi' : 'Beğen'}</span>
          </button>
          
          <button class="post-action-btn" onclick="toggleCommentsSection('${post.id}')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            <span>Yorum Yap</span>
          </button>

          <button class="post-action-btn" onclick="repost('${post.id}')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
            <span>Yeniden Paylaş</span>
          </button>

          <button class="post-action-btn" onclick="sharePost('${post.id}')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
            <span>Paylaş</span>
          </button>
        </div>

        <div class="comments-wrapper" id="comments-${post.id}">
          <div class="comment-input-row">
            <img src="${ACCOUNTS[currentAuthUser]?.avatar}" class="comment-avatar-mini" />
            <div class="comment-input-box">
              <input type="text" class="comment-input" id="comment-input-${post.id}" placeholder="Düşüncenizi paylaşın..." onkeypress="handleCommentKeyPress(event, '${post.id}')" />
              <button class="comment-send-btn" onclick="submitComment('${post.id}')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
          </div>

          <div class="comments-list" id="comments-list-${post.id}">
            ${(post.comments || []).map(c => {
              const commenter = ACCOUNTS[c.authorUsername] || { name: c.authorUsername, avatar: './assets/avatar_enes.jpg' };
              return `
                <div class="comment-item">
                  <img src="${commenter.avatar}" class="comment-avatar-mini" />
                  <div class="comment-bubble">
                    <div class="comment-bubble-header">
                      <span class="comment-author-name">${commenter.name}</span>
                      <span class="comment-time">${c.time}</span>
                    </div>
                    <div class="comment-text">${escapeHtml(c.text)}</div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// Right Sidebar: Online Members & Fast Direct Message
function renderOnlineMembersList() {
  const container = document.getElementById('test-accounts-list');
  if (!container || !currentAuthUser) return;

  const users = Object.keys(ACCOUNTS);

  container.innerHTML = users.map(uName => {
    const acc = ACCOUNTS[uName];
    const isMe = uName === currentAuthUser;

    return `
      <div class="test-user-item ${isMe ? 'active-test-user' : ''}" onclick="${isMe ? '' : `openChatWith('${uName}')`}">
        <div class="test-user-info">
          <div style="position:relative;">
            <img src="${acc.avatar}" class="test-user-avatar" alt="${acc.name}" />
            <div class="online-status-dot"></div>
          </div>
          <div class="test-user-names">
            <span class="test-name">${acc.name} ${isMe ? '(Siz)' : ''}</span>
            <span class="test-title">@${acc.username} • ${acc.company}</span>
          </div>
        </div>
        <button class="switch-pill-btn" style="${isMe ? 'background:var(--brand-online);' : ''}">
          ${isMe ? 'Aktif' : '💬 Mesaj'}
        </button>
      </div>
    `;
  }).join('');
}

function renderCompaniesList() {
  const container = document.getElementById('companies-list-container');
  if (!container) return;

  container.innerHTML = appState.companies.map(comp => {
    return `
      <div class="company-item">
        <div class="company-left">
          <div class="company-icon-box">${comp.logoEmoji || '🏢'}</div>
          <div>
            <div class="company-name">${comp.name}</div>
            <div class="company-sector">${comp.sector}</div>
          </div>
        </div>
        <button class="btn-follow ${comp.isFollowing ? 'following' : ''}" onclick="toggleFollowCompany('${comp.id}')">
          ${comp.isFollowing ? 'Takipte' : '+ Takip Et'}
        </button>
      </div>
    `;
  }).join('');
}

// -----------------------------------------------------------------------------
// REAL-TIME CHAT & MESSAGING SYSTEM
// -----------------------------------------------------------------------------

function renderChatDock() {
  const container = document.getElementById('chat-contacts-list');
  if (!container || !currentAuthUser) return;

  const otherUsers = Object.keys(ACCOUNTS).filter(u => u !== currentAuthUser);

  container.innerHTML = otherUsers.map(partnerUName => {
    const partner = ACCOUNTS[partnerUName];
    const threadKey = getThreadKey(currentAuthUser, partnerUName);
    const messages = appState.messages[threadKey] || [];
    const lastMsg = messages.length > 0 ? messages[messages.length - 1] : { text: 'Canlı sohbet başlatın...', time: '' };

    return `
      <div class="chat-contact-row" onclick="openChatWith('${partnerUName}')">
        <div class="contact-avatar-wrapper">
          <img src="${partner.avatar}" class="contact-avatar" />
          <div class="online-status-dot"></div>
        </div>
        <div class="contact-info">
          <div class="contact-top-line">
            <span class="contact-name">${partner.name}</span>
            <span class="contact-time">${lastMsg.time || ''}</span>
          </div>
          <div class="contact-last-msg">${escapeHtml(lastMsg.text)}</div>
        </div>
      </div>
    `;
  }).join('');
}

function renderActiveChatWindow() {
  const chatWindow = document.getElementById('active-conversation-window');
  if (!chatWindow) return;

  if (!activeChatPartner || !currentAuthUser) {
    chatWindow.style.display = 'none';
    return;
  }

  chatWindow.style.display = 'flex';
  const partner = ACCOUNTS[activeChatPartner];
  if (!partner) return;

  const targetAvatar = document.getElementById('chat-target-avatar');
  const targetName = document.getElementById('chat-target-name');
  const targetStatus = document.getElementById('chat-target-status');

  if (targetAvatar) targetAvatar.src = partner.avatar;
  if (targetName) targetName.textContent = `${partner.name} (@${partner.username})`;
  if (targetStatus) {
    targetStatus.innerHTML = '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#10B981;"></span> Şu an aktif (Canlı)';
  }

  const threadKey = getThreadKey(currentAuthUser, activeChatPartner);
  const messages = appState.messages[threadKey] || [];
  const body = document.getElementById('chat-messages-body');

  if (body) {
    body.innerHTML = messages.map(msg => {
      const isOutgoing = msg.sender === currentAuthUser;
      return `
        <div class="chat-bubble ${isOutgoing ? 'outgoing' : 'incoming'}">
          ${escapeHtml(msg.text)}
          <div class="chat-bubble-time">${msg.time} ${isOutgoing ? '✓✓' : ''}</div>
        </div>
      `;
    }).join('');

    body.scrollTop = body.scrollHeight;
  }
}

function getThreadKey(userA, userB) {
  return [userA, userB].sort().join('_');
}

function openChatWith(username) {
  activeChatPartner = username;
  renderActiveChatWindow();
}

function closeActiveChat() {
  activeChatPartner = null;
  const chatWindow = document.getElementById('active-conversation-window');
  if (chatWindow) chatWindow.style.display = 'none';
}

function toggleChatDock() {
  const content = document.getElementById('chat-dock-content');
  const icon = document.getElementById('dock-toggle-icon');
  if (!content) return;

  isChatDockOpen = !isChatDockOpen;
  content.style.display = isChatDockOpen ? 'block' : 'none';
  if (icon) {
    icon.innerHTML = isChatDockOpen 
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"></polyline></svg>';
  }
}

function sendChatMessage(textOverride) {
  if (!currentAuthUser || !activeChatPartner) return;

  const input = document.getElementById('chat-message-input');
  const text = textOverride || (input ? input.value.trim() : '');
  if (!text) return;

  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const threadKey = getThreadKey(currentAuthUser, activeChatPartner);
  if (!appState.messages[threadKey]) {
    appState.messages[threadKey] = [];
  }

  const messageObj = {
    sender: currentAuthUser,
    recipient: activeChatPartner,
    text: text,
    time: timeStr,
    timestamp: Date.now()
  };

  appState.messages[threadKey].push(messageObj);
  saveAppState();

  if (input) input.value = '';
  renderActiveChatWindow();
  renderChatDock();

  // BROADCAST TO ALL OTHER OPEN TABS/BROWSERS IN REAL TIME!
  broadcastEvent({
    type: 'CHAT_MESSAGE',
    sender: currentAuthUser,
    recipient: activeChatPartner,
    text: text,
    time: timeStr,
    timestamp: Date.now()
  });
}

function sendQuickReply(text) {
  sendChatMessage(text);
}

// -----------------------------------------------------------------------------
// POST CREATION & INTERACTIONS
// -----------------------------------------------------------------------------

let selectedPostImage = null;

function handleImageSelect(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    selectedPostImage = e.target.result;
    showImagePreview(selectedPostImage);
  };
  reader.readAsDataURL(file);
}

function selectSampleImage(type) {
  if (type === 'office') selectedPostImage = './assets/post_office.jpg';
  if (type === 'team') selectedPostImage = './assets/post_team.jpg';
  showImagePreview(selectedPostImage);
}

function showImagePreview(imgSrc) {
  const previewBox = document.getElementById('composer-preview-box');
  const previewImg = document.getElementById('composer-preview-img');
  if (previewBox && previewImg) {
    previewImg.src = imgSrc;
    previewBox.style.display = 'block';
  }
}

function removeComposerImage() {
  selectedPostImage = null;
  const previewBox = document.getElementById('composer-preview-box');
  if (previewBox) previewBox.style.display = 'none';
  const fileInput = document.getElementById('post-image-file-input');
  if (fileInput) fileInput.value = '';
}

function addHashtagToComposer(tag) {
  const textarea = document.getElementById('post-composer-text');
  if (!textarea) return;
  textarea.value = (textarea.value.trim() + ' #' + tag).trim() + ' ';
  textarea.focus();
}

function submitNewPost() {
  if (!currentAuthUser) return;
  const textarea = document.getElementById('post-composer-text');
  const content = textarea ? textarea.value.trim() : '';

  if (!content && !selectedPostImage) {
    showToast('Lütfen bir metin yazın veya görsel ekleyin!');
    return;
  }

  const postAsSelect = document.getElementById('post-as-select');
  const postAs = postAsSelect ? postAsSelect.value : 'user';
  const user = ACCOUNTS[currentAuthUser];

  const hashtags = (content.match(/#([a-zA-Z0-9ığüşöçİĞÜŞÖÇ_]+)/g) || []).map(t => t.replace('#', ''));

  const newPost = {
    id: 'post_' + Date.now(),
    authorUsername: currentAuthUser,
    authorType: postAs,
    companyName: postAs === 'company' ? user.company : null,
    timestamp: 'Şimdi',
    createdAt: Date.now(),
    content: content,
    tags: hashtags.length > 0 ? hashtags : ['Teknokent'],
    category: hashtags.some(t => /arge|ai|yapayzeka|yazılım/i.test(t)) ? 'arge' : 'startup',
    image: selectedPostImage,
    likes: [],
    reposts: 0,
    comments: []
  };

  appState.posts.unshift(newPost);
  user.postsCount = (user.postsCount || 0) + 1;
  saveAppState();

  if (textarea) textarea.value = '';
  removeComposerImage();

  renderProfileCard();
  renderFeed();
  showToast('Gönderiniz canlı akışta yayınlandı! 🚀');

  // Broadcast new post in real-time
  broadcastEvent({
    type: 'NEW_POST',
    authorUsername: currentAuthUser,
    postId: newPost.id
  });
}

function toggleLike(postId) {
  if (!currentAuthUser) return;
  const post = appState.posts.find(p => p.id === postId);
  if (!post) return;

  if (!post.likes) post.likes = [];
  const idx = post.likes.indexOf(currentAuthUser);

  if (idx > -1) {
    post.likes.splice(idx, 1);
  } else {
    post.likes.push(currentAuthUser);
  }

  saveAppState();
  renderFeed();

  broadcastEvent({
    type: 'POST_LIKE',
    postId: postId,
    byUser: currentAuthUser
  });
}

function toggleCommentsSection(postId) {
  const commentsWrapper = document.getElementById(`comments-${postId}`);
  if (!commentsWrapper) return;
  commentsWrapper.classList.toggle('show');
}

function handleCommentKeyPress(event, postId) {
  if (event.key === 'Enter') submitComment(postId);
}

function submitComment(postId) {
  if (!currentAuthUser) return;
  const input = document.getElementById(`comment-input-${postId}`);
  const text = input ? input.value.trim() : '';
  if (!text) return;

  const post = appState.posts.find(p => p.id === postId);
  if (!post) return;

  if (!post.comments) post.comments = [];
  post.comments.push({
    id: 'comm_' + Date.now(),
    authorUsername: currentAuthUser,
    time: 'Şimdi',
    text: text
  });

  saveAppState();
  if (input) input.value = '';
  renderFeed();

  const commentsWrapper = document.getElementById(`comments-${postId}`);
  if (commentsWrapper) commentsWrapper.classList.add('show');

  broadcastEvent({
    type: 'POST_COMMENT',
    postId: postId,
    authorUsername: currentAuthUser
  });
}

function repost(postId) {
  const post = appState.posts.find(p => p.id === postId);
  if (!post) return;
  post.reposts = (post.reposts || 0) + 1;
  saveAppState();
  renderFeed();
  showToast('Gönderi profilinizde yeniden paylaşıldı! 🔄');
}

function sharePost(postId) {
  navigator.clipboard?.writeText(window.location.href);
  showToast('Gönderi bağlantısı panoya kopyalandı! 📋');
}

function setFeedCategory(category) {
  currentFeedCategory = category;
  document.querySelectorAll('.feed-tab').forEach(tab => {
    tab.classList.toggle('active', tab.getAttribute('data-cat') === category);
  });
  renderFeed();
}

function toggleFollowCompany(companyId) {
  const comp = appState.companies.find(c => c.id === companyId);
  if (!comp) return;
  comp.isFollowing = !comp.isFollowing;
  saveAppState();
  renderCompaniesList();
  showToast(comp.isFollowing ? `${comp.name} takip ediliyor!` : `${comp.name} takipten çıkarıldı.`);
}

// -----------------------------------------------------------------------------
// MODALS
// -----------------------------------------------------------------------------

function openProfileModal() {
  if (!currentAuthUser) return;
  const modal = document.getElementById('profile-edit-modal');
  const user = ACCOUNTS[currentAuthUser];
  if (!modal || !user) return;

  document.getElementById('edit-profile-name').value = user.name || '';
  document.getElementById('edit-profile-title').value = user.title || '';
  document.getElementById('edit-profile-company').value = user.company || '';
  document.getElementById('edit-profile-campus').value = user.campus || 'Dijitalpark Çekmeköy Yerleşkesi';
  document.getElementById('edit-profile-bio').value = user.bio || '';

  modal.classList.add('show');
}

function closeProfileModal() {
  const modal = document.getElementById('profile-edit-modal');
  if (modal) modal.classList.remove('show');
}

function saveProfileEdits() {
  if (!currentAuthUser) return;
  const user = ACCOUNTS[currentAuthUser];
  if (!user) return;

  user.name = document.getElementById('edit-profile-name').value.trim() || user.name;
  user.title = document.getElementById('edit-profile-title').value.trim() || user.title;
  user.company = document.getElementById('edit-profile-company').value.trim() || user.company;
  user.campus = document.getElementById('edit-profile-campus').value;
  user.bio = document.getElementById('edit-profile-bio').value.trim() || user.bio;

  saveAppState();
  closeProfileModal();
  renderNavbar();
  renderProfileCard();
  renderOnlineMembersList();
  renderFeed();
  showToast('Profiliniz güncellendi! ✅');
}

function openCompanyModal() {
  const modal = document.getElementById('company-register-modal');
  if (modal) modal.classList.add('show');
}

function closeCompanyModal() {
  const modal = document.getElementById('company-register-modal');
  if (modal) modal.classList.remove('show');
}

function registerNewCompany() {
  const name = document.getElementById('new-comp-name').value.trim();
  const sector = document.getElementById('new-comp-sector').value.trim();
  const campus = document.getElementById('new-comp-campus').value;
  const size = document.getElementById('new-comp-size').value;
  const emoji = document.getElementById('new-comp-emoji').value.trim() || '🏢';

  if (!name || !sector) {
    showToast('Lütfen şirket adı ve sektörünü belirtin!');
    return;
  }

  const newCompany = {
    id: 'comp_' + Date.now(),
    name: name,
    sector: sector,
    campus: campus,
    size: size,
    founder: ACCOUNTS[currentAuthUser]?.name || 'Teknokent Üyesi',
    logoEmoji: emoji,
    isFollowing: true
  };

  appState.companies.push(newCompany);
  saveAppState();
  closeCompanyModal();
  renderCompaniesList();
  showToast(`"${name}" Şirket hesabı oluşturuldu! 🎉`);
}

function openImageLightbox(imgSrc) {
  const lightbox = document.getElementById('image-lightbox-modal');
  const img = document.getElementById('lightbox-full-img');
  if (lightbox && img) {
    img.src = imgSrc;
    lightbox.classList.add('show');
  }
}

function closeLightbox() {
  const lightbox = document.getElementById('image-lightbox-modal');
  if (lightbox) lightbox.classList.remove('show');
}

// -----------------------------------------------------------------------------
// EVENT LISTENERS & UTILITIES
// -----------------------------------------------------------------------------

function setupEventListeners() {
  const chatInput = document.getElementById('chat-message-input');
  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendChatMessage();
    });
  }

  const searchInput = document.getElementById('main-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        renderFeed();
        return;
      }
      const container = document.getElementById('feed-posts-container');
      const filtered = appState.posts.filter(p => 
        p.content.toLowerCase().includes(q) || 
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q))) ||
        (ACCOUNTS[p.authorUsername] && ACCOUNTS[p.authorUsername].name.toLowerCase().includes(q))
      );
      
      const oldPosts = appState.posts;
      appState.posts = filtered;
      renderFeed();
      appState.posts = oldPosts;
    });
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem(THEME_KEY, next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('theme-toggle-btn');
  if (!btn) return;
  btn.innerHTML = theme === 'dark' 
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
}

function showToast(msg) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.innerHTML = `<span>⚡</span><span>${escapeHtml(msg)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

function resetDataToDefault() {
  if (confirm('Tüm verileri ve oturumları sıfırlamak istiyor musunuz?')) {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(SESSIONS_KEY);
    location.reload();
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
