import { defineCategory } from "./defineCategory.js";

export const PROFESSION_CARDS = defineCategory("profession", [
  { common: ["Meslek", "Sağlık"], rows: `
Hemşire|Hasta|İğne|Hastane
Cerrah|Ameliyat|Neşter|Steril
Çocuk Doktoru|Bebek|Aşı|Muayene
Göz Doktoru|Görme|Lens|Muayene
Kulak Burun Boğaz Uzmanı|İşitme|Boğaz|Muayene
Ortopedist|Kemik|Kırık|Eklem
Psikolog|Terapi|Duygu|Görüşme
Psikiyatrist|Ruh sağlığı|İlaç|Terapi
Fizyoterapist|Egzersiz|Rehabilitasyon|Kas
Diyetisyen|Beslenme|Liste|Kilo
Ebe|Doğum|Bebek|Hastane
Paramedik|Ambulans|Acil|İlk yardım
Veteriner|Hayvan|Muayene|Aşı
Optisyen|Gözlük|Cam|Numara
Laborant|Örnek|Tahlil|Mikroskop
Radyolog|Görüntü|Röntgen|Me
Anestezi Uzmanı|Uyutmak|Ameliyat|Narkoz
Eczane Teknisyeni|Reçete|İlaç|Raf
` },
  { common: ["Meslek", "Okul"], rows: `
Müdür|Yönetmek|Öğretmen|Oda
Rehber Öğretmen|Danışmanlık|Öğrenci|Yönlendirme
Anaokulu Öğretmeni|Çocuk|Oyun|Sınıf
Üniversite Hocası|Ders|Akademi|Kampüs
Araştırma Görevlisi|Üniversite|Tez|Laboratuvar
Kütüphaneci|Kitap|Raf|Ödünç
Özel Ders Öğretmeni|Bire bir|Konu|Öğrenci
Sınav Görevlisi|Salon|Gözetmen|Kopya
Antrenör|Sporcu|Çalışma|Takım
` },
  { common: ["Meslek", "Hizmet"], rows: `
Garson|Sipariş|Masa|Restoran
Aşçı|Mutfak|Yemek|Tencere
Pastacı|Kek|Krema|Fırın
Fırıncı|Ekmek|Hamur|Sabah
Kasap|Et|Bıçak|Tezgâh
Manav|Meyve|Sebze|Tezgâh
Balıkçı|Olta|Tekne|Av
Berber|Saç|Makas|Tıraş
Kuaför|Saç|Fön|Kesim
Terzi|Dikiş|Ölçü|Kumaş
Kuru Temizlemeci|Leke|Kıyafet|Askı
Temizlik Görevlisi|Süpürge|Paspas|Bina
Resepsiyonist|Otel|Karşılama|Rezervasyon
Otel Müdürü|Konaklama|Personel|Rezervasyon
Tur Rehberi|Gezi|Anlatmak|Grup
Seyahat Acentesi Çalışanı|Bilet|Tatil|Rezervasyon
Kargo Görevlisi|Paket|Teslimat|Adres
Postacı|Mektup|Dağıtım|Zarf
Kurye|Motosiklet|Paket|Teslimat
Taksi Şoförü|Yolcu|Taksimetre|Direksiyon
Otobüs Şoförü|Durak|Yolcu|Direksiyon
Makinist|Tren|Lokomotif|Ray
Pilot|Uçak|Kokpit|Uçmak
Kabin Memuru|Uçak|Yolcu|Emniyet
Gemi Kaptanı|Dümen|Liman|Deniz
Denizci|Gemi|Güverte|Liman
` },
  { common: ["Meslek", "İş"], rows: `
Mühendis|Proje|Tasarım|Teknik
Mimar|Bina|Plan|Çizim
İç Mimar|Dekorasyon|Mekân|Mobilya
İnşaat Ustası|Tuğla|Harç|Bina
Duvar Ustası|Sıva|Tuğla|Harç
Boyacı|Fırça|Duvar|Renk
Elektrikçi|Kablo|Priz|Akım
Tesisatçı|Boru|Su|Musluk
Kaynakçı|Metal|Kıvılcım|Maske
Demirci|Örs|Çekiç|Metal
Mobilyacı|Ahşap|Dolap|Atölye
Camcı|Pencere|Kesmek|Kırık
Çilingir|Anahtar|Kilit|Kapı
Saatçi|Tamir|Mekanizma|Bilek
Ayakkabıcı|Taban|Deri|Tamir
Kuyumcu|Altın|Yüzük|Vitrin
Çiçekçi|Buket|Vazo|Gül
Çiftçi|Tarla|Ekim|Hasat
Bahçıvan|Bitki|Sulamak|Budamak
Arıcı|Kovan|Bal|Koruyucu
Ormancı|Ağaç|Orman|Yangın
Madenci|Yeraltı|Kömür|Baret
İtfaiyeci|Yangın|Hortum|Merdiven
Güvenlik Görevlisi|Nöbet|Giriş|Kontrol
Hakim|Mahkeme|Karar|Cübbe
Savcı|Dava|İddia|Mahkeme
Avukat|Müvekkil|Savunma|Dava
Noter|İmza|Belge|Onay
Muhasebeci|Hesap|Vergi|Defter
Bankacı|Hesap|Kredi|Şube
Sigortacı|Poliçe|Risk|Hasar
Emlakçı|Ev|Satış|Kira
` },
  { common: ["Meslek", "Yaratıcılık"], rows: `
Yazar|Kitap|Roman|Kalem
Şair|Şiir|Dize|Kafiye
Editör|Metin|Düzeltme|Yayın
Gazeteci|Haber|Röportaj|Basın
Muhabir|Haber|Mikrofon|Canlı
Fotoğrafçı|Kamera|Lens|Çekim
Kameraman|Video|Çekim|Görüntü
Yönetmen|Film|Set|Sahne
Senarist|Diyalog|Hikâye|Film
Oyuncu|Rol|Sahne|Kamera
Seslendirme Sanatçısı|Mikrofon|Karakter|Ses
Müzisyen|Enstrüman|Nota|Konser
Besteci|Melodi|Nota|Şarkı
Şarkıcı|Mikrofon|Sahne|Ses
Dansçı|Ritim|Sahne|Hareket
Ressam|Tuval|Fırça|Boya
Heykeltıraş|Kil|Taş|Yontmak
Grafik Tasarımcı|Görsel|Logo|Bilgisayar
Moda Tasarımcısı|Koleksiyon|Kumaş|Defile
Oyun Geliştiricisi|Kod|Karakter|Bilgisayar
Yazılımcı|Program|Kod|Bilgisayar
Veri Analisti|Grafik|Sayı|Rapor
Çevirmen|Dil|Metin|Tercüme
Spiker|Sunmak|Haber|Ekran
Sunucu|Program|Mikrofon|Sahne
` }
]);




