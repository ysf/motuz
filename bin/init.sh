#!/usr/bin/env bash

set -e

THIS_DIR=$(dirname "$0")
cd ${THIS_DIR}
cd ..

source venv/bin/activate

FLASK_ENV=development python src/backend/manage.py init
FLASK_ENV=development python src/backend/manage.py migrate
FLASK_ENV=development python src/backend/manage.py upgrade
