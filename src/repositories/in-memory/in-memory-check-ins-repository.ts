import { Prisma, CheckIn } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: 'user-1',
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated: data.validated ? new Date(data.validated) : null,
      created_at: new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }
}
