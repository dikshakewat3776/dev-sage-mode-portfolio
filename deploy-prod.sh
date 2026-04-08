#!/usr/bin/env bash

set -euo pipefail

STAGE="${1:-all}"

run_stage() {
  local name="$1"
  local cmd="$2"

  echo "==> [$name] $cmd"
  eval "$cmd"
  echo "==> [$name] done"
  echo
}

case "$STAGE" in
  install)
    run_stage "install" "npm install"
    ;;
  lint)
    run_stage "lint" "npm run lint"
    ;;
  build)
    run_stage "build" "npm run build"
    ;;
  preview)
    run_stage "preview" "npm run preview"
    ;;
  deploy)
    run_stage "deploy" "npm run deploy"
    ;;
  all)
    run_stage "install" "npm install"
    run_stage "lint" "npm run lint"
    run_stage "build" "npm run build"
    ;;
  *)
    echo "Unknown stage: $STAGE"
    echo
    echo "Usage: ./deploy.sh [install|lint|build|preview|deploy|all]"
    exit 1
    ;;
esac
