import { signInWithPopup, signOut } from 'firebase/auth';
import { myAuth, googleProvider } from './my_firebase';

const MASTER_USER_ID = 'MasterSuperUser8282486';

class AuthService {
  auth;
  constructor() {
    this.auth = myAuth;
  }

  async googleLogin(setUserId: React.Dispatch<React.SetStateAction<string>>) {
    try {
      const result = await signInWithPopup(this.auth, googleProvider);
      const user = result.user;
      if (result && user) {
        sessionStorage.setItem('userId', user.uid);
        setUserId(user.uid);
        return user.uid;
      }
    } catch (error) {
      throw new Error(`구글 계정 로그인 실패, 에러메세지:${error}`);
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

  masterLogin(setUserId: React.Dispatch<React.SetStateAction<string>>) {
    try {
      sessionStorage.setItem('userId', MASTER_USER_ID);
      setUserId(MASTER_USER_ID);
      return MASTER_USER_ID;
    } catch (error) {
      throw new Error(`마스터 계정 로그인 실패, 에러메세지:${error}`);
    }
  }
}

export default AuthService;
