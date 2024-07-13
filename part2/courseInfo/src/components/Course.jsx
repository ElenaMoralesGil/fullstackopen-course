import React from 'react';
import Content from "./Content.jsx";
import Header from "./Header.jsx";
import Total from "./Total.jsx";


const Course = (props) => {
    const { course } = props;
    const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);
    return (
        <div>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total sum={totalExercises}/>
        </div>
    );
}

export default Course;
