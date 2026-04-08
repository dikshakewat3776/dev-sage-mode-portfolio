#!/usr/bin/env bash

set -euo pipefail

STAGE="${1:-dev}"
PORT="${PORT:-4173}"

run_stage() {
  local name="$1"
  local cmd="$2"

  echo "==> [$name] $cmd"
  eval "$cmd"
}

case "$STAGE" in
  install)
    run_stage "install" "npm install"
    ;;
  dev)
    run_stage "dev" "npm run dev -- --host 0.0.0.0 --port $PORT"
    ;;
  build)
    run_stage "build" "npm run build"
    ;;
  preview)
    run_stage "preview" "npm run preview -- --host 0.0.0.0 --port $PORT"
    ;;
  all)
    run_stage "install" "npm install"
    run_stage "build" "npm run build"
    run_stage "preview" "npm run preview -- --host 0.0.0.0 --port $PORT"
    ;;
  *)
    echo "Unknown stage: $STAGE"
    echo
    echo "Usage: ./deploy-local.sh [install|dev|build|preview|all]"
    echo "Optional: PORT=3000 ./deploy-local.sh dev"
    exit 1
    ;;
esac
