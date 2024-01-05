import 'package:flutter/material.dart';
import 'package:golden_diamond/provider/invoice_provider.dart';
import 'package:golden_diamond/services/invoice_service.dart';
import 'package:provider/provider.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final PdfInvoiceService service = PdfInvoiceService();

  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;
    int numOfInvoices = context.watch<InvoiceController>().numOfInvoices;
    String invoicesTotal = context.watch<InvoiceController>().invoicesTotal;

    return Scaffold(
      backgroundColor: const Color.fromARGB(255, 255, 179, 0),
      body: SafeArea(
        child: Container(
          color: const Color.fromARGB(255, 0, 32, 52),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Container(
                height: 175,
                width: width,
                padding: const EdgeInsets.all(18),
                decoration: const BoxDecoration(
                  borderRadius: BorderRadius.only(
                    bottomLeft: Radius.circular(40),
                  ),
                  color: Color.fromARGB(255, 255, 179, 0),
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Container(
                      margin: const EdgeInsets.all(1),
                      width: width * 0.9,
                      child: const ClipRRect(
                        child: Image(
                          image: AssetImage("assets/gdulogo.png"),
                          fit: BoxFit.fitHeight,
                        ),
                      ),
                    ),
                    Container(
                      margin: const EdgeInsets.symmetric(vertical: 8),
                      child: const Column(
                        children: [
                          Text(
                            "BUSSINESS DASHBOARD",
                            style: TextStyle(
                              color: Color.fromARGB(255, 0, 31, 52),
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(
                height: 24,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  Container(
                    height: width * 0.45,
                    width: width * 0.3,
                    decoration: BoxDecoration(
                      color: const Color.fromARGB(255, 255, 255, 255),
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        Container(
                          margin: const EdgeInsets.all(1),
                          padding: const EdgeInsets.all(12),
                          child: const ClipRRect(
                            child: Image(
                              image: AssetImage("assets/invoice_icon.png"),
                              fit: BoxFit.contain,
                            ),
                          ),
                        ),
                        Text(
                          "${numOfInvoices.toString()} \nINVOICES",
                          textAlign: TextAlign.center,
                          style: const TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 14,
                            color: Color.fromARGB(255, 51, 145, 4),
                          ),
                        )
                      ],
                    ),
                  ),
                  Container(
                    height: width * 0.45,
                    width: width * 0.3,
                    decoration: BoxDecoration(
                      color: const Color.fromARGB(255, 255, 255, 255),
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        Container(
                          margin: const EdgeInsets.all(1),
                          padding: const EdgeInsets.all(12),
                          child: ClipRRect(
                            borderRadius: BorderRadius.circular(width * 0.8),
                            child: const Image(
                              image: AssetImage("assets/sales.png"),
                              fit: BoxFit.contain,
                            ),
                          ),
                        ),
                        Text(
                          "R $invoicesTotal \nTOTAL SALES",
                          textAlign: TextAlign.center,
                          style: const TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 14,
                            color: Color.fromARGB(255, 62, 126, 166),
                          ),
                        )
                      ],
                    ),
                  ),
                  Container(
                    height: width * 0.45,
                    width: width * 0.3,
                    decoration: BoxDecoration(
                      color: const Color.fromARGB(255, 255, 255, 255),
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        Container(
                          margin: const EdgeInsets.all(1),
                          padding: const EdgeInsets.all(12),
                          child: ClipRRect(
                            borderRadius: BorderRadius.circular(width * 0.8),
                            child: const Image(
                              image: AssetImage("assets/cost_of_sales.png"),
                              fit: BoxFit.contain,
                            ),
                          ),
                        ),
                        const Text(
                          "COST \nOF SALES",
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 14,
                            color: Color.fromARGB(255, 222, 155, 0),
                          ),
                        )
                      ],
                    ),
                  ),
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}
