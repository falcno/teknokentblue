import 'package:flutter/material.dart';
import '../../core/theme.dart';

class AvatarWidget extends StatelessWidget {
  final String imagePath;
  final double radius;
  final bool showOnline;

  const AvatarWidget({
    super.key,
    required this.imagePath,
    this.radius = 20,
    this.showOnline = false,
  });

  @override
  Widget build(BuildContext context) {
    return Stack(
      clipBehavior: Clip.none,
      children: [
        CircleAvatar(
          radius: radius,
          backgroundColor: TeknokentTheme.cardSurface,
          backgroundImage: AssetImage(imagePath),
          onBackgroundImageError: (_, __) {},
          child: null,
        ),
        if (showOnline)
          Positioned(
            right: 0,
            bottom: 0,
            child: Container(
              width: radius * 0.55,
              height: radius * 0.55,
              decoration: BoxDecoration(
                color: TeknokentTheme.successGreen,
                shape: BoxShape.circle,
                border: Border.all(
                  color: TeknokentTheme.darkSurface,
                  width: 2,
                ),
              ),
            ),
          ),
      ],
    );
  }
}
