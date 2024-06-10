import { exec } from 'child_process'

const command = `npm run typeorm -- migration:revert -d ./ormconfig.ts`

;(() =>
  exec(command, (error, stdout, stderr) => {
    if (error !== null) {
      console.error(stderr)
    }
    console.log(stdout)
  }))()
