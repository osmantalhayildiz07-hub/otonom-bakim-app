import React, { useState, useMemo, useEffect } from "react";

const MACHINES = {"HAMUR MİKSERİ":["1040 Bıçak","1060 Boru","1080 Burç","1090 Buton","1120 Civata","1130 Conta","1160 Disk","1170 Dişli","1180 Ekran","1200 Elektronik Kart","1210 Enkoder","1220 Eşanjör","1230 Fan","1250 Filtre","1260 Flep","1270 Fotosel","1280 Fren","1290 Güç Kaynağı","1300 Hava Hortum/Tesisat","1340 İtici","1350 İzolatör","1360 Kablo","2280 Kama","1390 Kaplin","1400 Kayış/Kasnak","2130 Keçe","2270 Kılavuz","1430 Kızak","1440 Klepe","1450 Klima","1500 Kontaktör","1540 Körük","1550 Kumanda","1600 Manifolt","1610 Manometre","1650 Mil","1660 Modül","1670 Motor","1680 Nozul","1690 Oring","1700 Palet","1710 Pc","1730 Pim","1740 Piston","1750 Pompa","1760 Potansiyometre","1780 Program/PLC","1790 Redüktör","2260 Rekor","1810 Röle","1820 Rulman","1830 Salmastra","1840 Segman","1850 Sensör","2320 Serpantin","1860 Servo Motor","1870 Sızdırmazlık Elemanı","1880 Sigorta","1890 Siviç","2170 Stoper","1900 Su Hortum/Tesisat","1910 Sürücü","1920 Şaft","1930 Şalter","1950 Şartlandırıcı","1960 Tambur","1980 Terazi","1990 Termik","2000 Termometre","2010 Termostat","2020 Trafo","2220 Valf","2030 Vana","2040 Varyatör","2240 Yağ sistemi","2070 Yay","2080 Zaman Kayışı","2090 Zincir Mekanizması"],"LAMİNASYON MAKİNESİ":["1020 Bant","1040 Bıçak","1080 Burç","1090 Buton","1120 Civata","1170 Dişli","1180 Ekran","1200 Elektronik Kart","1210 Enkoder","1230 Fan","1250 Filtre","1270 Fotosel","1280 Fren","1240 Fırça","1290 Güç Kaynağı","1300 Hava Hortum/Tesisat","1350 İzolatör","1360 Kablo","2280 Kama","1380 Kam Mekanizması","1390 Kaplin","1400 Kayış/Kasnak","2270 Kılavuz","1430 Kızak","1500 Kontaktör","1520 Konveyör Bant","1550 Kumanda","1560 Kuyruk Mili","1590 Makara","1600 Manifolt","1610 Manometre","1650 Mil","1660 Modül","1670 Motor","1690 Oring","1710 PC","1730 Pim","1740 Piston","1760 Potansiyometre","1780 Program/PLC","1790 Redüktör","2260 Rekor","1810 Röle","1820 Rulman","1840 Segman","1850 Sensör","1860 Servo Motor","1870 Sızdırmazlık Elemanı","1880 Sigorta","1890 Siviç","2170 Stoper","1910 Sürücü","1920 Şaft","1930 Şalter","1950 Şartlandırıcı","1960 Tambur","1990 Termik","2020 Trafo","2220 Valf","2040 Varyatör","2240 Yağ sistemi","2070 Yay","2080 Zaman Kayışı","2090 Zincir Mekanizması"],"HAMUR SHEETER MAKİNESİ":["1020 Bant","1040 Bıçak (hamuru sıyıran sıyırıcı bıçak)","1080 Burç","1090 Buton","1120 Civata","1130 Conta","1170 Dişli","1180 Ekran","1200 Elektronik Kart","1210 Enkoder","1230 Fan","1240 Fırça","1250 Filtre","1270 Fotosel","1290 Güç Kaynağı","1360 Kablo","2280 Kama","1390 Kaplin","1400 Kayış/Kasnak","2130 Keçe","2270 Kılavuz","1430 Kızak","1500 Kontaktör","1520 Konveyör Bant","1550 Kumanda","1560 Kuyruk Mili","1590 Makara","1650 Mil","1660 Modül","1670 Motor","1690 Oring","1730 Pim","1760 Potansiyometre","1780 Program/PLC","1790 Redüktör","1810 Röle","1820 Rulman","1840 Segman","1850 Sensör","1860 Servo Motor","1870 Sızdırmazlık Elemanı","1880 Sigorta","1890 Siviç","2170 Stoper","1910 Sürücü","1920 Şaft","1930 Şalter","1960 Tambur","1990 Termik","2020 Trafo","2040 Varyatör","2240 Yağ sistemi","2070 Yay","2080 Zaman Kayışı","2090 Zincir Mekanizması"],"BİSKÜVİ KALIP MAKİNESİ":["1020 Bant","1040 Bıçak","1080 Burç","1090 Buton","1120 Civata","1130 Conta","1160 Disk","1170 Dişli","1180 Ekran","1200 Elektronik Kart","1210 Enkoder","1230 Fan","1240 Fırça","1250 Filtre","1270 Fotosel","1280 Fren","1290 Güç Kaynağı","1300 Hava Hortum/Tesisat","1340 İtici","1360 Kablo","1370 Kalıp","1380 Kam Mekanizması","1390 Kaplin","1400 Kayış/Kasnak","1430 Kızak","1440 Klepe","1460 Hava Kompresör","1500 Kontaktör","1520 Konveyör Bant","1540 Körük","1550 Kumanda","1560 Kuyruk mili","1590 Makara","1610 Manometre","1650 Mil","1660 Modül","1670 Motor","1690 O-ring","1710 PC","1720 Pil","1730 Pim","1740 Piston","1760 Potansiyometre","1770 Pres","1780 Program/PLC","1790 Redüktör","1810 Röle","1820 Rulman","1830 Salmastra","1840 Segman","1850 Sensör","1860 Servo Motor","1870 Sızdırmazlık Elemanları","1880 Sigorta","1890 Siviç","1910 Sürücü","1920 Şaft","1930 Şalter","1990 Termik","2020 Trafo","2030 Vana","2040 Varyatör","2070 Yay","2080 Zaman Kayışı","2090 Zincir Mekanizması","2130 Keçe","2220 Valf","2240 Yağ sistemi","2260 Rekor","2270 Kılavuz","2280 Kama"],"SİLİNDİRLER":["1020 Bant","1080 Burç","1090 Buton","1120 Civata","1130 Conta","1170 Dişli","1180 Ekran","1200 Elektronik Kart","1210 Enkoder","1230 Fan","1240 Fırça","1250 Filtre","1270 Fotosel","1280 Fren","1290 Güç Kaynağı","1360 Kablo","1390 Kaplin","1400 Kayış/Kasnak","1430 Kızak","1500 Kontaktör","1520 Konveyör Bant","1550 Kumanda","1590 Makara","1650 Mil","1660 Modül","1670 Motor","1690 O-ring","1710 PC","1720 Pil","1730 Pim","1780 Program/PLC","1790 Redüktör","1810 Röle","1820 Rulman","1830 Salmastra","1840 Segman","1850 Sensör","1860 Servo Motor (servo kontrollü sistemlerde)","1870 Sızdırmazlık Elemanları","1880 Sigorta","1890 Siviç","1910 Sürücü","1920 Şaft","1930 Şalter","1990 Termik","2020 Trafo","2040 Varyatör","2070 Yay","2080 Zaman Kayışı","2090 Zincir Mekanizması","2130 Keçe","2240 Yağ sistemi","2270 Kılavuz","2280 Kama"],"FIRIN":["1020 Bant","1050 Blower","1060 Boru","1110 Cidar borusu","1120 Civata","1130 Conta","1170 Dişli","1200 Elektronik Kart","1210 Enkoder","1220 Eşanjör","1230 Fan","1250 Filtre","1270 Fotosel","1290 Güç Kaynağı","1300 Hava Hortum/Tesisat","1510 Isıtıcı Kollektör","1360 Kablo","2280 Kama","1390 Kaplin","1400 Kayış/Kasnak","1440 Klepe (hava damperi)","1480 Kondensör (ısı geri kazanım/soğutma sistemi varsa)","1490 Kondenstop (buharlı sistemlerde)","1500 Kontaktör","1520 Konveyör Bant","1540 Körük","1550 Kumanda","1600 Manifold","1610 Manometre","1650 Mil","1670 Motor","1680 Nozul (brülörlü fırınlarda)","1690 O-ring","1780 Program/PLC","1790 Redüktör","2260 Rekor","1800 Rezistans (elektrikli fırınlarda)","1810 Röle","2340 Rotary Valf (yakıt veya hava besleme sisteminde varsa)","1820 Rulman","1830 Salmastra","1850 Sensör","1860 Servo Motor (bazı sistemlerde)","2320 Serpantin","1880 Sigorta","1870 Sızdırmazlık Elemanları","1900 Su Hortum/Tesisat","1910 Sürücü","1890 Switch","1920 Şaft","1930 Şalter","1970 Tel Bant","1990 Termik","2000 Termometre","2010 Termostat","2020 Trafo","2030 Vana","2220 Valf","2040 Varyatör","2070 Yay","2240 Yağ Sistemi","2090 Zincir Mekanizması","1070 Buhar Hortum/Tesisat (buharlı sistem varsa)"],"TAMBUR":["1120 Civata","1130 Conta","1170 Dişli","1210 Enkoder","1230 Fan","1270 Fotosel","1280 Fren","1290 Güç Kaynağı","1360 Kablo","1390 Kaplin","1400 Kayış/Kasnak","1500 Kontaktör","1520 Konveyör Bant","1550 Kumanda","1590 Makara","1650 Mil","1660 Modül","1670 Motor","1690 O-ring","1730 Pim","1780 Program/PLC","1790 Redüktör","1810 Röle","1820 Rulman","1830 Salmastra","1840 Segman","1850 Sensör","1860 Servo Motor (servo tahrikli tamburlarda)","1870 Sızdırmazlık Elemanları","1880 Sigorta","1890 Siviç","1910 Sürücü","1920 Şaft","1930 Şalter","1960 Tambur","1970 Tel Bant","1990 Termik","2020 Trafo","2040 Varyatör","2070 Yay","2080 Zaman Kayışı (varsa)","2090 Zincir Mekanizması","2130 Keçe","2240 Yağ sistemi"],"DEDEKTÖR":["1020 Bant","1090 Buton","1120 Civata","1130 Conta","1180 Ekran","1200 Elektronik Kart","1210 Enkoder (konveyörlü sistemlerde)","1270 Fotosel","1290 Güç Kaynağı","1360 Kablo","1390 Kaplin (konveyörlü sistemlerde)","1400 Kayış/Kasnak (konveyörlü sistemlerde)","1500 Kontaktör","1520 Konveyör Bant","1550 Kumanda","1650 Mil (konveyörlü sistemlerde)","1660 Modül","1670 Motor (konveyörlü sistemlerde)","1710 PC","1720 Pil","1760 Potansiyometre (varsa)","1780 Program/PLC","1810 Röle","1820 Rulman (konveyörlü sistemlerde)","1850 Sensör","1880 Sigorta","1890 Siviç","1910 Sürücü","1930 Şalter","1990 Termik","2000 Termometre (bazı modellerde)","2010 Termostat (bazı modellerde)","2020 Trafo","2040 Varyatör (konveyör hız kontrollü ise)"],"SİGRES":["2140 Asker","1020 Bant","2190 Baskı aparatı","1040 Bıçak","2180 Bobin aktarma grubu","1080 Burç","1090 Buton","1120 Civata","1130 Conta","1140 Çene","1170 Dişli","1180 Ekran","1200 Elektronik Kart","1210 Enkoder","1230 Fan","2120 Folyo çekme grubu","1270 Fotosel","1280 Fren","1290 Güç Kaynağı","1300 Hava Hortum/Tesisat","1340 İtici","1350 İzolatör","1360 Kablo","1380 Kam Mekanizması","2280 Kama","1390 Kaplin","2200 Katlama grubu","1400 Kayış/Kasnak","2130 Keçe","2270 Kılavuz","1430 Kızak","1500 Kontaktör","1520 Konveyör Bant","1550 Kumanda","1560 Kuyruk Mili","1590 Makara","2160 Makas","1600 Manifolt","1610 Manometre","1650 Mil","1660 Modül","1670 Motor","1680 Nozul","1690 Oring","1710 PC","1730 Pim","1740 Piston","1760 Potansiyometre","1780 Program/PLC","1790 Redüktör","2260 Rekor","1800 Rezistans","1810 Röle","1820 Rulman","1840 Segman","1850 Sensör","1860 Servo Motor","1870 Sızdırmazlık Elemanı","1880 Sigorta","1890 Siviç","2170 Stoper","1910 Sürücü","1920 Şaft","1930 Şalter","1950 Şartlandırıcı","1960 Tambur","1620 Tarih Kodlama","1990 Termik","2010 Termostat","2020 Trafo","2210 Vakum üretici","2220 Valf","2230 Vantuz","2040 Varyatör","2240 Yağ sistemi","2070 Yay","2080 Zaman Kayışı","2090 Zincir Mekanizması"],"SOLLAS":["1020 Bant","2190 Baskı aparatı","1040 Bıçak","2180 Bobin aktarma grubu","1080 Burç","1090 Buton","1120 Civata","1130 Conta","1140 Çene","2300 Dış kağıt grubu","1170 Dişli","1180 Ekran","1200 Elektronik Kart","1210 Enkoder","1230 Fan","1250 Filtre","1260 Flep","2120 Folyo çekme grubu","1270 Fotosel","1280 Fren","1290 Güç Kaynağı","1300 Hava Hortum/Tesisat","1340 İtici","1350 İzolatör","1360 Kablo","2280 Kama","1380 Kam Mekanizması","1390 Kaplin","2200 Katlama grubu","1400 Kayış/Kasnak","2130 Keçe","2270 Kılavuz","1430 Kızak","1500 Kontaktör","1520 Konveyör Bant","1550 Kumanda","1570 Magazin","2160 Makas","1590 Makara","1600 Manifolt","1610 Manometre","1650 Mil","1660 Modül","1670 Motor","1680 Nozul","1690 Oring","1710 PC","1730 Pim","1740 Piston","1760 Potansiyometre","1780 Program/PLC","1790 Redüktör","2260 Rekor","1800 Rezistans","1810 Röle","1820 Rulman","1840 Segman","1850 Sensör","1860 Servo Motor","1880 Sigorta","1890 Siviç","1870 Sızdırmazlık Elemanı","2170 Stoper","1910 Sürücü","1920 Şaft","1930 Şalter","1950 Şartlandırıcı","1960 Tambur","1620 Tarih Kodlama","1990 Termik","2010 Termostat","2020 Trafo","2210 Vakum üretici","2220 Valf","2230 Vantuz","2040 Varyatör","2240 Yağ sistemi","2250 Yapıştırma grubu","2070 Yay","2080 Zaman Kayışı","2090 Zincir Mekanizması"],"OLİ":["1020 Bant","1040 Bıçak","1080 Burç","1090 Buton","1120 Civata","1130 Conta","1170 Dişli","1180 Ekran","1200 Elektronik Kart","1210 Enkoder","1230 Fan","1250 Filtre","1260 Flep","1270 Fotosel","1280 Fren","1290 Güç Kaynağı","1300 Hava Hortum/Tesisat","1330 Holt melt","1510 Isıtıcı Kollektör","1340 İtici","1350 İzolatör","1360 Kablo","2280 Kama","1380 Kam Mekanizması","1390 Kaplin","2200 Katlama grubu","1400 Kayış/Kasnak","2270 Kılavuz","1430 Kızak","1450 Klima","1500 Kontaktör","1520 Konveyör Bant","1550 Kumanda","1560 Kuyruk Mili","1570 Magazin","1590 Makara","1600 Manifolt","1610 Manometre","1650 Mil","1660 Modül","1670 Motor","1680 Nozul","1690 Oring","1730 Pim","1740 Piston","1750 Pompa","2330 Pot","1760 Potansiyometre","1770 Pres","1780 Program/PLC","1790 Redüktör","2260 Rekor","1800 Rezistans","1810 Röle","1820 Rulman","1840 Segman","1850 Sensör","1860 Servo Motor","1880 Sigorta","1890 Siviç","1870 Sızdırmazlık Elemanı","2170 Stoper","1910 Sürücü","1920 Şaft","1930 Şalter","1950 Şartlandırıcı","1960 Tambur","1990 Termik","2010 Termostat","2020 Trafo","2110 Tutkal grubu","2210 Vakum üretici","2220 Valf","2030 Vana","2230 Vantuz","2040 Varyatör","2240 Yağ sistemi","2250 Yapıştırma grubu","2070 Yay","2080 Zaman Kayışı","2090 Zincir Mekanizması"]};
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;800&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');

