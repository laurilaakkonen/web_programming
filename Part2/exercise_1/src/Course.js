import React, { Component } from 'react';

const Header = (props) => {
    return (
        <h1>{props.course.name}</h1>
    )
}
const Contents = (props) => {
    return (
        <div>
            {props.parts.map(pt =>
                <ul id="list" key={pt.id}>
                <Part part={pt.name} exercise={pt.exercises} />
                </ul>
            )}
        </div>
    )
}

const Part = (props) => {
    return (
        <li>{props.part} {props.exercise}</li>
    )
}


const Total = (props) => {

    let total = 0;
    props.parts.forEach(element => {
        total += element.exercises;
    });

    return (
        <p>Total {total} exercises</p>
    )
}

class Course extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    render(){
        return(
            <div>
                <Header course={this.props.course} />
                <Contents parts={this.props.course.parts} />
                <Total parts={this.props.course.parts} />
            </div>
        )
    }

}

export default Course;