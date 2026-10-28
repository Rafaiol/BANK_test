// =============================================================
// Complete Real Dataset extracted directly from Google Spreadsheet
// Spreadsheet ID: 1Jf0j1qNw7zEGrlWaddO8Y1A2F-6ls76NASdEz_8tWh8
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
  TAUX_DE_PROFIT: number;
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

// ─── AGENCES (9) ──────────────────────────────────────────────────
export const AGENCES: Agence[] = [
  {
    "CODE": "184",
    "AGENCE": "AGC BOUIRA"
  },
  {
    "CODE": "176",
    "AGENCE": "AGC LAKHDARIA"
  },
  {
    "CODE": "177",
    "AGENCE": "AGC SEG"
  },
  {
    "CODE": "128",
    "AGENCE": "AGC AIN BESSAM"
  },
  {
    "CODE": "324",
    "AGENCE": "AGC SIDI AISSA"
  },
  {
    "CODE": "191",
    "AGENCE": "AGC HASSI BAHBAH"
  },
  {
    "CODE": "190",
    "AGENCE": "AGC AIN OUSSERA"
  },
  {
    "CODE": "187",
    "AGENCE": "AGC DJELFA"
  },
  {
    "CODE": "159",
    "AGENCE": "AGC BERROUAGHIA"
  }
];

// ─── COUVERTURE AGENCES (22) ──────────────────────────────────────
export const COUVERTURE_AGENCE: CouvertureAgence[] = [
  {
    "CODE_AGENCE": "184",
    "NOM_AGENCE": "AGC BOUIRA",
    "WILAYA": "BOUIRA"
  },
  {
    "CODE_AGENCE": "184",
    "NOM_AGENCE": "AGC BOUIRA",
    "WILAYA": "BOUMERDES"
  },
  {
    "CODE_AGENCE": "184",
    "NOM_AGENCE": "AGC BOUIRA",
    "WILAYA": "ALGER"
  },
  {
    "CODE_AGENCE": "176",
    "NOM_AGENCE": "AGC LAKHDARIA",
    "WILAYA": "BOUIRA"
  },
  {
    "CODE_AGENCE": "176",
    "NOM_AGENCE": "AGC LAKHDARIA",
    "WILAYA": "BOUMERDES"
  },
  {
    "CODE_AGENCE": "176",
    "NOM_AGENCE": "AGC LAKHDARIA",
    "WILAYA": "ALGER"
  },
  {
    "CODE_AGENCE": "177",
    "NOM_AGENCE": "AGC SEG",
    "WILAYA": "BOUIRA"
  },
  {
    "CODE_AGENCE": "177",
    "NOM_AGENCE": "AGC SEG",
    "WILAYA": "BOUMERDES"
  },
  {
    "CODE_AGENCE": "177",
    "NOM_AGENCE": "AGC SEG",
    "WILAYA": "ALGER"
  },
  {
    "CODE_AGENCE": "324",
    "NOM_AGENCE": "AGC SIDI AISSA",
    "WILAYA": "MSILA"
  },
  {
    "CODE_AGENCE": "191",
    "NOM_AGENCE": "AGC HASSI BAHBAH",
    "WILAYA": "TISSEMSILT"
  },
  {
    "CODE_AGENCE": "191",
    "NOM_AGENCE": "AGC HASSI BAHBAH",
    "WILAYA": "DJELFA"
  },
  {
    "CODE_AGENCE": "190",
    "NOM_AGENCE": "AGC AIN OUSSERA",
    "WILAYA": "TISSEMSILT"
  },
  {
    "CODE_AGENCE": "190",
    "NOM_AGENCE": "AGC AIN OUSSERA",
    "WILAYA": "DJELFA"
  },
  {
    "CODE_AGENCE": "187",
    "NOM_AGENCE": "AGC DJELFA",
    "WILAYA": "TISSEMSILT"
  },
  {
    "CODE_AGENCE": "187",
    "NOM_AGENCE": "AGC DJELFA",
    "WILAYA": "DJELFA"
  },
  {
    "CODE_AGENCE": "128",
    "NOM_AGENCE": "AGC AIN BESSAM",
    "WILAYA": "BOUIRA"
  },
  {
    "CODE_AGENCE": "128",
    "NOM_AGENCE": "AGC AIN BESSAM",
    "WILAYA": "BOUMERDES"
  },
  {
    "CODE_AGENCE": "128",
    "NOM_AGENCE": "AGC AIN BESSAM",
    "WILAYA": "ALGER"
  },
  {
    "CODE_AGENCE": "159",
    "NOM_AGENCE": "AGC BERROUAGHIA",
    "WILAYA": "MEDEA"
  },
  {
    "CODE_AGENCE": "159",
    "NOM_AGENCE": "AGC BERROUAGHIA",
    "WILAYA": "BLIDA"
  },
  {
    "CODE_AGENCE": "159",
    "NOM_AGENCE": "AGC BERROUAGHIA",
    "WILAYA": "ALGER"
  }
];

// ─── TYPES CLIENT (10) ──────────────────────────────────────────
export const TYPES_CLIENT: TypeClient[] = [
  {
    "NOM_TYPE_CLIENT": "Client Ordinaire",
    "TAUX_DE_PROFIT": 0.085
  },
  {
    "NOM_TYPE_CLIENT": "CNR",
    "TAUX_DE_PROFIT": 0.065
  },
  {
    "NOM_TYPE_CLIENT": "IMC",
    "TAUX_DE_PROFIT": 0.04
  },
  {
    "NOM_TYPE_CLIENT": "Personnel Banque",
    "TAUX_DE_PROFIT": 0.03
  },
  {
    "NOM_TYPE_CLIENT": "Personnel SNL",
    "TAUX_DE_PROFIT": 0.03
  },
  {
    "NOM_TYPE_CLIENT": "Personnel AMANA",
    "TAUX_DE_PROFIT": 0.065
  },
  {
    "NOM_TYPE_CLIENT": "Personnel TRANSTEV SPA",
    "TAUX_DE_PROFIT": 0.065
  },
  {
    "NOM_TYPE_CLIENT": "Personnel CACOBATPH",
    "TAUX_DE_PROFIT": 0.065
  },
  {
    "NOM_TYPE_CLIENT": "Adhérent/Retraités CASNOS",
    "TAUX_DE_PROFIT": 0.065
  },
  {
    "NOM_TYPE_CLIENT": "SNADEP",
    "TAUX_DE_PROFIT": 0.065
  }
];

// ─── CATEGORIES (5) ──────────────────────────────────────────
export const CATEGORIES: Categorie[] = [
  {
    "CATEGORIE": "Électroménager"
  },
  {
    "CATEGORIE": "Meuble"
  },
  {
    "CATEGORIE": "Smart Phone"
  },
  {
    "CATEGORIE": "PC SCHNEIDER"
  },
  {
    "CATEGORIE": "Motor Cycle VMS"
  }
];

// ─── MARQUES (10) ─────────────────────────────────────────────
export const MARQUES: Marque[] = [
  {
    "MARQUE": "CONDOR",
    "LOGO": "MARQUE_Images/CONDOR.LOGO.213808.png"
  },
  {
    "MARQUE": "CRISTOR",
    "LOGO": "MARQUE_Images/CRISTOR.LOGO.213836.png"
  },
  {
    "MARQUE": "NARDI",
    "LOGO": "MARQUE_Images/NARDI.LOGO.005621.png"
  },
  {
    "MARQUE": "HISENSE",
    "LOGO": "MARQUE_Images/HISENSE.LOGO.005641.png"
  },
  {
    "MARQUE": "SAMSUNG",
    "LOGO": "MARQUE_Images/SAMSUNG.LOGO.005656.png"
  },
  {
    "MARQUE": "GEANT",
    "LOGO": "MARQUE_Images/GEANT.LOGO.005714.png"
  },
  {
    "MARQUE": "THOMSON",
    "LOGO": "MARQUE_Images/THOMSON.LOGO.214504.png"
  },
  {
    "MARQUE": "SCHNEIDER",
    "LOGO": "MARQUE_Images/SCHNEIDER.LOGO.212140.jpg"
  },
  {
    "MARQUE": "RADIOLA",
    "LOGO": "MARQUE_Images/RADIOLA.LOGO.213225.jpg"
  },
  {
    "MARQUE": "ZTE NUBIA",
    "LOGO": "MARQUE_Images/ZTE NUBIA.LOGO.213337.png"
  }
];

