import _ from 'lodash';
import { Nijou } from './utilities';

function component() {
  const element = document.createElement('div');
  const array = ['Hello', 'Webpack', '!!'];
  element.innerHTML = _.join(array, ' ');
  console.log(Nijou(2));
  return element;
}

document.body.appendChild(component());
