# Smile البديل — Mourabaha Consommation Simulator & Lead Capture

Application Web moderne et réactive pour la simulation de financement islamique (Mourabaha Consommation) et la collecte de prospects, synchronisée avec Google Sheets.

## 🚀 Démarrage Rapide

```bash
cd smile-albadil

# Installer les dépendances (déjà fait)
npm install

# Lancer en mode développement (http://localhost:3000)
npm run dev

# Ou exécuter le build de production
npm run build
npm start
```

---

## ⚙️ Configuration Google Sheets (Optionnel)

L'application fonctionne immédiatement en mode prévisualisation grâce à un jeu complet de données de secours locales ([`fallbackData.ts`](file:///c:/Users/Anis/Documents/Web%20Pages/N8N%20projects/Automate%20facebook%20pages/smile-albadil/data/fallbackData.ts)).

Pour synchroniser avec votre Google Spreadsheet :
1. Créez un projet sur la [Google Cloud Console](https://console.cloud.google.com/) et activez l'API **Google Sheets API v4**.
2. Créez un **Service Account** et téléchargez sa clé privée JSON.
3. Partagez votre feuille Google Sheet avec l'email du compte de service (rôle *Éditeur*).
4. Copiez `.env.example` en `.env.local` et renseignez les valeurs :

```env
GOOGLE_SHEET_ID=1abc...votre_id_de_feuille...xyz
GOOGLE_CLIENT_EMAIL=service-account@votre-projet.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

---

## 📁 Architecture du Projet

- [`app/page.tsx`](file:///c:/Users/Anis/Documents/Web%20Pages/smile-albadil/app/page.tsx) : Page d'accueil basculant entre **Simulation**, **Check-List** et **Admin**.
- [`app/api/lookup/route.ts`](file:///c:/Users/Anis/Documents/Web%20Pages/smile-albadil/app/api/lookup/route.ts) : Point de terminaison API avec cache mémoire serveur (TTL 10 min) et requêtes groupées `batchGet` (1 seule requête API pour l'ensemble des tables).
- [`app/api/admin/sheet/route.ts`](file:///c:/Users/Anis/Documents/Web%20Pages/smile-albadil/app/api/admin/sheet/route.ts) : API d'administration pour lire et modifier les feuilles Google Sheets en direct tout en respectant les quotas du Free Tier.
- [`app/api/simulations/route.ts`](file:///c:/Users/Anis/Documents/Web%20Pages/smile-albadil/app/api/simulations/route.ts) : Enregistrement direct dans l'onglet `SIMULATION` de Google Sheets.
- [`components/SimulationWizard.tsx`](file:///c:/Users/Anis/Documents/Web%20Pages/smile-albadil/components/SimulationWizard.tsx) : Assistant interactif en 3 étapes avec animations Framer Motion.
  - **Onglet 1 (`Tab1InfoClient.tsx`)** : Téléphone algérien obligatoire (05/06/07), type de client, revenu mensuel (avec boutons +/-), prix du produit, durée (3, 6, 9... jusqu'à 30 mois).
  - **Onglet 2 (`Tab2Produit.tsx`)** : Agence, Catégorie, Marque (optionnels), sélection de produits génériques, tableau dynamique des points de vente disponibles.
  - **Onglet 3 (`Tab3DetailSimulation.tsx`)** : Calculs financiers en temps réel, formatage DZD (`د.ج.`), tableau récapitulatif des PDV et bouton d'enregistrement.
- [`components/AdminView.tsx`](file:///c:/Users/Anis/Documents/Web%20Pages/smile-albadil/components/AdminView.tsx) : Panneau d'administration permettant de visualiser et d'éditer toutes les tables de la feuille Google Sheets directement dans l'interface, avec enregistrement en lot.
- [`components/CheckListView.tsx`](file:///c:/Users/Anis/Documents/Web%20Pages/smile-albadil/components/CheckListView.tsx) : Liste bilingue (Français / العربية) des pièces justificatives avec filtre de recherche en direct.
- [`lib/calculations.ts`](file:///c:/Users/Anis/Documents/Web%20Pages/smile-albadil/lib/calculations.ts) : Formules financières exactes du tableur (Mensualité Max, Capacité d'endettement, Montant à financer, Hamish Jidia, Marge bénéficiaire, Mensualité).
- [`lib/googleSheets.ts`](file:///c:/Users/Anis/Documents/Web%20Pages/smile-albadil/lib/googleSheets.ts) : Service d'accès Google Sheets API v4 haute performance avec cache mémoire, requêtes groupées `batchGet` et mise à jour ciblée.
- [`data/fallbackData.ts`](file:///c:/Users/Anis/Documents/Web%20Pages/smile-albadil/data/fallbackData.ts) : Données statiques complètes des 9 agences, couverture des wilayas, 10 types de clients, catégories, marques, produits, points de vente et documents de la check-list.
