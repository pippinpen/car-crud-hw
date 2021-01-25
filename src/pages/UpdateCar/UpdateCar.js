import react, {useContext} from 'react';
import { useParams, /* useHistory, */ Link } from 'react-router-dom';
import Header from './../../components/Header/Header';
import CarForm from './../../components/CarForm/CarForm';
import { CarsContext } from "./../../contexts/CarsContext";

import './UpdateCar.css';

function UpdateCar(){
  let { id } = useParams();
  // let history = useHistory();
  const { cars } = useContext(CarsContext);
  const carToBeUpdated = cars.find(({_id}) => _id === id);

  // More aggressive option
  // history.push("/");
  // console.log('RENDERING CAR FORM')
  // addToast(`Error: cannot find car with id ${id}. Redirecting...`, {
  //   appearance: "error",
  // });

  let view =  carToBeUpdated ? <CarForm /> : (
    <div className="no-car-found">
      <p>No car found with id {id}. Click <Link to="/" className="return-link">here</Link> to return to homepage</p>
    </div>
  );

  return (
    <div className="page">
      <Header />
      <h1>Update Car</h1>
      {view}
    </div>
  );
}

export default UpdateCar;