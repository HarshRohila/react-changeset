import validator from 'validator';
import isEmpty from 'validator/es/lib/isEmpty';

interface PresenceOptions {
  presence?: boolean;
  message?: string | Function;
}

export default function validatePresence(options: boolean | validator.IsEmptyOptions | undefined | PresenceOptions) {
  if (typeof options === 'boolean') {
    options = { presence: options };
  }

  return (key: string, value: any) => {
    const isValueEmpty =
      [undefined, null].includes(value) || isEmpty(value, options as validator.IsEmptyOptions);
    const presenceOptions = options as PresenceOptions;
    const isValid = presenceOptions.presence ? !isValueEmpty : isValueEmpty;
    if (isValid) {
      return true;
    }

    const msgType = presenceOptions.presence ? 'blank' : 'present';

    if (typeof presenceOptions.message === 'function') {
      return presenceOptions.message(
        key,
        msgType ? 'blank' : 'present',
        value,
        options
      );
    }

    return presenceOptions.message || `${key} ${msgType}`;
  };
}
