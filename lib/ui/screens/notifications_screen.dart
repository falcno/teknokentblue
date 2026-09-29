import 'package:flutter/material.dart';
import '../../core/theme.dart';
import '../../data/teknokent_repository.dart';

class NotificationsScreen extends StatelessWidget {
  final TeknokentRepository repository;

  const NotificationsScreen({super.key, required this.repository});

  @override
  Widget build(BuildContext context) {
    final user = repository.currentUser!;
    final pendingApps = repository.getPendingApplicationsForUser(user);

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        const Text(
          'Bildirimler',
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.w800,
            color: TeknokentTheme.textLight,
          ),
        ),
        const SizedBox(height: 4),
        const Text(
          'Sistem, başvuru ve etkileşim bildirimleri.',
          style: TextStyle(fontSize: 13, color: TeknokentTheme.textMuted),
        ),
        const SizedBox(height: 16),

        // Eğer bekleyen başvuru varsa firma yetkilisine öne çıkar
        if (pendingApps.isNotEmpty) ...[
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: TeknokentTheme.warningOrange.withOpacity(0.12),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: TeknokentTheme.warningOrange.withOpacity(0.4)),
            ),
            child: Row(
              children: [
                const Icon(Icons.person_add, color: TeknokentTheme.warningOrange),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Onay Bekleyen Hesap Başvurusu',
                        style: TextStyle(
                          fontWeight: FontWeight.w700,
                          fontSize: 13.5,
                          color: TeknokentTheme.warningOrange,
                        ),
                      ),
                      Text(
                        '${pendingApps.length} aday firmanıza hesap başvurusu yaptı. İncelemek için Firma Yönetimi butonuna tıklayın.',
                        style: const TextStyle(fontSize: 12, color: TeknokentTheme.textLight),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),
        ],

        // Standart Bildirimler
        _buildNotificationTile(
          icon: Icons.account_balance,
          iconColor: const Color(0xFFF43F5E),
          title: 'Marmara Teknokent Genelgesi',
          desc: '2026 3. Çeyrek TÜBİTAK TEYDEB Ar-Ge destek takvimi ilan edildi.',
          time: '1 saat önce',
        ),
        const SizedBox(height: 10),
        _buildNotificationTile(
          icon: Icons.favorite,
          iconColor: TeknokentTheme.dangerRed,
          title: 'Gönderiniz Beğenildi',
          desc: 'Ali Nihat (@aliniyya) ve 2 kişi son Ar-Ge paylaşımınızı beğendi.',
          time: '3 saat önce',
        ),
        const SizedBox(height: 10),
        _buildNotificationTile(
          icon: Icons.comment,
          iconColor: TeknokentTheme.primaryBlue,
          title: 'Yeni Yorum Yapıldı',
          desc: 'Neurologic AI yetkilisi gönderinize yanıt yazdı.',
          time: '5 saat önce',
        ),
        const SizedBox(height: 10),
        _buildNotificationTile(
          icon: Icons.security,
          iconColor: TeknokentTheme.successGreen,
          title: 'Güvenlik & Oturum Doğrulaması',
          desc: 'Hesabınız Marmara Teknokent güvenli oturum kontrolünden başarıyla geçti.',
          time: '1 gün önce',
        ),
      ],
    );
  }

  Widget _buildNotificationTile({
    required IconData icon,
    required Color iconColor,
    required String title,
    required String desc,
    required String time,
  }) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: const Color(0xFF0F172A),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: TeknokentTheme.borderSubtle),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          CircleAvatar(
            radius: 18,
            backgroundColor: iconColor.withOpacity(0.15),
            child: Icon(icon, color: iconColor, size: 18),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      title,
                      style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 13.5),
                    ),
                    Text(
                      time,
                      style: const TextStyle(fontSize: 11, color: TeknokentTheme.textMuted),
                    ),
                  ],
                ),
                const SizedBox(height: 3),
                Text(
                  desc,
                  style: const TextStyle(fontSize: 12.5, color: TeknokentTheme.textMuted),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
