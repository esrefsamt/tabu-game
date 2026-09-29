import { defineCategory } from "./defineCategory.js";

export const TRAVEL_CARDS = defineCategory("travel", [
  { common: ["Tatil", "Konaklama"], rows: `
Otel|Resepsiyon|Oda|Gece
Pansiyon|Küçük|Oda|Kahvaltı
Hostel|Paylaşımlı|Ranza|Ucuz
Butik Otel|Küçük|Özel|Tasarım
Tatil Köyü|Havuz|Yemek|Plaj
Kamp Alanı|Çadır|Tuvalet|Doğa
Bungalov|Ahşap|Orman|Küçük ev
Dağ Evi|Şömine|Zirve|Kış
Apart Otel|Mutfak|Daire|Oda
Oda Servisi|Sipariş|Kapı|Tepsi
Açık Büfe|Yemek|Seçmek|Tabak
Kahvaltı Dahil|Otel|Sabah|Rezervasyon
Her Şey Dahil|Otel|Yemek|İçecek
Resepsiyon|Giriş|Anahtar|Görevli
Check-in|Giriş|Kimlik|Oda
Check-out|Çıkış|Oda|Hesap
Rezervasyon|Önceden|Tarih|Yer
İptal|Vazgeçmek|Rezervasyon|Ücret
Oda Anahtarı|Kapı|Kart|Resepsiyon
Mini Bar|Oda|İçecek|Ücret
Otel Kasası|Değerli|Şifre|Oda
` },
  { common: ["Seyahat", "Yolculuk"], rows: `
Turist|Gezmek|Yabancı|Fotoğraf
Gezgin|Keşif|Çanta|Yol
Sırt Çantalı Gezgin|Ucuz|Hostel|Rota
Tur Rehberi Kitabı|Harita|Öneri|Şehir
Gezi Planı|Gün|Rota|Görmek
Rota|Yol|Harita|Hedef
Aktarma|Değiştirmek|Uçuş|Beklemek
Direkt Uçuş|Aktarma yok|Havalimanı|Varış
Gidiş Dönüş Bileti|İki yön|Tarih|Uçuş
Tek Yön Bilet|Gidiş|Dönüş yok|Biniş
Uçuş Kartı|Koltuk|Kapı|Biniş
Bagaj|Valiz|Teslim|Ağırlık
El Bagajı|Kabin|Çanta|Uçak
Bagaj Bandı|Valiz|Dönmek|Havalimanı
Güvenlik Kontrolü|X-ray|Çanta|Havalimanı
Pasaport Kontrolü|Sınır|Kimlik|Damga
Vize|İzin|Konsolosluk|Ülke
Sınır Kapısı|Geçiş|Kontrol|Ülke
Gümrük Beyanı|Eşya|Sınır|Bildirmek
Döviz Bürosu|Para|Kur|Bozdurmak
Yerel Para Birimi|Ülke|Ödeme|Döviz
Zaman Dilimi|Saat farkı|Ülke|Dünya
Jet Lag|Uçuş|Uyku|Saat farkı
` },
  { common: ["Gezi", "Yeri"], rows: `
Tarihi Merkez|Eski|Meydan|Sokak
Eski Şehir|Dar sokak|Tarihi|Mimari
Seyir Terası|Manzara|Yüksek|Bakmak
Anıt|Hatıra|Heykel|Meydan
Heykel|Taş|Bronz|Sanat
Çeşme|Su|Meydan|Musluk
Kale|Surlar|Savunma|Tepe
Şato|Kule|Kraliyet|Avrupa
Saray|Hükümdar|Büyük|Oda
Tapınak|İbadet|Sütun|Kutsal
Cami|Minare|Namaz|Kubbe
Kilise|Çan|İbadet|Haç
Sinagog|İbadet|Tevrat|Yahudi
Manastır|Rahip|Sessizlik|İbadet
Arkeolojik Alan|Kazı|Tarih|Kalıntı
Harabe|Yıkık|Eski|Taş
Milli Park|Koruma|Doğa|Yürüyüş
Botanik Bahçesi|Bitki|Sera|Yürüyüş
Hayvanat Bahçesi|Kafes|Tür|Ziyaret
Akvaryum|Cam|Balık|Su
Su Parkı|Kaydırak|Havuz|Yaz
Kayak Merkezi|Kar|Pist|Telesiyej
Sahil Kasabası|Deniz|Küçük|Tatil
` },
  { common: ["Gezmek", "Turizm"], rows: `
Şehir Turu|Rehber|Otobüs|Sokak
Tekne Turu|Kıyı|Güverte|Manzara
Doğa Yürüyüşü|Patika|Orman|Çanta
Safari|Vahşi hayvan|Araç|Afrika
Kampçılık|Çadır|Ateş|Doğa
Karavan Tatili|Yol|Araç|Konaklama
Günübirlik Gezi|Sabah|Akşam|Yakın
Hafta Sonu Kaçamağı|İki gün|Dinlenmek|Yakın
Rehberli Tur|Grup|Anlatım|Program
Müze Gezisi|Eser|Sergi|Bilet
Yol Günlüğü|Not|Gezi|Anı
Hatıra Eşyası|Hediyelik|Gezi|Saklamak
Manzara Fotoğrafı|Kamera|Ufuk|Gezi
` }
]);
