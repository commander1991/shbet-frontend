import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import UserRoutes from './routes/UserRoutes';
import DevRoutes from './routes/DevRoutes';
import LeaderRoutes from './routes/LeaderRoutes';
import VIPRoutes from './routes/VIPRoutes';
import React, { useContext, useEffect, useState } from 'react';
import { Rings } from 'react-loader-spinner';
import { UserContext } from './context/UserContext';

import socketIOClient from "socket.io-client";
import AppRoutes from './routes/AppRoutes';

const ENDPOINT = "http://localhost:3000";

const App = () => {
  const { user } = useContext(UserContext)
  // useEffect(() => {
  //   const socket = socketIOClient(ENDPOINT);
  //   return () => socket.disconnect();
  // }, []);

  return (
    <div className='app'>
      <Router>
        {user?.isLoading ?
          <div className='loading-container'>
            <Rings
              visible={true}
              height="100"
              width="100"
              color="#1877f2"
              ariaLable="rings-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
            <div>Loading data...</div>
          </div>
          :
          <div>
            {((user && user.isAuthenticated) === true && user.account.groupWithRoles.id === 1)
              ?
              <DevRoutes />
              :
              ((user && user.isAuthenticated) === true && user.account.groupWithRoles.id === 2)
                ?
                <LeaderRoutes />
                :
                ((user && user.isAuthenticated) === true && user.account.groupWithRoles.id === 3)
                  ?
                  <VIPRoutes />
                  :
                  ((user && user.isAuthenticated) === true && user.account.groupWithRoles.id === 4)
                    ?
                    <UserRoutes />
                    :
                    <AppRoutes />
            }
          </div>
        }
      </Router >
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
