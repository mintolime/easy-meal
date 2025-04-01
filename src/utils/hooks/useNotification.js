// hooks/useNotification.js
import { message } from 'antd';
import { useCallback } from 'react';

const useNotification = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const showNotification = useCallback((type, content, duration = 3) => {
    messageApi.open({
      type,
      content,
      duration,
    });
  }, [messageApi]);

  return {
    showNotificationAnt: showNotification,
    notificationHolder: contextHolder,
  };
};

export default useNotification;