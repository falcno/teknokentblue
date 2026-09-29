/**
 * DIJITALPARK TEKNOKENT CONNECT
 * Core Application Logic, State Management & Real-time Simulation
 */

// Storage Keys
const STORAGE_KEY = 'dijitalpark_connect_v1';
const THEME_KEY = 'dijitalpark_theme';

// Default Seed Data
const DEFAULT_STATE = {
  activeUserId: 'user_enes',
  users: {
    user_enes: {
      id: 'user_enes',
      name: 'Enes Erdem Çarkıt',
      title: 'Kurucu Ortak & Lead AI Engineer',
      company: 'Neurologic AI',
      campus: 'Dijitalpark Çekmeköy Yerleşkesi',
      avatar: './assets/avatar_enes.jpg',
      bio: 'Yapay zeka, derin öğrenme ve otonom ajan mimarileri üzerine Ar-Ge yürütüyoruz. Dijitalpark Teknokent Çekmeköy Yerleşkesi 3. Kat B304 ofisindeyiz.',
      skills: ['Yapay Zeka', 'Python', 'LLM Agents', 'PyTorch', 'Ar-Ge'],
      postsCount: 18,
      connectionsCount: 540,
      profileViews: 1420,
      online: true,
      verified: true
    },
    user_ali: {
      id: 'user_ali',
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
    user_batuhan: {
      id: 'user_batuhan',
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
    },
    user_mentor: {
      id: 'user_mentor',
      name: 'Dijitalpark Kuluçka & Girişim Koordinatörlüğü',
      title: 'Resmi Destek & Mentorluk Masası',
      company: 'Dijitalpark Teknokent Yönetim A.Ş.',
      campus: 'Çekmeköy & Ataşehir Yerleşkeleri',
      avatar: './assets/logo.jpg',
      bio: 'Ar-Ge teşvikleri, vergi muafiyetleri, TÜBİTAK 1507/1501 ve uluslararası Bridge to Balkans programları danışma kanalı.',
      skills: ['Ar-Ge Teşvikleri', 'Kuluçka', 'TÜBİTAK', 'Global Açılım'],
      postsCount: 45,
      connectionsCount: 1200,
      profileViews: 4900,
      online: true,
      verified: true
    }
  },
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
      authorId: 'user_enes',
      authorType: 'user',
      timestamp: '25 dakika önce',
      createdAt: Date.now() - 25 * 60 * 1000,
      content: 'Dijitalpark Teknokent Çekmeköy kampüsümüzdeki yeni otonom yapay zeka laboratuvarımızda ilk büyük prototip testini tamamladık! 🚀🤖\n\nEkosistemdeki diğer Ar-Ge ekipleriyle gerçek zamanlı veri akışı ve edge-computing modellerini test etmek istiyoruz. İlgilenen ekipler çay-kahveye bekleriz! ☕️',
      tags: ['YapayZeka', 'ArGe', 'AkıllıKampüs', 'Dijitalpark'],
      category: 'arge',
      image: './assets/post_office.jpg',
      likes: ['user_ali', 'user_batuhan', 'user_mentor'],
      reposts: 4,
      comments: [
        {
          id: 'comm_1',
          authorId: 'user_ali',
          time: '18 dk önce',
          text: 'Tebrikler Enes! Laboratuvar gerçekten muazzam olmuş. Bulut gecikme sürelerini düşürmek için bizim micro-gateway altyapısıyla entegre edebiliriz, öğleden sonra uğruyorum!'
        },
        {
          id: 'comm_2',
          authorId: 'user_batuhan',
          time: '10 dk önce',
          text: 'Harika bir hamle Enes. Cuma günü düzenleyeceğimiz Teknokent Girişimcilik Demo Günü için de bir sunum planlayalım derim!'
        }
      ]
    },
    {
      id: 'post_2',
      authorId: 'user_batuhan',
      authorType: 'user',
      timestamp: '1 saat önce',
      createdAt: Date.now() - 60 * 60 * 1000,
      content: 'Büyük gün! Yeni hızlandırma programımızın demo gününde ekiplerimiz uluslararası yatırımcılarla buluştu. 🎉✨\n\nDijitalpark Teknokent çatısı altındaki 6 girişimimizin ilk yatırım turlarını kapatmasını kutluyoruz. Büyümeye ve Türkiye’den küresel teknoloji markaları çıkarmaya devam!',
      tags: ['Girişimcilik', 'Lansman', 'Yatırım', 'BridgeToBalkans'],
      category: 'startup',
      image: './assets/post_team.jpg',
      likes: ['user_enes', 'user_ali', 'user_mentor'],
      reposts: 7,
      comments: [
        {
          id: 'comm_3',
          authorId: 'user_enes',
          time: '45 dk önce',
          text: 'Tüm ekipleri gönülden kutlarım Batuhan! Ekosistemin enerjisi her geçen gün katlanarak artıyor.'
        }
      ]
    },
    {
      id: 'post_3',
      authorId: 'user_ali',
      authorType: 'user',
      timestamp: '3 saat önce',
      createdAt: Date.now() - 3 * 60 * 60 * 1000,
      content: 'Ataşehir yerleşkesinde perşembe günü 15:30’da "Zero-Trust Cloud Mimarisi ve Teknokent Firmaları İçin Güvenlik Standartları" atölyesi düzenliyoruz. 🛡️💻\n\nKatılmak isteyen yazılımcı ve sistem yöneticisi arkadaşlar DM atabilir, kontenjan 30 kişiyle sınırlıdır!',
      tags: ['CloudNative', 'SiberGüvenlik', 'DevOps', 'Etkinlik'],
      category: 'etkinlik',
      image: null,
      likes: ['user_enes'],
      reposts: 2,
      comments: []
    }
  ],
  messages: {
    // Thread key format: "userId1_userId2" (sorted alphabetically)
    'user_ali_user_enes': [
      { senderId: 'user_ali', text: 'Selam Enes, yeni AI modeli testleri nasıl gidiyor?', time: '14:20' },
      { senderId: 'user_enes', text: 'Selam Ali! Gayet başarılı, biraz önce yeni laboratuvardan post paylaştım.', time: '14:22' },
      { senderId: 'user_ali', text: 'Gördüm az önce yorum da yazdım. Çekmeköy kampüsüne gelince kahve içelim.', time: '14:25' }
    ],
    'user_batuhan_user_enes': [
      { senderId: 'user_batuhan', text: 'Enes selam, Cuma günkü Teknokent Demo Day için 10 dakikalık bir slot ayırdım sana.', time: '11:15' },
      { senderId: 'user_enes', text: 'Harika olur Batuhan! Prototipi canlı demoda çalıştırabiliriz.', time: '11:18' },
      { senderId: 'user_batuhan', text: 'Süper, sunum başlığını bana akşama kadar iletirsen programa ekliyorum.', time: '11:20' }
    ],
    'user_ali_user_batuhan': [
      { senderId: 'user_batuhan', text: 'Ali selam, Ataşehir kampüsündeki workshop için salon hazır mı?', time: 'Dün' },
      { senderId: 'user_ali', text: 'Evet Batuhan, yönetimle konuştuk A Blok Konferans Salonu ayrıldı.', time: 'Dün' }
    ],
    'user_enes_user_mentor': [
      { senderId: 'user_mentor', text: 'Sayın Enes Erdem Çarkıt, Neurologic AI firması için TÜBİTAK 1507 Ar-Ge rapor onayınız sisteme yüklendi.', time: 'Dün' },
      { senderId: 'user_enes', text: 'Bilgilendirme için teşekkürler, inceleyip portal üzerinden imzalayacağım.', time: 'Dün' }
    ]
  }
};

