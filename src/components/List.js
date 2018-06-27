import React, { Component } from 'react'

import ListItem from './ListItem'

class List extends Component {

  setAlert = (id) => {
    if (this.props.setAlert) {
      this.props.setAlert(id)
    }
  }
  setSearch = (id) => {
    if (this.props.setSearch) {
      this.props.setSearch(val)
    }
  }

  render() {

    if (this.props.items.length > 0) {
      return (
        <div className='list-container'>
          {this.props.items.map(item => (
            <ListItem
              key={item.id}
              item={item}
              goToAlert={this.props.setAlert}
              setSearch={this.props.setSearch}
            />
          ))}
        </div>
      )
    } else {
      return(
        <div className='list-container-empty'>
          There are no alerts. Please add to display it here.
        </div>
      )
    }
  }
}

export default List
