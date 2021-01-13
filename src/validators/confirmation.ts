import getMessage from '../utils/getMessage';

interface ConfirmationOptions {
  on?: string;
  allowBlank?: boolean;
  message?: string | Function;
}

export default function validateConfirmation(
  options: ConfirmationOptions = {}
) {
  return (key: string, newValue: any, _oldValue = undefined, changes = {}) => {
    if ([null, undefined, ''].includes(newValue)) {
      return options.allowBlank
        ? true
        : getMessage<ConfirmationOptions>(key, newValue, options);
    }

    if (options.on && changes[options.on] === newValue) {
      return true;
    }

    return getMessage<ConfirmationOptions>(key, newValue, options);
  };
}
