import React, { useState, useCallback, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreenComponent from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import EmailVerificationScreen from './src/screens/EmailVerificationScreen';
import ForgotPasswordSuccessScreen from './src/screens/ForgotPasswordSuccessScreen';
import { AuthProvider, useAuth } from './src/context/AuthContext';

type AppState = 'loading' | 'splash' | 'onboarding' | 'login' | 'register' | 'forgotPassword' | 'forgotPasswordSuccess' | 'emailVerification' | 'main';

const ONBOARDING_COMPLETED_KEY = '@onboarding_completed';

function AppContent() {
  const [appState, setAppState] = useState<AppState>('loading');
  const [tempEmail, setTempEmail] = useState('');
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  useEffect(() => {
    if (!authLoading && user) {
      setAppState('main');
    }
  }, [user, authLoading]);

  const checkOnboardingStatus = async () => {
    try {
      const hasCompletedOnboarding = await AsyncStorage.getItem(ONBOARDING_COMPLETED_KEY);
      if (hasCompletedOnboarding) {
        setAppState('splash');
        setTimeout(() => {
          setAppState('login');
        }, 3000);
      } else {
        setAppState('splash');
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      setAppState('splash');
    }
  };

  const handleSplashFinish = useCallback(async () => {
    const hasCompletedOnboarding = await AsyncStorage.getItem(ONBOARDING_COMPLETED_KEY);
    if (hasCompletedOnboarding) {
      setAppState('login');
    } else {
      setAppState('onboarding');
    }
  }, []);

  const handleOnboardingComplete = useCallback(async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
      setAppState('login');
    } catch (error) {
      console.error('Error saving onboarding status:', error);
      setAppState('login');
    }
  }, []);

  // Auth Navigation Handlers
  const handleLogin = useCallback(() => {
    setAppState('main');
  }, []);

  const handleNavigateToRegister = useCallback(() => {
    setAppState('register');
  }, []);

  const handleNavigateToLogin = useCallback(() => {
    setAppState('login');
  }, []);

  const handleNavigateToForgotPassword = useCallback(() => {
    setAppState('forgotPassword');
  }, []);

  const handleForgotPasswordSuccess = useCallback(() => {
    setAppState('forgotPasswordSuccess');
  }, []);

  const handleRegisterSuccess = useCallback(() => {
    setAppState('emailVerification');
  }, []);

  const handleEmailVerificationSuccess = useCallback(() => {
    setAppState('login');
  }, []);

  const handleBack = useCallback(() => {
    setAppState('login');
  }, []);

  if (appState === 'loading') {
    return <View style={styles.loadingContainer} />;
  }

  if (appState === 'splash') {
    return <SplashScreenComponent onAnimationFinish={handleSplashFinish} />;
  }

  if (appState === 'onboarding') {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  if (appState === 'login') {
    return (
      <LoginScreen 
        onLogin={handleLogin}
        onNavigateToRegister={handleNavigateToRegister}
        onNavigateToForgotPassword={handleNavigateToForgotPassword}
      />
    );
  }

  if (appState === 'register') {
    return (
      <RegisterScreen 
        onRegister={handleRegisterSuccess}
        onNavigateToLogin={handleNavigateToLogin}
        onBack={handleBack}
      />
    );
  }

  if (appState === 'forgotPassword') {
    return (
      <ForgotPasswordScreen 
        onBack={handleBack}
        onSuccess={handleForgotPasswordSuccess}
      />
    );
  }

  if (appState === 'forgotPasswordSuccess') {
    return <ForgotPasswordSuccessScreen email={tempEmail} />;
  }

  if (appState === 'emailVerification') {
    return (
      <EmailVerificationScreen 
        onBack={handleNavigateToLogin}
        onVerify={handleEmailVerificationSuccess}
        email={tempEmail}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Karatekin Travel</Text>
      <Text style={styles.subtitle}>Hoş geldiniz! Ana sayfa yakında gelecek...</Text>
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#24BAEC',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0288D1',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
