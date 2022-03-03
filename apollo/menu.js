import { gql } from 'apollo-boost'
import { client } from '../apollo/apollo'

export const getMenu = async() => {

    const _query = gql`
    query getCate {
        categories(where: {parent: 64}) {
            nodes {
                name
                slug
                categoryId
                description
            }
        }
    }
`;

    try{
        const getData = await client.query({ query : _query });
        const menu = getData.data.categories.nodes;
        return menu;
    }catch (err){
        console.log(err);
        return [];
    }

}

export default getMenu