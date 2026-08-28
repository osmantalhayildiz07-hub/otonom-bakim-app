# Otonom Bakım ve Hata Takip Uygulaması

Bisküvi üretim hattı operatörleri için tasarlanmış, dokunmatik ekran uyumlu bir otonom bakım terminali. Operatörler vardiya başı CLIT kontrollerini yapar, makine arızalarını bildirir, kök neden analizi uygular, müdahale süresini kayıt altına alır ve vardiya aktarım raporu düzenler.

**Canlı demo:** https://otonom-bakim-app.vercel.app

---

## Uygulama Akışı

```
Operatör Girişi (sicil no + makine seçimi)
     │
     ▼
Önceki Vardiya Raporu Onayı
     │
     ▼
CLIT Kontrolü (Temizlik / Yağlama / Kontrol / Sıkma)
     │   3 durumlu: ✓ Uygun · 🔧 Müdahale ettim · ⚠️ Arıza
     ▼
Üretim
     │
     ├─── Anormallik Bildirimi (Makine → Parça → HT Kodu)
     │         │
     │         ├── ROTA A ──► 5 Neden Analizi ──► Otonom Müdahale ──► Kapanış (MTTR)
     │         │                    │
     │         │                    └── Bilgi eksikliği? ──► Eğitim talebi maili
     │         │
     │         └── ROTA B ──► MAINGO İş Emri (bakım ekibine devir)
     │
     └─── Vardiyayı Bitir ──► Aktarım Raporu (İSG / Üretim / Bakım / Diğer)
```

---

## Makineler

Ülker Ankara bisküvi hattı — 12 makine, 781 makine-parça eşleşmesi.

| # | Makine | Parça Sayısı |
|---|--------|--------------|
| 1 | Hamur Mikseri | 78 |
| 2 | Laminasyon Makinesi | 64 |
| 3 | Hamur Sheeter Makinesi | 55 |
| 4 | Bisküvi Kalıp Makinesi | 71 |
| 5 | Silindirler | 54 |
| 6 | Fırın | 63 |
| 7 | Tambur | 44 |
| 8 | Dedektör | 34 |
| 9 | 1. Sigres Makinesi | 78 |
| 10 | 2. Sigres Makinesi | 78 |
| 11 | Sollas | 81 |
| 12 | Oli | 81 |

> Sigres hattı iki ayrı makineden oluşur ve sistemin her yerinde bağımsız olarak işlem görür.

---

## Hata Kodları (HT) ve Yönlendirme

Hata kodu, sistemin operatörü hangi rotaya göndereceğini belirler.

| Kod | Hata Türü | Rota | Sonuç |
|-----|-----------|------|-------|
| `HT02` | Ayarsızlık | **A** | 5 Neden → Otonom müdahale |
| `HT04` | Gevşeme | **A** | 5 Neden → Otonom müdahale |
| `HT11` | Tıkanma/Sıkışma | **A** | 5 Neden → Otonom müdahale |
| `HT13` | Personel hatası | **A** | 5 Neden → Otonom müdahale |
| `HT14` | Temizlik eksikliği | **A** | 5 Neden → Otonom müdahale |
| `YAĞ` | Yağ seviyesi düşük | **A** | 5 Neden → Otonom müdahale |
| `HT01` | Aşınma | **B** | MAINGO iş emri |
| `HT03` | Deformasyon | **B** | MAINGO iş emri |
| `HT05` | Haberleşme | **B** | MAINGO iş emri |
| `HT06` | Hatalı Bağlantı | **B** | MAINGO iş emri |
| `HT07` | Kırılma/Kopma | **B** | MAINGO iş emri |
| `HT08` | Program | **B** | MAINGO iş emri |
| `HT09` | Sıcaklık | **B** | MAINGO iş emri |
| `HT10` | Sızıntı/Kaçak | **B** | MAINGO iş emri |
| `HT12` | Yanma | **B** | MAINGO iş emri |
| `HT15` | Malzeme kaynaklı | **B** | MAINGO iş emri |

