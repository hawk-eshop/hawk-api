import { exec } from 'child_process'

const command = `npm run typeorm -- migration:revert -d ./@shared/infrastructure/database/postgresdb/config.ts`

;(() =>
  exec(command, (error, stdout, stderr) => {
    if (error !== null) {
      console.error(stderr)
    }
    console.log(stdout)
  }))()
