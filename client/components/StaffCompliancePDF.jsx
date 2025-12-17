import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 24, fontSize: 12 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  section: { marginBottom: 16 },
  label: { fontWeight: "bold", marginBottom: 4 },
  deptRow: { marginBottom: 6 },
  activityRow: { marginBottom: 6 },
  status: { fontSize: 10 },
});

export default function StaffCompliancePDF({
  departments,
  overallCompliance,
  recentActivities,
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Staff Compliance Dashboard Report</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Overall Compliance:</Text>
          <Text>{overallCompliance}%</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Department Performance:</Text>
          {departments.map((dept, index) => (
            <View key={index} style={styles.deptRow}>
              <Text>
                {dept.name} ({dept.staff} staff) - {dept.compliance}% compliance{" "}
                {dept.trend === "up" ? "↑" : dept.trend === "down" ? "↓" : "→"}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Recent Activity:</Text>
          {recentActivities.map((act, index) => (
            <View key={index} style={styles.activityRow}>
              <Text>
                {act.user} | {act.time} | {act.action} |{" "}
                {act.status === "success"
                  ? "✓ Compliant"
                  : act.status === "warning"
                  ? "⚠ Needs Review"
                  : "✗ Non-Compliant"}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
