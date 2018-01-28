import { Component } from 'react'

export default class extends Component {
  state = {
    text: ''
  }

  changeText = (e) => {
    this.setState({ text: e.target.value })
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
            <button type="submit" className="btn btn-primary mb-2">Submit</button>
          </div>
        </div>
      </form>
    )
  }
}