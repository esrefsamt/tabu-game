import { defineCategory } from "./defineCategory.js";

export const LANGUAGE_CARDS = defineCategory("language", [
  { common: ["Dil", "Dil bilgisi"], rows: `
İsim|Varlık|Ad|Sözcük
Özel İsim|Kişi|Şehir|Büyük harf
Cins İsim|Tür|Genel|Örnek
Tekil İsim|Bir|Çoğul|Varlık
Çoğul İsim|Birden fazla|Çoğul eki|Varlık
Fiil|Eylem|İş|Hareket
Sıfat|İsim|Nitelemek|Nasıl
Zamir|İsmin yerine|O|Kişi
Edat|İlişki|Kelime|Tek başına
Bağlaç|Cümle|Birleştirmek|Ve
Ünlem|Duygu|Seslenmek|Nokta
Özne|Cümle|Kim|Yapan
Yüklem|Cümle|Yargı|Fiil
Nesne|Özne|Etkilenen|Cümle
Dolaylı Tümleç|Nereye|Kime|Cümle
Zarf Tümleci|Ne zaman|Nasıl|Cümle
Belirteç|Zarf|Fiil|Derece
Zaman Kipi|Geçmiş|Şimdiki|Gelecek
Geniş Zaman|Alışkanlık|Her zaman|Ek
Şimdiki Zaman|Şu an|Devam|Ek
Gelecek Zaman|Sonra|Yarın|Ek
Geçmiş Zaman|Önce|Dün|Ek
Kip|Dilek|Haber|Fiil
Çekim Eki|Kök|Sözcük|Eklenmek
Yapım Eki|Yeni kelime|Kök|Anlam
Kök Sözcük|Baş|Ek|Kelime
Gövde Sözcük|Kök|Yapım eki|Kelime
Birleşik Kelime|İki|Sözcük|Yeni anlam
` },
  { common: ["Dil", "Ses"], rows: `
Harf|Alfabe|Yazı|Sembol
Sesli Harf|Ünlü|Ağız|Sekiz
Sessiz Harf|Ünsüz|Konuşma|Yirmi bir
Kafiye|Şiir|Uyak|Dize sonu
Redif|Şiir|Tekrar|Ek
Ölçü|Şiir|Hece|Düzen
Vurgu|Hece|Öne çıkarmak|Kelime
Tonlama|Cümle|Duygu|Söyleyiş
Telaffuz|Söyleyiş|Ağız|Doğru
Yerel Ağız|Yöre|Konuşma|Fark
Lehçe|Konuşma|Bölge|Farklılaşma
Argo|Günlük|Sokak|Söyleyiş
Deyim|Kalıp|Söz|Anlam
Atasözü|Öğüt|Gelenek|Söz
Özdeyiş|Kısa|Düşünce|Söz
Eş Anlamlı|Yakın anlam|Sözcük|Aynı
Zıt Anlamlı|Karşıt|Sözcük|Sıcak soğuk
Eş Sesli|Aynı söyleniş|Farklı anlam|Kelime
Yansıma Sözcük|Taklit|Şırıl|Gürültü
Terim Anlam|Bilim|Alan|Özel sözcük
Mecaz Anlam|Gerçek dışı|Söz|Benzetme
Gerçek Anlam|Temel|Sözlük|Doğrudan
Yan Anlam|Temel|Benzerlik|Sözcük
Söz Sanatı|Edebiyat|Anlatım|Benzetme
` },
  { common: ["Yazı", "Metin"], rows: `
Başlık|Üst|Konu|Büyük harf
Alt Başlık|Bölüm|Konu|Küçük
Giriş Bölümü|Başlangıç|Konu|İlk paragraf
Gelişme Bölümü|Orta|Açıklama|Paragraf
Sonuç Bölümü|Bitiş|Özet|Kapanış
Ana Fikir|Konu|Mesaj|Yazar
Yardımcı Fikir|Destek|Detay|Ana düşünce
Konu Cümlesi|Paragraf|Baş|Ana fikir
Özet|Kısa|Anlatım|Temel noktalar
Taslak|İlk|Plan|Düzenleme
Redaksiyon|Düzeltme|Yayın öncesi|Editör
Kaynakça|Kitap|Atıf|Listenin sonu
Dipnot İşareti|Yıldız|Numara|Sayfa altı
Tırnak İşareti|Alıntı|Konuşma|İki
Parantez|Açmak|Kapatmak|Ara söz
Nokta|Cümle sonu|Durak|İşaret
Virgül|Ara|Nefes|İşaret
Noktalı Virgül|Virgül|Nokta|Durak
İki Nokta|Açıklama|Liste|İşaret
Soru İşareti|Merak|Cümle sonu|Noktalama
Ünlem İşareti|Duygu|Seslenme|Noktalama
Üç Nokta|Yarım|Devam|İşaret
Tire İşareti|Çizgi|Konuşma|Aralık
` }
]);
