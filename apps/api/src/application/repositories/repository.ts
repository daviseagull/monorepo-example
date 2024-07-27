export interface Repository<T> {
  findAll: () => Promise<T[]>
  findOneById: (id: string) => Promise<T | null>
  doesExists: (id: string) => Promise<boolean>
  create: (entity: T) => Promise<void>
  delete: (id: string) => Promise<void>
}
