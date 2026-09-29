import { defineCategory } from "./defineCategory.js";

export const MISCELLANEOUS_CARDS = defineCategory("misc", [
  { common: ["Ev", "Aile"], rows: `
Anne|Çocuk|Doğum|Bakım
Baba|Çocuk|Ebeveyn|Yakın
Kardeş|Aynı anne|Aynı baba|Yakın
Abla|Büyük|Kız kardeş|Yakın
Ağabey|Büyük|Erkek kardeş|Yakın
Bebek|Kundak|Emeklemek|Ağlamak
Çocuk|Oyun|Okul|Küçük
Ergen|Genç|Büyümek|Lise
Ebeveyn|Anne|Baba|Çocuk
Büyükanne|Nine|Torun|Yakın
Büyükbaba|Dede|Torun|Yakın
Torun|Dede|Nine|Çocuk
Teyze|Anne|Kız kardeş|Yakın
Hala|Baba|Kız kardeş|Yakın
Dayı|Anne|Erkek kardeş|Yakın
Amca|Baba|Erkek kardeş|Yakın
Kayınpeder|Eş|Baba|Yakın
Gelin|Düğün|Eş|Beyaz
Damat|Düğün|Eş|Takım
Nişanlı|Yüzük|Evlilik|Söz
` },
  { common: ["Bebek", "Bakım"], rows: `
Bebek Arabası|Tekerlek|Gezmek|Katlanır
Mama Sandalyesi|Yemek|Yüksek|Tepsi
Emzik|Ağız|Susturmak|Silikon
Biberon|Süt|Şişe|Beslemek
Bebek Bezi|Değiştirmek|Islak|Alt
Alt Değiştirme Masası|Bez|Çocuk|Temizlik
Bebek Monitörü|Ses|Oda|Dinlemek
Oyuncak Ayı|Peluş|Yumuşak|Sarılmak
Çıngırak|Ses|Sallamak|Oyuncak
Kundak|Sarmak|Uyku|Kumaş
Ninni|Uyku|Şarkı|Anne
Masal Saati|Kitap|Uyku|Anlatmak
` },
  { common: ["Kutlama", "Özel gün"], rows: `
Yılbaşı|31 Aralık|Geri sayım|Yeni yıl
Sevgililer Günü|14 Şubat|Kalp|Hediye
Anneler Günü|Mayıs|Çiçek|Teşekkür
Babalar Günü|Haziran|Hediye|Aile
Öğretmenler Günü|24 Kasım|Çiçek|Okul
Dünya Çocuk Günü|Oyun|Çocuk|Farkındalık
Doğum Günü Mumları|Yaş|Üflemek|Pasta
Konfeti|Renkli|Kağıt|Atmak
Balon Süslemesi|Şişirmek|Renkli|Tavan
Parti Şapkası|Koni|Baş|Renkli
Pasta Kesmek|Dilim|Bıçak|Kutlamak
Hediye Çeki|Mağaza|Tutar|Seçmek
Tebrik Kartı|Mesaj|Zarf|Başarı
Davetiye|Tarih|Yer|Misafir
` },
  { common: ["Doğa", "Madde"], rows: `
Taş|Sert|Yer|Kaya
Kaya|Dağ|Büyük|Sert
Çakıl|Küçük|Taş|Kıyı
Kum|Sahil|Tane|Çöl
Toprak|Bitki|Kahverengi|Tarla
Çamur|Islak|Toprak|Kir
Kil|Çömlek|Toprak|Şekil
Kristal Tuz|Beyaz|Tane|Maden
Kömür|Siyah|Yakıt|Maden
Petrol|Siyah|Yeraltı|Yakıt
Doğalgaz|Ocak|Boru|Yakıt
Odun|Ağaç|Ateş|Yarmak
Kül|Ateş|Gri|Toz
Duman|Ateş|Gri|Yükselmek
Buhar|Su|Sıcak|Yükselmek
Buz|Donmak|Soğuk|Küp
Çam Sakızı|Yapışkan|Ağaç|Koku
Kehribar|Fosil reçine|Sarı|Takı
İnci|İstiridye|Beyaz|Takı
Elmas|Sert|Değerli|Işıltı
Yakut|Kırmızı|Değerli|Taş
Zümrüt|Yeşil|Değerli|Taş
Safir|Mavi|Değerli|Taş
Opal|Renkli|Işıltı|Taş
Akik|Desen|Taş|Takı
Turkuaz|Mavi yeşil|Taş|Takı
` },
  { common: ["İş", "Ofis"], rows: `
Toplantı|Masa|Gündem|Konuşmak
Gündem|Madde|Toplantı|Konu
Tutanak|Yazmak|Toplantı|Kayıt
Rapor|Veri|Yazı|Sonuç
Sunum Dosyası|Slayt|Proje|Ekran
Evrak|Belge|İmza|Dosya
İmza|Kalem|Onay|Ad
Mühürlü Belge|Resmi|Damga|Kağıt
Vekâletname|Noter|Yetki|İmza
Sözleşme|Taraf|İmza|Koşul
Teklif|Fiyat|Öneri|Müşteri
Sipariş|Ürün|İstemek|Teslimat
Teslimat|Paket|Adres|Kurye
Stok|Depo|Ürün|Sayım
Envanter|Liste|Eşya|Sayım
Son Tarih|Teslim|Süre|Takvim
Proje Ekibi|Çalışan|Görev|Birlikte
Müşteri|Satın almak|Hizmet|Şikâyet
İş Görüşmesi|Aday|Soru|Mülakat
Özgeçmiş|Deneyim|Başvuru|Belge
İş İlanı|Pozisyon|Başvuru|Şirket
Deneme Süresi|Yeni iş|Ay|Çalışan
Terfi|Pozisyon|Yükselmek|Kariyer
İstifa|Ayrılmak|Çalışan|Dilekçe
Emeklilik|Yaş|Çalışma|Maaş
` }
]);
