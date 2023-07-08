import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import App from "./App";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
// import App from './App';
// import { Suspense, lazy } from "react";
// import Loader from "./components/Loader";
// const App = lazy(async () => {
//   const [moduleExports] = await Promise.all([
//     import("./App"),
//     new Promise((resolve) => setTimeout(resolve, 3000)),
//   ]);
//   return moduleExports;
// });


const chains = [mainnet];
const projectId = "45112d7aed16ba0a9edac1a2312c5961";

const { publicClient, webSocketPublicClient } = configureChains(
  chains,
  [w3mProvider({ projectId })]
);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
  webSocketPublicClient,
});

const ethereumClient = new EthereumClient(wagmiConfig, chains);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <WagmiConfig config={wagmiConfig}>
        <App />
      </WagmiConfig>
      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        explorerRecommendedWalletIds={[
          "38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662",
          "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
          "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0",
        ]}
      />
    </BrowserRouter>
  </React.StrictMode>

);

// function getLibrary(provider) {
//   return new Web3Provider(provider);
// }
// ReactDOM.render(
//   <Web3ReactProvider getLibrary={getLibrary}>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </Web3ReactProvider>,
//   document.getElementById("root")
// );


