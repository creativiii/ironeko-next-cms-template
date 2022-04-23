import NextImage from "next/image";

export const mdxComponents = {
  img: props => {
    console.log("NextImage Props: ", props);
    return <NextImage {...props} layout="responsive" />;
  }
};
