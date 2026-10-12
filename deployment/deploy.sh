#!/bin/bash

APP_NAME="reuniokit"

helm ls --all --short | grep "^$APP_NAME" | xargs -L1 helm delete

kubectl get all -o name | grep -i $APP_NAME | xargs kubectl delete


# Déployer l'application - le nom "chartyt" peut être changé. Il faut changer les "grep" pour correspondre au nouveau nom.
helm install $APP_NAME -f ./values.yaml ./chart
