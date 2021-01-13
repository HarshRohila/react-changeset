export default function getMessage<T extends { message?: string | Function }>(
  key: string,
  value: any,
  options: T
) {
  if (!options.message) {
    return 'invalid';
  }

  if (typeof options.message === 'function') {
    return options.message(key, value, options);
  }

  return options.message;
}
