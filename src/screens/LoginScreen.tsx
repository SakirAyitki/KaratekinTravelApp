import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface LoginScreenProps {
  onLogin: () => void;
  onNavigateToRegister: () => void;
  onNavigateToForgotPassword: () => void;
}

export default function LoginScreen({ onLogin, onNavigateToRegister, onNavigateToForgotPassword }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = () => {
    onLogin();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      <KeyboardAvoidingView 
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView 
          style={styles.flex}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          bounces={false}
        >
          <View style={styles.content}>
            <View style={styles.headerContainer}>
              <Text style={styles.title}>
                Şimdi <Text style={styles.highlightText}>Giriş Yap!</Text>
              </Text>
              <Text style={styles.subtitle}>
                Devam edebilmek için lütfen giriş yap...
              </Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Mail Adresinizi Giriniz...</Text>
                <TextInput
                  style={styles.textInput}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="**********"
                    placeholderTextColor="#999"
                    secureTextEntry={!isPasswordVisible}
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    <Ionicons
                      name={isPasswordVisible ? 'eye-off' : 'eye'}
                      size={20}
                      color="#999"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity onPress={onNavigateToForgotPassword}>
                <Text style={styles.forgotPassword}>Şifremi Unuttum</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Giriş Yap</Text>
              </TouchableOpacity>

              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Henüz bir hesabın yok mu? </Text>
                <TouchableOpacity onPress={onNavigateToRegister}>
                  <Text style={styles.signupLink}>Kayıt Ol</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.socialContainer}>
              <Text style={styles.socialText}>Uygulamızı Öner!</Text>
              <View style={styles.socialButtons}>
                <TouchableOpacity style={[styles.socialButton, styles.facebook]}>
                  <Ionicons name="logo-facebook" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.socialButton, styles.instagram]}>
                  <Ionicons name="logo-instagram" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.socialButton, styles.twitter]}>
                  <Ionicons name="logo-twitter" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
  },
  headerContainer: {
    marginBottom: 80,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  highlightText: {
    color: '#FF6B35',
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 60,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
  },
  eyeButton: {
    paddingHorizontal: 16,
  },
  forgotPassword: {
    color: '#FF6B35',
    fontSize: 14,
    textAlign: 'right',
    marginTop: 8,
    marginBottom: 40,
  },
  loginButton: {
    backgroundColor: '#24BAEC',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    color: '#999',
    fontSize: 14,
  },
  signupLink: {
    color: '#FF6B35',
    fontSize: 14,
    fontWeight: '600',
  },
  socialContainer: {
    alignItems: 'center',
  },
  socialText: {
    color: '#FF6B35',
    fontSize: 14,
    marginBottom: 16,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  socialButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  facebook: {
    backgroundColor: '#1877F2',
  },
  instagram: {
    backgroundColor: '#E4405F',
  },
  twitter: {
    backgroundColor: '#1DA1F2',
  },
}); 