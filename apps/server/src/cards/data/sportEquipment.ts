import { defineCategory } from "./defineCategory.js";

export const SPORT_EQUIPMENT_CARDS = defineCategory("sportgear", [
  { common: ["Spor", "Ekipman"], rows: `
Futbol Topu|Yuvarlak|Tekme|Gol
Basketbol Topu|Turuncu|Sektirmek|Pota
Voleybol Topu|File|Smaç|Servis
Tenis Topu|Sarı|Raket|Kort
Golf Topu|Beyaz|Delik|Sopa
Pinpon Topu|Küçük|Masa|Raket
Beyzbol Topu|Dikiş|Atıcı|Sopa
Ragbi Topu|Oval|Pas|Temas
Badminton Topu|Tüy|Raket|File
Bowling Topu|Ağır|Delik|Lobut
Bilardo Topu|Numara|Istaka|Masa
Hokey Diski|Buz|Sopa|Kale
Hentbol Topu|El|Kale|Saha
Plaj Topu|Şişme|Deniz|Hafif
` },
  { common: ["Spor", "Antrenman"], rows: `
Dambıl|Ağırlık|El|Kas
Halter Barı|Ağırlık|Disk|Kaldırmak
Kettlebell|Kulplu|Ağırlık|Sallamak
Direnç Bandı|Esnek|Çekmek|Kas
Atlama İpi|Zıplamak|Ritim|Kondisyon
Yoga Matı|Zemin|Esneme|Kaymaz
Pilates Topu|Büyük|Denge|Şişme
Köpük Rulo|Masaj|Kas|Silindir
Koşu Bandı|Ev|Hız|Adım
Eliptik Bisiklet|Pedal|Salon|Kardiyo
Kondisyon Bisikleti|Sabit|Pedal|Ev
Barfiks Demiri|Asılmak|Kol|Kapı
Şınav Barı|El|Zemin|Göğüs
Step Tahtası|Basamak|Ritim|Aerobik
Ağırlık Kemeri|Bel|Yük|Koruma
Spor Çantası|Kıyafet|Fermuar|Salon
Suluk|Su|İçecek|Kapak
` },
  { common: ["Spor", "Koruma"], rows: `
Dizlik|Diz|Ped|Darbe
Dirseklik|Dirsek|Ped|Darbe
Tekmelik|Bacak|Futbol|Darbe
Kask Vizörü|Yüz|Cam|Motosiklet
Ağız Koruyucu|Diş|Boks|Darbe
Boks Eldiveni|Yumruk|Ring|Dolgu
Kaleci Eldiveni|Top|Kale|Tutuş
Bisiklet Kaskı|Baş|Pedal|Güvenlik
Yüzme Bonesi|Saç|Havuz|Lastik
Yüzücü Gözlüğü|Su|Cam|Havuz
Dalış Maskesi|Su altı|Göz|Cam
Şnorkel|Nefes|Yüzey|Boru
Can Yeleği|Su|Batmamak|Turuncu
Emniyet İpi|Tırmanış|Bağlamak|Düşmek
` },
  { common: ["Spor", "Saha"], rows: `
Pota|Basketbol|Çember|File
Futbol Kalesi|Direk|Ağ|Gol
Voleybol Filesi|İki taraf|Smaç|Ortada
Tenis Filesi|Kort|Servis|Ortada
Köşe Bayrağı|Futbol|Korner|Direk
Skorbord|Sayı|Ekran|Maç
Başlama Çizgisi|Yarış|Pist|İlk
Bitiş Çizgisi|Finiş|Yarış|Son
Kulvar|Havuz|Pist|Şerit
Atlama Tahtası|Havuz|Zıplamak|Yüksek
Kum Havuzu|Atlama|Mesafe|Pist
Hakem Düdüğü|Karar|Ses|Maç
` }
]);
