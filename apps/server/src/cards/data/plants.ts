import { defineCategory } from "./defineCategory.js";

export const PLANT_CARDS = defineCategory("plant", [
  { common: ["Bitki", "Bahçe"], rows: `
Tohum|Toprak|Çimlenmek|Küçük
Fide|Genç|Dikmek|Kök
Fidan|Genç ağaç|Dikmek|Büyümek
Kök|Toprak|Emmek|Yeraltı
Gövde|Dal|Kök|Ağaç
Dal|Gövde|Yaprak|Budamak
Yaprak|Yeşil|Fotosentez|Dal
Tomurcuk|Açmak|Çiçek|Bahar
Çiçek|Taç yaprak|Koku|Renk
Polen|Arı|Sarı|Toz
Nektar|Çiçek|Arı|Tatlı
Kozalak|Çam|Tohum|Kahverengi
Meşe Palamudu|Meşe|Tohum|Orman
Sürgün|Yeni|Dal|Büyümek
Filiz|Çimlenmek|Genç|Yeşil
Çimlenme|Tohum|Toprak|Su
Budama|Makas|Dal|Şekil
Aşılama|Dal|Meyve|Birleştirmek
Kompost|Atık|Toprak|Çürümek
Gübre|Besin|Toprak|Verim
Saksı Toprağı|Köklenme|Karışım|Dikmek
Solucan Gübresi|Toprak|Organik|Atık
Malç|Toprak üstü|Nem|Örtü
Sera|Cam|Sıcak|Yetiştirmek
Fidanlık|Genç ağaç|Saksı|Satış
` },
  { common: ["Tarım", "Tarla"], rows: `
Buğday|Başak|Un|Hasat
Arpa|Tahıl|Bira|Başak
Yulaf|Tahıl|Kahvaltı|Ezme
Çavdar|Tahıl|Ekmek|Koyu
Pirinç Bitkisi|Su|Çeltik|Tane
Ayçiçeği Tarlası|Sarı|Yağ|Çekirdek
Pamuk Tarlası|Beyaz|Lif|Hasat
Şeker Pancarı|Kök|Şeker|Hasat
Şeker Kamışı|Uzun|Tatlı|Tropik
Tütün|Yaprak|Sigara|Kurutmak
Çay Bitkisi|Yaprak|Rize|Toplamak
Kahve Ağacı|Çekirdek|Tropik|Kavurmak
Kakao Ağacı|Çikolata|Çekirdek|Tropik
Susam Bitkisi|Tohum|Tahin|Hasat
Keten Bitkisi|Lif|Tohum|Kumaş
Mercimek|Baklagil|Kırmızı|Çorba
Nohut|Baklagil|Humus|Yuvarlak
Kuru Fasulye Tanesi|Baklagil|Beyaz|Pilav
Soya Fasulyesi|Tofu|Protein|Baklagil
` },
  { common: ["Bitki", "Ağaç"], rows: `
Elma Ağacı|Meyve|Çiçek|Bahçe
Armut Ağacı|Meyve|Bahçe|Dal
Kiraz Ağacı|Meyve|Bahar|Çiçek
Portakal Ağacı|Narenciye|Turuncu|Bahçe
Limon Ağacı|Narenciye|Sarı|Bahçe
Nar Ağacı|Meyve|Kırmızı|Tane
Ceviz Ağacı|Kabuk|Meyve|Gölge
Fındık Ocağı|Çalı|Karadeniz|Meyve
Kestane Ağacı|Dikenli|Kozalak|Kış
Kayısı Ağacı|Turuncu|Meyve|Malatya
Şeftali Ağacı|Tüylü|Meyve|Bahar
Dut Ağacı|Meyve|Gölge|Yaprak
Defne Ağacı|Yaprak|Koku|Akdeniz
Okaliptüs|Koala|Koku|Yaprak
Sekoya|Dev|Uzun ömür|Orman
Baobab|Kalın gövde|Afrika|Gövde
Sedir|Kozalak|Lübnan|Orman
Servi|Uzun|İnce|Mezarlık
` },
  { common: ["Doğa", "Çevre"], rows: `
Geri Dönüşüm|Atık|Ayrıştırmak|Yeniden
Atık Ayrıştırma|Kağıt|Plastik|Kutu
Kompostlama|Organik|Toprak|Çürüme
Çevre Kirliliği|Atık|Atıklar|Zarar
Hava Kirliliği|Duman|Egzoz|Nefes
Su Kirliliği|Atık|Nehir|Balık
Toprak Kirliliği|Kimyasal|Tarla|Atık
Gürültü Kirliliği|Ses|Rahatsızlık|Şehir
İklim Değişikliği|Isınma|Hava|Dünya
Küresel Isınma|Sıcaklık|Karbon|Dünya
Karbon Ayak İzi|Emisyon|Ulaşım|Ölçü
Yenilenebilir Enerji|Güneş|Rüzgâr|Sürdürülebilir
Güneş Enerjisi|Panel|Işık|Elektrik
Rüzgâr Enerjisi|Türbin|Pervane|Elektrik
Hidroelektrik|Baraj|Su|Türbin
Jeotermal Enerji|Yeraltı|Sıcak|Buhar
Biyoçeşitlilik|Tür|Canlı|Ekosistem
Koruma Alanı|Milli park|Tür|Yasak
Nesli Tükenme|Tür|Azalmak|Koruma
Erozyon|Toprak|Rüzgâr|Aşınma
Kuraklık|Yağmur yok|Su|Tarla
Sel|Taşkın|Yağmur|Su
Heyelan|Toprak|Kaymak|Yamaç
Deprem|Sarsıntı|Fay|Yer
Tsunami|Dalga|Deprem|Kıyı
Çığ|Kar|Dağ|Kaymak
Orman Yangını|Alev|Ağaç|Duman
` }
]);
