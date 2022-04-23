import { Config } from 'site.config';
import Head from 'next/head';

const baseUrl = Config.base;

interface MetatagsInterface {
  slug: string | null;
  title: string;
  description: string;
  thumbnail: string;
}

const Metatags = ({ meta }: { meta: MetatagsInterface }) => {
  const { title, description, thumbnail, slug } = meta;
  return (
    <Head>
      <title>{title} - Ironeko</title>
      <link rel="canonical" href={`${baseUrl}/${slug || ''}`} />
      <meta name="title" content={`${title} - Ironeko`} />
      <meta name="description" content={description} />

      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`${baseUrl}/${`${slug ? `${slug}` : ''}`}`}
      />
      <meta property="og:title" content={`${title} - Ironeko`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${baseUrl}${thumbnail}`} />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:url"
        content={`${baseUrl}/${`${slug ? `${slug}` : ''}`}`}
      />
      <meta property="twitter:title" content={`${title} - Ironeko`} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${baseUrl}/${thumbnail}`} />
    </Head>
  );
};

export default Metatags;
