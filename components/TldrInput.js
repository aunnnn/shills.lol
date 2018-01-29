import { Component } from 'react'
import APIService from '../utils/APIService'

class TldrInput extends Component {
  state = {
    text: '',
    submitting: false
  }

  changeText = (e) => {
    this.setState({ text: e.target.value })
  }

  submit = (e) => {
    if (this.state.submitting) return

    e.preventDefault()
    
    this.setState({ submitting: true })
    APIService.addNewDefinition(this.props.id, this.state.text)
      .then(res => {
        this.setState({ text: '', submitting: false })
        console.log(res)
      })
  }

  render () {
    return (
      <form className='mb-4'>
        <div className='form-row'>
          <div className='col'>
            <input
              type="text"
              className="form-control" placeholder="Do you have any tldr for this coin?"
              value={this.state.text}
              onChange={this.changeText}
            />
          </div>
          <div className='col-auto'>
            <button
              type="submit" className="btn btn-primary mb-2"
              onClick={this.submit}
            >
              {this.state.submitting ? 'Submitting..' : 'Submit'}
            </button>
          </div>
        </div>
      </form>
    )
  }
}

export default TldrInput
