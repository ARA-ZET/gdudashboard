import 'package:flutter/material.dart';
import 'package:golden_diamond/widgets/customer_view.dart';

import '../../widgets/new_client.dart';

class Clients extends StatefulWidget {
  const Clients({super.key});

  @override
  State<Clients> createState() => _ClientsState();
}

class _ClientsState extends State<Clients> {
  List<Widget> clientScreens = [const CustomersView(), const NewClient()];

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
          color: const Color.fromARGB(255, 235, 241, 249),
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
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        SizedBox(
                          width: 100,
                          height: 100,
                          child: ClipRRect(
                            borderRadius: BorderRadius.circular(8),
                            child: Image.asset(
                              "assets/logo.png",
                              fit: BoxFit.fitHeight,
                            ),
                          ),
                        ),
                        const Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              "GOLDEN DIAMOND UPHOSTERY",
                              style: TextStyle(
                                fontSize: 14,
                                fontWeight: FontWeight.bold,
                                color: Color.fromARGB(255, 255, 179, 0),
                              ),
                            ),
                            SizedBox(
                              height: 2,
                            ),
                            Text(
                              "Khayelistha Traing Center",
                              overflow: TextOverflow.ellipsis,
                              style: TextStyle(
                                fontSize: 14,
                                fontWeight: FontWeight.bold,
                                color: Color.fromARGB(200, 255, 179, 0),
                              ),
                            ),
                            SizedBox(
                              height: 2,
                            ),
                            Text(
                              "CELL: +27 81 572 3431",
                              style: TextStyle(
                                fontSize: 14,
                                fontWeight: FontWeight.bold,
                                color: Color.fromARGB(200, 255, 179, 0),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                    const SizedBox(
                      height: 12,
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Container(
                          height: 40,
                          alignment: Alignment.center,
                          padding: const EdgeInsets.all(4),
                          decoration: BoxDecoration(
                              color: const Color.fromARGB(255, 6, 57, 83),
                              borderRadius: BorderRadius.circular(12)),
                          child: Row(
                            children: [
                              const Icon(
                                Icons.person,
                                color: Colors.white,
                              ),
                              TextButton(
                                  onPressed: () {
                                    onTap(0);
                                  },
                                  child: const Text(
                                    "Clients",
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
                          padding: const EdgeInsets.all(4),
                          decoration: BoxDecoration(
                              color: const Color.fromARGB(255, 6, 57, 83),
                              borderRadius: BorderRadius.circular(12)),
                          child: Row(
                            children: [
                              const Icon(
                                Icons.person,
                                color: Colors.white,
                              ),
                              TextButton(
                                  onPressed: () {},
                                  child: const Text(
                                    "Supliers",
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
                              onTap(1);
                            },
                            icon: const Icon(
                              Icons.group_add_outlined,
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
                              Icons.person_search,
                              color: Colors.white,
                            ),
                          ),
                        ),
                      ],
                    )
                  ],
                ),
              ),
              clientScreens[currentIndex],
            ],
          ),
        ),
      ),
    );
  }
}
