import { nativeValidator } from '../modules/native';
import { getLabel } from '../modules/ceramic';
import { TirlValidator } from '../index';

jest.mock('react-native', () => ({
  Platform: {
    select: jest.fn(),
  },
  NativeModules: jest.fn(),
}));

jest.mock('../modules/native', () => ({
  nativeValidator: {
    findBarcode: jest.fn(),
    processLabel: jest.fn(),
    authenticate: jest.fn(),
  },
}));

jest.mock('../modules/ceramic', () => ({
  getLabel: jest.fn(),
}));

const mockFindBarcode = nativeValidator.findBarcode as jest.Mocked<any>;
const mockGetLabel = getLabel as jest.Mocked<any>;
const mockProcessLabel = nativeValidator.processLabel as jest.Mocked<any>;
const mockAuthenticate = nativeValidator.authenticate as jest.Mocked<any>;

describe('TirlValidator', () => {
  let instance;

  test('constructor correctly creates instance', async () => {
    instance = new TirlValidator('http://ceramic.com');

    expect(instance instanceof TirlValidator).toStrictEqual(true);
    expect(instance.tirlLabelApi).toStrictEqual('http://ceramic.com');
  });

  test('throws when barcode data is not found', async () => {
    mockFindBarcode.mockResolvedValue(JSON.stringify({}));

    instance = new TirlValidator('http://ceramic.com');

    const { error } = await instance.validate('test_path');

    expect(mockFindBarcode).toHaveBeenCalledWith('test_path', true);

    expect(error?.message).toStrictEqual('Barcode not found');
  });

  test('correctly sets labelId and imageData', async () => {
    mockFindBarcode.mockResolvedValue(
      JSON.stringify({ barcode: 'test/12345' })
    );
    mockGetLabel.mockResolvedValue({
      node: { labelId: '12345', imageData: '0x54321' },
    });

    instance = new TirlValidator('http://ceramic.com');

    await instance.validate('test_path');

    expect(instance.labelId).toStrictEqual('12345');
    expect(instance.imageData).toStrictEqual('0x54321');
  });

  test('throws when new labelId found', async () => {
    mockFindBarcode.mockResolvedValue(
      JSON.stringify({ barcode: 'test/12345' })
    );
    mockGetLabel.mockResolvedValue({
      node: { labelId: '12345', imageData: '0x54321' },
    });

    instance = new TirlValidator('http://ceramic.com');

    instance.labelId = 'somethingElse';

    const { error } = await instance.validate('test_path');

    expect(error?.message).toStrictEqual(
      'Found new barcode. Create a new TirlValidator instance'
    );
  });

  test('returns correct data when scanDone is false', async () => {
    mockFindBarcode.mockResolvedValue(
      JSON.stringify({ barcode: 'test/12345' })
    );
    mockGetLabel.mockResolvedValue({
      node: { labelId: '12345', imageData: '0x54321' },
    });

    mockProcessLabel.mockResolvedValue(
      JSON.stringify({
        scan_done: false,
        scan_right: true,
        scan_left: false,
      })
    );

    instance = new TirlValidator('http://ceramic.com');

    const res = await instance.validate('test_path');

    expect(res).toStrictEqual({
      labelId: '12345',
      scanDone: false,
      scanRight: true,
      scanLeft: false,
    });
  });

  test('returns correct data when scanDone is true and label is valid', async () => {
    mockFindBarcode.mockResolvedValue(
      JSON.stringify({ barcode: 'test/12345' })
    );
    mockGetLabel.mockResolvedValue({
      node: { labelId: '12345', imageData: '0x54321' },
    });

    mockProcessLabel.mockResolvedValue(
      JSON.stringify({
        scan_done: true,
        scan_right: true,
        scan_left: true,
      })
    );

    mockAuthenticate.mockResolvedValue(JSON.stringify({ result: 'pass' }));

    instance = new TirlValidator('http://ceramic.com');

    const res = await instance.validate('test_path');

    expect(res).toStrictEqual({
      labelId: '12345',
      scanDone: true,
      scanRight: true,
      scanLeft: true,
      valid: true,
    });
  });
});
