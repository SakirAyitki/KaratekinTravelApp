import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface QRScreenProps {
  onBack: () => void;
  onHome?: () => void;
}

export default function QRScreen({ onBack, onHome }: QRScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      <ImageBackground 
        source={require('../../assets/ob1.png')} 
        style={styles.backgroundImage}
        resizeMode="cover"
        blurRadius={3}
      >
        <View style={styles.overlay}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={onHome || onBack}>
              <Ionicons name="home-outline" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>QR Bilgileri</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Content Card */}
          <View style={styles.contentCard}>
            <View style={styles.cardHandle} />
            
            {/* Success Message */}
            <View style={styles.successSection}>
              <View style={styles.successRow}>
                <View style={styles.checkIconContainer}>
                  <Ionicons name="checkmark" size={24} color="white" />
                </View>
                <View style={styles.successTextContainer}>
                  <Text style={styles.successTitle}>Ödemeniz İçin</Text>
                  <Text style={styles.successSubtitle}>Teşekkür Ederiz!</Text>
                </View>
              </View>
            </View>

            {/* QR Code */}
            <View style={styles.qrContainer}>
              <View style={styles.qrFrame}>
                <View style={[styles.qrCorner, styles.topLeft]} />
                <View style={[styles.qrCorner, styles.topRight]} />
                <View style={[styles.qrCorner, styles.bottomLeft]} />
                <View style={[styles.qrCorner, styles.bottomRight]} />
                
                <View style={styles.qrCodeContainer}>
                  <View style={styles.qrCode}>
                    {/* QR Pattern */}
                    <View style={styles.qrRow}>
                      <View style={[styles.qrBlock, styles.filled]} />
                      <View style={[styles.qrBlock, styles.filled]} />
                      <View style={[styles.qrBlock, styles.filled]} />
                      <View style={styles.qrBlock} />
                      <View style={[styles.qrBlock, styles.filled]} />
                      <View style={styles.qrBlock} />
                      <View style={[styles.qrBlock, styles.filled]} />
                      <View style={[styles.qrBlock, styles.filled]} />
                      <View style={[styles.qrBlock, styles.filled]} />
                    </View>
                    <View style={styles.qrRow}>
                      <View style={[styles.qrBlock, styles.filled]} />
                      <View style={styles.qrBlock} />
                      <View style={styles.qrBlock} />
                      <View style={styles.qrBlock} />
                      <View style={styles.qrBlock} />
                      <View style={[styles.qrBlock, styles.filled]} />
                      <View style={styles.qrBlock} />
                      <View style={styles.qrBlock} />
                      <View style={[styles.qrBlock, styles.filled]} />
                    </View>
                    <View style={styles.qrRow}>
                      <View style={[styles.qrBlock, styles.filled]} />
                      <View style={styles.qrBlock} />
                      <View style={[styles.qrBlock, styles.filled]} />
                      <View style={styles.qrBlock} />
                      <View style={[styles.qrBlock, styles.filled]} />
                      <View style={styles.qrBlock} />
                      <View style={[styles.qrBlock, styles.filled]} />
                      <View style={styles.qrBlock} />
                      <View style={[styles.qrBlock, styles.filled]} />
                    </View>
                    <View style={styles.qrRow}>
                      <View style={styles.qrBlock} />
                      <View style={styles.qrBlock} />
                      <View style={styles.qrBlock} />
                      <View style={[styles.qrBlock, styles.filled]} />
                      <View style={styles.qrBlock} />
                      <View style={[styles.qrBlock, styles.filled]} />
                      <View style={styles.qrBlock} />
                      <View style={styles.qrBlock} />
                      <View style={styles.qrBlock} />
                    </View>
                    <View style={styles.qrRow}>
                      <View style={[styles.qrBlock, styles.filled]} />
                      <View style={styles.qrBlock} />
                      <View style={styles.qrBlock} />
                      <View style={styles.qrBlock} />
                      <View style={[styles.qrBlock, styles.filled]} />
                      <View style={styles.qrBlock} />
                      <View style={[styles.qrBlock, styles.filled]} />
                      <View style={[styles.qrBlock, styles.filled]} />
                      <View style={styles.qrBlock} />
                    </View>
                    <View style={styles.qrRow}>
                      <View style={[styles.qrBlock, styles.filled]} />
                      <View style={[styles.qrBlock, styles.filled]} />
                      <View style={[styles.qrBlock, styles.filled]} />
                      <View style={[styles.qrBlock, styles.filled]} />
                      <View style={styles.qrBlock} />
                      <View style={[styles.qrBlock, styles.filled]} />
                      <View style={styles.qrBlock} />
                      <View style={styles.qrBlock} />
                      <View style={[styles.qrBlock, styles.filled]} />
                    </View>
                    <View style={styles.qrRow}>
                      <View style={[styles.qrBlock, styles.filled]} />
                      <View style={styles.qrBlock} />
                      <View style={[styles.qrBlock, styles.filled]} />
                      <View style={styles.qrBlock} />
                      <View style={styles.qrBlock} />
                      <View style={styles.qrBlock} />
                      <View style={[styles.qrBlock, styles.filled]} />
                      <View style={[styles.qrBlock, styles.filled]} />
                      <View style={[styles.qrBlock, styles.filled]} />
                    </View>
                    <View style={styles.qrRow}>
                      <View style={styles.qrBlock} />
                      <View style={styles.qrBlock} />
                      <View style={styles.qrBlock} />
                      <View style={[styles.qrBlock, styles.filled]} />
                      <View style={[styles.qrBlock, styles.filled]} />
                      <View style={styles.qrBlock} />
                      <View style={styles.qrBlock} />
                      <View style={[styles.qrBlock, styles.filled]} />
                      <View style={styles.qrBlock} />
                    </View>
                    <View style={styles.qrRow}>
                      <View style={[styles.qrBlock, styles.filled]} />
                      <View style={[styles.qrBlock, styles.filled]} />
                      <View style={[styles.qrBlock, styles.filled]} />
                      <View style={styles.qrBlock} />
                      <View style={[styles.qrBlock, styles.filled]} />
                      <View style={styles.qrBlock} />
                      <View style={[styles.qrBlock, styles.filled]} />
                      <View style={[styles.qrBlock, styles.filled]} />
                      <View style={[styles.qrBlock, styles.filled]} />
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* Description */}
            <Text style={styles.description}>
              Otobüse binmeden önce QR kodunuzu hazırlamanız gerekmektedir.
            </Text>

            {/* Download Button */}
            <TouchableOpacity style={styles.downloadButton}>
              <Text style={styles.downloadButtonText}>QR Kodu İndir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(135, 206, 235, 0.6)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 25,
  },
  backButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: 'white',
  },
  placeholder: {
    width: 50,
    height: 50,
  },
  contentCard: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 15,
    alignItems: 'center',
  },
  cardHandle: {
    width: 50,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 20,
  },
  successSection: {
    alignItems: 'center',
    marginBottom: 25,
  },
  successRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  checkIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successTextContainer: {
    alignItems: 'flex-start',
  },
  successTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  successSubtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  qrContainer: {
    marginBottom: 25,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrFrame: {
    width: 280,
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  qrCorner: {
    position: 'absolute',
    width: 25,
    height: 25,
    borderColor: '#1976D2',
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  qrCodeContainer: {
    width: 220,
    height: 220,
    backgroundColor: 'white',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrCode: {
    width: 220,
    height: 220,
  },
  qrRow: {
    flexDirection: 'row',
    flex: 1,
  },
  qrBlock: {
    flex: 1,
    margin: 1,
    backgroundColor: 'white',
  },
  filled: {
    backgroundColor: '#1976D2',
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 15,
    lineHeight: 20,
    marginTop: 20,
  },
  downloadButton: {
    backgroundColor: '#40C4FF',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 50,
    marginBottom: 15,
    marginTop: 20,
  },
  downloadButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 