import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LogoSVG from '../images/logo.svg';

export default class Header extends Component {
  /* eslint-disable class-methods-use-this */
  render() {
    return (
      <header id="navbar">
        <nav className="navbar navbar-expand-md navbar-light fixed-top">
          <Link title="Open Active Validator" aria-label="Open Active Validator" className="navbar-brand" to="/"><LogoSVG width={80} height={52}/></Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://developer.openactive.io/">Developer reference</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://www.openactive.io/">Open your data</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
  /* eslint-enable class-methods-use-this */
}
