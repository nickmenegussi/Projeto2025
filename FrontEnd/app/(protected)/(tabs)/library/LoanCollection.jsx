import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useMemo } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeftIcon } from "lucide-react-native";
import CustomNavagation from "../../../../components/CustomNavagation";
import LoadingScreen from "../../../../components/AcitivityIndicator";
import CardCustom from "../../../../components/CardCustom";

const LoanCollection = () => {
  const params = useLocalSearchParams();
  const books = useMemo(() => params.data ? JSON.parse(params.data) : [], [params.data]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <ArrowLeftIcon size={28} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.title}>Acervo para Empréstimos</Text>
            <CustomNavagation
              textStyle={styles.navText}
              itemStyle={styles.navItem}
              otherStyles={true}
              trendingItems={[
                { name: "Obras de Apoio" },
                { name: "Obras Básicas" },
              ]}
            />
          </View>
          
          <View style={styles.divider} />
        </View>

        <ScrollView 
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {books.length > 0 ? (
            <>
              <CardCustom data={books} aboutBookLoan={true}/>
              <View style={styles.extraCard}>
                <CardCustom data={books} aboutBookLoan={true}/>
              </View>
            </>
          ) : (
            <LoadingScreen />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#003B73",
  },
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 16,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 8,
  },
  headerContent: {
    marginTop: 70,
    paddingLeft: 14
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: "#FFFFFF",
    marginBottom: 24,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 20
  },
  contentContainer: {
    paddingBottom: 140,  
    paddingLeft: 10
  
  },
  extraCard: {
    marginTop: 16,
  },
  navText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: '500',
    textAlign: "center",
  },
  navItem: {
    minWidth: 120,
    backgroundColor: "#60A3D9",
    borderRadius: 8,
    justifyContent: "center",
  }, listContent: {
    height: 300
  }
});

export default React.memo(LoanCollection);