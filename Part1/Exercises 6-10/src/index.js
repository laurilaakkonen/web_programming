import React from 'react'
import ReactDOM from 'react-dom'

const Statististics = (props) => {
    return (
        <div>
            <table>
                 <tbody>
                    <tr>
                      <td>Hyvä</td> 
                      <td>{props.state.hyva}</td>
                    </tr>
                    <tr>
                        <td>Neutraali</td> 
                        <td>{props.state.neutraali}</td>
                    </tr>
                    <tr>
                        <td>Huono</td>
                        <td>{props.state.huono}</td>
                   </tr>
                </tbody>
            </table>
        </div>
    )
}

const Statististic = (props) => {
    var keskiarvo = ((props.state.hyva - props.state.huono) / (props.state.hyva+props.state.huono+props.state.neutraali)).toFixed(2)
    var prosentti = ((props.state.hyva / (props.state.hyva+props.state.huono+props.state.neutraali))*100).toFixed(1)
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>Keskiarvo</td> 
                        <td>{keskiarvo}</td>
                    </tr>
                    <tr>
                        <td>Positiivisia</td> 
                        <td>{prosentti} %</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}


class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        hyva: 0,
        neutraali: 0,
        huono: 0
      }
    }
  
    clickHyva = () => {
      this.setState({
        hyva: this.state.hyva + 1
      })
    }
  
    clickNeutraali = () => {
      this.setState({
        neutraali: this.state.neutraali + 1
      })
    }

    clickHuono = () => {
        this.setState({
          huono: this.state.huono + 1
        })
      }
  
    render() {
            if (this.state.hyva === 0) {
              return (
                <div>
                    <h1>Anna palaute</h1>
                    <button onClick={this.clickHyva}>Hyvä</button>
                    <button onClick={this.clickNeutraali}>Neutraali</button>
                    <button onClick={this.clickHuono}>Huono</button>
                  <p>Palautetta ei ole vielä annettu</p>
                </div>
              )
            }
        return (
            <div>
                <h1>Anna palaute</h1>
                <button onClick={this.clickHyva}>Hyvä</button>
                <button onClick={this.clickNeutraali}>Neutraali</button>
                <button onClick={this.clickHuono}>Huono</button>
                <h1>Statistiikka</h1>
                <Statististics state={this.state}/>
                <Statististic state={this.state}/>
            </div>
        )
      }
  }

ReactDOM.render(<App />, document.getElementById('root'))