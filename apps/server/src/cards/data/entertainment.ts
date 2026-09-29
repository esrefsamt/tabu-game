import { defineCategory } from "./defineCategory.js";

export const ENTERTAINMENT_CARDS = defineCategory("entertainment", [
  { common: ["Müzik", "Ses"], rows: `
Piyano|Tuş|Siyah beyaz|Kuyruklu
Keman|Yay|Tel|Omuz
Viyola|Yay|Keman|Orta
Çello|Büyük|Yay|Oturmak
Kontrbas|Dev|Tel|Caz
Flüt|Üflemek|Delik|Yan
Klarnet|Kamış|Üflemek|Siyah
Saksafon|Caz|Üflemek|Metal
Trompet|Bakır|Üflemek|Piston
Trombon|Sürgü|Bakır|Üflemek
Tuba|Büyük|Bakır|Kalın
Arp|Tel|Üçgen|Parmak
Akordeon|Körük|Tuş|Sıkmak
Mızıka|Cep|Üflemek|Küçük
Bateri|Baget|Ritim|Zil
Zil|Metal|Çarpıştırmak|Ritim
Ksilofon|Tokmak|Tahta|Nota
Marakas|Sallamak|Tane|Ritim
Ukulele|Küçük|Dört tel|Hawaii
Elektro Gitar|Amfi|Tel|Rock
Bas Gitar|Kalın tel|Ritim|Amfi
` },
  { common: ["Müzik", "Eğlence"], rows: `
Konser|Sahne|Dinleyici|Canlı
Festival|Kalabalık|Sahne|Açık hava
Albüm|Şarkı|Kapak|Sanatçı
Single|Tek şarkı|Yayın|Sanatçı
Çalma Listesi|Şarkı|Sıra|Dinlemek
Koro|Toplu ses|Şarkı|Şef
Orkestra|Enstrüman|Şef|Konser
Senfoni|Orkestra|Bölüm|Klasik
Opera|Sahne|Şarkı|Kostüm
Müzikal|Şarkı|Dans|Sahne
Caz|Doğaçlama|Saksafon|Ritim
Rock|Elektro gitar|Davul|Grup
Pop|Şarkı|Radyo|Liste
Rap|Ritim|Kafiye|Söz
Hip Hop|Rap|Dans|Kültür
Blues|Gitar|Hüzün|Amerika
Türkü|Halk|Bağlama|Yöre
Arabesk|Duygu|Şarkı|Türkiye
Fado|Portekiz|Hüzün|Şarkı
Reggae|Jamaika|Ritim|Bob Marley
Flamenko|İspanya|Dans|Gitar
Tango|Arjantin|Çift|Dans
Vals|Üç zaman|Dönmek|Dans
Salsa|Latin|Çift|Ritim
Break Dans|Sokak|Hareket|Hip hop
Bale|Puant|Sahne|Dans
` },
  { common: ["Film", "Ekran"], rows: `
Sinema|Perde|Salon|Patlamış mısır
Fragman|Tanıtım|Kısa|Yakında
Senaryo|Diyalog|Hikâye|Sahne
Film Seti|Kamera|Çekim|Yönetmen
Kostüm|Karakter|Giyinmek|Sahne
Makyaj|Yüz|Oyuncu|Set
Özel Efekt|Patlama|Görsel|Bilgisayar
Animasyon|Çizim|Hareket|Karakter
Belgesel|Gerçek|Anlatıcı|Bilgi
Komedi|Gülmek|Espri|Mizah
Dram|Duygu|Ağlamak|Hikâye
Korku Filmi|Gerilim|Karanlık|Çığlık
Bilim Kurgu|Uzay|Gelecek|Teknoloji
Fantastik Film|Büyü|Ejderha|Hayal
Romantik Komedi|Aşk|Gülmek|Çift
Macera Filmi|Yolculuk|Tehlike|Kahraman
Polisiye|Dedektif|Suç|Gizem
Western|Kovboy|At|Çöl
Sessiz Film|Siyah beyaz|Yazı|Konuşma
Kısa Film|Dakika|Festival|Yönetmen
Ödül Töreni|Sahne|Heykelcik|Kazanan
Oscar|Heykelcik|Hollywood|Sinema
Altın Palmiye|Cannes|Festival|Ödül
` },
  { common: ["Oyun", "Arkadaş"], rows: `
Satranç|Şah|Mat|Tahta
Dama|Taş|Kare|Atlamak
Tavla|Zar|Pul|Kapı
Okey|Taş|Istaka|Joker
İskambil|Kart|Deste|Maça
Poker|Blöf|Fiş|El
Briç|Eşli|Kart|Koz
Batak|Koz|El|İhale
Pişti|Vale|Kart|Puan
Uno|Renk|Kart|Artı dört
Monopoly|Mülk|Kira|Zar
Jenga|Tahta|Kule|Çekmek
Scrabble|Harf|Kelime|Puan
Kelime Oyunu|Harf|Tahmin|Sözlük
Bulmaca|Kare|İpucu|Gazete
Sudoku|Sayı|Dokuz|Kare
Yapboz|Parça|Resim|Birleştirmek
Lego|Parça|Birleştirmek|Blok
Misket|Cam|Yuvarlak|Sokak
Topaç|Dönmek|İp|Ahşap
Uçurtma|İp|Rüzgâr|Gökyüzü
Seksek|Kare|Zıplamak|Çocuk
Saklambaç|Ebe|Gizlenmek|Saymak
Körebe|Göz bağı|Yakalamak|Ebe
Yakantop|Atmak|Kaçmak|Takım
İstop|Top|İsim|Durmak
Mendil Kapmaca|Koşmak|Ortada|Takım
İp Atlama|Zıplamak|Çevirmek|Ritim
` },
  { common: ["Eğlence", "Etkinlik"], rows: `
Lunapark|Dönme dolap|Bilet|Oyuncak
Dönme Dolap|Kabin|Yüksek|Manzara
Hız Treni|Ray|Hız|Çığlık
Atlıkarınca|Dönmek|At|Çocuk
Çarpışan Araba|Elektrikli|Vurmak|Lunapark
Korku Tüneli|Karanlık|Çığlık|Lunapark
Sirk|Palyaço|Çadır|Akrobat
Palyaço|Kırmızı burun|Gülmek|Sirk
Sihirbaz|Numara|Şapka|Tavşan
İllüzyon|Göz yanılması|Sihir|Numara
Akrobat|Denge|Takla|Sirk
Kukla|İp|El|Karakter
Kukla Tiyatrosu|Perde|Çocuk|Ses
Stand-up|Mikrofon|Espri|Sahne
Karaoke|Şarkı|Ekran|Mikrofon
Kostüm Partisi|Kılık|Davet|Maske
Maskeli Balo|Yüz|Dans|Kostüm
` }
]);

