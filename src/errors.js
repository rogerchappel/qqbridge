export class QqbridgeError extends Error {
  constructor(message, details = undefined) {
    super(message);
    this.name = 'QqbridgeError';
    this.details = details;
  }
}

export function formatError(error) {
  if (error instanceof QqbridgeError && error.details) {
    return `${error.message}\n${JSON.stringify(error.details, null, 2)}`;
  }
  return error instanceof Error ? error.message : String(error);
}
