#!/bin/bash

APP_NAME="reuniokit"
APP_SECRET="./secret.yaml"
values_sspcloud="./values_sspcloud.yaml"
values_nubonyxia="./values_nubonyxia.yaml"

# sspcloud or nubonyxia
deploy_to="sspcloud"

# Déployer le secret
kubectl apply -f $APP_SECRET

# Déployer l'application
if [ "$deploy_to" = "sspcloud" ]; then
    helm upgrade --install $APP_NAME -f $values_sspcloud ./chart
else
    helm upgrade --install $APP_NAME -f $values_nubonyxia ./chart
fi
