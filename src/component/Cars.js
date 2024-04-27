import React, {Component} from 'react'
import {ReactComponent as Car1} from '../assets/img/car1.svg'
import {ReactComponent as Car2} from '../assets/img/car2.svg'
import {ReactComponent as Car3} from '../assets/img/car3.svg'
import _ from 'lodash'

class Cars extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            left: 0
        }
    }

    handleStart = () => {
        this.setState({left: '90%'})
        this.car1 = _.random(1000, 3000)
        this.car2 = _.random(1000, 3000)
        this.car3 = _.random(1000, 3000)
        this.interval = setInterval(() => {
            if (Math.min(this.car1, this.car2, this.car3) === this.car1) alert('Car 1 wins!')
            if (Math.min(this.car1, this.car2, this.car3) === this.car2) alert('Car 2 wins!')
            if (Math.min(this.car1, this.car2, this.car3) === this.car3) alert('Car 3 wins!')
            clearInterval(this.interval)
        }, Math.max(this.car1, this.car2, this.car3))
    }
    handleReset = () => {
        this.setState({left: 0})
    }

    render() {
        const {left} = this.state
        return (
            <div className={"head"}>
                
                <div className={'road'}>
                    <Car1 className={'cars car1'} style={{
                        left,
                        transition: `${this.car1}ms`
                    }}/>
                </div>
                <div className={'road'}>
                    <Car2 className={'cars car2'} style={{
                        left,
                        transition: `${this.car2}ms`
                    }}/>
                </div>
                <div className={'road'}>
                    <Car3 className={'cars car3'} style={{
                        left,
                        transition: `${this.car3}ms`
                    }}/>
                </div>
                <div className={'buts'}>
                    <button onClick={this.handleStart}>Start</button>
                    <button onClick={this.handleReset}>Reset</button>
                </div>
            </div>
        );
    }
}

export default Cars;