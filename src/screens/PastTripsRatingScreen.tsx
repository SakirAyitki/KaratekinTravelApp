import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TripRatingDetailScreen from './TripRatingDetailScreen';

interface PastTripsRatingScreenProps {
  onBack: () => void;
}

interface PastTrip {
  id: number;
  title: string;
  location: string;
  rating: number;
  price: string;
  image: string;
  isRated: boolean;
  userRating?: number;
  reviewCount?: number;
}

export default function PastTripsRatingScreen({ onBack }: PastTripsRatingScreenProps) {
  const [pastTrips, setPastTrips] = useState<PastTrip[]>([
    {
      id: 1,
      title: 'Niladri Reservoir',
      location: 'Tekergat, Sunamgnj',
      rating: 4.7,
      price: '$459/Person',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      isRated: false,
      reviewCount: 2498,
    },
    {
      id: 2,
      title: 'Casa Las Tirtugas',
      location: 'Av Damero, Mexico',
      rating: 4.8,
      price: '$894/Person',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
      isRated: true,
      userRating: 4,
      reviewCount: 3247,
    },
    {
      id: 3,
      title: 'Amasra Turu',
      location: 'Amasra, Türkiye',
      rating: 4.7,
      price: '$250/Kişi',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      isRated: false,
      reviewCount: 2498,
    },
    {
      id: 4,
      title: 'Casa Las Tirtugas',
      location: 'Av Damero, Mexico',
      rating: 4.8,
      price: '$894/Person',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
      isRated: true,
      userRating: 4,
      reviewCount: 3247,
    },
  ]);

  const [showRatingDetail, setShowRatingDetail] = useState(false);
  const [selectedTripForRating, setSelectedTripForRating] = useState<PastTrip | null>(null);

  const handleRate = (tripId: number) => {
    const trip = pastTrips.find(t => t.id === tripId);
    if (trip) {
      setSelectedTripForRating(trip);
      setShowRatingDetail(true);
    }
  };

  const handleBackFromRatingDetail = () => {
    setShowRatingDetail(false);
    setSelectedTripForRating(null);
  };

  const handleSubmitRating = (tripId: number, rating: number, comment: string) => {
    setPastTrips(prevTrips =>
      prevTrips.map(trip =>
        trip.id === tripId
          ? { ...trip, isRated: true, userRating: rating }
          : trip
      )
    );
  };

  if (showRatingDetail && selectedTripForRating) {
    return (
      <TripRatingDetailScreen
        onBack={handleBackFromRatingDetail}
        tripData={{
          id: selectedTripForRating.id,
          title: selectedTripForRating.title,
          location: selectedTripForRating.location,
          rating: selectedTripForRating.rating,
          reviewCount: selectedTripForRating.reviewCount || 0,
          price: selectedTripForRating.price,
          image: selectedTripForRating.image,
        }}
        onSubmitRating={handleSubmitRating}
      />
    );
  }

  const renderTripCard = ({ item }: { item: PastTrip }) => (
    <View style={styles.tripCard}>
      <Image source={{ uri: item.image }} style={styles.tripImage} />
      <View style={styles.tripContent}>
        <Text style={styles.tripTitle}>{item.title}</Text>
        <View style={styles.tripInfo}>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={14} color="#999" />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <Text style={styles.priceText}>{item.price}</Text>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          {!item.isRated ? (
            <TouchableOpacity 
              style={styles.rateButton}
              onPress={() => handleRate(item.id)}
            >
              <Ionicons name="sync-outline" size={16} color="white" />
              <Text style={styles.rateButtonText}>Değerlendir</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.ratedButton}>
              <Ionicons name="checkmark" size={16} color="white" />
              <Text style={styles.ratedButtonText}>
                Değerlendirildi {item.userRating}/5 ⭐
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Değerlendirme Yap</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Content */}
      <FlatList
        data={pastTrips}
        renderItem={renderTripCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.tripsContainer}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#F8F9FA',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  headerRight: {
    width: 40,
  },
  tripsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  tripCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  tripImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  tripContent: {
    padding: 12,
  },
  tripTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  tripInfo: {
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#333',
    marginLeft: 4,
    fontWeight: '600',
  },
  priceText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#24BAEC',
    marginBottom: 12,
  },
  actionButtons: {
    marginTop: 8,
  },
  rateButton: {
    backgroundColor: '#24BAEC',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rateButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  ratedButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratedButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
}); 