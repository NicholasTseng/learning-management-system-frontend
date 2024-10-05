import { useCallback, useState } from 'react';
import Cookies from 'js-cookie';

export function useLoginModal() {
  const [opened, setOpened] = useState(false);
  const logout = useCallback(() => {
    Cookies.remove('user_token');
    window.location.reload();
  }, []);

  return {
    opened,
    openLoginModal: () => setOpened(true),
    closeLoginModal: () => setOpened(false),
    logout,
  };
}
