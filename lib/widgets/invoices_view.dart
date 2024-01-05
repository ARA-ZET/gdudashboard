import 'dart:math';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:flutter_slidable/flutter_slidable.dart';
import 'package:golden_diamond/model/invoice.dart';
import 'package:golden_diamond/provider/clients_provider.dart';
import 'package:golden_diamond/provider/invoice_provider.dart';
import 'package:golden_diamond/widgets/update_invoice.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

class InvoicesView extends StatefulWidget {
  const InvoicesView({super.key, required this.invEnum});
  final int invEnum;

  @override
  State<InvoicesView> createState() => _InvoicesViewState();
}

class _InvoicesViewState extends State<InvoicesView> {
  // Initialize with your invoices

  final ScrollController _scrollController = ScrollController();
  Color evenColor = const Color.fromARGB(255, 255, 153, 0);
  Color oddColor = const Color.fromARGB(255, 0, 170, 255);
  Color blue = const Color.fromARGB(255, 0, 32, 52);
  Color gold = const Color.fromARGB(255, 255, 179, 0);

  String formatTimestamp(Timestamp timestamp) {
    DateTime dateTime = timestamp.toDate();
    final DateFormat formatter = DateFormat('dd MMM yyyy');
    return formatter.format(dateTime);
  }

  List<Color> randomColors = [
    const Color.fromARGB(144, 144, 82, 82),
    const Color.fromARGB(146, 138, 122, 85),
    const Color.fromARGB(255, 89, 120, 81),
    const Color.fromARGB(125, 63, 102, 130),
    const Color.fromARGB(141, 131, 63, 152),
  ];
  Color getRandomColor() {
    Random random = Random();
    int index = random.nextInt(randomColors.length);
    return randomColors[index];
  }

  @override
  void initState() {
    super.initState();
  }

  bool isSameDate(DateTime date1, DateTime date2) {
    return date1.year == date2.year &&
        date1.month == date2.month &&
        date1.day == date2.day;
  }

  String formatDate(DateTime dateTime) {
    final now = DateTime.now();
    final difference = now.difference(dateTime);

    if (dateTime.year == now.year &&
        dateTime.month == now.month &&
        dateTime.day == now.day) {
      return 'Today';
    } else if (dateTime.year == now.year &&
        dateTime.month == now.month &&
        dateTime.day == now.day - 1) {
      return 'Yesterday';
    } else if (difference.inDays < 7) {
      final dayOfWeek = DateFormat('EEEE').format(dateTime);
      return dayOfWeek;
    } else {
      final formatter = DateFormat('MMM dd, yyyy');
      return formatter.format(dateTime);
    }
  }

  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;
    List<Invoice> invoices = context.watch<InvoiceController>().invoices;
    List<Invoice> outstandingInvoices =
        context.watch<InvoiceController>().outstandingInvoices;
    List<List<Invoice>> currentShowing = [invoices, outstandingInvoices];

