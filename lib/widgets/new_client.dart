import 'package:flutter/material.dart';
import 'package:golden_diamond/model/customer.dart';
import 'package:golden_diamond/provider/clients_provider.dart';
import 'package:provider/provider.dart';

class NewClient extends StatefulWidget {
  const NewClient({super.key});

  @override
  State<NewClient> createState() => _NewClientState();
}

class _NewClientState extends State<NewClient> {
  TextEditingController company = TextEditingController();
  TextEditingController contact = TextEditingController();
  TextEditingController contactPerson = TextEditingController();
  TextEditingController streetAddress = TextEditingController();
  TextEditingController suburb = TextEditingController();
  TextEditingController town = TextEditingController();

  bool isLoading = false;

  Future<void> delayed() async {
    await Future.delayed(const Duration(seconds: 2));

    setState(() {
      isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;

    return Expanded(
      child: Column(
        children: [
          const SizedBox(
            height: 12,
          ),
          const Text(
            "NEW CLIENT",
            style: TextStyle(fontWeight: FontWeight.bold, color: Colors.grey),
          ),
          const SizedBox(
            height: 8,
          ),
          Form(
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Column(
                children: [
                  TextFormField(
                    controller: company,
                    decoration: const InputDecoration(
                      icon: Icon(
                        Icons.contact_emergency_rounded,
                        color: Color.fromARGB(255, 0, 32, 52),
                      ),
                      labelText: 'Company',
                      labelStyle: TextStyle(
                        fontSize: 13,
                        color: Color.fromARGB(255, 0, 32, 52),
                      ),
                      enabledBorder: OutlineInputBorder(
                        borderSide: BorderSide(
                            color: Color.fromARGB(255, 0, 32, 52),
                            width: 2), // Change the color here
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderSide: BorderSide(
                            color: Color.fromARGB(255, 87, 95, 125),
                            width: 2), // Change the color here
                      ),
                      contentPadding:
                          EdgeInsets.symmetric(vertical: 8, horizontal: 12),
                    ),
                    style: const TextStyle(
                        fontSize: 15, fontWeight: FontWeight.w500),
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  TextFormField(
                    controller: contact,
                    onChanged: (value) {},
                    decoration: const InputDecoration(
                      icon: Icon(
                        Icons.contact_mail,
                        color: Color.fromARGB(255, 0, 32, 52),
                      ),
                      label: Text('Contact'),
                      labelStyle: TextStyle(
                        fontSize: 13,
                        color: Color.fromARGB(255, 0, 32, 52),
                      ),
                      enabledBorder: OutlineInputBorder(
                        borderSide: BorderSide(
                            color: Color.fromARGB(255, 0, 32, 52),
                            width: 2), // Change the color here
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderSide: BorderSide(
                            color: Color.fromARGB(255, 87, 95, 125),
                            width: 2), // Change the color here
                      ),
                      contentPadding:
                          EdgeInsets.symmetric(vertical: 8, horizontal: 12),
                    ),
                    keyboardType: TextInputType.number,
                    onSaved: (value) {},
                    style: const TextStyle(
                      fontSize: 15,
                    ),
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  TextFormField(
                    onChanged: (value) {},
                    controller: contactPerson,
                    decoration: const InputDecoration(
                      icon: Icon(
                        Icons.person_rounded,
                        color: Color.fromARGB(255, 0, 32, 52),
                      ),
                      labelText: 'Contact Person',
                      labelStyle: TextStyle(
                        fontSize: 13,
                        color: Color.fromARGB(255, 0, 32, 52),
                      ),
                      enabledBorder: OutlineInputBorder(
                        borderSide: BorderSide(
                            color: Color.fromARGB(255, 0, 32, 52),
                            width: 2), // Change the color here
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderSide: BorderSide(
                            color: Color.fromARGB(255, 87, 95, 125),
                            width: 2), // Change the color here
                      ),
                      contentPadding:
                          EdgeInsets.symmetric(vertical: 8, horizontal: 12),
                    ),
                    keyboardType: TextInputType.number,
                    onSaved: (value) {},
                    style: const TextStyle(fontSize: 15),
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  TextFormField(
                    onChanged: (value) {},
                    controller: streetAddress,
                    decoration: const InputDecoration(
                      icon: Icon(
                        Icons.my_location,
                        color: Color.fromARGB(255, 0, 32, 52),
                      ),
                      labelText: 'Street Address',
                      labelStyle: TextStyle(
                        fontSize: 13,
                        color: Color.fromARGB(255, 0, 32, 52),
                      ),
                      enabledBorder: OutlineInputBorder(
                        borderSide: BorderSide(
                            color: Color.fromARGB(255, 0, 32, 52),
                            width: 2), // Change the color here
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderSide: BorderSide(
                            color: Color.fromARGB(255, 87, 95, 125),
                            width: 2), // Change the color here
                      ),
                      contentPadding:
                          EdgeInsets.symmetric(vertical: 8, horizontal: 12),
                    ),
                    keyboardType: TextInputType.number,
                    onSaved: (value) {},
                    style: const TextStyle(fontSize: 15),
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  TextFormField(
                    onChanged: (value) {},
                    controller: suburb,
                    decoration: const InputDecoration(
                      icon: Icon(
                        Icons.person_rounded,
                        color: Color.fromARGB(255, 235, 241, 249),
                      ),
                      labelText: 'suburb',
                      labelStyle: TextStyle(
                        fontSize: 13,
                        color: Color.fromARGB(255, 0, 32, 52),
                      ),
                      enabledBorder: OutlineInputBorder(
                        borderSide: BorderSide(
                            color: Color.fromARGB(255, 0, 32, 52),
                            width: 2), // Change the color here
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderSide: BorderSide(
                            color: Color.fromARGB(255, 87, 95, 125),
                            width: 2), // Change the color here
                      ),
                      contentPadding:
                          EdgeInsets.symmetric(vertical: 8, horizontal: 12),
                    ),
                    keyboardType: TextInputType.number,
                    onSaved: (value) {},
                    style: const TextStyle(fontSize: 15),
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  TextFormField(
                    onChanged: (value) {},
                    controller: town,
                    decoration: const InputDecoration(
                      icon: Icon(
                        Icons.person_rounded,
                        color: Color.fromARGB(255, 235, 241, 249),
                      ),
                      labelText: 'Town',
                      labelStyle: TextStyle(
                        fontSize: 13,
                        color: Color.fromARGB(255, 0, 32, 52),
                      ),
                      enabledBorder: OutlineInputBorder(
                        borderSide: BorderSide(
                            color: Color.fromARGB(255, 0, 32, 52),
                            width: 2), // Change the color here
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderSide: BorderSide(
                            color: Color.fromARGB(255, 87, 95, 125),
                            width: 2), // Change the color here
                      ),
                      contentPadding:
                          EdgeInsets.symmetric(vertical: 8, horizontal: 12),
                    ),
                    keyboardType: TextInputType.number,
                    onSaved: (value) {},
                    style: const TextStyle(fontSize: 15),
                  ),
                ],
              ),
            ),
          ),
          Container(
            height: 40,
            width: 120,
            margin: const EdgeInsets.only(top: 8),
            decoration: BoxDecoration(
                color: const Color.fromARGB(255, 0, 32, 52),
                borderRadius: BorderRadius.circular(4)),
            child: TextButton(
                onPressed: () {
                  setState(() {
                    isLoading = true;
                  });
                  context.read<ClientsProvider>().getClients();
                  context.read<ClientsProvider>().addClient(
                        context,
                        Customer(
                            company: company.text,
                            contact: contact.text.toString(),
                            contactPerson: contactPerson.text,
                            streetNumber: streetAddress.text,
                            surburb: suburb.text,
                            town: town.text,
                            uid: "arazet",
                            balance: 0.0),
                      );

                  company.clear();
                  contact.clear();
                  contactPerson.clear();
                  streetAddress.clear();
                  suburb.clear();
                  town.clear();
                  delayed();
                },
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text(
                      "SAVE",
                      style: TextStyle(
                          color: Colors.white, fontWeight: FontWeight.bold),
                    ),
                    !isLoading
                        ? const Icon(
                            Icons.contact_emergency_sharp,
                            size: 20,
                            color: Colors.white,
                          )
                        : const CircularProgressIndicator.adaptive(
                            backgroundColor: Colors.white,
                          ),
                  ],
                )),
          ),
        ],
      ),
    );
  }
}
