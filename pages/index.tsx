import React from 'react';
import Metatags from 'components/metatags';

interface HomeInterface {}

const HomePage = ({}: HomeInterface) => {
  return (
    <>
      <Metatags
        meta={{
          title: 'My site',
          slug: null,
          description: 'My new meta description.',
          thumbnail: '',
        }}
      />
    </>
  );
};

export const getStaticProps = async () => {
  return {
    props: {},
  };
};

export default HomePage;
