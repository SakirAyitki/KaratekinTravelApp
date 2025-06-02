import React, { useState, useEffect } from 'react';
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
import ProgramDetailScreen from './ProgramDetailScreen';

interface CalendarScreenProps {
  onBack: () => void;
}

interface CalendarTrip {
  id: number;
  title: string;
  location: string;
  date: string;
  time: string;
  image: any;
}

export default function CalendarScreen({ onBack }: CalendarScreenProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  const [showProgramDetail, setShowProgramDetail] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<CalendarTrip | null>(null);

  const weekDays = ['Pt', 'Sl', 'Çr', 'Pr', 'Cm', 'Ct', 'Pz'];
  const monthNames = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];

  const calendarTrips: CalendarTrip[] = [
    {
      id: 1,
      title: 'Amasra Turu',
      location: 'Amasra, Türkiye',
      date: '2024-07-26',
      time: '08:30',
      image: require('../../assets/ob1.png'),
    },
    {
      id: 2,
      title: 'Kastamonu Turu',
      location: 'Kastamonu, Türkiye',
      date: '2024-10-10',
      time: '07:45',
      image: require('../../assets/ob2.png'),
    },
    {
      id: 3,
      title: 'Ege Turu',
      location: 'İzmir, Türkiye',
      date: '2024-12-08',
      time: '09:30',
      image: require('../../assets/ob3.png'),
    },
    {
      id: 4,
      title: 'Sapanca Turu',
      location: 'Sapanca, Türkiye',
      date: '2024-11-22',
      time: '09:00',
      image: require('../../assets/ob1.png'),
    },
    {
      id: 5,
      title: 'Bolu Turu',
      location: 'Bolu, Türkiye',
      date: '2024-11-23',
      time: '10:15',
      image: require('../../assets/ob2.png'),
    },
    {
      id: 6,
      title: 'Cappadocia Turu',
      location: 'Nevşehir, Türkiye',
      date: '2024-11-25',
      time: '06:00',
      image: require('../../assets/ob3.png'),
    },
    {
      id: 7,
      title: 'Pamukkale Turu',
      location: 'Denizli, Türkiye',
      date: '2024-11-28',
      time: '08:45',
      image: require('../../assets/ob1.png'),
    },
    {
      id: 8,
      title: 'Antalya Turu',
      location: 'Antalya, Türkiye',
      date: '2024-12-01',
      time: '09:15',
      image: require('../../assets/ob2.png'),
    },
    {
      id: 9,
      title: 'Trabzon Turu',
      location: 'Trabzon, Türkiye',
      date: '2024-12-05',
      time: '07:30',
      image: require('../../assets/ob3.png'),
    },
    {
      id: 10,
      title: 'Bodrum Turu',
      location: 'Muğla, Türkiye',
      date: '2024-12-10',
      time: '10:00',
      image: require('../../assets/ob1.png'),
    },
    {
      id: 11,
      title: 'Marmaris Turu',
      location: 'Muğla, Türkiye',
      date: '2024-12-12',
      time: '08:00',
      image: require('../../assets/ob2.png'),
    },
    {
      id: 12,
      title: 'Fethiye Turu',
      location: 'Muğla, Türkiye',
      date: '2024-12-15',
      time: '09:45',
      image: require('../../assets/ob3.png'),
    },
    {
      id: 13,
      title: 'Kaş Turu',
      location: 'Antalya, Türkiye',
      date: '2024-12-18',
      time: '08:20',
      image: require('../../assets/ob1.png'),
    },
    {
      id: 14,
      title: 'Olympos Turu',
      location: 'Antalya, Türkiye',
      date: '2024-12-20',
      time: '07:00',
      image: require('../../assets/ob2.png'),
    },
    {
      id: 15,
      title: 'Side Turu',
      location: 'Antalya, Türkiye',
      date: '2024-12-22',
      time: '09:30',
      image: require('../../assets/ob3.png'),
    },
    {
      id: 16,
      title: 'Kayseri Turu',
      location: 'Kayseri, Türkiye',
      date: '2025-01-05',
      time: '08:15',
      image: require('../../assets/ob1.png'),
    },
    {
      id: 17,
      title: 'Konya Turu',
      location: 'Konya, Türkiye',
      date: '2025-01-08',
      time: '09:00',
      image: require('../../assets/ob2.png'),
    },
    {
      id: 18,
      title: 'Eskişehir Turu',
      location: 'Eskişehir, Türkiye',
      date: '2025-01-12',
      time: '08:45',
      image: require('../../assets/ob3.png'),
    },
    {
      id: 19,
      title: 'Bursa Turu',
      location: 'Bursa, Türkiye',
      date: '2025-01-15',
      time: '07:30',
      image: require('../../assets/ob1.png'),
    },
    {
      id: 20,
      title: 'Çanakkale Turu',
      location: 'Çanakkale, Türkiye',
      date: '2025-01-18',
      time: '06:45',
      image: require('../../assets/ob2.png'),
    },
    {
      id: 21,
      title: 'Edirne Turu',
      location: 'Edirne, Türkiye',
      date: '2025-01-22',
      time: '08:30',
      image: require('../../assets/ob3.png'),
    },
    {
      id: 22,
      title: 'Sinop Turu',
      location: 'Sinop, Türkiye',
      date: '2025-01-25',
      time: '09:15',
      image: require('../../assets/ob1.png'),
    },
    {
      id: 23,
      title: 'Samsun Turu',
      location: 'Samsun, Türkiye',
      date: '2025-01-28',
      time: '08:00',
      image: require('../../assets/ob2.png'),
    },
    {
      id: 24,
      title: 'Ordu Turu',
      location: 'Ordu, Türkiye',
      date: '2025-02-02',
      time: '07:45',
      image: require('../../assets/ob3.png'),
    },
    {
      id: 25,
      title: 'Rize Turu',
      location: 'Rize, Türkiye',
      date: '2025-02-05',
      time: '06:30',
      image: require('../../assets/ob1.png'),
    },
  ];

  // Initialize current week start to Monday of current week
  useEffect(() => {
    const today = new Date();
    const mondayOfWeek = getMonday(today);
    setCurrentWeekStart(mondayOfWeek);
  }, []);

  const getMonday = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };

  const getWeekDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentWeekStart);
      date.setDate(currentWeekStart.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const handlePreviousWeek = () => {
    const newWeekStart = new Date(currentWeekStart);
    newWeekStart.setDate(currentWeekStart.getDate() - 7);
    setCurrentWeekStart(newWeekStart);
    // Reset selected date when changing weeks
    setSelectedDate(null);
  };

  const handleNextWeek = () => {
    const newWeekStart = new Date(currentWeekStart);
    newWeekStart.setDate(currentWeekStart.getDate() + 7);
    setCurrentWeekStart(newWeekStart);
    // Reset selected date when changing weeks
    setSelectedDate(null);
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const isSameDay = (date1: Date, date2: Date | null) => {
    if (!date2) return false;
    return formatDate(date1) === formatDate(date2);
  };

  const getTripsForSelectedDate = () => {
    if (!selectedDate) {
      // Tarih seçili değilse tüm programları döndür
      return calendarTrips;
    }
    const selectedDateStr = formatDate(selectedDate);
    return calendarTrips.filter(trip => trip.date === selectedDateStr);
  };

  const hasTripsOnDate = (date: Date) => {
    const dateStr = formatDate(date);
    return calendarTrips.some(trip => trip.date === dateStr);
  };

  const formatTripDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    return `${day} ${month}`;
  };

  const getCurrentDisplayMonth = () => {
    // Haftanın ortasındaki tarihin ayını göster
    const midWeekDate = new Date(currentWeekStart);
    midWeekDate.setDate(currentWeekStart.getDate() + 3);
    return monthNames[midWeekDate.getMonth()];
  };

  const getCurrentDisplayDate = () => {
    if (selectedDate) {
      return `${selectedDate.getDate()} ${monthNames[selectedDate.getMonth()]}`;
    }
    // Seçili tarih yoksa bugünün ayını göster
    const midWeekDate = new Date(currentWeekStart);
    midWeekDate.setDate(currentWeekStart.getDate() + 3);
    return monthNames[midWeekDate.getMonth()];
  };

  const renderTripCard = (trip: CalendarTrip) => (
    <TouchableOpacity 
      key={trip.id} 
      style={styles.tripCard}
      onPress={() => {
        setSelectedTrip(trip);
        setShowProgramDetail(true);
      }}
    >
      <Image source={trip.image} style={styles.tripImage} />
      <View style={styles.tripContent}>
        <View style={styles.tripDateTimeContainer}>
          <View style={styles.dateContainer}>
            <Ionicons name="calendar-outline" size={16} color="#999" />
            <Text style={styles.tripDateText}>{formatTripDate(trip.date)}</Text>
          </View>
          <View style={styles.timeContainer}>
            <Ionicons name="time-outline" size={16} color="#999" />
            <Text style={styles.timeText}>{trip.time}</Text>
          </View>
        </View>
        <Text style={styles.tripTitle}>{trip.title}</Text>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={16} color="#999" />
          <Text style={styles.locationText}>{trip.location}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.arrowButton}>
        <Ionicons name="chevron-forward" size={20} color="#999" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const weekDates = getWeekDates();
  const selectedTrips = getTripsForSelectedDate();

  if (showProgramDetail) {
    return (
      <ProgramDetailScreen 
        onBack={() => setShowProgramDetail(false)}
        tripData={selectedTrip}
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Takvim</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Month and Date Display */}
        <View style={styles.monthContainer}>
          <Text style={styles.monthText}>
            {getCurrentDisplayDate()}
          </Text>
          <View style={styles.navigationButtons}>
            <TouchableOpacity style={styles.navButton} onPress={handlePreviousWeek}>
              <Ionicons name="chevron-back" size={20} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton} onPress={handleNextWeek}>
              <Ionicons name="chevron-forward" size={20} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Calendar Week View */}
        <View style={styles.calendarContainer}>
          <View style={styles.weekDaysContainer}>
            {weekDates.map((date, index) => (
              <View key={index} style={styles.dayColumn}>
                <Text style={styles.dayText}>{weekDays[index]}</Text>
                <TouchableOpacity
                  style={[
                    styles.dateButton,
                    isSameDay(date, selectedDate) && styles.selectedDateButton,
                    hasTripsOnDate(date) && !isSameDay(date, selectedDate) && styles.dateWithTrips
                  ]}
                  onPress={() => setSelectedDate(new Date(date))}
                >
                  <Text style={[
                    styles.calendarDateText,
                    isSameDay(date, selectedDate) && styles.selectedDateText
                  ]}>
                    {date.getDate()}
                  </Text>
                  {hasTripsOnDate(date) && !isSameDay(date, selectedDate) && (
                    <View style={styles.tripIndicator} />
                  )}
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Programs Section */}
        <View style={styles.programsHeader}>
          <Text style={styles.programsTitle}>
            {selectedDate ? `Programlarım (${selectedTrips.length})` : `Tüm Programlarım (${selectedTrips.length})`}
          </Text>
        </View>

        {/* Trips List */}
        <View style={styles.tripsContainer}>
          {selectedTrips.length > 0 ? (
            selectedTrips.map(renderTripCard)
          ) : (
            selectedDate ? (
              <View style={styles.noTripsContainer}>
                <Ionicons name="calendar-outline" size={48} color="#ccc" />
                <Text style={styles.noTripsText}>Bu tarihte program yok</Text>
                <Text style={styles.noTripsSubText}>
                  {formatTripDate(formatDate(selectedDate))} tarihinde planlanmış bir program bulunmuyor.
                </Text>
              </View>
            ) : (
              <View style={styles.noTripsContainer}>
                <Ionicons name="calendar-outline" size={48} color="#ccc" />
                <Text style={styles.noTripsText}>Hiç program yok</Text>
                <Text style={styles.noTripsSubText}>
                  Henüz planlanmış bir program bulunmuyor.
                </Text>
              </View>
            )
          )}
        </View>
      </ScrollView>
    </View>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 20,
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
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  monthText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
  },
  navigationButtons: {
    flexDirection: 'row',
  },
  navButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  calendarContainer: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  weekDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayColumn: {
    alignItems: 'center',
    flex: 1,
  },
  dayText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 12,
    fontWeight: '500',
  },
  dateButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDateButton: {
    backgroundColor: '#FF6B35',
  },
  tripDateTimeContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  tripDateText: {
    fontSize: 14,
    color: '#999',
    marginLeft: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    color: '#999',
    marginLeft: 4,
  },
  tripTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: '#999',
    marginLeft: 4,
  },
  arrowButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDateText: {
    color: 'white',
  },
  programsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  programsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  seeAllText: {
    fontSize: 16,
    color: '#FF6B35',
    fontWeight: '500',
  },
  tripsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  tripCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  tripImage: {
    width: 60,
    height: 60,
    borderRadius: 15,
    marginRight: 16,
  },
  tripContent: {
    flex: 1,
  },
  calendarDateText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  noTripsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTripsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  noTripsSubText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  dateWithTrips: {
    backgroundColor: '#FF6B35',
  },
  tripIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'white',
    position: 'absolute',
    right: 4,
    top: 4,
  },
}); 