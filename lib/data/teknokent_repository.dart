import 'package:flutter/foundation.dart';
import 'models/user_model.dart';
import 'models/company_model.dart';
import 'models/post_model.dart';
import 'models/chat_model.dart';
import 'models/application_model.dart';

class TeknokentRepository extends ChangeNotifier {
  User? _currentUser;
  final Map<String, User> _users = {};
  final List<Company> _companies = [];
  final List<AccountApplication> _applications = [];
  final List<Post> _posts = [];
  final List<ChatMessage> _messages = [];
  AccountApplication? _lastSubmittedApplication;

  User? get currentUser => _currentUser;
  bool get isAuthenticated => _currentUser != null;
  List<Company> get companies => List.unmodifiable(_companies);
  List<Post> get posts => List.unmodifiable(_posts);
  List<AccountApplication> get applications => List.unmodifiable(_applications);
  AccountApplication? get lastSubmittedApplication => _lastSubmittedApplication;

  TeknokentRepository() {
    _seedInitialData();
  }

  void _seedInitialData() {
    // 1. Şirketler / Kuluçkalar
    _companies.addAll([
      Company(
        id: 'neurologic',
        name: 'Neurologic AI',
        category: 'Ar-Ge Şirketi',
        block: 'A Blok - No: 104',
        teamSize: '15-50 Kişi',
        description: 'Derin öğrenme, tıbbi görüntüleme ve otonom sistemler üzerine Ar-Ge.',
        emoji: '🧠',
        employeeCount: 6,
      ),
      Company(
        id: 'cloudscale',
        name: 'CloudScale DevOps',
        category: 'Startup',
        block: 'B Blok - No: 205',
        teamSize: '5-15 Kişi',
        description: 'Kubernetes mimarisi, multi-cloud orkestrasyonu ve bulut optimizasyonu.',
        emoji: '☁️',
        employeeCount: 4,
      ),
      Company(
        id: 'corehub',
        name: 'CoreHub Kuluçka Merkezi',
        category: 'Kuluçka Merkezi',
        block: 'İnovasyon Binası - Zemin Kat',
        teamSize: '20+ Girişim',
        description: 'Erken aşama teknoloji girişimleri için hızlandırma ve tohum fon desteği.',
        emoji: '🚀',
        employeeCount: 8,
      ),
      Company(
        id: 'bionano',
        name: 'BioNano Lab',
        category: 'Ar-Ge Şirketi',
        block: 'B Blok - No: 310',
        teamSize: '10-25 Kişi',
        description: 'Biyomedikal nanoteknoloji ve hedefli ilaç salım sistemleri.',
        emoji: '🧬',
        employeeCount: 5,
      ),
      Company(
        id: 'cyberguard',
        name: 'CyberGuard Savunma',
        category: 'Ar-Ge Şirketi',
        block: 'A Blok - No: 212',
        teamSize: '5-15 Kişi',
        description: 'Endüstriyel OT/SCADA siber savunma ve yapay zeka destekli tehdit avcılığı.',
        emoji: '🛡️',
        employeeCount: 3,
      ),
    ]);

    // 2. Hiyerarşik Kullanıcılar
    // Level 1: Marmara Teknokent Süper Yönetici
    _users['marmarateknokent'] = User(
      username: 'marmarateknokent',
      fullName: 'Marmara Teknokent Çatı Yönetimi',
      companyId: 'marmarateknokent',
      companyName: 'Marmara Teknokent TGB',
      role: UserRole.superAdmin,
      title: 'Genel Müdürlük & Ekosistem Koordinasyonu',
      avatarUrl: 'assets/logo.jpg',
      bio: 'Marmara Teknoloji Geliştirme Bölgesi resmi yönetim hesabı. Tüm firmalar, startuplar ve kuluçka merkezlerinin yetki mercisi.',
      password: '31316969',
      postsCount: 12,
      followersCount: 1420,
      followingCount: 48,
    );

    // Level 2: Firma & Kuluçka Yetkilileri
    _users['neurologic'] = User(
      username: 'neurologic',
      fullName: 'Neurologic AI Yetkili Ofisi',
      companyId: 'neurologic',
      companyName: 'Neurologic AI',
      role: UserRole.companyAdmin,
      title: 'Firma Temsilcisi & İK Yetkilisi',
      avatarUrl: 'assets/avatar_erdem.jpg',
      bio: 'Neurologic AI kurumsal hesabı. Yeni nesil sağlık teknolojileri ve yapay zeka modelleri geliştiriyoruz.',
      password: '31316969',
      postsCount: 8,
      followersCount: 340,
      followingCount: 15,
    );

    _users['cloudscale'] = User(
      username: 'cloudscale',
      fullName: 'CloudScale DevOps Ofisi',
      companyId: 'cloudscale',
      companyName: 'CloudScale DevOps',
      role: UserRole.companyAdmin,
      title: 'Kurucu Ortak & Operasyon Direktörü',
      avatarUrl: 'assets/avatar_ali.jpg',
      bio: 'CloudScale kurumsal hesabı. Bulut yerel mimariler ve kesintisiz dağıtım çözümleri.',
      password: '31316969',
      postsCount: 5,
      followersCount: 210,
      followingCount: 18,
    );

    _users['corehub'] = User(
      username: 'corehub',
      fullName: 'CoreHub Kuluçka Koordinatörlüğü',
      companyId: 'corehub',
      companyName: 'CoreHub Kuluçka Merkezi',
      role: UserRole.companyAdmin,
      title: 'Kuluçka Program Direktörü',
      avatarUrl: 'assets/avatar_batuhan.jpg',
      bio: 'CoreHub resmi hesabı. Girişimcilerin fikirden ürüne geçişini hızlandırıyoruz.',
      password: '31316969',
      postsCount: 14,
      followersCount: 580,
      followingCount: 42,
    );

    // Level 3: Firma Onaylı Personeller
    _users['erdemcarkit'] = User(
      username: 'erdemcarkit',
      fullName: 'Erdem Çarkıt',
      companyId: 'neurologic',
      companyName: 'Neurologic AI',
      role: UserRole.employee,
      title: 'Kıdemli Yapay Zeka Araştırmacısı',
      avatarUrl: 'assets/avatar_erdem.jpg',
      bio: 'Neurologic AI bünyesinde Computer Vision ve Edge AI modelleri üzerine çalışıyorum.',
      password: '31316969',
      postsCount: 6,
      followersCount: 180,
      followingCount: 24,
    );

    _users['aliniyya'] = User(
      username: 'aliniyya',
      fullName: 'Ali Nihat',
      companyId: 'cloudscale',
      companyName: 'CloudScale DevOps',
      role: UserRole.employee,
      title: 'DevOps & Site Reliability Architect',
      avatarUrl: 'assets/avatar_ali.jpg',
      bio: 'CloudScale ekibinde Kubernetes küme orkestrasyonu ve sıfır kesinti CI/CD boru hatları inşa ediyorum.',
      password: '31316969',
      postsCount: 4,
      followersCount: 145,
      followingCount: 30,
    );

    _users['bakugan'] = User(
      username: 'bakugan',
      fullName: 'Batuhan Güven',
      companyId: 'corehub',
      companyName: 'CoreHub Kuluçka Merkezi',
      role: UserRole.employee,
      title: 'Girişimci & Fullstack Developer',
      avatarUrl: 'assets/avatar_batuhan.jpg',
      bio: 'CoreHub kuluçka programında Fintech ve mikro-SaaS projelerimizi hayata geçiriyoruz.',
      password: '31316969',
      postsCount: 3,
      followersCount: 120,
      followingCount: 22,
    );

    // 3. Bekleyen Başvuru
    _applications.add(
      AccountApplication(
        id: 'app_demo_01',
        companyId: 'neurologic',
        companyName: 'Neurologic AI',
        fullName: 'Caner Demir',
        title: 'Veri Mühendisi / NLP Stajyeri',
        requestedUsername: 'canerdemir',
        requestedPassword: '31316969',
        note: 'Neurologic AI Ar-Ge ekibinde yeni başlayan stajyer araştırmacıyım. Marmara Teknokent ağına katılımımı onaylar mısınız?',
        avatarPath: 'assets/avatar_erdem.jpg',
        status: ApplicationStatus.pending,
        createdAt: DateTime.now().subtract(const Duration(hours: 2)),
      ),
    );

    // 4. Gönderiler
    _posts.addAll([
      Post(
        id: 'post_01',
        authorUsername: 'marmarateknokent',
        authorName: 'Marmara Teknokent Çatı Yönetimi',
        authorAvatar: 'assets/logo.jpg',
        authorCompany: 'Marmara Teknokent TGB',
        isCompanyPost: true,
        content: '📢 2026 Yılı 3. Çeyrek TÜBİTAK TEYDEB ve KOSGEB Ar-Ge Destek Çağrıları açılmıştır! Marmara Teknokent bünyesindeki tüm şirket ve kuluçka ekiplerimiz Proje Destek Ofisimizden birebir mentörlük alabilirler.',
        tags: ['MarmaraTeknokent', 'ArGeDesteği', 'TÜBİTAK', 'KOSGEB'],
        imagePath: 'assets/post_office.jpg',
        createdAt: DateTime.now().subtract(const Duration(hours: 1)),
        likes: ['neurologic', 'cloudscale', 'erdemcarkit'],
        repostsCount: 14,
        comments: [
          PostComment(
            id: 'c_01',
            authorUsername: 'neurologic',
            authorName: 'Neurologic AI',
            authorAvatar: 'assets/avatar_erdem.jpg',
            content: 'Bilgilendirme için teşekkürler, tıbbi görüntüleme projemizle başvuracağız.',
            createdAt: DateTime.now().subtract(const Duration(minutes: 40)),
          ),
        ],
      ),
      Post(
        id: 'post_02',
        authorUsername: 'erdemcarkit',
        authorName: 'Erdem Çarkıt',
        authorAvatar: 'assets/avatar_erdem.jpg',
        authorCompany: 'Neurologic AI',
        isCompanyPost: false,
        content: 'Neurologic AI ekibi olarak geliştirdiğimiz Edge-AI medikal görüntü analiz modelimizin ilk klinik doğrulama testleri başarıyla sonuçlandı! 🎯 120ms altında sıfır kayıplı inferans aldık.',
        tags: ['EdgeAI', 'YapayZeka', 'NeurologicAI', 'SağlıkTeknolojileri'],
        imagePath: 'assets/post_team.jpg',
        createdAt: DateTime.now().subtract(const Duration(hours: 3)),
        likes: ['marmarateknokent', 'aliniyya', 'bakugan'],
        repostsCount: 9,
      ),
      Post(
        id: 'post_03',
        authorUsername: 'aliniyya',
        authorName: 'Ali Nihat',
        authorAvatar: 'assets/avatar_ali.jpg',
        authorCompany: 'CloudScale DevOps',
        isCompanyPost: false,
        content: 'Teknokent B Blok veri merkezimizdeki bare-metal Kubernetes kümemizi 100Gbit omurga altyapısına yükselttik. Yüksek throughput gerektiren Ar-Ge projeleri için test ortamı açabiliriz 🚀',
        tags: ['Kubernetes', 'DevOps', 'CloudScale', 'Altyapı'],
        createdAt: DateTime.now().subtract(const Duration(hours: 5)),
        likes: ['erdemcarkit', 'neurologic'],
        repostsCount: 4,
      ),
    ]);

    // 5. Mesajlar
    _messages.addAll([
      ChatMessage(
        id: 'm_01',
        senderUsername: 'aliniyya',
        senderName: 'Ali Nihat',
        senderAvatar: 'assets/avatar_ali.jpg',
        recipientUsername: 'erdemcarkit',
        text: 'Selam Erdem! Edge-AI modelinin Docker imajını hazırladın mı? Bizim test clusterına deploy edelim.',
        createdAt: DateTime.now().subtract(const Duration(minutes: 25)),
      ),
      ChatMessage(
        id: 'm_02',
        senderUsername: 'erdemcarkit',
        senderName: 'Erdem Çarkıt',
        senderAvatar: 'assets/avatar_erdem.jpg',
        recipientUsername: 'aliniyya',
        text: 'Selam Ali! Evet CUDA 12 destekli imaj hazır, sana repo yetkisini verdim.',
        createdAt: DateTime.now().subtract(const Duration(minutes: 18)),
      ),
    ]);
  }

