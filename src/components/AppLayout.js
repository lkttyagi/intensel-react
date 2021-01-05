import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter} from "react-router-dom";
import PrivateRoute from '../private-route';

import Location from './location';
import Project  from './project';
import Dashboard from './dashboard';

import NavMenu from './navmenu'

class AppLayout extends Component {
  render() {
    const { containerClassnames } = this.props;
    return (
      <div id="app-container" className={containerClassnames}>
        <NavMenu/>
        <main>
          <div className="container-fluid">
            <PrivateRoute path="/location" component={Location}/>
            <PrivateRoute  path="/project" component={Project}/>
            <PrivateRoute  path="/dashboard" component={Dashboard}/>
          </div>
        </main>
      </div>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};
const mapActionToProps={}

export default withRouter(connect(
  mapStateToProps,
  mapActionToProps
)(AppLayout));
