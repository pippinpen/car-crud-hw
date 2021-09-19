import React from 'react';
import CarsList from './../../components/CarsList/CarsList';
import DriversList from './../../components/DriversList/DriversList';
import SpectatorsList from '../../components/SpectatorsList/SpectatorsList';
import MainLayout  from '../../layouts/MainLayout';


function Home(){
  return (
    <MainLayout>
      <CarsList />
      <DriversList />
      <SpectatorsList />
    </MainLayout>
  );
}

export default Home;