const getLabelsQuery = `
query ($cursor: String) {
  tirlLabelIndex(first: 100, after: $cursor) {
    edges {
      node {
        barcodeId
        imageData
        id
        uploadTime
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}`;

export { getLabelsQuery };
