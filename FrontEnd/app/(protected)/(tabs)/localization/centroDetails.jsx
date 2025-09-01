// screens/CentroDetailsScreen.js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Linking,
  Image,
  StatusBar
} from 'react-native';
import { 
  MapPin, 
  Navigation, 
  Phone, 
  Globe, 
  Clock, 
  Star,
  User,
  ArrowLeft
} from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { placeDetails } from '../../../../services/placesClient';

export default function CentroDetailsScreen() {
  const router = useRouter();
  const { centro } = useLocalSearchParams();
  const [centroData, setCentroData] = useState(JSON.parse(centro));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    ensureDetails();
  }, []);

  const ensureDetails = async () => {
    if (!centroData.place_id) return;
    
    try {
      setLoading(true);
      const d = await placeDetails(centroData.place_id);
      if (d) {
        setCentroData(prev => ({ ...prev, ...d }));
      }
    } catch (error) {
      console.error('Error fetching details:', error);
    } finally {
      setLoading(false);
    }
  };

  const openGoogleMaps = () => {
    if (centroData.place_id) {
      Linking.openURL(`https://www.google.com/maps/search/?api=1&query_place_id=${centroData.place_id}`);
    } else {
      Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(centroData.address)}`);
    }
  };

  const callNumber = async () => {
    const phone = centroData.formatted_phone_number || centroData.phone;
    if (phone) Linking.openURL(`tel:${phone.replace(/\s/g, '')}`);
  };

  const openWebsite = async () => {
    const site = centroData.website;
    if (site) Linking.openURL(site.startsWith('http') ? site : `https://${site}`);
  };

  const renderStars = (rating) => {
    if (!rating) return null;
    
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={20} color="#FFD700" fill="#FFD700" />);
    }
    
    const emptyStars = 5 - fullStars;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={fullStars + i} size={20} color="#CCC" />);
    }
    
    return stars;
  };

  return (
    <View style={styles.detailsContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <View style={styles.detailsHeader}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.detailsTitle}>Detalhes do Centro</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: centroData.image }} style={styles.detailImage} />
        
        <View style={styles.detailsContent}>
          <Text style={styles.detailName}>{centroData.name}</Text>
          
          {centroData.rating && (
            <View style={styles.ratingContainer}>
              {renderStars(centroData.rating)}
              <Text style={styles.ratingText}>
                {centroData.rating} ({centroData.totalRatings || 0} avaliações)
              </Text>
            </View>
          )}

          <View style={styles.detailSection}>
            <Text style={styles.detailSectionTitle}>Endereço</Text>
            <View style={styles.addressRow}>
              <MapPin size={18} color="#666" />
              <Text style={styles.detailText}>{centroData.address}</Text>
            </View>
          </View>
          
          {centroData.phone && (
            <View style={styles.detailSection}>
              <Text style={styles.detailSectionTitle}>Telefone</Text>
              <TouchableOpacity onPress={callNumber} style={styles.contactRow}>
                <Phone size={18} color="#666" />
                <Text style={[styles.detailText, styles.link]}>{centroData.phone}</Text>
              </TouchableOpacity>
            </View>
          )}
          
          {centroData.website && (
            <View style={styles.detailSection}>
              <Text style={styles.detailSectionTitle}>Site</Text>
              <TouchableOpacity onPress={openWebsite} style={styles.contactRow}>
                <Globe size={18} color="#666" />
                <Text style={[styles.detailText, styles.link]} numberOfLines={1}>
                  {centroData.website}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          
          {centroData.schedule && (
            <View style={styles.detailSection}>
              <Text style={styles.detailSectionTitle}>Horário de Funcionamento</Text>
              <View style={styles.scheduleRow}>
                <Clock size={18} color="#666" />
                <Text style={styles.detailText}>{centroData.schedule}</Text>
              </View>
            </View>
          )}
          
          {centroData.description && (
            <View style={styles.detailSection}>
              <Text style={styles.detailSectionTitle}>Sobre</Text>
              <Text style={styles.detailText}>{centroData.description}</Text>
            </View>
          )}
          
          {centroData.activities && centroData.activities.length > 0 && (
            <View style={styles.detailSection}>
              <Text style={styles.detailSectionTitle}>Atividades</Text>
              <View style={styles.activitiesRow}>
                {centroData.activities.map((activity, index) => (
                  <View key={index} style={styles.activityPill}>
                    <Text style={styles.activityPillText}>{activity}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
          
          {centroData.reviews && centroData.reviews.length > 0 && (
            <View style={styles.detailSection}>
              <Text style={styles.detailSectionTitle}>Avaliações</Text>
              {centroData.reviews.map((review, index) => (
                <View key={index} style={styles.reviewContainer}>
                  <View style={styles.reviewHeader}>
                    <User size={16} color="#666" />
                    <Text style={styles.reviewAuthor}>{review.author}</Text>
                    <View style={styles.reviewRating}>
                      {renderStars(review.rating)}
                    </View>
                  </View>
                  <Text style={styles.reviewText}>{review.comment}</Text>
                </View>
              ))}
            </View>
          )}
          
          <View style={styles.detailActions}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.primaryButton]}
              onPress={openGoogleMaps}
            >
              <Navigation size={20} color="#fff" />
              <Text style={styles.actionButtonText}>Como chegar</Text>
            </TouchableOpacity>
            
            {centroData.phone && (
              <TouchableOpacity 
                style={[styles.actionButton, styles.secondaryButton]}
                onPress={callNumber}
              >
                <Phone size={20} color="#fff" />
                <Text style={styles.actionButtonText}>Ligar</Text>
              </TouchableOpacity>
            )}
            
            {centroData.website && (
              <TouchableOpacity 
                style={[styles.actionButton, styles.tertiaryButton]}
                onPress={openWebsite}
              >
                <Globe size={20} color="#fff" />
                <Text style={styles.actionButtonText}>Site</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 4,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  detailImage: {
    width: '100%',
    height: 250,
  },
  detailsContent: {
    padding: 20,
  },
  detailName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#666',
  },
  detailSection: {
    marginBottom: 24,
  },
  detailSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginLeft: 8,
    flex: 1,
  },
  link: {
    color: '#4A90E2',
  },
  activitiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  activityPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#e6f2ff',
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  activityPillText: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '500',
  },
  reviewContainer: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewAuthor: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
    marginRight: 'auto',
  },
  reviewRating: {
    flexDirection: 'row',
  },
  reviewText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  detailActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    flexWrap: 'wrap',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
    minWidth: '48%',
  },
  primaryButton: {
    backgroundColor: '#4A90E2',
  },
  secondaryButton: {
    backgroundColor: '#34C759',
  },
  tertiaryButton: {
    backgroundColor: '#5856D6',
  },
  actionButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '600',
  },
});