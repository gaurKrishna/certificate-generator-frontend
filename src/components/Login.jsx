import React, { useEffect } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Login = (props) => {
  const history = useHistory();

  const forgotPasswordHandler = () => {
    history.push("/forgot-password");
  }

  useEffect(() => {
    if (props.islogedIn) {
      history.push('/');
    }
  }, [props, history]);

  return (
    <Jumbotron>
      <h2>Superuser Login</h2>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          let formdata = new FormData(event.target);
          try {
            const res = await fetch(process.env.REACT_APP_BASE_URL + 'login', {
              method: 'POST',
              body: formdata,
            });
            if (res.status !== 200) throw new Error('Exception message');
            const json = await res.json();
            props.handler(json.token, Date.parse(Date(json.expiry)), json.is_superuser);
          } catch (e) {
            console.log(e);
          }
        }}
      >
        <div>
          <label>Username:</label>
          <br />
          <input type="text" name="username" required />
        </div>
        <div>
          <label>Password:</label>
          <br />
          <input type="password" name="password" required />
        </div>
        <br />
        <input
          type="hidden"
          name="csrfmiddlewaretoken"
          value="SArEpnCEm8vzyjsV2UPWRU4qQvwyjTlaMQBAmuC5KqTM5GsKnPJX7qgDGONRNQFW"
        />
        <Button variant="primary" size="lg" type="submit" className="ml-3">
          Submit
        </Button>
      </form>
      <br />
      <form onSubmit={() => {forgotPasswordHandler()}}>
        <div>
            <Button variant="primary" size="lg" type="submit" className="ml-3">
                Forgot Password?
            </Button>
        </div>
      </form>
    </Jumbotron>
  );
};

export default Login;
