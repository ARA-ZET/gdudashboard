import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:golden_diamond/model/cost_account.dart';
import 'package:golden_diamond/provider/expenses_provider.dart';
import 'package:provider/provider.dart';

class RecordExpense extends StatefulWidget {
  const RecordExpense({super.key, required this.category});
  final String category;

  @override
  State<RecordExpense> createState() => _RecordExpenseState();
}

class _RecordExpenseState extends State<RecordExpense> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _category = TextEditingController();
  final TextEditingController _description = TextEditingController();
  final TextEditingController _amount = TextEditingController();

  bool isLoading = false;
  @override
  void initState() {
    setState(() {
      _category.text = widget.category;
    });
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;

    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color.fromARGB(
          255,
          255,
          179,
          0,
        ),
        title: const Text(
          "Record Expenses",
          style: TextStyle(
            color: Color.fromARGB(255, 255, 255, 255),
            fontSize: 24,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
      backgroundColor: const Color.fromARGB(255, 255, 179, 0),
      body: SingleChildScrollView(
        child: SafeArea(
          child: Container(
            width: width,
            height: height,
            alignment: Alignment.centerLeft,
            color: const Color.fromARGB(255, 0, 32, 52),
            child: Column(
              children: [
                // Container(
                //   height: 175,
                //   width: width,
                //   padding: const EdgeInsets.all(18),
                //   decoration: const BoxDecoration(
                //     borderRadius: BorderRadius.only(
                //       bottomLeft: Radius.circular(40),
                //     ),
                //     color: Color.fromARGB(255, 255, 179, 0),
                //   ),
                //   child: Column(
                //     mainAxisAlignment: MainAxisAlignment.spaceBetween,
                //     children: [
                //       Container(
                //         margin: const EdgeInsets.all(1),
                //         width: width * 0.9,
                //         child: const ClipRRect(
                //           child: Image(
                //             image: AssetImage("assets/gdulogo.png"),
                //             fit: BoxFit.fitHeight,
                //           ),
                //         ),
                //       ),
                //       Container(
                //         margin: const EdgeInsets.symmetric(vertical: 8),
                //         child: const Column(
                //           children: [],
                //         ),
                //       ),
                //     ],
                //   ),
                // ),
                Container(
                  margin: const EdgeInsets.only(top: 12),
                  padding: EdgeInsets.all(width * 0.05),
                  child: Form(
                    key: _formKey,
                    child: Column(
                      children: [
                        const SizedBox(height: 30),
                        TextFormField(
                          readOnly: true,
                          controller: _category,
                          cursorColor: const Color.fromARGB(255, 255, 179, 0),
                          textInputAction: TextInputAction.done,
                          decoration: InputDecoration(
                            hintStyle: const TextStyle(
                              color: Color.fromARGB(255, 255, 179, 0),
                            ),
                            labelStyle: const TextStyle(
                              color: Color.fromARGB(255, 255, 179, 0),
                            ),
                            labelText: 'Category',
                            enabledBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                              borderSide: const BorderSide(
                                  color: Color.fromARGB(255, 255, 179, 0),
                                  width: 2), // Change the color here
                            ),
                            focusedBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                              borderSide: const BorderSide(
                                  color: Color.fromARGB(255, 255, 179, 0),
                                  width: 2), // Change the color here
                            ),
                            errorBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                              borderSide: const BorderSide(
                                  color: Color.fromARGB(255, 255, 0, 0),
                                  width: 2), // Change the color here
                            ),
                            focusedErrorBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                              borderSide: const BorderSide(
                                  color: Color.fromARGB(255, 255, 0, 0),
                                  width: 2), // Change the color here
                            ),
                          ),
                          style: const TextStyle(
                            color: Color.fromARGB(255, 255, 179, 0),
                          ),
                        ),
                        const SizedBox(
                          height: 20,
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            SizedBox(
                              width: width * 0.5,
                              child: TextFormField(
                                cursorColor:
                                    const Color.fromARGB(255, 255, 179, 0),
                                controller: _description,
                                onTapOutside: (PointerDownEvent event) =>
                                    FocusManager.instance.primaryFocus
                                        ?.unfocus(),
                                decoration: InputDecoration(
                                  labelText: 'Description',
                                  enabledBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(12),
                                    borderSide: const BorderSide(
                                        color: Color.fromARGB(255, 255, 179, 0),
                                        width: 2), // Change the color here
                                  ),
                                  focusedBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(12),
                                    borderSide: const BorderSide(
                                        color: Color.fromARGB(255, 255, 179, 0),
                                        width: 2), // Change the color here
                                  ),
                                  hintStyle: const TextStyle(
                                    color: Color.fromARGB(255, 255, 179, 0),
                                  ),
                                  labelStyle: const TextStyle(
                                    color: Color.fromARGB(255, 255, 179, 0),
                                  ),
                                ),
                                style: const TextStyle(
                                  color: Color.fromARGB(255, 255, 179, 0),
                                ),
                              ),
                            ),
                            SizedBox(
                              width: width * 0.35,
                              child: TextFormField(
                                cursorColor:
                                    const Color.fromARGB(255, 255, 179, 0),
                                controller: _amount,
                                validator: (value) {
                                  if (value == null || value.isEmpty) {
                                    return "please enter amount";
                                  }
                                  return null;
                                },
                                onTapOutside: (PointerDownEvent event) =>
                                    FocusManager.instance.primaryFocus
                                        ?.unfocus(),
                                keyboardType: TextInputType.number,
                                decoration: InputDecoration(
                                  labelText: 'Amount',
                                  enabledBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(12),
                                    borderSide: const BorderSide(
                                        color: Color.fromARGB(255, 255, 179, 0),
                                        width: 2), // Change the color here
                                  ),
                                  focusedBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(12),
                                    borderSide: const BorderSide(
                                        color: Color.fromARGB(255, 255, 179, 0),
                                        width: 2), // Change the color here
                                  ),
                                  errorBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(12),
                                    borderSide: const BorderSide(
                                        color: Color.fromARGB(255, 255, 0, 0),
                                        width: 2), // Change the color here
                                  ),
                                  focusedErrorBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(12),
                                    borderSide: const BorderSide(
                                        color: Color.fromARGB(255, 255, 0, 0),
                                        width: 2), // Change the color here
                                  ),
                                  hintStyle: const TextStyle(
                                    color: Color.fromARGB(255, 255, 179, 0),
                                  ),
                                  labelStyle: const TextStyle(
                                    color: Color.fromARGB(255, 255, 179, 0),
                                  ),
                                ),
                                style: const TextStyle(
                                  color: Color.fromARGB(255, 255, 179, 0),
                                ),
                              ),
                            )
                          ],
                        ),
                        const SizedBox(
                          height: 20,
                        ),
                        const SizedBox(
                          height: 16,
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            GestureDetector(
                              onTap: () async {
                                if (_formKey.currentState!.validate()) {
                                  context.read<ExpensesController>().addExpense(
                                      context,
                                      CostAccount(
                                          _category.text,
                                          double.parse(_amount.text),
                                          _description.text,
                                          Timestamp.now(),
                                          "uid"));
                                  FocusManager.instance.primaryFocus?.unfocus();

                                  _description.clear();
                                  _amount.clear();
                                }
                              },
                              child: Container(
                                alignment: Alignment.center,
                                padding: const EdgeInsets.symmetric(
                                    horizontal: 4, vertical: 4),
                                height: 40,
                                width: width * 0.35,
                                decoration: const BoxDecoration(
                                  borderRadius: BorderRadius.all(
                                    Radius.circular(10),
                                  ),
                                  color: Color.fromARGB(255, 163, 115, 3),
                                ),
                                child: const Text(
                                  "PAY",
                                  style: TextStyle(
                                    color: Color.fromARGB(255, 255, 255, 255),
                                  ),
                                ),
                              ),
                            ),
                            GestureDetector(
                              onTap: () async {},
                              child: Container(
                                alignment: Alignment.center,
                                padding: const EdgeInsets.symmetric(
                                    horizontal: 4, vertical: 4),
                                height: 40,
                                width: width * 0.35,
                                decoration: const BoxDecoration(
                                  borderRadius: BorderRadius.all(
                                    Radius.circular(10),
                                  ),
                                  color: Color.fromARGB(255, 143, 41, 34),
                                ),
                                child: const Text(
                                  "Close",
                                  style: TextStyle(
                                    color: Color.fromARGB(255, 255, 255, 255),
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
