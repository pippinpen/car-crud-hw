import react from 'react';
import Header from './../../components/Header/Header';
import CarsList from './../../components/CarsList/CarsList';

function Home(){
  return (
    <div className="page">
    <Header />
    <main>
    <CarsList />
    </main>
  </div>
  );
}

export default Home;