import React, { Component } from 'react'

import ListItem from './ListItem'

class List extends Component {

  setAlert = (id) => {
    if (this.props.setAlert) {
      this.props.setAlert(id)
    }
  }

  render() {

    if (this.props.items.length > 0) {
      return (
        <div>
          {this.props.items.map(item => (
            <ListItem
              key={item.id}
              item={item}
              goToAlert={this.props.setAlert}
            />
          ))}
        </div>
      )
    } else {
      return(
        <div>
          There are no alerts. Please add to display it here.
        </div>
      )
    }
  }
}

export default List
