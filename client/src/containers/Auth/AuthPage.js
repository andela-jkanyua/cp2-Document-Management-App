import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ValidatorForm } from 'react-material-ui-form-validator';
import * as tokenUtils from '../../utils/tokenUtility';
import Auth from '../../components/Auth/auth';
import * as authActions from '../../actions/authActions';

/**
 * Represents a AuthWrapper class component.
 */
class AuthWrapper extends React.Component {

  /**
 * @param {object} props  Redux store updates.
 * @param {object} context pass data through the component tree
 */
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: {
        email: '',
        password: ''
      },
      error: ''
    };
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @override
   */
  componentWillMount() {
    const token = tokenUtils.getAuthToken();
    if (token) {
      this.context.router.push('/');
    }
  }

  /**
   * Route user to root if already logged in.
  * @returns {void}
   */
  componentWillReceiveProps() {
    const token = tokenUtils.getAuthToken();
    if (token) {
      this.context.router.push('/');
    }
  }

  /**
 * Submits redux loginUser Action.
 * @returns {void}
 */
  onSubmit() {
    this.props.actions.loginUser(this.state.user);
    if (tokenUtils.getAuthToken()) {
      this.context.router.push('/');
    }
  }
  /**
 * Modifies state.user.email when email is typed
 * @param {object} event The change event.
 * @returns {void}
 */
  onEmailChange(event) {
    const usr = this.state.user;
    usr.email = event.target.value;
    this.setState({ user: usr });
  }

  /**
   * @override
   */
  onPasswordChange(event) {
    const usr = this.state.user;
    usr.password = event.target.value;
    this.setState({ user: usr });
  }

  /**
   * @override
   */
  render() {
    return (
      <div>
        <ValidatorForm
          ref="form"
          onSubmit={this.onSubmit}
        >
          <Auth
            user={this.state.user}
            onSubmit={this.onSubmit}
            onEmailChange={this.onEmailChange}
            onPasswordChange={this.onPasswordChange}
            isFetching={this.props.appState.isFetching}
            errorMessage={this.props.appState.errorMessage}
            validatorError={this.state.error}
          />
        </ValidatorForm>
      </div>

    );
  }
}
AuthWrapper.contextTypes = {
  router: PropTypes.object
};
/**
 * @override
 */
function mapStateToProps(state) {
  return {
    appState: state.auth
  };
}
/**
 * Maps dispatch to Component Props
 * @param {object} dispatch Actions dispatch.
 * @returns {object} Dispatch actions
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
}
AuthWrapper.propTypes = {
  actions: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(AuthWrapper);
