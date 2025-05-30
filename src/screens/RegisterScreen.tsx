import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { signUpWithEmail, createUserProfile } from '../config/firebase';

interface RegisterScreenProps {
  onRegister: () => void;
  onNavigateToLogin: () => void;
  onBack: () => void;
}

const { width } = Dimensions.get('window');

export default function RegisterScreen({ 
  onRegister, 
  onNavigateToLogin, 
  onBack 
}: RegisterScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Hata', 'Şifre en az 8 karakter olmalı!');
      return;
    }

    setLoading(true);
    
    // Firebase Auth ile kullanıcı oluştur
    const authResult = await signUpWithEmail(email.trim(), password);
    
    if (authResult.success && authResult.user) {
      // Firestore'a kullanıcı profili ekle
      const profileResult = await createUserProfile(authResult.user.uid, {
        name: name.trim(),
        email: email.trim(),
        isActive: true,
        userType: 'customer', // customer or company
      });

      setLoading(false);

      if (profileResult.success) {
        Alert.alert(
          'Başarılı!', 
          'Hesabınız başarıyla oluşturuldu. Şimdi giriş yapabilirsiniz.',
          [{ text: 'Tamam', onPress: onRegister }]
        );
      } else {
        Alert.alert('Hata', 'Profil oluşturulamadı');
      }
    } else {
      setLoading(false);
      Alert.alert('Kayıt Hatası', authResult.error || 'Kayıt olunamadı');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Icon name="chevron-back" size={24} color="#2C3E50" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Hemen <Text style={styles.highlightText}>Kayıt Ol!</Text>
        </Text>
        <Text style={styles.subtitle}>
          Lütfen alanları doldur ve kaydını tamamla...
        </Text>
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        {/* Name Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Ad-Soyad</Text>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder=""
            autoCapitalize="words"
          />
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Mail</Text>
          <TextInput
            style={styles.textInput}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder=""
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholder="**********"
          />
          <TouchableOpacity 
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Icon 
              name={showPassword ? "eye-off" : "eye"} 
              size={20} 
              color="#7F8C8D" 
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.passwordHint}>Şifre en az 8 karakter olmalı!</Text>

        {/* Register Button */}
        <TouchableOpacity 
          style={styles.registerButton} 
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.registerButtonText}>Kaydı Tamamla</Text>
          )}
        </TouchableOpacity>

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Mevcut bir hesabın var mı? </Text>
          <TouchableOpacity onPress={onNavigateToLogin}>
            <Text style={styles.loginLink}>Giriş Yap</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
    paddingTop: 60,
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    paddingHorizontal: 32,
    marginBottom: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12,
  },
  highlightText: {
    color: '#FF6B35',
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    lineHeight: 24,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 32,
  },
  inputContainer: {
    marginBottom: 20,
    position: 'relative',
  },
  inputLabel: {
    fontSize: 16,
    color: '#2C3E50',
    marginBottom: 8,
    fontWeight: '500',
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E7FF',
    paddingVertical: 12,
    paddingRight: 50,
    fontSize: 16,
    color: '#2C3E50',
  },
  eyeButton: {
    position: 'absolute',
    right: 0,
    bottom: 12,
    padding: 8,
  },
  passwordHint: {
    color: '#7F8C8D',
    fontSize: 12,
    marginBottom: 40,
    marginTop: -10,
  },
  registerButton: {
    backgroundColor: '#24BAEC',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#24BAEC',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  loginText: {
    color: '#7F8C8D',
    fontSize: 14,
  },
  loginLink: {
    color: '#FF6B35',
    fontSize: 14,
    fontWeight: '600',
  },
}); 