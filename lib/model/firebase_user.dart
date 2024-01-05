class FirebaseUser {
  final String? name;
  final String? surname;
  final String? email;
  final String? uid;

  FirebaseUser(
    this.name,
    this.surname,
    this.email,
    this.uid,
  );

  FirebaseUser.fromJson(Map<String, dynamic>? json)
      : name = json!["name"],
        surname = json["surname"],
        email = json["email"],
        uid = json["uid"];

  Map<String, dynamic> toJson() => {
        "name": name,
        "surname": surname,
        "email": email,
        "uid": uid,
      };
}
