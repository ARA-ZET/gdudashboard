import 'package:flutter/material.dart';
import 'package:golden_diamond/model/gdu_team.dart';
import 'package:golden_diamond/screen/root_page.dart';
import 'package:provider/provider.dart';
import 'Auth/signin.dart';

class Wrapper extends StatelessWidget {
  const Wrapper({super.key});

  @override
  Widget build(BuildContext context) {
    final user = Provider.of<GduTeam?>(context, listen: true);

    // change route based on weather the user is logged on not
    if (user == null) {
      return const AuthScreen();
    } else {
      return const RootPage();
    }
  }
}
