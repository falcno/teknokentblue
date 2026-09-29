enum UserRole {
  superAdmin,   // 1. Derece: Marmara Teknokent çatı yönetimi
  companyAdmin, // 2. Derece: Firma, Startup, Kuluçka yetkilisi
  employee,     // 3. Derece: Firma onaylı personel
}

class User {
  final String username;
  final String fullName;
  final String companyId;
  final String companyName;
  final UserRole role;
  final String title;
  final String avatarUrl;
  final String bio;
  final bool isVerified;
  final String password;
  int postsCount;
  int followersCount;
  int followingCount;

  User({
    required this.username,
    required this.fullName,
    required this.companyId,
    required this.companyName,
    required this.role,
    required this.title,
    required this.avatarUrl,
    required this.bio,
    this.isVerified = true,
    required this.password,
    this.postsCount = 0,
    this.followersCount = 0,
    this.followingCount = 0,
  });

  bool get isSuperAdmin => role == UserRole.superAdmin;
  bool get isCompanyAdmin => role == UserRole.companyAdmin;
  bool get isEmployee => role == UserRole.employee;

  String get roleDisplayLabel {
    switch (role) {
      case UserRole.superAdmin:
        return '🏛️ Marmara Teknokent Süper Yönetici';
      case UserRole.companyAdmin:
        return '🏢 Firma Yetkilisi';
      case UserRole.employee:
        return '👤 Onaylı Ar-Ge Personeli';
    }
  }

  Map<String, dynamic> toMap() {
    return {
      'username': username,
      'fullName': fullName,
      'companyId': companyId,
      'companyName': companyName,
      'role': role.index,
      'title': title,
      'avatarUrl': avatarUrl,
      'bio': bio,
      'isVerified': isVerified,
      'password': password,
      'postsCount': postsCount,
      'followersCount': followersCount,
      'followingCount': followingCount,
    };
  }

  factory User.fromMap(Map<String, dynamic> map) {
    return User(
      username: map['username'] ?? '',
      fullName: map['fullName'] ?? '',
      companyId: map['companyId'] ?? '',
      companyName: map['companyName'] ?? '',
      role: UserRole.values[map['role'] ?? 2],
      title: map['title'] ?? '',
      avatarUrl: map['avatarUrl'] ?? '',
      bio: map['bio'] ?? '',
      isVerified: map['isVerified'] ?? true,
      password: map['password'] ?? '',
      postsCount: map['postsCount'] ?? 0,
      followersCount: map['followersCount'] ?? 0,
      followingCount: map['followingCount'] ?? 0,
    );
  }
}
