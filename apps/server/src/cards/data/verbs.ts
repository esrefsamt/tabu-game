import { defineCategory } from "./defineCategory.js";

export const VERB_CARDS = defineCategory("verb", [
  { common: ["Mutfak", "Yemek"], rows: `
Doğramak|Bıçak|Küçük|Tahta
Rendelemek|Diş|Peynir|Havuç
Soymak|Kabuk|Bıçak|Patates
Karıştırmak|Kaşık|Kase|Döndürmek
Çırpmak|Yumurta|Tel|Köpük
Yoğurmak|Hamur|El|Un
Haşlamak|Su|Kaynamak|Tencere
Kızartmak|Yağ|Tava|Çıtır
Fırınlamak|Tepsi|Sıcaklık|Pişirmek
Izgara Yapmak|Ateş|Et|Tel
Közlemek|Ateş|Biber|Kabuk
Buharda Pişirmek|Su|Tencere|Sebze
Marine Etmek|Sos|Bekletmek|Et
Mayalamak|Hamur|Kabarmak|Maya
Süzmek|Sıvı|Delik|Süzgeç
Servis Etmek|Tabak|Masa|Sunmak
Tatmak|Dil|Lezzet|Kaşık
Çiğnemek|Diş|Ağız|Lokma
Yutmak|Boğaz|Ağız|Lokma
` },
  { common: ["Hareket", "Vücut"], rows: `
Koşmak|Hızlı|Adım|Yarış
Yürümek|Adım|Ayak|Yol
Zıplamak|Havaya|Ayak|Yerden
Atlamak|Engel|Yüksek|Sıçramak
Tırmanmak|Yukarı|Dağ|El
Sürünmek|Yere yakın|Karın|İlerlemek
Emeklemek|Bebek|Diz|Yer
Yuvarlanmak|Dönmek|Yerde|Top
Dönmek|Çevirmek|Etraf|Yön
Eğilmek|Bel|Aşağı|Bükülmek
Uzanmak|Kol|Yetişmek|Yatmak
Gerinmek|Kas|Sabah|Esnemek
Esnemek|Ağız|Uyku|Yorgun
Oturmak|Sandalye|Diz|Dinlenmek
Ayağa Kalkmak|Oturmak|Dik|Bacak
Çömelmek|Diz|Alçalmak|Yere yakın
Tekme Atmak|Ayak|Top|Vurmak
Yumruk Atmak|El|Boks|Vurmak
Alkışlamak|El|Bravo|Çırpmak
El Sallamak|Veda|Kol|Merhaba
Dans Etmek|Müzik|Ritim|Adım
Yüzmek|Su|Kulaç|Havuz
Dalmak|Su altı|Nefes|Derin
Buzda Kaymak|Buz|Kar|Denge
Sallanmak|İleri geri|Salıncak|Ritim
` },
  { common: ["İnsan", "İletişim"], rows: `
Konuşmak|Ses|Kelime|Ağız
Fısıldamak|Sessiz|Kulak|Alçak
Bağırmak|Yüksek ses|Öfke|Duyurmak
Şarkı Söylemek|Melodi|Ses|Mikrofon
Anlatmak|Hikâye|Söz|Dinleyici
Dinlemek|Kulak|Ses|Dikkat
Sormak|Soru|Cevap|Merak
Yanıtlamak|Soru|Cevap|Konuşmak
Tartışmak|Fikir|Anlaşmazlık|Söz
İkna Etmek|Fikir|Kabul|Söz
Şaka Yapmak|Espri|Gülmek|Komik
Dedikodu Yapmak|Başkası|Konuşmak|Sır
Söz Vermek|Gelecek|Yapmak|Güven
Özür Dilemek|Hata|Affetmek|Pişman
Teşekkür Etmek|Minnet|Sağ ol|Yardım
Tebrik Etmek|Başarı|Kutlamak|Bravo
Selam Vermek|Merhaba|Karşılaşmak|El
Vedalaşmak|Hoşça kal|Ayrılmak|El
Sarılmak|Kucak|Kol|Sevgi
Tokalaşmak|El|Tanışmak|Sıkmak
` },
  { common: ["Ev", "Temizlik"], rows: `
Süpürmek|Toz|Zemin|Süpürge
Silmek|Bez|Leke|Yüzey
Yıkamak|Su|Sabun|Kir
Durulamak|Su|Sabun|Arındırmak
Kurulamak|Havlu|Islak|Kuru
Ütülemek|Kırışık|Gömlek|Buhar
Katlamak|Kıyafet|Düzen|Kare
Asmak|Askı|Duvar|Yukarı
Toplamak|Dağınık|Düzen|Eşya
Toz Almak|Raf|Bez|Yüzey
Cam Silmek|Pencere|Bez|Parlamak
Çamaşır Asmak|İp|Mandal|Kurutmak
Çöp Atmak|Poşet|Kova|Atık
Leke Çıkarmak|Deterjan|Kumaş|Ovmak
` },
  { common: ["Dışarı", "Doğa"], rows: `
Tohum Ekmek|Çimlenmek|Toprak|Bitki
Sulamak|Su|Bitki|Bahçe
Budamak|Dal|Makas|Ağaç
Biçmek|Çim|Makine|Kısaltmak
Kazmak|Toprak|Kürek|Çukur
Kamp Kurmak|Çadır|Orman|Gece
Balık Tutmak|Olta|Yem|Su
Yürüyüşe Çıkmak|Park|Adım|Ayakkabı
Pikniğe Gitmek|Sepet|Örtü|Açık hava
Güneşlenmek|Plaj|Ten|Yaz
Kar Topu Oynamak|Kış|Atmak|Eldiven
Uçurtma Uçurmak|İp|Rüzgâr|Gökyüzü
` },
  { common: ["El", "Eşya"], rows: `
Açmak|Kapı|Kilit|İçeri
Kapatmak|Kapı|Örtmek|Son
Taşımak|Yük|Bir yerden|Götürmek
Kaldırmak|Yukarı|Ağır|Güç
İtmek|Öne|Kapı|Kuvvet
Çekmek|Kendine|Halat|Kuvvet
Tutmak|Kavramak|Parmak|Düşürmemek
Bırakmak|Serbest|Salmak|Düşmek
Fırlatmak|Uzak|Atmak|Kol
Yakalamak|Top|Hız|Tutmak
Kesmek|Bıçak|Makas|Ayırmak
Yapıştırmak|Tutkal|Bant|Birleştirmek
Bağlamak|Düğüm|İp|Sıkmak
Çözmek|Düğüm|Açmak|Serbest
Dikmek|İğne|İplik|Kumaş
Örmek|İplik|Şiş|Yün
Boyamak|Fırça|Renk|Duvar
Çizmek|Kalem|Kağıt|Resim
Yazmak|Kalem|Harf|Kağıt
Okumak|Kitap|Sayfa|Harf
` },
  { common: ["Zihin", "Düşünce"], rows: `
Hatırlamak|Geçmiş|Bellek|Anı
Unutmak|Hatırlamamak|Bellek|Aklından çıkmak
Hayal Kurmak|Gelecek|Düş|Tasarlamak
Planlamak|Önceden|Takvim|Adım
Karar Vermek|Seçmek|Düşünmek|Sonuç
Tahmin Etmek|Bilmemek|Olasılık|Öngörmek
Merak Etmek|Soru|Öğrenmek|İlgi
Araştırmak|Bilgi|Kaynak|İncelemek
Öğrenmek|Bilgi|Yeni|Ders
Öğretmek|Anlatmak|Öğrenci|Bilgi
Hesaplamak|Sayı|İşlem|Sonuç
Karşılaştırmak|Fark|Benzer|İki
Sınıflandırmak|Grup|Özellik|Ayırmak
Anlamak|Kavramak|Anlam|Fark etmek
Yanılmak|Hata|Yanlış|Sanmak
Şüphelenmek|Kuşku|Emin olmamak|Belirti
İnanmak|Güven|Doğru|Düşünmek
Odaklanmak|Dikkat|Tek|Konsantre
` },
  { common: ["Duygu", "İnsan"], rows: `
Gülmek|Komik|Mutlu|Ses
Ağlamak|Gözyaşı|Üzüntü|Hıçkırık
Kızmak|Öfke|Sinir|Bağırmak
Korkmak|Tehlike|Ürkmek|Titremek
Sevinmek|Mutlu|Haber|Gülümsemek
Üzülmek|Keder|Ağlamak|Kayıp
Şaşırmak|Beklenmedik|Ağız açık|Hayret
Utanmak|Yüz kızarmak|Mahcup|Bakış
Özlemek|Uzak|Hasret|Görmek
Kıskanmak|Başka biri|İmrenmek|Rahatsız
Heyecanlanmak|Kalp|Sabırsız|Beklemek
Sakinleşmek|Nefes|Rahatlamak|Öfke
Paniklemek|Telaş|Korku|Acele
Rahatlamak|Gevşemek|Huzur|Dinlenmek
` }
]);

