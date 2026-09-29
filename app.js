/**
 * DIJITALPARK TEKNOKENT CONNECT
 * True Real-Time Hybrid Mesh (BroadcastChannel + LocalStorage EventBus + MQTT WebSockets)
 * Clean Concurrency Session Lock & Tab-Isolated Auth
 */

// Storage Keys
const STORAGE_KEY = 'dijitalpark_connect_v4';
const SESSION_USER_KEY = 'dijitalpark_tab_user_v4';
const SESSION_LOCK_KEY = 'dijitalpark_active_sessions_v4';
const THEME_KEY = 'dijitalpark_theme';

// Registered Default Accounts with Real User Photos
const DEFAULT_ACCOUNTS = {
  erdemcarkit: {
    username: 'erdemcarkit',
    password: '31316969',
    name: 'Enes Erdem Çarkıt',
    title: 'Kurucu Ortak & Lead AI Engineer',
    company: 'Neurologic AI',
    campus: 'Dijitalpark Çekmeköy Yerleşkesi',
    avatar: './assets/avatar_erdem.png',
    bio: 'Yapay zeka, derin öğrenme ve otonom ajan mimarileri üzerine Ar-Ge yürütüyoruz. Dijitalpark Teknokent Çekmeköy Yerleşkesi 3. Kat B304 ofisindeyiz.',
    skills: ['Yapay Zeka', 'Python', 'LLM Agents', 'PyTorch', 'Ar-Ge'],
    postsCount: 18,
    connectionsCount: 540,
    profileViews: 1420
  },
  aliniyya: {
    username: 'aliniyya',
    password: '31316969',
    name: 'Ali Nihat Eryürek',
    title: 'Senior Cloud & Systems Architect',
    company: 'CloudScale Tech',
    campus: 'Dijitalpark Ataşehir Yerleşkesi',
    avatar: './assets/avatar_ali.png',
    bio: 'Yüksek ölçekli bulut mimarileri, Kubernetes, mikroservisler ve DevOps optimizasyonları. Teknokent firmalarıyla açık kaynak ve ortak Ar-Ge projelerine her zaman açığım.',
    skills: ['Kubernetes', 'Cloud Native', 'Go', 'AWS/GCP', 'DevOps'],
    postsCount: 12,
    connectionsCount: 390,
    profileViews: 980
  },
  bakugan: {
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
    profileViews: 2350
  }
};

// Initial State Template
const DEFAULT_STATE = {
  users: JSON.parse(JSON.stringify(DEFAULT_ACCOUNTS)),
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
    'aliniyya__erdemcarkit': [
      { id: 'msg_seed_1', sender: 'aliniyya', recipient: 'erdemcarkit', text: 'Selam Erdem, yeni AI modeli testleri nasıl gidiyor?', time: '14:20', timestamp: Date.now() - 3600000 },
      { id: 'msg_seed_2', sender: 'erdemcarkit', recipient: 'aliniyya', text: 'Selam Ali! Gayet başarılı, biraz önce yeni laboratuvardan post paylaştım.', time: '14:22', timestamp: Date.now() - 3500000 }
    ],
    'bakugan__erdemcarkit': [
      { id: 'msg_seed_3', sender: 'bakugan', recipient: 'erdemcarkit', text: 'Erdem selam, Cuma günkü Teknokent Demo Day için 10 dakikalık bir slot ayırdım sana.', time: '11:15', timestamp: Date.now() - 7200000 }
    ],
    'aliniyya__bakugan': [
      { id: 'msg_seed_4', sender: 'bakugan', recipient: 'aliniyya', text: 'Ali selam, Ataşehir kampüsündeki workshop için salon hazır mı?', time: 'Dün', timestamp: Date.now() - 86400000 }
    ]
  }
};

// -----------------------------------------------------------------------------
// TAB RUNTIME VARIABLES
// -----------------------------------------------------------------------------
let appState = loadSharedState();
let currentTabUser = null; // Isolated tab auth
const tabSessionId = 'tab_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();
let activeChatPartner = null;
let isChatDockOpen = true;
let currentFeedCategory = 'all';
let selectedRegAvatar = './assets/avatar_erdem.png';
let typingDebounceTimer = null;
let presenceHeartbeatTimer = null;
let peerPresenceMap = {}; // username -> lastSeenTimestamp

// -----------------------------------------------------------------------------
// REAL-TIME BUS: HYBRID MESH
// 1. BroadcastChannel (0ms Instant Tab-to-Tab)
// 2. Storage Event (Cross-Tab Local Storage Fallback)
// 3. MQTT WebSockets (Cross-Device, Internet & Phone Real-time)
// -----------------------------------------------------------------------------
let localBroadcast = null;
try {
  localBroadcast = new BroadcastChannel('teknokent_mesh_v4');
  localBroadcast.onmessage = (event) => {
    if (event.data && event.data.originSessionId !== tabSessionId) {
      handleRealtimePacket(event.data);
    }
  };
} catch (e) {
  console.warn('BroadcastChannel unavailable, using storage bus fallback');
}

