import AuthContext from '@contexts/AuthContext';
import { faSpinner } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';

export const LoginContainer: React.FC = () => {
  const { isAuthenticating, isInitialized } = useContext(AuthContext);

  return (
    <div className="flex justify-center items-center h-full w-full overflow-hidden">
      {isAuthenticating || !isInitialized ? (
        <div className="min-h-[500px] flex items-center" data-testid="login-container-spinner">
          <FontAwesomeIcon icon={faSpinner} spin />
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

LoginContainer.displayName = 'Login';
