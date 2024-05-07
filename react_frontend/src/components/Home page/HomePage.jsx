
import { dataTestIds } from "../../tests/constants/components";
import { useSelector } from "react-redux";

const HomePage = () => {
  const user = useSelector((state) => state.auth);
  console.log(user.loading);
  
  return ( <div data-testid={dataTestIds.containerId.main}>
    <div data-testid={dataTestIds.containerId.notification}>
      
      {user.loading ? <div data-testid={dataTestIds.notificationId.loading('auth')}></div>  /* : user.error ? <div data-testid={dataTestIds.notificationId.error('auth')}>{navigate('/')}</div> */
             : <div data-testid={dataTestIds.notificationId.success('auth')}></div>}
      {user.error }
      
    </div> 
  </div> );
}
 
export default HomePage;