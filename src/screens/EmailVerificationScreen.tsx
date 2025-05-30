import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface EmailVerificationScreenProps {
  onBack: () => void;
  onVerify: () => void;
  email: string;
}

const { width } = Dimensions.get('window');

export default function EmailVerificationScreen({ 
  onBack, 
  onVerify,
  email 
}: EmailVerificationScreenProps) {
  const [code, setCode] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(86); // 01:26
  const inputs = useRef<TextInput[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCodeChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto focus next input
    if (value && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const verificationCode = code.join('');
    
    if (verificationCode.length !== 4) {
      Alert.alert('Hata', 'Lütfen 4 haneli doğrulama kodunu girin');
      return;
    }

    setLoading(true);
    
    // Simulate verification (replace with actual verification logic)
    setTimeout(() => {
      setLoading(false);
      if (verificationCode === '8695') { // Mock verification
        Alert.alert(
          'Başarılı!',
          'Email adresiniz başarıyla doğrulandı.',
          [{ text: 'Tamam', onPress: onVerify }]
        );
      } else {
        Alert.alert('Hata', 'Doğrulama kodu hatalı');
      }
    }, 1500);
  };

  const handleResendCode = () => {
    if (timer > 0) return;
    
    Alert.alert('Kod Gönderildi', 'Yeni doğrulama kodu email adresinize gönderildi');
    setTimer(86);
    setCode(['', '', '', '']);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Icon name="chevron-back" size={24} color="#2C3E50" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Mail Doğrulama</Text>
        <Text style={styles.subtitle}>
          Doğrulama kodunu görmek için lütfen{' '}
          <Text style={styles.emailText}>{email}</Text> adresindeki e-postanızı kontrol edin.
        </Text>
      </View>

      {/* Code Input */}
      <View style={styles.formContainer}>
        <Text style={styles.codeLabel}>Doğrulama Kodu</Text>
        
        <View style={styles.codeInputContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                if (ref) inputs.current[index] = ref;
              }}
              style={styles.codeInput}
              value={digit}
              onChangeText={(value) => handleCodeChange(value, index)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
              keyboardType="numeric"
              maxLength={1}
              textAlign="center"
            />
          ))}
        </View>

        {/* Verify Button */}
        <TouchableOpacity 
          style={styles.verifyButton} 
          onPress={handleVerify}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.verifyButtonText}>Doğrula</Text>
          )}
        </TouchableOpacity>

        {/* Timer and Resend */}
        <View style={styles.resendContainer}>
          <Text style={styles.timerText}>Kodu yeniden gönder</Text>
          <Text style={styles.timerValue}>{formatTime(timer)}</Text>
        </View>

        {timer === 0 && (
          <TouchableOpacity onPress={handleResendCode}>
            <Text style={styles.resendText}>Kodu Tekrar Gönder</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
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
    paddingTop: 60,
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    paddingHorizontal: 32,
    marginBottom: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    lineHeight: 24,
  },
  emailText: {
    color: '#2C3E50',
    fontWeight: '600',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 32,
  },
  codeLabel: {
    fontSize: 18,
    color: '#2C3E50',
    marginBottom: 30,
    fontWeight: '600',
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  codeInput: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: '#E0E7FF',
    borderRadius: 12,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    backgroundColor: '#F8F9FA',
  },
  verifyButton: {
    backgroundColor: '#24BAEC',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#24BAEC',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  timerText: {
    color: '#7F8C8D',
    fontSize: 14,
  },
  timerValue: {
    color: '#2C3E50',
    fontSize: 14,
    fontWeight: '600',
  },
  resendText: {
    color: '#FF6B35',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
}); 