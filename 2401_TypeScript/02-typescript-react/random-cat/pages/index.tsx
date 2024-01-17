import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import style from "./index.module.css";

type Props = {
  initialImageUrl: string;
};

const IndexPage: NextPage<Props> = ({ initialImageUrl }) => {
  const [imageUrl, setImageUrl] = useState(initialImageUrl); // 初期値を渡す
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   fetchImage().then((newImage) => {
  //     setImageUrl(newImage.url);
  //     setLoading(false);
  //   });
  // }, []);

  const handleChange = async () => {
    setLoading(true);
    const newImage = await fetchImage();
    setImageUrl(newImage.url);
    setLoading(false);
  };
  return (
    <div className={style.page}>
      <button onClick={handleChange} className={style.button}>
        ほかのにゃんこも見る
      </button>
      <div className={style.frame}>
        {loading ? "loading..." : <img src={imageUrl} className={style.img} />}
      </div>
    </div>
  );
};
export default IndexPage;
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const image = await fetchImage();
  return {
    props: {
      initialImageUrl: image.url,
    },
  };
};

type Image = {
  url: string;
};
const fetchImage = async (): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  // console.log(images);
  return images[0];
};
