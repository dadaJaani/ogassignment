import React, { Component } from 'react';
import List from './components/List'
import Modal from './components/Modal'
import './styles/main.css';



class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      alerts: [],
      notes: {},
      selectedAlert: {},
      selectedNotes: {},
      isModalOpen: false,
    }
  }

  componentDidMount() {
    // Do async calls to get data after the component is mounted
    let alerts = require('./data/alerts.json');
    let notes = require('./data/notes.json');

    // set the state with the new data
    this.setState({
      alerts: alerts.alerts,
      notes: notes.notes,
    })
  }

  setAlert = (id) => {
    console.log(id);
    this.setState({
      selectedAlert: this.state.alerts.filter(item => item.id === id),
      selectedNotes: this.state.notes.filter(note => note.alertId === id),
      isModalOpen: true,
    })
  }

  closeModal = () => {
    this.setState({isModalOpen: false})
  }

  render() {

    // return (
    //   <div>
    //     Mar
    //   </div>
    // )
    return (

      <div>
        <div className='header-main'>
          <img src={require('./assets/logo2.png')} alt="OpsGenie" height='80' className='header-logo-image'/>
          <img src={require('./assets/logo3.png')} alt="OpsGenie" height='40' className='header-logo-text2'/>
          <div className='header-search'>
            <input placeholder='Search' className='header-search-in'></input>
            <img src={require('./assets/search.png')} height='20' className='search-logo'/>
          </div>
          <img src={require('./assets/logo3.png')} alt="OpsGenie" height='30' className='header-logo-text'/>


        </div>

        <List
          items={this.state.alerts}
          setAlert={this.setAlert}
        />

        <Modal
          alert={this.state.selectedAlert[0]}
          notes={this.state.selectedNotes}
          visible={this.state.isModalOpen}
          closeModal={this.closeModal}
        />

      </div>

    )
  }
}

export default App
