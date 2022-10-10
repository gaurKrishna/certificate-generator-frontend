import React from 'react';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Footer,
  Navigation,
  Home,
  Generate,
  Verify,
  Certificate,
  Login,
  ForgotPassword,
  ResetPassword,
} from './components';

class App extends React.Component {
  constructor(props) {
    super(props);

    const loginToken = localStorage.getItem('token') ?? null;
    const time = localStorage.getItem('time') | '';
    const loginCheck = Boolean(!!loginToken && time < Date.now());

    this.state = {
      loginToken: loginToken,
      islogedIn: loginCheck,
    };

    this.handler = this.handler.bind(this);
  }

  componentDidMount() {
    const loginToken = localStorage.getItem('token') ?? null;
    const time = localStorage.getItem('time') ?? null;
    console.log("Component Did mount", time)
    if (loginToken === null) {
      this.setState({
        islogedIn: false,
      });
    }else if(time === null){
      this.setState({
        islogedIn: false,
      });
    }else if (time < Date.now()){ 
        this.setState({ loginToken, islogedIn: true });
      }  
  }

  handler(token, cTime, is_superuser) {
    this.setState({
      loginToken: token,
      islogedIn: true,
      isSuperuser: is_superuser,
    });
    console.log(this.state);
    localStorage.setItem('token', token);
    localStorage.setItem('time', cTime);
    localStorage.setItem('isSuperuser', is_superuser);
  }

  render() {
    const x = () => {
      const token = localStorage.getItem('token')
        ? localStorage.getItem('token')
        : '';
      const time = localStorage.getItem('time') | '';
      console.log(token, time)
      console.log(!!time)
      if (!!token && !!time && time < Date.now()) return true;
      console.log("here")
      return false;
    };

    return (
      <>
        <Navigation islogedIn={this.state.islogedIn} isSuperuser={this.state.isSuperuser}/>
        <BrowserRouter>
          <Switch>
            <Route path="/generate">
              {x() === false ? (
                <Redirect to="/login" />
              ) : (
                <Generate loginToken={this.state.loginToken} />
              )}
            </Route>
            <Route
              path="/verify"
              exact
              component={() => <Verify setCertiState={this.setState.bind(this)} />}
            />
            <Route path="/certificate/:id" exact component={Certificate} />
            <Route path="/login">
              <Login handler={this.handler} islogedIn={this.state.islogedIn} />
            </Route>
            <Route path="/forgot-password" exact component={ForgotPassword} />
            <Route path="/reset-password/:uidb64/:token" exact component={ResetPassword} />
            <Route path="/" exact component={() => <Home />} />
          </Switch>
        </BrowserRouter>
        <Footer />
      </>
    );
  }
}

export default App;
