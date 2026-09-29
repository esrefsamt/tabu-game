import { defineCategory } from "./defineCategory.js";

export const EDUCATION_CARDS = defineCategory("education", [
  { common: ["Okul", "Öğrenci"], rows: `
Sınıf|Tahta|Sıra|Ders
Teneffüs|Zil|Oyun|Ara
Ödev|Ev|Yapmak|Teslim
Sınav|Soru|Not|Süre
Karne|Dönem|Not|Tatil
Diploma|Mezuniyet|Belge|Tören
Mezuniyet|Kep|Tören|Diploma
Müfredat|Konu|Program|Ders
Ders Programı|Saat|Gün|Çizelge
Yoklama|İsim|Sınıf|Devam
Tahta|Tebeşir|Yazmak|Silmek
Akıllı Tahta|Dokunmatik|Sınıf|Ekran
Sıra|Oturmak|Masa|Sınıf
Kantin|Tost|Teneffüs|Yemek
Okul Servisi|Minibüs|Çocuk|Sabah
Rehberlik|Danışmak|Yönlendirme|Görüşme
Kulüp|Etkinlik|Üye|Topluluk
Okul Gezisi|Otobüs|Öğretmen|Müze
Kütüphane Kartı|Ödünç|Kitap|Üye
Laboratuvar|Deney|Önlük|Tüp
Konferans Salonu|Sunum|Koltuk|Sahne
` },
  { common: ["Ders", "Okul"], rows: `
Matematik|Sayı|Problem|İşlem
Türkçe|Dil|Dil bilgisi|Okuma
Edebiyat|Şiir|Roman|Yazar
Tarih|Geçmiş|Olay|Yüzyıl
Coğrafya|Harita|İklim|Ülke
Fizik|Kuvvet|Hareket|Enerji
Kimya|Element|Tepkime|Laboratuvar
Biyoloji|Canlı|Hücre|Organizma
Felsefe|Düşünce|Soru|Mantık
Sosyoloji|Toplum|İnsan|Araştırma
Psikoloji|Zihin|Davranış|Duygu
Ekonomi|Para|Piyasa|Üretim
Müzik Dersi|Nota|Şarkı|Enstrüman
Resim Dersi|Boya|Fırça|Çizim
Beden Eğitimi|Spor|Salon|Hareket
Yabancı Dil|Kelime|Konuşmak|Öğrenmek
Bilgisayar Dersi|Klavye|Kod|Ekran
Din Kültürü|İnanç|İbadet|Ahlak
Vatandaşlık|Hak|Devlet|Sorumluluk
` },
  { common: ["Öğrenme", "Bilgi"], rows: `
Alfabe|Harf|Sıra|Okumak
Hece|Ses|Kelime|Bölmek
Cümle|Nokta|Kelime|Anlam
Paragraf|Metin|Satır|Konu
Noktalama|Virgül|Nokta|Yazı
İmla|Yazım|Doğru|Kural
Sözlük|Kelime|Anlam|Alfabe
Ansiklopedi|Madde|Başvuru|Cilt
Atlas|Harita|Dünya|Sayfa
Tez|Araştırma|Üniversite|Savunma
Makale|Dergi|Araştırma|Yayın
Sunum|Slayt|Konuşma|Ekran
Proje|Plan|Çalışma|Teslim
Deney|Hipotez|Laboratuvar|Sonuç
Gözlem|İzlemek|Not|İnceleme
Anket|Soru|Yanıt|Araştırma
Mülakat|Görüşme|Soru|İş
Seminer|Konuşmacı|Katılım|Salon
Konferans|Sunum|Konuşmacı|Dinleyici
Atölye|Uygulama|Çalışma|Eğitmen
Kurs|Öğrenmek|Katılım|Eğitmen
Sertifika|Belge|Eğitim|Başarı
Staj|İş yeri|Deneyim|Öğrenci
Burs|Öğrenci|Para|Destek
` },
  { common: ["Matematik", "İşlem"], rows: `
Toplama|Artı|Sayı|Sonuç
Çıkarma|Eksi|Fark|Sayı
Çarpma|Kere|Tablo|Sayı
Bölme|Paylaştırmak|Kalan|Sayı
Kesir|Pay|Payda|Bütün
Yüzde|Oran|Yüz|İndirim
Denklem|Bilinmeyen|Eşitlik|Çözmek
Geometri|Şekil|Açı|Alan
Üçgen|Üç kenar|Köşe|Açı
Kare|Dört kenar|Eşit|Şekil
Dikdörtgen|Uzun|Kısa|Dörtgen
Daire|Yuvarlak|Merkez|Çap
Küp|Altı yüz|Hacim|Kare
Piramit|Üçgen|Tepe|Taban
Grafik|Eksen|Veri|Çizgi
Olasılık|İhtimal|Zar|Yüzde
İstatistik|Veri|Ortalama|Grafik
` }
]);