// Storage event for cross-tab state syncing
window.addEventListener('storage', (e) => {
  if (e.key === STORAGE_KEY) {
    appState = loadSharedState();
    if (currentTabUser) {
      renderFeed();
      renderChatDock();
      renderActiveChatWindow();
      renderOnlineMembersList();
    }
  } else if (e.key === SESSION_LOCK_KEY) {
    checkActiveSessionTakeover();
  }
});

// Clean up tab session immediately on unload/refresh (Prevents ghost locks!)
window.addEventListener('beforeunload', () => {
  if (currentTabUser) {
    releaseUserSession(currentTabUser);
  }
});
window.addEventListener('pagehide', () => {
  if (currentTabUser) {
    releaseUserSession(currentTabUser);
  }
});

// MQTT WebSocket Client
let mqttClient = null;
const MQTT_BROKERS = [
  'wss://broker.hivemq.com:8884/mqtt',
  'wss://broker.emqx.io:8084/mqtt'
];
let currentBrokerIdx = 0;

function initWebSocketRealtime() {
  updateRealtimeStatus(true, 'Canlı (Yerel Kanal)');

  if (typeof mqtt === 'undefined') {
    console.log('MQTT library not loaded, operating on local real-time mesh');
    return;
  }

  if (mqttClient) {
    try { mqttClient.end(true); } catch (e) {}
    mqttClient = null;
  }

  const brokerUrl = MQTT_BROKERS[currentBrokerIdx];
  const clientId = 'tk_' + tabSessionId;

  try {
    mqttClient = mqtt.connect(brokerUrl, {
      clientId: clientId,
      clean: true,
      connectTimeout: 5000,
      reconnectPeriod: 6000
    });

    mqttClient.on('connect', () => {
      console.log('✅ Realtime WebSocket connected:', brokerUrl);
      updateRealtimeStatus(true, 'Canlı (WebSocket Online)');

      // Subscribe to global announcements and user private channel
      mqttClient.subscribe('teknokent/blue/v4/global');
      if (currentTabUser) {
        mqttClient.subscribe(`teknokent/blue/v4/user/${currentTabUser}`);
      }
    });

    mqttClient.on('message', (topic, payload) => {
      try {
        const data = JSON.parse(payload.toString());
        if (data.originSessionId !== tabSessionId) {
          handleRealtimePacket(data);
        }
      } catch (err) {
        console.error('MQTT packet parse error', err);
      }
    });

    mqttClient.on('error', (err) => {
      console.warn('MQTT broker issue:', err.message || err);
      // Try next broker fallback
      currentBrokerIdx = (currentBrokerIdx + 1) % MQTT_BROKERS.length;
    });

    mqttClient.on('offline', () => {
      updateRealtimeStatus(true, 'Canlı (Yerel Kanal)');
    });
  } catch (err) {
    console.warn('MQTT init failed, falling back to local bus', err);
  }
}

function broadcastPacket(packet) {
  packet.originSessionId = tabSessionId;
  packet.timestamp = packet.timestamp || Date.now();

  // 1. Broadcast locally (Instant 0ms)
  if (localBroadcast) {
    try {
      localBroadcast.postMessage(packet);
    } catch (e) {}
  }

  // 2. Publish to MQTT WebSocket Mesh (Cross-device / Mobile / Internet)
  if (mqttClient && mqttClient.connected) {
    try {
      let topic = 'teknokent/blue/v4/global';
      if (packet.type === 'CHAT_MESSAGE' && packet.message?.recipient) {
        topic = `teknokent/blue/v4/user/${packet.message.recipient}`;
      } else if (packet.type === 'TYPING_STATUS' && packet.recipient) {
        topic = `teknokent/blue/v4/user/${packet.recipient}`;
      } else if (packet.type === 'SESSION_CLAIMED' && packet.username) {
        topic = `teknokent/blue/v4/user/${packet.username}`;
      }
      mqttClient.publish(topic, JSON.stringify(packet), { qos: 1 });
    } catch (e) {
      console.warn('MQTT publish error', e);
    }
  }
}

function handleRealtimePacket(packet) {
  if (!packet || !packet.type) return;

  switch (packet.type) {
    case 'CHAT_MESSAGE':
      if (packet.message) {
        handleIncomingChatMessage(packet.message);
      }
      break;

    case 'TYPING_STATUS':
      handleIncomingTyping(packet);
      break;

    case 'FEED_POST':
      if (packet.post) {
        // Add to posts if not exists
        if (!appState.posts.some(p => p.id === packet.post.id)) {
          appState.posts.unshift(packet.post);
          saveSharedState();
          renderFeed();
          if (currentTabUser && packet.post.authorUsername !== currentTabUser) {
            showToast(`📢 @${packet.post.authorUsername} yeni bir gönderi paylaştı!`);
          }
        }
      }
      break;

    case 'FEED_INTERACTION':
      appState = loadSharedState();
      renderFeed();
      break;

    case 'NEW_USER_REGISTERED':
      appState = loadSharedState();
      renderOnlineMembersList();
      renderChatDock();
      break;

    case 'SESSION_CLAIMED':
      if (currentTabUser && currentTabUser === packet.username && packet.newSessionId !== tabSessionId) {
        // Another tab or device claimed this session
        showSessionTakeoverNotice();
      }
      break;

    case 'PRESENCE_PING':
      if (packet.username) {
        peerPresenceMap[packet.username] = Date.now();
        renderOnlineMembersList();
        renderChatDockHeader();
      }
      break;
  }
}

