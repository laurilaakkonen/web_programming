import React, { Component } from 'react';
import axios from 'axios';

const Form = (props) => {
  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form>
        <div>
          nimi: <input name="newName" value={props.newName} onChange={props.handler} />
        </div>
        <div>
          numero: <input name="newNum" value={props.newNum} onChange={props.handler} />
        </div>
        <div>
          <button type="submit" onClick={props.onSubmit}>lisää</button>
        </div>
      </form>
    </div>
  )
}

const Entries = (props) => {
  return (
    <div>
      <h2>Numerot</h2>
      <table>
        <tbody>
          {props.persons.map(person =>
            <tr key={person.id}>
              <td>{person.name}</td>
              <td>{person.number}</td>
              <td><button onClick={() => props.removeEntry(person.id)}>Poista</button></td>
            </tr>
          )
          }
        </tbody>
      </table>
    </div>
  )
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNum: '',
    }
  }

  componentDidMount = () => {
    axios.get('http://localhost:3001/persons')
      .then(res => {
        this.setState({
          persons: res.data
        })
      }
      )
  }

  handleRemove = (id) => {
    const removePerson = this.state.persons.find(person => person.id === id);
    if (window.confirm('Poista ' + removePerson.name + '?')) {
      axios.delete('http://localhost:3001/persons/' + id)
        .then(res => {
          const remainingPersons = [...this.state.persons];
          const index = remainingPersons.indexOf(removePerson);
          if (index !== -1) {
            remainingPersons.splice(index, 1);
            this.setState({ persons: remainingPersons });
          }
        })
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.persons.filter(person => person.name === this.state.newName).length > 0) {
      alert("Henkilö on jo puhelinluettelossa!");
    } else if (this.state.newName === "" || this.state.newNum === "") {
      alert("Täytä molemmat kentät lisätäksesi henkilö!")
    }
    else {
      axios.post('http://localhost:3001/persons', {
        name: this.state.newName,
        number: this.state.newNum,
        id: (this.state.persons.lengths)
      }).then(res => {
        this.setState({
          persons: [...this.state.persons, res.data],
          newName: "",
          newNum: "",
        })
      })
      alert("Henkilö lisätty onnistuneesti!")
    }
  }



  render() {
    return (
      <div>
        <Form newName={this.state.newName} handler={this.handleChange} onSubmit={this.handleSubmit} />
        <Entries persons={this.state.persons} removeEntry={this.handleRemove} />
      </div>
    )
  }
}

export default App