// Global App State
let appState = loadState();
let activeChatPartnerId = 'user_ali';
let isChatDockOpen = true;
let currentFeedCategory = 'all';

// Initialize State
function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn('LocalStorage error, using defaults', e);
  }
  return JSON.parse(JSON.stringify(DEFAULT_STATE));
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  } catch (e) {
    console.error('Save state failed', e);
  }
}

// Reset data helper
function resetDataToDefault() {
  if (confirm('Tüm verileri varsayılan örnek verilere sıfırlamak istiyor musunuz?')) {
    localStorage.removeItem(STORAGE_KEY);
    appState = JSON.parse(JSON.stringify(DEFAULT_STATE));
    saveState();
    location.reload();
  }
}

// -----------------------------------------------------------------------------
// APP INITIALIZATION
// -----------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderApp();
  setupEventListeners();
});

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

// -----------------------------------------------------------------------------
// RENDER VIEWS
// -----------------------------------------------------------------------------

function renderApp() {
  renderNavbar();
  renderProfileCard();
  renderComposer();
  renderFeed();
  renderTestAccountsWidget();
  renderCompaniesList();
  renderChatDock();
  renderActiveChatWindow();
}

// Render Top Navbar Pill
function renderNavbar() {
  const activeUser = appState.users[appState.activeUserId];
  if (!activeUser) return;

  const pillAvatar = document.getElementById('nav-user-avatar');
  const pillName = document.getElementById('nav-user-name');
  const pillRole = document.getElementById('nav-user-role');

  if (pillAvatar) pillAvatar.src = activeUser.avatar;
  if (pillName) pillName.textContent = activeUser.name;
  if (pillRole) pillRole.textContent = activeUser.company;
}

