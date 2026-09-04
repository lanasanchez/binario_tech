module.exports = {
  development: {
    client: 'better-sqlite3',
    connection: {
      filename: './src/database/db.sqlite' // ou o nome do seu arquivo sqlite
    },
    useNullAsDefault: true,
    migrations: {
      directory: './src/database/migrations'
    }
  }
};
