// app/page.tsx (or pages/page.tsx if using Pages Router)
import Navbar from '../../Components/Navbar/Navbar';
import Hero from '../../Components/Hero/Hero';  
import Footer from '../../Components/Footer/Footer';


const Page = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Footer />  
    </div>
  );
};

export default Page;
