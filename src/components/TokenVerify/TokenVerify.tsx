import { withRouter, RouteComponentProps } from "react-router-dom";
import jwt from 'jwt-decode'

interface TokenVerifyProps extends RouteComponentProps <any> {
    onLogout: Function;
}

interface decodedJwt {
    _id: string;
    type: number;
    iat: number;
    exp: number;
}

const parseJwt = (token: string): decodedJwt | undefined => {
  try {
    return jwt(token);
  } catch (e) {
    return undefined;
  }
};


const AuthVerify = (props: TokenVerifyProps) => {
  props.history.listen(() => {    
    const token = localStorage.getItem("token")!;
    if (token) {
      const decodedJwt: decodedJwt | undefined = parseJwt(token);
      if (decodedJwt && decodedJwt.exp * 1000 < Date.now()) {
        props.onLogout();
      }
    }
  });
  return <div></div>;
};
export default withRouter(AuthVerify);