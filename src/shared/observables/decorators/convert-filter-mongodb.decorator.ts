type Filter<T> = Partial<T> & { id?: string; deletedAt?: null }

export function ConvertMongoFilterToBaseRepository() {
  return (_: unknown, __: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value

    descriptor.value = function (...args: any[]) {
      const input: Filter<any> = args[0]

      if (input) {
        input['deletedAt'] = null

        if (input.id) {
          input['_id'] = input.id
          delete input.id
        }

        args[0] = input
      }

      return originalMethod.apply(this, args)
    }
  }
}
