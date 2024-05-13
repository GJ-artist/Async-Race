import React, { Component } from 'react';
import { ReactComponent as Car } from '../assets/img/car1.svg';
import _ from 'lodash';

class Cars extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: [],
            newCarColor: '',
            newCarName: '',
            raceEnded: false,
            winnerName: null,
            showGarage: false,
            showWinners: false,
            winners: {}
        };
        this.intervalId = null;
    }

    handleAdd = (newCarName) => {
        const { newCarColor } = this.state;
        const newCar = {
            id: Date.now(),
            left: 0,
            speed: _.random(500, 2000),
            color: newCarColor,
            name: newCarName
        };
        this.setState(prevState => ({
            cars: [...prevState.cars, newCar]
        }));
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    checkWinner = () => {
        const { cars, winners } = this.state;

        const maxSpeed = Math.min(...cars.map(car => car.speed));
        const winnerCar = cars.find(car => car.speed === maxSpeed);

        if (winnerCar) {
            const winnerName = winnerCar.name;
            const updatedWinners = {
                ...winners,
                [winnerName]: winners[winnerName] ? winners[winnerName] + 1 : 1
            };
            this.setState({ winnerName, raceEnded: true, winners: updatedWinners });
            alert(`The winner is: ${winnerName}!`);
            console.log(cars);
        }
    };

    handleStart = () => {
        const { cars } = this.state;
        const updatedCars = cars.map(car => ({
            ...car,
            left: '90%',
            speed: _.random(500, 2000)
        }));
        this.setState({ cars: updatedCars });
        setTimeout(() => {
            this.checkWinner();
        }, _.maxBy(updatedCars, 'speed').speed);
    };

    handleReset = () => {
        clearInterval(this.intervalId);
        this.setState({
            cars: this.state.cars.map(car => ({ ...car, left: 0 })),
            winnerName: null,
            raceEnded: false
        });
    };

    toggleGarage = () => {
        this.setState(prevState => ({ showGarage: !prevState.showGarage }));
    };

    toggleWinners = () => {
        this.setState(prevState => ({ showWinners: !prevState.showWinners }));
    };

    render() {
        const { cars, newCarColor, newCarName, winnerName, showGarage, showWinners, winners } = this.state;
        return (
            <div className={"head"}>
                {cars.map((car, index) => (
                    <div key={index} className={'road'}>
                        <Car className={'cars'} style={{
                            left: car.left,
                            transition: `left ${car.speed}ms linear`,
                            fill: car.color
                        }} />
                    </div>
                ))}
                <div className={'buts'}>
                    <input type="color" name="newCarColor" value={newCarColor} onChange={this.handleInputChange} />
                    <input type="text" name="newCarName" value={newCarName} onChange={this.handleInputChange} placeholder="Enter car name" />
                    <button onClick={() => this.handleAdd(newCarName)}>Add</button>
                    <button onClick={this.handleStart}>Start</button>
                    <button onClick={this.handleReset}>Reset</button>
                    <button onClick={this.toggleGarage}>Garage</button>
                    <button onClick={this.toggleWinners}>Winners</button>
                </div>
                {winnerName && <p>The winner is: {winnerName}</p>}
                {showGarage && (
                    <div className="garage">
                        <h3>Garage</h3>
                        <div className="cargroup">
                            {cars.map((car, index) => (
                                <div key={index} className="car">
                                    <Car className="car-svg" style={{ fill: car.color }} />
                                    <p className="car-name">{car.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {showWinners && (
                    <div className="winners">
                        <h3>Winners</h3>
                        <div className="grid">
                            {Object.keys(winners).map((name, index) => (
                                <div key={index}>
                                    <div className="car">
                                        <p className="car-name">{name}: {winners[name]}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Cars;
