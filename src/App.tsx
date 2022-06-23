import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './components/LoginPage';
import OSPage from './components/OSPage';
import StoreProvider from './components/StoreProvider';
import { setupDefaultUser } from './helpers/setupDefaultUser';


function App(): React.ReactElement {

  useEffect(() => {
    setupDefaultUser()
  }, [])

  return (
    <StoreProvider>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace={true} />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="os" element={<OSPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </StoreProvider>
  );
}


export default App;
