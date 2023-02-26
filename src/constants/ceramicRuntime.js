// This is an auto-generated file, do not edit manually
export const definition = {
  models: {
    TirlLabel: {
      id: 'kjzl6hvfrbw6c8pguk3l4pesszi577f708fw69u0p2gz50opnpm98qwt5vdry9m',
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
