# README — Guia dos Exercícios de Telemetria

Este README reúne os exercícios de cURL, HTTPie, jq, Node.js, npm e comandos Linux em um único guia. A ideia é facilitar a realização dos exercícios durante a prova, mostrando o que cada comando faz, como identificar o que o enunciado está pedindo e qual comando deve ser utilizado.

Antes de começar, é importante estar dentro da pasta do projeto. Para entrar na pasta, utilize o comando `cd`, por exemplo: `cd curso-pbe1/binario_tech/aula3`. Para verificar os arquivos existentes na pasta, utilize `ls`. Normalmente estarão presentes arquivos como `package.json`, `telemetria.js` e `testar_telemetria.sh`.

No **Exercício 01**, o enunciado pede para efetuar uma requisição GET para a rota `/api/v1/scania` utilizando cURL e usar o jq para exibir somente a chave `modelo`. Primeiro, é necessário garantir que o servidor Node esteja funcionando. Se ele estiver parado, execute `node telemetria.js`. Depois, utilize `curl http://localhost:3001/api/v1/scania | jq '.modelo'`. O `curl` faz a requisição para a API, enquanto o `|` envia o resultado do curl para o `jq`. O `jq '.modelo'` pega somente o valor que está dentro da chave `modelo`. Por exemplo, se a API retornar `{"montadora":"Scania","modelo":"R450","status":"ativo"}`, o resultado será `"R450"`. A regra para decorar é: quando o exercício pedir **cURL + uma chave específica**, use `curl URL | jq '.campo'`.

No **Exercício 02**, o enunciado pede para fazer uma requisição para `/api/v1/mercedes` utilizando HTTPie e salvar o resultado no arquivo `mercedes.json`. O comando é `http GET http://localhost:3001/api/v1/mercedes > mercedes.json`. Também pode ser utilizado `http http://localhost:3001/api/v1/mercedes > mercedes.json`. O `http` é o comando do HTTPie e faz a requisição para a API. O símbolo `>` é utilizado para redirecionar a saída do comando para um arquivo. Portanto, tudo que a API retornar será salvo dentro de `mercedes.json`. Para verificar o conteúdo depois, utilize `cat mercedes.json`. Sempre que o enunciado falar **HTTPie + salvar resultado em arquivo**, pense em `http URL > arquivo.json`.

No **Exercício 03**, o objetivo é utilizar o jq para ler o arquivo `mercedes.json` e mostrar somente o valor do campo `status`. O comando é `jq '.status' mercedes.json`. Nesse caso, o jq abre o arquivo JSON, procura o campo `status` e mostra somente seu valor. Se o arquivo tiver `"status": "ativo"`, o resultado será `"ativo"`. A regra para decorar é: quando o exercício pedir **ler um arquivo JSON e filtrar um campo**, utilize `jq '.campo' arquivo.json`.

No **Exercício 04**, é necessário editar o arquivo `telemetria.js` e criar uma nova rota `/api/v1/volvo` que retorne os dados do modelo `FH 540`. Primeiro, abra o arquivo `telemetria.js`, por exemplo utilizando `code telemetria.js`. Dentro do arquivo, encontre as outras rotas existentes. Uma rota normalmente possui uma estrutura parecida com `app.get('/api/v1/scania', (req, res) => { ... });`. Para criar a rota da Volvo, adicione uma estrutura como `app.get('/api/v1/volvo', (req, res) => { res.json({ montadora: 'Volvo', modelo: 'FH 540', status: 'ativo' }); });`. O `app.get` cria uma rota que responde a uma requisição GET e o `res.json` envia os dados em formato JSON. Depois de adicionar a rota, salve o arquivo com `Ctrl + S`. Se o servidor estiver rodando, pressione `Ctrl + C` para encerrá-lo e depois execute novamente `node telemetria.js`. Quando aparecer a mensagem indicando que o servidor está rodando, teste a nova rota com `curl http://localhost:3001/api/v1/volvo`. O resultado deverá mostrar os dados da Volvo, incluindo `modelo: "FH 540"`. A regra para decorar é: quando o enunciado pedir **criar uma nova rota**, use `app.get('/api/v1/nome', (req, res) => { res.json({...}); });`, reinicie o servidor e teste com curl.

No **Exercício 05**, o objetivo é configurar o arquivo `package.json` para que seja possível iniciar o servidor utilizando apenas `npm start`. Abra o arquivo `package.json` e encontre a parte `"scripts"`. Dentro dela, adicione `"start": "node telemetria.js"`. Por exemplo: `"scripts": { "start": "node telemetria.js" }`. Salve o arquivo e, no terminal, execute `npm start`. O npm vai procurar o script chamado `start` dentro do `package.json` e executar o comando definido nele, que nesse caso é `node telemetria.js`. Portanto, quando aparecer no exercício **adicionar start no package.json**, lembre-se de colocar `"start": "node telemetria.js"` dentro de `"scripts"` e depois executar `npm start`.

