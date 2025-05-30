// Splash Screen Props
export interface SplashScreenProps {
  onAnimationFinish: () => void;
}

// Onboarding Screen Props
export interface OnboardingScreenProps {
  onComplete: () => void;
}

// Auth Screen Props
export interface LoginScreenProps {
  onLogin: () => void;
  onNavigateToRegister: () => void;
  onNavigateToForgotPassword: () => void;
}

export interface RegisterScreenProps {
  onRegister: () => void;
  onNavigateToLogin: () => void;
  onBack: () => void;
}

export interface ForgotPasswordScreenProps {
  onBack: () => void;
  onSuccess: () => void;
}

export interface EmailVerificationScreenProps {
  onBack: () => void;
  onVerify: () => void;
  email: string;
}

export interface ForgotPasswordSuccessScreenProps {
  email: string;
}

// Onboarding Data Type
export interface OnboardingData {
  id: number;
  image: any;
  title: string;
  highlightText: string;
  description: string;
  backgroundColor: string[];
}

// Firebase User Profile
export interface UserProfile {
  name: string;
  email: string;
  isActive: boolean;
  userType: 'customer' | 'company';
  createdAt?: any;
  updatedAt?: any;
}

// App State Types
export interface AppState {
  isLoading: boolean;
  isSplashVisible: boolean;
}

// Navigation Types
export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Login: undefined;
  Register: undefined;
  TourList: undefined;
  TourDetail: { tourId: string };
  Profile: undefined;
};

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

// Tour Types
export interface Tour {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  location: string;
  images: string[];
  companyId: string;
  companyName: string;
  startDate: string;
  endDate: string;
  capacity: number;
  bookedSeats: number;
} 