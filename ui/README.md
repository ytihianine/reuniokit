# Documentation de la partie ui

### Configuration
- Variables d'environnement

Trois variables d'environnement sont configurées par défaut.
La seule à configurer obligatoirement est `NEXT_PUBLIC_API_URL` si votre application contient une API.
Il faut renseigner l'url de déploiement de l'API (disponible dans [backend/values.yaml](../backend/values.yaml)).

### Lancement du projet
**Installer les packages**

Dans le terminal, lancer la commande suivante `npm ci`.
Pensez à vérifier la version des packages. Il est peut-être nécessaire de les update.

**Lancer le serveur**

Dans le terminal, lancer la commande suivante `npm run dev`.

### Développement : particularités

#### *Insérer des images*
Le dossier public contient tous les éléments annexes (images par exemple) publics.
Il est nécessaire de conserver le dossier `/app` et mettre les éléments dans ce sous-dossier.
Dans le code, il faut utiliser la variable d'environnement `NEXT_PUBLIC_ASSETS`.

Exemple: je veux utiliser une image `home.svg` pour ma page d'accueil.

J'enregistre l'image dans `public/app/home/logo.svg`.
Dans ma `page.tsx`, la source de l'image sera `${process.env.NEXT_PUBLIC_ASSETS}/home/logo.svg`.

#### *Redirection*
Par défaut, dans une application NextJS, si on veut rediriger un utilisateur vers la page contact, utiliser `/contact` comme URL suffit. Dans notre contexte, ce n'est pas possible.
De la même façon que l'insertion d'image, il est nécessaire d'ajouter la variable d'environnement `NEXT_PUBLIC_DEPLOIEMENT` dans les URL de redirections.

Exemple: je veux rediriger un utilisateur vers ma page `contact/dsci`.
Dabs la page.tsx, je renseigne l'URL `${process.env.NEXT_PUBLIC_DEPLOIEMENT}/contact/dsci`.

**Recommandation** : dans le fichier `src/constantes/href.tsx`, définissez toutes les URL et importez les dans les pages dont vous avez besoin.

### Git-hook et pre-commit
Ce dossier est configuré pour appliquer un pre-commit sur le dossier `src/` pour avoir un formatage uniforme.
