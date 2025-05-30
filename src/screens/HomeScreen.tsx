import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const handleTabPress = (tab: string) => {
    console.log(`${tab} tab pressed`);
  };

  const currentTrips = [
    {
      id: 1,
      title: 'Amasra Turu',
      location: 'Amasra, Türkiye',
      rating: 4.7,
      peopleCount: '+50'
    },
    {
      id: 2,
      title: 'Darıca Turu',
      location: 'Darıca, Türkiye',
      rating: 4.5,
      peopleCount: '+30'
    },
    {
      id: 3,
      title: 'Sapanca Turu',
      location: 'Sapanca, Türkiye',
      rating: 4.8,
      peopleCount: '+25'
    },
    {
      id: 4,
      title: 'Abant Turu',
      location: 'Abant, Türkiye',
      rating: 4.6,
      peopleCount: '+40'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face&auto=format' }} 
              style={styles.avatar}
              resizeMode="cover"
            />
            <Text style={styles.userName}>Tunahan</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            Explore the{'\n'}
            <Text style={styles.beautifulText}>Beautiful </Text>
            <Text style={styles.worldText}>world!</Text>
          </Text>
        </View>

        {/* Güncel Geziler */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Güncel Geziler</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Tümü</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
          contentContainerStyle={styles.cardsContainer}
        >
          {currentTrips.map((trip, index) => (
            <TouchableOpacity key={trip.id} style={styles.tripCard}>
              <View style={styles.cardImageContainer}>
                <Image 
                  source={require('../../assets/tb0.png')} 
                  style={styles.cardImage}
                />
                <TouchableOpacity style={styles.bookmarkButton}>
                  <Ionicons name="bookmark-outline" size={20} color="white" />
                </TouchableOpacity>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{trip.title}</Text>
                <View style={styles.cardInfo}>
                  <View style={styles.locationContainer}>
                    <Ionicons name="location-outline" size={14} color="#999" />
                    <Text style={styles.locationText}>{trip.location}</Text>
                  </View>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text style={styles.ratingText}>{trip.rating}</Text>
                  </View>
                </View>
                <View style={styles.peopleContainer}>
                  <View style={styles.avatarsContainer}>
                    <Image source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face&auto=format' }} style={styles.smallAvatar} />
                    <Image source={{ uri: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=50&h=50&fit=crop&crop=face&auto=format' }} style={[styles.smallAvatar, styles.avatarOverlap]} />
                    <Image source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face&auto=format' }} style={[styles.smallAvatar, styles.avatarOverlap]} />
                  </View>
                  <Text style={styles.peopleText}>{trip.peopleCount}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Geçmiş Geziler */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Geçmiş Geziler</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Tümü</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.pastTripsContainer}>
          {[1, 2, 3, 4].map((item) => (
            <TouchableOpacity key={item} style={styles.pastTripItem}>
              <Image 
                source={require('../../assets/tb0.png')} 
                style={styles.pastTripImage}
              />
              <View style={styles.pastTripContent}>
                <Text style={styles.pastTripTitle}>Amasra Turu</Text>
                <View style={styles.pastTripInfo}>
                  <Ionicons name="calendar-outline" size={14} color="#999" />
                  <Text style={styles.pastTripDate}>26 Ekim 2025</Text>
                </View>
                <View style={styles.pastTripLocation}>
                  <Ionicons name="location-outline" size={14} color="#999" />
                  <Text style={styles.pastTripLocationText}>Amasra o Kastamonu</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          ))}
        </View>


      </ScrollView>

      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => handleTabPress('home')}
        >
          <Ionicons name="home" size={24} color="#24BAEC" />
          <Text style={[styles.tabText, styles.activeTabText]}>Anasayfa</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => handleTabPress('calendar')}
        >
          <Ionicons name="calendar-outline" size={24} color="#999" />
          <Text style={styles.tabText}>Takvim</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.centerButton}
          onPress={() => handleTabPress('search')}
        >
          <Ionicons name="search" size={28} color="white" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => handleTabPress('messages')}
        >
          <Ionicons name="chatbubble-outline" size={24} color="#999" />
          <Text style={styles.tabText}>Mesajlar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => handleTabPress('profile')}
        >
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
    paddingBottom: 0,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    overflow: 'hidden',
    backgroundColor: '#F0F0F0',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  notificationButton: {
    padding: 8,
  },
  titleContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  titleText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    lineHeight: 44,
  },
  beautifulText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
  },
  worldText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF6B35',
    textDecorationLine: 'underline',
    textDecorationColor: '#FF6B35',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  seeAllText: {
    fontSize: 16,
    color: '#FF6B35',
    fontWeight: '500',
  },
  horizontalScroll: {
    marginBottom: 40,
  },
  cardsContainer: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 20,
  },
  tripCard: {
    width: 280,
    backgroundColor: 'white',
    borderRadius: 20,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  cardImageContainer: {
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bookmarkButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    padding: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationText: {
    fontSize: 14,
    color: '#999',
    marginLeft: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 6,
    fontWeight: '600',
  },
  peopleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: 'white',
    overflow: 'hidden',
  },
  avatarOverlap: {
    marginLeft: -10,
  },
  peopleText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  pastTripsContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  pastTripItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  pastTripImage: {
    width: 56,
    height: 56,
    borderRadius: 12,
    marginRight: 16,
  },
  pastTripContent: {
    flex: 1,
  },
  pastTripTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  pastTripInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  pastTripDate: {
    fontSize: 14,
    color: '#999',
    marginLeft: 6,
  },
  pastTripLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pastTripLocationText: {
    fontSize: 14,
    color: '#999',
    marginLeft: 6,
  },
  pageIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#FF6B35',
    width: 32,
    height: 8,
    borderRadius: 4,
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
    paddingBottom: 50,
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
  activeTabText: {
    color: '#24BAEC',
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