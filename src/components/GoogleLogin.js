import { GoogleLogin, GoogleLogout } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import { jwtdecode } from 'jwt-decode'
import { jwtDecode } from "jwt-decode";

const GoogleLoginButton = ({ onGoogleEmail }) => {
  const clientId = '370443652533-gc3q5v5ic1qb3js9cctj9ttgrehsog1v.apps.googleusercontent.com'

  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={(res) => {
            // console.log(jwtdecode(res.credential));
            const googleEmail = jwtDecode(res.credential)
            // console.log(google);
            console.log(googleEmail.email);
            onGoogleEmail(googleEmail.email)
          }}
          onFailure={(err) => {
            console.log(err);
          }}
        />

      </GoogleOAuthProvider>
    </>
  );
};

export default GoogleLoginButton