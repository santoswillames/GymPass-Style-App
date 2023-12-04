import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-momory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepositiry: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepositiry = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepositiry)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepositiry.create({
      title: 'Near Gym',
      description: 'Acedmia com um ambiente espetacular',
      phone: '123456789',
      latitude: -20.9085943,
      longitude: -46.9902287,
    })

    await gymsRepositiry.create({
      title: 'Far Gym',
      description: 'Acedmia com um ambiente espetacular',
      phone: '123456789',
      latitude: -20.7443476,
      longitude: -46.7364051,
    })

    const { gyms } = await sut.execute({
      userLatitude: -20.9085943,
      userLongitude: -46.9902287,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
