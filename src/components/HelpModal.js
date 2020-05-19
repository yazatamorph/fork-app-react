import React from "react";
import PropTypes from "prop-types";
import "../scss/HelpModal.scss";

class HelpModal extends React.Component {
  render() {
    return (
      <div className="help-modal-div">
        <button
          className="help-button"
          type="button"
          onClick={this.props.onOpen}
        >
          Need help?
        </button>
        <div
          className={
            this.props.show ? "help-modal help-show" : "help-modal help-hide"
          }
        >
          <div className="help-modal-pane">
            <div className="help-modal-content">
              <h2 className="help-title">
                {this.props.interval.name}? What&apos;s that?
              </h2>
              <p className="help-message">{this.props.interval.distance}</p>
              <button
                className="ui-button help-close"
                onClick={this.props.onClose}
              >
                Thanks!
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HelpModal.propTypes = {
  interval: PropTypes.object,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  show: PropTypes.bool,
};

export default HelpModal;
