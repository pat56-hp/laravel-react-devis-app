import React, { useEffect, useState } from 'react'
import { Document, Text, Page, PDFViewer, StyleSheet, View } from '@react-pdf/renderer';
import InvoiceComponent from '../invoice/InvoiceComponent';
import axiosClient from '../../axios-client';
import { useNavigate, useParams } from 'react-router-dom';

export default function FacturePdf() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [facture, setFacture] = useState(null)

    const styles = StyleSheet.create({
        page: {
            backgroundColor: "#fff",
            fontFamily: "Helvetica",
            fontSize: 11,
            paddingTop: 30,
            paddingLeft: 20,
            paddingRight: 20,
            lineHeight: 1.5,
            flexDirection: "column"
          },
        section: {
          margin: 10,
          padding: 20,
          flexGrow: 1
        },
        viewer: {
            width: window.innerWidth / 3,
            height: window.innerHeight / 2,
          },
      });

    const getFacture = () => {
        axiosClient.get(`/factures/show/${id}`)
            .then(({data}) => {
                setFacture(data.facture)
            })
            .catch(err => {
                const resp = err.response
                if (resp && resp.status === 401) {
                    navigate('/login')
                }
            })
    }

    useEffect(() => {
        getFacture()
    }, [])

  return (
    <PDFViewer style={{ width: "100%", height: "650px" }}>
        <Document>
            <Page size="A4" style={styles.page}>
                {facture && <InvoiceComponent facture={facture} />}
            </Page>
        </Document>
    </PDFViewer>
  );
}
