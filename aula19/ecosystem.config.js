module.exports = {
  apps: [
    {
      name: "api-telemetria",
      script: "./server.js",
      instances: 1,
      exec_mode: "fork",
      
      // Limite de memória configurado para 100MB
      max_memory_restart: "100M",

      // Variaveis para Ambiente de Desenvolvimento
      env_development: {
        NODE_ENV: "development",
        PORT: 3333,
        LOG_LEVEL: "debug"
      },

      // Variaveis para Ambiente de Producao
      env_production: {
        NODE_ENV: "production",
        PORT: 3333,
        LOG_LEVEL: "info"
      }
    }
  ]
};
