// import React, { createContext, useState } from 'react';

// export const SpectatorsContext = React.createContext({
//   fetchSpectators: () => [],
//   addSpectator: () => {},
//   updateSpectator: () => {},
//   deleteSpectator: () => {},
//   spectators: [],
//   loaded: false,
//   error: null,
// });

// const spectatorsEndPoint = '/guests';

// export const SpectatorsProvider = (props) => {
//   // useState for seeing if default spectators in local storage
//   const [spectators, setSpectators] = useState(() => {
//     return JSON.parse(localStorage.getItem('spectators')) || [];
//   });
//   // useState for loaded, error
//   const [loaded, setLoaded] = useState(false);
//   const [error, setError] = useState(null);

//   // fetchSpectators fn
//   const fetchSpectators = async () => {
//     if loaded || error {
//       return;
//     }
//     try {
//       const response = await fetch(spectatorsEndPoint);
//       if(!response.ok) throw response;
//       const data = await response.json();
//       localStorage.setItem('spectators', JSON.stringify(data));
//       setSpectators(data)
//     } catch (err) {
//       console.error(err);
//     }
//     finally {
//       setLoaded(true);
//     }
//   };

//   // addSpectators fn
// const addSpectators = async (formData) => {
//   try {
//     if()
//   }
// };
//   // updateSpectators fn

//   // deleteSpectators fn

//   return (
//     <SpectatorsContext.Provider
//       value={{
//         spectators,
//         loaded,
//         error,
//         fetchSpectators,
//         addSpectator,
//         updateSpectator,
//         deleteSpectator,
//       }}
//     >
//       {props.children}
//     </SpectatorsContext.Provider>
//   );
// };