.app{
  --bg:#12161C; --surface:#1B2129; --surface2:#232B35; --line:#333D4A;
  --ink:#F2F5F8; --muted:#93A1B2;
  --wheat:#F0B429; --green:#2FBF71; --red:#E5484D; --blue:#4C9AFF; --amber:#F2994A;
  background:var(--bg); color:var(--ink); min-height:100vh;
  font-family:'IBM Plex Sans',system-ui,sans-serif; font-size:17px; line-height:1.45;
  -webkit-font-smoothing:antialiased;
}
.app *{box-sizing:border-box}
.app h1,.app h2,.app h3{font-family:'Archivo',sans-serif;font-weight:800;letter-spacing:-.02em;margin:0}
.app h1{font-size:28px} .app h2{font-size:24px} .app h3{font-size:18px}
.muted{color:var(--muted);margin:2px 0 0}
.sm{font-size:14px}
.mono{font-family:'IBM Plex Mono',monospace;font-size:14px}
.center-txt{text-align:center}

.screen{max-width:1400px;margin:0 auto;padding:20px 24px 130px;display:flex;flex-direction:column;gap:20px}
.screen.center{min-height:80vh;justify-content:center;align-items:center}

.card{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:20px}

/* rail */
.rail{display:flex;gap:4px;padding:14px 24px;background:var(--surface);border-bottom:1px solid var(--line);overflow-x:auto}
.rail-node{display:flex;align-items:center;gap:8px;padding:6px 14px 6px 6px;border-radius:99px;color:var(--muted);font-size:14px;white-space:nowrap}
.rail-node.active{background:var(--surface2);color:var(--ink);font-weight:600}
.rail-dot{width:26px;height:26px;border-radius:50%;background:var(--surface2);display:grid;place-items:center;font-size:13px;font-weight:700;border:1px solid var(--line)}
.rail-node.active .rail-dot{background:var(--wheat);color:#12161C;border-color:var(--wheat)}
.rail-node.done .rail-dot{background:var(--green);color:#0C1A12;border-color:var(--green)}

/* buttons */
.btn{font-family:'Archivo',sans-serif;font-weight:700;border:none;border-radius:12px;cursor:pointer;
  padding:14px 22px;font-size:17px;transition:transform .08s,filter .15s;min-height:52px}
.btn:active{transform:translateY(1px)}
.btn:disabled{opacity:.35;cursor:not-allowed}
.btn-xl{padding:18px 30px;font-size:19px;min-height:64px}
.btn-huge{padding:34px;font-size:26px;width:100%;min-height:110px}
.btn-primary{background:var(--wheat);color:#12161C}
.btn-success{background:var(--green);color:#08170F}
.btn-danger{background:var(--red);color:#fff}
.btn-dark{background:var(--surface2);color:var(--ink);border:1px solid var(--line)}
.btn-ghost{background:transparent;color:var(--muted);border:1px solid var(--line)}
.btn-outline{background:transparent;color:var(--wheat);border:2px solid var(--wheat);font-size:15px;padding:10px 18px;min-height:44px}

.input{width:100%;background:var(--bg);border:2px solid var(--line);border-radius:10px;color:var(--ink);
  padding:14px 16px;font-size:17px;font-family:inherit;outline:none}
.input:focus{border-color:var(--wheat)}
.input.big{font-size:24px;padding:18px;text-align:center;font-family:'IBM Plex Mono',monospace;letter-spacing:.06em}
.input-err{border-color:var(--red)}
.err-txt{color:var(--red);font-size:14px;margin:0}
.area{resize:vertical;line-height:1.5}
.lbl{font-size:14px;color:var(--muted);font-weight:600;text-transform:uppercase;letter-spacing:.08em}

/* login */
.login-card{width:min(460px,100%);display:flex;flex-direction:column;gap:14px;padding:32px}
.brand{display:flex;gap:14px;align-items:center;margin-bottom:6px}
.brand-mark{width:52px;height:52px;border-radius:12px;background:var(--wheat);color:#12161C;
  display:grid;place-items:center;font-family:'Archivo';font-weight:800;font-size:20px}
.demo-ids{display:flex;flex-wrap:wrap;gap:8px;border-top:1px solid var(--line);padding-top:14px}
.chip{background:var(--surface2);border:1px solid var(--line);color:var(--muted);border-radius:99px;
  padding:8px 14px;font-size:13px;cursor:pointer;font-family:inherit}
.chip:hover{color:var(--ink)}

/* topbar */
.topbar{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;flex-wrap:wrap}
.progress-wrap{display:flex;align-items:center;gap:12px;min-width:220px}
.progress{flex:1;height:12px;background:var(--surface2);border-radius:99px;overflow:hidden}
.progress-fill{height:100%;background:var(--wheat);transition:width .3s}
.progress-txt{font-family:'IBM Plex Mono';font-size:15px;color:var(--muted)}

/* CLIT */
.clit-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(360px,1fr));gap:16px}
.group-card{display:flex;flex-direction:column;gap:12px}
.group-head{display:flex;align-items:center;gap:12px;padding-bottom:12px;border-bottom:1px solid var(--line)}
.group-letter{width:44px;height:44px;border-radius:10px;background:var(--surface2);border:1px solid var(--line);
  display:grid;place-items:center;font-family:'Archivo';font-weight:800;font-size:20px;color:var(--wheat)}
.group-icon{margin-left:auto;font-size:22px;opacity:.7}
.task{background:var(--bg);border:1px solid var(--line);border-radius:10px;padding:14px;border-left:4px solid var(--line)}
.task-ok{border-left-color:var(--green)}
.task-fix{border-left-color:var(--blue)}
.task-error{border-left-color:var(--red)}
.task-txt{margin:0 0 12px;font-size:16px}
.tri{display:grid;grid-template-columns:1fr 1.2fr 1fr;gap:6px}
.tri-btn{padding:12px 6px;border-radius:8px;border:2px solid var(--line);background:var(--surface2);
  color:var(--muted);font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;min-height:48px}
.tri-btn.ok.on{background:var(--green);border-color:var(--green);color:#08170F}
.tri-btn.fix.on{background:var(--blue);border-color:var(--blue);color:#06182E}
.tri-btn.err.on{background:var(--red);border-color:var(--red);color:#fff}

.sticky-foot{position:fixed;left:0;right:0;bottom:0;background:rgba(19,23,29,.96);backdrop-filter:blur(8px);
  border-top:1px solid var(--line);padding:14px 24px;display:flex;justify-content:space-between;
  align-items:center;gap:16px;flex-wrap:wrap;z-index:20}

/* production */
.run-state{display:flex;gap:18px;align-items:center}
.pulse{width:16px;height:16px;border-radius:50%;background:var(--green);flex:none;
  box-shadow:0 0 0 0 rgba(47,191,113,.6);animation:p 2s infinite}
@keyframes p{70%{box-shadow:0 0 0 16px rgba(47,191,113,0)}100%{box-shadow:0 0 0 0 rgba(47,191,113,0)}}
@media (prefers-reduced-motion:reduce){.pulse{animation:none}}

/* cascade */
.cascade{display:grid;grid-template-columns:1fr 1fr 1.1fr;gap:16px}
.col{display:flex;flex-direction:column;gap:12px;max-height:62vh}
.col-off{opacity:.4;pointer-events:none}
.col-head{display:flex;align-items:center;gap:10px;font-size:16px}
.num{width:28px;height:28px;border-radius:50%;background:var(--wheat);color:#12161C;display:grid;place-items:center;font-size:14px}
.count{margin-left:auto;font-family:'IBM Plex Mono';font-size:13px;color:var(--muted);font-weight:400}
.scroll{overflow-y:auto;display:flex;flex-direction:column;gap:6px;padding-right:4px}
.scroll-x{overflow-x:auto}
.row-btn{text-align:left;background:var(--bg);border:1px solid var(--line);border-radius:9px;
  padding:14px 16px;color:var(--ink);font-size:15px;cursor:pointer;font-family:inherit;min-height:50px}
.row-btn:hover{border-color:var(--muted)}
.row-btn.on{background:var(--wheat);color:#12161C;border-color:var(--wheat);font-weight:600}
.row-btn.code{display:flex;align-items:center;gap:10px}
.row-btn.code b{font-family:'IBM Plex Mono';min-width:52px}
.row-btn.code .pill{margin-left:auto}
.pad{padding:12px}

.pill{font-size:12px;font-weight:700;padding:4px 10px;border-radius:99px;letter-spacing:.03em}
.pill-green{background:rgba(47,191,113,.18);color:var(--green)}
.pill-amber{background:rgba(242,153,74,.18);color:var(--amber)}
.pill-blue{background:rgba(76,154,255,.18);color:var(--blue)}
.pill-slate{background:var(--surface2);color:var(--muted)}
.row-btn.on .pill{background:rgba(0,0,0,.15);color:#12161C}

/* verdict */
.verdict{width:min(620px,100%);text-align:center;display:flex;flex-direction:column;gap:14px;align-items:center;padding:40px;border-top:6px solid var(--line)}
.verdict-a{border-top-color:var(--green)}
.verdict-b{border-top-color:var(--amber)}
.verdict-ok{border-top-color:var(--green)}
.verdict-icon{font-size:52px}
.verdict-code{font-family:'IBM Plex Mono';font-size:19px;color:var(--wheat);margin:0}
.verdict-body{color:var(--muted);max-width:44ch;margin:6px 0}
.ticket{display:flex;gap:14px;align-items:center;background:var(--bg);border:1px dashed var(--amber);
  border-radius:10px;padding:14px 22px;font-family:'IBM Plex Mono';color:var(--amber)}

/* whys */
.whys{display:flex;flex-direction:column;gap:14px}
.why{border-left:4px solid var(--line)}
.why-active{border-left-color:var(--wheat)}
.why-past{opacity:.72}
.why-num{font-family:'Archivo';font-weight:800;font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:var(--wheat)}
.why-q{font-size:19px;font-weight:600;margin:8px 0 12px}
.why-a{background:var(--bg);border-radius:8px;padding:12px 14px;margin:0;color:var(--muted)}
.why-actions{display:flex;justify-content:space-between;align-items:center;gap:14px;margin-top:14px;flex-wrap:wrap}
.check{display:flex;align-items:center;gap:10px;cursor:pointer;font-weight:600}
.check input{width:24px;height:24px;accent-color:var(--green)}

/* intervention */
.timer{text-align:right;font-family:'IBM Plex Mono'}
.timer b{font-size:26px;color:var(--wheat)}
.cause-box ol{margin:10px 0 0;padding-left:22px;color:var(--muted)}
.cause-box li{margin:6px 0}
.fix-step{display:flex;align-items:center;gap:14px;padding:16px;margin-top:10px;background:var(--bg);
  border:1px solid var(--line);border-radius:10px;cursor:pointer;min-height:60px}
.fix-step.on{border-color:var(--green);background:rgba(47,191,113,.07)}
.fix-step input{width:26px;height:26px;accent-color:var(--green);flex:none}
.fix-num{width:28px;height:28px;border-radius:50%;background:var(--surface2);display:grid;place-items:center;
  font-family:'IBM Plex Mono';font-size:14px;flex:none}

/* kpi */
.kpi-row{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;margin:8px 0}
.kpi{background:var(--bg);border:1px solid var(--line);border-radius:10px;padding:16px 22px;display:flex;flex-direction:column;gap:2px}
.kpi-win{border-color:var(--green)}
.kpi-v{font-family:'Archivo';font-weight:800;font-size:24px}
.kpi-win .kpi-v{color:var(--green)}
.kpi-l{font-size:13px;color:var(--muted)}
.kpi-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:14px}
.kpi-card{display:flex;flex-direction:column;gap:4px;border-top:4px solid var(--line)}
.kpi-card.win{border-top-color:var(--green)}
.kpi-card.alert{border-top-color:var(--amber)}
.kpi-v.big{font-size:38px}

/* dashboard */
.dash-2col{display:grid;grid-template-columns:1.15fr .85fr;gap:16px}
.pareto{display:flex;flex-direction:column;gap:8px;margin:14px 0}
.pareto-row{display:grid;grid-template-columns:180px 1fr 34px 44px;align-items:center;gap:10px;font-size:14px}
.pareto-lbl{font-family:'IBM Plex Mono';font-size:13px}
.pareto-lbl em{font-style:normal;color:var(--muted);font-family:'IBM Plex Sans'}
.pareto-track{background:var(--bg);border-radius:4px;height:22px;overflow:hidden}
.pareto-bar{height:100%;border-radius:4px}
.bar-a{background:var(--green)} .bar-b{background:var(--amber)}
.pareto-n{font-family:'IBM Plex Mono';text-align:right}
.pareto-cum{font-family:'IBM Plex Mono';color:var(--muted);font-size:12px;text-align:right}

.tbl{width:100%;border-collapse:collapse;margin-top:10px;font-size:14px}
.tbl th{text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);
  padding:10px 12px;border-bottom:1px solid var(--line);font-weight:600;white-space:nowrap}
.tbl td{padding:12px;border-bottom:1px solid var(--line);white-space:nowrap}
.tbl tr:last-child td{border-bottom:none}

@media (max-width:1000px){
  .cascade{grid-template-columns:1fr}
  .col{max-height:none}
  .dash-2col{grid-template-columns:1fr}
  .pareto-row{grid-template-columns:130px 1fr 30px 40px}
}
@media (max-width:600px){
  .screen{padding:16px 14px 140px}
  .tri{grid-template-columns:1fr}
  .btn-huge{font-size:21px;padding:26px}
}
.app :focus-visible{outline:3px solid var(--wheat);outline-offset:2px}
`;

const HT = {
  HT01: { t: "Aşınma", route: "B" },
  HT02: { t: "Ayarsızlık", route: "A" },
  HT03: { t: "Deformasyon", route: "B" },
  HT04: { t: "Gevşeme", route: "A" },
  HT05: { t: "Haberleşme", route: "B" },
  HT06: { t: "Hatalı Bağlantı", route: "B" },
  HT07: { t: "Kırılma/Kopma", route: "B" },
  HT08: { t: "Program", route: "B" },
  HT09: { t: "Sıcaklık", route: "B" },
  HT10: { t: "Sızıntı/Kaçak", route: "B" },
  HT11: { t: "Tıkanma/Sıkışma", route: "A" },
  HT12: { t: "Yanma", route: "B" },
  HT13: { t: "Personel hatası", route: "A" },
  HT14: { t: "Temizlik eksikliği", route: "A" },
  HT15: { t: "Malzeme kaynaklı", route: "B" },
  YAG: { t: "Yağ seviyesi düşük", route: "A" },
};

const MACHINE_LIST = Object.keys(MACHINES);

const CLIT_TEMPLATE = {
  C: [
    "Bant yüzeyi ve kenar sıyırıcıları un/hamur artıklarından temizlendi",
    "Bıçak ve kalıp yüzeyi yapışkan kalıntıdan arındırıldı",
    "Fotosel ve sensör camları silindi",
    "Makine altı kırıntı toplama haznesi boşaltıldı",
  ],
  L: [
    "Zincir mekanizması gres kontrolü yapıldı",
    "Yağ sistemi seviye göstergesi MIN çizgisinin üstünde",
    "Rulman yağlama noktalarına gres basıldı",
  ],
  I: [
    "Bant gerginliği ve merkezleme görsel kontrolü",
    "Anormal ses / titreşim dinlemesi yapıldı",
    "Sızıntı, kaçak veya yağ damlası izi kontrolü",
    "Ekran üzerinde aktif alarm bulunmuyor",
    "Acil stop butonları ve koruma kapakları sağlam",
  ],
  T: [
    "Kapak ve muhafaza civataları elle kontrol edildi",
    "Kaplin ve kasnak setuskurları sıkı",
    "Rekor ve hortum bağlantılarında gevşeklik yok",
  ],
};

const CLIT_META = {
  C: { label: "Temizlik", en: "Cleaning", icon: "🧽" },
  L: { label: "Yağlama", en: "Lubrication", icon: "🛢️" },
  I: { label: "Kontrol", en: "Inspection", icon: "🔍" },
  T: { label: "Sıkma", en: "Tightening", icon: "🔩" },
};

const MAINT_ARRIVAL_MIN = 15;

const OPERATORS = {
  "OP-1042": { name: "Mehmet Yılmaz", machine: "BİSKÜVİ KALIP MAKİNESİ", shift: "Vardiya A" },
  "OP-2071": { name: "Ayşe Demir", machine: "FIRIN", shift: "Vardiya A" },
  "OP-3388": { name: "Kerem Aksoy", machine: "SOLLAS", shift: "Vardiya B" },
};

const uid = () => Math.random().toString(36).slice(2, 9).toUpperCase();
const now = () => new Date();
const fmt = (d) =>
  d ? new Date(d).toLocaleString("tr-TR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }) : "—";
const mins = (a, b) => Math.max(0, Math.round((new Date(b) - new Date(a)) / 60000));

/* ---------------- seed history for the dashboard ---------------- */
function seedRecords() {
  const seeds = [
    ["BİSKÜVİ KALIP MAKİNESİ", "1040 Bıçak", "HT14", 6, "A"],
    ["BİSKÜVİ KALIP MAKİNESİ", "1120 Civata", "HT04", 4, "A"],
    ["BİSKÜVİ KALIP MAKİNESİ", "1020 Bant", "HT02", 9, "A"],
    ["FIRIN", "1230 Fan", "HT04", 5, "A"],
    ["FIRIN", "1250 Filtre", "HT14", 7, "A"],
    ["FIRIN", "1220 Eşanjör", "HT09", null, "B"],
    ["SOLLAS", "1020 Bant", "HT02", 8, "A"],
    ["SOLLAS", "2190 Baskı aparatı", "HT13", 3, "A"],
    ["SOLLAS", "1400 Kayış/Kasnak", "HT01", null, "B"],
    ["HAMUR MİKSERİ", "2240 Yağ sistemi", "YAG", 5, "A"],
    ["HAMUR MİKSERİ", "1820 Rulman", "HT01", null, "B"],
    ["LAMİNASYON MAKİNESİ", "1020 Bant", "HT04", 4, "A"],
    ["LAMİNASYON MAKİNESİ", "1040 Bıçak", "HT14", 6, "A"],
    ["LAMİNASYON MAKİNESİ", "1130 Conta", "HT10", null, "B"],
    ["SİLİNDİRLER", "1120 Civata", "HT04", 3, "A"],
    ["SİLİNDİRLER", "1080 Burç", "HT03", null, "B"],
    ["TAMBUR", "1170 Dişli", "HT04", 6, "A"],
    ["DEDEKTÖR", "1270 Fotosel", "HT14", 4, "A"],
  ];
  const base = Date.now() - 6 * 864e5;
  return seeds.map((s, i) => {
    const start = new Date(base + i * 7.2e6);
    return {
      id: uid(),
      machine: s[0],
      part: s[1],
      code: s[2],
      route: s[4],
      operator: "OP-1042",
      start: start.toISOString(),
      end: s[3] ? new Date(start.getTime() + s[3] * 60000).toISOString() : null,
      status: s[3] ? "closed" : "escalated",
      causes: s[3] ? ["Vardiya sonu standardı uygulanmamış", "Kontrol formunda ilgili adım atlanmış"] : [],
    };
  });
}

/* ---------------- shared bits ---------------- */
function Pill({ tone = "slate", children }) {
  return <span className={"pill pill-" + tone}>{children}</span>;
}

function StepRail({ step }) {
  const steps = ["Giriş", "CLIT", "Bildirim", "Yönlendirme", "5 Neden", "Kapanış"];
  return (
    <div className="rail">
      {steps.map((s, i) => (
        <div key={s} className={"rail-node " + (i < step ? "done" : i === step ? "active" : "")}>
          <span className="rail-dot">{i < step ? "✓" : i + 1}</span>
          <span className="rail-label">{s}</span>
        </div>
      ))}
    </div>
  );
}

/* ---------------- 1. LOGIN ---------------- */
function Login({ onLogin }) {
  const [val, setVal] = useState("");
  const err = val.length >= 7 && !OPERATORS[val.toUpperCase()];
  return (
    <div className="screen center">
      <div className="card login-card">
        <div className="brand">
          <div className="brand-mark">OB</div>
          <div>
            <h1>Otonom Bakım Terminali</h1>
            <p className="muted">Bisküvi Üretim Hattı · Vardiya Başlangıcı</p>
          </div>
        </div>
        <label className="lbl">Operatör kartını okutun veya sicil no girin</label>
        <input
          className={"input big " + (err ? "input-err" : "")}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="OP-1042"
          autoFocus
        />
        {err && <p className="err-txt">Bu sicil no tanımlı değil. Vardiya amirine başvurun.</p>}
        <button
          className="btn btn-primary btn-xl"
          disabled={!OPERATORS[val.toUpperCase()]}
          onClick={() => onLogin(val.toUpperCase())}
        >
          Vardiyayı başlat
        </button>
        <div className="demo-ids">
          {Object.entries(OPERATORS).map(([id, o]) => (
            <button key={id} className="chip" onClick={() => setVal(id)}>
              {id} · {o.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- 2. CLIT CHECKLIST ---------------- */
function Clit({ op, onDone, onRaise }) {
  const [state, setState] = useState({});
  const all = useMemo(
    () => Object.entries(CLIT_TEMPLATE).flatMap(([k, v]) => v.map((t, i) => ({ key: k + i, group: k, text: t }))),
    []
  );
  const done = all.filter((t) => state[t.key]).length;
  const pct = Math.round((done / all.length) * 100);

  const set = (task, v) => {
    setState((s) => ({ ...s, [task.key]: v }));
    if (v === "error") onRaise(task);
  };

  return (
    <div className="screen">
      <header className="topbar">
        <div>
          <h2>Vardiya Başı CLIT Kontrolü</h2>
          <p className="muted">
            {op.name} · {op.machine} · {op.shift}
          </p>
        </div>
        <div className="progress-wrap">
          <div className="progress">
            <div className="progress-fill" style={{ width: pct + "%" }} />
          </div>
          <span className="progress-txt">
            {done}/{all.length}
          </span>
        </div>
      </header>

      <div className="clit-grid">
        {Object.entries(CLIT_TEMPLATE).map(([g, items]) => (
          <section key={g} className="card group-card">
            <div className="group-head">
              <span className="group-letter">{g}</span>
              <div>
                <h3>{CLIT_META[g].label}</h3>
                <p className="muted sm">{CLIT_META[g].en}</p>
              </div>
              <span className="group-icon">{CLIT_META[g].icon}</span>
            </div>
            {items.map((t, i) => {
              const task = { key: g + i, group: g, text: t };
              const v = state[task.key];
              return (
                <div key={task.key} className={"task " + (v ? "task-" + v : "")}>
                  <p className="task-txt">{t}</p>
                  <div className="tri">
                    <button className={"tri-btn ok " + (v === "ok" ? "on" : "")} onClick={() => set(task, "ok")}>
                      ✓ Uygun
                    </button>
                    <button className={"tri-btn fix " + (v === "fix" ? "on" : "")} onClick={() => set(task, "fix")}>
                      🔧 Müdahale ettim
                    </button>
                    <button className={"tri-btn err " + (v === "error" ? "on" : "")} onClick={() => set(task, "error")}>
                      ⚠️ Arıza
                    </button>
                  </div>
                </div>
              );
            })}
          </section>
        ))}
      </div>

      <div className="sticky-foot">
        <p className="muted">
          {done < all.length ? all.length - done + " adım bekliyor" : "Tüm adımlar işaretlendi"}
        </p>
        <button className="btn btn-primary btn-xl" disabled={done < all.length} onClick={onDone}>
          Kontrolü tamamla ve üretime geç
        </button>
      </div>
    </div>
  );
}

/* ---------------- 3. PRODUCTION / REPORT ---------------- */
function Production({ op, onReport, onDash, records }) {
  const open = records.filter((r) => r.status === "open").length;
  return (
    <div className="screen">
      <header className="topbar">
        <div>
          <h2>Üretim devam ediyor</h2>
          <p className="muted">
            {op.name} · {op.machine}
          </p>
        </div>
        <button className="btn btn-ghost" onClick={onDash}>
          Yönetici panosu
        </button>
      </header>
      <div className="run-state card">
        <div className="pulse" />
        <div>
          <h3>Hat çalışıyor</h3>
          <p className="muted">CLIT kontrolü tamamlandı. Bir anormallik fark ederseniz aşağıdaki butonu kullanın.</p>
        </div>
      </div>
      <button className="btn btn-danger btn-huge" onClick={onReport}>
        ⚠️ Anormallik bildir
      </button>
      <p className="muted center-txt">Bildirim anında kayıt açılır ve duruş süresi saymaya başlar.</p>
    </div>
  );
}

/* ---------------- 4. ERROR ENTRY (cascading) ---------------- */
function ErrorEntry({ op, onSubmit, onCancel }) {
  const [machine, setMachine] = useState(op.machine);
  const [part, setPart] = useState("");
  const [code, setCode] = useState("");
  const [q, setQ] = useState("");
  const parts = MACHINES[machine] || [];
  const filtered = q ? parts.filter((p) => p.toLocaleLowerCase("tr").includes(q.toLocaleLowerCase("tr"))) : parts;

  return (
    <div className="screen">
      <header className="topbar">
        <div>
          <h2>Anormallik bildirimi</h2>
          <p className="muted">Makine → Parça → Hata kodu sırasıyla seçin</p>
        </div>
        <button className="btn btn-ghost" onClick={onCancel}>
          Vazgeç
        </button>
      </header>

      <div className="cascade">
        <section className="card col">
          <h3 className="col-head">
            <span className="num">1</span> Makine
          </h3>
          <div className="scroll">
            {MACHINE_LIST.map((m) => (
              <button
                key={m}
                className={"row-btn " + (machine === m ? "on" : "")}
                onClick={() => {
                  setMachine(m);
                  setPart("");
                  setCode("");
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </section>

        <section className={"card col " + (!machine ? "col-off" : "")}>
          <h3 className="col-head">
            <span className="num">2</span> Parça <span className="count">{parts.length}</span>
          </h3>
          <input className="input" placeholder="Parça ara…" value={q} onChange={(e) => setQ(e.target.value)} />
          <div className="scroll">
            {filtered.map((p) => (
              <button
                key={p}
                className={"row-btn " + (part === p ? "on" : "")}
                onClick={() => {
                  setPart(p);
                  setCode("");
                }}
              >
                {p}
              </button>
            ))}
            {!filtered.length && <p className="muted pad">Eşleşen parça yok.</p>}
          </div>
        </section>

        <section className={"card col " + (!part ? "col-off" : "")}>
          <h3 className="col-head">
            <span className="num">3</span> Hata kodu
          </h3>
          <div className="scroll">
            {Object.entries(HT).map(([c, v]) => (
              <button key={c} className={"row-btn code " + (code === c ? "on" : "")} onClick={() => setCode(c)}>
                <b>{c === "YAG" ? "YAĞ" : c}</b> {v.t}
                <Pill tone={v.route === "A" ? "green" : "amber"}>{v.route === "A" ? "Otonom" : "Bakım"}</Pill>
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="sticky-foot">
        <p className="muted">
          {machine} {part && "· " + part} {code && "· " + code}
        </p>
        <button
          className="btn btn-primary btn-xl"
          disabled={!machine || !part || !code}
          onClick={() => onSubmit({ machine, part, code })}
        >
          Kaydı aç ve devam et
        </button>
      </div>
    </div>
  );
}

/* ---------------- 5. ROUTING ---------------- */
function Routing({ rec, onA, onB }) {
  const info = HT[rec.code];
  const isA = info.route === "A";
  return (
    <div className="screen center">
      <div className={"card verdict " + (isA ? "verdict-a" : "verdict-b")}>
        <span className="verdict-icon">{isA ? "🛠️" : "📡"}</span>
        <h2>{isA ? "Otonom müdahale kapsamında" : "Uzmanlık gerektiriyor"}</h2>
        <p className="verdict-code">
          {rec.code === "YAG" ? "YAĞ" : rec.code} · {info.t}
        </p>
        <p className="muted">
          {rec.machine} → {rec.part}
        </p>
        {isA ? (
          <>
            <p className="verdict-body">
              Bu hata operatör tarafından giderilebilir. Önce kök nedeni belirleyeceğiz, sonra CLIT standardına göre
              müdahale edeceksiniz.
            </p>
            <button className="btn btn-primary btn-xl" onClick={onA}>
              Kök neden analizine geç
            </button>
          </>
        ) : (
          <>
            <p className="verdict-body">
              Parça değişimi veya teknik uzmanlık gerekiyor. Operatör müdahalesi durduruldu. Bakım ekibine iş emri
              gönderildi.
            </p>
            <div className="ticket">
              <span>MAINGO iş emri</span>
              <b>#{rec.id}</b>
            </div>
            <button className="btn btn-dark btn-xl" onClick={onB}>
              Anladım, üretime dön
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------------- 6. FIVE WHYS ---------------- */
function FiveWhys({ rec, onDone }) {
  const [answers, setAnswers] = useState([""]);
  const [found, setFound] = useState(false);
  const label = HT[rec.code].t;

  const question = (i) =>
    i === 0
      ? `${rec.part} parçasında neden "${label}" oluştu?`
      : `Peki bu neden gerçekleşti: "${answers[i - 1]}"?`;

  const cur = answers.length - 1;
  const filled = answers[cur].trim().length > 2;

  return (
    <div className="screen">
      <header className="topbar">
        <div>
          <h2>Kök neden analizi · 5 Neden</h2>
          <p className="muted">
            {rec.machine} → {rec.part} · {rec.code === "YAG" ? "YAĞ" : rec.code} {label}
          </p>
        </div>
        <Pill tone="green">Otonom rota</Pill>
      </header>

      <div className="whys">
        {answers.map((a, i) => {
          const active = i === cur && !found;
          return (
            <div key={i} className={"card why " + (active ? "why-active" : "why-past")}>
              <div className="why-head">
                <span className="why-num">Neden {i + 1}</span>
              </div>
              <p className="why-q">{question(i)}</p>
              {active ? (
                <textarea
                  className="input area"
                  rows={2}
                  autoFocus
                  value={a}
                  onChange={(e) => setAnswers((s) => s.map((x, j) => (j === i ? e.target.value : x)))}
                  placeholder="Gözleminizi kendi cümlelerinizle yazın…"
                />
              ) : (
                <p className="why-a">{a}</p>
              )}
              {active && filled && (
                <div className="why-actions">
                  <label className="check">
                    <input type="checkbox" checked={found} onChange={(e) => setFound(e.target.checked)} />
                    <span>Kök nedeni buldum</span>
                  </label>
                  {answers.length < 5 && (
                    <button className="btn btn-outline" onClick={() => setAnswers((s) => [...s, ""])}>
                      Bir neden daha sor →
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {(found || answers.length === 5) && filled && (
        <div className="sticky-foot">
          <p className="muted">{answers.filter(Boolean).length} neden kaydedildi</p>
          <button className="btn btn-primary btn-xl" onClick={() => onDone(answers.filter((x) => x.trim()))}>
            Müdahale adımına geç
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------------- 7. INTERVENTION ---------------- */
const FIX_GUIDE = {
  HT14: ["Hattı durdurun ve enerjiyi kesin", "Parçayı standart temizlik seti ile temizleyin", "Yüzeyi kuru bezle silin, artık bırakmayın"],
  HT04: ["Enerjiyi kesin ve emniyete alın", "Bağlantı elemanını tork anahtarı ile standart değere sıkın", "Emniyet pulunu kontrol edin"],
  HT02: ["Referans ölçüyü CLIT kartından okuyun", "Ayar vidasını kademeli çevirin", "Boşta bir tur döndürüp ölçüyü doğrulayın"],
  HT11: ["Hattı durdurun", "Sıkışan malzemeyi elle değil aparatla alın", "Geçiş yolunu temizleyip serbestliği kontrol edin"],
  HT13: ["Doğru çalışma adımını CLIT kartından teyit edin", "İşlemi standarda göre tekrarlayın", "Vardiya amirine bilgi verin"],
  YAG: ["Yağ tipini etiketten doğrulayın", "MAX çizgisine kadar tamamlayın", "Sızıntı olup olmadığını kontrol edin"],
};

function Intervention({ rec, onClose }) {
  const [ticks, setTicks] = useState({});
  const steps = FIX_GUIDE[rec.code] || FIX_GUIDE.HT14;
  const ready = steps.every((_, i) => ticks[i]);
  const [elapsed, setElapsed] = useState(mins(rec.start, now()));
  useEffect(() => {
    const t = setInterval(() => setElapsed(mins(rec.start, now())), 20000);
    return () => clearInterval(t);
  }, [rec.start]);

  return (
    <div className="screen">
      <header className="topbar">
        <div>
          <h2>Otonom müdahale</h2>
          <p className="muted">
            {rec.machine} → {rec.part}
          </p>
        </div>
        <div className="timer">
          <span className="muted sm">Duruş</span>
          <b>{elapsed} dk</b>
        </div>
      </header>

      <div className="card cause-box">
        <h3>Kaydedilen kök nedenler</h3>
        <ol>
          {rec.causes.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ol>
      </div>

      <div className="card">
        <h3>CLIT standardına göre uygulayın</h3>
        {steps.map((s, i) => (
          <label key={i} className={"fix-step " + (ticks[i] ? "on" : "")}>
            <input type="checkbox" checked={!!ticks[i]} onChange={(e) => setTicks((t) => ({ ...t, [i]: e.target.checked }))} />
            <span className="fix-num">{i + 1}</span>
            <span>{s}</span>
          </label>
        ))}
      </div>

      <div className="sticky-foot">
        <p className="muted">{ready ? "Tüm adımlar uygulandı" : "Adımları uyguladıkça işaretleyin"}</p>
        <button className="btn btn-success btn-xl" disabled={!ready} onClick={onClose}>
          ✓ Müdahaleyi tamamla ve hattı başlat
        </button>
      </div>
    </div>
  );
}

/* ---------------- 8. CLOSED ---------------- */
function Closed({ rec, onBack }) {
  const dur = mins(rec.start, rec.end);
  const saved = Math.max(0, MAINT_ARRIVAL_MIN - dur);
  return (
    <div className="screen center">
      <div className="card verdict verdict-ok">
        <span className="verdict-icon">✅</span>
        <h2>Kayıt kapatıldı</h2>
        <p className="muted">
          {rec.machine} → {rec.part} · {rec.code === "YAG" ? "YAĞ" : rec.code}
        </p>
        <div className="kpi-row">
          <div className="kpi">
            <span className="kpi-v">{dur} dk</span>
            <span className="kpi-l">Fiili duruş</span>
          </div>
          <div className="kpi">
            <span className="kpi-v">{MAINT_ARRIVAL_MIN} dk</span>
            <span className="kpi-l">Bakım ekibi standardı</span>
          </div>
          <div className="kpi kpi-win">
            <span className="kpi-v">+{saved} dk</span>
            <span className="kpi-l">Kazanılan üretim</span>
          </div>
        </div>
        <p className="verdict-body">
          Onarım bitiş saati {fmt(rec.end)} olarak veritabanına yazıldı.
        </p>
        <button className="btn btn-primary btn-xl" onClick={onBack}>
          Üretime dön
        </button>
      </div>
    </div>
  );
}

/* ---------------- 9. DASHBOARD ---------------- */
function Dashboard({ records, onBack }) {
  const closed = records.filter((r) => r.status === "closed" && r.end);
  const mttr = closed.length ? Math.round(closed.reduce((a, r) => a + mins(r.start, r.end), 0) / closed.length) : 0;
  const saved = closed.reduce((a, r) => a + Math.max(0, MAINT_ARRIVAL_MIN - mins(r.start, r.end)), 0);
  const esc = records.filter((r) => r.status === "escalated").length;
  const autoRate = records.length ? Math.round((closed.length / records.length) * 100) : 0;

  const byCode = {};
  records.forEach((r) => (byCode[r.code] = (byCode[r.code] || 0) + 1));
  const pareto = Object.entries(byCode).sort((a, b) => b[1] - a[1]);
  const total = records.length || 1;
  let cum = 0;
  const paretoRows = pareto.map(([c, n]) => {
    cum += n;
    return { c, n, cum: Math.round((cum / total) * 100) };
  });

  const byMachine = {};
  records.forEach((r) => {
    byMachine[r.machine] = byMachine[r.machine] || { n: 0, a: 0, dt: 0 };
    byMachine[r.machine].n++;
    if (r.route === "A") byMachine[r.machine].a++;
    if (r.end) byMachine[r.machine].dt += mins(r.start, r.end);
  });
  const machineRows = Object.entries(byMachine).sort((a, b) => b[1].n - a[1].n);
  const maxN = Math.max(...pareto.map((p) => p[1]), 1);

  return (
    <div className="screen">
      <header className="topbar">
        <div>
          <h2>Yönetici panosu</h2>
          <p className="muted">Son 7 gün · Bisküvi hattı</p>
        </div>
        <button className="btn btn-ghost" onClick={onBack}>
          Terminale dön
        </button>
      </header>

      <div className="kpi-grid">
        <div className="card kpi-card">
          <span className="kpi-v big">{mttr} dk</span>
          <span className="kpi-l">Ortalama MTTR (otonom)</span>
        </div>
        <div className="card kpi-card win">
          <span className="kpi-v big">+{saved} dk</span>
          <span className="kpi-l">Net kazanılan üretim süresi</span>
        </div>
        <div className="card kpi-card">
          <span className="kpi-v big">{autoRate}%</span>
          <span className="kpi-l">Otonom çözüm oranı</span>
        </div>
        <div className="card kpi-card alert">
          <span className="kpi-v big">{esc}</span>
          <span className="kpi-l">MAINGO'ya devredilen</span>
        </div>
      </div>

      <div className="dash-2col">
        <section className="card">
          <h3>Pareto · Hata kodu dağılımı</h3>
          <div className="pareto">
            {paretoRows.map((r) => (
              <div key={r.c} className="pareto-row">
                <span className="pareto-lbl">
                  {r.c === "YAG" ? "YAĞ" : r.c} <em>{HT[r.c].t}</em>
                </span>
                <div className="pareto-track">
                  <div
                    className={"pareto-bar " + (HT[r.c].route === "A" ? "bar-a" : "bar-b")}
                    style={{ width: (r.n / maxN) * 100 + "%" }}
                  />
                </div>
                <span className="pareto-n">{r.n}</span>
                <span className="pareto-cum">{r.cum}%</span>
              </div>
            ))}
          </div>
          <p className="muted sm">Yeşil: operatörün otonom kapattığı · Amber: bakım ekibine giden</p>
        </section>

        <section className="card">
          <h3>Makine bazlı kronik durum</h3>
          <table className="tbl">
            <thead>
              <tr>
                <th>Makine</th>
                <th>Kayıt</th>
                <th>Otonom</th>
                <th>Duruş</th>
              </tr>
            </thead>
            <tbody>
              {machineRows.map(([m, v]) => (
                <tr key={m}>
                  <td>{m}</td>
                  <td>{v.n}</td>
                  <td>
                    <Pill tone={v.a / v.n > 0.6 ? "green" : "amber"}>{Math.round((v.a / v.n) * 100)}%</Pill>
                  </td>
                  <td>{v.dt} dk</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      <section className="card">
        <h3>Kayıt tablosu</h3>
        <div className="scroll-x">
          <table className="tbl">
            <thead>
              <tr>
                <th>ID</th>
                <th>Makine</th>
                <th>Parça</th>
                <th>Kod</th>
                <th>Başlangıç</th>
                <th>Bitiş</th>
                <th>Süre</th>
                <th>Durum</th>
              </tr>
            </thead>
            <tbody>
              {[...records].reverse().map((r) => (
                <tr key={r.id}>
                  <td className="mono">{r.id}</td>
                  <td>{r.machine}</td>
                  <td>{r.part}</td>
                  <td className="mono">{r.code === "YAG" ? "YAĞ" : r.code}</td>
                  <td>{fmt(r.start)}</td>
                  <td>{fmt(r.end)}</td>
                  <td>{r.end ? mins(r.start, r.end) + " dk" : "—"}</td>
                  <td>
                    <Pill tone={r.status === "closed" ? "green" : r.status === "open" ? "blue" : "amber"}>
                      {r.status === "closed" ? "Kapandı" : r.status === "open" ? "Açık" : "MAINGO"}
                    </Pill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

/* ---------------- ROOT ---------------- */
export default function App() {
  const [opId, setOpId] = useState(null);
  const [view, setView] = useState("login");
  const [records, setRecords] = useState(seedRecords);
  const [active, setActive] = useState(null);
  const op = opId ? OPERATORS[opId] : null;

  const stepIndex = { login: 0, clit: 1, prod: 2, entry: 2, route: 3, whys: 4, fix: 5, closed: 5, dash: 5 }[view];

  const openRecord = ({ machine, part, code }) => {
    const rec = {
      id: uid(),
      machine,
      part,
      code,
      route: HT[code].route,
      operator: opId,
      start: now().toISOString(),
      end: null,
      status: "open",
      causes: [],
    };
    setRecords((r) => [...r, rec]);
    setActive(rec);
    setView("route");
  };

  const escalate = () => {
    setRecords((r) => r.map((x) => (x.id === active.id ? { ...x, status: "escalated" } : x)));
    setActive(null);
    setView("prod");
  };

  const saveCauses = (causes) => {
    const upd = { ...active, causes };
    setActive(upd);
    setRecords((r) => r.map((x) => (x.id === upd.id ? upd : x)));
    setView("fix");
  };

  const closeRecord = () => {
    const upd = { ...active, end: now().toISOString(), status: "closed" };
    setActive(upd);
    setRecords((r) => r.map((x) => (x.id === upd.id ? upd : x)));
    setView("closed");
  };

  return (
    <div className="app">
      <style>{CSS}</style>
      {view !== "login" && view !== "dash" && <StepRail step={stepIndex} />}
      {view === "login" && (
        <Login
          onLogin={(id) => {
            setOpId(id);
            setView("clit");
          }}
        />
      )}
      {view === "clit" && op && (
        <Clit
          op={op}
          onDone={() => setView("prod")}
          onRaise={() => {}}
        />
      )}
      {view === "prod" && op && (
        <Production op={op} records={records} onReport={() => setView("entry")} onDash={() => setView("dash")} />
      )}
      {view === "entry" && op && <ErrorEntry op={op} onSubmit={openRecord} onCancel={() => setView("prod")} />}
      {view === "route" && active && <Routing rec={active} onA={() => setView("whys")} onB={escalate} />}
      {view === "whys" && active && <FiveWhys rec={active} onDone={saveCauses} />}
      {view === "fix" && active && <Intervention rec={active} onClose={closeRecord} />}
      {view === "closed" && active && (
        <Closed
          rec={active}
          onBack={() => {
            setActive(null);
            setView("prod");
          }}
        />
      )}
      {view === "dash" && <Dashboard records={records} onBack={() => setView(op ? "prod" : "login")} />}
    </div>
  );
}
