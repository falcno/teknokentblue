import 'package:flutter/material.dart';
import '../../core/theme.dart';
import '../../core/constants.dart';
import '../../data/teknokent_repository.dart';
import '../../data/models/post_model.dart';
import '../widgets/post_card_widget.dart';
import '../widgets/avatar_widget.dart';

class FeedScreen extends StatefulWidget {
  final TeknokentRepository repository;

  const FeedScreen({super.key, required this.repository});

  @override
  State<FeedScreen> createState() => _FeedScreenState();
}

class _FeedScreenState extends State<FeedScreen> {
  final TextEditingController _postTextController = TextEditingController();
  bool _postAsCompany = false;
  String? _selectedSampleImage;
  String _selectedFilter = 'Tümü';

  final List<String> _filters = ['Tümü', 'Duyurular', 'Ar-Ge', 'Startup', 'Kuluçka'];

  @override
  void dispose() {
    _postTextController.dispose();
    super.dispose();
  }

  void _handleCreatePost() {
    final text = _postTextController.text.trim();
    if (text.isEmpty && _selectedSampleImage == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Lütfen bir metin yazın veya görsel ekleyin!')),
      );
      return;
    }

    final hashtags = RegExp(r'#([a-zA-Z0-9ığüşöçİĞÜŞÖÇ_]+)')
        .allMatches(text)
        .map((m) => m.group(1)!)
        .toList();

    widget.repository.createPost(
      content: text,
      isCompanyPost: _postAsCompany,
      tags: hashtags,
      imagePath: _selectedSampleImage,
    );

