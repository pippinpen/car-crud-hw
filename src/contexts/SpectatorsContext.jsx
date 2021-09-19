import React, { createContext, useState } from 'react';

export const SpectatorsContext = React.createContext({
  fetchSpectators: () => [],
  addSpectator: () => {},
  updateSpectator: () => {},
  deleteSpectator: () => {},
  spectators: [],
  loaded: false,
  error: null,
});

const spectatorsEndPoint = '/guests';

export const SpectatorsProvider = (props) => {
  // useState for seeing if default spectators in local storage
  const [spectators, setSpectators] = useState(() => {
    return JSON.parse(localStorage.getItem('spectators')) || [];
  });
  // useState for loaded, error
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  // fetchSpectators fn
  const fetchSpectators = async () => {
    if (loaded || error) {
      return;
    }
    try {
      const response = await fetch(spectatorsEndPoint);
      if (!response.ok) throw response;
      const data = await response.json();
      localStorage.setItem('spectators', JSON.stringify(data));
      setSpectators(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoaded(true);
    }
  };

  // addSpectators fn
  const addSpectator = async (formData) => {
    try {
      const response = await fetch(spectatorsEndPoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.status !== 201) {
        throw response;
      }
      const savedSpectator = await response.json();
      console.log('recieved data of savedSpectator,', savedSpectator);
      const newSpectators = [...spectators, savedSpectator];
      localStorage.setItem('Spectators', JSON.stringify(newSpectators));
      setSpectators(newSpectators);
      console.log(`Saved ${savedSpectator.name}`);
    } catch (err) {
      console.log(err);
    }
  };
  // updateSpectators fn
  const updateSpectator = async (id, updates) => {
    console.log('Attemping to update', id, updates);
    let updatedSpectator = null;
    try {
      const response = await fetch(`${spectatorsEndPoint}${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      if (response.status !== 201) {
        throw response;
      }
      const index = spectators.findIndex((spectator) => spectator._id === id);
      console.log('index of spectator', index);
      const oldSpectator = spectators[index];
      console.log('old spectator', oldSpectator);
      updatedSpectator = {
        ...oldSpectator,
        ...updates,
      };
      console.log('updated spectator', updatedSpectator);
      const updatedSpectators = [
        ...spectators.slice(0, index),
        updatedSpectator,
        ...spectators.slice(index + 1),
      ];
      localStorage.setItem('spectators', JSON.stringify(updatedSpectators));
      console.log(`Updated ${updatedSpectator.name}`);
      setSpectators(updatedSpectators);
    } catch (err) {
      console.log(err);
    }
  };

  // deleteSpectators fn
  const deleteSpectator = async (id) => {
    let deletedSpectator = null;
    try {
      const response = await fetch(`${spectatorsEndPoint}${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status !== 204) {
        throw response;
      }
      const index = spectators.findIndex((spectator) => spectator._id === id);
      deletedSpectator = spectators[index];
      const updatedSpectators = [
        ...spectators.slice(0, index),
        ...spectators.slice(index + 1),
      ];
      localStorage.setItem('spectators', JSON.stringify(updatedSpectators));
      setSpectators(updatedSpectators);
      console.log(`Deleted ${deletedSpectator.name}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SpectatorsContext.Provider
      value={{
        spectators,
        loaded,
        error,
        fetchSpectators,
        addSpectator,
        updateSpectator,
        deleteSpectator,
      }}
    >
      {props.children}
    </SpectatorsContext.Provider>
  );
};
