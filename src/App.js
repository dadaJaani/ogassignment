import React, { Component } from 'react';
import List from './components/List'
import Modal from './components/Modal'
import escapeRegExp from 'escape-string-regexp'
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
      query: '',
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

  updateQueryAndSearch = (val) => {
    this.setState({ query: val })
  }

  setAlert = (id) => {
    this.setState({
      selectedAlert: this.state.alerts.filter(item => item.id === id),
      selectedNotes: this.state.notes.filter(note => note.alertId === id),
      isModalOpen: true,
    })
  }

  closeModal = () => {
    this.setState({isModalOpen: false})
  }

  setSearch = (val) => {
    this.setState({
      query: val.trim(),
      isModalOpen: false,
    })
  }

  render() {

    const { query, alerts } = this.state

    let showingAlerts

    if (query) {
      let match = new RegExp(escapeRegExp(query), 'i')
      showingAlerts = alerts.filter( alert => {
        let display = match.test(alert.message)
        if (!display && alert.tag) {
          for (var i = 0; i < alert.tag.length; i++) {
            display =  match.test(alert.tag[i])
            if (display) break;
          }
        }
        if (!display && alert.teams) {
          for (var i = 0; i < alert.teams.length; i++) {
            display =  match.test(alert.teams[i])
            if (display) break;
          }
        }
        if (!display && alert.owner) {
          display =  match.test(alert.owner)
        }
        return display
      })
    } else {
      showingAlerts = alerts
    }

    return (
      <div className='root'>
        <div className='header-main'>
          <img src={require('./assets/logo2.png')} alt="OpsGenie" height='60' className='header-logo-image'/>
          <img src={require('./assets/logo3.png')} alt="OpsGenie" height='22' className='header-logo-text2'/>
          <div className='header-search'>
            <input
              placeholder='Search'
              value={this.state.query}
              className='header-search-in'
              onChange={(event) => this.updateQueryAndSearch(event.target.value)}
            />
            <img src={require('./assets/search.png')} height='20' className='search-logo'/>
          </div>
          <img src={require('./assets/logo3.png')} alt="OpsGenie" height='30' className='header-logo-text'/>


        </div>

        <List
          items={showingAlerts}
          setAlert={this.setAlert}
          setSearch={this.setSearch}
        />

        <Modal
          alert={this.state.selectedAlert[0]}
          notes={this.state.selectedNotes}
          visible={this.state.isModalOpen}
          closeModal={this.closeModal}
          setSearch={this.setSearch}
        />

      </div>

    )
  }
}

export default App
