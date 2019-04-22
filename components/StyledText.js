import React from 'react';
import { Text } from 'react-native';
import RF from 'react-native-responsive-fontsize';

import Colors from '../constants/Colors';

export class MonoText extends React.Component {
  render() {
    return (
      <Text
        {...this.props}
        style={[this.props.style, { fontFamily: 'space-mono' }]}
      />
    );
  }
}

export class HeaderText extends React.Component {
  render() {
    let size = this.props.size !== undefined ? this.props.size : 3.2;
    let color = this.props.color !== undefined ? this.props.color : '#fff';

    return (
      <Text
        {...this.props}
        style={[
          this.props.style,
          { fontSize: RF(size), color: color, fontFamily: 'prompt' }
        ]}
      />
    );
  }
}

export class ContentText extends React.Component {
  render() {
    return (
      <Text
        {...this.props}
        style={[this.props.style, { fontSize: RF(1), fontFamily: 'prompt' }]}
      />
    );
  }
}

export class ErrorText extends React.Component {
  render() {
    return (
      <Text
        {...this.props}
        style={[
          this.props.style,
          {
            fontSize: RF(2),
            fontFamily: 'prompt',
            alignSelf: 'center',
            color: 'red'
          }
        ]}
      />
    );
  }
}
