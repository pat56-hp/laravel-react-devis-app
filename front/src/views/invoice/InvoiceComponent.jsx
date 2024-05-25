import React from "react";
import { StyleSheet, Image, Text, View } from "@react-pdf/renderer";
import InvoiceItemsTable from "./InvoiceItemsTable";
import getDate from "../../helpers/date";
import number_format from "../../helpers/numberFormat";

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
  },
  totalContainer:{
    display: "flex", flexDirection:"row", gap: "5", justifyContent: "space-between", fontSize: "12px", borderBottom: "1px solid #A3A9B0", fontWeight: "bold",
  }
});

const InvoiceComponent = ({ facture }) => {
  return (
    <View style={styles.container}>
        <View style={styles.main}>
            <Text style={{ fontSize: "22px"}}>Patrick Aimé Kouassi</Text>
            <View style={{display: "flex", flexDirection:"row", gap: "5",justifyContent: "space-between"}}>
                <Text style={{fontSize: "18px"}}>Facture N° {facture.ref}</Text>
                <Text style={{padding: "4px", backgroundColor: facture.status == 0 ? 'red' : '#28a745', borderRadius: "4px", color : "#fff", fontSize:"15px",fontWeight: "bolt"}}>{facture.status === 0 ? 'Impayée' : 'Payée'}</Text>
            </View>
        </View>
        <View style={{paddingBottom: "15px", borderBottom: "1px solid #000"}}>
            <Text>Abidjan, Côte d'Ivoire</Text>
            <Text>patrickkouassi7@gmail.com</Text>
            <Text>+2250708377751</Text>
        </View>
        <View style={styles.details}>
            <View>
                <View>
                    <Text style={{fontSize: "14px", fontWeight: "bold"}}>Facturé à : <Text style={{fontSize: "12px"}}>{facture.project?.client.name}</Text></Text>
                    <Text style={{fontSize: "14px", fontWeight: "bold"}}>Contact : <Text style={{fontSize: "12px"}}>{facture.project?.client.phone}</Text></Text>
                    <Text style={{fontSize: "14px", fontWeight: "bold"}}>Projet : {facture.project?.title}</Text>
                    <Text style={{fontSize: "14px", fontWeight: "bold"}}>Temps d'exécution : <Text style={{fontSize: "12px"}}>...</Text></Text>
                </View>
            </View>
            <View>
                <Text style={{fontSize: "14px", fontWeight: "bold"}}>Numéro de facture :</Text>
                <Text style={{fontSize: "12px"}}>{facture.ref}</Text>
                <Text style={{fontSize: "14px", fontWeight: "bold"}}>Date de facturation : </Text>
                <Text style={{fontSize: "12px"}}>{ getDate(facture.created_at) }</Text>
            </View>
        </View>
        <View>
            <Text style={{fontSize: "14px"}}>Détails de la facture</Text>
        </View>
        <InvoiceItemsTable elements={facture.elements} />
        <View style={{display: "flex", flexDirection: "row", gap: "5",justifyContent: "space-between", marginTop: "10px"}}>
          <View style={{width: "60%"}}></View>
          <View style={{borderWidth: 1, borderColor: "#A3A9B0", width: "40%"}}>
            <View style={styles.totalContainer}>
                <Text style={{width: "50%", padding: "5px 10px"}}>Sous-total : </Text>
                <Text style={{fontWeight: "bolt", width: "50%", textAlign: "right", padding: "5px 10px"}}>{number_format(facture.sousTotal, 0, ' ', ' ')} FCFA</Text>
            </View>
            <View style={styles.totalContainer}>
                <Text style={{width: "50%", padding: "5px 10px"}}>Remise : </Text>
                <Text style={{fontWeight: "bolt", width: "50%", textAlign: "right", padding: "5px 10px"}}>{number_format(facture.remise, 0, ' ', ' ')} FCFA</Text>
            </View>
            <View style={styles.totalContainer}>
                <Text style={{width: "50%", padding: "5px 10px"}}>Total : </Text>
                <Text style={{fontWeight: "bolt", width: "50%", textAlign: "right", padding: "5px 10px"}}>{number_format(facture.total, 0, ' ', ' ')} FCFA</Text>
            </View>
          </View>
        </View>
        <View style={{marginTop: "50px"}}>
          <Text style={{fontWeight: "600", fontSize: "16px", marginBottom: "10px", textDecoration: "underline"}}>CONDITIONS ET MODALITES DE PAIEMENT :</Text>
          <Text style={{fontSize: "12px"}}>Les modalités de paiement sont les suivantes : </Text>
          <Text style={{fontSize: "12px"}}>
            <Text style={{fontWeight: "600", fontSize: "14px"}}>40% </Text> 
             de la somme due au démarrage et 
            <Text style={{fontWeight: "600", fontSize: "14px"}}> 60% </Text> 
            à la livraison. 
          </Text>
          <Text style={{fontSize: "14px", marginTop: "20px", color: "red"}}>
            <Text style={{fontWeight: "600", textDecoration : "underline"}}>NB :</Text> 3 mois de maintenance gratuit.
          </Text>
        </View>
    </View>
  );
};

export default InvoiceComponent;
