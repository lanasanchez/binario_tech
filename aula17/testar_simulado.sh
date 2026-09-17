#!/bin/bash
URL="http://localhost:3000/api/v1/health"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL")
echo "=== HEALTH CHECK - $(date) ===" > health_check.log
echo "URL: $URL" >> health_check.log
echo "HTTP Status Code: $STATUS" >> health_check.log
echo "Verificação concluída. Status $STATUS gravado em health_check.log"
