import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:golden_diamond/model/product.dart';
import 'package:golden_diamond/services/file_manager.dart';
import 'package:open_document/open_document.dart';
import 'package:open_document/open_document_exception.dart';
import 'package:path_provider/path_provider.dart';
import 'package:pdf/pdf.dart';
import 'package:pdf/widgets.dart' as pw;
import '../model/customer.dart';
import '../model/invoice_item.dart';

class CustomRow {
  final String name;
  final String qty;
  final String unitPrice;
  final String total;

  CustomRow(this.name, this.qty, this.unitPrice, this.total);
}

class PdfInvoiceService {
  Future<Uint8List> createInvoice(List<InvoiceItem> items, Customer customer,
      String reference, invoiceNumber, date) async {
    final pdf = pw.Document();

    final List<CustomRow> elements = [
      CustomRow("ITEM ", "QUANTITY", "PRICE", "SUB TOTAL"),
      for (var item in items)
        if (item.unitPrice != 0.0)
          CustomRow(
            item.name,
            item.qty.toStringAsFixed(2),
            "R${item.unitPrice.toStringAsFixed(2)}",
            "R${(item.unitPrice * item.qty).toStringAsFixed(2)}",
          ),
    ];
    final image =
        (await rootBundle.load("assets/gdulogo.png")).buffer.asUint8List();
    final banerImage =
        (await rootBundle.load("assets/arazetlogo.png")).buffer.asUint8List();
    pdf.addPage(
      pw.Page(
        pageFormat: PdfPageFormat.a4,
        margin: const pw.EdgeInsets.all(24),
        build: (pw.Context context) {
          return pw.Column(
            children: [
              pw.Container(
                padding: const pw.EdgeInsets.all(8),
                margin: const pw.EdgeInsets.only(bottom: 8),
                height: 60,
                color: PdfColor.fromHex("#001F34"),
                child: pw.Row(
                  mainAxisAlignment: pw.MainAxisAlignment.spaceBetween,
                  children: [
                    pw.Image(pw.MemoryImage(image),
                        width: 200, height: 50, fit: pw.BoxFit.fitWidth),
                    pw.Text(
                      "INVOICE",
                      style: pw.TextStyle(
                          color: PdfColor.fromHex("#FFB300"),
                          fontSize: 25,
                          fontWeight: pw.FontWeight.bold),
                    ),
                    pw.Column(
                      mainAxisAlignment: pw.MainAxisAlignment.spaceBetween,
                      crossAxisAlignment: pw.CrossAxisAlignment.start,
                      children: [
                        pw.Text(
                          date,
                          style: pw.TextStyle(
                              color: PdfColor.fromHex("#FFB300"),
                              fontSize: 16,
                              fontWeight: pw.FontWeight.bold),
                        ),
                        pw.Text(
                          "INV#: $invoiceNumber",
                          style: pw.TextStyle(
                              color: PdfColor.fromHex("#FFB300"),
                              fontSize: 16,
                              fontWeight: pw.FontWeight.bold),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              pw.Row(
                mainAxisAlignment: pw.MainAxisAlignment.spaceBetween,
                crossAxisAlignment: pw.CrossAxisAlignment.start,
                children: [
                  pw.Column(
                    mainAxisAlignment: pw.MainAxisAlignment.spaceBetween,
                    crossAxisAlignment: pw.CrossAxisAlignment.start,
                    children: [
                      pw.Text("BILL FROM:",
                          style: pw.TextStyle(fontWeight: pw.FontWeight.bold)),
                      pw.Text("Golden Diamond Uphostery"),
                      pw.Text("Khayelistha Traing Center"),
                      pw.Text("Cell : +27 81 572 3431"),
                      pw.SizedBox(height: 8),
                    ],
                  ),
                  pw.Column(
                    mainAxisAlignment: pw.MainAxisAlignment.spaceBetween,
                    crossAxisAlignment: pw.CrossAxisAlignment.start,
                    children: [
                      pw.Text("BILL TO:",
                          style: pw.TextStyle(fontWeight: pw.FontWeight.bold)),
                      pw.Text(customer.company),
                      pw.Text(customer.streetNumber),
                      pw.Text(customer.surburb),
                      pw.Text("Ref:$reference"),
                    ],
                  ),
                ],
              ),
              pw.SizedBox(height: 20),
              itemColumn(elements),
              pw.Text(
                  "We appreciate your collaboration with us. At Golden Diamond Upholstery, we're always available for you, whenever they are ready to turn your upholstery dreams into reality get intouch with us.\n** Your comfort is our guarantee."),
              pw.SizedBox(height: 12),
              pw.Container(
                padding: const pw.EdgeInsets.all(8),
                color: PdfColors.grey200,
                child: pw.Row(
                  mainAxisAlignment: pw.MainAxisAlignment.spaceBetween,
                  crossAxisAlignment: pw.CrossAxisAlignment.end,
                  children: [
                    pw.Column(
                      mainAxisAlignment: pw.MainAxisAlignment.spaceEvenly,
                      crossAxisAlignment: pw.CrossAxisAlignment.start,
                      children: [
                        pw.Text("BANKING DETAILS:",
                            style:
                                pw.TextStyle(fontWeight: pw.FontWeight.bold)),
                        pw.Text("Name: Golden Diamond Uphostery"),
                        pw.Text("Account Number: 63055298351"),
                        pw.Text("Bank : First National Bank (FNB)"),
                        pw.Text("Branch Code : 202809"),
                      ],
                    ),
                    pw.Column(
                      mainAxisAlignment: pw.MainAxisAlignment.spaceAround,
                      crossAxisAlignment: pw.CrossAxisAlignment.start,
                      children: [
                        pw.Text("Grand Total",
                            style:
                                pw.TextStyle(fontWeight: pw.FontWeight.bold)),
                        pw.Text("Deposit Paid",
                            style:
                                pw.TextStyle(fontWeight: pw.FontWeight.bold)),
                        pw.Text("Balance Due",
                            style:
                                pw.TextStyle(fontWeight: pw.FontWeight.bold)),
                      ],
                    ),
                    pw.Column(
                      mainAxisAlignment: pw.MainAxisAlignment.spaceEvenly,
                      crossAxisAlignment: pw.CrossAxisAlignment.start,
                      children: [
                        pw.Text(
                            "R${items.fold(0.0, (double prev, element) => prev + (element.unitPrice * element.qty)).toStringAsFixed(2)}",
                            style:
                                pw.TextStyle(fontWeight: pw.FontWeight.bold)),
                        pw.Text("0",
                            style:
                                pw.TextStyle(fontWeight: pw.FontWeight.bold)),
                        pw.Text(
                            "R${items.fold(0.0, (double prev, element) => prev + (element.unitPrice * element.qty)).toStringAsFixed(2)}",
                            style:
                                pw.TextStyle(fontWeight: pw.FontWeight.bold)),
                      ],
                    ),
                  ],
                ),
              ),
              pw.SizedBox(height: 12),
              pw.Wrap(children: [
                pw.Image(pw.MemoryImage(banerImage), fit: pw.BoxFit.contain),
              ])
            ],
          );
        },
      ),
    );
    return pdf.save();
  }

  pw.Expanded itemColumn(List<CustomRow> elements) {
    return pw.Expanded(
      child: pw.Column(
        children: [
          for (var i = 0; i < elements.length; i++)
            pw.Container(
              padding: const pw.EdgeInsets.all(4),
              color: i == 0
                  ? PdfColor.fromHex("#001F34")
                  : i.isEven
                      ? PdfColors.white
                      : PdfColors
                          .grey200, // Set background color for the first row
              child: pw.Row(
                children: [
                  pw.Expanded(
                    flex: 3,
                    child: pw.Text(
                      elements[i].name,
                      textAlign: pw.TextAlign.left,
                      style: pw.TextStyle(
                        color: i == 0
                            ? PdfColors.white
                            : PdfColor.fromHex("#001F34"),
                      ),
                    ),
                  ),
                  pw.Expanded(
                    flex: 1,
                    child: pw.Text(
                      elements[i].qty,
                      textAlign: pw.TextAlign.center,
                      style: pw.TextStyle(
                        color: i == 0
                            ? PdfColors.white
                            : PdfColor.fromHex("#001F34"),
                      ),
                    ),
                  ),
                  pw.Expanded(
                    flex: 1,
                    child: pw.Text(
                      elements[i].unitPrice,
                      textAlign: pw.TextAlign.center,
                      style: pw.TextStyle(
                        color: i == 0
                            ? PdfColors.white
                            : PdfColor.fromHex("#001F34"),
                      ),
                    ),
                  ),
                  pw.Expanded(
                    flex: 1,
                    child: pw.Text(
                      elements[i].total,
                      textAlign: pw.TextAlign.center,
                      style: pw.TextStyle(
                        color: i == 0
                            ? PdfColors.white
                            : PdfColor.fromHex("#001F34"),
                      ),
                    ),
                  ),
                ],
              ),
            ),
        ],
      ),
    );
  }

  // Future<void> savePdfFile(String fileName, Uint8List byteList) async {
  //   final output = await getExternalStorageDirectory();

  //   var filePath = "$output/$fileName.pdf";
  //   File file = File(filePath);
  //   // final file = await FileManager().savedFile(fileName);
  //   await file.writeAsBytes(byteList);

  //   final isCheck = await OpenDocument.checkDocument(filePath: filePath);

  //   try {
  //     if (!isCheck) {
  //       debugPrint(output.toString());
  //       await OpenDocument.openDocument(filePath: filePath);
  //       // filePath = await downloadFile(filePath: "$filePath", url: url);
  //     }
  //   } on OpenDocumentException catch (e) {
  //     debugPrint("ERROR: ${e.errorMessage}");
  //     filePath = 'Failed to get platform version.';
  //   }
  // }

  void createFolder(folder) async {
    FileManager().createDir(folder);
  }

  String getSubTotal(List<Product> products) {
    return products
        .fold(0.0,
            (double prev, element) => prev + (element.amount * element.price))
        .toStringAsFixed(2);
  }

  String getVatTotal(List<Product> products) {
    return products
        .fold(
          0.0,
          (double prev, next) =>
              prev + ((next.price / 100 * next.vatInPercent) * next.amount),
        )
        .toStringAsFixed(2);
  }
}
