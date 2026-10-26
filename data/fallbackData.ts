// =============================================================
// FALLBACK DATA — mirrors exact Google Sheets structure
// Used when GOOGLE_SHEET_ID / credentials are not configured
// =============================================================

export interface Agence {
  CODE: string;
  AGENCE: string;
}

export interface CouvertureAgence {
  CODE_AGENCE: string;
  NOM_AGENCE: string;
  WILAYA: string;
}

export interface TypeClient {
  NOM_TYPE_CLIENT: string;
  TAUX_DE_PROFIT: number; // decimal, e.g. 0.085
}

export interface Categorie {
  CATEGORIE: string;
}

export interface Marque {
  MARQUE: string;
  LOGO: string;
}

export interface Produit {
  ID_PRODUIT: string;
  CATEGORIE: string;
  MARQUE: string;
  PRODUIT_GENERIQUE: string;
}

export interface PointDeVente {
  ID_PDV: string;
  CATEGORIE: string;
  MARQUE: string;
  Commercial: string;
  Adresse: string;
  Wilaya: string;
  Telephone: string;
}

export interface CheckListItem {
  fr: string;
  ar: string;
}

// ─── AGENCE ──────────────────────────────────────────────────
export const AGENCES: Agence[] = [
  { CODE: "184", AGENCE: "AGC BOUIRA" },
  { CODE: "176", AGENCE: "AGC LAKHDARIA" },
  { CODE: "177", AGENCE: "AGC SEG" },
  { CODE: "128", AGENCE: "AGC AIN BESSAM" },
  { CODE: "324", AGENCE: "AGC SIDI AISSA" },
  { CODE: "191", AGENCE: "AGC HASSI BAHBAH" },
  { CODE: "190", AGENCE: "AGC AIN OUSSERA" },
  { CODE: "187", AGENCE: "AGC DJELFA" },
  { CODE: "159", AGENCE: "AGC BERROUAGHIA" },
];

// ─── COUVERTURE AGENCE ────────────────────────────────────────
export const COUVERTURE_AGENCE: CouvertureAgence[] = [
  { CODE_AGENCE: "184", NOM_AGENCE: "AGC BOUIRA",       WILAYA: "BOUIRA" },
  { CODE_AGENCE: "184", NOM_AGENCE: "AGC BOUIRA",       WILAYA: "BOUMERDES" },
  { CODE_AGENCE: "184", NOM_AGENCE: "AGC BOUIRA",       WILAYA: "ALGER" },
  { CODE_AGENCE: "176", NOM_AGENCE: "AGC LAKHDARIA",    WILAYA: "BOUIRA" },
  { CODE_AGENCE: "176", NOM_AGENCE: "AGC LAKHDARIA",    WILAYA: "BOUMERDES" },
  { CODE_AGENCE: "176", NOM_AGENCE: "AGC LAKHDARIA",    WILAYA: "ALGER" },
  { CODE_AGENCE: "177", NOM_AGENCE: "AGC SEG",          WILAYA: "BOUIRA" },
  { CODE_AGENCE: "177", NOM_AGENCE: "AGC SEG",          WILAYA: "BOUMERDES" },
  { CODE_AGENCE: "177", NOM_AGENCE: "AGC SEG",          WILAYA: "ALGER" },
  { CODE_AGENCE: "324", NOM_AGENCE: "AGC SIDI AISSA",   WILAYA: "MSILA" },
  { CODE_AGENCE: "191", NOM_AGENCE: "AGC HASSI BAHBAH", WILAYA: "TISSEMSILT" },
  { CODE_AGENCE: "191", NOM_AGENCE: "AGC HASSI BAHBAH", WILAYA: "DJELFA" },
  { CODE_AGENCE: "190", NOM_AGENCE: "AGC AIN OUSSERA",  WILAYA: "TISSEMSILT" },
  { CODE_AGENCE: "190", NOM_AGENCE: "AGC AIN OUSSERA",  WILAYA: "DJELFA" },
  { CODE_AGENCE: "187", NOM_AGENCE: "AGC DJELFA",       WILAYA: "TISSEMSILT" },
  { CODE_AGENCE: "187", NOM_AGENCE: "AGC DJELFA",       WILAYA: "DJELFA" },
  { CODE_AGENCE: "128", NOM_AGENCE: "AGC AIN BESSAM",   WILAYA: "BOUIRA" },
  { CODE_AGENCE: "159", NOM_AGENCE: "AGC BERROUAGHIA",  WILAYA: "MEDEA" },
];

