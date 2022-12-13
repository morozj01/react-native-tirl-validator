# tirl-validator

Utilities to enable verifying TrustlessIRL physical labels. Built for React Native

## Installation

```sh
npm install --save tirl-validator
```

## About

This library facilitates easy integration with the [TrustlessIRL](https://tirl.xyz) protocol by enabling mobile applications to perform camera based scans of TIRL labels.

Read more about the TrustlessIRL protocol [here.](https://docs.tirl.xyz)

Successful scans must capture images of the label with the camera tilted slightly to the left, and slightly to the right - as TIRL labels are 3-Dimensional.

## Usage

The TirlValidator class exposes a single function:
#### validate(imagePath): Promise<scanResult>

Read the image at `imagePath` and return result if scan completed, or further scan requirements if not.

**Params**
- imagePath `string` - should contain an image of a valid TIRL label

**Returns**
```ts
{
  labelId: string; // ID of TIRL label being scanned
  scanDone: boolean; // Returns true when scanning is complete and no more image capture is necessary
  valid: boolean; // Notifies whether scanned label is authentic. Field set only when scanDone is true
  scanLeft: boolean; // Scan completed from the left side
  scanRight: boolean; // Scan completed from the right side
  error: Object; // Any errors will be returned here
}
```

### Example

```ts
import { TirlValidator } from 'tirl-validator';

const path = 'local/path/to/image/file';

const tirlValidator = new TirlValidator('https://tirl/ceramic/node');

const result = await tirlValidator.validate(path);

if (result.scanDone) {
  const { valid } = result;
  // Handle success case
}

if (result.error) {
  const { message, stack } = result.error;
  // Handle error
}

const { scanLeft, scanRight } = result;
// Continue scanning until scanDone === true
```

A full example can be found [here](https://github.com/ZKLadder/tirl-validator/blob/main/example/src/App.tsx) which utilizes [vision-camera](https://github.com/mrousavy/react-native-vision-camera) and [react-native-fs](https://github.com/itinance/react-native-fs)

### Running the example

```sh
npm run bootstrap
cd example

#IOS
npm run ios

#Android
npm run android
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
