import { defineCategory } from "./defineCategory.js";

export const ANIMAL_CARDS = defineCategory("animal", [
  { common: ["Hayvan", "Vahşi"], rows: `
Kaplan|Çizgi|Orman|Yırtıcı
Leopar|Benek|Ağaç|Avcı
Çita|Hızlı|Benek|Afrika
Jaguar|Benek|Güçlü|Amerika
Puma|Dağ|Kedigiller|Avcı
Kurt|Sürü|Uluma|Orman
Tilki|Kurnaz|Turuncu|Kuyruk
Ayı|Bal|Kış uykusu|Pençe
Kutup Ayısı|Beyaz|Buz|Arktik
Panda|Bambu|Siyah beyaz|Çin
Fil|Hortum|Fildişi|Büyük
Gergedan|Boynuz|Kalın deri|Afrika
Su Aygırı|Nehir|Ağız|Afrika
Zürafa|Uzun boyun|Benek|Savan
Zebra|Çizgi|Siyah beyaz|At
Geyik|Boynuz|Orman|Hızlı
Ceylan|İnce|Hızlı|Savan
Antilop|Boynuz|Sürü|Savan
Bufalo|Boynuz|Sürü|Afrika
Yaban Domuzu|Diş|Orman|Çamur
Sırtlan|Gülmek|Leş|Sürü
Çakal|Uluma|Gece|Sürü
Kirpi|Diken|Top|Bahçe
Köstebek|Tünel|Toprak|Kör
Sansar|Kümes|Gece|Avcı
Gelincik|Uzun|İnce|Kürk
Kunduz|Baraj|Diş|Nehir
Su Samuru|Nehir|Yüzmek|Kürk
Rakun|Maske|Çöp|Kuyruk
Tembel Hayvan|Yavaş|Ağaç|Uyku
Koala|Okaliptüs|Avustralya|Ağaç
Kanguru|Kese|Zıplamak|Avustralya
Orangutan|Turuncu|Maymun|Orman
Şempanze|Maymun|Zeki|Afrika
Goril|Güçlü|Maymun|Orman
Lemur|Madagaskar|Kuyruk|Maymun
` },
  { common: ["Hayvan", "Çiftlik"], rows: `
İnek|Süt|Mölemek|Buzağı
Boğa|Boynuz|Kırmızı|Güç
Dana|Buzağı|Et|Sığır
Koyun|Yün|Melemek|Sürü
Keçi|Sakal|Süt|Dağ
At|Yele|Nal|Binmek
Eşek|Yük|Kulak|Anırmak
Katır|At|Eşek|Yük
Tavuk|Yumurta|Kümes|Gıdaklamak
Horoz|Ötmek|Sabah|İbik
Ördek|Vaklamak|Göl|Gaga
Kaz|Gaga|Tüy|Göç
Hindi|Gıdık|Kanat|Yılbaşı
Tavşan|Havuç|Kulak|Zıplamak
Lama|Tükürmek|And Dağları|Yün
Alpaka|Yün|Lama|And Dağları
Deve|Hörgüç|Çöl|Kervan
` },
  { common: ["Kuş", "Kanat"], rows: `
Kartal|Pençe|Yırtıcı|Yüksek
Şahin|Avcı|Keskin göz|Hızlı
Doğan|Dalış|Avcı|Hızlı
Baykuş|Gece|Bilge|Ötmek
Güvercin|Meydan|Barış|Mektup
Serçe|Küçük|Cik cik|Şehir
Karga|Siyah|Gaklamak|Zeki
Saksağan|Parlak|Siyah beyaz|Hırsız
Martı|Deniz|Vapur|Bağırmak
Leylek|Göç|Baca|Uzun bacak
Flamingo|Pembe|Tek ayak|Sulak alan
Pelikan|Gaga|Kese|Balık
Kuğu|Beyaz|Göl|Zarif
Turna|Göç|Uzun bacak|Türkü
Kırlangıç|Bahar|Yuva|Göç
Sığırcık|Sürü|Gökyüzü|Taklit
Papağan|Konuşmak|Renkli|Tropik
Kanarya|Sarı|Ötmek|Kafes
Muhabbet Kuşu|Kafes|Konuşmak|Evcil
Devekuşu|Uçamamak|Uzun bacak|Yumurta
Tavus Kuşu|Renkli|Kuyruk|Gösteri
Ağaçkakan|Gaga|Ağaç|Tıklamak
Yalıçapkını|Balık|Mavi|Nehir
Albatros|Okyanus|Uzun kanat|Göç
` },
  { common: ["Deniz", "Canlı"], rows: `
Köpek Balığı|Diş|Yüzgeç|Avcı
Yunus|Zeki|Sıçramak|Sürü
Balina|Büyük|Memeli|Okyanus
Mavi Balina|Dev|Okyanus|Memeli
Orka|Siyah beyaz|Avcı|Balina
Fok|Buz|Yüzgeç|Kürk
Deniz Aslanı|Fok|Bıyık|Gösteri
Deniz Kaplumbağası|Kabuk|Yumurta|Kumsal
Ahtapot|Sekiz kol|Mürekkep|Zeki
Kalamar|Mürekkep|Halka|Yumuşakça
Mürekkep Balığı|Renk değiştirmek|Mürekkep|Kol
Denizanası|Şeffaf|Yakmak|Dokunaç
Denizyıldızı|Beş kol|Dip|Yenilenmek
Deniz Kestanesi|Diken|Dip|Kabuk
Mercan|Resif|Renkli|Koloni
Midye|Kabuk|Dolma|Kıyı
İstiridye|İnci|Kabuk|Lüks
Yengeç|Kıskaç|Yan yürümek|Kabuk
Istakoz|Kıskaç|Kırmızı|Lüks
Karides|Küçük|Kabuk|Tava
Hamsi|Karadeniz|Küçük|Tava
Palamut Balığı|Sonbahar|Izgara|Göç
Lüfer|Boğaz|Diş|Izgara
Levrek|Izgara|Beyaz et|Kıyı
Çipura|Izgara|Altın çizgi|Akdeniz
Somon|Pembe|Nehir|Izgara
Alabalık|Dere|Benek|Tatlı su
Kılıç Balığı|Uzun burun|Avcı|Büyük
Vatoz|Yassı|Dip|Kuyruk
Denizatı|Dik|Kuyruk|Erkek
` },
  { common: ["Hayvan", "Küçük"], rows: `
Karınca|Koloni|Yuva|Çalışkan
Sivrisinek|Isırmak|Vızıltı|Kan
Sinek|Vızıldamak|Çöp|Kanat
Kelebek|Tırtıl|Renkli|Kanat
Güve|Işık|Giysi|Gece
Uğur Böceği|Kırmızı|Benek|Şans
Çekirge|Zıplamak|Yeşil|Tarla
Hamam Böceği|Mutfak|Gece|Hızlı
Termit|Ahşap|Koloni|Kemirmek
Örümcek|Ağ|Sekiz bacak|Av
Akrep|Kıskaç|Zehir|Kuyruk
Kene|Kan|Yapışmak|Orman
Bit|Saç|Kaşıntı|Parazit
Pire|Zıplamak|Kaşıntı|Evcil
Tırtıl|Kelebek|Yaprak|Koza
Solucan|Toprak|Uzun|Yağmur
Salyangoz|Kabuk|Yavaş|İz
Sümüklü Böcek|Islak|Bahçe|İz
Kırkayak|Bacak|Uzun|Toprak
Yusufçuk|Kanat|Göl|Hızlı
` },
  { common: ["Hayvan", "Sürüngen"], rows: `
Yılan|Zehir|Sürünmek|Deri
Kobra|Başlık|Zehir|Hindistan
Piton|Boğmak|Uzun|Tropik
Timsah|Çene|Bataklık|Diş
Kertenkele|Kuyruk|Duvar|Güneş
Bukalemun|Renk|Dil|Kamuflaj
İguana|Yeşil|Kuyruk|Tropik
Komodo Ejderi|Ada|Dev|Kertenkele
Kurbağa|Vıraklamak|Gölet|Zıplamak
Semender|Nemli|Kuyruk|Orman
` }
]);