  // --- Auth & Account Operations ---

  String? login(String username, String password) {
    final cleanUsername = username.trim().toLowerCase().replaceAll('@', '');
    final user = _users[cleanUsername];

    if (user == null) {
      return 'Kullanıcı bulunamadı. Marmara Teknokent sisteminde hesaplar yalnızca bağlı olduğunuz firma tarafından verilir.';
    }

    if (user.password != password.trim()) {
      return 'Hatalı şifre girdiniz! Lütfen kontrol edin.';
    }

    _currentUser = user;
    notifyListeners();
    return null; // Başarılı
  }

  void logout() {
    _currentUser = null;
    notifyListeners();
  }

  // --- Personel Başvuru ve Firma Onayı ---

  AccountApplication submitAccountApplication({
    required String companyId,
    required String fullName,
    required String title,
    required String requestedUsername,
    required String requestedPassword,
    required String note,
    required String avatarPath,
  }) {
    final company = _companies.firstWhere(
      (c) => c.id == companyId,
      orElse: () => Company(
        id: companyId,
        name: 'Marmara Teknokent Firması',
        category: 'Ar-Ge',
        block: 'A Blok',
        teamSize: '1-5',
        description: '',
        emoji: '🏢',
      ),
    );

    final cleanUsername = requestedUsername.trim().toLowerCase().replaceAll('@', '');

    final application = AccountApplication(
      id: 'app_${DateTime.now().millisecondsSinceEpoch}',
      companyId: company.id,
      companyName: company.name,
      fullName: fullName.trim(),
      title: title.trim(),
      requestedUsername: cleanUsername,
      requestedPassword: requestedPassword.trim(),
      note: note.trim(),
      avatarPath: avatarPath,
      status: ApplicationStatus.pending,
      createdAt: DateTime.now(),
    );

    _applications.insert(0, application);
    _lastSubmittedApplication = application;
    notifyListeners();
    return application;
  }

