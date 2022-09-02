import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Row, Col } from "antd";

import Breakpoint from "react-socks";

import { Context } from "../../context";

import { Icon, Button, WalletAddrShort } from "../Components";

const Header = () => {
  const context = useContext(Context);
  const [isTestnet, setisTestnet] = useState(
    window.localStorage.getItem("STBT_isTestnet")
  );

  const toggleMainnet = () => {
    if (isTestnet) {
      window.localStorage.removeItem("STBT_isTestnet");
    } else {
      window.localStorage.setItem("STBT_isTestnet", "1");
    }
    setisTestnet(!isTestnet);
    window.location.reload();
  };

  return (
    <Layout.Header className='header-container'>
      <Row>
        <Col xs={4}>
          <Link to='/'>
            <Icon icon='logo' />
          </Link>
        </Col>
        <Col xs={12}></Col>
        <Col xs={4}>
          <Button onClick={() => toggleMainnet()} fill>
            {isTestnet ? "Testnet" : "Mainnet"}
          </Button>
        </Col>
        <Col xs={4}>
          <Breakpoint medium up>
            {context.wallet ? (
              <Link to='/wallet'>
                <WalletAddrShort />
              </Link>
            ) : (
              <Link to='/wallet/unlock'>
                <Button fill>Connect my Wallet</Button>
              </Link>
            )}
          </Breakpoint>
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default Header;
