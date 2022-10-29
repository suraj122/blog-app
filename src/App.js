import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Loader from "./components/Loader";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import NewPost from "./components/NewPost";
import Notfound from "./components/Notfound";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import Signup from "./components/Signup";
import SinglePost from "./components/SinglePost";
import { localStorageKey, userVerifying } from "./utils/constant";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedin: false,
      user: null,
      isVerifying: true,
    };
  }

  componentDidMount() {
    let key = localStorage[localStorageKey];
    if (key) {
      fetch(userVerifying, {
        method: "GET",
        headers: {
          authorization: `Token ${key}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        })
        .then(({ user }) => this.updateUser(user))
        .catch((errors) => console.log(errors));
    } else {
      this.setState({ isVerifying: false });
    }
  }

  updateUser = (user) => {
    this.setState({
      isLoggedin: true,
      user,
      isVerifying: false,
    });
    localStorage.setItem(localStorageKey, user.token);
  };

  render() {
    if (this.state.isVerifying) {
      return <Loader />;
    }
    return (
      <div className="App">
        <Navbar isLoggedin={this.state.isLoggedin} user={this.state.user} />
        {this.state.isLoggedin ? (
          <AuthApp />
        ) : (
          <UnAuthApp updateUser={this.updateUser} />
        )}
      </div>
    );
  }
}

function AuthApp() {
  return (
    <>
      <Routes exact>
        <Route path="/" element={<Home />} />
        <Route path="/articles/:slug" element={<SinglePost />} />
        <Route path="/new-post" element={<NewPost />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

function UnAuthApp(props) {
  return (
    <>
      <Routes exact>
        <Route path="/" element={<Home />} />
        <Route path="/articles/:slug" element={<SinglePost />} />
        <Route
          path="/signup"
          element={<Signup updateUser={props.updateUser} />}
        />
        <Route
          path="/signin"
          element={<Login updateUser={props.updateUser} />}
        />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
