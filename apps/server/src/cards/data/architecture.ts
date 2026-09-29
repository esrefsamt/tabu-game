import { defineCategory } from "./defineCategory.js";

export const ARCHITECTURE_CARDS = defineCategory("architecture", [
  { common: ["Bina", "Mimari"], rows: `
Gökdelen|Yüksek|Kat|Şehir
Villa|Bahçe|Müstakil|Lüks
Müstakil Ev|Bahçe|Tek|Komşu
Sıra Ev|Bitişik|Cadde|Cephe
Köy Evi|Bahçe|Kırsal|Tek kat
Taş Ev|Duvar|Kırsal|Serin
Ahşap Ev|Tahta|Kırsal|Doğal
Kerpiç Ev|Toprak|Köy|Duvar
Prefabrik Ev|Parça|Hızlı|Kurulum
Konteyner Ev|Metal|Taşınabilir|Küçük
Cam Cepheli Bina|Şeffaf|Ofis|Modern
Apartman Dairesi|Kat|Komşu|Balkon
Rezidans|Yüksek|Güvenlik|Daire
İş Merkezi|Ofis|Kat|Şirket
Alışveriş Merkezi|Mağaza|Yemek|Kapalı
Fabrika|Üretim|Makine|İşçi
Depo|Stok|Raf|Ürün
Hangar|Uçak|Büyük kapı|Havalimanı
Spor Salonu|Tribün|Saha|Kapalı
Yüzme Havuzu|Su|Kulaç|Klor
Hamam|Buhar|Kese|Sıcak
Sauna|Ahşap|Ter|Sıcak
` },
  { common: ["Yapı", "Parça"], rows: `
Temel|Toprak|Alt|Taşımak
Kolon|Dikey|Beton|Taşıyıcı
Kiriş|Yatay|Tavan|Taşıyıcı
Duvar|Tuğla|Bölmek|Boya
Tavan|Üst|Lamba|Oda
Zemin|Alt|Yürümek|Kaplama
Çatı|Üst|Kiremit|Yağmur
Baca|Duman|Çatı|Şömine
Merdiven|Basamak|Kat|Çıkmak
Basamak|Ayak|Merdiven|Yükselmek
Korkuluk|Tutmak|Balkon|Merdiven
Kapı|Anahtar|Giriş|Açmak
Pencere|Cam|Manzara|Açmak
Panjur|Pencere|Işık|Kapatmak
Eşik|Kapı altı|Adım|Giriş
Sundurma|Giriş|Yağmur|Çatı
Veranda|Ev önü|Oturmak|Açık
Avlu|İç|Açık hava|Ev
Taş Kemer|Yay|Taş|Geçit
Kubbe|Yuvarlak|Tavan|Cami
Minare|Cami|Uzun|Ezan
Sütun|Dikey|Antik|Taş
Cephe|Dış yüz|Bina|Ön
İnşaat İskelesi|İnşaat|Metal|Çalışmak
` },
  { common: ["İnşaat", "Malzeme"], rows: `
Beton|Çimento|Kum|Sert
Çimento|Toz|Su|Beton
Tuğla|Kırmızı|Duvar|Dizmek
Kiremit|Çatı|Kırmızı|Yağmur
Mermer|Taş|Parlak|Zemin
Granit|Sert|Tezgâh|Taş
Fayans|Banyo|Duvar|Seramik
Parke|Ahşap|Zemin|Döşemek
Laminat|Zemin|Katman|Ahşap görünüm
Alçı|Duvar|Sıva|Beyaz
Sıva|Duvar|Düz|Harç
Harç|Kum|Su|Tuğla
Demir Çubuk|Beton|Donatı|Takviye
Yalıtım|Sıcak|Ses|Duvar
Mantolama|Dış cephe|Isı|Kaplama
Çift Cam|Pencere|Yalıtım|Katman
Silikon|Derz|Su geçirmez|Tüp
Derz|Fayans|Aralık|Dolgu
Duvar Kağıdı|Desen|Rulo|Yapıştırmak
Boya Kovası|Renk|Fırça|Duvar
` },
  { common: ["Şehir", "Yapı"], rows: `
Tarihi Köprü|Taş|Nehir|Kemer
Deniz Feneri|Kıyı|Işık|Gemi
Su Kulesi|Depo|Yüksek|Basınç
Baraj|Nehir|Su|Elektrik
Stadyum Tribünü|Seyirci|Maç|Koltuk
Amfitiyatro|Yarım daire|Sahne|Antik
Saat Kulesi|Meydan|Zaman|Çan
Surlar|Kale|Savunma|Taş
Zafer Takı|Kemer|Anıt|Tarih
Gözlem Kulesi|Manzara|Yüksek|Çıkmak
İskele|Gemi|Yanaşmak|Kıyı
Marina|Yat|Liman|Bağlamak
Rıhtım|Kıyı|Gemi|Yük
Tersane|Gemi|Yapım|Onarım
` }
]);
