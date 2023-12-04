import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-momory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepositiry: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepositiry = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepositiry)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepositiry.create({
      title: 'Beach Gym',
      description: 'Acedmia com um ambiente espetacular',
      phone: '123456789',
      latitude: -20.9085943,
      longitude: -46.9902287,
    })

    await gymsRepositiry.create({
      title: 'Elite Gym',
      description: 'Acedmia com um ambiente espetacular',
      phone: '123456789',
      latitude: -20.9085943,
      longitude: -46.9902287,
    })

    const { gyms } = await sut.execute({
      query: 'Elite Gym',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Elite Gym' })])
  })

  it.skip('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepositiry.create({
        title: `Elite Gym ${i}`,
        description: 'Acedmia com um ambiente espetacular',
        phone: '123456789',
        latitude: -20.9085943,
        longitude: -46.9902287,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Elite Gym',
      page: 2,
    })

    expect(gyms).toHaveLength(22)
    expect(gyms).toEqual([
      expect.objectContaining({ title: `Elite Gym 21` }),
      expect.objectContaining({ title: `Elite Gym 22` }),
    ])
  })
})
