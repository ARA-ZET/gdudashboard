import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

import '../model/customer.dart';

class ClientsProvider with ChangeNotifier {
  FirebaseFirestore db = FirebaseFirestore.instance;
  List<Customer> _clients = [];
  List<String> _clientsList = [];
  List<String> _filteredClients = [];

  List<Customer> get clients => _clients;
  List<String> get clientsList => _clientsList;
  List<String> get filteredClients => _filteredClients;

  getClientsNames() {
    _clientsList = _clients.map((client) => client.company).toList();
    _clientsList.sort();
    if (_filteredClients.isEmpty) {
      _filteredClients = _clientsList;
    }
    return _clientsList;
  }

  Customer? getClientByName(String name) {
    debugPrint("searching");
    for (Customer client in clients) {
      if (client.company == name) {
        debugPrint(client.company);

        return client; // Found a matching client, return it
      }
    }
    notifyListeners();

    debugPrint("Nothing found");
    return null;
  }

  Customer? getClientById(String uid) {
    debugPrint("searching");
    for (Customer client in clients) {
      if (client.uid == uid) {
        debugPrint(client.company);

        return client; // Found a matching client, return it
      }
    }
    notifyListeners();

    debugPrint("Nothing found");
    return null;
  }

  onTextChanged(String text) {
    _filteredClients = _clientsList
        .where((suggestion) =>
            suggestion.toLowerCase().contains(text.toLowerCase()))
        .toList();
    filteredClients.sort();
    notifyListeners();
    debugPrint(filteredClients.length.toString());
  }

  cleerFilters() {
    _filteredClients = [];
    notifyListeners();
  }

  addClient(BuildContext context, Customer customer) {
    final CollectionReference collRef =
        FirebaseFirestore.instance.collection("Clients");

    collRef.add(customer.toJson()).then(
      (invoiceDocRef) {
        collRef.doc(invoiceDocRef.id).update({"uid": invoiceDocRef.id});

        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text("New Client added"),
            backgroundColor: Colors.green,
          ),
        );
        debugPrint(invoiceDocRef.toString());

        notifyListeners();
      },
    ).catchError(
      (error) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text("Error adding client"),
            backgroundColor: Colors.red,
          ),
        );
      },
    );
  }

  updateClientBalance(String uid, double balance) {
    final editClient = getClientById(uid);
    final newBalance = editClient!.balance + balance;
    db.collection("Clients").doc(uid).update({"balance": newBalance});
  }

  List<Customer> getClients() {
    db
        .collection('Clients')
        .orderBy('company', descending: false)
        .snapshots(includeMetadataChanges: true)
        .listen((clients) {
      _clients =
          clients.docs.map((doc) => Customer.fromJson(doc.data())).toList();
      getClientsNames();
      notifyListeners();
    });

    return _clients;
  }
}
