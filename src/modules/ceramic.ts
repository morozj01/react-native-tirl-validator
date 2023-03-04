import { ErrorWithCode } from './errors';

const getLabel = async (labelApi: string, labelId: string) => {
  let response;

  try {
    response = await fetch(`${labelApi}/api/label?labelId=${labelId}`);
  } catch (err: any) {
    //Network Error
    throw new ErrorWithCode({
      message: 'Error retrieving data from ceramic node',
      code: 3,
    });
  }

  if (response.ok) {
    const label = await response.json();
    return label;
  }

  //404 Response from API
  throw new ErrorWithCode({
    message: 'Label not indexed by ceramic',
    code: 4,
  });
};

export { getLabel };
