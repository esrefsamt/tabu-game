import { defineCategory } from "./defineCategory.js";

export const GEOGRAPHY_CARDS = defineCategory("geography", [
  { common: ["Harita", "Coğrafya"], rows: `
Enlem|Ekvator|Kuzey|Derece
Boylam|Meridyen|Doğu|Derece
Ekvator|Dünya|Sıfır|Sıcak
Meridyen|Kutup|Boylam|Çizgi
Paralel|Enlem|Çember|Eş uzaklık
Kuzey Yarımküre|Ekvator|Üst|Kutup
Güney Yarımküre|Ekvator|Alt|Kutup
Kutup Noktası|Kuzey|Güney|Soğuk
Başlangıç Meridyeni|Greenwich|Sıfır|Boylam
Uluslararası Tarih Değiştirme Çizgisi|Pasifik|Gün|Takvim
Ölçek|Oran|Mesafe|Küçültme
Lejant|Simge|Açıklama|Gösterge
Koordinat|Enlem|Boylam|Konum
Küresel Konum|GPS|Uydu|Koordinat
Yön Oku|Kuzey|İşaret|Pusula
Kuzey|Pusula|Yön|Üst
Güney|Pusula|Yön|Alt
Doğu|Güneş|Yön|Sabah
Batı|Güneş|Yön|Akşam
Sınır|Ülke|Çizgi|Komşu
Sahil Şeridi|Kıyı|Deniz|Uzunluk
Kıyı|Deniz|Kara|Dalga
Kıta Sahanlığı|Deniz|Sığ|Kıyı
Deniz Seviyesi|Yükseklik|Sıfır|Ölçüm
Rakım|Deniz seviyesi|Yükseklik|Dağ
` },
  { common: ["İklim", "Hava"], rows: `
Akdeniz İklimi|Yaz|Kurak|Kış
Karasal İklim|İç kesim|Sıcak farkı|Kış
Karadeniz İklimi|Yağış|Nem|Yeşil
Çöl İklimi|Kurak|Sıcak|Yağış
Tropikal İklim|Sıcak|Nem|Ekvator
Kutup İklimi|Buz|Soğuk|Kuzey
Muson|Mevsim|Yağmur|Asya
Nem|Su buharı|Çiy|Yüzde
Kurak Mevsim|Yağış yok|Sıcak|Toprak
Yağışlı Mevsim|Muson|Yağmur|Takvim
Mevsim|Yaz|Kış|Dört
İlkbahar|Çiçek|Mart|Uyanış
Yaz|Sıcak|Tatil|Güneş
Sonbahar|Yaprak|Eylül|Serin
Kış|Kar|Soğuk|Aralık
Ekinoks|Gece gündüz|Eşit|Bahar
Gündönümü|En uzun|En kısa|Mevsim
Sıcak Hava Dalgası|Bunaltıcı|Yaz|Derece
Soğuk Hava Dalgası|Don|Kış|Derece
Yağmur Ormanı|Tropik|Nem|Ağaç
Tundra|Kutup|Ağaçsız|Soğuk
Savan|Afrika|Ot|Yağış
Step|Bozkır|Ot|Kurak
` },
  { common: ["Doğa", "Yer şekli"], rows: `
Fay Hattı|Deprem|Yer kabuğu|Kırık
Lav Akıntısı|Volkan|Sıcak|Taş
Magma|Yeraltı|Erimiş|Volkan
Krater Gölü|Volkan|Su|Çukur
Obruk|Çökme|Yeraltı|Çukur
Traverten|Kireç|Pamukkale|Beyaz
Sarkıt|Mağara|Tavan|Damlama
Dikit|Mağara|Zemin|Kireç
Delta Ovası|Nehir ağzı|Tarım|Düz
Lagün|Kıyı|Sığ göl|Deniz
Fiyort|Norveç|Buzul|Koy
At nalı gölü|Nehir|Kıvrım|Eski yatak
Menderes|Kıvrım|Nehir|Ova
Çağlayan|Şelale|Su|Düşmek
Kum Tepesi|Çöl|Rüzgâr|Hareket
Vadi Buzulu|Dağ|Buz|Hareket
Kutup Buzulu|Kuzey|Güney|Buz
Kıyı Oku|Kum|Deniz|Biriktirme
Mağara Girişi|Karanlık|Açıklık|Yeraltı
Yeraltı Suyu|Kuyu|Akifer|İçmek
` }
]);
