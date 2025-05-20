import type { Environment } from 'vitest'

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    console.log('Setting up Prisma test environment...')

    return {
      teardown() {
        console.log('Tearing down Prisma test environment...')
      },
    }
  },
}
