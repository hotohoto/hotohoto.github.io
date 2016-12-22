import fs from 'fs'
import path from 'path'
import htmlparser from 'htmlparser'
import util from 'util' // eslint-disable-line no-unused-vars

import _debug from 'debug'
_debug.enable('*')

const debug = _debug('hotohoto')

const IS_DEV_MODE = false // keep original files and write the dom also within result

const postsPath = path.join(__dirname, '../_posts')
const outputPath = IS_DEV_MODE ? path.join(postsPath, 'out') : postsPath

let nNewLines = 0
const writeNewLines = (wstream, n) => {
  if (nNewLines >= 2) return
  wstream.write('\n')
  nNewLines = nNewLines + 1
  if (nNewLines >= 2) return
  wstream.write('\n')
  nNewLines = nNewLines + 1
}

const resetNewLines = () => {
  nNewLines = 0
}

const trimText = text => (
  text.replace(/&nbsp;/g, ' ')
  .replace(/&#8216;|&#8217;/g, '\'')
  .replace(/&#8220;|&#8221;/g, '"')
  .replace(/&#8230;/g, '...')
  .replace(/&#8211;|&#8212;/g, '-')
  .trim()
)

const writeMarkdownFromDom = (wstream, domArray) => {
  domArray.map(node => {
    if (node.type === 'text') {
      const text = trimText(node.raw)
      if (text) {
        resetNewLines()
        wstream.write(text)
      }
    } else if (node.type === 'tag' && ['li'].indexOf(node.name) !== -1) {
      wstream.write('* ')
    } else if (node.type === 'tag' && ['h1'].indexOf(node.name) !== -1) {
      wstream.write('# ')
    } else if (node.type === 'tag' && ['h2'].indexOf(node.name) !== -1) {
      wstream.write('## ')
    } else if (node.type === 'tag' && ['h3'].indexOf(node.name) !== -1) {
      wstream.write('### ')
    } else if (node.type === 'tag' && ['a'].indexOf(node.name) !== -1) {
      const href = node.attribs && node.attribs.href
      if (href) {
        wstream.write('[' + href + '](' + href + ')')
      }
      if (node.children && node.children.length === 1 && node.children[0].type === 'text' &&
        trimText(node.children[0].raw) === href) {
        resetNewLines()
        return
      }
    } else if (node.type === 'tag' && ['img'].indexOf(node.name) !== -1) {
      const src = node.attribs && node.attribs.src
      if (src) {
        wstream.write('![](' + src + ')')
      }
    }

    if (node.children) {
      writeMarkdownFromDom(wstream, node.children)
    }
    if (node.type === 'tag' &&
      [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'div', 'p', 'dl', 'ul', 'img'
      ].indexOf(node.name) !== -1) {
      writeNewLines(wstream, 2)
    } else if (node.type === 'tag' && ['br', 'dt', 'dd', 'li'].indexOf(node.name) !== -1) {
      writeNewLines(wstream, 1)
    }
  })
}

// Here we go.

if (!fs.existsSync(postsPath) || !fs.statSync(postsPath).isDirectory()) {
  debug('Path to posts does not exist or it is not a directory.', postsPath)
} else {
  if (IS_DEV_MODE) {
    try { fs.mkdirSync(outputPath) } catch (e) {}
  }

  // htmlparser handler
  const handler = new htmlparser.DefaultHandler(function (err, dom) {
    if (err) {
      debug(err, dom)
    }
  })
  const parser = new htmlparser.Parser(handler)

  fs.readdir(postsPath, (err, files) => {
    if (err) {
      debug(err)
      return
    }

    files.forEach(file => {
      const filePath = path.join(postsPath, file)
      const outputFilePath = IS_DEV_MODE ? path.join(outputPath, file) : filePath

      if (fs.statSync(filePath).isDirectory()) {
        debug('[SKIP]', file)
        return
      }

      fs.readFile(filePath, 'utf8', (err, sourceData) => {
        if (err) {
          debug(err)
          return
        }

        // remove meta data parts
        const pattern = /(---[\s\S]*---)([\s\S]*)/
        const front = sourceData.replace(pattern, '$1')
        const contentBody = sourceData.replace(pattern, '$2')

        parser.parseComplete(contentBody)
        const wstream = fs.createWriteStream(outputFilePath)
        wstream.write(front)
        wstream.write('\n')
        nNewLines = 2
        writeMarkdownFromDom(wstream, handler.dom)
        if (IS_DEV_MODE) {
          wstream.write(util.inspect(handler.dom, false, null))
        }

        wstream.end()
        debug('[DONE]', file)
      })
    })
  })
}
