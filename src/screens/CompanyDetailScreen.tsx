import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CompanyDetailScreenProps {
  onBack: () => void;
  companyName: string;
  onTripPress?: (tripId: number, isPast: boolean) => void;
  onBookmarkTrip?: (trip: any) => void;
  isTripSaved?: (tripId: number) => boolean;
  onContactPress?: () => void;
  onBusInfoPress?: () => void;
}

export default function CompanyDetailScreen({ onBack, companyName, onTripPress, onBookmarkTrip, isTripSaved, onContactPress, onBusInfoPress }: CompanyDetailScreenProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedRatingFilter, setSelectedRatingFilter] = useState<string | null>(null);

  const companyData = {
    name: 'Kamil Koç',
    trips: '45+',
    participants: '350+',
    website: 'www.kamilkoc.com',
    rating: 9.2,
    description: 'You will get a complete travel package on the beaches. Packages in the form of airline tickets, recommended Hotel rooms, Transportation, Have you ever been on holiday to the Greek ETC...',
    fullDescription: 'You will get a complete travel package on the beaches. Packages in the form of airline tickets, recommended Hotel rooms, Transportation, Have you ever been on holiday to the Greek ETC... Our company has been providing excellent travel services for over 10 years. We ensure the best quality accommodations, reliable transportation, and unforgettable experiences for all our travelers. Our experienced guides will take you to the most beautiful locations and provide you with comprehensive information about each destination.',
  };

  const currentTrips = [
    {
      id: 1,
      title: 'Amasra Turu',
      location: 'Amasra, Türkiye',
      date: '26 Temmuz',
      time: '08:30',
      participants: '45/50 (Son 5 Kişi)',
      image: require('../../assets/ob1.png'),
    },
  ];

  const pastTrips = [
    {
      id: 1,
      title: 'Amasra Turu',
      location: 'Amasra, Türkiye',
      date: '26 Temmuz',
      time: '08:30',
      image: require('../../assets/ob1.png'),
    },
    {
      id: 2,
      title: 'Kastamonu Turu',
      location: 'Kastamonu, Türkiye',
      date: '10 Ekim',
      time: '07:45',
      image: require('../../assets/ob1.png'),
    },
    {
      id: 3,
      title: 'Ege Turu',
      location: 'İzmir, Türkiye',
      date: '08 Aralık',
      time: '09:30',
      image: require('../../assets/ob1.png'),
    },
  ];

  const reviews = [
    {
      id: 1,
      name: 'Tunahan KORKMAZ',
      trip: 'Kastamonu Gezisi',
      date: '08 Aralık',
      rating: 4,
      comment: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face&auto=format',
    },
    {
      id: 2,
      name: 'Tunahan KORKMAZ',
      trip: 'Kastamonu Gezisi',
      date: '08 Aralık',
      rating: 4,
      comment: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face&auto=format',
    },
    {
      id: 3,
      name: '(anonim)',
      trip: 'Kastamonu Gezisi',
      date: '08 Aralık',
      rating: 4,
      comment: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face&auto=format',
    },
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={15}
          color="#ECA61B"
        />
      );
    }
    return stars;
  };

  const renderTripCard = (trip: any, isPast: boolean = false) => (
    <TouchableOpacity 
      key={trip.id} 
      style={styles.tripCard}
      onPress={() => onTripPress?.(trip.id, isPast)}
    >
      <TouchableOpacity 
        style={styles.bookmarkButton}
        onPress={() => onBookmarkTrip?.(trip)}
      >
        <Ionicons 
          name={isTripSaved?.(trip.id) ? "bookmark" : "bookmark-outline"} 
          size={20} 
          color={isTripSaved?.(trip.id) ? "#FF6B35" : "#7D848D"} 
        />
      </TouchableOpacity>
      
      <Image source={trip.image} style={styles.tripCardImage} />
      
      <View style={styles.tripCardContent}>
        <View style={styles.tripCardTop}>
          <Text style={styles.tripCardTitle}>{trip.title}</Text>
          
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={12} color="#7D848D" />
            <Text style={styles.locationText}>{trip.location}</Text>
          </View>
          
          {!isPast && trip.participants && (
            <View style={styles.participantsRow}>
              <Ionicons name="people-outline" size={16} color="#7D848D" />
              <Text style={styles.participantsText}>{trip.participants}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.tripCardBottom}>
          <View style={styles.dateTimeRow}>
            <Ionicons name="calendar-outline" size={16} color="#7D848D" />
            <Text style={styles.dateTimeText}>{trip.date}</Text>
          </View>
          
          <View style={styles.dateTimeRow}>
            <Ionicons name="time-outline" size={16} color="#7D848D" />
            <Text style={styles.dateTimeText}>{trip.time}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderReviewCard = (review: any) => (
    <View key={review.id} style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Image source={{ uri: review.avatar }} style={styles.reviewAvatar} />
        <View style={styles.reviewUserInfo}>
          <Text style={styles.reviewUserName}>{review.name}</Text>
          <View style={styles.reviewTripInfo}>
            <Text style={styles.reviewTripName}>{review.trip}</Text>
            <View style={styles.locationRow}>
              <Ionicons name="calendar-outline" size={12} color="#7D848D" />
              <Text style={styles.reviewDate}>{review.date}</Text>
            </View>
          </View>
          <View style={styles.starsRow}>
            {renderStars(review.rating)}
          </View>
        </View>
      </View>
      <Text style={styles.reviewComment}>{review.comment}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        {/* Back Button */}
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <View style={styles.backButtonCircle}>
            <Ionicons name="arrow-back" size={20} color="#1B1E28" />
          </View>
        </TouchableOpacity>
        
        {/* Title - Centered */}
        <Text style={styles.headerTitle}>{companyData.name}</Text>
        
        {/* Company Avatar */}
        <Image 
          source={require('../../assets/ob1.png')} 
          style={styles.companyAvatar}
        />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Company Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statsMainRow}>
            <View style={styles.statItem}>
              <Ionicons name="airplane-outline" size={16} color="#7D848D" />
              <Text style={styles.statText}>{companyData.trips}</Text>
            </View>
            
            <View style={styles.statItem}>
              <Ionicons name="people-outline" size={16} color="#7D848D" />
              <Text style={styles.statText}>{companyData.participants}</Text>
            </View>
            
            <View style={styles.websiteItem}>
              <Ionicons name="globe-outline" size={16} color="#7D848D" />
              <Text style={styles.websiteText}>{companyData.website}</Text>
            </View>
          </View>
          
          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.contactButton} onPress={onContactPress}>
              <Ionicons name="chatbubble-outline" size={8} color="#FFFFFF" />
              <Text style={styles.contactButtonText}>İletişime Geç</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.busInfoButton} onPress={onBusInfoPress}>
              <Ionicons name="bus-outline" size={8} color="#FFFFFF" />
              <Text style={styles.busInfoButtonText}>Otobüs Bilgileri</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.aboutSection}>
          <Text style={styles.sectionTitle}>Firma Hakkında</Text>
          <Text style={styles.aboutText}>
            {showFullDescription ? companyData.fullDescription : companyData.description}
            {!showFullDescription && (
              <TouchableOpacity onPress={() => setShowFullDescription(true)}>
                <Text style={styles.readMoreText}> Read More</Text>
              </TouchableOpacity>
            )}
          </Text>
        </View>

        {/* Current Trips Section */}
        <View style={styles.tripsSection}>
          <Text style={styles.sectionTitle}>Güncel Geziler</Text>
          <View style={styles.tripsList}>
            {currentTrips.map(trip => renderTripCard(trip))}
          </View>
        </View>

        {/* Past Trips Section */}
        <View style={styles.tripsSection}>
          <Text style={styles.sectionTitle}>Geçmiş Geziler</Text>
          <View style={styles.tripsList}>
            {pastTrips.map(trip => renderTripCard(trip, true))}
          </View>
          
          {/* Progress Indicator */}
          <View style={styles.progressIndicator}>
            <View style={[styles.progressDot, styles.activeDot]} />
            <View style={styles.progressDot} />
            <View style={styles.progressDot} />
          </View>
        </View>

        {/* Reviews Section */}
        <View style={styles.reviewsSection}>
          <View style={styles.reviewsHeader}>
            <Text style={styles.sectionTitle}>Değerlendirmeler</Text>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={12} color="#FFEA00" />
              <Text style={styles.ratingBadgeText}>{companyData.rating}</Text>
            </View>
          </View>

          {/* Rating Filter */}
          <View style={styles.ratingFilter}>
            <TouchableOpacity 
              style={[
                styles.ratingOption, 
                selectedRatingFilter === '8.5+' && styles.activeRatingOption
              ]}
              onPress={() => setSelectedRatingFilter(selectedRatingFilter === '8.5+' ? null : '8.5+')}
            >
              <Text style={[
                styles.ratingOptionText, 
                selectedRatingFilter === '8.5+' && styles.activeRatingOptionText
              ]}>8.5+</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.ratingOption, 
                selectedRatingFilter === '6.5-8.5' && styles.activeRatingOption
              ]}
              onPress={() => setSelectedRatingFilter(selectedRatingFilter === '6.5-8.5' ? null : '6.5-8.5')}
            >
              <Text style={[
                styles.ratingOptionText, 
                selectedRatingFilter === '6.5-8.5' && styles.activeRatingOptionText
              ]}>6.5 - 8.5</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.ratingOption, 
                selectedRatingFilter === '4.5-6.5' && styles.activeRatingOption
              ]}
              onPress={() => setSelectedRatingFilter(selectedRatingFilter === '4.5-6.5' ? null : '4.5-6.5')}
            >
              <Text style={[
                styles.ratingOptionText, 
                selectedRatingFilter === '4.5-6.5' && styles.activeRatingOptionText
              ]}>4.5 - 6.5</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.ratingOption, 
                selectedRatingFilter === '2.5-4.5' && styles.activeRatingOption
              ]}
              onPress={() => setSelectedRatingFilter(selectedRatingFilter === '2.5-4.5' ? null : '2.5-4.5')}
            >
              <Text style={[
                styles.ratingOptionText, 
                selectedRatingFilter === '2.5-4.5' && styles.activeRatingOptionText
              ]}>2.5 - 4.5</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.ratingOption, 
                selectedRatingFilter === '2.5-' && styles.activeRatingOption
              ]}
              onPress={() => setSelectedRatingFilter(selectedRatingFilter === '2.5-' ? null : '2.5-')}
            >
              <Text style={[
                styles.ratingOptionText, 
                selectedRatingFilter === '2.5-' && styles.activeRatingOptionText
              ]}>2.5 -</Text>
            </TouchableOpacity>
          </View>

          {/* Reviews List */}
          <View style={styles.reviewsList}>
            {reviews.map(review => renderReviewCard(review))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home" size={24} color="#999" />
          <Text style={styles.tabText}>Anasayfa</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="calendar-outline" size={24} color="#999" />
          <Text style={styles.tabText}>Takvim</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.centerButton}>
          <Ionicons name="search" size={28} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="chatbubble-outline" size={24} color="#999" />
          <Text style={styles.tabText}>Mesajlar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="person-outline" size={24} color="#999" />
          <Text style={styles.tabText}>Profil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
    marginTop: 28,
    height: 44,
    position: 'relative',
  },
  backButton: {
    padding: 2,
  },
  backButtonCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F7F7F9',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1B1E28',
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 11,
  },
  companyAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  content: {
    flex: 1,
    marginTop: 25,
  },
  statsContainer: {
    marginBottom: 16,
    paddingHorizontal: 30,
  },
  statsMainRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  websiteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: 146,
  },
  statText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#7D848D',
    letterSpacing: 0.3,
  },
  websiteText: {
    fontSize: 13,
    fontWeight: '400',
    color: '#7D848D',
    letterSpacing: 0.3,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1EB600',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 5,
    gap: 8,
    width: 100,
    height: 34,
  },
  contactButtonText: {
    fontSize: 9,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  busInfoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007FFF',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 5,
    gap: 8,
  },
  busInfoButtonText: {
    fontSize: 9,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  aboutSection: {
    marginBottom: 32,
    paddingHorizontal: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1B1E28',
    marginBottom: 8,
  },
  aboutText: {
    fontSize: 13,
    fontWeight: '400',
    color: '#7D848D',
    lineHeight: 22,
  },
  readMoreText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FF6B35',
    lineHeight: 22,
  },
  tripsSection: {
    marginBottom: 32,
    paddingHorizontal: 14,
  },
  progressIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    alignSelf: 'center',
  },
  progressDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#CAEAFF',
  },
  activeDot: {
    width: 35,
    backgroundColor: '#24BAEC',
  },
  tripsList: {
    gap: 16,
  },
  tripCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#B4BCC9',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 5,
    height: 123,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  bookmarkButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tripCardImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
    margin: 10,
  },
  tripCardContent: {
    flex: 1,
    padding: 14,
    paddingLeft: 0,
    justifyContent: 'space-between',
  },
  tripCardTop: {
    gap: 8,
  },
  tripCardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1B1E28',
    letterSpacing: 0.5,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 13,
    fontWeight: '400',
    color: '#7D848D',
    letterSpacing: 0.3,
  },
  participantsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  participantsText: {
    fontSize: 13,
    fontWeight: '400',
    color: '#7D848D',
    letterSpacing: 0.3,
  },
  tripCardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dateTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateTimeText: {
    fontSize: 13,
    fontWeight: '400',
    color: '#7D848D',
    letterSpacing: 0.3,
  },
  reviewsSection: {
    marginBottom: 40,
    paddingHorizontal: 14,
  },
  reviewsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0BC114',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 8,
  },
  ratingBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  ratingFilter: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 24,
  },
  ratingOption: {
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#ECEDF0',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 60,
    alignItems: 'center',
  },
  activeRatingOption: {
    backgroundColor: '#F0F0F0',
    borderColor: '#D0D0D0',
  },
  ratingOptionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#7D848D',
  },
  activeRatingOptionText: {
    color: '#1B1E28',
    fontWeight: '600',
  },
  reviewsList: {
    gap: 16,
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#B4BCC9',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 5,
  },
  reviewHeader: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 16,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.16,
    shadowRadius: 15,
    elevation: 10,
  },
  reviewUserInfo: {
    flex: 1,
    gap: 4,
  },
  reviewUserName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    letterSpacing: -0.16,
  },
  reviewTripInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 18,
  },
  reviewTripName: {
    fontSize: 13,
    fontWeight: '400',
    color: '#7D848D',
    letterSpacing: 0.3,
  },
  reviewDate: {
    fontSize: 13,
    fontWeight: '400',
    color: '#7D848D',
    letterSpacing: 0.3,
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  reviewComment: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000000',
    lineHeight: 18,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 20,
  },
  tabItem: {
    alignItems: 'center',
    flex: 1,
  },
  tabText: {
    fontSize: 12,
    color: '#999',
    marginTop: 6,
    fontWeight: '500',
  },
  centerButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#24BAEC',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    shadowColor: '#24BAEC',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});