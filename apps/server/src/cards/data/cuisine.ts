import { defineCategory } from "./defineCategory.js";

export const CUISINE_CARDS = defineCategory("cuisine", [
  { common: ["Baharat", "Yemek"], rows: `
Karabiber|Öğütmek|Siyah|Acı
Kırmızı Pul Biber|Acı|Serpmek|Kırmızı
Kimyon|Köfte|Koku|Tohum
Zerdeçal|Sarı|Köri|Kök
Zencefil|Kök|Keskin|Çay
Tarçın|Tatlı|Çubuk|Koku
Kakule|Kahve|Kapsül|Koku
Karanfil Baharatı|Diş|Koku|Sıcak içecek
Muskat|Rende|Koku|Bütün
Kekik|Ot|Pizza|Koku
Biberiye|İğne yaprak|Et|Koku
Adaçayı|Yaprak|Demlemek|Bitki
Defne Yaprağı|Tencere|Kuru|Koku
Sumak|Ekşi|Mor|Soğan
İsot|Şanlıurfa|Acı|Çiğ köfte
Safran|Sarı|Pahalı|Çiçek
Köri|Sarı|Hindistan|Karışım
Vanilya|Tatlı|Çubuk|Koku
Susam|Simit|Tane|Tahin
Çörek Otu|Siyah|Tohum|Poğaça
Haşhaş|Tohum|Çörek|Mor çiçek
` },
  { common: ["Süt", "Kahvaltı"], rows: `
Beyaz Peynir|Tuzlu|Dilim|Salamura
Kaşar Peyniri|Sarı|Eritmek|Tost
Tulum Peyniri|Keçi|Olgun|Tuzlu
Lor Peyniri|Yumuşak|Börek|Protein
Çökelek|Ekşi|Köy|Peynir
Krem Peynir|Sürmek|Yumuşak|Ekmek
Mozzarella|Pizza|İtalya|Erimek
Parmesan|Sert|Rende|Makarna
Rokfor|Küf|Mavi|Keskin
Labne|Krem|Sürmek|Tatlı
Tereyağı|Sarı|Sürmek|Erimek
Yoğurt|Mayalı|Kaşık|Beyaz
Süzme Yoğurt|Kalın|Süzmek|Meze
Krema|Yağlı|Sos|Çırpmak
Süt Tozu|Kuru|Toz|Çözmek
` },
  { common: ["Sos", "Yemek"], rows: `
Ketçap|Domates|Kırmızı|Patates
Mayonez|Yumurta|Beyaz|Sandviç
Hardal|Sarı|Keskin|Sosis
Pesto|Fesleğen|Yeşil|Makarna
Beşamel|Süt|Un|Lazanya
Barbekü Sosu|Dumanlı|Et|Izgara
Acı Sos|Biber|Şişe|Yakmak
Soya Sosu|Tuzlu|Asya|Koyu
Nar Ekşisi|Salata|Koyu|Ekşi
Sirke|Ekşi|Salata|Fermente
Zeytinyağı|Akdeniz|Salata|Sıkmak
Tahin|Susam|Pekmez|Koyu
Pekmez|Üzüm|Kaynatmak|Tatlı
Bal|Arı|Petek|Tatlı
Reçel|Meyve|Kavanoz|Kaynatmak
Marmelat|Meyve|Püre|Ekmek
` },
  { common: ["Yemek", "Dünya"], rows: `
Suşi|Japonya|Pirinç|Çiğ balık
Ramen|Japonya|Erişte|Çorba
Tempura|Japonya|Kızartma|Karides
Taco|Meksika|Tortilla|İç
Burrito|Meksika|Dürüm|Fasulye
Nachos|Mısır cipsi|Peynir|Meksika
Guacamole|Avokado|Ezme|Meksika
Quesadilla|Tortilla|Peynir|Meksika
Paella|İspanya|Pirinç|Deniz ürünü
Gazpacho|Soğuk|Domates|İspanya
Lazanya|İtalya|Katman|Fırın
Risotto|İtalya|Pirinç|Kremamsı
Gnocchi|Patates|Hamur|İtalya
Ravioli|Dolgulu|Makarna|İtalya
Humus|Nohut|Tahin|Meze
Falafel|Nohut|Kızartma|Top
Şavurma|Dürüm|Et|Baharat
Kuskus|İrmik|Kuzey Afrika|Tane
Köri Yemeği|Baharat|Hindistan|Sos
Naan|Hindistan|Ekmek|Fırın
Samosa|Hindistan|Üçgen|Kızartma
Dim Sum|Çin|Buhar|Lokma
Wonton|Çin|Hamur|Dolgulu
Pho|Vietnam|Erişte|Et suyu
Pad Thai|Tayland|Erişte|Yer fıstığı
Kimchi|Kore|Lahana|Fermente
Bibimbap|Kore|Pirinç|Sebze
` },
  { common: ["Hamur", "Fırın"], rows: `
Simit|Susam|Halka|Sokak
Poğaça|Peynir|Çay|Yumuşak
Açma|Yumuşak|Halka|Kahvaltı
Kruvasan|Kat kat|Fransa|Tereyağı
Baget Ekmek|Uzun|Fransa|Kabuk
Ekşi Mayalı Ekmek|Fermantasyon|Kabuk|Dilim
Lavaş|İnce|Dürüm|Yufka
Yufka|İnce|Börek|Açmak
Tortilla|Meksika|İnce|Dürüm
Grissini|Çubuk|İtalya|Gevrek
Kraker|Tuzlu|Gevrek|Atıştırmalık
Galeta|Kuru|Sert|Çay
` }
]);
