import 'package:flutter/material.dart';
import '../../data/models/user_model.dart';
import '../../core/theme.dart';

class RoleBadgeWidget extends StatelessWidget {
  final UserRole role;
  final bool isSmall;

  const RoleBadgeWidget({
    super.key,
    required this.role,
    this.isSmall = false,
  });

  @override
  Widget build(BuildContext context) {
    Color bg;
    Color border;
    Color text;
    String label;
    IconData icon;

    switch (role) {
      case UserRole.superAdmin:
        bg = const Color(0xFF3B1A24);
        border = const Color(0xFFF43F5E);
        text = const Color(0xFFFDA4AF);
        label = 'Marmara Teknokent';
        icon = Icons.account_balance;
        break;
      case UserRole.companyAdmin:
        bg = const Color(0xFF1E2A4A);
        border = TeknokentTheme.primaryBlue;
        text = const Color(0xFF93C5FD);
        label = 'Firma Yetkilisi';
        icon = Icons.business;
        break;
      case UserRole.employee:
        bg = const Color(0xFF143028);
        border = TeknokentTheme.successGreen;
        text = const Color(0xFF6EE7B7);
        label = 'Firma Onaylı Personel';
        icon = Icons.verified_user;
        break;
    }

    return Container(
      padding: EdgeInsets.symmetric(
        horizontal: isSmall ? 8 : 10,
        vertical: isSmall ? 3 : 5,
      ),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(20),
        border: Border.Border.all(color: border.withOpacity(0.6), width: 1),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: isSmall ? 11 : 13, color: text),
          const SizedBox(width: 4),
          Text(
            label,
            style: TextStyle(
              color: text,
              fontSize: isSmall ? 10 : 11,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }
}
