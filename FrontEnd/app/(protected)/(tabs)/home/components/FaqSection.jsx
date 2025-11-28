import React from "react";
import { View } from "react-native";
import FAQ from "../../../../../components/FAQ";
import styles from "../styles/homeStyles";

const FAQSection = () => (
  <View style={styles.containerFaq}>
    <FAQ />
  </View>
);

export default FAQSection;