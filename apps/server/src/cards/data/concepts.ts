import { defineCategory } from "./defineCategory.js";

export const CONCEPT_CARDS = defineCategory("concept", [
  { common: ["Duygu", "İnsan"], rows: `
Mutluluk|Sevinç|Gülümseme|İyi his
Üzüntü|Keder|Gözyaşı|Kayıp
Öfke|Kızgınlık|Sinir|Bağırmak
Korku|Tehlike|Titremek|Kaçmak
Heyecan|Kalp|Sabırsızlık|Yeni
Şaşkınlık|Beklenmedik|Hayret|Ağız açık
Utanç|Mahcubiyet|Yüz kızarması|Hata
Gurur|Başarı|Övünmek|Aile
Kıskançlık|İmrenmek|Başkası|Rahatsızlık
Hasret|Özlemek|Uzaklık|Kavuşma
Huzur|Sakinlik|Sessizlik|Rahat
Kaygı|Endişe|Gelecek|Tedirginlik
Panik|Telaş|Korku|Acele
Umut|Gelecek|Beklenti|İyi
Hayal Kırıklığı|Beklenti|Olmamak|Üzülmek
Merak|Soru|Öğrenmek|İlgi
Sevgi|Kalp|Bağ|Şefkat
Aşk|Kalp|Romantik|Tutku
Nefret|Sevmemek|Öfke|Düşmanlık
Şefkat|Koruma|Sevgi|Nazik
Empati|Anlamak|Bakış açısı|Başkasının yeri
Minnettarlık|Teşekkür|İyilik|Borç
Yalnızlık|Tek başına|Kimse|Sessizlik
Öz güven|Kendine inanmak|Cesaret|Güven
` },
  { common: ["Değer", "Toplum"], rows: `
Adalet|Hukuk|Eşitlik|Hak
Eşitlik|Aynı hak|Fırsat|Adalet
Özgürlük|Serbest|Seçim|Hak
Sorumluluk|Görev|Yükümlülük|Hesap
Saygı|Nezaket|Değer vermek|Sınır
Hoşgörü|Farklılık|Anlayış|Kabul
Güven|İnanmak|Söz|Emin
Dürüstlük|Doğru|Yalan|Açık
Sadakat|Bağlılık|Güven|Söz
Cesaret|Korku|Göze almak|Atılmak
Sabır|Beklemek|Dayanmak|Sakin
Azim|Vazgeçmemek|Çaba|Hedef
Alçakgönüllülük|Mütevazı|Övünmemek|Kibir
Cömertlik|Paylaşmak|Vermek|Eli açık
Dayanışma|Birlikte|Yardım|Destek
Yardımlaşma|Destek|İhtiyaç|Birlik
İş Birliği|Ortak|Birlikte|Hedef
Rekabet|Rakip|Yarış|Kazanmak
Barış|Savaşsız|Huzur|Anlaşma
Demokrasi|Seçim|Oy|Halk
Hak|Adalet|Sahip olmak|Yasa
Görev|Yapmak|Sorumluluk|İş
Kural|Uyulmak|Yasak|Düzen
Yasa|Meclis|Kural|Devlet
Gelenek|Geçmiş|Kültür|Aktarmak
Görenek|Adet|Alışkanlık|Kuşak
` },
  { common: ["Zaman", "Hayat"], rows: `
Geçmiş|Önce|Anı|Tarih
Gelecek|Sonra|Plan|Yarın
Şimdi|An|Bu dakika|Güncel
Anı|Hatıra|Geçmiş|Fotoğraf
Çocukluk|Oyun|Küçük|Geçmiş
Gençlik|Enerji|Yaş|Büyümek
Yaşlılık|Emeklilik|Tecrübe|Yıllar
Doğum|Bebek|Başlangıç|Anne
Büyüme|Boy|Gelişmek|Çocuk
Değişim|Farklı|Önce|Sonra
Başlangıç|İlk|Yol|Yeni
Bitiş|Son|Tamam|Veda
Fırsat|Şans|Değerlendirmek|Kapı
Şans|Talih|Rastlantı|Uğur
Kader|Yazgı|Gelecek|Alın yazısı
Tesadüf|Rastlantı|Beklenmedik|Karşılaşma
Alışkanlık|Rutin|Tekrar|Her gün
Deneyim|Yaşamak|Öğrenmek|Tecrübe
Tecrübe|Deneyim|Yıllar|Bilgi
Bilgelik|Akıl|Deneyim|Derin
` },
  { common: ["Düşünce", "Fikir"], rows: `
Yaratıcılık|Hayal gücü|Yeni|Üretmek
Hayal Gücü|Zihin|Kurmak|Gerçek dışı
Mantık|Akıl|Çıkarım|Tutarlı
Sezgi|İçinden|His|Tahmin
İlham|Esin|Sanat|Birden
Meraklılık|Soru|Öğrenmek|İlgi
Kararsızlık|Seçememek|İki seçenek|Tereddüt
Şüphe|Kuşku|Emin olmamak|Güven
Ön Yargı|Tanımadan|Yargı|Peşin
Eleştiri|Yorum|Eksik|Değerlendirme
Görüş|Kanaat|Bakış açısı|Savunmak
Fikir Ayrılığı|Anlaşmazlık|Tartışma|Görüş
Uzlaşma|Orta yol|Anlaşma|Taviz
Çözüm|Sorun|Yanıt|Yol
Sorun|Problem|Engel|Çözüm
Hedef|Amaç|Ulaşmak|Plan
Amaç|Niyet|Hedef|Sebep
Niyet|İstemek|Plan|İçten
Karar|Seçim|Sonuç|Düşünmek
Seçenek|Alternatif|Tercih|Birden fazla
Tercih|Seçmek|Beğenmek|Alternatif
` },
  { common: ["Toplum", "Ekonomi"], rows: `
Para|Ödeme|Cüzdan|Değer
Bütçe|Gelir|Gider|Plan
Tasarruf|Biriktirmek|Az harcamak|Para
Borç|Alacak|Ödemek|Para
Faiz|Banka|Oran|Kredi
Kredi|Banka|Borç|Taksit
Yatırım|Para|Getiri|Risk
Enflasyon|Fiyat|Artış|Para
Fiyat|Ücret|Etiket|Ödeme
Ücret|Emek|Ödeme|Maaş
Maaş|Aylık|Çalışan|Ödeme
Gelir|Kazanmak|Para|Bütçe
Gider|Harcama|Para|Bütçe
Vergi|Devlet|Ödeme|Gelir
Ticaret|Almak|Satmak|Mal
Piyasa|Alıcı|Satıcı|Fiyat
Üretim|Fabrika|Mal|İş
Tüketim|Satın almak|Kullanmak|Ürün
İthalat|Yurt dışı|Almak|Mal
İhracat|Yurt dışı|Satmak|Mal
` }
]);

