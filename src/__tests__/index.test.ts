import { ComposeClient } from '@composedb/client';
import { nativeValidator } from '../modules/native';
import { getLabel } from '../modules/ceramic';

import { TirlValidator } from '../index';

jest.mock('react-native', () => ({
  Platform: {
    select: jest.fn(),
  },
  NativeModules: jest.fn(),
}));

jest.mock('@composedb/client', () => ({
  ComposeClient: jest.fn(),
}));

jest.mock('../constants/ceramicRuntime.js', () => ({
  definition: 'mockDefinition',
}));

jest.mock('react-native-polyfill-globals/src/encoding', () => ({
  polyfill: jest.fn(),
}));

jest.mock('react-native-polyfill-globals/src/url', () => ({
  polyfill: jest.fn(),
}));

jest.mock('../modules/native', () => ({
  nativeValidator: {
    findBarcode: jest.fn(),
    processLabel: jest.fn(),
  },
}));

jest.mock('../modules/ceramic', () => ({
  getLabel: jest.fn(),
}));

const mockFindBarcode = nativeValidator.findBarcode as jest.Mocked<any>;
const mockGetLabel = getLabel as jest.Mocked<any>;
const mockProcessLabel = nativeValidator.processLabel as jest.Mocked<any>;

describe('TirlValidator', () => {
  let instance;

  beforeEach(() => {
    (ComposeClient as jest.Mocked<any>).mockImplementation(() => ({
      mock: 'class',
    }));
  });

  test('constructor correctly creates instance', async () => {
    instance = new TirlValidator('http://ceramic.com');

    expect(ComposeClient as jest.Mocked<any>).toHaveBeenCalledWith({
      ceramic: 'http://ceramic.com',
      definition: 'mockDefinition',
    });

    expect(instance instanceof TirlValidator).toStrictEqual(true);
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
      node: { barcodeId: '12345', imageData: '0x54321' },
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
      node: { barcodeId: '12345', imageData: '0x54321' },
    });

    instance = new TirlValidator('http://ceramic.com');

    instance.labelId = 'somethingElse';

    const { error } = await instance.validate('test_path');

    expect(error?.message).toStrictEqual(
      'Found new barcode. Create a new TirlValidator instance'
    );
  });

  test('returns labelData when no errors are thrown', async () => {
    mockFindBarcode.mockResolvedValue(
      JSON.stringify({ barcode: 'test/12345' })
    );
    mockGetLabel.mockResolvedValue({
      node: { barcodeId: '12345', imageData: '0x54321' },
    });

    mockProcessLabel.mockResolvedValue(
      JSON.stringify({
        some: 'mock',
        data: 'to',
        send: 'back',
      })
    );

    instance = new TirlValidator('http://ceramic.com');

    const res = await instance.validate('test_path');

    expect(res).toStrictEqual({
      some: 'mock',
      data: 'to',
      send: 'back',
    });
  });
});
