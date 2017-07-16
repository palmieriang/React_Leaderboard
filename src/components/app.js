import React, { Component } from 'react';
import axios from 'axios';
import MDSpinner from 'react-md-spinner';

import CamperList from './camper_list';


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recentCampers: [],
            allTimeCampers: [],
            currentView: 'recentCampers'
        };
    }

    componentWillMount() {
        // make concurrent request and set state to response
        axios.all([this.fetchRecentCampers(), this.fetchAllTimeCampers()])
            .then(axios.spread((recentCampers, allTimeCampers) => {
                this.setState({
                    recentCampers: recentCampers.data,
                    allTimeCampers: allTimeCampers.data
                });
            }));
    }

    fetchRecentCampers() {
        return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent');
    }

    fetchAllTimeCampers() {
        return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime');
    }

    // changeView(view) {
    //     this.setState({ currentView: view });
    // }

    // ES6
    changeView(currentView) {
        this.setState({ currentView });
    }

  render() {
    if (!this.state.recentCampers.length && !this.state.allTimeCampers.length) {
        return <MDSpinner className="spinner" size={100} />;
    }

    return (
      <div className="container">
        <div className="row">
            <div className="col-md-12 col-xs-12">
                <div className="tableHeader">{`Viewing Top ${this.state.currentView}`}</div>
            </div>
        </div>
        <button onClick={() => this.changeView('recentCampers')} className="btn btn-primary">Recent</button>
        <button onClick={() => this.changeView('allTimeCampers')} className="btn btn-primary">All Time</button>
        <CamperList campers={this.state[this.state.currentView]} />
      </div>
    );
  }
}
