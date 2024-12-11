'use client'
import Header from './components/Header';
import { HomePage } from './components/HomePage';

const Home = () => {
  return (
    <div className="min-h-screen bg-orange-100 flex flex-col items-center justify-center py-8" style={{
      background: 'repeating-linear-gradient(45deg, #ff9e2c, #ff9e2c 10px, #ff7f24 10px, #ff7f24 20px)',
    }}>
      <Header />
      <HomePage />
    </div>
  );
};


export default Home;
