import React from "react";
import PropTypes from "prop-types";
import "../scss/FeedbackModal.scss";

class FeedbackModal extends React.Component {
  render() {
    return (
      <div
        className={
          this.props.show
            ? "feedback-modal feedback-show"
            : "feedback-modal feedback-hide"
        }
      >
        <div className="feedback-modal-content">
          <h2 className="feedback-title">{this.props.title}</h2>
          <p className="feedback-message">{this.props.message}</p>
          <button className="ui-button" onClick={this.props.onClose}>
            Okie dokie!
          </button>
        </div>
      </div>
    );
  }
}

FeedbackModal.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  show: PropTypes.bool,
  onClose: PropTypes.func,
};

export default FeedbackModal;
