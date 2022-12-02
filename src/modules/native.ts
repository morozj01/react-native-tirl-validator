import { NativeModules, Platform } from 'react-native';
import type { NativeValidator } from 'src/interfaces/native';

const LINKING_ERROR =
  `The package 'tirl-validator' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const nativeValidator: NativeValidator = NativeModules.TirlValidator
  ? NativeModules.TirlValidator
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export { nativeValidator };
