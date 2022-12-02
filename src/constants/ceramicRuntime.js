// This is an auto-generated file, do not edit manually
export const definition = {
  models: {
    TirlLabel: {
      id: 'kjzl6hvfrbw6c65z7bpyak6mgz9maadbucil8sey0lkuy9ebiinbjl0vd9ygal4',
      accountRelation: { type: 'list' },
    },
  },
  objects: {
    TirlLabel: {
      barcodeId: { type: 'string', required: true },
      imageData: { type: 'string', required: true },
      uploadTime: { type: 'datetime', required: true },
    },
  },
  enums: {},
  accountData: { tirlLabelList: { type: 'connection', name: 'TirlLabel' } },
};
