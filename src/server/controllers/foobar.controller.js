let React = require ('react')
let ReactDOMServer = require('react-dom/server')
let Foobar = require('../../shared/components/Foobar.react').default
//let Foobar = React.createFactory(require('../../shared/components/Foobar.react'));

exports.getFoo = function (req, res) {
  let state = {test: 'abc'};
  let markup = ReactDOMServer.renderToString(<Foobar {...state}/>);
  res.render('home', {
    markup: markup,
    state: JSON.stringify(state)
  })
}
