import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ProfileEditScreenProps {
  onBack: () => void;
}

export default function ProfileEditScreen({ onBack }: ProfileEditScreenProps) {
  const [formData, setFormData] = useState({
    firstName: 'Tunahan',
    lastName: 'Korkmaz',
    location: 'Çankırı, Türkiye',
    phoneNumber: '(543) 914 6761',
    email: 'tunahankorkmaz@gmail.com',
  });

  const handleSave = () => {
    Alert.alert(
      'Profil Güncellendi',
      'Bilgileriniz başarıyla güncellendi.',
      [{ text: 'Tamam', onPress: onBack }]
    );
  };

  const handleChangePhoto = () => {
    Alert.alert(
      'Profil Fotoğrafı',
      'Profil fotoğrafınızı değiştirmek istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        { text: 'Galeri', onPress: () => console.log('Galeri seçildi') },
        { text: 'Kamera', onPress: () => console.log('Kamera seçildi') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profil Güncelle</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <TouchableOpacity style={styles.avatarContainer} onPress={handleChangePhoto}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format' }} 
              style={styles.profileAvatar}
            />
            <View style={styles.changePhotoButton}>
              <Ionicons name="camera" size={16} color="white" />
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.changePhotoTextButton} onPress={handleChangePhoto}>
            <Text style={styles.changePhotoText}>Profil Fotoğrafını Değiştir</Text>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View style={styles.formSection}>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>İsim</Text>
            <TextInput
              style={styles.formInput}
              value={formData.firstName}
              onChangeText={(text) => setFormData(prev => ({ ...prev, firstName: text }))}
              placeholder="İsminizi girin"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Soyisim</Text>
            <TextInput
              style={styles.formInput}
              value={formData.lastName}
              onChangeText={(text) => setFormData(prev => ({ ...prev, lastName: text }))}
              placeholder="Soyisminizi girin"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Konum</Text>
            <TouchableOpacity style={styles.formInput}>
              <Text style={styles.formInputText}>{formData.location}</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Telefon Numarası</Text>
            <View style={styles.phoneInputContainer}>
              <Text style={styles.countryCode}>+90</Text>
              <TextInput
                style={styles.phoneInput}
                value={formData.phoneNumber}
                onChangeText={(text) => setFormData(prev => ({ ...prev, phoneNumber: text }))}
                placeholder="Telefon numaranızı girin"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Mail Adresi</Text>
            <TextInput
              style={styles.formInput}
              value={formData.email}
              onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
              placeholder="E-mail adresinizi girin"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Save Button */}
        <View style={styles.saveSection}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveText}>Değişiklikleri Kaydet</Text>
          </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#F8F9FA',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: '#F8F9FA',
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFE4E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  changePhotoButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  changePhotoTextButton: {
    marginBottom: 16,
  },
  changePhotoText: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '500',
  },
  formSection: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  formGroup: {
    marginBottom: 24,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#F8F9FA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  formInputText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 16,
  },
  countryCode: {
    fontSize: 16,
    color: '#333',
    marginRight: 8,
    fontWeight: '500',
  },
  phoneInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#333',
  },
  saveSection: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  saveButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#FF6B35',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  saveText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
}); 