import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:flutter_slidable/flutter_slidable.dart';
import 'package:golden_diamond/model/invoice.dart';
import 'package:golden_diamond/provider/clients_provider.dart';
import 'package:golden_diamond/provider/invoice_provider.dart';
import 'package:golden_diamond/services/file_manager.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

import '../model/customer.dart';
import '../model/invoice_item.dart';
import '../services/invoice_service.dart';

class UpdateInvoice extends StatefulWidget {
  const UpdateInvoice(
      {super.key, required this.invoice, required this.customer});
  final Invoice invoice;

  final Customer? customer;

  @override
  State<UpdateInvoice> createState() => _UpdateInvoiceState();
}

class _UpdateInvoiceState extends State<UpdateInvoice> {
  final PdfInvoiceService service = PdfInvoiceService();
  int number = 0;
  List<InvoiceItem> items = [
    InvoiceItem(name: "Material", qty: 1, unitPrice: 0),
  ]; // Initialize with your items
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final ScrollController _scrollController = ScrollController();
  bool suggestionToggle = false;

  String formatTimestamp(Timestamp timestamp) {
    if (timestamp == null) {
      return ''; // Handle null timestamp if needed
    }
    DateTime dateTime = timestamp.toDate();
    final DateFormat formatter = DateFormat('dd MMM yyyy');
    return formatter.format(dateTime);
  }

  String date = DateFormat('dd MMM yyyy').format(DateTime.now());

  String total = "0.00";
  Color evenColor = const Color.fromARGB(255, 255, 153, 0);
  Color oddColor = const Color.fromARGB(255, 57, 132, 60);

  @override
  void initState() {
    super.initState();
    total = widget.invoice.invoiceTotal.toStringAsFixed(2);
  }

  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;
    Customer? customer = widget.customer;
    double oldBalance = widget.invoice.balance;

    TextEditingController client =
        TextEditingController(text: widget.customer?.company);
    TextEditingController reference =
        TextEditingController(text: widget.invoice.reference);
    List<String> clients = context.watch<ClientsProvider>().filteredClients;
    items = context.watch<InvoiceController>().items;

