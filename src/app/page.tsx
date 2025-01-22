// app/page.tsx (or pages/page.tsx if using Pages Router)
import Navbar from '../../Components/Navbar/Navbar';
import Hero from '../../Components/Hero/Hero';
import About from '../../Components/About/About';
import Footer from '../../Components/Footer/Footer';


const Page = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Footer />
    </div>
  );
};

export default Page;
