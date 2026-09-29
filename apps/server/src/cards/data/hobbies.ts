import { defineCategory } from "./defineCategory.js";

export const HOBBY_CARDS = defineCategory("hobby", [
  { common: ["Hobi", "El işi"], rows: `
Örgü|Şiş|Yün|İlmek
Tığ İşi|İlmek|Kanca|İplik
Nakış|İğne|Desen|Kumaş
Kanaviçe|Çarpı|İplik|Kumaş
Makrome|Düğüm|İp|Duvar
Yama|Onarım|Kumaş|Delik
Patchwork|Parça|Kumaş|Yorgan
Boncuk Dizme|İp|Takı|Renkli
Takı Yapımı|Boncuk|Tel|Kolye
Mum Yapımı|Balmumu|Fitil|Döküm
Sabun Yapımı|Kalıp|Koku|Köpük
Ahşap Boyama|Fırça|Renk|Süs
Seramik Boyama|Tabak|Fırça|Fırın
Çömlek Yapımı|Kil|Torna|Şekil
Model Gemi|Maket|Parça|Deniz
Maket Uçak|Kanat|Yapıştırıcı|Model
Minyatür Ev|Küçük|Mobilya|Maket
Origami Turna|Kağıt|Katlamak|Kuş
Quilling|Kağıt şerit|Kıvırmak|Desen
Kalem Çizimi|Gölge|Grafit|Kağıt
Suluboya|Su|Fırça|Kağıt
Yağlı Boya|Tuval|Fırça|Kuruma
Akrilik Boya|Tuval|Hızlı kuruma|Renk
Karakalem|Grafit|Gölge|Çizim
` },
  { common: ["Hobi", "Koleksiyon"], rows: `
Pul Koleksiyonu|Posta|Albüm|Ülke
Para Koleksiyonu|Madeni|Eski|Albüm
Kartpostal Koleksiyonu|Seyahat|Posta|Resim
Plak Koleksiyonu|Vinil|Müzik|Kapak
Çizgi Roman Koleksiyonu|Kahraman|Sayı|Raf
Taş Koleksiyonu|Mineral|Renk|Doğa
Deniz Kabuğu Koleksiyonu|Sahil|Şekil|Kum
Oyuncak Araba Koleksiyonu|Model|Küçük|Vitrin
Antika Koleksiyonu|Eski|Değer|Pazar
Kart Koleksiyonu|Paket|Nadir|Seri
` },
  { common: ["Hobi", "Dışarı"], rows: `
Kuş Gözlemciliği|Dürbün|Tür|Orman
Yıldız Gözlemciliği|Teleskop|Gece|Gökyüzü
Fotoğraf Gezisi|Kamera|Manzara|Çekim
Bahçecilik|Toprak|Bitki|Sulama
Şehir Bahçeciliği|Balkon|Saksı|Sebze
Mantar Toplama|Orman|Sepet|Tür
Doğa Fotoğrafçılığı|Kamera|Hayvan|Manzara
Define Avı|Harita|Gizli|Aramak
Jeocaching|GPS|Kutu|Koordinat
Balıkçılık|Olta|Yem|Kıyı
Kamp Ateşi|Odun|Alev|Çadır
Doğa Kampı|Çadır|Orman|Uyku
Bisiklet Turu|Pedal|Rota|Yol
Kayak Tatili|Kar|Pist|Dağ
` },
  { common: ["Hobi", "Ev"], rows: `
Kitap Okuma|Sayfa|Roman|Sessiz
Günlük Tutma|Defter|Tarih|Anı
Yaratıcı Yazarlık|Hikâye|Kurgu|Kalem
Yemek Tarifi Deneme|Mutfak|Yeni|Lezzet
Evde Ekmek Yapımı|Hamur|Fırın|Maya
Kahve Demleme|Çekirdek|Su|Filtre
Puzzle Çözme|Parça|Resim|Masa
Maket Yapımı|Küçük|Parça|Yapıştırıcı
Masa Oyunu Gecesi|Arkadaş|Zar|Kart
Film Maratonu|Art arda|Ekran|Patlamış mısır
Dizi Maratonu|Bölüm|Ekran|Gece
Dil Öğrenme|Kelime|Konuşma|Ders
Enstrüman Çalma|Nota|Pratik|Müzik
Ev Bitkisi Bakımı|Saksı|Sulama|Güneş
` }
]);