**Rota A** operatörün kendi çözebileceği, **Rota B** parça değişimi veya teknik uzmanlık gerektiren hatalardır.

---

## Parça Kodları

Sistemde 113 benzersiz parça kodu tanımlıdır. Her makine kendi parça alt kümesini kullanır.

<details>
<summary>Tam listeyi görmek için tıklayın</summary>

| `1020` Bant | `1040` Bıçak | `1050` Blower | `1060` Boru |
| `1070` Buhar Hortum/Tesisat | `1080` Burç | `1090` Buton | `1110` Cidar borusu |
| `1120` Civata | `1130` Conta | `1140` Çene | `1160` Disk |
| `1170` Dişli | `1180` Ekran | `1200` Elektronik Kart | `1210` Enkoder |
| `1220` Eşanjör | `1230` Fan | `1240` Fırça | `1250` Filtre |
| `1260` Flep | `1270` Fotosel | `1280` Fren | `1290` Güç Kaynağı |
| `1300` Hava Hortum/Tesisat | `1330` Holt melt | `1340` İtici | `1350` İzolatör |
| `1360` Kablo | `1370` Kalıp | `1380` Kam Mekanizması | `1390` Kaplin |
| `1400` Kayış/Kasnak | `1430` Kızak | `1440` Klepe | `1450` Klima |
| `1460` Hava Kompresör | `1480` Kondensör | `1490` Kondenstop | `1500` Kontaktör |
| `1510` Isıtıcı Kollektör | `1520` Konveyör Bant | `1540` Körük | `1550` Kumanda |
| `1560` Kuyruk Mili | `1570` Magazin | `1590` Makara | `1600` Manifolt |
| `1610` Manometre | `1620` Tarih Kodlama | `1650` Mil | `1660` Modül |
| `1670` Motor | `1680` Nozul | `1690` Oring | `1700` Palet |
| `1710` Pc | `1720` Pil | `1730` Pim | `1740` Piston |
| `1750` Pompa | `1760` Potansiyometre | `1770` Pres | `1780` Program/PLC |
| `1790` Redüktör | `1800` Rezistans | `1810` Röle | `1820` Rulman |
| `1830` Salmastra | `1840` Segman | `1850` Sensör | `1860` Servo Motor |
| `1870` Sızdırmazlık Elemanı | `1880` Sigorta | `1890` Siviç | `1900` Su Hortum/Tesisat |
| `1910` Sürücü | `1920` Şaft | `1930` Şalter | `1950` Şartlandırıcı |
| `1960` Tambur | `1970` Tel Bant | `1980` Terazi | `1990` Termik |
| `2000` Termometre | `2010` Termostat | `2020` Trafo | `2030` Vana |
| `2040` Varyatör | `2070` Yay | `2080` Zaman Kayışı | `2090` Zincir Mekanizması |
| `2110` Tutkal grubu | `2120` Folyo çekme grubu | `2130` Keçe | `2140` Asker |
| `2160` Makas | `2170` Stoper | `2180` Bobin aktarma grubu | `2190` Baskı aparatı |
| `2200` Katlama grubu | `2210` Vakum üretici | `2220` Valf | `2230` Vantuz |
| `2240` Yağ sistemi | `2250` Yapıştırma grubu | `2260` Rekor | `2270` Kılavuz |
| `2280` Kama | `2300` Dış kağıt grubu | `2320` Serpantin | `2330` Pot |
| `2340` Rotary Valf |  |  |  |

</details>

---

## CLIT Kontrol Kategorileri

| Harf | Kategori | Örnek Kontrol |
|------|----------|---------------|
| **C** | Temizlik (Cleaning) | Bant yüzeyi ve kenar sıyırıcıları un/hamur artıklarından temizlendi |
| **L** | Yağlama (Lubrication) | Yağ sistemi seviye göstergesi MIN çizgisinin üstünde |
| **I** | Kontrol (Inspection) | Anormal ses / titreşim dinlemesi yapıldı |
| **T** | Sıkma (Tightening) | Kaplin ve kasnak setuskurları sıkı |

