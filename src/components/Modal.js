import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleModalWindow } from '../actions'
import DeleteComment from '../components/DeleteComment'
import DeletePost from '../components/DeletePost'
import EditComment from '../components/EditComment'

class Modal extends Component {
  componentDidMount() {
    document.body.classList.toggle('noscroll');
  }

  componentWillUnmount() {
    document.body.classList.toggle('noscroll');
  }


    render() {
        return (
            <div className="modal-background">
                <div className="modal-window">
                    <div className="modal-header">
                      <div className="modal-title">{ this.props.title }</div>
                      <a className="modal-close" onClick={(e) => { e.preventDefault(); this.props.close(false);}}>X</a>
                    </div>
                    <div className="modal-content">
                      {
                        (() => {switch (this.props.component) {
                          case "deleteComment":
                              return <DeleteComment />
                          case "editComment":
                              return <EditComment />
                          case "deletePost":
                              return <DeletePost />
                          default:
                              return <div>Sorry, an error occured</div>
                          }
                        })()
                    }
                    </div>
                </div>
            </div>
        )
    };
};

function mapDispatchToProps (dispatch) {
  return {
    close: (data)=> dispatch(toggleModalWindow(data))
  }
}

function mapStateToProps(state, routingDetails) {
    return {
      title: state.modalWindow.title,
      component: state.modalWindow.component,
      itemID: state.modalWindow.itemId

    };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);