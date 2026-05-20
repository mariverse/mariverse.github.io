import { readdirSync, readFileSync, statSync, writeFileSync } from 'fs'
import { join } from 'path'

const ASSETS_DIR = 'src/assets'

function findSvgs(dir: string): string[] {
  const results: string[] = []
  const entries = readdirSync(dir)

  for (const entry of entries) {
    const fullPath = join(dir, entry)
    const stat = statSync(fullPath)

    if (stat.isDirectory()) {
      results.push(...findSvgs(fullPath))
    } else if (entry.endsWith('.svg')) {
      results.push(fullPath)
    }
  }

  return results
}

function cleanSvgXmlDecl(filePath: string): boolean {
  const content = readFileSync(filePath, 'utf-8')

  if (!content.trimStart().startsWith('<?xml')) {
    return false
  }

  const svgIndex = content.indexOf('<svg')
  if (svgIndex === -1) {
    console.warn(`  ⚠️  ${filePath}: has XML declaration but no <svg> tag found, skipping`)
    return false
  }

  const cleaned = content.slice(svgIndex)
  writeFileSync(filePath, cleaned, 'utf-8')
  return true
}

const svgs = findSvgs(ASSETS_DIR)
const cleaned: string[] = []

for (const svg of svgs) {
  if (cleanSvgXmlDecl(svg)) {
    cleaned.push(svg)
  }
}

if (cleaned.length > 0) {
  console.log(`✅ Cleaned XML declaration from ${cleaned.length} SVG file(s):`)
  for (const file of cleaned) {
    console.log(`   - ${file}`)
  }
} else {
  console.log('✅ No SVG files with XML declarations found.')
}
