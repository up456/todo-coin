import { signInWithPopup, signOut } from 'firebase/auth';
import { myAuth, googleProvider } from './my_firebase';

class AuthService {
  auth;
  constructor() {
    this.auth = myAuth;
  }

  async login(setUserId: React.Dispatch<React.SetStateAction<string>>) {
    try {
      const result = await signInWithPopup(this.auth, googleProvider);
      const user = result.user;
      if (result) {
        if (user) {
          sessionStorage.setItem('userId', user.uid);
          setUserId(user.uid);
          return user.uid;
        }
      }
    } catch (error) {
      throw new Error(`로그인 실패, 에러메세지:${error}`);
    }
  }

  logout(setUserId: React.Dispatch<React.SetStateAction<string>>) {
    signOut(this.auth)
      .then(() => {
        sessionStorage.removeItem('userId');
        setUserId('');
      })
      .catch((error) => {
        throw new Error(`로그아웃 실패, 에러메세지:${error}`);
      });
  }
}

export default AuthService;