// ─── TYPE DU CLIENT ───────────────────────────────────────────
export const TYPES_CLIENT: TypeClient[] = [
  { NOM_TYPE_CLIENT: "Client Ordinaire",           TAUX_DE_PROFIT: 0.085 },
  { NOM_TYPE_CLIENT: "CNR",                        TAUX_DE_PROFIT: 0.065 },
  { NOM_TYPE_CLIENT: "IMC",                        TAUX_DE_PROFIT: 0.04  },
  { NOM_TYPE_CLIENT: "Personnel Banque",           TAUX_DE_PROFIT: 0.03  },
  { NOM_TYPE_CLIENT: "Personnel SNL",              TAUX_DE_PROFIT: 0.03  },
  { NOM_TYPE_CLIENT: "Personnel AMANA",            TAUX_DE_PROFIT: 0.065 },
  { NOM_TYPE_CLIENT: "Personnel TRANSTEV SPA",     TAUX_DE_PROFIT: 0.065 },
  { NOM_TYPE_CLIENT: "Personnel CACOBATPH",        TAUX_DE_PROFIT: 0.065 },
  { NOM_TYPE_CLIENT: "Adhérent/Retraités CASNOS",  TAUX_DE_PROFIT: 0.065 },
  { NOM_TYPE_CLIENT: "SNADEP",                     TAUX_DE_PROFIT: 0.065 },
];

// ─── CATEGORIE ────────────────────────────────────────────────
export const CATEGORIES: Categorie[] = [
  { CATEGORIE: "Électroménager" },
  { CATEGORIE: "Meuble" },
  { CATEGORIE: "Smart Phone" },
  { CATEGORIE: "PC SCHNEIDER" },
  { CATEGORIE: "Motor Cycle VMS" },
];

// ─── MARQUE ───────────────────────────────────────────────────
export const MARQUES: Marque[] = [
  { MARQUE: "CONDOR",    LOGO: "" },
  { MARQUE: "CRISTOR",   LOGO: "" },
  { MARQUE: "NARDI",     LOGO: "" },
  { MARQUE: "HISENSE",   LOGO: "" },
  { MARQUE: "SAMSUNG",   LOGO: "" },
  { MARQUE: "GEANT",     LOGO: "" },
  { MARQUE: "THOMSON",   LOGO: "" },
  { MARQUE: "SCHNEIDER", LOGO: "" },
  { MARQUE: "RADIOLA",   LOGO: "" },
  { MARQUE: "ZTE NUBIA", LOGO: "" },
];

