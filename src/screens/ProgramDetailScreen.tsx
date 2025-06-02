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

interface ProgramDetailScreenProps {
  onBack: () => void;
  tripData?: any;
}

interface TimelineItem {
  id: number;
  title: string;
  time: string;
  image: any;
  isActive?: boolean;
}

const { height: screenHeight } = Dimensions.get('window');

export default function ProgramDetailScreen({ onBack, tripData }: ProgramDetailScreenProps) {
  const [bottomSheetY] = useState(new Animated.Value(screenHeight - 120)); // Başlangıç pozisyonu
  const [isExpanded, setIsExpanded] = useState(false);

  const timelineItems: TimelineItem[] = [
    {
      id: 1,
      title: 'Amasra Otel',
      time: '10:15',
      image: require('../../assets/ob2.png'),
      isActive: true,
    },
    {
      id: 2,
      title: 'Amasra Tarihi Yer',
      time: '12:00',
      image: require('../../assets/ob1.png'),
    },
    {
      id: 3,
      title: 'Serbest Zaman',
      time: '17:45',
      image: require('../../assets/ob2.png'),
    },
  ];

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dy) > 5;
    },
    onPanResponderMove: (evt, gestureState) => {
      const currentPosition = isExpanded ? screenHeight - 400 : screenHeight - 120;
      let newPosition = currentPosition + gestureState.dy;
      
      // Sınırları belirle
      newPosition = Math.max(screenHeight - 400, Math.min(screenHeight - 120, newPosition));
      
      bottomSheetY.setValue(newPosition);
    },
    onPanResponderRelease: (evt, gestureState) => {
      const velocity = gestureState.vy;
      
      if (gestureState.dy < -50 || velocity < -0.5) {
        // Yukarı hareket - aç
        animateToExpanded();
      } else if (gestureState.dy > 50 || velocity > 0.5) {
        // Aşağı hareket - kapat
        animateToCollapsed();
      } else {
        // Yarım kalan hareket - eski pozisyona döndür
        const toValue = isExpanded ? screenHeight - 400 : screenHeight - 120;
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
      toValue: screenHeight - 400,
      useNativeDriver: false,
      tension: 100,
      friction: 8,
    }).start();
    setIsExpanded(true);
  };

  const animateToCollapsed = () => {
    Animated.spring(bottomSheetY, {
      toValue: screenHeight - 120,
      useNativeDriver: false,
      tension: 100,
      friction: 8,
    }).start();
    setIsExpanded(false);
  };

  const handleToggle = () => {
    if (isExpanded) {
      animateToCollapsed();
    } else {
      animateToExpanded();
    }
  };

  const renderTimelineItem = (item: TimelineItem, index: number) => (
    <View key={item.id} style={styles.timelineItem}>
      <View style={styles.timelineLeft}>
        <View style={[styles.timelineDot, item.isActive && styles.activeTimelineDot]} />
        {index < timelineItems.length - 1 && <View style={styles.timelineLine} />}
      </View>
      <View style={styles.timelineContent}>
        <View style={styles.timelineCard}>
          <Image source={item.image} style={styles.timelineImage} />
          <View style={styles.timelineInfo}>
            <Text style={styles.timelineTitle}>{item.title}</Text>
            <Text style={styles.timelineTime}>{item.time}</Text>
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
            <Text style={styles.headerTitle}>Program Detayları</Text>
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

          {/* Sabit Amasra Otel Kartı - KALDIR */}

          {/* Kaydırılabilir "Tur Detaylarını Görüntüle" Kartı */}
          <Animated.View 
            style={[
              styles.bottomSheet,
              {
                transform: [{ translateY: bottomSheetY }]
              }
            ]}
          >
            {/* Kaydırılabilir Alan */}
            <View {...panResponder.panHandlers} style={styles.panArea}>
              {/* Handle */}
              <TouchableOpacity onPress={handleToggle} style={styles.handleContainer}>
                <View style={styles.handle} />
              </TouchableOpacity>

              {/* İlk görünür içerik */}
              <View style={styles.visibleContent}>
                <Text style={styles.swipeUpText}>
                  {isExpanded ? 'Aşağı kaydırarak kapat' : 'Detaylar için yukarı kaydırın'}
                </Text>
              </View>
            </View>

            {/* Tur Detayları İçerik */}
            <View style={styles.detailContent}>
              <Text style={styles.detailTitle}>Tur Hakkında</Text>
              
              <Text style={styles.detailDescription}>
                You will get a complete travel package on the beaches. Packages in the form of airline tickets, recommended Hotel rooms, and transportation that have you ever been on holiday to the Greek ETC...
              </Text>
              
              <TouchableOpacity style={styles.readMoreButton}>
                <Text style={styles.readMoreText}>Read More</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.detailButton}>
                <Text style={styles.detailButtonText}>Tur Detaylarını Görüntüle</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
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
    width: 44,
    height: 44,
    borderRadius: 22,
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
    width: 44,
    height: 44,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  timelineContainer: {
    paddingTop: 40,
    paddingBottom: 30, // Azaltıldı
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: 20,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 8,
  },
  activeTimelineDot: {
    backgroundColor: '#00D4FF',
  },
  timelineLine: {
    width: 2,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  timelineContent: {
    flex: 1,
  },
  timelineCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
  },
  timelineImage: {
    width: 50,
    height: 50,
    borderRadius: 12,
    marginRight: 16,
  },
  timelineInfo: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  timelineTime: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  // Amasra Otel Kartı (ScrollView içinde)
  hotelCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 170, // Bottom sheet için daha fazla yer
    zIndex: 1, // Bottom sheet'den düşük
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginLeft: 4,
  },
  cardDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardDetailText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 8,
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
    backgroundColor: '#00D4FF',
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  mapButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  // Kaydırılabilir Bottom Sheet
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 500, // Yeterli yükseklik
    backgroundColor: 'white', // Normal renk
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10, // Android için yüksek elevation
    zIndex: 9999, // En üstte
  },
  panArea: {
    zIndex: 1,
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
  },
  visibleContent: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  swipeUpText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  detailContent: {
    padding: 20,
    flex: 1,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  detailDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  readMoreButton: {
    alignSelf: 'flex-start',
    marginBottom: 30,
  },
  readMoreText: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '500',
  },
  detailButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  detailButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
}); 