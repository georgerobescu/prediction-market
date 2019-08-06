import * as React from 'react';
import { drizzleConnect } from 'drizzle-react';

export interface IProps {
  children: any,
  initialized: any
}

class DisplayIfWeb3Loaded extends React.Component<IProps> {
  public render() {
    const { initialized, children } = this.props;

    if (!initialized) {
      return <div>Loading...</div>;
    }

    return <>{children}</>;
  }
}

const mapStateToProps = state => {
  return {
    initialized: state.drizzleStatus.initialized
  }
}

export default drizzleConnect(DisplayIfWeb3Loaded, mapStateToProps);
