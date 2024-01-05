class InvoiceItem {
  String name;
  int qty;
  double unitPrice;

  InvoiceItem({
    required this.name,
    required this.qty,
    required this.unitPrice,
  });

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'qty': qty,
      'unitPrice': unitPrice,
    };
  }

  factory InvoiceItem.fromJson(Map<String, dynamic> json) {
    return InvoiceItem(
      name: json['name'],
      qty: json['qty'],
      unitPrice: json['unitPrice'],
    );
  }
}
