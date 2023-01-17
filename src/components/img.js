import React, { Component } from 'react'
import img from './img.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center my-3'>
        <img src={img} alt="loading" />
      </div>
    )
  }
}
