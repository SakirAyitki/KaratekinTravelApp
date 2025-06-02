import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreenComponent from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import EmailVerificationScreen from './src/screens/EmailVerificationScreen';
import HomeScreen from './src/screens/HomeScreen';

type AppState = 'loading' | 'splash' | 'onboarding' | 'login' | 'register' | 'forgotPassword' | 'emailVerification' | 'home';

const ONBOARDING_COMPLETED_KEY = '@karatekin_travel:onboarding_completed';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppState>('loading');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const onboardingCompleted = await AsyncStorage.getItem(ONBOARDING_COMPLETED_KEY);
      const isCompleted = onboardingCompleted === 'true';
      
      // Splash screen'i her zaman göster
      setCurrentScreen('splash');
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      setCurrentScreen('splash');
    }
  };

  const handleSplashFinish = useCallback(async () => {
    try {
      const onboardingCompleted = await AsyncStorage.getItem(ONBOARDING_COMPLETED_KEY);
      const isCompleted = onboardingCompleted === 'true';
      
      if (isCompleted) {
        setCurrentScreen('home');
      } else {
        setCurrentScreen('onboarding');
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      setCurrentScreen('onboarding');
    }
  }, []);

  const handleOnboardingComplete = useCallback(async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
      setCurrentScreen('login');
    } catch (error) {
      console.error('Error saving onboarding status:', error);
      setCurrentScreen('login');
    }
  }, []);

  const handleLogout = useCallback(() => {
    setCurrentScreen('login');
  }, []);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return (
          <LoginScreen
            onLogin={() => setCurrentScreen('home')}
            onNavigateToRegister={() => setCurrentScreen('register')}
            onNavigateToForgotPassword={() => setCurrentScreen('forgotPassword')}
          />
        );
      case 'register':
        return (
          <RegisterScreen
            onRegister={() => {
              setCurrentScreen('emailVerification');
            }}
            onNavigateToLogin={() => setCurrentScreen('login')}
            onBack={() => setCurrentScreen('login')}
          />
        );
      case 'forgotPassword':
        return (
          <ForgotPasswordScreen
            onResetPassword={() => {
              setCurrentScreen('emailVerification');
            }}
            onBack={() => setCurrentScreen('login')}
          />
        );
      case 'emailVerification':
        return (
          <EmailVerificationScreen
            onVerify={() => setCurrentScreen('home')}
            onBack={() => setCurrentScreen('login')}
            email={userEmail}
          />
        );
      case 'home':
        return <HomeScreen onLogout={handleLogout} />;
      case 'loading':
        return <View style={styles.loadingContainer} />;
      case 'splash':
        return <SplashScreenComponent onAnimationFinish={handleSplashFinish} />;
      case 'onboarding':
        return <OnboardingScreen onComplete={handleOnboardingComplete} />;
      default:
        return <HomeScreen onLogout={handleLogout} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#24BAEC',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
