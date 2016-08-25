import React from 'react';
import Foobar2 from './Foobar2.react'

export default React.createClass({
  render: function() {
    return (
      <div>
        {this.props.test}
        <Foobar2 testing='testingggg!!!'/>
      </div>
    )
  }
})
