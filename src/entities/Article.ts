import { Entity, ManyToOne, Property } from 'mikro-orm'
import { Field, ObjectType } from 'type-graphql'
import { Base } from '../inheritance/entities'
import { User } from './User'

@ObjectType()
@Entity()
export class Article extends Base<Article> {
  @Field(() => String)
  @Property({ unique: true })
  slug!: string

  @Field(() => String)
  @Property()
  title!: string

  @Field(() => String)
  @Property({ columnType: 'text' })
  description!: string

  @Field(() => String)
  @Property({ columnType: 'text' })
  fullbody!: string

  @Field(() => User)
  @ManyToOne(() => User)
  author!: User
}
