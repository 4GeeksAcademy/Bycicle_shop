import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function ProfileRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ProfileRedirect triggered.");
    const token = localStorage.getItem('access_token');
    console.log("Token:", token);

    if (token) {
      console.log("Token found, navigating to /profile");
      navigate('/profile');
    } else {
      console.log("No token found, not navigating.");
    }
  }, []);

  return null; // Render nothing
}

export default ProfileRedirect;
