import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:golden_diamond/model/cost_account.dart';

import '../model/customer.dart';

class ExpensesController with ChangeNotifier {
  FirebaseFirestore db = FirebaseFirestore.instance;
  List<CostAccount> _expenses = [];
  // List<String> _clientsList = [];
  // List<String> _filteredClients = [];

  List<CostAccount> get clients => _expenses;
  // List<String> get clientsList => _clientsList;
  // List<String> get filteredClients => _filteredClients;

  // getClientsNames() {
  //   _clientsList = _clients.map((client) => client.company).toList();
  //   _clientsList.sort();
  //   if (_filteredClients.isEmpty) {
  //     _filteredClients = _clientsList;
  //   }
  //   return _clientsList;
  // }

  // onTextChanged(String text) {
  //   _filteredClients = _clientsList
  //       .where((suggestion) =>
  //           suggestion.toLowerCase().contains(text.toLowerCase()))
  //       .toList();
  //   filteredClients.sort();
  //   notifyListeners();
  //   debugPrint(filteredClients.length.toString());
  // }

  // cleerFilters() {
  //   _filteredClients = [];
  //   notifyListeners();
  // }

  addExpense(BuildContext context, CostAccount costAccount) {
    final CollectionReference collRef =
        FirebaseFirestore.instance.collection("Expenses");

    collRef.add(costAccount.toJson()).then(
      (expensesDocRef) {
        collRef.doc(expensesDocRef.id).update({"uid": expensesDocRef.id});

        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text("New expse recorded"),
            backgroundColor: Colors.green,
          ),
        );

        notifyListeners();
      },
    ).catchError(
      (error) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text("Error recording expense"),
            backgroundColor: Colors.red,
          ),
        );
      },
    );
  }

  List<CostAccount> getClients() {
    db
        .collection('Expenses')
        .orderBy('account', descending: false)
        .snapshots(includeMetadataChanges: true)
        .listen((costAccount) {
      _expenses = costAccount.docs
          .map((doc) => CostAccount.fromJson(doc.data()))
          .toList();

      notifyListeners();
    });

    return _expenses;
  }
}
