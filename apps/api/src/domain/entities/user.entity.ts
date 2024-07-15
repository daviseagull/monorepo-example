import { InvalidAttributeError } from '../errors/invalid-attribute.error'
import { BaseEntity } from './entity'

export class User extends BaseEntity {
  firstName: string
  lastName: string

  private constructor(
    firstName: string,
    lastName: string,
    id?: number,
    publicId?: string
  ) {
    super(id, publicId)
    this.firstName = firstName
    this.lastName = lastName
  }

  static create(
    firstName: string,
    lastName: string,
    id?: number,
    publicId?: string
  ) {
    if (firstName.length <= 3 || lastName.length <= 3) {
      throw new InvalidAttributeError(
        'First Name must have at least 3 characters'
      )
    }
    return new User(firstName, lastName, id, publicId)
  }
}
