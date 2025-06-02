import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface NotificationsScreenProps {
  onBack: () => void;
}

interface NotificationItem {
  id: number;
  title: string;
  message: string;
  time: string;
  avatarColor: string;
  avatarEmoji: string;
}

export default function NotificationsScreen({ onBack }: NotificationsScreenProps) {
  const [activeTab, setActiveTab] = useState<'recent' | 'archive'>('recent');
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 1,
      title: 'Super Offer',
      message: 'Get 60% off in our first booking',
      time: 'Mon,11:50pm',
      avatarColor: '#FF6B35',
      avatarEmoji: '😊',
    },
    {
      id: 2,
      title: 'Super Offer',
      message: 'Get 60% off in our first booking',
      time: 'Mon,11:50pm',
      avatarColor: '#87CEEB',
      avatarEmoji: '👩‍💼',
    },
    {
      id: 3,
      title: 'Super Offer',
      message: 'Get 60% off in our first booking',
      time: 'Tue,10:56pm',
      avatarColor: '#90EE90',
      avatarEmoji: '🤓',
    },
    {
      id: 4,
      title: 'Super Offer',
      message: 'Get 60% off in our first booking',
      time: 'Wed,12:40pm',
      avatarColor: '#D3D3D3',
      avatarEmoji: '👩',
    },
    {
      id: 5,
      title: 'Super Offer',
      message: 'Get 60% off in our first booking',
      time: 'Fri,11:50pm',
      avatarColor: '#FFB6C1',
      avatarEmoji: '👩‍🎓',
    },
    {
      id: 6,
      title: 'Super Offer',
      message: 'Get 60% off in our first booking',
      time: 'Sat,10:56pm',
      avatarColor: '#C0C0C0',
      avatarEmoji: '👨‍💼',
    },
  ]);

  const renderNotification = (item: NotificationItem) => (
    <View key={item.id} style={styles.notificationItem}>
      <View style={[styles.avatar, { backgroundColor: item.avatarColor }]}>
        <Text style={styles.avatarEmoji}>{item.avatarEmoji}</Text>
      </View>
      
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
      </View>
      
      <Text style={styles.notificationTime}>{item.time}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bildirimler</Text>
        <TouchableOpacity>
          <Text style={styles.deleteAllButton}>Tümünü Sil</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'recent' && styles.activeTab]}
          onPress={() => setActiveTab('recent')}
        >
          <Text style={[styles.tabText, activeTab === 'recent' && styles.activeTabText]}>
            En Son
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'archive' && styles.activeTab]}
          onPress={() => setActiveTab('archive')}
        >
          <Text style={[styles.tabText, activeTab === 'archive' && styles.activeTabText]}>
            Arşiv
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Today Label */}
        <View style={styles.todayContainer}>
          <Text style={styles.todayText}>Bugün</Text>
        </View>

        {/* Notifications List */}
        <View style={styles.notificationsList}>
          {notifications.map(renderNotification)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 16,
    backgroundColor: '#FFF',
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
  deleteAllButton: {
    fontSize: 16,
    color: '#FF6B35',
    fontWeight: '500',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF6B35',
  },
  tabText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FF6B35',
  },
  scrollView: {
    flex: 1,
  },
  todayContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  todayText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '500',
  },
  notificationsList: {
    backgroundColor: 'white',
    marginHorizontal: 0,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F0F0F0',
    backgroundColor: 'white',
    minHeight: 80,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarEmoji: {
    fontSize: 24,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#999',
    lineHeight: 20,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
    marginLeft: 12,
  },
}); 