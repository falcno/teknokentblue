class PostComment {
  final String id;
  final String authorUsername;
  final String authorName;
  final String authorAvatar;
  final String content;
  final DateTime createdAt;

  PostComment({
    required this.id,
    required this.authorUsername,
    required this.authorName,
    required this.authorAvatar,
    required this.content,
    required this.createdAt,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'authorUsername': authorUsername,
      'authorName': authorName,
      'authorAvatar': authorAvatar,
      'content': content,
      'createdAt': createdAt.toIso8601String(),
    };
  }

  factory PostComment.fromMap(Map<String, dynamic> map) {
    return PostComment(
      id: map['id'] ?? '',
      authorUsername: map['authorUsername'] ?? '',
      authorName: map['authorName'] ?? '',
      authorAvatar: map['authorAvatar'] ?? '',
      content: map['content'] ?? '',
      createdAt: map['createdAt'] != null ? DateTime.parse(map['createdAt']) : DateTime.now(),
    );
  }
}

class Post {
  final String id;
  final String authorUsername;
  final String authorName;
  final String authorAvatar;
  final String? authorCompany;
  final bool isCompanyPost;
  final String content;
  final List<String> tags;
  final String? imagePath;
  final DateTime createdAt;
  final List<String> likes; // Usernames that liked
  int repostsCount;
  final List<PostComment> comments;

  Post({
    required this.id,
    required this.authorUsername,
    required this.authorName,
    required this.authorAvatar,
    this.authorCompany,
    this.isCompanyPost = false,
    required this.content,
    this.tags = const [],
    this.imagePath,
    required this.createdAt,
    List<String>? likes,
    this.repostsCount = 0,
    List<PostComment>? comments,
  })  : likes = likes ?? [],
        comments = comments ?? [];

  bool isLikedBy(String username) => likes.contains(username);

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'authorUsername': authorUsername,
      'authorName': authorName,
      'authorAvatar': authorAvatar,
      'authorCompany': authorCompany,
      'isCompanyPost': isCompanyPost,
      'content': content,
      'tags': tags,
      'imagePath': imagePath,
      'createdAt': createdAt.toIso8601String(),
      'likes': likes,
      'repostsCount': repostsCount,
      'comments': comments.map((c) => c.toMap()).toList(),
    };
  }

  factory Post.fromMap(Map<String, dynamic> map) {
    return Post(
      id: map['id'] ?? '',
      authorUsername: map['authorUsername'] ?? '',
      authorName: map['authorName'] ?? '',
      authorAvatar: map['authorAvatar'] ?? '',
      authorCompany: map['authorCompany'],
      isCompanyPost: map['isCompanyPost'] ?? false,
      content: map['content'] ?? '',
      tags: List<String>.from(map['tags'] ?? []),
      imagePath: map['imagePath'],
      createdAt: map['createdAt'] != null ? DateTime.parse(map['createdAt']) : DateTime.now(),
      likes: List<String>.from(map['likes'] ?? []),
      repostsCount: map['repostsCount'] ?? 0,
      comments: (map['comments'] as List<dynamic>?)
              ?.map((c) => PostComment.fromMap(c as Map<String, dynamic>))
              .toList() ??
          [],
    );
  }
}
