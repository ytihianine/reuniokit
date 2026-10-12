# Déployer une application

**Ce guide concerne uniquement les applications fullstacks (un backend ET une UI) qui doivent être déployées.**

Par défaut, les dossiers /backend et /ui permettent déjà, via la CI-CD mise en place de déployer une instance pour chaque partie.

### Mode d'emploi

#### 1. Configuration

La configuration concerne principalement 3 éléments: ingress, services et pods.
Dans le fichier `deployment/values.yaml`:

- **pods**
  Il convient de modifier plus particulièrement les 2 variables suivantes:

```
  name: nom-du-pod
  image:
    repository: harbor.lab.incubateur.finances.rie.gouv.fr/HARBOR_PROJECT/CHART_NAME_API
    tag: tag de l'image dans harbor
  port: YYYY
```

**`name`**: permet au service d'identifier sur quel pod rediriger le traffic
**`HARBOR_PROJECT`**: il s'agit du nom du projet harbor. Il est créé directement via l'interface web (voir avec le BercyHub)
**`CHART_NAME`**: il s'agit de la valeur définie pour la variable CHART_NAME dans le fichier `backend/backend.gitlab-ci.yml` pour le pod API et `backend/backend.gitlab-ci.yml` pour le pod UI.
**`port`**: doit être identique au port sur lequel tourne le serveur (Flask, streamlit, node ...). Il s'agit du port d'écoute du pod.

**Assurez-vous de configurer les deux pods présents dans la section `objets`.**

- **services**
  Il convient de modifier plus particulièrement les 2 variables suivantes:

```
  service:
    name: nom-du-service
    port: XXXX
    targetPort: http # par défaut
```

**`name`**: permet à l'ingress de rediriger le traffic vers le bon service
**`port`**: port d'écoute du service
**`targetPort`**: il s'agit du port (du pod) vers lequel le service doit lui même rediriger le traffic. Le traffic arrivant sur le port http du pod est redirigé vers son port d'écoute.

- **ingress**
  Il convient de modifier plus particulièrement la partie hosts:

```
- host: my-app-name.lab.incubateur.finances.rie.gouv.fr
  paths:
  - path: /app(/|$)(.*)
      pathType: Prefix
      backend:
      service:
          name: doit être identique au nom défini pour le service
          port:
            number: doit être identique au port défini pour le service
```

La valeur du path doit correspondre à la variable d'environnement définie pour la partie UI.

#### 2. Déployer le chart

Pour déployer le chart, dans votre terminal, exécutez la commande suivante

```
helm install your-instance-name chart/ -f values.yaml
```
