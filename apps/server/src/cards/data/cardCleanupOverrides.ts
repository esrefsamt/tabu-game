import type { TabuCard } from "@tabu/shared";

/** Stable-ID wording cleanups; card data remains server-side. */
export const CARD_CLEANUP_OVERRIDES = {
  "tr-003": {
    "word": "Fırça",
    "forbiddenWords": [
      "Macun",
      "Diş",
      "Banyo",
      "Temizlik",
      "Kıl"
    ]
  },
  "tr-017": {
    "word": "Makine",
    "forbiddenWords": [
      "Resim",
      "Lens",
      "Çekmek",
      "Flaş",
      "Poz"
    ]
  },
  "tr-032": {
    "word": "Çamaşır",
    "forbiddenWords": [
      "Deterjan",
      "Kıyafet",
      "Yıkamak",
      "Program",
      "Sıkmak"
    ]
  },
  "tr-042": {
    "word": "Şarj",
    "forbiddenWords": [
      "Pil",
      "Priz",
      "Kablo",
      "Telefon",
      "Elektrik"
    ]
  },
  "tr-049": {
    "word": "Aksesuar",
    "forbiddenWords": [
      "Göz",
      "Cam",
      "Yaz",
      "Işık",
      "Güneş Gözlüğü"
    ]
  },
  "food_hindistan_cevizi": {
    "word": "Tropik",
    "forbiddenWords": [
      "Meyve",
      "Çekirdek",
      "Sert",
      "Süt",
      "Hindistan Cevizi"
    ]
  },
  "food_antep_fistigi": {
    "word": "Fıstık",
    "forbiddenWords": [
      "Meyve",
      "Çekirdek",
      "Yeşil",
      "Baklava",
      "Kabuk"
    ]
  },
  "food_yer_fistigi": {
    "word": "Kabuk",
    "forbiddenWords": [
      "Meyve",
      "Çekirdek",
      "Tuzlu",
      "Ezme",
      "Yer Fıstığı"
    ]
  },
  "food_misir_kocani": {
    "word": "Sebze",
    "forbiddenWords": [
      "Mutfak",
      "Sarı",
      "Patlamış",
      "Tane",
      "Mısır Koçanı"
    ]
  },
  "food_sucuklu_yumurta": {
    "word": "Yumurta",
    "forbiddenWords": [
      "Yemek",
      "Sofra",
      "Kahvaltı",
      "Tava",
      "Baharat"
    ]
  },
  "food_kuru_fasulye": {
    "word": "Baklagil",
    "forbiddenWords": [
      "Yemek",
      "Sofra",
      "Pilav",
      "Tencere",
      "Kuru Fasulye"
    ]
  },
  "food_tarhana_corbasi": {
    "word": "Tarhana",
    "forbiddenWords": [
      "Yemek",
      "Sofra",
      "Ekşi",
      "Kuru",
      "Kış"
    ]
  },
  "food_yayla_corbasi": {
    "word": "Pirinç",
    "forbiddenWords": [
      "Yemek",
      "Sofra",
      "Yoğurt",
      "Nane",
      "Yayla Çorbası"
    ]
  },
  "food_iskembe_corbasi": {
    "word": "İşkembe",
    "forbiddenWords": [
      "Yemek",
      "Sofra",
      "Sakatat",
      "Sarımsak",
      "Gece"
    ]
  },
  "food_etli_ekmek": {
    "word": "Kıyma",
    "forbiddenWords": [
      "Yemek",
      "Sofra",
      "Konya",
      "Uzun",
      "Etli Ekmek"
    ]
  },
  "food_cig_kofte": {
    "word": "Çiğ",
    "forbiddenWords": [
      "Yemek",
      "Sofra",
      "Bulgur",
      "İsot",
      "Marul"
    ]
  },
  "food_icli_kofte": {
    "word": "Bulgur",
    "forbiddenWords": [
      "Yemek",
      "Sofra",
      "Kıyma",
      "Kızartma",
      "İçli Köfte"
    ]
  },
  "food_su_boregi": {
    "word": "Peynir",
    "forbiddenWords": [
      "Yemek",
      "Sofra",
      "Yufka",
      "Haşlamak",
      "Su Böreği"
    ]
  },
  "food_sicak_cikolata": {
    "word": "Çikolata",
    "forbiddenWords": [
      "İçecek",
      "Bardak",
      "Kakao",
      "Süt",
      "Kış"
    ]
  },
  "food_turk_kahvesi": {
    "word": "Telve",
    "forbiddenWords": [
      "İçecek",
      "Bardak",
      "Cezve",
      "Fincan",
      "Türk Kahvesi"
    ]
  },
  "food_filtre_kahve": {
    "word": "Kağıt",
    "forbiddenWords": [
      "İçecek",
      "Bardak",
      "Demlemek",
      "Çekirdek",
      "Filtre Kahve"
    ]
  },
  "food_bitki_cayi": {
    "word": "Ihlamur",
    "forbiddenWords": [
      "İçecek",
      "Bardak",
      "Demlemek",
      "Ot",
      "Bitki Çayı"
    ]
  },
  "animal_kutup_ayisi": {
    "word": "Arktik",
    "forbiddenWords": [
      "Hayvan",
      "Vahşi",
      "Beyaz",
      "Buz",
      "Kutup Ayısı"
    ]
  },
  "animal_su_samuru": {
    "word": "Kürk",
    "forbiddenWords": [
      "Hayvan",
      "Vahşi",
      "Nehir",
      "Yüzmek",
      "Su Samuru"
    ]
  },
  "animal_muhabbet_kusu": {
    "word": "Kanat",
    "forbiddenWords": [
      "Kuş",
      "Kafes",
      "Konuşmak",
      "Evcil",
      "Muhabbet Kuşu"
    ]
  },
  "animal_tavus_kusu": {
    "word": "Kuyruk",
    "forbiddenWords": [
      "Kuş",
      "Kanat",
      "Renkli",
      "Gösteri",
      "Tavus Kuşu"
    ]
  },
  "animal_deniz_kaplumbagasi": {
    "word": "Kumsal",
    "forbiddenWords": [
      "Deniz",
      "Canlı",
      "Kabuk",
      "Yumurta",
      "Deniz Kaplumbağası"
    ]
  },
  "animal_murekkep_baligi": {
    "word": "Mürekkep",
    "forbiddenWords": [
      "Deniz",
      "Canlı",
      "Renk değiştirmek",
      "Kol",
      "Mürekkep Balığı"
    ]
  },
  "animal_deniz_kestanesi": {
    "word": "Diken",
    "forbiddenWords": [
      "Deniz",
      "Canlı",
      "Dip",
      "Kabuk",
      "Deniz Kestanesi"
    ]
  },
  "animal_palamut_baligi": {
    "word": "Palamut",
    "forbiddenWords": [
      "Deniz",
      "Canlı",
      "Sonbahar",
      "Izgara",
      "Göç"
    ]
  },
  "animal_kilic_baligi": {
    "word": "Kılıç",
    "forbiddenWords": [
      "Deniz",
      "Canlı",
      "Uzun burun",
      "Avcı",
      "Büyük"
    ]
  },
  "animal_ugur_bocegi": {
    "word": "Böcek",
    "forbiddenWords": [
      "Hayvan",
      "Küçük",
      "Kırmızı",
      "Benek",
      "Şans"
    ]
  },
  "animal_sumuklu_bocek": {
    "word": "Bahçe",
    "forbiddenWords": [
      "Hayvan",
      "Küçük",
      "Islak",
      "İz",
      "Sümüklü Böcek"
    ]
  },
  "animal_komodo_ejderi": {
    "word": "Komodo",
    "forbiddenWords": [
      "Hayvan",
      "Sürüngen",
      "Ada",
      "Dev",
      "Kertenkele"
    ]
  },
  "technology_ekran_karti": {
    "word": "Ekran",
    "forbiddenWords": [
      "Bilgisayar",
      "Dijital",
      "Grafik",
      "Oyun",
      "Görüntü"
    ]
  },
  "technology_sabit_disk": {
    "word": "Disk",
    "forbiddenWords": [
      "Bilgisayar",
      "Dijital",
      "Depolama",
      "Dosya",
      "Döner"
    ]
  },
  "technology_usb_bellek": {
    "word": "USB",
    "forbiddenWords": [
      "Bilgisayar",
      "Dijital",
      "Taşınabilir",
      "Dosya",
      "Takmak"
    ]
  },
  "technology_web_kamerasi": {
    "word": "Kamera",
    "forbiddenWords": [
      "Bilgisayar",
      "Dijital",
      "Görüntü",
      "Görüşme",
      "Lens"
    ]
  },
  "technology_veri_merkezi": {
    "word": "Soğutma",
    "forbiddenWords": [
      "Bilgisayar",
      "Dijital",
      "Sunucu",
      "Raf",
      "Veri Merkezi"
    ]
  },
  "technology_guc_kaynagi": {
    "word": "Kaynak",
    "forbiddenWords": [
      "Bilgisayar",
      "Dijital",
      "Elektrik",
      "Kasa",
      "Watt"
    ]
  },
  "technology_akilli_saat": {
    "word": "Adım",
    "forbiddenWords": [
      "Bilgisayar",
      "Dijital",
      "Bilek",
      "Bildirim",
      "Akıllı Saat"
    ]
  },
  "technology_oyun_konsolu": {
    "word": "Kumanda",
    "forbiddenWords": [
      "Bilgisayar",
      "Dijital",
      "Televizyon",
      "Eğlence",
      "Oyun Konsolu"
    ]
  },
  "technology_oyun_kolu": {
    "word": "Tuş",
    "forbiddenWords": [
      "Bilgisayar",
      "Dijital",
      "Konsol",
      "Titreşim",
      "Oyun Kolu"
    ]
  },
  "technology_uc_boyutlu_yazici": {
    "word": "Filament",
    "forbiddenWords": [
      "Bilgisayar",
      "Dijital",
      "Katman",
      "Model",
      "Üç Boyutlu Yazıcı"
    ]
  },
  "technology_sanal_gerceklik_gozlugu": {
    "word": "Gerçeklik",
    "forbiddenWords": [
      "Bilgisayar",
      "Dijital",
      "Başlık",
      "Oyun",
      "Sanal"
    ]
  },
  "technology_web_sitesi": {
    "word": "Sayfa",
    "forbiddenWords": [
      "İnternet",
      "Dijital",
      "Adres",
      "Tarayıcı",
      "Web Sitesi"
    ]
  },
  "technology_arama_motoru": {
    "word": "Sonuç",
    "forbiddenWords": [
      "İnternet",
      "Dijital",
      "Sorgu",
      "Google",
      "Arama Motoru"
    ]
  },
  "technology_e_posta": {
    "word": "Posta",
    "forbiddenWords": [
      "İnternet",
      "Dijital",
      "Gelen kutusu",
      "Adres",
      "Göndermek"
    ]
  },
  "technology_sosyal_medya": {
    "word": "Medya",
    "forbiddenWords": [
      "İnternet",
      "Dijital",
      "Paylaşım",
      "Takipçi",
      "Gönderi"
    ]
  },
  "technology_kullanici_adi": {
    "word": "Adı",
    "forbiddenWords": [
      "İnternet",
      "Dijital",
      "Hesap",
      "Giriş",
      "Takma ad"
    ]
  },
  "technology_iki_asamali_dogrulama": {
    "word": "Doğrulama",
    "forbiddenWords": [
      "İnternet",
      "Dijital",
      "Kod",
      "Güvenlik",
      "Telefon"
    ]
  },
  "technology_goruntulu_gorusme": {
    "word": "Görüşme",
    "forbiddenWords": [
      "İnternet",
      "Dijital",
      "Kamera",
      "Ekran",
      "Konuşmak"
    ]
  },
  "technology_canli_yayin": {
    "word": "Yayın",
    "forbiddenWords": [
      "İnternet",
      "Dijital",
      "İzlemek",
      "Anlık",
      "Kamera"
    ]
  },
  "technology_akis_hizmeti": {
    "word": "Akış",
    "forbiddenWords": [
      "İnternet",
      "Dijital",
      "Film",
      "Dizi",
      "Abonelik"
    ]
  },
  "technology_bulut_depolama": {
    "word": "Depolama",
    "forbiddenWords": [
      "İnternet",
      "Dijital",
      "Dosya",
      "Yedek",
      "Uzak"
    ]
  },
  "technology_tarayici_sekmesi": {
    "word": "Sekme",
    "forbiddenWords": [
      "İnternet",
      "Dijital",
      "Pencere",
      "Sayfa",
      "Açmak"
    ]
  },
  "technology_guvenlik_duvari": {
    "word": "Güvenlik",
    "forbiddenWords": [
      "İnternet",
      "Dijital",
      "Koruma",
      "Ağ",
      "Engel"
    ]
  },
  "technology_bilgisayar_virusu": {
    "word": "Antivirüs",
    "forbiddenWords": [
      "İnternet",
      "Dijital",
      "Zararlı",
      "Bulaşmak",
      "Bilgisayar Virüsü"
    ]
  },
  "technology_kimlik_avi": {
    "word": "Avı",
    "forbiddenWords": [
      "İnternet",
      "Dijital",
      "Sahte",
      "E-posta",
      "Şifre"
    ]
  },
  "technology_qr_kod": {
    "word": "Kod",
    "forbiddenWords": [
      "İnternet",
      "Dijital",
      "Kare",
      "Kamera",
      "Okutmak"
    ]
  },
  "technology_alan_adi": {
    "word": "Alan",
    "forbiddenWords": [
      "İnternet",
      "Dijital",
      "Site",
      "Adres",
      "Uzantı"
    ]
  },
  "technology_mobil_veri": {
    "word": "Paket",
    "forbiddenWords": [
      "İnternet",
      "Dijital",
      "Telefon",
      "Hücresel",
      "Mobil Veri"
    ]
  },
  "technology_akilli_telefon": {
    "word": "Cihaz",
    "forbiddenWords": [
      "Teknoloji",
      "Dokunmatik",
      "Uygulama",
      "Cep",
      "Akıllı Telefon"
    ]
  },
  "technology_uydu_telefonu": {
    "word": "Çekim",
    "forbiddenWords": [
      "Teknoloji",
      "Cihaz",
      "Uzak",
      "İletişim",
      "Uydu Telefonu"
    ]
  },
  "technology_akilli_ev": {
    "word": "Otomasyon",
    "forbiddenWords": [
      "Teknoloji",
      "Cihaz",
      "Işık",
      "Uzaktan",
      "Akıllı Ev"
    ]
  },
  "technology_robot_supurge": {
    "word": "Robot",
    "forbiddenWords": [
      "Teknoloji",
      "Cihaz",
      "Zemin",
      "Şarj",
      "Temizlik"
    ]
  },
  "technology_guvenlik_kamerasi": {
    "word": "Kayıt",
    "forbiddenWords": [
      "Teknoloji",
      "Cihaz",
      "İzlemek",
      "Ev",
      "Güvenlik Kamerası"
    ]
  },
  "technology_hareket_sensoru": {
    "word": "Hareket",
    "forbiddenWords": [
      "Teknoloji",
      "Cihaz",
      "Algılamak",
      "Alarm",
      "Kapı"
    ]
  },
  "technology_parmak_izi_okuyucu": {
    "word": "İzi",
    "forbiddenWords": [
      "Teknoloji",
      "Cihaz",
      "Kimlik",
      "Giriş",
      "Güvenlik"
    ]
  },
  "technology_yuz_tanima": {
    "word": "Tanıma",
    "forbiddenWords": [
      "Teknoloji",
      "Cihaz",
      "Kamera",
      "Kimlik",
      "Kilit"
    ]
  },
  "technology_temassiz_odeme": {
    "word": "Ödeme",
    "forbiddenWords": [
      "Teknoloji",
      "Cihaz",
      "Kart",
      "Yaklaştırmak",
      "Kasa"
    ]
  },
  "technology_elektronik_bilet": {
    "word": "Giriş",
    "forbiddenWords": [
      "Teknoloji",
      "Cihaz",
      "Telefon",
      "Kod",
      "Elektronik Bilet"
    ]
  },
  "technology_e_kitap_okuyucu": {
    "word": "Kitap",
    "forbiddenWords": [
      "Teknoloji",
      "Cihaz",
      "Sayfa",
      "Mürekkep",
      "Okumak"
    ]
  },
  "technology_tasinabilir_sarj_cihazi": {
    "word": "Kablo",
    "forbiddenWords": [
      "Teknoloji",
      "Cihaz",
      "Pil",
      "Telefon",
      "Taşınabilir Şarj Cihazı"
    ]
  },
  "technology_kablosuz_sarj": {
    "word": "Ped",
    "forbiddenWords": [
      "Teknoloji",
      "Cihaz",
      "Telefon",
      "Pil",
      "Kablosuz Şarj"
    ]
  },
  "technology_ruzgar_turbini": {
    "word": "Pervane",
    "forbiddenWords": [
      "Teknoloji",
      "Cihaz",
      "Enerji",
      "Elektrik",
      "Rüzgâr Türbini"
    ]
  },
  "technology_elektrikli_arac_sarj_istasyonu": {
    "word": "Araç",
    "forbiddenWords": [
      "Teknoloji",
      "Cihaz",
      "Otomobil",
      "Fiş",
      "Batarya"
    ]
  },
  "technology_isletim_sistemi": {
    "word": "İşletim",
    "forbiddenWords": [
      "Yazılım",
      "Kod",
      "Bilgisayar",
      "Başlatmak",
      "Program"
    ]
  },
  "technology_hata_mesaji": {
    "word": "Hata",
    "forbiddenWords": [
      "Yazılım",
      "Kod",
      "Uyarı",
      "Ekran",
      "Sorun"
    ]
  },
  "technology_yapay_zeka": {
    "word": "Zeka",
    "forbiddenWords": [
      "Yazılım",
      "Kod",
      "Öğrenme",
      "Model",
      "Makine"
    ]
  },
  "technology_makine_ogrenmesi": {
    "word": "Öğrenme",
    "forbiddenWords": [
      "Yazılım",
      "Kod",
      "Veri",
      "Eğitim",
      "Tahmin"
    ]
  },
  "technology_kaynak_kodu": {
    "word": "Yazılım",
    "forbiddenWords": [
      "Kod",
      "Satır",
      "Programcı",
      "Dosya",
      "Kaynak Kodu"
    ]
  },
  "technology_acik_kaynak": {
    "word": "Paylaşım",
    "forbiddenWords": [
      "Yazılım",
      "Kod",
      "Lisans",
      "Herkese açık",
      "Açık Kaynak"
    ]
  },
  "technology_hata_ayiklama": {
    "word": "Ayıklama",
    "forbiddenWords": [
      "Yazılım",
      "Kod",
      "Bug",
      "Düzeltmek",
      "Program"
    ]
  },
  "technology_surum_kontrolu": {
    "word": "Sürüm",
    "forbiddenWords": [
      "Yazılım",
      "Kod",
      "Değişiklik",
      "Git",
      "Geçmiş"
    ]
  },
  "technology_oyun_motoru": {
    "word": "Geliştirme",
    "forbiddenWords": [
      "Yazılım",
      "Kod",
      "Grafik",
      "Fizik",
      "Oyun Motoru"
    ]
  },
  "sport_masa_tenisi": {
    "word": "Saha",
    "forbiddenWords": [
      "Spor",
      "Raket",
      "Pinpon",
      "Masa",
      "Masa Tenisi"
    ]
  },
  "sport_amerikan_futbolu": {
    "word": "Amerikan",
    "forbiddenWords": [
      "Spor",
      "Saha",
      "Kask",
      "Touchdown",
      "Oval top"
    ]
  },
  "sport_cim_hokeyi": {
    "word": "Çim",
    "forbiddenWords": [
      "Spor",
      "Saha",
      "Sopa",
      "Kale",
      "Top"
    ]
  },
  "sport_engelli_kosu": {
    "word": "Yarış",
    "forbiddenWords": [
      "Spor",
      "Bariyer",
      "Atlamak",
      "Pist",
      "Engelli Koşu"
    ]
  },
  "sport_bayrak_yarisi": {
    "word": "Bayrak",
    "forbiddenWords": [
      "Spor",
      "Yarış",
      "Takım",
      "Devir",
      "Koşu"
    ]
  },
  "sport_uzun_atlama": {
    "word": "Atlama",
    "forbiddenWords": [
      "Spor",
      "Yarış",
      "Kum",
      "Mesafe",
      "Koşmak"
    ]
  },
  "sport_yuksek_atlama": {
    "word": "Yüksek",
    "forbiddenWords": [
      "Spor",
      "Yarış",
      "Çıta",
      "Atlamak",
      "Minder"
    ]
  },
  "sport_uc_adim_atlama": {
    "word": "Mesafe",
    "forbiddenWords": [
      "Spor",
      "Yarış",
      "Sekme",
      "Kum",
      "Üç Adım Atlama"
    ]
  },
  "sport_sirikla_atlama": {
    "word": "Sırıkla",
    "forbiddenWords": [
      "Spor",
      "Yarış",
      "Uzun çubuk",
      "Çıta",
      "Yüksek"
    ]
  },
  "sport_gulle_atma": {
    "word": "Atma",
    "forbiddenWords": [
      "Spor",
      "Yarış",
      "Ağır",
      "Metal",
      "Mesafe"
    ]
  },
  "sport_disk_atma": {
    "word": "Yuvarlak",
    "forbiddenWords": [
      "Spor",
      "Yarış",
      "Fırlatmak",
      "Mesafe",
      "Disk Atma"
    ]
  },
  "sport_cirit_atma": {
    "word": "Cirit",
    "forbiddenWords": [
      "Spor",
      "Yarış",
      "Mızrak",
      "Fırlatmak",
      "Pist"
    ]
  },
  "sport_cekic_atma": {
    "word": "Zincir",
    "forbiddenWords": [
      "Spor",
      "Yarış",
      "Dönmek",
      "Fırlatmak",
      "Çekiç Atma"
    ]
  },
  "sport_serbest_stil": {
    "word": "Stil",
    "forbiddenWords": [
      "Spor",
      "Yarış",
      "Yüzme",
      "Kulaç",
      "Hız"
    ]
  },
  "sport_kelebek_stili": {
    "word": "Dalga",
    "forbiddenWords": [
      "Spor",
      "Yarış",
      "Yüzme",
      "İki kol",
      "Kelebek Stili"
    ]
  },
  "sport_sirtustu_yuzme": {
    "word": "Havuz",
    "forbiddenWords": [
      "Spor",
      "Yarış",
      "Tavan",
      "Kulaç",
      "Sırtüstü Yüzme"
    ]
  },
  "sport_bisiklet_yarisi": {
    "word": "Pedal",
    "forbiddenWords": [
      "Spor",
      "Yarış",
      "Pist",
      "Finiş",
      "Bisiklet Yarışı"
    ]
  },
  "sport_dag_bisikleti": {
    "word": "Yokuş",
    "forbiddenWords": [
      "Spor",
      "Yarış",
      "Arazi",
      "Pedal",
      "Dağ Bisikleti"
    ]
  },
  "sport_formula_1": {
    "word": "Formula",
    "forbiddenWords": [
      "Spor",
      "Yarış",
      "Pilot",
      "Pist",
      "Pit stop"
    ]
  },
  "sport_kick_boks": {
    "word": "Kick",
    "forbiddenWords": [
      "Spor",
      "Müsabaka",
      "Tekme",
      "Eldiven",
      "Ring"
    ]
  },
  "sport_yagli_gures": {
    "word": "Müsabaka",
    "forbiddenWords": [
      "Spor",
      "Kırkpınar",
      "Kispet",
      "Pehlivan",
      "Yağlı Güreş"
    ]
  },
  "sport_artistik_jimnastik": {
    "word": "Artistik",
    "forbiddenWords": [
      "Spor",
      "Müsabaka",
      "Barfiks",
      "Yer",
      "Atlama"
    ]
  },
  "sport_ritmik_jimnastik": {
    "word": "Ritmik",
    "forbiddenWords": [
      "Spor",
      "Müsabaka",
      "Kurdele",
      "Top",
      "Müzik"
    ]
  },
  "sport_modern_pentatlon": {
    "word": "Pentatlon",
    "forbiddenWords": [
      "Spor",
      "Müsabaka",
      "Beş",
      "Eskrim",
      "Yüzme"
    ]
  },
  "sport_buz_pateni": {
    "word": "Pist",
    "forbiddenWords": [
      "Spor",
      "Müsabaka",
      "Paten",
      "Kaymak",
      "Buz Pateni"
    ]
  },
  "sport_artistik_patinaj": {
    "word": "Patinaj",
    "forbiddenWords": [
      "Spor",
      "Müsabaka",
      "Müzik",
      "Buz",
      "Dönmek"
    ]
  },
  "sport_orta_saha": {
    "word": "Orta",
    "forbiddenWords": [
      "Futbol",
      "Maç",
      "Pas",
      "Oyun kurmak",
      "Merkez"
    ]
  },
  "sport_tac_atisi": {
    "word": "Taç",
    "forbiddenWords": [
      "Futbol",
      "Maç",
      "Kenar",
      "Elle",
      "Çizgi"
    ]
  },
  "sport_uzatma_dakikasi": {
    "word": "Dakika",
    "forbiddenWords": [
      "Futbol",
      "Maç",
      "Hakem",
      "Süre",
      "Son"
    ]
  },
  "sport_sari_kart": {
    "word": "Kart",
    "forbiddenWords": [
      "Futbol",
      "Maç",
      "Uyarı",
      "Hakem",
      "Faul"
    ]
  },
  "sport_kirmizi_kart": {
    "word": "Maç",
    "forbiddenWords": [
      "Futbol",
      "İhraç",
      "Hakem",
      "Oyuncu",
      "Kırmızı Kart"
    ]
  },
  "profession_cocuk_doktoru": {
    "word": "Meslek",
    "forbiddenWords": [
      "Sağlık",
      "Bebek",
      "Aşı",
      "Muayene",
      "Çocuk Doktoru"
    ]
  },
  "profession_goz_doktoru": {
    "word": "Görme",
    "forbiddenWords": [
      "Meslek",
      "Sağlık",
      "Lens",
      "Muayene",
      "Göz Doktoru"
    ]
  },
  "profession_kulak_burun_bogaz_uzmani": {
    "word": "İşitme",
    "forbiddenWords": [
      "Meslek",
      "Sağlık",
      "Boğaz",
      "Muayene",
      "Kulak Burun Boğaz Uzmanı"
    ]
  },
  "profession_anestezi_uzmani": {
    "word": "Narkoz",
    "forbiddenWords": [
      "Meslek",
      "Sağlık",
      "Uyutmak",
      "Ameliyat",
      "Anestezi Uzmanı"
    ]
  },
  "profession_rehber_ogretmen": {
    "word": "Rehber",
    "forbiddenWords": [
      "Meslek",
      "Okul",
      "Danışmanlık",
      "Öğrenci",
      "Yönlendirme"
    ]
  },
  "profession_anaokulu_ogretmeni": {
    "word": "Okul",
    "forbiddenWords": [
      "Meslek",
      "Çocuk",
      "Oyun",
      "Sınıf",
      "Anaokulu Öğretmeni"
    ]
  },
  "profession_universite_hocasi": {
    "word": "Hoca",
    "forbiddenWords": [
      "Meslek",
      "Okul",
      "Ders",
      "Akademi",
      "Kampüs"
    ]
  },
  "profession_arastirma_gorevlisi": {
    "word": "Görevli",
    "forbiddenWords": [
      "Meslek",
      "Okul",
      "Üniversite",
      "Tez",
      "Laboratuvar"
    ]
  },
  "profession_ozel_ders_ogretmeni": {
    "word": "Ders",
    "forbiddenWords": [
      "Meslek",
      "Okul",
      "Bire bir",
      "Konu",
      "Öğrenci"
    ]
  },
  "profession_sinav_gorevlisi": {
    "word": "Gözetmen",
    "forbiddenWords": [
      "Meslek",
      "Okul",
      "Salon",
      "Kopya",
      "Sınav Görevlisi"
    ]
  },
  "profession_kuru_temizlemeci": {
    "word": "Hizmet",
    "forbiddenWords": [
      "Meslek",
      "Leke",
      "Kıyafet",
      "Askı",
      "Kuru Temizlemeci"
    ]
  },
  "profession_temizlik_gorevlisi": {
    "word": "Temizlik",
    "forbiddenWords": [
      "Meslek",
      "Hizmet",
      "Süpürge",
      "Paspas",
      "Bina"
    ]
  },
  "profession_otel_muduru": {
    "word": "Konaklama",
    "forbiddenWords": [
      "Meslek",
      "Hizmet",
      "Personel",
      "Rezervasyon",
      "Otel Müdürü"
    ]
  },
  "profession_tur_rehberi": {
    "word": "Tur",
    "forbiddenWords": [
      "Meslek",
      "Hizmet",
      "Gezi",
      "Anlatmak",
      "Grup"
    ]
  },
  "profession_seyahat_acentesi_calisani": {
    "word": "Seyahat",
    "forbiddenWords": [
      "Meslek",
      "Hizmet",
      "Bilet",
      "Tatil",
      "Rezervasyon"
    ]
  },
  "profession_kargo_gorevlisi": {
    "word": "Kargo",
    "forbiddenWords": [
      "Meslek",
      "Hizmet",
      "Paket",
      "Teslimat",
      "Adres"
    ]
  },
  "profession_taksi_soforu": {
    "word": "Tak",
    "forbiddenWords": [
      "Meslek",
      "Hizmet",
      "Yolcu",
      "Taksimetre",
      "Direksiyon"
    ]
  },
  "profession_otobus_soforu": {
    "word": "Direksiyon",
    "forbiddenWords": [
      "Meslek",
      "Hizmet",
      "Durak",
      "Yolcu",
      "Otobüs Şoförü"
    ]
  },
  "profession_kabin_memuru": {
    "word": "Kabin",
    "forbiddenWords": [
      "Meslek",
      "Hizmet",
      "Uçak",
      "Yolcu",
      "Emniyet"
    ]
  },
  "profession_gemi_kaptani": {
    "word": "Dümen",
    "forbiddenWords": [
      "Meslek",
      "Hizmet",
      "Liman",
      "Deniz",
      "Gemi Kaptanı"
    ]
  },
  "profession_ic_mimar": {
    "word": "Dekorasyon",
    "forbiddenWords": [
      "Meslek",
      "İş",
      "Mekân",
      "Mobilya",
      "İç Mimar"
    ]
  },
  "profession_insaat_ustasi": {
    "word": "İnşaat",
    "forbiddenWords": [
      "Meslek",
      "İş",
      "Tuğla",
      "Harç",
      "Bina"
    ]
  },
  "profession_guvenlik_gorevlisi": {
    "word": "Nöbet",
    "forbiddenWords": [
      "Meslek",
      "İş",
      "Giriş",
      "Kontrol",
      "Güvenlik Görevlisi"
    ]
  },
  "profession_seslendirme_sanatcisi": {
    "word": "Sanatçı",
    "forbiddenWords": [
      "Meslek",
      "Yaratıcılık",
      "Mikrofon",
      "Karakter",
      "Ses"
    ]
  },
  "profession_grafik_tasarimci": {
    "word": "Görsel",
    "forbiddenWords": [
      "Meslek",
      "Yaratıcılık",
      "Logo",
      "Bilgisayar",
      "Grafik Tasarımcı"
    ]
  },
  "profession_moda_tasarimcisi": {
    "word": "Tasarımcı",
    "forbiddenWords": [
      "Meslek",
      "Yaratıcılık",
      "Koleksiyon",
      "Kumaş",
      "Defile"
    ]
  },
  "profession_oyun_gelistiricisi": {
    "word": "Karakter",
    "forbiddenWords": [
      "Meslek",
      "Yaratıcılık",
      "Kod",
      "Bilgisayar",
      "Oyun Geliştiricisi"
    ]
  },
  "object_kursun_kalem": {
    "word": "Kalem",
    "forbiddenWords": [
      "Kırtasiye",
      "Yazmak",
      "Silgi",
      "Uç",
      "Grafit"
    ]
  },
  "object_tukenmez_kalem": {
    "word": "Tükenmez",
    "forbiddenWords": [
      "Kırtasiye",
      "Yazmak",
      "Mürekkep",
      "Kapak",
      "İmza"
    ]
  },
  "object_dolma_kalem": {
    "word": "Kırtasiye",
    "forbiddenWords": [
      "Yazmak",
      "Mürekkep",
      "Uç",
      "Kartuş",
      "Dolma Kalem"
    ]
  },
  "object_keceli_kalem": {
    "word": "Kapak",
    "forbiddenWords": [
      "Kırtasiye",
      "Yazmak",
      "Renkli",
      "Çizmek",
      "Keçeli Kalem"
    ]
  },
  "object_fosforlu_kalem": {
    "word": "Parlak",
    "forbiddenWords": [
      "Kırtasiye",
      "Yazmak",
      "İşaretlemek",
      "Metin",
      "Fosforlu Kalem"
    ]
  },
  "object_maket_bicagi": {
    "word": "Bıçak",
    "forbiddenWords": [
      "Kırtasiye",
      "Yazmak",
      "Keskin",
      "Kağıt",
      "Maket Bıçağı"
    ]
  },
  "object_not_defteri": {
    "word": "Not",
    "forbiddenWords": [
      "Kırtasiye",
      "Yazmak",
      "Sayfa",
      "Çizgili",
      "Cep"
    ]
  },
  "object_su_terazisi": {
    "word": "Denge",
    "forbiddenWords": [
      "Araç",
      "Ölçmek",
      "Kabarcık",
      "Düz",
      "Su Terazisi"
    ]
  },
  "object_ingiliz_anahtari": {
    "word": "İngiliz",
    "forbiddenWords": [
      "Alet",
      "Tamir",
      "Somun",
      "Ayarlanabilir",
      "Çevirmek"
    ]
  },
  "object_lokma_anahtari": {
    "word": "Alet",
    "forbiddenWords": [
      "Tamir",
      "Cıvata",
      "Takım",
      "Çevirmek",
      "Lokma Anahtarı"
    ]
  },
  "object_alyan_anahtari": {
    "word": "Alyan",
    "forbiddenWords": [
      "Alet",
      "Tamir",
      "Altıgen",
      "Vida",
      "Mobilya"
    ]
  },
  "object_dekupaj_testere": {
    "word": "Dekupaj",
    "forbiddenWords": [
      "Alet",
      "Tamir",
      "Elektrikli",
      "Kıvrım",
      "Ahşap"
    ]
  },
  "object_lehim_makinesi": {
    "word": "Lehim",
    "forbiddenWords": [
      "Alet",
      "Tamir",
      "Devre",
      "Isı",
      "Tel"
    ]
  },
  "object_bahce_makasi": {
    "word": "Tamir",
    "forbiddenWords": [
      "Alet",
      "Budamak",
      "Dal",
      "Kesmek",
      "Bahçe Makası"
    ]
  },
  "object_sirt_cantasi": {
    "word": "Çanta",
    "forbiddenWords": [
      "Eşya",
      "Taşımak",
      "Omuz",
      "Fermuar",
      "Okul"
    ]
  },
  "object_el_cantasi": {
    "word": "Eşya",
    "forbiddenWords": [
      "Taşımak",
      "Sap",
      "İç",
      "Aksesuar",
      "El Çantası"
    ]
  },
  "object_alisveris_sepeti": {
    "word": "Ürün",
    "forbiddenWords": [
      "Eşya",
      "Taşımak",
      "Market",
      "Sap",
      "Alışveriş Sepeti"
    ]
  },
  "object_bez_canta": {
    "word": "Kumaş",
    "forbiddenWords": [
      "Eşya",
      "Taşımak",
      "Market",
      "Tekrar kullanmak",
      "Bez Çanta"
    ]
  },
  "object_beslenme_cantasi": {
    "word": "Beslenme",
    "forbiddenWords": [
      "Eşya",
      "Taşımak",
      "Okul",
      "Yemek",
      "Çocuk"
    ]
  },
  "object_bavul_etiketi": {
    "word": "Bavul",
    "forbiddenWords": [
      "Eşya",
      "Taşımak",
      "İsim",
      "Havalimanı",
      "Valiz"
    ]
  },
  "object_kimlik_karti": {
    "word": "Kimlik",
    "forbiddenWords": [
      "Eşya",
      "Taşımak",
      "Fotoğraf",
      "Numara",
      "Resmi"
    ]
  },
  "object_uzatma_kablosu": {
    "word": "Uzatma",
    "forbiddenWords": [
      "Eşya",
      "Günlük",
      "Priz",
      "Elektrik",
      "Fiş"
    ]
  },
  "object_el_aynasi": {
    "word": "Ayna",
    "forbiddenWords": [
      "Eşya",
      "Günlük",
      "Yüz",
      "Yansıma",
      "Sap"
    ]
  },
  "object_sac_fircasi": {
    "word": "Kıl",
    "forbiddenWords": [
      "Eşya",
      "Günlük",
      "Saç",
      "Taramak",
      "Saç Fırçası"
    ]
  },
  "object_tirnak_makasi": {
    "word": "Metal",
    "forbiddenWords": [
      "Eşya",
      "Günlük",
      "Kesmek",
      "Parmak",
      "Tırnak Makası"
    ]
  },
  "object_islak_mendil": {
    "word": "Mendil",
    "forbiddenWords": [
      "Eşya",
      "Günlük",
      "Paket",
      "Temizlik",
      "Nemli"
    ]
  },
  "object_kagit_havlu": {
    "word": "Rulo",
    "forbiddenWords": [
      "Eşya",
      "Günlük",
      "Mutfak",
      "Emmek",
      "Kağıt Havlu"
    ]
  },
  "object_cop_poseti": {
    "word": "Çöp",
    "forbiddenWords": [
      "Eşya",
      "Günlük",
      "Atık",
      "Kova",
      "Siyah"
    ]
  },
  "object_cop_kovasi": {
    "word": "Atık",
    "forbiddenWords": [
      "Eşya",
      "Günlük",
      "Atmak",
      "Kapak",
      "Çöp Kovası"
    ]
  },
  "object_silikon_spatula": {
    "word": "Sap",
    "forbiddenWords": [
      "Eşya",
      "Mutfak",
      "Çevirmek",
      "Tava",
      "Silikon Spatula"
    ]
  },
  "object_kesme_tahtasi": {
    "word": "Kesme",
    "forbiddenWords": [
      "Eşya",
      "Mutfak",
      "Bıçak",
      "Doğramak",
      "Ahşap"
    ]
  },
  "object_mutfak_bicagi": {
    "word": "Keskin",
    "forbiddenWords": [
      "Eşya",
      "Mutfak",
      "Doğramak",
      "Sap",
      "Mutfak Bıçağı"
    ]
  },
  "object_ekmek_bicagi": {
    "word": "Dilim",
    "forbiddenWords": [
      "Eşya",
      "Mutfak",
      "Tırtıklı",
      "Kesmek",
      "Ekmek Bıçağı"
    ]
  },
  "object_konserve_acacagi": {
    "word": "Konserve",
    "forbiddenWords": [
      "Eşya",
      "Mutfak",
      "Kapak",
      "Metal",
      "Kutu"
    ]
  },
  "object_sise_acacagi": {
    "word": "Şişe",
    "forbiddenWords": [
      "Eşya",
      "Mutfak",
      "Kapak",
      "Metal",
      "İçecek"
    ]
  },
  "object_olcu_kabi": {
    "word": "Mililitre",
    "forbiddenWords": [
      "Eşya",
      "Mutfak",
      "Tarif",
      "Sıvı",
      "Ölçü Kabı"
    ]
  },
  "object_firin_tepsisi": {
    "word": "Tepsi",
    "forbiddenWords": [
      "Eşya",
      "Mutfak",
      "Pişirmek",
      "Metal",
      "Dikdörtgen"
    ]
  },
  "object_kek_kalibi": {
    "word": "Kalıp",
    "forbiddenWords": [
      "Eşya",
      "Mutfak",
      "Fırın",
      "Hamur",
      "Şekil"
    ]
  },
  "object_hamur_kesici": {
    "word": "Hamur",
    "forbiddenWords": [
      "Eşya",
      "Mutfak",
      "Şekil",
      "Kurabiye",
      "Metal"
    ]
  },
  "home_yatak_odasi": {
    "word": "Oda",
    "forbiddenWords": [
      "Ev",
      "Uyumak",
      "Dolap",
      "Yastık",
      "Yatak Odası"
    ]
  },
  "home_cati_kati": {
    "word": "Üst",
    "forbiddenWords": [
      "Ev",
      "Oda",
      "Tavan",
      "Merdiven",
      "Çatı Katı"
    ]
  },
  "home_camasir_odasi": {
    "word": "Kurutma",
    "forbiddenWords": [
      "Ev",
      "Oda",
      "Makine",
      "Kirli",
      "Çamaşır Odası"
    ]
  },
  "home_calisma_odasi": {
    "word": "Çalışma",
    "forbiddenWords": [
      "Ev",
      "Oda",
      "Masa",
      "Kitap",
      "Sessiz"
    ]
  },
  "home_cocuk_odasi": {
    "word": "Oyuncak",
    "forbiddenWords": [
      "Ev",
      "Oda",
      "Yatak",
      "Renkli",
      "Çocuk Odası"
    ]
  },
  "home_misafir_odasi": {
    "word": "Konuk",
    "forbiddenWords": [
      "Ev",
      "Oda",
      "Yatak",
      "Boş",
      "Misafir Odası"
    ]
  },
  "home_yemek_masasi": {
    "word": "Mobilya",
    "forbiddenWords": [
      "Ev",
      "Tabak",
      "Sandalye",
      "Aile",
      "Yemek Masası"
    ]
  },
  "home_calisma_masasi": {
    "word": "Çekmece",
    "forbiddenWords": [
      "Ev",
      "Mobilya",
      "Ders",
      "Bilgisayar",
      "Çalışma Masası"
    ]
  },
  "home_sallanan_sandalye": {
    "word": "Sallanan",
    "forbiddenWords": [
      "Ev",
      "Mobilya",
      "İleri geri",
      "Oturmak",
      "Ahşap"
    ]
  },
  "home_stor_perde": {
    "word": "Stor",
    "forbiddenWords": [
      "Ev",
      "Dekorasyon",
      "Rulo",
      "Pencere",
      "Çekmek"
    ]
  },
  "home_duvar_saati": {
    "word": "Yelkovan",
    "forbiddenWords": [
      "Ev",
      "Dekorasyon",
      "Akrep",
      "Asmak",
      "Duvar Saati"
    ]
  },
  "home_masa_ortusu": {
    "word": "Örtü",
    "forbiddenWords": [
      "Ev",
      "Dekorasyon",
      "Kumaş",
      "Sofra",
      "Sermek"
    ]
  },
  "home_bulasik_makinesi": {
    "word": "Bulaşık",
    "forbiddenWords": [
      "Ev",
      "Beyaz eşya",
      "Tabak",
      "Deterjan",
      "Yıkamak"
    ]
  },
  "home_mikrodalga_firin": {
    "word": "Mikrodalga",
    "forbiddenWords": [
      "Ev",
      "Beyaz eşya",
      "Isıtmak",
      "Dakika",
      "Döner"
    ]
  },
  "home_derin_dondurucu": {
    "word": "Derin",
    "forbiddenWords": [
      "Ev",
      "Beyaz eşya",
      "Donmak",
      "Soğuk",
      "Saklamak"
    ]
  },
  "home_kurutma_makinesi": {
    "word": "Kıyafet",
    "forbiddenWords": [
      "Ev",
      "Beyaz eşya",
      "Çamaşır",
      "Isı",
      "Kurutma Makinesi"
    ]
  },
  "home_elektrikli_supurge": {
    "word": "Toz",
    "forbiddenWords": [
      "Ev",
      "Beyaz eşya",
      "Hortum",
      "Temizlik",
      "Elektrikli Süpürge"
    ]
  },
  "home_su_aritma_cihazi": {
    "word": "Arıtma",
    "forbiddenWords": [
      "Ev",
      "Beyaz eşya",
      "Filtre",
      "İçmek",
      "Musluk"
    ]
  },
  "home_camasir_suyu": {
    "word": "Dezenfekte",
    "forbiddenWords": [
      "Ev",
      "Temizlik",
      "Beyaz",
      "Koku",
      "Çamaşır Suyu"
    ]
  },
  "home_bulasik_deterjani": {
    "word": "Köpük",
    "forbiddenWords": [
      "Ev",
      "Temizlik",
      "Tabak",
      "Yağ",
      "Bulaşık Deterjanı"
    ]
  },
  "home_cam_sil": {
    "word": "Sil",
    "forbiddenWords": [
      "Ev",
      "Temizlik",
      "Pencere",
      "Sprey",
      "Parlatmak"
    ]
  },
  "home_kirec_sokucu": {
    "word": "Kireç",
    "forbiddenWords": [
      "Ev",
      "Temizlik",
      "Banyo",
      "Musluk",
      "Leke"
    ]
  },
  "home_tuvalet_fircasi": {
    "word": "Klozet",
    "forbiddenWords": [
      "Ev",
      "Temizlik",
      "Sap",
      "Ovalamak",
      "Tuvalet Fırçası"
    ]
  },
  "home_camasir_ipi": {
    "word": "İpi",
    "forbiddenWords": [
      "Ev",
      "Temizlik",
      "Asmak",
      "Mandal",
      "Kurutmak"
    ]
  },
  "home_utu_masasi": {
    "word": "Katlanır",
    "forbiddenWords": [
      "Ev",
      "Temizlik",
      "Kıyafet",
      "Düz",
      "Ütü Masası"
    ]
  },
  "transport_elektrikli_scooter": {
    "word": "Ulaşım",
    "forbiddenWords": [
      "Yol",
      "Şarj",
      "Gidon",
      "Kiralama",
      "Elektrikli Scooter"
    ]
  },
  "transport_itfaiye_araci": {
    "word": "İtfaiye",
    "forbiddenWords": [
      "Ulaşım",
      "Yol",
      "Yangın",
      "Hortum",
      "Merdiven"
    ]
  },
  "transport_polis_arabasi": {
    "word": "Araba",
    "forbiddenWords": [
      "Ulaşım",
      "Yol",
      "Siren",
      "Devriye",
      "Mavi"
    ]
  },
  "transport_cop_kamyonu": {
    "word": "Yol",
    "forbiddenWords": [
      "Ulaşım",
      "Atık",
      "Toplamak",
      "Belediye",
      "Çöp Kamyonu"
    ]
  },
  "transport_yuk_gemisi": {
    "word": "Yük",
    "forbiddenWords": [
      "Deniz",
      "Taşıt",
      "Konteyner",
      "Liman",
      "Ticaret"
    ]
  },
  "transport_balikci_teknesi": {
    "word": "Taşıt",
    "forbiddenWords": [
      "Deniz",
      "Ağ",
      "Av",
      "Liman",
      "Balıkçı Teknesi"
    ]
  },
  "transport_surat_teknesi": {
    "word": "Sürat",
    "forbiddenWords": [
      "Deniz",
      "Taşıt",
      "Motor",
      "Hız",
      "Dalga"
    ]
  },
  "transport_yolcu_ucagi": {
    "word": "Hava",
    "forbiddenWords": [
      "Taşıt",
      "Kabin",
      "Koltuk",
      "Havalimanı",
      "Yolcu Uçağı"
    ]
  },
  "transport_yamac_parasutu": {
    "word": "Yamaç",
    "forbiddenWords": [
      "Hava",
      "Taşıt",
      "Tepe",
      "Kanat",
      "Süzülmek"
    ]
  },
  "transport_trafik_isigi": {
    "word": "Trafik",
    "forbiddenWords": [
      "Ulaşım",
      "Yolculuk",
      "Kırmızı",
      "Yeşil",
      "Kavşak"
    ]
  },
  "transport_yaya_gecidi": {
    "word": "Geçit",
    "forbiddenWords": [
      "Ulaşım",
      "Yolculuk",
      "Zebra",
      "Çizgi",
      "Karşıya"
    ]
  },
  "transport_donel_kavsak": {
    "word": "Dönel",
    "forbiddenWords": [
      "Ulaşım",
      "Yolculuk",
      "Ada",
      "Çember",
      "Trafik"
    ]
  },
  "transport_emniyet_kemeri": {
    "word": "Emniyet",
    "forbiddenWords": [
      "Ulaşım",
      "Yolculuk",
      "Kaza",
      "Takmak",
      "Koltuk"
    ]
  },
  "transport_hava_yastigi": {
    "word": "Yolculuk",
    "forbiddenWords": [
      "Ulaşım",
      "Çarpışma",
      "Açılmak",
      "Güvenlik",
      "Hava Yastığı"
    ]
  },
  "transport_dikiz_aynasi": {
    "word": "Dikiz",
    "forbiddenWords": [
      "Ulaşım",
      "Yolculuk",
      "Arka",
      "Görmek",
      "Araç"
    ]
  },
  "transport_sinyal_lambasi": {
    "word": "Lamba",
    "forbiddenWords": [
      "Ulaşım",
      "Yolculuk",
      "Dönüş",
      "Yanıp sönmek",
      "Araç"
    ]
  },
  "education_ders_programi": {
    "word": "Gün",
    "forbiddenWords": [
      "Okul",
      "Öğrenci",
      "Saat",
      "Çizelge",
      "Ders Programı"
    ]
  },
  "education_akilli_tahta": {
    "word": "Dokunmatik",
    "forbiddenWords": [
      "Okul",
      "Öğrenci",
      "Sınıf",
      "Ekran",
      "Akıllı Tahta"
    ]
  },
  "education_okul_gezisi": {
    "word": "Gezi",
    "forbiddenWords": [
      "Okul",
      "Öğrenci",
      "Otobüs",
      "Öğretmen",
      "Müze"
    ]
  },
  "education_kutuphane_karti": {
    "word": "Ödünç",
    "forbiddenWords": [
      "Okul",
      "Öğrenci",
      "Kitap",
      "Üye",
      "Kütüphane Kartı"
    ]
  },
  "education_konferans_salonu": {
    "word": "Sahne",
    "forbiddenWords": [
      "Okul",
      "Öğrenci",
      "Sunum",
      "Koltuk",
      "Konferans Salonu"
    ]
  },
  "education_muzik_dersi": {
    "word": "Nota",
    "forbiddenWords": [
      "Ders",
      "Okul",
      "Şarkı",
      "Enstrüman",
      "Müzik Dersi"
    ]
  },
  "education_resim_dersi": {
    "word": "Resim",
    "forbiddenWords": [
      "Ders",
      "Okul",
      "Boya",
      "Fırça",
      "Çizim"
    ]
  },
  "education_beden_egitimi": {
    "word": "Beden",
    "forbiddenWords": [
      "Ders",
      "Okul",
      "Spor",
      "Salon",
      "Hareket"
    ]
  },
  "education_yabanci_dil": {
    "word": "Kelime",
    "forbiddenWords": [
      "Ders",
      "Okul",
      "Konuşmak",
      "Öğrenmek",
      "Yabancı Dil"
    ]
  },
  "education_din_kulturu": {
    "word": "Din",
    "forbiddenWords": [
      "Ders",
      "Okul",
      "İnanç",
      "İbadet",
      "Ahlak"
    ]
  },
  "clothing_kot_pantolon": {
    "word": "Kot",
    "forbiddenWords": [
      "Giysi",
      "Giyinmek",
      "Denim",
      "Mavi",
      "Cep"
    ]
  },
  "clothing_takim_elbise": {
    "word": "Takım",
    "forbiddenWords": [
      "Giysi",
      "Giyinmek",
      "Ceket",
      "Pantolon",
      "Kravat"
    ]
  },
  "clothing_fotr_sapka": {
    "word": "Fötr",
    "forbiddenWords": [
      "Aksesuar",
      "Takmak",
      "Kenar",
      "Keçe",
      "Klasik"
    ]
  },
  "clothing_kontakt_lens": {
    "word": "Lens",
    "forbiddenWords": [
      "Aksesuar",
      "Takmak",
      "Göz",
      "Cam",
      "Görme"
    ]
  },
  "clothing_spor_ayakkabi": {
    "word": "Bağcık",
    "forbiddenWords": [
      "Ayakkabı",
      "Ayak",
      "Koşmak",
      "Taban",
      "Spor Ayakkabı"
    ]
  },
  "clothing_topuklu_ayakkabi": {
    "word": "İnce",
    "forbiddenWords": [
      "Ayakkabı",
      "Ayak",
      "Yüksek",
      "Denge",
      "Topuklu Ayakkabı"
    ]
  },
  "clothing_yagmur_cizmesi": {
    "word": "Lastik",
    "forbiddenWords": [
      "Ayakkabı",
      "Ayak",
      "Su",
      "Çamur",
      "Yağmur Çizmesi"
    ]
  },
  "nature_gok_gurultusu": {
    "word": "Gürültü",
    "forbiddenWords": [
      "Hava",
      "Gökyüzü",
      "Ses",
      "Yıldırım",
      "Gürlemek"
    ]
  },
  "nature_gunes_isigi": {
    "word": "Aydınlık",
    "forbiddenWords": [
      "Hava",
      "Gökyüzü",
      "Sıcaklık",
      "Işın",
      "Güneş Işığı"
    ]
  },
  "nature_gun_dogumu": {
    "word": "Ufuk",
    "forbiddenWords": [
      "Hava",
      "Gökyüzü",
      "Sabah",
      "Güneş",
      "Gün Doğumu"
    ]
  },
  "nature_gun_batimi": {
    "word": "Kızıl",
    "forbiddenWords": [
      "Hava",
      "Gökyüzü",
      "Akşam",
      "Ufuk",
      "Gün Batımı"
    ]
  },
  "nature_zeytin_agaci": {
    "word": "Zeytin",
    "forbiddenWords": [
      "Bitki",
      "Doğa",
      "Meyve",
      "Akdeniz",
      "Yağ"
    ]
  },
  "nature_egrelti_otu": {
    "word": "Otu",
    "forbiddenWords": [
      "Bitki",
      "Doğa",
      "Nemli",
      "Yaprak",
      "Orman"
    ]
  },
  "nature_gelincik_cicegi": {
    "word": "Tarla",
    "forbiddenWords": [
      "Bitki",
      "Doğa",
      "Kırmızı",
      "İnce",
      "Gelincik Çiçeği"
    ]
  },
  "health_safra_kesesi": {
    "word": "Kese",
    "forbiddenWords": [
      "Organ",
      "Sağlık",
      "Karaciğer",
      "Sindirim",
      "Taş"
    ]
  },
  "health_tibbi_dikis": {
    "word": "Dikiş",
    "forbiddenWords": [
      "Sağlık",
      "Tedavi",
      "Yara",
      "İğne",
      "İplik"
    ]
  },
  "health_kan_tahlili": {
    "word": "Örnek",
    "forbiddenWords": [
      "Sağlık",
      "Tedavi",
      "Laboratuvar",
      "Sonuç",
      "Kan Tahlili"
    ]
  },
  "health_idrar_tahlili": {
    "word": "İdrar",
    "forbiddenWords": [
      "Sağlık",
      "Tedavi",
      "Örnek",
      "Laboratuvar",
      "Sonuç"
    ]
  },
  "health_ates_olcer": {
    "word": "Ölçer",
    "forbiddenWords": [
      "Sağlık",
      "Tedavi",
      "Derece",
      "Hastalık",
      "Termometre"
    ]
  },
  "health_ilk_yardim": {
    "word": "Yardım",
    "forbiddenWords": [
      "Sağlık",
      "Tedavi",
      "Acil",
      "Müdahale",
      "Yaralı"
    ]
  },
  "health_kalp_masaji": {
    "word": "Acil",
    "forbiddenWords": [
      "Sağlık",
      "Tedavi",
      "Baskı",
      "Göğüs",
      "Kalp Masajı"
    ]
  },
  "health_oksijen_maskesi": {
    "word": "Nefes",
    "forbiddenWords": [
      "Sağlık",
      "Tedavi",
      "Yüz",
      "Hastane",
      "Oksijen Maskesi"
    ]
  },
  "health_soguk_alginligi": {
    "word": "Hastalık",
    "forbiddenWords": [
      "Belirti",
      "Hapşırmak",
      "Burun",
      "Öksürük",
      "Soğuk Algınlığı"
    ]
  },
  "health_bas_agrisi": {
    "word": "Şakak",
    "forbiddenWords": [
      "Hastalık",
      "Belirti",
      "Zonklamak",
      "İlaç",
      "Baş Ağrısı"
    ]
  },
  "health_dis_agrisi": {
    "word": "Hekim",
    "forbiddenWords": [
      "Hastalık",
      "Belirti",
      "Çürük",
      "Sızı",
      "Diş Ağrısı"
    ]
  },
  "health_bogaz_agrisi": {
    "word": "Enfeksiyon",
    "forbiddenWords": [
      "Hastalık",
      "Belirti",
      "Yutkunmak",
      "Ses",
      "Boğaz Ağrısı"
    ]
  },
  "health_mide_bulantisi": {
    "word": "Rahatsızlık",
    "forbiddenWords": [
      "Hastalık",
      "Belirti",
      "Kusmak",
      "Yemek",
      "Mide Bulantısı"
    ]
  },
  "health_karin_agrisi": {
    "word": "Kramp",
    "forbiddenWords": [
      "Hastalık",
      "Belirti",
      "Mide",
      "Rahatsızlık",
      "Karın Ağrısı"
    ]
  },
  "health_gunes_yanigi": {
    "word": "Yanık",
    "forbiddenWords": [
      "Hastalık",
      "Belirti",
      "Kızarmak",
      "Cilt",
      "Yaz"
    ]
  },
  "everyday_ogle_yemegi": {
    "word": "Öğle",
    "forbiddenWords": [
      "Günlük",
      "Yaşam",
      "Gün ortası",
      "Mola",
      "Yemek"
    ]
  },
  "everyday_aksam_yemegi": {
    "word": "Yaşam",
    "forbiddenWords": [
      "Günlük",
      "Sofra",
      "Gece",
      "Aile",
      "Akşam Yemeği"
    ]
  },
  "everyday_mahalle_bakkali": {
    "word": "Veresiye",
    "forbiddenWords": [
      "Günlük",
      "Yaşam",
      "Ekmek",
      "Dükkân",
      "Mahalle Bakkalı"
    ]
  },
  "everyday_alisveris_listesi": {
    "word": "Liste",
    "forbiddenWords": [
      "Günlük",
      "Yaşam",
      "Yazmak",
      "Ürün",
      "Unutmamak"
    ]
  },
  "everyday_kasa_fisi": {
    "word": "Kasa",
    "forbiddenWords": [
      "Günlük",
      "Yaşam",
      "Ödeme",
      "Kağıt",
      "Kasa Fişi"
    ]
  },
  "everyday_nakit_para": {
    "word": "Nakit",
    "forbiddenWords": [
      "Günlük",
      "Yaşam",
      "Banknot",
      "Bozuk",
      "Cüzdan"
    ]
  },
  "everyday_bozuk_para": {
    "word": "Bozuk",
    "forbiddenWords": [
      "Günlük",
      "Yaşam",
      "Madeni",
      "Kumbara",
      "Üst"
    ]
  },
  "everyday_kredi_karti": {
    "word": "Banka",
    "forbiddenWords": [
      "Günlük",
      "Yaşam",
      "Ödeme",
      "Limit",
      "Kredi Kartı"
    ]
  },
  "everyday_banka_karti": {
    "word": "Hesap",
    "forbiddenWords": [
      "Günlük",
      "Yaşam",
      "ATM",
      "Ödeme",
      "Banka Kartı"
    ]
  },
  "everyday_banka_subesi": {
    "word": "Şube",
    "forbiddenWords": [
      "Günlük",
      "Yaşam",
      "Hesap",
      "Vezne",
      "Sıra"
    ]
  },
  "everyday_sira_numarasi": {
    "word": "Numara",
    "forbiddenWords": [
      "Günlük",
      "Yaşam",
      "Beklemek",
      "Fiş",
      "Ekran"
    ]
  },
  "everyday_bekleme_salonu": {
    "word": "Bekleme",
    "forbiddenWords": [
      "Günlük",
      "Yaşam",
      "Koltuk",
      "Randevu",
      "Sıra"
    ]
  },
  "everyday_hediye_paketi": {
    "word": "İnsan",
    "forbiddenWords": [
      "Sosyal",
      "Kurdele",
      "Kağıt",
      "Sarmak",
      "Hediye Paketi"
    ]
  },
  "everyday_dogum_gunu": {
    "word": "Yaş",
    "forbiddenWords": [
      "Sosyal",
      "İnsan",
      "Pasta",
      "Mum",
      "Doğum Günü"
    ]
  },
  "everyday_kina_gecesi": {
    "word": "Kına",
    "forbiddenWords": [
      "Sosyal",
      "İnsan",
      "Eller",
      "Düğün",
      "Gelenek"
    ]
  },
  "everyday_bebek_ziyareti": {
    "word": "Aile",
    "forbiddenWords": [
      "Sosyal",
      "İnsan",
      "Doğum",
      "Hediye",
      "Bebek Ziyareti"
    ]
  },
  "everyday_mezuniyet_toreni": {
    "word": "Kep",
    "forbiddenWords": [
      "Sosyal",
      "İnsan",
      "Diploma",
      "Sahne",
      "Mezuniyet Töreni"
    ]
  },
  "everyday_veda_partisi": {
    "word": "Parti",
    "forbiddenWords": [
      "Sosyal",
      "İnsan",
      "Ayrılmak",
      "Kutlama",
      "İş"
    ]
  },
  "everyday_cocuk_parki": {
    "word": "Şehir",
    "forbiddenWords": [
      "Günlük",
      "Salıncak",
      "Kaydırak",
      "Oyun",
      "Çocuk Parkı"
    ]
  },
  "everyday_yuruyus_yolu": {
    "word": "Yürüyüş",
    "forbiddenWords": [
      "Şehir",
      "Günlük",
      "Park",
      "Adım",
      "Spor"
    ]
  },
  "everyday_ust_gecit": {
    "word": "Yaya",
    "forbiddenWords": [
      "Şehir",
      "Günlük",
      "Merdiven",
      "Trafik",
      "Üst Geçit"
    ]
  },
  "everyday_alt_gecit": {
    "word": "Alt",
    "forbiddenWords": [
      "Şehir",
      "Günlük",
      "Yeraltı",
      "Yaya",
      "Trafik"
    ]
  },
  "everyday_benzin_istasyonu": {
    "word": "Benzin",
    "forbiddenWords": [
      "Şehir",
      "Günlük",
      "Pompa",
      "Yakıt",
      "Araç"
    ]
  },
  "everyday_berber_dukkani": {
    "word": "Tıraş",
    "forbiddenWords": [
      "Şehir",
      "Günlük",
      "Saç",
      "Makas",
      "Berber Dükkânı"
    ]
  },
  "everyday_itfaiye_istasyonu": {
    "word": "Yangın",
    "forbiddenWords": [
      "Şehir",
      "Günlük",
      "Araç",
      "Hortum",
      "İtfaiye İstasyonu"
    ]
  },
  "everyday_hafta_sonu": {
    "word": "Hafta",
    "forbiddenWords": [
      "Gün",
      "Zaman",
      "Cumartesi",
      "Pazar",
      "Tatil"
    ]
  },
  "everyday_tatil_gunu": {
    "word": "Tatil",
    "forbiddenWords": [
      "Gün",
      "Zaman",
      "Dinlenmek",
      "İş yok",
      "Boş"
    ]
  },
  "everyday_is_gunu": {
    "word": "Zaman",
    "forbiddenWords": [
      "Gün",
      "Mesai",
      "Hafta içi",
      "Ofis",
      "İş Günü"
    ]
  },
  "everyday_fazla_mesai": {
    "word": "Fazla",
    "forbiddenWords": [
      "Gün",
      "Zaman",
      "Ek saat",
      "Çalışmak",
      "Ücret"
    ]
  },
  "everyday_gec_kalmak": {
    "word": "Geç",
    "forbiddenWords": [
      "Gün",
      "Zaman",
      "Saat",
      "Yetişememek",
      "Özür"
    ]
  },
  "everyday_erken_kalkmak": {
    "word": "Erken",
    "forbiddenWords": [
      "Gün",
      "Zaman",
      "Alarm",
      "Sabah",
      "Uyanmak"
    ]
  },
  "everyday_uykuya_dalmak": {
    "word": "Uykuya",
    "forbiddenWords": [
      "Gün",
      "Zaman",
      "Yatak",
      "Göz",
      "Gece"
    ]
  },
  "everyday_erteleme_tusu": {
    "word": "Erteleme",
    "forbiddenWords": [
      "Gün",
      "Zaman",
      "Alarm",
      "Beş dakika",
      "Uyku"
    ]
  },
  "science_kutup_yildizi": {
    "word": "Uzay",
    "forbiddenWords": [
      "Gökyüzü",
      "Kuzey",
      "Yön",
      "Sabit",
      "Kutup Yıldızı"
    ]
  },
  "science_kara_delik": {
    "word": "Delik",
    "forbiddenWords": [
      "Uzay",
      "Gökyüzü",
      "Çekim",
      "Işık",
      "Olay ufku"
    ]
  },
  "science_uzay_istasyonu": {
    "word": "Modül",
    "forbiddenWords": [
      "Uzay",
      "Gökyüzü",
      "Yörünge",
      "Astronot",
      "Uzay İstasyonu"
    ]
  },
  "science_yeni_ay": {
    "word": "Görünmez",
    "forbiddenWords": [
      "Uzay",
      "Gökyüzü",
      "Evre",
      "Karanlık",
      "Yeni Ay"
    ]
  },
  "science_periyodik_tablo": {
    "word": "Tablo",
    "forbiddenWords": [
      "Bilim",
      "Madde",
      "Element",
      "Satır",
      "Sembol"
    ]
  },
  "science_kimyasal_tepkime": {
    "word": "Tepkime",
    "forbiddenWords": [
      "Bilim",
      "Madde",
      "Değişim",
      "Deney",
      "Bağ"
    ]
  },
  "science_ses_dalgasi": {
    "word": "Kuvvet",
    "forbiddenWords": [
      "Fizik",
      "Titreşim",
      "Kulak",
      "Frekans",
      "Ses Dalgası"
    ]
  },
  "science_pil_hucresi": {
    "word": "Elektrot",
    "forbiddenWords": [
      "Fizik",
      "Kuvvet",
      "Enerji",
      "Şarj",
      "Pil Hücresi"
    ]
  },
  "science_manyetik_alan": {
    "word": "Manyetik",
    "forbiddenWords": [
      "Fizik",
      "Kuvvet",
      "Mıknatıs",
      "Kutup",
      "Çekim"
    ]
  },
  "science_mantar_hucresi": {
    "word": "Hif",
    "forbiddenWords": [
      "Biyoloji",
      "Canlı",
      "Spor",
      "Nem",
      "Mantar Hücresi"
    ]
  },
  "science_besin_zinciri": {
    "word": "Besin",
    "forbiddenWords": [
      "Biyoloji",
      "Canlı",
      "Av",
      "Yırtıcı",
      "Sıra"
    ]
  },
  "culture_mesir_macunu": {
    "word": "Mesir",
    "forbiddenWords": [
      "Türkiye",
      "Kültür",
      "Manisa",
      "Baharat",
      "Şifa"
    ]
  },
  "culture_hat_sanati": {
    "word": "Hat",
    "forbiddenWords": [
      "Sanat",
      "Gelenek",
      "Yazı",
      "Kalem",
      "Arap harfleri"
    ]
  },
  "culture_seramik_sanati": {
    "word": "Sanat",
    "forbiddenWords": [
      "Gelenek",
      "Kil",
      "Fırın",
      "Çömlek",
      "Seramik Sanatı"
    ]
  },
  "culture_sepet_oruculugu": {
    "word": "Sepet",
    "forbiddenWords": [
      "Sanat",
      "Gelenek",
      "Hasır",
      "El Pşi",
      "Örmek"
    ]
  },
  "culture_ahsap_oymaciligi": {
    "word": "Ahşap",
    "forbiddenWords": [
      "Sanat",
      "Gelenek",
      "Tahta",
      "Keski",
      "Desen"
    ]
  },
  "culture_orta_cag": {
    "word": "Çağ",
    "forbiddenWords": [
      "Tarih",
      "Dünya",
      "Şato",
      "Şövalye",
      "Avrupa"
    ]
  },
  "culture_matbaanin_icadi": {
    "word": "Matbaanın",
    "forbiddenWords": [
      "Tarih",
      "Dünya",
      "Gutenberg",
      "Kitap",
      "Basım"
    ]
  },
  "culture_oy_pusulasi": {
    "word": "Toplum",
    "forbiddenWords": [
      "Kurum",
      "Sandık",
      "Mühür",
      "Seçim",
      "Oy Pusulası"
    ]
  },
  "culture_belediye_meclisi": {
    "word": "Kurum",
    "forbiddenWords": [
      "Toplum",
      "Şehir",
      "Üye",
      "Karar",
      "Belediye Meclisi"
    ]
  },
  "culture_nufus_mudurlugu": {
    "word": "Nüfus",
    "forbiddenWords": [
      "Toplum",
      "Kurum",
      "Kimlik",
      "Kayıt",
      "Adres"
    ]
  },
  "culture_tapu_dairesi": {
    "word": "Mülkiyet",
    "forbiddenWords": [
      "Toplum",
      "Kurum",
      "Ev",
      "Belge",
      "Tapu Dairesi"
    ]
  },
  "culture_vergi_dairesi": {
    "word": "Beyan",
    "forbiddenWords": [
      "Toplum",
      "Kurum",
      "Ödeme",
      "Devlet",
      "Vergi Dairesi"
    ]
  },
  "entertainment_elektro_gitar": {
    "word": "Elektro",
    "forbiddenWords": [
      "Müzik",
      "Ses",
      "Amfi",
      "Tel",
      "Rock"
    ]
  },
  "entertainment_bas_gitar": {
    "word": "Bas",
    "forbiddenWords": [
      "Müzik",
      "Ses",
      "Kalın tel",
      "Ritim",
      "Amfi"
    ]
  },
  "entertainment_calma_listesi": {
    "word": "Çalma",
    "forbiddenWords": [
      "Müzik",
      "Eğlence",
      "Şarkı",
      "Sıra",
      "Dinlemek"
    ]
  },
  "entertainment_hip_hop": {
    "word": "Hop",
    "forbiddenWords": [
      "Müzik",
      "Eğlence",
      "Rap",
      "Dans",
      "Kültür"
    ]
  },
  "entertainment_break_dans": {
    "word": "Dans",
    "forbiddenWords": [
      "Müzik",
      "Eğlence",
      "Sokak",
      "Hareket",
      "Hip hop"
    ]
  },
  "entertainment_film_seti": {
    "word": "Film",
    "forbiddenWords": [
      "Ekran",
      "Kamera",
      "Çekim",
      "Yönetmen",
      "Film Seti"
    ]
  },
  "entertainment_ozel_efekt": {
    "word": "Efekt",
    "forbiddenWords": [
      "Film",
      "Ekran",
      "Patlama",
      "Görsel",
      "Bilgisayar"
    ]
  },
  "entertainment_korku_filmi": {
    "word": "Gerilim",
    "forbiddenWords": [
      "Film",
      "Ekran",
      "Karanlık",
      "Çığlık",
      "Korku Filmi"
    ]
  },
  "entertainment_bilim_kurgu": {
    "word": "Bilim",
    "forbiddenWords": [
      "Film",
      "Ekran",
      "Uzay",
      "Gelecek",
      "Teknoloji"
    ]
  },
  "entertainment_fantastik_film": {
    "word": "Fantastik",
    "forbiddenWords": [
      "Film",
      "Ekran",
      "Büyü",
      "Ejderha",
      "Hayal"
    ]
  },
  "entertainment_romantik_komedi": {
    "word": "Romantik",
    "forbiddenWords": [
      "Film",
      "Ekran",
      "Aşk",
      "Gülmek",
      "Çift"
    ]
  },
  "entertainment_macera_filmi": {
    "word": "Macera",
    "forbiddenWords": [
      "Film",
      "Ekran",
      "Yolculuk",
      "Tehlike",
      "Kahraman"
    ]
  },
  "entertainment_sessiz_film": {
    "word": "Sessiz",
    "forbiddenWords": [
      "Film",
      "Ekran",
      "Siyah beyaz",
      "Yazı",
      "Konuşma"
    ]
  },
  "entertainment_kisa_film": {
    "word": "Kısa",
    "forbiddenWords": [
      "Film",
      "Ekran",
      "Dakika",
      "Festival",
      "Yönetmen"
    ]
  },
  "entertainment_odul_toreni": {
    "word": "Ödül",
    "forbiddenWords": [
      "Film",
      "Ekran",
      "Sahne",
      "Heykelcik",
      "Kazanan"
    ]
  },
  "entertainment_altin_palmiye": {
    "word": "Cannes",
    "forbiddenWords": [
      "Film",
      "Ekran",
      "Festival",
      "Ödül",
      "Altın Palmiye"
    ]
  },
  "entertainment_kelime_oyunu": {
    "word": "Tahmin",
    "forbiddenWords": [
      "Oyun",
      "Arkadaş",
      "Harf",
      "Sözlük",
      "Kelime Oyunu"
    ]
  },
  "entertainment_mendil_kapmaca": {
    "word": "Kapmaca",
    "forbiddenWords": [
      "Oyun",
      "Arkadaş",
      "Koşmak",
      "Ortada",
      "Takım"
    ]
  },
  "entertainment_ip_atlama": {
    "word": "Ritim",
    "forbiddenWords": [
      "Oyun",
      "Arkadaş",
      "Zıplamak",
      "Çevirmek",
      "İp Atlama"
    ]
  },
  "entertainment_donme_dolap": {
    "word": "Dolap",
    "forbiddenWords": [
      "Eğlence",
      "Etkinlik",
      "Kabin",
      "Yüksek",
      "Manzara"
    ]
  },
  "entertainment_hiz_treni": {
    "word": "Eğlence",
    "forbiddenWords": [
      "Etkinlik",
      "Ray",
      "Hız",
      "Çığlık",
      "Hız Treni"
    ]
  },
  "entertainment_carpisan_araba": {
    "word": "Çarpışan",
    "forbiddenWords": [
      "Eğlence",
      "Etkinlik",
      "Elektrikli",
      "Vurmak",
      "Lunapark"
    ]
  },
  "entertainment_korku_tuneli": {
    "word": "Etkinlik",
    "forbiddenWords": [
      "Eğlence",
      "Karanlık",
      "Çığlık",
      "Lunapark",
      "Korku Tüneli"
    ]
  },
  "entertainment_stand_up": {
    "word": "Stand",
    "forbiddenWords": [
      "Eğlence",
      "Etkinlik",
      "Mikrofon",
      "Espri",
      "Sahne"
    ]
  },
  "entertainment_kostum_partisi": {
    "word": "Kılık",
    "forbiddenWords": [
      "Eğlence",
      "Etkinlik",
      "Davet",
      "Maske",
      "Kostüm Partisi"
    ]
  },
  "entertainment_maskeli_balo": {
    "word": "Balo",
    "forbiddenWords": [
      "Eğlence",
      "Etkinlik",
      "Yüz",
      "Dans",
      "Kostüm"
    ]
  },
  "verb_izgara_yapmak": {
    "word": "Izgara",
    "forbiddenWords": [
      "Mutfak",
      "Yemek",
      "Ateş",
      "Et",
      "Tel"
    ]
  },
  "verb_buharda_pisirmek": {
    "word": "Buharda",
    "forbiddenWords": [
      "Mutfak",
      "Yemek",
      "Su",
      "Tencere",
      "Sebze"
    ]
  },
  "verb_marine_etmek": {
    "word": "Marine",
    "forbiddenWords": [
      "Mutfak",
      "Yemek",
      "Sos",
      "Bekletmek",
      "Et"
    ]
  },
  "verb_servis_etmek": {
    "word": "Servis",
    "forbiddenWords": [
      "Mutfak",
      "Yemek",
      "Tabak",
      "Masa",
      "Sunmak"
    ]
  },
  "verb_ayaga_kalkmak": {
    "word": "Ayağa",
    "forbiddenWords": [
      "Hareket",
      "Vücut",
      "Oturmak",
      "Dik",
      "Bacak"
    ]
  },
  "verb_tekme_atmak": {
    "word": "Tekme",
    "forbiddenWords": [
      "Hareket",
      "Vücut",
      "Ayak",
      "Top",
      "Vurmak"
    ]
  },
  "verb_yumruk_atmak": {
    "word": "Yumruk",
    "forbiddenWords": [
      "Hareket",
      "Vücut",
      "El",
      "Boks",
      "Vurmak"
    ]
  },
  "verb_el_sallamak": {
    "word": "Vücut",
    "forbiddenWords": [
      "Hareket",
      "Veda",
      "Kol",
      "Merhaba",
      "El Sallamak"
    ]
  },
  "verb_buzda_kaymak": {
    "word": "Buzda",
    "forbiddenWords": [
      "Hareket",
      "Vücut",
      "Buz",
      "Kar",
      "Denge"
    ]
  },
  "verb_sarki_soylemek": {
    "word": "İletişim",
    "forbiddenWords": [
      "İnsan",
      "Melodi",
      "Ses",
      "Mikrofon",
      "Şarkı Söylemek"
    ]
  },
  "verb_ikna_etmek": {
    "word": "İkna",
    "forbiddenWords": [
      "İnsan",
      "İletişim",
      "Fikir",
      "Kabul",
      "Söz"
    ]
  },
  "verb_saka_yapmak": {
    "word": "Şaka",
    "forbiddenWords": [
      "İnsan",
      "İletişim",
      "Espri",
      "Gülmek",
      "Komik"
    ]
  },
  "verb_dedikodu_yapmak": {
    "word": "Başka",
    "forbiddenWords": [
      "İnsan",
      "İletişim",
      "Başkası",
      "Konuşmak",
      "Sır"
    ]
  },
  "verb_soz_vermek": {
    "word": "Söz",
    "forbiddenWords": [
      "İnsan",
      "İletişim",
      "Gelecek",
      "Yapmak",
      "Güven"
    ]
  },
  "verb_ozur_dilemek": {
    "word": "Pişman",
    "forbiddenWords": [
      "İnsan",
      "İletişim",
      "Hata",
      "Affetmek",
      "Özür Dilemek"
    ]
  },
  "verb_tesekkur_etmek": {
    "word": "Minnet",
    "forbiddenWords": [
      "İnsan",
      "İletişim",
      "Sağ ol",
      "Yardım",
      "Teşekkür Etmek"
    ]
  },
  "verb_tebrik_etmek": {
    "word": "Bravo",
    "forbiddenWords": [
      "İnsan",
      "İletişim",
      "Başarı",
      "Kutlamak",
      "Tebrik Etmek"
    ]
  },
  "verb_selam_vermek": {
    "word": "Selam",
    "forbiddenWords": [
      "İnsan",
      "İletişim",
      "Merhaba",
      "Karşılaşmak",
      "El"
    ]
  },
  "verb_toz_almak": {
    "word": "Yüzey",
    "forbiddenWords": [
      "Ev",
      "Temizlik",
      "Raf",
      "Bez",
      "Toz Almak"
    ]
  },
  "verb_leke_cikarmak": {
    "word": "Leke",
    "forbiddenWords": [
      "Ev",
      "Temizlik",
      "Deterjan",
      "Kumaş",
      "Ovmak"
    ]
  },
  "verb_kamp_kurmak": {
    "word": "Kamp",
    "forbiddenWords": [
      "Dışarı",
      "Doğa",
      "Çadır",
      "Orman",
      "Gece"
    ]
  },
  "verb_balik_tutmak": {
    "word": "Olta",
    "forbiddenWords": [
      "Dışarı",
      "Doğa",
      "Yem",
      "Su",
      "Balık Tutmak"
    ]
  },
  "verb_yuruyuse_cikmak": {
    "word": "Yürüyüşe",
    "forbiddenWords": [
      "Dışarı",
      "Doğa",
      "Park",
      "Adım",
      "Ayakkabı"
    ]
  },
  "verb_piknige_gitmek": {
    "word": "Pikniğe",
    "forbiddenWords": [
      "Dışarı",
      "Doğa",
      "Sepet",
      "Örtü",
      "Açık hava"
    ]
  },
  "verb_hayal_kurmak": {
    "word": "Hayal",
    "forbiddenWords": [
      "Zihin",
      "Düşünce",
      "Gelecek",
      "Düş",
      "Tasarlamak"
    ]
  },
  "verb_karar_vermek": {
    "word": "Zihin",
    "forbiddenWords": [
      "Düşünce",
      "Seçmek",
      "Düşünmek",
      "Sonuç",
      "Karar Vermek"
    ]
  },
  "verb_tahmin_etmek": {
    "word": "Düşünce",
    "forbiddenWords": [
      "Zihin",
      "Bilmemek",
      "Olasılık",
      "Öngörmek",
      "Tahmin Etmek"
    ]
  },
  "concept_is_birligi": {
    "word": "Birlik",
    "forbiddenWords": [
      "Değer",
      "Toplum",
      "Ortak",
      "Birlikte",
      "Hedef"
    ]
  },
  "concept_hayal_gucu": {
    "word": "Fikir",
    "forbiddenWords": [
      "Düşünce",
      "Zihin",
      "Kurmak",
      "Gerçek dışı",
      "Hayal Gücü"
    ]
  },
  "concept_on_yargi": {
    "word": "Tanımadan",
    "forbiddenWords": [
      "Düşünce",
      "Fikir",
      "Yargı",
      "Peşin",
      "Ön Yargı"
    ]
  },
  "concept_fikir_ayriligi": {
    "word": "Anlaşmazlık",
    "forbiddenWords": [
      "Düşünce",
      "Fikir",
      "Tartışma",
      "Görüş",
      "Fikir Ayrılığı"
    ]
  },
  "cuisine_kirmizi_pul_biber": {
    "word": "Baharat",
    "forbiddenWords": [
      "Yemek",
      "Acı",
      "Serpmek",
      "Kırmızı",
      "Kırmızı Pul Biber"
    ]
  },
  "cuisine_defne_yapragi": {
    "word": "Defne",
    "forbiddenWords": [
      "Baharat",
      "Yemek",
      "Tencere",
      "Kuru",
      "Koku"
    ]
  },
  "cuisine_corek_otu": {
    "word": "Çörek",
    "forbiddenWords": [
      "Baharat",
      "Yemek",
      "Siyah",
      "Tohum",
      "Poğaça"
    ]
  },
  "cuisine_beyaz_peynir": {
    "word": "Salamura",
    "forbiddenWords": [
      "Süt",
      "Kahvaltı",
      "Tuzlu",
      "Dilim",
      "Beyaz Peynir"
    ]
  },
  "cuisine_kasar_peyniri": {
    "word": "Kaşar",
    "forbiddenWords": [
      "Süt",
      "Kahvaltı",
      "Sarı",
      "Eritmek",
      "Tost"
    ]
  },
  "cuisine_tulum_peyniri": {
    "word": "Olgun",
    "forbiddenWords": [
      "Süt",
      "Kahvaltı",
      "Keçi",
      "Tuzlu",
      "Tulum Peyniri"
    ]
  },
  "cuisine_lor_peyniri": {
    "word": "Lor",
    "forbiddenWords": [
      "Süt",
      "Kahvaltı",
      "Yumuşak",
      "Börek",
      "Protein"
    ]
  },
  "cuisine_krem_peynir": {
    "word": "Krem",
    "forbiddenWords": [
      "Süt",
      "Kahvaltı",
      "Sürmek",
      "Yumuşak",
      "Ekmek"
    ]
  },
  "cuisine_suzme_yogurt": {
    "word": "Süzme",
    "forbiddenWords": [
      "Süt",
      "Kahvaltı",
      "Kalın",
      "Süzmek",
      "Meze"
    ]
  },
  "cuisine_barbeku_sosu": {
    "word": "Sos",
    "forbiddenWords": [
      "Yemek",
      "Dumanlı",
      "Et",
      "Izgara",
      "Barbekü Sosu"
    ]
  },
  "cuisine_aci_sos": {
    "word": "Acı",
    "forbiddenWords": [
      "Sos",
      "Yemek",
      "Biber",
      "Şişe",
      "Yakmak"
    ]
  },
  "cuisine_soya_sosu": {
    "word": "Soya",
    "forbiddenWords": [
      "Sos",
      "Yemek",
      "Tuzlu",
      "Asya",
      "Koyu"
    ]
  },
  "cuisine_nar_eksisi": {
    "word": "Ekşi",
    "forbiddenWords": [
      "Sos",
      "Yemek",
      "Salata",
      "Koyu",
      "Nar Ekşisi"
    ]
  },
  "cuisine_baget_ekmek": {
    "word": "Baget",
    "forbiddenWords": [
      "Hamur",
      "Fırın",
      "Uzun",
      "Fransa",
      "Kabuk"
    ]
  },
  "cuisine_eksi_mayali_ekmek": {
    "word": "Fermantasyon",
    "forbiddenWords": [
      "Hamur",
      "Fırın",
      "Kabuk",
      "Dilim",
      "Ekşi Mayalı Ekmek"
    ]
  },
  "travel_butik_otel": {
    "word": "Butik",
    "forbiddenWords": [
      "Tatil",
      "Konaklama",
      "Küçük",
      "Özel",
      "Tasarım"
    ]
  },
  "travel_kamp_alani": {
    "word": "Çadır",
    "forbiddenWords": [
      "Tatil",
      "Konaklama",
      "Tuvalet",
      "Doğa",
      "Kamp Alanı"
    ]
  },
  "travel_dag_evi": {
    "word": "Evi",
    "forbiddenWords": [
      "Tatil",
      "Konaklama",
      "Şömine",
      "Zirve",
      "Kış"
    ]
  },
  "travel_apart_otel": {
    "word": "Apart",
    "forbiddenWords": [
      "Tatil",
      "Konaklama",
      "Mutfak",
      "Daire",
      "Oda"
    ]
  },
  "travel_acik_bufe": {
    "word": "Büfe",
    "forbiddenWords": [
      "Tatil",
      "Konaklama",
      "Yemek",
      "Seçmek",
      "Tabak"
    ]
  },
  "travel_kahvalti_dahil": {
    "word": "Dahil",
    "forbiddenWords": [
      "Tatil",
      "Konaklama",
      "Otel",
      "Sabah",
      "Rezervasyon"
    ]
  },
  "travel_her_sey_dahil": {
    "word": "Her",
    "forbiddenWords": [
      "Tatil",
      "Konaklama",
      "Otel",
      "Yemek",
      "İçecek"
    ]
  },
  "travel_check_in": {
    "word": "Check",
    "forbiddenWords": [
      "Tatil",
      "Konaklama",
      "Giriş",
      "Kimlik",
      "Oda"
    ]
  },
  "travel_check_out": {
    "word": "Out",
    "forbiddenWords": [
      "Tatil",
      "Konaklama",
      "Çıkış",
      "Oda",
      "Hesap"
    ]
  },
  "travel_mini_bar": {
    "word": "Bar",
    "forbiddenWords": [
      "Tatil",
      "Konaklama",
      "Oda",
      "İçecek",
      "Ücret"
    ]
  },
  "travel_sirt_cantali_gezgin": {
    "word": "Ucuz",
    "forbiddenWords": [
      "Seyahat",
      "Yolculuk",
      "Hostel",
      "Rota",
      "Sırt Çantalı Gezgin"
    ]
  },
  "travel_direkt_ucus": {
    "word": "Uçuş",
    "forbiddenWords": [
      "Seyahat",
      "Yolculuk",
      "Aktarma yok",
      "Havalimanı",
      "Varış"
    ]
  },
  "travel_gidis_donus_bileti": {
    "word": "Dönüş",
    "forbiddenWords": [
      "Seyahat",
      "Yolculuk",
      "İki yön",
      "Tarih",
      "Uçuş"
    ]
  },
  "travel_tek_yon_bilet": {
    "word": "Yön",
    "forbiddenWords": [
      "Seyahat",
      "Yolculuk",
      "Gidiş",
      "Dönüş yok",
      "Biniş"
    ]
  },
  "travel_ucus_karti": {
    "word": "Biniş",
    "forbiddenWords": [
      "Seyahat",
      "Yolculuk",
      "Koltuk",
      "Kapı",
      "Uçuş Kartı"
    ]
  },
  "travel_pasaport_kontrolu": {
    "word": "Damga",
    "forbiddenWords": [
      "Seyahat",
      "Yolculuk",
      "Sınır",
      "Kimlik",
      "Pasaport Kontrolü"
    ]
  },
  "travel_sinir_kapisi": {
    "word": "Geçiş",
    "forbiddenWords": [
      "Seyahat",
      "Yolculuk",
      "Kontrol",
      "Ülke",
      "Sınır Kapısı"
    ]
  },
  "travel_doviz_burosu": {
    "word": "Döviz",
    "forbiddenWords": [
      "Seyahat",
      "Yolculuk",
      "Para",
      "Kur",
      "Bozdurmak"
    ]
  },
  "travel_yerel_para_birimi": {
    "word": "Ülke",
    "forbiddenWords": [
      "Seyahat",
      "Yolculuk",
      "Ödeme",
      "Döviz",
      "Yerel Para Birimi"
    ]
  },
  "travel_jet_lag": {
    "word": "Lag",
    "forbiddenWords": [
      "Seyahat",
      "Yolculuk",
      "Uçuş",
      "Uyku",
      "Saat farkı"
    ]
  },
  "travel_tarihi_merkez": {
    "word": "Merkez",
    "forbiddenWords": [
      "Gezi",
      "Yeri",
      "Eski",
      "Meydan",
      "Sokak"
    ]
  },
  "travel_seyir_terasi": {
    "word": "Seyir",
    "forbiddenWords": [
      "Gezi",
      "Yeri",
      "Manzara",
      "Yüksek",
      "Bakmak"
    ]
  },
  "travel_arkeolojik_alan": {
    "word": "Arkeolojik",
    "forbiddenWords": [
      "Gezi",
      "Yeri",
      "Kazı",
      "Tarih",
      "Kalıntı"
    ]
  },
  "travel_milli_park": {
    "word": "Koruma",
    "forbiddenWords": [
      "Gezi",
      "Yeri",
      "Doğa",
      "Yürüyüş",
      "Milli Park"
    ]
  },
  "travel_hayvanat_bahcesi": {
    "word": "Hayvanat",
    "forbiddenWords": [
      "Gezi",
      "Yeri",
      "Kafes",
      "Tür",
      "Ziyaret"
    ]
  },
  "travel_su_parki": {
    "word": "Kaydırak",
    "forbiddenWords": [
      "Gezi",
      "Yeri",
      "Havuz",
      "Yaz",
      "Su Parkı"
    ]
  },
  "travel_kayak_merkezi": {
    "word": "Telesiyej",
    "forbiddenWords": [
      "Gezi",
      "Yeri",
      "Kar",
      "Pist",
      "Kayak Merkezi"
    ]
  },
  "travel_sehir_turu": {
    "word": "Turizm",
    "forbiddenWords": [
      "Gezmek",
      "Rehber",
      "Otobüs",
      "Sokak",
      "Şehir Turu"
    ]
  },
  "travel_tekne_turu": {
    "word": "Güverte",
    "forbiddenWords": [
      "Gezmek",
      "Turizm",
      "Kıyı",
      "Manzara",
      "Tekne Turu"
    ]
  },
  "travel_doga_yuruyusu": {
    "word": "Patika",
    "forbiddenWords": [
      "Gezmek",
      "Turizm",
      "Orman",
      "Çanta",
      "Doğa Yürüyüşü"
    ]
  },
  "travel_gunubirlik_gezi": {
    "word": "Günübirlik",
    "forbiddenWords": [
      "Gezmek",
      "Turizm",
      "Sabah",
      "Akşam",
      "Yakın"
    ]
  },
  "travel_hafta_sonu_kacamagi": {
    "word": "Yakın",
    "forbiddenWords": [
      "Gezmek",
      "Turizm",
      "İki gün",
      "Dinlenmek",
      "Hafta Sonu Kaçamağı"
    ]
  },
  "travel_rehberli_tur": {
    "word": "Grup",
    "forbiddenWords": [
      "Gezmek",
      "Turizm",
      "Anlatım",
      "Program",
      "Rehberli Tur"
    ]
  },
  "travel_muze_gezisi": {
    "word": "Eser",
    "forbiddenWords": [
      "Gezmek",
      "Turizm",
      "Sergi",
      "Bilet",
      "Müze Gezisi"
    ]
  },
  "travel_hatira_esyasi": {
    "word": "Hatıra",
    "forbiddenWords": [
      "Gezmek",
      "Turizm",
      "Hediyelik",
      "Gezi",
      "Saklamak"
    ]
  },
  "travel_manzara_fotografi": {
    "word": "Manzara",
    "forbiddenWords": [
      "Gezmek",
      "Turizm",
      "Kamera",
      "Ufuk",
      "Gezi"
    ]
  },
  "hobby_tig_isi": {
    "word": "İşi",
    "forbiddenWords": [
      "Hobi",
      "El işi",
      "İlmek",
      "Kanca",
      "İplik"
    ]
  },
  "hobby_boncuk_dizme": {
    "word": "Dizme",
    "forbiddenWords": [
      "Hobi",
      "El işi",
      "İp",
      "Takı",
      "Renkli"
    ]
  },
  "hobby_taki_yapimi": {
    "word": "Boncuk",
    "forbiddenWords": [
      "Hobi",
      "El işi",
      "Tel",
      "Kolye",
      "Takı Yapımı"
    ]
  },
  "hobby_mum_yapimi": {
    "word": "Fitil",
    "forbiddenWords": [
      "Hobi",
      "El işi",
      "Balmumu",
      "Döküm",
      "Mum Yapımı"
    ]
  },
  "hobby_sabun_yapimi": {
    "word": "Sabun",
    "forbiddenWords": [
      "Hobi",
      "El işi",
      "Kalıp",
      "Koku",
      "Köpük"
    ]
  },
  "hobby_ahsap_boyama": {
    "word": "Boyama",
    "forbiddenWords": [
      "Hobi",
      "El işi",
      "Fırça",
      "Renk",
      "Süs"
    ]
  },
  "hobby_seramik_boyama": {
    "word": "Tabak",
    "forbiddenWords": [
      "Hobi",
      "El işi",
      "Fırça",
      "Fırın",
      "Seramik Boyama"
    ]
  },
  "hobby_comlek_yapimi": {
    "word": "Çömlek",
    "forbiddenWords": [
      "Hobi",
      "El işi",
      "Kil",
      "Torna",
      "Şekil"
    ]
  },
  "hobby_model_gemi": {
    "word": "Model",
    "forbiddenWords": [
      "Hobi",
      "El işi",
      "Maket",
      "Parça",
      "Deniz"
    ]
  },
  "hobby_maket_ucak": {
    "word": "Maket",
    "forbiddenWords": [
      "Hobi",
      "El işi",
      "Kanat",
      "Yapıştırıcı",
      "Model"
    ]
  },
  "hobby_kalem_cizimi": {
    "word": "Grafit",
    "forbiddenWords": [
      "Hobi",
      "El işi",
      "Gölge",
      "Kağıt",
      "Kalem Çizimi"
    ]
  },
  "hobby_yagli_boya": {
    "word": "Boya",
    "forbiddenWords": [
      "Hobi",
      "El işi",
      "Tuval",
      "Fırça",
      "Kuruma"
    ]
  },
  "hobby_akrilik_boya": {
    "word": "Akrilik",
    "forbiddenWords": [
      "Hobi",
      "El işi",
      "Tuval",
      "Hızlı kuruma",
      "Renk"
    ]
  },
  "hobby_pul_koleksiyonu": {
    "word": "Koleksiyon",
    "forbiddenWords": [
      "Hobi",
      "Posta",
      "Albüm",
      "Ülke",
      "Pul Koleksiyonu"
    ]
  },
  "hobby_plak_koleksiyonu": {
    "word": "Plak",
    "forbiddenWords": [
      "Hobi",
      "Koleksiyon",
      "Vinil",
      "Müzik",
      "Kapak"
    ]
  },
  "hobby_cizgi_roman_koleksiyonu": {
    "word": "Kahraman",
    "forbiddenWords": [
      "Hobi",
      "Koleksiyon",
      "Sayı",
      "Raf",
      "Çizgi Roman Koleksiyonu"
    ]
  },
  "hobby_tas_koleksiyonu": {
    "word": "Mineral",
    "forbiddenWords": [
      "Hobi",
      "Koleksiyon",
      "Renk",
      "Doğa",
      "Taş Koleksiyonu"
    ]
  },
  "hobby_deniz_kabugu_koleksiyonu": {
    "word": "Şekil",
    "forbiddenWords": [
      "Hobi",
      "Koleksiyon",
      "Sahil",
      "Kum",
      "Deniz Kabuğu Koleksiyonu"
    ]
  },
  "hobby_antika_koleksiyonu": {
    "word": "Antika",
    "forbiddenWords": [
      "Hobi",
      "Koleksiyon",
      "Eski",
      "Değer",
      "Pazar"
    ]
  },
  "hobby_kart_koleksiyonu": {
    "word": "Nadir",
    "forbiddenWords": [
      "Hobi",
      "Koleksiyon",
      "Paket",
      "Seri",
      "Kart Koleksiyonu"
    ]
  },
  "hobby_fotograf_gezisi": {
    "word": "Fotoğraf",
    "forbiddenWords": [
      "Hobi",
      "Dışarı",
      "Kamera",
      "Manzara",
      "Çekim"
    ]
  },
  "hobby_define_avi": {
    "word": "Define",
    "forbiddenWords": [
      "Hobi",
      "Dışarı",
      "Harita",
      "Gizli",
      "Aramak"
    ]
  },
  "hobby_kamp_atesi": {
    "word": "Alev",
    "forbiddenWords": [
      "Hobi",
      "Dışarı",
      "Odun",
      "Çadır",
      "Kamp Ateşi"
    ]
  },
  "hobby_kitap_okuma": {
    "word": "Okuma",
    "forbiddenWords": [
      "Hobi",
      "Ev",
      "Sayfa",
      "Roman",
      "Sessiz"
    ]
  },
  "hobby_gunluk_tutma": {
    "word": "Tutma",
    "forbiddenWords": [
      "Hobi",
      "Ev",
      "Defter",
      "Tarih",
      "Anı"
    ]
  },
  "hobby_yaratici_yazarlik": {
    "word": "Yazarlık",
    "forbiddenWords": [
      "Hobi",
      "Ev",
      "Hikâye",
      "Kurgu",
      "Kalem"
    ]
  },
  "hobby_yemek_tarifi_deneme": {
    "word": "Lezzet",
    "forbiddenWords": [
      "Hobi",
      "Ev",
      "Mutfak",
      "Yeni",
      "Yemek Tarifi Deneme"
    ]
  },
  "hobby_evde_ekmek_yapimi": {
    "word": "Maya",
    "forbiddenWords": [
      "Hobi",
      "Ev",
      "Hamur",
      "Fırın",
      "Evde Ekmek Yapımı"
    ]
  },
  "hobby_kahve_demleme": {
    "word": "Demleme",
    "forbiddenWords": [
      "Hobi",
      "Ev",
      "Çekirdek",
      "Su",
      "Filtre"
    ]
  },
  "hobby_puzzle_cozme": {
    "word": "Çözme",
    "forbiddenWords": [
      "Hobi",
      "Ev",
      "Parça",
      "Resim",
      "Masa"
    ]
  },
  "hobby_maket_yapimi": {
    "word": "Parça",
    "forbiddenWords": [
      "Hobi",
      "Ev",
      "Küçük",
      "Yapıştırıcı",
      "Maket Yapımı"
    ]
  },
  "hobby_masa_oyunu_gecesi": {
    "word": "Zar",
    "forbiddenWords": [
      "Hobi",
      "Ev",
      "Arkadaş",
      "Kart",
      "Masa Oyunu Gecesi"
    ]
  },
  "hobby_dizi_maratonu": {
    "word": "Bölüm",
    "forbiddenWords": [
      "Hobi",
      "Ev",
      "Ekran",
      "Gece",
      "Dizi Maratonu"
    ]
  },
  "hobby_dil_ogrenme": {
    "word": "Konuşma",
    "forbiddenWords": [
      "Hobi",
      "Ev",
      "Kelime",
      "Ders",
      "Dil Öğrenme"
    ]
  },
  "hobby_enstruman_calma": {
    "word": "Enstrüman",
    "forbiddenWords": [
      "Hobi",
      "Ev",
      "Nota",
      "Pratik",
      "Müzik"
    ]
  },
  "hobby_ev_bitkisi_bakimi": {
    "word": "Sulama",
    "forbiddenWords": [
      "Hobi",
      "Ev",
      "Saksı",
      "Güneş",
      "Ev Bitkisi Bakımı"
    ]
  },
  "media_ani_kitabi": {
    "word": "Yaşanmış",
    "forbiddenWords": [
      "Kitap",
      "Edebiyat",
      "Geçmiş",
      "Hatıra",
      "Anı Kitabı"
    ]
  },
  "media_sozluk_romani": {
    "word": "Deneysel",
    "forbiddenWords": [
      "Kitap",
      "Edebiyat",
      "Kelime",
      "Kurgu",
      "Sözlük Romanı"
    ]
  },
  "media_ansiklopedi_maddesi": {
    "word": "Madde",
    "forbiddenWords": [
      "Kitap",
      "Edebiyat",
      "Bilgi",
      "Başlık",
      "Kaynak"
    ]
  },
  "media_arka_kapak_yazisi": {
    "word": "Yazı",
    "forbiddenWords": [
      "Kitap",
      "Edebiyat",
      "Tanıtım",
      "Cilt",
      "Özet"
    ]
  },
  "media_kose_yazisi": {
    "word": "Köşe",
    "forbiddenWords": [
      "Haber",
      "Medya",
      "Yorum",
      "Gazete",
      "Yazar"
    ]
  },
  "media_basin_toplantisi": {
    "word": "Basın",
    "forbiddenWords": [
      "Haber",
      "Medya",
      "Gazeteci",
      "Soru",
      "Açıklama"
    ]
  },
  "media_canli_baglanti": {
    "word": "Haber",
    "forbiddenWords": [
      "Medya",
      "Muhabir",
      "Ekran",
      "Anlık",
      "Canlı Bağlantı"
    ]
  },
  "media_son_dakika": {
    "word": "Son",
    "forbiddenWords": [
      "Haber",
      "Medya",
      "Acil",
      "Bülten",
      "Yeni"
    ]
  },
  "media_spor_haberleri": {
    "word": "Skor",
    "forbiddenWords": [
      "Haber",
      "Medya",
      "Maç",
      "Takım",
      "Spor Haberleri"
    ]
  },
  "media_basin_bulteni": {
    "word": "Açıklama",
    "forbiddenWords": [
      "Haber",
      "Medya",
      "Kurum",
      "Duyuru",
      "Basın Bülteni"
    ]
  },
  "media_sezon_finali": {
    "word": "Sezon",
    "forbiddenWords": [
      "Televizyon",
      "Program",
      "Son bölüm",
      "Dizi",
      "Beklemek"
    ]
  },
  "media_pilot_bolum": {
    "word": "Televizyon",
    "forbiddenWords": [
      "Program",
      "İlk",
      "Dizi",
      "Tanıtım",
      "Pilot Bölüm"
    ]
  },
  "media_talk_show": {
    "word": "Show",
    "forbiddenWords": [
      "Televizyon",
      "Program",
      "Sunucu",
      "Konuk",
      "Sohbet"
    ]
  },
  "media_yarisma_programi": {
    "word": "Yarışma",
    "forbiddenWords": [
      "Televizyon",
      "Program",
      "Soru",
      "Ödül",
      "Yarışmacı"
    ]
  },
  "media_yemek_yarismasi": {
    "word": "Program",
    "forbiddenWords": [
      "Televizyon",
      "Şef",
      "Tabak",
      "Puan",
      "Yemek Yarışması"
    ]
  },
  "media_bilgi_yarismasi": {
    "word": "Cevap",
    "forbiddenWords": [
      "Televizyon",
      "Program",
      "Soru",
      "Ödül",
      "Bilgi Yarışması"
    ]
  },
  "media_yetenek_yarismasi": {
    "word": "Yetenek",
    "forbiddenWords": [
      "Televizyon",
      "Program",
      "Sahne",
      "Jüri",
      "Performans"
    ]
  },
  "media_reality_show": {
    "word": "Reality",
    "forbiddenWords": [
      "Televizyon",
      "Program",
      "Gerçek kişi",
      "Kamera",
      "Ev"
    ]
  },
  "media_belgesel_dizisi": {
    "word": "Gerçek",
    "forbiddenWords": [
      "Televizyon",
      "Program",
      "Bölüm",
      "Anlatım",
      "Belgesel Dizisi"
    ]
  },
  "media_uzaktan_kumanda": {
    "word": "Uzaktan",
    "forbiddenWords": [
      "Televizyon",
      "Program",
      "Tuş",
      "Kanal",
      "Pil"
    ]
  },
  "media_reklam_arasi": {
    "word": "Ara",
    "forbiddenWords": [
      "Televizyon",
      "Program",
      "Kısa",
      "Ürün",
      "Yayın"
    ]
  },
  "media_radyo_programi": {
    "word": "Radyo",
    "forbiddenWords": [
      "Ses",
      "Sunucu",
      "Frekans",
      "Dinleyici",
      "Radyo Programı"
    ]
  },
  "media_haber_radyosu": {
    "word": "Bülten",
    "forbiddenWords": [
      "Radyo",
      "Ses",
      "Frekans",
      "Spiker",
      "Haber Radyosu"
    ]
  },
  "media_istek_parca": {
    "word": "İstek",
    "forbiddenWords": [
      "Radyo",
      "Ses",
      "Şarkı",
      "Dinleyici",
      "Aramak"
    ]
  },
  "media_reklam_jingle_i": {
    "word": "Jingle",
    "forbiddenWords": [
      "Radyo",
      "Ses",
      "Kısa",
      "Melodi",
      "Marka"
    ]
  },
  "media_ses_efekti": {
    "word": "Yapay",
    "forbiddenWords": [
      "Radyo",
      "Ses",
      "Film",
      "Gürültü",
      "Ses Efekti"
    ]
  },
  "media_ses_mikseri": {
    "word": "Kanal",
    "forbiddenWords": [
      "Radyo",
      "Ses",
      "Seviye",
      "Stüdyo",
      "Ses Mikseri"
    ]
  },
  "plant_saksi_topragi": {
    "word": "Köklenme",
    "forbiddenWords": [
      "Bitki",
      "Bahçe",
      "Karışım",
      "Dikmek",
      "Saksı Toprağı"
    ]
  },
  "plant_solucan_gubresi": {
    "word": "Organik",
    "forbiddenWords": [
      "Bitki",
      "Bahçe",
      "Toprak",
      "Atık",
      "Solucan Gübresi"
    ]
  },
  "plant_pirinc_bitkisi": {
    "word": "Tarım",
    "forbiddenWords": [
      "Tarla",
      "Su",
      "Çeltik",
      "Tane",
      "Pirinç Bitkisi"
    ]
  },
  "plant_aycicegi_tarlasi": {
    "word": "Yağ",
    "forbiddenWords": [
      "Tarım",
      "Tarla",
      "Sarı",
      "Çekirdek",
      "Ayçiçeği Tarlası"
    ]
  },
  "plant_pamuk_tarlasi": {
    "word": "Lif",
    "forbiddenWords": [
      "Tarım",
      "Tarla",
      "Beyaz",
      "Hasat",
      "Pamuk Tarlası"
    ]
  },
  "plant_seker_pancari": {
    "word": "Şeker",
    "forbiddenWords": [
      "Tarım",
      "Tarla",
      "Kök",
      "Hasat",
      "Şeker Pancarı"
    ]
  },
  "plant_kakao_agaci": {
    "word": "Kakao",
    "forbiddenWords": [
      "Tarım",
      "Tarla",
      "Çikolata",
      "Çekirdek",
      "Tropik"
    ]
  },
  "plant_susam_bitkisi": {
    "word": "Hasat",
    "forbiddenWords": [
      "Tarım",
      "Tarla",
      "Tohum",
      "Tahin",
      "Susam Bitkisi"
    ]
  },
  "plant_kuru_fasulye_tanesi": {
    "word": "Tane",
    "forbiddenWords": [
      "Tarım",
      "Tarla",
      "Baklagil",
      "Beyaz",
      "Pilav"
    ]
  },
  "plant_kiraz_agaci": {
    "word": "Bahar",
    "forbiddenWords": [
      "Bitki",
      "Ağaç",
      "Meyve",
      "Çiçek",
      "Kiraz Ağacı"
    ]
  },
  "plant_portakal_agaci": {
    "word": "Narenciye",
    "forbiddenWords": [
      "Bitki",
      "Ağaç",
      "Turuncu",
      "Bahçe",
      "Portakal Ağacı"
    ]
  },
  "plant_findik_ocagi": {
    "word": "Karadeniz",
    "forbiddenWords": [
      "Bitki",
      "Ağaç",
      "Çalı",
      "Meyve",
      "Fındık Ocağı"
    ]
  },
  "plant_defne_agaci": {
    "word": "Akdeniz",
    "forbiddenWords": [
      "Bitki",
      "Ağaç",
      "Yaprak",
      "Koku",
      "Defne Ağacı"
    ]
  },
  "plant_geri_donusum": {
    "word": "Dönüşüm",
    "forbiddenWords": [
      "Doğa",
      "Çevre",
      "Atık",
      "Ayrıştırmak",
      "Yeniden"
    ]
  },
  "plant_atik_ayristirma": {
    "word": "Ayrıştırma",
    "forbiddenWords": [
      "Doğa",
      "Çevre",
      "Kağıt",
      "Plastik",
      "Kutu"
    ]
  },
  "plant_cevre_kirliligi": {
    "word": "Çevre",
    "forbiddenWords": [
      "Doğa",
      "Atık",
      "Atıklar",
      "Zarar",
      "Çevre Kirliliği"
    ]
  },
  "plant_hava_kirliligi": {
    "word": "Egzoz",
    "forbiddenWords": [
      "Doğa",
      "Çevre",
      "Duman",
      "Nefes",
      "Hava Kirliliği"
    ]
  },
  "plant_toprak_kirliligi": {
    "word": "Kimyasal",
    "forbiddenWords": [
      "Doğa",
      "Çevre",
      "Tarla",
      "Atık",
      "Toprak Kirliliği"
    ]
  },
  "plant_iklim_degisikligi": {
    "word": "Değişiklik",
    "forbiddenWords": [
      "Doğa",
      "Çevre",
      "Isınma",
      "Hava",
      "Dünya"
    ]
  },
  "plant_kuresel_isinma": {
    "word": "Isınma",
    "forbiddenWords": [
      "Doğa",
      "Çevre",
      "Sıcaklık",
      "Karbon",
      "Dünya"
    ]
  },
  "plant_karbon_ayak_izi": {
    "word": "Emisyon",
    "forbiddenWords": [
      "Doğa",
      "Çevre",
      "Ulaşım",
      "Ölçü",
      "Karbon Ayak İzi"
    ]
  },
  "plant_yenilenebilir_enerji": {
    "word": "Yenilenebilir",
    "forbiddenWords": [
      "Doğa",
      "Çevre",
      "Güneş",
      "Rüzgâr",
      "Sürdürülebilir"
    ]
  },
  "plant_gunes_enerjisi": {
    "word": "Panel",
    "forbiddenWords": [
      "Doğa",
      "Çevre",
      "Işık",
      "Elektrik",
      "Güneş Enerjisi"
    ]
  },
  "plant_ruzgar_enerjisi": {
    "word": "Türbin",
    "forbiddenWords": [
      "Doğa",
      "Çevre",
      "Pervane",
      "Elektrik",
      "Rüzgâr Enerjisi"
    ]
  },
  "plant_jeotermal_enerji": {
    "word": "Jeotermal",
    "forbiddenWords": [
      "Doğa",
      "Çevre",
      "Yeraltı",
      "Sıcak",
      "Buhar"
    ]
  },
  "plant_koruma_alani": {
    "word": "Yasak",
    "forbiddenWords": [
      "Doğa",
      "Çevre",
      "Milli park",
      "Tür",
      "Koruma Alanı"
    ]
  },
  "plant_nesli_tukenme": {
    "word": "Tükenme",
    "forbiddenWords": [
      "Doğa",
      "Çevre",
      "Tür",
      "Azalmak",
      "Koruma"
    ]
  },
  "architecture_mustakil_ev": {
    "word": "Müstakil",
    "forbiddenWords": [
      "Bina",
      "Mimari",
      "Bahçe",
      "Tek",
      "Komşu"
    ]
  },
  "architecture_sira_ev": {
    "word": "Bina",
    "forbiddenWords": [
      "Mimari",
      "Bitişik",
      "Cadde",
      "Cephe",
      "Sıra Ev"
    ]
  },
  "architecture_koy_evi": {
    "word": "Köy",
    "forbiddenWords": [
      "Bina",
      "Mimari",
      "Bahçe",
      "Kırsal",
      "Tek kat"
    ]
  },
  "architecture_tas_ev": {
    "word": "Kırsal",
    "forbiddenWords": [
      "Bina",
      "Mimari",
      "Duvar",
      "Serin",
      "Taş Ev"
    ]
  },
  "architecture_ahsap_ev": {
    "word": "Doğal",
    "forbiddenWords": [
      "Bina",
      "Mimari",
      "Tahta",
      "Kırsal",
      "Ahşap Ev"
    ]
  },
  "architecture_kerpic_ev": {
    "word": "Kerpiç",
    "forbiddenWords": [
      "Bina",
      "Mimari",
      "Toprak",
      "Köy",
      "Duvar"
    ]
  },
  "architecture_prefabrik_ev": {
    "word": "Prefabrik",
    "forbiddenWords": [
      "Bina",
      "Mimari",
      "Parça",
      "Hızlı",
      "Kurulum"
    ]
  },
  "architecture_konteyner_ev": {
    "word": "Konteyner",
    "forbiddenWords": [
      "Bina",
      "Mimari",
      "Metal",
      "Taşınabilir",
      "Küçük"
    ]
  },
  "architecture_cam_cepheli_bina": {
    "word": "Şeffaf",
    "forbiddenWords": [
      "Bina",
      "Mimari",
      "Ofis",
      "Modern",
      "Cam Cepheli Bina"
    ]
  },
  "architecture_apartman_dairesi": {
    "word": "Kat",
    "forbiddenWords": [
      "Bina",
      "Mimari",
      "Komşu",
      "Balkon",
      "Apartman Dairesi"
    ]
  },
  "architecture_is_merkezi": {
    "word": "Ofis",
    "forbiddenWords": [
      "Bina",
      "Mimari",
      "Kat",
      "Şirket",
      "İş Merkezi"
    ]
  },
  "architecture_alisveris_merkezi": {
    "word": "Mağaza",
    "forbiddenWords": [
      "Bina",
      "Mimari",
      "Yemek",
      "Kapalı",
      "Alışveriş Merkezi"
    ]
  },
  "architecture_yuzme_havuzu": {
    "word": "Kulaç",
    "forbiddenWords": [
      "Bina",
      "Mimari",
      "Su",
      "Klor",
      "Yüzme Havuzu"
    ]
  },
  "architecture_tas_kemer": {
    "word": "Yay",
    "forbiddenWords": [
      "Yapı",
      "Parça",
      "Taş",
      "Geçit",
      "Taş Kemer"
    ]
  },
  "architecture_demir_cubuk": {
    "word": "Çubuk",
    "forbiddenWords": [
      "İnşaat",
      "Malzeme",
      "Beton",
      "Donatı",
      "Takviye"
    ]
  },
  "architecture_cift_cam": {
    "word": "Çift",
    "forbiddenWords": [
      "İnşaat",
      "Malzeme",
      "Pencere",
      "Yalıtım",
      "Katman"
    ]
  },
  "architecture_duvar_kagidi": {
    "word": "Malzeme",
    "forbiddenWords": [
      "İnşaat",
      "Desen",
      "Rulo",
      "Yapıştırmak",
      "Duvar Kağıdı"
    ]
  },
  "architecture_su_kulesi": {
    "word": "Kule",
    "forbiddenWords": [
      "Şehir",
      "Yapı",
      "Depo",
      "Yüksek",
      "Basınç"
    ]
  },
  "architecture_saat_kulesi": {
    "word": "Çan",
    "forbiddenWords": [
      "Şehir",
      "Yapı",
      "Meydan",
      "Zaman",
      "Saat Kulesi"
    ]
  },
  "architecture_zafer_taki": {
    "word": "Zafer",
    "forbiddenWords": [
      "Şehir",
      "Yapı",
      "Kemer",
      "Anıt",
      "Tarih"
    ]
  },
  "sportgear_futbol_topu": {
    "word": "Ekipman",
    "forbiddenWords": [
      "Spor",
      "Yuvarlak",
      "Tekme",
      "Gol",
      "Futbol Topu"
    ]
  },
  "sportgear_voleybol_topu": {
    "word": "File",
    "forbiddenWords": [
      "Spor",
      "Ekipman",
      "Smaç",
      "Servis",
      "Voleybol Topu"
    ]
  },
  "sportgear_tenis_topu": {
    "word": "Raket",
    "forbiddenWords": [
      "Spor",
      "Ekipman",
      "Sarı",
      "Kort",
      "Tenis Topu"
    ]
  },
  "sportgear_golf_topu": {
    "word": "Sopa",
    "forbiddenWords": [
      "Spor",
      "Ekipman",
      "Beyaz",
      "Delik",
      "Golf Topu"
    ]
  },
  "sportgear_pinpon_topu": {
    "word": "Pinpon",
    "forbiddenWords": [
      "Spor",
      "Ekipman",
      "Küçük",
      "Masa",
      "Raket"
    ]
  },
  "sportgear_ragbi_topu": {
    "word": "Oval",
    "forbiddenWords": [
      "Spor",
      "Ekipman",
      "Pas",
      "Temas",
      "Ragbi Topu"
    ]
  },
  "sportgear_badminton_topu": {
    "word": "Tüy",
    "forbiddenWords": [
      "Spor",
      "Ekipman",
      "Raket",
      "File",
      "Badminton Topu"
    ]
  },
  "sportgear_bowling_topu": {
    "word": "Ağır",
    "forbiddenWords": [
      "Spor",
      "Ekipman",
      "Delik",
      "Lobut",
      "Bowling Topu"
    ]
  },
  "sportgear_bilardo_topu": {
    "word": "Istaka",
    "forbiddenWords": [
      "Spor",
      "Ekipman",
      "Numara",
      "Masa",
      "Bilardo Topu"
    ]
  },
  "sportgear_hokey_diski": {
    "word": "Hokey",
    "forbiddenWords": [
      "Spor",
      "Ekipman",
      "Buz",
      "Sopa",
      "Kale"
    ]
  },
  "sportgear_plaj_topu": {
    "word": "Şişme",
    "forbiddenWords": [
      "Spor",
      "Ekipman",
      "Deniz",
      "Hafif",
      "Plaj Topu"
    ]
  },
  "sportgear_halter_bari": {
    "word": "Antrenman",
    "forbiddenWords": [
      "Spor",
      "Ağırlık",
      "Disk",
      "Kaldırmak",
      "Halter Barı"
    ]
  },
  "sportgear_direnc_bandi": {
    "word": "Esnek",
    "forbiddenWords": [
      "Spor",
      "Antrenman",
      "Çekmek",
      "Kas",
      "Direnç Bandı"
    ]
  },
  "sportgear_atlama_ipi": {
    "word": "Kondisyon",
    "forbiddenWords": [
      "Spor",
      "Antrenman",
      "Zıplamak",
      "Ritim",
      "Atlama İpi"
    ]
  },
  "sportgear_yoga_mati": {
    "word": "Yoga",
    "forbiddenWords": [
      "Spor",
      "Antrenman",
      "Zemin",
      "Esneme",
      "Kaymaz"
    ]
  },
  "sportgear_pilates_topu": {
    "word": "Pilates",
    "forbiddenWords": [
      "Spor",
      "Antrenman",
      "Büyük",
      "Denge",
      "Şişme"
    ]
  },
  "sportgear_kopuk_rulo": {
    "word": "Masaj",
    "forbiddenWords": [
      "Spor",
      "Antrenman",
      "Kas",
      "Silindir",
      "Köpük Rulo"
    ]
  },
  "sportgear_eliptik_bisiklet": {
    "word": "Eliptik",
    "forbiddenWords": [
      "Spor",
      "Antrenman",
      "Pedal",
      "Salon",
      "Kardiyo"
    ]
  },
  "sportgear_barfiks_demiri": {
    "word": "Barfiks",
    "forbiddenWords": [
      "Spor",
      "Antrenman",
      "Asılmak",
      "Kol",
      "Kapı"
    ]
  },
  "sportgear_sinav_bari": {
    "word": "Şınav",
    "forbiddenWords": [
      "Spor",
      "Antrenman",
      "El",
      "Zemin",
      "Göğüs"
    ]
  },
  "sportgear_step_tahtasi": {
    "word": "Aerobik",
    "forbiddenWords": [
      "Spor",
      "Antrenman",
      "Basamak",
      "Ritim",
      "Step Tahtası"
    ]
  },
  "sportgear_kask_vizoru": {
    "word": "Yüz",
    "forbiddenWords": [
      "Spor",
      "Koruma",
      "Cam",
      "Motosiklet",
      "Kask Vizörü"
    ]
  },
  "sportgear_agiz_koruyucu": {
    "word": "Darbe",
    "forbiddenWords": [
      "Spor",
      "Koruma",
      "Diş",
      "Boks",
      "Ağız Koruyucu"
    ]
  },
  "sportgear_boks_eldiveni": {
    "word": "Ring",
    "forbiddenWords": [
      "Spor",
      "Koruma",
      "Yumruk",
      "Dolgu",
      "Boks Eldiveni"
    ]
  },
  "sportgear_kaleci_eldiveni": {
    "word": "Top",
    "forbiddenWords": [
      "Spor",
      "Koruma",
      "Kale",
      "Tutuş",
      "Kaleci Eldiveni"
    ]
  },
  "sportgear_can_yelegi": {
    "word": "Can",
    "forbiddenWords": [
      "Spor",
      "Koruma",
      "Su",
      "Batmamak",
      "Turuncu"
    ]
  },
  "sportgear_emniyet_ipi": {
    "word": "Tırmanış",
    "forbiddenWords": [
      "Spor",
      "Koruma",
      "Bağlamak",
      "Düşmek",
      "Emniyet İpi"
    ]
  },
  "sportgear_futbol_kalesi": {
    "word": "Direk",
    "forbiddenWords": [
      "Spor",
      "Saha",
      "Ağ",
      "Gol",
      "Futbol Kalesi"
    ]
  },
  "sportgear_voleybol_filesi": {
    "word": "Smaç",
    "forbiddenWords": [
      "Spor",
      "Saha",
      "İki taraf",
      "Ortada",
      "Voleybol Filesi"
    ]
  },
  "sportgear_tenis_filesi": {
    "word": "Kort",
    "forbiddenWords": [
      "Spor",
      "Saha",
      "Servis",
      "Ortada",
      "Tenis Filesi"
    ]
  },
  "sportgear_baslama_cizgisi": {
    "word": "Çizgi",
    "forbiddenWords": [
      "Spor",
      "Saha",
      "Yarış",
      "Pist",
      "İlk"
    ]
  },
  "sportgear_bitis_cizgisi": {
    "word": "Finiş",
    "forbiddenWords": [
      "Spor",
      "Saha",
      "Yarış",
      "Son",
      "Bitiş Çizgisi"
    ]
  },
  "sportgear_hakem_dudugu": {
    "word": "Düdük",
    "forbiddenWords": [
      "Spor",
      "Saha",
      "Karar",
      "Ses",
      "Maç"
    ]
  },
  "misc_bebek_arabasi": {
    "word": "Bakım",
    "forbiddenWords": [
      "Bebek",
      "Tekerlek",
      "Gezmek",
      "Katlanır",
      "Bebek Arabası"
    ]
  },
  "misc_mama_sandalyesi": {
    "word": "Mama",
    "forbiddenWords": [
      "Bebek",
      "Bakım",
      "Yemek",
      "Yüksek",
      "Tepsi"
    ]
  },
  "misc_alt_degistirme_masasi": {
    "word": "Değiştirme",
    "forbiddenWords": [
      "Bebek",
      "Bakım",
      "Bez",
      "Çocuk",
      "Temizlik"
    ]
  },
  "misc_oyuncak_ayi": {
    "word": "Peluş",
    "forbiddenWords": [
      "Bebek",
      "Bakım",
      "Yumuşak",
      "Sarılmak",
      "Oyuncak Ayı"
    ]
  },
  "misc_sevgililer_gunu": {
    "word": "Sevgililer",
    "forbiddenWords": [
      "Kutlama",
      "Özel gün",
      "14 Şubat",
      "Kalp",
      "Hediye"
    ]
  },
  "misc_anneler_gunu": {
    "word": "Anneler",
    "forbiddenWords": [
      "Kutlama",
      "Özel gün",
      "Mayıs",
      "Çiçek",
      "Teşekkür"
    ]
  },
  "misc_babalar_gunu": {
    "word": "Babalar",
    "forbiddenWords": [
      "Kutlama",
      "Özel gün",
      "Haziran",
      "Hediye",
      "Aile"
    ]
  },
  "misc_ogretmenler_gunu": {
    "word": "Öğretmenler",
    "forbiddenWords": [
      "Kutlama",
      "Özel gün",
      "24 Kasım",
      "Çiçek",
      "Okul"
    ]
  },
  "misc_dunya_cocuk_gunu": {
    "word": "Farkındalık",
    "forbiddenWords": [
      "Kutlama",
      "Özel gün",
      "Oyun",
      "Çocuk",
      "Dünya Çocuk Günü"
    ]
  },
  "misc_balon_suslemesi": {
    "word": "Süsleme",
    "forbiddenWords": [
      "Kutlama",
      "Özel gün",
      "Şişirmek",
      "Renkli",
      "Tavan"
    ]
  },
  "misc_hediye_ceki": {
    "word": "Tutar",
    "forbiddenWords": [
      "Kutlama",
      "Özel gün",
      "Mağaza",
      "Seçmek",
      "Hediye Çeki"
    ]
  },
  "misc_tebrik_karti": {
    "word": "Mesaj",
    "forbiddenWords": [
      "Kutlama",
      "Özel gün",
      "Zarf",
      "Başarı",
      "Tebrik Kartı"
    ]
  },
  "misc_kristal_tuz": {
    "word": "Maden",
    "forbiddenWords": [
      "Doğa",
      "Madde",
      "Beyaz",
      "Tane",
      "Kristal Tuz"
    ]
  },
  "misc_cam_sakizi": {
    "word": "Yapışkan",
    "forbiddenWords": [
      "Doğa",
      "Madde",
      "Ağaç",
      "Koku",
      "Çam Sakızı"
    ]
  },
  "misc_sunum_dosyasi": {
    "word": "Slayt",
    "forbiddenWords": [
      "İş",
      "Ofis",
      "Proje",
      "Ekran",
      "Sunum Dosyası"
    ]
  },
  "misc_muhurlu_belge": {
    "word": "Belge",
    "forbiddenWords": [
      "İş",
      "Ofis",
      "Resmi",
      "Damga",
      "Kağıt"
    ]
  },
  "misc_son_tarih": {
    "word": "Teslim",
    "forbiddenWords": [
      "İş",
      "Ofis",
      "Süre",
      "Takvim",
      "Son Tarih"
    ]
  },
  "misc_proje_ekibi": {
    "word": "Çalışan",
    "forbiddenWords": [
      "İş",
      "Ofis",
      "Görev",
      "Birlikte",
      "Proje Ekibi"
    ]
  },
  "misc_is_gorusmesi": {
    "word": "Aday",
    "forbiddenWords": [
      "İş",
      "Ofis",
      "Soru",
      "Mülakat",
      "İş Görüşmesi"
    ]
  },
  "misc_is_ilani": {
    "word": "Pozisyon",
    "forbiddenWords": [
      "İş",
      "Ofis",
      "Başvuru",
      "Şirket",
      "İş İlanı"
    ]
  },
  "misc_deneme_suresi": {
    "word": "Süre",
    "forbiddenWords": [
      "İş",
      "Ofis",
      "Yeni iş",
      "Ay",
      "Çalışan"
    ]
  },
  "geography_kuzey_yarimkure": {
    "word": "Yarımküre",
    "forbiddenWords": [
      "Harita",
      "Coğrafya",
      "Ekvator",
      "Üst",
      "Kutup"
    ]
  },
  "geography_baslangic_meridyeni": {
    "word": "Greenwich",
    "forbiddenWords": [
      "Harita",
      "Coğrafya",
      "Sıfır",
      "Boylam",
      "Başlangıç Meridyeni"
    ]
  },
  "geography_uluslararasi_tarih_degistirme_cizgisi": {
    "word": "Pasifik",
    "forbiddenWords": [
      "Harita",
      "Coğrafya",
      "Gün",
      "Takvim",
      "Uluslararası Tarih Değiştirme Çizgisi"
    ]
  },
  "geography_kuresel_konum": {
    "word": "Konum",
    "forbiddenWords": [
      "Harita",
      "Coğrafya",
      "GPS",
      "Uydu",
      "Koordinat"
    ]
  },
  "geography_yon_oku": {
    "word": "Oku",
    "forbiddenWords": [
      "Harita",
      "Coğrafya",
      "Kuzey",
      "İşaret",
      "Pusula"
    ]
  },
  "geography_sahil_seridi": {
    "word": "Uzunluk",
    "forbiddenWords": [
      "Harita",
      "Coğrafya",
      "Kıyı",
      "Deniz",
      "Sahil Şeridi"
    ]
  },
  "geography_kita_sahanligi": {
    "word": "Sığ",
    "forbiddenWords": [
      "Harita",
      "Coğrafya",
      "Deniz",
      "Kıyı",
      "Kıta Sahanlığı"
    ]
  },
  "geography_deniz_seviyesi": {
    "word": "Seviye",
    "forbiddenWords": [
      "Harita",
      "Coğrafya",
      "Yükseklik",
      "Sıfır",
      "Ölçüm"
    ]
  },
  "geography_akdeniz_iklimi": {
    "word": "İklim",
    "forbiddenWords": [
      "Hava",
      "Yaz",
      "Kurak",
      "Kış",
      "Akdeniz İklimi"
    ]
  },
  "geography_karasal_iklim": {
    "word": "Karasal",
    "forbiddenWords": [
      "İklim",
      "Hava",
      "İç kesim",
      "Sıcak farkı",
      "Kış"
    ]
  },
  "geography_karadeniz_iklimi": {
    "word": "Yağış",
    "forbiddenWords": [
      "İklim",
      "Hava",
      "Nem",
      "Yeşil",
      "Karadeniz İklimi"
    ]
  },
  "geography_col_iklimi": {
    "word": "Kurak",
    "forbiddenWords": [
      "İklim",
      "Hava",
      "Sıcak",
      "Yağış",
      "Çöl İklimi"
    ]
  },
  "geography_tropikal_iklim": {
    "word": "Tropikal",
    "forbiddenWords": [
      "İklim",
      "Hava",
      "Sıcak",
      "Nem",
      "Ekvator"
    ]
  },
  "geography_yagisli_mevsim": {
    "word": "Takvim",
    "forbiddenWords": [
      "İklim",
      "Hava",
      "Muson",
      "Yağmur",
      "Yağışlı Mevsim"
    ]
  },
  "geography_sicak_hava_dalgasi": {
    "word": "Derece",
    "forbiddenWords": [
      "İklim",
      "Hava",
      "Bunaltıcı",
      "Yaz",
      "Sıcak Hava Dalgası"
    ]
  },
  "geography_soguk_hava_dalgasi": {
    "word": "Don",
    "forbiddenWords": [
      "İklim",
      "Hava",
      "Kış",
      "Derece",
      "Soğuk Hava Dalgası"
    ]
  },
  "geography_fay_hatti": {
    "word": "Fay",
    "forbiddenWords": [
      "Doğa",
      "Yer şekli",
      "Deprem",
      "Yer kabuğu",
      "Kırık"
    ]
  },
  "geography_lav_akintisi": {
    "word": "Akıntı",
    "forbiddenWords": [
      "Doğa",
      "Yer şekli",
      "Volkan",
      "Sıcak",
      "Taş"
    ]
  },
  "geography_krater_golu": {
    "word": "Çukur",
    "forbiddenWords": [
      "Doğa",
      "Yer şekli",
      "Volkan",
      "Su",
      "Krater Gölü"
    ]
  },
  "geography_delta_ovasi": {
    "word": "Düz",
    "forbiddenWords": [
      "Doğa",
      "Yer şekli",
      "Nehir ağzı",
      "Tarım",
      "Delta Ovası"
    ]
  },
  "geography_at_nali_golu": {
    "word": "Kıvrım",
    "forbiddenWords": [
      "Doğa",
      "Yer şekli",
      "Nehir",
      "Eski yatak",
      "At nalı gölü"
    ]
  },
  "geography_kiyi_oku": {
    "word": "Biriktirme",
    "forbiddenWords": [
      "Doğa",
      "Yer şekli",
      "Kum",
      "Deniz",
      "Kıyı Oku"
    ]
  },
  "geography_magara_girisi": {
    "word": "Karanlık",
    "forbiddenWords": [
      "Doğa",
      "Yer şekli",
      "Açıklık",
      "Yeraltı",
      "Mağara Girişi"
    ]
  },
  "geography_yeralti_suyu": {
    "word": "Akifer",
    "forbiddenWords": [
      "Doğa",
      "Yer şekli",
      "Kuyu",
      "İçmek",
      "Yeraltı Suyu"
    ]
  },
  "language_cins_isim": {
    "word": "Cins",
    "forbiddenWords": [
      "Dil",
      "Dil bilgisi",
      "Tür",
      "Genel",
      "Örnek"
    ]
  },
  "language_tekil_isim": {
    "word": "Tekil",
    "forbiddenWords": [
      "Dil",
      "Dil bilgisi",
      "Bir",
      "Çoğul",
      "Varlık"
    ]
  },
  "language_cogul_isim": {
    "word": "Çoğul",
    "forbiddenWords": [
      "Dil",
      "Dil bilgisi",
      "Birden fazla",
      "Çoğul eki",
      "Varlık"
    ]
  },
  "language_dolayli_tumlec": {
    "word": "Tümleç",
    "forbiddenWords": [
      "Dil",
      "Dil bilgisi",
      "Nereye",
      "Kime",
      "Cümle"
    ]
  },
  "language_zarf_tumleci": {
    "word": "Nasıl",
    "forbiddenWords": [
      "Dil",
      "Dil bilgisi",
      "Ne zaman",
      "Cümle",
      "Zarf Tümleci"
    ]
  },
  "language_simdiki_zaman": {
    "word": "Devam",
    "forbiddenWords": [
      "Dil",
      "Dil bilgisi",
      "Şu an",
      "Ek",
      "Şimdiki Zaman"
    ]
  },
  "language_gelecek_zaman": {
    "word": "Sonra",
    "forbiddenWords": [
      "Dil",
      "Dil bilgisi",
      "Yarın",
      "Ek",
      "Gelecek Zaman"
    ]
  },
  "language_gecmis_zaman": {
    "word": "Önce",
    "forbiddenWords": [
      "Dil",
      "Dil bilgisi",
      "Dün",
      "Ek",
      "Geçmiş Zaman"
    ]
  },
  "language_cekim_eki": {
    "word": "Eki",
    "forbiddenWords": [
      "Dil",
      "Dil bilgisi",
      "Kök",
      "Sözcük",
      "Eklenmek"
    ]
  },
  "language_yapim_eki": {
    "word": "Yapım",
    "forbiddenWords": [
      "Dil",
      "Dil bilgisi",
      "Yeni kelime",
      "Kök",
      "Anlam"
    ]
  },
  "language_kok_sozcuk": {
    "word": "Sözcük",
    "forbiddenWords": [
      "Dil",
      "Dil bilgisi",
      "Baş",
      "Ek",
      "Kelime"
    ]
  },
  "language_birlesik_kelime": {
    "word": "Birleşik",
    "forbiddenWords": [
      "Dil",
      "Dil bilgisi",
      "İki",
      "Sözcük",
      "Yeni anlam"
    ]
  },
  "language_sesli_harf": {
    "word": "Sekiz",
    "forbiddenWords": [
      "Dil",
      "Ses",
      "Ünlü",
      "Ağız",
      "Sesli Harf"
    ]
  },
  "language_sessiz_harf": {
    "word": "Ünsüz",
    "forbiddenWords": [
      "Dil",
      "Ses",
      "Konuşma",
      "Yirmi bir",
      "Sessiz Harf"
    ]
  },
  "language_yerel_agiz": {
    "word": "Yöre",
    "forbiddenWords": [
      "Dil",
      "Ses",
      "Konuşma",
      "Fark",
      "Yerel Ağız"
    ]
  },
  "language_zit_anlamli": {
    "word": "Zıt",
    "forbiddenWords": [
      "Dil",
      "Ses",
      "Karşıt",
      "Sözcük",
      "Sıcak soğuk"
    ]
  },
  "language_yansima_sozcuk": {
    "word": "Taklit",
    "forbiddenWords": [
      "Dil",
      "Ses",
      "Şırıl",
      "Gürültü",
      "Yansıma Sözcük"
    ]
  },
  "language_terim_anlam": {
    "word": "Anlam",
    "forbiddenWords": [
      "Dil",
      "Ses",
      "Bilim",
      "Alan",
      "Özel sözcük"
    ]
  },
  "language_mecaz_anlam": {
    "word": "Mecaz",
    "forbiddenWords": [
      "Dil",
      "Ses",
      "Gerçek dışı",
      "Söz",
      "Benzetme"
    ]
  },
  "language_gercek_anlam": {
    "word": "Doğrudan",
    "forbiddenWords": [
      "Dil",
      "Ses",
      "Temel",
      "Sözlük",
      "Gerçek Anlam"
    ]
  },
  "language_yan_anlam": {
    "word": "Yan",
    "forbiddenWords": [
      "Dil",
      "Ses",
      "Temel",
      "Benzerlik",
      "Sözcük"
    ]
  },
  "language_soz_sanati": {
    "word": "Anlatım",
    "forbiddenWords": [
      "Dil",
      "Ses",
      "Edebiyat",
      "Benzetme",
      "Söz Sanatı"
    ]
  },
  "language_alt_baslik": {
    "word": "Metin",
    "forbiddenWords": [
      "Yazı",
      "Bölüm",
      "Konu",
      "Küçük",
      "Alt Başlık"
    ]
  },
  "language_gelisme_bolumu": {
    "word": "Gelişme",
    "forbiddenWords": [
      "Yazı",
      "Metin",
      "Orta",
      "Açıklama",
      "Paragraf"
    ]
  },
  "language_sonuc_bolumu": {
    "word": "Kapanış",
    "forbiddenWords": [
      "Yazı",
      "Metin",
      "Bitiş",
      "Özet",
      "Sonuç Bölümü"
    ]
  },
  "language_ana_fikir": {
    "word": "Ana",
    "forbiddenWords": [
      "Yazı",
      "Metin",
      "Konu",
      "Mesaj",
      "Yazar"
    ]
  },
  "language_yardimci_fikir": {
    "word": "Destek",
    "forbiddenWords": [
      "Yazı",
      "Metin",
      "Detay",
      "Ana düşünce",
      "Yardımcı Fikir"
    ]
  },
  "language_iki_nokta": {
    "word": "İşaret",
    "forbiddenWords": [
      "Yazı",
      "Metin",
      "Açıklama",
      "Liste",
      "İki Nokta"
    ]
  },
  "language_unlem_isareti": {
    "word": "Seslenme",
    "forbiddenWords": [
      "Yazı",
      "Metin",
      "Duygu",
      "Noktalama",
      "Ünlem İşareti"
    ]
  },
  "language_uc_nokta": {
    "word": "Yarım",
    "forbiddenWords": [
      "Yazı",
      "Metin",
      "Devam",
      "İşaret",
      "Üç Nokta"
    ]
  },
  "language_tire_isareti": {
    "word": "Tire",
    "forbiddenWords": [
      "Yazı",
      "Metin",
      "Çizgi",
      "Konuşma",
      "Aralık"
    ]
  },
  "arts_isik_golge": {
    "word": "Kontrast",
    "forbiddenWords": [
      "Görsel sanat",
      "Resim",
      "Hacim",
      "Karanlık",
      "Işık Gölge"
    ]
  },
  "arts_linol_baski": {
    "word": "Linol",
    "forbiddenWords": [
      "Görsel sanat",
      "Resim",
      "Oyma",
      "Mürekkep",
      "Kâğıt"
    ]
  },
  "arts_tahta_baski": {
    "word": "Oyma",
    "forbiddenWords": [
      "Görsel sanat",
      "Resim",
      "Ahşap",
      "Baskı",
      "Tahta Baskı"
    ]
  },
  "arts_eskitme_teknigi": {
    "word": "Teknik",
    "forbiddenWords": [
      "Görsel sanat",
      "Resim",
      "Yüzey",
      "Antika",
      "Boya"
    ]
  },
  "arts_sahne_arkasi": {
    "word": "Arka",
    "forbiddenWords": [
      "Sahne",
      "Performans",
      "Perde",
      "Oyuncu",
      "Görünmeyen"
    ]
  },
  "arts_perde_arasi": {
    "word": "Performans",
    "forbiddenWords": [
      "Sahne",
      "Mola",
      "Seyirci",
      "Oyun",
      "Perde Arası"
    ]
  },
  "arts_final_selami": {
    "word": "Final",
    "forbiddenWords": [
      "Sahne",
      "Performans",
      "Alkış",
      "Oyuncu",
      "Perde"
    ]
  },
  "arts_yan_rol": {
    "word": "Rol",
    "forbiddenWords": [
      "Sahne",
      "Performans",
      "İkincil",
      "Oyuncu",
      "Karakter"
    ]
  },
  "arts_dekor_degisimi": {
    "word": "Set",
    "forbiddenWords": [
      "Sahne",
      "Performans",
      "Perde",
      "Aralık",
      "Dekor Değişimi"
    ]
  },
  "arts_sahne_isigi": {
    "word": "Spot",
    "forbiddenWords": [
      "Sahne",
      "Performans",
      "Parlak",
      "Oyuncu",
      "Sahne Işığı"
    ]
  },
  "arts_spot_isigi": {
    "word": "Aydınlatma",
    "forbiddenWords": [
      "Sahne",
      "Performans",
      "Tek nokta",
      "Yönetmen",
      "Spot Işığı"
    ]
  },
  "arts_kostum_provasi": {
    "word": "Hazırlık",
    "forbiddenWords": [
      "Sahne",
      "Performans",
      "Giysi",
      "Oyuncu",
      "Kostüm Provası"
    ]
  },
  "arts_dans_koreografisi": {
    "word": "Düzen",
    "forbiddenWords": [
      "Sahne",
      "Performans",
      "Adım",
      "Hareket",
      "Dans Koreografisi"
    ]
  },
  "arts_modern_dans": {
    "word": "Modern",
    "forbiddenWords": [
      "Dans",
      "Ritim",
      "Serbest",
      "Hareket",
      "Çağdaş"
    ]
  },
  "arts_cagdas_dans": {
    "word": "Çağdaş",
    "forbiddenWords": [
      "Dans",
      "Ritim",
      "Yorum",
      "Hareket",
      "Sahne"
    ]
  },
  "arts_halk_dansi": {
    "word": "Halk",
    "forbiddenWords": [
      "Dans",
      "Ritim",
      "Yöre",
      "Gelenek",
      "Topluluk"
    ]
  },
  "arts_tap_dansi": {
    "word": "Tap",
    "forbiddenWords": [
      "Dans",
      "Ritim",
      "Ayakkabı",
      "Ses",
      "Vuruş"
    ]
  },
  "arts_swing_dansi": {
    "word": "Swing",
    "forbiddenWords": [
      "Dans",
      "Ritim",
      "Caz",
      "Çift",
      "Dönmek"
    ]
  },
  "arts_dogaclama_dans": {
    "word": "Anlık",
    "forbiddenWords": [
      "Dans",
      "Ritim",
      "Müzik",
      "Hareket",
      "Doğaçlama Dans"
    ]
  },
  "arts_do_major": {
    "word": "Majör",
    "forbiddenWords": [
      "Müzik",
      "Nota",
      "Gam",
      "Beyaz tuş",
      "Piyano"
    ]
  },
  "arts_minor_ton": {
    "word": "Ton",
    "forbiddenWords": [
      "Müzik",
      "Nota",
      "Hüzün",
      "Gam",
      "Ses"
    ]
  },
  "arts_nota_degeri": {
    "word": "Vuruş",
    "forbiddenWords": [
      "Müzik",
      "Nota",
      "Süre",
      "Ses",
      "Nota Değeri"
    ]
  },
  "arts_sol_anahtari": {
    "word": "Sol",
    "forbiddenWords": [
      "Müzik",
      "Nota",
      "Beş çizgi",
      "Porte",
      "Anahtar işareti"
    ]
  },
  "arts_olcu_cizgisi": {
    "word": "Dikey",
    "forbiddenWords": [
      "Müzik",
      "Nota",
      "Porte",
      "Ritim",
      "Ölçü Çizgisi"
    ]
  },
  "arts_naturel_isareti": {
    "word": "Natürel",
    "forbiddenWords": [
      "Müzik",
      "Nota",
      "İptal",
      "Diyez",
      "Bemol"
    ]
  },
  "arts_senfoni_orkestrasi": {
    "word": "Şef",
    "forbiddenWords": [
      "Müzik",
      "Nota",
      "Çalgı",
      "Klasik",
      "Senfoni Orkestrası"
    ]
  },
  "arts_koro_sefi": {
    "word": "Topluluk",
    "forbiddenWords": [
      "Müzik",
      "Nota",
      "El",
      "Tempo",
      "Koro Şefi"
    ]
  },
  "arts_konser_salonu": {
    "word": "Akustik",
    "forbiddenWords": [
      "Müzik",
      "Nota",
      "Sahne",
      "Dinleyici",
      "Konser Salonu"
    ]
  }
} as const satisfies Record<string, Pick<TabuCard, "word" | "forbiddenWords">>;

