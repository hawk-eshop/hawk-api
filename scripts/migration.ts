import { exec } from 'child_process'

const command = `npm run typeorm -- -d ./@shared/infrastructure/database/postgresdb/config.ts migration:generate ./src/database/migrations/${process.argv[2]}`
;(() =>
  exec(command, (error, stdout, stderr) => {
    if (error !== null) {
      console.error(stderr)
    }
    console.log(stdout)
  }))()
