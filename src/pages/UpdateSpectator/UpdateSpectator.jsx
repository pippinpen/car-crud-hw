import React, { useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import SpectatorForm from '../../components/SpectatorForm/SpectatorForm';
import { SpectatorsContext } from '../../contexts/SpectatorsContext';
import ErrorBoundary from './../../components/ErrorBoundary/ErrorBoundary';
import MainLayout from '../../layouts/MainLayout';

function UpdateSpectator() {
  let { id } = useParams();
  let history = useHistory();
  const { spectators } = useContext(SpectatorsContext);
  const spectatorToBeUpdated = spectators.find(({ _id }) => _id === id);

  if (!spectatorToBeUpdated) {
    history.push('/');
    return null;
  }

  return (
    <MainLayout>
      <h1>Update Spectator</h1>
      <ErrorBoundary>
        <SpectatorForm spectator={spectatorToBeUpdated} />
      </ErrorBoundary>
    </MainLayout>
  );
}

export default UpdateSpectator;
