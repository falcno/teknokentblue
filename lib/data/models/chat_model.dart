class ChatMessage {
  final String id;
  final String senderUsername;
  final String senderName;
  final String senderAvatar;
  final String recipientUsername;
  final String text;
  final DateTime createdAt;
  bool isRead;

  ChatMessage({
    required this.id,
    required this.senderUsername,
    required this.senderName,
    required this.senderAvatar,
    required this.recipientUsername,
    required this.text,
    required this.createdAt,
    this.isRead = false,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'senderUsername': senderUsername,
      'senderName': senderName,
      'senderAvatar': senderAvatar,
      'recipientUsername': recipientUsername,
      'text': text,
      'createdAt': createdAt.toIso8601String(),
      'isRead': isRead,
    };
  }

  factory ChatMessage.fromMap(Map<String, dynamic> map) {
    return ChatMessage(
      id: map['id'] ?? '',
      senderUsername: map['senderUsername'] ?? '',
      senderName: map['senderName'] ?? '',
      senderAvatar: map['senderAvatar'] ?? '',
      recipientUsername: map['recipientUsername'] ?? '',
      text: map['text'] ?? '',
      createdAt: map['createdAt'] != null ? DateTime.parse(map['createdAt']) : DateTime.now(),
      isRead: map['isRead'] ?? false,
    );
  }
}
