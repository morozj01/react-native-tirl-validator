import { getLabel } from '../../modules/ceramic';
import { ErrorWithCode } from '../../modules/errors';

global.fetch = jest.fn();

const mockFetch = global.fetch as jest.Mocked<any>;

describe('getLabel', () => {
  test('returns correct results', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => ({ mock: 'label' }),
    });

    const result = await getLabel('http://tirl.com', '12345');

    expect(mockFetch).toHaveBeenCalledWith(
      'http://tirl.com/api/label?labelId=12345'
    );
    expect(result).toStrictEqual({ mock: 'label' });
  });

  test('throws when label not found', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    await expect(getLabel('http://tirl.com', '12345')).rejects.toStrictEqual(
      new ErrorWithCode({ message: 'Label not indexed by ceramic', code: 4 })
    );
  });

  test('throws when network errors', async () => {
    mockFetch.mockRejectedValue({
      network: 'error',
    });

    await expect(getLabel('http://tirl.com', '12345')).rejects.toStrictEqual(
      new ErrorWithCode({
        message: 'Error retrieving data from ceramic node',
        code: 3,
      })
    );
  });
});
