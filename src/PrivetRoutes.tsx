// import React from 'react'
// import { Outlet , Navigate } from 'react-router-dom'
// import { gettingAccess } from './utils'


// export default function PrivetRoutes({children}) {
//     let hasAccess = gettingAccess()
//     return (
//     <>
//       {hasAccess ? children : <Navigate to='/'/>}
//     </>
//   )
// }
import React from 'react';
import { Navigate } from 'react-router-dom';
import { gettingAccess } from './utils';

interface PrivateRoutesProps {
  children: React.ReactNode;
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ children }) => {
  const hasAccess = gettingAccess();

  return <>{hasAccess ? children : <Navigate to="/" />}</>;
};

export default PrivateRoutes;