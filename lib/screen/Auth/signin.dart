import 'package:flutter/material.dart';
import '../../services/auth_services.dart';
import 'register.dart';

class AuthScreen extends StatefulWidget {
  const AuthScreen({super.key});

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  final AuthService _auth = AuthService();
  bool obscure = true;
  String errorMsg = "";
  Color color = Colors.green;
  bool isLoading = false;

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
                  margin: const EdgeInsets.only(top: 12),
                  padding: EdgeInsets.all(width * 0.05),
                  child: Form(
                    key: _formKey,
                    child: Column(
                      children: [
                        const SizedBox(height: 30),
                        TextFormField(
                          controller: _emailController,
                          cursorColor: const Color.fromARGB(255, 255, 179, 0),
                          textInputAction: TextInputAction.done,
                          decoration: InputDecoration(
                            hintStyle: const TextStyle(
                              color: Color.fromARGB(255, 255, 179, 0),
                            ),
                            labelStyle: const TextStyle(
                              color: Color.fromARGB(255, 255, 179, 0),
                            ),
                            labelText: 'Email',
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
                          autovalidateMode: AutovalidateMode.onUserInteraction,
                          validator: (email) =>
                              email != null && !email.contains("@")
                                  ? 'Enter a valid email'
                                  : null,
                        ),
                        const SizedBox(
                          height: 20,
                        ),
                        TextFormField(
                          obscureText: obscure,
                          cursorColor: const Color.fromARGB(255, 255, 179, 0),
                          controller: _passwordController,
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return "please enter password";
                            }
                            return null;
                          },
                          onTapOutside: (PointerDownEvent event) =>
                              FocusManager.instance.primaryFocus?.unfocus(),
                          decoration: InputDecoration(
                            labelText: 'Password',
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
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Row(
                              children: [
                                const Text("Don't have have account  ",
                                    style: TextStyle(
                                        color: Color.fromARGB(255, 255, 179, 0),
                                        fontSize: 12)),
                                const SizedBox(
                                  width: 2,
                                ),
                                GestureDetector(
                                  onTap: () {
                                    Navigator.push(
                                      context,
                                      MaterialPageRoute(
                                        builder: (context) =>
                                            const RegisterScreen(),
                                      ),
                                    );
                                  },
                                  child: isLoading
                                      ? const CircularProgressIndicator()
                                      : const Text("signup?",
                                          style: TextStyle(
                                            color: Color.fromARGB(
                                                255, 255, 179, 0),
                                            fontSize: 17,
                                            decoration:
                                                TextDecoration.underline,
                                            decorationColor: Color.fromARGB(
                                                255, 255, 179, 0),
                                          )),
                                )
                              ],
                            ),
                            const SizedBox(
                              width: 10,
                            ),
                          ],
                        ),
                        const SizedBox(
                          height: 16,
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            GestureDetector(
                              onTap: () async {
                                try {
                                  if (_formKey.currentState!.validate()) {
                                    setState(() {
                                      isLoading =
                                          true; // Start loading animation
                                    });
                                    dynamic result =
                                        await _auth.signInWithEmailAndPassword(
                                      context,
                                      _emailController.text,
                                      _passwordController.text,
                                    );
                                    if (result == null) {
                                      // Navigator.push(
                                      //   context,
                                      //   MaterialPageRoute(
                                      //     builder: (context) =>
                                      //         const RootPage(),
                                      //   ),
                                      // );
                                    }
                                  }
                                } catch (e) {
                                  setState(() {
                                    color = Colors.grey;
                                  });
                                } finally {
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
                                width: width * 0.35,
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
                                  color: Color.fromARGB(255, 204, 143, 0),
                                ),
                                child: const Text(
                                  "Signin",
                                  style: TextStyle(
                                    color: Color.fromARGB(255, 255, 255, 255),
                                  ),
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
                                width: 60,
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
                        const SizedBox(
                          height: 12,
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Row(
                              children: [
                                const Text("Forgotten password  ",
                                    style: TextStyle(
                                        color: Color.fromARGB(255, 255, 179, 0),
                                        fontSize: 12)),
                                const SizedBox(
                                  width: 2,
                                ),
                                GestureDetector(
                                  onTap: () {
                                    // Navigator.push(
                                    //   context,
                                    //   MaterialPageRoute(
                                    //     builder: (context) =>
                                    //         const ForgotPasswordPage(),
                                    //   ),
                                    // );
                                  },
                                  child: const Text("Reset?",
                                      style: TextStyle(
                                        color: Color.fromARGB(255, 255, 179, 0),
                                        fontSize: 17,
                                        decoration: TextDecoration.underline,
                                        decorationColor:
                                            Color.fromARGB(255, 255, 179, 0),
                                      )),
                                )
                              ],
                            ),
                            const SizedBox(
                              width: 10,
                            ),
                          ],
                        ),
                        Wrap(
                          children: [
                            Text(
                              errorMsg,
                              style: const TextStyle(color: Colors.red),
                            )
                          ],
                        )
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
