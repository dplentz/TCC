import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  campo: {
    fontWeight: "bold",
    marginRight: 5,
  },
  valor: {
    flex: 1,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
});

const CreatePdf = ({ data, objData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Relatório de Dados</Text>
      <Text style={styles.subtitle}>Datas:</Text>
      {data.map((date) => (
        <Text key={date}>{date}</Text>
      ))}
      <Text style={styles.subtitle}>Objetos:</Text>
      {objData.map((obj, index) => (
        <View key={index} style={styles.container}>
          {Object.entries(obj).map(([campo, valor]) => (
            <View key={campo} style={styles.container}>
              <Text style={styles.campo}>{campo}:</Text>
              <Text style={styles.valor}>{valor}</Text>
            </View>
          ))}
        </View>
      ))}
    </Page>
  </Document>
);

export default CreatePdf;
