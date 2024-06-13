export abstract class IPinoAdapter {
  abstract setContext(name: string): void

  abstract verbose(message: any, context?: string, ...args: any[]): void
  abstract debug(message: any, context?: string, ...args: any[]): void
  abstract log(message: any, context?: string, ...args: any[]): void
  abstract warn(message: any, context?: string, ...args: any[]): void
  abstract error(message: any, trace?: string, context?: string, ...args: any[]): void
}
