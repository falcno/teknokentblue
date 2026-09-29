import 'package:flutter/material.dart';
import '../../core/theme.dart';
import '../../core/constants.dart';
import '../../core/responsive.dart';
import '../../data/teknokent_repository.dart';
import '../../data/models/application_model.dart';
import '../../data/models/company_model.dart';

class LoginScreen extends StatefulWidget {
  final TeknokentRepository repository;

  const LoginScreen({super.key, required this.repository});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  // Login Form Controllers
  final TextEditingController _loginUsernameController = TextEditingController();
  final TextEditingController _loginPasswordController = TextEditingController();
  bool _obscureLoginPassword = true;
  String? _loginError;

  // Application Form Controllers
  String? _selectedCompanyId;
  final TextEditingController _appFullNameController = TextEditingController();
  final TextEditingController _appTitleController = TextEditingController();
  final TextEditingController _appUsernameController = TextEditingController();
  final TextEditingController _appPasswordController = TextEditingController();
  final TextEditingController _appNoteController = TextEditingController();
  bool _obscureAppPassword = true;
  String _selectedAvatar = 'assets/avatar_erdem.jpg';
  bool _applicationSubmitted = false;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    if (widget.repository.companies.isNotEmpty) {
      _selectedCompanyId = widget.repository.companies.first.id;
    }
  }

  @override
  void dispose() {
    _tabController.dispose();
    _loginUsernameController.dispose();
    _loginPasswordController.dispose();
    _appFullNameController.dispose();
    _appTitleController.dispose();
    _appUsernameController.dispose();
    _appPasswordController.dispose();
    _appNoteController.dispose();
    super.dispose();
  }

  void _fillCredentials(String username, String password) {
    _loginUsernameController.text = username;
    _loginPasswordController.text = password;
    setState(() {
      _loginError = null;
    });
  }

  void _handleLogin() {
    final username = _loginUsernameController.text.trim();
    final password = _loginPasswordController.text.trim();

    if (username.isEmpty || password.isEmpty) {
      setState(() {
        _loginError = 'Lütfen kullanıcı adı ve şifrenizi giriniz.';
      });
      return;
    }

    final error = widget.repository.login(username, password);
    if (error != null) {
      setState(() {
        _loginError = error;
      });
    }
  }

  void _handleApplicationSubmit() {
    if (_appFullNameController.text.isEmpty ||
        _appUsernameController.text.isEmpty ||
        _appPasswordController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Lütfen zorunlu alanları doldurunuz!')),
      );
      return;
    }

    widget.repository.submitAccountApplication(
      companyId: _selectedCompanyId ?? widget.repository.companies.first.id,
      fullName: _appFullNameController.text,
      title: _appTitleController.text.isEmpty ? 'Ar-Ge Personeli' : _appTitleController.text,
      requestedUsername: _appUsernameController.text,
      requestedPassword: _appPasswordController.text,
      note: _appNoteController.text,
      avatarPath: _selectedAvatar,
    );

    setState(() {
      _applicationSubmitted = true;
    });
  }

  @override
  Widget build(BuildContext context) {
    final isMobile = ResponsiveLayout.isMobile(context);

    return Scaffold(
      backgroundColor: TeknokentTheme.deepNavy,
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 24),
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 1040),
              child: isMobile ? _buildMobileLayout() : _buildDesktopLayout(),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildDesktopLayout() {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Sol Taraf: Marka & Hiyerarşi Tanıtımı
        Expanded(
          flex: 5,
          child: Padding(
            padding: const EdgeInsets.only(right: 40, top: 20),
            child: _buildBrandHero(),
          ),
        ),
        // Sağ Taraf: Giriş ve Başvuru Kartı
        Expanded(
          flex: 6,
          child: _buildAuthCard(),
        ),
      ],
    );
  }

  Widget _buildMobileLayout() {
    return Column(
      children: [
        _buildBrandHero(isCompact: true),
        const SizedBox(height: 24),
        _buildAuthCard(),
      ],
    );
  }

  Widget _buildBrandHero({bool isCompact = false}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Container(
              width: isCompact ? 50 : 64,
              height: isCompact ? 50 : 64,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: TeknokentTheme.primaryBlue.withOpacity(0.5)),
                image: const DecorationImage(
                  image: AssetImage(AppConstants.logoPath),
                  fit: BoxFit.cover,
                ),
              ),
            ),
            const SizedBox(width: 16),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                RichText(
                  text: const TextSpan(
                    style: TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.w800,
                      letterSpacing: -0.5,
                      color: TeknokentTheme.textLight,
                    ),
                    children: [
                      TextSpan(text: 'MARMARA '),
                      TextSpan(
                        text: 'TEKNOKENT',
                        style: TextStyle(color: TeknokentTheme.primaryBlue),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 2),
                const Text(
                  'Teknoloji Geliştirme Bölgesi Yönetimi',
                  style: TextStyle(
                    fontSize: 12.5,
                    color: TeknokentTheme.textMuted,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ],
            ),
          ],
        ),
        const SizedBox(height: 24),
        const Text(
          'Hiyerarşik Yetkili Teknokent İletişim Ağı',
          style: TextStyle(
            fontSize: 26,
            fontWeight: FontWeight.w800,
            color: TeknokentTheme.textLight,
            letterSpacing: -0.5,
            height: 1.25,
          ),
        ),
        const SizedBox(height: 12),
        const Text(
          'Marmara Teknokent çatı yönetiminde Ar-Ge şirketleri, startuplar ve kuluçka merkezlerinin yetkili onay mekanizmasıyla çalışan kapalı devre profesyonel platformu.',
          style: TextStyle(
            fontSize: 14.5,
            color: TeknokentTheme.textMuted,
            height: 1.5,
          ),
        ),
        const SizedBox(height: 24),

        // Hiyerarşik Seviye Kartları
        _buildHierarchyTierCard(
          icon: '🏛️',
          title: '1. Derece: Marmara Teknokent',
          subtitle: 'Tüm ekosistemde en üst düzey süper yetkili yönetim',
          borderColor: const Color(0xFFF43F5E),
        ),
        const SizedBox(height: 12),
        _buildHierarchyTierCard(
          icon: '🏢',
          title: '2. Derece: Firma & Kuluçka Yetkilileri',
          subtitle: 'Personel onaylama, yetkilendirme ve hesap açma yetkisi',
          borderColor: TeknokentTheme.primaryBlue,
        ),
        const SizedBox(height: 12),
        _buildHierarchyTierCard(
          icon: '👤',
          title: '3. Derece: Firma Onaylı Personel',
          subtitle: 'Yalnızca firma onayından sonra aktifleşen kullanıcılar',
          borderColor: TeknokentTheme.successGreen,
        ),
      ],
    );
  }

  Widget _buildHierarchyTierCard({
    required String icon,
    required String title,
    required String subtitle,
    required Color borderColor,
  }) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: TeknokentTheme.darkSurface,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: borderColor.withOpacity(0.35)),
      ),
      child: Row(
        children: [
          Text(icon, style: const TextStyle(fontSize: 22)),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(
                    fontWeight: FontWeight.w700,
                    fontSize: 13,
                    color: TeknokentTheme.textLight,
                  ),
                ),
                Text(
                  subtitle,
                  style: const TextStyle(
                    fontSize: 11.5,
                    color: TeknokentTheme.textMuted,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAuthCard() {
    return Container(
      decoration: BoxDecoration(
        color: TeknokentTheme.darkSurface,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: TeknokentTheme.borderSubtle),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.3),
            blurRadius: 30,
            offset: const Offset(0, 10),
          ),
        ],
      ),
      child: Column(
        children: [
          // Tab Bar
          Container(
            decoration: const BoxDecoration(
              border: Border(bottom: BorderSide(color: TeknokentTheme.borderSubtle)),
            ),
            child: TabBar(
              controller: _tabController,
              indicatorColor: TeknokentTheme.primaryBlue,
              indicatorWeight: 3,
              labelColor: TeknokentTheme.primaryBlue,
              unselectedLabelColor: TeknokentTheme.textMuted,
              labelStyle: const TextStyle(fontWeight: FontWeight.w700, fontSize: 14),
              tabs: const [
                Tab(text: '🔑 Giriş Yap'),
                Tab(text: '📝 Personel Başvurusu'),
              ],
            ),
          ),

          // Tab Views
          Padding(
            padding: const EdgeInsets.all(24),
            child: AnimatedBuilder(
              animation: _tabController,
              builder: (context, _) {
                return _tabController.index == 0
                    ? _buildLoginTab()
                    : _buildApplicationTab();
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildLoginTab() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (_loginError != null) ...[
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: TeknokentTheme.dangerRed.withOpacity(0.15),
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: TeknokentTheme.dangerRed.withOpacity(0.4)),
            ),
            child: Row(
              children: [
                const Icon(Icons.error_outline, color: TeknokentTheme.dangerRed, size: 20),
                const SizedBox(width: 10),
                Expanded(
                  child: Text(
                    _loginError!,
                    style: const TextStyle(color: TeknokentTheme.dangerRed, fontSize: 13),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),
        ],

        const Text(
          'Kullanıcı Adı veya Kurumsal ID',
          style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: TeknokentTheme.textLight),
        ),
        const SizedBox(height: 6),
        TextField(
          controller: _loginUsernameController,
          decoration: const InputDecoration(
            hintText: 'örn: marmarateknokent veya erdemcarkit',
            prefixIcon: Icon(Icons.person_outline, size: 20, color: TeknokentTheme.textMuted),
          ),
        ),
        const SizedBox(height: 16),

        const Text(
          'Şifre',
          style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: TeknokentTheme.textLight),
        ),
        const SizedBox(height: 6),
        TextField(
          controller: _loginPasswordController,
          obscureText: _obscureLoginPassword,
          decoration: InputDecoration(
            hintText: '••••••••',
            prefixIcon: const Icon(Icons.lock_outline, size: 20, color: TeknokentTheme.textMuted),
            suffixIcon: IconButton(
              icon: Icon(
                _obscureLoginPassword ? Icons.visibility_off : Icons.visibility,
                size: 20,
                color: TeknokentTheme.textMuted,
              ),
              onPressed: () {
                setState(() {
                  _obscureLoginPassword = !_obscureLoginPassword;
                });
              },
            ),
          ),
        ),
        const SizedBox(height: 20),

        SizedBox(
          width: double.infinity,
          height: 48,
          child: ElevatedButton(
            onPressed: _handleLogin,
            child: const Text('Giriş Yap'),
          ),
        ),
        const SizedBox(height: 24),

        // Hiyerarşik Hızlı Test Butonları
        const Text(
          'Hızlı Test Hesapları (Şifre: 31316969)',
          style: TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.w700,
            color: TeknokentTheme.textMuted,
            letterSpacing: 0.5,
          ),
        ),
        const SizedBox(height: 10),

        // 1. Derece
        _buildQuickTestSection(
          title: '🏛️ 1. DERECE: Marmara Teknokent (Süper Yetkili)',
          accounts: [
            {'username': 'marmarateknokent', 'label': '@marmarateknokent (Genel Müdürlük)'},
          ],
        ),
        const SizedBox(height: 10),

        // 2. Derece
        _buildQuickTestSection(
          title: '🏢 2. DERECE: Firma & Kuluçka Yetkilileri (Hesap Açma Yetkili)',
          accounts: [
            {'username': 'neurologic', 'label': '@neurologic (Neurologic AI)'},
            {'username': 'cloudscale', 'label': '@cloudscale (CloudScale)'},
            {'username': 'corehub', 'label': '@corehub (CoreHub)'},
          ],
        ),
        const SizedBox(height: 10),

        // 3. Derece
        _buildQuickTestSection(
          title: '👤 3. DERECE: Firma Onaylı Personeller',
          accounts: [
            {'username': 'erdemcarkit', 'label': '@erdemcarkit (Erdem)'},
            {'username': 'aliniyya', 'label': '@aliniyya (Ali Nihat)'},
            {'username': 'bakugan', 'label': '@bakugan (Batuhan)'},
          ],
        ),
      ],
    );
  }

  Widget _buildQuickTestSection({
    required String title,
    required List<Map<String, String>> accounts,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: TeknokentTheme.cyanAccent),
        ),
        const SizedBox(height: 6),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: accounts.map((acc) {
            return InkWell(
              onTap: () => _fillCredentials(acc['username']!, AppConstants.defaultPassword),
              borderRadius: BorderRadius.circular(8),
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                decoration: BoxDecoration(
                  color: const Color(0xFF0F172A),
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: TeknokentTheme.borderSubtle),
                ),
                child: Text(
                  acc['label']!,
                  style: const TextStyle(fontSize: 11.5, color: TeknokentTheme.textLight),
                ),
              ),
            );
          }).toList(),
        ),
      ],
    );
  }

  Widget _buildApplicationTab() {
    final lastApp = widget.repository.lastSubmittedApplication;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Bilgilendirme Kutusu
        Container(
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: TeknokentTheme.primaryBlue.withOpacity(0.12),
            borderRadius: BorderRadius.circular(10),
            border: Border.all(color: TeknokentTheme.primaryBlue.withOpacity(0.3)),
          ),
          child: const Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Icon(Icons.shield_outlined, color: TeknokentTheme.primaryBlue, size: 20),
              const SizedBox(width: 10),
              Expanded(
                child: Text(
                  'Marmara Teknokent hiyerarşik düzeni gereği kullanıcı hesabı açma yetkisi yalnızca firmalara aittir. Başvurunuz ilgili firmanın onay sistemine iletilecektir.',
                  style: TextStyle(fontSize: 12.5, color: TeknokentTheme.textLight, height: 1.4),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 18),

        // Firma Seçimi Dropdown
        const Text(
          'Bağlı Olduğunuz / Başvurulacak Firma',
          style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: TeknokentTheme.textLight),
        ),
        const SizedBox(height: 6),
        DropdownButtonFormField<String>(
          value: _selectedCompanyId,
          decoration: const InputDecoration(
            prefixIcon: Icon(Icons.business_outlined, size: 20, color: TeknokentTheme.textMuted),
          ),
          items: widget.repository.companies.map((Company comp) {
            return DropdownMenuItem<String>(
              value: comp.id,
              child: Text('${comp.emoji} ${comp.name} (${comp.category})'),
            );
          }).toList(),
          onChanged: (val) {
            setState(() {
              _selectedCompanyId = val;
            });
          },
        ),
        const SizedBox(height: 16),

        // Ad Soyad
        const Text(
          'Ad Soyad',
          style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: TeknokentTheme.textLight),
        ),
        const SizedBox(height: 6),
        TextField(
          controller: _appFullNameController,
          decoration: const InputDecoration(
            hintText: 'örn: Caner Demir',
            prefixIcon: Icon(Icons.badge_outlined, size: 20, color: TeknokentTheme.textMuted),
          ),
        ),
        const SizedBox(height: 16),

        // Görev / Unvan
        const Text(
          'Görev / Pozisyon',
          style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: TeknokentTheme.textLight),
        ),
        const SizedBox(height: 6),
        TextField(
          controller: _appTitleController,
          decoration: const InputDecoration(
            hintText: 'örn: Kıdemli NLP Araştırmacısı / Stajyer',
            prefixIcon: Icon(Icons.work_outline, size: 20, color: TeknokentTheme.textMuted),
          ),
        ),
        const SizedBox(height: 16),

        // Talep Edilen Kullanıcı Adı
        const Text(
          'Talep Edilen Kullanıcı Adı',
          style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: TeknokentTheme.textLight),
        ),
        const SizedBox(height: 6),
        TextField(
          controller: _appUsernameController,
          decoration: const InputDecoration(
            hintText: 'örn: canerdemir',
            prefixIcon: Icon(Icons.alternate_email, size: 20, color: TeknokentTheme.textMuted),
          ),
        ),
        const SizedBox(height: 16),

        // Talep Edilen Şifre
        const Text(
          'Şifre',
          style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: TeknokentTheme.textLight),
        ),
        const SizedBox(height: 6),
        TextField(
          controller: _appPasswordController,
          obscureText: _obscureAppPassword,
          decoration: InputDecoration(
            hintText: 'Minimum 6 karakter',
            prefixIcon: const Icon(Icons.lock_outline, size: 20, color: TeknokentTheme.textMuted),
            suffixIcon: IconButton(
              icon: Icon(
                _obscureAppPassword ? Icons.visibility_off : Icons.visibility,
                size: 20,
                color: TeknokentTheme.textMuted,
              ),
              onPressed: () {
                setState(() {
                  _obscureAppPassword = !_obscureAppPassword;
                });
              },
            ),
          ),
        ),
        const SizedBox(height: 16),

        // Başvuru Notu
        const Text(
          'Firmaya Not / Başvuru Açıklaması',
          style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: TeknokentTheme.textLight),
        ),
        const SizedBox(height: 6),
        TextField(
          controller: _appNoteController,
          maxLines: 2,
          decoration: const InputDecoration(
            hintText: 'Firma yöneticisine iletilecek kısa not...',
          ),
        ),
        const SizedBox(height: 20),

        // Gönder Butonu
        SizedBox(
          width: double.infinity,
          height: 48,
          child: ElevatedButton(
            onPressed: _handleApplicationSubmit,
            style: ElevatedButton.styleFrom(backgroundColor: TeknokentTheme.successGreen),
            child: const Text('Başvuruyu İlgili Firmaya Gönder'),
          ),
        ),

        // Başvuru Durum Kartı (Varsa)
        if (_applicationSubmitted && lastApp != null) ...[
          const SizedBox(height: 20),
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: lastApp.isApproved
                  ? TeknokentTheme.successGreen.withOpacity(0.15)
                  : TeknokentTheme.warningOrange.withOpacity(0.15),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(
                color: lastApp.isApproved
                    ? TeknokentTheme.successGreen
                    : TeknokentTheme.warningOrange,
              ),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Icon(
                      lastApp.isApproved ? Icons.check_circle : Icons.hourglass_top,
                      color: lastApp.isApproved
                          ? TeknokentTheme.successGreen
                          : TeknokentTheme.warningOrange,
                      size: 20,
                    ),
                    const SizedBox(width: 8),
                    Text(
                      lastApp.isApproved ? 'Başvurunuz Onaylandı!' : 'Firma Onayı Bekleniyor...',
                      style: TextStyle(
                        fontWeight: FontWeight.w700,
                        fontSize: 14,
                        color: lastApp.isApproved
                            ? TeknokentTheme.successGreen
                            : TeknokentTheme.warningOrange,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Text(
                  lastApp.isApproved
                      ? 'Hesabınız ${lastApp.companyName} tarafından onaylandı. Aşağıdaki butondan hemen giriş yapabilirsiniz.'
                      : 'Başvurunuz ${lastApp.companyName} yönetimine iletildi. Firma yetkilisi sisteme girip onayladığı anda hesabınız aktif olacaktır.',
                  style: const TextStyle(fontSize: 12.5, color: TeknokentTheme.textLight),
                ),
                if (lastApp.isApproved) ...[
                  const SizedBox(height: 12),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: () {
                        _fillCredentials(lastApp.requestedUsername, lastApp.requestedPassword);
                        _tabController.animateTo(0);
                      },
                      child: const Text('Hemen Giriş Yap'),
                    ),
                  ),
                ],
              ],
            ),
          ),
        ],
      ],
    );
  }
}
