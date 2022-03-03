import { useEffect } from "react"
import Link from "next/link"

const MenuModal = ({menu, closeMenu, query}) => {

    useEffect(()=>{
        document.addEventListener('mousedown', clickCheck);
        window.addEventListener('resize', closeMenu);
        return () => {
            document.removeEventListener("mousedown", clickCheck);
            window.removeEventListener("resize", closeMenu);
        };
    }, []);

    const clickCheck = (e) =>{
        const chk_class = e.target.classList.contains('modal');
        if(chk_class === false) closeMenu();
    }

    return(
    <>
    { menu &&
        menu.map(m =>
            <li key={m.slug + m.categoryId} className="modal block w-[220px] text-lg text-white text-center">
                <Link scroll={false} href={`/category/${m.slug}`} passHref>
                    <a className={`modal block w-full py-3 hover:bg-[rgba(255,255,255,0.2)] hover:text-green-500 transition duration-100 ${query.id===m.slug?'text-green-500 bg-[rgba(255,255,255,0.1)]':''} `}>
                        {m.name}
                    </a>
                </Link>
            </li>
        )
    }
    </>
    )
}

export default MenuModal