  bool approveApplication(String appId) {
    final index = _applications.indexWhere((a) => a.id == appId);
    if (index == -1) return false;

    final app = _applications[index];
    app.status = ApplicationStatus.approved;
    app.processedAt = DateTime.now();

    // Yeni kullanıcıyı sisteme kaydet
    _users[app.requestedUsername] = User(
      username: app.requestedUsername,
      fullName: app.fullName,
      companyId: app.companyId,
      companyName: app.companyName,
      role: UserRole.employee,
      title: app.title,
      avatarUrl: app.avatarPath,
      bio: '${app.companyName} bünyesinde ${app.title}.',
      password: app.requestedPassword,
      isVerified: true,
      postsCount: 0,
      followersCount: 10,
      followingCount: 5,
    );

    // Firmanın personel sayısını artır
    final compIndex = _companies.indexWhere((c) => c.id == app.companyId);
    if (compIndex != -1) {
      _companies[compIndex].employeeCount += 1;
    }

    notifyListeners();
    return true;
  }

  bool rejectApplication(String appId) {
    final index = _applications.indexWhere((a) => a.id == appId);
    if (index == -1) return false;

    _applications[index].status = ApplicationStatus.rejected;
    _applications[index].processedAt = DateTime.now();
    notifyListeners();
    return true;
  }