    _postTextController.clear();
    setState(() {
      _selectedSampleImage = null;
    });

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Gönderiniz paylaşıldı!')),
    );
  }

  void _addHashtag(String tag) {
    final current = _postTextController.text;
    _postTextController.text = (current.trim() + ' #$tag').trim() + ' ';
    _postTextController.selection = TextSelection.fromPosition(
      TextPosition(offset: _postTextController.text.length),
    );
  }

  @override
  Widget build(BuildContext context) {
    final user = widget.repository.currentUser!;
    final posts = widget.repository.posts;

    // Filter posts
    final filteredPosts = posts.where((p) {
      if (_selectedFilter == 'Tümü') return true;
      if (_selectedFilter == 'Duyurular') return p.isCompanyPost;
      return p.tags.any((t) => t.toLowerCase().contains(_selectedFilter.toLowerCase()));
    }).toList();

    return RefreshIndicator(
      onRefresh: () async {
        setState(() {});
      },
      child: ListView(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
        children: [
          // 1. Post Composer Card
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      AvatarWidget(
                        imagePath: _postAsCompany ? AppConstants.logoPath : user.avatarUrl,
                        radius: 20,
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              _postAsCompany ? user.companyName : user.fullName,
                              style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 14),
                            ),
                            Text(
                              _postAsCompany ? 'Kurumsal Hesap Adına' : '@${user.username}',
                              style: const TextStyle(fontSize: 12, color: TeknokentTheme.textMuted),
                            ),
                          ],
                        ),
                      ),
                      // Post As Switch (Şirket yetkilisi veya süper adminse)
                      if (user.isCompanyAdmin || user.isSuperAdmin)
                        FilterChip(
                          label: Text(
                            _postAsCompany ? '🏢 Şirket Adına' : '👤 Bireysel',
                            style: TextStyle(
                              fontSize: 11,
                              fontWeight: FontWeight.w600,
                              color: _postAsCompany ? TeknokentTheme.primaryBlue : TeknokentTheme.textMuted,
                            ),
                          ),
                          selected: _postAsCompany,
                          onSelected: (val) {
                            setState(() {
                              _postAsCompany = val;
                            });
                          },
                          backgroundColor: const Color(0xFF0F172A),
                          selectedColor: TeknokentTheme.primaryBlue.withOpacity(0.2),
                        ),
                    ],
                  ),
                  const SizedBox(height: 12),

                  TextField(
                    controller: _postTextController,
                    maxLines: 3,
                    decoration: const InputDecoration(
                      hintText: 'Ar-Ge projeniz, lansmanınız veya duyurunuz hakkında ne düşünüyorsunuz?',
                      border: InputBorder.none,
                      enabledBorder: InputBorder.none,
                      focusedBorder: InputBorder.none,
                      filled: false,
                    ),
                  ),

                  // Image preview if selected
                  if (_selectedSampleImage != null) ...[
                    const SizedBox(height: 10),
                    Stack(
                      children: [
                        ClipRRect(
                          borderRadius: BorderRadius.circular(10),
                          child: Image.asset(
                            _selectedSampleImage!,
                            height: 140,
                            width: double.infinity,
                            fit: BoxFit.cover,
                          ),
                        ),
                        Positioned(
                          top: 8,
                          right: 8,
                          child: CircleAvatar(
                            radius: 14,
                            backgroundColor: Colors.black.withOpacity(0.7),
                            child: IconButton(
                              padding: EdgeInsets.zero,
                              icon: const Icon(Icons.close, size: 16, color: Colors.white),
                              onPressed: () {
                                setState(() {
                                  _selectedSampleImage = null;
                                });
                              },
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],

                  const SizedBox(height: 12),
                  const Divider(color: TeknokentTheme.borderSubtle, height: 1),
                  const SizedBox(height: 10),

                  // Composer Action Toolbar
                  Row(
                    children: [
                      // Görsel Ekle Seçenekleri
                      IconButton(
                        tooltip: 'Ofis Görseli Ekle',
                        icon: const Icon(Icons.image_outlined, size: 20, color: TeknokentTheme.cyanAccent),
                        onPressed: () {
                          setState(() {
                            _selectedSampleImage = AppConstants.postOffice;
                          });
                        },
                      ),
                      IconButton(
                        tooltip: 'Ekip Görseli Ekle',
                        icon: const Icon(Icons.groups_outlined, size: 20, color: TeknokentTheme.primaryBlue),
                        onPressed: () {
                          setState(() {
                            _selectedSampleImage = AppConstants.postTeam;
                          });
                        },
                      ),

                      // Hızlı Hashtag
                      TextButton(
                        onPressed: () => _addHashtag('ArGe'),
                        child: const Text('#ArGe', style: TextStyle(fontSize: 12)),
                      ),
                      TextButton(
                        onPressed: () => _addHashtag('YapayZeka'),
                        child: const Text('#YapayZeka', style: TextStyle(fontSize: 12)),
                      ),

                      const Spacer(),

                      // Paylaş Butonu
                      ElevatedButton(
                        onPressed: _handleCreatePost,
                        style: ElevatedButton.styleFrom(
                          padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 10),
                        ),
                        child: const Text('Paylaş'),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 12),

          // 2. Filter Bar
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: _filters.map((filter) {
                final isSelected = _selectedFilter == filter;
                return Padding(
                  padding: const EdgeInsets.only(right: 8),
                  child: FilterChip(
                    label: Text(filter),
                    selected: isSelected,
                    onSelected: (val) {
                      setState(() {
                        _selectedFilter = filter;
                      });
                    },
                    selectedColor: TeknokentTheme.primaryBlue,
                    backgroundColor: const Color(0xFF0F172A),
                    labelStyle: TextStyle(
                      color: isSelected ? Colors.white : TeknokentTheme.textMuted,
                      fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
                      fontSize: 12.5,
                    ),
                  ),
                );
              }).toList(),
            ),
          ),
          const SizedBox(height: 14),

          // 3. Posts List
          ...filteredPosts.map((post) {
            return PostCardWidget(
              post: post,
              currentUsername: user.username,
              onLike: () {
                widget.repository.toggleLike(post.id);
                setState(() {});
              },
              onRepost: () {
                widget.repository.repost(post.id);
                setState(() {});
              },
              onAddComment: (commentText) {
                widget.repository.addComment(post.id, commentText);
                setState(() {});
              },
            );
          }),
        ],
      ),
    );
  }
}
