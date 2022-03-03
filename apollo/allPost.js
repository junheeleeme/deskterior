import { gql } from 'apollo-boost'
import { client } from './apollo'

export const allPost = async() => {

    const _query = gql` 
    query getAllPost {
        posts(first:100 where: {categoryName: "deskterior"}) {
            nodes {
                postId
            }
        }
    }
    `

    try{
        const getData = await client.query({ query : _query });
        const posts = getData.data.posts.nodes;
        return posts;
    }catch(err){
        console.log(err);
        return null;
    };
    
}

export default allPost