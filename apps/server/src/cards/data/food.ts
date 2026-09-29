import { defineCategory } from "./defineCategory.js";

export const FOOD_CARDS = defineCategory("food", [
  { common: ["Meyve", "Çekirdek"], rows: `
Elma|Kırmızı|Ağaç|Isırmak
Armut|Sulu|Sap|Yeşil
Muz|Sarı|Kabuk|Maymun
Portakal|Turuncu|Sıkmak|C vitamini
Mandalina|Kış|Dilim|Kabuk
Limon|Ekşi|Sarı|Limonata
Greyfurt|Acı|Narenciye|Pembe
Çilek|Kırmızı|Reçel|Yaz
Kiraz|Sap|Çift|Kırmızı
Vişne|Ekşi|Komposto|Kırmızı
Üzüm|Salkım|Bağ|Pekmez
Karpuz|Yaz|Dilim|Kırmızı
Kavun|Koku|Yaz|Sarı
Şeftali|Tüylü|Sulu|Yaz
Kayısı|Turuncu|Kuru|Yaz
Erik|Yeşil|Ekşi|Tuz
İncir|Mor|Kuru|Ağaç
Nar|Tane|Kırmızı|Ayıklamak
Ayva|Sert|Reçel|Sarı
Hurma|Ramazan|Palmiye|Tatlı
Ananas|Tropik|Dikenli|Sarı
Kivi|Tüylü|Yeşil|Ekşi
Mango|Tropik|Turuncu|Sulu
Avokado|Yeşil|Salata|Guacamole
Hindistan Cevizi|Sert|Süt|Tropik
Yaban Mersini|Mavi|Küçük|Orman
Ahududu|Kırmızı|Çalı|Reçel
Böğürtlen|Mor|Diken|Çalı
Dut|Ağaç|Beyaz|Pekmez
Trabzon Hurması|Turuncu|Yumuşak|Sonbahar
Kestane|Kış|Köz|Kabuk
Fındık|Karadeniz|Kırmak|Çikolata
Ceviz|Sert|Beyin|Kabuk
Badem|Süt|Kuruyemiş|Kabuk
Antep Fıstığı|Yeşil|Baklava|Kabuk
Yer Fıstığı|Kabuk|Tuzlu|Ezme
Kaju|Kıvrık|Kuruyemiş|Tuzlu
Leblebi|Nohut|Kavrulmuş|Çerez
Kuru Üzüm|Salkım|Güneş|Tatlı
Kuru Kayısı|Turuncu|Güneş|Atıştırmalık
` },
  { common: ["Sebze", "Mutfak"], rows: `
Domates|Kırmızı|Salça|Salata
Salatalık|Yeşil|Turşu|Cacık
Biber|Acı|Dolma|Kırmızı
Patlıcan|Mor|Közlemek|Musakka
Kabak|Mücver|Yeşil|Dolma
Havuç|Turuncu|Tavşan|Rende
Patates|Kızartma|Püre|Nişasta
Soğan|Gözyaşı|Doğramak|Kuru
Sarımsak|Koku|Diş|Ezmek
Pırasa|Zeytinyağı|Uzun|Yeşil
Ispanak|Demir|Yaprak|Popeye
Marul|Salata|Yaprak|Yeşil
Lahana|Sarma|Beyaz|Turşu
Karnabahar|Beyaz|Çiçek|Haşlamak
Brokoli|Yeşil|Ağaç|Haşlamak
Turp|Kırmızı|Acı|Salata
Pancar|Kırmızı|Turşu|Toprak
Enginar|Kalp|Zeytinyağı|Yaprak
Kereviz|Kök|Zeytinyağı|Koku
Bamya|Sümüksü|Küçük|Limon
Fasulye|Taze|Kuru|Sırık
Bezelye|Tane|Yeşil|Konserve
Mısır Koçanı|Sarı|Patlamış|Tane
Mantar|Şapka|Orman|Sote
Roka|Salata|Acı|Yaprak
Maydanoz|Demet|Yeşil|Doğramak
Dereotu|Koku|Ot|Cacık
Nane|Ferah|Yaprak|Çay
Fesleğen|Pesto|Koku|Yaprak
Tere|Salata|Ot|Acı
` },
  { common: ["Yemek", "Sofra"], rows: `
Köfte|Kıyma|Izgara|Yuvarlak
Kebap|Şiş|Et|Ocakbaşı
Döner|Dilim|Şiş|Ekmek
Lahmacun|İnce|Kıyma|Limon
Pide|Fırın|Kaşar|Uzun
Mantı|Yoğurt|Küçük|Kayseri
Pilav|Pirinç|Tane|Tereyağı
Dolma|Biber|İç|Pirinç
Sarma|Yaprak|Pirinç|Sarmak
Güveç|Toprak|Fırın|Et
Menemen|Yumurta|Domates|Tava
Omlet|Yumurta|Tava|Kahvaltı
Sucuklu Yumurta|Kahvaltı|Tava|Baharat
İmam Bayıldı|Patlıcan|Zeytinyağı|Soğan
Karnıyarık|Patlıcan|Kıyma|Fırın
Musakka|Patlıcan|Kıyma|Katman
Kuru Fasulye|Pilav|Baklagil|Tencere
Nohut Yemeği|Baklagil|Pilav|Tencere
Mercimek Çorbası|Kırmızı|Limon|Kase
Tarhana Çorbası|Ekşi|Kuru|Kış
Yayla Çorbası|Yoğurt|Pirinç|Nane
İşkembe Çorbası|Sakatat|Sarımsak|Gece
Ezogelin Çorbası|Mercimek|Bulgur|Nane
Etli Ekmek|Konya|Uzun|Kıyma
Tantuni|Mersin|Dürüm|Et
İskender|Bursa|Yoğurt|Tereyağı
Hünkar Beğendi|Patlıcan|Et|Püre
Çiğ Köfte|Bulgur|İsot|Marul
İçli Köfte|Bulgur|Kıyma|Kızartma
Gözleme|Sac|Yufka|Peynir
Börek|Yufka|Peynir|Fırın
Su Böreği|Yufka|Haşlamak|Peynir
` },
  { common: ["Tatlı", "Şeker"], rows: `
Baklava|Fıstık|Şerbet|Yufka
Künefe|Kadayıf|Peynir|Hatay
Sütlaç|Pirinç|Fırın|Tarçın
Kazandibi|Yanık|Süt|Tavukgöğsü
Tavukgöğsü|Süt|Beyaz|Lif
Muhallebi|Süt|Kaşık|Kase
Keşkül|Badem|Süt|Kase
Helva|Un|İrmik|Kavurmak
Lokma|Şerbet|Kızartma|Yuvarlak
Lokum|Nişasta|Pudra|Küp
Revani|İrmik|Şerbet|Dilim
Şekerpare|Şerbet|Kurabiye|Yuvarlak
Tulumba|Kızartma|Şerbet|Tırtıklı
Profiterol|Çikolata|Krema|Top
Ekler|Uzun|Krema|Çikolata
Tiramisu|Kahve|Mascarpone|İtalya
Cheesecake|Peynir|Taban|Dilim
Brownie|Çikolata|Fırın|Kare
Kurabiye|Fırın|Un|Çay
Waffle|Kare|Çikolata|Meyve
Pankek|Kahvaltı|Tava|Şurup
Krep|İnce|Tava|Hamur
` },
  { common: ["İçecek", "Bardak"], rows: `
Çay|Demlik|İnce belli|Sıcak
Ayran|Yoğurt|Tuz|Köpük
Limonata|Limon|Yaz|Buz
Sıcak Çikolata|Kakao|Süt|Kış
Salep|Tarçın|Süt|Kış
Boza|Kış|Nohut|Fermante
Şalgam|Mor|Acı|Adana
Meyve Suyu|Sıkmak|Portakal|Kutu
Gazoz|Gazlı|Şişe|Kapak
Soda|Maden|Gaz|Limon
Kefir|Süt|Fermante|Probiyotik
Smoothie|Blender|Meyve|Soğuk
Milkshake|Süt|Dondurma|Pipet
Espresso|Kahve|Küçük|Sert
Latte|Kahve|Süt|Köpük
Cappuccino|Kahve|Köpük|Tarçın
Türk Kahvesi|Cezve|Telve|Fincan
Filtre Kahve|Demlemek|Kağıt|Çekirdek
Bitki Çayı|Ihlamur|Demlemek|Ot
` }
]);




