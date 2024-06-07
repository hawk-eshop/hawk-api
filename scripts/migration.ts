import { exec } from 'child_process'

const command = `npm run typeorm -- -d ./src/infrastructure/database/data-source.ts migration:generate ./src/migrations/${process.argv[2]}`

;(() =>
  exec(command, (error, stdout, stderr) => {
    if (error !== null) {
      console.error(stderr)
    }
    console.log(stdout)
  }))()
