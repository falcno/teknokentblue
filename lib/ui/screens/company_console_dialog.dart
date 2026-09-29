import 'package:flutter/material.dart';
import '../../core/theme.dart';
import '../../data/teknokent_repository.dart';
import '../../data/models/user_model.dart';
import '../../data/models/application_model.dart';
import '../widgets/avatar_widget.dart';

class CompanyConsoleDialog extends StatefulWidget {
  final TeknokentRepository repository;

  const CompanyConsoleDialog({super.key, required this.repository});

  @override
  State<CompanyConsoleDialog> createState() => _CompanyConsoleDialogState();
}

class _CompanyConsoleDialogState extends State<CompanyConsoleDialog>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  // Yeni personel ekleme controller'ları
  final TextEditingController _fullNameController = TextEditingController();
  final TextEditingController _titleController = TextEditingController();
  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    _fullNameController.dispose();
    _titleController.dispose();
    _usernameController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  void _handleCreatePersonnel() {
    final user = widget.repository.currentUser;
    if (user == null) return;

    if (_fullNameController.text.isEmpty ||
        _usernameController.text.isEmpty ||
        _passwordController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Lütfen tüm zorunlu alanları doldurun!')),
      );
      return;
    }

    final success = widget.repository.createPersonnelDirectly(
      fullName: _fullNameController.text,
      title: _titleController.text.isEmpty ? 'Ar-Ge Personeli' : _titleController.text,
      username: _usernameController.text,
      password: _passwordController.text,
      companyId: user.companyId,
      avatarPath: 'assets/avatar_erdem.jpg',
    );

    if (success) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Personel başarıyla tanımlandı ve hesabı açıldı!')),
      );
      _fullNameController.clear();
      _titleController.clear();
      _usernameController.clear();
      _passwordController.clear();
      _tabController.animateTo(2); // Kadro sekmesine geç
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Bu kullanıcı adı zaten kullanımda!')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final user = widget.repository.currentUser!;
    final pendingApps = widget.repository.getPendingApplicationsForUser(user);
    final staff = widget.repository.getStaffForCompany(user.companyId);

    return Dialog(
      insetPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 24),
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 800, maxHeight: 680),
        child: Column(
          children: [
            // Header
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
              decoration: const BoxDecoration(
                color: Color(0xFF0F172A),
                borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
                border: Border(bottom: BorderSide(color: TeknokentTheme.borderSubtle)),
              ),
              child: Row(
                children: [
                  const Icon(Icons.business, color: TeknokentTheme.primaryBlue, size: 24),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          user.isSuperAdmin
                              ? '🏛️ Marmara Teknokent Süper Yönetim Konsolu'
                              : '🏢 ${user.companyName} - Yönetim Konsolu',
                          style: const TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w700,
                            color: TeknokentTheme.textLight,
                          ),
                        ),
                        Text(
                          user.isSuperAdmin
                              ? 'Tüm teknokent şirketleri ve başvuru onay merkezi'
                              : 'Personel onaylama, hesap açma ve kadro yönetimi',
                          style: const TextStyle(
                            fontSize: 12,
                            color: TeknokentTheme.textMuted,
                          ),
                        ),
                      ],
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.close, color: TeknokentTheme.textMuted),
                    onPressed: () => Navigator.of(context).pop(),
                  ),
                ],
              ),
            ),

            // Tab Bar
            TabBar(
              controller: _tabController,
              indicatorColor: TeknokentTheme.primaryBlue,
              labelColor: TeknokentTheme.primaryBlue,
              unselectedLabelColor: TeknokentTheme.textMuted,
              tabs: [
                Tab(
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Text('Gelen Başvurular'),
                      if (pendingApps.isNotEmpty) ...[
                        const SizedBox(width: 6),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                          decoration: BoxDecoration(
                            color: TeknokentTheme.dangerRed,
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: Text(
                            pendingApps.length.toString(),
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 11,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                        ),
                      ],
                    ],
                  ),
                ),
                const Tab(text: 'Yeni Personel Tanımla'),
                Tab(text: 'Firma Kadrosu (${staff.length})'),
              ],
            ),

            // Tab Views
            Expanded(
              child: TabBarView(
                controller: _tabController,
                children: [
                  // Tab 1: Gelen Başvurular
                  _buildApplicationsList(pendingApps),

                  // Tab 2: Yeni Personel Tanımla
                  _buildCreatePersonnelTab(),

                  // Tab 3: Firma Kadrosu
                  _buildStaffList(staff),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildApplicationsList(List<AccountApplication> pendingApps) {
    if (pendingApps.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: const [
            Icon(Icons.mark_email_read_outlined, size: 48, color: TeknokentTheme.textMuted),
            SizedBox(height: 12),
            Text(
              'Bekleyen hesap başvurusu bulunmuyor.',
              style: TextStyle(color: TeknokentTheme.textMuted, fontSize: 14),
            ),
          ],
        ),
      );
    }

    return ListView.separated(
      padding: const EdgeInsets.all(16),
      itemCount: pendingApps.length,
      separatorBuilder: (_, __) => const SizedBox(height: 12),
      itemBuilder: (context, index) {
        final app = pendingApps[index];
        return Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: const Color(0xFF0F172A),
            borderRadius: BorderRadius.circular(14),
            border: Border.all(color: TeknokentTheme.borderSubtle),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  AvatarWidget(imagePath: app.avatarPath, radius: 22),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          app.fullName,
                          style: const TextStyle(
                            fontWeight: FontWeight.w700,
                            fontSize: 15,
                            color: TeknokentTheme.textLight,
                          ),
                        ),
                        Text(
                          '${app.title} • @${app.requestedUsername}',
                          style: const TextStyle(
                            fontSize: 12.5,
                            color: TeknokentTheme.primaryBlue,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: TeknokentTheme.warningOrange.withOpacity(0.15),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: const Text(
                      'Onay Bekliyor',
                      style: TextStyle(
                        fontSize: 11,
                        color: TeknokentTheme.warningOrange,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ],
              ),
              if (app.note.isNotEmpty) ...[
                const SizedBox(height: 12),
                Container(
                  padding: const EdgeInsets.all(10),
                  width: double.infinity,
                  decoration: BoxDecoration(
                    color: TeknokentTheme.darkSurface,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    '"${app.note}"',
                    style: const TextStyle(
                      fontSize: 12.5,
                      fontStyle: FontStyle.italic,
                      color: TeknokentTheme.textMuted,
                    ),
                  ),
                ),
              ],
              const SizedBox(height: 14),
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  OutlinedButton.icon(
                    onPressed: () {
                      widget.repository.rejectApplication(app.id);
                      setState(() {});
                    },
                    icon: const Icon(Icons.close, size: 16, color: TeknokentTheme.dangerRed),
                    label: const Text('Reddet', style: TextStyle(color: TeknokentTheme.dangerRed)),
                  ),
                  const SizedBox(width: 10),
                  ElevatedButton.icon(
                    onPressed: () {
                      widget.repository.approveApplication(app.id);
                      setState(() {});
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text('${app.fullName} için hesap açıldı ve yetkilendirildi!'),
                          backgroundColor: TeknokentTheme.successGreen,
                        ),
                      );
                    },
                    icon: const Icon(Icons.check, size: 16),
                    label: const Text('✓ Onayla & Hesabı Aç'),
                    style: ElevatedButton.styleFrom(backgroundColor: TeknokentTheme.successGreen),
                  ),
                ],
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildCreatePersonnelTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Firma Çalışanına Doğrudan Hesap Tanımla',
            style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: TeknokentTheme.textLight),
          ),
          const SizedBox(height: 4),
          const Text(
            'Başvuru beklemeden firmanız bünyesindeki bir araştırmacıya kullanıcı adı ve şifre tanımlayabilirsiniz.',
            style: TextStyle(fontSize: 12.5, color: TeknokentTheme.textMuted),
          ),
          const SizedBox(height: 20),

          TextField(
            controller: _fullNameController,
            decoration: const InputDecoration(
              labelText: 'Personel Adı Soyadı',
              prefixIcon: Icon(Icons.person_outline),
            ),
          ),
          const SizedBox(height: 14),

          TextField(
            controller: _titleController,
            decoration: const InputDecoration(
              labelText: 'Pozisyon / Unvan (örn: Backend Geliştirici)',
              prefixIcon: Icon(Icons.work_outline),
            ),
          ),
          const SizedBox(height: 14),

          TextField(
            controller: _usernameController,
            decoration: const InputDecoration(
              labelText: 'Kullanıcı Adı (örn: mehmetkaya)',
              prefixIcon: Icon(Icons.alternate_email),
            ),
          ),
          const SizedBox(height: 14),

          TextField(
            controller: _passwordController,
            decoration: const InputDecoration(
              labelText: 'Şifre',
              prefixIcon: Icon(Icons.lock_outline),
            ),
          ),
          const SizedBox(height: 20),

          SizedBox(
            width: double.infinity,
            height: 46,
            child: ElevatedButton(
              onPressed: _handleCreatePersonnel,
              child: const Text('Personeli Kaydet & Hesabı Aktif Et'),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStaffList(List<User> staff) {
    if (staff.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: const [
            Icon(Icons.group_off_outlined, size: 48, color: TeknokentTheme.textMuted),
            SizedBox(height: 12),
            Text(
              'Henüz kayıtlı personel bulunmuyor.',
              style: TextStyle(color: TeknokentTheme.textMuted, fontSize: 14),
            ),
          ],
        ),
      );
    }

    return ListView.separated(
      padding: const EdgeInsets.all(16),
      itemCount: staff.length,
      separatorBuilder: (_, __) => const SizedBox(height: 10),
      itemBuilder: (context, index) {
        final emp = staff[index];
        return ListTile(
          tileColor: const Color(0xFF0F172A),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
            side: const BorderSide(color: TeknokentTheme.borderSubtle),
          ),
          leading: AvatarWidget(imagePath: emp.avatarUrl, radius: 20),
          title: Text(
            emp.fullName,
            style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 14),
          ),
          subtitle: Text(
            '${emp.title} • @${emp.username}',
            style: const TextStyle(color: TeknokentTheme.textMuted, fontSize: 12),
          ),
          trailing: Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            decoration: BoxDecoration(
              color: TeknokentTheme.successGreen.withOpacity(0.15),
              borderRadius: BorderRadius.circular(8),
            ),
            child: const Text(
              'Aktif Personel',
              style: TextStyle(
                color: TeknokentTheme.successGreen,
                fontSize: 11,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        );
      },
    );
  }
}
