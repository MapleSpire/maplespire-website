import { spawn } from 'node:child_process'
import { mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'

export async function run(binary, args, { capture = true } = {}) {
  const child = spawn(binary, args, { stdio: capture ? ['ignore', 'pipe', 'pipe'] : 'inherit' })
  let stdout = ''
  let stderr = ''
  if (capture) {
    child.stdout.setEncoding('utf8')
    child.stderr.setEncoding('utf8')
    child.stdout.on('data', (chunk) => { stdout += chunk })
    child.stderr.on('data', (chunk) => { stderr += chunk })
  }
  const code = await new Promise((resolve, reject) => {
    child.once('error', reject)
    child.once('close', resolve)
  })
  if (code !== 0) {
    const detail = stderr.trim() || stdout.trim() || `exit code ${code}`
    throw new Error(`${binary} failed: ${detail}`)
  }
  return { stdout, stderr }
}

export async function ensureParent(filename) {
  await mkdir(dirname(filename), { recursive: true })
}

