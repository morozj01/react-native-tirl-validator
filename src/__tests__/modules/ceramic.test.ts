import { getPage, getAllPages, getLabel } from '../../modules/ceramic';
import { getLabelsQuery } from '../../constants/queries';
import { CeramicError } from '../../modules/errors';

describe('getPage', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  test('returns correct results', async () => {
    const executeQuery = jest.fn().mockResolvedValue({
      data: {
        tirlLabelIndex: {
          edges: 'edges',
          pageInfo: 'pageInfo',
        },
      },
    });

    const mockClient: any = { executeQuery };

    const result = await getPage(mockClient, 'cursor123');

    expect(result).toStrictEqual({
      edges: 'edges',
      pageInfo: 'pageInfo',
    });

    expect(executeQuery).toHaveBeenCalledWith(getLabelsQuery, {
      cursor: 'cursor123',
    });
  });

  test('throws when graphql returns errors', async () => {
    const executeQuery = jest.fn().mockResolvedValue({
      errors: 'an error occured',
    });

    const mockClient: any = { executeQuery };

    await expect(getPage(mockClient, 'cursor123')).rejects.toStrictEqual(
      new CeramicError({
        errors: 'an error occured',
      })
    );
  });
});

describe('getAllPages', () => {
  test('returns correct results', async () => {
    const executeQuery = jest
      .fn()
      .mockResolvedValueOnce({
        data: {
          tirlLabelIndex: {
            edges: ['1'],
            pageInfo: {
              endCursor: '123',
              hasNextPage: true,
            },
          },
        },
      })
      .mockResolvedValueOnce({
        data: {
          tirlLabelIndex: {
            edges: ['2'],
            pageInfo: {
              endCursor: '123',
              hasNextPage: true,
            },
          },
        },
      })
      .mockResolvedValueOnce({
        data: {
          tirlLabelIndex: {
            edges: ['3'],
            pageInfo: {
              endCursor: '123',
              hasNextPage: true,
            },
          },
        },
      })
      .mockResolvedValueOnce({
        data: {
          tirlLabelIndex: {
            edges: ['4'],
            pageInfo: {
              endCursor: '123',
              hasNextPage: false,
            },
          },
        },
      });

    const mockClient: any = { executeQuery };

    const result = await getAllPages(mockClient);

    expect(result).toStrictEqual(['1', '2', '3', '4']);

    expect(executeQuery).toHaveBeenCalledTimes(4);
  });
});

describe('getLabel', () => {
  test('returns correct results', async () => {
    const executeQuery = jest.fn().mockResolvedValueOnce({
      data: {
        tirlLabelIndex: {
          edges: [{ node: { barcodeId: '12345' } }],
          pageInfo: {
            endCursor: '123',
            hasNextPage: false,
          },
        },
      },
    });

    const mockClient: any = { executeQuery };

    const result = await getLabel(mockClient, '12345');

    expect(result).toStrictEqual({ node: { barcodeId: '12345' } });
  });

  test('throws when label not found', async () => {
    const executeQuery = jest.fn().mockResolvedValueOnce({
      data: {
        tirlLabelIndex: {
          edges: [{ node: { barcodeId: '54321' } }],
          pageInfo: {
            endCursor: '123',
            hasNextPage: false,
          },
        },
      },
    });

    const mockClient: any = { executeQuery };

    await expect(getLabel(mockClient, '12345')).rejects.toStrictEqual(
      new Error('Label not indexed by ceramic')
    );
  });
});
