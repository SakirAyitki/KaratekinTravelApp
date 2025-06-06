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
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AllTripsScreen from './AllTripsScreen';
import TripDetailScreen from './TripDetailScreen';
import PastTripsScreen from './PastTripsScreen';
import PastTripDetailScreen from './PastTripDetailScreen';
import ReviewsScreen from './ReviewsScreen';
import CalendarScreen from './CalendarScreen';
import ProgramDetailScreen from './ProgramDetailScreen';
import ChatsScreen from './ChatsScreen';
import ChatDetailScreen from './ChatDetailScreen';
import ProfileScreen from './ProfileScreen';
import ProfileEditScreen from './ProfileEditScreen';
import SavedTripsScreen from './SavedTripsScreen';
import PastTripsRatingScreen from './PastTripsRatingScreen';
import SecurityScreen from './SecurityScreen';
import AboutScreen from './AboutScreen';
import NotificationsScreen from './NotificationsScreen';
import SearchScreen from './SearchScreen';
import CompanyDetailScreen from './CompanyDetailScreen';
import CompanyContactScreen from './CompanyContactScreen';
import BusInfoScreen from './BusInfoScreen';

interface ChatItem {
  id: string;
  groupName: string;
  lastMessage: string;
  time: string;
  isActive: boolean;
  avatar: string;
}

interface HomeScreenProps {
  onLogout?: () => void;
}

