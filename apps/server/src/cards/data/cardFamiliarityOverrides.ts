import type { TabuCard } from "@tabu/shared";

type CardWording = Pick<TabuCard, "word" | "forbiddenWords">;

/**
 * Phase 12.2 decisions for source phrases that remained awkward after restoring
 * familiar Turkish expressions from the Phase 12.1 cleanup.
 */
export const CARD_FAMILIARITY_OVERRIDES = {
  technology_kimlik_avi: {
    word: "Dolandırıcılık",
    forbiddenWords: ["Para", "Kandırmak", "Sahte", "Mağdur", "Suç"]
  },
  technology_akis_hizmeti: {
    word: "Platform",
    forbiddenWords: ["İnternet", "Yayın", "Üyelik", "Dizi", "İzlemek"]
  },
  profession_seyahat_acentesi_calisani: {
    word: "Tur Operatörü",
    forbiddenWords: ["Seyahat", "Tatil", "Rezervasyon", "Paket", "Acenta"]
  },
  home_cam_sil: {
    word: "Cam Bezi",
    forbiddenWords: ["Pencere", "Silmek", "Temizlik", "Leke", "Mikrofiber"]
  },
  media_sozluk_romani: {
    word: "Kurmaca",
    forbiddenWords: ["Roman", "Gerçek", "Hikâye", "Yazar", "Hayal"]
  },
  travel_tur_rehberi_kitabi: {
    word: "Kılavuz",
    forbiddenWords: ["Rehber", "Yol", "Bilgi", "Kitap", "Talimat"]
  },
  hobby_yemek_tarifi_deneme: {
    word: "Lezzet",
    forbiddenWords: ["Tat", "Yemek", "Damak", "Güzel", "Mutfak"]
  },
  misc_son_tarih: {
    word: "Teslim Tarihi",
    forbiddenWords: ["Son", "Süre", "Proje", "Yetiştirmek", "Gün"]
  },
  language_govde_sozcuk: {
    word: "Heceleme",
    forbiddenWords: ["Kelime", "Ayırmak", "Ses", "Okumak", "Yazmak"]
  },
  language_giris_bolumu: {
    word: "Açılış",
    forbiddenWords: ["Başlamak", "Tören", "İlk", "Kapı", "Konuşma"]
  },
  language_konu_cumlesi: {
    word: "Önerme",
    forbiddenWords: ["Cümle", "Doğru", "Yanlış", "Mantık", "Yargı"]
  },
  language_dipnot_isareti: {
    word: "Atıf",
    forbiddenWords: ["Kaynak", "Alıntı", "Yazar", "Metin", "Göndermek"]
  },
  science_paleontoloji: {
    word: "Fosil Bilimi",
    forbiddenWords: ["Fosil", "Dinozor", "Kazı", "Geçmiş", "Bilim"]
  },
  language_redaksiyon: {
    word: "Metin Düzenleme",
    forbiddenWords: ["Yazı", "Düzeltmek", "Editör", "Hata", "Yayın"]
  },
  arts_serigrafi: {
    word: "İpek Baskı",
    forbiddenWords: ["Şablon", "Mürekkep", "Elek", "Kâğıt", "Çoğaltmak"]
  },
  arts_litografi: {
    word: "Taş Baskı",
    forbiddenWords: ["Taş", "Mürekkep", "Resim", "Kâğıt", "Çoğaltmak"]
  },
  arts_monotip: {
    word: "Tek Baskı",
    forbiddenWords: ["Bir", "Kopya", "Mürekkep", "Resim", "Kâğıt"]
  },
  arts_bharatanatyam: {
    word: "Oryantal Dans",
    forbiddenWords: ["Göbek", "Müzik", "Kostüm", "Sahne", "Ritim"]
  },
  arts_muzik_partisyonu: {
    word: "Partisyon",
    forbiddenWords: ["Nota", "Orkestra", "Sayfa", "Müzik", "Bölüm"]
  }
} as const satisfies Record<string, CardWording>;
