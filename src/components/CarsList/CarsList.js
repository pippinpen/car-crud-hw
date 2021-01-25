import react, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CarsList.css";
import { CarsContext } from "./../../contexts/CarsContext";

function CarsList({ headingLevel = "h1" }) {
  const {
    fetchCars,
    deleteCar,
    // loaded,
    loading,
    error,
    cars,
  } = useContext(CarsContext);

  useEffect(() => {
    // if(loading || loaded) return;
    fetchCars();
  }, [fetchCars]);

  return (
    <section className="cars-list-section">
      <div className="container">
        <h1 className="section-heading">Cars List</h1>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {cars.length ? (
          <ul className="cars-list">
            {cars.map(({ _id, name, bhp, avatar_url }) => (
              <li key={_id} className="cars-list-item">
                <img width="200" src={avatar_url} alt={name} />
                <p>
                  {name} ({bhp} bhp)
                </p>
                <Link to={`/cars/update/${_id}`}>Update</Link>
                <button onClick={() => deleteCar(_id)}>&times;</button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

export default CarsList;
