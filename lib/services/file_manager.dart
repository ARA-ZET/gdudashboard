import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:open_document/open_document.dart';
import 'package:open_document/open_document_exception.dart';
import 'package:path_provider/path_provider.dart';

class FileManager {
  static FileManager? _instance;
  FileManager._internal() {
    _instance = this;
  }

  factory FileManager() => _instance ?? FileManager._internal();

  Future<String> get _directoryPath async {
    if (Platform.isAndroid) {
      Directory? directory = await getExternalStorageDirectory();
      return directory!.path;
    } else {
      Directory? directory = await getApplicationDocumentsDirectory();
      return directory.path;
    }
  }

  Future<File> savedFile(file) async {
    final path = await _directoryPath;
    return File('$path/$file.pdf');
  }

  Future<void> saveFile(String fileName, Uint8List byteList) async {
    File file = await savedFile(fileName);
    await file.writeAsBytes(byteList);

    final isCheck = await OpenDocument.checkDocument(filePath: file.path);

    await OpenDocument.openDocument(filePath: file.path);
    try {
      if (!isCheck) {}
    } on OpenDocumentException catch (e) {
      debugPrint("ERROR: ${e.errorMessage}");
      // file.path = 'Failed to get platform version.';
    }
  }

  createDir(String folder) async {
    final directoryName = folder;

    if (Platform.isAndroid) {
      final docDir = await getExternalStorageDirectory();
      final myDir = Directory('${docDir!.path}/$directoryName');
      if (await myDir.exists()) {}
      final dir = await myDir.create(recursive: true);
      debugPrint(dir.toString());
    } else {
      final docDir = await getApplicationDocumentsDirectory();
      final myDir = Directory('${docDir!.path}/$directoryName');
      if (await myDir.exists()) {}
      final dir = await myDir.create(recursive: true);
      debugPrint(dir.toString());
    }
  }
}