  bool createPersonnelDirectly({
    required String fullName,
    required String title,
    required String username,
    required String password,
    required String companyId,
    required String avatarPath,
  }) {
    final cleanUsername = username.trim().toLowerCase().replaceAll('@', '');
    if (_users.containsKey(cleanUsername)) {
      return false; // Zaten mevcut
    }

    final company = _companies.firstWhere((c) => c.id == companyId);

    _users[cleanUsername] = User(
      username: cleanUsername,
      fullName: fullName.trim(),
      companyId: company.id,
      companyName: company.name,
      role: UserRole.employee,
      title: title.trim(),
      avatarUrl: avatarPath,
      bio: '${company.name} personeli.',
      password: password.trim(),
      isVerified: true,
    );

    company.employeeCount += 1;
    notifyListeners();
    return true;
  }

  List<AccountApplication> getPendingApplicationsForUser(User user) {
    if (user.isSuperAdmin) {
      return _applications.where((a) => a.isPending).toList();
    }
    if (user.isCompanyAdmin) {
      return _applications
          .where((a) => a.isPending && a.companyId == user.companyId)
          .toList();
    }
    return [];
  }

  List<User> getStaffForCompany(String companyId) {
    return _users.values
        .where((u) => u.companyId == companyId && u.isEmployee)
        .toList();
  }

