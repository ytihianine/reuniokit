#!/bin/bash

APP_NAME="reuniokit"

# Déployer l'application - le nom "chartyt" peut être changé. Il faut changer les "grep" pour correspondre au nouveau nom.
helm upgrade --install $APP_NAME -f ./gitlab-public-values.yaml ./chart
