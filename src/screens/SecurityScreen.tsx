import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SecurityScreenProps {
  onBack: () => void;
}

export default function SecurityScreen({ onBack }: SecurityScreenProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSaveChanges = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Uyarı', 'Lütfen tüm alanları doldurun.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Uyarı', 'Yeni şifreler eşleşmiyor.');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Uyarı', 'Yeni şifre en az 6 karakter olmalıdır.');
      return;
    }

    Alert.alert(
      'Başarılı',
      'Şifreniz başarıyla güncellendi.',
      [{ text: 'Tamam', onPress: onBack }]
    );
  };

  const handleForgotPassword = () => {
    Alert.alert('Bilgi', 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Güvenlik</Text>
        <View style={styles.headerRight} />
      </View>

      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face&auto=format' }} 
                style={styles.avatar}
              />
            </View>
            <Text style={styles.userName}>Şakir Ayıtkı</Text>
          </View>

          {/* Password Fields */}
          <View style={styles.passwordSection}>
            {/* Current Password */}
            <Text style={styles.fieldLabel}>Mevcut Şifre</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="**********"
                placeholderTextColor="#999"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry={!showCurrentPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                <Ionicons
                  name={showCurrentPassword ? "eye" : "eye-off"}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>

            {/* New Password */}
            <Text style={styles.fieldLabel}>Yeni Şifre</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="**********"
                placeholderTextColor="#999"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showNewPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowNewPassword(!showNewPassword)}
              >
                <Ionicons
                  name={showNewPassword ? "eye" : "eye-off"}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>

            {/* Confirm New Password */}
            <Text style={styles.fieldLabel}>Yeni Şifre Tekrar</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="**********"
                placeholderTextColor="#999"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye" : "eye-off"}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Şifremi Unuttum</Text>
          </TouchableOpacity>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
            <Text style={styles.saveButtonText}>Değişiklikleri Kaydet</Text>
          </TouchableOpacity>

          {/* Extra space for keyboard */}
          <View style={styles.bottomSpace} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
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
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    paddingTop: 20,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFE4E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  passwordSection: {
    paddingHorizontal: 24,
    marginTop: 20,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 12,
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  passwordInput: {
    flex: 1,
    height: 54,
    fontSize: 16,
    color: '#333',
  },
  eyeButton: {
    padding: 8,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: 20,
    paddingHorizontal: 24,
  },
  forgotPasswordText: {
    fontSize: 16,
    color: '#FF6B35',
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: '#FF6B35',
    marginHorizontal: 24,
    borderRadius: 25,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#FF6B35',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  bottomSpace: {
    height: 100,
  },
}); 