function updateRealtimeStatus(online, text) {
  const badge = document.getElementById('ws-status-badge');
  const label = document.getElementById('ws-status-text');
  if (!badge) return;

  badge.className = online ? 'ws-status-badge' : 'ws-status-badge connecting';
  if (label) label.textContent = text || (online ? 'Canlı (WebSocket)' : 'Bağlanıyor...');
}

// -----------------------------------------------------------------------------
// STORAGE HELPERS
// -----------------------------------------------------------------------------
function loadSharedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Ensure defaults & real photos are always maintained
      for (const key in DEFAULT_ACCOUNTS) {
        if (!parsed.users[key]) {
          parsed.users[key] = JSON.parse(JSON.stringify(DEFAULT_ACCOUNTS[key]));
        } else {
          parsed.users[key].avatar = DEFAULT_ACCOUNTS[key].avatar;
          parsed.users[key].name = DEFAULT_ACCOUNTS[key].name;
        }
      }
      return parsed;
    }
  } catch (e) {
    console.warn('Storage load error, falling back to default', e);
  }
  return JSON.parse(JSON.stringify(DEFAULT_STATE));
}

function saveSharedState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  } catch (e) {
    console.error('Failed to save shared state', e);
  }
}

// -----------------------------------------------------------------------------
// SESSION CONCURRENCY MANAGEMENT (Aynı Anda 1 Kişi Kuralı)
// -----------------------------------------------------------------------------
function getActiveSessionsRegistry() {
  try {
    const raw = localStorage.getItem(SESSION_LOCK_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveActiveSessionsRegistry(reg) {
  try {
    localStorage.setItem(SESSION_LOCK_KEY, JSON.stringify(reg));
  } catch (e) {}
}

function claimUserSession(username) {
  const reg = getActiveSessionsRegistry();
  reg[username] = {
    sessionId: tabSessionId,
    timestamp: Date.now()
  };
  saveActiveSessionsRegistry(reg);

  // Broadcast to other tabs so old session hands over gracefully
  broadcastPacket({
    type: 'SESSION_CLAIMED',
    username: username,
    newSessionId: tabSessionId
  });
}

function releaseUserSession(username) {
  const reg = getActiveSessionsRegistry();
  if (reg[username] && reg[username].sessionId === tabSessionId) {
    delete reg[username];
    saveActiveSessionsRegistry(reg);
  }
}

function checkActiveSessionTakeover() {
  if (!currentTabUser) return;
  const reg = getActiveSessionsRegistry();
  const entry = reg[currentTabUser];
  if (entry && entry.sessionId !== tabSessionId) {
    showSessionTakeoverNotice();
  }
}

function showSessionTakeoverNotice() {
  const overlay = document.getElementById('session-takeover-overlay');
  if (overlay) {
    overlay.style.display = 'flex';
  }
}

function reclaimSession() {
  if (!currentTabUser) return;
  const overlay = document.getElementById('session-takeover-overlay');
  if (overlay) overlay.style.display = 'none';

  claimUserSession(currentTabUser);
  startHeartbeat(currentTabUser);
  showToast(`Oturum bu pencereye başarıyla aktarıldı! ⚡`);
}

function startHeartbeat(username) {
  stopHeartbeat();
  function ping() {
    peerPresenceMap[username] = Date.now();
    broadcastPacket({
      type: 'PRESENCE_PING',
      username: username
    });
  }
  ping();
  presenceHeartbeatTimer = setInterval(ping, 3500);
}

function stopHeartbeat() {
  if (presenceHeartbeatTimer) {
    clearInterval(presenceHeartbeatTimer);
    presenceHeartbeatTimer = null;
  }
}

// -----------------------------------------------------------------------------
// APP LIFECYCLE & INITIALIZATION
// -----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setupEventListeners();

  // Tab-isolated session check
  const sessionUser = sessionStorage.getItem(SESSION_USER_KEY);

  if (sessionUser && appState.users[sessionUser]) {
    loginSession(sessionUser, false);
  } else {
    showLoginScreen();
  }
});

function showLoginScreen(alertMsg) {
  const loginScreen = document.getElementById('login-screen');
  const mainApp = document.getElementById('main-app-screen');
  const alertBanner = document.getElementById('login-alert-banner');

  if (loginScreen) loginScreen.style.display = 'flex';
  if (mainApp) mainApp.style.display = 'none';

  if (alertBanner) {
    if (alertMsg) {
      alertBanner.innerHTML = alertMsg;
      alertBanner.style.display = 'block';
    } else {
      alertBanner.style.display = 'none';
    }
  }

  stopHeartbeat();
  if (currentTabUser) {
    releaseUserSession(currentTabUser);
  }
  currentTabUser = null;
  sessionStorage.removeItem(SESSION_USER_KEY);
}

function showMainApp() {
  const loginScreen = document.getElementById('login-screen');
  const mainApp = document.getElementById('main-app-screen');
  const takeoverOverlay = document.getElementById('session-takeover-overlay');

  if (loginScreen) loginScreen.style.display = 'none';
  if (mainApp) mainApp.style.display = 'block';
  if (takeoverOverlay) takeoverOverlay.style.display = 'none';

  // Set default chat partner to the first other user
  const otherUsers = Object.keys(appState.users).filter(u => u !== currentTabUser);
  if (!activeChatPartner || activeChatPartner === currentTabUser) {
    activeChatPartner = otherUsers[0] || 'aliniyya';
  }

  renderNavbar();
  renderProfileCard();
  renderComposer();
  renderFeed();
  renderOnlineMembersList();
  renderCompaniesList();
  renderChatDock();
  renderActiveChatWindow();
}

function loginSession(username, showWelcome = true) {
  currentTabUser = username;
  sessionStorage.setItem(SESSION_USER_KEY, username);

  claimUserSession(username);
  startHeartbeat(username);
  showMainApp();
  initWebSocketRealtime();

  if (showWelcome) {
    const user = appState.users[username];
    showToast(`Hoş geldiniz, ${user ? user.name : username}! 🚀`);
  }
}

// -----------------------------------------------------------------------------
// AUTH: LOGIN & REGISTER LOGIC
// -----------------------------------------------------------------------------
function switchAuthTab(mode) {
  const loginContainer = document.getElementById('login-form-container');
  const regContainer = document.getElementById('register-form-container');
  const btnLogin = document.getElementById('tab-btn-login');
  const btnReg = document.getElementById('tab-btn-register');
  const alertBanner = document.getElementById('login-alert-banner');
  const regAlert = document.getElementById('reg-alert-banner');

  if (alertBanner) alertBanner.style.display = 'none';
  if (regAlert) regAlert.style.display = 'none';

  if (mode === 'login') {
    if (loginContainer) loginContainer.style.display = 'block';
    if (regContainer) regContainer.style.display = 'none';
    if (btnLogin) btnLogin.classList.add('active');
    if (btnReg) btnReg.classList.remove('active');
  } else {
    if (loginContainer) loginContainer.style.display = 'none';
    if (regContainer) regContainer.style.display = 'block';
    if (btnLogin) btnLogin.classList.remove('active');
    if (btnReg) btnReg.classList.add('active');
  }
}

function handleLoginSubmit(event) {
  if (event) event.preventDefault();
  const usernameInput = document.getElementById('login-username-input');
  const passwordInput = document.getElementById('login-password-input');

  const username = usernameInput ? usernameInput.value.trim().toLowerCase() : '';
  const password = passwordInput ? passwordInput.value.trim() : '';

  if (!username || !password) {
    showLoginScreen('Lütfen kullanıcı adı ve şifrenizi girin!');
    return;
  }

  // Look for user by username or email
  let matchedUser = appState.users[username];
  if (!matchedUser) {
    // Search by email
    for (const key in appState.users) {
      if (appState.users[key].email && appState.users[key].email.toLowerCase() === username) {
        matchedUser = appState.users[key];
        break;
      }
    }
  }

  if (!matchedUser) {
    showLoginScreen(`❌ "@${username}" adına kayıtlı bir kullanıcı bulunamadı.`);
    return;
  }

  if (password !== (matchedUser.password || '31316969')) {
    showLoginScreen(`❌ Şifre hatalı! Lütfen kontrol edin.`);
    return;
  }

  loginSession(matchedUser.username, true);
}

function quickSelectUser(username) {
  const user = appState.users[username];
  if (!user) return;
  loginSession(username, true);
}

function selectRegAvatar(element) {
  document.querySelectorAll('.reg-avatar-choice').forEach(el => el.classList.remove('selected'));
  element.classList.add('selected');
  selectedRegAvatar = element.getAttribute('data-avatar') || './assets/avatar_erdem.png';
}

function handleRegisterSubmit(event) {
  if (event) event.preventDefault();
  const name = document.getElementById('reg-name-input').value.trim();
  const rawUsername = document.getElementById('reg-username-input').value.trim().toLowerCase();
  const email = document.getElementById('reg-email-input').value.trim();
  const password = document.getElementById('reg-password-input').value.trim();
  const password2 = document.getElementById('reg-password2-input').value.trim();
  const company = document.getElementById('reg-company-input').value.trim();
  const title = document.getElementById('reg-title-input').value.trim() || 'Girişimci & Araştırmacı';
  const campus = document.getElementById('reg-campus-select').value;
  const regAlert = document.getElementById('reg-alert-banner');

  // Sanitize username
  const username = rawUsername.replace(/[^a-z0-9_]/g, '');

  function showRegError(msg) {
    if (regAlert) {
      regAlert.innerHTML = `⚠️ ${msg}`;
      regAlert.style.display = 'block';
    } else {
      alert(msg);
    }
  }

  if (!name || !username || !password || !company) {
    showRegError('Lütfen zorunlu (*) alanların tümünü doldurun!');
    return;
  }

  if (password.length < 4) {
    showRegError('Şifreniz en az 4 karakter uzunluğunda olmalıdır!');
    return;
  }

  if (password !== password2) {
    showRegError('Girdiğiniz şifreler birbiriyle eşleşmiyor!');
    return;
  }

  if (appState.users[username]) {
    showRegError(`"@${username}" kullanıcı adı zaten kayıtlı! Lütfen farklı bir kullanıcı adı seçin.`);
    return;
  }

  const newUser = {
    username: username,
    password: password,
    name: name,
    email: email,
    title: title,
    company: company,
    campus: campus,
    avatar: selectedRegAvatar || './assets/avatar_erdem.png',
    bio: `${company} bünyesinde Teknokent Ar-Ge projeleri yürütüyorum.`,
    skills: ['Girişimcilik', 'İnovasyon', 'Ar-Ge'],
    postsCount: 0,
    connectionsCount: 1,
    profileViews: 1
  };

  appState.users[username] = newUser;
  saveSharedState();

  // Broadcast new registration
  broadcastPacket({
    type: 'NEW_USER_REGISTERED',
    user: newUser
  });

  // Automatically log in as the newly registered user
  loginSession(username, true);
  showToast(`🎉 Tebrikler ${name}! Hesabınız oluşturuldu ve giriş yapıldı.`);
}

function logout() {
  stopHeartbeat();
  if (currentTabUser) {
    releaseUserSession(currentTabUser);
    if (mqttClient) {
      try {
        mqttClient.unsubscribe(`teknokent/blue/v4/user/${currentTabUser}`);
      } catch (e) {}
    }
  }
  currentTabUser = null;
  sessionStorage.removeItem(SESSION_USER_KEY);
  showLoginScreen('Güvenli şekilde çıkış yapıldı.');
}

function togglePasswordVisibility(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.type = input.type === 'password' ? 'text' : 'password';
}

function openNewTabForTesting() {
  window.open(window.location.href, '_blank');
}

// -----------------------------------------------------------------------------
// ACCOUNT SWITCHER MENU
// -----------------------------------------------------------------------------
function toggleAccountSwitcher(event) {
  if (event) event.stopPropagation();
  const dropdown = document.getElementById('account-switcher-dropdown');
  if (!dropdown) return;

  const isVisible = dropdown.classList.contains('show');
  if (isVisible) {
    dropdown.classList.remove('show');
    return;
  }

  const users = Object.keys(appState.users);
  dropdown.innerHTML = `
    <div style="font-size:0.75rem; font-weight:800; color:var(--text-muted); text-transform:uppercase; margin-bottom:0.4rem; padding:0.2rem 0.4rem;">
      KULLANICI SEÇ (BU SEKMEDE AÇ)
    </div>
    ${users.map(uName => {
      const u = appState.users[uName];
      const isMe = uName === currentTabUser;
      const isOnline = isMe || (peerPresenceMap[uName] && (Date.now() - peerPresenceMap[uName] < 10000));
      return `
        <div class="account-switch-item ${isMe ? 'active' : ''}" onclick="switchAccountTo('${uName}')">
          <div style="position:relative;">
            <img src="${u.avatar}" class="account-switch-avatar" alt="${u.name}" />
            <div class="online-status-dot" style="background-color: ${isOnline ? 'var(--brand-online)' : '#64748B'};"></div>
          </div>
          <div class="account-switch-meta">
            <span class="account-switch-name">${u.name} ${isMe ? '(Aktif)' : ''}</span>
            <span class="account-switch-handle">@${u.username} • ${u.company}</span>
          </div>
        </div>
      `;
    }).join('')}
    <div style="border-top:1px solid var(--border-color); margin-top:0.4rem; padding-top:0.4rem;">
      <div class="account-switch-item" onclick="showLoginScreen(); switchAuthTab('register');">
        <span>➕</span>
        <span style="font-size:0.8rem; font-weight:700; color:var(--brand-turq);">Yeni Kullanıcı Kaydet</span>
      </div>
    </div>
  `;

  dropdown.classList.add('show');
}

function switchAccountTo(username) {
  const dropdown = document.getElementById('account-switcher-dropdown');
  if (dropdown) dropdown.classList.remove('show');
  if (username === currentTabUser) return;

  loginSession(username, true);
}

// Close account switcher dropdown on outside click
document.addEventListener('click', (e) => {
  const dropdown = document.getElementById('account-switcher-dropdown');
  if (dropdown && !dropdown.contains(e.target)) {
    dropdown.classList.remove('show');
  }
});

// -----------------------------------------------------------------------------
// REAL-TIME CHAT ENGINE (ZERO LATENCY, ZERO DUPLICATION)
// -----------------------------------------------------------------------------
function getThreadKey(userA, userB) {
  return [userA, userB].sort().join('__');
}

function formatTime(d) {
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function sendChatMessage(textOverride) {
  if (!currentTabUser || !activeChatPartner) return;

  const input = document.getElementById('chat-message-input');
  const text = (textOverride !== undefined ? textOverride : (input ? input.value : '')).trim();
  if (!text) return;

  const msgId = 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
  const now = new Date();
  const timeStr = formatTime(now);

  const messageObj = {
    id: msgId,
    sender: currentTabUser,
    recipient: activeChatPartner,
    text: text,
    time: timeStr,
    timestamp: Date.now()
  };

  // 1. Add locally
  addMessageToThread(messageObj);

  if (input) input.value = '';
  renderActiveChatWindow();
  renderChatDock();

  // 2. Broadcast via Hybrid Mesh (BroadcastChannel + MQTT)
  broadcastPacket({
    type: 'CHAT_MESSAGE',
    message: messageObj
  });

  // Cancel typing status
  broadcastPacket({
    type: 'TYPING_STATUS',
    sender: currentTabUser,
    recipient: activeChatPartner,
    isTyping: false
  });
}

function sendQuickReply(text) {
  sendChatMessage(text);
}

function addMessageToThread(msg) {
  const threadKey = getThreadKey(msg.sender, msg.recipient);
  if (!appState.messages[threadKey]) {
    appState.messages[threadKey] = [];
  }

  // Strict deduplication by ID or exact content within 2s window
  const alreadyExists = appState.messages[threadKey].some(m => 
    m.id === msg.id || (m.sender === msg.sender && m.text === msg.text && Math.abs(m.timestamp - msg.timestamp) < 2000)
  );

  if (!alreadyExists) {
    appState.messages[threadKey].push(msg);
    saveSharedState();
  }
}

function handleIncomingChatMessage(msg) {
  if (!currentTabUser || !msg) return;

  // Process only if recipient or sender is current user
  if (msg.recipient !== currentTabUser && msg.sender !== currentTabUser) return;

  addMessageToThread(msg);

  // Play audio chime and show notification if message came from another user
  if (msg.sender !== currentTabUser) {
    playChimeSound();
    if (!activeChatPartner || activeChatPartner !== msg.sender) {
      showToast(`💬 @${msg.sender}: "${msg.text.substring(0, 30)}..."`);
    }
  }

  renderChatDock();
  renderActiveChatWindow();
}

function handleChatInputTyping() {
  if (!currentTabUser || !activeChatPartner) return;

  broadcastPacket({
    type: 'TYPING_STATUS',
    sender: currentTabUser,
    recipient: activeChatPartner,
    isTyping: true
  });

  clearTimeout(typingDebounceTimer);
  typingDebounceTimer = setTimeout(() => {
    broadcastPacket({
      type: 'TYPING_STATUS',
      sender: currentTabUser,
      recipient: activeChatPartner,
      isTyping: false
    });
  }, 2500);
}

function handleIncomingTyping(packet) {
  if (!currentTabUser) return;
  if (packet.recipient === currentTabUser && packet.sender === activeChatPartner) {
    const indicator = document.getElementById('chat-typing-indicator');
    if (indicator) {
      if (packet.isTyping) {
        indicator.innerHTML = `✍️ @${packet.sender} yazıyor<span class="typing-dots"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></span>`;
        indicator.style.display = 'block';
      } else {
        indicator.style.display = 'none';
      }
    }
  }
}

function renderChatDock() {
  const container = document.getElementById('chat-contacts-list');
  if (!container || !currentTabUser) return;

  const otherUsers = Object.keys(appState.users).filter(u => u !== currentTabUser);

  container.innerHTML = otherUsers.map(partnerUName => {
    const partner = appState.users[partnerUName];
    const threadKey = getThreadKey(currentTabUser, partnerUName);
    const messages = appState.messages[threadKey] || [];
    const lastMsg = messages.length > 0 ? messages[messages.length - 1] : { text: 'Sohbet başlatın...', time: '' };

    const isOnline = peerPresenceMap[partnerUName] && (Date.now() - peerPresenceMap[partnerUName] < 10000);

    return `
      <div class="chat-contact-row" onclick="openChatWith('${partnerUName}')">
        <div class="contact-avatar-wrapper">
          <img src="${partner.avatar}" class="contact-avatar" alt="${partner.name}" />
          <div class="online-status-dot" style="background-color: ${isOnline ? 'var(--brand-online)' : '#64748B'};"></div>
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

function renderChatDockHeader() {
  const dock = document.getElementById('linkedin-chat-dock');
  if (!dock) return;
  // Dynamic online updates for contacts
  renderChatDock();
}

function renderActiveChatWindow() {
  const chatWindow = document.getElementById('active-conversation-window');
  if (!chatWindow) return;

  if (!activeChatPartner || !currentTabUser) {
    chatWindow.style.display = 'none';
    return;
  }

  chatWindow.style.display = 'flex';
  const partner = appState.users[activeChatPartner];
  if (!partner) return;

  const targetAvatar = document.getElementById('chat-target-avatar');
  const targetName = document.getElementById('chat-target-name');
  const targetStatus = document.getElementById('chat-target-status');

  const isOnline = peerPresenceMap[activeChatPartner] && (Date.now() - peerPresenceMap[activeChatPartner] < 10000);

  if (targetAvatar) targetAvatar.src = partner.avatar;
  if (targetName) targetName.textContent = `${partner.name} (@${partner.username})`;
  if (targetStatus) {
    targetStatus.innerHTML = isOnline 
      ? '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#10B981;"></span> 🟢 Çevrimiçi (Canlı)'
      : '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#64748B;"></span> Çevrimdışı';
  }

  const threadKey = getThreadKey(currentTabUser, activeChatPartner);
  const messages = appState.messages[threadKey] || [];
  const body = document.getElementById('chat-messages-body');

  if (body) {
    body.innerHTML = messages.map(msg => {
      const isOutgoing = msg.sender === currentTabUser;
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

function openChatWith(username) {
  activeChatPartner = username;
  renderActiveChatWindow();
  const input = document.getElementById('chat-message-input');
  if (input) input.focus();
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

function filterChatContacts(query) {
  const q = query.toLowerCase().trim();
  const rows = document.querySelectorAll('.chat-contact-row');
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(q) ? 'flex' : 'none';
  });
}

// Native Web Audio Synthesizer Chime
function playChimeSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
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
  } catch (e) {}
}

// -----------------------------------------------------------------------------
// POSTS & FEED
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
  if (!currentTabUser) return;
  const textarea = document.getElementById('post-composer-text');
  const content = textarea ? textarea.value.trim() : '';

  if (!content && !selectedPostImage) {
    showToast('Lütfen bir metin yazın veya görsel ekleyin!');
    return;
  }

  const postAsSelect = document.getElementById('post-as-select');
  const postAs = postAsSelect ? postAsSelect.value : 'user';
  const user = appState.users[currentTabUser];

  const hashtags = (content.match(/#([a-zA-Z0-9ığüşöçİĞÜŞÖÇ_]+)/g) || []).map(t => t.replace('#', ''));

  const newPost = {
    id: 'post_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    authorUsername: currentTabUser,
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
  saveSharedState();

  if (textarea) textarea.value = '';
  removeComposerImage();

  renderProfileCard();
  renderFeed();
  showToast('Gönderiniz canlı akışta yayınlandı! 🚀');

  // Broadcast to other sessions and mobile devices
  broadcastPacket({
    type: 'FEED_POST',
    post: newPost
  });
}

function toggleLike(postId) {
  if (!currentTabUser) return;
  const post = appState.posts.find(p => p.id === postId);
  if (!post) return;

  if (!post.likes) post.likes = [];
  const idx = post.likes.indexOf(currentTabUser);

  if (idx > -1) {
    post.likes.splice(idx, 1);
  } else {
    post.likes.push(currentTabUser);
  }

  saveSharedState();
  renderFeed();

  broadcastPacket({
    type: 'FEED_INTERACTION',
    action: 'like',
    postId: postId
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
  if (!currentTabUser) return;
  const input = document.getElementById(`comment-input-${postId}`);
  const text = input ? input.value.trim() : '';
  if (!text) return;

  const post = appState.posts.find(p => p.id === postId);
  if (!post) return;

  if (!post.comments) post.comments = [];
  post.comments.push({
    id: 'comm_' + Date.now(),
    authorUsername: currentTabUser,
    time: 'Şimdi',
    text: text
  });

  saveSharedState();
  if (input) input.value = '';
  renderFeed();

  const commentsWrapper = document.getElementById(`comments-${postId}`);
  if (commentsWrapper) commentsWrapper.classList.add('show');

  broadcastPacket({
    type: 'FEED_INTERACTION',
    action: 'comment',
    postId: postId
  });
}

function repost(postId) {
  const post = appState.posts.find(p => p.id === postId);
  if (!post) return;
  post.reposts = (post.reposts || 0) + 1;
  saveSharedState();
  renderFeed();
  showToast('Gönderi yeniden paylaşıldı! 🔄');
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

// -----------------------------------------------------------------------------
// UI RENDERING: NAVBAR, PROFILES, FEED
// -----------------------------------------------------------------------------
function renderNavbar() {
  if (!currentTabUser) return;
  const user = appState.users[currentTabUser];
  if (!user) return;

  const pillAvatar = document.getElementById('nav-user-avatar');
  const pillName = document.getElementById('nav-user-name');
  const pillRole = document.getElementById('nav-user-role');

  if (pillAvatar) pillAvatar.src = user.avatar;
  if (pillName) pillName.textContent = user.name;
  if (pillRole) pillRole.textContent = `@${user.username}`;
}

function renderProfileCard() {
  if (!currentTabUser) return;
  const user = appState.users[currentTabUser];
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
  if (!currentTabUser) return;
  const user = appState.users[currentTabUser];
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
      const acc = appState.users[post.authorUsername] || {
        name: 'Teknokent Üyesi',
        username: 'uye',
        title: 'Girişimci',
        avatar: './assets/avatar_erdem.png',
        campus: 'Dijitalpark Çekmeköy'
      };
      authorName = acc.name;
      authorHandle = acc.username;
      authorTitle = acc.title;
      authorAvatar = acc.avatar;
      campus = acc.campus;
    }

    const isLiked = post.likes && post.likes.includes(currentTabUser);
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
            <img src="${appState.users[currentTabUser]?.avatar}" class="comment-avatar-mini" />
            <div class="comment-input-box">
              <input type="text" class="comment-input" id="comment-input-${post.id}" placeholder="Düşüncenizi paylaşın..." onkeypress="handleCommentKeyPress(event, '${post.id}')" />
              <button class="comment-send-btn" onclick="submitComment('${post.id}')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
          </div>

          <div class="comments-list" id="comments-list-${post.id}">
            ${(post.comments || []).map(c => {
              const commenter = appState.users[c.authorUsername] || { name: c.authorUsername, avatar: './assets/avatar_erdem.png' };
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

function renderOnlineMembersList() {
  const container = document.getElementById('test-accounts-list');
  if (!container || !currentTabUser) return;

  const users = Object.keys(appState.users);

  container.innerHTML = users.map(uName => {
    const acc = appState.users[uName];
    const isMe = uName === currentTabUser;
    const isOnline = isMe || (peerPresenceMap[uName] && (Date.now() - peerPresenceMap[uName] < 10000));

    return `
      <div class="test-user-item ${isMe ? 'active-test-user' : ''}" onclick="${isMe ? '' : `openChatWith('${uName}')`}">
        <div class="test-user-info">
          <div style="position:relative;">
            <img src="${acc.avatar}" class="test-user-avatar" alt="${acc.name}" />
            <div class="online-status-dot" style="background-color: ${isOnline ? 'var(--brand-online)' : '#64748B'};"></div>
          </div>
          <div class="test-user-names">
            <span class="test-name">${acc.name} ${isMe ? '(Siz)' : ''}</span>
            <span class="test-title">@${acc.username} • ${isOnline ? '🟢 Çevrimiçi' : '⚪ Çevrimdışı'}</span>
          </div>
        </div>
        <button class="switch-pill-btn" style="${isMe ? 'background:var(--brand-online);' : ''}">
          ${isMe ? 'Aktif' : '💬 Sohbet'}
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

function toggleFollowCompany(companyId) {
  const comp = appState.companies.find(c => c.id === companyId);
  if (!comp) return;
  comp.isFollowing = !comp.isFollowing;
  saveSharedState();
  renderCompaniesList();
  showToast(comp.isFollowing ? `${comp.name} takip ediliyor!` : `${comp.name} takipten çıkarıldı.`);
}

// -----------------------------------------------------------------------------
// MODALS
// -----------------------------------------------------------------------------
function openProfileModal() {
  if (!currentTabUser) return;
  const modal = document.getElementById('profile-edit-modal');
  const user = appState.users[currentTabUser];
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
  if (!currentTabUser) return;
  const user = appState.users[currentTabUser];
  if (!user) return;

  user.name = document.getElementById('edit-profile-name').value.trim() || user.name;
  user.title = document.getElementById('edit-profile-title').value.trim() || user.title;
  user.company = document.getElementById('edit-profile-company').value.trim() || user.company;
  user.campus = document.getElementById('edit-profile-campus').value;
  user.bio = document.getElementById('edit-profile-bio').value.trim() || user.bio;

  saveSharedState();
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
    founder: appState.users[currentTabUser]?.name || 'Teknokent Üyesi',
    logoEmoji: emoji,
    isFollowing: true
  };

  appState.companies.push(newCompany);
  saveSharedState();
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
// EVENT LISTENERS & HELPERS
// -----------------------------------------------------------------------------
function setupEventListeners() {
  const chatInput = document.getElementById('chat-message-input');
  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendChatMessage();
    });
    chatInput.addEventListener('input', () => {
      handleChatInputTyping();
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
      const filtered = appState.posts.filter(p => 
        p.content.toLowerCase().includes(q) || 
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q))) ||
        (appState.users[p.authorUsername] && appState.users[p.authorUsername].name.toLowerCase().includes(q))
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
  if (confirm('Tüm verileri, sohbetleri ve oturumları sıfırlamak istiyor musunuz?')) {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SESSION_LOCK_KEY);
    sessionStorage.removeItem(SESSION_USER_KEY);
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
