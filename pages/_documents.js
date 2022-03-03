import Document, { Html, Main, NextScript } from 'next/document'
import Head from 'next/head';

export default class MyDocument extends Document {

    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }
    
    render() {
    return (
        <Html lang="ko">            
            <body>
                <Main/>
                <NextScript />
            </body>
        </Html>
    );
    }
}