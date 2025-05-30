import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Modal,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ReservationScreenProps {
  onBack: () => void;
}

interface SeatData {
  number: number;
  status: 'available' | 'selected' | 'male' | 'female';
}

export default function ReservationScreen({ onBack }: ReservationScreenProps) {
  const [seats, setSeats] = useState<SeatData[]>(() => {
    const initialSeats: SeatData[] = [];
    for (let i = 1; i <= 28; i++) {
      // Görseldeki dolu koltuklar (satın alınmış)
      if ([16, 17, 25].includes(i)) {
        initialSeats.push({ number: i, status: 'male' });
      } else if ([10, 20].includes(i)) {
        initialSeats.push({ number: i, status: 'female' });
      } else {
        initialSeats.push({ number: i, status: 'available' });
      }
    }
    return initialSeats;
  });

  const [showGenderPopup, setShowGenderPopup] = useState(false);
  const [selectedSeatForGender, setSelectedSeatForGender] = useState<number | null>(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  const handleSeatPress = (seatNumber: number, event: any) => {
    const seat = seats.find(s => s.number === seatNumber);
    if (!seat) return;

    if (seat.status === 'available') {
      // Koltuğun konumunu al
      event.target.measure((fx: number, fy: number, width: number, height: number, px: number, py: number) => {
        setPopupPosition({ 
          x: px + width / 2, 
          y: py - 60 
        });
        setSelectedSeatForGender(seatNumber);
        setShowGenderPopup(true);
      });
    } else if (seat.status === 'selected') {
      // Seçili koltuğu kaldır
      setSeats(seats.map(s => 
        s.number === seatNumber ? { ...s, status: 'available' } : s
      ));
    }
  };

  const handleGenderSelect = (gender: 'male' | 'female') => {
    if (selectedSeatForGender) {
      // Kendi seçtiğimiz koltuklar turuncu (selected) olsun
      setSeats(seats.map(s => 
        s.number === selectedSeatForGender ? { ...s, status: 'selected' } : s
      ));
    }
    setShowGenderPopup(false);
    setSelectedSeatForGender(null);
  };

  const closePopup = () => {
    setShowGenderPopup(false);
    setSelectedSeatForGender(null);
  };

  const renderSeat = (seatNumber: number) => {
    const seat = seats.find(s => s.number === seatNumber);
    if (!seat) return null;

    let seatStyle: any[] = [styles.seat];
    let textStyle: any[] = [styles.seatNumber];

    switch (seat.status) {
      case 'available':
        seatStyle = [styles.seat, styles.seatAvailable];
        textStyle = [styles.seatNumber, styles.seatNumberAvailable];
        break;
      case 'selected':
        seatStyle = [styles.seat, styles.seatSelected];
        textStyle = [styles.seatNumber, styles.seatNumberSelected];
        break;
      case 'male':
        seatStyle = [styles.seat, styles.seatMale];
        textStyle = [styles.seatNumber, styles.seatNumberSelected];
        break;
      case 'female':
        seatStyle = [styles.seat, styles.seatFemale];
        textStyle = [styles.seatNumber, styles.seatNumberSelected];
        break;
    }

    return (
      <TouchableOpacity
        key={seatNumber}
        style={seatStyle}
        onPress={(event) => handleSeatPress(seatNumber, event)}
        disabled={seat.status === 'male' || seat.status === 'female'}
      >
        <Text style={textStyle}>{seatNumber}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <ImageBackground 
        source={require('../../assets/ob2.png')} 
        style={styles.backgroundImage}
        resizeMode="cover"
        blurRadius={15}
      >
        <View style={styles.overlay}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Rezervasyon Yap</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Content Card */}
          <View style={styles.contentCard}>
            <ScrollView 
              style={styles.scrollView} 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              <View style={styles.cardHandle} />
              
              <Text style={styles.title}>Koltuk Seçimi Yapınız</Text>
              <Text style={styles.subtitle}>Kamil Koç Turizm</Text>

              {/* Trip Info */}
              <View style={styles.tripInfo}>
                <View style={styles.infoItem}>
                  <Ionicons name="time-outline" size={16} color="#666" />
                  <Text style={styles.infoText}>6 saat</Text>
                </View>
                <View style={styles.infoItem}>
                  <Ionicons name="wifi" size={16} color="#666" />
                  <Text style={styles.infoText}>Wi-Fi</Text>
                </View>
                <View style={styles.infoItem}>
                  <Ionicons name="calendar-outline" size={16} color="#666" />
                  <Text style={styles.infoText}>17/05.2025</Text>
                </View>
                <View style={styles.infoItem}>
                  <Ionicons name="people-outline" size={16} color="#666" />
                  <Text style={styles.infoText}>2+1</Text>
                </View>
              </View>

              {/* Legend */}
              <View style={styles.legend}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, styles.available]} />
                  <Text style={styles.legendText}>Uygun</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, styles.selected]} />
                  <Text style={styles.legendText}>Seçili</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, styles.male]} />
                  <Text style={styles.legendText}>Dolu - Erkek</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, styles.female]} />
                  <Text style={styles.legendText}>Dolu - Kadın</Text>
                </View>
              </View>

              {/* Bus Layout */}
              <View style={styles.busContainer}>
                {/* Bus Front */}
                <View style={styles.busFront}>
                  <View style={styles.windshield} />
                </View>

                {/* Bus Header with driver and gender icons */}
                <View style={styles.busHeader}>
                  <View style={styles.driverIcon}>
                    <Image 
                      source={require('../../assets/steering-wheel.png')} 
                      style={styles.steeringWheelIcon}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.genderIcons}>
                  </View>
                </View>

                {/* Seats in Bus Layout */}
                <View style={styles.seatsContainer}>
                  {/* 7 rows of seats */}
                  {[1, 2, 3, 4, 5, 6, 7].map(row => (
                    <View key={row} style={styles.seatRow}>
                      <View style={styles.leftSeats}>
                        {renderSeat((row - 1) * 4 + 1)}
                        {renderSeat((row - 1) * 4 + 2)}
                      </View>
                      <View style={styles.aisle} />
                      <View style={styles.rightSeats}>
                        {renderSeat((row - 1) * 4 + 3)}
                        {renderSeat((row - 1) * 4 + 4)}
                      </View>
                    </View>
                  ))}
                </View>

                {/* Bus Back */}
                <View style={styles.busBack} />
              </View>

              {/* Confirm Button */}
              <TouchableOpacity style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>Onayla ve Devam Et</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </ImageBackground>

      {/* Gender Selection Popup */}
      {showGenderPopup && (
        <TouchableOpacity 
          style={styles.popupOverlay} 
          activeOpacity={1} 
          onPress={closePopup}
        >
          <View style={[styles.popupBubble, { 
            left: popupPosition.x - 75, 
            top: popupPosition.y 
          }]}>
            <View style={styles.popupArrow} />
            <View style={styles.popupContent}>
              <Text style={styles.popupTitle}>Cinsiyet Seçiniz</Text>
              <View style={styles.genderButtons}>
                <TouchableOpacity 
                  style={[styles.genderButton, styles.maleButton]}
                  onPress={() => handleGenderSelect('male')}
                >
                  <Ionicons name="male" size={20} color="white" />
                  <Text style={styles.genderButtonText}>Erkek</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.genderButton, styles.femaleButton]}
                  onPress={() => handleGenderSelect('female')}
                >
                  <Ionicons name="female" size={20} color="white" />
                  <Text style={styles.genderButtonText}>Kadın</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
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
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(52, 152, 219, 0.7)',
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
  contentCard: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 20,
  },
  cardHandle: {
    width: 50,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    marginBottom: 24,
  },
  tripInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  legendText: {
    fontSize: 11,
    color: '#666',
  },
  available: {
    backgroundColor: '#E0E0E0',
  },
  selected: {
    backgroundColor: '#FF6B35',
  },
  male: {
    backgroundColor: '#00BCD4',
  },
  female: {
    backgroundColor: '#E91E63',
  },
  busContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  busFront: {
    height: 30,
    backgroundColor: '#D0D0D0',
    borderRadius: 15,
    marginBottom: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  windshield: {
    flex: 1,
    height: '100%',
    backgroundColor: '#87CEEB',
    borderRadius: 10,
    margin: 5,
    opacity: 0.3,
  },
  busHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  driverIcon: {
    flex: 1,
  },
  genderIcons: {
    flexDirection: 'row',
    gap: 30,
  },
  genderIcon: {
    alignItems: 'center',
  },
  genderText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  seatsContainer: {
    gap: 10,
    paddingVertical: 10,
  },
  seatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSeats: {
    flexDirection: 'row',
    gap: 8,
  },
  rightSeats: {
    flexDirection: 'row',
    gap: 8,
  },
  aisle: {
    width: 30,
    height: 2,
    backgroundColor: '#E0E0E0',
    borderRadius: 1,
  },
  seat: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seatAvailable: {
    backgroundColor: '#E0E0E0',
  },
  seatSelected: {
    backgroundColor: '#FF6B35',
  },
  seatMale: {
    backgroundColor: '#00BCD4',
  },
  seatFemale: {
    backgroundColor: '#E91E63',
  },
  seatNumber: {
    fontSize: 12,
    fontWeight: '600',
  },
  seatNumberAvailable: {
    color: '#666',
  },
  seatNumberSelected: {
    color: 'white',
  },
  confirmButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  popupOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  popupBubble: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: 150,
  },
  popupArrow: {
    position: 'absolute',
    bottom: -8,
    left: '50%',
    marginLeft: -8,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'white',
  },
  popupContent: {
    alignItems: 'center',
  },
  popupTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  genderButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  genderButton: {
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    minWidth: 60,
  },
  maleButton: {
    backgroundColor: '#00BCD4',
  },
  femaleButton: {
    backgroundColor: '#E91E63',
  },
  genderButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 30,
  },
  busBack: {
    height: 20,
    backgroundColor: '#D0D0D0',
    borderRadius: 10,
    marginTop: 15,
  },
  steeringWheelIcon: {
    width: 24,
    height: 24,
  },
}); 