import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BusGalleryModal from '../components/BusGalleryModal';

interface BusInfoScreenProps {
  onBack: () => void;
  companyName?: string;
}

export default function BusInfoScreen({ onBack, companyName = 'Kamil Koç' }: BusInfoScreenProps) {
  const [isGalleryModalVisible, setIsGalleryModalVisible] = useState(false);

  const handleBusCardPress = () => {
    setIsGalleryModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <View style={styles.backButtonCircle}>
            <Ionicons name="arrow-back" size={20} color="#1B1E28" />
          </View>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Otobüs Bilgileri{'\n'}({companyName})</Text>
        
        <Image 
          source={require('../../assets/ob1.png')} 
          style={styles.companyAvatar}
        />
      </View>

      {/* Bus Info Section */}
      <View style={styles.busInfoContainer}>
        <View style={styles.busInfoRow}>
          {/* Passenger Count */}
          <View style={styles.infoItem}>
            <Ionicons name="person-outline" size={16} color="#7D848D" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoNumber}>11</Text>
            </View>
          </View>

          {/* Seat Configuration 2+1 */}
          <View style={styles.infoItem}>
            <View style={styles.seatConfig}>
              <Text style={styles.seatConfigText}>2+1</Text>
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoNumber}>8</Text>
            </View>
          </View>

          {/* Seat Configuration 2+2 */}
          <View style={styles.infoItem}>
            <View style={styles.seatConfig}>
              <Text style={styles.seatConfigText}>2+2</Text>
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoNumber}>3</Text>
            </View>
          </View>

          {/* Wi-Fi */}
          <View style={styles.wifiItem}>
            <Ionicons name="wifi-outline" size={16} color="#7D848D" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoText}>Wi-Fi</Text>
            </View>
          </View>

          {/* Priz (Power Outlet) */}
          <View style={styles.wifiItem}>
            <Ionicons name="flash-outline" size={16} color="#7D848D" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoText}>Priz</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Buses Section */}
      <View style={styles.busesSection}>
        <Text style={styles.busesTitle}>Otobüsler</Text>
        
        <ScrollView style={styles.busList} showsVerticalScrollIndicator={false}>
          {/* Bus Item 1 */}
          <TouchableOpacity style={styles.busItem} onPress={handleBusCardPress}>
            <View style={styles.busCard}>
              <View style={styles.busImageContainer}>
                <Image 
                  source={require('../../assets/ob1.png')} 
                  style={styles.busImage}
                />
              </View>
              
              <View style={styles.busInfo}>
                <View style={styles.busMainInfo}>
                  <Text style={styles.busModel}>MAN</Text>
                </View>
                
                <View style={styles.busFeatures}>
                  <View style={styles.seatConfigSmall}>
                    <Text style={styles.seatConfigTextSmall}>2+1</Text>
                  </View>
                  <Ionicons name="wifi-outline" size={16} color="#7D848D" />
                  <Ionicons name="flash-outline" size={16} color="#7D848D" />
                </View>
                
                <View style={styles.busCapacity}>
                  <Ionicons name="people-outline" size={16} color="#7D848D" />
                  <Text style={styles.capacityText}>45 Kişilik</Text>
                </View>
              </View>
            </View>
            
            <TouchableOpacity style={styles.arrowButton}>
              <Ionicons name="chevron-forward" size={20} color="#7D848D" />
            </TouchableOpacity>
          </TouchableOpacity>

          {/* Bus Item 2 */}
          <TouchableOpacity style={styles.busItem} onPress={handleBusCardPress}>
            <View style={styles.busCard}>
              <View style={styles.busImageContainer}>
                <Image 
                  source={require('../../assets/ob1.png')} 
                  style={styles.busImage}
                />
              </View>
              
              <View style={styles.busInfo}>
                <View style={styles.busMainInfo}>
                  <Text style={styles.busModel}>MAN</Text>
                </View>
                
                <View style={styles.busFeatures}>
                  <View style={styles.seatConfigSmall}>
                    <Text style={styles.seatConfigTextSmall}>2+2</Text>
                  </View>
                  <Ionicons name="wifi-outline" size={16} color="#7D848D" />
                  <Ionicons name="flash-outline" size={16} color="#7D848D" />
                </View>
                
                <View style={styles.busCapacity}>
                  <Ionicons name="people-outline" size={16} color="#7D848D" />
                  <Text style={styles.capacityText}>55 Kişilik</Text>
                </View>
              </View>
            </View>
            
            <TouchableOpacity style={styles.arrowButton}>
              <Ionicons name="chevron-forward" size={20} color="#7D848D" />
            </TouchableOpacity>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Bus Gallery Modal */}
      <BusGalleryModal
        visible={isGalleryModalVisible}
        onClose={() => setIsGalleryModalVisible(false)}
        companyName={companyName}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 5,
    marginTop: 48,
    gap: 55,
  },
  backButton: {
    padding: 0,
  },
  backButtonCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F7F7F9',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1B1E28',
    textAlign: 'center',
    lineHeight: 22,
  },
  companyAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  busInfoContainer: {
    backgroundColor: '#EEEEEE',
    marginHorizontal: 15,
    marginTop: 37,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 13,
    height: 45,
  },
  busInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  infoTextContainer: {
    alignItems: 'center',
  },
  infoNumber: {
    fontSize: 13,
    fontWeight: '600',
    color: '#7D848D',
    letterSpacing: 0.3,
    lineHeight: 16,
  },
  seatConfig: {
    backgroundColor: '#B9B9B9',
    borderRadius: 7,
    width: 29,
    height: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seatConfigText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.3,
    lineHeight: 16,
  },
  wifiItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: 53,
  },
  infoText: {
    fontSize: 13,
    fontWeight: '400',
    color: '#7D848D',
    letterSpacing: 0.3,
    lineHeight: 16,
  },
  busesSection: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 39,
  },
  busesTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1B1E28',
    lineHeight: 28,
    marginBottom: 16,
  },
  busList: {
    flex: 1,
  },
  busItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 8,
    padding: 0,
    height: 76,
    shadowColor: '#B4BCC9',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },
  busCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    gap: 16,
  },
  busImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    overflow: 'hidden',
    marginLeft: 0,
  },
  busImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  busInfo: {
    flex: 1,
    justifyContent: 'space-between',
    height: 63,
    gap: 4,
  },
  busMainInfo: {
    height: 20,
  },
  busModel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1B1E28',
    letterSpacing: 0.5,
    lineHeight: 20,
  },
  busFeatures: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  seatConfigSmall: {
    backgroundColor: '#B9B9B9',
    borderRadius: 7,
    width: 29,
    height: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seatConfigTextSmall: {
    fontSize: 8,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  busCapacity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: 82,
  },
  capacityText: {
    fontSize: 13,
    fontWeight: '400',
    color: '#7D848D',
    letterSpacing: 0.3,
    lineHeight: 16,
  },
  arrowButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
}); 