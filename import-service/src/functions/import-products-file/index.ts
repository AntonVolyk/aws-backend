import {handlerPath} from "@libs/handler-resolver";

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                authorizer: {
                    name: '${self:custom.authorizers.basicAuthorizer.name}',
                    arn: '${self:custom.authorizers.basicAuthorizer.arn}',
                    type: '${self:custom.authorizers.basicAuthorizer.type}'
                },
                method: 'get',
                path: 'import',
                cors: true,
                schemes: ['http', 'https'],
                request: {
                    parameters: {
                        querystrings: {
                            name: true,
                        }
                    }
                }
            }
        }
    ]
}
