import { defineCategory } from "./defineCategory.js";

export const EVERYDAY_CARDS = defineCategory("everyday", [
  { common: ["Günlük", "Yaşam"], rows: `
Kahvaltı|Sabah|Yemek|Peynir
Öğle Yemeği|Gün ortası|Mola|Yemek
Akşam Yemeği|Sofra|Gece|Aile
Atıştırmalık|Ara öğün|Küçük|Açlık
Alışveriş|Market|Para|Sepet
Pazar|Tezgâh|Sebze|Kalabalık
Market|Raf|Kasa|Ürün
Mahalle Bakkalı|Ekmek|Veresiye|Dükkân
Kasiyer|Kasa|Ödeme|Fiş
Alışveriş Listesi|Yazmak|Ürün|Unutmamak
Kasa Fişi|Kasa|Ödeme|Kağıt
Fatura|Tutar|Ödeme|Tarih
İndirim|Fiyat|Yüzde|Etiket
Kampanya|Teklif|Süre|Fiyat
İade|Geri vermek|Ürün|Para
Garanti|Belge|Tamir|Süre
Taksit|Ödeme|Ay|Kredi kartı
Nakit Para|Banknot|Bozuk|Cüzdan
Bozuk Para|Madeni|Kumbara|Üst
Banknot|Kağıt|Cüzdan|Değer
Kredi Kartı|Banka|Ödeme|Limit
Banka Kartı|Hesap|ATM|Ödeme
ATM|Para çekmek|Kart|Şifre
Banka Şubesi|Hesap|Vezne|Sıra
Para Çekmek|ATM|Nakit|Kart
Para Yatırmak|Hesap|Banka|Nakit
Havale|Hesap|Göndermek|Banka
Kira|Ev|Aylık|Ödeme
Aidat|Apartman|Aylık|Yönetim
Abonelik|Aylık|Ücret|Hizmet
Randevu|Saat|Görüşme|Tarih
Sıra Numarası|Beklemek|Fiş|Ekran
Bekleme Salonu|Koltuk|Randevu|Sıra
` },
  { common: ["Sosyal", "İnsan"], rows: `
Misafir|Ev|Ziyaret|Ağırlamak
Davet|Çağırmak|Etkinlik|Kart
Ziyaret|Gitmek|Görüşmek|Ev
Sohbet|Konuşmak|Dinlemek|Arkadaş
Tanışma|İsim|İlk|El sıkışmak
Vedalaşma|Ayrılmak|Hoşça kal|El sallamak
Selamlaşma|Merhaba|Karşılaşmak|El sıkışmak
Özür|Hata|Affetmek|Pişman
Teşekkür|Minnet|Sağ ol|Yardım
Tebrik|Başarı|Kutlamak|Alkış
Kutlama|Pasta|Neşe|Özel gün
Sürpriz|Beklenmedik|Hediye|Şaşkınlık
Hediye|Paket|Vermek|Doğum günü
Hediye Paketi|Kurdele|Kağıt|Sarmak
Doğum Günü|Yaş|Pasta|Mum
Yıldönümü|Tarih|Kutlamak|Tekrar
Nişan|Yüzük|Düğün|Çift
Düğün|Gelin|Damat|Nikâh
Nikâh|İmza|Evlilik|Şahit
Kına Gecesi|Eller|Düğün|Gelenek
Bebek Ziyareti|Doğum|Hediye|Aile
Mezuniyet Töreni|Kep|Diploma|Sahne
Veda Partisi|Ayrılmak|Kutlama|İş
Ev Partisi|Müzik|Arkadaş|Davet
Komşu|Yan daire|Apartman|Selam
Arkadaş|Dost|Sohbet|Birlikte
Akraba|Aile|Ziyaret|Soy
Kuzen|Teyze|Amca|Aile
Yeğen|Kardeş|Çocuk|Aile
Kayınvalide|Eş|Anne|Aile
Görümce|Eş|Kız kardeş|Aile
` },
  { common: ["Şehir", "Günlük"], rows: `
Apartman|Kat|Daire|Asansör
Site|Blok|Güvenlik|Havuz
Mahalle|Komşu|Sokak|Semt
Sokak|Cadde|Kaldırım|Ev
Cadde|Geniş|Trafik|Dükkân
Bulvar|Geniş|Ağaç|Yol
Meydan|Kalabalık|Heykel|Toplanmak
Park|Ağaç|Bank|Oyun
Çocuk Parkı|Salıncak|Kaydırak|Oyun
Yürüyüş Yolu|Park|Adım|Spor
Bisiklet Yolu|Şerit|Pedal|Güvenlik
Kaldırım|Yaya|Yol|Kenar
Üst Geçit|Merdiven|Yaya|Trafik
Alt Geçit|Yeraltı|Yaya|Trafik
Otopark|Araç|Yer|Park etmek
Garaj|Araç|Kapı|Ev
Benzin İstasyonu|Pompa|Yakıt|Araç
Şarj İstasyonu|Elektrikli|Araç|Pil
Kafe|Kahve|Masa|Sohbet
Restoran|Menü|Garson|Yemek
Lokanta|Esnaf|Yemek|Masa
Pastane|Tatlı|Börek|Vitrin
Fırın Dükkânı|Ekmek|Sıcak|Sabah
Berber Dükkânı|Saç|Tıraş|Makas
Eczane|İlaç|Reçete|Nöbetçi
Hastane|Doktor|Hasta|Servis
Klinik|Muayene|Randevu|Doktor
Postane|Mektup|Kargo|Pul
Belediye|Yerel|Hizmet|Başkan
Muhtarlık|Mahalle|Belge|İkamet
Adliye|Mahkeme|Hakim|Dava
Karakol|Polis|İfade|Güvenlik
İtfaiye İstasyonu|Yangın|Araç|Hortum
` },
  { common: ["Gün", "Zaman"], rows: `
Sabah|Güneş|Uyanmak|Kahvaltı
Öğlen|Güneş|Yemek|Gün ortası
Akşam|Gün batımı|Yemek|Gece
Gece|Karanlık|Uyku|Yıldız
Şafak|Gün doğumu|Sabah|Işık
Hafta Sonu|Cumartesi|Pazar|Tatil
Tatil Günü|Dinlenmek|İş yok|Boş
İş Günü|Mesai|Hafta içi|Ofis
Rutin|Alışkanlık|Her gün|Tekrar
Mola|Dinlenmek|Ara|İş
Mesai|Çalışmak|Saat|Ofis
Fazla Mesai|Ek saat|Çalışmak|Ücret
Geç Kalmak|Saat|Yetişememek|Özür
Erken Kalkmak|Alarm|Sabah|Uyanmak
Uykuya Dalmak|Yatak|Göz|Gece
Alarm|Saat|Uyanmak|Çalmak
Erteleme Tuşu|Alarm|Beş dakika|Uyku
` }
]);

