class Customer {
  final String company;
  final String contact;
  final String contactPerson;
  final String streetNumber;
  final String surburb;
  final String town;
  final String uid;
  final double balance;

  const Customer({
    required this.company,
    required this.contact,
    required this.contactPerson,
    required this.streetNumber,
    required this.surburb,
    required this.town,
    required this.uid,
    required this.balance,
  });

  factory Customer.fromJson(Map<String, dynamic> json) => Customer(
        company: json['company'],
        contact: json['contact'].toString(),
        contactPerson: json['contactPerson'],
        streetNumber: json['streetNumber'],
        surburb: json['surburb'],
        town: json['town'],
        uid: json['uid'],
        balance: json['balance'],
      );

  Map<String, dynamic> toJson() => {
        'company': company,
        'contact': contact,
        'contactPerson': contactPerson,
        'streetNumber': streetNumber,
        'surburb': surburb,
        'town': town,
        'uid': uid,
        'balance': balance,
      };
}
