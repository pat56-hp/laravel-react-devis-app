import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 36,
    justifyContent: "flex-start",
    width: "50%"
  },
  billTo: {
    marginRight: 10
  },
  Mainbillto: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    paddingBottom: 3
  }
});

const InvoiceBillTo = ({ invoice }) => (
  <View style={styles.headerContainer}>
    <View style={styles.Mainbillto}>
      <Text style={styles.billTo}>Bill To:</Text>
      <Text>{invoice.fullname}</Text>
    </View>
    <View style={styles.Mainbillto}>
      <Text style={styles.billTo}>Address:</Text>
      <Text>{invoice.address}</Text>
    </View>
    <View style={styles.Mainbillto}>
      <Text style={styles.billTo}>Phone no:</Text>
      <Text>{invoice.phone}</Text>
    </View>
    <View style={styles.Mainbillto}>
      <Text style={styles.billTo}>Email:</Text>
      <Text>{invoice.email}</Text>
    </View>
  </View>
);

export default InvoiceBillTo;