    String invoiceNumber = widget.invoice.invoiceNumber;

    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color.fromARGB(255, 6, 57, 83),
        title: Center(
          child: Text(
            " INVOICE${widget.invoice.invoiceNumber}",
            style: const TextStyle(fontWeight: FontWeight.bold),
          ),
        ),
        actions: const [
          Icon(Icons.edit_calendar_outlined),
          SizedBox(
            width: 14,
          )
        ],
      ),
      body: Stack(
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            width: width,
            height: height,
            color: const Color.fromARGB(255, 244, 244, 251),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                const SizedBox(
                  height: 12,
                ),
                Container(
                  padding:
                      const EdgeInsets.symmetric(vertical: 12, horizontal: 8),
                  decoration: BoxDecoration(
                      boxShadow: const [
                        BoxShadow(
                          color: Color.fromARGB(
                              255, 221, 221, 221), // Shadow color
                          blurRadius: 5.0, // Spread radius
                          offset:
                              Offset(0, 1), // Offset in the x and y directions
                        ),
                      ],
                      borderRadius: BorderRadius.circular(12),
                      color: Colors.white),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          SizedBox(
                            height: 40,
                            width: width * 0.6,
                            child: TextFormField(
                              onChanged: (value) async {
                                setState(() {
                                  suggestionToggle = true;
                                });
                                await context
                                    .read<ClientsProvider>()
                                    .onTextChanged(value);
                              },
                              controller: client,
                              textCapitalization: TextCapitalization.words,
                              maxLines: 1,
                              style: const TextStyle(
                                fontSize: 14,
                                overflow: TextOverflow.ellipsis,
                              ),
                              onTapOutside: (PointerDownEvent event) {
                                FocusManager.instance.primaryFocus?.unfocus();
                              },
                              decoration: InputDecoration(
                                icon: const Icon(
                                  Icons.co_present_outlined,
                                  color: Color.fromARGB(255, 0, 64, 107),
                                ),
                                label: const Text(
                                  'customer',
                                  style: TextStyle(
                                    fontSize: 12,
                                    color: Color.fromARGB(255, 0, 64, 107),
                                  ),
                                ),
                                enabledBorder: const OutlineInputBorder(
                                  borderSide: BorderSide(
                                    color: Color.fromARGB(255, 0, 64, 107),
                                    width: 1.9,
                                  ),
                                ),
                                focusedBorder: const OutlineInputBorder(
                                  borderSide: BorderSide(
                                    color: Color.fromARGB(255, 202, 202, 202),
                                    width: 2,
                                  ),
                                ),
                                contentPadding: const EdgeInsets.symmetric(
                                    vertical: 4, horizontal: 8),
                                // Add the suffix icon button here:
                                suffixIcon: IconButton(
                                  onPressed: () {
                                    setState(() {
                                      suggestionToggle = !suggestionToggle;
                                    });
                                  },
                                  icon: suggestionToggle
                                      ? const Icon(
                                          Icons
                                              .arrow_drop_down, // Replace with the icon you want
                                          color: Color.fromARGB(255, 0, 31,
                                              52), // Replace with the desired icon color
                                        )
                                      : const Icon(
                                          Icons
                                              .arrow_drop_up_sharp, // Replace with the icon you want
                                          color: Color.fromARGB(255, 0, 31,
                                              52), // Replace with the desired icon color
                                        ),
                                ),
                              ),
                            ),
                          ),
                          const SizedBox(
                            width: 5,
                          ),
                          SizedBox(
                            height: 40,
                            width: width * 0.3,
                            child: TextField(
                              onTap: () {},
                              textCapitalization: TextCapitalization.words,
                              style: const TextStyle(
                                fontSize: 14,
                                color: Color.fromARGB(255, 2, 82, 136),
                                overflow: TextOverflow.ellipsis,
                              ),
                              controller: reference,
                              decoration: const InputDecoration(
                                label: Text(
                                  'custom reference',
                                  style: TextStyle(
                                    fontSize: 12,
                                    color: Color.fromARGB(255, 0, 64, 107),
                                  ),
                                ),
                                enabledBorder: OutlineInputBorder(
                                  borderSide: BorderSide(
                                      color: Color.fromARGB(255, 2, 82, 136),
                                      width: 1.9), // Change the color here
                                ),
                                focusedBorder: OutlineInputBorder(
                                  borderSide: BorderSide(
                                      color: Color.fromARGB(255, 202, 202, 202),
                                      width: 2), // Change the color here
                                ),
                                contentPadding: EdgeInsets.symmetric(
                                    vertical: 4, horizontal: 8),
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(
                        height: 10,
                      ),
                      Container(
                        width: width,
                        height: 3,
                        color: const Color.fromARGB(99, 76, 119, 175),
                        margin: const EdgeInsets.only(bottom: 8),
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          SizedBox(
                            child: Column(
                              children: [
                                const Text(
                                  "INVOICE TOTAL",
                                  style: TextStyle(
                                    fontSize: 14,
                                    fontWeight: FontWeight.bold,
                                    color: Color.fromARGB(149, 76, 101, 175),
                                  ),
                                ),
                                Text(
                                  "R $total",
                                  style: const TextStyle(
                                    fontSize: 14,
                                    fontWeight: FontWeight.bold,
                                    color: Color.fromARGB(255, 0, 64, 107),
                                  ),
                                )
                              ],
                            ),
                          ),
                          Container(
                            width: 3,
                            height: 40,
                            color: const Color.fromARGB(99, 76, 114, 175),
                          ),
                          SizedBox(
                            child: Column(
                              children: [
                                const Text(
                                  "INVOICE #:",
                                  style: TextStyle(
                                    fontSize: 14,
                                    fontWeight: FontWeight.bold,
                                    color: Color.fromARGB(149, 76, 116, 175),
                                  ),
                                ),
                                Text(
                                  "INV $invoiceNumber",
                                  style: const TextStyle(
                                    fontSize: 14,
                                    fontWeight: FontWeight.bold,
                                    color: Color.fromARGB(255, 0, 64, 107),
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
                Container(
                  width: width,
                  height: 4,
                  color: const Color.fromARGB(142, 255, 145, 0),
                  margin: const EdgeInsets.symmetric(vertical: 12),
                ),
                Text(
                  "YOUR INVOICE ITEMS ( ${items.length.toString()} )",
                  style: const TextStyle(
                      fontWeight: FontWeight.bold, color: Colors.grey),
                ),
                const SizedBox(
                  height: 10,
                ),
                Expanded(
                  child: Form(
                    key: _formKey,
                    child: ListView.builder(
                      controller: _scrollController,
                      itemCount: items.length,
                      itemBuilder: (context, index) {
                        return Container(
                          margin: const EdgeInsets.only(bottom: 2),
                          child: Slidable(
                            endActionPane: ActionPane(
                              motion: const StretchMotion(),
                              extentRatio: 0.2,
                              children: [
                                SlidableAction(
                                  onPressed: (context) {
                                    setState(() {
                                      items.removeAt(index);
                                      total = getTotal();
                                    });
                                  },
                                  borderRadius: BorderRadius.circular(8),
                                  backgroundColor:
                                      const Color.fromARGB(255, 255, 47, 0),
                                  foregroundColor:
                                      const Color.fromARGB(255, 255, 255, 255),
                                  icon: Icons.delete_forever_outlined,
                                  label: 'Delete',
                                  spacing: 8,
                                  padding: const EdgeInsets.all(0),
                                ),
                              ],
                            ),
                            child: Card(
                              margin: const EdgeInsets.all(2),
                              shadowColor:
                                  const Color.fromARGB(255, 230, 230, 230),
                              child: Padding(
                                padding: const EdgeInsets.all(8.0),
                                child: Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    SizedBox(
                                      width: width * 0.7,
                                      child: TextFormField(
                                        initialValue: items[index].name,
                                        maxLines: 3,
                                        decoration: InputDecoration(
                                          labelText: 'Item',
                                          labelStyle: TextStyle(
                                            fontSize: 13,
                                            color: index.isEven
                                                ? evenColor
                                                : oddColor,
                                          ),
                                          enabledBorder: OutlineInputBorder(
                                            borderSide: BorderSide(
                                                color: index.isEven
                                                    ? evenColor
                                                    : oddColor,
                                                width:
                                                    2), // Change the color here
                                          ),
                                          focusedBorder:
                                              const OutlineInputBorder(
                                            borderSide: BorderSide(
                                                color: Color.fromARGB(
                                                    255, 87, 95, 125),
                                                width:
                                                    2), // Change the color here
                                          ),
                                          contentPadding:
                                              const EdgeInsets.symmetric(
                                                  vertical: 8, horizontal: 12),
                                        ),
                                        onChanged: (value) {
                                          items[index].name = value;
                                        },
                                        style: const TextStyle(
                                            fontSize: 14,
                                            fontWeight: FontWeight.w500),
                                      ),
                                    ),
                                    Column(
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceBetween,
                                      children: [
                                        SizedBox(
                                          height: 30,
                                          width: width * 0.2,
                                          child: TextFormField(
                                            initialValue:
                                                items[index].qty.toString(),
                                            onChanged: (value) {
                                              setState(
                                                () {
                                                  if (value.trim() != "") {
                                                    items[index].qty =
                                                        int.parse(value);
                                                    total = getTotal();
                                                    debugPrint(total);
                                                  } else {
                                                    items[index].qty = 0;
                                                    total = getTotal();
                                                    debugPrint(total);
                                                  }
                                                },
                                              );
                                            },
                                            decoration: InputDecoration(
                                              label: const Text('Quantity'),
                                              labelStyle: TextStyle(
                                                fontSize: 13,
                                                color: index.isEven
                                                    ? evenColor
                                                    : oddColor,
                                              ),
                                              enabledBorder: OutlineInputBorder(
                                                borderSide: BorderSide(
                                                    color: index.isEven
                                                        ? evenColor
                                                        : oddColor,
                                                    width:
                                                        2), // Change the color here
                                              ),
                                              focusedBorder:
                                                  const OutlineInputBorder(
                                                borderSide: BorderSide(
                                                    color: Color.fromARGB(
                                                        255, 87, 95, 125),
                                                    width:
                                                        2), // Change the color here
                                              ),
                                            ),
                                            keyboardType: TextInputType.number,
                                            onSaved: (value) {
                                              items[index].qty =
                                                  int.parse(value!);
                                            },
                                            style: const TextStyle(
                                              fontSize: 15,
                                            ),
                                          ),
                                        ),
                                        const SizedBox(
                                          height: 10,
                                        ),
                                        SizedBox(
                                          width: width * 0.2,
                                          height: 30,
                                          child: TextFormField(
                                            onChanged: (value) {
                                              setState(
                                                () {
                                                  if (value.trim() != "") {
                                                    items[index].unitPrice =
                                                        double.parse(value);
                                                    total = getTotal();
                                                    debugPrint(total);
                                                  } else {
                                                    items[index].unitPrice =
                                                        0.00;
                                                    total = getTotal();
                                                    debugPrint(total);
                                                  }
                                                },
                                              );
                                            },
                                            initialValue: items[index]
                                                .unitPrice
                                                .toString(),
                                            decoration: InputDecoration(
                                              labelText: 'Unit Price',
                                              labelStyle: TextStyle(
                                                fontSize: 13,
                                                color: index.isEven
                                                    ? evenColor
                                                    : oddColor,
                                              ),
                                              enabledBorder: OutlineInputBorder(
                                                borderSide: BorderSide(
                                                    color: index.isEven
                                                        ? evenColor
                                                        : oddColor,
                                                    width:
                                                        2), // Change the color here
                                              ),
                                              focusedBorder:
                                                  const OutlineInputBorder(
                                                borderSide: BorderSide(
                                                    color: Color.fromARGB(
                                                        255, 87, 95, 125),
                                                    width:
                                                        2), // Change the color here
                                              ),
                                            ),
                                            keyboardType: TextInputType.number,
                                            onSaved: (value) {
                                              items[index].unitPrice =
                                                  double.parse(value!);
                                            },
                                            style:
                                                const TextStyle(fontSize: 15),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Container(
                      height: 40,
                      width: width * 0.33,
                      alignment: Alignment.center,
                      decoration: BoxDecoration(
                          color: const Color.fromARGB(255, 191, 115, 1),
                          borderRadius: BorderRadius.circular(8)),
                      child: TextButton(
                        onPressed: () async {
                          final finalBalance = double.parse(total) - oldBalance;
                          context.read<InvoiceController>().updateInvoice(
                              context,
                              Invoice(
                                  invoiceNumber: invoiceNumber,
                                  reference: reference.text,
                                  invoiceTotal: double.parse(total),
                                  balance: double.parse(total),
                                  customer: widget.invoice.customer,
                                  date: widget.invoice.date,
                                  uid: widget.invoice.uid),
                              items);
                          context.read<ClientsProvider>().updateClientBalance(
                              widget.customer!.uid,
                              double.parse(finalBalance.toString()));
                          final data = await service.createInvoice(
                              items,
                              customer!,
                              reference.text,
                              invoiceNumber,
                              DateFormat('dd MMM yyyy')
                                  .format(widget.invoice.date.toDate()));
                          FileManager().saveFile(invoiceNumber, data);
                          // service.savePdfFile(invoiceNumber, data);
                        },
                        child: const Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            Icon(
                              Icons.print_outlined,
                              size: 20,
                              color: Colors.white,
                            ),
                            Text(
                              " Save & Print",
                              style: TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold),
                            ),
                          ],
                        ),
                      ),
                    ),
                    Container(
                      height: 40,
                      width: width * 0.26,
                      alignment: Alignment.center,
                      decoration: BoxDecoration(
                        color: Colors.green,
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: TextButton(
                        onPressed: () async {
                          final finalBalance = double.parse(total) - oldBalance;
                          context.read<InvoiceController>().updateInvoice(
                              context,
                              Invoice(
                                  invoiceNumber: invoiceNumber,
                                  reference: reference.text,
                                  invoiceTotal: double.parse(total),
                                  balance: double.parse(total),
                                  customer: widget.invoice.customer,
                                  date: widget.invoice.date,
                                  uid: widget.invoice.uid),
                              items);
                          context.read<ClientsProvider>().updateClientBalance(
                              widget.customer!.uid,
                              double.parse(finalBalance.toString()));
                        },
                        child: const Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            Text(
                              "Save ",
                              style: TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold),
                            ),
                            Icon(
                              Icons.save_outlined,
                              size: 20,
                              color: Colors.white,
                            ),
                          ],
                        ),
                      ),
                    ),
                    Container(
                      alignment: Alignment.center,
                      height: 40,
                      width: width * 0.33,
                      decoration: BoxDecoration(
                          color: const Color.fromARGB(255, 6, 57, 83),
                          borderRadius: BorderRadius.circular(8)),
                      child: TextButton(
                          onPressed: () {
                            setState(() {
                              items.add(
                                InvoiceItem(
                                    name: "Material", qty: 1, unitPrice: 0),
                              );
                              _scrollController.animateTo(
                                _scrollController.position.maxScrollExtent,
                                duration: const Duration(
                                    milliseconds:
                                        100), // Adjust the duration as needed
                                curve: Curves
                                    .easeInOut, // Adjust the curve as needed
                              );
                            });
                          },
                          child: const Row(
                            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                            children: [
                              Text(
                                "New Item ",
                                style: TextStyle(
                                    color: Colors.white,
                                    fontWeight: FontWeight.bold),
                              ),
                              Icon(
                                Icons.library_add_sharp,
                                size: 20,
                                color: Colors.white,
                              ),
                            ],
                          )),
                    ),
                  ],
                ),
                const SizedBox(
                  height: 20,
                )
              ],
            ),
          ),
          Positioned(
            top: 80,
            width: width,
            child: !suggestionToggle
                ? const SizedBox
                    .shrink() // Hide the container when there are no items
                : Container(
                    color: Colors.white,
                    child: ListView.builder(
                      itemCount: clients.length,
                      shrinkWrap: true, // Set shrinkWrap to true
                      itemBuilder: (BuildContext context, int index) {
                        return ListTile(
                          title: Text(
                            clients[index],
                            style: const TextStyle(fontWeight: FontWeight.bold),
                          ),
                          onTap: () {
                            setState(
                              () {
                                suggestionToggle = false;
                              },
                            );
                            customer = context
                                .read<ClientsProvider>()
                                .getClientByName(clients[index])!;
                            // context.read<ClientsProvider>().cleerFilters();
                            client.text = customer!.company;
                            FocusManager.instance.primaryFocus?.unfocus();
                          },
                        );
                      },
                    ),
                  ),
          )
        ],
      ),
    );
  }

  getTotal() => items
      .fold(0.0,
          (double prev, element) => prev + (element.unitPrice * element.qty))
      .toStringAsFixed(2);
}
