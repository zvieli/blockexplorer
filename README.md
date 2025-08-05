



# Ethereum Block Explorer

This project was developed as part of the **Alchemy University Ethereum Bootcamp (Week 3 Project)**.

It is a simplified Ethereum block explorer that uses the **Alchemy SDK** to interact with the Ethereum Mainnet, allowing users to query blockchain data and display it through a React-based frontend.

---

## 📚 About the Project

During the third week of the bootcamp, we covered the Ethereum JSON-RPC API and the `ethers.js` library, giving us the ability to query the Ethereum blockchain and interact with it programmatically.

This project builds on that knowledge using the **Alchemy SDK**, which wraps much of the `ethers.js` provider functionality in a more streamlined and convenient way.

You can think of this as a simplified version of [Etherscan](https://etherscan.io).

---

## 🔧 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/zvieli/blockexplorer.git
cd blockexplorer
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a `.env` File

In the root directory, create a `.env` file and add your Alchemy API key:

```
REACT_APP_ALCHEMY_API_KEY=YOUR_ALCHEMY_API_KEY
```

> ⚠️ **Note:** While putting the API key in client code is fine for learning, never expose sensitive keys in production apps.

---

### 4. Start the Development Server

```bash
npm start
```

Then navigate to `http://localhost:3000` in your browser.

---

## 🚀 Features (Suggested & Implemented Ideas)

* ✅ View current Ethereum block number
* 🔲 View full block details using `alchemy.core.getBlock()`
* 🔲 Display transactions from a block using `alchemy.core.getBlockWithTransactions()`
* 🔲 View transaction receipt with `alchemy.core.getTransactionReceipt()`
* 🔲 View account balance using `alchemy.core.getBalance()`
* 🔲 Bonus: explore NFT methods, WebSocket support, and more

---

## 🧠 Further Learning Ideas

* Click on a block to view its transactions
* Click on a transaction to view its full details
* Add an accounts page to look up wallet balances
* Explore NFT metadata and ownership history
* Use WebSocket APIs to listen for new blocks or pending txs

---

## 📖 Resources

* [Alchemy SDK Docs](https://docs.alchemy.com/reference/alchemy-sdk-api-surface)
* [Alchemy University](https://university.alchemy.com/)
* [Ethers.js Documentation](https://docs.ethers.org/)
* [Ethereum JSON-RPC](https://ethereum.org/en/developers/docs/apis/json-rpc/)

---

## 📜 License

This project was created for educational purposes as part of **Alchemy University's Ethereum Developer Bootcamp**.
Not intended for production use.

---

```

---


```
