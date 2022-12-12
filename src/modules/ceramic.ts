import type { ComposeClient } from '@composedb/client';
import { getLabelsQuery } from '../constants/queries';
import { CeramicError } from './errors';

const getPage = async (client: ComposeClient, cursor?: string) => {
  const result: any = await client.executeQuery(getLabelsQuery, { cursor });

  if (result.errors) throw new CeramicError(result.errors);

  return {
    edges: result?.data?.tirlLabelIndex?.edges,
    pageInfo: result?.data?.tirlLabelIndex?.pageInfo,
  };
};

const getAllPages = async (client: ComposeClient) => {
  const results = [];

  let pageData = await getPage(client);
  results.push(...pageData.edges);
  let hasNextPage = pageData.pageInfo.hasNextPage;

  while (hasNextPage) {
    pageData = await getPage(client, pageData.pageInfo.endCursor);
    results.push(...pageData.edges);
    hasNextPage = pageData.pageInfo.hasNextPage;
  }

  return results;
};

const getLabel = async (client: ComposeClient, labelId: string) => {
  const labels = await getAllPages(client);

  const label = labels.find((edge: { node: { barcodeId: string } }) => {
    return edge.node?.barcodeId === labelId;
  });

  if (label) return label;
  throw new Error('Label not indexed by ceramic');
};

export {
  getLabel,

  //exported for unit testing
  getPage,
  getAllPages,
};
