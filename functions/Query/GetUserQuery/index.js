const graphql = require('graphql');
const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const userType = new graphql.GraphQLObjectType({
    name: 'UserData',
    fields: {
        nim: {
            type: graphql.GraphQLString
        },
        name: {
            type: graphql.GraphQLString,
        }
    }
})

const GetUserQuery = {
    type: graphql.GraphQLList(userType),
    resolve: async () => {
        const result = await db.collection('users').get();
        const data = []
        result.forEach((doc) => {
            data.push(doc.data())
        })
        return data;
    },
}

module.exports = GetUserQuery

