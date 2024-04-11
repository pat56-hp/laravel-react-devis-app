import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  invoiceNoContainer: {
    flexDirection: "row",
    marginTop: 36,
    justifyContent: "flex-end"
  },
  invoiceDateContainer: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  invoiceInvoiceNo: {
    fontSize: 12,
    fontStyle: "bold"
  },
  invoiceDate: {
    fontSize: 12,
    fontStyle: "bold"
  },
  label: {
    marginRight: 15
  }
});

const InvoiceNo = ({ invoice }) => (
  <>
    <View style={styles.invoiceNoContainer}>
      <Text style={styles.label}>Invoice No:</Text>
      <Text style={styles.invoiceInvoiceNo}>{invoice.invoice_no}</Text>
    </View>
    <View style={styles.invoiceDateContainer}>
      <Text style={styles.label}>Date: </Text>
      <Text style={styles.invoiceDate}>{invoice.trans_date}</Text>
    </View>
  </>
);

export default InvoiceNo;