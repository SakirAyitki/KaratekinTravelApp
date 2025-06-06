import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ReportChatModalProps {
  visible: boolean;
  onClose: () => void;
  companyName: string;
}

const ReportChatModal: React.FC<ReportChatModalProps> = ({ visible, onClose, companyName }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Top handle */}
          <View style={styles.handle} />
          
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.titleSection}>
              <Text style={styles.title}>Sohbeti Bildir</Text>
              <Text style={styles.companyName}>{companyName}</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#B20101" />
            </TouchableOpacity>
          </View>
          
          {/* Text Input Area */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Bildirme Sebebiniz..."
              placeholderTextColor="#7D848D"
              multiline={true}
              textAlignVertical="top"
            />
          </View>
          
          {/* Report Button */}
          <TouchableOpacity style={styles.reportButton}>
            <Text style={styles.reportButtonText}>Bildir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#EBEBEB',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    height: 434,
    width: '100%',
  },
  handle: {
    width: 36,
    height: 5,
    backgroundColor: '#7D848D',
    opacity: 0.2,
    borderRadius: 16,
    alignSelf: 'center',
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginTop: 24,
  },
  titleSection: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: '#1B1E28',
    letterSpacing: 0.5,
    lineHeight: 32,
  },
  companyName: {
    fontSize: 15,
    fontWeight: '400',
    color: '#7D848D',
    letterSpacing: 0.3,
    lineHeight: 20,
    marginTop: 4,
  },
  closeButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: '#F7F7F9',
    borderRadius: 16,
    height: 172,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#1B1E28',
    letterSpacing: 0.3,
    paddingHorizontal: 16,
    paddingTop: 16,
    textAlignVertical: 'top',
  },
  reportButton: {
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: '#B20101',
    borderRadius: 16,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
    lineHeight: 20,
  },
});

export default ReportChatModal; 