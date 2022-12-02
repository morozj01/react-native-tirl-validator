import { CeramicError } from '../../modules/errors';

describe('CeramicError', () => {
  test('constructor instantiates object correctly', () => {
    const error = new CeramicError({ error: 'data' });

    expect(error.message).toStrictEqual(
      'Errors retrieving data from ceramic node'
    );

    expect(error.errors).toStrictEqual({
      error: 'data',
    });
  });
});
