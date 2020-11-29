import * as React from "react";
import { useFormik } from "formik";
import { Link, Route, RouteProps, Redirect } from "react-router-dom";
import firebase from "firebase/app";

import styled from "styled-components";
import { Button, Text } from "../../components/core";
import ProgressBar from "../../components/progress";
import { IError } from "../../interface/error";
import { IUser } from "../../interface/user";

const Input = styled.input`
  height: 32px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  border-style: solid;
  width: 320px;
  padding: 2px 4px;
`;

const Logo = styled.img`
  height: 60px;
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  &:visited {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

interface ISignInDetail {
  name: string;
  password: string;
  email: string;
}

const signUp = (
  { name, password, email }: ISignInDetail,
  setLoading: (loading: boolean) => void,
  setError: (error: string) => void
) => {
  setError("");
  setLoading(true);
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((result) => {
      setLoading(false);
      return result.user.updateProfile({
        displayName: name,
      });
    })
    .catch((error: IError) => {
      setLoading(false);
      setError(error.message);
    });
};

const signIn = (
  { email, password }: ISignInDetail,
  setLoading: (loading: boolean) => void,
  setError: (error: string) => void,
  setRedirect: (path: string) => void
) => {
  setError("");
  setLoading(true);
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      setLoading(false);
      setRedirect("/");
    })
    .catch((error: IError) => {
      setLoading(false);
      setError(error.message);
    });
};

interface IProps extends RouteProps {
  user: IUser;
}

const Registration = ({ user, location }: IProps) => {
  const isRegistration = location.pathname === "/auth/register";
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [redirect, setRedirect] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (user) {
      setRedirect("/");
    }
  }, [user]);

  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      if (isRegistration) {
        signUp(values, setLoading, setError);
      } else {
        signIn(values, setLoading, setError, setRedirect);
      }
    },
  });

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <div className="flex flex-column align-items-center justify-content-center h-100">
      {loading && <ProgressBar />}
      <Logo src="../mokku.svg" />
      <h2>Mokku</h2>
      <form className="flex flex-column p-relative">
        <Route path="/auth/register">
          <Input
            placeholder="Name"
            className="mb-8"
            required
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={loading}
          />
        </Route>
        <Input
          placeholder="Email"
          className="mb-8"
          required
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={loading}
        />
        <Input
          placeholder="Password"
          className="mb-8"
          required
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={loading}
        />
        <div className="flex justify-content-between mt-8">
          <div className="mr-8 flex flex-column justify-content-between">
            <StyledLink to="/forget-password">Forget password?</StyledLink>
            {isRegistration && <StyledLink to="/auth">Sign in</StyledLink>}
            {!isRegistration && (
              <StyledLink to="/auth/register">Sign up</StyledLink>
            )}
          </div>
          <Button
            disabled={loading}
            color="white"
            background="primary"
            type="button"
            onClick={() => handleSubmit()}
          >
            {isRegistration ? "SIGN UP" : "SIGN IN"}
          </Button>
        </div>
        {error && (
          <Text className="p-absolute" style={{ bottom: -48 }} color="alert">
            {error}
          </Text>
        )}
      </form>
    </div>
  );
};

export default Registration;
