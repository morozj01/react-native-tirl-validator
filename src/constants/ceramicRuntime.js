// This is an auto-generated file, do not edit manually
export const definition = {
  models: {
    TirlLabel: {
      id: 'kjzl6hvfrbw6c71efda5zvckzvnjtig2l3ktiykd6s156xuwikrg1rmrvah3855',
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
