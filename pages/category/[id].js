import HeadInfo from "../../components/HeadInfo"
import { getPosts } from "../../apollo/catePosts"
import { getMenu } from "../../apollo/menu"

import { AnimatePresence, motion } from "framer-motion"
import GridItem from "../../components/GridItem"
import { useRouter } from "next/router"
import { useState, useEffect, useRef } from "react"



const Index = ({posts, keywordList}) => {

    const { query, events } = useRouter();
    const [selectKey, setSelectKey] = useState('');
    const [filter, setFilter] = useState([]);
    const keywordRef = useRef(null);
    
    useEffect(()=>{
        events.on('routeChangeComplete', ()=> { //키워드 선택 초기회
            setSelectKey('');
        });
    }, [])

    useEffect(()=> { //키워드 선택시 상품 필터링
        const postFilter = posts.filter(p=>{
            const isInc = p.tags.nodes.some(_p =>
                selectKey.includes(_p.name)
            )
            if(isInc) return p;            
        })
        setFilter(postFilter);
    }, [selectKey]);


    const activeBtn = (e) => {
        const isContain = e.target.classList.contains('selected');
        const value = e.target.dataset.value;

        if(!isContain){ //필터 추가    
            // setKeyword(prev=> [...prev, value]); *** 복수 키워드 선택

            keywordRef.current.childNodes.forEach(k=> k.classList.remove('selected') ) //
            setSelectKey(value);
            e.target.classList.add('selected'); 
        }else{ //필터 제거
            // setKeyword(prev=>{ *** 복수 키워드 선택
            //     const temp = prev;
            //     const idx = temp.indexOf(value);
            //     temp.splice(idx, 1);
            //     console.log('변경!');
            //     return [...temp];
            // });
            setSelectKey('');
            e.target.classList.remove('selected'); 
        }
    }  

    const uperCase = (str) => {
        return str.replace(/^./, str[0].toUpperCase());
    }

    console.log(uperCase(query.id))

    return(
    <> 
        <HeadInfo og_title={uperCase(query.id) && uperCase(query.id)} og_image={`https://www.deskterior.shop/primary/${query.id}.webp`} 
                og_des={'데스크테리어샵 상품 카테고리 - ' + uperCase(query.id)}/>

        <AnimatePresence exitBeforeEnter={true}>
            
            <motion.div key={query.id} transition={{ ease : "easeInOut", duration: 0.3 }}
                initial={animate.initial} animate={animate.animate} exit={animate.exit} >
                
                <section className="keyword-search mb-10">
                    
                    <h2 className="text-xl cp mb-4 pl-5 dohyun">키워드 선택</h2>

                    <div ref={keywordRef} className="keyword-filter flex flex-wrap justify-start">
                    {
                        keywordList &&

                        keywordList.map((t, idx) => 
                            <button key={t+idx} onClick={activeBtn} data-value={t.trim()}
                            className="keyword-btn relative inline-block flex justify-center items-center py-1 px-2 md:py-1 md:px-3 my-1 mx-1 text-sm md:text-base  font-normal text-[#b0b0b0] 
                            rounded transition-all duration-300 hover:text-[#22C55E]">
                                {t.trim()}
                            </button>
                        )
                    }
                    </div>

                </section>

                <section className="category-list">

                    {  
                        selectKey === '' && posts && 
                        <h2 className="text-xl cp mb-8 pl-5 dohyun">전체상품 {posts.length}개</h2>
                    }
                    {
                        selectKey !== '' &&
                        <h2 className="text-xl cp mb-8 pl-5 dohyun">{selectKey} : {filter.length}개</h2>
                    }

                    <div className="category-list-wrap">
                        {/* 전체상품 리스트 */}
                        {  
                            !selectKey && posts && 

                            posts.map(p=>{
                                const thumbURL = p.featuredImage !== null ? p.featuredImage.node.mediaItemUrl : null; //쌈네일 유무
                                const thumbAlt = thumbURL ? p.featuredImage.node.altText : null;
                                return(
                                <GridItem key={p.postId} url={p.postId} title={p.title} thumb={thumbURL} alt={thumbAlt}
                                price={p.price.price} salePrice={p.sale_price.salePrice} rocket={p.rocket_delivery.rocketDelivery}/>    
                                )
                            })
                            
                        }
                        {/* 키워드 선택상품 리스트 */}
                        {
                            selectKey !== 0 &&

                            filter.map(p=>{
                                const thumbURL = p.featuredImage !== null ? p.featuredImage.node.mediaItemUrl : null;
                                const thumbAlt = thumbURL ? p.featuredImage.node.altText : null;
                                return(
                                <GridItem key={p.postId} url={p.postId} title={p.title} thumb={thumbURL} alt={thumbAlt}
                                price={p.price.price} salePrice={p.sale_price.salePrice} rocket={p.rocket_delivery.rocketDelivery}/>    
                                )
                            })
                        }
                    </div>

                </section>
            </motion.div>
        </AnimatePresence>
    </>
    )
}
const animate = {
    initial :{ //none use
        opacity : 0,
    },
    animate : {
        opacity: 1,
    },
    exit : {
        opacity: 0,
    }
}

export const getStaticPaths = async() => {
    const path = await getMenu();
    if(path !== null ){
        const paths = path.map(p=>{
            return{
                params : { id : p.slug },
            }
        });
        return { paths, fallback : false }
    }else{
        return{
            notFound : true
        }
    }
}

export const getStaticProps = async({params}) => {

    const { id } = params;
    const posts = await getPosts(id);

    const _keyword = [];
    posts.map(p=> p.tags.nodes.map(tag=> _keyword.push(tag.name) ));
    const keyword = _keyword.filter( (t, idx) => _keyword.indexOf(t) === idx );

    return{
        props: {
            posts : posts,
            keywordList : keyword
        }
    }
}


export default Index