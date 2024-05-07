import { useSelector } from 'react-redux';
import { dataTestIds } from '../tests/constants/components';

const NotificationsContainer = () => {
  const reduxNotifications = useSelector((state) => state.notifications);
  console.log(reduxNotifications)
  return (
    <div data-testid={reduxNotifications.length ? dataTestIds.containerId.notification : dataTestIds.containerId.empty}>
      {reduxNotifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

const NotificationItem = ({ notification }) => {
  const { stateType, requestStatus } = notification;
  return (
    <div key={notification.id} data-testid={`dataTestIds.notificationId.${requestStatus}('${stateType}')}`} className={`notification ${requestStatus}`}>
      {notification.message}
    </div>
  );
};

export default NotificationsContainer;