// Render Left Sidebar Profile Card
function renderProfileCard() {
  const user = appState.users[appState.activeUserId];
  if (!user) return;

  const avatar = document.getElementById('sidebar-user-avatar');
  const name = document.getElementById('sidebar-user-name');
  const headline = document.getElementById('sidebar-user-headline');
  const campusBadge = document.getElementById('sidebar-user-campus');
  const statPosts = document.getElementById('stat-posts-count');
  const statConnections = document.getElementById('stat-connections-count');
  const statViews = document.getElementById('stat-views-count');

  if (avatar) avatar.src = user.avatar;
  if (name) name.innerHTML = `${user.name} <span class="verified-badge"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></span>`;
  if (headline) headline.textContent = user.title;
  if (campusBadge) campusBadge.innerHTML = `📍 ${user.campus}`;
  if (statPosts) statPosts.textContent = user.postsCount;
  if (statConnections) statConnections.textContent = user.connectionsCount;
  if (statViews) statViews.textContent = user.profileViews;
}

// Render Post Composer
function renderComposer() {
  const user = appState.users[appState.activeUserId];
  if (!user) return;

  const composerAvatar = document.getElementById('composer-active-avatar');
  if (composerAvatar) composerAvatar.src = user.avatar;

  const postAsSelect = document.getElementById('post-as-select');
  if (postAsSelect) {
    postAsSelect.innerHTML = `
      <option value="user">${user.name} (Kişisel Profil)</option>
      <option value="company">${user.company} (Şirket Hesabı Adına)</option>
    `;
  }
}

