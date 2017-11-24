export default function assert(condition, message) {
  if (!condition) {
    const errorMessage = message || 'Assertion failed';
    if ('undefined' !== typeof Error) {
      throw new Error(errorMessage);
    }
    throw errorMessage; // Fallback
  }
}
