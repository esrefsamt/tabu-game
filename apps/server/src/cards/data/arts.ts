import { defineCategory } from "./defineCategory.js";

export const ARTS_CARDS = defineCategory("arts", [
  { common: ["Görsel sanat", "Resim"], rows: `
Portre|Yüz|Kişi|Tablo
Manzara Resmi|Doğa|Ufuk|Tuval
Natürmort|Meyve|Vazo|Hareketsiz
Otoportre|Ressam|Kendi|Ayna
Duvar Resmi|Duvar|Büyük|Fresk
Fresk|Islak sıva|Duvar|Boya
Karikatür|Abartı|Mizah|Çizim
İllüstrasyon|Kitap|Çizim|Görsel
Eskiz|Taslak|Hızlı|Çizim
Desen|Tekrar|Motif|Süs
Perspektif|Derinlik|Kaçış noktası|Çizim
Işık Gölge|Kontrast|Hacim|Karanlık
Kolaj|Kesip yapıştırmak|Parça|Görsel
Linol Baskı|Oyma|Mürekkep|Kâğıt
Tahta Baskı|Ahşap|Oyma|Baskı
Serigrafi|Elek|Baskı|Tişört
Litografi|Taş|Baskı|Mürekkep
Monotip|Tek baskı|Plaka|Boya
Tuval|Germe|Çerçeve|Boya
Şövale|Ayak|Tuval|Ressam
Palet|Renk|Karıştırmak|Boya
Spatula Boyama|Doku|Boya|Tuval
Fırça Darbesi|İz|Kıl|Boya
Pigment|Toz|Renk|Boya
Eskitme Tekniği|Yüzey|Antika|Boya
` },
  { common: ["Sahne", "Performans"], rows: `
Dekor|Perde|Arka plan|Set
Sahne Arkası|Perde|Oyuncu|Görünmeyen
Prova|Tekrar|Hazırlık|Gösteri
Prömiyer|İlk|Gösterim|Tiyatro
Matine|Gündüz|Gösteri|Seans
Perde Arası|Mola|Seyirci|Oyun
Final Selamı|Alkış|Oyuncu|Perde
Başrol|Ana karakter|Oyuncu|Film
Yan Rol|İkincil|Oyuncu|Karakter
Figüran|Arka plan|Kalabalık|Rol
Doğaçlama|Hazırlıksız|Anlık|Plansız
Mimik|Yüz|Duygu|Oyunculuk
Jest|El|Hareket|Anlatım
Monolog|Tek kişi|Konuşma|Tiyatro
Diyalog|İki kişi|Konuşma|Karşılıklı
Kulis|Sahne arkası|Oyuncu|Hazırlık
Dekor Değişimi|Perde|Set|Aralık
Sahne Işığı|Spot|Parlak|Oyuncu
Spot Işığı|Tek nokta|Yönetmen|Aydınlatma
Kostüm Provası|Giysi|Oyuncu|Hazırlık
Makyaj Odası|Ayna|Oyuncu|Hazırlık
Dans Koreografisi|Adım|Hareket|Düzen
Sahne Yönetmeni|Prova|Gösteri|Yönlendirmek
Seyirci|Salon|Alkış|İzlemek
` },
  { common: ["Dans", "Ritim"], rows: `
Modern Dans|Serbest|Hareket|Çağdaş
Çağdaş Dans|Yorum|Hareket|Sahne
Halk Dansı|Yöre|Gelenek|Topluluk
Zeybek|Ege|Ağır|Diz çökmek
Horon|Karadeniz|Hızlı|Daire
Halay|El ele|Dizi|Davul
Çiftetelli|Göbek|Düğün|Kalça
Sirtaki|Yunanistan|Dizi|Tabak
Bharatanatyam|Hindistan|El hareketi|Klasik
Samba|Brezilya|Karnaval|Rio
Tap Dansı|Ayakkabı|Ses|Vuruş
Step Dansı|İrlanda|Ayak|Hızlı
Swing Dansı|Caz|Çift|Dönmek
Koreografi|Adım|Düzen|Hareket
Dans Partneri|Çift|Eş|Sahne
Ritim Tutmak|Müzik|El|Tempo
Doğaçlama Dans|Anlık|Müzik|Hareket
Sahne Kostümü|Dansçı|Giysi|Gösteri
` },
  { common: ["Müzik", "Nota"], rows: `
Do Majör|Gam|Beyaz tuş|Piyano
Minör Ton|Hüzün|Gam|Ses
Nota Değeri|Süre|Vuruş|Ses
Sol Anahtarı|Beş çizgi|Porte|Anahtar işareti
Fa Anahtarı|Bas|Porte|Anahtar işareti
Porte|Beş çizgi|Çizgiler|Dize
Ölçü Çizgisi|Porte|Ritim|Dikey
Tempo|Hız|Dakika|Vuruş
Metronom|Tik tak|Tempo|Çalışmak
Akor|Üç ses|Uyum|Gitar
Arpej|Akor|Tek tek|Piyano
Gam|Dizi|Ses|Çıkmak
Oktav|Sekiz|Aralık|Ses
Bemol|Yarım ses|Düşürmek|İşaret
Diyez|Yarım ses|Yükseltmek|İşaret
Natürel İşareti|İptal|Diyez|Bemol
Senfoni Orkestrası|Şef|Çalgı|Klasik
Koro Şefi|El|Tempo|Topluluk
Müzik Partisyonu|Sayfa|Bölüm|Orkestra
Konser Salonu|Akustik|Sahne|Dinleyici
` }
]);
