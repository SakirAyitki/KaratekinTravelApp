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
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ReviewsScreenProps {
  onBack: () => void;
  tripData?: any;
}

interface Review {
  id: number;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
  isVerified?: boolean;
}

export default function ReviewsScreen({ onBack, tripData }: ReviewsScreenProps) {
  const [filterRating, setFilterRating] = useState(0);

  const reviews: Review[] = [
    {
      id: 1,
      userName: 'Tunahan KORKMAZ',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face&auto=format',
      rating: 5,
      date: '2 gün önce',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum',
      isVerified: true,
    },
    {
      id: 2,
      userName: 'Mehmet Yılmaz',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face&auto=format',
      rating: 4,
      date: '5 gün önce',
      comment: 'Harika bir deneyimdi! Rehber çok bilgiliydi ve güzergah mükemmeldi. Kesinlikle tekrar katılırım.',
      isVerified: true,
    },
    {
      id: 3,
      userName: '(Anonim)',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=50&h=50&fit=crop&crop=face&auto=format',
      rating: 5,
      date: '1 hafta önce',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum',
    },
    {
      id: 4,
      userName: 'Ayşe Demir',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face&auto=format',
      rating: 5,
      date: '2 hafta önce',
      comment: 'Ailecek çok eğlendik. Çocuklar özellikle çok sevdi. Organizasyon mükemmeldi.',
      isVerified: true,
    },
    {
      id: 5,
      userName: 'Ali Kaya',
      userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face&auto=format',
      rating: 4,
      date: '3 hafta önce',
      comment: 'Güzel bir gezi oldu ama otobüs biraz geç geldi. Onun dışında her şey iyiydi.',
    },
    {
      id: 6,
      userName: 'Fatma Özkan',
      userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face&auto=format',
      rating: 5,
      date: '1 ay önce',
      comment: 'Mükemmel bir deneyim! Amasra gerçekten çok güzelmiş. Rehberden ve organizasyondan çok memnun kaldık.',
      isVerified: true,
    },
  ];

  const filteredReviews = filterRating === 0 
    ? reviews 
    : reviews.filter(review => review.rating === filterRating);

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const ratingCounts = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length,
  };

  const renderStars = (rating: number) => {
    return (
      <View style={styles.starsContainer}>
        {[...Array(5)].map((_, index) => (
          <Ionicons
            key={index}
            name={index < rating ? "star" : "star-outline"}
            size={14}
            color={index < rating ? "#FFD700" : "#E0E0E0"}
          />
        ))}
      </View>
    );
  };

  const renderRatingBar = (stars: number, count: number) => {
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    
    return (
      <TouchableOpacity 
        style={styles.ratingRow}
        onPress={() => setFilterRating(filterRating === stars ? 0 : stars)}
      >
        <Text style={styles.ratingRowText}>{stars}</Text>
        <Ionicons name="star" size={16} color="#FFD700" />
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${percentage}%` }]} />
        </View>
        <Text style={styles.ratingCount}>({count})</Text>
      </TouchableOpacity>
    );
  };

  const renderReviewCard = ({ item }: { item: Review }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Image source={{ uri: item.userAvatar }} style={styles.reviewAvatar} />
        <View style={styles.reviewInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.reviewerName}>{item.userName}</Text>
            {item.isVerified && (
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" style={styles.verifiedIcon} />
            )}
          </View>
          <View style={styles.reviewMeta}>
            {renderStars(item.rating)}
            <Text style={styles.reviewDate}>{item.date}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.reviewText}>{item.comment}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Geri Bildirimler</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Overall Rating Card */}
        <View style={styles.overallCard}>
          <View style={styles.overallLeft}>
            <Text style={styles.averageRating}>{averageRating.toFixed(1)}</Text>
            {renderStars(Math.round(averageRating))}
            <Text style={styles.totalReviews}>{reviews.length} değerlendirme</Text>
          </View>
          
          <View style={styles.ratingsBreakdown}>
            {[5, 4, 3, 2, 1].map(stars => renderRatingBar(stars, ratingCounts[stars as keyof typeof ratingCounts]))}
          </View>
        </View>

        {/* Filter Info */}
        {filterRating > 0 && (
          <View style={styles.filterInfo}>
            <Text style={styles.filterText}>
              {filterRating} yıldızlı değerlendirmeler ({filteredReviews.length} sonuç)
            </Text>
            <TouchableOpacity onPress={() => setFilterRating(0)}>
              <Text style={styles.clearFilter}>Temizle</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Reviews List */}
        <View style={styles.reviewsList}>
          <FlatList
            data={filteredReviews}
            renderItem={renderReviewCard}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
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
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
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
  scrollView: {
    flex: 1,
  },
  overallCard: {
    backgroundColor: 'white',
    margin: 20,
    padding: 24,
    borderRadius: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  overallLeft: {
    alignItems: 'center',
    marginRight: 32,
  },
  averageRating: {
    fontSize: 48,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  totalReviews: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  ratingsBreakdown: {
    flex: 1,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingRowText: {
    fontSize: 14,
    color: '#333',
    marginRight: 4,
  },
  progressBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginHorizontal: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 4,
  },
  ratingCount: {
    fontSize: 12,
    color: '#666',
    minWidth: 30,
  },
  filterInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#E3F2FD',
    marginHorizontal: 20,
    borderRadius: 8,
    marginBottom: 16,
  },
  filterText: {
    fontSize: 14,
    color: '#1976D2',
    fontWeight: '500',
  },
  clearFilter: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
  },
  reviewsList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  reviewCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  reviewAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  reviewInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  verifiedIcon: {
    marginLeft: 6,
  },
  reviewMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
  },
  reviewText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
}); 