import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 30,
    borderBottom: "3 solid #14b8a6",
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0f766e",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 5,
  },
  dateText: {
    fontSize: 10,
    color: "#94a3b8",
    textAlign: "center",
  },
  sopContainer: {
    marginBottom: 25,
    padding: 15,
    backgroundColor: "#f0fdfa",
    borderRadius: 8,
    borderLeft: "4 solid #14b8a6",
  },
  sopHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 10,
    borderBottom: "1 solid #99f6e4",
  },
  sopTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0f766e",
    flex: 1,
  },
  sopSubtitle: {
    fontSize: 11,
    color: "#0d9488",
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 4,
  },
  itemContainer: {
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  bullet: {
    fontSize: 10,
    color: "#14b8a6",
    marginRight: 8,
    marginTop: 2,
  },
  itemText: {
    fontSize: 10,
    color: "#334155",
    flex: 1,
    lineHeight: 1.5,
  },
  colorItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  colorText: {
    fontSize: 10,
    color: "#334155",
  },
  noteContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTop: "1 solid #99f6e4",
  },
  noteText: {
    fontSize: 10,
    color: "#0d9488",
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 8,
    color: "#94a3b8",
    borderTop: "1 solid #e2e8f0",
    paddingTop: 10,
  },
  pageNumber: {
    position: "absolute",
    bottom: 20,
    right: 40,
    fontSize: 8,
    color: "#94a3b8",
  },
});

const colorMap = {
  "bg-yellow-500": "#eab308",
  "bg-red-500": "#ef4444",
  "bg-gray-800": "#1f2937",
  "bg-blue-500": "#3b82f6",
};

export default function SOPPDF({ sops }) {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.header} fixed>
          <Text style={styles.title}>Standard Operating Procedures</Text>
          <Text style={styles.subtitle}>
            Comprehensive Infection Control Protocols for Healthcare Safety
          </Text>
          <Text style={styles.dateText}>Generated on {currentDate}</Text>
        </View>

        {sops.map((sop, index) => (
          <View key={index} style={styles.sopContainer} wrap={false}>
            <View style={styles.sopHeader}>
              <Text style={styles.sopTitle}>{sop.title}</Text>
            </View>

            {sop.subtitle && (
              <Text style={styles.sopSubtitle}>{sop.subtitle}</Text>
            )}

            {sop.items &&
              sop.items.map((item, idx) => (
                <View key={idx} style={styles.itemContainer}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.itemText}>{item}</Text>
                </View>
              ))}

            {sop.colorItems &&
              sop.colorItems.map((item, idx) => (
                <View key={idx} style={styles.colorItemContainer}>
                  <View
                    style={[
                      styles.colorDot,
                      { backgroundColor: colorMap[item.color] || "#64748b" },
                    ]}
                  />
                  <Text style={styles.colorText}>{item.text}</Text>
                </View>
              ))}

            {sop.note && (
              <View style={styles.noteContainer}>
                <Text style={styles.noteText}>{sop.note}</Text>
              </View>
            )}
          </View>
        ))}

        <Text style={styles.footer} fixed>
          This document contains confidential information. Healthcare
          Professional Use Only.
        </Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
}
