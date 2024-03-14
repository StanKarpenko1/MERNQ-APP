const { project, clients } = require ('../sampleData.js');

//#region require graphql
const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLID, 
    GraphQLSchema, 
    GraphQLList
} = require ('graphql')
//#endregion require graphql

// Client Type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID},
        name: { type: GraphQLString},
        email: { type: GraphQLString},
        phone: { type: GraphQLString},
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        clients: {
            type: new GraphQLList (ClientType),
            resolve (parents, args){
                return clients
            }
        },  
        client: {
            type: ClientType,
            args: { id: {type: GraphQLID}},
            resolve (parent, args) {
                return clients.find(client => client.id === args.id);
            }

        }
    }
});

module.exports = new GraphQLSchema ({
    query: RootQuery
})