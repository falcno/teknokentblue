import 'package:flutter/material.dart';
import '../../data/models/post_model.dart';
import '../../core/theme.dart';
import 'avatar_widget.dart';

class PostCardWidget extends StatefulWidget {
  final Post post;
  final String currentUsername;
  final VoidCallback onLike;
  final VoidCallback onRepost;
  final Function(String) onAddComment;

  const PostCardWidget({
    super.key,
    required this.post,
    required this.currentUsername,
    required this.onLike,
    required this.onRepost,
    required this.onAddComment,
  });

  @override
  State<PostCardWidget> createState() => _PostCardWidgetState();
}

class _PostCardWidgetState extends State<PostCardWidget> {
  bool _showComments = false;
  final TextEditingController _commentController = TextEditingController();

  @override
  void dispose() {
    _commentController.dispose();
    super.dispose();
  }

  void _submitComment() {
    final text = _commentController.text.trim();
    if (text.isNotEmpty) {
      widget.onAddComment(text);
      _commentController.clear();
      setState(() {});
    }
  }

  @override
  Widget build(BuildContext context) {
    final isLiked = widget.post.isLikedBy(widget.currentUsername);

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header
            Row(
              children: [
                AvatarWidget(
                  imagePath: widget.post.authorAvatar,
                  radius: 22,
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Flexible(
                            child: Text(
                              widget.post.authorName,
                              style: const TextStyle(
                                fontWeight: FontWeight.w700,
                                fontSize: 15,
                                color: TeknokentTheme.textLight,
                              ),
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                          const SizedBox(width: 4),
                          const Icon(
                            Icons.verified,
                            size: 15,
                            color: TeknokentTheme.cyanAccent,
                          ),
                        ],
                      ),
                      const SizedBox(height: 2),
                      Row(
                        children: [
                          if (widget.post.authorCompany != null) ...[
                            Text(
                              widget.post.authorCompany!,
                              style: const TextStyle(
                                fontSize: 12,
                                color: TeknokentTheme.primaryBlue,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                            const Text(
                              ' • ',
                              style: TextStyle(color: TeknokentTheme.textMuted),
                            ),
                          ],
                          Text(
                            '@${widget.post.authorUsername}',
                            style: const TextStyle(
                              fontSize: 12,
                              color: TeknokentTheme.textMuted,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                if (widget.post.isCompanyPost)
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                    decoration: BoxDecoration(
                      color: TeknokentTheme.primaryBlue.withOpacity(0.15),
                      borderRadius: BorderRadius.circular(6),
                      border: Border.all(color: TeknokentTheme.primaryBlue.withOpacity(0.4)),
                    ),
                    child: const Text(
                      'KURUMSAL',
                      style: TextStyle(
                        fontSize: 9,
                        fontWeight: FontWeight.w800,
                        color: TeknokentTheme.primaryBlue,
                        letterSpacing: 0.5,
                      ),
                    ),
                  ),
              ],
            ),
            const SizedBox(height: 14),

            // Content
            Text(
              widget.post.content,
              style: const TextStyle(
                fontSize: 14.5,
                height: 1.45,
                color: TeknokentTheme.textLight,
              ),
            ),

            // Tags
            if (widget.post.tags.isNotEmpty) ...[
              const SizedBox(height: 10),
              Wrap(
                spacing: 6,
                runSpacing: 6,
                children: widget.post.tags.map((tag) {
                  return Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                    decoration: BoxDecoration(
                      color: const Color(0xFF0F172A),
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: Text(
                      '#$tag',
                      style: const TextStyle(
                        color: TeknokentTheme.cyanAccent,
                        fontSize: 11.5,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  );
                }).toList(),
              ),
            ],

            // Post Image
            if (widget.post.imagePath != null) ...[
              const SizedBox(height: 14),
              ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: Image.asset(
                  widget.post.imagePath!,
                  fit: BoxFit.cover,
                  width: double.infinity,
                  height: 200,
                  errorBuilder: (_, __, ___) => const SizedBox.shrink(),
                ),
              ),
            ],

            const SizedBox(height: 16),
            const Divider(color: TeknokentTheme.borderSubtle, height: 1),
            const SizedBox(height: 10),

            // Action Buttons
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                // Like Button
                InkWell(
                  onTap: widget.onLike,
                  borderRadius: BorderRadius.circular(8),
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    child: Row(
                      children: [
                        Icon(
                          isLiked ? Icons.favorite : Icons.favorite_border,
                          size: 19,
                          color: isLiked ? TeknokentTheme.dangerRed : TeknokentTheme.textMuted,
                        ),
                        const SizedBox(width: 6),
                        Text(
                          widget.post.likes.length.toString(),
                          style: TextStyle(
                            fontSize: 13,
                            color: isLiked ? TeknokentTheme.dangerRed : TeknokentTheme.textMuted,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),

                // Repost Button
                InkWell(
                  onTap: widget.onRepost,
                  borderRadius: BorderRadius.circular(8),
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    child: Row(
                      children: [
                        const Icon(
                          Icons.repeat,
                          size: 19,
                          color: TeknokentTheme.textMuted,
                        ),
                        const SizedBox(width: 6),
                        Text(
                          widget.post.repostsCount.toString(),
                          style: const TextStyle(
                            fontSize: 13,
                            color: TeknokentTheme.textMuted,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),

                // Comment Button
                InkWell(
                  onTap: () {
                    setState(() {
                      _showComments = !_showComments;
                    });
                  },
                  borderRadius: BorderRadius.circular(8),
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    child: Row(
                      children: [
                        Icon(
                          Icons.chat_bubble_outline,
                          size: 18,
                          color: _showComments ? TeknokentTheme.primaryBlue : TeknokentTheme.textMuted,
                        ),
                        const SizedBox(width: 6),
                        Text(
                          widget.post.comments.length.toString(),
                          style: TextStyle(
                            fontSize: 13,
                            color: _showComments ? TeknokentTheme.primaryBlue : TeknokentTheme.textMuted,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),

                // Share Button
                IconButton(
                  icon: const Icon(Icons.share_outlined, size: 18, color: TeknokentTheme.textMuted),
                  onPressed: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Gönderi bağlantısı kopyalandı!')),
                    );
                  },
                ),
              ],
            ),

            // Comments Section
            if (_showComments) ...[
              const SizedBox(height: 12),
              const Divider(color: TeknokentTheme.borderSubtle, height: 1),
              const SizedBox(height: 12),

              // Existing Comments
              if (widget.post.comments.isEmpty)
                const Padding(
                  padding: EdgeInsets.symmetric(vertical: 8),
                  child: Text(
                    'Henüz yorum yok. İlk yorumu siz yapın!',
                    style: TextStyle(color: TeknokentTheme.textMuted, fontSize: 13),
                  ),
                )
              else
                ...widget.post.comments.map((comment) {
                  return Padding(
                    padding: const EdgeInsets.only(bottom: 10),
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        AvatarWidget(
                          imagePath: comment.authorAvatar,
                          radius: 14,
                        ),
                        const SizedBox(width: 10),
                        Expanded(
                          child: Container(
                            padding: const EdgeInsets.all(10),
                            decoration: BoxDecoration(
                              color: const Color(0xFF0F172A),
                              borderRadius: BorderRadius.circular(10),
                            ),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  comment.authorName,
                                  style: const TextStyle(
                                    fontWeight: FontWeight.w700,
                                    fontSize: 12.5,
                                    color: TeknokentTheme.textLight,
                                  ),
                                ),
                                const SizedBox(height: 2),
                                Text(
                                  comment.content,
                                  style: const TextStyle(
                                    fontSize: 13,
                                    color: TeknokentTheme.textLight,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),
                  );
                }),

              // Add Comment Input
              const SizedBox(height: 6),
              Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _commentController,
                      style: const TextStyle(fontSize: 13.5),
                      decoration: const InputDecoration(
                        hintText: 'Yorumunuzu yazın...',
                        contentPadding: EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                      ),
                      onSubmitted: (_) => _submitComment(),
                    ),
                  ),
                  const SizedBox(width: 8),
                  IconButton(
                    icon: const Icon(Icons.send, color: TeknokentTheme.primaryBlue),
                    onPressed: _submitComment,
                  ),
                ],
              ),
            ],
          ],
        ),
      ),
    );
  }
}
