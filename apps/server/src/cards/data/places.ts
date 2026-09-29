import { defineCategory } from "./defineCategory.js";

export const PLACE_CARDS = defineCategory("place", [
  { common: ["Türkiye", "Şehir"], rows: `
Adana|Kebap|Seyhan|Sıcak
Adıyaman|Nemrut|Komagene|Kahta
Afyonkarahisar|Kaymak|Sucuk|Kaplıca
Ağrı|Dağ|Doğubayazıt|İshak Paşa
Amasya|Elma|Şehzade|Yeşilırmak
Ankara|Başkent|Anıtkabir|Kızılay
Antalya|Turizm|Kaleiçi|Plaj
Artvin|Çoruh|Yayla|Karagöl
Aydın|İncir|Kuşadası|Didim
Balıkesir|Ayvalık|Kaz Dağları|Zeytin
Bilecik|Söğüt|Osmanlı|Ertuğrul
Bingöl|Yüzen adalar|Doğu|Dağ
Bitlis|Nemrut Gölü|Ahlat|Van Gölü
Bolu|Abant|Gölcük|Orman
Burdur|Salda|Göl|Lavanta
Bursa|Uludağ|İskender|İpek
Çanakkale|Truva|Boğaz|Şehitlik
Çankırı|Tuz mağarası|Ilgaz|İç Anadolu
Çorum|Leblebi|Hattuşa|Hitit
Denizli|Pamukkale|Horoz|Traverten
Diyarbakır|Surlar|Karpuz|Dicle
Edirne|Selimiye|Ciğer|Meriç
Elazığ|Harput|Hazar Gölü|Fırat
Erzincan|Tulum peyniri|Girlevik|Fırat
Erzurum|Cağ kebabı|Palandöken|Soğuk
Eskişehir|Porsuk|Lületaşı|Odunpazarı
Gaziantep|Baklava|Fıstık|Zeugma
Giresun|Fındık|Ada|Karadeniz
Gümüşhane|Pestil|Torul|Dağ
Hakkâri|Cilo|Yüksekova|Dağ
Hatay|Künefe|Antakya|Mozaik
Isparta|Gül|Eğirdir|Lavanta
Mersin|Tantuni|Kızkalesi|Liman
İstanbul|Boğaz|Galata|İki kıta
İzmir|Kordon|Saat Kulesi|Boyoz
Kars|Kaşar|Ani|Doğu Ekspresi
Kastamonu|Pastırma|Ilgaz|Kanyon
Kayseri|Mantı|Erciyes|Pastırma
Kırklareli|İğneada|Longoz|Trakya
Kırşehir|Ahi Evran|Bozkır|Neşet Ertaş
Kocaeli|İzmit|Sanayi|Körfez
Konya|Mevlana|Etli ekmek|Ova
Kütahya|Çini|Porselen|Frig
Malatya|Kayısı|Battalgazi|Arslantepe
Manisa|Mesir|Spil|Üzüm
Kahramanmaraş|Dondurma|Biber|Tarhana
Mardin|Taş ev|Midyat|Mezopotamya
Muğla|Bodrum|Marmaris|Fethiye
Muş|Lale|Malazgirt|Ova
Nevşehir|Kapadokya|Peribacası|Balon
Niğde|Aladağlar|Patates|İç Anadolu
Ordu|Fındık|Boztepe|Karadeniz
Rize|Çay|Yayla|Fırtına Deresi
Sakarya|Sapanca|Nehir|Marmara
Samsun|Bandırma Vapuru|19 Mayıs|Atakum
Siirt|Fıstık|Battaniye|Botan
Sinop|İnceburun|Cezaevi|Liman
Sivas|Kangal|Divriği|Kongre
Tekirdağ|Köfte|Rakı|Trakya
Tokat|Yaprak|Erbaa|Kale
Trabzon|Sümela|Hamsi|Uzungöl
Tunceli|Munzur|Ovacık|Dağ
Şanlıurfa|Göbeklitepe|Balıklıgöl|İsot
Uşak|Halı|Blaundos|Ege
Van|Göl|Kedi|Kahvaltı
Yozgat|Çamlık|Bozok|İç Anadolu
Zonguldak|Kömür|Maden|Karadeniz
Aksaray|Ihlara|Kervansaray|Kapadokya
Bayburt|Çoruh|Kale|Doğu Karadeniz
Karaman|Türkçe|Ermenek|İç Anadolu
Kırıkkale|Silah sanayisi|Kızılırmak|İç Anadolu
Batman|Petrol|Hasankeyf|Dicle
Şırnak|Cudi|Silopi|Dağ
Bartın|Amasra|Kıyı|Karadeniz
Ardahan|Çıldır Gölü|Kars|Soğuk
Iğdır|Ağrı Dağı|Kayısı|Doğu
Yalova|Termal|Marmara|Kaplıca
Karabük|Safranbolu|Demir çelik|Ev
Kilis|Zeytin|Sınır|Katmer
Osmaniye|Yer fıstığı|Kale|Çukurova
Düzce|Akçakoca|Şelale|Marmara
` },
  { common: ["Ülke", "Dünya"], rows: `
Almanya|Berlin|Otomobil|Avrupa
Fransa|Paris|Eyfel|Peynir
İtalya|Roma|Makarna|Venedik
İspanya|Madrid|Flamenko|Boğa
Portekiz|Lizbon|Fado|Okyanus
Yunanistan|Atina|Ada|Akropolis
Bulgaristan|Sofya|Komşu|Balkan
Romanya|Bükreş|Karpatlar|Tuna
Polonya|Varşova|Krakov|Avrupa
Ukrayna|Kiev|Karadeniz|Ayçiçeği
Rusya|Moskova|Sibirya|Soğuk
İngiltere|Londra|Kraliyet|Çay
İrlanda|Dublin|Yonca|Yeşil
İskoçya|Edinburgh|Gayda|Kilt
Norveç|Fiyort|Oslo|Kuzey
İsveç|Stockholm|İskandinav|Mobilya
Finlandiya|Helsinki|Sauna|Kuzey
Danimarka|Kopenhag|Bisiklet|İskandinav
İzlanda|Volkan|Reykjavik|Buzul
Hollanda|Amsterdam|Lale|Yel değirmeni
Belçika|Brüksel|Çikolata|Waffle
İsviçre|Alpler|Saat|Çikolata
Avusturya|Viyana|Mozart|Alpler
Macaristan|Budapeşte|Tuna|Gulaş
Çekya|Prag|Köprü|Bira
Hırvatistan|Dubrovnik|Adriyatik|Kıyı
Sırbistan|Belgrad|Tuna|Balkan
Bosna Hersek|Saraybosna|Mostar|Balkan
Arnavutluk|Tiran|Balkan|Adriyatik
Gürcistan|Tiflis|Batum|Kafkas
Azerbaycan|Bakü|Hazar|Kardeş
Ermenistan|Erivan|Kafkas|Dağ
İran|Tahran|Pers|Halı
Irak|Bağdat|Dicle|Mezopotamya
Suriye|Şam|Halep|Levant
Lübnan|Beyrut|Sedir|Akdeniz
İsrail|Kudüs|Tel Aviv|Ölü Deniz
Ürdün|Petra|Amman|Çöl
Suudi Arabistan|Mekke|Medine|Çöl
Birleşik Arap Emirlikleri|Dubai|Abu Dabi|Gökdelen
Mısır|Piramit|Nil|Kahire
Fas|Marakeş|Rabat|Atlas
Cezayir|Sahra|Akdeniz|Kuzey Afrika
Tunus|Kartaca|Akdeniz|Kuzey Afrika
Libya|Trablus|Sahra|Akdeniz
Güney Afrika|Cape Town|Safari|Johannesburg
Kenya|Nairobi|Safari|Savan
Etiyopya|Addis Ababa|Kahve|Afrika
Nijerya|Lagos|Petrol|Afrika
Senegal|Dakar|Atlantik|Afrika
Madagaskar|Ada|Lemur|Hint Okyanusu
Hindistan|Tac Mahal|Delhi|Baharat
Pakistan|İslamabad|İndus|Asya
Çin|Pekin|Çin Seddi|Panda
Japonya|Tokyo|Suşi|Sakura
Güney Kore|Seul|K-pop|Teknoloji
Kuzey Kore|Pyongyang|Yarımada|Kapalı
Moğolistan|Bozkır|Cengiz Han|At
Tayland|Bangkok|Tapınak|Tropik
Vietnam|Hanoi|Pirinç|Mekong
Endonezya|Bali|Ada|Volkan
Filipinler|Manila|Ada|Pasifik
Malezya|Kuala Lumpur|Tropik|Petronas
Singapur|Şehir devleti|Liman|Asya
Avustralya|Sidney|Kanguru|Kıta
Yeni Zelanda|Kivi|Ada|Okyanusya
Amerika Birleşik Devletleri|Washington|New York|Hollywood
Kanada|Akçaağaç|Ottawa|Soğuk
Meksika|Taco|Sombrero|Aztek
Brezilya|Rio|Karnaval|Amazon
Arjantin|Buenos Aires|Tango|Futbol
Şili|And Dağları|Uzun|Pasifik
Peru|Machu Picchu|Lima|İnka
Kolombiya|Bogota|Kahve|Karayip
Küba|Havana|Puro|Karayip
Jamaika|Reggae|Kingston|Karayip
` }
]);

