import * as React from 'react';
import { render } from 'react-dom';

import Status from './components/status';

const App: React.FunctionComponent<{}> = () => <><Status /></>;

render(<App />, document.getElementById('app'));
