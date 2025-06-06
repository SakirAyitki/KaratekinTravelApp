import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ReportChatModal from '../components/ReportChatModal';

interface CompanyContactScreenProps {
  onBack: () => void;
  companyName?: string;
}

export default function CompanyContactScreen({ onBack, companyName = 'Kamil Koç' }: CompanyContactScreenProps) {
  const [message, setMessage] = useState('');
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);

  const messages = [
    {
      id: 1,
      text: 'Hello!',
      time: '9:34',
      isSent: true,
      isRead: true,
    },
    {
      id: 2,
      text: 'I\'m very glad you like it👍',
      time: '9:35',
      isSent: true,
      isRead: true,
    },
    {
      id: 3,
      text: 'We are arriving today at 01:45, will someone be at home?',
      time: '9:37',
      isSent: false,
      isRead: false,
    },
    {
      id: 4,
      text: 'We are arriving today at 01:45, will someone be at home?',
      time: '9:37',
      isSent: false,
      isRead: false,
    },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Mesaj gönderme işlemi burada olacak
      setMessage('');
    }
  };

  const renderMessage = (msg: any) => (
    <View key={msg.id} style={[styles.messageContainer, msg.isSent ? styles.sentMessage : styles.receivedMessage]}>
      {!msg.isSent && (
        <Image 
          source={require('../../assets/ob1.png')} 
          style={styles.messageAvatar}
        />
      )}
      
      <View style={[styles.messageBubble, msg.isSent ? styles.sentBubble : styles.receivedBubble]}>
        <Text style={styles.messageText}>{msg.text}</Text>
        <View style={styles.messageFooter}>
          <Text style={styles.messageTime}>{msg.time}</Text>
          {msg.isSent && (
            <View style={styles.messageStatus}>
              <Ionicons name="checkmark" size={12} color={msg.isRead ? "#19B000" : "#7D848D"} />
              <Ionicons name="checkmark" size={12} color={msg.isRead ? "#19B000" : "#7D848D"} style={{ marginLeft: -6 }} />
            </View>
          )}
        </View>
      </View>
      
      {msg.isSent && (
        <Image 
          source={require('../../assets/ob1.png')} 
          style={styles.messageAvatar}
        />
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Header */}
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <View style={styles.backButtonCircle}>
            <Ionicons name="arrow-back" size={20} color="#1B1E28" />
          </View>
        </TouchableOpacity>
        
        {/* Title - Centered */}
        <Text style={styles.headerTitle}>{companyName} - İletişim</Text>
        
        {/* Company Avatar */}
        <Image 
          source={require('../../assets/ob1.png')} 
          style={styles.companyAvatar}
        />
      </View>

      {/* Report Button */}
      <TouchableOpacity style={styles.reportButton} onPress={() => setIsReportModalVisible(true)}>
        <Ionicons name="flag-outline" size={10} color="#FFFFFF" />
        <Text style={styles.reportText}>Sohbeti Bildir</Text>
      </TouchableOpacity>

      {/* Chat Area */}
      <View style={styles.chatContainer}>

        {/* Messages */}
        <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
          {/* Today Badge */}
          <View style={styles.todayBadge}>
            <Text style={styles.todayText}>Bugün</Text>
          </View>

          {/* Messages List */}
          <View style={styles.messagesList}>
            {messages.map(msg => renderMessage(msg))}
          </View>
        </ScrollView>

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Mesajınız..."
              placeholderTextColor="#7D848D"
              value={message}
              onChangeText={setMessage}
              multiline
            />
          </View>
          
          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
            <Ionicons name="send" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Report Chat Modal */}
      <ReportChatModal
        visible={isReportModalVisible}
        onClose={() => setIsReportModalVisible(false)}
        companyName={companyName}
      />
    </SafeAreaView>
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
    marginTop: 28,
    height: 44,
    position: 'relative',
  },
  backButton: {
    padding: 2,
  },
  backButtonCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F7F7F9',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1B1E28',
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 11,
  },
  companyAvatarContainer: {
    // Removed since avatar is now in header
  },
  companyAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    marginTop: 10,
    marginHorizontal: 18,
    borderRadius: 16,
    position: 'relative',
  },
  locationIcon: {
    position: 'absolute',
    bottom: 80,
    right: 30,
    zIndex: 1,
  },
  messagesContainer: {
    flex: 1,
    paddingTop: 43,
    paddingHorizontal: 11,
  },
  todayBadge: {
    alignSelf: 'center',
    backgroundColor: '#F7F7F9',
    paddingHorizontal: 9,
    paddingVertical: 7,
    borderRadius: 8,
    marginBottom: 29,
  },
  todayText: {
    fontSize: 13,
    fontWeight: '400',
    color: '#7D848D',
    textAlign: 'center',
  },
  messagesList: {
    gap: 29,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
  },
  sentMessage: {
    justifyContent: 'flex-end',
  },
  receivedMessage: {
    justifyContent: 'flex-start',
  },
  messageAvatar: {
    width: 47,
    height: 48,
    borderRadius: 24,
  },
  messageBubble: {
    maxWidth: 268,
    borderRadius: 16,
    paddingHorizontal: 13,
    paddingVertical: 10,
  },
  sentBubble: {
    backgroundColor: '#F7F7F9',
  },
  receivedBubble: {
    backgroundColor: '#F7F7F9',
  },
  messageText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#1B1E28',
    lineHeight: 20,
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 2,
    gap: 8,
  },
  messageTime: {
    fontSize: 12,
    fontWeight: '400',
    color: '#7D848D',
  },
  messageStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reportButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#B20101',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginRight: 20,
    marginBottom: 8,
    marginTop: 16,
  },
  reportText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 16,
    gap: 12,
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: '#F7F7F9',
    borderRadius: 16,
    paddingHorizontal: 19,
    paddingVertical: 16,
  },
  textInput: {
    fontSize: 16,
    fontWeight: '400',
    color: '#1B1E28',
    textAlignVertical: 'top',
    minHeight: 16,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#24BAEC',
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 