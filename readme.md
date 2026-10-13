# Réuniokit


## Pré-requis

- Python
- Node v24+
- `make`

## Installation

```bash
make setup-dev-env
source env/bin/activate
```

Cette commande crée l'environnement virtuel, installe les dépendances et configure pre-commit.

### UI — Variables Grist

L'interface frontend (Next.js) nécessite une clé API Grist pour récupérer les données côté serveur (fiches méthodes, astuces, réunions types).

| Variable | Description |
|----------|-------------|
| `GRIST_API_KEY` | Clé d'authentification Bearer pour l'API Grist (server-side uniquement, **non exposée au client**) |
| `NEXT_PUBLIC_GRIST_BASE_URL` | URL de base de l'API Grist (défaut : `https://grist.numerique.gouv.fr/api`) |
| `NEXT_PUBLIC_GRIST_DOC_ID` | ID du document Grist (défaut : `abrukV9rnpstUXcusj2JPa`) |

Créer un fichier `ui/.env.local` (non versionné) :

```bash
# ui/.env.local
GRIST_API_KEY="votre_cle_api_grist"
NEXT_PUBLIC_GRIST_BASE_URL="https://grist.numerique.gouv.fr/api"
NEXT_PUBLIC_GRIST_DOC_ID="abrukV9rnpstUXcusj2JPa"
```

> **Note** : `GRIST_API_KEY` ne doit jamais commencer par le préfixe `NEXT_PUBLIC_` car elle ne doit pas être exposée côté client.
> Les pages qui consomment des données Grist (`/bibliotheque`, `/astuces`, `/deroule/type`) appellent des API routes internes (`/api/grist/...`) qui utilisent la clé côté serveur.

### Lancer l'UI en local

```bash
cd ui
npm ci
npm run dev
```

L'application sera accessible sur http://localhost:5050.

> **Prérequis** : la variable `GRIST_API_KEY` doit être définie dans `ui/.env.local` (voir section ci-dessus), sinon les pages données (bibliothèque, astuces, réunions types) renverront une erreur 401.

## Structure

```
.
├── .github/
│    ├── workflows: workflows github
│    └── skills: skills copilot
├── ui/          # Application Next.js (frontend)
└── docs/        # Documentation complementaire
```

## Workflow de release

Les releases sont gérées automatiquement via [Release Please](https://github.com/googleapis/release-please) et un workflow GitHub Actions.

### Branche

| Branche | Rôle |
|---------|------|
| `main`  | Branche de production — chaque push met a jour (ou cree) la PR de release |

### Étapes

1. **Développement** : les commits sont réalisés sur des branches de feature/fix avec des messages au format [Conventional Commits](https://www.conventionalcommits.org/) (ex: `feat:`, `fix:`, `chore:`...).
2. **Mise a jour de PR de release** : un push sur `main` déclenche `release-please`, qui ouvre ou met a jour une PR de release avec le changelog et le bump de version.
3. **Publication** : lorsque la PR de release est fusionnée, Release Please crée le tag et la GitHub Release correspondants.

> Le workflow peut egalement etre déclenché manuellement depuis l'onglet **Actions** de GitHub.

### Pré-requis

Aucun secret personnel n'est necessaire. Le `GITHUB_TOKEN` fourni par GitHub Actions est utilisé avec les permissions `contents: write`, `issues: write` et `pull-requests: write`.

## Commandes disponibles

Quelques commandes utiles

| Commande              | Description                                      |
|-----------------------|--------------------------------------------------|
| `make setup-dev-env`  | Configure l'environnement de developpement       |
| `make test`           | Lance les tests pytest                           |
| `make clean`          | Supprime les fichiers temporaires                |
