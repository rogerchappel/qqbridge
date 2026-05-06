export const INBOUND_TYPES = new Set(['message.created', 'message.updated', 'message.deleted']);
export const OUTBOUND_TYPES = new Set(['send.message', 'send.reaction', 'delete.message']);
export const MESSAGE_KINDS = new Set(['text', 'image', 'markdown', 'notice']);

export const SAFETY = Object.freeze({
  networkDefault: 'disabled',
  credentials: 'never read from environment during fixture replay',
  writes: 'only explicit output paths are written'
});
