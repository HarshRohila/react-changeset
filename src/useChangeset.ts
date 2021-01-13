import { useRef, useState } from 'react';
import { BufferedChangeset, Changeset } from 'validated-changeset';

function useChangeset(model: object, ...args: any[]) {
  const ref = useRef<BufferedChangeset>(null);

  const [reactModel, setReactModel] = useState(() => {
    const changeset = Changeset(model, ...args);
    // @ts-ignore
    ref.current = changeset;

    return model;
  });

  const handler = {
    get(target: object, propKey: string, receiver: any) {

      if (Object.keys(model).includes(propKey)) {

        return reactModel[propKey];

      } else if (propKey === 'set') {

        const origMethod = target[propKey];
        return function (...args: [string, any]) {
          // @ts-ignore
          let result = origMethod.apply(this, args);

          const [key, value] = args;
          const newModel = { ...reactModel, [key]: value };
          setReactModel(newModel);
          return result;
        };

      } else if (propKey === 'validate') {

        const origMethod = target[propKey];
        return function (...args: any) {
          // @ts-ignore
          let result = origMethod.apply(this, args);
          setReactModel({ ...reactModel });
          return result;
        };
      }
      return Reflect.get(target, propKey, receiver);
    },
  };

  const changesetProxy = new Proxy<BufferedChangeset>(ref.current as BufferedChangeset, handler);

  return changesetProxy;
}

export default useChangeset;
