import { UpperBanner } from "../components";
import Categories from "../components/Categories";
import Newsletter from "../components/Newsletter";
import Trends from "../components/Trends";
import { client } from "../lib/client";
import { useStateContext } from "../context/StateContext";

export default function Home({ products, categories }) {
  const { user } = useStateContext();
  return (
    <>
      <div className="bg-slate-200">
        <UpperBanner />
      </div>
      <div className="bg-slate-100">
        <Categories categories={categories} />
      </div>
      <div id="beliebt" className="bg-slate-200">
        <Trends products={products} />
      </div>
      <div className="bg-slate-200 ">
        <Newsletter />
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  const query = '*[_type=="product" && isTrend == true]';
  const catQuery = '*[_type=="categories"]';
  const categories = await client.fetch(catQuery);
  const products = await client.fetch(query);
  return {
    props: { products, categories },
  };
};
