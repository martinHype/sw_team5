import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './components/LoginComponent/AuthForm';
import MainScreen from './screens/MainScreen/MainScreen';
import PrivateRoute from './components/Routes/PrivateRoute';
import PublicRoute from './components/Routes/PublicRoute';
import NewConferencePage from "./screens/NewConferenceScreen/NewConferencePage.js";
import ShowAllConferencesScreen from "./screens/ShowAllConferencesScreen/ShowAllConferencesScreen";
import UploadArticle from './screens/UploadArticleScreen/UploadArticle';

const App = () => {
  return (
      <Router>
            <Routes>
                {/* Public Route (Login Screen) */}
                <Route
                    path="/"
                    element={
                        <PublicRoute>
                            <AuthForm />
                        </PublicRoute>
                    }
                />
                {/* Private Route (Main Screen) */}
                <Route
                    path="/home"
                    element={
                        <PrivateRoute>
                            <MainScreen />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/uploadarticle"
                    element={
                        <PrivateRoute>
                            <UploadArticle />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/create-conference"
                    element={
                        <PrivateRoute>
                            <NewConferencePage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/conferences"
                    element={
                        <PrivateRoute>
                            <ShowAllConferencesScreen />
                        </PrivateRoute>
                    }
                />
            </Routes>
      </Router>
  );
};

export default App;