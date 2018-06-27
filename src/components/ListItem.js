import React, { Component } from 'react'
import '../styles/main.css'

class ListItem extends Component {

  goToAlert = (id) => {
    if (this.props.goToAlert) {
      this.props.goToAlert(id)
    }
  }

  setSearch = (val) => {
    if (this.props.setSearch) {
      this.props.setSearch(val)
    }
  }

  render() {
    // console.log(this.props.item);

    return (
      <div
        className='list-item'
      >

        <div className='li-info-count' onClick={() => this.goToAlert(this.props.item.id)}>
          <span className='li-info-count-number'>x{this.props.item.count}</span>
        </div>

        <div className='li-info-main' >
          <div className='li-info-main-message' onClick={() => this.goToAlert(this.props.item.id)}>
            {this.props.item.message}
          </div>

          <div className='team-container'>
            <div className='field-title-main'>Teams</div>
            <div className='field-value-main'>
              {this.props.item.teams.map(team => (
                <span key={team} className='team-member'
                  onClick={() => this.setSearch(team)}
                >
                  {team}
                </span>
              ))}
            </div>
          </div>

          {this.props.item.tag.length > 0
            ? (<div className='li-tag-container'>
                <div className='field-title-main'>Tags</div>
                <div className='field-value-main'>
                  {this.props.item.tag.map(t => (
                    <span key={t} className='li-tag'
                      onClick={() => this.setSearch(t)}
                    >
                      {t}
                    </span>
                  ))}
              </div>
              </div>)
            : <div/>
          }

        </div>

        <div className='li-info-acknowledge' onClick={() => this.goToAlert(this.props.item.id)}>
          <span className='li-info-acknowledge-date'>{this.props.item.createdAt}</span>

          <div  className='li-info-acknowledge-owner'>
            {this.props.item.owner ? this.props.item.owner : "No Owner"}
          </div>
          <div  className={this.props.item.acknowledged
              ? 'li-info-acknowledge-open acked'
              : 'li-info-acknowledge-open notacked'}>
            {this.props.item.acknowledged ? "Ack'ed" : "Open"}
          </div>
        </div>

      </div>
    )
  }
}

export default ListItem
