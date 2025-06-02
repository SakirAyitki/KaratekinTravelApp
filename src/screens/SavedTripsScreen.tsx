import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SavedTripsScreenProps {
  onBack: () => void;
  savedTrips: SavedTrip[];
  onBookmarkTrip: (trip: any) => void;
  onTripPress: (trip: SavedTrip) => void;
}

interface SavedTrip {
  id: number;
  title: string;
  location: string;
  rating: number;
  price: string;
  image?: string;
}

export default function SavedTripsScreen({ onBack, savedTrips, onBookmarkTrip, onTripPress }: SavedTripsScreenProps) {
  const [selectedTab, setSelectedTab] = useState('Geçmiş Geziler');
  const [searchText, setSearchText] = useState('');

  const filteredTrips = savedTrips.filter(trip =>
    trip.title.toLowerCase().includes(searchText.toLowerCase()) ||
    trip.location.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderTripCard = ({ item }: { item: SavedTrip }) => (
    <TouchableOpacity style={styles.tripCard} onPress={() => onTripPress(item)}>
      <Image 
        source={{ uri: item.image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop' }} 
        style={styles.tripImage} 
      />
      <TouchableOpacity 
        style={styles.cardBookmarkButton}
        onPress={(e) => {
          e.stopPropagation();
          onBookmarkTrip(item);
        }}
      >
        <Ionicons name="bookmark" size={16} color="#FF6B35" />
      </TouchableOpacity>
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
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kaydedilen Geziler</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Gezi Ara..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="funnel-outline" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsScrollView}
        >
          {['Geçmiş Geziler', 'Tarihe Göre Sırala', 'Fiyat', 'Rating'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                selectedTab === tab && styles.activeTab
              ]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text style={[
                styles.tabText,
                selectedTab === tab && styles.activeTabText
              ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Content */}
      <FlatList
        data={filteredTrips}
        renderItem={renderTripCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.tripsContainer}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Ionicons name="bookmark-outline" size={48} color="#CCC" />
            <Text style={styles.emptyTitle}>Henüz Kaydedilen Gezi Yok</Text>
            <Text style={styles.emptySubtitle}>
              Beğendiğiniz gezileri kaydetmeye başlayın
            </Text>
          </View>
        )}
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
    paddingBottom: 16,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tabsContainer: {
    paddingBottom: 20,
  },
  tabsScrollView: {
    paddingHorizontal: 20,
    gap: 12,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  activeTab: {
    backgroundColor: '#FF6B35',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: 'white',
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
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    position: 'relative',
  },
  tripImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  cardBookmarkButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1,
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
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
}); 