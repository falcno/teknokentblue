import 'package:flutter/material.dart';
import 'core/theme.dart';
import 'core/constants.dart';
import 'data/teknokent_repository.dart';
import 'ui/screens/login_screen.dart';
import 'ui/screens/main_layout_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const MarmaraTeknokentApp());
}

class MarmaraTeknokentApp extends StatefulWidget {
  const MarmaraTeknokentApp({super.key});

  @override
  State<MarmaraTeknokentApp> createState() => _MarmaraTeknokentAppState();
}

class _MarmaraTeknokentAppState extends State<MarmaraTeknokentApp> {
  late final TeknokentRepository _repository;

  @override
  void initState() {
    super.initState();
    _repository = TeknokentRepository();
  }

  @override
  Widget build(BuildContext context) {
    return ListenableBuilder(
      listenable: _repository,
      builder: (context, _) {
        return MaterialApp(
          title: AppConstants.appName,
          debugShowCheckedModeBanner: false,
          theme: TeknokentTheme.darkTheme,
          home: _repository.isAuthenticated
              ? MainLayoutScreen(repository: _repository)
              : LoginScreen(repository: _repository),
        );
      },
    );
  }
}
