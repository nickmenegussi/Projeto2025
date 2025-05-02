import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React from "react";
import { ArrowLeftIcon } from "lucide-react-native";
import { router } from "expo-router";

export default function LoanCollection() {
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={styles.HeaderComponent}>
        <TouchableOpacity
          style={styles.ReturnButton}
          activeOpacity={0.6}
          onPress={() => router.back()}
        >
          <ArrowLeftIcon size={30} color={"white"} />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <Text>Página em produção!</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  ReturnButton: {
    top: 30,
    left: 5,
  },
  HeaderComponent: {
    paddingVertical: 20,
  },
  SafeAreaView: {
    flex: 1,
    backgroundColor: "#003B73",
    padding: 10,
    paddingVertical: 20,
  },
  contentContainer: {
    paddingLeft: 10,
    flex: 1,
    gap: 20,
    paddingVertical: 50
  },
});
