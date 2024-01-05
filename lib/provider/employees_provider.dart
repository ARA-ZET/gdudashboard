import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:golden_diamond/model/cost_account.dart';
import 'package:golden_diamond/model/employee.dart';

class EmployeesController with ChangeNotifier {
  FirebaseFirestore db = FirebaseFirestore.instance;
  List<Employee> _employees = [];
  List<String> _employeesList = [];
  List<String> _filteredEmployees = [];

  List<Employee> get clients => _employees;
  List<String> get clientsList => _employeesList;
  List<String> get filteredEmployees => _filteredEmployees;

  getEmpoloyeeNames() {
    _employeesList = _employees.map((client) => client.name).toList();
    _employeesList.sort();
    if (_filteredEmployees.isEmpty) {
      _filteredEmployees = _employeesList;
    }
    return _employeesList;
  }

  onTextChanged(String text) {
    _filteredEmployees = _employeesList
        .where((suggestion) =>
            suggestion.toLowerCase().contains(text.toLowerCase()))
        .toList();
    _filteredEmployees.sort();
    notifyListeners();
    debugPrint(_filteredEmployees.length.toString());
  }

  cleerFilters() {
    _filteredEmployees = [];
    notifyListeners();
  }

  addEmployee(BuildContext context, Employee employee) {
    final CollectionReference collRef =
        FirebaseFirestore.instance.collection("Employees");

    collRef.add(employee.toJson()).then(
      (invoiceDocRef) {
        collRef.doc(invoiceDocRef.id).update({"uid": invoiceDocRef.id});

        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text("New employee added"),
            backgroundColor: Colors.green,
          ),
        );
        Navigator.pop(context);
        debugPrint(invoiceDocRef.toString());

        notifyListeners();
      },
    ).catchError(
      (error) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text("Error adding employee"),
            backgroundColor: Colors.red,
          ),
        );
      },
    );
  }

  Future<void> updateEmploye(
    BuildContext context,
    Employee employee,
  ) async {
    final CollectionReference invoicesCollection =
        FirebaseFirestore.instance.collection("Employees");

    try {
      DocumentReference employeeDocRef = invoicesCollection.doc(employee.uid);

      await employeeDocRef.update(employee.toJson());

      CollectionReference invoiceItemsCollection =
          employeeDocRef.collection("Wages");

      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text("Employee updated successfully"),
          backgroundColor: Colors.green,
        ),
      );

      notifyListeners();
    } catch (error) {
      print("Error updating Employee: $error");
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text("Error updating Employee"),
          backgroundColor: Colors.red,
        ),
      );
    }
  }

  Future<void> updateWages(
      BuildContext context, String employeeUid, CostAccount costAccount) async {
    final CollectionReference invoicesCollection =
        FirebaseFirestore.instance.collection("Employees");

    try {
      DocumentReference employeeDocRef = invoicesCollection.doc(employeeUid);

      await employeeDocRef.update(costAccount.toJson());

      CollectionReference costAccountCollection =
          employeeDocRef.collection("Wages");

      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text("Wages updated successfully"),
          backgroundColor: Colors.green,
        ),
      );

      notifyListeners();
    } catch (error) {
      print("Error updating Wages: $error");
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text("Error updating Wages"),
          backgroundColor: Colors.red,
        ),
      );
    }
  }

  List<Employee> getEmployees() {
    db
        .collection('Employees')
        .orderBy('name', descending: false)
        .snapshots(includeMetadataChanges: true)
        .listen((employees) {
      _employees =
          employees.docs.map((doc) => Employee.fromJson(doc.data())).toList();
      getEmpoloyeeNames();
      notifyListeners();
    });

    return _employees;
  }
}
