import { defineCategory } from "./defineCategory.js";

export const HEALTH_CARDS = defineCategory("health", [
  { common: ["Vücut", "İnsan"], rows: `
Baş|Saç|Beyin|Boyun
Alın|Kaş|Yüz|Ter
Göz|Görmek|Kapak|Kirpik
Kulak|Duymak|Kepçe|Ses
Burun|Koklamak|Nefes|Yüz
Ağız|Konuşmak|Dudak|Diş
Dudak|Öpmek|Ağız|Ruj
Dil|Tatmak|Konuşmak|Ağız
Diş|Çiğnemek|Mine|Fırçalamak
Çene|Alt|Ağız|Kemik
Boyun|Baş|Omuz|Gerdan
Omuz|Kol|Yük|Eklem
Kol|Dirsek|El|Kas
Dirsek|Kol|Bükmek|Eklem
Bilek|El|Saat|Nabız
El|Parmak|Avuç|Tutmak
Parmak|El|Tırnak|Beş
Tırnak|Parmak|Kesmek|Uzamak
Göğüs|Kalp|Kaburga|Nefes
Sırt|Omurga|Arka|Duruş
Bel|Kemer|Sırt|Ağrı
Karın|Mide|Göbek|Kas
Kalça|Oturmak|Leğen|Bel
Bacak|Diz|Yürümek|Kas
Diz|Kapak|Bükmek|Bacak
Ayak|Yürümek|Topuk|Parmak
Topuk|Ayak|Arka|Yürümek
Saç|Baş|Taramak|Tel
Sakal|Yüz|Tıraş|Kıl
Bıyık|Dudak|Kıl|Yüz
` },
  { common: ["Organ", "Sağlık"], rows: `
Kalp|Atmak|Kan|Göğüs
Akciğer|Nefes|Oksijen|Göğüs
Mide|Sindirmek|Yemek|Karın
Karaciğer|Safra|Vücut|Temizlemek
Böbrek|İdrar|Süzmek|Bel
Beyin|Düşünmek|Kafatası|Sinir
Bağırsak|Sindirim|Uzun|Karın
Pankreas|İnsülin|Şeker|Karın
Dalak|Kan|Bağışıklık|Karın
Safra Kesesi|Karaciğer|Sindirim|Taş
Mesane|İdrar|Dolmak|Boşaltmak
Cilt|Ten|Dokunmak|Koruma
Kemik|İskelet|Sert|Kırık
Kas|Güç|Hareket|Lif
Eklem|Kemik|Hareket|Diz
Sinir|Beyin|İleti|Duyu
Damar|Kan|Akış|Atardamar
Kan|Kırmızı|Damar|Bağış
` },
  { common: ["Sağlık", "Tedavi"], rows: `
Aşı|İğne|Koruma|Bağışıklık
İlaç|Eczane|Hap|Reçete
Reçete|Doktor|Eczane|İlaç
Muayene|Doktor|Hasta|Kontrol
Ameliyat|Cerrah|Neşter|Hastane
Bandaj|Sarmak|Yara|Gazlı bez
Alçı Sargı|Kırık|Kol|Sert
Tıbbi Dikiş|Yara|İğne|İplik
Röntgen|Kemik|Görüntü|Işın
Ultrason|Görüntü|Ses dalgası|Bebek
MR|Manyetik|Görüntü|Cihaz
Tomografi|Kesit|Görüntü|Tarama
Kan Tahlili|Örnek|Laboratuvar|Sonuç
İdrar Tahlili|Örnek|Laboratuvar|Sonuç
Tansiyon|Basınç|Ölçmek|Kol
Nabız|Kalp|Atış|Bilek
Ateş Ölçer|Derece|Hastalık|Termometre
İlk Yardım|Acil|Müdahale|Yaralı
Kalp Masajı|Baskı|Göğüs|Acil
Serum|Damar|Sıvı|Hastane
Oksijen Maskesi|Nefes|Yüz|Hastane
` },
  { common: ["Hastalık", "Belirti"], rows: `
Grip|Ateş|Burun|Kış
Soğuk Algınlığı|Hapşırmak|Burun|Öksürük
Öksürük|Boğaz|Ses|Hasta
Hapşırık|Burun|Ani|Mendil
Baş Ağrısı|Şakak|Zonklamak|İlaç
Migren|Şiddetli|Işık|Baş
Diş Ağrısı|Çürük|Sızı|Hekim
Boğaz Ağrısı|Yutkunmak|Ses|Enfeksiyon
Mide Bulantısı|Kusmak|Rahatsızlık|Yemek
Karın Ağrısı|Mide|Kramp|Rahatsızlık
İshal|Bağırsak|Sık|Tuvalet
Kabızlık|Bağırsak|Zor|Tuvalet
Alerji|Kaşıntı|Polen|Tepki
Astım|Nefes|İnhaler|Akciğer
Diyabet|Şeker|İnsülin|Kan
Anemi|Kansızlık|Demir|Yorgunluk
Uykusuzluk|Gece|Uyku|Yorgun
Güneş Yanığı|Kızarmak|Cilt|Yaz
Burkulma|Bilek|Şişlik|Eklem
Kırık|Kemik|Alçı|Düşmek
` }
]);



