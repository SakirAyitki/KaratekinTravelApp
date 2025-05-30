import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import QRScreen from './QRScreen';

interface PaymentScreenProps {
  onBack: () => void;
  onHome?: () => void;
}

export default function PaymentScreen({ onBack, onHome }: PaymentScreenProps) {
  const [showQR, setShowQR] = useState(false);

  if (showQR) {
    return (
      <QRScreen 
        onBack={() => setShowQR(false)} 
        onHome={onHome}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <ImageBackground 
        source={require('../../assets/ob2.png')} 
        style={styles.backgroundImage}
        resizeMode="cover"
        blurRadius={15}
      >
        <KeyboardAvoidingView 
          style={styles.keyboardContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <ImageBackground 
            source={require('../../assets/ob1.png')} 
            style={styles.overlay}
            resizeMode="cover"
            blurRadius={10}
          >
            <View style={styles.overlayTint}>
              {/* Header */}
              <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={onBack}>
                  <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Ödemeyi Tamamla</Text>
                <View style={styles.placeholder} />
              </View>

              {/* Content Card */}
              <View style={styles.contentCard}>
                <ScrollView 
                  style={styles.scrollView} 
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.scrollContent}
                  keyboardShouldPersistTaps="handled"
                >
                  <View style={styles.cardHandle} />
                  
                  <Text style={styles.title}>Bilet Detayları</Text>

                  {/* Bilet 2 */}
                  <View style={styles.ticketSection}>
                    <View style={[styles.ticketBadge, styles.ticketBadge2]}>
                      <Text style={styles.ticketBadgeText}>Bilet: 2</Text>
                    </View>

                    <View style={styles.formSection}>
                      <Text style={styles.fieldLabel}>İsim Soyisim</Text>
                      <TextInput
                        style={styles.textInput}
                        placeholder="İsim Soyisim Giriniz"
                        placeholderTextColor="#999"
                      />
                    </View>

                    <View style={styles.formSection}>
                      <Text style={styles.fieldLabel}>Telefon Numarası</Text>
                      <TextInput
                        style={styles.textInput}
                        placeholder="+90"
                        placeholderTextColor="#999"
                        keyboardType="phone-pad"
                      />
                    </View>

                    <View style={styles.formSection}>
                      <Text style={styles.fieldLabel}>TC Kimlik No</Text>
                      <TextInput
                        style={styles.textInput}
                        placeholder="TC Kimlik No Giriniz"
                        placeholderTextColor="#999"
                        keyboardType="numeric"
                      />
                    </View>
                  </View>

                  {/* Bilet 3 */}
                  <View style={styles.ticketSection}>
                    <View style={[styles.ticketBadge, styles.ticketBadge3]}>
                      <Text style={styles.ticketBadgeText}>Bilet: 3</Text>
                    </View>

                    <View style={styles.formSection}>
                      <Text style={styles.fieldLabel}>İsim Soyisim</Text>
                      <TextInput
                        style={[styles.textInput, styles.placeholderInput]}
                        placeholder="İsim Soyisim Giriniz"
                        placeholderTextColor="#999"
                      />
                    </View>

                    <View style={styles.formSection}>
                      <Text style={styles.fieldLabel}>Telefon Numarası</Text>
                      <TextInput
                        style={[styles.textInput, styles.placeholderInput]}
                        placeholder="+90"
                        placeholderTextColor="#999"
                        keyboardType="phone-pad"
                      />
                    </View>

                    <View style={styles.formSection}>
                      <Text style={styles.fieldLabel}>TC Kimlik No</Text>
                      <TextInput
                        style={[styles.textInput, styles.placeholderInput]}
                        placeholder="TC Kimlik No Giriniz"
                        placeholderTextColor="#999"
                        keyboardType="numeric"
                      />
                    </View>
                  </View>

                  {/* Ödeme Bilgileri */}
                  <Text style={styles.sectionTitle}>Ödeme Bilgileri</Text>

                  {/* Credit Card */}
                  <View style={styles.creditCardContainer}>
                    <View style={styles.creditCard}>
                      <View style={styles.cardHeader}>
                        <Text style={styles.cardName}>KART SAHİBİ ADI</Text>
                        <View style={styles.masterCardLogo}>
                          <View style={styles.circle1} />
                          <View style={styles.circle2} />
                        </View>
                      </View>
                      <Text style={styles.cardNumber}>**** **** **** ****</Text>
                      <View style={styles.cardFooter}>
                        <View>
                          <Text style={styles.cardLabel}>SKT</Text>
                          <Text style={styles.cardValue}>**/**</Text>
                        </View>
                        <View>
                          <Text style={styles.cardLabel}>CVC</Text>
                          <Text style={styles.cardValue}>***</Text>
                        </View>
                        <Text style={styles.masterCardText}>Master Card</Text>
                      </View>
                    </View>
                  </View>

                  {/* Payment Form */}
                  <View style={styles.paymentForm}>
                    <View style={styles.formSection}>
                      <Text style={styles.fieldLabel}>İsim Soyisim</Text>
                      <TextInput
                        style={styles.textInput}
                        placeholder="Kart üzerindeki isim"
                        placeholderTextColor="#999"
                      />
                    </View>

                    <View style={styles.formSection}>
                      <Text style={styles.fieldLabel}>Kart Numarası</Text>
                      <TextInput
                        style={styles.textInput}
                        placeholder="0000 0000 0000 0000"
                        placeholderTextColor="#999"
                        keyboardType="numeric"
                      />
                    </View>

                    <View style={styles.formRow}>
                      <View style={[styles.formSection, styles.halfWidth]}>
                        <Text style={styles.fieldLabel}>SKT</Text>
                        <TextInput
                          style={styles.textInput}
                          placeholder="AA/YY"
                          placeholderTextColor="#999"
                          keyboardType="numeric"
                        />
                      </View>
                      
                      <View style={[styles.formSection, styles.halfWidth]}>
                        <Text style={styles.fieldLabel}>CVC</Text>
                        <TextInput
                          style={styles.textInput}
                          placeholder="000"
                          placeholderTextColor="#999"
                          keyboardType="numeric"
                        />
                      </View>
                    </View>
                  </View>

                  {/* Payment Button */}
                  <TouchableOpacity 
                    style={styles.paymentButton}
                    onPress={() => setShowQR(true)}
                  >
                    <Text style={styles.paymentButtonText}>Ödemeyi Tamamla</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          </ImageBackground>
        </KeyboardAvoidingView>
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
  },
  keyboardContainer: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
  overlayTint: {
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
    marginTop: 5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 100,
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
    marginBottom: 24,
  },
  ticketSection: {
    marginBottom: 30,
  },
  ticketBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
  },
  ticketBadge2: {
    backgroundColor: '#00BCD4',
  },
  ticketBadge3: {
    backgroundColor: '#E91E63',
  },
  ticketBadgeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  formSection: {
    marginBottom: 20,
  },
  formRow: {
    flexDirection: 'row',
    gap: 16,
  },
  halfWidth: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#333',
  },
  placeholderInput: {
    color: '#999',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
    marginTop: 10,
  },
  creditCardContainer: {
    marginBottom: 30,
  },
  creditCard: {
    backgroundColor: '#2C5530',
    borderRadius: 16,
    padding: 24,
    height: 200,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  masterCardLogo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle1: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF5F00',
  },
  circle2: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EB001B',
    marginLeft: -8,
  },
  cardNumber: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 30,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardLabel: {
    color: '#CCCCCC',
    fontSize: 10,
    marginBottom: 4,
  },
  cardValue: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  masterCardText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  paymentForm: {
    marginBottom: 40,
  },
  paymentButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 25,
    paddingVertical: 18,
    alignItems: 'center',
  },
  paymentButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
}); 