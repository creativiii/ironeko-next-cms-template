import React from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';
import Head from 'next/head';
import PropTypes from 'prop-types';
import '../public/css/style.css';
import '../public/css/dracula.css';

Router.events.on('routeChangeStart', url => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});
Router.events.on('routeChangeError', () => NProgress.done());

const editor = 'editor.commentcarp.club';

const Ironeko = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />

      {process.env.NODE_ENV === 'production' ? (
        <script
          defer
          dangerouslySetInnerHTML={{
            __html: `window.onload = ()=>{
              let s=document.createElement("script");const n=document.createAttribute('data-name');
              n.value="commentcarp";s.setAttributeNode(n);const k=document.createAttribute('data-key');
              k.value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmlnaW4iOiJpcm9uZWtvLmNvbSIsImlhdCI6MTYzMjc1NjkxNX0.NZrsIIYMQt7H7bFpRto84ceOoUICc-anXDDrOkHwAE0";
              s.setAttributeNode(k);s.src="https://${editor}/assets/commentcarp.js";document.body.append(s);
              window.dispatchEvent(new Event("initCommentCarp"));}`,
          }}
        />
      ) : (
        <script
          defer
          dangerouslySetInnerHTML={{
            __html: `window.onload = ()=>{
                let s=document.createElement("script");s.type = "module";const n=document.createAttribute('data-name');
                n.value="commentcarp";s.setAttributeNode(n);const k=document.createAttribute('data-key');
                k.value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmlnaW4iOiJpcm9uZWtvLmNvbSIsImlhdCI6MTYzMjc1NjkxNX0.NZrsIIYMQt7H7bFpRto84ceOoUICc-anXDDrOkHwAE0";
                s.setAttributeNode(k);s.src="http://localhost:9999/src/main.ts";document.body.append(s);
                window.dispatchEvent(new Event("initCommentCarp"));}`,
          }}
        />
      )}
    </>
  );
};

Ironeko.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default Ironeko;
