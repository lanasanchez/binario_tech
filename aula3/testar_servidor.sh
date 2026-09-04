#!/bin/bash

# Define a URL base do servidor (Altere a porta se necessário)
BASE_URL="http://localhost:3001"

# Lista de rotas para testar
ROTAS=("/status" "/scania/info" "/vw/info")

echo "=========================================="
echo "   INICIANDO TESTES DO SERVIDO R"
echo "=========================================="

for ROTA in "${ROTAS[@]}"; do
    # Captura e exibe a data/hora atual
    HORARIO=$(date +"%d/%m/%Y - %H:%M:%S")
    echo ""
    echo "------------------------------------------"
    echo "⏰ Horário do teste: $HORARIO"
    echo "🌐 Testando rota: $BASE_URL$ROTA"
    echo "------------------------------------------"
    
    # Executa a requisição exibindo a resposta HTTP
    # -s: Modo silencioso do curl
    # -w: Exibe o código de status HTTP no final
    HTTP_STATUS=$(curl -s -o /tmp/resposta_curl.json -w "%{http_code}" "$BASE_URL$ROTA")
    
    # Exibe a resposta formatada
    echo "STATUS HTTP: $HTTP_STATUS"
    echo "RESPOSTA:"
    cat /tmp/resposta_curl.json
    echo ""
done

# Limpa o arquivo temporário
rm -f /tmp/resposta_curl.json

echo ""
echo "=========================================="
echo "   TESTES CONCLUÍDOS"
echo "=========================================="
