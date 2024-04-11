import React from "react";
import { StyleSheet, Image, Text, View } from "@react-pdf/renderer";
import InvoiceItemsTable from "./InvoiceItemsTable";

const styles = StyleSheet.create({
    container: {
        maxWidth: "1140px",
        padding: "12px"
    }, 
  logo: {
    width: 84,
    height: 70
  },
  main: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
  },
  details: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "18px 0",
    borderBottom: "1px solid #000",
    paddingBottom: "15px"
  }
});

const InvoiceComponent = ({ invoice }) => {
  return (
    <View style={styles.container}>
        <View style={styles.main}>
            <Text style={{ fontSize: "22px"}}>Bootdey.com</Text>
            <View style={{display: "flex", flexDirection:"row", gap: "5",justifyContent: "space-between"}}>
                <Text style={{fontSize: "18px"}}>Facture N°14</Text>
                <Text style={{padding: "4px", backgroundColor: "red", borderRadius: "4px", color : "#fff", fontSize:"15px",fontWeight: "bolt"}}>Impayée</Text>
            </View>
        </View>
        <View style={{paddingBottom: "15px", borderBottom: "1px solid #000"}}>
            <Text>3184 Spruce Drive Pittsburgh, PA 15201</Text>
            <Text>xyz@987.com</Text>
            <Text>012-345-6789</Text>
        </View>
        <View style={styles.details}>
            <View>
                <View>
                    <Text style={{fontSize: "14px", fontWeight: "bold"}}>Facturé à : <Text style={{fontSize: "12px"}}>Patrick aimé</Text></Text>
                    <Text style={{fontSize: "14px", fontWeight: "bold"}}>Contact : <Text style={{fontSize: "12px"}}>2250708377751</Text></Text>
                    <Text style={{fontSize: "14px", fontWeight: "bold"}}>Projet : </Text>
                    <Text style={{fontSize: "12px"}}>Gestion d'une école</Text>
                    
                </View>
            </View>
            <View>
                <Text style={{fontSize: "14px", fontWeight: "bold"}}>Numéro de facture :</Text>
                <Text style={{fontSize: "12px"}}>Patrick aimé</Text>
                <Text style={{fontSize: "14px", fontWeight: "bold"}}>Date de faturation : </Text>
                <Text style={{fontSize: "12px"}}>10/01/1997</Text>
            </View>
        </View>
        <View>
            <Text style={{fontSize: "14px"}}>Détails de la facture</Text>
        </View>
        <InvoiceItemsTable invoice={invoice} />
    </View>
  );
};

export default InvoiceComponent;
