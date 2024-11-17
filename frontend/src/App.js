import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './components/LoginComponent/AuthForm';



const App = () => {
  return (
      <Router>
            <Routes>
                <Route path="/auth" element={<AuthForm />} />
                {/* You can define other routes here */}
            </Routes>
      </Router>
  );
};

export default App;