export default function HomeScreen({ onLogout }: HomeScreenProps) {
  const [showAllTrips, setShowAllTrips] = useState(false);
  const [showPastTrips, setShowPastTrips] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [showProgramDetail, setShowProgramDetail] = useState(false);
  const [showPastTripDetail, setShowPastTripDetail] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [selectedProgramTrip, setSelectedProgramTrip] = useState<any>(null);
  const [selectedChat, setSelectedChat] = useState<ChatItem | null>(null);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [showSavedTrips, setShowSavedTrips] = useState(false);
  const [savedTrips, setSavedTrips] = useState<any[]>([]);
  const [navigationContext, setNavigationContext] = useState<string>('home');
  const [showPastTripsRating, setShowPastTripsRating] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [showCompanyContact, setShowCompanyContact] = useState(false);
  const [showBusInfo, setShowBusInfo] = useState(false);


  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    setNavigationContext('home');
    // Reset other states when changing tabs
    setShowAllTrips(false);
    setShowPastTrips(false);
    setSelectedTrip(null);
    setShowProgramDetail(false);
    setShowPastTripDetail(false);
    setShowReviews(false);
    setSelectedProgramTrip(null);
    setShowProfileEdit(false);
    setShowSavedTrips(false);
    setShowPastTripsRating(false);
    setShowSecurity(false);
    setShowAbout(false);
    setShowNotifications(false);
    setSelectedCompany(null);
    setShowCompanyContact(false);
    setShowBusInfo(false);
  };

  const handleShowAllTrips = () => {
    setShowAllTrips(true);
  };

  const handleShowSearch = () => {
    setActiveTab('search');
  };

  const handleBackFromSearch = () => {
    setActiveTab('home');
  };

  const handleBackFromAllTrips = () => {
    setShowAllTrips(false);
  };

  const handleShowPastTrips = () => {
    setShowPastTrips(true);
  };

  const handleBackFromPastTrips = () => {
    setShowPastTrips(false);
  };

  const handleTripPress = (trip: any) => {
    setSelectedTrip(trip);
    setNavigationContext('home');
  };

  const handlePastTripPress = (trip: any) => {
    setSelectedProgramTrip(trip);
    setShowPastTrips(false);
    setShowPastTripDetail(true);
  };

  const handleShowAllReviews = (tripData: any) => {
    setSelectedProgramTrip(tripData);
    setShowPastTripDetail(false);
    setShowReviews(true);
  };

  const handleBackFromReviews = () => {
    setShowReviews(false);
    setShowPastTripDetail(true);
  };

  const handleBackFromTripDetail = () => {
    setSelectedTrip(null);
    if (navigationContext === 'savedTrips') {
      setShowSavedTrips(true);
    } else if (navigationContext === 'companyDetail') {
      setSelectedCompany(selectedCompany);
    }
  };

  const handleHomeFromTripDetail = () => {
    setSelectedTrip(null);
  };

  const handleBackToHome = () => {
    setActiveTab('home');
    setShowAllTrips(false);
    setShowPastTrips(false);
    setSelectedTrip(null);
    setShowProgramDetail(false);
    setShowPastTripDetail(false);
    setShowReviews(false);
    setSelectedProgramTrip(null);
    setShowProfileEdit(false);
    setShowSavedTrips(false);
    setShowPastTripsRating(false);
    setShowSecurity(false);
    setShowAbout(false);
    setShowNotifications(false);
    setSelectedCompany(null);
    setShowCompanyContact(false);
    setShowBusInfo(false);
  };

  const handleShowProgramDetail = (tripData: any) => {
    setSelectedProgramTrip(tripData);
    setShowProgramDetail(true);
  };

  const handleBackFromProgramDetail = () => {
    setShowProgramDetail(false);
    setSelectedProgramTrip(null);
  };

  const handleBackFromPastTripDetail = () => {
    setShowPastTripDetail(false);
    setSelectedProgramTrip(null);
    if (navigationContext === 'companyDetail') {
      setSelectedCompany(selectedCompany);
    } else {
      setShowPastTrips(true);
    }
  };

  const handleBackFromChatDetail = () => {
    setSelectedChat(null);
  };

  const handleChatPress = (chat: ChatItem) => {
    setSelectedChat(chat);
  };

  const handleNavigateToProfileEdit = () => {
    setShowProfileEdit(true);
  };

  const handleBackFromProfileEdit = () => {
    setShowProfileEdit(false);
  };

  const handleNavigateToSavedTrips = () => {
    setShowSavedTrips(true);
  };

  const handleBackFromSavedTrips = () => {
    setShowSavedTrips(false);
  };

  const handleTripPressFromSaved = (trip: any) => {
    setSelectedTrip(trip);
    setNavigationContext('savedTrips');
    setShowSavedTrips(false);
  };

  const handleBookmarkTrip = (trip: any) => {
    setSavedTrips(prevSavedTrips => {
      const isAlreadySaved = prevSavedTrips.some(savedTrip => savedTrip.id === trip.id);
      
      if (isAlreadySaved) {
        // Remove from saved trips
        return prevSavedTrips.filter(savedTrip => savedTrip.id !== trip.id);
      } else {
        // Add to saved trips
        return [...prevSavedTrips, {
          ...trip,
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
        }];
      }
    });
  };

  const isTripSaved = (tripId: number) => {
    return savedTrips.some(savedTrip => savedTrip.id === tripId);
  };

  const handleNavigateToPastTripsRating = () => {
    setShowPastTripsRating(true);
  };

  const handleBackFromPastTripsRating = () => {
    setShowPastTripsRating(false);
  };

  const handleNavigateToSecurity = () => {
    setShowSecurity(true);
  };

  const handleBackFromSecurity = () => {
    setShowSecurity(false);
  };

  const handleNavigateToAbout = () => {
    setShowAbout(true);
  };

  const handleBackFromAbout = () => {
    setShowAbout(false);
  };

  const handleNavigateToNotifications = () => {
    setShowNotifications(true);
  };

  const handleBackFromNotifications = () => {
    setShowNotifications(false);
  };

  const handleBackFromCompanyDetail = () => {
    setSelectedCompany(null);
    setShowCompanyContact(false);
  };

  const handleShowCompanyContact = () => {
    setShowCompanyContact(true);
  };

  const handleBackFromCompanyContact = () => {
    setShowCompanyContact(false);
  };

  const handleShowBusInfo = () => {
    setShowBusInfo(true);
  };

  const handleBackFromBusInfo = () => {
    setShowBusInfo(false);
  };

  const handleTripPressFromCompany = (tripId: number, isPast: boolean) => {
    if (isPast) {
      // Geçmiş gezi için PastTripDetailScreen'e yönlendir
      const trip = { 
        id: tripId, 
        title: 'Amasra Turu',
        location: 'Amasra, Türkiye',
        isPast: true
      };
      setNavigationContext('companyDetail');
      setSelectedProgramTrip(trip);
      setShowPastTripDetail(true);
    } else {
      // Güncel gezi için TripDetailScreen'e yönlendir
      const trip = { 
        id: tripId, 
        title: 'Amasra Turu',
        location: 'Amasra, Türkiye',
        isPast: false
      };
      setNavigationContext('companyDetail');
      setSelectedTrip(trip);
    }
  };

  const handleLogout = () => {
    // Reset all states and go back to login/welcome screen
    setActiveTab('home');
    setShowAllTrips(false);
    setShowPastTrips(false);
    setSelectedTrip(null);
    setShowProgramDetail(false);
    setShowPastTripDetail(false);
    setShowReviews(false);
    setSelectedProgramTrip(null);
    setShowProfileEdit(false);
    setShowSavedTrips(false);
    setShowPastTripsRating(false);
    setShowSecurity(false);
    setShowAbout(false);
    setShowNotifications(false);
    setSavedTrips([]);
    setNavigationContext('home');
    
    // Call the logout handler from App.tsx
    if (onLogout) {
      onLogout();
    } else {
      Alert.alert('Başarılı', 'Hesabınızdan başarıyla çıkış yapıldı.');
    }
  };

  // Handle sub-screens that should hide navbar
  if (showAllTrips) {
    return <AllTripsScreen onBack={handleBackFromAllTrips} />;
  }

  if (showPastTrips) {
    return <PastTripsScreen onBack={handleBackFromPastTrips} onTripPress={handlePastTripPress} />;
  }

  if (selectedTrip) {
    return (
      <TripDetailScreen 
        onBack={handleBackFromTripDetail} 
        onHome={handleHomeFromTripDetail}
        tripData={selectedTrip} 
        onBookmarkTrip={handleBookmarkTrip}
        isTripSaved={isTripSaved(selectedTrip.id)}
      />
    );
  }

  // ProgramDetailScreen - navbar'sız
  if (showProgramDetail) {
    return (
      <ProgramDetailScreen 
        onBack={handleBackFromProgramDetail}
        tripData={selectedProgramTrip}
      />
    );
  }

  if (showPastTripDetail) {
    return (
      <PastTripDetailScreen 
        onBack={handleBackFromPastTripDetail}
        tripData={selectedProgramTrip}
        onShowAllReviews={handleShowAllReviews}
      />
    );
  }

  if (showReviews) {
    return (
      <ReviewsScreen 
        onBack={handleBackFromReviews}
        tripData={selectedProgramTrip}
      />
    );
  }

  // ChatDetailScreen - navbar'sız
  if (selectedChat) {
    return (
      <ChatDetailScreen
        onBack={handleBackFromChatDetail}
        chatData={{
          groupName: selectedChat.groupName,
          isActive: selectedChat.isActive,
          memberCount: 50,
        }}
      />
    );
  }

  // ProfileEditScreen - navbar'sız
  if (showProfileEdit) {
    return (
      <ProfileEditScreen onBack={handleBackFromProfileEdit} />
    );
  }

  // SavedTripsScreen - navbar'sız
  if (showSavedTrips) {
    return (
      <SavedTripsScreen 
        onBack={handleBackFromSavedTrips} 
        savedTrips={savedTrips}
        onBookmarkTrip={handleBookmarkTrip}
        onTripPress={handleTripPressFromSaved}
      />
    );
  }

  // PastTripsRatingScreen - navbar'sız
  if (showPastTripsRating) {
    return (
      <PastTripsRatingScreen onBack={handleBackFromPastTripsRating} />
    );
  }

  // SecurityScreen - navbar'sız
  if (showSecurity) {
    return (
      <SecurityScreen onBack={handleBackFromSecurity} />
    );
  }

  // AboutScreen - navbar'sız
  if (showAbout) {
    return (
      <AboutScreen onBack={handleBackFromAbout} />
    );
  }

  // NotificationsScreen - navbar'sız
  if (showNotifications) {
    return (
      <NotificationsScreen onBack={handleBackFromNotifications} />
    );
  }

  // CompanyContactScreen - navbar'sız
  if (showCompanyContact) {
    return (
      <CompanyContactScreen 
        onBack={handleBackFromCompanyContact} 
        companyName={selectedCompany || 'Kamil Koç'}
      />
    );
  }

  // BusInfoScreen - navbar'sız
  if (showBusInfo) {
    return (
      <BusInfoScreen 
        onBack={handleBackFromBusInfo} 
        companyName={selectedCompany || 'Kamil Koç'}
      />
    );
  }

  // CompanyDetailScreen - navbar'sız
  if (selectedCompany) {
    return (
      <CompanyDetailScreen 
        onBack={handleBackFromCompanyDetail} 
        companyName={selectedCompany}
        onTripPress={handleTripPressFromCompany}
        onBookmarkTrip={handleBookmarkTrip}
        isTripSaved={isTripSaved}
        onContactPress={handleShowCompanyContact}
        onBusInfoPress={handleShowBusInfo}
      />
    );
  }



  const renderMainContent = () => {
    if (activeTab === 'calendar') {
      return (
        <View style={styles.tabContent}>
          <CalendarScreen 
            onBack={handleBackToHome}
            onShowProgramDetail={handleShowProgramDetail}
          />
        </View>
      );
    }

    if (activeTab === 'search') {
      return (
        <View style={styles.tabContent}>
          <SearchScreen 
            onBack={handleBackToHome} 
            onTripPress={(tripId) => {
              // Convert tripId to trip object for handleTripPress
              const trip = { id: tripId, title: 'Amasra Turu (Default)' };
              handleTripPress(trip);
            }}
            onCompanyPress={(companyName) => {
              setSelectedCompany(companyName);
            }}
          />
        </View>
      );
    }

    if (activeTab === 'messages') {
      return (
        <View style={styles.tabContent}>
          <ChatsScreen onBack={handleBackToHome} onChatPress={handleChatPress} />
        </View>
      );
    }

    if (activeTab === 'profile') {
      return (
        <View style={styles.tabContent}>
          <ProfileScreen 
            onBack={handleBackToHome} 
            onNavigateToProfileEdit={handleNavigateToProfileEdit}
            onNavigateToSavedTrips={handleNavigateToSavedTrips}
            onNavigateToPastTripsRating={handleNavigateToPastTripsRating}
            onNavigateToSecurity={handleNavigateToSecurity}
            onNavigateToAbout={handleNavigateToAbout}
            onLogout={handleLogout}
          />
        </View>
      );
    }

    // Default home content
    return renderHomeContent();
  };

  const renderHomeContent = () => {
    const currentTrips = [
      {
        id: 1,
        title: 'Amasra Turu',
        location: 'Amasra, Türkiye',
        rating: 4.7,
        reviewCount: 2498,
        price: '$250/Kişi',
        peopleCount: '+50'
      },
      {
        id: 2,
        title: 'Darıca Turu',
        location: 'Darıca, Türkiye',
        rating: 4.5,
        reviewCount: 1856,
        price: '$180/Kişi',
        peopleCount: '+30'
      },
      {
        id: 3,
        title: 'Sapanca Turu',
        location: 'Sapanca, Türkiye',
        rating: 4.8,
        reviewCount: 3247,
        price: '$320/Kişi',
        peopleCount: '+25'
      },
      {
        id: 4,
        title: 'Abant Turu',
        location: 'Abant, Türkiye',
        rating: 4.6,
        reviewCount: 1965,
        price: '$280/Kişi',
        peopleCount: '+40'
      }
    ];

    return (
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face&auto=format' }} 
              style={styles.avatar}
              resizeMode="cover"
            />
            <Text style={styles.userName}>Şakir</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton} onPress={handleNavigateToNotifications}>
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
          <TouchableOpacity onPress={handleShowAllTrips}>
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
            <TouchableOpacity key={trip.id} style={styles.tripCard} onPress={() => handleTripPress(trip)}>
              <View style={styles.cardImageContainer}>
                <Image 
                  source={require('../../assets/ob1.png')} 
                  style={styles.cardImage}
                />
                <TouchableOpacity 
                  style={styles.bookmarkButton}
                  onPress={() => handleBookmarkTrip(trip)}
                >
                  <Ionicons 
                    name={isTripSaved(trip.id) ? "bookmark" : "bookmark-outline"} 
                    size={20} 
                    color="white" 
                  />
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
                    <Image source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face&auto=format' }} style={[styles.smallAvatar, styles.avatarOverlap]} />
                    <Image source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face&auto=format' }} style={[styles.smallAvatar, styles.avatarOverlap]} />
                    <Image source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face&auto=format' }} style={[styles.smallAvatar, styles.avatarOverlap]} />
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
          <TouchableOpacity onPress={handleShowPastTrips}>
            <Text style={styles.seeAllText}>Tümü</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
          contentContainerStyle={styles.cardsContainer}
        >
          {[
            {
              id: 1,
              title: 'Amasra Turu',
              location: 'Amasra, Türkiye',
              rating: 4.7,
              reviewCount: 2498,
              price: '$250/Kişi',
              date: '26 Ekim 2024',
              fullLocation: 'Amasra, Kastamonu',
              status: 'Tamamlandı'
            },
            {
              id: 2,
              title: 'Sapanca Turu',
              location: 'Sapanca, Türkiye',
              rating: 4.8,
              reviewCount: 3247,
              price: '$320/Kişi',
              date: '15 Ekim 2024',
              fullLocation: 'Sapanca, Sakarya',
              status: 'Tamamlandı'
            },
            {
              id: 3,
              title: 'Bolu Turu',
              location: 'Bolu, Türkiye',
              rating: 4.6,
              reviewCount: 1965,
              price: '$280/Kişi',
              date: '8 Ekim 2024',
              fullLocation: 'Bolu Merkez',
              status: 'Tamamlandı'
            },
            {
              id: 4,
              title: 'Darıca Turu',
              location: 'Darıca, Türkiye',
              rating: 4.5,
              reviewCount: 1856,
              price: '$180/Kişi',
              date: '1 Ekim 2024',
              fullLocation: 'Darıca, Kocaeli',
              status: 'Tamamlandı'
            }
          ].map((trip) => (
            <TouchableOpacity key={trip.id} style={styles.pastTripCard} onPress={() => handlePastTripPress(trip)}>
              <Image 
                source={require('../../assets/ob2.png')} 
                style={styles.pastTripCardImage}
              />
              <View style={styles.pastTripCardContent}>
                <Text style={styles.pastTripCardTitle}>{trip.title}</Text>
                <View style={styles.pastTripCardInfo}>
                  <Ionicons name="calendar-outline" size={14} color="#999" />
                  <Text style={styles.pastTripCardDate}>{trip.date}</Text>
                </View>
                <View style={styles.pastTripCardLocation}>
                  <Ionicons name="location-outline" size={14} color="#999" />
                  <Text style={styles.pastTripCardLocationText}>{trip.fullLocation}</Text>
                </View>
                <View style={styles.pastTripCardStatus}>
                  <View style={styles.statusIndicator} />
                  <Text style={styles.statusText}>{trip.status}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {renderMainContent()}

      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => handleTabPress('home')}
        >
          <Ionicons name="home" size={24} color={activeTab === 'home' ? "#24BAEC" : "#999"} />
          <Text style={[styles.tabText, activeTab === 'home' && styles.activeTabText]}>Anasayfa</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => handleTabPress('calendar')}
        >
          <Ionicons name="calendar-outline" size={24} color={activeTab === 'calendar' ? "#24BAEC" : "#999"} />
          <Text style={[styles.tabText, activeTab === 'calendar' && styles.activeTabText]}>Takvim</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.centerButton}
          onPress={handleShowSearch}
        >
          <Ionicons name="search" size={28} color="white" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => handleTabPress('messages')}
        >
          <Ionicons name="chatbubble-outline" size={24} color={activeTab === 'messages' ? "#24BAEC" : "#999"} />
          <Text style={[styles.tabText, activeTab === 'messages' && styles.activeTabText]}>Mesajlar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => handleTabPress('profile')}
        >
          <Ionicons name="person-outline" size={24} color={activeTab === 'profile' ? "#24BAEC" : "#999"} />
          <Text style={[styles.tabText, activeTab === 'profile' && styles.activeTabText]}>Profil</Text>
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
  pastTripCard: {
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
  pastTripCardImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  pastTripCardContent: {
    padding: 20,
  },
  pastTripCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  pastTripCardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  pastTripCardDate: {
    fontSize: 14,
    color: '#999',
    marginLeft: 6,
  },
  pastTripCardLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  pastTripCardLocationText: {
    fontSize: 14,
    color: '#999',
    marginLeft: 6,
  },
  pastTripCardStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF6B35',
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
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
  tabContent: {
    flex: 1,
  },
}); 