import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'tirl-validator' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const TirlValidator = NativeModules.TirlValidator
  ? NativeModules.TirlValidator
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function libraryVersion(): Promise<string> {
  return TirlValidator.libraryVersion();
}
