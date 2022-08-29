import {middyfy} from '@libs/lambda';

const basicAuthorizer = async (event) => {
  const { authorizationToken } = event;
  const token = authorizationToken.split(' ').pop();

  const { USER } = process.env;
  const { PASSWORD } = process.env;

  const auth = Buffer.from(`${USER}:${PASSWORD}`).toString('base64');
  const Effect = token === auth ? 'Allow' : 'Deny';

  return {
    principalId: token as string,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: '*',
          Effect,
          Resource: '*',
        },
      ],
    },
  };
};

export const main = middyfy(basicAuthorizer);
