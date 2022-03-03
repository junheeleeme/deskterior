import HeadInfo from "./HeadInfo"
import { useRouter } from "next/router"
import { AnimatePresence, motion } from "framer-motion"
import { MenuContext } from "../context/MenuContext"
import { ThumbContext } from "../context/ThumbContext"

import { useContext, useEffect, useRef } from "react"


const PrimaryBg = () => {

    const { query, pathname } = useRouter();
    const effect = useRef(null);

    const menu = useContext(MenuContext);
    const { thumb } = useContext(ThumbContext);
    const current = menu.filter(m=> query.id === m.slug);
    
    useEffect(()=> {
        document.addEventListener('scroll', scrollEvent);
    }, []);

    const scrollEvent = () => {
        const top = window.scrollY;
        if(top < 400){
            effect.current.style.transform = `translateY(${top*0.5}px)`;
        }
    }

    const imageOnload = (e) =>{
        e.target.classList.replace('opacity-0', 'opacity-100')
    }

    return(
    <>
        <div className="primary block pt-16 dohyun">
            <div ref={effect} className="primary-wrap relative w-full h-[300px] sm:h-[350px] lg:min-h-[400px] overflow-hidden">   
                {
                    !pathname.includes('[id]') &&
                    <img src={`/primary/main.webp`} alt="primary image"
                    className="absolute top-[calc(50%-2rem)] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[0] max-w-[none]
                    w-[160%] md:w-full transition duration-300"/>
                }                
                {
                    pathname.includes('category') && 
                    <img src={`/primary/${query.id}.webp`} alt="primary image"
                    className="absolute top-[calc(50%-2rem)] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[0] max-w-[none]
                    w-[160%] lg:w-full transition duration-300"/>
                }
                {
                    pathname.includes('product') &&
                    <img src={thumb} alt="primary image" onLoad={imageOnload}
                    className="absolute top-[calc(50%-2rem)] left-[50%] translate-x-[-50%] translate-y-[-50%] opacity-0 z-[0] max-w-[none]
                    w-[auto] lg:w-full transition duration-500"/>
                }

                    <div className="site-title-wrap block absolute flex flex-col justify-center items-center w-full h-full pb-[4rem] text-white bg-[rgba(0,0,0,0.5)]">

                        <h2 className="block py-3 text-4xl md:text-5xl mb-2 font-bold  decoration-3 underline-offset-8">
                            {process.env.NEXT_PUBLIC_TITLE}
                        </h2>

                        <AnimatePresence exitBeforeEnter>  
                            <motion.h3 key={query.id} transition={{ ease : "easeInOut", duration: 0.25 }} initial={animate.initial} animate={animate.animate} exit={animate.exit}
                            className="block py-2 text-2xl md:text-3xl mt-2" >
                                { current[0] ? current[0].description : '데스크 위에 나만의 인테리어' }
                            </motion.h3>
                        </AnimatePresence>

                    </div>

            </div>
        </div>
    </>
    )
}

const animate = {
    initial :{ //none use
        opacity : 0,
        transform : 'translateY(10px)',
    },
    animate : {
        opacity: 1,
        transform : 'translateY(0px)',
    },
    exit : {
        opacity: 0,
        transform : 'translateY(10px)',
    }
}

export default PrimaryBg