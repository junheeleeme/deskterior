import Link from "next/link"
import { IoIosRocket } from 'react-icons/io'
import { HiArrowSmLeft } from 'react-icons/hi'
import { ImFilePicture } from 'react-icons/im'

const GridItem = ({url, title, thumb, alt, price, salePrice, rocket }) => {

    return(
    <article className="grid-item relative w-full dohyun rounded-[5px] transition overflow-hidden">
        <Link href={'/product/'+url} passHref scroll={true}>
            <a className="inline-block w-full h-full">
                {/* 로켓배송 */}
                {
                    rocket &&

                    <div className="rocket-icon absolute top-0 right-[-1px] px-2 py-1 bg-[rgba(0,0,0,0.8)] text-sm text-center rounded-bl-[5px] z-[999]">
                        <IoIosRocket className="inline-block text-xl mr-1 my-auto text-[#32d2f3]"/>로켓배송
                    </div>

                }

                <div className="item-img-wrap w-[260px] h-[260px] overflow-hidden">
                    {
                        thumb && <img src={thumb} alt={alt === '' ? title : alt} className='thumb-img transition duration-300 lg:hover:scale-[1.25] rounded-[5px]'/>
                    }
                    {
                        !thumb && 
                        <div className='block relative w-full h-full bg-white rounded-[5px]'>
                            <ImFilePicture className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-5xl text-[#999999]"/>
                        </div>
                    }
                </div>

                <div className="px-0.5">
                    {/* 상품 이름 */}
                    <h2 className="mt-3 text-md md:text-md lg:text-[1rem] font-bold twoline">
                        {title}
                    </h2>
                    {/* 가격 표시 */}
                    <h3 className="flex justify-end items-center mt-1.5 text-md sm:text-md md:text-lg whitespace-nowrap">
                        {
                            rocket && <IoIosRocket className="inline-block text-xl mx-1 my-auto text-[#32d2f3]"/>
                        }
                        {
                            salePrice ?
                            <>
                                <p className="inline-block relative top-[2px] underline decoration-2 underline-offset-4 m-0 text-red-500">{salePrice}원</p>
                                <HiArrowSmLeft className="mx-1.5 my-auto text-2xl"/> 
                                <p className="inline-block relative top-[2px] line-through decoration-2 m-0">{price}원</p>
                            </>
                                :
                                <p className="inline-block relative top-[2px] m-0">{price}원</p>
                        }
                    </h3>
                </div>
            </a>
        </Link>
    </article>
    )
}

export default GridItem