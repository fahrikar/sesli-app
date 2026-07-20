# Sesli & Görsel Kayıt + Stok Takibi

Sesli komut, kamera ile metin okuma (OCR), Word/Excel/PDF dışa aktarma, haftalık/aylık gruplu rapor,
çek ödeme hatırlatması ve stok takibi içeren tek dosyalık web uygulaması.

## Özellikler
- **Sesli komut:** Mikrofonu basılı tut → konuş → bırak. Konuşma Türkçe yazıya dökülür.
- **Kamera / OCR:** Fotoğraftaki yazıyı metne çevirir.
- **Otomatik kalem ayrıştırma:** "emanet 5000 ev gider 10000 çek 100000" → kategori + tutar olarak ayrılır.
- **Raporlar:** Haftalık / aylık döküm; tekrarlayan kategoriler gruplanır ve toplanır.
- **Dışa aktarma:** Word, Excel (Özet / Detay / Ham Kayıt sayfaları), PDF.
- **Çek ödemeleri:** Ödemeden 1 gün önce hatırlatma.
- **Stok takibi:** Fabrika Giderleri, Söve ve Boya Hammaddeleri, İnşaat Malzemeleri;
  giriş/çıkış hareketleri, kritik seviye uyarısı, Excel çıktısı.

## Kullanım
`index.html` dosyasını bir tarayıcıda aç. Mikrofon ve kamera için **https** adres gerekir
(GitHub Pages bunu sağlar).

## Yayınlama (GitHub Pages)
Settings → Pages → Branch: `main` / root → Save.
Birkaç dakika içinde `https://<kullanıcı-adı>.github.io/<depo-adı>/` adresinden açılır.

## Notlar
- Canlı ses tanıma Android Chrome ve masaüstü Chrome'da çalışır; iPhone/Safari desteklemez.
- Uygulama tamamen kapalıyken arka plan bildirimi gönderilmez; hatırlatma uygulama açılınca görünür.
- Veriler tarayıcıda saklanır.
