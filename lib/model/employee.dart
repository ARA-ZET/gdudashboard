class Employee {
  final String name;
  final String role;
  final String uid;

  Employee(
    this.name,
    this.role,
    this.uid,
  );

  Employee.fromJson(Map<String, dynamic>? json)
      : name = json!["name"],
        role = json["role"],
        uid = json["uid"];

  Map<String, dynamic> toJson() => {
        "name": name,
        "role": role,
        "uid": uid,
      };
}
