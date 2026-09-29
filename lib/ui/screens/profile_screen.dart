import 'package:flutter/material.dart';
import '../../core/theme.dart';
import '../../data/teknokent_repository.dart';
import '../widgets/avatar_widget.dart';
import '../widgets/role_badge_widget.dart';
import '../widgets/post_card_widget.dart';

class ProfileScreen extends StatelessWidget {
  final TeknokentRepository repository;

  const ProfileScreen({super.key, required this.repository});

  @override
  Widget build(BuildContext context) {
    final user = repository.currentUser!;
    final userPosts = repository.posts.where((p) => p.authorUsername == user.username).toList();

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        // Profile Card
        Card(
          child: Column(
            children: [
              // Banner
              Container(
                height: 100,
                decoration: const BoxDecoration(
                  gradient: LinearGradient(
                    colors: [Color(0xFF0F172A), TeknokentTheme.primaryBlue],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
                ),
              ),

              // Avatar & Info
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
                child: Column(
                  children: [
                    Transform.translate(
                      offset: const Offset(0, -50),
                      child: Container(
                        padding: const EdgeInsets.all(4),
                        decoration: BoxDecoration(
                          color: TeknokentTheme.darkSurface,
                          shape: BoxShape.circle,
                          border: Border.all(color: TeknokentTheme.primaryBlue, width: 2),
                        ),
                        child: AvatarWidget(imagePath: user.avatarUrl, radius: 40),
                      ),
                    ),
                    Transform.translate(
                      offset: const Offset(0, -35),
                      child: Column(
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Text(
                                user.fullName,
                                style: const TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.w800,
                                  color: TeknokentTheme.textLight,
                                ),
                              ),
                              const SizedBox(width: 4),
                              const Icon(Icons.verified, size: 18, color: TeknokentTheme.cyanAccent),
                            ],
                          ),
                          const SizedBox(height: 2),
                          Text(
                            '@${user.username}',
                            style: const TextStyle(fontSize: 13, color: TeknokentTheme.textMuted),
                          ),
                          const SizedBox(height: 10),

                          // Role Badge
                          RoleBadgeWidget(role: user.role),

                          const SizedBox(height: 12),
                          Text(
                            user.title,
                            style: const TextStyle(
                              fontSize: 13.5,
                              color: TeknokentTheme.primaryBlue,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            user.bio,
                            textAlign: TextAlign.center,
                            style: const TextStyle(fontSize: 13, color: TeknokentTheme.textLight, height: 1.4),
                          ),
                          const SizedBox(height: 18),

                          // Stats Row
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                            children: [
                              _buildStatItem('Gönderi', user.postsCount.toString()),
                              _buildStatItem('Takipçi', user.followersCount.toString()),
                              _buildStatItem('Takip', user.followingCount.toString()),
                            ],
                          ),
                          const SizedBox(height: 18),

                          // Logout Button
                          SizedBox(
                            width: double.infinity,
                            child: OutlinedButton.icon(
                              onPressed: () {
                                repository.logout();
                              },
                              icon: const Icon(Icons.logout, size: 16, color: TeknokentTheme.dangerRed),
                              label: const Text(
                                'Oturumu Kapat',
                                style: TextStyle(color: TeknokentTheme.dangerRed, fontWeight: FontWeight.w700),
                              ),
                              style: OutlinedButton.styleFrom(
                                side: BorderSide(color: TeknokentTheme.dangerRed.withOpacity(0.5)),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 16),

        // User Posts Section
        const Padding(
          padding: EdgeInsets.symmetric(horizontal: 4),
          child: Text(
            'Paylaşımlarım',
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: TeknokentTheme.textLight),
          ),
        ),
        const SizedBox(height: 10),

        if (userPosts.isEmpty)
          const Padding(
            padding: EdgeInsets.all(24),
            child: Center(
              child: Text(
                'Henüz bir paylaşım yapmadınız.',
                style: TextStyle(color: TeknokentTheme.textMuted),
              ),
            ),
          )
        else
          ...userPosts.map((post) {
            return PostCardWidget(
              post: post,
              currentUsername: user.username,
              onLike: () => repository.toggleLike(post.id),
              onRepost: () => repository.repost(post.id),
              onAddComment: (txt) => repository.addComment(post.id, txt),
            );
          }),
      ],
    );
  }

  Widget _buildStatItem(String label, String value) {
    return Column(
      children: [
        Text(
          value,
          style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: TeknokentTheme.textLight),
        ),
        Text(
          label,
          style: const TextStyle(fontSize: 11.5, color: TeknokentTheme.textMuted),
        ),
      ],
    );
  }
}