// ─── PRODUIT ──────────────────────────────────────────────────
export const PRODUITS: Produit[] = [
  { ID_PRODUIT: "P001",  CATEGORIE: "Électroménager", MARQUE: "CONDOR",    PRODUIT_GENERIQUE: "Air Fryer" },
  { ID_PRODUIT: "P002",  CATEGORIE: "Électroménager", MARQUE: "CONDOR",    PRODUIT_GENERIQUE: "Aspirateur" },
  { ID_PRODUIT: "P003",  CATEGORIE: "Électroménager", MARQUE: "CONDOR",    PRODUIT_GENERIQUE: "Bain d'huile" },
  { ID_PRODUIT: "P004",  CATEGORIE: "Électroménager", MARQUE: "CONDOR",    PRODUIT_GENERIQUE: "Batteur" },
  { ID_PRODUIT: "P005",  CATEGORIE: "Électroménager", MARQUE: "CONDOR",    PRODUIT_GENERIQUE: "Blender" },
  { ID_PRODUIT: "P006",  CATEGORIE: "Électroménager", MARQUE: "CONDOR",    PRODUIT_GENERIQUE: "Climatisation Armoire" },
  { ID_PRODUIT: "P007",  CATEGORIE: "Électroménager", MARQUE: "CONDOR",    PRODUIT_GENERIQUE: "Climatisation Mobile" },
  { ID_PRODUIT: "P008",  CATEGORIE: "Électroménager", MARQUE: "CONDOR",    PRODUIT_GENERIQUE: "Climatiseur" },
  { ID_PRODUIT: "P009",  CATEGORIE: "Électroménager", MARQUE: "CONDOR",    PRODUIT_GENERIQUE: "Congélateur" },
  { ID_PRODUIT: "P010",  CATEGORIE: "Électroménager", MARQUE: "CONDOR",    PRODUIT_GENERIQUE: "Cuisinière" },
  { ID_PRODUIT: "P011",  CATEGORIE: "Électroménager", MARQUE: "CONDOR",    PRODUIT_GENERIQUE: "Hachoir" },
  { ID_PRODUIT: "P012",  CATEGORIE: "Électroménager", MARQUE: "CONDOR",    PRODUIT_GENERIQUE: "Lave Vaisselle" },
  { ID_PRODUIT: "P013",  CATEGORIE: "Électroménager", MARQUE: "CONDOR",    PRODUIT_GENERIQUE: "Machine à Laver" },
  { ID_PRODUIT: "P014",  CATEGORIE: "Électroménager", MARQUE: "CONDOR",    PRODUIT_GENERIQUE: "Machine à café" },
  { ID_PRODUIT: "P015",  CATEGORIE: "Électroménager", MARQUE: "CONDOR",    PRODUIT_GENERIQUE: "Micro-Onde" },
  { ID_PRODUIT: "P016",  CATEGORIE: "Électroménager", MARQUE: "CONDOR",    PRODUIT_GENERIQUE: "Mixeur" },
  { ID_PRODUIT: "P017",  CATEGORIE: "Électroménager", MARQUE: "CONDOR",    PRODUIT_GENERIQUE: "Pétrin" },
  { ID_PRODUIT: "P018",  CATEGORIE: "Électroménager", MARQUE: "CONDOR",    PRODUIT_GENERIQUE: "Réfrigérateur" },
  { ID_PRODUIT: "P019",  CATEGORIE: "Électroménager", MARQUE: "CONDOR",    PRODUIT_GENERIQUE: "Téléviseur" },
  { ID_PRODUIT: "P020",  CATEGORIE: "Électroménager", MARQUE: "CRISTOR",   PRODUIT_GENERIQUE: "Air Fryer" },
  { ID_PRODUIT: "P021",  CATEGORIE: "Électroménager", MARQUE: "CRISTOR",   PRODUIT_GENERIQUE: "Aspirateur" },
  { ID_PRODUIT: "P022",  CATEGORIE: "Électroménager", MARQUE: "CRISTOR",   PRODUIT_GENERIQUE: "Blender" },
  { ID_PRODUIT: "P023",  CATEGORIE: "Électroménager", MARQUE: "CRISTOR",   PRODUIT_GENERIQUE: "Climatiseur" },
  { ID_PRODUIT: "P024",  CATEGORIE: "Électroménager", MARQUE: "CRISTOR",   PRODUIT_GENERIQUE: "Congélateur" },
  { ID_PRODUIT: "P025",  CATEGORIE: "Électroménager", MARQUE: "CRISTOR",   PRODUIT_GENERIQUE: "Cuisinière" },
  { ID_PRODUIT: "P026",  CATEGORIE: "Électroménager", MARQUE: "CRISTOR",   PRODUIT_GENERIQUE: "Machine à Laver" },
  { ID_PRODUIT: "P027",  CATEGORIE: "Électroménager", MARQUE: "CRISTOR",   PRODUIT_GENERIQUE: "Micro-Onde" },
  { ID_PRODUIT: "P028",  CATEGORIE: "Électroménager", MARQUE: "CRISTOR",   PRODUIT_GENERIQUE: "Réfrigérateur" },
  { ID_PRODUIT: "P029",  CATEGORIE: "Électroménager", MARQUE: "CRISTOR",   PRODUIT_GENERIQUE: "Téléviseur" },
  { ID_PRODUIT: "P030",  CATEGORIE: "Électroménager", MARQUE: "NARDI",     PRODUIT_GENERIQUE: "Cuisinière" },
  { ID_PRODUIT: "P031",  CATEGORIE: "Électroménager", MARQUE: "NARDI",     PRODUIT_GENERIQUE: "Congélateur" },
  { ID_PRODUIT: "P032",  CATEGORIE: "Électroménager", MARQUE: "NARDI",     PRODUIT_GENERIQUE: "Réfrigérateur" },
  { ID_PRODUIT: "P033",  CATEGORIE: "Électroménager", MARQUE: "HISENSE",   PRODUIT_GENERIQUE: "Climatiseur" },
  { ID_PRODUIT: "P034",  CATEGORIE: "Électroménager", MARQUE: "HISENSE",   PRODUIT_GENERIQUE: "Congélateur" },
  { ID_PRODUIT: "P035",  CATEGORIE: "Électroménager", MARQUE: "HISENSE",   PRODUIT_GENERIQUE: "Réfrigérateur" },
  { ID_PRODUIT: "P036",  CATEGORIE: "Électroménager", MARQUE: "HISENSE",   PRODUIT_GENERIQUE: "Téléviseur" },
  { ID_PRODUIT: "P037",  CATEGORIE: "Électroménager", MARQUE: "SAMSUNG",   PRODUIT_GENERIQUE: "Climatiseur" },
  { ID_PRODUIT: "P038",  CATEGORIE: "Électroménager", MARQUE: "SAMSUNG",   PRODUIT_GENERIQUE: "Réfrigérateur" },
  { ID_PRODUIT: "P039",  CATEGORIE: "Électroménager", MARQUE: "SAMSUNG",   PRODUIT_GENERIQUE: "Téléviseur" },
  { ID_PRODUIT: "P040",  CATEGORIE: "Électroménager", MARQUE: "SAMSUNG",   PRODUIT_GENERIQUE: "Machine à Laver" },
  { ID_PRODUIT: "P041",  CATEGORIE: "Électroménager", MARQUE: "GEANT",     PRODUIT_GENERIQUE: "Aspirateur" },
  { ID_PRODUIT: "P042",  CATEGORIE: "Électroménager", MARQUE: "GEANT",     PRODUIT_GENERIQUE: "Machine à Laver" },
  { ID_PRODUIT: "P043",  CATEGORIE: "Électroménager", MARQUE: "GEANT",     PRODUIT_GENERIQUE: "Réfrigérateur" },
  { ID_PRODUIT: "P044",  CATEGORIE: "Électroménager", MARQUE: "THOMSON",   PRODUIT_GENERIQUE: "Téléviseur" },
  { ID_PRODUIT: "P045",  CATEGORIE: "Électroménager", MARQUE: "THOMSON",   PRODUIT_GENERIQUE: "Climatiseur" },
  { ID_PRODUIT: "P046",  CATEGORIE: "Électroménager", MARQUE: "RADIOLA",   PRODUIT_GENERIQUE: "Téléviseur" },
  { ID_PRODUIT: "P047",  CATEGORIE: "Électroménager", MARQUE: "RADIOLA",   PRODUIT_GENERIQUE: "Climatiseur" },
  { ID_PRODUIT: "P048",  CATEGORIE: "PC SCHNEIDER",   MARQUE: "SCHNEIDER", PRODUIT_GENERIQUE: "PC SCHNEIDER" },
  { ID_PRODUIT: "P049",  CATEGORIE: "Smart Phone",    MARQUE: "ZTE NUBIA", PRODUIT_GENERIQUE: "Smart Phone" },
  { ID_PRODUIT: "P050",  CATEGORIE: "Smart Phone",    MARQUE: "SAMSUNG",   PRODUIT_GENERIQUE: "Smart Phone" },
  { ID_PRODUIT: "P051",  CATEGORIE: "Motor Cycle VMS",MARQUE: "",          PRODUIT_GENERIQUE: "Motor Cycle VMS" },
  { ID_PRODUIT: "P052",  CATEGORIE: "Meuble",         MARQUE: "",          PRODUIT_GENERIQUE: "Meuble" },
];

