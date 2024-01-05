import 'package:cloud_firestore/cloud_firestore.dart';

class Invoice {
  String invoiceNumber;
  String reference;
  double invoiceTotal;
  double balance;
  String customer;
  Timestamp date;
  String uid;

  Invoice({
    required this.invoiceNumber,
    required this.reference,
    required this.invoiceTotal,
    required this.balance,
    required this.customer,
    required this.date,
    required this.uid,
  });

  Map<String, dynamic> toJson() {
    return {
      'invoiceNumber': invoiceNumber,
      'reference': reference,
      'invoiceTotal': invoiceTotal,
      'balance': balance,
      'customer': customer,
      'date': date,
      'uid': uid,
    };
  }

  factory Invoice.fromJson(Map<String, dynamic> json) {
    return Invoice(
      invoiceNumber: json['invoiceNumber'],
      reference: json['reference'],
      invoiceTotal: json['invoiceTotal'],
      balance: json['balance'],
      customer: json['customer'],
      date: json['date'],
      uid: json['uid'],
    );
  }
}
