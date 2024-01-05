import 'package:cloud_firestore/cloud_firestore.dart';

class CostAccount {
  final String acount;
  final double amount;
  final String description;
  final Timestamp date;
  final String uid;

  CostAccount(
    this.acount,
    this.amount,
    this.description,
    this.date,
    this.uid,
  );

  CostAccount.fromJson(Map<String, dynamic>? json)
      : acount = json!["acount"],
        amount = json["amount"],
        description = json["description"],
        date = json["date"],
        uid = json["uid"];

  Map<String, dynamic> toJson() => {
        "acount": acount,
        "amount": amount,
        "description": description,
        "date": date,
        "uid": uid,
      };
}
