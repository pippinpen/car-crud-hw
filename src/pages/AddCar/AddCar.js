import react from "react";
import Header from "./../../components/Header/Header";
import CarForm from "./../../components/CarForm/CarForm";

function AddCar() {
  return (
    <div className="page">
      <Header />
      <main>
        <h1 style={{
          marginInlineStart: '15px',
        }}>AddCar</h1>
        <CarForm />
      </main>
    </div>
  );
}

export default AddCar;
