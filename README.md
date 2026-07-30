# Otonom Bakım ve Hata Takip Uygulaması

Bisküvi üretim hattı operatörleri için tasarlanmış, dokunmatik ekran uyumlu bir otonom bakım terminali. Operatörler vardiya başı CLIT kontrollerini yapar, makine arızalarını bildirir, kök neden analizi uygular ve müdahale süresini kayıt altına alır.

## Ekran Görüntüleri

| Giriş | CLIT Kontrolü | Hata Bildirimi |
|-------|---------------|----------------|
| Operatör barkod/sicil no ile giriş yapar | C-L-I-T gruplu 3 durumlu kontrol listesi | Makine → Parça → Hata kodu kaskad menüsü |

| Yönlendirme | 5 Neden Analizi | Müdahale & Kapanış |
|-------------|-----------------|---------------------|
| Otonom (Rota A) veya MAINGO (Rota B) | Adım adım açılan kök neden soruları | CLIT standardına göre müdahale + süre kaydı |

## Uygulama Akışı

```
Operatör Girişi
     │
     ▼
CLIT Kontrolü (Temizlik / Yağlama / Kontrol / Sıkma)
     │
     ├── Tüm maddeler ✓ ──► Üretime geç
     │
     ▼
Anormallik Bildirimi (Makine → Parça → HT Kodu)
     │
     ├── Rota A (HT02, HT04, HT11, HT13, HT14, YAĞ)
     │        │
     │        ▼
     │   5 Neden Analizi (Progressive Disclosure)
     │        │
     │        ▼
     │   Otonom Müdahale (CLIT standardı)
     │        │
     │        ▼
     │   Kayıt Kapanışı (MTTR hesaplanır)
     │
     └── Rota B (HT01, HT03, HT05-HT10, HT12, HT15)
              │
              ▼
         MAINGO İş Emri (Bakım ekibine devredilir)
```

## Hata Kodları ve Yönlendirme Tablosu

| Kod | Hata Türü | Rota |
|-----|-----------|------|
| HT01 | Aşınma | B – Bakım ekibi |
| HT02 | Ayarsızlık | A – Otonom |
| HT03 | Deformasyon | B – Bakım ekibi |
| HT04 | Gevşeme | A – Otonom |
| HT05 | Haberleşme | B – Bakım ekibi |
| HT06 | Hatalı Bağlantı | B – Bakım ekibi |
| HT07 | Kırılma/Kopma | B – Bakım ekibi |
| HT08 | Program | B – Bakım ekibi |
| HT09 | Sıcaklık | B – Bakım ekibi |
| HT10 | Sızıntı/Kaçak | B – Bakım ekibi |
| HT11 | Tıkanma/Sıkışma | A – Otonom |
| HT12 | Yanma | B – Bakım ekibi |
| HT13 | Personel hatası | A – Otonom |
| HT14 | Temizlik eksikliği | A – Otonom |
| HT15 | Malzeme kaynaklı | B – Bakım ekibi |
| YAĞ | Yağ seviyesi düşük | A – Otonom |

## Desteklenen Makineler

Ülker Ankara bisküvi hattındaki 11 makine ve toplam 703 parça eşleşmesi Excel verisinden yüklenmiştir:

Hamur Mikseri · Laminasyon Makinesi · Hamur Sheeter · Bisküvi Kalıp Makinesi · Silindirler · Fırın · Tambur · Dedektör · Sigres · Sollas · Oli

## Kurulum ve Çalıştırma

### Gereksinimler

- [Node.js](https://nodejs.org) v18 veya üstü (LTS önerilir)
- Git (opsiyonel, `git clone` için)

### Adımlar

```bash
# 1. Projeyi indir
git clone https://github.com/osmantalhayildiz07-hub/otonom-bakim-app.git

# 2. Proje klasörüne gir
cd otonom-bakim-app

# 3. Bağımlılıkları yükle (ilk seferde gerekli)
npm install

# 4. Geliştirme sunucusunu başlat
npm run dev
```

Tarayıcıda `http://localhost:5173` adresini açın.

### Demo Operatör Bilgileri

| Sicil No | İsim | Atanmış Makine | Vardiya |
|----------|------|----------------|---------|
| OP-1042 | Mehmet Yılmaz | Bisküvi Kalıp Makinesi | Vardiya A |
| OP-2071 | Ayşe Demir | Fırın | Vardiya A |
| OP-3388 | Kerem Aksoy | Sollas | Vardiya B |

### Derleme (Üretim)

```bash
npm run build
```

`dist/` klasöründe statik dosyalar oluşur. Herhangi bir web sunucusuna (nginx, IIS, Apache) atılabilir veya doğrudan tarayıcıda açılabilir.

## Teknik Bilgiler

| Katman | Teknoloji |
|--------|-----------|
| Frontend | React 19 + Vite |
| Stil | Gömülü CSS (dark theme, high-contrast) |
| Veri | Tarayıcı belleği (state) — backend bağımsız prototip |
| Dil | Türkçe arayüz |
| Tasarım | Endüstriyel tablet/PC, dokunmatik ekran uyumlu (48-110px touch target) |

## Yönetici Panosu

Uygulama içindeki "Yönetici panosu" butonu şu metrikleri gösterir:

- **MTTR**: Ortalama onarım süresi (otonom kapatılan kayıtlar)
- **Net kazanılan üretim süresi**: Bakım ekibi bekleme standardı (15 dk) ile fiili süre farkı
- **Otonom çözüm oranı**: Rota A kapanış yüzdesi
- **Pareto analizi**: Hata kodu bazlı frekans dağılımı
- **Makine bazlı kronik durum tablosu**

## Kısıtlamalar

Bu uygulama bir **frontend prototipidir**:

- Veriler sayfa yenilendiğinde sıfırlanır
- Farklı cihazlar arasında veri paylaşımı yoktur
- Gerçek kullanım için PostgreSQL veritabanı ve bir backend API gereklidir (şema dokümantasyonu proje içinde mevcuttur)

## Proje Bağlamı

ODTÜ Endüstri Mühendisliği — Sistem Tasarımı dersi kapsamında, Ülker Ankara bisküvi üretim hattı için geliştirilmiş otonom bakım sistemi prototipi.
