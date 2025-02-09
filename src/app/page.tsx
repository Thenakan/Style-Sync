// app/page.tsx (or pages/page.tsx if using Pages Router)
import Navbar from '../../Components/Navbar/Navbar';
import Hero from '../../Components/Hero/Hero';
import About from '../../Components/About/About';
import Footer from '../../Components/Footer/Footer';
import Video from '../../Components/Video/VideoBanner';

const Page = () => {
  return (
    <div>
      
      <Navbar />
      <Hero />
      <About />
      <Video />
      <Footer />
      
    </div>
  );
};

export default Page;
