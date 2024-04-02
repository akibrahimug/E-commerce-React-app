/* eslint-disable no-console */
import { takeLatest, all, call, put } from 'redux-saga/effects'
import USER_ACTION_TYPES from './user.types'
import {
  signInFailed,
  signInSuccess,
  signUpSuccess,
  signUpFailed,
  signOutSuccess,
  signOutFailed,
} from './user.action'
import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
  createAuthUserWithEmailAndPassword,
  signOutUser,
  signInUserWithEmailAndPasswords,
} from '../../utils/firebase/firebase.utils'

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails)
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
  } catch (error) {
    yield put(signInFailed(error))
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const userCredential = yield call(signInUserWithEmailAndPasswords, email, password)

    if (userCredential) {
      const { user } = userCredential
      yield call(getSnapshotFromUserAuth, user)
    }
  } catch (error) {
    yield put(signInFailed(error))
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser)
    if (!userAuth) return
    yield call(getSnapshotFromUserAuth, userAuth)
  } catch (error) {
    yield put(signInFailed(error))
  }
}

export function* signinWithGoogle() {
  try {
    const { user } = yield call(signInWithGoogleRedirect)
    yield call(getSnapshotFromUserAuth, user)
  } catch (error) {
    yield put(signInFailed(error))
  }
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(createAuthUserWithEmailAndPassword, email, password)
    yield put(signUpSuccess(user, { displayName }))
  } catch (error) {
    yield put(signUpFailed(error))
  }
}

export function* signOut() {
  try {
    yield call(signOutUser)
    yield put(signOutSuccess())
  } catch (error) {
    yield put(signOutFailed(error))
  }
}

export function* signInAfterSignUp({ payload: { user, additionalDetails } }) {
  yield call(getSnapshotFromUserAuth, user, additionalDetails)
}

export function* onGoogleSigninStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signinWithGoogle)
}

export function* onEmailSigninStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}

export function* userSaga() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSigninStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
    call(onEmailSigninStart),
  ])
}
