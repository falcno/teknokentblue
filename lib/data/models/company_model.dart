class Company {
  final String id;
  final String name;
  final String category; // 'Ar-Ge Şirketi', 'Startup', 'Kuluçka Merkezi'
  final String block;    // 'A Blok - No: 104', etc.
  final String teamSize; // '15-50 Kişi', etc.
  final String description;
  final String emoji;
  int employeeCount;

  Company({
    required this.id,
    required this.name,
    required this.category,
    required this.block,
    required this.teamSize,
    required this.description,
    required this.emoji,
    this.employeeCount = 0,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'name': name,
      'category': category,
      'block': block,
      'teamSize': teamSize,
      'description': description,
      'emoji': emoji,
      'employeeCount': employeeCount,
    };
  }

  factory Company.fromMap(Map<String, dynamic> map) {
    return Company(
      id: map['id'] ?? '',
      name: map['name'] ?? '',
      category: map['category'] ?? 'Ar-Ge Şirketi',
      block: map['block'] ?? '',
      teamSize: map['teamSize'] ?? '',
      description: map['description'] ?? '',
      emoji: map['emoji'] ?? '🏢',
      employeeCount: map['employeeCount'] ?? 0,
    );
  }
}
