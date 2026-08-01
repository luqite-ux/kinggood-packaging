import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const APPROVED_ASSET_HASHES = {
  'factory-exterior.png': '5811aa8b568e4b2fc9d26664494a81ec0c5e9114c8674a952d2f53a65992e7b2',
  'factory-production.png': 'acc52a1ccfb9417676fb28e8106ea0351b12d134ef33c8e34b6508a65225861e',
}

for (const [filename, approvedHash] of Object.entries(APPROVED_ASSET_HASHES)) {
  test(`${filename} matches its approved KINGGOOD source asset`, async () => {
    const asset = await readFile(new URL(`../public/${filename}`, import.meta.url))
    const actualHash = createHash('sha256').update(asset).digest('hex')

    assert.equal(actualHash, approvedHash)
  })
}
