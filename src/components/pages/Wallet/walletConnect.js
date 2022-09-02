import React, { useContext } from "react";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { Text, Button } from "../../Components";
import { Icon as AntIcon, Row, Col } from "antd";
import { Context } from "../../../context";

export const trustSignTransaction = (connector, network, transaction) => {
  if (!connector.connected) {
    throw new Error("Session currently disconnected");
  }
  const request = connector.sendCustomRequest({
    method: "trust_signTransaction",
    params: [
      {
        network,
        transaction: JSON.stringify(transaction),
      },
    ],
  });
  return request;
};

const WalletConnectPane = (props) => {
  const context = useContext(Context);

  const walletConnect = async () => {
    // Clear stuck LS wallet
    window.localStorage.removeItem("walletconnect");
    // Create a connector
    const connector = new WalletConnect({
      bridge: "wss://bridge.walletconnect.org", // Required
      qrcodeModal: QRCodeModal,
    });
    connector.clientMeta.url = "https://www.binance.org";

    // Check if connection is already established
    if (!connector.connected) {
      // create new session
      connector.createSession();
      // console.log(connector);
    }

    // Subscribe to connection events
    connector.on("connect", (error, payload) => {
      if (error) {
        throw error;
      }
      // Get provided accounts and chainId
      const { accounts } = payload.params[0];
      const account = accounts[0];
      context.setContext({
        wallet: {
          walletconnect: connector,
          address: account,
          account: account,
        },
      });
    });

    connector.on("session_update", (error, payload) => {
      if (error) {
        throw error;
      }
      // Get updated accounts and chainId
      const { accounts } = payload.params[0];
      const account = accounts[0];
      context.setContext(
        {
          wallet: {
            walletconnect: connector,
            address: account,
            account: account,
          },
        },
        () => {
          props.history.push("/");
        }
      );
    });

    connector.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }
      // Delete connector
      context.forgetWallet();
    });
  };

  return (
    <div>
      <Row style={{ bottom: 5 }}>
        <Text size={18}>
          Click to scan a QR code and link your mobile wallet using
          WalletConnect.
        </Text>
      </Row>

      <Row>
        <Col span={12}>
          <Button
            onClick={() => walletConnect()}
            fill={true}
            style={{ marginTop: 24, marginLeft: 0 }}
          >
            Connect <AntIcon type='arrow-right' />
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default WalletConnectPane;
