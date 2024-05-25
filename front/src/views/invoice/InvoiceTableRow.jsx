import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import number_format from "../../helpers/numberFormat";

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

const InvoiceTableRow = ({ elements }) => {
  const rows = elements.length > 0 ? elements.map((element, key) => (
    <View style={styles.row} key={key}>
      <Text style={styles.description}>{element.libelle}</Text>
      <Text style={styles.qty}>{element.qty}</Text>
      <Text style={styles.rate}>{number_format(element.prix, 0, ' ', ' ')} FCFA</Text>
      <Text style={styles.amount}>{number_format((element.qty * element.prix), 0, ' ', ' ')} FCFA</Text>
    </View> 
  )) : 'Aucun';
  return <>{rows}</>;
};

export default InvoiceTableRow;