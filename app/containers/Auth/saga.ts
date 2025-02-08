import { call, debounce, fork, put, takeLatest } from '@redux-saga/core/effects';

import {
  authenticate,
  initialize,
  initializeComplete,
  triggerAuthenticate,
  unAuthenticate,
} from '@containers/Auth/slice';

import initializeFirebase, { firebaseLogout, getFirebaseIdToken, getFirebaseUser } from '@utils/firebase';
import { catchError } from '@utils/sentry';
import { FbUser } from '@containers/Auth/types';
import { userApi } from '@store/services/userApi';

export function* initializeWorker(): Generator {
  try {
    yield call(initializeFirebase);
    yield put(triggerAuthenticate());
    yield put(initializeComplete());
  } catch (error) {
    yield call(catchError, {
      title: 'Auth initializeWorker',
      error: error as Error,
    });
  }
}

export function* triggerAuthenticateWorker(): Generator {
  try {
    const idToken = (yield call(getFirebaseIdToken)) as string;
    if (idToken) {
      const user = (yield call(getFirebaseUser)) as FbUser;
      yield put(userApi.endpoints.getCurrentUser.initiate(new Date().getTime()));
      yield put(authenticate({ idToken, user }));
    } else {
      yield put(unAuthenticate());
    }
  } catch (error) {
    yield call(catchError, {
      title: 'Auth triggerAuthenticateWorker',
      error: error as Error,
    });
  }
}

export function* triggerUnAuthenticateWorker(): Generator {
  try {
    yield call(firebaseLogout);
  } catch (error) {
    yield call(catchError, {
      title: 'Auth triggerUnAuthenticateWorker',
      error: error as Error,
    });
  }
}

export function* initializeWatcher() {
  yield debounce(1000, initialize.type, initializeWorker);
}

export function* triggerAuthenticateWatcher() {
  yield debounce(1000, triggerAuthenticate.type, triggerAuthenticateWorker);
}

export function* triggerUnAuthenticateWatcher() {
  yield takeLatest(unAuthenticate.type, triggerUnAuthenticateWorker);
}

export default function* authRootSaga() {
  yield fork(initializeWatcher);
  yield fork(triggerAuthenticateWatcher);
  yield fork(triggerUnAuthenticateWatcher);
}
