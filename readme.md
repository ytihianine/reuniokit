# Template projet Python

Ce repository est un template de projet Python. Il sert de base pour démarrer un nouveau projet avec certains standards et des outils déjà configurés (Release Please).
Il peut être adapté pour utiliser d'autres technologies (node, ...).

## Pré-requis

- Python 3.12
- Node v24+
- `make`

## Installation

```bash
make setup-dev-env
source env/bin/activate
```

Cette commande crée l'environnement virtuel, installe les dépendances et configure pre-commit.

## Variables d'environnement

Copier `.env.example` en `.env` et adapter les valeurs.
Si des variables d'environnement sont ajoutées, il faut modifier `src/utils/settings.py` pour qu'elles soient lues.

## Lancer le projet

```bash
python -m src.main
```

## Tests

Pour lancer les tests
```bash
make test
```

## Structure

```
.
├── .github/
│    ├── workflows: workflows github
│    └── skills: skills copilot
├── src/         # Code source
├── tests/       # Tests unitaires (pytest)
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
