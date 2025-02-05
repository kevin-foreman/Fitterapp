import { ApolloServer } from 'apollo-server-micro'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { typeDefs } from '../../apollo/typeDefs';
import { resolvers } from '../../apollo/resolvers';
import { NextApiRequest, NextApiResponse } from 'next';
import cors from 'micro-cors'

const Cors = cors({
    allowCredentials: true,
})

const server = new ApolloServer({
    resolvers,
    typeDefs,
    // returning the context with each request
    context(ctx) {
        return ctx
    },
    introspection: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})],
})

const startServer = server.start()
const graphqlPath = '/api/graphql'

const startMongooseApollo = async (req: NextApiRequest, res: NextApiResponse) => {
    await startServer
    await server.createHandler({ path: graphqlPath })(req, res)
}

export const config = {
    api: {
        bodyParser: false
    }
}
// @ts-ignore 
// cookies still not being sent to server from client apollo
export default Cors(startMongooseApollo)