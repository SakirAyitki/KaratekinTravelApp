import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  StatusBar,
  SafeAreaView,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import RangeSlider from './RangeSlider';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApplyFilter: (filters: any) => void;
}

export default function FilterModal({ visible, onClose, onApplyFilter }: FilterModalProps) {
  // Konum state
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  // Tarih state
  const [startDate, setStartDate] = useState(new Date(2025, 9, 9)); // 09-10-2025
  const [endDate, setEndDate] = useState(new Date(2025, 10, 9)); // 09-11-2025
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('');

  // Fiyat state
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  // Gün state
  const [minDays, setMinDays] = useState(0);
  const [maxDays, setMaxDays] = useState(4);

  // Katılımcı state
  const [minParticipants, setMinParticipants] = useState(0);
  const [maxParticipants, setMaxParticipants] = useState(50);

  // Sezon state
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);

  // Tab state
  const [activeTab, setActiveTab] = useState<'gezi' | 'firma'>('gezi');

  // Firma filtreleme state'leri
  const [selectedFirmaCities, setSelectedFirmaCities] = useState<string[]>([]);
  const [showFirmaLocationDropdown, setShowFirmaLocationDropdown] = useState(false);
  const [minTourCount, setMinTourCount] = useState(0);
  const [maxTourCount, setMaxTourCount] = useState(45);
  const [isOnlyApprovedCompanies, setIsOnlyApprovedCompanies] = useState(false);
  const [minTotalParticipants, setMinTotalParticipants] = useState(100);
  const [maxTotalParticipants, setMaxTotalParticipants] = useState(350);
  const [selectedSatisfactionRatings, setSelectedSatisfactionRatings] = useState<string[]>([]);

  const availableCities = [
    'İstanbul', 'Ankara', 'Kahramanmaraş', 'İzmir', 'Antalya', 
    'Bursa', 'Adana', 'Konya', 'Trabzon', 'Gaziantep'
  ];

  const timeFilters = ['Bugün', 'Bu Hafta', 'Bu Ay'];
  const seasons = ['İlkbahar', 'Yaz', 'Sonbahar', 'Kış'];
  const satisfactionRatings = ['8.5+', '6.5 - 8.5', '4.5 - 6.5', '2.5 - 4.5', '2.5 -'];

  // Modal açıldığında gezi filtreleme tab'ı seçili olsun
  useEffect(() => {
    if (visible) {
      setActiveTab('gezi');
    }
  }, [visible]);

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const addCity = (city: string) => {
    if (!selectedCities.includes(city)) {
      setSelectedCities([...selectedCities, city]);
    }
  };

  const removeCity = (cityToRemove: string) => {
    setSelectedCities(selectedCities.filter(city => city !== cityToRemove));
  };

  const addFirmaCity = (city: string) => {
    if (!selectedFirmaCities.includes(city)) {
      setSelectedFirmaCities([...selectedFirmaCities, city]);
    }
  };

  const removeFirmaCity = (cityToRemove: string) => {
    setSelectedFirmaCities(selectedFirmaCities.filter(city => city !== cityToRemove));
  };

  const toggleSeason = (season: string) => {
    if (selectedSeasons.includes(season)) {
      setSelectedSeasons(selectedSeasons.filter(s => s !== season));
    } else {
      setSelectedSeasons([...selectedSeasons, season]);
    }
  };

  const toggleSatisfactionRating = (rating: string) => {
    if (selectedSatisfactionRatings.includes(rating)) {
      setSelectedSatisfactionRatings(selectedSatisfactionRatings.filter(r => r !== rating));
    } else {
      setSelectedSatisfactionRatings([...selectedSatisfactionRatings, rating]);
    }
  };

  const handleTimeFilterSelect = (filter: string) => {
    setSelectedTimeFilter(filter);
    const today = new Date();
    
    switch (filter) {
      case 'Bugün':
        setStartDate(today);
        setEndDate(today);
        break;
      case 'Bu Hafta':
        const endOfWeek = new Date(today);
        endOfWeek.setDate(today.getDate() + 7);
        setStartDate(today);
        setEndDate(endOfWeek);
        break;
      case 'Bu Ay':
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        setStartDate(today);
        setEndDate(endOfMonth);
        break;
    }
  };

  const onStartDateChange = (event: any, selectedDate?: Date) => {
    setShowStartDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const onEndDateChange = (event: any, selectedDate?: Date) => {
    setShowEndDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  const handleApplyFilter = () => {
    if (activeTab === 'gezi') {
      const filters = {
        cities: selectedCities,
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        timeFilter: selectedTimeFilter,
        minPrice,
        maxPrice,
        minDays,
        maxDays,
        minParticipants,
        maxParticipants,
        seasons: selectedSeasons,
      };
      onApplyFilter(filters);
    } else {
      const filters = {
        cities: selectedFirmaCities,
        minTourCount,
        maxTourCount,
        isOnlyApprovedCompanies,
        minTotalParticipants,
        maxTotalParticipants,
        satisfactionRatings: selectedSatisfactionRatings,
      };
      onApplyFilter(filters);
    }
    onClose();
  };

  const handleResetFilter = () => {
    if (activeTab === 'gezi') {
      setSelectedCities([]);
      setStartDate(new Date(2025, 9, 9));
      setEndDate(new Date(2025, 10, 9));
      setSelectedTimeFilter('');
      setMinPrice(0);
      setMaxPrice(1000);
      setMinDays(0);
      setMaxDays(4);
      setMinParticipants(0);
      setMaxParticipants(50);
      setSelectedSeasons([]);
    } else {
      setSelectedFirmaCities([]);
      setMinTourCount(0);
      setMaxTourCount(45);
      setIsOnlyApprovedCompanies(false);
      setMinTotalParticipants(100);
      setMaxTotalParticipants(350);
      setSelectedSatisfactionRatings([]);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#EBEBEB" />
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Header with Tabs */}
          <View style={styles.headerContainer}>
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === 'gezi' && styles.activeTab
                ]}
                onPress={() => setActiveTab('gezi')}
              >
                <Text style={[
                  styles.tabText,
                  activeTab === 'gezi' && styles.activeTabText
                ]}>
                  Gezi Filtreleme
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === 'firma' && styles.activeTab
                ]}
                onPress={() => setActiveTab('firma')}
              >
                <Text style={[
                  styles.tabText,
                  activeTab === 'firma' && styles.activeTabText
                ]}>
                  Firma Filtreleme
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {activeTab === 'gezi' ? (
            <>
              {/* Konum Section */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Konum</Text>
                  <TouchableOpacity onPress={() => setSelectedCities([])}>
                    <Text style={styles.resetText}>Sıfırla</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setShowLocationDropdown(true)}
                >
                  <Text style={styles.dropdownText}>Şehir Seçin</Text>
                  <View style={styles.dropdownIcon}>
                    <Ionicons name="chevron-down" size={16} color="#555E67" />
                  </View>
                </TouchableOpacity>

                <View style={styles.cityTagsContainer}>
                  {selectedCities.map((city, index) => (
                    <View key={index} style={styles.cityTag}>
                      <View style={styles.cityRemoveButton}>
                        <TouchableOpacity onPress={() => removeCity(city)}>
                          <Ionicons name="close" size={8} color="#FFFFFF" />
                        </TouchableOpacity>
                      </View>
                      <Text style={styles.cityTagText}>{city}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Tarih Section */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Tarih</Text>
                  <TouchableOpacity onPress={() => {
                    setStartDate(new Date(2025, 9, 9));
                    setEndDate(new Date(2025, 10, 9));
                    setSelectedTimeFilter('');
                  }}>
                    <Text style={styles.resetText}>Sıfırla</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.dateContainer}>
                  <View style={styles.dateInputContainer}>
                    <Text style={styles.dateLabel}>Başlangıç</Text>
                    <TouchableOpacity 
                      style={styles.dateInput}
                      onPress={() => setShowStartDatePicker(true)}
                    >
                      <Text style={styles.dateInputText}>{formatDate(startDate)}</Text>
                      <View style={styles.dateIcon}>
                        <Ionicons name="calendar-outline" size={12} color="#555E67" />
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.dateInputContainer}>
                    <Text style={styles.dateLabel}>Bitiş</Text>
                    <TouchableOpacity 
                      style={styles.dateInput}
                      onPress={() => setShowEndDatePicker(true)}
                    >
                      <Text style={styles.dateInputText}>{formatDate(endDate)}</Text>
                      <View style={styles.dateIcon}>
                        <Ionicons name="calendar-outline" size={12} color="#555E67" />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.timeFiltersContainer}>
                  {timeFilters.map((filter, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.timeFilterButton,
                        selectedTimeFilter === filter && styles.timeFilterButtonActive
                      ]}
                      onPress={() => handleTimeFilterSelect(filter)}
                    >
                      <Text style={[
                        styles.timeFilterText,
                        selectedTimeFilter === filter && styles.timeFilterTextActive
                      ]}>
                        {filter}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Date Pickers */}
                {showStartDatePicker && (
                  <DateTimePicker
                    value={startDate}
                    mode="date"
                    display="default"
                    onChange={onStartDateChange}
                  />
                )}
                {showEndDatePicker && (
                  <DateTimePicker
                    value={endDate}
                    mode="date"
                    display="default"
                    onChange={onEndDateChange}
                  />
                )}
              </View>

              {/* Fiyat Section */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Fiyat</Text>
                  <TouchableOpacity onPress={() => {
                    setMinPrice(0);
                    setMaxPrice(1000);
                  }}>
                    <Text style={styles.resetText}>Sıfırla</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.sliderContainer}>
                  <RangeSlider
                    min={0}
                    max={1000}
                    minValue={minPrice}
                    maxValue={maxPrice}
                    onMinValueChange={setMinPrice}
                    onMaxValueChange={setMaxPrice}
                    step={10}
                  />
                </View>

                <View style={styles.priceInputsContainer}>
                  <View style={styles.priceInputContainer}>
                    <Text style={styles.priceLabel}>Minimum</Text>
                    <View style={styles.priceInput}>
                      <View style={styles.priceIcon}>
                        <Text style={styles.priceSymbol}>$</Text>
                      </View>
                      <TextInput
                        style={styles.priceInputText}
                        value={minPrice.toString()}
                        onChangeText={(text) => setMinPrice(parseInt(text) || 0)}
                        keyboardType="numeric"
                      />
                    </View>
                  </View>

                  <View style={styles.priceInputContainer}>
                    <Text style={styles.priceLabel}>Maksimum</Text>
                    <View style={styles.priceInput}>
                      <View style={styles.priceIcon}>
                        <Text style={styles.priceSymbol}>$</Text>
                      </View>
                      <TextInput
                        style={styles.priceInputText}
                        value={maxPrice.toString()}
                        onChangeText={(text) => setMaxPrice(parseInt(text) || 0)}
                        keyboardType="numeric"
                      />
                    </View>
                  </View>
                </View>
              </View>

              {/* Seyahat Süresi Section */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Seyahat Süresi (gün)</Text>
                  <TouchableOpacity onPress={() => {
                    setMinDays(0);
                    setMaxDays(4);
                  }}>
                    <Text style={styles.resetText}>Sıfırla</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.sliderContainer}>
                  <RangeSlider
                    min={0}
                    max={30}
                    minValue={minDays}
                    maxValue={maxDays}
                    onMinValueChange={setMinDays}
                    onMaxValueChange={setMaxDays}
                    step={1}
                  />
                </View>

                <View style={styles.daysInputsContainer}>
                  <View style={styles.daysInputContainer}>
                    <Text style={styles.daysLabel}>Minimum</Text>
                    <View style={styles.daysInput}>
                      <View style={styles.daysIcon}>
                        <Ionicons name="time-outline" size={12} color="#555E67" />
                      </View>
                      <TextInput
                        style={styles.daysInputText}
                        value={minDays.toString()}
                        onChangeText={(text) => setMinDays(parseInt(text) || 0)}
                        keyboardType="numeric"
                      />
                    </View>
                  </View>

                  <View style={styles.daysInputContainer}>
                    <Text style={styles.daysLabel}>Maksimum</Text>
                    <View style={styles.daysInput}>
                      <View style={styles.daysIcon}>
                        <Ionicons name="time-outline" size={12} color="#555E67" />
                      </View>
                      <TextInput
                        style={styles.daysInputText}
                        value={maxDays.toString()}
                        onChangeText={(text) => setMaxDays(parseInt(text) || 0)}
                        keyboardType="numeric"
                      />
                    </View>
                  </View>
                </View>

                <Text style={styles.daysNote}>Maksimum {maxDays} gün {maxDays + 1} gece ifade eder</Text>
              </View>

              {/* Katılımcı Sayısı Section */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Katılımcı Sayısı</Text>
                  <TouchableOpacity onPress={() => {
                    setMinParticipants(0);
                    setMaxParticipants(50);
                  }}>
                    <Text style={styles.resetText}>Sıfırla</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.sliderContainer}>
                  <RangeSlider
                    min={0}
                    max={100}
                    minValue={minParticipants}
                    maxValue={maxParticipants}
                    onMinValueChange={setMinParticipants}
                    onMaxValueChange={setMaxParticipants}
                    step={1}
                  />
                </View>

                <View style={styles.participantsInputsContainer}>
                  <View style={styles.participantsInputContainer}>
                    <Text style={styles.participantsLabel}>Minimum</Text>
                    <View style={styles.participantsInput}>
                      <View style={styles.participantsIcon}>
                        <Ionicons name="person-outline" size={12} color="#555E67" />
                      </View>
                      <TextInput
                        style={styles.participantsInputText}
                        value={minParticipants.toString()}
                        onChangeText={(text) => setMinParticipants(parseInt(text) || 0)}
                        keyboardType="numeric"
                      />
                    </View>
                  </View>

                  <View style={styles.participantsInputContainer}>
                    <Text style={styles.participantsLabel}>Maksimum</Text>
                    <View style={styles.participantsInput}>
                      <View style={styles.participantsIcon}>
                        <Ionicons name="person-outline" size={12} color="#555E67" />
                      </View>
                      <TextInput
                        style={styles.participantsInputText}
                        value={maxParticipants.toString()}
                        onChangeText={(text) => setMaxParticipants(parseInt(text) || 0)}
                        keyboardType="numeric"
                      />
                    </View>
                  </View>
                </View>
              </View>

              {/* Sezon Section */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Sezon</Text>
                  <TouchableOpacity onPress={() => setSelectedSeasons([])}>
                    <Text style={styles.resetText}>Sıfırla</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.seasonsContainer}>
                  {seasons.map((season, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.seasonButton,
                        selectedSeasons.includes(season) && styles.seasonButtonActive
                      ]}
                      onPress={() => toggleSeason(season)}
                    >
                      <Text style={[
                        styles.seasonText,
                        selectedSeasons.includes(season) && styles.seasonTextActive
                      ]}>
                        {season}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </>
          ) : (
            <>
              {/* Konum Section */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Konum</Text>
                  <TouchableOpacity onPress={() => setSelectedFirmaCities([])}>
                    <Text style={styles.resetText}>Sıfırla</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setShowFirmaLocationDropdown(true)}
                >
                  <Text style={styles.dropdownText}>Şehir Seçin</Text>
                  <View style={styles.dropdownIcon}>
                    <Ionicons name="chevron-down" size={16} color="#555E67" />
                  </View>
                </TouchableOpacity>

                <View style={styles.cityTagsContainer}>
                  {selectedFirmaCities.map((city, index) => (
                    <View key={index} style={styles.cityTag}>
                      <View style={styles.cityRemoveButton}>
                        <TouchableOpacity onPress={() => removeFirmaCity(city)}>
                          <Ionicons name="close" size={8} color="#FFFFFF" />
                        </TouchableOpacity>
                      </View>
                      <Text style={styles.cityTagText}>{city}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Toplam Gezi Sayısı Section */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Toplam Gezi Sayısı</Text>
                  <TouchableOpacity onPress={() => {
                    setMinTourCount(0);
                    setMaxTourCount(45);
                  }}>
                    <Text style={styles.resetText}>Sıfırla</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.tourCountInputsContainer}>
                  <View style={styles.tourCountInputContainer}>
                    <Text style={styles.tourCountLabel}>Minimum</Text>
                    <View style={styles.tourCountInput}>
                      <View style={styles.tourCountIcon}>
                        <Ionicons name="list-outline" size={12} color="#7D848D" />
                      </View>
                      <TextInput
                        style={styles.tourCountInputText}
                        value={minTourCount.toString()}
                        onChangeText={(text) => setMinTourCount(parseInt(text) || 0)}
                        keyboardType="numeric"
                        placeholder="0"
                      />
                    </View>
                  </View>

                  <View style={styles.tourCountInputContainer}>
                    <Text style={styles.tourCountLabel}>Maksimum</Text>
                    <View style={styles.tourCountInput}>
                      <View style={styles.tourCountIcon}>
                        <Ionicons name="list-outline" size={12} color="#7D848D" />
                      </View>
                      <TextInput
                        style={styles.tourCountInputText}
                        value={maxTourCount.toString()}
                        onChangeText={(text) => setMaxTourCount(parseInt(text) || 0)}
                        keyboardType="numeric"
                        placeholder="45"
                      />
                    </View>
                  </View>
                </View>
              </View>

              {/* Yalnızca Onaylı Firmalar Section */}
              <View style={styles.section}>
                <TouchableOpacity 
                  style={styles.approvedCompaniesContainer}
                  onPress={() => setIsOnlyApprovedCompanies(!isOnlyApprovedCompanies)}
                >
                  <Text style={styles.sectionTitle}>Yalnızca Onaylı Firmalar</Text>
                  <View style={[styles.checkboxContainer, isOnlyApprovedCompanies && styles.checkboxContainerActive]}>
                    {isOnlyApprovedCompanies && (
                      <Ionicons 
                        name="checkmark" 
                        size={14} 
                        color="#FFFFFF" 
                      />
                    )}
                  </View>
                </TouchableOpacity>
              </View>

              {/* Toplam Katılımcı Sayısı Section */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Toplam Katılımcı Sayısı</Text>
                  <TouchableOpacity onPress={() => {
                    setMinTotalParticipants(100);
                    setMaxTotalParticipants(350);
                  }}>
                    <Text style={styles.resetText}>Sıfırla</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.totalParticipantsInputsContainer}>
                  <View style={styles.totalParticipantsInputContainer}>
                    <Text style={styles.totalParticipantsLabel}>Minimum</Text>
                    <View style={styles.totalParticipantsInput}>
                      <View style={styles.totalParticipantsIcon}>
                        <Ionicons name="people-outline" size={12} color="#555E67" />
                      </View>
                      <TextInput
                        style={styles.totalParticipantsInputText}
                        value={minTotalParticipants.toString()}
                        onChangeText={(text) => setMinTotalParticipants(parseInt(text) || 0)}
                        keyboardType="numeric"
                        placeholder="100"
                      />
                    </View>
                  </View>

                  <View style={styles.totalParticipantsInputContainer}>
                    <Text style={styles.totalParticipantsLabel}>Maksimum</Text>
                    <View style={styles.totalParticipantsInput}>
                      <View style={styles.totalParticipantsIcon}>
                        <Ionicons name="people-outline" size={12} color="#555E67" />
                      </View>
                      <TextInput
                        style={styles.totalParticipantsInputText}
                        value={maxTotalParticipants.toString()}
                        onChangeText={(text) => setMaxTotalParticipants(parseInt(text) || 0)}
                        keyboardType="numeric"
                        placeholder="350"
                      />
                    </View>
                  </View>
                </View>
              </View>

              {/* Memnuniyet Oranı Section */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Memnuniyet Oranı</Text>
                  <TouchableOpacity onPress={() => setSelectedSatisfactionRatings([])}>
                    <Text style={styles.resetText}>Sıfırla</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.satisfactionRatingsContainer}>
                  {satisfactionRatings.map((rating, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.satisfactionRatingButton,
                        selectedSatisfactionRatings.includes(rating) && styles.satisfactionRatingButtonActive
                      ]}
                      onPress={() => toggleSatisfactionRating(rating)}
                    >
                      <Text style={[
                        styles.satisfactionRatingText,
                        selectedSatisfactionRatings.includes(rating) && styles.satisfactionRatingTextActive
                      ]}>
                        {rating}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </>
          )}
        </ScrollView>

        {/* Bottom Buttons */}
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.filterButton} onPress={handleApplyFilter}>
            <Text style={styles.filterButtonText}>Filtrele</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.resetButton} onPress={handleResetFilter}>
            <Text style={styles.resetButtonText}>Filtreyi Sıfırla</Text>
          </TouchableOpacity>
        </View>

        {/* City Selection Modal */}
        <Modal
          visible={showLocationDropdown}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowLocationDropdown(false)}
        >
          <View style={styles.cityModalOverlay}>
            <View style={styles.cityModalContent}>
              <View style={styles.cityModalHeader}>
                <Text style={styles.cityModalTitle}>Şehir Seçin</Text>
                <TouchableOpacity
                  style={styles.cityModalClose}
                  onPress={() => setShowLocationDropdown(false)}
                >
                  <Ionicons name="close" size={24} color="#31373D" />
                </TouchableOpacity>
              </View>
              
              <ScrollView style={styles.cityModalScroll}>
                {availableCities.filter(city => !selectedCities.includes(city)).map((city, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.cityModalItem}
                    onPress={() => addCity(city)}
                  >
                    <Text style={styles.cityModalItemText}>{city}</Text>
                    <Ionicons name="add-circle-outline" size={20} color="#24BAEC" />
                  </TouchableOpacity>
                ))}
              </ScrollView>
              
              <View style={styles.cityModalFooter}>
                <TouchableOpacity
                  style={styles.cityModalConfirmButton}
                  onPress={() => setShowLocationDropdown(false)}
                >
                  <Text style={styles.cityModalConfirmText}>Tamam</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Firma City Selection Modal */}
        <Modal
          visible={showFirmaLocationDropdown}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowFirmaLocationDropdown(false)}
        >
          <View style={styles.cityModalOverlay}>
            <View style={styles.cityModalContent}>
              <View style={styles.cityModalHeader}>
                <Text style={styles.cityModalTitle}>Şehir Seçin</Text>
                <TouchableOpacity
                  style={styles.cityModalClose}
                  onPress={() => setShowFirmaLocationDropdown(false)}
                >
                  <Ionicons name="close" size={24} color="#31373D" />
                </TouchableOpacity>
              </View>
              
              <ScrollView style={styles.cityModalScroll}>
                {availableCities.filter(city => !selectedFirmaCities.includes(city)).map((city, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.cityModalItem}
                    onPress={() => addFirmaCity(city)}
                  >
                    <Text style={styles.cityModalItemText}>{city}</Text>
                    <Ionicons name="add-circle-outline" size={20} color="#24BAEC" />
                  </TouchableOpacity>
                ))}
              </ScrollView>
              
              <View style={styles.cityModalFooter}>
                <TouchableOpacity
                  style={styles.cityModalConfirmButton}
                  onPress={() => setShowFirmaLocationDropdown(false)}
                >
                  <Text style={styles.cityModalConfirmText}>Tamam</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },

  content: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  headerContainer: {
    marginBottom: 24,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#D6D6D6',
    borderRadius: 16,
    height: 56,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  activeTab: {
    backgroundColor: '#24BAEC',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555E67',
    lineHeight: 20,
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: '#1B1E28',
    marginBottom: 24,
    letterSpacing: 0.5,
  },
  section: {
    backgroundColor: '#F7F7F9',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#31373D',
    lineHeight: 17,
  },
  resetText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FF7029',
    lineHeight: 17,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ECEDF0',
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 10,
  },
  dropdownText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#555E67',
    lineHeight: 15,
  },
  dropdownIcon: {
    backgroundColor: '#EFEFEF',
    borderRadius: 7,
    padding: 8,
  },
  cityTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  cityTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ECEDF0',
    paddingRight: 12,
    paddingVertical: 12,
    position: 'relative',
  },
  cityRemoveButton: {
    position: 'absolute',
    left: -2,
    top: -2,
    width: 11,
    height: 11,
    borderRadius: 25,
    backgroundColor: '#E51313',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  cityTagText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#555E67',
    marginLeft: 15,
    lineHeight: 15,
  },
  dateContainer: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 10,
  },
  dateInputContainer: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 12,
    fontWeight: '300',
    color: '#555E67',
    opacity: 0.7,
    marginBottom: 8,
    lineHeight: 16,
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ECEDF0',
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  dateInputText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#555E67',
    lineHeight: 15,
  },
  dateIcon: {
    backgroundColor: '#EFEFEF',
    borderRadius: 7,
    padding: 8,
  },
  timeFiltersContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 0,
  },
  timeFilterButton: {
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ECEDF0',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  timeFilterButtonActive: {
    backgroundColor: '#24BAEC',
    borderColor: '#24BAEC',
  },
  timeFilterText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#555E67',
    textAlign: 'center',
    lineHeight: 15,
  },
  timeFilterTextActive: {
    color: '#FFFFFF',
  },
  sliderContainer: {
    marginVertical: 0,
  },
  sliderRangeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#24BAEC',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 15,
  },
  slider: {
    width: '100%',
    height: 40,
    marginVertical: 5,
  },

  sliderTrack: {
    height: 2,
    backgroundColor: '#8D8D8D',
    borderRadius: 1,
    position: 'relative',
    marginHorizontal: 5,
  },
  sliderRange: {
    height: 2,
    backgroundColor: '#8D8D8D',
    borderRadius: 1,
    position: 'absolute',
    left: 15,
    right: 15,
  },
  sliderThumb: {
    width: 9,
    height: 9,
    backgroundColor: '#EFEFEF',
    borderRadius: 4.5,
    borderWidth: 1,
    borderColor: '#8D8D8D',
    position: 'absolute',
    top: -3.5,
  },
  priceInputsContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  priceInputContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
    fontWeight: '300',
    color: '#555E67',
    opacity: 0.7,
    marginBottom: 8,
    lineHeight: 16,
  },
  priceInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ECEDF0',
    paddingHorizontal: 5,
    paddingVertical: 12,
  },
  priceIcon: {
    backgroundColor: '#EFEFEF',
    borderRadius: 7,
    padding: 8,
    marginRight: 8,
  },
  priceSymbol: {
    fontSize: 12,
    fontWeight: '500',
    color: '#3B3B3B',
    lineHeight: 16,
  },
  priceInputText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
    color: '#555E67',
    paddingHorizontal: 8,
    lineHeight: 15,
  },
  daysInputsContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  daysInputContainer: {
    flex: 1,
  },
  daysLabel: {
    fontSize: 12,
    fontWeight: '300',
    color: '#555E67',
    opacity: 0.7,
    marginBottom: 8,
    lineHeight: 16,
  },
  daysInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ECEDF0',
    paddingHorizontal: 5,
    paddingVertical: 12,
  },
  daysIcon: {
    backgroundColor: '#EFEFEF',
    borderRadius: 7,
    padding: 8,
    marginRight: 8,
  },
  daysInputText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
    color: '#555E67',
    paddingHorizontal: 8,
    lineHeight: 15,
  },
  daysNote: {
    fontSize: 10,
    fontWeight: '200',
    color: '#31373D',
    marginTop: 8,
    lineHeight: 12,
  },
  participantsInputsContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  participantsInputContainer: {
    flex: 1,
  },
  participantsLabel: {
    fontSize: 12,
    fontWeight: '300',
    color: '#555E67',
    opacity: 0.7,
    marginBottom: 8,
    lineHeight: 16,
  },
  participantsInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ECEDF0',
    paddingHorizontal: 5,
    paddingVertical: 12,
  },
  participantsIcon: {
    backgroundColor: '#EFEFEF',
    borderRadius: 7,
    padding: 8,
    marginRight: 8,
  },
  participantsInputText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
    color: '#555E67',
    paddingHorizontal: 8,
    lineHeight: 15,
  },
  seasonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  seasonButton: {
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ECEDF0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minWidth: 81,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seasonButtonActive: {
    backgroundColor: '#DBDBDB',
    borderColor: '#DBDBDB',
  },
  seasonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#555E67',
    textAlign: 'center',
    lineHeight: 15,
  },
  seasonTextActive: {
    color: '#555E67',
  },
  bottomButtons: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 20,
    gap: 14,
},
  filterButton: {
    flex: 1,
    backgroundColor: '#24BAEC',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
  },
  filterButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#FF7029',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  // City Modal Styles
  cityModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  cityModalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    maxHeight: '70%',
  },
  cityModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  cityModalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#31373D',
  },
  cityModalClose: {
    padding: 4,
  },
  cityModalScroll: {
    paddingHorizontal: 20,
  },
  cityModalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F9FA',
  },
  cityModalItemText: {
    fontSize: 16,
    color: '#31373D',
  },
  cityModalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  cityModalConfirmButton: {
    backgroundColor: '#24BAEC',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  cityModalConfirmText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  // Firma filtreleme styles
  tourCountInputsContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  tourCountInputContainer: {
    flex: 1,
  },
  tourCountLabel: {
    fontSize: 12,
    fontWeight: '300',
    color: '#555E67',
    opacity: 0.7,
    marginBottom: 8,
    lineHeight: 16,
  },
  tourCountInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ECEDF0',
    paddingHorizontal: 5,
    paddingVertical: 12,
  },
  tourCountIcon: {
    backgroundColor: '#EFEFEF',
    borderRadius: 7,
    padding: 8,
    marginRight: 8,
  },
  tourCountInputText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
    color: '#555E67',
    paddingHorizontal: 8,
    lineHeight: 15,
  },
  approvedCompaniesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 24,
    paddingVertical: 2,
  },
  checkboxContainer: {
    backgroundColor: '#EFEFEF',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#ECEDF0',
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxContainerActive: {
    backgroundColor: '#24BAEC',
    borderColor: '#24BAEC',
  },
  totalParticipantsInputsContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  totalParticipantsInputContainer: {
    flex: 1,
  },
  totalParticipantsLabel: {
    fontSize: 12,
    fontWeight: '300',
    color: '#555E67',
    opacity: 0.7,
    marginBottom: 8,
    lineHeight: 16,
  },
  totalParticipantsInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ECEDF0',
    paddingHorizontal: 5,
    paddingVertical: 12,
  },
  totalParticipantsIcon: {
    backgroundColor: '#EFEFEF',
    borderRadius: 7,
    padding: 8,
    marginRight: 8,
  },
  totalParticipantsInputText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
    color: '#555E67',
    paddingHorizontal: 8,
    lineHeight: 15,
  },
  satisfactionRatingsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  satisfactionRatingButton: {
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ECEDF0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minWidth: 81,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  satisfactionRatingButtonActive: {
    backgroundColor: '#DBDBDB',
    borderColor: '#DBDBDB',
  },
  satisfactionRatingText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#555E67',
    textAlign: 'center',
    lineHeight: 15,
  },
  satisfactionRatingTextActive: {
    color: '#555E67',
  },
}); 