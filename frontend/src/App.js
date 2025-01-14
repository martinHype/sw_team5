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
import UserRoleManagerScreen from "./screens/AddRolesScreen/UserRoleManagerScreen";
import ReviewArticleScreen from './screens/ReviewArticleScreen/ReviewArticleScreen.js';
import AccessArticleRoute from './components/Routes/AccessArticleRoute.js';
import StudentRoute from './components/Routes/StudentRoute.js';

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
                        <StudentRoute>
                            <UploadArticle formMode='New' />
                        </StudentRoute>
                    }
                />
                <Route
                    path="/editarticle/:article_id"
                    element={
                        <AccessArticleRoute>
                            <UploadArticle formMode='Edit' />
                        </AccessArticleRoute>
                    }
                />
                <Route
                    path="/viewarticle/:article_id"
                    element={
                        <AccessArticleRoute>
                            <UploadArticle formMode='View' />
                        </AccessArticleRoute>
                    }
                />

                <Route
                    path="/reviewarticle/:article_id"
                    element={
                        <AccessArticleRoute>
                            <ReviewArticleScreen editMode={true}/>
                        </AccessArticleRoute>
                    }
                />
                <Route
                    path="/viewreviewarticle/:article_id"
                    element={
                        <AccessArticleRoute>
                            <ReviewArticleScreen editMode={false}/>
                        </AccessArticleRoute>
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
                <Route
                    path="/admin/role-manager"
                    element={
                        <AdminRoute>
                            <UserRoleManagerScreen />
                        </AdminRoute>
                    }
                />
            </Routes>
      </Router>
  );
};

export default App;
