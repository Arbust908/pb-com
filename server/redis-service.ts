/* import { createClient } from 'redis'
import type { User } from '@/types' */

class RedisService {
  /* private client */

  constructor() {
    /* this.client = createClient({ url: 'redis://localhost:6379' })
    this.client.connect() */
  }

  /* async getUser(username: string): Promise<User | null> {
    const userData = await this.client.get(username)
    return userData ? JSON.parse(userData) : null
  }

  async addUser(user: User): Promise<string | null> {
    const exists = await this.getUser(user.username)
    if (exists)
      return null
    return await this.client.set(user.username, JSON.stringify(user))
  }

  async deleteUser(username: string): Promise<number> {
    return await this.client.del(username)
  }

  async updateUser(username: string, updatedUserData: Partial<User>): Promise<string | null> {
    const user = await this.getUser(username)
    if (!user)
      return null

    const updatedUser = { ...user, ...updatedUserData }
    return await this.client.set(username, JSON.stringify(updatedUser))
  }

  async getAllData(): Promise<User[]> {
    const keys = await this.client.keys('*')
    const users = await Promise.all(keys.map(async (key) => {
      const user = await this.getUser(key)
      return user
    }))
    return users.filter(Boolean) as User[]
  } */
}
// https://twitter.com/meijer_s/status/1745727753964462431
export const redisService = new RedisService()
