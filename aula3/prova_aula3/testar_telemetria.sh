#!/bin/bash

echo "===== AUDITORIA DE TELEMETRIA ====="
echo ""

echo "Testando Volkswagen..."
curl -s http://localhost:3400/api/v1/vw
echo ""
echo ""

echo "Testando Scania..."
curl -s http://localhost:3400/api/v1/scania
echo ""
echo ""

echo "Testando Mercedes-Benz..."
curl -s http://localhost:3400/api/v1/mercedes
echo ""
echo ""

echo "Testando Volvo..."
curl -s http://localhost:3400/api/v1/volvo
echo ""
echo ""

echo "===== AUDITORIA FINALIZADA ====="
