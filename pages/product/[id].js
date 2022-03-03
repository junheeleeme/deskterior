import HeadInfo from "../../components/HeadInfo"
import { allPost } from "../../apollo/allPost"
import { getPost } from '../../apollo/post'

import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/router"
import { useEffect, useContext, useRef } from "react"
import { ThumbContext } from "../../context/ThumbContext"
import { HiArrowSmRight } from 'react-icons/hi'
import { IoIosRocket } from 'react-icons/io'
import { ImFilePicture } from 'react-icons/im'


const Index = ({post}) => {

    const { query } = useRouter();
    const { setThumb } = useContext(ThumbContext);

    const targetImg = useRef(null);
    const zoomLens = useRef(null);
    const zoomFrame = useRef(null);
    const zoomWindow = useRef(null);
    const lensScale = useRef(2); // 2 = x2

    useEffect(()=> {
        const thumbURL = post.featuredImage !== null ? post.featuredImage.node.mediaItemUrl : null; //쌈네일 유무
        setThumb(thumbURL);
        return () => {
            setThumb('/');
        }
    }, [])

    const calcDiscount = () => {
        const _price = Number(post.price.price.replace(/\,/g,''));
        const _disPrice = Number(post.sale_price.salePrice.replace(/\,/g,''));
        const discount = ((_price-_disPrice) / _price * 100).toFixed(1);
        return discount;
    }

    const mouseEnter = (e) => {
        const width = window.innerWidth;
        if(width > 1025){
            zoomLens.current.style.display = 'block';
            zoomWindow.current.style.display = 'block';
        }
    }   
    const mouseLeave = (e) => {
        const width = window.innerWidth;
        if(width > 1025){
            zoomLens.current.style.display = 'none';        
            zoomWindow.current.style.display = 'none';
        }
    }    
    const mouseMove = (e) => {

        const { left, top } = e.target.getBoundingClientRect();
        const lensHalf = zoomLens.current.clientWidth/2;

        const checkX = (e.clientX-left);
        const checkY = (e.clientY-top);

        const realX = (e.clientX-left)-lensHalf;
        const realY = (e.clientY-top)-lensHalf;
        
        const frameWidth = zoomFrame.current.clientWidth;
        const frameHeight = zoomFrame.current.clientHeight;

        //zoomLens moving
        if( checkX < lensHalf ){ // X축 - 왼쪽
            zoomLens.current.style.left = 0;
            zoomLens.current.style.top = realY + 'px';
            
            if(checkY < lensHalf){ // top-left
                zoomLens.current.style.top =  0;
            }else if( checkY > (frameHeight-lensHalf) ){ //bottom-left
                zoomLens.current.style.top =  `calc(100% - ${lensHalf*2+2}px)`;
            }  
        }else if( checkX > (frameWidth-lensHalf) ){ // X축 - 오른쪽
            zoomLens.current.style.left = `calc(100% - ${lensHalf*2+2}px)`;
            zoomLens.current.style.top = realY + 'px';
            if(checkY < lensHalf){ // top-right
                zoomLens.current.style.top =  0;
            }else if( checkY > (frameHeight-lensHalf) ){ //bottom-right
                zoomLens.current.style.top =  `calc(100% - ${lensHalf*2+2}px)`;
            }  
        }else if( checkY < lensHalf ){ // Y축 - 왼쪽
            zoomLens.current.style.left = realX + 'px'
            zoomLens.current.style.top = 0;
            if(checkY < lensHalf){ // top-left
                zoomLens.current.style.top =  0; 
            }else if( checkY > (frameHeight-lensHalf) ){ //bottom-left
                zoomLens.current.style.top =  `calc(100% - ${lensHalf*2+2}px)`;
            }  
        }else if( checkY > (frameHeight-lensHalf) ){ // Y축 - 오른쪽
            zoomLens.current.style.left = realX + 'px'
            zoomLens.current.style.top = `calc(100% - ${lensHalf*2}px)`;
            if(checkY < lensHalf){ // top-left
                zoomLens.current.style.top =  0;
            }else if( checkY > (frameHeight-lensHalf) ){ //bottom-left
                zoomLens.current.style.top =  `calc(100% - ${lensHalf*2+2}px)`;
            }  
        }else{
            zoomLens.current.style.top =  realY + 'px';
            zoomLens.current.style.left = realX + 'px';
        }
        //zoomWindow
        const {left:frameLeft, top:frameTop} = zoomFrame.current.getBoundingClientRect();
        const {x:lensLeft, y:lensTop, width:lensWid} = zoomLens.current.getBoundingClientRect();
        zoomWindow.current.style.backgroundPosition = `${(lensLeft - frameLeft) * 100 / (lensWid*2)}% ${(lensTop - frameTop) * 100 / (lensWid*2)}%`

    }

    
    return(
    <>  
    <HeadInfo og_title={post.title} og_des={post.title} og_image={post.featuredImage.node.mediaItemUrl} />
    <AnimatePresence exitBeforeEnter={true}>
        <motion.section key={query.id} transition={{ ease : "easeInOut", duration: 0.15 }}
            initial={animate.initial} animate={animate.animate} exit={animate.exit} className="relative">
                
            <div className="prod-top flex-col sm:flex-row relatvie flex justify-center">

                <div className="prod-image relative w-full sm:w-[50%] m-2 lg:m-4 text-center">
                    
                    {
                        post.featuredImage !== null
                            ?
                        <div className="relative inline-block w-auto m-auto">

                            <img ref={targetImg} src={post.featuredImage.node.mediaItemUrl} alt={post.featuredImage.node.altText !== '' ? post.featuredImage.node.altText : post.title }
                                className='max-w-full sm:max-w-[450px] w-full h-[auto] m-0 rounded-sm'/>
                            {/* ZoomFrame */}
                            <div ref={zoomFrame} className="zoomFrame absolute top-0 left-0 w-full h-full z-[999]"
                                onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} onMouseMove={mouseMove} />
                            <div ref={zoomLens} className="zoom-rens absolute hidden w-[150px] h-[150px] border bg-[rgba(0,0,0,0.1)] z-[990]"/>
                        </div>
                            :
                        <div className='block relative w-full h-[300px] bg-white rounded-[5px]'>
                            <ImFilePicture className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-5xl text-[#999999]"/>
                        </div>
                    }

                    {
                        post.rocket_delivery.rocketDelivery 
                            &&
                        <div className="rocket-icon absolute top-0 left-0 px-3 py-2 bg-[rgba(0,0,0,0.8)] text-xl text-center
                                        flex justify-center items-center z-[1000]">
                            <IoIosRocket className="inline-block text-3xl mr-1 my-auto text-[#32d2f3]"/>로켓배송 상품
                        </div>
                    }   

                </div>

                <div className="prod-info relative flex flex-col justify-between relatvie w-full sm:w-[50%] p-2 lg:p-4 whitespace-nowrap">
                    
                    
                    {  // ZoomWindow
                        post.featuredImage !== null &&
                        <div ref={zoomWindow} className='zoom-frame hidden absolute top-0 left-0 w-full h-full bg-white z-[999]'
                        style={{background : `url(${post.featuredImage.node.mediaItemUrl}) no-repeat`, backgroundSize : `${lensScale.current*100}% ${lensScale.current*100}%`}}/>
                    }
                    <h2 className="mt-6 sm:mt-0 text-lg lg:text-xl md:text-2xl dohyun font-bold whitespace-normal">{post.title}</h2>
                    <h3 className="prod-model mt-4 mb-16 sm:ty-4 sm:mb-10 dohyun text-lg md:text-xl">모델명 : {post.model_no.modelNo}</h3>

                    <div className="prod-price-wrap w-full flex justify-start items-center">
                    {
                        post.sale_price.salePrice ?
                        <>
                            <h3 className="inline-block text-lg xl:text-xl line-through decoration-2 dohyun font-bold">{post.price.price}</h3>
                            <HiArrowSmRight className="inline-block mx-1.5 my-auto text-2xl"/> 
                            <h3 className="inline-block md:text-2xl dohyun font-bold underline decoration-2 underline-offset-4 text-red-500">{post.sale_price.salePrice}원</h3>
                            <br className="block md:hidden"/>
                            <h3 className="inline-block md:text-lg minsans ml-1.5 font-bold">&#40;할인율 : {calcDiscount()}&#37;&#41;</h3>
                        </>
                            :
                        <>  
                            <h3 className="block w-full text-xl md:text-2xl dohyun font-bold flex justify-start items-center">
                                <span className="text-lg md:text-xl m-0">가격 : {post.price.price} 원</span>
                            </h3>
                        </>
                    }
                    </div>

                    <div className="h-5 sm:h-full"/>

                    <ul className="tags-wrap hidden md:flex w-full flex-start flex-wrap mb-2 py-2">
                        {
                            post.tags.nodes.map((t, idx)=> 
                                <li key={t.name+idx} className="tag-btn relative inline-block m-0 mr-1.5 mb-1.5 px-1.5 py-0.5 text-sm text-[#a6a6a6] rounded-lg">
                                    {t.name}
                                </li>
                            )
                        }
                    </ul>
                    <div className="buy-btn-wrap w-full pointer">
                    {
                        post.rocket_delivery.rocketDelivery ?
                        <Link href={post.buylink.buyLink}>
                            <a target="_blank" className="rocket-buy-btn relative block w-full h-12 border hover:border-red-500 text-center rounded-sm transition-[border] overflow-hidden">
                                <span className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[100]">로켓배송으로 구매하기</span>
                                <span className="hoverEffect inline-block absolute top-[100%] left-0 w-full h-full bg-red-600 z-[90] transition-[top] duration-600 ease-in-out"/>
                                <IoIosRocket className="hoverRocket text-3xl text-[#32d2f3]" />
                            </a>
                        </Link>
                            :
                        <Link href={post.buylink.buyLink}>
                            <a target="_blank" className="buy-btn relative block w-full h-12 border hover:border-red-500 text-center rounded-sm transition-[border] overflow-hidden">
                                <span className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[100]">구매하기</span>
                                <span className="hoverEffect inline-block absolute top-[100%] left-0 w-full h-full bg-red-600 z-[90] transition-[top] duration-600 ease-in-out"/>
                            </a>
                        </Link>
                    }
                    
                    </div>
                </div>

            </div>

            <div className="prod-sub-head max-w-screen-lg mx-auto mt-10 border-b border-[#707070]">
                <h3 className="inline-block px-8 py-2 text-xl md:text-2xl font-bold rounded-t-sm border-x border-t border-[#707070] dark:bg-[#303030]">
                    상품정보
                </h3>
            </div>

            <div className="prod-content max-w-screen-lg mx-auto px-4 py-10 sm:py-12 lg:py-16" 
                dangerouslySetInnerHTML={{__html : post.content}} />
            
            <div className="bottom-btn-wrap absolute bottom-0 left-0 w-full py-5 bg-[#242525]">
                <div className="max-w-screen-lg w-[300px] mb-4 text-sm text-gray-400 text-center">
                    <Link href={post.buylink.buyLink} passHref>
                        <a target="_blank" className="block w-full py-2 text-white text-lg border border-white rounded">
                            상세정보 더보기 +
                        </a>
                    </Link>
                </div>

                <div className="max-w-screen-lg w-full text-sm text-gray-400 text-center">
                    <Link href={post.buylink.buyLink} passHref>
                        <a target="_blank" className="block w-[300px] py-2 text-lg text-white border border-white rounded">
                            상품평 보러가기
                        </a>
                    </Link>
                </div>
            </div>

            <div className="text-sm text-gray-400 text-center">
                쿠팡 파트너스 활동을 통해 일정액의 수수료를 제공받을 수 있습니다.
            </div>

        </motion.section>
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
    const path = await allPost();
    if(path !== null){
        const paths = path.map(p=>{
            return{
                params : { id : p.postId.toString() },
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
    const post = await getPost(id);
    return{
        props: { post : post }
    }
}


export default Index