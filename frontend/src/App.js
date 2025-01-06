import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './components/LoginComponent/AuthForm';
import MainScreen from './screens/MainScreen/MainScreen';
import UploadArticle from './screens/UploadArticleScreen/UploadArticle';
import PrivateRoute from './components/Routes/PrivateRoute';
import PublicRoute from './components/Routes/PublicRoute';
import ConferenceFormPage from "./screens/ConferenceFormScreen/ConferenceFormPage.js";
import ShowAllConferencesScreen from "./screens/ShowAllConferencesScreen/ShowAllConferencesScreen";
import AdminDetailConferenceScreen from "./screens/AdminDetailConferenceScreen/AdminDetailConferenceScreen";
import ConferenceUsersScreen from "./screens/AdminConferenceUsersScreen/ConferenceUsersScreen.js";
import AdminRoute from "./components/Routes/AdminRoute";
import ReviewArticleScreen from './screens/ReviewArticleScreen/ReviewArticleScreen.js';

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
                    path="/reviewarticle"
                    element={
                        <PrivateRoute>
                            <ReviewArticleScreen />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="admin/conferences/create"
                    element={
                        <AdminRoute>
                            <ConferenceFormPage isEditMode={false}/>
                        </AdminRoute>
                    }
                />
                <Route
                    path="admin/conferences/edit/:id"
                    element={
                        <AdminRoute>
                            <ConferenceFormPage isEditMode={true}/>
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
                <Route
                    path="admin/conference/:id"
                    element={
                        <AdminRoute>
                            <AdminDetailConferenceScreen />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/conference/:id/roles"
                    element={
                        <AdminRoute>
                            <ConferenceUsersScreen />
                        </AdminRoute>
                    }
                />
            </Routes>
      </Router>
  );
};

export default App;