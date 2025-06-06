import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FilterModal from '../components/FilterModal';

interface SearchScreenProps {
  onBack: () => void;
  onTripPress: (tripId: number) => void;
  onCompanyPress: (companyName: string) => void;
}

export default function SearchScreen({ onBack, onTripPress, onCompanyPress }: SearchScreenProps) {
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('Yalnız Firmalar');
  const [showFilterModal, setShowFilterModal] = useState(false);

  const trips = [
    {
      id: 1,
      title: 'Amasra Turu',
      price: '$720',
      dates: '20 Haziran - 29 Haziran',
      capacity: 'Kapasite 50 Kişi',
      participants: '24 Kişi Katıldı',
      image: require('../../assets/ob1.png'),
    },
    {
      id: 2,
      title: 'Karadeniz Turu',
      price: '$720',
      dates: '20 Haziran - 29 Haziran',
      capacity: 'Kapasite 50 Kişi',
      participants: '24 Kişi Katıldı',
      image: require('../../assets/ob1.png'),
    },
    {
      id: 3,
      title: 'Karadeniz Turu',
      price: '$720',
      dates: '20 Haziran - 29 Haziran',
      capacity: 'Kapasite 50 Kişi',
      participants: '24 Kişi Katıldı',
      image: require('../../assets/ob1.png'),
    },
  ];

  const company = {
    name: 'Kamil Koç',
    rating: 9.2,
    trips: '45+ Gezi',
    participants: '350+ Katılımcı',
    website: 'www.kamilkoc.com',
    logo: require('../../assets/ob1.png'),
  };

  const tabs = ['Yalnız Firmalar', 'En Çok Beğenilen', 'Tarih'];

  const handleFilterPress = () => {
    setShowFilterModal(true);
  };

  const handleCloseFilter = () => {
    setShowFilterModal(false);
  };

  const handleApplyFilter = (filters: any) => {
    console.log('Filters applied:', filters);
    // Filter logic will be implemented here
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Arama</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Gezi ve ya Firma Ara..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#999"
          />
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={handleFilterPress}>
          <Ionicons name="options-outline" size={20} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsScrollContent}
        >
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.tab,
                activeTab === tab && styles.activeTab,
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Trips List */}
        {trips.map((trip) => (
          <TouchableOpacity 
            key={trip.id} 
            style={styles.tripCard}
            onPress={() => onTripPress(trip.id)}
            activeOpacity={0.7}
          >
            <Image source={trip.image} style={styles.tripImage} />
            <View style={styles.tripContent}>
              <View style={styles.tripHeader}>
                <Text style={styles.tripTitle}>{trip.title}</Text>
                <Text style={styles.tripPrice}>{trip.price}</Text>
              </View>
              
              <View style={styles.tripInfo}>
                <View style={styles.infoRow}>
                  <Ionicons name="calendar-outline" size={16} color="#999" />
                  <Text style={styles.infoText}>{trip.dates}</Text>
                </View>
                
                <View style={styles.infoRow}>
                  <Ionicons name="people-outline" size={16} color="#999" />
                  <Text style={styles.infoText}>{trip.capacity}</Text>
                </View>
                
                <View style={styles.avatarsRow}>
                  <View style={styles.avatarsContainer}>
                    <Image
                      source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face&auto=format' }}
                      style={styles.avatar}
                    />
                    <Image
                      source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face&auto=format' }}
                      style={[styles.avatar, styles.avatarOverlap]}
                    />
                    <Image
                      source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face&auto=format' }}
                      style={[styles.avatar, styles.avatarOverlap]}
                    />
                  </View>
                  <Text style={styles.participantsText}>{trip.participants}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Company Card */}
        <TouchableOpacity 
          style={styles.companyCard}
          onPress={() => onCompanyPress(company.name)}
          activeOpacity={0.7}
        >
          <View style={styles.companyContent}>
            <View style={styles.companyLeft}>
              <Image source={company.logo} style={styles.companyLogo} />
              <View style={styles.companyInfo}>
                <View style={styles.companyHeader}>
                  <Text style={styles.companyName}>{company.name}</Text>
                  <View style={styles.companyBadge}>
                    <Text style={styles.companyBadgeText}>Firma</Text>
                  </View>
                </View>
                
                <View style={styles.companyStats}>
                  <View style={styles.statRow}>
                    <Ionicons name="airplane-outline" size={16} color="#999" />
                    <Text style={styles.statText}>{company.trips}</Text>
                  </View>
                  
                  <View style={styles.statRow}>
                    <Ionicons name="people-outline" size={16} color="#999" />
                    <Text style={styles.statText}>{company.participants}</Text>
                  </View>
                  
                  <View style={styles.statRow}>
                    <Ionicons name="globe-outline" size={16} color="#999" />
                    <Text style={styles.statText}>{company.website}</Text>
                  </View>
                </View>
              </View>
            </View>
            
            <View style={styles.companyRight}>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={12} color="#FFF" />
                <Text style={styles.ratingText}>{company.rating}</Text>
              </View>
              <View style={styles.onlineIndicator}>
                <Text style={styles.onlineText}>Onaylı</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <FilterModal
        visible={showFilterModal}
        onClose={handleCloseFilter}
        onApplyFilter={handleApplyFilter}
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F8F9FA',
    marginTop: 28,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
    paddingVertical: 8,
  },
  tabsScrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
  },
  activeTab: {
    backgroundColor: '#24BAEC',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#FFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  tripCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 150,
  },
  tripImage: {
    width: 120,
    height: 150,
  },
  tripContent: {
    flex: 1,
    padding: 16,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tripTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  tripPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF6B35',
  },
  tripInfo: {
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
  },
  avatarsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  avatarsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  avatarOverlap: {
    marginLeft: -8,
  },
  participantsText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  companyCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FF6B35',
    overflow: 'hidden',
  },
  companyContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  companyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  companyLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  companyInfo: {
    flex: 1,
  },
  companyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  companyName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  companyBadge: {
    backgroundColor: '#24BAEC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  companyBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFF',
  },
  companyStats: {
    gap: 4,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statText: {
    fontSize: 14,
    color: '#666',
  },
  companyRight: {
    alignItems: 'center',
    gap: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
  },
  onlineIndicator: {
    backgroundColor: '#24BAEC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  onlineText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFF',
  },
}); 