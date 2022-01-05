export const throwError =
  (message: string, notImportant: boolean = false) =>
  (entityErr: any) => {
    if (notImportant) {
      console.log(message || entityErr)
      return notImportant
    } else {
      throw new Error(message || entityErr)
    }
  }

export const notFound = (message: string) => (entity: any) => {
  if (entity) {
    return entity
  }
  if (message) throw new Error(message)
  return null
}

// export const authorOrAdmin = (ctx, userField) => (entity) => {
//   const user = ctx.auth?.user
//   if (entity) {
//     const isAdmin = user.role === 'ADMIN'
//     const isAuthor = entity[userField] ? entity[userField].equals(user.id) : null
//     if (isAuthor || isAdmin) {
//       return entity
//     }
//     throw new Error('Forbidden')
//   }
//   return null
// }
