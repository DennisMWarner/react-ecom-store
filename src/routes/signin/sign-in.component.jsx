import {
  signInWithGooglePopup,
  creatUserDocFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await creatUserDocFromAuth(user);
  };
  return <button onClick={logGoogleUser}>Sign in with Google</button>;
};
export default SignIn;
