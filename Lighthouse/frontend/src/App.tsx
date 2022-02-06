import React from 'react';
import { Switch, Route } from "react-router-dom";

import { IonApp } from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './App.css';

import TopBar from "./components/Navbar/TopBar";
import Home from "./components/Home/Home";
import Maps from "./components/Maps/Maps";
import Profile from "./components/Profile/Profile";
import PanicButton from './components/PanicButton/PanicButton';

import PrivateRoute from "./hoc/PrivateRoute";

const App: React.FC = () => (
  <IonApp>
    <div className="App">
      <TopBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <PrivateRoute path="/maps" exact component={Maps} />
        <PrivateRoute path="/profile" exact component={Profile} />
      </Switch>
    </div>
    {/* <PanicButton /> */}
  </IonApp>
);

export default App;
