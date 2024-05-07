import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "./LogoutApi";

const Logout = () => {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  useEffect(()=> {
      const logoutUser = async () => {
          try {
              await logout();
              navigate('/login');
          } catch (error) {
              console.error("Logout failed:", error);
          }
      };

      logoutUser();
  }, [logout, navigate]);
  
  return (
      <div>
          <h3>You are logged out</h3>
      </div>
  );
}
 
export default Logout;