#!/bin/bash

APP_NAME="reuniokit"
values_sspcloud="./values_sspcloud.yaml"
values_nubonyxia="./values_nubonyxia.yaml"

# sspcloud or nubonyxia
deploy_to="sspcloud"

# Déployer l'application
if ["$deploy_to" == "sspcloud"];
    helm install $APP_NAME -f $values_sspcloud ./chart
else if
    helm install $APP_NAME -f $values_nubonyxia ./chart
fi;
