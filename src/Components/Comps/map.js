import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const K_CIRCLE_SIZE = 43;
const K_STICK_SIZE = 15;
const K_STICK_WIDTH = 3;

const greatPlaceStyle = {
    // initially any map object has left top corner at lat lng coordinates
    // it's on you to set object origin to 0,0 coordinates
    position: 'absolute',
    width: K_CIRCLE_SIZE,
    height: K_CIRCLE_SIZE + K_STICK_SIZE,
    left: -K_CIRCLE_SIZE / 2,
    top: -(K_CIRCLE_SIZE + K_STICK_SIZE)
};


const greatPlaceCircleStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    width: K_CIRCLE_SIZE,
    height: K_CIRCLE_SIZE,
    border: '3px solid #23201C',
    borderRadius: K_CIRCLE_SIZE,
    backgroundColor: '#F8E7CA',
    textAlign: 'center',
    color: '#F8E7CA',
    fontSize: 12,
    fontWeight: 'bold',
    padding: 0,
    cursor: 'pointer',
    boxShadow: '0 0 0 1px white'
};


const greatPlaceStickStyle = {
    position: 'absolute',
    left: K_CIRCLE_SIZE / 2 - K_STICK_WIDTH / 2,
    top: K_CIRCLE_SIZE-1,
    // width: K_STICK_WIDTH,
    // height: K_STICK_SIZE,
    borderTop: "25px solid #23201C",
    borderRight: "3px solid transparent",
    borderLeft: "3px solid transparent",
};

const markerStyle = {
    height: "30px",
    marginTop: "3px"
}
const MarkerCLD = () => (
    <div style={greatPlaceStyle}>
        <div style={greatPlaceCircleStyle}>
            <img alt={"Cut Lunch Deli"} src={"images/logos/CUT\ LUNCH\ DELI_LOGO.png"} style={markerStyle} />
        </div>
        <div style={greatPlaceStickStyle} />
    </div>)

class SimpleMap extends Component {
    static defaultProps = {
        center: {
            lat: -33.91163423513838,
            lng: 151.2539807110277
        },
        zoom: 16
    };

    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '400px', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyDlyYLD-GThLSHUwuNYT0ttLQQ_CG2TQmA",libraries:['places'], }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    yesIWantToUseGoogleMapApiInternals
                        onGoogleApiLoaded={({ map, maps }) => this.props.getOpenHours(map, maps)}
                >
                    <MarkerCLD
                        lat={-33.91163423513838}
                        lng={151.2539807110277}
                        text="Cut Lunch Deli"
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

export default SimpleMap;
