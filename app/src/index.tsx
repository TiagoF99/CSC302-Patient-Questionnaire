import * as React from 'react';
import { render } from 'react-dom';

import Main from './components/main';

const App: React.FunctionComponent<{}> = () => <><Main /></>;

render(<App />, document.getElementById('app'));
