import 'package:flutter/material.dart';
import '../../core/theme.dart';
import '../../data/teknokent_repository.dart';
import '../../data/models/company_model.dart';

class CompaniesScreen extends StatefulWidget {
  final TeknokentRepository repository;

  const CompaniesScreen({super.key, required this.repository});

  @override
  State<CompaniesScreen> createState() => _CompaniesScreenState();
}

class _CompaniesScreenState extends State<CompaniesScreen> {
  String _selectedCategory = 'Tümü';

  @override
  Widget build(BuildContext context) {
    final companies = widget.repository.companies;
    final filtered = companies.where((c) {
      if (_selectedCategory == 'Tümü') return true;
      return c.category == _selectedCategory;
    }).toList();

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        // Header
        const Text(
          'Marmara Teknokent Ekosistemi',
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.w800,
            color: TeknokentTheme.textLight,
          ),
        ),
        const SizedBox(height: 4),
        const Text(
          'Bölgemizde faaliyet gösteren Ar-Ge firmaları, kuluçka merkezleri ve inovatif startuplar.',
          style: TextStyle(fontSize: 13, color: TeknokentTheme.textMuted),
        ),
        const SizedBox(height: 16),

        // Filter chips
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(
            children: ['Tümü', 'Ar-Ge Şirketi', 'Startup', 'Kuluçka Merkezi'].map((cat) {
              final isSelected = _selectedCategory == cat;
              return Padding(
                padding: const EdgeInsets.only(right: 8),
                child: FilterChip(
                  label: Text(cat),
                  selected: isSelected,
                  onSelected: (val) {
                    setState(() {
                      _selectedCategory = cat;
                    });
                  },
                  selectedColor: TeknokentTheme.primaryBlue,
                  backgroundColor: const Color(0xFF0F172A),
                  labelStyle: TextStyle(
                    color: isSelected ? Colors.white : TeknokentTheme.textMuted,
                    fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
                  ),
                ),
              );
            }).toList(),
          ),
        ),
        const SizedBox(height: 16),

        // Companies List
        ...filtered.map((Company comp) {
          final staff = widget.repository.getStaffForCompany(comp.id);
          return Card(
            margin: const EdgeInsets.only(bottom: 12),
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Container(
                        width: 44,
                        height: 44,
                        decoration: BoxDecoration(
                          color: const Color(0xFF0F172A),
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(color: TeknokentTheme.borderSubtle),
                        ),
                        alignment: Alignment.center,
                        child: Text(comp.emoji, style: const TextStyle(fontSize: 22)),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              comp.name,
                              style: const TextStyle(
                                fontWeight: FontWeight.w700,
                                fontSize: 16,
                                color: TeknokentTheme.textLight,
                              ),
                            ),
                            Text(
                              '${comp.category} • ${comp.block}',
                              style: const TextStyle(
                                fontSize: 12,
                                color: TeknokentTheme.primaryBlue,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ],
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: const Color(0xFF0F172A),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Text(
                          comp.teamSize,
                          style: const TextStyle(fontSize: 11, color: TeknokentTheme.cyanAccent),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  Text(
                    comp.description,
                    style: const TextStyle(fontSize: 13.5, color: TeknokentTheme.textLight, height: 1.4),
                  ),
                  const SizedBox(height: 14),
                  const Divider(color: TeknokentTheme.borderSubtle, height: 1),
                  const SizedBox(height: 10),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Kayıtlı Kadro: ${staff.length} Personel',
                        style: const TextStyle(
                          fontSize: 12,
                          color: TeknokentTheme.textMuted,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      TextButton.icon(
                        icon: const Icon(Icons.group_outlined, size: 16),
                        label: const Text('Kadroyu İncele', style: TextStyle(fontSize: 12)),
                        onPressed: () {
                          _showStaffModal(context, comp, staff);
                        },
                      ),
                    ],
                  ),
                ],
              ),
            ),
          );
        }),
      ],
    );
  }

  void _showStaffModal(BuildContext context, Company comp, List staff) {
    showModalBottomSheet(
      context: context,
      backgroundColor: TeknokentTheme.darkSurface,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) {
        return Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                '${comp.name} Kadrosu',
                style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w700),
              ),
              const SizedBox(height: 4),
              const Text(
                'Firma tarafından onaylanmış aktif Ar-Ge personelleri.',
                style: TextStyle(fontSize: 12.5, color: TeknokentTheme.textMuted),
              ),
              const SizedBox(height: 16),
              if (staff.isEmpty)
                const Padding(
                  padding: EdgeInsets.symmetric(vertical: 20),
                  child: Center(
                    child: Text(
                      'Bu firmaya ait onaylı personel bulunmamaktadır.',
                      style: TextStyle(color: TeknokentTheme.textMuted),
                    ),
                  ),
                )
              else
                ...staff.map((emp) {
                  return ListTile(
                    contentPadding: EdgeInsets.zero,
                    leading: CircleAvatar(
                      backgroundImage: AssetImage(emp.avatarUrl),
                    ),
                    title: Text(emp.fullName, style: const TextStyle(fontWeight: FontWeight.w600)),
                    subtitle: Text('${emp.title} • @${emp.username}', style: const TextStyle(fontSize: 12)),
                    trailing: const Icon(Icons.verified, size: 16, color: TeknokentTheme.cyanAccent),
                  );
                }),
            ],
          ),
        );
      },
    );
  }
}
