import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import './style.scss';

console.log('確認');

// src配下のindex.htmlのid=rootに接続 webpackによって
ReactDOM.render(<div>Hello React !!</div>, document.getElementById('root'));
