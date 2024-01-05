import 'package:flutter/material.dart';
import 'package:golden_diamond/model/employee.dart';
import 'package:golden_diamond/provider/employees_provider.dart';
import 'package:provider/provider.dart';

class AddEmployee extends StatefulWidget {
  const AddEmployee({super.key});

  @override
  State<AddEmployee> createState() => _AddEmployeeState();
}

class _AddEmployeeState extends State<AddEmployee> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _name = TextEditingController();
  final TextEditingController _role = TextEditingController();

  bool suggestionToggle = true;

  bool isLoading = false;

  List<String> roles = [
    "Part Time",
    "Tailor",
    "Admin",
    "Markerting",
    "Manager"
  ];

  @override
  void dispose() {
    // Dispose of the controller when it's no longer needed to prevent memory leaks
    _name.dispose();
    _role.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;

    return AlertDialog(
      contentPadding: EdgeInsets.all(12),
      backgroundColor: const Color.fromARGB(255, 0, 32, 52),
      title: Container(
        alignment: Alignment.center,
        child: const Text(
          "Add Employee",
          style: TextStyle(color: Color.fromARGB(255, 255, 179, 0)),
        ),
      ),
      content: Container(
        height: 300,
        child: Stack(
          children: [
            Form(
              key: _formKey,
              child: Column(
                children: [
                  const SizedBox(height: 30),
                  TextFormField(
                    controller: _name,
                    cursorColor: const Color.fromARGB(255, 255, 179, 0),
                    textInputAction: TextInputAction.done,
                    decoration: InputDecoration(
                      hintStyle: const TextStyle(
                        color: Color.fromARGB(255, 255, 179, 0),
                      ),
                      labelStyle: const TextStyle(
                        color: Color.fromARGB(255, 255, 179, 0),
                      ),
                      labelText: 'Name',
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
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return "please enter name";
                      }
                      return null;
                    },
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  TextFormField(
                    cursorColor: const Color.fromARGB(255, 255, 179, 0),
                    controller: _role,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return "please enter Role";
                      }
                      return null;
                    },
                    onTapOutside: (PointerDownEvent event) =>
                        FocusManager.instance.primaryFocus?.unfocus(),
                    decoration: InputDecoration(
                      labelText: 'Role',
                      suffixIcon: IconButton(
                        onPressed: () {
                          setState(() {
                            suggestionToggle = !suggestionToggle;
                          });
                        },
                        icon: Icon(
                          suggestionToggle
                              ? Icons.arrow_drop_down
                              : Icons.arrow_drop_up_outlined,
                          color: const Color.fromARGB(255, 255, 179, 0),
                        ),
                      ),
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
                  const SizedBox(
                    height: 20,
                  ),
                  const SizedBox(
                    height: 16,
                  ),
                ],
              ),
            ),
            Positioned(
              top: 150,
              width: width,
              height: 150,
              child: !suggestionToggle
                  ? const SizedBox
                      .shrink() // Hide the container when there are no items
                  : Container(
                      color: Colors.white,
                      child: ListView.builder(
                        itemCount: roles.length,
                        shrinkWrap: true,
                        itemBuilder: (BuildContext context, int index) {
                          return ListTile(
                            title: Text(
                              roles[index],
                              style:
                                  const TextStyle(fontWeight: FontWeight.bold),
                            ),
                            onTap: () {
                              setState(() {
                                suggestionToggle = false;
                              });

                              _role.text = roles[index];
                              FocusManager.instance.primaryFocus?.unfocus();
                            },
                          );
                        },
                      ),
                    ),
            ),
          ],
        ),
      ),
      actions: [
        Container(
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              GestureDetector(
                onTap: () async {
                  if (_formKey.currentState!.validate()) {
                    context.read<EmployeesController>().addEmployee(
                        context, Employee(_name.text, _role.text, "uid"));
                  }
                },
                child: Container(
                  alignment: Alignment.center,
                  padding:
                      const EdgeInsets.symmetric(horizontal: 4, vertical: 4),
                  height: 40,
                  width: 120,
                  decoration: const BoxDecoration(
                    borderRadius: BorderRadius.all(
                      Radius.circular(10),
                    ),
                    color: Color.fromARGB(255, 171, 120, 1),
                  ),
                  child: const Text(
                    "ADD",
                    style: TextStyle(
                      color: Color.fromARGB(255, 255, 255, 255),
                    ),
                  ),
                ),
              ),
              GestureDetector(
                onTap: () async {
                  Navigator.pop(context);
                },
                child: Container(
                  alignment: Alignment.center,
                  padding:
                      const EdgeInsets.symmetric(horizontal: 4, vertical: 4),
                  height: 40,
                  width: 120,
                  decoration: const BoxDecoration(
                    borderRadius: BorderRadius.all(
                      Radius.circular(10),
                    ),
                    color: Colors.red,
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
        ),
      ],
    );
  }
}
