import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Foobar from '../../shared/components/Foobar.react'
//let Foobar = React.createFactory(require('../../shared/components/Foobar.react'));

exports.getFoo = function (req, res) {
  let state = {test: 'abc'};
  let markup = ReactDOMServer.renderToString(<Foobar {...state}/>);
  res.render('home', {
    markup: markup,
    state: JSON.stringify(state)
  })
}
