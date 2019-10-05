const graphql = require('graphql');

const pingType = new graphql.GraphQLObjectType({
    name: 'PingData',
    fields: {
        message: {
            type: graphql.GraphQLString,
        }
    }
})

const GetPingQuery = {
    type: pingType,
    resolve: () => ({
        message: 'hello world, test ping graphql'
    })
}

module.exports = GetPingQuery;