import { defineCategory } from "./defineCategory.js";

export const TECHNOLOGY_CARDS = defineCategory("technology", [
  { common: ["Bilgisayar", "Dijital"], rows: `
Klavye|Tuş|Yazmak|Enter
Fare|Tıklamak|İmleç|Kablosuz
Monitör|Ekran|Görüntü|Masa
İşlemci|Çip|Hız|Çekirdek
Anakart|Devre|İşlemci|Bağlantı
Ekran Kartı|Grafik|Oyun|Görüntü
Bellek|RAM|Veri|Geçici
Sabit Disk|Depolama|Dosya|Döner
SSD|Depolama|Hızlı|Disk
USB Bellek|Taşınabilir|Dosya|Takmak
Yazıcı|Kağıt|Mürekkep|Baskı
Tarayıcı|Belge|Dijitalleştirmek|Cam
Web Kamerası|Görüntü|Görüşme|Lens
Mikrofon|Ses|Kayıt|Konuşmak
Hoparlör|Ses|Müzik|Bas
Kulaklık|Dinlemek|Kablo|Ses
Modem|İnternet|Işık|Bağlantı
Yönlendirici|Wi-Fi|Ağ|Modem
Web Sunucusu|Veri|İstemci|Barındırmak
Veri Merkezi|Sunucu|Soğutma|Raf
Güç Kaynağı|Elektrik|Kasa|Watt
Soğutucu|Fan|Isı|İşlemci
Dizüstü Bilgisayar|Katlamak|Taşınabilir|Pil
Tablet|Dokunmatik|Kalem|Ekran
Akıllı Saat|Bilek|Bildirim|Adım
Oyun Konsolu|Kumanda|Televizyon|Eğlence
Oyun Kolu|Tuş|Konsol|Titreşim
Drone|Uçmak|Kamera|Pervane
Üç Boyutlu Yazıcı|Katman|Filament|Model
Sanal Gerçeklik Gözlüğü|Başlık|Oyun|Sanal
` },
  { common: ["İnternet", "Dijital"], rows: `
Web Sitesi|Sayfa|Adres|Tarayıcı
Arama Motoru|Sorgu|Sonuç|Google
E-posta|Gelen kutusu|Adres|Göndermek
Sosyal Medya|Paylaşım|Takipçi|Gönderi
Profil|Hesap|Fotoğraf|Biyografi
Kullanıcı Adı|Hesap|Giriş|Takma ad
Şifre|Gizli|Giriş|Güvenlik
İki Aşamalı Doğrulama|Kod|Güvenlik|Telefon
Bildirim|Uyarı|Telefon|Ses
Mesajlaşma|Sohbet|Yazmak|Göndermek
Görüntülü Görüşme|Kamera|Ekran|Konuşmak
Canlı Yayın|İzlemek|Anlık|Kamera
Podcast|Ses|Bölüm|Dinlemek
Akış Hizmeti|Film|Dizi|Abonelik
Bulut Depolama|Dosya|Yedek|Uzak
İndirme|Dosya|Kaydetmek|Bağlantı
Yükleme|Dosya|Göndermek|Sunucu
Bağlantı|Link|Tıklamak|Adres
Tarayıcı Sekmesi|Pencere|Sayfa|Açmak
Çerez|Site|İzin|Takip
Önbellek|Hız|Geçici|Veri
Güvenlik Duvarı|Koruma|Ağ|Engel
Bilgisayar Virüsü|Zararlı|Bulaşmak|Antivirüs
Kimlik Avı|Sahte|E-posta|Şifre
Spam|İstenmeyen|Posta|Reklam
QR Kod|Kare|Kamera|Okutmak
Barkod|Çizgi|Ürün|Kasiyer
Alan Adı|Site|Adres|Uzantı
Wi-Fi|Kablosuz|Modem|Bağlanmak
Bluetooth|Kablosuz|Eşleştirmek|Kulaklık
Mobil Veri|Telefon|Paket|Hücresel
Uçak Modu|Telefon|Bağlantı|Kapatmak
` },
  { common: ["Teknoloji", "Cihaz"], rows: `
Akıllı Telefon|Dokunmatik|Uygulama|Cep
Telsiz|Radyo|Konuşmak|Bas konuş
Uydu Telefonu|Çekim|Uzak|İletişim
Navigasyon|Harita|Rota|Konum
GPS|Uydu|Konum|Harita
Akıllı Ev|Otomasyon|Işık|Uzaktan
Robot Süpürge|Zemin|Şarj|Temizlik
Akıllı Ampul|Işık|Uygulama|Renk
Termostat|Sıcaklık|Isıtma|Ayar
Güvenlik Kamerası|Kayıt|İzlemek|Ev
Hareket Sensörü|Algılamak|Alarm|Kapı
Parmak İzi Okuyucu|Kimlik|Giriş|Güvenlik
Yüz Tanıma|Kamera|Kimlik|Kilit
Temassız Ödeme|Kart|Yaklaştırmak|Kasa
Elektronik Bilet|Giriş|Telefon|Kod
E-kitap Okuyucu|Sayfa|Mürekkep|Okumak
Taşınabilir Şarj Cihazı|Pil|Telefon|Kablo
Kablosuz Şarj|Telefon|Ped|Pil
Güneş Paneli|Enerji|Çatı|Elektrik
Rüzgâr Türbini|Pervane|Enerji|Elektrik
Elektrikli Araç Şarj İstasyonu|Otomobil|Fiş|Batarya
` },
  { common: ["Yazılım", "Kod"], rows: `
Uygulama|Telefon|İndirmek|Simge
İşletim Sistemi|Bilgisayar|Başlatmak|Program
Güncelleme|Yeni sürüm|İndirmek|Düzeltme
Hata Mesajı|Uyarı|Ekran|Sorun
Yedekleme|Kopya|Veri|Geri yüklemek
Veritabanı|Kayıt|Sorgu|Tablo
Algoritma|Adım|Çözüm|İşlem
Yapay Zeka|Öğrenme|Model|Makine
Makine Öğrenmesi|Veri|Eğitim|Tahmin
Kodlama|Program|Yazmak|Dil
Kaynak Kodu|Satır|Programcı|Dosya
Açık Kaynak|Paylaşım|Lisans|Herkese açık
Hata Ayıklama|Bug|Düzeltmek|Program
Sürüm Kontrolü|Değişiklik|Git|Geçmiş
Mobil Uygulama|Telefon|Ekran|İndirmek
Oyun Motoru|Grafik|Fizik|Geliştirme
` }
]);

