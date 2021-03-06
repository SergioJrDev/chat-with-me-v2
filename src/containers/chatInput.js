import React, { Component } from 'react'
import { connect } from 'react-redux'
import _get from 'lodash.get'
import { addNewMessageAction } from './../actions'
import { ChatForm } from './../components'

class ChatInput extends Component {
  state = {
    text: '',
  }

  onSubmitHandler = (event) => {
    const text = _get(this, 'state.text')
    const id = _get(this, 'props.currentChat.id')
    if(!text) {
      event.preventDefault()
      return false
    }
  
    const messageFactory = {
      date: new Date(),
      id,
      text,
    }
    this.setState({text: ''},
    () => this.props.dispatch(addNewMessageAction(messageFactory)))

    event.preventDefault()
    return false
  }

  onChangeHandler = (value) => {
    const { value: text } = value.target
    this.setState({text})
  }

  render() {
    const text = _get(this, 'state.text')
    return(
      <ChatForm
        onSubmitHandler={this.onSubmitHandler}
        onChangeHandler={this.onChangeHandler}
        text={text} />
    )
  }
}

const mapStateToProps = ({currentChat}, props) => {
  return {
    currentChat,
    ...props,
  }
}

export default connect(mapStateToProps)(ChatInput)