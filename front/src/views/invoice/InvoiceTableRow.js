import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "#A3A9B0";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "#A3A9B0",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 30,
    fontStyle: "bold"
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
  }
});

const InvoiceTableRow = ({ items }) => {
  const rows = items.map((item) => (
    <View style={styles.row} key={item.sno.toString()}>
      <Text style={styles.description}>{item.desc}</Text>
      <Text style={styles.qty}>{item.qty}</Text>
      <Text style={styles.rate}>{item.rate}</Text>
      <Text style={styles.amount}>{(item.qty * item.rate).toFixed(2)}</Text>
    </View>
  ));
  return <>{rows}</>;
};

export default InvoiceTableRow;