// ─── POINTS DE VENTE ─────────────────────────────────────────
export const POINTS_DE_VENTE: PointDeVente[] = [
  { ID_PDV: "PDV001", CATEGORIE: "Électroménager", MARQUE: "CONDOR",  Commercial: "CONDOR STORE BOUIRA",     Adresse: "Rue Amirouche, Centre Commercial",     Wilaya: "BOUIRA",    Telephone: "0560123456" },
  { ID_PDV: "PDV002", CATEGORIE: "Électroménager", MARQUE: "CONDOR",  Commercial: "CONDOR LAKHDARIA",         Adresse: "Route Nationale, Lakhdaria",           Wilaya: "BOUIRA",    Telephone: "0561234567" },
  { ID_PDV: "PDV003", CATEGORIE: "Électroménager", MARQUE: "SAMSUNG", Commercial: "SAMSUNG EXPERIENCE ALGER", Adresse: "Bd Zighoud Youcef, Alger Centre",      Wilaya: "ALGER",     Telephone: "0562345678" },
  { ID_PDV: "PDV004", CATEGORIE: "Électroménager", MARQUE: "HISENSE", Commercial: "HISENSE BOUMERDES",        Adresse: "Zone Industrielle, Boumerdes",         Wilaya: "BOUMERDES", Telephone: "0563456789" },
  { ID_PDV: "PDV005", CATEGORIE: "Électroménager", MARQUE: "CONDOR",  Commercial: "CONDOR DJELFA",            Adresse: "Rue du Commerce, Djelfa",              Wilaya: "DJELFA",    Telephone: "0564567890" },
  { ID_PDV: "PDV006", CATEGORIE: "Électroménager", MARQUE: "CRISTOR", Commercial: "CRISTOR BOUIRA",           Adresse: "Place des Martyrs, Bouira",            Wilaya: "BOUIRA",    Telephone: "0565678901" },
  { ID_PDV: "PDV007", CATEGORIE: "Smart Phone",    MARQUE: "SAMSUNG", Commercial: "SAMSUNG MOBILE ALGER",    Adresse: "Rue Didouche Mourad, Alger",           Wilaya: "ALGER",     Telephone: "0566789012" },
  { ID_PDV: "PDV008", CATEGORIE: "Smart Phone",    MARQUE: "ZTE NUBIA",Commercial: "ZTE NUBIA STORE",         Adresse: "Centre Commercial Bab Ezzouar",        Wilaya: "ALGER",     Telephone: "0567890123" },
  { ID_PDV: "PDV009", CATEGORIE: "PC SCHNEIDER",   MARQUE: "SCHNEIDER",Commercial: "SCHNEIDER INFORMATIQUE", Adresse: "Zone d'Activité Ain Bessam",           Wilaya: "BOUIRA",    Telephone: "0568901234" },
  { ID_PDV: "PDV010", CATEGORIE: "Électroménager", MARQUE: "NARDI",   Commercial: "NARDI MEDEA",              Adresse: "Boulevard Colonel Lotfi, Medea",       Wilaya: "MEDEA",     Telephone: "0569012345" },
  { ID_PDV: "PDV011", CATEGORIE: "Électroménager", MARQUE: "THOMSON", Commercial: "THOMSON DJELFA",           Adresse: "Cité des 1000 logts, Djelfa",          Wilaya: "DJELFA",    Telephone: "0550112233" },
  { ID_PDV: "PDV012", CATEGORIE: "Électroménager", MARQUE: "CONDOR",  Commercial: "CONDOR M'SILA",            Adresse: "Rue de l'Indépendance, M'Sila",        Wilaya: "MSILA",     Telephone: "0551223344" },
  { ID_PDV: "PDV013", CATEGORIE: "Électroménager", MARQUE: "GEANT",   Commercial: "GEANT ALGER",              Adresse: "Zone Commerciale Bab Ezzouar, Alger",  Wilaya: "ALGER",     Telephone: "0552334455" },
  { ID_PDV: "PDV014", CATEGORIE: "Électroménager", MARQUE: "HISENSE", Commercial: "HISENSE DJELFA",           Adresse: "RN 1 Km 5, Djelfa",                   Wilaya: "DJELFA",    Telephone: "0553445566" },
  { ID_PDV: "PDV015", CATEGORIE: "Électroménager", MARQUE: "RADIOLA", Commercial: "RADIOLA BOUIRA",           Adresse: "Cité 8 Mai 1945, Bouira",              Wilaya: "BOUIRA",    Telephone: "0554556677" },
];

