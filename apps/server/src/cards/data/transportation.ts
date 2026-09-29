import { defineCategory } from "./defineCategory.js";

export const TRANSPORTATION_CARDS = defineCategory("transport", [
  { common: ["Ulaşım", "Yol"], rows: `
Otomobil|Direksiyon|Motor|Dört tekerlek
Minibüs|Dolmuş|Yolcu|Durak
Otobüs|Şoför|Durak|Bilet
Metrobüs|Ayrı yol|İstanbul|Durak
Tramvay|Ray|Şehir|Elektrik
Metro|Yeraltı|İstasyon|Ray
Füniküler|Yokuş|Ray|Kablo
Teleferik|Kabin|Yükseklik|Kablo
Motosiklet|Kask|İki tekerlek|Motor
Scooter|Ayak|Gidon|Tekerlek
Elektrikli Scooter|Şarj|Gidon|Kiralama
Kaykay|Tahta|Tekerlek|Denge
Paten|Ayak|Tekerlek|Kaymak
Segway|Denge|İki tekerlek|Gidon
Kamyon|Yük|Kasa|Büyük
Kamyonet|Yük|Kasa|Küçük
Tır|Dorse|Yük|Uzun
Çekici|Arıza|Araç|Kurtarma
Ambulans|Hasta|Siren|Acil
İtfaiye Aracı|Yangın|Hortum|Merdiven
Polis Arabası|Siren|Devriye|Mavi
Çöp Kamyonu|Atık|Toplamak|Belediye
Beton Mikseri|İnşaat|Dönmek|Harç
Buldozer|Palet|İnşaat|Toprak
Ekskavatör|Kepçe|Kazmak|İnşaat
Forklift|Palet|Depo|Yük
Vinç|Kaldırmak|İnşaat|Kanca
Karavan|Tatil|Yatak|Tekerlek
Limuzin|Uzun|Lüks|Şoför
Golf Arabası|Küçük|Saha|Elektrikli
` },
  { common: ["Deniz", "Taşıt"], rows: `
Vapur|İskele|Boğaz|Yolcu
Feribot|Araç|İskele|Geçiş
Tekne|Motor|Liman|Küçük
Yat|Lüks|Güverte|Tatil
Kruvaziyer|Tur|Büyük|Liman
Gemi|Kaptan|Güverte|Liman
Yük Gemisi|Konteyner|Liman|Ticaret
Tanker|Petrol|Sıvı|Liman
Balıkçı Teknesi|Ağ|Av|Liman
Yelkenli|Rüzgâr|Direk|Bez
Kayık|Kürek|Küçük|Göl
Sal|Kütük|Nehir|Yüzmek
Denizaltı|Derinlik|Periskop|Su altı
Hovercraft|Hava yastığı|Kıyı|Süzülmek
Sürat Teknesi|Motor|Hız|Dalga
` },
  { common: ["Hava", "Taşıt"], rows: `
Helikopter|Pervane|Pilot|Dikey
Planör|Motorsuz|Süzülmek|Kanat
Balon|Sepet|Sıcak hava|Gökyüzü
Zeplin|Gaz|Uzun|Uçmak
Jet|Hızlı|Motor|Gökyüzü
Yolcu Uçağı|Kabin|Koltuk|Havalimanı
Kargo Uçağı|Yük|Havalimanı|Gövde
Deniz Uçağı|Suya inmek|Kanat|Gövde
Yamaç Paraşütü|Tepe|Kanat|Süzülmek
Paraşüt|Atlamak|Kubbe|Açılmak
` },
  { common: ["Ulaşım", "Yolculuk"], rows: `
İstasyon|Tren|Peron|Ray
Otogar|Otobüs|Bilet|Terminal
Havalimanı|Uçak|Terminal|Güvenlik
Liman|Gemi|İskele|Yük
Peron|Tren|Beklemek|Numara
Durak|Otobüs|Beklemek|Tabela
Bilet|Yolcu|Fiyat|Rezervasyon
Turnike|Geçiş|Kart|Bariyer
Gişe|Bilet|Cam|Ödeme
Trafik Işığı|Kırmızı|Yeşil|Kavşak
Yaya Geçidi|Zebra|Çizgi|Karşıya
Kavşak|Yol|Dönmek|Trafik
Dönel Kavşak|Ada|Çember|Trafik
Tünel|Dağ|Geçiş|Karanlık
Viyadük|Yüksek|Yol|Ayak
Otoyol|Hız|Şerit|Gişe
Şerit|Çizgi|Araç|Yol
Emniyet Kemeri|Kaza|Takmak|Koltuk
Hava Yastığı|Çarpışma|Açılmak|Güvenlik
Dikiz Aynası|Arka|Görmek|Araç
Sinyal Lambası|Dönüş|Yanıp sönmek|Araç
Plaka|Numara|Araç|Trafik
Ehliyet|Sürücü|Sınav|Belge
Ruhsat|Araç|Belge|Sahip
` }
]);



