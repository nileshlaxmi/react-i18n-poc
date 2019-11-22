import React from 'react';
import { IntlProvider, FormattedMessage } from 'react-intl';

import './App.css';
import { flattenMessages } from './utils';
import messages from './constants/language';
import ReactTooltip from 'react-tooltip';
import Form from './containers/Form';

function App() {
  let selectedLanguage = 'fr';
  // let selectedLanguage = window.navigator.language.slice(0,2); // Checking Browser language

  return (
    <IntlProvider locale={selectedLanguage} messages={flattenMessages(messages[selectedLanguage])}>
      <div className="App">
        <header className="App-header">
          <p><FormattedMessage id = "header.title" /></p>
        </header>
        <main>
          <span data-tip='download' data-for='download'>
            <FormattedMessage id = "greetings.question" />
          </span>
          <ReactTooltip id='download' place="bottom">
            <FormattedMessage id = "greetings.answer" />
          </ReactTooltip>
          <br/><br/>
          <Form />
        </main>
      </div>
    </IntlProvider>
  );
}

export default App;
