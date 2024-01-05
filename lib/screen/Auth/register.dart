import 'package:flutter/material.dart';
import '../../services/auth_services.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _surnameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  final AuthService _auth = AuthService();
  bool isLoading = false;
  bool obscure = true;

  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;

    return Scaffold(
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
                              "BUSSINESS DASHBOARD",
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
                  padding: EdgeInsets.all(width * 0.08),
                  child: Form(
                      key: _formKey,
                      child: Column(
                        children: [
                          TextFormField(
                            controller: _nameController,
                            cursorColor: const Color.fromARGB(255, 255, 179, 0),
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return "please enter your name";
                              }
                              return null;
                            },
                            onTapOutside: (PointerDownEvent event) =>
                                FocusManager.instance.primaryFocus?.unfocus(),
                            decoration: InputDecoration(
                              labelText: "name",
                              icon: const Icon(
                                Icons.person_2_outlined,
                                size: 25,
                                color: Color.fromARGB(255, 255, 179, 0),
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
                                  color: Color.fromARGB(255, 193, 193, 193)),
                              labelStyle: const TextStyle(
                                  color: Color.fromARGB(255, 193, 193, 193)),
                            ),
                            style: const TextStyle(color: Colors.white),
                          ),
                          const SizedBox(
                            height: 12,
                          ),
                          TextFormField(
                            controller: _surnameController,
                            cursorColor: const Color.fromARGB(255, 255, 179, 0),
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return "please enter your surname";
                              }
                              return null;
                            },
                            onTapOutside: (PointerDownEvent event) =>
                                FocusManager.instance.primaryFocus?.unfocus(),
                            decoration: InputDecoration(
                              labelText: "Surname",
                              icon: const Icon(
                                Icons.person_2_rounded,
                                size: 25,
                                color: Color.fromARGB(255, 255, 179, 0),
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
                                  color: Color.fromARGB(255, 193, 193, 193)),
                              labelStyle: const TextStyle(
                                  color: Color.fromARGB(255, 193, 193, 193)),
                            ),
                            style: const TextStyle(color: Colors.white),
                          ),
                          const SizedBox(
                            height: 12,
                          ),
                          TextFormField(
                            controller: _emailController,
                            cursorColor: const Color.fromARGB(255, 255, 179, 0),
                            validator: (value) {
                              if (value!.contains("@")) {
                                return null;
                              } else {
                                return "please enter valid email";
                              }
                            },
                            onTapOutside: (PointerDownEvent event) =>
                                FocusManager.instance.primaryFocus?.unfocus(),
                            decoration: InputDecoration(
                              labelText: "email",
                              icon: const Icon(
                                Icons.email_outlined,
                                size: 25,
                                color: Color.fromARGB(255, 255, 179, 0),
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
                                  color: Color.fromARGB(255, 193, 193, 193)),
                              labelStyle: const TextStyle(
                                  color: Color.fromARGB(255, 193, 193, 193)),
                            ),
                            style: const TextStyle(color: Colors.white),
                          ),
                          const SizedBox(
                            height: 12,
                          ),
                          TextFormField(
                            obscureText: obscure,
                            controller: _passwordController,
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return "please enter password";
                              }
                              return null;
                            },
                            cursorColor: const Color.fromARGB(255, 255, 179, 0),
                            onTapOutside: (PointerDownEvent event) =>
                                FocusManager.instance.primaryFocus?.unfocus(),
                            decoration: InputDecoration(
                              labelText: "password",
                              icon: const Icon(
                                Icons.lock_outline,
                                size: 25,
                                color: Color.fromARGB(255, 255, 179, 0),
                              ),
                              suffixIcon: IconButton(
                                onPressed: () {
                                  setState(() {
                                    obscure = !obscure;
                                  });
                                },
                                icon: Icon(
                                  obscure
                                      ? Icons.visibility
                                      : Icons.visibility_off,
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
                                  color: Color.fromARGB(255, 193, 193, 193)),
                              labelStyle: const TextStyle(
                                  color: Color.fromARGB(255, 193, 193, 193)),
                            ),
                            style: const TextStyle(color: Colors.white),
                          ),
                        ],
                      )),
                ),
                Container(
                    child: isLoading
                        ? const CircularProgressIndicator.adaptive()
                        : Container()),
                Container(
                  padding: EdgeInsets.symmetric(horizontal: width * 0.08),
                  child: Column(
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          GestureDetector(
                            onTap: () async {
                              try {
                                if (_formKey.currentState!.validate()) {
                                  setState(() {
                                    isLoading = true;
                                  });
                                  dynamic result =
                                      await _auth.registerWithEmailAndPassword(
                                          context,
                                          _nameController.text,
                                          _surnameController.text,
                                          _emailController.text,
                                          _passwordController.text);
                                  if (result != null) {
                                    Navigator.pop(context);
                                  } else {
                                    setState(() {
                                      isLoading =
                                          false; // Stop loading animation
                                    });
                                  }
                                }
                              } catch (e) {
                                setState(() {
                                  isLoading = false; // Stop loading animation
                                });
                              }
                            },
                            child: Container(
                              alignment: Alignment.center,
                              padding: const EdgeInsets.symmetric(
                                horizontal: 4,
                              ),
                              margin: const EdgeInsets.only(
                                top: 16,
                              ),
                              height: 40,
                              width: width * 0.3,
                              decoration: const BoxDecoration(
                                boxShadow: [
                                  BoxShadow(
                                    color: Color.fromARGB(255, 255, 179, 0),
                                    blurRadius: 4,
                                  )
                                ],
                                borderRadius: BorderRadius.all(
                                  Radius.circular(10),
                                ),
                                color: Color.fromARGB(255, 198, 139, 0),
                              ),
                              child: const Text(
                                "SIGN UP",
                                style: TextStyle(color: Colors.white),
                              ),
                            ),
                          ),
                          GestureDetector(
                            onTap: () async {
                              setState(() {
                                isLoading = true;
                              });
                              try {
                                await _auth.signInWithGoogle(context);
                              } catch (e) {
                                setState(() {
                                  isLoading = false; // Stop loading animation
                                });
                              }
                            },
                            child: Container(
                              alignment: Alignment.center,
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 4, vertical: 4),
                              height: 40,
                              width: 50,
                              decoration: const BoxDecoration(
                                borderRadius: BorderRadius.all(
                                  Radius.circular(10),
                                ),
                                color: Color.fromARGB(255, 255, 255, 255),
                              ),
                              child: const ClipRRect(
                                borderRadius: BorderRadius.all(
                                  Radius.circular(10),
                                ),
                                child: Image(
                                  image: AssetImage("assets/googlelogo.png"),
                                  fit: BoxFit.fitHeight,
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
