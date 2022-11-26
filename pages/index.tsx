import React from 'react';
import { Product, FooterBanner, HeroBanner } from "./components";
import { client } from '../lib/client';

const Home = ({products, bannerData}) => {
  return(
    <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>
      {/* {console.log(bannerData[0].buttonText)} */}
      <div className="products-heading">
        <h2>Index</h2>
        <p>some product informations</p>
      </div>

      <div className="products-container">
        {products?.map((product)=> product.name)}
      </div>

      <footer>
        Footer
      </footer>

    </div>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: {products, bannerData}
  }
}

export default Home