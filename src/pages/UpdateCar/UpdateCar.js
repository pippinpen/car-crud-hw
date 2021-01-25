import react from 'react';
import Header from './../../components/Header/Header';
import CarForm from './../../components/CarForm/CarForm';

function UpdateCar(){
  return (
    <div className="page">
    <Header />
    <h1>Update Car</h1>
    <CarForm />
  </div>
  );
}

export default UpdateCar;