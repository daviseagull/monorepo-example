export class BaseEntity {
  id?: number
  publicId?: string

  constructor(id?: number, publicId?: string) {
    this.id = id
    this.publicId = publicId
  }
}
