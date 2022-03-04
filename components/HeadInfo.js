import Head from "next/head"

const HeadInfo = ({og_title, og_image, og_des}) => {


    return(
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta property="og:title" content={og_title ? "데스크테리어샵 : " + og_title : "데스크테리어샵"} />
            <meta property="og:url" content="https://www.deskterior.shop" />
            <meta property="og:description" content={og_des ? og_des : '데스크테리어샵 데스크탑, 모니터, 노트북, 모니터암, 키보드/마우스, 주변기기'} />
            <meta property="og:site_name" content="데스크테리어샵" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content={og_image} />

            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:title" content={og_title ? "데스크테리어샵 - " + og_title : "데스크테리어샵"} />
            <meta name="twitter:description" content={og_des ? og_des : '데스크테리어샵 데스크탑, 모니터, 노트북, 모니터암, 키보드/마우스, 주변기기'} />
            <meta name="twitter:image" content={og_image} />
            <meta name="twitter:domain" content="https://www.deskterior.shop" />
            
            <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
            <meta name="description" content={og_des ? '데스크테리어샵 쇼핑몰, 데스크 위에 나만의 인테리어를 꾸며보세요. ' + og_des : '데스크테리어샵 쇼핑몰, 데스크 위에 나만의 인테리어를 꾸며보세요.'}/>
            <title>데스크테리어샵 - {og_title}</title>
        </Head>
    )
}

export default HeadInfo