    return Expanded(
      child: currentShowing[widget.invEnum].isEmpty
          ? Container(
              margin: const EdgeInsets.all(1),
              width: width * 0.7,
              child: const ClipRRect(
                child: Image(
                  image: AssetImage("assets/no_invoices.png"),
                  fit: BoxFit.contain,
                ),
              ),
            )
          : ListView.builder(
              controller: _scrollController,
              itemCount: currentShowing[widget.invEnum].length,
              itemBuilder: (context, index) {
                final invoice = currentShowing[widget.invEnum][index];
                final previousInvoice = index > 0
                    ? currentShowing[widget.invEnum][index - 1]
                    : null;
                final showDateSeparator = previousInvoice == null ||
                    !isSameDate(
                        invoice.date.toDate(), previousInvoice.date.toDate());
                return Column(
                  children: [
                    if (showDateSeparator)
                      Wrap(
                        children: [
                          Container(
                            decoration: BoxDecoration(
                                color: const Color.fromARGB(255, 160, 175, 183),
                                borderRadius: BorderRadius.circular(8)),
                            padding: const EdgeInsets.symmetric(
                                horizontal: 16, vertical: 4),
                            margin: EdgeInsets.all(8),
                            child: Text(
                              formatDate(invoice.date
                                  .toDate()), // Format date as needed
                              style: const TextStyle(
                                fontSize: 14,
                                color: Colors.white,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ),
                        ],
                      ),
                    Container(
                      margin:
                          const EdgeInsets.only(bottom: 2, right: 6, left: 6),
                      child: Slidable(
                        endActionPane: ActionPane(
                          motion: const StretchMotion(),
                          extentRatio: 0.2,
                          children: [
                            SlidableAction(
                              onPressed: (context) {
                                final eInv = Invoice(
                                    invoiceNumber:
                                        currentShowing[widget.invEnum][index]
                                            .invoiceNumber,
                                    reference: currentShowing[widget.invEnum]
                                            [index]
                                        .reference,
                                    invoiceTotal: currentShowing[widget.invEnum]
                                            [index]
                                        .invoiceTotal,
                                    balance: currentShowing[widget.invEnum]
                                            [index]
                                        .balance,
                                    customer: currentShowing[widget.invEnum]
                                            [index]
                                        .customer,
                                    date: currentShowing[widget.invEnum][index]
                                        .date,
                                    uid: currentShowing[widget.invEnum][index]
                                        .uid);
                                final eCustomer = context
                                    .read<ClientsProvider>()
                                    .getClientByName(
                                        currentShowing[widget.invEnum][index]
                                            .customer);
                                context
                                    .read<InvoiceController>()
                                    .getInvoicesItems(
                                        currentShowing[widget.invEnum][index]
                                            .uid);
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) => UpdateInvoice(
                                        invoice: eInv, customer: eCustomer),
                                  ),
                                );
                              },
                              borderRadius: BorderRadius.circular(8),
                              backgroundColor:
                                  const Color.fromARGB(255, 0, 69, 148),
                              foregroundColor:
                                  const Color.fromARGB(255, 255, 255, 255),
                              icon: Icons.edit_calendar_outlined,
                              label: 'Edit',
                              spacing: 8,
                              padding: const EdgeInsets.all(0),
                            ),
                          ],
                        ),
                        child: Card(
                          margin: const EdgeInsets.all(2),
                          shadowColor: const Color.fromARGB(255, 230, 230, 230),
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Container(
                                  width: 60,
                                  height: 60,
                                  alignment: Alignment.center,
                                  decoration: BoxDecoration(
                                    color: getRandomColor(),
                                    borderRadius: BorderRadius.circular(20),
                                  ),
                                  child: Text(
                                    currentShowing[widget.invEnum][index]
                                        .customer[0],
                                    style: const TextStyle(
                                        fontSize: 20,
                                        fontWeight: FontWeight.bold,
                                        color:
                                            Color.fromARGB(255, 255, 255, 255)),
                                  ),
                                ),
                                const SizedBox(
                                  width: 16,
                                ),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      Text(
                                        currentShowing[widget.invEnum][index]
                                            .customer
                                            .toUpperCase(),
                                        style: const TextStyle(
                                            color:
                                                Color.fromARGB(255, 0, 40, 108),
                                            fontSize: 16,
                                            fontWeight: FontWeight.bold,
                                            overflow: TextOverflow.ellipsis),
                                      ),
                                      const SizedBox(
                                        height: 6,
                                      ),
                                      Text(
                                        formatTimestamp(
                                            currentShowing[widget.invEnum]
                                                    [index]
                                                .date),
                                        style: const TextStyle(
                                            color:
                                                Color.fromARGB(106, 0, 40, 108),
                                            fontWeight: FontWeight.bold,
                                            fontSize: 13,
                                            fontStyle: FontStyle.italic),
                                      ),
                                      Text(
                                        "INV ${currentShowing[widget.invEnum][index].invoiceNumber}",
                                        style: const TextStyle(
                                            color:
                                                Color.fromARGB(106, 0, 40, 108),
                                            fontWeight: FontWeight.bold,
                                            fontSize: 14,
                                            fontStyle: FontStyle.italic),
                                      ),
                                    ],
                                  ),
                                ),
                                const SizedBox(
                                  width: 12,
                                ),
                                Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    const Text(
                                      "BALANCE",
                                      style: TextStyle(
                                          color:
                                              Color.fromARGB(255, 0, 40, 108),
                                          fontSize: 16,
                                          fontWeight: FontWeight.bold),
                                    ),
                                    const SizedBox(
                                      height: 6,
                                    ),
                                    Text(
                                      "R ${currentShowing[widget.invEnum][index].balance.toStringAsFixed(2)}",
                                      style: const TextStyle(
                                          color: Color.fromARGB(255, 221, 1, 1),
                                          fontWeight: FontWeight.bold,
                                          fontSize: 12),
                                    ),
                                    const Text(
                                      'Outstanding',
                                      style: TextStyle(
                                          color: Color.fromARGB(255, 221, 1, 1),
                                          fontWeight: FontWeight.bold,
                                          fontStyle: FontStyle.italic,
                                          fontSize: 12),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                );
              },
            ),
    );
  }
}
