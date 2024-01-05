import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:golden_diamond/firebase_options.dart';
import 'package:golden_diamond/provider/employees_provider.dart';
import 'package:golden_diamond/provider/expenses_provider.dart';
import 'package:golden_diamond/screen/wrapper.dart';
import 'package:provider/provider.dart';

import 'provider/clients_provider.dart';
import 'provider/invoice_provider.dart';
import 'services/auth_services.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(MultiProvider(providers: [
    ChangeNotifierProvider(
      create: (_) => InvoiceController(),
    ),
    ChangeNotifierProvider(
      create: (_) => ClientsProvider(),
    ),
    ChangeNotifierProvider(
      create: (_) => EmployeesController(),
    ),
    ChangeNotifierProvider(
      create: (_) => ExpensesController(),
    ),
    StreamProvider.value(
      value: AuthService().user,
      initialData: null,
      catchError: (context, error) {
        return null;
      },
    ),
  ], child: const MyApp()));
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.green,
      ),
      home: const Wrapper(),
    );
  }
}
