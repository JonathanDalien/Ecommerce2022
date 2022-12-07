import { UpperBanner } from "../components";
import Categories from "../components/Categories";
import Newsletter from "../components/Newsletter";
import Trends from "../components/Trends";
import { client } from "../lib/client";
import { useStateContext } from "../context/StateContext";
import Head from "next/head";

export default function Home({ products, categories, productsOffer }) {
  const { user } = useStateContext();

  return (
    <>
      <Head>
        <title>Electronics.</title>
      </Head>
      <div className="bg-slate-200 ">
        <UpperBanner bannerData={productsOffer} />
      </div>
      <div className="bg-slate-100 ">
        <Categories categories={categories} />
      </div>
      <div id="beliebt" className="text-blac bg-slate-200 ">
        <Trends products={products} />
      </div>
      <div className="bg-slate-200 text-black">
        <Newsletter />
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  const query = '*[_type=="product" && isTrend == true]';
  const catQuery = '*[_type=="categories"]';
  const offerQuery = '*[_type=="product"&& isSale == true][2]';
  const productsOffer = await client.fetch(offerQuery);
  const categories = await client.fetch(catQuery);
  const products = await client.fetch(query);
  return {
    props: { products, categories, productsOffer },
  };
};
