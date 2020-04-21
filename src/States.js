import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import data from './data';

class States extends Component {
    constructor(props) {
        super(props);
        // have an object on state that is all states names with whether or not they are checked
        this.state = {
            statesChecked: {},
            data: []
        };
    }

    componentDidMount() {
        let statesChecked = {};
        let fullStatesList = Object.keys(data[0]).slice(1);
        fullStatesList.forEach((state) => {
            statesChecked[state] = true
        })

        this.setState({
            statesChecked,
            data
        })
    }

    toggleStateSelected = (evt) => {
        let state = evt.target.value;
        let checked = evt.target.checked;
        let statesChecked = this.state.statesChecked;

        statesChecked[state] = checked;

        // issue that when i take data out i can't add it back in... need to work off the initial data array every time i think
        let data = this.state.data.map((entry) => {
            let states = Object.keys(entry).slice(1);
            let newEntry = {};
            states.forEach((state) => {
                if (statesChecked[state]) {
                    newEntry[state] = entry[state];
                }
            })
            return newEntry;
        })

        this.setState({
            statesChecked,
            data
        })
    }

    // deselectAll = () => {
    //     let statesChecked = this.state.statesChecked;
    //     let data = [];
    //
    //     for (var state in statesChecked) {
    //         statesChecked[state] = false
    //     }
    //
    //     this.setState({
    //         statesChecked,
    //         data
    //     })
    //
    // }

    render() {
        const states = Object.keys(data[0]).slice(1);
        const selectedStates = this.state.data[0] ? Object.keys(this.state.data[0]).slice(1) : [];
        return (
            <div style={{"display": "flex", "flexDirection": "row", "marginTop": "100px", "marginBottom": "100px"}}>
                <div>
                    <LineChart width={730} height={730} data={this.state.data}
                               margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {selectedStates.map((state) => {
                            return <Line key={state} type="monotone" dataKey={state} stroke="#8884d8"/>
                        })}
                    </LineChart>
                </div>
                <div>
                    {/*<button onClick={this.deselectAll}> Deselect All </button>*/}
                    <div style={{"display": "flex", "flexDirection": "row", "flexWrap": "wrap", "justifyContent": "space-between"}}>
                        {states.map((state) => {
                            return (
                                <div key={state} style={{"paddingRight": "40px"}}>
                                    <input type="checkbox" defaultChecked id={state} name={state} value={state} onClick={this.toggleStateSelected}/>
                                    <label htmlFor={state}>{state}</label>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default States;