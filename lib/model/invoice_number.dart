class InvNumber {
  final int? invoice;

  InvNumber(
    this.invoice,
  );

  InvNumber.fromJson(Map<String, dynamic>? json) : invoice = json!["invoice"];

  Map<String, dynamic> toJson() => {
        "invoice": invoice,
      };
}
