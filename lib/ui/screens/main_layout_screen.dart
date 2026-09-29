import 'package:flutter/material.dart';
import '../../core/theme.dart';
import '../../core/constants.dart';
import '../../core/responsive.dart';
import '../../data/teknokent_repository.dart';
import 'feed_screen.dart';
import 'companies_screen.dart';
import 'chat_screen.dart';
import 'notifications_screen.dart';
import 'profile_screen.dart';
import 'company_console_dialog.dart';
import '../widgets/avatar_widget.dart';
import '../widgets/role_badge_widget.dart';

class MainLayoutScreen extends StatefulWidget {
  final TeknokentRepository repository;

  const MainLayoutScreen({super.key, required this.repository});

  @override
  State<MainLayoutScreen> createState() => _MainLayoutScreenState();
}

class _MainLayoutScreenState extends State<MainLayoutScreen> {
  int _currentIndex = 0;

  void _openCompanyConsole() {
    showDialog(
      context: context,
      builder: (context) => CompanyConsoleDialog(repository: widget.repository),
    );
  }

  @override
  Widget build(BuildContext context) {
    final user = widget.repository.currentUser!;
    final isDesktop = ResponsiveLayout.isDesktop(context);
    final pendingApps = widget.repository.getPendingApplicationsForUser(user);

    final screens = [
      FeedScreen(repository: widget.repository),
      CompaniesScreen(repository: widget.repository),
      ChatScreen(repository: widget.repository),
      NotificationsScreen(repository: widget.repository),
      ProfileScreen(repository: widget.repository),
    ];

    return Scaffold(
      appBar: AppBar(
        titleSpacing: 16,
        title: Row(
          children: [
            Container(
              width: 34,
              height: 34,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(8),
                image: const DecorationImage(
                  image: AssetImage(AppConstants.logoPath),
                  fit: BoxFit.cover,
                ),
              ),
            ),
            const SizedBox(width: 10),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                RichText(
                  text: const TextSpan(
                    style: TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.w800,
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
                Text(
                  user.companyName,
                  style: const TextStyle(
                    fontSize: 10.5,
                    color: TeknokentTheme.textMuted,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ],
            ),
          ],
        ),
        actions: [
          // Firma / Marmara Teknokent Yönetim Konsolu Butonu
          if (user.isCompanyAdmin || user.isSuperAdmin) ...[
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 4),
              child: ElevatedButton.icon(
                onPressed: _openCompanyConsole,
                icon: const Icon(Icons.admin_panel_settings, size: 16),
                label: Row(
                  children: [
                    Text(user.isSuperAdmin ? 'Süper Yönetim' : 'Firma Yönetimi'),
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
                            fontSize: 10.5,
                            fontWeight: FontWeight.w800,
                          ),
                        ),
                      ),
                    ],
                  ],
                ),
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF1E293B),
                  foregroundColor: TeknokentTheme.cyanAccent,
                  padding: const EdgeInsets.symmetric(horizontal: 12),
                  side: const BorderSide(color: TeknokentTheme.borderSubtle),
                  elevation: 0,
                ),
              ),
            ),
          ],

          // Kullanıcı Avatarı & Hızlı Profil Menüsü
          Padding(
            padding: const EdgeInsets.only(right: 12, left: 6),
            child: InkWell(
              onTap: () {
                setState(() {
                  _currentIndex = 4; // Profil sekmesine git
                });
              },
              borderRadius: BorderRadius.circular(20),
              child: Padding(
                padding: const EdgeInsets.all(4),
                child: AvatarWidget(imagePath: user.avatarUrl, radius: 16),
              ),
            ),
          ),
        ],
      ),

      // Gövde (Desktop için NavigationRail, Mobile için BottomNav)
      body: isDesktop
          ? Row(
              children: [
                NavigationRail(
                  selectedIndex: _currentIndex,
                  onDestinationSelected: (index) {
                    setState(() {
                      _currentIndex = index;
                    });
                  },
                  backgroundColor: TeknokentTheme.darkSurface,
                  selectedIconTheme: const IconThemeData(color: TeknokentTheme.primaryBlue),
                  selectedLabelTextStyle: const TextStyle(
                    color: TeknokentTheme.primaryBlue,
                    fontWeight: FontWeight.w700,
                    fontSize: 12,
                  ),
                  unselectedLabelTextStyle: const TextStyle(
                    color: TeknokentTheme.textMuted,
                    fontWeight: FontWeight.w500,
                    fontSize: 12,
                  ),
                  labelType: NavigationRailLabelType.all,
                  destinations: const [
                    NavigationRailDestination(
                      icon: Icon(Icons.dynamic_feed_outlined),
                      selectedIcon: Icon(Icons.dynamic_feed),
                      label: Text('Akış'),
                    ),
                    NavigationRailDestination(
                      icon: Icon(Icons.business_outlined),
                      selectedIcon: Icon(Icons.business),
                      label: Text('Firmalar'),
                    ),
                    NavigationRailDestination(
                      icon: Icon(Icons.chat_bubble_outline),
                      selectedIcon: Icon(Icons.chat_bubble),
                      label: Text('Mesajlar'),
                    ),
                    NavigationRailDestination(
                      icon: Icon(Icons.notifications_outlined),
                      selectedIcon: Icon(Icons.notifications),
                      label: Text('Bildirimler'),
                    ),
                    NavigationRailDestination(
                      icon: Icon(Icons.person_outline),
                      selectedIcon: Icon(Icons.person),
                      label: Text('Profil'),
                    ),
                  ],
                ),
                const VerticalDivider(thickness: 1, width: 1, color: TeknokentTheme.borderSubtle),
                Expanded(child: screens[_currentIndex]),
              ],
            )
          : screens[_currentIndex],

      bottomNavigationBar: isDesktop
          ? null
          : BottomNavigationBar(
              currentIndex: _currentIndex,
              onTap: (index) {
                setState(() {
                  _currentIndex = index;
                });
              },
              items: const [
                BottomNavigationBarItem(
                  icon: Icon(Icons.dynamic_feed_outlined),
                  activeIcon: Icon(Icons.dynamic_feed),
                  label: 'Akış',
                ),
                BottomNavigationBarItem(
                  icon: Icon(Icons.business_outlined),
                  activeIcon: Icon(Icons.business),
                  label: 'Firmalar',
                ),
                BottomNavigationBarItem(
                  icon: Icon(Icons.chat_bubble_outline),
                  activeIcon: Icon(Icons.chat_bubble),
                  label: 'Mesajlar',
                ),
                BottomNavigationBarItem(
                  icon: Icon(Icons.notifications_outlined),
                  activeIcon: Icon(Icons.notifications),
                  label: 'Bildirimler',
                ),
                BottomNavigationBarItem(
                  icon: Icon(Icons.person_outline),
                  activeIcon: Icon(Icons.person),
                  label: 'Profil',
                ),
              ],
            ),
    );
  }
}
