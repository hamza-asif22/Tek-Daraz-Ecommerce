import React from 'react';
import Hero from '../components/Hero';
import LatestCollection from '../components/LatestCollection';
import BestSeller from '../components/BestSeller';
import OurPolicy from '../components/OurPolicy';
import NewsletterBox from '../components/NewsletterBox';
import Footer from '../components/Footer';
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <Helmet>
        {/* ✅ Core SEO */}
        <title>TekDaraz | Buy Mobiles, Laptops & Accessories Online in Pakistan</title>
        <meta 
          name="description" 
          content="Shop the latest mobiles, laptops, and tech accessories at TekDaraz. Enjoy unbeatable prices, trusted brands, and fast nationwide delivery across Pakistan." 
        />
        <meta 
          name="keywords" 
          content="TekDaraz, buy mobiles online, laptops, tech accessories, electronics store Pakistan, online electronics shopping, smartphones, computers, gadgets, Pakistan" 
        />
        <meta name="author" content="TekDaraz" />

        {/* ✅ Open Graph for social sharing */}
        <meta property="og:title" content="TekDaraz | Buy Mobiles, Laptops & Accessories Online" />
        <meta 
          property="og:description" 
          content="TekDaraz — Pakistan’s trusted online electronics store. Explore the latest mobiles, laptops, and accessories from top brands at the best prices." 
        />
        <meta property="og:image" content="https://www.tekdaraz.com/assets/og-image.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.tekdaraz.com" />

        {/* ✅ Canonical & Robots */}
        <link rel="canonical" href="https://www.tekdaraz.com/" />
        <meta name="robots" content="index, follow" />

        {/* ✅ Additional Meta */}
        <meta name="theme-color" content="#0F172A" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
      </Helmet>

      {/* ✅ Keep the original UI */}
      <div>
        <Hero />
        <LatestCollection />
        <BestSeller />
        <OurPolicy />
        <NewsletterBox />
        <Footer />
      </div>
    </>
  );
};

export default Home;
