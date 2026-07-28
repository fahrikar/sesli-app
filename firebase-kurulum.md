# Firebase Bulut Kurulumu

Bu dosya, uygulamayı buluta bağlamak için gereken adımları anlatır.
Kurulum bitince: müdürlerin girdiği kayıtlar patronun ekranına anında düşer,
belgeler sunucuda saklanır ve telefon değişse bile veriler kaybolmaz.

---

## 1. Proje oluştur

1. https://console.firebase.google.com adresine Google hesabınızla girin
2. **Proje ekle** → ad: `guner-muhasebe` → **Devam**
3. Google Analytics'i **kapatın** (gerekmiyor) → **Proje oluştur**

## 2. Realtime Database aç

1. Sol menü → **Derleme (Build)** → **Realtime Database**
2. **Veritabanı oluştur**
3. Konum: **europe-west1** (Belçika — Türkiye'ye en yakın)
4. **Kilitli modda başlat** seçin → **Etkinleştir**
   *(Kuralları 4. adımda yazacağız)*

## 3. Storage aç (belge fotoğrafları için)

1. Sol menü → **Derleme** → **Storage** → **Başlayın**
2. **Kilitli modda başlat** → aynı konumu seçin → **Bitti**

## 4. Güvenlik kurallarını yapıştır

### Realtime Database → Kurallar sekmesi

```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null",
    "kayitlar": {
      ".indexOn": ["mudurId"]
    }
  }
}
```

**Yayınla**'ya basın.

> `auth != null`: yalnızca uygulama üzerinden (anonim oturumla) erişilebilir,
> internetten rastgele kimse veriyi okuyamaz.
> `.indexOn`: müdürlerin yalnızca kendi kayıtlarını çekmesi için gerekli.

### Storage → Kurallar sekmesi

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /belgeler/{dosya} {
      allow read, write: if request.auth != null;
    }
  }
}
```

**Yayınla**'ya basın.

## 5. Anonim girişi aç

1. Sol menü → **Derleme** → **Authentication** → **Başlayın**
2. **Sign-in method** sekmesi → **Anonim** → **Etkinleştir** → **Kaydet**

Bu adım atlanırsa hiçbir veri yazılamaz.

## 6. Bağlantı bilgilerini al

1. Sol üstte **⚙ Proje ayarları**
2. Aşağıda **Uygulamalarınız** → **Web** simgesine `</>` tıklayın
3. Takma ad: `sesli-app` → **Uygulamayı kaydet**
4. Ekranda çıkan `firebaseConfig` bloğunu **kopyalayın**

Şuna benzer görünür:

```js
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "guner-muhasebe.firebaseapp.com",
  databaseURL: "https://guner-muhasebe-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "guner-muhasebe",
  storageBucket: "guner-muhasebe.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

**Bu bloğu bana gönderin, koda yerleştirip test edeceğim.**

> Not: Bu bilgiler gizli değildir, web uygulamalarında herkese açık olur.
> Güvenlik yukarıdaki kurallarla sağlanır. Yine de `databaseURL` satırının
> eksiksiz olmasına dikkat edin — en sık atlanan satır budur.

---

## Kurulumdan sonra ne değişir

| | Şimdi | Bulut sonrası |
|---|---|---|
| Müdürün kaydı | Sadece kendi telefonunda | Patronun ekranına anında düşer |
| Belge fotoğrafı | Telefonda, depolama dolabilir | Sunucuda, sınırsıza yakın |
| Telefon değişince | Veriler gider | Aynı PIN ile geri gelir |
| iPhone 7 gün kullanılmazsa | Veriler silinebilir | Etkilenmez |
| Stok / çek ödemeleri | Her telefonda ayrı | Ortak |

## Ücret

Firebase'in ücretsiz paketi (Spark) bu kullanım için fazlasıyla yeterlidir:
- Realtime Database: 1 GB depolama, aylık 10 GB indirme
- Storage: 5 GB depolama

Birkaç müdür ve günde birkaç yüz kayıt bu sınırların çok altında kalır.
Kart bilgisi istenmez.
