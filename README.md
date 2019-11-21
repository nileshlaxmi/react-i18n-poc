# i18n Implementation

1. Install [react-intl](https://github.com/yahoo/react-intl) library  from Yahoo

```javascript
npm install react-intl --save
```javascript

1.In App.js file : import below files

```javascript
import { addLocaleData, IntlProvider } from 'react-intl';

import en from 'react-intl/locale-data/en';

import fr from 'react-intl/locale-data/fr';
```

2. We will now need to include localeData.

```javascript
addLocaleData([...en, ...fr]);
```

3. Now we need to create a message file (**message.js**) where all data which needs to multi lingual can be included.
Here, I have created a message file (**data should be in JSON format, as react-intl needs data in JSON format only**). There are two JSON format in which messages can be created.

## Format One

```javascript
export default {
  'en-US': {
    header: {
      title: 'Hello World'
    }
  },

  'fr': {
    header: {
      title: 'Bonjour le monde'
    }
  }
}
```

## Format Two

```javascript
export default{
    'en-US': {
        headerTitle: 'Hello World'
    },

    'fr': {
        headerTitle: 'Bonjour le monde'
    }
}
```

4. For format 1, we need to convert into this format
**title.message** as object is in nested format. For that I have created an utility function called FlattenMessage.js

   ex: header.title

   For format 2, it can be directly accessed as an object.

   ex: headerTitle

5. Now in App component, we will need to import FormattedMessage:
`import { FormattedMessage } from 'react-intl';`

6. We will use FormattedMessage component for i18n implementation:

## Without react-intl

```javascript
<h1>Hello World</h1>
```

## With react-intl

### Format 1

```javascript
<h1>
    <FormattedMessage id = "header.title" />
</h1>
```

### Format 2

```javascript
<h1>
    <FormattedMessage id = "headerTitle" />
</h1>

```

7. In index.js, we will need to wrap our App component with **IntlProvider** component.

### Without Redux - format 1

```javascript
ReactDOM.render(
    <IntlProvider locale={locale} messages={flattenMessages(messages[locale])}>
        <App />
    </IntlProvider>,
    document.getElementById('root'));
```

### Without Redux - format 2

```javascript
ReactDOM.render(
    <IntlProvider locale={locale} messages={messages[locale]}>
        <App />
    </IntlProvider>,
    document.getElementById('root'));
```

### With Redux - format 1

```javascript
ReactDOM.render(
  <Provider store={store()}>
    <IntlProvider locale={locale} messages={flattenMessages(messages[locale])}>
      <App />
    </IntlProvider>
  </Provider>
  , document.getElementById('root'),
);
```

### With Redux - format 2

```javascript
ReactDOM.render(
  <Provider store={store()}>
    <IntlProvider locale={locale} messages={messages[locale]}>
      <App />
    </IntlProvider>
  </Provider>
  , document.getElementById('root'),
);
```

***

### FlattenMessage.js utility

```javascript
export function flattenMessages(nestedMessages, prefix = '') {
  return Object.keys(nestedMessages).reduce((messages, key) => {
    let value = nestedMessages[key];
    let prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      messages[prefixedKey] = value;
    }
    else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }
    return messages;
  }, {});
}
```