// ─── PRODUITS (160) ────────────────────────────────────────────
export const PRODUITS: Produit[] = [
  {
    "ID_PRODUIT": "PR001",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CONDOR",
    "PRODUIT_GENERIQUE": "Air Fryer"
  },
  {
    "ID_PRODUIT": "PR002",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CONDOR",
    "PRODUIT_GENERIQUE": "Aspirateur"
  },
  {
    "ID_PRODUIT": "PR003",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CONDOR",
    "PRODUIT_GENERIQUE": "Bain d'huile"
  },
  {
    "ID_PRODUIT": "PR004",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CONDOR",
    "PRODUIT_GENERIQUE": "Batteur"
  },
  {
    "ID_PRODUIT": "PR005",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CONDOR",
    "PRODUIT_GENERIQUE": "Blender"
  },
  {
    "ID_PRODUIT": "PR006",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CONDOR",
    "PRODUIT_GENERIQUE": "Climatisation Armoire"
  },
  {
    "ID_PRODUIT": "PR007",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CONDOR",
    "PRODUIT_GENERIQUE": "Climatisation Mobile"
  },
  {
    "ID_PRODUIT": "PR008",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CONDOR",
    "PRODUIT_GENERIQUE": "Climatiseur"
  },
  {
    "ID_PRODUIT": "PR009",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CONDOR",
    "PRODUIT_GENERIQUE": "Congélateur"
  },
  {
    "ID_PRODUIT": "PR010",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CONDOR",
    "PRODUIT_GENERIQUE": "Cuisinière"
  },
  {
    "ID_PRODUIT": "PR011",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CONDOR",
    "PRODUIT_GENERIQUE": "Hachoir"
  },
  {
    "ID_PRODUIT": "PR012",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CONDOR",
    "PRODUIT_GENERIQUE": "Lave Vaisselle"
  },
  {
    "ID_PRODUIT": "PR013",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CONDOR",
    "PRODUIT_GENERIQUE": "Machine à Laver"
  },
  {
    "ID_PRODUIT": "PR014",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CONDOR",
    "PRODUIT_GENERIQUE": "Machine à café"
  },
  {
    "ID_PRODUIT": "PR015",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CONDOR",
    "PRODUIT_GENERIQUE": "Mixeur"
  },
  {
    "ID_PRODUIT": "PR016",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CONDOR",
    "PRODUIT_GENERIQUE": "Pétrin"
  },
  {
    "ID_PRODUIT": "PR017",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CONDOR",
    "PRODUIT_GENERIQUE": "Radiateur à Gaz"
  },
  {
    "ID_PRODUIT": "PR018",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CONDOR",
    "PRODUIT_GENERIQUE": "Robot de Cuisine"
  },
  {
    "ID_PRODUIT": "PR019",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CONDOR",
    "PRODUIT_GENERIQUE": "Réfrigérateur"
  },
  {
    "ID_PRODUIT": "PR020",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CONDOR",
    "PRODUIT_GENERIQUE": "Téléviseur"
  },
  {
    "ID_PRODUIT": "PR021",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CRISTOR",
    "PRODUIT_GENERIQUE": "Air Fryer"
  },
  {
    "ID_PRODUIT": "PR022",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CRISTOR",
    "PRODUIT_GENERIQUE": "Aspirateur"
  },
  {
    "ID_PRODUIT": "PR023",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CRISTOR",
    "PRODUIT_GENERIQUE": "Bain d'huile"
  },
  {
    "ID_PRODUIT": "PR024",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CRISTOR",
    "PRODUIT_GENERIQUE": "Batteur"
  },
  {
    "ID_PRODUIT": "PR025",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CRISTOR",
    "PRODUIT_GENERIQUE": "Blender"
  },
  {
    "ID_PRODUIT": "PR026",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CRISTOR",
    "PRODUIT_GENERIQUE": "Climatisation Armoire"
  },
  {
    "ID_PRODUIT": "PR027",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CRISTOR",
    "PRODUIT_GENERIQUE": "Climatiseur"
  },
  {
    "ID_PRODUIT": "PR028",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CRISTOR",
    "PRODUIT_GENERIQUE": "Congélateur"
  },
  {
    "ID_PRODUIT": "PR029",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CRISTOR",
    "PRODUIT_GENERIQUE": "Cuisinière"
  },
  {
    "ID_PRODUIT": "PR030",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CRISTOR",
    "PRODUIT_GENERIQUE": "Encastrable, Four"
  },
  {
    "ID_PRODUIT": "PR031",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CRISTOR",
    "PRODUIT_GENERIQUE": "Encastrable, Hotte"
  },
  {
    "ID_PRODUIT": "PR032",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CRISTOR",
    "PRODUIT_GENERIQUE": "Encastrable, Micro-Onde"
  },
  {
    "ID_PRODUIT": "PR033",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CRISTOR",
    "PRODUIT_GENERIQUE": "Encastrable, Table de Cuisson"
  },
  {
    "ID_PRODUIT": "PR034",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CRISTOR",
    "PRODUIT_GENERIQUE": "Lave Vaisselle"
  },
  {
    "ID_PRODUIT": "PR035",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CRISTOR",
    "PRODUIT_GENERIQUE": "Machine à Laver"
  },
  {
    "ID_PRODUIT": "PR036",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CRISTOR",
    "PRODUIT_GENERIQUE": "Machine à café"
  },
  {
    "ID_PRODUIT": "PR037",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CRISTOR",
    "PRODUIT_GENERIQUE": "Micro-Onde"
  },
  {
    "ID_PRODUIT": "PR038",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CRISTOR",
    "PRODUIT_GENERIQUE": "Mini-four électrique"
  },
  {
    "ID_PRODUIT": "PR039",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CRISTOR",
    "PRODUIT_GENERIQUE": "Mixeur"
  },
  {
    "ID_PRODUIT": "PR040",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CRISTOR",
    "PRODUIT_GENERIQUE": "Pétrin"
  },
  {
    "ID_PRODUIT": "PR041",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CRISTOR",
    "PRODUIT_GENERIQUE": "Radiateur à Gaz"
  },
  {
    "ID_PRODUIT": "PR042",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CRISTOR",
    "PRODUIT_GENERIQUE": "Robot de Cuisine"
  },
  {
    "ID_PRODUIT": "PR043",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CRISTOR",
    "PRODUIT_GENERIQUE": "Réfrigérateur"
  },
  {
    "ID_PRODUIT": "PR044",
    "CATEGORIE": "Électroménager",
    "MARQUE": "CRISTOR",
    "PRODUIT_GENERIQUE": "Téléviseur"
  },
  {
    "ID_PRODUIT": "PR045",
    "CATEGORIE": "Électroménager",
    "MARQUE": "GEANT",
    "PRODUIT_GENERIQUE": "Bain d'huile"
  },
  {
    "ID_PRODUIT": "PR046",
    "CATEGORIE": "Électroménager",
    "MARQUE": "GEANT",
    "PRODUIT_GENERIQUE": "Blender"
  },
  {
    "ID_PRODUIT": "PR047",
    "CATEGORIE": "Électroménager",
    "MARQUE": "GEANT",
    "PRODUIT_GENERIQUE": "Chauffe Bain"
  },
  {
    "ID_PRODUIT": "PR048",
    "CATEGORIE": "Électroménager",
    "MARQUE": "GEANT",
    "PRODUIT_GENERIQUE": "Climatisation Mobile"
  },
  {
    "ID_PRODUIT": "PR049",
    "CATEGORIE": "Électroménager",
    "MARQUE": "GEANT",
    "PRODUIT_GENERIQUE": "Climatiseur"
  },
  {
    "ID_PRODUIT": "PR050",
    "CATEGORIE": "Électroménager",
    "MARQUE": "GEANT",
    "PRODUIT_GENERIQUE": "Congélateur"
  },
  {
    "ID_PRODUIT": "PR051",
    "CATEGORIE": "Électroménager",
    "MARQUE": "GEANT",
    "PRODUIT_GENERIQUE": "Cuisinière"
  },
  {
    "ID_PRODUIT": "PR052",
    "CATEGORIE": "Électroménager",
    "MARQUE": "GEANT",
    "PRODUIT_GENERIQUE": "Encastrable, Four"
  },
  {
    "ID_PRODUIT": "PR053",
    "CATEGORIE": "Électroménager",
    "MARQUE": "GEANT",
    "PRODUIT_GENERIQUE": "Encastrable, Hotte"
  },
  {
    "ID_PRODUIT": "PR054",
    "CATEGORIE": "Électroménager",
    "MARQUE": "GEANT",
    "PRODUIT_GENERIQUE": "Encastrable, Micro-Onde"
  },
  {
    "ID_PRODUIT": "PR055",
    "CATEGORIE": "Électroménager",
    "MARQUE": "GEANT",
    "PRODUIT_GENERIQUE": "Encastrable, Table de Cuisson"
  },
  {
    "ID_PRODUIT": "PR056",
    "CATEGORIE": "Électroménager",
    "MARQUE": "GEANT",
    "PRODUIT_GENERIQUE": "Hachoir"
  },
  {
    "ID_PRODUIT": "PR057",
    "CATEGORIE": "Électroménager",
    "MARQUE": "GEANT",
    "PRODUIT_GENERIQUE": "Lave Vaisselle"
  },
  {
    "ID_PRODUIT": "PR058",
    "CATEGORIE": "Électroménager",
    "MARQUE": "GEANT",
    "PRODUIT_GENERIQUE": "Machine à Laver"
  },
  {
    "ID_PRODUIT": "PR059",
    "CATEGORIE": "Électroménager",
    "MARQUE": "GEANT",
    "PRODUIT_GENERIQUE": "Machine à café"
  },
  {
    "ID_PRODUIT": "PR060",
    "CATEGORIE": "Électroménager",
    "MARQUE": "GEANT",
    "PRODUIT_GENERIQUE": "Micro-Onde"
  },
  {
    "ID_PRODUIT": "PR061",
    "CATEGORIE": "Électroménager",
    "MARQUE": "GEANT",
    "PRODUIT_GENERIQUE": "Mini-four électrique"
  },
  {
    "ID_PRODUIT": "PR062",
    "CATEGORIE": "Électroménager",
    "MARQUE": "GEANT",
    "PRODUIT_GENERIQUE": "Radiateur à Gaz"
  },
  {
    "ID_PRODUIT": "PR063",
    "CATEGORIE": "Électroménager",
    "MARQUE": "GEANT",
    "PRODUIT_GENERIQUE": "Réfrigérateur"
  },
  {
    "ID_PRODUIT": "PR064",
    "CATEGORIE": "Électroménager",
    "MARQUE": "GEANT",
    "PRODUIT_GENERIQUE": "Ventilateur"
  },
  {
    "ID_PRODUIT": "PR065",
    "CATEGORIE": "Électroménager",
    "MARQUE": "GEANT",
    "PRODUIT_GENERIQUE": "Pétrin"
  },
  {
    "ID_PRODUIT": "PR066",
    "CATEGORIE": "Électroménager",
    "MARQUE": "GEANT",
    "PRODUIT_GENERIQUE": "Téléviseur"
  },
  {
    "ID_PRODUIT": "PR067",
    "CATEGORIE": "Électroménager",
    "MARQUE": "HISENSE",
    "PRODUIT_GENERIQUE": "Aspirateur"
  },
  {
    "ID_PRODUIT": "PR068",
    "CATEGORIE": "Électroménager",
    "MARQUE": "HISENSE",
    "PRODUIT_GENERIQUE": "Blender"
  },
  {
    "ID_PRODUIT": "PR069",
    "CATEGORIE": "Électroménager",
    "MARQUE": "HISENSE",
    "PRODUIT_GENERIQUE": "Climatiseur"
  },
  {
    "ID_PRODUIT": "PR070",
    "CATEGORIE": "Électroménager",
    "MARQUE": "HISENSE",
    "PRODUIT_GENERIQUE": "Congélateur"
  },
  {
    "ID_PRODUIT": "PR071",
    "CATEGORIE": "Électroménager",
    "MARQUE": "HISENSE",
    "PRODUIT_GENERIQUE": "Machine à Laver"
  },
  {
    "ID_PRODUIT": "PR072",
    "CATEGORIE": "Électroménager",
    "MARQUE": "HISENSE",
    "PRODUIT_GENERIQUE": "Micro-Onde"
  },
  {
    "ID_PRODUIT": "PR073",
    "CATEGORIE": "Électroménager",
    "MARQUE": "HISENSE",
    "PRODUIT_GENERIQUE": "Réfrigérateur"
  },
  {
    "ID_PRODUIT": "PR074",
    "CATEGORIE": "Électroménager",
    "MARQUE": "HISENSE",
    "PRODUIT_GENERIQUE": "Téléviseur"
  },
  {
    "ID_PRODUIT": "PR075",
    "CATEGORIE": "Électroménager",
    "MARQUE": "NARDI",
    "PRODUIT_GENERIQUE": "Air Fryer"
  },
  {
    "ID_PRODUIT": "PR076",
    "CATEGORIE": "Électroménager",
    "MARQUE": "NARDI",
    "PRODUIT_GENERIQUE": "Climatiseur"
  },
  {
    "ID_PRODUIT": "PR077",
    "CATEGORIE": "Électroménager",
    "MARQUE": "NARDI",
    "PRODUIT_GENERIQUE": "Congélateur"
  },
  {
    "ID_PRODUIT": "PR078",
    "CATEGORIE": "Électroménager",
    "MARQUE": "NARDI",
    "PRODUIT_GENERIQUE": "Encastrable, Four"
  },
  {
    "ID_PRODUIT": "PR079",
    "CATEGORIE": "Électroménager",
    "MARQUE": "NARDI",
    "PRODUIT_GENERIQUE": "Encastrable, Hotte"
  },
  {
    "ID_PRODUIT": "PR080",
    "CATEGORIE": "Électroménager",
    "MARQUE": "NARDI",
    "PRODUIT_GENERIQUE": "Encastrable, Micro-Onde"
  },
  {
    "ID_PRODUIT": "PR081",
    "CATEGORIE": "Électroménager",
    "MARQUE": "NARDI",
    "PRODUIT_GENERIQUE": "Encastrable, Table de Cuisson"
  },
  {
    "ID_PRODUIT": "PR082",
    "CATEGORIE": "Électroménager",
    "MARQUE": "NARDI",
    "PRODUIT_GENERIQUE": "Lave Vaisselle"
  },
  {
    "ID_PRODUIT": "PR083",
    "CATEGORIE": "Électroménager",
    "MARQUE": "NARDI",
    "PRODUIT_GENERIQUE": "Machine à Laver"
  },
  {
    "ID_PRODUIT": "PR084",
    "CATEGORIE": "Électroménager",
    "MARQUE": "NARDI",
    "PRODUIT_GENERIQUE": "Machine à café"
  },
  {
    "ID_PRODUIT": "PR085",
    "CATEGORIE": "Électroménager",
    "MARQUE": "NARDI",
    "PRODUIT_GENERIQUE": "Micro-Onde"
  },
  {
    "ID_PRODUIT": "PR086",
    "CATEGORIE": "Électroménager",
    "MARQUE": "NARDI",
    "PRODUIT_GENERIQUE": "Mini-four électrique"
  },
  {
    "ID_PRODUIT": "PR087",
    "CATEGORIE": "Électroménager",
    "MARQUE": "NARDI",
    "PRODUIT_GENERIQUE": "Pétrin"
  },
  {
    "ID_PRODUIT": "PR088",
    "CATEGORIE": "Électroménager",
    "MARQUE": "NARDI",
    "PRODUIT_GENERIQUE": "Réfrigérateur"
  },
  {
    "ID_PRODUIT": "PR089",
    "CATEGORIE": "Électroménager",
    "MARQUE": "SAMSUNG",
    "PRODUIT_GENERIQUE": "Aspirateur"
  },
  {
    "ID_PRODUIT": "PR090",
    "CATEGORIE": "Électroménager",
    "MARQUE": "SAMSUNG",
    "PRODUIT_GENERIQUE": "Climatiseur"
  },
  {
    "ID_PRODUIT": "PR091",
    "CATEGORIE": "Électroménager",
    "MARQUE": "SAMSUNG",
    "PRODUIT_GENERIQUE": "Lave Vaisselle"
  },
  {
    "ID_PRODUIT": "PR092",
    "CATEGORIE": "Électroménager",
    "MARQUE": "SAMSUNG",
    "PRODUIT_GENERIQUE": "Machine à Laver"
  },
  {
    "ID_PRODUIT": "PR093",
    "CATEGORIE": "Électroménager",
    "MARQUE": "SAMSUNG",
    "PRODUIT_GENERIQUE": "Micro-Onde"
  },
  {
    "ID_PRODUIT": "PR094",
    "CATEGORIE": "Électroménager",
    "MARQUE": "SAMSUNG",
    "PRODUIT_GENERIQUE": "Réfrigérateur"
  },
  {
    "ID_PRODUIT": "PR095",
    "CATEGORIE": "Électroménager",
    "MARQUE": "SAMSUNG",
    "PRODUIT_GENERIQUE": "Téléviseur"
  },
  {
    "ID_PRODUIT": "PR096",
    "CATEGORIE": "Électroménager",
    "MARQUE": "THOMSON",
    "PRODUIT_GENERIQUE": "Téléviseur"
  },
  {
    "ID_PRODUIT": "PR097",
    "CATEGORIE": "Électroménager",
    "MARQUE": "THOMSON",
    "PRODUIT_GENERIQUE": "Micro-Onde"
  },
  {
    "ID_PRODUIT": "PR098",
    "CATEGORIE": "Électroménager",
    "MARQUE": "THOMSON",
    "PRODUIT_GENERIQUE": "Cuisinière"
  },
  {
    "ID_PRODUIT": "PR099",
    "CATEGORIE": "Électroménager",
    "MARQUE": "THOMSON",
    "PRODUIT_GENERIQUE": "Encastrable, Four"
  },
  {
    "ID_PRODUIT": "PR100",
    "CATEGORIE": "Électroménager",
    "MARQUE": "THOMSON",
    "PRODUIT_GENERIQUE": "Hotte"
  },
  {
    "ID_PRODUIT": "PR101",
    "CATEGORIE": "Électroménager",
    "MARQUE": "THOMSON",
    "PRODUIT_GENERIQUE": "Plaque"
  },
  {
    "ID_PRODUIT": "PR102",
    "CATEGORIE": "Électroménager",
    "MARQUE": "THOMSON",
    "PRODUIT_GENERIQUE": "Climatiseur"
  },
  {
    "ID_PRODUIT": "PR103",
    "CATEGORIE": "Électroménager",
    "MARQUE": "THOMSON",
    "PRODUIT_GENERIQUE": "Congélateur"
  },
  {
    "ID_PRODUIT": "PR104",
    "CATEGORIE": "Électroménager",
    "MARQUE": "THOMSON",
    "PRODUIT_GENERIQUE": "Machine à Laver"
  },
  {
    "ID_PRODUIT": "PR105",
    "CATEGORIE": "Électroménager",
    "MARQUE": "THOMSON",
    "PRODUIT_GENERIQUE": "Lave Vaisselle"
  },
  {
    "ID_PRODUIT": "PR106",
    "CATEGORIE": "Électroménager",
    "MARQUE": "THOMSON",
    "PRODUIT_GENERIQUE": "Couscoussier électrique"
  },
  {
    "ID_PRODUIT": "PR107",
    "CATEGORIE": "Électroménager",
    "MARQUE": "THOMSON",
    "PRODUIT_GENERIQUE": "Sorbetière"
  },
  {
    "ID_PRODUIT": "PR108",
    "CATEGORIE": "Électroménager",
    "MARQUE": "THOMSON",
    "PRODUIT_GENERIQUE": "Robot Pétrin Multifonction"
  },
  {
    "ID_PRODUIT": "PR109",
    "CATEGORIE": "Électroménager",
    "MARQUE": "THOMSON",
    "PRODUIT_GENERIQUE": "Robot Pétrin Patissier"
  },
  {
    "ID_PRODUIT": "PR110",
    "CATEGORIE": "Électroménager",
    "MARQUE": "THOMSON",
    "PRODUIT_GENERIQUE": "Blender"
  },
  {
    "ID_PRODUIT": "PR111",
    "CATEGORIE": "Électroménager",
    "MARQUE": "THOMSON",
    "PRODUIT_GENERIQUE": "Bras Mixeur Inox /Batteur"
  },
  {
    "ID_PRODUIT": "PR112",
    "CATEGORIE": "Électroménager",
    "MARQUE": "THOMSON",
    "PRODUIT_GENERIQUE": "Air Fryer"
  },
  {
    "ID_PRODUIT": "PR113",
    "CATEGORIE": "Électroménager",
    "MARQUE": "THOMSON",
    "PRODUIT_GENERIQUE": "Bouilloire"
  },
  {
    "ID_PRODUIT": "PR114",
    "CATEGORIE": "Électroménager",
    "MARQUE": "THOMSON",
    "PRODUIT_GENERIQUE": "Hachoir"
  },
  {
    "ID_PRODUIT": "PR115",
    "CATEGORIE": "Électroménager",
    "MARQUE": "THOMSON",
    "PRODUIT_GENERIQUE": "Réfrigérateur"
  },
  {
    "ID_PRODUIT": "PR116",
    "CATEGORIE": "Électroménager",
    "MARQUE": "SCHNEIDER",
    "PRODUIT_GENERIQUE": "Téléviseur"
  },
  {
    "ID_PRODUIT": "PR117",
    "CATEGORIE": "Électroménager",
    "MARQUE": "SCHNEIDER",
    "PRODUIT_GENERIQUE": "Micro-Onde"
  },
  {
    "ID_PRODUIT": "PR118",
    "CATEGORIE": "Électroménager",
    "MARQUE": "SCHNEIDER",
    "PRODUIT_GENERIQUE": "Cuisinière"
  },
  {
    "ID_PRODUIT": "PR119",
    "CATEGORIE": "Électroménager",
    "MARQUE": "SCHNEIDER",
    "PRODUIT_GENERIQUE": "Encastrable, Four"
  },
  {
    "ID_PRODUIT": "PR120",
    "CATEGORIE": "Électroménager",
    "MARQUE": "SCHNEIDER",
    "PRODUIT_GENERIQUE": "Encastrable, Plaque"
  },
  {
    "ID_PRODUIT": "PR121",
    "CATEGORIE": "Électroménager",
    "MARQUE": "SCHNEIDER",
    "PRODUIT_GENERIQUE": "Encastrable, Hotte"
  },
  {
    "ID_PRODUIT": "PR122",
    "CATEGORIE": "Électroménager",
    "MARQUE": "SCHNEIDER",
    "PRODUIT_GENERIQUE": "Four"
  },
  {
    "ID_PRODUIT": "PR123",
    "CATEGORIE": "Électroménager",
    "MARQUE": "SCHNEIDER",
    "PRODUIT_GENERIQUE": "Plaque"
  },
  {
    "ID_PRODUIT": "PR124",
    "CATEGORIE": "Électroménager",
    "MARQUE": "SCHNEIDER",
    "PRODUIT_GENERIQUE": "Hotte"
  },
  {
    "ID_PRODUIT": "PR125",
    "CATEGORIE": "Électroménager",
    "MARQUE": "SCHNEIDER",
    "PRODUIT_GENERIQUE": "Machine à Laver"
  },
  {
    "ID_PRODUIT": "PR126",
    "CATEGORIE": "Électroménager",
    "MARQUE": "SCHNEIDER",
    "PRODUIT_GENERIQUE": "Blender"
  },
  {
    "ID_PRODUIT": "PR127",
    "CATEGORIE": "Électroménager",
    "MARQUE": "SCHNEIDER",
    "PRODUIT_GENERIQUE": "Pétrin Monofontion"
  },
  {
    "ID_PRODUIT": "PR128",
    "CATEGORIE": "Électroménager",
    "MARQUE": "SCHNEIDER",
    "PRODUIT_GENERIQUE": "Pétrin Multifonction"
  },
  {
    "ID_PRODUIT": "PR129",
    "CATEGORIE": "Électroménager",
    "MARQUE": "SCHNEIDER",
    "PRODUIT_GENERIQUE": "Presse Agrumes"
  },
  {
    "ID_PRODUIT": "PR130",
    "CATEGORIE": "Électroménager",
    "MARQUE": "SCHNEIDER",
    "PRODUIT_GENERIQUE": "Bouilloire"
  },
  {
    "ID_PRODUIT": "PR131",
    "CATEGORIE": "Électroménager",
    "MARQUE": "SCHNEIDER",
    "PRODUIT_GENERIQUE": "Batteur"
  },
  {
    "ID_PRODUIT": "PR132",
    "CATEGORIE": "Électroménager",
    "MARQUE": "SCHNEIDER",
    "PRODUIT_GENERIQUE": "Cafetière multicapsules"
  },
  {
    "ID_PRODUIT": "PR133",
    "CATEGORIE": "Électroménager",
    "MARQUE": "SCHNEIDER",
    "PRODUIT_GENERIQUE": "Cafetière 2 en 1"
  },
  {
    "ID_PRODUIT": "PR134",
    "CATEGORIE": "Électroménager",
    "MARQUE": "SCHNEIDER",
    "PRODUIT_GENERIQUE": "Airfryer"
  },
  {
    "ID_PRODUIT": "PR135",
    "CATEGORIE": "Électroménager",
    "MARQUE": "SCHNEIDER",
    "PRODUIT_GENERIQUE": "Hachoir"
  },
  {
    "ID_PRODUIT": "PR136",
    "CATEGORIE": "Électroménager",
    "MARQUE": "RADIOLA",
    "PRODUIT_GENERIQUE": "Téléviseur"
  },
  {
    "ID_PRODUIT": "PR137",
    "CATEGORIE": "Smart Phone",
    "MARQUE": "ZTE NUBIA",
    "PRODUIT_GENERIQUE": "ZTE-BLADE-A35E-IG"
  },
  {
    "ID_PRODUIT": "PR138",
    "CATEGORIE": "Smart Phone",
    "MARQUE": "ZTE NUBIA",
    "PRODUIT_GENERIQUE": "ZTE-BLADE-A35E-RP"
  },
  {
    "ID_PRODUIT": "PR139",
    "CATEGORIE": "Smart Phone",
    "MARQUE": "ZTE NUBIA",
    "PRODUIT_GENERIQUE": "ZTE-BLADE-A35E-SG"
  },
  {
    "ID_PRODUIT": "PR140",
    "CATEGORIE": "Smart Phone",
    "MARQUE": "ZTE NUBIA",
    "PRODUIT_GENERIQUE": "ZTE-BLADE-A35EIG64"
  },
  {
    "ID_PRODUIT": "PR141",
    "CATEGORIE": "Smart Phone",
    "MARQUE": "ZTE NUBIA",
    "PRODUIT_GENERIQUE": "ZTE-BLADE-A35ERP64"
  },
  {
    "ID_PRODUIT": "PR142",
    "CATEGORIE": "Smart Phone",
    "MARQUE": "ZTE NUBIA",
    "PRODUIT_GENERIQUE": "ZTE-BLADE-A35ESG64"
  },
  {
    "ID_PRODUIT": "PR143",
    "CATEGORIE": "Smart Phone",
    "MARQUE": "ZTE NUBIA",
    "PRODUIT_GENERIQUE": "ZTE-BLADE-A35-SB"
  },
  {
    "ID_PRODUIT": "PR144",
    "CATEGORIE": "Smart Phone",
    "MARQUE": "ZTE NUBIA",
    "PRODUIT_GENERIQUE": "ZTE-BLADE-A35-CG"
  },
  {
    "ID_PRODUIT": "PR145",
    "CATEGORIE": "Smart Phone",
    "MARQUE": "ZTE NUBIA",
    "PRODUIT_GENERIQUE": "ZTE-BLADE-A36-NB"
  },
  {
    "ID_PRODUIT": "PR146",
    "CATEGORIE": "Smart Phone",
    "MARQUE": "ZTE NUBIA",
    "PRODUIT_GENERIQUE": "ZTE-BLADE-A36-AG"
  },
  {
    "ID_PRODUIT": "PR147",
    "CATEGORIE": "Smart Phone",
    "MARQUE": "ZTE NUBIA",
    "PRODUIT_GENERIQUE": "ZTE-BLADE-A36-TG"
  },
  {
    "ID_PRODUIT": "PR148",
    "CATEGORIE": "Smart Phone",
    "MARQUE": "ZTE NUBIA",
    "PRODUIT_GENERIQUE": "ZTE-BLADE-A55-SB"
  },
  {
    "ID_PRODUIT": "PR149",
    "CATEGORIE": "Smart Phone",
    "MARQUE": "ZTE NUBIA",
    "PRODUIT_GENERIQUE": "ZTE-BLADE-A55-WB"
  },
  {
    "ID_PRODUIT": "PR150",
    "CATEGORIE": "Smart Phone",
    "MARQUE": "ZTE NUBIA",
    "PRODUIT_GENERIQUE": "ZTE-BLADE-A56-CB"
  },
  {
    "ID_PRODUIT": "PR151",
    "CATEGORIE": "Smart Phone",
    "MARQUE": "ZTE NUBIA",
    "PRODUIT_GENERIQUE": "ZTE-BLADE-A56-FG"
  },
  {
    "ID_PRODUIT": "PR152",
    "CATEGORIE": "Smart Phone",
    "MARQUE": "ZTE NUBIA",
    "PRODUIT_GENERIQUE": "ZTE-NUBIA-MUSIC"
  },
  {
    "ID_PRODUIT": "PR153",
    "CATEGORIE": "Smart Phone",
    "MARQUE": "ZTE NUBIA",
    "PRODUIT_GENERIQUE": "ZTE-BLADE-V70MX-LG"
  },
  {
    "ID_PRODUIT": "PR154",
    "CATEGORIE": "Smart Phone",
    "MARQUE": "ZTE NUBIA",
    "PRODUIT_GENERIQUE": "ZTE-BLADE-V70MX-GG"
  },
  {
    "ID_PRODUIT": "PR155",
    "CATEGORIE": "Smart Phone",
    "MARQUE": "ZTE NUBIA",
    "PRODUIT_GENERIQUE": "ZTE-BLADE-A765G-SB"
  },
  {
    "ID_PRODUIT": "PR156",
    "CATEGORIE": "Smart Phone",
    "MARQUE": "ZTE NUBIA",
    "PRODUIT_GENERIQUE": "ZTE-BLADE-A765G-GB"
  },
  {
    "ID_PRODUIT": "PR157",
    "CATEGORIE": "Smart Phone",
    "MARQUE": "ZTE NUBIA",
    "PRODUIT_GENERIQUE": "NUBIA-NEO-3-4G-SB"
  },
  {
    "ID_PRODUIT": "PR158",
    "CATEGORIE": "Smart Phone",
    "MARQUE": "ZTE NUBIA",
    "PRODUIT_GENERIQUE": "NUBIA-NEO-3-4G-TG"
  },
  {
    "ID_PRODUIT": "PR159",
    "CATEGORIE": "Smart Phone",
    "MARQUE": "ZTE NUBIA",
    "PRODUIT_GENERIQUE": "NUBIA-NEO-3-5G-SB"
  },
  {
    "ID_PRODUIT": "PR160",
    "CATEGORIE": "Smart Phone",
    "MARQUE": "ZTE NUBIA",
    "PRODUIT_GENERIQUE": "NUBIA-NEO-3-5G-CS"
  }
];

