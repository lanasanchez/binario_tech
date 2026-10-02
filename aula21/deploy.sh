#!/bin/bash

echo "=================================================="
echo "    PIPELINE DE DEPLOY AUTOMATIZADO - BINÁRIO TECH"
echo "=================================================="

echo "[1/4] Atualizando código-fonte do repositório remoto..."
git pull origin main

echo "[2/4] Verificando e instalando novas dependências..."
npm install --omit=dev

echo "[3/4] Reiniciando aplicação no PM2..."
pm2 restart api-cicd

# Registra a data, hora e hash do commit no histórico de deploys
echo "$(date '+%Y-%m-%d %H:%M:%S') - Commit: $(git rev-parse --short HEAD)" >> deploy_history.log

echo "[4/4] Executando Smoke Test na API (Porta 3002)..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3002/api/v1/versao)

if [ "$HTTP_STATUS" -eq 200 ]; then
    echo ""
    echo "[SUCESSO] Deploy realizado e verificado com sucesso! HTTP Status 200."
    pm2 list
else
    echo ""
    echo "[FALHA] Smoke Test falhou com status $HTTP_STATUS! Verifique os logs do PM2."
    pm2 logs api-cicd --lines 20
    exit 1
fi
