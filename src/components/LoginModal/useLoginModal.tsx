import { useState } from 'react';

export function useLoginModal() {
  const [opened, setOpened] = useState(false);

  return {
    opened,
    openLoginModal: () => setOpened(true),
    closeLoginModal: () => setOpened(false),
  };
}
