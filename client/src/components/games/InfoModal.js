import React from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'
import './InfoModal.css'
import generateImageUrl from './libs/generateImageUrl'
import styled from 'styled-components'

const StyledImage = styled.img`
  width: 70px;
  height: 70px;
`

const StyledFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.5em 0;
  width: 80%;
`
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
          <h2
            className="header"
            style={{ marginBottom: '1em', padding: '1em' }}
          >
            Catch all the fish! <span role="img">🐟</span>
          </h2>

          <div className="body">
            <p>Points:</p>
            <StyledFlex>
              {' '}
              <StyledImage src={generateImageUrl('seaweed')} /> : 0 points{' '}
              <span role="img">👎</span>{' '}
            </StyledFlex>
            <StyledFlex>
              {' '}
              <StyledImage src={generateImageUrl('octopus')} /> : -10 points{' '}
              <span role="img">👎</span>
            </StyledFlex>
            <StyledFlex>
              {' '}
              <StyledImage src={generateImageUrl('fish')} /> : 10 points{' '}
              <span role="img">👍</span>
            </StyledFlex>
            <StyledFlex>
              {' '}
              <StyledImage src={generateImageUrl('shark')} />: ±20 points{' '}
              <span role="img">👍</span>
            </StyledFlex>
            <div
              style={{
                width: '100%',
                textAlign: 'center',
                marginTop: '1em',
                cursor: 'pointer'
              }}
            >
              <button className="modal-button" onClick={this.closeModal}>
                Get Fishing!
              </button>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
