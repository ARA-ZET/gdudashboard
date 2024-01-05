import 'package:flutter/material.dart';
import 'package:golden_diamond/model/invoice_item.dart';
import '../../widgets/invoices_view.dart';
import '../../widgets/new_invoice.dart';

class Invoices extends StatefulWidget {
  const Invoices({super.key});

  @override
  State<Invoices> createState() => _InvoicesState();
}

class _InvoicesState extends State<Invoices> {
  List<InvoiceItem> items = [
    InvoiceItem(name: "Material", qty: 1, unitPrice: 0),
  ];
  List<Widget> invoiceScreens = [
    const InvoicesView(
      invEnum: 0,
    ),
    const InvoicesView(
      invEnum: 1,
    ),
    const NewInvoice()
  ];

  String total = "0.00";
  int currentIndex = 0;

  // change index when toggle
  void onTap(int index) async {
    setState(() {
      currentIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;

    return Scaffold(
      backgroundColor: const Color.fromARGB(255, 0, 32, 52),
      body: SafeArea(
        child: Container(
          width: width,
          height: height,
          color: const Color.fromARGB(255, 244, 245, 251),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Container(
                padding: const EdgeInsets.all(12),
                decoration: const BoxDecoration(
                    borderRadius: BorderRadius.only(
                      bottomLeft: Radius.circular(12),
                      bottomRight: Radius.circular(12),
                    ),
                    color: Color.fromARGB(255, 0, 32, 52)),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const SizedBox(
                      height: 12,
                    ),
                    const Row(
                      children: [
                        Text(
                          "PROCESS INVOICES",
                          style: TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 20,
                              color: Color.fromARGB(255, 255, 255, 255)),
                        ),
                        SizedBox(
                          width: 12,
                        ),
                        Icon(
                          Icons.edit_calendar_rounded,
                          color: Colors.white,
                        ),
                      ],
                    ),
                    const SizedBox(
                      height: 16,
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Container(
                          height: 40,
                          alignment: Alignment.center,
                          padding: const EdgeInsets.all(2),
                          decoration: BoxDecoration(
                              color: const Color.fromARGB(255, 6, 57, 83),
                              borderRadius: BorderRadius.circular(12)),
                          child: Row(
                            children: [
                              const Icon(
                                Icons.event_note,
                                color: Colors.white,
                              ),
                              TextButton(
                                  onPressed: () {
                                    onTap(0);
                                  },
                                  child: const Text(
                                    "All",
                                    style: TextStyle(
                                        fontWeight: FontWeight.bold,
                                        color: Colors.white),
                                  )),
                            ],
                          ),
                        ),
                        Container(
                          height: 40,
                          alignment: Alignment.center,
                          padding: const EdgeInsets.all(2),
                          decoration: BoxDecoration(
                              color: const Color.fromARGB(255, 6, 57, 83),
                              borderRadius: BorderRadius.circular(12)),
                          child: Row(
                            children: [
                              const Icon(
                                Icons.money_off,
                                color: Colors.white,
                              ),
                              TextButton(
                                  onPressed: () {
                                    onTap(1);
                                  },
                                  child: const Text(
                                    "Outstanding",
                                    style: TextStyle(
                                        fontWeight: FontWeight.bold,
                                        color: Colors.white),
                                  )),
                            ],
                          ),
                        ),
                        Container(
                          height: 40,
                          alignment: Alignment.center,
                          decoration: BoxDecoration(
                              color: const Color.fromARGB(255, 6, 57, 83),
                              borderRadius: BorderRadius.circular(12)),
                          child: IconButton(
                            onPressed: () {
                              onTap(2);
                            },
                            icon: const Icon(
                              Icons.note_add_outlined,
                              color: Colors.white,
                            ),
                          ),
                        ),
                        Container(
                          height: 40,
                          alignment: Alignment.center,
                          decoration: BoxDecoration(
                              color: const Color.fromARGB(255, 6, 57, 83),
                              borderRadius: BorderRadius.circular(12)),
                          child: IconButton(
                            onPressed: () {},
                            icon: const Icon(
                              Icons.content_paste_search_outlined,
                              color: Colors.white,
                            ),
                          ),
                        ),
                      ],
                    )
                  ],
                ),
              ),
              const SizedBox(
                height: 12,
              ),
              invoiceScreens[currentIndex],
            ],
          ),
        ),
      ),
    );
  }

  getTotal() => items
      .fold(0.0,
          (double prev, element) => prev + (element.unitPrice * element.qty))
      .toStringAsFixed(2);
}
