import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import Header from './common/header';
import Footer from './common/footer';
class App extends React.Component {
    render() {
      return(
        <div>
          <Header />
          {this.props.children}
          <Footer />
        </div>
      );
    }
}
App.PropTypes={
  children: PropTypes.object.isRequired
};

export default App;
