import { defineCategory } from "./defineCategory.js";

export const CULTURE_CARDS = defineCategory("culture", [
  { common: ["Türkiye", "Kültür"], rows: `
Türk Bayrağı|Ay yıldız|Kırmızı|Beyaz
İstiklal Marşı|Mehmet Akif|On kıta|Milli
Cumhuriyet Bayramı|29 Ekim|Atatürk|Tören
23 Nisan|Çocuk|Egemenlik|Bayram
19 Mayıs|Gençlik|Samsun|Atatürk
30 Ağustos|Zafer|Bayram|Tören
Ramazan Bayramı|Şeker|Ziyaret|Oruç
Kurban Bayramı|Paylaşmak|Aile|Namaz
Nevruz|Bahar|Ateş|Kutlama
Hıdırellez|Bahar|Dilek|Gelenek
Aşure Günü|Tatlı|Paylaşmak|Muharrem
Mesir Macunu|Manisa|Baharat|Şifa
Karagöz ve Hacivat|Gölge|Perde|Oyun
Nasreddin Hoca|Fıkra|Eşek|Akşehir
Keloğlan|Masal|Saçsız|Köy
Dede Korkut|Destan|Oğuz|Hikâye
Köroğlu|Destan|Bolu|Yiğit
Mevlana|Konya|Semazen|Mesnevi
Yunus Emre|Şiir|Sevgi|Tasavvuf
Mimar Sinan|Cami|Osmanlı|Mimar
Atatürk|Cumhuriyet|Anıtkabir|Lider
Çanakkale Savaşı|Boğaz|Şehit|1915
Kurtuluş Savaşı|Anadolu|Bağımsızlık|Cephe
İstanbul'un Fethi|1453|Fatih|Bizans
Osmanlı İmparatorluğu|Padişah|Saray|Tarih
Selçuklular|Anadolu|Sultan|Tarih
Hititler|Hattuşa|Tablet|Anadolu
Truva|At|Çanakkale|Antik
Göbeklitepe|Şanlıurfa|Tapınak|Kazı
Efes|Antik kent|İzmir|Artemis
Sümela Manastırı|Trabzon|Kayalık|Manastır
Nemrut Dağı|Heykel|Adıyaman|Zirve
Pamukkale Travertenleri|Beyaz|Denizli|Termal
Kapadokya|Balon|Peribacası|Nevşehir
Safranbolu Evleri|Ahşap|Karabük|Osmanlı
Topkapı Sarayı|Padişah|İstanbul|Harem
Dolmabahçe Sarayı|Boğaz|İstanbul|Atatürk
Anıtkabir|Ankara|Atatürk|Mozole
Galata Kulesi|İstanbul|Manzara|Taş
Kız Kulesi|Boğaz|Ada|İstanbul
Ayasofya|Kubbe|İstanbul|Tarihi
Selimiye Camii|Edirne|Mimar Sinan|Kubbe
` },
  { common: ["Sanat", "Gelenek"], rows: `
Ebru|Su|Boya|Kağıt
Hat Sanatı|Yazı|Kalem|Arap harfleri
Çini|Seramik|Desen|Mavi
Minyatür|Küçük|Resim|El yazması
Tezhip|Altın|Süsleme|Kitap
Mozaik|Taş|Parça|Resim
Vitray|Renkli cam|Pencere|Işık
Dokuma|Tezgâh|İplik|Kumaş
Halıcılık|İlmek|Tezgâh|Desen
Seramik Sanatı|Kil|Fırın|Çömlek
Çömlekçilik|Kil|Torna|Fırın
Sepet Örücülüğü|Hasır|El Pşi|Örmek
Ahşap Oymacılığı|Tahta|Keski|Desen
Bakır İşlemeciliği|Metal|Çekiç|Tepsi
Telkari|Gümüş|İnce tel|Takı
Keçe|Yün|Islak|El Pşi
Origami|Kağıt|Katlamak|Japonya
Kaligrafi|Güzel yazı|Mürekkep|Kalem
` },
  { common: ["Tarih", "Dünya"], rows: `
Antik Mısır|Firavun|Nil|Piramit
Antik Yunan|Atina|Filozof|Tapınak
Roma İmparatorluğu|Sezar|Kolezyum|Lejyon
Bizans İmparatorluğu|Konstantinopolis|İstanbul|İmparator
Orta Çağ|Şato|Şövalye|Avrupa
Rönesans|Sanat|İtalya|Yeniden doğuş
Sanayi Devrimi|Fabrika|Buhar|Makine
Fransız Devrimi|Bastille|Eşitlik|1789
Birinci Dünya Savaşı|Siper|1914|İttifak
İkinci Dünya Savaşı|1939|Müttefik|Avrupa
Soğuk Savaş|ABD|Sovyet|Nükleer
Berlin Duvarı|Almanya|Bölünme|Yıkılmak
İpek Yolu|Ticaret|Kervan|Asya
Coğrafi Keşifler|Gemi|Okyanus|Yeni dünya
Matbaanın İcadı|Gutenberg|Kitap|Basım
Ay'a İniş|Astronot|Apollo|1969
Mısır Piramitleri|Giza|Firavun|Üçgen
Kolezyum|Roma|Gladyatör|Arena
Çin Seddi|Uzun|Duvar|Asya
Tac Mahal|Hindistan|Beyaz|Anıt
Eyfel Kulesi|Paris|Demir|Fransa
Özgürlük Heykeli|New York|Meşale|Amerika
Stonehenge|Taş|Çember|İngiltere
Machu Picchu|İnka|Peru|Dağ
` },
  { common: ["Toplum", "Kurum"], rows: `
Parlamento|Milletvekili|Yasa|Meclis
Seçim|Oy|Sandık|Aday
Oy Pusulası|Sandık|Mühür|Seçim
Belediye Meclisi|Şehir|Üye|Karar
Mahkeme|Hakim|Dava|Karar
Jüri|Karar|Üye|Mahkeme
Müze|Sergi|Eser|Ziyaret
Sanat Galerisi|Tablo|Sergi|Duvar
Konsolosluk|Yurt dışı|Belge|Vize
Büyükelçilik|Diplomat|Ülke|Başkent
Gümrük|Sınır|Beyan|Eşya
Nüfus Müdürlüğü|Kimlik|Kayıt|Adres
Tapu Dairesi|Ev|Mülkiyet|Belge
Vergi Dairesi|Ödeme|Beyan|Devlet
` },
  { common: ["Müzik", "Türkiye"], rows: `
Bağlama|Tel|Tezene|Türkü
Ney|Üflemek|Kamış|Tasavvuf
Kemençe|Karadeniz|Yay|Tel
Kanun|Tel|Mızrap|Diz
Ud|Telli|Mızrap|Göğüs
Zurna|Üflemek|Davul|Düğün
Davul|Tokmak|Ritim|Düğün
Def|Çerçeve|Ritim|El
Darbuka|Ritim|Parmak|Göbek
Tulum|Karadeniz|Nefes|Çalgı
` }
]);



