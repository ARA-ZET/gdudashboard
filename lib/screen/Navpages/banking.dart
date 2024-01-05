import 'package:flutter/material.dart';
import 'package:golden_diamond/screen/Dialogues/record_expenses.dart';
import 'package:golden_diamond/services/invoice_service.dart';

class Banking extends StatefulWidget {
  const Banking({Key? key}) : super(key: key);

  @override
  State<Banking> createState() => _BankingState();
}

class _BankingState extends State<Banking> {
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
                            "BANKING DASHBOARD",
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
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => const RecordExpense(
                              category: "wages and bonuses"),
                        ),
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
                            Icons.people_alt,
                            size: 40,
                            color: Color.fromARGB(255, 0, 32, 52),
                          ),
                          Text(
                            "Wages\n And Saliries",
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
                          Icons.fastfood_rounded,
                          size: 40,
                          color: Color.fromARGB(255, 0, 32, 52),
                        ),
                        Text(
                          "Workshop Groceries",
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
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
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
                          Icons.emoji_transportation_rounded,
                          size: 40,
                          color: Color.fromARGB(255, 0, 32, 52),
                        ),
                        Text(
                          "Transport and Logistics",
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
                          Icons.fastfood_rounded,
                          size: 40,
                          color: Color.fromARGB(255, 0, 32, 52),
                        ),
                        Text(
                          "Home \n Groceries",
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
                          Icons.phone_in_talk_sharp,
                          size: 40,
                          color: Color.fromARGB(255, 0, 32, 52),
                        ),
                        Text(
                          "Airtime\n And Data",
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
            ],
          ),
        ),
      ),
    );
  }
}
