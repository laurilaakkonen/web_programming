import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const course = {
        name: 'Superadvanced web and mobile programming',
        parts: [
          {
            name: 'Basics of React',
            exercises: 8
          },
          {
            name: 'Using props',
            exercises: 10
          },
          {
            name: 'Component states',
            exercises: 12
          }
        ]
      }

  const Header = (props) => {
    return (
      <div>
         <h1>{course.name}</h1>
      </div>
    )
  }

  const Part = (props) => {
    return (
      <div>
         <p>{props.name} {props.exercises}</p>
      </div>
    )
  }

  const Contents = (props) => {
    return (
      <div>
        <Part name={course.parts[0].name} exercises={course.parts[0].exercises}/>
        <Part name={course.parts[1].name} exercises={course.parts[1].exercises}/>
        <Part name={course.parts[2].name} exercises={course.parts[2].exercises}/>
      </div>
    )
  }

  const Total = (props) => {
    return (
      <div>
        <p>Total {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} exercises</p>
      </div>
    )
  }

  return (
    <div>
      <Header course={course} />
      <Contents course={course} />
      <Total course={course} />
    </div>
  )
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)