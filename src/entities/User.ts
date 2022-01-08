import { Collection, Entity, Enum, OneToMany, Property } from 'mikro-orm'
import { Field, ObjectType } from 'type-graphql'
import { UserRole } from '../resolvers/user/types'
import { Base } from '../inheritance/entities'
import { Article } from './Article'

@ObjectType()
@Entity()
export class User extends Base<User> {
  @Field(() => String)
  @Property({ unique: true })
  email!: string

  @Property()
  password!: string

  @Field(() => UserRole)
  @Enum({ items: () => UserRole, default: UserRole.USER })
  role: UserRole = UserRole.USER

  @OneToMany(() => Article, (article) => article.author)
  articles = new Collection<Article>(this)
}
