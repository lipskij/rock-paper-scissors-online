import React, { useState, useEffect, useRef } from 'react';

const InstallButton = () => {
  const [ready, setReady] = useState(false);
  const promtRef = useRef(null);

  useEffect(() => {
    const handleInstall = (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      promtRef.current = e;
      setReady(true);
    };
    window.addEventListener('beforeinstallprompt', handleInstall);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleInstall);
    };
  });
  return ready ? (
    <button className="add-button"
      onClick={() => {
        promtRef.current.prompt();
        // Wait for the user to respond to the prompt
        promtRef.current.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          promtRef.current = null;
        });
      }}
    >
      Add to home screen
    </button>
  ) : null;
};

export default InstallButton;
