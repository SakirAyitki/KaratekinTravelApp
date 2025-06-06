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
  FlatList,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FilterModal from '../components/FilterModal';

interface PastTripsScreenProps {
  onBack: () => void;
  onTripPress?: (trip: Trip) => void;
}

interface Trip {
  id: number;
  title: string;
  location: string;
  rating: number;
  image: any;
  date: string;
  price: number;
  reviewCount: number;
  category: string;
}

interface FilterOptions {
  categories: string[];
  priceRange: { min: number; max: number };
  rating: number;
  sortBy: string;
}

export default function PastTripsScreen({ onBack, onTripPress }: PastTripsScreenProps) {
  const [searchText, setSearchText] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    categories: ['Tümü'],
    priceRange: { min: 0, max: 1000 },
    rating: 0,
    sortBy: 'En Çok Beğenilen',
  });

  const pastTrips: Trip[] = [
    {
      id: 1,
      title: 'Amasra Turu',
      location: 'Amasra, Kastamonu',
      rating: 4.7,
      image: require('../../assets/ob2.png'),
      date: '2024-10-26',
      price: 250,
      reviewCount: 2498,
      category: 'Tatil',
    },
    {
      id: 2,
      title: 'Sapanca Turu',
      location: 'Sapanca, Sakarya',
      rating: 4.8,
      image: require('../../assets/ob1.png'),
      date: '2024-10-15',
      price: 320,
      reviewCount: 3247,
      category: 'Doğa',
    },
    {
      id: 3,
      title: 'Bolu Turu',
      location: 'Bolu Merkez',
      rating: 4.6,
      image: require('../../assets/ob3.png'),
      date: '2024-10-08',
      price: 280,
      reviewCount: 1965,
      category: 'Doğa',
    },
    {
      id: 4,
      title: 'Darıca Turu',
      location: 'Darıca, Kocaeli',
      rating: 4.5,
      image: require('../../assets/ob2.png'),
      date: '2024-10-01',
      price: 180,
      reviewCount: 1856,
      category: 'Kültür',
    },
  ];

  const filterOptions_list = ['En Çok Beğenilen', 'Tarihe Göre Sırala', 'Fiyata Göre'];
  const categories = ['Tümü', 'Doğa', 'Kültür', 'Tatil'];
  const priceRanges = [
    { label: 'Tümü', min: 0, max: 1000 },
    { label: '$200-400', min: 200, max: 400 },
    { label: '$400-600', min: 400, max: 600 },
    { label: '$600+', min: 600, max: 1000 },
  ];

  const getFilteredTrips = () => {
    let filtered = pastTrips.filter(trip => {
      // Text search - improved with trimming and better character handling
      const searchTerm = searchText.toLowerCase().trim();
      const matchesSearch = searchTerm === '' || 
                          trip.title.toLowerCase().includes(searchTerm) ||
                          trip.location.toLowerCase().includes(searchTerm);
      
      // Category filter
      const matchesCategory = filterOptions.categories.length === 0 || 
                            filterOptions.categories.includes('Tümü') ||
                            filterOptions.categories.includes(trip.category);
      
      // Price range filter
      const matchesPrice = trip.price >= filterOptions.priceRange.min && 
                         trip.price <= filterOptions.priceRange.max;
      
      // Rating filter
      const matchesRating = trip.rating >= filterOptions.rating;
      
      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });

    // Apply sorting
    switch (filterOptions.sortBy) {
      case 'En Çok Beğenilen':
        return filtered.sort((a, b) => {
          if (b.rating !== a.rating) {
            return b.rating - a.rating;
          }
          return b.reviewCount - a.reviewCount;
        });
      case 'Tarihe Göre Sırala':
        return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case 'Fiyata Göre':
        return filtered.sort((a, b) => a.price - b.price);
      default:
        return filtered;
    }
  };

  const handleQuickFilterPress = (filter: string) => {
    setFilterOptions(prev => ({ ...prev, sortBy: filter }));
  };

  const handleApplyFilters = (filters: any) => {
    console.log('Applied filters:', filters);
    setShowFilterModal(false);
  };

  const handleResetFilters = () => {
    setFilterOptions({
      categories: ['Tümü'],
      priceRange: { min: 0, max: 1000 },
      rating: 0,
      sortBy: 'En Çok Beğenilen',
    });
    setSearchText('');
  };



  const renderStars = (rating: number) => {
    return (
      <View style={styles.starsContainer}>
        {[...Array(5)].map((_, index) => (
          <Ionicons
            key={index}
            name={index < rating ? "star" : "star-outline"}
            size={12}
            color={index < rating ? "#FFD700" : "#E0E0E0"}
          />
        ))}
      </View>
    );
  };

  const renderTripCard = ({ item }: { item: Trip }) => (
    <TouchableOpacity style={styles.tripCard} onPress={() => onTripPress?.(item)}>
      <Image source={item.image} style={styles.tripImage} />
      <View style={styles.tripInfo}>
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>{item.rating}/5</Text>
          <Ionicons name="star" size={12} color="#FFD700" />
        </View>
        <Text style={styles.tripTitle}>{item.title}</Text>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={14} color="#999" />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>${item.price}</Text>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const hasActiveFilters = () => {
    return !filterOptions.categories.includes('Tümü') && filterOptions.categories.length > 0 ||
           filterOptions.priceRange.min !== 0 || filterOptions.priceRange.max !== 1000 ||
           filterOptions.rating !== 0 ||
           filterOptions.sortBy !== 'En Çok Beğenilen' ||
           searchText.trim() !== '';
  };



  const filteredTrips = getFilteredTrips();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Geçmiş Geziler</Text>
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
        <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilterModal(true)}>
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
        {filterOptions_list.map((filter) => (
          <TouchableOpacity 
            key={filter}
            style={[
              styles.filterChip, 
              filterOptions.sortBy === filter && styles.activeFilterChip
            ]}
            onPress={() => handleQuickFilterPress(filter)}
          >
            <Text style={[
              styles.filterText, 
              filterOptions.sortBy === filter && styles.activeFilterText
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
        {filterOptions.sortBy !== 'En Çok Beğenilen' && (
          <Text style={styles.sortedByText}>
            {filterOptions.sortBy === 'Tarihe Göre Sırala' ? 'Tarihe göre sıralandı' : 
             filterOptions.sortBy === 'Fiyata Göre' ? 'Fiyata göre sıralandı' : ''}
          </Text>
        )}
      </View>

      {/* Trips Grid */}
      <FlatList
        data={filteredTrips}
        renderItem={renderTripCard}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.tripsContainer}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
      />

      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApplyFilter={handleApplyFilters}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  placeholder: {
    width: 40,
    height: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
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
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterScrollContainer: {
    marginBottom: 20,
    width: '100%',
    height: 70,
  },
  filterContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  filterChip: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 24,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activeFilterChip: {
    backgroundColor: '#333',
    borderColor: '#333',
  },
  filterText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '400',
  },
  activeFilterText: {
    color: 'white',
    fontWeight: '600',
  },
  resultsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  resultsText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  sortedByText: {
    fontSize: 14,
    color: '#999',
  },
  tripsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  row: {
    justifyContent: 'space-between',
  },
  tripCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  tripImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  tripInfo: {
    padding: 16,
  },
  ratingBadge: {
    position: 'absolute',
    top: -110,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginRight: 4,
  },
  tripTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#999',
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  priceText: {
    fontSize: 16,
    color: '#FF6B35',
    fontWeight: '700',
  },
  categoryText: {
    fontSize: 14,
    color: '#999',
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

}); 