// ─── POINTS DE VENTE (61) ───────────────────────────────────────
export const POINTS_DE_VENTE: PointDeVente[] = [
  {
    "ID_PDV": "PDV041",
    "CATEGORIE": "Électroménager",
    "MARQUE": "NARDI",
    "Commercial": "SAADI LAKHDAR",
    "Adresse": "CITE DE LHOPITAL CLASSE 142 PRP 330,DJELFA",
    "Wilaya": "DJELFA",
    "Telephone": "770169009"
  },
  {
    "ID_PDV": "PDV042",
    "CATEGORIE": "Électroménager",
    "MARQUE": "NARDI",
    "Commercial": "SAHLAOUI FAYCAL",
    "Adresse": "CENTRE VILLE DJELFA",
    "Wilaya": "DJELFA",
    "Telephone": "05 60 92 07 52"
  },
  {
    "ID_PDV": "PDV043",
    "CATEGORIE": "Électroménager",
    "MARQUE": "NARDI",
    "Commercial": "SAADI RABIÈ",
    "Adresse": "LOCAL N° 02 CITE HOUARI BOUMEDYEN BERHOUN,MSILA",
    "Wilaya": "MSILA",
    "Telephone": "07 94 47 46 08"
  },
  {
    "ID_PDV": "PDV044",
    "CATEGORIE": "Électroménager",
    "MARQUE": "NARDI",
    "Commercial": "SARL ELECTRO ELITE",
    "Adresse": "QUARTIER TAKBOU RDC GP N 47 SECTION 95,MEDEA",
    "Wilaya": "MEDEA",
    "Telephone": "05 52 01 04 72"
  },
  {
    "ID_PDV": "PDV045",
    "CATEGORIE": "Électroménager",
    "MARQUE": "NARDI",
    "Commercial": "SARL ELECTRO ROYAL BLIDA",
    "Adresse": "BLIDA",
    "Wilaya": "BLIDA",
    "Telephone": "05 60 46 93 39"
  },
  {
    "ID_PDV": "PDV046",
    "CATEGORIE": "Électroménager",
    "MARQUE": "HISENSE",
    "Commercial": "BOUSBIA SALAH MAHDI",
    "Adresse": "RUE KRITLI MOKHTAR PROJET 23 LOGTS PROM RDC,BLIDA",
    "Wilaya": "BLIDA",
    "Telephone": "0550 96 80 20"
  },
  {
    "ID_PDV": "PDV047",
    "CATEGORIE": "Électroménager",
    "MARQUE": "HISENSE",
    "Commercial": "EURL AKRAM NOR TRADING",
    "Adresse": "CITE HAERKAT RUE AIN BESSA DJENAH A,BOUIRA",
    "Wilaya": "BOUIRA",
    "Telephone": "05 42 13 02 93"
  },
  {
    "ID_PDV": "PDV048",
    "CATEGORIE": "Électroménager",
    "MARQUE": "HISENSE",
    "Commercial": "ALOUANI MOKHTAR",
    "Adresse": "CITE HARKATE BOUIRA",
    "Wilaya": "BOUIRA",
    "Telephone": "07 77 12 36 48"
  },
  {
    "ID_PDV": "PDV049",
    "CATEGORIE": "Électroménager",
    "MARQUE": "HISENSE",
    "Commercial": "SAADI LAKHDAR",
    "Adresse": "CITE DE LHOPITAL CLASSE 142 PRP 330,DJELFA",
    "Wilaya": "DJELFA",
    "Telephone": "0 7 70 16 90 09"
  },
  {
    "ID_PDV": "PDV050",
    "CATEGORIE": "Électroménager",
    "MARQUE": "HISENSE",
    "Commercial": "SAHLAOUI FAYCAL",
    "Adresse": "CENTRE VILLE DJELFA",
    "Wilaya": "DJELFA",
    "Telephone": "0 5 60 92 07 52"
  },
  {
    "ID_PDV": "PDV051",
    "CATEGORIE": "Électroménager",
    "MARQUE": "HISENSE",
    "Commercial": "SAADI RABIÈ",
    "Adresse": "LOCAL N° 02 CITE HOUARI BOUMEDYEN BERHOUN,MSILA",
    "Wilaya": "MSILA",
    "Telephone": "07 94 47 46 08"
  },
  {
    "ID_PDV": "PDV052",
    "CATEGORIE": "Électroménager",
    "MARQUE": "HISENSE",
    "Commercial": "SARL ELECTRO ELITE",
    "Adresse": "QUARTIER TAKBOU RDC GP N 47 SECTION 95,MEDEA",
    "Wilaya": "MEDEA",
    "Telephone": "05 52 01 04 72"
  },
  {
    "ID_PDV": "PDV053",
    "CATEGORIE": "Électroménager",
    "MARQUE": "HISENSE",
    "Commercial": "SARL ELECTRO ROYAL BLIDA",
    "Adresse": "BLIDA",
    "Wilaya": "BLIDA",
    "Telephone": "05 60 46 93 39"
  },
  {
    "ID_PDV": "PDV054",
    "CATEGORIE": "Électroménager",
    "MARQUE": "GEANT",
    "Commercial": "LAHRECH ISHAK",
    "Adresse": "DJELFA",
    "Wilaya": "DJELFA",
    "Telephone": "05 40 01 54 77"
  },
  {
    "ID_PDV": "PDV055",
    "CATEGORIE": "Électroménager",
    "MARQUE": "GEANT",
    "Commercial": "SEDDAS KADDOUR",
    "Adresse": "HASSI BAH BAH",
    "Wilaya": "DJELFA",
    "Telephone": "0 6 65 68 69 57"
  },
  {
    "ID_PDV": "PDV056",
    "CATEGORIE": "Électroménager",
    "MARQUE": "SAMSUNG",
    "Commercial": "SADKI EL HADJ",
    "Adresse": "RUE SIDI NAIL SEC 142 GP 04 DJELFA 17000",
    "Wilaya": "DJELFA",
    "Telephone": "0 6 65 12 01 05"
  },
  {
    "ID_PDV": "PDV057",
    "CATEGORIE": "Électroménager",
    "MARQUE": "SAMSUNG",
    "Commercial": "TIDY HOUSSE",
    "Adresse": "LDT HAOUCHE SAID RN 05 N U11 U12 U15 U16 U17 CENTRE COM UNO BOUIRA",
    "Wilaya": "ALGER",
    "Telephone": "0 5 50 07 45 45"
  },
  {
    "ID_PDV": "PDV058",
    "CATEGORIE": "Meuble",
    "MARQUE": "",
    "Commercial": "SAADAOUI MOHAMED",
    "Adresse": "TISSEMSILT",
    "Wilaya": "TISSEMSILT",
    "Telephone": "0 7 70 70 57 74"
  },
  {
    "ID_PDV": "PDV059",
    "CATEGORIE": "Meuble",
    "MARQUE": "",
    "Commercial": "EL AMIRA ROZA",
    "Adresse": "M'SILA",
    "Wilaya": "MSILA",
    "Telephone": ""
  },
  {
    "ID_PDV": "PDV060",
    "CATEGORIE": "Meuble",
    "MARQUE": "",
    "Commercial": "FENIX",
    "Adresse": "OULAD BOUTOLA, BAT 09, BLOC A, LOT 09 ET 10, AMAR KHOUDJA, BOUIRA",
    "Wilaya": "BOUIRA",
    "Telephone": "06 60 73 33 42"
  },
  {
    "ID_PDV": "PDV061",
    "CATEGORIE": "Meuble",
    "MARQUE": "",
    "Commercial": "QUARTIER CONFORT DE SCS",
    "Adresse": "BIRKHADEM",
    "Wilaya": "ALGER",
    "Telephone": "05 55 62 74 31"
  },
  {
    "ID_PDV": "PDV062",
    "CATEGORIE": "Électroménager",
    "MARQUE": "THOMSON",
    "Commercial": "PDV SACOMI",
    "Adresse": "Ain Allah",
    "Wilaya": "ALGER",
    "Telephone": "0 7 70 27 11 11 / 07 70 51 69 85"
  },
  {
    "ID_PDV": "PDV063",
    "CATEGORIE": "Électroménager",
    "MARQUE": "THOMSON",
    "Commercial": "PDV SACOMI",
    "Adresse": "Hamiz",
    "Wilaya": "ALGER",
    "Telephone": "0 770 82 32 04"
  },
  {
    "ID_PDV": "PDV064",
    "CATEGORIE": "Électroménager",
    "MARQUE": "THOMSON",
    "Commercial": "PDV SACOMI",
    "Adresse": "Kouba",
    "Wilaya": "ALGER",
    "Telephone": "0 770 94 84 28"
  },
  {
    "ID_PDV": "PDV065",
    "CATEGORIE": "Électroménager",
    "MARQUE": "THOMSON",
    "Commercial": "PDV SACOMI",
    "Adresse": "Bordj el bahri",
    "Wilaya": "ALGER",
    "Telephone": "0 770 84 80 62"
  },
  {
    "ID_PDV": "PDV066",
    "CATEGORIE": "Électroménager",
    "MARQUE": "THOMSON",
    "Commercial": "PDV SACOMI",
    "Adresse": "Eucalyptus",
    "Wilaya": "ALGER",
    "Telephone": "0 770 13 59 28"
  },
  {
    "ID_PDV": "PDV067",
    "CATEGORIE": "Électroménager",
    "MARQUE": "THOMSON",
    "Commercial": "PDV SACOMI",
    "Adresse": "Baraki",
    "Wilaya": "ALGER",
    "Telephone": "0 771 93 36 78"
  },
  {
    "ID_PDV": "PDV068",
    "CATEGORIE": "Électroménager",
    "MARQUE": "THOMSON",
    "Commercial": "PDV SACOMI",
    "Adresse": "Oran",
    "Wilaya": "ALGER",
    "Telephone": "0 770 63 14 16"
  },
  {
    "ID_PDV": "PDV069",
    "CATEGORIE": "Électroménager",
    "MARQUE": "THOMSON",
    "Commercial": "PDV SACOMI",
    "Adresse": "Tiaret",
    "Wilaya": "TIARET",
    "Telephone": "0 673 07 86 46"
  },
  {
    "ID_PDV": "PDV070",
    "CATEGORIE": "Électroménager",
    "MARQUE": "SCHNEIDER",
    "Commercial": "PDV SACOMI",
    "Adresse": "Ain Allah",
    "Wilaya": "ALGER",
    "Telephone": "0 7 70 27 11 11 / 07 70 51 69 85"
  },
  {
    "ID_PDV": "PDV071",
    "CATEGORIE": "Électroménager",
    "MARQUE": "SCHNEIDER",
    "Commercial": "PDV SACOMI",
    "Adresse": "Hamiz",
    "Wilaya": "ALGER",
    "Telephone": "0 770 82 32 04"
  },
  {
    "ID_PDV": "PDV072",
    "CATEGORIE": "Électroménager",
    "MARQUE": "SCHNEIDER",
    "Commercial": "PDV SACOMI",
    "Adresse": "Kouba",
    "Wilaya": "ALGER",
    "Telephone": "0 770 94 84 28"
  },
  {
    "ID_PDV": "PDV073",
    "CATEGORIE": "Électroménager",
    "MARQUE": "SCHNEIDER",
    "Commercial": "PDV SACOMI",
    "Adresse": "Bordj el bahri",
    "Wilaya": "ALGER",
    "Telephone": "0 770 84 80 62"
  },
  {
    "ID_PDV": "PDV074",
    "CATEGORIE": "Électroménager",
    "MARQUE": "SCHNEIDER",
    "Commercial": "PDV SACOMI",
    "Adresse": "Eucalyptus",
    "Wilaya": "ALGER",
    "Telephone": "0 770 13 59 28"
  },
  {
    "ID_PDV": "PDV075",
    "CATEGORIE": "Électroménager",
    "MARQUE": "SCHNEIDER",
    "Commercial": "PDV SACOMI",
    "Adresse": "Baraki",
    "Wilaya": "ALGER",
    "Telephone": "0 771 93 36 78"
  },
  {
    "ID_PDV": "PDV076",
    "CATEGORIE": "Électroménager",
    "MARQUE": "SCHNEIDER",
    "Commercial": "PDV SACOMI",
    "Adresse": "Oran",
    "Wilaya": "ORAN",
    "Telephone": "0 770 63 14 16"
  },
  {
    "ID_PDV": "PDV077",
    "CATEGORIE": "Électroménager",
    "MARQUE": "SCHNEIDER",
    "Commercial": "PDV SACOMI",
    "Adresse": "Tiaret",
    "Wilaya": "TIARET",
    "Telephone": "0 673 07 86 46"
  },
  {
    "ID_PDV": "PDV078",
    "CATEGORIE": "Électroménager",
    "MARQUE": "RADIOLA",
    "Commercial": "PDV SACOMI",
    "Adresse": "Ain Allah",
    "Wilaya": "ALGER",
    "Telephone": "0 7 70 27 11 11 / 07 70 51 69 85"
  },
  {
    "ID_PDV": "PDV079",
    "CATEGORIE": "Électroménager",
    "MARQUE": "RADIOLA",
    "Commercial": "PDV SACOMI",
    "Adresse": "Hamiz",
    "Wilaya": "ALGER",
    "Telephone": "0 770 82 32 04"
  },
  {
    "ID_PDV": "PDV080",
    "CATEGORIE": "Électroménager",
    "MARQUE": "RADIOLA",
    "Commercial": "PDV SACOMI",
    "Adresse": "Kouba",
    "Wilaya": "ALGER",
    "Telephone": "0 770 94 84 28"
  },
  {
    "ID_PDV": "PDV081",
    "CATEGORIE": "Électroménager",
    "MARQUE": "RADIOLA",
    "Commercial": "PDV SACOMI",
    "Adresse": "Bordj el bahri",
    "Wilaya": "ALGER",
    "Telephone": "0 770 84 80 62"
  },
  {
    "ID_PDV": "PDV082",
    "CATEGORIE": "Électroménager",
    "MARQUE": "RADIOLA",
    "Commercial": "PDV SACOMI",
    "Adresse": "Eucalyptus",
    "Wilaya": "ALGER",
    "Telephone": "0 770 13 59 28"
  },
  {
    "ID_PDV": "PDV083",
    "CATEGORIE": "Électroménager",
    "MARQUE": "RADIOLA",
    "Commercial": "PDV SACOMI",
    "Adresse": "Baraki",
    "Wilaya": "ALGER",
    "Telephone": "0 771 93 36 78"
  },
  {
    "ID_PDV": "PDV084",
    "CATEGORIE": "Électroménager",
    "MARQUE": "RADIOLA",
    "Commercial": "PDV SACOMI",
    "Adresse": "Oran",
    "Wilaya": "ORAN",
    "Telephone": "0 770 63 14 16"
  },
  {
    "ID_PDV": "PDV085",
    "CATEGORIE": "Électroménager",
    "MARQUE": "RADIOLA",
    "Commercial": "PDV SACOMI",
    "Adresse": "Tiaret",
    "Wilaya": "TIARET",
    "Telephone": "0 673 07 86 46"
  },
  {
    "ID_PDV": "PDV086",
    "CATEGORIE": "Smart Phone",
    "MARQUE": "ZTE NUBIA",
    "Commercial": "PDV SACOMI",
    "Adresse": "Ain Allah",
    "Wilaya": "ALGER",
    "Telephone": "0 7 70 27 11 11 / 07 70 51 69 85"
  },
  {
    "ID_PDV": "PDV087",
    "CATEGORIE": "Smart Phone",
    "MARQUE": "ZTE NUBIA",
    "Commercial": "PDV SACOMI",
    "Adresse": "Hamiz",
    "Wilaya": "ALGER",
    "Telephone": "0 770 82 32 04"
  },
  {
    "ID_PDV": "PDV088",
    "CATEGORIE": "Smart Phone",
    "MARQUE": "ZTE NUBIA",
    "Commercial": "PDV SACOMI",
    "Adresse": "Kouba",
    "Wilaya": "ALGER",
    "Telephone": "0 770 94 84 28"
  },
  {
    "ID_PDV": "PDV089",
    "CATEGORIE": "Smart Phone",
    "MARQUE": "ZTE NUBIA",
    "Commercial": "PDV SACOMI",
    "Adresse": "Bordj el bahri",
    "Wilaya": "ALGER",
    "Telephone": "0 770 84 80 62"
  },
  {
    "ID_PDV": "PDV090",
    "CATEGORIE": "Smart Phone",
    "MARQUE": "ZTE NUBIA",
    "Commercial": "PDV SACOMI",
    "Adresse": "Eucalyptus",
    "Wilaya": "ALGER",
    "Telephone": "0 770 13 59 28"
  },
  {
    "ID_PDV": "PDV091",
    "CATEGORIE": "Smart Phone",
    "MARQUE": "ZTE NUBIA",
    "Commercial": "PDV SACOMI",
    "Adresse": "Baraki",
    "Wilaya": "ALGER",
    "Telephone": "0 771 93 36 78"
  },
  {
    "ID_PDV": "PDV092",
    "CATEGORIE": "Smart Phone",
    "MARQUE": "ZTE NUBIA",
    "Commercial": "PDV SACOMI",
    "Adresse": "Oran",
    "Wilaya": "ORAN",
    "Telephone": "0 770 63 14 16"
  },
  {
    "ID_PDV": "PDV093",
    "CATEGORIE": "Smart Phone",
    "MARQUE": "ZTE NUBIA",
    "Commercial": "PDV SACOMI",
    "Adresse": "Tiaret",
    "Wilaya": "TIARET",
    "Telephone": "0 673 07 86 46"
  },
  {
    "ID_PDV": "PDV094",
    "CATEGORIE": "PC SCHNEIDER",
    "MARQUE": "",
    "Commercial": "PDV SACOMI",
    "Adresse": "Ain Allah",
    "Wilaya": "ALGER",
    "Telephone": "0 7 70 27 11 11 / 07 70 51 69 85"
  },
  {
    "ID_PDV": "PDV095",
    "CATEGORIE": "PC SCHNEIDER",
    "MARQUE": "",
    "Commercial": "PDV SACOMI",
    "Adresse": "Hamiz",
    "Wilaya": "ALGER",
    "Telephone": "0 770 82 32 04"
  },
  {
    "ID_PDV": "PDV096",
    "CATEGORIE": "PC SCHNEIDER",
    "MARQUE": "",
    "Commercial": "PDV SACOMI",
    "Adresse": "Kouba",
    "Wilaya": "ALGER",
    "Telephone": "0 770 94 84 28"
  },
  {
    "ID_PDV": "PDV097",
    "CATEGORIE": "PC SCHNEIDER",
    "MARQUE": "",
    "Commercial": "PDV SACOMI",
    "Adresse": "Bordj el bahri",
    "Wilaya": "ALGER",
    "Telephone": "0 770 84 80 62"
  },
  {
    "ID_PDV": "PDV098",
    "CATEGORIE": "PC SCHNEIDER",
    "MARQUE": "",
    "Commercial": "PDV SACOMI",
    "Adresse": "Eucalyptus",
    "Wilaya": "ALGER",
    "Telephone": "0 770 13 59 28"
  },
  {
    "ID_PDV": "PDV099",
    "CATEGORIE": "PC SCHNEIDER",
    "MARQUE": "",
    "Commercial": "PDV SACOMI",
    "Adresse": "Baraki",
    "Wilaya": "ALGER",
    "Telephone": "0 771 93 36 78"
  },
  {
    "ID_PDV": "PDV100",
    "CATEGORIE": "PC SCHNEIDER",
    "MARQUE": "",
    "Commercial": "PDV SACOMI",
    "Adresse": "Oran",
    "Wilaya": "ORAN",
    "Telephone": "0 770 63 14 16"
  },
  {
    "ID_PDV": "PDV101",
    "CATEGORIE": "PC SCHNEIDER",
    "MARQUE": "",
    "Commercial": "PDV SACOMI",
    "Adresse": "Tiaret",
    "Wilaya": "TIARET",
    "Telephone": "0 673 07 86 46"
  }
];

