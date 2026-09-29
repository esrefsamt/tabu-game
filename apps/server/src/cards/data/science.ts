import { defineCategory } from "./defineCategory.js";

export const SCIENCE_CARDS = defineCategory("science", [
  { common: ["Uzay", "Gökyüzü"], rows: `
Güneş|Yıldız|Işık|Sıcak
Ay|Uydu|Gece|Dolunay
Dünya|Gezegen|Yaşam|Mavi
Merkür|Güneş|Yakın|Küçük
Venüs|Sıcak|Gezegen|Sabah yıldızı
Mars|Kızıl|Gezegen|Rover
Jüpiter|Büyük|Gaz|Kırmızı leke
Satürn|Halka|Gezegen|Gaz
Uranüs|Yan yatmak|Mavi|Gezegen
Neptün|Mavi|Uzak|Gezegen
Plüton|Cüce|Uzak|Gezegen
Yıldız|Parlamak|Gece|Takımyıldız
Kutup Yıldızı|Kuzey|Yön|Sabit
Takımyıldız|Şekil|Yıldız|Desen
Samanyolu|Galaksi|Yıldız|Beyaz şerit
Galaksi|Yıldız|Sarmal|Küme
Kara Delik|Çekim|Işık|Olay ufku
Nebula|Gaz|Bulutsu|Yıldız
Kuyruklu Yıldız|Buz|Kuyruk|Yörünge
Göktaşı|Meteor|Düşmek|Atmosfer
Asteroit|Kaya|Yörünge|Çarpışma
Uydu|Dünya|Yörünge|Sinyal
Uzay İstasyonu|Yörünge|Astronot|Modül
Roket|Fırlatmak|Yakıt|İtki
Uzay Mekiği|Astronot|Yörünge|Kanat
Yörünge|Dönmek|Gezegen|Elips
Tutulma|Güneş|Ay|Gölge
Dolunay|Ay|Tam|Gece
Yeni Ay|Görünmez|Evre|Karanlık
Hilal|Ay|İnce|Evre
` },
  { common: ["Bilim", "Madde"], rows: `
Atom|Çekirdek|Elektron|Küçük
Molekül|Atom|Bağ|Kimya
Element|Periyodik tablo|Sembol|Saf
Elektron|Negatif|Atom|Yük
Proton|Pozitif|Çekirdek|Atom
Nötron|Yüksüz|Çekirdek|Atom
İyon|Yük|Elektron|Atom
Periyodik Tablo|Element|Satır|Sembol
Oksijen|Nefes|Gaz|Hava
Hidrojen|Hafif|Gaz|Su
Karbon|Kömür|Element|Organik
Azot|Hava|Gaz|Gübre
Demir|Metal|Pas|Mıknatıs
Bakır|Kablo|Kırmızı|Metal
Altın|Değerli|Sarı|Takı
Gümüş|Parlak|Metal|Takı
Alüminyum|Hafif|Folyo|Metal
Cıva|Sıvı|Metal|Termometre
Tuz|Kristal|Sodyum|Yemek
Asit|Ekşi|Yakıcı|pH
Baz|Sabun|pH|Alkali
Kimyasal Tepkime|Değişim|Deney|Bağ
Çözelti|Çözünmek|Sıvı|Karışım
Kristal|Düzenli|Parlak|Tuz
Plastik|Polimer|Petrol|Şişe
Cam|Şeffaf|Kırılmak|Pencere
Seramik|Kil|Fırın|Tabak
Kauçuk|Esnek|Lastik|Ağaç
` },
  { common: ["Fizik", "Kuvvet"], rows: `
Yerçekimi|Düşmek|Dünya|Kütle
Kütle|Kilogram|Madde|Ağırlık
Ağırlık|Tartı|Yerçekimi|Kilo
Hız|Mesafe|Zaman|Çabuk
İvme|Hız değişimi|Hareket|Araba
Sürtünme|Yüzey|Yavaşlamak|Isı
Basınç|Alan|Hava|Sıkışma
Enerji|İş|Güç|Elektrik
Güç|Watt|Enerji|Zaman
Isı|Sıcaklık|Aktarım|Enerji
Sıcaklık|Derece|Termometre|Soğuk
Ses Dalgası|Titreşim|Kulak|Frekans
Işık|Görmek|Foton|Parlak
Gölge|Işık|Engel|Karanlık
Yansıma|Ayna|Işık|Geri
Kırılma|Işık|Su|Açı
Mıknatıs|Çekmek|Kutup|Metal
Elektrik|Akım|Priz|Kablo
Akım|Elektrik|Amper|Devre
Voltaj|Gerilim|Volt|Pil
Direnç|Ohm|Akım|Devre
Devre|Kablo|Pil|Anahtar
Pil Hücresi|Enerji|Elektrot|Şarj
Manyetik Alan|Mıknatıs|Kutup|Çekim
` },
  { common: ["Biyoloji", "Canlı"], rows: `
Hücre|Çekirdek|Zar|Mikroskop
DNA|Gen|Sarmal|Kalıtım
Gen|Özellik|DNA|Kalıtım
Kromozom|DNA|Çift|Hücre
Protein|Kas|Amino asit|Besin
Enzim|Tepkime|Sindirim|Hızlandırmak
Bakteri|Mikrop|Tek hücre|Çoğalmak
Virüs|Bulaşmak|Hastalık|Konak
Mantar Hücresi|Spor|Nem|Hif
Fotosentez|Güneş|Yaprak|Oksijen
Solunum|Oksijen|Nefes|Enerji
Ekosistem|Tür|Çevre|Denge
Besin Zinciri|Av|Yırtıcı|Sıra
Tür|Birey|Sınıflandırma|Benzer
Evrim|Değişim|Nesil|Uyum
Fosil|Taş|Geçmiş|Kemik
Dinozor|Tarih öncesi|Dev|Fosil
Paleontoloji|Fosil|Kazı|Dinozor
Jeoloji|Kaya|Yer kabuğu|Deprem
Astronomi|Yıldız|Gezegen|Teleskop
Botanik|Bitki|Araştırma|Yaprak
Zooloji|Hayvan|Araştırma|Tür
` }
]);