  // --- Feed & Posts ---

  void createPost({
    required String content,
    required bool isCompanyPost,
    List<String> tags = const [],
    String? imagePath,
  }) {
    if (_currentUser == null) return;

    final newPost = Post(
      id: 'post_${DateTime.now().millisecondsSinceEpoch}',
      authorUsername: _currentUser!.username,
      authorName: isCompanyPost ? _currentUser!.companyName : _currentUser!.fullName,
      authorAvatar: isCompanyPost ? 'assets/logo.jpg' : _currentUser!.avatarUrl,
      authorCompany: _currentUser!.companyName,
      isCompanyPost: isCompanyPost,
      content: content,
      tags: tags.isNotEmpty ? tags : ['MarmaraTeknokent'],
      imagePath: imagePath,
      createdAt: DateTime.now(),
    );

    _posts.insert(0, newPost);
    _currentUser!.postsCount += 1;
    notifyListeners();
  }

  void toggleLike(String postId) {
    if (_currentUser == null) return;
    final post = _posts.firstWhere((p) => p.id == postId);
    if (post.likes.contains(_currentUser!.username)) {
      post.likes.remove(_currentUser!.username);
    } else {
      post.likes.add(_currentUser!.username);
    }
    notifyListeners();
  }

  void repost(String postId) {
    final post = _posts.firstWhere((p) => p.id == postId);
    post.repostsCount += 1;
    notifyListeners();
  }

  void addComment(String postId, String text) {
    if (_currentUser == null || text.trim().isEmpty) return;
    final post = _posts.firstWhere((p) => p.id == postId);
    post.comments.add(
      PostComment(
        id: 'c_${DateTime.now().millisecondsSinceEpoch}',
        authorUsername: _currentUser!.username,
        authorName: _currentUser!.fullName,
        authorAvatar: _currentUser!.avatarUrl,
        content: text.trim(),
        createdAt: DateTime.now(),
      ),
    );
    notifyListeners();
  }

  // --- Real-time Chat ---

  List<ChatMessage> getConversationWith(String otherUsername) {
    if (_currentUser == null) return [];
    return _messages
        .where((m) =>
            (m.senderUsername == _currentUser!.username && m.recipientUsername == otherUsername) ||
            (m.senderUsername == otherUsername && m.recipientUsername == _currentUser!.username))
        .toList();
  }

  void sendMessage(String recipientUsername, String text) {
    if (_currentUser == null || text.trim().isEmpty) return;

    final msg = ChatMessage(
      id: 'm_${DateTime.now().millisecondsSinceEpoch}',
      senderUsername: _currentUser!.username,
      senderName: _currentUser!.fullName,
      senderAvatar: _currentUser!.avatarUrl,
      recipientUsername: recipientUsername,
      text: text.trim(),
      createdAt: DateTime.now(),
    );

    _messages.add(msg);
    notifyListeners();
  }

  List<User> getAvailableContacts() {
    if (_currentUser == null) return [];
    return _users.values
        .where((u) => u.username != _currentUser!.username)
        .toList();
  }
}
