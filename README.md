# Marmara Teknokent Connect (Flutter Cross-Platform)

Marmara Teknokent bünyesindeki Ar-Ge şirketleri, kuluçka merkezleri ve startuplar için geliştirilmiş, **iOS, Android ve Web** platformlarını destekleyen hiyerarşik yetki ve firma onaylı personel yönetim sistemine sahip profesyonel iş birliği platformu.

---

## 🏛️ Hiyerarşik Düzen ve Yetki Mimarisi

1. **🏛️ 1. Derece: Marmara Teknokent Çatı Yönetimi (`@marmarateknokent`)**
   - Teknoloji Geliştirme Bölgesi en üst yetkili merciidir.
   - Tüm şirketleri, kuluçka merkezlerini, açık/onaylı başvuruları ve ekosistem genel duyurularını yönetir.

2. **🏢 2. Derece: Firma, Startup & Kuluçka Yetkilileri (`@neurologic`, `@cloudscale`, `@corehub`)**
   - Şirket kurumsal hesaplarıdır.
   - Serbest kayıt engellenmiştir; kullanıcı adı ve şifre verme yetkisi yalnızca firmalara aittir.
   - Gelen personel başvurularını inceler, onaylar veya reddeder.
   - İstendiğinde çalışanına doğrudan hesap tanımlayabilir.

3. **👤 3. Derece: Firma Onaylı Personeller (`@erdemcarkit`, `@aliniyya`, `@bakugan`)**
   - Firma onay verdikten sonra sisteme erişim sağlayabilirler.
   - Bireysel veya firma adına içerik paylaşımı yapabilirler.

---

## 🚀 Projeyi Çalıştırma

### Gereksinimler
- [Flutter SDK](https://docs.flutter.dev/get-started/install) (3.10 veya üzeri)
- Android Studio / Xcode (iOS/Android için) veya Chrome / Edge (Web için)

### Bağımlılıkları Yükleme
```bash
flutter pub get
```

### Web'de Çalıştırma
```bash
flutter run -d chrome
```

### Android Cihazda / Emülatörde Çalıştırma
```bash
flutter run -d android
```

### iOS Cihazda / Simülatörde Çalıştırma (macOS)
```bash
flutter run -d ios
```

---

## 🔑 Test Hesapları (Varsayılan Şifre: `31316969`)

| Seviye | Kullanıcı Adı | Şirket / Kurum | Rol & Yetki |
| :--- | :--- | :--- | :--- |
| **1. Derece** | `marmarateknokent` | Marmara Teknokent TGB | Süper Yönetici |
| **2. Derece** | `neurologic` | Neurologic AI | Ar-Ge Şirket Yetkilisi |
| **2. Derece** | `cloudscale` | CloudScale DevOps | Startup Yetkilisi |
| **2. Derece** | `corehub` | CoreHub Kuluçka Merkezi | Kuluçka Program Koordinatörü |
| **3. Derece** | `erdemcarkit` | Neurologic AI | Kıdemli Yapay Zeka Araştırmacısı |
| **3. Derece** | `aliniyya` | CloudScale DevOps | SRE & Cloud Architect |
| **3. Derece** | `bakugan` | CoreHub Kuluçka Merkezi | Girişimci Geliştirici |

---

## 📂 Proje Yapısı

```
lib/
├── main.dart                       # Uygulama başlangıç noktası (ListenableBuilder)
├── core/
│   ├── theme.dart                  # Marmara Teknokent Dark & Light tema tanımları
│   ├── constants.dart              # Görseller ve demo sabitleri
│   └── responsive.dart             # Mobil, tablet ve masaüstü breakpoint yardımcıları
├── data/
│   ├── models/
│   │   ├── user_model.dart         # Hiyerarşik roller (superAdmin, companyAdmin, employee)
│   │   ├── company_model.dart      # Firma, startup ve kuluçka veri modeli
│   │   ├── post_model.dart         # Gönderi ve yorum veri modelleri
│   │   ├── chat_model.dart         # Anlık mesajlaşma modeli
│   │   └── application_model.dart  # Firma onaylı personel başvuru modeli
│   └── teknokent_repository.dart   # Merkezi state management ve repository
├── ui/
│   ├── screens/
│   │   ├── login_screen.dart           # Giriş ve Personel Başvuru sekmeleri
│   │   ├── main_layout_screen.dart     # Duyarlı ana düzen (Mobil BottomNav & Masaüstü Rail)
│   │   ├── feed_screen.dart            # Ar-Ge akışı, post composer ve filtreler
│   │   ├── company_console_dialog.dart # Firma Yönetim Konsolu (Başvurular, Kadro, Yetkilendirme)
│   │   ├── companies_screen.dart       # Ekosistem firma ve kuluçka rehberi
│   │   ├── chat_screen.dart            # Anlık mesajlaşma
│   │   ├── notifications_screen.dart   # Bildirim merkezi
│   │   └── profile_screen.dart         # Kullanıcı profili ve hiyerarşik rozet
│   └── widgets/
│       ├── post_card_widget.dart       # Beğeni, repost ve yorum destekli gönderi kartı
│       ├── avatar_widget.dart          # Çevrim içi durum göstergeli profil resmi
│       └── role_badge_widget.dart      # 3 kademeli hiyerarşik unvan rozeti
assets/                             # Logolar, avatarlar ve gönderi görselleri
android/                            # Android native yapılandırması
ios/                                # iOS native yapılandırması
web/                                # Flutter Web yapılandırması
web_prototype/                      # İlk prototipin yedeği (HTML/JS/CSS)
```
