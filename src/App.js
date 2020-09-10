import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Ceramic from "@ceramicnetwork/ceramic-core";
import IdentityWallet from "identity-wallet";
// import tmp from 'tmp-promise'
import Ipfs from 'ipfs'
import { AnchorStatus, IpfsUtils } from "@ceramicnetwork/ceramic-common"

const seed =
  "0x5872d6e0ae7347b72c9216db218ebbb9d9d0ae7ab818ead3557e8e78bf944184";

const tempDir =
  "/var/folders/wq/dsvp935j1yb33xhqy8bqwv480000gn/T/";

async function createCeramic(ipfs) {
  const ceramic = await Ceramic.create(ipfs, {
    stateStorePath: "/Users/drbh/Projects/seramikku/test",
  });

  await IdentityWallet.create({
    getPermission: async () => [],
    seed,
    ceramic,
    useThreeIdProv: true,
  });

  return ceramic;
}

function buildConfig(path, id) {
  return {
    repo: `${path}/ipfs${id}/`,
    config: {
      Addresses: { Swarm: [`/ip4/127.0.0.1/tcp/${4004 + id}`] },
      Bootstrap: [],
    },
  };
}

async function test() {
  return await IpfsUtils.createIPFS(buildConfig(tempDir, 1))
}

function App() {
  test().then(data=>{
    console.log(data)
  })
  // const id1 = await ipfs1.id();
  // let multaddr1 = id1.addresses[0].toString();
  // const ceramic1 = await createCeramic(ipfs1);
  // console.log(ceramic1);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;