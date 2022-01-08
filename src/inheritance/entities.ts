import { BaseEntity, PrimaryKey, Property } from 'mikro-orm'
import { Field, ID, ObjectType } from 'type-graphql'
import { v4 as uuid } from 'uuid'

@ObjectType({ isAbstract: true })
export class Base<T extends { id: string }> extends BaseEntity<T, 'id'> {
  @Field(() => ID)
  @PrimaryKey({ type: 'uuid' })
  id: string = uuid()

  @Field(() => Date)
  @Property()
  createdAt: Date = new Date()

  @Field(() => Date)
  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date()

  constructor(body = {}) {
    super()
    this.assign(body)
  }
}
