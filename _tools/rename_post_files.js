import fs from 'fs'
import path from 'path'
import util from 'util' // eslint-disable-line no-unused-vars

import _debug from 'debug'
_debug.enable('*')

const debug = _debug('hotohoto')

const IS_DRY_RUN = false // keep original files

const postsPath = path.join(__dirname, '../_posts')
// Here we go.

if (!fs.existsSync(postsPath) || !fs.statSync(postsPath).isDirectory()) {
  debug('Path to posts does not exist or it is not a directory.', postsPath)
} else {
  fs.readdir(postsPath, (err, files) => {
    if (err) {
      debug(err)
      return
    }

    files.forEach(file => {
      const inputFilePath = path.join(postsPath, file)
      const outputFilePath = path.join(postsPath, decodeURIComponent(file))

      if (fs.statSync(inputFilePath).isDirectory()) {
        debug('[SKIP]', file)
        return
      }

      if (IS_DRY_RUN) {
        console.log(inputFilePath, outputFilePath)
      } else {
        fs.renameSync(inputFilePath, outputFilePath)
      }
    })
  })
}
