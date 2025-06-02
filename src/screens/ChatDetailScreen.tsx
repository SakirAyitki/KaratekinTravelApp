import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Message {
  id: string;
  text: string;
  time: string;
  isOwn: boolean;
  avatar?: string;
  isDelivered?: boolean;
  isRead?: boolean;
}

interface ChatDetailScreenProps {
  onBack: () => void;
  chatData: {
    groupName: string;
    isActive: boolean;
    memberCount: number;
  };
}

export default function ChatDetailScreen({ onBack, chatData }: ChatDetailScreenProps) {
  const messages: Message[] = [
    {
      id: '1',
      text: 'Hello!',
      time: '9:34',
      isOwn: true,
      isDelivered: true,
      isRead: true,
    },
    {
      id: '2',
      text: "I'm very qlab you like it👍",
      time: '9:35',
      isOwn: false,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face&auto=format',
      isDelivered: true,
      isRead: true,
    },
    {
      id: '3',
      text: 'We are arriving today at 01:45, will someone be at home?',
      time: '9:37',
      isOwn: false,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face&auto=format',
      isDelivered: true,
      isRead: true,
    },
    {
      id: '4',
      text: 'We are arriving today at 01:45, will someone be at home?',
      time: '9:37',
      isOwn: false,
      avatar: 'https://images.unsplash.com/photo-1522075469751-3847ae864c11?w=100&h=100&fit=crop&crop=face&auto=format',
      isDelivered: true,
      isRead: false,
    },
    {
      id: '5',
      text: 'We are arriving today at 01:45, will someone be at home?',
      time: '9:37',
      isOwn: false,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face&auto=format',
      isDelivered: true,
      isRead: true,
    },
  ];

  const memberAvatars = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face&auto=format',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face&auto=format',
    'https://images.unsplash.com/photo-1522075469751-3847ae864c11?w=100&h=100&fit=crop&crop=face&auto=format',
  ];

  const renderMessage = (message: Message, index: number) => {
    if (message.isOwn) {
      return (
        <View key={message.id} style={styles.ownMessageContainer}>
          <View style={styles.ownMessage}>
            <Text style={styles.ownMessageText}>{message.text}</Text>
          </View>
          <View style={styles.ownMessageInfo}>
            <Text style={styles.messageTime}>{message.time}</Text>
            <View style={styles.messageStatus}>
              {message.isRead ? (
                <Ionicons name="checkmark-done" size={16} color="#4CAF50" />
              ) : message.isDelivered ? (
                <Ionicons name="checkmark-done" size={16} color="#999" />
              ) : (
                <Ionicons name="checkmark" size={16} color="#999" />
              )}
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View key={message.id} style={styles.otherMessageContainer}>
          <Image source={{ uri: message.avatar }} style={styles.messageAvatar} />
          <View style={styles.otherMessageContent}>
            <View style={styles.otherMessage}>
              <Text style={styles.otherMessageText}>{message.text}</Text>
            </View>
            <View style={styles.otherMessageInfo}>
              <Text style={styles.messageTime}>{message.time}</Text>
              <View style={styles.messageStatus}>
                {message.isRead ? (
                  <Ionicons name="checkmark-done" size={16} color="#4CAF50" />
                ) : message.isDelivered ? (
                  <Ionicons name="checkmark-done" size={16} color="#999" />
                ) : (
                  <Ionicons name="checkmark" size={16} color="#999" />
                )}
              </View>
            </View>
          </View>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{chatData.groupName}</Text>
          <Text style={[styles.headerStatus, { color: chatData.isActive ? '#4CAF50' : '#FF6B6B' }]}>
            {chatData.isActive ? 'Grup Aktif' : 'Grup Pasif'}
          </Text>
        </View>
        
        <View style={styles.headerRight}>
          <View style={styles.membersContainer}>
            {memberAvatars.slice(0, 2).map((avatar, index) => (
              <Image
                key={index}
                source={{ uri: avatar }}
                style={[
                  styles.memberAvatar,
                  index > 0 && styles.memberAvatarOverlap
                ]}
              />
            ))}
            <View style={[styles.memberCountBadge, styles.memberAvatarOverlap]}>
              <Text style={styles.memberCountText}>+{chatData.memberCount}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Messages */}
      <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
        {/* Date Separator */}
        <View style={styles.dateSeparator}>
          <Text style={styles.dateText}>Bugün</Text>
        </View>

        {/* Messages List */}
        <View style={styles.messagesList}>
          {messages.map((message, index) => renderMessage(message, index))}
        </View>
      </ScrollView>

      {/* Bottom Warning */}
      <View style={styles.bottomWarning}>
        <Text style={styles.warningText}>Gruba sadece yöneticiler yazabilir!</Text>
      </View>
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
    paddingVertical: 12,
    backgroundColor: '#F8F9FA',
    marginTop: 40,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EDEDED',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 2,
  },
  headerStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
  headerRight: {
    alignItems: 'center',
  },
  membersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'white',
  },
  memberAvatarOverlap: {
    marginLeft: -6,
  },
  memberCountBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#24BAEC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'white',
  },
  memberCountText: {
    fontSize: 10,
    fontWeight: '700',
    color: 'white',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  dateSeparator: {
    alignItems: 'center',
    marginVertical: 24,
  },
  dateText: {
    fontSize: 14,
    color: '#999',
    backgroundColor: '#EDEDED',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  messagesList: {
    paddingBottom: 20,
  },
  ownMessageContainer: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  ownMessage: {
    backgroundColor: '#24BAEC',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderBottomRightRadius: 6,
    maxWidth: '80%',
  },
  ownMessageText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '400',
  },
  ownMessageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginRight: 8,
  },
  otherMessageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  messageAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#F0F0F0',
  },
  otherMessageContent: {
    flex: 1,
  },
  otherMessage: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderBottomLeftRadius: 6,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  otherMessageText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '400',
  },
  otherMessageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginLeft: 8,
  },
  messageTime: {
    fontSize: 12,
    color: '#999',
    marginRight: 4,
  },
  messageStatus: {
    marginLeft: 4,
  },
  bottomWarning: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: '#E0E0E0',
  },
  warningText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
}); 