---

## Vardiya Aktarımı

Vardiya sonunda operatör dört kategoride rapor doldurur: **İSG**, **Üretim**, **Bakım**, **Diğer**. Her kategoride "Sorun yok" seçeneği vardır; işaretlenmezse yazılı açıklama zorunludur.

Makinede kapanmamış bir arıza kaydı varsa Bakım kategorisi boş geçilemez. Sonraki operatör giriş yaptığında raporu okuyup onaylamadan üretime başlayamaz.

---

## Eğitim Talebi (Operasyonel Mükemmellik)

Kök neden analizi sırasında operatör **"Bilgi eksikliği"** kutusunu işaretlerse, sistem parça grubu ve hata koduna göre eğitim adı türetir ve Operasyonel Mükemmellik ekibine talep gönderir.

| Parça + Hata | Türetilen Eğitim |
|--------------|------------------|
| 1850 Sensör + HT02 | Sensör Kalibrasyon ve Müdahale Eğitimi |
| 2240 Yağ sistemi + YAĞ | Yağlama ve Sızdırmazlık Eğitimi |
| 1120 Civata + HT04 | Tork ve Bağlantı Sıkma Standardı Eğitimi |
| 1020 Bant + HT02 | Bant ve Tahrik Hattı Ayar Eğitimi |

---

## Yönetici Panosu

| Metrik | Açıklama |
|--------|----------|
| MTTR | Otonom kapatılan kayıtların ortalama onarım süresi |
| Net kazanılan üretim süresi | Bakım ekibi bekleme standardı (15 dk) ile fiili süre farkı |
| Otonom çözüm oranı | Rota A ile kapatılan kayıtların yüzdesi |
| Pareto analizi | Hata kodu bazlı frekans ve kümülatif dağılım |
| Makine bazlı kronik durum | Makine başına kayıt, otonom oran, toplam duruş |
| Eğitim talepleri | Bilgi eksikliği bildirimlerinden doğan eğitim listesi |
| Vardiya aktarım geçmişi | Kim devretti, hangi kategoride not var, onaylandı mı |

---

## KURULUM!!

**Gereksinim:** [Node.js](https://nodejs.org) v18+

```bash
git clone https://github.com/osmantalhayildiz07-hub/otonom-bakim-app.git
cd otonom-bakim-app
npm install
npm run dev
```

Tarayıcıda `http://localhost:5173` adresini açın.

### Demo Operatörleri

| Sicil No | İsim | Atanmış Makine | Vardiya |
|----------|------|----------------|---------|
| `OP-1042` | Mehmet Yılmaz | Bisküvi Kalıp Makinesi | Vardiya A |
| `OP-2071` | Ayşe Demir | Fırın | Vardiya A |
| `OP-3388` | Kerem Aksoy | Sollas | Vardiya B |

Giriş ekranında makine seçimi serbesttir; atanmış makine yalnızca öneri olarak gösterilir.

### Derleme

```bash
npm run build
```

`dist/` klasöründeki statik dosyalar herhangi bir web sunucusuna yüklenebilir.

---

## Teknik Bilgiler

| Katman | Teknoloji |
|--------|-----------|
| Frontend | React 19 + Vite |
| Stil | Gömülü CSS (koyu tema, yüksek kontrast) |
| Veri | Tarayıcı belleği (React state) |
| Arayüz dili | Türkçe |
| Tasarım | Endüstriyel tablet/PC, 48–110px dokunma hedefleri |

---

## Kısıtlamalar

Bu bir **frontend prototipidir**:

- Veriler sayfa yenilendiğinde sıfırlanır
- Cihazlar arasında veri paylaşımı yoktur
- Eğitim talebi maili simüle edilir, gerçek gönderim yapılmaz
- Gerçek kullanım için PostgreSQL veritabanı ve backend API gereklidir (şema dokümantasyonu proje içinde mevcuttur)

---


