import { useState } from 'react'


const Header = props => {
    return (
        <h1>{props.text}</h1>
    )
}
const Button = (props) => {
    return (
        <button onClick={props.onClick}>{props.text}</button>
    )
}
const Statistic = (props) => {
    return (
        <p> {props.text} {props.value}</p>
    )
}
const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const all = good + neutral + bad;
    const average = (good - bad ) / all || 0;
    const positive = (good / all) * 100 || 0;


    return (
        <div>
            <Header text={"give feedback"}/>
            <Button onClick={() => setGood(good + 1)} text="good"/>
            <Button onClick={() => setNeutral(neutral + 1)} text="neutral"/>
            <Button onClick={() => setBad(bad + 1)} text="bad"/>
            <Header text={"statistics"}/>
            <Statistic text="good" value={good}></Statistic>
            <Statistic text="neutral" value={neutral}></Statistic>
            <Statistic text="bad" value={bad}></Statistic>
            <Statistic text="all" value={average}></Statistic>
            <Statistic text="positive" value={positive + "%"} ></Statistic>

        </div>
    )
}

export default App