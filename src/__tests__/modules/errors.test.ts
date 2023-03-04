import { ErrorWithCode } from '../../modules/errors';

describe('ErrorWithCode', () => {
  test('constructor instantiates object correctly', () => {
    const error = new ErrorWithCode({ message: 'error message', code: 999 });

    expect(error.message).toStrictEqual('error message');

    expect(error.code).toStrictEqual(999);
  });
});
