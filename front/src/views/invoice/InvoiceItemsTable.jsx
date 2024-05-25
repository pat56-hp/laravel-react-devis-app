import React from "react";
import { View, StyleSheet, Text } from "@react-pdf/renderer";
import InvoiceTableRow from "./InvoiceTableRow";

const borderColor = "#A3A9B0";

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 14,
    borderWidth: 1,
    borderColor: "#A3A9B0"
  },
  container: {
    flexDirection: "row",
    borderBottomColor: "#A3A9B0",
    backgroundColor: "#A3A9B0",
    color: "#fff",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 30,
    textAlign: "center",
    fontStyle: "bold",
    fontSize: "12px",
    flexGrow: 1,
  },
  description: {
    width: "60%",
    textAlign: "left",
    paddingLeft: 8
  },
  qty: {
    width: "10%",
    textAlign: "center",
    paddingRight: 8
  },
  rate: {
    width: "15%",
    textAlign: "center",
    paddingRight: 8
  },
  amount: {
    width: "15%",
    textAlign: "right",
    paddingRight: 8
  },
  total: {
    display: "flex",
    flexDirection: "row-reverse"

  }
});

const InvoiceItemsTable = ({ elements }) => {

  return (
    <View style={styles.tableContainer}>
      {/* Invoice Table Header */}
      <View style={styles.container}>
        <Text style={styles.description}>Libéllé</Text>
        <Text style={styles.qty}>Qté</Text>
        <Text style={styles.rate}>Prix u.</Text>
        <Text style={styles.amount}>Total</Text>
      </View>
      {/* Invoice Table Rows */}
      <InvoiceTableRow elements={elements} />
      <View >
        <Text></Text>
      </View>
    </View>
  );
};

export default InvoiceItemsTable;