import React from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'
import './InfoModal.css'

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('body')

export default class InfoModal extends React.Component {
  constructor() {
    super()

    this.state = {
      modalIsOpen: true
    }

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  openModal() {
    this.setState({ modalIsOpen: true })
  }

  closeModal() {
    this.setState({ modalIsOpen: false })
  }

  render() {
    return (
      <div className="container">
        <button className="modal-button-open" onClick={this.openModal}>
          Info <span role="img">ℹ️</span>
        </button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          className="modal"
          contentLabel="Example Modal"
        >
          <h2 className="header">
            Catch all the fish! <span role="img">🐟</span>
          </h2>

          <div className="body">
            <p>Points:</p>
            <p>
              {' '}
              Seaweed : 0 points <span role="img">👎</span>{' '}
            </p>
            <p>
              {' '}
              Octopus : -10 points <span role="img">👎</span>
            </p>
            <p>
              {' '}
              Goldfish : 10 points <span role="img">👍</span>
            </p>
            <p>
              {' '}
              Shark: 20 points <span role="img">👍</span>
            </p>
            <button className="modal-button" onClick={this.closeModal}>
              Get Fishing!
            </button>
          </div>
        </Modal>
      </div>
    )
  }
}
