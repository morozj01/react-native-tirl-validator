const getLabelsQuery = `
query ($cursor: String) {
  tirlLabelIndex(first: 100, after: $cursor) {
    edges {
      node {
        id
        labelId
        symbology
        imageData
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
