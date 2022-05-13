import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  browserSessionPersistence,
  setPersistence,
  User,
} from 'firebase/auth';
import { NavigateFunction } from 'react-router-dom';
import { myAuth, googleProvider } from './my_firebase';

class AuthService {
  auth;
  constructor() {
    this.auth = myAuth;
  }

  async login() {
    try {
      const result = await signInWithPopup(this.auth, googleProvider);
      const user = result.user;
      if (result) {
        if (user) {
          sessionStorage.setItem('userId', user.uid);
        }
      }
    } catch (error) {
      throw new Error(`로그인 실패, 에러메세지:${error}`);
    }
  }

  logout() {
    signOut(this.auth)
      .then(() => {
        sessionStorage.removeItem('userId');
      })
      .catch((error) => {
        throw new Error(`로그아웃 실패, 에러메세지:${error}`);
      });
  }
}

export default AuthService;
