import React, { useContext, useEffect } from 'react';

import { SpectatorsContext } from '../../contexts/SpectatorsContext';

import { Link } from 'react-router-dom';

function SpectatorsList() {
  const { fetchSpectators, deleteSpectator, error, spectators } =
    useContext(SpectatorsContext);

  useEffect(() => {
    fetchSpectators();
  }, []);

  return (
    <div>
      <h1>Spectators List</h1>
      {error && <p>{error}</p>}
      {spectators?.length ? (
        <ul>
          {spectators.map(({ _id, firstName, lastName, email }) => (
            <li key={_id}>
              <p>
                {firstName} {lastName} ({email})
              </p>
              <Link to={`/spectators/update/${_id}`}>Update</Link>
              <button onClick={() => deleteSpectator(_id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No spectators to display</p>
      )}
    </div>
  );
}

export default SpectatorsList;
