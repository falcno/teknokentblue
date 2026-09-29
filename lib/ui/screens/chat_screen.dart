import 'package:flutter/material.dart';
import '../../core/theme.dart';
import '../../data/teknokent_repository.dart';
import '../../data/models/user_model.dart';
import '../../data/models/chat_model.dart';
import '../widgets/avatar_widget.dart';

class ChatScreen extends StatefulWidget {
  final TeknokentRepository repository;

  const ChatScreen({super.key, required this.repository});

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  User? _activeRecipient;
  final TextEditingController _msgController = TextEditingController();
  final ScrollController _scrollController = ScrollController();

  @override
  void initState() {
    super.initState();
    final contacts = widget.repository.getAvailableContacts();
    if (contacts.isNotEmpty) {
      _activeRecipient = contacts.first;
    }
  }

  @override
  void dispose() {
    _msgController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  void _sendMessage() {
    final text = _msgController.text.trim();
    if (text.isEmpty || _activeRecipient == null) return;

    widget.repository.sendMessage(_activeRecipient!.username, text);
    _msgController.clear();
    setState(() {});

    // Scroll to bottom
    Future.delayed(const Duration(milliseconds: 100), () {
      if (_scrollController.hasClients) {
        _scrollController.jumpTo(_scrollController.position.maxScrollExtent);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final contacts = widget.repository.getAvailableContacts();
    final user = widget.repository.currentUser!;

    return Scaffold(
      backgroundColor: Colors.transparent,
      body: Row(
        children: [
          // Sol Taraf: Sohbet Listesi
          SizedBox(
            width: 300,
            child: Container(
              decoration: const BoxDecoration(
                border: Border(right: BorderSide(color: TeknokentTheme.borderSubtle)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Padding(
                    padding: EdgeInsets.all(16),
                    child: Text(
                      'Mesajlar',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w800,
                        color: TeknokentTheme.textLight,
                      ),
                    ),
                  ),
                  Expanded(
                    child: ListView.separated(
                      itemCount: contacts.length,
                      separatorBuilder: (_, __) => const Divider(
                        color: TeknokentTheme.borderSubtle,
                        height: 1,
                        indent: 64,
                      ),
                      itemBuilder: (context, index) {
                        final contact = contacts[index];
                        final isSelected = _activeRecipient?.username == contact.username;
                        return ListTile(
                          selected: isSelected,
                          selectedTileColor: TeknokentTheme.primaryBlue.withOpacity(0.12),
                          onTap: () {
                            setState(() {
                              _activeRecipient = contact;
                            });
                          },
                          leading: AvatarWidget(
                            imagePath: contact.avatarUrl,
                            radius: 20,
                            showOnline: true,
                          ),
                          title: Text(
                            contact.fullName,
                            style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 13.5),
                            overflow: TextOverflow.ellipsis,
                          ),
                          subtitle: Text(
                            '${contact.companyName} • @${contact.username}',
                            style: const TextStyle(fontSize: 11.5, color: TeknokentTheme.textMuted),
                            overflow: TextOverflow.ellipsis,
                          ),
                        );
                      },
                    ),
                  ),
                ],
              ),
            ),
          ),

          // Sağ Taraf: Aktif Konuşma
          Expanded(
            child: _activeRecipient == null
                ? const Center(child: Text('Sohbet başlatmak için bir kişi seçin'))
                : Column(
                    children: [
                      // Chat Header
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                        decoration: const BoxDecoration(
                          color: Color(0xFF0F172A),
                          border: Border(bottom: BorderSide(color: TeknokentTheme.borderSubtle)),
                        ),
                        child: Row(
                          children: [
                            AvatarWidget(
                              imagePath: _activeRecipient!.avatarUrl,
                              radius: 18,
                              showOnline: true,
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    _activeRecipient!.fullName,
                                    style: const TextStyle(
                                      fontWeight: FontWeight.w700,
                                      fontSize: 14.5,
                                    ),
                                  ),
                                  Text(
                                    '${_activeRecipient!.title} • ${_activeRecipient!.companyName}',
                                    style: const TextStyle(
                                      fontSize: 11.5,
                                      color: TeknokentTheme.primaryBlue,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                              decoration: BoxDecoration(
                                color: TeknokentTheme.successGreen.withOpacity(0.15),
                                borderRadius: BorderRadius.circular(10),
                              ),
                              child: const Text(
                                'Çevrim İçi',
                                style: TextStyle(
                                  color: TeknokentTheme.successGreen,
                                  fontSize: 11,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),

                      // Messages List
                      Expanded(
                        child: Builder(
                          builder: (context) {
                            final messages = widget.repository
                                .getConversationWith(_activeRecipient!.username);

                            if (messages.isEmpty) {
                              return Center(
                                child: Text(
                                  '${_activeRecipient!.fullName} ile henüz mesajlaşmadınız.\nİlk mesajı gönderin!',
                                  textAlign: TextAlign.center,
                                  style: const TextStyle(
                                    color: TeknokentTheme.textMuted,
                                    fontSize: 13,
                                  ),
                                ),
                              );
                            }

                            return ListView.builder(
                              controller: _scrollController,
                              padding: const EdgeInsets.all(16),
                              itemCount: messages.length,
                              itemBuilder: (context, index) {
                                final msg = messages[index];
                                final isMe = msg.senderUsername == user.username;

                                return Align(
                                  alignment: isMe ? Alignment.centerRight : Alignment.centerLeft,
                                  child: Container(
                                    margin: const EdgeInsets.only(bottom: 10),
                                    constraints: const BoxConstraints(maxWidth: 420),
                                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                                    decoration: BoxDecoration(
                                      color: isMe
                                          ? TeknokentTheme.primaryBlue
                                          : const Color(0xFF1E293B),
                                      borderRadius: BorderRadius.only(
                                        topLeft: const Radius.circular(14),
                                        topRight: const Radius.circular(14),
                                        bottomLeft: Radius.circular(isMe ? 14 : 2),
                                        bottomRight: Radius.circular(isMe ? 2 : 14),
                                      ),
                                    ),
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          msg.text,
                                          style: const TextStyle(
                                            color: Colors.white,
                                            fontSize: 13.5,
                                            height: 1.35,
                                          ),
                                        ),
                                        const SizedBox(height: 4),
                                        Text(
                                          '${msg.createdAt.hour.toString().padLeft(2, '0')}:${msg.createdAt.minute.toString().padLeft(2, '0')}',
                                          style: TextStyle(
                                            color: Colors.white.withOpacity(0.65),
                                            fontSize: 10,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                );
                              },
                            );
                          },
                        ),
                      ),

                      // Input Bar
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: const BoxDecoration(
                          color: Color(0xFF0F172A),
                          border: Border(top: BorderSide(color: TeknokentTheme.borderSubtle)),
                        ),
                        child: Row(
                          children: [
                            Expanded(
                              child: TextField(
                                controller: _msgController,
                                decoration: const InputDecoration(
                                  hintText: 'Mesajınızı yazın...',
                                  contentPadding: EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                                ),
                                onSubmitted: (_) => _sendMessage(),
                              ),
                            ),
                            const SizedBox(width: 8),
                            IconButton(
                              icon: const Icon(Icons.send, color: TeknokentTheme.primaryBlue),
                              onPressed: _sendMessage,
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
          ),
        ],
      ),
    );
  }
}
