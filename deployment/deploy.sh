#!/bin/bash

APP_NAME="reuniokit"
APP_SECRET="./secret.yaml"
SECRET_NAME="reuniokit-secret"
values_sspcloud="./values_sspcloud.yaml"
values_nubonyxia="./values_nubonyxia.yaml"

# sspcloud or nubonyxia
deploy_to="nubonyxia"

# Déployer le secret
kubectl delete secret $SECRET_NAME --ignore-not-found
kubectl apply -f $APP_SECRET

# Déployer l'application
if [ "$deploy_to" = "sspcloud" ]; then
    helm upgrade --install $APP_NAME -f $values_sspcloud ./chart
else
    helm upgrade --install $APP_NAME -f $values_nubonyxia ./chart
fi
