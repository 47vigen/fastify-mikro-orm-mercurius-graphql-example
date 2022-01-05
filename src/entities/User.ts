import { Collection, Entity, Enum, OneToMany, Property } from 'mikro-orm'
import { Field, ObjectType, registerEnumType } from 'type-graphql'
import { Base } from './inheritance/Base'
import { Article } from './Article'

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

registerEnumType(UserRole, {
  name: 'UserRole'
})

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

  @Field(() => [Article])
  @OneToMany(() => Article, (article) => article.author)
  articles = new Collection<Article>(this)
}
