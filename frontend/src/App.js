import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './components/LoginComponent/AuthForm';
import MainScreen from './screens/MainScreen/MainScreen';
import UploadArticle from './screens/UploadArticleScreen/UploadArticle';
import PrivateRoute from './components/Routes/PrivateRoute';
import PublicRoute from './components/Routes/PublicRoute';
import NewConferencePage from "./screens/NewConferenceScreen/NewConferencePage.js";
import ShowAllConferencesScreen from "./screens/ShowAllConferencesScreen/ShowAllConferencesScreen";
import AdminRoute from "./components/Routes/AdminRoute";

//pull bozo test
//pull pato test2
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
                    path="admin/create-conference"
                    element={
                        <AdminRoute>
                            <NewConferencePage />
                        </AdminRoute>
                    }
                />
                <Route
                    path="admin/conferences"
                    element={
                        <AdminRoute>
                            <ShowAllConferencesScreen />
                        </AdminRoute>
                    }
                />
            </Routes>
      </Router>
  );
};

export default App;