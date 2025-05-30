import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RouteScreen from './RouteScreen';
import ReservationScreen from './ReservationScreen';

interface TripDetailScreenProps {
  onBack: () => void;
  onHome?: () => void;
  tripData?: {
    title: string;
    location: string;
    rating: number;
    reviewCount: number;
    price: string;
  };
}

export default function TripDetailScreen({ onBack, onHome, tripData }: TripDetailScreenProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showRoute, setShowRoute] = useState(false);
  const [showReservation, setShowReservation] = useState(false);

  const defaultTripData = {
    title: 'Amasra Turu',
    location: 'Amasra, Türkiye',
    rating: 4.7,
    reviewCount: 2498,
    price: '$250/Kişi'
  };

  const trip = tripData || defaultTripData;

  const fullText = "Karadeniz'in incisi Amasra'da unutulmaz bir tatil deneyimi sizi bekliyor. Tarihi dokusu, muhteşem doğası ve eşsiz deniz manzarası ile Amasra, her yaştan ziyaretçi için ideal bir destinasyondır. Tur paketimizde uçak bileti, önerilen otel odaları ve ulaşım dahildir. Amasra Kalesi, Fatih Camii, Bedesten ve tarihi liman gibi önemli turistik noktaları ziyaret edeceksiniz. Ayrıca geleneksel Amasra balığı tatma fırsatı da bulacaksınız. Denize girebileceğiniz, fotoğraf çekebileceğiniz ve unutulmaz anılar biriktireceğiniz harika bir gezi sizi bekliyor.";
  
  const shortText = "Karadeniz'in incisi Amasra'da unutulmaz bir tatil deneyimi sizi bekliyor. Tarihi dokusu, muhteşem doğası ve eşsiz deniz manzarası ile Amasra, her yaştan ziyaretçi için ideal bir destinasyondır. Tur paketimizde uçak bileti, önerilen otel odaları ve ulaşım dahildir...";

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleRouteView = () => {
    setShowRoute(true);
  };

  const handleRouteBack = () => {
    setShowRoute(false);
  };

  const handleReservation = () => {
    setShowReservation(true);
  };

  const handleReservationBack = () => {
    setShowReservation(false);
  };

  if (showRoute) {
    return <RouteScreen onBack={handleRouteBack} />;
  }

  if (showReservation) {
    return (
      <ReservationScreen 
        onBack={handleReservationBack} 
        onHome={onHome}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <ImageBackground 
          source={require('../../assets/ob1.png')} 
          style={styles.headerImage}
          resizeMode="cover"
        >
          <View style={styles.headerOverlay}>
            <View style={styles.header}>
              <TouchableOpacity style={styles.backButton} onPress={onBack}>
                <Ionicons name="chevron-back" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Gezi Detayları</Text>
              <TouchableOpacity style={styles.bookmarkButton}>
                <Ionicons name="bookmark-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        {/* Content Card */}
        <View style={styles.contentCard}>
          <View style={styles.titleSection}>
            <View style={styles.titleContainer}>
              <Text style={styles.tripTitle}>{trip.title}</Text>
              <Text style={styles.tripLocation}>{trip.location}</Text>
            </View>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face&auto=format' }} 
              style={styles.avatar}
            />
          </View>

          {/* Trip Info */}
          <View style={styles.tripInfo}>
            <View style={styles.infoItem}>
              <Ionicons name="location-outline" size={18} color="#999" />
              <Text style={styles.infoText}>Amasra</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="star" size={18} color="#FFD700" />
              <Text style={styles.ratingText}>{trip.rating} ({trip.reviewCount})</Text>
            </View>
            <Text style={styles.priceText}>{trip.price}</Text>
          </View>

          {/* Image Gallery */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.galleryContainer}
            contentContainerStyle={styles.gallery}
          >
            {[
              require('../../assets/ob1.png'),
              require('../../assets/ob2.png'),
              require('../../assets/ob3.png'),
              require('../../assets/ob1.png'),
              require('../../assets/ob2.png')
            ].map((image, index) => (
              <TouchableOpacity key={index} style={styles.galleryItem}>
                <Image source={image} style={styles.galleryImage} />
                {index === 4 && (
                  <View style={styles.moreImagesOverlay}>
                    <Text style={styles.moreImagesText}>+16</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* About Section */}
          <View style={styles.aboutSection}>
            <Text style={styles.aboutTitle}>Tur Hakkında</Text>
            <Text style={styles.aboutText}>
              {isExpanded ? fullText : shortText}
              {!isExpanded && (
                <Text style={styles.readMoreText} onPress={toggleExpanded}> Devamını Oku</Text>
              )}
            </Text>
            {isExpanded && (
              <TouchableOpacity onPress={toggleExpanded} style={styles.showLessContainer}>
                <Text style={styles.readMoreText}>Daha Az Göster</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.routeButton} onPress={handleRouteView}>
              <Text style={styles.routeButtonText}>Rotayı İncele</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reservationButton} onPress={handleReservation}>
              <Text style={styles.reservationButtonText}>Rezervasyon Yap</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  headerImage: {
    height: 400,
    width: '100%',
  },
  headerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  bookmarkButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentCard: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 40,
    minHeight: 600,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  titleContainer: {
    flex: 1,
  },
  tripTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  tripLocation: {
    fontSize: 16,
    color: '#999',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: 16,
    overflow: 'hidden',
  },
  tripInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 6,
    fontWeight: '500',
  },
  ratingText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 6,
    fontWeight: '500',
  },
  priceText: {
    fontSize: 18,
    color: '#24BAEC',
    fontWeight: '600',
    marginLeft: 'auto',
  },
  galleryContainer: {
    marginBottom: 30,
  },
  gallery: {
    paddingRight: 20,
  },
  galleryItem: {
    marginRight: 12,
    position: 'relative',
  },
  galleryImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
  },
  moreImagesOverlay: {
    width: 80,
    height: 80,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreImagesText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  aboutSection: {
    marginBottom: 40,
  },
  aboutTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  aboutText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  readMoreText: {
    color: '#FF6B35',
    fontWeight: '600',
    fontSize: 15,
  },
  showLessContainer: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  routeButton: {
    flex: 1,
    backgroundColor: '#24BAEC',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  routeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  reservationButton: {
    flex: 1,
    backgroundColor: '#FF6B35',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  reservationButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 