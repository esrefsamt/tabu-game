import { defineCategory } from "./defineCategory.js";

export const MEDIA_CARDS = defineCategory("media", [
  { common: ["Kitap", "Edebiyat"], rows: `
Roman|Kurgu|Uzun|Karakter
Öykü|Kısa|Hikâye|Yazar
Masal|Çocuk|Peri|Bir varmış
Destan|Kahraman|Uzun|Sözlü
Efsane|Halk|Olağanüstü|Anlatı
Fabl|Hayvan|Ders|Kısa
Şiir|Dize|Kafiye|Şair
Deneme|Düşünce|Yazar|Kısa
Biyografi|Hayat|Gerçek|Kişi
Otobiyografi|Kendi hayatı|Yazar|Anı
Günlük|Tarih|Kişisel|Yazmak
Anı Kitabı|Geçmiş|Hatıra|Yaşanmış
Çizgi Roman|Kare|Balon|Resim
Manga|Japonya|Çizim|Seri
Sözlük Romanı|Kelime|Kurgu|Deneysel
Sesli Kitap|Dinlemek|Anlatıcı|Kulaklık
E-kitap|Ekran|Dijital|Okumak
Ansiklopedi Maddesi|Bilgi|Başlık|Kaynak
Kapak Tasarımı|Cilt|Görsel|Ön
Arka Kapak Yazısı|Tanıtım|Cilt|Özet
Önsöz|Başlangıç|Yazar|Giriş
İçindekiler|Bölüm|Sayfa|Liste
Dipnot|Sayfa altı|Açıklama|Kaynak
Alıntı|Söz|Kaynak|Tırnak
` },
  { common: ["Haber", "Medya"], rows: `
Gazete|Sayfa|Manşet|Günlük
Dergi|Kapak|Sayı|Makale
Manşet|Büyük yazı|Gazete|Başlık
Köşe Yazısı|Yorum|Gazete|Yazar
Röportaj|Soru|Görüşme|Mikrofon
Basın Toplantısı|Gazeteci|Soru|Açıklama
Canlı Bağlantı|Muhabir|Ekran|Anlık
Haber Bülteni|Spiker|Ekran|Saat
Son Dakika|Acil|Bülten|Yeni
Hava Durumu|Tahmin|Sıcaklık|Yağmur
Spor Haberleri|Maç|Skor|Takım
Yerel Haber|Şehir|Mahalle|Gazete
Editoryal|Görüş|Yayın|Yazar
Basın Bülteni|Açıklama|Kurum|Duyuru
` },
  { common: ["Televizyon", "Program"], rows: `
Dizi|Bölüm|Sezon|Oyuncu
Sezon Finali|Son bölüm|Dizi|Beklemek
Pilot Bölüm|İlk|Dizi|Tanıtım
Talk Show|Sunucu|Konuk|Sohbet
Yarışma Programı|Soru|Ödül|Yarışmacı
Yemek Yarışması|Şef|Tabak|Puan
Bilgi Yarışması|Soru|Cevap|Ödül
Yetenek Yarışması|Sahne|Jüri|Performans
Reality Show|Gerçek kişi|Kamera|Ev
Belgesel Dizisi|Gerçek|Bölüm|Anlatım
Çocuk Programı|Eğlence|Kukla|Ekran
Çizgi Film|Animasyon|Çocuk|Karakter
Haber Kanalı|Spiker|Canlı|Ekran
Uzaktan Kumanda|Tuş|Kanal|Pil
Reklam Arası|Kısa|Ürün|Yayın
Jenerik|Müzik|İsim|Başlangıç
Altyazı|Ekran altı|Çeviri|Yazı
Dublaj|Seslendirme|Çeviri|Oyuncu
` },
  { common: ["Radyo", "Ses"], rows: `
Radyo Programı|Sunucu|Frekans|Dinleyici
Frekans|İstasyon|Dalga|Ayarlamak
Radyo İstasyonu|Yayın|Müzik|Sunucu
Haber Radyosu|Bülten|Frekans|Spiker
İstek Parça|Şarkı|Dinleyici|Aramak
Reklam Jingle'ı|Kısa|Melodi|Marka
Ses Kaydı|Mikrofon|Dosya|Dinlemek
Ses Efekti|Film|Gürültü|Yapay
Ses Mikseri|Kanal|Seviye|Stüdyo
` }
]);
