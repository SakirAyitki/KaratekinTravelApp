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
  Animated,
  Dimensions,
  PanResponder,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PastTripDetailScreenProps {
  onBack: () => void;
  tripData?: any;
  onShowAllReviews?: (tripData: any) => void;
}

interface TimelineItem {
  id: number;
  title: string;
  time: string;
  image: any;
  isCompleted?: boolean;
}

const { height: screenHeight } = Dimensions.get('window');

export default function PastTripDetailScreen({ onBack, tripData, onShowAllReviews }: PastTripDetailScreenProps) {
  const [bottomSheetY] = useState(new Animated.Value(screenHeight - 150));
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTextExpanded, setIsTextExpanded] = useState(false);

  const timelineItems: TimelineItem[] = [
    {
      id: 1,
      title: 'Amasra Otel',
      time: '10:15',
      image: require('../../assets/ob2.png'),
      isCompleted: true,
    },
    {
      id: 2,
      title: 'Amasra Tarihi Yer',
      time: '12:00',
      image: require('../../assets/ob1.png'),
      isCompleted: true,
    },
    {
      id: 3,
      title: 'Serbest Zaman',
      time: '17:45',
      image: require('../../assets/ob2.png'),
      isCompleted: true,
    },
  ];

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dy) > 5;
    },
    onPanResponderMove: (evt, gestureState) => {
      const currentPosition = isExpanded ? screenHeight - 600 : screenHeight - 150;
      let newPosition = currentPosition + gestureState.dy;
      
      newPosition = Math.max(screenHeight - 600, Math.min(screenHeight - 150, newPosition));
      
      bottomSheetY.setValue(newPosition);
    },
    onPanResponderRelease: (evt, gestureState) => {
      const velocity = gestureState.vy;
      
      if (gestureState.dy < -50 || velocity < -0.5) {
        animateToExpanded();
      } else if (gestureState.dy > 50 || velocity > 0.5) {
        animateToCollapsed();
      } else {
        const toValue = isExpanded ? screenHeight - 600 : screenHeight - 150;
        Animated.spring(bottomSheetY, {
          toValue,
          useNativeDriver: false,
          tension: 100,
          friction: 8,
        }).start();
      }
    },
  });

  const animateToExpanded = () => {
    Animated.spring(bottomSheetY, {
      toValue: screenHeight - 600,
      useNativeDriver: false,
      tension: 100,
      friction: 8,
    }).start();
    setIsExpanded(true);
  };

  const animateToCollapsed = () => {
    Animated.spring(bottomSheetY, {
      toValue: screenHeight - 150,
      useNativeDriver: false,
      tension: 100,
      friction: 8,
    }).start();
    setIsExpanded(false);
  };

  const renderTimelineItem = (item: TimelineItem, index: number) => (
    <View key={item.id} style={styles.timelineItem}>
      <View style={styles.timelineLeft}>
        <View style={[styles.timelineDot, item.isCompleted && styles.completedTimelineDot]} />
        {index < timelineItems.length - 1 && <View style={styles.timelineLine} />}
      </View>
      <View style={styles.timelineContent}>
        <View style={styles.timelineCard}>
          <Image source={item.image} style={styles.timelineImage} />
          <View style={styles.timelineInfo}>
            <Text style={styles.timelineTitle}>{item.title}</Text>
            <Text style={styles.timelineTime}>{item.time}</Text>
            {item.isCompleted && (
              <View style={styles.completedBadge}>
                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                <Text style={styles.completedText}>Tamamlandı</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <ImageBackground 
        source={require('../../assets/bg1.jpg')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Gezi Detayları</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Timeline Content */}
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.timelineContainer}>
              {timelineItems.map((item, index) => renderTimelineItem(item, index))}
            </View>

            {/* Amasra Otel Kartı - Timeline Sonunda */}
            <View style={styles.hotelCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Amasra Otel</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.ratingText}>4.7</Text>
                </View>
              </View>
              
              <View style={styles.cardDetail}>
                <Ionicons name="time-outline" size={16} color="rgba(255, 255, 255, 0.8)" />
                <Text style={styles.cardDetailText}>1 Gün Konaklama</Text>
              </View>

              <View style={styles.participantsRow}>
                <View style={styles.avatarsContainer}>
                  <Image source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face&auto=format' }} style={styles.avatar} />
                  <Image source={{ uri: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=50&h=50&fit=crop&crop=face&auto=format' }} style={[styles.avatar, styles.avatarOverlap]} />
                  <Image source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face&auto=format' }} style={[styles.avatar, styles.avatarOverlap]} />
                  <View style={[styles.avatar, styles.avatarOverlap, styles.moreAvatar]}>
                    <Text style={styles.moreAvatarText}>+50</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.mapButton}>
                <Text style={styles.mapButtonText}>Haritada Görüntüle</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>

      {/* Bottom Sheet - Görseldeki gibi */}
      <Animated.View 
        style={[styles.bottomSheet, { transform: [{ translateY: bottomSheetY }] }]}
        {...panResponder.panHandlers}
      >
        <View style={styles.bottomSheetHandle} />
        
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Trip Header */}
          <View style={styles.tripHeader}>
            <Text style={styles.tripTitle}>{tripData?.title || 'Amasra Turu'}</Text>
            <Text style={styles.tripSubtitle}>Amasra, Türkiye</Text>
          </View>

          {/* Trip Info Row */}
          <View style={styles.tripInfoRow}>
            <View style={styles.leftInfo}>
              <View style={styles.locationInfo}>
                <Ionicons name="location-outline" size={16} color="#666" />
                <Text style={styles.locationText}>Amasra</Text>
              </View>
              <View style={styles.ratingInfo}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>4.7 (2498)</Text>
              </View>
            </View>
            <Text style={styles.priceText}>$250/Kişi</Text>
          </View>

          {/* Activity Icons */}
          <View style={styles.activityIcons}>
            <Image source={require('../../assets/ob1.png')} style={styles.activityIcon} />
            <Image source={require('../../assets/ob2.png')} style={styles.activityIcon} />
            <Image source={require('../../assets/ob3.png')} style={styles.activityIcon} />
            <Image source={require('../../assets/ob1.png')} style={styles.activityIcon} />
            <Image source={require('../../assets/ob2.png')} style={styles.activityIcon} />
          </View>

          {/* About Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Tur Hakkında</Text>
            <Text style={styles.aboutText}>
              You will get a complete travel package on the beaches. Packages in the form of airline tickets, recommended Hotel rooms, Transportation, Have you ever been to holiday to the Greek ETC
              {isTextExpanded && ', sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum stet clita kasd gubergren.'}
              {' '}
              <TouchableOpacity onPress={() => setIsTextExpanded(!isTextExpanded)}>
                <Text style={styles.readMoreText}>
                  {isTextExpanded ? 'Daha Az' : 'Devamını Oku'}
                </Text>
              </TouchableOpacity>
            </Text>
          </View>

          {/* Reviews Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Geri Bildirimler</Text>
              <TouchableOpacity onPress={() => onShowAllReviews?.(tripData)}>
                <Text style={styles.seeAllText}>Tümü</Text>
              </TouchableOpacity>
            </View>
            
            {/* Review 1 */}
            <View style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face&auto=format' }} 
                  style={styles.reviewAvatar} 
                />
                <View style={styles.reviewInfo}>
                  <Text style={styles.reviewerName}>Tunahan KORKMAZ</Text>
                  <View style={styles.reviewStars}>
                    {[...Array(5)].map((_, index) => (
                      <Ionicons key={index} name="star" size={14} color="#FFD700" />
                    ))}
                  </View>
                </View>
              </View>
              <Text style={styles.reviewText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum
              </Text>
            </View>

            {/* Review 2 */}
            <View style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Image 
                  source={require('../../assets/ob1.png')} 
                  style={styles.reviewAvatar} 
                />
                <View style={styles.reviewInfo}>
                  <Text style={styles.reviewerName}>(Anonim)</Text>
                  <View style={styles.reviewStars}>
                    {[...Array(5)].map((_, index) => (
                      <Ionicons key={index} name="star" size={14} color="#FFD700" />
                    ))}
                  </View>
                </View>
              </View>
              <Text style={styles.reviewText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum
              </Text>
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
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
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  placeholder: {
    width: 40,
    height: 40,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  timelineContainer: {
    paddingVertical: 20,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: 16,
  },
  timelineDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 3,
    borderColor: 'white',
  },
  completedTimelineDot: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  timelineLine: {
    width: 2,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginTop: 8,
  },
  timelineContent: {
    flex: 1,
  },
  timelineCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  timelineImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  timelineInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  timelineTime: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedText: {
    fontSize: 12,
    color: '#4CAF50',
    marginLeft: 4,
    fontWeight: '500',
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 650,
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 0,
    paddingTop: 12,
    paddingBottom: 40,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 12,
  },
  bottomSheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  tripHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  tripTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  tripSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  tripInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  leftInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  ratingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
  },
  priceText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  activityIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  activityIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  aboutText: {
    fontSize: 14,
    color: '#666',
  },
  readMoreText: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
  },
  reviewCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  reviewInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  reviewStars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewText: {
    fontSize: 14,
    color: '#666',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
  },
  hotelCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
    marginBottom: 200,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  cardDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardDetailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  participantsRow: {
    marginBottom: 16,
  },
  avatarsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'white',
  },
  avatarOverlap: {
    marginLeft: -8,
  },
  moreAvatar: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreAvatarText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#333',
  },
  mapButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  mapButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
}); 