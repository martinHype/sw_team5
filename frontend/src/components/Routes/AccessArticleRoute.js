import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

const AccessArticleRoute = ({ children }) => {
  const { article_id } = useParams(); // Get article ID from the URL
  const [isAuthorized, setIsAuthorized] = useState(null); // Track if the user has access
  const [loading, setLoading] = useState(true); // Loading state
  const [articleStatus, setArticleStatus] = useState(null); // Track article status
  const token = sessionStorage.getItem("authToken"); // Check if the auth token exists
  const today = new Date();

  useEffect(() => {
    const verifyOwnershipAndStatus = async () => {
      if (!token) {
        setIsAuthorized(false); // No token, user can't access
        setLoading(false);
        return;
      }

      try {
        // Fetch the article's access data
        const response = await axios.get(
          `http://localhost:8080/api/article/${article_id}/access`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data);
        const { user_iduser, idreviewer, status } = response.data;
        const userId = parseInt(sessionStorage.getItem("userId")); // Get user ID from sessionStorage

        // Set the article status
        setArticleStatus(status);

        // Check route access conditions based on user role and article status
        let authorized = false;

        // Access conditions for each route
        if (window.location.pathname.startsWith('/editarticle') && user_iduser === userId && status === 1) {
          authorized = true; // Access granted for owner and status 1 (edit mode)
        } else if (window.location.pathname.startsWith('/viewarticle') && user_iduser === userId && (status >= 2)) {
          authorized = true; // Access granted for owner and status 2 or 3 (view mode)
        } else if (window.location.pathname.startsWith('/reviewarticle') && idreviewer === userId && (status === 2 || status === 3)) {
          authorized = true; // Access granted for reviewer and status 2 or 3 (review mode)
        } else if (window.location.pathname.startsWith('/viewreviewarticle') && (user_iduser === userId || idreviewer === userId) && (status >= 4 && status <= 6)) {
          authorized = true;
          const today = new Date();
          console.log(today);
          console.log(new Date(response.data.event_upload_EndDate));
          console.log(user_iduser === userId && today >= new Date(response.data.event_upload_EndDate));
          if (user_iduser === userId && today >= new Date(response.data.event_upload_EndDate)) {
            authorized = true; // If today's date is on or before the event's upload end date
          }else if(idreviewer === userId){
            authorized = true;
          }else{
            authorized = false;
          }
        }

        setIsAuthorized(authorized);
      } catch (error) {
        console.error("Error verifying ownership:", error);
        setIsAuthorized(false); // Handle error gracefully
      } finally {
        setLoading(false); // End loading after the request
      }
    };

    verifyOwnershipAndStatus();
  }, [article_id, token]);

  if (loading) {
    return <div>Loading...</div>; // Display loading state while verifying
  }

  // If the user is not authenticated or doesn't meet the access conditions, redirect to home or login
  if (!token || !isAuthorized) {
    return <Navigate to="/" />;
  }

  // If everything is fine, render the children (the actual protected route)
  return children;
};

export default AccessArticleRoute;
