enum ApplicationStatus {
  pending,  // İncelemede
  approved, // Onaylandı & Hesap Açıldı
  rejected, // Reddedildi
}

class AccountApplication {
  final String id;
  final String companyId;
  final String companyName;
  final String fullName;
  final String title;
  final String requestedUsername;
  final String requestedPassword;
  final String note;
  final String avatarPath;
  ApplicationStatus status;
  final DateTime createdAt;
  DateTime? processedAt;

  AccountApplication({
    required this.id,
    required this.companyId,
    required this.companyName,
    required this.fullName,
    required this.title,
    required this.requestedUsername,
    required this.requestedPassword,
    required this.note,
    required this.avatarPath,
    this.status = ApplicationStatus.pending,
    required this.createdAt,
    this.processedAt,
  });

  bool get isPending => status == ApplicationStatus.pending;
  bool get isApproved => status == ApplicationStatus.approved;
  bool get isRejected => status == ApplicationStatus.rejected;

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'companyId': companyId,
      'companyName': companyName,
      'fullName': fullName,
      'title': title,
      'requestedUsername': requestedUsername,
      'requestedPassword': requestedPassword,
      'note': note,
      'avatarPath': avatarPath,
      'status': status.index,
      'createdAt': createdAt.toIso8601String(),
      'processedAt': processedAt?.toIso8601String(),
    };
  }

  factory AccountApplication.fromMap(Map<String, dynamic> map) {
    return AccountApplication(
      id: map['id'] ?? '',
      companyId: map['companyId'] ?? '',
      companyName: map['companyName'] ?? '',
      fullName: map['fullName'] ?? '',
      title: map['title'] ?? '',
      requestedUsername: map['requestedUsername'] ?? '',
      requestedPassword: map['requestedPassword'] ?? '',
      note: map['note'] ?? '',
      avatarPath: map['avatarPath'] ?? 'assets/avatar_erdem.jpg',
      status: ApplicationStatus.values[map['status'] ?? 0],
      createdAt: map['createdAt'] != null ? DateTime.parse(map['createdAt']) : DateTime.now(),
      processedAt: map['processedAt'] != null ? DateTime.parse(map['processedAt']) : null,
    );
  }
}