// ─── CHECK-LIST ───────────────────────────────────────────────
export const CHECK_LIST_ITEMS: CheckListItem[] = [
  {
    fr: "Une demande d'un financement par mourabaha consommation",
    ar: "طلب التمويل الاستهلاكي بالمرابحة",
  },
  {
    fr: "Un extrait d'acte de naissance.",
    ar: "مستخرج من شهادة الميلاد",
  },
  {
    fr: "Acte de résidence",
    ar: "شهادة إقامة أو وثيقة إيواء",
  },
  {
    fr: "Une copie de CIN ou Permis de conduire en cours de validite",
    ar: "نسخة من بطاقة التعريف الوطنية أو رخصة السياقة قيد الصلاحية",
  },
  {
    fr: "Une attestation de travail récente justifiant un EDI",
    ar: "شهادة عمل حديثة مثبتة لعقد عمل غير محدد المدة أو الترسيم في المنصب",
  },
  {
    fr: "Les trois (3) dernières fiches de paie authentifiées par l'employeur, pour les salariés",
    ar: "كشف الراتب لـ 3 أشهر الأخيرة مؤشرة من طرف صاحب العمل، بالنسبة للأجراء",
  },
  {
    fr: "Un formulaire C20 délivré par l'administration fiscale pour les commerçants et les professions libérales",
    ar: "استمارة (C20) مستخرجة من مصلحة الضرائب بالنسبة للتجار وأصحاب المهن الحرة.",
  },
  {
    fr: "Une facture pro forma+ Attestaion de disponibilite+Attestation de fabricant ( documents fournis par le fournisseur )",
    ar: "فاتورة شكلية + شهادة توفر السلعة + شهادة الصانع (وثائق مقدمة من طرف المورد)",
  },
];
