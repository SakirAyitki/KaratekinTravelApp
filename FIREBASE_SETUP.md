# Firebase Kurulum Rehberi

## 1. Firebase Console'da Proje Oluşturma

### Adım 1: Firebase Console'a Giriş
1. [Firebase Console](https://console.firebase.google.com/) adresine gidin
2. Google hesabınızla giriş yapın
3. "Proje ekle" butonuna tıklayın

### Adım 2: Proje Detayları
1. **Proje adı**: `karatekin-travel-app` (veya istediğiniz adı)
2. **Proje ID**: Otomatik oluşacak (örnek: `karatekin-travel-app-12345`)
3. "Devam" butonuna tıklayın

### Adım 3: Google Analytics (Opsiyonel)
1. Google Analytics'i etkinleştirmek isterseniz seçin
2. "Proje oluştur" butonuna tıklayın

## 2. React Native Uygulaması Ekleme

### Adım 1: Platform Seçimi
1. Firebase projenizde sol menüden "Proje Ayarları" (⚙️) seçin
2. "Genel" sekmesinde "Uygulamalarınız" bölümüne gidin
3. Web uygulaması ikonu (<>) tıklayın

### Adım 2: Uygulama Kayıt
1. **Uygulama takma adı**: `KaratekinTravelApp`
2. **Firebase Hosting**: İsteğe bağlı (şimdilik atlayabilirsiniz)
3. "Uygulamayı kaydet" butonuna tıklayın

### Adım 3: Firebase SDK Konfigürasyonu
Firebase SDK konfigürasyon kodunu alacaksınız:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "karatekin-travel-app.firebaseapp.com",
  projectId: "karatekin-travel-app",
  storageBucket: "karatekin-travel-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456",
  measurementId: "G-XXXXXXXXXX"
};
```

## 3. Firebase Hizmetlerini Aktifleştirme

### Authentication (Kimlik Doğrulama)
1. Sol menüden "Authentication" seçin
2. "Başlangıç" butonuna tıklayın
3. "Sign-in method" sekmesine gidin
4. **Email/Password** metodunu etkinleştirin:
   - Email/Password seçin
   - "Etkinleştir" toggle'ını açın
   - "Kaydet" butonuna tıklayın

### Firestore Database
1. Sol menüden "Firestore Database" seçin
2. "Veritabanı oluştur" butonuna tıklayın
3. **Güvenlik kuralları**:
   - Test modunda başla (geliştirme için)
   - Lokasyon seçin (europe-west1 önerilir)
4. "Bitti" butonuna tıklayın

### Firebase Storage (Opsiyonel)
1. Sol menüden "Storage" seçin
2. "Başlangıç" butonuna tıklayın
3. Güvenlik kuralları için "Test modunda başla" seçin
4. Lokasyon seçin ve "Bitti" tıklayın

## 4. Uygulama Konfigürasyonu

### Environment Variables Ayarlama
Proje ana dizininizde `.env` dosyası oluşturun:

```env
# Firebase Configuration
EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSyC...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=karatekin-travel-app.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=karatekin-travel-app
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=karatekin-travel-app.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
EXPO_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Development
EXPO_PUBLIC_USE_FIREBASE_EMULATOR=false
EXPO_PUBLIC_FIREBASE_EMULATOR_HOST=localhost
```

**Önemli**: Gerçek değerleri Firebase Console'dan aldığınız konfigürasyondaki değerlerle değiştirin.

## 5. Firestore Güvenlik Kuralları (Üretim İçin)

Geliştirme tamamlandıktan sonra Firestore kurallarını güncelleyin:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Kullanıcılar sadece kendi verilerini okuyabilir/yazabilir
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Seyahatler herkese açık okuma, sadece sahibi yazabilir
    match /travels/{travelId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null 
        && request.auth.uid == resource.data.userId;
    }
    
    // Rezervasyonlar sadece sahipleri görebilir
    match /reservations/{reservationId} {
      allow read, write: if request.auth != null 
        && request.auth.uid == resource.data.userId;
    }
  }
}
```

## 6. Test Etme

### Uygulama Başlatma
```bash
npm start
# veya
expo start
```

### Firebase Test
1. Uygulamayı açın
2. Firebase Test sayfasında:
   - Yeni hesap oluşturun
   - Giriş yapın
   - Test verisi ekleyin
3. Firebase Console'da verilerin geldiğini kontrol edin

## 7. Sorun Giderme

### Yaygın Hatalar

**1. "Firebase: Error (auth/invalid-api-key)"**
- `.env` dosyasındaki API anahtarını kontrol edin
- Uygulamayı yeniden başlatın

**2. "Firebase: Error (auth/unauthorized-domain)"**
- Firebase Console > Authentication > Settings > Authorized domains
- `localhost` ekleyin (geliştirme için)

**3. "FirebaseError: Missing or insufficient permissions"**
- Firestore kurallarını kontrol edin
- Test modunda olduğunuzdan emin olun

### Yardımcı Komutlar

```bash
# Environment variables kontrolü
echo $EXPO_PUBLIC_FIREBASE_API_KEY

# Cache temizleme
expo r -c

# Paket kontrol
npm list firebase
```

## 8. Sonraki Adımlar

✅ Firebase bağlantısı kuruldu
✅ Authentication aktif
✅ Firestore aktif
✅ Test component hazır

**Şimdi yapılacaklar:**
- Gerçek ekranları Firebase ile entegre etme
- Kullanıcı profili yönetimi
- Seyahat verileri yönetimi
- Dosya yükleme (Storage)
- Push notification kurulumu 