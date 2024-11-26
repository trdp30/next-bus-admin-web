import React, { useContext, useLayoutEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import AuthContext from '@contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/pro-light-svg-icons';
import { getAssetUrl } from '@utils/getAssetUrl';
import { useAppDispatch } from '@store/hooks';
import { storeQueryParams } from './slice';
import { getAllParams } from './helpers';

export const LoginContainer: React.FC = () => {
  const { isAuthenticating, isInitialized, queryParams } = useContext(AuthContext);
  const dispatch = useAppDispatch();
  const [search] = useSearchParams();

  useLayoutEffect(() => {
    if (isInitialized) {
      const params = getAllParams();
      dispatch(storeQueryParams({ ...queryParams, ...params }));
    }
  }, [isInitialized]);

  const isAssessmentPath = (search.get('from') || '').includes('/assessment');

  return (
    <div
      className="flex justify-center items-center h-full w-full overflow-hidden"
      style={{
        backgroundImage:
          isAssessmentPath && !isInitialized ? 'none' : `url(${getAssetUrl('loginBackgroundCompressed.png')})`,
      }}
    >
      <div className="rounded-3xl bg-white min-w-[340px] w-[360px] md:w-[480px] lg:w-[600px] flex justify-center py-5 md:py-8 lg:py-10 px-6 lg:px-20">
        {isAuthenticating || !isInitialized ? (
          <div className="min-h-[500px] flex items-center" data-testid="login-container-spinner">
            <FontAwesomeIcon icon={faSpinner} spin />
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

LoginContainer.displayName = 'Login';
