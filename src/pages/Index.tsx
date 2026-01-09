import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import ProblemSection from '@/components/home/ProblemSection';
import SolutionSection from '@/components/home/SolutionSection';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>SmartBin - AI + IoT Smart Waste Management System</title>
        <meta 
          name="description" 
          content="AI + IoT powered smart waste management system. Automate waste sorting, monitor fill levels, track bin locations, and optimize collection routes in real-time." 
        />
      </Helmet>
      <Layout>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
      </Layout>
    </>
  );
};

export default Index;
