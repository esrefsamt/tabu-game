function allow(reason: string, ids: readonly string[]): Readonly<Record<string, string>> {
  return Object.fromEntries(ids.map((id) => [id, reason]));
}

/** Deliberately small, audited exceptions to the single-word main-word rule. */
export const CARD_MULTIWORD_EXCEPTIONS: Readonly<Record<string, string>> = {
  ...allow("Yemeğin uluslararası veya Türk mutfağındaki yerleşik, ayrılmaz adıdır.", [
    "food_imam_bayildi", "food_ezogelin_corbasi", "food_hunkar_begendi",
    "cuisine_dim_sum", "cuisine_pad_thai"
  ]),
  ...allow("Ülkenin resmî ve ayrılmaz çok sözcüklü özel adıdır.", [
    "place_bosna_hersek", "place_suudi_arabistan", "place_birlesik_arap_emirlikleri",
    "place_guney_afrika", "place_guney_kore", "place_kuzey_kore", "place_yeni_zelanda",
    "place_amerika_birlesik_devletleri"
  ]),
  ...allow("Yerleşik adı çok sözcüklü olan millî simge veya kültürel eserdir.", [
    "culture_turk_bayragi", "culture_istiklal_marsi", "culture_karagoz_ve_hacivat",
    "culture_dede_korkut"
  ]),
  ...allow("Resmî veya geleneksel anma ve bayram adıdır.", [
    "culture_cumhuriyet_bayrami", "culture_23_nisan", "culture_19_mayis", "culture_30_agustos",
    "culture_ramazan_bayrami", "culture_kurban_bayrami", "culture_asure_gunu"
  ]),
  ...allow("Tanınmış kişinin yerleşik tam adıdır.", [
    "culture_nasreddin_hoca", "culture_yunus_emre", "culture_mimar_sinan"
  ]),
  ...allow("Tarih yazımında yerleşmiş özel olay veya dönem adıdır.", [
    "culture_canakkale_savasi", "culture_kurtulus_savasi", "culture_istanbul_un_fethi",
    "culture_sanayi_devrimi", "culture_fransiz_devrimi", "culture_birinci_dunya_savasi",
    "culture_ikinci_dunya_savasi", "culture_soguk_savas", "culture_cografi_kesifler",
    "culture_ay_a_inis"
  ]),
  ...allow("Tarihî devlet veya uygarlığın yerleşik özel adıdır.", [
    "culture_osmanli_imparatorlugu", "culture_antik_misir", "culture_antik_yunan",
    "culture_roma_imparatorlugu", "culture_bizans_imparatorlugu"
  ]),
  ...allow("Tanınmış yapı, rota veya kültürel miras alanının yerleşik özel adıdır.", [
    "culture_sumela_manastiri", "culture_nemrut_dagi", "culture_pamukkale_travertenleri",
    "culture_safranbolu_evleri", "culture_topkapi_sarayi", "culture_dolmabahce_sarayi",
    "culture_galata_kulesi", "culture_kiz_kulesi", "culture_selimiye_camii",
    "culture_berlin_duvari", "culture_ipek_yolu", "culture_misir_piramitleri",
    "culture_cin_seddi", "culture_tac_mahal", "culture_eyfel_kulesi",
    "culture_ozgurluk_heykeli", "culture_machu_picchu"
  ])
};
