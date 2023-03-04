import { nativeValidator } from './modules/native';
import { getLabel } from './modules/ceramic';
import { ErrorWithCode } from './modules/errors';

class TirlValidator {
  public labelId: string;
  public imageData: string;
  public tirlLabelApi: string;

  constructor(labelApiEndpoint: string) {
    this.tirlLabelApi = labelApiEndpoint;
  }

  public async validate(fileName: string, flash = true) {
    try {
      const barcodeDataString = await nativeValidator.findBarcode(
        fileName,
        flash
      );

      const barcodeDataObject = JSON.parse(barcodeDataString);

      if (Object.keys(barcodeDataObject).length < 1) {
        throw new ErrorWithCode({ message: 'Barcode not found', code: 1 });
      }

      const labelId = barcodeDataObject.barcode.split('/').pop();
      if (!this.labelId) {
        const { node } = await getLabel(this.tirlLabelApi, labelId);
        this.labelId = node.labelId;
        this.imageData = node.imageData;
      }

      if (this.labelId !== labelId) {
        throw new ErrorWithCode({
          message: 'Found new barcode. Create a new TirlValidator instance',
          code: 2,
        });
      }

      const labelData = JSON.parse(
        await nativeValidator.processLabel(barcodeDataString)
      );

      if (labelData.error) throw new Error(labelData.error);

      if (!labelData.scan_done) {
        return {
          labelId: this.labelId,
          scanDone: labelData.scan_done,
          scanRight: labelData.scan_right,
          scanLeft: labelData.scan_left,
        };
      }

      const { result } = JSON.parse(
        await nativeValidator.authenticate(
          JSON.stringify(labelData),
          JSON.stringify({ fingerprint: this.imageData, version: 1 })
        )
      );

      return {
        labelId: this.labelId,
        scanDone: labelData.scan_done,
        scanRight: labelData.scan_right,
        scanLeft: labelData.scan_left,
        valid: result === 'pass' ? true : false,
      };
    } catch (error: any) {
      return {
        error: {
          code: error.code || 999,
          message: error.message,
          stack: error.stack,
          ...error,
        },
      };
    }
  }
}

export { TirlValidator };
