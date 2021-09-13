import React, { Component } from "react";
import Link from "next/link";

import SettingsStyle from "../components/styles/SettingsStyle";
import Header from "../components/Header";

class Settings extends Component {
  render() {
    return (
      <>
        <Header />

        <SettingsStyle>
          <Link href="/auth/change-details">Change Your Details</Link>

          <Link href="/auth/payouts">Payouts</Link>
        </SettingsStyle>
      </>
    );
  }
}

export default Settings;
