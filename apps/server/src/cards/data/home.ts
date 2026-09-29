import { defineCategory } from "./defineCategory.js";

export const HOME_CARDS = defineCategory("home", [
  { common: ["Ev", "Oda"], rows: `
Salon|Koltuk|Televizyon|Misafir
Yatak Odası|Uyumak|Dolap|Yastık
Mutfak|Yemek|Ocak|Tezgâh
Banyo|Duş|Lavabo|Havlu
Tuvalet|Klozet|Sifon|Kağıt
Antre|Giriş|Ayakkabı|Askı
Balkon|Dışarı|Korkuluk|Saksı
Teras|Açık hava|Çatı|Oturmak
Koridor|Geçiş|Kapı|Uzun
Çatı Katı|Tavan|Merdiven|Üst
Bodrum|Alt|Depo|Merdiven
Kiler|Erzak|Raf|Saklamak
Çamaşır Odası|Makine|Kurutma|Kirli
Çalışma Odası|Masa|Kitap|Sessiz
Çocuk Odası|Oyuncak|Yatak|Renkli
Misafir Odası|Yatak|Konuk|Boş
` },
  { common: ["Ev", "Mobilya"], rows: `
Koltuk|Oturmak|Yastık|Salon
Kanepe|Oturmak|Üçlü|Salon
Berjer|Tek kişilik|Kolçak|Oturmak
Sandalye|Oturmak|Dört ayak|Masa
Tabure|Kısa|Oturmak|Arkalık
Masa|Ayak|Üst|Yemek
Sehpa|Küçük|Kahve|Salon
Yemek Masası|Tabak|Sandalye|Aile
Çalışma Masası|Ders|Bilgisayar|Çekmece
Komodin|Yatak|Çekmece|Lamba
Şifonyer|Çekmece|Kıyafet|Ayna
Gardırop|Kıyafet|Askı|Kapak
Kitaplık|Raf|Roman|Salon
Raf|Duvar|Kitap|Dizmek
Vitrin|Cam|Sergilemek|Salon
Konsol|Çekmece|Yemek odası|Dolap
Ayakkabılık|Giriş|Raf|Çift
Portmanto|Askı|Mont|Giriş
Yatak|Uyumak|Şilte|Yorgan
Ranza|İki kat|Çocuk|Merdiven
Beşik|Bebek|Sallamak|Uyku
Hamak|Asmak|Sallanmak|Dinlenmek
Sallanan Sandalye|İleri geri|Oturmak|Ahşap
` },
  { common: ["Ev", "Dekorasyon"], rows: `
Halı|Zemin|Dokuma|Desen
Kilim|Dokuma|İnce|Yer
Perde|Pencere|Kumaş|Güneş
Stor Perde|Rulo|Pencere|Çekmek
Jaluzi|Şerit|Pencere|Işık
Avize|Tavan|Işık|Ampul
Abajur|Lamba|Masa|Gölge
Aplik|Duvar|Lamba|Işık
Vazo|Çiçek|Cam|Süs
Saksı|Bitki|Toprak|Sulamak
Çerçeve|Fotoğraf|Duvar|Kenarlık
Duvar Saati|Akrep|Yelkovan|Asmak
Yastık|Baş|Yumuşak|Kılıf
Kırlent|Koltuk|Yastık|Süs
Battaniye|Sıcak|Örtmek|Kış
Yorgan|Uyumak|Kılıf|Kalın
Nevresim|Yorgan|Kılıf|Yatak
Çarşaf|Yatak|Sermek|Kumaş
Pike|İnce|Örtü|Yaz
Masa Örtüsü|Kumaş|Sofra|Sermek
Peçetelik|Masa|Kağıt|Tutmak
` },
  { common: ["Ev", "Beyaz eşya"], rows: `
Bulaşık Makinesi|Tabak|Deterjan|Yıkamak
Fırın|Pişirmek|Tepsi|Sıcak
Mikrodalga Fırın|Isıtmak|Dakika|Döner
Ocak|Alev|Tencere|Gaz
Davlumbaz|Duman|Koku|Çekmek
Aspiratör|Hava|Çekmek|Mutfak
Derin Dondurucu|Donmak|Soğuk|Saklamak
Kurutma Makinesi|Çamaşır|Isı|Kıyafet
Ütü|Kırışık|Buhar|Gömlek
Elektrikli Süpürge|Toz|Hortum|Temizlik
Klima|Soğutmak|Yaz|Kumanda
Vantilatör|Pervane|Rüzgâr|Serin
Kalorifer|Petek|Sıcak|Kış
Kombi|Doğalgaz|Sıcak su|Petek
Şofben|Sıcak su|Banyo|Gaz
Su Arıtma Cihazı|Filtre|İçmek|Musluk
` },
  { common: ["Ev", "Temizlik"], rows: `
Süpürge|Toz|Sap|Zemin
Faraş|Süpürge|Çöp|Toplamak
Paspas|Islak|Zemin|Silmek
Kova|Su|Sap|Taşımak
Sünger|Yumuşak|Emmek|Bulaşık
Bez|Silmek|Toz|Kumaş
Deterjan|Köpük|Yıkamak|Çamaşır
Yumuşatıcı|Koku|Çamaşır|Makine
Çamaşır Suyu|Beyaz|Dezenfekte|Koku
Bulaşık Deterjanı|Köpük|Tabak|Yağ
Cam Sil|Pencere|Sprey|Parlatmak
Kireç Sökücü|Banyo|Musluk|Leke
Tuvalet Fırçası|Klozet|Sap|Ovalamak
Çamaşır Sepeti|Kirli|Kıyafet|Banyo
Çamaşır İpi|Asmak|Mandal|Kurutmak
Mandal|İp|Çamaşır|Sıkıştırmak
Ütü Masası|Katlanır|Kıyafet|Düz
` }
]);




