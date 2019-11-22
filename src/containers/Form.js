import React from 'react';
import { injectIntl } from 'react-intl';

const Form = props => {
    const {intl} = props;

    let firstname = intl.formatMessage({ id: 'fname' });
    let lastname = intl.formatMessage({ id: 'lname' });

    return (
        <form>
            <label>First name: </label><input type="text" name="firstname" placeholder={firstname} /><br/>
            <label>Last name:&nbsp;</label><input type="text" name="lastname" placeholder={lastname} />
        </form>
    )
}

export default injectIntl(Form);