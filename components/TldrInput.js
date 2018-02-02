import { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { addNewDefinition, addNewDefinitionLoading } from '../store'

import APIService from '../utils/APIService'

const MAXIMUM_CHARACTERS_ALLOWED = 77
const MINIMUM_CHARACTERS_ALLOWED = 10

class TldrInput extends Component {
  state = {
    text: '',
    isTextOverflow: false,
    isTextUnderflow: true,
  }

  changeText = (e) => {
    if (e.target.value.length > MAXIMUM_CHARACTERS_ALLOWED) {
      this.setState({
        isTextOverflow: true,
      })
      return
    }
    if (e.target.value.length <= MINIMUM_CHARACTERS_ALLOWED) {
      this.setState({
        isTextUnderflow: true,
        text: e.target.value,
      })
      return
    }
    this.setState({
      text: e.target.value,
      isTextOverflow: false,
      isTextUnderflow: false,
    })
  }

  onKeyPress = (e) => {
    if (e.key == 'Enter') this.submit(e)
  }

  submit = (e) => {
    e.preventDefault()
    if (this.state.isTextUnderflow) {
      alert("Don't you think that's too short?")
      return
    }
    if (this.state.isTextOverflow) return
    if (this.state.text === "") return
    if (this.props.submitting) return
    this.props.addNewDefinitionLoading(this.state.text)
    this.props.addNewDefinition(this.props.id, this.state.text)

    // How to keep text around with Redux,
    // do we only have to bind text to global state?
    this.setState({
      text: '',
    })
  }

  render () {
    const { text, isTextOverflow, isTextUnderflow } = this.state
    return (
      <form className='mb-3'>
        <div className='form-row'>
          <div className='col'>
            <input
              type="text"
              className="form-control form-control-lg" placeholder={`Give a shill to ${this.props.coin_symbol}?`}
              value={this.props.text ? this.props.text : this.state.text}
              onChange={this.changeText}
              onKeyPress={this.onKeyPress}
            />
            {
              text !== "" && (isTextOverflow ?
              <div className="message-under-input">Maximum is {MAXIMUM_CHARACTERS_ALLOWED} characters.</div>
              :
              <div className="message-under-input">{MAXIMUM_CHARACTERS_ALLOWED - text.length} left</div>)
            }
          </div>
          <div className='col-auto'>
            <button
              type="submit" className="btn btn-primary btn-lg mb-2"
              onClick={this.submit}
              disabled={(isTextOverflow || isTextUnderflow)}
            >
              {this.props.submitting ? 'Submitting..' : 'Submit'}
            </button>
          </div>
        </div>
        <style jsx>{`
          .message-under-input {
            margin-top: 8px;
            font-size: 11px;
            color: gray;
            font-style: italic;
          }
        `}</style>
      </form>
    )
  }
}

const mapStateToProps = ({ submittingAddDefinition, currentInputText }) => {
  return {
    submitting: submittingAddDefinition,
    text: currentInputText,
  }
}

export default connect(mapStateToProps, { addNewDefinition, addNewDefinitionLoading })(TldrInput)