No **Exercício 06**, o enunciado pede para direcionar o resultado da auditoria do script `testar_telemetria.sh` para o arquivo `relatorio.log`. O comando é `./testar_telemetria.sh > relatorio.log`. O `./` indica que o arquivo será executado na pasta atual. O `>` pega a saída produzida pelo script e salva no arquivo `relatorio.log`. Para verificar o que foi salvo, utilize `cat relatorio.log`. Caso apareça uma mensagem de permissão, primeiro execute `chmod +x testar_telemetria.sh` e depois execute novamente `./testar_telemetria.sh > relatorio.log`. A regra para decorar é: **executar script e salvar o resultado em log** significa `./arquivo.sh > arquivo.log`.

No **Exercício 07**, o objetivo é fazer uma requisição para `/api/v1/vw` e utilizar uma única chamada do jq para mostrar somente os campos `montadora` e `status`. O comando é `curl http://localhost:3001/api/v1/vw | jq '{montadora, status}'`. O curl busca os dados da rota e o jq cria uma nova saída contendo somente os campos informados. Se a API retornar `montadora`, `modelo` e `status`, o `modelo` será ignorado e aparecerão apenas `montadora` e `status`. Quando o exercício pedir **dois ou mais campos com jq**, use chaves, como `jq '{montadora, status}'`. Para apenas um campo, use `jq '.campo'`.

No **Exercício 08**, o objetivo é encontrar o PID do processo Node.js que está em execução e depois encerrá-lo. Primeiro, execute `ps aux | grep node`. O comando `ps aux` mostra os processos em execução no sistema e o `| grep node` filtra a lista para mostrar processos relacionados ao Node.js. Na resposta aparecerá uma linha parecida com `usuario 1234 ... node telemetria.js`. O número `1234` é o PID, ou seja, o identificador daquele processo. Depois de encontrar o PID correto do processo Node, utilize `kill -9 1234`, substituindo `1234` pelo número que apareceu no seu terminal. Não digite literalmente `<PID>`; coloque o número real. Por exemplo, se o processo for `usuario 4567 ... node telemetria.js`, o comando será `kill -9 4567`. A regra para decorar é: **procurar o Node** = `ps aux | grep node`; **encerrar** = `kill -9 PID`.

Para a prova, os comandos mais importantes para memorizar são: `curl URL` para fazer uma requisição com cURL; `curl URL | jq '.campo'` para fazer uma requisição e filtrar um campo; `http URL` para fazer uma requisição com HTTPie; `http URL > arquivo.json` para fazer a requisição e salvar a resposta; `jq '.campo' arquivo.json` para filtrar um campo de um arquivo JSON; `jq '{campo1, campo2}' arquivo.json` para mostrar dois campos; `node telemetria.js` para iniciar diretamente o servidor Node; `npm start` para iniciar o servidor através do script configurado no `package.json`; `./arquivo.sh` para executar um script; `./arquivo.sh > relatorio.log` para executar um script e salvar sua saída em um arquivo; `ps aux | grep node` para localizar um processo Node; e `kill -9 PID` para encerrar o processo.

A principal lógica dos exercícios é a seguinte: **cURL e HTTPie servem para fazer requisições para a API; jq serve para filtrar informações do JSON; o símbolo `>` serve para salvar uma saída em arquivo; Node.js executa o servidor; npm executa comandos configurados no `package.json`; `ps` permite visualizar processos; `grep` permite filtrar a informação exibida; e `kill` encerra um processo.**

## Cola rápida para a prova

```bash
# cURL
curl URL

# cURL + jq
curl URL | jq '.campo'

# HTTPie
http URL

# HTTPie + salvar JSON
http URL > arquivo.json

# jq lendo arquivo
jq '.campo' arquivo.json

# jq mostrando dois campos
jq '{campo1, campo2}' arquivo.json

# Iniciar Node
node telemetria.js

# Iniciar pelo npm
npm start

# Executar script
./arquivo.sh

# Dar permissão para executar script
chmod +x arquivo.sh

# Executar script e salvar log
./arquivo.sh > relatorio.log

# Procurar processo Node
ps aux | grep node

# Encerrar processo
kill -9 PID
```

Se o exercício mencionar **GET**, pense em `curl` ou `http`. Se mencionar **filtrar campo**, pense em `jq`. Se mencionar **salvar em arquivo**, pense no `>`. Se mencionar **nova rota**, pense em `app.get`. Se mencionar **npm start**, procure o `"start"` dentro do `package.json`. Se mencionar **PID**, pense em `ps aux | grep node` e depois `kill -9 PID`.
