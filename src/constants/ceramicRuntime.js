// This is an auto-generated file, do not edit manually
export const definition = {
  models: {
    TirlLabel: {
      id: 'kjzl6hvfrbw6c77btq91imywzoedgg32ghix9h5x9p620hs83t2rp75d8qbyi8n',
      accountRelation: { type: 'list' },
    },
  },
  objects: {
    TirlLabel: {
      labelId: { type: 'string', required: true },
      imageData: { type: 'string', required: true },
      symbology: { type: 'string', required: true },
      uploadTime: { type: 'datetime', required: true },
    },
  },
  enums: {},
  accountData: { tirlLabelList: { type: 'connection', name: 'TirlLabel' } },
};
