import * as React from 'react';
import { drizzleConnect } from 'drizzle-react';

export interface IProps {
  web3: Object,
  children: any,
  drizzleStatus: any
}

class DisplayIfWeb3Loaded extends React.Component<IProps> {
  public render() {
    const { drizzleStatus, children } = this.props;

    if (!drizzleStatus.initialized) {
      return <div>Loading...</div>;
    }

    return children;
  }
}

const mapStateToProps = state => {
  return {
    drizzleStatus: state.drizzleStatus
  }
}

export default drizzleConnect(DisplayIfWeb3Loaded, mapStateToProps);
