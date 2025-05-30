import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ForgotPasswordSuccessScreenProps {
  email: string;
  onNavigateToVerification: () => void;
}

export default function ForgotPasswordSuccessScreen({ email, onNavigateToVerification }: ForgotPasswordSuccessScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNavigateToVerification();
    }, 2000); // 2 saniye sonra

    return () => clearTimeout(timer);
  }, [onNavigateToVerification]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      <View style={styles.content}>
        <Text style={styles.email}>{email || 'www.uihut@gmail.com'}</Text>
        
        <View style={styles.messageContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name="mail" size={40} color="#FF6B35" />
          </View>
          
          <Text style={styles.title}>Mail Adresini Kontrol Et!</Text>
          <Text style={styles.subtitle}>
            Şifre sıfırlama linkini{'\n'}e-postanıza gönderdik!
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 120,
    alignItems: 'center',
  },
  email: {
    fontSize: 16,
    color: '#333',
    alignSelf: 'flex-start',
    marginBottom: 120,
  },
  messageContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 32,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF5F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 24,
  },
}); 