import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 24, fontSize: 12 },
  section: { marginBottom: 12 },
  title: { fontSize: 20, marginBottom: 12, fontWeight: "bold" },
  label: { fontWeight: "bold", marginTop: 6 },
});

export default function AuditPDF({ data, complianceRate }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Electronic Audit Report</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Department:</Text>
          <Text>{data.department || "N/A"}</Text>

          <Text style={styles.label}>Auditor Name:</Text>
          <Text>{data.auditorName || "N/A"}</Text>

          <Text style={styles.label}>Staff Member:</Text>
          <Text>{data.staffMember || "N/A"}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Hand Hygiene Steps Completed:</Text>
          {Object.entries(data.handHygieneSteps).map(([key, value]) => (
            <Text key={key}>
              {key}: {value ? "Yes" : "No"}
            </Text>
          ))}

          <Text style={{ marginTop: 6, fontWeight: "bold" }}>
            Compliance Rate: {complianceRate}%
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>PPE Used:</Text>
          <Text>{data.ppeUsed.length ? data.ppeUsed.join(", ") : "None"}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Observations:</Text>
          <Text>{data.observations || "None"}</Text>
        </View>
      </Page>
    </Document>
  );
}
