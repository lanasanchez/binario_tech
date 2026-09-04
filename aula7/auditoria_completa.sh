#!/bin/bash

# Configurações gerais
SERVER_URL="http://localhost:3000"
LOG_FILE="auditoria.log"
DATE_NOW=$(date '+%Y-%m-%d %H:%M:%S')

# Função para registrar saída no console e no arquivo de log
log() {
  echo "$1" | tee -a "$LOG_FILE"
}

# Inicialização do log
log "=================================================="
log " INÍCIO DA AUDITORIA DA API: $DATE_NOW"
log "=================================================="

# Função auxiliar para disparar e validar requisições
test_route() {
  local method="$1"
  local endpoint="$2"
  local payload="$3"
  local description="$4"

  log ""
  log "--> Auditando: $description"
  log "    [$method] $SERVER_URL$endpoint"

  if [ -n "$payload" ]; then
    response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X "$method" \
      "$SERVER_URL$endpoint" \
      -H "Content-Type: application/json" \
      -d "$payload")
  else
    response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X "$method" \
      "$SERVER_URL$endpoint")
  fi

  body=$(echo "$response" | sed -e 's/HTTP_STATUS:.*//g')
  status=$(echo "$response" | tr -d '\n' | sed -e 's/.*HTTP_STATUS://')

  log "    Status Retornado: $status"
  log "    Corpo da Resposta: $body"
  log "--------------------------------------------------"
}

# 1. Testar Rotas Gerais de Veículos (Knex DB)
test_route "GET" "/api/v1/veiculos/1" "" "Buscar veículo por ID (Existente - HTTP 200)"
test_route "GET" "/api/v1/veiculos/999999" "" "Buscar veículo por ID (Inexistente - HTTP 404)"

# 2. Testar Rotas Mercedes-Benz
test_route "GET" "/api/v1/telemetria/mercedes" "" "Listar frota Mercedes"
test_route "GET" "/api/v1/telemetria/mercedes?modelo=Actros" "" "Filtrar Mercedes por modelo Actros"
test_route "GET" "/api/v1/telemetria/mercedes/1" "" "Buscar Mercedes por ID"

# Teste POST Mercedes (Válido - 12 caracteres no VIN)
test_route "POST" "/api/v1/telemetria/mercedes" \
  '{"modelo":"Atego","versao":"1419","ano":2023,"placa":"JKL-9012","vin":"MBC123456789"}' \
  "Cadastrar Mercedes com VIN Válido (12 chars)"

# Teste POST Mercedes (Inválido - < 12 caracteres)
test_route "POST" "/api/v1/telemetria/mercedes" \
  '{"modelo":"Actros","versao":"2651","ano":2024,"placa":"MNO-3456","vin":"MBC123"}' \
  "Cadastrar Mercedes com VIN Inválido (< 12 chars)"

# 3. Testar Rotas Scania
test_route "POST" "/api/v1/telemetria/scania" \
  '{"modelo":"R450","vin":"SCN123456789","velocidade":80}' \
  "Cadastrar Telemetria Scania com VIN Válido"

test_route "POST" "/api/v1/telemetria/scania" \
  '{"modelo":"R450","vin":"SCN1234","velocidade":80}' \
  "Cadastrar Telemetria Scania com VIN Inválido"

log ""
log "=================================================="
log " AUDITORIA CONCLUÍDA EM $(date '+%Y-%m-%d %H:%M:%S')"
log " Log salvo em: $LOG_FILE"
log "=================================================="