// ─── CHECK LIST (8) ────────────────────────────────────────
export const CHECK_LIST_ITEMS: CheckListItem[] = [
  {
    "fr": "Une demande d'un financement par mourabaha consommation",
    "ar": "طلب التمويل الاستهلاكي بالمرابحة"
  },
  {
    "fr": "Un extrait d'acte de naissance.",
    "ar": "مستخرج من شهادة الميلاد"
  },
  {
    "fr": "Acte de résidence",
    "ar": "شهادة إقامة أو وثيقة إيواء"
  },
  {
    "fr": "Une copie de CIN ou Permis de conduire en cours de validite",
    "ar": "نسخة من بطاقة التعريف الوطنية أو رخصة السياقة قيد الصلاحية"
  },
  {
    "fr": "Une attestation de travail récente justifiant un EDI",
    "ar": "شهادة عمل حديثة مثبتة لعقد عمل غير محدد المدة أو الترسيم في المنصب"
  },
  {
    "fr": "Les trois (3) dernières fiches de paie authentifiées par l'employeur, pour les salariés",
    "ar": "كشف الراتب لـ 3 أشهر الأخيرة مؤشرة من طرف صاحب العمل، بالنسبة للأجراء"
  },
  {
    "fr": "Un formulaire C20 délivré par l'administration fiscale pour les commerçants et les professions libérales",
    "ar": "استمارة (C20) مستخرجة من مصلحة الضرائب بالنسبة للتجار وأصحاب المهن الحرة."
  },
  {
    "fr": "Une facture pro forma+ Attestaion de disponibilite+Attestation de fabricant ( documents fournis par le fournisseur )",
    "ar": "فاتورة شكلية + شهادة توفر السلعة + شهادة الصانع (وثائق مقدمة من طرف المورد)"
  }
];
