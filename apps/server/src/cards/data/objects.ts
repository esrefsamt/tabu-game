import { defineCategory } from "./defineCategory.js";

export const OBJECT_CARDS = defineCategory("object", [
  { common: ["Kırtasiye", "Yazmak"], rows: `
Kurşun Kalem|Silgi|Uç|Grafit
Tükenmez Kalem|Mürekkep|Kapak|İmza
Dolma Kalem|Mürekkep|Uç|Kartuş
Keçeli Kalem|Renkli|Kapak|Çizmek
Fosforlu Kalem|İşaretlemek|Parlak|Metin
Silgi|Kurşun kalem|Hata|Ovalamak
Kalemtıraş|Uç|Çevirmek|Talaş
Cetvel|Ölçmek|Düz çizgi|Santimetre
Gönye|Üçgen|Açı|Çizim
Pergel|Daire|İğne|Yarıçap
İletki|Açı|Derece|Yarım daire
Makas|Kesmek|Bıçak|Sap
Maket Bıçağı|Keskin|Bıçak|Kağıt
Zımba|Tel|Kağıt|Bastırmak
Ataş|Metal|Kağıt|Tutmak
Raptiye|İğne|Pano|Tutturmak
Yapıştırıcı|Tutkal|Kağıt|Sürmek
Bant|Yapışkan|Rulo|Kesmek
Not Defteri|Sayfa|Çizgili|Cep
Ajanda|Takvim|Plan|Randevu
Dosya|Belge|Klasör|Saklamak
Klasör|Halka|Belge|Raf
Zarf|Mektup|Pul|Posta
Pul|Posta|Zarf|Yapıştırmak
Kartpostal|Tatil|Posta|Resim
Etiket|Yapışkan|İsim|Ürün
Mühür|Damga|Resmi|Baskı
Kaşe|Mürekkep|Damga|İş yeri
` },
  { common: ["Araç", "Ölçmek"], rows: `
Termometre|Sıcaklık|Derece|Ateş
Metre|Uzunluk|Şerit|Santimetre
Tartı|Kilo|Ağırlık|Baskül
Kronometre|Süre|Başlatmak|Saniye
Pusula|Kuzey|İğne|Yön
Altimetre|Yükseklik|Dağ|Rakım
Barometre|Basınç|Hava|Tahmin
Higrometre|Nem|Yüzde|Hava
Mezura|Terzi|Ölçü|Şerit
Su Terazisi|Denge|Kabarcık|Düz
Mikroskop|Büyütmek|Hücre|Lens
Teleskop|Yıldız|Uzay|Mercek
Dürbün|Uzak|Bakmak|İki göz
Büyüteç|Cam|Yakından|İncelemek
` },
  { common: ["Alet", "Tamir"], rows: `
Çekiç|Çivi|Vurmak|Sap
Tornavida|Vida|Çevirmek|Uç
Pense|Tutmak|Metal|Sıkmak
Kerpeten|Çivi|Çekmek|Kıskaç
İngiliz Anahtarı|Somun|Ayarlanabilir|Çevirmek
Lokma Anahtarı|Cıvata|Takım|Çevirmek
Alyan Anahtarı|Altıgen|Vida|Mobilya
Matkap|Delik|Uç|Duvar
Testere|Kesmek|Diş|Tahta
Dekupaj Testere|Elektrikli|Kıvrım|Ahşap
Zımpara|Pürüz|Aşındırmak|Yüzey
Mengene|Tezgâh|Sıkıştırmak|Metal
Lehim Makinesi|Devre|Isı|Tel
Mala|Harç|Duvar|Sürmek
Spatula|Kazımak|Boya|Düz
Kürek|Toprak|Kazmak|Sap
Kazma|Toprak|Sert|Sap
Tırmık|Yaprak|Bahçe|Diş
Bahçe Makası|Budamak|Dal|Kesmek
Balta|Odun|Sap|Yarmak
` },
  { common: ["Eşya", "Taşımak"], rows: `
Sırt Çantası|Omuz|Fermuar|Okul
Valiz|Tekerlek|Seyahat|Kıyafet
El Çantası|Sap|İç|Aksesuar
Alışveriş Sepeti|Market|Ürün|Sap
Poşet|Plastik|Market|Sap
Bez Çanta|Kumaş|Market|Tekrar kullanmak
Termos|Sıcak|İçecek|Kapak
Matara|Su|Spor|Kapak
Beslenme Çantası|Okul|Yemek|Çocuk
Bavul Etiketi|İsim|Havalimanı|Valiz
Kumbara|Bozuk para|Biriktirmek|Kırmak
Cüzdan|Para|Kart|Cep
Anahtarlık|Halka|Anahtar|Cep
Kimlik Kartı|Fotoğraf|Numara|Resmi
Kartlık|Cüzdan|Banka|Cep
` },
  { common: ["Eşya", "Günlük"], rows: `
Anahtar|Kilit|Kapı|Açmak
Kilit|Anahtar|Kapı|Güvenlik
Fener|Işık|Pil|Karanlık
Mum|Alev|Fitil|Erimek
Çakmak|Ateş|Gaz|Yakmak
Kibrit|Kutu|Ateş|Çöp
Pil|Enerji|Kutup|Bitmek
Uzatma Kablosu|Priz|Elektrik|Fiş
Adaptör|Priz|Dönüştürmek|Elektrik
Elektrik Fişi|Priz|Kablo|Takmak
Priz|Duvar|Elektrik|Fiş
Ampul|Işık|Duy|Yanmak
El Aynası|Yüz|Yansıma|Sap
Tarak|Saç|Diş|Düzeltmek
Saç Fırçası|Saç|Kıl|Taramak
Tırnak Makası|Kesmek|Parmak|Metal
Cımbız|Kaş|Tutmak|Çekmek
Peçete|Kağıt|Silmek|Masa
Islak Mendil|Paket|Temizlik|Nemli
Kağıt Havlu|Rulo|Mutfak|Emmek
Çöp Poşeti|Atık|Kova|Siyah
Çöp Kovası|Atmak|Kapak|Atık
` },
  { common: ["Eşya", "Mutfak"], rows: `
Tencere|Kapak|Ocak|Kaynatmak
Tava|Kızartmak|Sap|Ocak
Çaydanlık|Demlemek|Altlık|Çay
Cezve|Kahve|Sap|Kaynatmak
Kettle|Su|Elektrik|Kaynatmak
Blender|Karıştırmak|Bıçak|Püre
Mikser|Çırpmak|Hamur|Elektrik
Rende|Peynir|Diş|Sürmek
Süzgeç|Delik|Makarna|Su
Kevgir|Delikli|Tencere|Almak
Kepçe|Çorba|Sap|Doldurmak
Silikon Spatula|Çevirmek|Tava|Sap
Çırpıcı|Yumurta|Tel|Karıştırmak
Havan|Dövmek|Baharat|Taş
Kesme Tahtası|Bıçak|Doğramak|Ahşap
Mutfak Bıçağı|Keskin|Doğramak|Sap
Ekmek Bıçağı|Tırtıklı|Dilim|Kesmek
Soyacak|Kabuk|Patates|Bıçak
Konserve Açacağı|Kapak|Metal|Kutu
Tirbuşon|Mantar|Şişe|Açmak
Şişe Açacağı|Kapak|Metal|İçecek
Ölçü Kabı|Mililitre|Tarif|Sıvı
Fırın Tepsisi|Pişirmek|Metal|Dikdörtgen
Kek Kalıbı|Fırın|Hamur|Şekil
Merdane|Hamur|Açmak|Silindir
Hamur Kesici|Şekil|Kurabiye|Metal
` }
]);



