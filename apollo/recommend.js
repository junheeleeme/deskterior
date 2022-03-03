import { gql } from 'apollo-boost'
import { client } from './apollo'

export const getRecommend = async() => {

    const _query = gql`
    query recommendPosts {
        posts(where: {categoryName: "recommend"}) {
            nodes {
                title
                postId
                featuredImage {
                    node {
                        altText
                        mediaItemUrl
                    }
                }
                price {
                    price
                }
                rocket_delivery {
                    rocketDelivery
                }
                sale_price {
                    salePrice
                }
                slug
                tags {
                    nodes {
                        name
                    }
                }
            }
        }
    }
    `
    try{
        const getData = await client.query({ query : _query });
        const posts = getData.data.posts.nodes[0];
        return posts;
    }catch(err){
        console.log(err);
        return null;
    };
    
}

export default getPost