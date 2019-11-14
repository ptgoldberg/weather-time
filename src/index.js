/*jshint esversion: 6 */

import React from 'react';
import ReactDOM from 'react-dom';
import Request from 'superagent';
//import _ from 'lodash';


class Input extends React.Component {

    constructor() { 
        super();
        this.state = {
            zip: 98119
        };
    }

    componentWillMount () {
        this.search();
    }

    updateSearch () {
        this.search(this.refs.query.value);
    }

    clicked () {
        this.setState({
            zip: this.refs.query.value
        });
        this.search(this.refs.query.value);
    }

    render() {
        if (!this.state.weather) {
            return  <div>
                        <h1>Y'all want to know the weather? Plug that zip code in brah</h1>
                        <input ref="query" type="text" placeholder='zip code'/>
                        <button onClick={ (e) => {this.clicked(); }}>Search</button>
                    </div>
        } else { 
        var temp = this.state.weather.main.temp
        temp = Math.floor(((temp - 273.15)*9/5 + 32))
        console.log(this.state.weather);

        return  <div>
                    <h1>Y'all want to know the weather in {this.state.weather.name}?</h1>
                    <input ref="query" type="text" placeholder="zip code"/>
                    <button onClick={ (e) => {this.clicked(); }}>Search</button>
                    <h2>{ this.state.weather.name }</h2>
                    <h4>{ this.state.weather.weather[0].description }</h4>
                    <h4>temperature: { temp }° F</h4>
                    <h4>wind speed: { this.state.weather.wind.speed } mph</h4>
                    <h4>humidity: { this.state.weather.main.humidity }%</h4>
                </div>
        }
    }

    search(query = "") {
        var url = `https://api.openweathermap.org/data/2.5/weather?zip=${query}&appid=65036b8d41536ad067f7d3079698ebcc`;
        Request.get(url).then((response) => {
            this.setState({
                weather: response.body
            });
        });
        
        
    }
}

  ReactDOM.render(
    <Input />,
    document.getElementById('root')
  );
