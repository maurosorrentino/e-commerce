import React, { Component } from 'react';
import Link from 'next/link';

import SettingsStyle from '../components/styles/SettingsStyle';
import Header from '../components/Header';

class Settings extends Component {

    render() {

        return (
<>
            <Header />

            <SettingsStyle>

                <Link href="/reset-password">Change Your Password</Link>

                <Link href="/auth/save-your-card">Save Your Debit/Credit Card</Link>

            </SettingsStyle>
</>
        )

    }

}

export default Settings;