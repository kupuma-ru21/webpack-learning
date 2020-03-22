import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import './style.scss';

// src配下のindex.htmlのid=rootに接続 webpackによって
ReactDOM.render(<div>Hello React !!</div>, document.getElementById('root'));
