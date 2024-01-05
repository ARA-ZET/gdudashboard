import 'package:flutter/material.dart';
import 'package:golden_diamond/provider/clients_provider.dart';
import 'package:golden_diamond/provider/invoice_provider.dart';
import 'package:golden_diamond/screen/Navpages/banking.dart';
import 'package:golden_diamond/screen/Navpages/clients.dart';
import 'package:golden_diamond/screen/Navpages/home_page.dart';
import 'package:golden_diamond/screen/Navpages/invoices.dart';
import 'package:golden_diamond/screen/Navpages/profife.dart';
import 'package:provider/provider.dart';

class RootPage extends StatefulWidget {
  const RootPage({
    super.key,
  });

  @override
  State<RootPage> createState() => _RootPageState();
}

class _RootPageState extends State<RootPage> {
  List<Widget> pages = [
    const HomePage(),
    const Invoices(),
    const Clients(),
    const Banking(),
    const Profile(),
  ];

  int currentIndex = 0;

  @override
  void initState() {
    super.initState();

    // Delay the initialization logic to the next frame
    WidgetsBinding.instance.addPostFrameCallback((_) {
      Provider.of<ClientsProvider>(context, listen: false).getClients();
      Provider.of<InvoiceController>(context, listen: false)
        ..getInvNumber()
        ..getInvoices();
    });
  }

// change index when toggle
  void onTap(int index) async {
    setState(() {
      currentIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: pages[currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        backgroundColor: const Color.fromARGB(255, 0, 32, 52),
        onTap: onTap,
        currentIndex: currentIndex,
        selectedLabelStyle: const TextStyle(fontWeight: FontWeight.bold),
        selectedItemColor: const Color.fromARGB(255, 255, 179, 0),
        unselectedItemColor: const Color.fromARGB(133, 0, 32, 52),
        showUnselectedLabels: true,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: "Home"),
          BottomNavigationBarItem(
              icon: Icon(Icons.save_outlined), label: "Invoices"),
          BottomNavigationBarItem(
              icon: Icon(Icons.cases_rounded), label: "Clients"),
          BottomNavigationBarItem(
              icon: Icon(Icons.insert_chart_outlined), label: "Banking"),
          BottomNavigationBarItem(
              icon: Icon(Icons.co_present_outlined), label: "Admin"),
        ],
      ),
    );
  }
}
