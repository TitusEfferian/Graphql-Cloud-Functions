const graphql = require('graphql');
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const db = admin.firestore();

const addType = new graphql.GraphQLObjectType({
    name: 'AddUserDataResult',
    fields: {
        message: {
            type: graphql.GraphQLString,
        },
        success: {
            type: graphql.GraphQLBoolean,
        },
        rawResult: {
            type: graphql.GraphQLString,
        }
    }
})

const AddUserData = {
    type: addType,
    resolve: async (_, { name, nim }) => {
        try {
            const rawResult = await db.collection('users').doc('users').set({ name, nim })
            return {
                message: 'success insert data',
                success: true,
                rawResult: JSON.stringify(rawResult),
            }
        } catch(error) {
            return {
                message: error.toString(),
                success: false,
            }
        }
    },
    args: {
        name: {
            type: graphql.GraphQLString,
        },
        nim: {
            type: graphql.GraphQLString,
        }
    }
}

module.exports = AddUserData;