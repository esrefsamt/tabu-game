import { defineCategory } from "./defineCategory.js";

export const NATURE_CARDS = defineCategory("nature", [
  { common: ["Doğa", "Coğrafya"], rows: `
Dağ|Zirve|Yüksek|Tırmanmak
Tepe|Yamaç|Yükseklik|Küçük
Vadi|İki dağ|Nehir|Alçak
Ova|Düz|Tarım|Geniş
Plato|Yüksek|Düz|Yayla
Yayla|Yüksek|Serin|Çimen
Kanyon|Derin|Kayalık|Nehir
Uçurum|Dik|Yükseklik|Kenar
Mağara|Karanlık|Sarkıt|Yeraltı
Ada|Su|Kıyı|Küçük kara
Yarımada|Üç taraf|Su|Kara
Kıta|Büyük|Kara|Dünya
Boğaz|İki deniz|Dar|Geçit
Körfez|Deniz|Kıyı|Girinti
Koy|Küçük|Deniz|Sığınak
Sahil|Kum|Deniz|Kıyı
Plaj|Kum|Güneş|Yüzmek
Çöl|Kum|Kurak|Vaha
Vaha|Çöl|Su|Palmiye
Orman|Ağaç|Yeşil|Yaban hayatı
Koruluk|Ağaç|Küçük|Gölge
Bataklık|Çamur|Sulak|Sazlık
Nehir|Akmak|Kıyı|Köprü
Dere|Küçük|Akarsu|Taş
Akarsu|Nehir|Küçük|Akmak
Şelale|Düşmek|Su|Yüksek
Göl|Tatlı su|Kıyı|Durgun
Gölet|Küçük|Su|Birikmek
Okyanus|Büyük|Tuzlu|Dalga
Resif|Mercan|Sığ|Deniz
Delta|Nehir ağzı|Alüvyon|Kıyı
Buzul|Buz|Dağ|Erimek
Volkan|Lav|Patlamak|Dağ
Krater|Volkan|Çukur|Tepe
Gayzer|Sıcak su|Fışkırmak|Yeraltı
Kaplıca|Sıcak su|Şifa|Termal
` },
  { common: ["Hava", "Gökyüzü"], rows: `
Bulut|Beyaz|Yağmur|Gölge
Yağmur|Damla|Islanmak|Şemsiye
Kar|Beyaz|Soğuk|Kış
Dolu|Buz|Tane|Yağış
Sis|Görüş|Beyaz|Yoğun
Çiy|Sabah|Damla|Bitki
Kırağı|Soğuk|Beyaz|Sabah
Rüzgâr|Esmek|Yel|Serin
Fırtına|Şiddetli|Rüzgâr|Yağmur
Kasırga|Dönmek|Şiddetli|Rüzgâr
Hortum|Dönmek|Huni|Fırtına
Tayfun|Okyanus|Şiddetli|Rüzgâr
Şimşek|Işık|Bulut|Çakmak
Yıldırım|Elektrik|Düşmek|Gök gürültüsü
Gök Gürültüsü|Ses|Yıldırım|Gürlemek
Güneş Işığı|Aydınlık|Sıcaklık|Işın
Gün Doğumu|Sabah|Ufuk|Güneş
Gün Batımı|Akşam|Ufuk|Kızıl
Alacakaranlık|Akşam|Loş|Gün batımı
Ay Işığı|Gece|Parlak|Dolunay
` },
  { common: ["Bitki", "Doğa"], rows: `
Ağaç|Gövde|Dal|Yaprak
Çam|İğne yaprak|Kozalak|Orman
Meşe|Palamut|Gövde|Orman
Çınar|Geniş yaprak|Gölge|Meydan
Söğüt|Sarkık dal|Dere|Ağaç
Kavak|Uzun|Rüzgâr|Yaprak
Huş|Beyaz gövde|Orman|Kuzey
Palmiye|Tropik|Hurma|Sahil
Zeytin Ağacı|Meyve|Akdeniz|Yağ
İncir Ağacı|Meyve|Yaprak|Süt
Kaktüs|Diken|Çöl|Su
Bambu|Hızlı büyümek|Panda|Sap
Sarmaşık|Tırmanmak|Duvar|Yaprak
Eğrelti Otu|Nemli|Yaprak|Orman
Yosun|Nemli|Yeşil|Taş
Liken|Kaya|Ortak yaşam|Yosun
Çimen|Yeşil|Biçmek|Bahçe
Yonca|Üç yaprak|Şans|Çayır
Papatya|Beyaz|Sarı|Fal
Gül|Diken|Kırmızı|Koku
Lale|Bahar|Soğan|Renkli
Menekşe|Mor|Saksı|Çiçek
Orkide|Zarif|Saksı|Çiçek
Ayçiçeği|Sarı|Çekirdek|Güneş
Lavanta|Mor|Koku|Tarla
Karanfil|Koku|Buket|Dişli
Krizantem|Sonbahar|Buket|Çiçek
Nilüfer|Su|Gölet|Yaprak
Nergis|Sarı|Bahar|Koku
Sümbül|Koku|Bahar|Soğan
Zambak|Beyaz|Koku|Çiçek
Gelincik Çiçeği|Kırmızı|Tarla|İnce
Kardelen|Kar|Bahar|Beyaz
` }
]);

