import React, { Component } from 'react'
import '../styles/main.css'
import '../styles/modal.css'

class Modal extends Component {

  state = {
    detailSelected: true,
  }

  closeModal = () => {
    this.props.closeModal();
  }

  switchModeToNotes = () => {
    this.setState({ detailSelected: false })
  }

  switchModeToDetail = () => {
    this.setState({ detailSelected: true })
  }

  render() {
    const { alert, notes, visible } = this.props
    console.log(this.props);
    console.log(alert);
    let estTime = 0;
    let insertedAt = 0;
    if (alert) {
      let elapsedTime = Date.now()

      elapsedTime = elapsedTime - alert.createdAtTimestamp;
      let minutes = elapsedTime / 60000
      let hours = minutes / 60
      let days = hours / 24

      hours = hours % 24
      minutes = minutes % 60

      estTime = Math.floor(days) + 'd ' + Math.floor(hours) + 'h ' + Math.floor(minutes) + 'm'

    }


    if (alert) {

      return(
        <div className={visible ? 'modal-open' : 'modal-close'}>
          <div className='modal-backdrop'
            onClick={this.closeModal}
            />

          <div className='modal-container'>
            <div
              className='modal-close-button'
              onClick={this.closeModal}
              >X</div>

            <div className='modal-header'>
              <div className='modal-heading'>Alert Details</div>
              <div className='info-message'>
                {alert.message}
              </div>

              <div className='info-acknowledge'>
                <div className='info-acknowledge-item left-align'>{alert.createdAt}</div>

                <div className='info-acknowledge-item center-align'>
                  {alert.owner ? alert.owner : "No Owner"}
                </div>
                <div className='info-acknowledge-item right-align'>
                  <span className={alert.acknowledged
                    ? 'alert-acknowledged-green'
                    : 'alert-acknowledged-red'
                  }>{alert.acknowledged ? "Ack'ed" : "Open"}</span>
                </div>

              </div>
            </div>

            <div className='modal-body'>
              <div className='modal-tab-buttons'>
                <span className={this.state.detailSelected ? 'modal-tab-button-selected' : 'modal-tab-button'}
                  onClick={this.switchModeToDetail}>Details</span>
                <span className={this.state.detailSelected ? 'modal-tab-button' : 'modal-tab-button-selected'}
                  onClick={this.switchModeToNotes}>Notes</span>
              </div>
              {this.state.detailSelected
              ? <div className='modal-tab'>

                  <div className='field'>
                    <div className='field-title'>ID:</div>
                    <div className='field-value'> {alert.id}</div>
                  </div>

                  <div className='field'>
                    <div className='field-title'>Alert Message:</div>
                    <div className='field-value'>{alert.message}</div>
                  </div>

                  <div className='field'>
                    <div className='field-title'>Created at:</div>
                    <div className='field-value'>{alert.createdAt}</div>
                  </div>

                  <div className='field'>
                    <div className='field-title'>Owner:</div>
                    <div className='field-value'>{alert.owner ? alert.owner : "No owner"}</div>
                  </div>

                  <div className='field'>
                    <div className='field-title'>Owner's email:</div>
                    <div className='field-value'>{alert.ownerShortName ? alert.ownerShortName : "No owner"}</div>
                  </div>

                  <div className='field'>
                    <div className='field-title'>Acknowledged by:</div>
                    <div className='field-value'>{alert.acknowledged ? alert.acknowledgedBy : "Not acknowledged yet"}</div>
                  </div>

                  <div className='field'>
                    <div className='field-title'>Elapsed time:</div>
                    <div className='field-value'>{estTime}</div>
                  </div>

                  {alert.tag.length > 0
                    ? (<div className='field'>
                        <div className='field-title'>Tags:</div>
                        <div className='field-value'>
                          {alert.tag.map(t => (
                            <span key={t} className='li-tag'>
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>)
                    : <div/>
                  }
                  <div className='field'>
                    <div className='field-title'>Teams:</div>
                    <div className='field-value'>
                      {alert.teams.map(team => (
                        <span key={team} className='team-member'>
                          {team}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              : <div className='modal-tab'>
                  <div className='note-list-container'>

                    {notes.length > 0 && notes.map(note => {
                      if (note.note.length > 0) {
                        return (
                          <div key={note.note} className='modal-note'>
                            {note.note}
                          </div>
                        )
                      } else {
                        return (
                          <div></div>
                        )
                      }
                      })}

                    {notes.length <= 0 &&
                      <div className='modal-note-not-found'>
                        There were no notes found.
                      </div>
                    }

                  </div>
                  <textarea
                    rows='4'
                    placeholder="Type a note here."
                    className='new-note'
                  />

                </div>
              }


            </div>


          </div>

        </div>
      )
    } else {
      return(
        <div>
        </div>
      )
    }
  }

}
export default Modal
