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
}

interface TimelineItem {
  id: number;
  title: string;
  time: string;
  image: any;
  isCompleted?: boolean;
}

const { height: screenHeight } = Dimensions.get('window');

export default function PastTripDetailScreen({ onBack, tripData }: PastTripDetailScreenProps) {
  const [bottomSheetY] = useState(new Animated.Value(screenHeight - 120));
  const [isExpanded, setIsExpanded] = useState(false);

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
      const currentPosition = isExpanded ? screenHeight - 400 : screenHeight - 120;
      let newPosition = currentPosition + gestureState.dy;
      
      newPosition = Math.max(screenHeight - 400, Math.min(screenHeight - 120, newPosition));
      
      bottomSheetY.setValue(newPosition);
    },
    onPanResponderRelease: (evt, gestureState) => {
      const velocity = gestureState.vy;
      
      if (gestureState.dy < -50 || velocity < -0.5) {
        animateToExpanded();
      } else if (gestureState.dy > 50 || velocity > 0.5) {
        animateToCollapsed();
      } else {
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
          </ScrollView>
        </View>
      </ImageBackground>

      {/* Bottom Sheet - Geçmiş Gezi İçin Farklı */}
      <Animated.View 
        style={[styles.bottomSheet, { transform: [{ translateY: bottomSheetY }] }]}
        {...panResponder.panHandlers}
      >
        <View style={styles.bottomSheetHandle} />
        
        <View style={styles.tripSummaryCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{tripData?.title || 'Amasra Turu'}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{tripData?.rating || '4.7'}</Text>
            </View>
          </View>
          
          <View style={styles.tripDetails}>
            <View style={styles.detailRow}>
              <Ionicons name="calendar-outline" size={16} color="#999" />
              <Text style={styles.detailText}>{tripData?.date || '26 Ekim 2024'}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Ionicons name="location-outline" size={16} color="#999" />
              <Text style={styles.detailText}>{tripData?.fullLocation || 'Amasra, Kastamonu'}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
              <Text style={styles.statusText}>Gezi Tamamlandı</Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.reviewButton}>
              <Ionicons name="star-outline" size={20} color="#FF6B35" />
              <Text style={styles.reviewButtonText}>Değerlendir</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.shareButton}>
              <Ionicons name="share-outline" size={20} color="#333" />
              <Text style={styles.shareButtonText}>Paylaş</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    height: 400,
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
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
  tripSummaryCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
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
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
  },
  tripDetails: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  statusText: {
    fontSize: 14,
    color: '#4CAF50',
    marginLeft: 8,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reviewButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B35',
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 8,
  },
  reviewButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginLeft: 8,
  },
  shareButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 12,
    borderRadius: 12,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
}); 