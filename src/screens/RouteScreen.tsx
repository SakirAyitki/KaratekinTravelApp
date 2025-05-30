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
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface RouteScreenProps {
  onBack: () => void;
}

export default function RouteScreen({ onBack }: RouteScreenProps) {
  const routeStops = [
    {
      id: 1,
      title: 'Amasra Otel',
      time: '10:15',
      image: require('../../assets/ob1.png'),
      position: { top: 50, right: 40 }
    },
    {
      id: 2,
      title: 'Amasra Tarihi Yer',
      time: '12:00',
      image: require('../../assets/ob2.png'),
      position: { top: 280, left: 40 }
    },
    {
      id: 3,
      title: 'Serbest Zaman',
      time: '17:45',
      image: require('../../assets/ob3.png'),
      position: { top: 510, right: 60 }
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <ImageBackground 
        source={require('../../assets/ob1.png')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <ScrollView style={styles.mainScrollView} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity style={styles.backButton} onPress={onBack}>
                <Ionicons name="chevron-back" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Rota</Text>
              <View style={styles.placeholder} />
            </View>

            {/* Route Container */}
            <View style={styles.routeContainer}>
              {/* Route Stops */}
              {routeStops.map((stop, index) => (
                <View key={stop.id} style={[styles.routeStop, stop.position]}>
                  <View style={styles.stopCard}>
                    <Image source={stop.image} style={styles.stopImage} />
                    <View style={styles.stopInfo}>
                      <Text style={styles.stopTitle}>{stop.title}</Text>
                      <Text style={styles.stopTime}>{stop.time}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            {/* Bottom Card */}
            <View style={styles.bottomCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Amasra Otel</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.ratingText}>4.7</Text>
                </View>
              </View>
              
              <View style={styles.cardLocationInfo}>
                <View style={styles.infoItem}>
                  <Ionicons name="location-outline" size={16} color="#999" />
                  <Text style={styles.infoText}>Amasra, Türkiye</Text>
                </View>
                <View style={styles.avatarsContainer}>
                  <Image source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face&auto=format' }} style={styles.smallAvatar} />
                  <Image source={{ uri: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=50&h=50&fit=crop&crop=face&auto=format' }} style={[styles.smallAvatar, styles.avatarOverlap]} />
                  <Image source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face&auto=format' }} style={[styles.smallAvatar, styles.avatarOverlap]} />
                  <Text style={styles.peopleText}>+50</Text>
                </View>
              </View>

              <View style={styles.stayInfo}>
                <Ionicons name="time-outline" size={16} color="#999" />
                <Text style={styles.stayText}>1 Gün Konaklama</Text>
              </View>

              <TouchableOpacity style={styles.mapButton}>
                <Text style={styles.mapButtonText}>Haritada Görüntüle</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  mainScrollView: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(52, 152, 219, 0.4)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  placeholder: {
    width: 40,
    height: 40,
  },
  routeContainer: {
    flex: 1,
    position: 'relative',
    paddingHorizontal: 24,
    minHeight: 600,
  },
  routeStop: {
    position: 'absolute',
    zIndex: 20,
  },
  stopCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    width: 200,
    height: 100,
  },
  stopImage: {
    width: 50,
    height: 50,
    borderRadius: 12,
    marginRight: 12,
  },
  stopInfo: {
    flex: 1,
  },
  stopTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  stopTime: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  bottomCard: {
    backgroundColor: '#2C2C2C',
    borderRadius: 20,
    margin: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginVertical: 50,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 4,
    fontWeight: '600',
  },
  cardLocationInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoText: {
    fontSize: 14,
    color: '#CCCCCC',
    marginLeft: 6,
  },
  avatarsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallAvatar: {
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
  peopleText: {
    fontSize: 14,
    color: '#CCCCCC',
    marginLeft: 8,
    fontWeight: '500',
  },
  stayInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  stayText: {
    fontSize: 14,
    color: '#CCCCCC',
    marginLeft: 6,
  },
  mapButton: {
    backgroundColor: '#24BAEC',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  mapButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 