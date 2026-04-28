# HappyLand Hollyday Residential

> *Chaque logement a son histoire.*

Site vitrine officiel de **HappyLand Hollyday Residential** — location courte durée
de 14 chambres et studios à **Stains**, **Épinay-sur-Seine** et **Houilles**, à
20-30 min de Paris.

Gérants : **Dr. Paul Mirabeau Byandé** (Professeur des Universités, Docteur en
Mathématiques) et **Carine Byandé** (Directrice de projet).

---

## Stack

- HTML / CSS / JavaScript vanilla
- [Vite](https://vitejs.dev/) (bundler & dev server)
- Police : Montserrat (Google Fonts)
- Charte graphique : Bleu marine `#002147` · Or `#AE9256` · Off-white `#F9FAFC`

## Structure du projet

```
happyland-residential/
├── index.html              # Page principale (8 sections)
├── style.css               # Charte graphique HappyLand
├── main.js                 # Grille des 14 logements + modal + formulaire
├── vite.config.js          # Config bundler
├── package.json
└── public/
    ├── logo/
    │   └── happyland-logo.png
    ├── photos/             # 14 photos des logements (ST-XX, EP-XX, HO-XX)
    └── dispos.json         # Calendrier des indisponibilités (à mettre à jour à la main)
```

## Développement local

```bash
npm install
npm run dev
```

Ouvre http://localhost:5173

## Build de production

```bash
npm run build
```

Le site optimisé est généré dans `dist/`.

## Mettre à jour les disponibilités

Les périodes "indisponibles" sont stockées dans `public/dispos.json`.
Pour bloquer une période sur un logement (ex: client réservé du 12 au 18 mai 2026
sur Marry Me) :

```json
{
  "logements": {
    "ST-01_Marry_Me": {
      "indisponible": [
        { "start": "2026-05-12", "end": "2026-05-18", "motif": "Réservation confirmée" }
      ]
    }
  }
}
```

Puis : `git add public/dispos.json && git commit -m "MAJ dispos Marry Me" && git push`
→ Hostinger redéploiera automatiquement en quelques minutes.

## Réservations & Paiement

Le formulaire de réservation envoie un email pré-rempli vers `byandepaul@gmail.com`.
Le paiement se fait par **virement bancaire manuel** après confirmation de la
disponibilité par les gérants (réponse sous 24h).

## Déploiement

Déployé automatiquement via Hostinger à chaque push sur la branche `main`.
