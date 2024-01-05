import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter_slidable/flutter_slidable.dart';
import 'package:golden_diamond/provider/clients_provider.dart';
import 'package:provider/provider.dart';

import '../model/customer.dart';

class CustomersView extends StatefulWidget {
  const CustomersView({super.key});

  @override
  State<CustomersView> createState() => _CustomersViewState();
}

class _CustomersViewState extends State<CustomersView> {
  // Initialize with your customers

  final ScrollController _scrollController = ScrollController();
  Color evenColor = const Color.fromARGB(255, 255, 153, 0);
  Color oddColor = const Color.fromARGB(255, 0, 170, 255);
  Color blue = const Color.fromARGB(255, 0, 32, 52);
  Color gold = const Color.fromARGB(255, 255, 179, 0);

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
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;
    List<Customer> customers = context.watch<ClientsProvider>().clients;

    return Expanded(
      child: customers.isEmpty
          ? Container(
              margin: const EdgeInsets.all(1),
              width: width * 0.7,
              child: const ClipRRect(
                child: Image(
                  image: AssetImage("assets/no_clients.png"),
                  fit: BoxFit.contain,
                ),
              ),
            )
          : ListView.builder(
              controller: _scrollController,
              itemCount: customers.length,
              itemBuilder: (context, index) {
                return Container(
                  margin: const EdgeInsets.only(bottom: 2, right: 6, left: 6),
                  child: Slidable(
                    endActionPane: ActionPane(
                      motion: const StretchMotion(),
                      extentRatio: 0.2,
                      children: [
                        SlidableAction(
                          onPressed: (context) {
                            setState(() {});
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
                                customers[index].company[0],
                                style: const TextStyle(
                                    fontSize: 20,
                                    fontWeight: FontWeight.bold,
                                    color: Color.fromARGB(255, 255, 255, 255)),
                              ),
                            ),
                            const SizedBox(
                              width: 12,
                            ),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  Text(
                                    customers[index].company.toUpperCase(),
                                    style: const TextStyle(
                                        color: Color.fromARGB(255, 0, 40, 108),
                                        fontSize: 16,
                                        fontWeight: FontWeight.bold,
                                        overflow: TextOverflow.ellipsis),
                                  ),
                                  const SizedBox(
                                    height: 6,
                                  ),
                                  Text(
                                    customers[index].surburb,
                                    style: const TextStyle(
                                        color: Color.fromARGB(106, 0, 40, 108),
                                        fontWeight: FontWeight.bold),
                                  ),
                                ],
                              ),
                            ),
                            const SizedBox(
                              width: 12,
                            ),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                const Text(
                                  "BALANCE",
                                  style: TextStyle(
                                      color: Color.fromARGB(255, 0, 40, 108),
                                      fontSize: 16,
                                      fontWeight: FontWeight.bold),
                                ),
                                const SizedBox(
                                  height: 6,
                                ),
                                Text(
                                  "R ${customers[index].balance}",
                                  style: const TextStyle(
                                      color: Color.fromARGB(190, 255, 2, 2),
                                      fontWeight: FontWeight.bold),
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
    );
  }
}
