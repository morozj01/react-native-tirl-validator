describe('nativeValidator', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('returns validator when it exists', async () => {
    jest.mock('react-native', () => ({
      NativeModules: {
        TirlValidator: 'validator_module',
      },
      Platform: {
        select: jest.fn(),
      },
    }));
    const { nativeValidator } = require('../../modules/native');
    expect(nativeValidator).toStrictEqual('validator_module');
  });

  test('throws error when it does not', async () => {
    jest.mock('react-native', () => ({
      NativeModules: {},
      Platform: {
        select: () => 'You did this thing',
      },
    }));
    try {
      const { nativeValidator } = require('../../modules/native');
      expect(nativeValidator).toStrictEqual(undefined);
    } catch (err: any) {
      expect(err.message).toStrictEqual(
        `The package 'tirl-validator' doesn't seem to be linked. Make sure: \n\n` +
          'You did this thing' +
          '- You rebuilt the app after installing the package\n' +
          '- You are not using Expo Go\n'
      );
    }
  });
});
