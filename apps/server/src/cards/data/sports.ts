import { defineCategory } from "./defineCategory.js";

export const SPORT_CARDS = defineCategory("sport", [
  { common: ["Spor", "Saha"], rows: `
Voleybol|File|Servis|Smaç
Hentbol|El|Kale|Yedi metre
Tenis|Raket|Kort|Servis
Badminton|Tüylü top|Raket|File
Masa Tenisi|Raket|Pinpon|Masa
Beyzbol|Sopa|Atıcı|Kale
Softbol|Sopa|Beyzbol|Top
Kriket|Sopa|Kale|Atış
Ragbi|Oval top|Temas|Pas
Amerikan Futbolu|Kask|Touchdown|Oval top
Golf|Sopa|Delik|Çim
Çim Hokeyi|Sopa|Kale|Top
Buz Hokeyi|Disk|Paten|Kale
Lacrosse|Ağlı sopa|Top|Kale
Bowling|Lobut|Yuvarlamak|Salon
Bilardo|Istaka|Delik|Masa
Dart|Hedef|Ok|Puan
Kroket|Tokmak|Çim|Kapı
Petank|Metal top|Hedef|Atmak
Futsal|Salon|Kale|Beş kişi
` },
  { common: ["Spor", "Yarış"], rows: `
Atletizm|Pist|Koşu|Olimpiyat
Maraton|42 kilometre|Koşmak|Dayanıklılık
Sprint|Kısa mesafe|Hız|Pist
Engelli Koşu|Bariyer|Atlamak|Pist
Bayrak Yarışı|Takım|Devir|Koşu
Uzun Atlama|Kum|Mesafe|Koşmak
Yüksek Atlama|Çıta|Atlamak|Minder
Üç Adım Atlama|Sekme|Kum|Mesafe
Sırıkla Atlama|Uzun çubuk|Çıta|Yüksek
Gülle Atma|Ağır|Metal|Mesafe
Disk Atma|Yuvarlak|Fırlatmak|Mesafe
Cirit Atma|Mızrak|Fırlatmak|Pist
Çekiç Atma|Zincir|Dönmek|Fırlatmak
Yüzme|Havuz|Kulaç|Su
Serbest Stil|Yüzme|Kulaç|Hız
Kurbağalama|Yüzme|Bacak|Havuz
Kelebek Stili|Yüzme|İki kol|Dalga
Sırtüstü Yüzme|Havuz|Tavan|Kulaç
Dalış|Su|Derinlik|Tüp
Kürek Yarışı|Tekne|Kürek çekmek|Nehir
Kano|Nehir|Kürek|Tekne
Rafting|Akıntı|Bot|Nehir
Yelken|Rüzgâr|Tekne|Deniz
Sörf|Dalga|Tahta|Deniz
Rüzgâr Sörfü|Yelken|Tahta|Deniz
Kitesurf|Uçurtma|Tahta|Rüzgâr
Triatlon|Yüzme|Bisiklet|Koşu
Bisiklet Yarışı|Pedal|Pist|Finiş
Dağ Bisikleti|Arazi|Pedal|Yokuş
Motokros|Motosiklet|Toprak|Sıçrama
Karting|Pist|Küçük araba|Kask
Formula 1|Pilot|Pist|Pit stop
` },
  { common: ["Spor", "Müsabaka"], rows: `
Boks|Eldiven|Ring|Yumruk
Kick Boks|Tekme|Eldiven|Ring
Güreş|Minder|Tuş|Pehlivan
Yağlı Güreş|Kırkpınar|Kispet|Pehlivan
Judo|Kuşak|Atış|Minder
Karate|Kuşak|Tekme|Dojo
Tekvando|Tekme|Kuşak|Kore
Eskrim|Kılıç|Maske|Pist
Halter|Ağırlık|Bar|Kaldırmak
Powerlifting|Squat|Bench|Ağırlık
Jimnastik|Denge|Minder|Esneklik
Artistik Jimnastik|Barfiks|Yer|Atlama
Ritmik Jimnastik|Kurdele|Top|Müzik
Trambolin|Zıplamak|Havada|Esneklik
Okçuluk|Yay|Ok|Hedef
Atıcılık|Hedef|Nişan|Tüfek
Binicilik|At|Eyer|Parkur
Polo|At|Sopa|Top
Modern Pentatlon|Beş|Eskrim|Yüzme
Dağcılık|Zirve|İp|Tırmanış
Kaya Tırmanışı|Duvar|Tutamak|İp
Kayak|Kar|Pist|Baton
Snowboard|Tahta|Kar|Pist
Buz Pateni|Pist|Paten|Kaymak
Artistik Patinaj|Müzik|Buz|Dönmek
Kızak|Kar|Yokuş|Kaymak
Curling|Buz|Taş|Süpürge
` },
  { common: ["Futbol", "Maç"], rows: `
Kaleci|Eldiven|Kale|Kurtarış
Forvet|Gol|Hücum|Şut
Defans|Savunma|Stoper|Kale
Orta Saha|Pas|Oyun kurmak|Merkez
Hakem|Düdük|Kart|Karar
Korner|Köşe|Bayrak|Orta
Penaltı|Nokta|Kaleci|On bir metre
Frikik|Faul|Baraj|Şut
Ofsayt|Çizgi|Savunma|Bayrak
Taç Atışı|Kenar|Elle|Çizgi
Uzatma Dakikası|Hakem|Süre|Son
VAR|Video|Hakem|İnceleme
Sarı Kart|Uyarı|Hakem|Faul
Kırmızı Kart|İhraç|Hakem|Oyuncu
Stadyum|Tribün|Çim|Taraftar
Tribün|Seyirci|Stadyum|Tezahürat
Forma|Numara|Takım|Giymek
Krampon|Ayakkabı|Çim|Dişli
Kupa|Şampiyon|Ödül|Final
Lig|Takım|Puan|Sezon
Derbi|Rakip|Şehir|Taraftar
Transfer|Oyuncu|Kulüp|Sözleşme
` }
]);



