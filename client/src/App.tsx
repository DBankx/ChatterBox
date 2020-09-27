import React from 'react';
import Navbar from "./nav/Navbar";
import {Layout} from "antd";
import { Route } from 'react-router-dom';
import HomePage from './home/HomePage';

const App = () => {
  return (
      <Layout>
        <Layout.Header style={{backgroundColor: "#fff"}}>
            <Navbar />
        </Layout.Header>
          <Layout.Content style={{backgroundColor: "#fff"}}>
              <div className={"container"}>
              <Route exact path={"/"} component={HomePage} />
              </div>
          </Layout.Content>
      </Layout>
  );
}

export default App;
