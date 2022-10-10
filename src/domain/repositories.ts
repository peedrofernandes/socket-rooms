type create <T> = (t: T) => Promise<void> | void
type get <T> = (id: string | number) => Promise<T> | T
type update<T> = (t: T) => Promise<void> | void
type remove<T> = (t: T) => Promise<void> | void 