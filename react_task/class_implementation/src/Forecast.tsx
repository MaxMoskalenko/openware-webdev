import React, { SyntheticEvent } from 'react';
import './css/forecast.css';

interface ForecastData {
    date: string;
    temp: number;
    hum: number;
    desc: string;
    city: string;
};

interface ForecastProps { };
interface ForecastState {
    data: ForecastData[];
    isLoaded: boolean;
    error: any;
    items: any;
};


export default class Forecast extends React.Component<ForecastProps, ForecastState> {
    constructor(props: ForecastProps) {
        super(props);
        this.getData = this.getData.bind(this);
        this.state = {
            data: [],
            isLoaded: false,
            error: null,
            items: []
        };
    }
    getData(city: string) {

        city = city.toLowerCase();
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=2e7887edf5eabba3d6a1decba2297213")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        data: this.parse(result)
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                    return;
                }
            );

    }
    parse(arg: any): ForecastData[] {
        let data = this.state.data;

        if (arg.cod !== 202 && arg.cod !== 200) {
            return data;
        }

        let forecast: ForecastData = {
            date: arg.dt,
            temp: Math.round((arg.main.temp - 273) * 10) / 10,
            hum: arg.main.humidity,
            desc: arg.weather[0].description,
            city: arg.name
        };

        data.unshift(forecast);
        if (data.length > 4)
            data.pop();

        return data;

    }


    render() {
        return (
            <div className="forecast-bg" >
                <Header sendData={this.getData} />
                {
                    this.state.error &&
                    <span>{this.state.error.message}</span>
                }
                {
                    this.state.data.length > 0 ?
                        <Table data={this.state.data} /> :
                        <span className="hint">Enter city name and press "Enter"</span>
                }


            </div >
        );
    }
}

interface HeaderProps {
    sendData: (response: string) => void;
};
interface HeaderState {
    city: string;
};

class Header extends React.Component<HeaderProps, HeaderState> {
    constructor(props: HeaderProps) {
        super(props);
        this.update = this.update.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            city: ""
        };

    }

    update(event: SyntheticEvent) {
        let target = event.target as HTMLInputElement;

        this.setState({ city: target.value });
    }

    handleClick(event: React.KeyboardEvent<HTMLDivElement>) {
        if (event.key === 'Enter') {

            this.props.sendData(this.state.city);
            this.setState({ city: "" });
        }
    }

    render() {
        return (
            <header className="forecast-header">
                <span>
                    {this.state.city}
                </span>
                <input type="text" onChange={this.update} onKeyDown={this.handleClick} value={this.state.city} />
            </header>
        );
    }
}

interface TableProps {
    data: ForecastData[];
}

class Table extends React.Component<TableProps> {

    render() {
        let rows = [];
        for (let i = 0; i < this.props.data.length; i++) {
            rows[i] = <TableRow data={this.props.data[i]}></TableRow>
        }


        return (
            <table className="forecast-table" >
                <thead>
                    <tr className="bordered">
                        <th>City Name</th>
                        <th>Temperature</th>
                        <th>Humidity</th>
                        <th>Weather</th>
                    </tr>
                </thead>


                <tbody> {rows} </tbody>

            </table >
        );
    }
}

interface RowProps {
    data: ForecastData
};
class TableRow extends React.Component<RowProps, any>{
    render() {
        return (
            <tr className="bordered">
                <td>{this.props.data.city}</td>
                <td>{this.props.data.temp + " C"}</td>
                <td>{this.props.data.hum + "%"}</td>
                <td>{this.props.data.desc}</td>
            </tr>
        );
    }
}