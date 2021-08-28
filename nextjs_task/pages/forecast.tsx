import { useState } from 'react';

interface ForecastData {
    date: string;
    temp: number;
    hum: number;
    desc: string;
    city: string;
};


interface ForecastState {
    data: ForecastData[];
    isLoaded: boolean;
    error: any;
};



export default function Forecast(): JSX.Element {

    const [state, setData] = useState<ForecastState>({
        data: [],
        isLoaded: false,
        error: null
    });

    return (
        <div className="forecast-bg" >
            <Header f={setData} data={state} />
            {
                state.error &&
                <span>{state.error.message}</span>
            }
            {
                state.data.length > 0 ?
                    <Table data={state.data} /> :
                    <span className="hint">Enter city name and press "Enter"</span>
            }

        </div >
    );
}

async function getData(city: string, data: ForecastData[]) {

    var newData: ForecastState | undefined;

    city = city.toLowerCase();
    await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=2e7887edf5eabba3d6a1decba2297213")
        .then(res => res.json())
        .then(
            (result) => {

                newData = {
                    data: parse(result, data),
                    isLoaded: true,
                    error: null
                }
            },
            (error) => {
                newData = {
                    data: [],
                    isLoaded: true,
                    error: error
                }
            }
        );
    return newData;
}

function parse(arg: any, data: ForecastData[]): ForecastData[] {

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

interface HeaderProps {
    f: any,
    data: ForecastState
};
function Header(props: HeaderProps): JSX.Element {


    const [city, setCity] = useState("");

    return (
        <header className="forecast-header">
            <span>
                {city}
            </span>
            <input type="text" onChange={
                (event: SyntheticEvent) => {
                    let target = event.target as HTMLInputElement;

                    setCity(target.value);
                }
            } onKeyDown={
                async (event: React.KeyboardEvent<HTMLDivElement>) => {
                    if (event.key === "Enter") {
                        props.f(await getData(city, props.data.data));
                        setCity("");
                    }
                }
            } value={city} />
        </header>
    )
}

interface TableProps {
    data: ForecastData[];
}

function Table(props: TableProps): JSX.Element {

    let rows = [];
    for (let i = 0; i < props.data.length; i++) {
        rows[i] = <TableRow data={props.data[i]}></TableRow>
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
    )
}

interface RowProps {
    data: ForecastData
};
function TableRow(props: RowProps): JSX.Element {
    return (
        <tr className="bordered">
            <td>{props.data.city}</td>
            <td>{props.data.temp + " C"}</td>
            <td>{props.data.hum + "%"}</td>
            <td>{props.data.desc}</td>
        </tr>
    );
}