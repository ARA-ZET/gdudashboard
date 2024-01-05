import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:golden_diamond/model/invoice.dart';
import 'package:golden_diamond/model/invoice_number.dart';

import '../model/invoice_item.dart';

class InvoiceController with ChangeNotifier {
  FirebaseFirestore db = FirebaseFirestore.instance;
  InvNumber inv = InvNumber(0);
  List<Invoice> _invoices = [];
  int _numOfInvoices = 0;
  String _invoicesTotal = "0.0";
  List<InvoiceItem> _items = [];
  List<Invoice> _outstandingInvoices = [];

  List<Invoice> get outstandingInvoices => _outstandingInvoices;
  int get numOfInvoices => _numOfInvoices;
  String get invoicesTotal => _invoicesTotal;
  List<InvoiceItem> get items => _items;
  List<Invoice> get invoices => _invoices;

  InvNumber? getInvNumber() {
    db
        .collection('InvoiceNumber')
        .doc("K0bWJpKp07C09XLbIgy2")
        .snapshots(includeMetadataChanges: true)
        .listen((invNumber) {
      inv = InvNumber.fromJson(invNumber.data()!);
      notifyListeners();
    });
    return inv;
  }

  Future<void> updateInvNumber(int? invNumber) async {
    await db
        .collection('InvoiceNumber')
        .doc("K0bWJpKp07C09XLbIgy2")
        .update({"invoice": invNumber! + 1});
    notifyListeners();
  }

  List<Invoice> getInvoices() {
    db
        .collection('Invoices')
        .orderBy('invoiceNumber', descending: true)
        .snapshots(includeMetadataChanges: true)
        .listen(
      (clients) {
        _invoices =
            clients.docs.map((doc) => Invoice.fromJson(doc.data())).toList();
        _invoicesTotal = _invoices
            .fold(
              0.0,
              (double prev, next) => prev + (next.invoiceTotal),
            )
            .toStringAsFixed(2);
        _numOfInvoices = _invoices.length;
        getOutstandinInvoices();

        notifyListeners();
      },
    );
    return _invoices;
  }

  getOutstandinInvoices() {
    final List<Invoice> outstandings = [];
    for (Invoice invoice in _invoices) {
      if (invoice.balance > 0.0) {
        outstandings.add(invoice);
      }
    }
    _outstandingInvoices = outstandings;
  }

  List<InvoiceItem> getInvoicesItems(String uid) {
    db
        .collection('Invoices')
        .doc(uid)
        .collection("InvoiceItems")
        .snapshots(includeMetadataChanges: true)
        .listen((clients) {
      _items =
          clients.docs.map((doc) => InvoiceItem.fromJson(doc.data())).toList();

      notifyListeners();
    });

    return _items;
  }

  addInvoice(
      BuildContext context, List<InvoiceItem> invoiceItems, Invoice invoice) {
    final CollectionReference collRef =
        FirebaseFirestore.instance.collection("Invoices");

    collRef.add(invoice.toJson()).then(
      (invoiceDocRef) {
        final CollectionReference invoiceItemsCollection =
            invoiceDocRef.collection("InvoiceItems");
        collRef.doc(invoiceDocRef.id).update({"uid": invoiceDocRef.id});

        for (var item in invoiceItems) {
          if (item.unitPrice != 0.0) {
            invoiceItemsCollection.add(
              item.toJson(),
            );
          }
        }

        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text("New Invoice added"),
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
            content: Text("Error adding invoice"),
            backgroundColor: Colors.red,
          ),
        );
      },
    );
  }

  Future<void> updateInvoice(BuildContext context, Invoice updatedInvoice,
      List<InvoiceItem> updatedInvoiceItems) async {
    final CollectionReference invoicesCollection =
        FirebaseFirestore.instance.collection("Invoices");

    try {
      DocumentReference invoiceDocRef =
          invoicesCollection.doc(updatedInvoice.uid);

      await invoiceDocRef.update(updatedInvoice.toJson());

      CollectionReference invoiceItemsCollection =
          invoiceDocRef.collection("InvoiceItems");

      QuerySnapshot existingItems = await invoiceItemsCollection.get();
      for (QueryDocumentSnapshot item in existingItems.docs) {
        await item.reference.delete();
      }

      for (var item in updatedInvoiceItems) {
        if (item.unitPrice != 0.0) {
          await invoiceItemsCollection.add(item.toJson());
        }
      }

      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text("Invoice updated successfully"),
          backgroundColor: Colors.green,
        ),
      );

      notifyListeners();
    } catch (error) {
      print("Error updating invoice: $error");
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text("Error updating invoice"),
          backgroundColor: Colors.red,
        ),
      );
    }
  }
}
