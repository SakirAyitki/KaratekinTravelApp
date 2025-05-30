import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ForgotPasswordSuccessScreenProps {
  email: string;
}

const { width } = Dimensions.get('window');

export default function ForgotPasswordSuccessScreen({ 
  email 
}: ForgotPasswordSuccessScreenProps) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Forgot password</Text>
        <Text style={styles.subtitle}>
          Enter your email account to reset your password
        </Text>
      </View>

      {/* Email Display */}
      <View style={styles.emailContainer}>
        <Text style={styles.emailText}>{email}</Text>
      </View>

      {/* Success Message */}
      <View style={styles.successContainer}>
        <View style={styles.iconContainer}>
          <Icon name="mail-outline" size={60} color="#FF6B35" />
        </View>
        <Text style={styles.successTitle}>Mail Adresini Kontrol Et!</Text>
        <Text style={styles.successMessage}>
          Şifre sıfırlama linkini e-postanıza gönderdik!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingHorizontal: 32,
  },
  header: {
    paddingTop: 100,
    marginBottom: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    lineHeight: 24,
  },
  emailContainer: {
    marginBottom: 80,
  },
  emailText: {
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: '500',
  },
  successContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF3F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 24,
  },
}); 