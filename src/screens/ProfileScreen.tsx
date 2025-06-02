import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ProfileScreenProps {
  onBack: () => void;
  onNavigateToProfileEdit?: () => void;
  onNavigateToSavedTrips?: () => void;
  onNavigateToPastTripsRating?: () => void;
  onNavigateToSecurity?: () => void;
  onNavigateToAbout?: () => void;
  onLogout?: () => void;
}

export default function ProfileScreen({ onBack, onNavigateToProfileEdit, onNavigateToSavedTrips, onNavigateToPastTripsRating, onNavigateToSecurity, onNavigateToAbout, onLogout }: ProfileScreenProps) {
  const handleLogout = () => {
    Alert.alert(
      'Çıkış Yap',
      'Hesabınızdan çıkmak istediğinizden emin misiniz?',
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Çıkış Yap',
          style: 'destructive',
          onPress: () => {
            if (onLogout) {
              onLogout();
            } else {
              Alert.alert('Başarılı', 'Hesabınızdan çıkış yapıldı.');
            }
          },
        },
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
        <Text style={styles.headerTitle}>Profil</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format' }} 
              style={styles.profileAvatar}
            />
          </View>
          
          <Text style={styles.userName}>Tunahan</Text>
          <Text style={styles.userEmail}>tunahankorkmaz@gmail.com</Text>
          
          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Toplam Gezi</Text>
              <Text style={styles.statValue}>360</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Değerlendirme</Text>
              <Text style={styles.statValue}>238</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Puanım</Text>
              <Text style={styles.statValue}>473</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem} onPress={onNavigateToProfileEdit}>
            <View style={styles.menuIconContainer}>
              <Ionicons name="person-outline" size={20} color="#666" />
            </View>
            <Text style={styles.menuText}>Profil</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={onNavigateToSavedTrips}>
            <View style={styles.menuIconContainer}>
              <Ionicons name="bookmark-outline" size={20} color="#666" />
            </View>
            <Text style={styles.menuText}>Kaydedilen Geziler</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={onNavigateToPastTripsRating}>
            <View style={styles.menuIconContainer}>
              <Ionicons name="airplane-outline" size={20} color="#666" />
            </View>
            <Text style={styles.menuText}>Önceki Geziler</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={onNavigateToSecurity}>
            <View style={styles.menuIconContainer}>
              <Ionicons name="shield-outline" size={20} color="#666" />
            </View>
            <Text style={styles.menuText}>Güvenlik</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={onNavigateToAbout}>
            <View style={styles.menuIconContainer}>
              <Ionicons name="information-circle-outline" size={20} color="#666" />
            </View>
            <Text style={styles.menuText}>Sürüm ve Hakkımızda</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Çıkış Yap</Text>
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
    marginBottom: 20,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  userEmail: {
    fontSize: 16,
    color: '#999',
    marginBottom: 32,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 40,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  menuSection: {
    backgroundColor: 'white',
    marginHorizontal: 0,
    borderRadius: 0,
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F0F0F0',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    fontWeight: '500',
  },
  logoutSection: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#FF3B30',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
}); 