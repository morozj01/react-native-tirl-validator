import { ComposeClient } from '@composedb/client';
import { nativeValidator } from './modules/native';
import { getLabel } from './modules/ceramic';
// @ts-ignore
import { definition } from './constants/ceramicRuntime.js';
//@ts-ignore
import { polyfill as polyfillEncoding } from 'react-native-polyfill-globals/src/encoding';
//@ts-ignore
import { polyfill as polyfillURL } from 'react-native-polyfill-globals/src/url';

polyfillEncoding();
polyfillURL();

class TirlValidator {
  public labelId: string;
  public imageData: string;
  public composeClient: ComposeClient;

  constructor(ceramic: string) {
    this.composeClient = new ComposeClient({
      ceramic,
      definition,
    });
  }

  public async validate(fileName: string, flash = true) {
    try {
      const barcodeData = JSON.parse(
        await nativeValidator.findBarcode(fileName, flash)
      );

      if (Object.keys(barcodeData).length < 1) {
        throw new Error('Barcode not found');
      }

      const labelId = barcodeData.barcode.split('/').pop();
      if (!this.labelId) {
        const { node } = await getLabel(this.composeClient, labelId);
        this.labelId = node.barcodeId;
        this.imageData = node.imageData;
      }

      if (this.labelId !== labelId) {
        throw new Error(
          'Found new barcode. Create a new TirlValidator instance'
        );
      }

      const labelData = JSON.parse(
        await nativeValidator.processLabel(JSON.stringify(barcodeData))
      );

      if (labelData.err) throw new Error(labelData.err);

      // @TODO If labelData.scan_done === true call the verification function and return final result

      return labelData;
    } catch (error: any) {
      return {
        error: {
          message: error.message,
          stack: error.stack,
          ...error,
        },
      };
    }
  }
}

export { TirlValidator };
