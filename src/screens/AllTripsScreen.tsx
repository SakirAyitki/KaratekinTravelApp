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
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TripDetailScreen from './TripDetailScreen';

interface AllTripsScreenProps {
  onBack: () => void;
}

export default function AllTripsScreen({ onBack }: AllTripsScreenProps) {
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('En Çok Beğenilen');
  const [selectedTrip, setSelectedTrip] = useState(null);

  const allTripsData = [
    {
      id: 1,
      title: 'Amasra Turu',
      location: 'Amasra, Türkiye',
      dateRange: '20 Haziran - 29 Haziran',
      capacity: 'Kapasite 50 Kişi',
      joined: '24 Kişi Katıldı',
      price: '$720',
      rating: 4.7,
      reviewCount: 2498,
      date: new Date('2024-06-20')
    },
    {
      id: 2,
      title: 'Karadeniz Turu',
      location: 'Karadeniz, Türkiye',
      dateRange: '15 Temmuz - 25 Temmuz',
      capacity: 'Kapasite 40 Kişi',
      joined: '18 Kişi Katıldı',
      price: '$650',
      rating: 4.5,
      reviewCount: 1856,
      date: new Date('2024-07-15')
    },
    {
      id: 3,
      title: 'Sapanca Turu',
      location: 'Sapanca, Türkiye',
      dateRange: '10 Ağustos - 15 Ağustos',
      capacity: 'Kapasite 30 Kişi',
      joined: '22 Kişi Katıldı',
      price: '$480',
      rating: 4.8,
      reviewCount: 3247,
      date: new Date('2024-08-10')
    },
    {
      id: 4,
      title: 'Bolu Turu',
      location: 'Bolu, Türkiye',
      dateRange: '5 Eylül - 12 Eylül',
      capacity: 'Kapasite 35 Kişi',
      joined: '19 Kişi Katıldı',
      price: '$580',
      rating: 4.6,
      reviewCount: 1965,
      date: new Date('2024-09-05')
    }
  ];

  const filterOptions = ['En Çok Beğenilen', 'Tarihe Göre Sırala', 'Fiyat'];

  const getFilteredTrips = () => {
    let filtered = allTripsData.filter(trip =>
      trip.title.toLowerCase().includes(searchText.toLowerCase())
    );

    switch (selectedFilter) {
      case 'En Çok Beğenilen':
        return filtered.sort((a, b) => b.rating - a.rating);
      case 'Tarihe Göre Sırala':
        return filtered.sort((a, b) => a.date.getTime() - b.date.getTime());
      case 'Fiyat':
        return filtered.sort((a, b) => 
          parseInt(a.price.replace('$', '')) - parseInt(b.price.replace('$', ''))
        );
      default:
        return filtered;
    }
  };

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleTripPress = (trip: any) => {
    setSelectedTrip(trip);
  };

  const handleBackFromTripDetail = () => {
    setSelectedTrip(null);
  };

  const filteredTrips = getFilteredTrips();

  if (selectedTrip) {
    return <TripDetailScreen onBack={handleBackFromTripDetail} tripData={selectedTrip} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Tüm Geziler</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#999" />
            <TextInput
              style={styles.searchInput}
              placeholder="Gezi Ara..."
              placeholderTextColor="#999"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="funnel-outline" size={20} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Filter Options */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterScrollContainer}
          contentContainerStyle={styles.filterContainer}
        >
          {filterOptions.map((filter) => (
            <TouchableOpacity 
              key={filter}
              style={[
                styles.filterChip, 
                selectedFilter === filter && styles.activeFilterChip
              ]}
              onPress={() => handleFilterSelect(filter)}
            >
              <Text style={[
                styles.filterText, 
                selectedFilter === filter && styles.activeFilterText
              ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Results Count */}
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsText}>
            {filteredTrips.length} gezi bulundu
          </Text>
        </View>

        {/* Trips List */}
        <View style={styles.tripsContainer}>
          {filteredTrips.map((trip) => (
            <TouchableOpacity key={trip.id} style={styles.tripCard} onPress={() => handleTripPress(trip)}>
              <Image 
                source={require('../../assets/ob1.png')} 
                style={styles.tripImage}
              />
              <View style={styles.tripContent}>
                <View style={styles.tripHeader}>
                  <Text style={styles.tripTitle}>{trip.title}</Text>
                  <View style={styles.priceTag}>
                    <Text style={styles.priceText}>{trip.price}</Text>
                  </View>
                </View>
                
                <View style={styles.tripDetail}>
                  <Ionicons name="calendar-outline" size={16} color="#999" />
                  <Text style={styles.tripDetailText}>{trip.dateRange}</Text>
                </View>

                <View style={styles.tripDetail}>
                  <Ionicons name="people-outline" size={16} color="#999" />
                  <Text style={styles.tripDetailText}>{trip.capacity}</Text>
                </View>

                <View style={styles.participantsContainer}>
                  <View style={styles.avatarsContainer}>
                    <Image source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face&auto=format' }} style={styles.participantAvatar} />
                    <Image source={{ uri: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=50&h=50&fit=crop&crop=face&auto=format' }} style={[styles.participantAvatar, styles.avatarOverlap]} />
                    <Image source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face&auto=format' }} style={[styles.participantAvatar, styles.avatarOverlap]} />
                  </View>
                  <Text style={styles.joinedText}>{trip.joined}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* No Results */}
        {filteredTrips.length === 0 && (
          <View style={styles.noResultsContainer}>
            <Ionicons name="search" size={48} color="#ccc" />
            <Text style={styles.noResultsText}>Aradığınız kriterlere uygun gezi bulunamadı</Text>
            <Text style={styles.noResultsSubText}>Farklı anahtar kelimeler deneyin</Text>
          </View>
        )}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  placeholder: {
    width: 40,
    height: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 20,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
    padding: 0,
  },
  filterButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  filterScrollContainer: {
    marginBottom: 20,
  },
  filterContainer: {
    paddingHorizontal: 24,
  },
  filterChip: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  activeFilterChip: {
    backgroundColor: '#333',
    borderColor: '#333',
  },
  filterText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  activeFilterText: {
    color: 'white',
  },
  resultsContainer: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  resultsText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  tripsContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  tripCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  tripImage: {
    width: 100,
    height: 100,
    borderRadius: 16,
    marginRight: 16,
  },
  tripContent: {
    flex: 1,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tripTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  priceTag: {
    backgroundColor: '#FF6B35',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  priceText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  tripDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tripDetailText: {
    fontSize: 14,
    color: '#999',
    marginLeft: 8,
  },
  participantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  avatarsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  participantAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'white',
    overflow: 'hidden',
  },
  avatarOverlap: {
    marginLeft: -8,
  },
  joinedText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  noResultsText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginTop: 16,
    fontWeight: '500',
  },
  noResultsSubText: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    marginTop: 8,
  },
}); 