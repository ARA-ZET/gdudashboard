import 'package:flutter/material.dart';
import 'package:golden_diamond/screen/Dialogues/add_employee.dart';

import 'package:golden_diamond/screen/Dialogues/record_expenses.dart';
import 'package:golden_diamond/services/invoice_service.dart';

class Profile extends StatefulWidget {
  const Profile({Key? key}) : super(key: key);

  @override
  State<Profile> createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {
  final PdfInvoiceService service = PdfInvoiceService();

  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;

    return Scaffold(
      backgroundColor: const Color.fromARGB(255, 255, 179, 0),
      body: SafeArea(
        child: Container(
          color: const Color.fromARGB(255, 0, 32, 52),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Container(
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
                      child: const ClipRRect(
                        child: Image(
                          image: AssetImage("assets/gdulogo.png"),
                          fit: BoxFit.fill,
                        ),
                      ),
                    ),
                    Container(
                      margin: const EdgeInsets.symmetric(vertical: 8),
                      child: const Column(
                        children: [],
                      ),
                    ),
                  ],
                ),
              ),
              Container(
                height: 3,
                width: width,
                margin:
                    const EdgeInsets.symmetric(horizontal: 12, vertical: 24),
                color: const Color.fromARGB(255, 255, 179, 0),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  GestureDetector(
                    onTap: () {
                      showDialog(
                        context: context,
                        builder: (BuildContext context) {
                          return const AddEmployee();
                        },
                      );
                    },
                    child: Container(
                      height: width * 0.3,
                      width: width * 0.3,
                      decoration: BoxDecoration(
                        color: const Color.fromARGB(255, 255, 179, 0),
                        borderRadius: BorderRadius.circular(16),
                      ),
                      child: const Column(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: [
                          Icon(
                            Icons.business_center,
                            size: 40,
                            color: Color.fromARGB(255, 0, 32, 52),
                          ),
                          Text(
                            "GDU Team",
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 14,
                              color: Color.fromARGB(255, 0, 32, 52),
                            ),
                          )
                        ],
                      ),
                    ),
                  ),
                  Container(
                    height: width * 0.3,
                    width: width * 0.3,
                    decoration: BoxDecoration(
                      color: const Color.fromARGB(255, 255, 179, 0),
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: const Column(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        Icon(
                          Icons.people_alt,
                          size: 40,
                          color: Color.fromARGB(255, 0, 32, 52),
                        ),
                        Text(
                          "GDU Team",
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 14,
                            color: Color.fromARGB(255, 0, 32, 52),
                          ),
                        )
                      ],
                    ),
                  ),
                  Container(
                    height: width * 0.3,
                    width: width * 0.3,
                    decoration: BoxDecoration(
                      color: const Color.fromARGB(255, 255, 179, 0),
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: const Column(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        Icon(
                          Icons.handyman_outlined,
                          size: 40,
                          color: Color.fromARGB(255, 0, 32, 52),
                        ),
                        Text(
                          "Tools And Equipments",
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 14,
                            color: Color.fromARGB(255, 0, 32, 52),
                          ),
                        )
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(
                height: 16,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