// Render Feed Posts
function renderFeed() {
  const feedContainer = document.getElementById('feed-posts-container');
  if (!feedContainer) return;

  let filteredPosts = [...appState.posts];
  if (currentFeedCategory !== 'all') {
    filteredPosts = filteredPosts.filter(p => p.category === currentFeedCategory);
  }

  // Sort newest first
  filteredPosts.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

  if (filteredPosts.length === 0) {
    feedContainer.innerHTML = `
      <div class="card-base" style="padding: 2.5rem; text-align: center; color: var(--text-secondary);">
        <p style="font-size: 1.1rem; font-weight: 700;">Bu kategoride henüz gönderi yok.</p>
        <p style="font-size: 0.85rem; margin-top: 0.5rem;">İlk paylaşımı siz yaparak Teknokent ekosistemine ilham verin!</p>
      </div>
    `;
    return;
  }

  feedContainer.innerHTML = filteredPosts.map(post => {
    const isCompanyPost = post.authorType === 'company';
    let authorName = '';
    let authorTitle = '';
    let authorAvatar = '';
    let campus = '';
    let isOnline = false;

    if (isCompanyPost) {
      authorName = post.companyName || 'Şirket';
      authorTitle = 'Teknokent Ar-Ge Şirketi';
      authorAvatar = './assets/logo.jpg';
      campus = 'Dijitalpark Teknokent';
      isOnline = true;
    } else {
      const author = appState.users[post.authorId] || {
        name: 'Teknokent Üyesi',
        title: 'Girişimci',
        avatar: './assets/avatar_enes.jpg',
        campus: 'Dijitalpark Çekmeköy',
        online: true
      };
      authorName = author.name;
      authorTitle = author.title;
      authorAvatar = author.avatar;
      campus = author.campus;
      isOnline = author.online;
    }

    const isLiked = post.likes && post.likes.includes(appState.activeUserId);
    const likeCount = post.likes ? post.likes.length : 0;
    const commentCount = post.comments ? post.comments.length : 0;

    // Format content with hashtags
    const formattedContent = escapeHtml(post.content).replace(/#([a-zA-Z0-9ığüşöçİĞÜŞÖÇ_]+)/g, '<a href="javascript:void(0)" class="hashtag">#$1</a>');

    return `
      <article class="card-base post-card" id="post-${post.id}">
        <div class="post-header">
          <div class="post-author-wrapper" onclick="openAuthorProfile('${post.authorId}')">
            <div class="post-avatar-box">
              <img src="${authorAvatar}" class="post-avatar" alt="${authorName}" />
              ${isOnline ? '<div class="online-status-dot"></div>' : ''}
            </div>
            <div class="post-author-meta">
              <div class="post-author-name-row">
                <span class="post-author-name">${authorName}</span>
                <span class="verified-badge" title="Doğrulanmış Teknokent Üyesi">
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

        <!-- Comments Container -->
        <div class="comments-wrapper" id="comments-${post.id}">
          <div class="comment-input-row">
            <img src="${appState.users[appState.activeUserId].avatar}" class="comment-avatar-mini" />
            <div class="comment-input-box">
              <input type="text" class="comment-input" id="comment-input-${post.id}" placeholder="Düşüncenizi paylaşın..." onkeypress="handleCommentKeyPress(event, '${post.id}')" />
              <button class="comment-send-btn" onclick="submitComment('${post.id}')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
          </div>

          <div class="comments-list" id="comments-list-${post.id}">
            ${(post.comments || []).map(c => {
              const commenter = appState.users[c.authorId] || { name: 'Üye', avatar: './assets/avatar_enes.jpg' };
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

// Render Test Accounts Switcher (Requested explicitly by User for Enes, Ali, Batuhan)
function renderTestAccountsWidget() {
  const container = document.getElementById('test-accounts-list');
  if (!container) return;

  const testUserIds = ['user_enes', 'user_ali', 'user_batuhan'];

  container.innerHTML = testUserIds.map(id => {
    const user = appState.users[id];
    const isActive = appState.activeUserId === id;

    return `
      <div class="test-user-item ${isActive ? 'active-test-user' : ''}" onclick="switchActiveUser('${id}')">
        <div class="test-user-info">
          <div style="position:relative;">
            <img src="${user.avatar}" class="test-user-avatar" alt="${user.name}" />
            <div class="online-status-dot"></div>
          </div>
          <div class="test-user-names">
            <span class="test-name">${user.name}</span>
            <span class="test-title">${user.company}</span>
          </div>
        </div>
        <button class="switch-pill-btn">
          ${isActive ? '✓ Aktif' : 'Geçiş Yap'}
        </button>
      </div>
    `;
  }).join('');
}

// Render Teknokent Companies
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
            <div class="company-sector">${comp.sector} • ${comp.campus.split(' - ')[0]}</div>
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
// CHAT / MESSAGING (LINKEDIN DOCK & POPUP SYSTEM)
// -----------------------------------------------------------------------------

function renderChatDock() {
  const dock = document.getElementById('linkedin-chat-dock');
  const contactsContainer = document.getElementById('chat-contacts-list');
  if (!dock || !contactsContainer) return;

  const activeUser = appState.users[appState.activeUserId];
  const allUserIds = Object.keys(appState.users).filter(id => id !== appState.activeUserId);

  contactsContainer.innerHTML = allUserIds.map(partnerId => {
    const partner = appState.users[partnerId];
    const threadKey = getThreadKey(appState.activeUserId, partnerId);
    const messages = appState.messages[threadKey] || [];
    const lastMsg = messages.length > 0 ? messages[messages.length - 1] : { text: 'Sohbet başlatın...', time: '' };

    return `
      <div class="chat-contact-row" onclick="openChatWith('${partnerId}')">
        <div class="contact-avatar-wrapper">
          <img src="${partner.avatar}" class="contact-avatar" />
          ${partner.online ? '<div class="online-status-dot"></div>' : ''}
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

  if (!activeChatPartnerId) {
    chatWindow.style.display = 'none';
    return;
  }

  chatWindow.style.display = 'flex';
  const partner = appState.users[activeChatPartnerId];
  if (!partner) return;

  // Header info
  const targetAvatar = document.getElementById('chat-target-avatar');
  const targetName = document.getElementById('chat-target-name');
  const targetStatus = document.getElementById('chat-target-status');

  if (targetAvatar) targetAvatar.src = partner.avatar;
  if (targetName) targetName.textContent = partner.name;
  if (targetStatus) {
    targetStatus.innerHTML = partner.online 
      ? '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#10B981;"></span> Şu an aktif'
      : '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#64748B;"></span> Çevrimdışı';
  }

  // Messages body
  const threadKey = getThreadKey(appState.activeUserId, activeChatPartnerId);
  const messages = appState.messages[threadKey] || [];
  const body = document.getElementById('chat-messages-body');

  if (body) {
    body.innerHTML = messages.map(msg => {
      const isOutgoing = msg.senderId === appState.activeUserId;
      return `
        <div class="chat-bubble ${isOutgoing ? 'outgoing' : 'incoming'}">
          ${escapeHtml(msg.text)}
          <div class="chat-bubble-time">${msg.time} ${isOutgoing ? '✓✓' : ''}</div>
        </div>
      `;
    }).join('');

    // Scroll to bottom
    body.scrollTop = body.scrollHeight;
  }
}

function getThreadKey(userA, userB) {
  return [userA, userB].sort().join('_');
}

function toggleChatDock() {
  const dock = document.getElementById('linkedin-chat-dock');
  const content = document.getElementById('chat-dock-content');
  if (!dock || !content) return;

  isChatDockOpen = !isChatDockOpen;
  content.style.display = isChatDockOpen ? 'block' : 'none';
  const icon = document.getElementById('dock-toggle-icon');
  if (icon) {
    icon.innerHTML = isChatDockOpen 
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"></polyline></svg>';
  }
}

function openChatWith(partnerId) {
  activeChatPartnerId = partnerId;
  renderActiveChatWindow();
}

function closeActiveChat() {
  activeChatPartnerId = null;
  const chatWindow = document.getElementById('active-conversation-window');
  if (chatWindow) chatWindow.style.display = 'none';
}

function sendChatMessage(textOverride) {
  const input = document.getElementById('chat-message-input');
  const text = textOverride || (input ? input.value.trim() : '');
  if (!text || !activeChatPartnerId) return;

  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const threadKey = getThreadKey(appState.activeUserId, activeChatPartnerId);
  if (!appState.messages[threadKey]) {
    appState.messages[threadKey] = [];
  }

  appState.messages[threadKey].push({
    senderId: appState.activeUserId,
    text: text,
    time: timeStr
  });

  saveState();
  if (input) input.value = '';
  renderActiveChatWindow();
  renderChatDock();

  // Simulated instant auto-reply for realistic interactive demo feel
  const currentPartner = activeChatPartnerId;
  const currentActive = appState.activeUserId;

  setTimeout(() => {
    if (activeChatPartnerId === currentPartner && appState.activeUserId === currentActive) {
      simulatePartnerReply(currentPartner, currentActive, text);
    }
  }, 1200);
}

function sendQuickReply(text) {
  sendChatMessage(text);
}

function simulatePartnerReply(partnerId, targetUserId, userMessage) {
  const threadKey = getThreadKey(targetUserId, partnerId);
  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  let replyText = "Harika, Teknokent kafesinde konuşalım!";
  if (partnerId === 'user_enes') {
    replyText = "Mesajın için teşekkürler! AI modelimiz üzerindeki testler bitince hemen geri dönüş yapıyorum.";
  } else if (partnerId === 'user_ali') {
    replyText = "Kesinlikle katılıyorum. Cloud altyapısında bu yapıyı kuralım, verimlilik ciddi oranda artar.";
  } else if (partnerId === 'user_batuhan') {
    replyText = "Süper fikir! Bunu Cuma günkü Teknokent yatırımcı sunumuna ekleyebiliriz.";
  } else if (partnerId === 'user_mentor') {
    replyText = "Talebiniz Teknokent Proje Yönetim Ofisine iletilmiştir. İyi çalışmalar dileriz!";
  }

  appState.messages[threadKey].push({
    senderId: partnerId,
    text: replyText,
    time: timeStr
  });

  saveState();
  renderActiveChatWindow();
  renderChatDock();
  showToast(`${appState.users[partnerId].name} mesaj gönderdi: "${replyText.substring(0, 30)}..."`);
}

// -----------------------------------------------------------------------------
// POST CREATION & FEED INTERACTIONS
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
  const textarea = document.getElementById('post-composer-text');
  const content = textarea ? textarea.value.trim() : '';

  if (!content && !selectedPostImage) {
    showToast('Lütfen bir metin yazın veya görsel ekleyin!');
    return;
  }

  const postAsSelect = document.getElementById('post-as-select');
  const postAs = postAsSelect ? postAsSelect.value : 'user';
  const activeUser = appState.users[appState.activeUserId];

  // Extract hashtags
  const hashtags = (content.match(/#([a-zA-Z0-9ığüşöçİĞÜŞÖÇ_]+)/g) || []).map(t => t.replace('#', ''));

  const newPost = {
    id: 'post_' + Date.now(),
    authorId: appState.activeUserId,
    authorType: postAs,
    companyName: postAs === 'company' ? activeUser.company : null,
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
  activeUser.postsCount = (activeUser.postsCount || 0) + 1;
  saveState();

  // Reset composer
  if (textarea) textarea.value = '';
  removeComposerImage();

  renderProfileCard();
  renderFeed();
  showToast('Gönderiniz Teknokent akışında yayınlandı! 🚀');
}

function toggleLike(postId) {
  const post = appState.posts.find(p => p.id === postId);
  if (!post) return;

  if (!post.likes) post.likes = [];
  const idx = post.likes.indexOf(appState.activeUserId);

  if (idx > -1) {
    post.likes.splice(idx, 1);
  } else {
    post.likes.push(appState.activeUserId);
  }

  saveState();
  renderFeed();
}

function toggleCommentsSection(postId) {
  const commentsWrapper = document.getElementById(`comments-${postId}`);
  if (!commentsWrapper) return;
  commentsWrapper.classList.toggle('show');
}

function handleCommentKeyPress(event, postId) {
  if (event.key === 'Enter') {
    submitComment(postId);
  }
}

function submitComment(postId) {
  const input = document.getElementById(`comment-input-${postId}`);
  const text = input ? input.value.trim() : '';
  if (!text) return;

  const post = appState.posts.find(p => p.id === postId);
  if (!post) return;

  if (!post.comments) post.comments = [];
  post.comments.push({
    id: 'comm_' + Date.now(),
    authorId: appState.activeUserId,
    time: 'Şimdi',
    text: text
  });

  saveState();
  if (input) input.value = '';
  renderFeed();

  // Keep comment box open
  const commentsWrapper = document.getElementById(`comments-${postId}`);
  if (commentsWrapper) commentsWrapper.classList.add('show');
}

function repost(postId) {
  const post = appState.posts.find(p => p.id === postId);
  if (!post) return;
  post.reposts = (post.reposts || 0) + 1;
  saveState();
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

// -----------------------------------------------------------------------------
// USER SWITCHING & PROFILE MANAGEMENT
// -----------------------------------------------------------------------------

function switchActiveUser(userId) {
  if (!appState.users[userId]) return;
  appState.activeUserId = userId;
  saveState();

  renderNavbar();
  renderProfileCard();
  renderComposer();
  renderFeed();
  renderTestAccountsWidget();
  renderChatDock();
  renderActiveChatWindow();

  showToast(`Aktif kullanıcı değiştirildi: ${appState.users[userId].name}`);
}

function toggleFollowCompany(companyId) {
  const comp = appState.companies.find(c => c.id === companyId);
  if (!comp) return;
  comp.isFollowing = !comp.isFollowing;
  saveState();
  renderCompaniesList();
  showToast(comp.isFollowing ? `${comp.name} takip ediliyor!` : `${comp.name} takipten çıkarıldı.`);
}

// -----------------------------------------------------------------------------
// MODALS (PROFILE CREATION & COMPANY ACCOUNT)
// -----------------------------------------------------------------------------

function openProfileModal() {
  const modal = document.getElementById('profile-edit-modal');
  const user = appState.users[appState.activeUserId];
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
  const user = appState.users[appState.activeUserId];
  if (!user) return;

  user.name = document.getElementById('edit-profile-name').value.trim() || user.name;
  user.title = document.getElementById('edit-profile-title').value.trim() || user.title;
  user.company = document.getElementById('edit-profile-company').value.trim() || user.company;
  user.campus = document.getElementById('edit-profile-campus').value;
  user.bio = document.getElementById('edit-profile-bio').value.trim() || user.bio;

  saveState();
  closeProfileModal();
  renderNavbar();
  renderProfileCard();
  renderTestAccountsWidget();
  renderFeed();
  showToast('Profil bilgileriniz güncellendi! ✅');
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
    founder: appState.users[appState.activeUserId].name,
    logoEmoji: emoji,
    isFollowing: true
  };

  appState.companies.push(newCompany);
  saveState();
  closeCompanyModal();
  renderCompaniesList();
  showToast(`"${name}" Şirket hesabı başarıyla oluşturuldu! 🎉`);
}

function openAuthorProfile(userId) {
  if (appState.users[userId]) {
    switchActiveUser(userId);
  }
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
  // Chat enter key
  const chatInput = document.getElementById('chat-message-input');
  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendChatMessage();
    });
  }

  // Search input filter
  const searchInput = document.getElementById('main-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        renderFeed();
        return;
      }
      const feedContainer = document.getElementById('feed-posts-container');
      const filtered = appState.posts.filter(p => 
        p.content.toLowerCase().includes(q) || 
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q))) ||
        (appState.users[p.authorId] && appState.users[p.authorId].name.toLowerCase().includes(q))
      );
      renderCustomFeed(filtered);
    });
  }
}

function renderCustomFeed(posts) {
  const feedContainer = document.getElementById('feed-posts-container');
  if (!feedContainer) return;
  // reuse renderFeed logic with custom array
  const oldPosts = appState.posts;
  appState.posts = posts;
  renderFeed();
  appState.posts = oldPosts;
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
  toast.innerHTML = `<span>✨</span><span>${escapeHtml(msg)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 3200);
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
