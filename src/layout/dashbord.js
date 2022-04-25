import React, { Component } from 'react'
import { getContract, slrContract, contractAddress, gerUserTokenBalance } from '../Helpers/contract';
import {  slrm_Contract, gerUserTokenBalanceM } from '../Helpers/contract_SLRM';
import { NotificationManager } from 'react-notifications';
import { dataService  , dataService_SLRM} from '../Helpers/storageService';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

import ReactTooltip from "react-tooltip";


Chart.register(...registerables);


export class Dashbord extends Component {

	toutaleSuplay = 1000000;
	constructor(props) {
		let balance = 0;let balanceSlm=0;
		let usdtPending = 0; let usdtPendingSlm = 0;
		let LastPaid = 0; let LastPaidSlm = 0;
		let address = 0; let UsdtPaidSlm = 0;
		let balanceM = 0; let PositionSlm = 0;
		let UsdtPaid = 0;
		let Position = 0;
		if (Number(localStorage.getItem("Balance_error")) == -1 && localStorage.getItem("connect_by_wallet") != "true") {
			localStorage.removeItem("Balance_error")
		}
		//  localStorage.removeItem("Balance_error")
		if (localStorage.getItem("Balance") != null && localStorage.getItem("input") == null) {
			balance = localStorage.getItem("Balance");
			balanceM = localStorage.getItem("BalanceM");
			usdtPending = localStorage.getItem("USDT_pendings_exact");
			LastPaid = localStorage.getItem("lastPAY");
			UsdtPaid = localStorage.getItem("USDT_pendings")
			Position =localStorage.getItem("position")
		}
		if(localStorage.getItem("connect_by_wallet") == "true"){
			balanceSlm=localStorage.getItem("balanceSLM");
			usdtPendingSlm = localStorage.getItem("PendingSLM");
			LastPaidSlm = localStorage.getItem("LastPaidSLM");
			UsdtPaidSlm = localStorage.getItem("PaidSLM");
			PositionSlm = localStorage.getItem("PositionSLM");
		}
		super(props);
		this.getTotalPaidUSDT()
		this.getHolders_getting_rewards()
		this.getTotalPaidUSDTM()
		this.getHolders_getting_rewardsM()
		this.getBalance_PinkLock_SLR()
		this.getBalance_PinkLock_SLRM()
		this.getBalance_Liquidity_SLR()
		this.getBalance_Liquidity_SLRM()
		this.getpricedata();
		this.getpricedataM();
		this.getTransactions();
		this.getTransactionsM();
		this.getVolume();
		this.getVolumeM();
		this.getTotalVolume();
		this.getTotalVolumeM();
		this.getTotalVolumeOld();
		this.state = {
			SalaryBalance: balance,
			USDTPaid: UsdtPaid,
			PendingUSDT: usdtPending,
			TotalUSDTHoldersOld: "0.00",
			TotalUSDTHoldersNew: "0.00",
			DailyTradingVolume: "0.00",
			Current0rice: "0.00",
			LastTransaction: [],
			TotalTradingVolume: [],
			TotalTradingVolumeTABLE: [],
			SlaryPrice: "0.00",
			address: address,
			position: Position,
			LastPayout: LastPaid,
			SalaryBalanceM: balanceSlm,
			USDTPaidM: UsdtPaidSlm,
			PendingUSDTM: usdtPendingSlm,
			TotalUSDTHoldersNewM: "0.00",
			DailyTradingVolumeM: "0.00",
			Current0riceM: "0.00",
			LastTransactionM: [],
			TotalTradingVolumeM: [],
			TotalTradingVolumeTABLEM: [],
			SlaryPriceM: "0.00",
			positionM: PositionSlm,
			LastPayoutM: LastPaidSlm,
			matches: window.matchMedia("(min-width: 991px)").matches,
			SalaryBalanceOnPinkLock : '',
			SalaryMiningBalanceOnPinkLock : '',
			SalaryBalanceOnLiquidity : '',
			SalaryMiningBalanceOnLiquidity : '',
		}


	}
	gerUserUSDT_PAID = async (address) => {
		let decimals = 18;
		let info = await slrContract.methods.getAccountDividendsInfo(address).call();
		if (info[2] === 0) {
			return ({
				status: "success",
				paidUSDT: info[3] / Math.pow(10, decimals),
				pendingUSDT: info[4] / Math.pow(10, decimals),
				position: info[2],
				lastPAY: new Date(info[5] * 1000).toLocaleString()
			});
		} else {
			return ({
				status: "pending",
				paidUSDT: info[3] / Math.pow(10, decimals) == info[4] / Math.pow(10, decimals) ? 0.0 : info[3] / Math.pow(10, decimals),
				pendingUSDT: info[4] / Math.pow(10, decimals),
				position: info[2],
				lastPAY: new Date(info[5] * 1000).toLocaleString()
			});
		}

	};

	gerUserUSDT_PAIDM = async (address) => {
		let decimals = 18;
		let info = await slrm_Contract.methods.getAccountDividendsInfo(address).call();
		if (info[2] === 0) {
			return ({
				status: "success",
				paidUSDT: info[3] / Math.pow(10, decimals),
				pendingUSDT: info[4] / Math.pow(10, decimals),
				position: info[2],
				lastPAY: new Date(info[5] * 1000).toLocaleString()
			});
		} else {
			return ({
				status: "pending",
				paidUSDT: info[3] / Math.pow(10, decimals) == info[4] / Math.pow(10, decimals) ? 0.0 : info[3] / Math.pow(10, decimals),
				pendingUSDT: info[4] / Math.pow(10, decimals),
				position: info[2],
				lastPAY: new Date(info[5] * 1000).toLocaleString()
			});
		}

	};



	getTotalPaidUSDTM = async () => {


		let decimals = 18;

		let info = await slrm_Contract.methods.getTotalDividendsDistributed().call();
		localStorage.setItem('TotalPaidUSDT_M', info / Math.pow(10, decimals));

		//alert(info/ Math.pow(10, decimals))
		return info / Math.pow(10, decimals);
	};

	getHolders_getting_rewardsM = async () => {


		let decimals = 18;

		let info = await slrm_Contract.methods.getNumberOfDividendTokenHolders().call();
		localStorage.setItem('H_R_M', info);

		//alert(info/ Math.pow(10, decimals))
		return info;
	};





	getTotalPaidUSDT = async () => {


		let decimals = 18;

		let info = await slrContract.methods.getTotalDividendsDistributed().call();
		localStorage.setItem('TotalPaidUSDT', info / Math.pow(10, decimals));

		//alert(info/ Math.pow(10, decimals))
		return info / Math.pow(10, decimals);
	};

	getHolders_getting_rewards = async () => {


		let decimals = 18;

		let info = await slrContract.methods.getNumberOfDividendTokenHolders().call();
		localStorage.setItem('H_R', info);

		//alert(info/ Math.pow(10, decimals))
		return info;
	};




	getBalanceButton = async (address) => {
		let tokenBalance = await gerUserTokenBalance(address);
		let USDT_pendings = await this.gerUserUSDT_PAID(address);
		let TotalPaidUSDT = await this.getTotalPaidUSDT();
		let USDT_pendingsM = await this.gerUserUSDT_PAIDM(address);
		let tokenBalanceM = await gerUserTokenBalanceM(address);
  

		if (tokenBalance < 10) {
			localStorage.setItem('Balance_error', -1);
		} else {
			localStorage.setItem('Balance_error', tokenBalance);
		}

		localStorage.setItem('position', USDT_pendings.position);
		localStorage.setItem('lastPAY', USDT_pendings.lastPAY);
		localStorage.setItem('Balance', tokenBalance);
		localStorage.setItem('USDT_pendings', USDT_pendings.paidUSDT);
		localStorage.setItem('USDT_pendings_exact', USDT_pendings.pendingUSDT);
		localStorage.setItem('TotalPaidUSDT', TotalPaidUSDT);
		localStorage.setItem('input', address);
		let date1 = new Date();
		localStorage.setItem('date1', date1);
	 

		localStorage.setItem('USDT_pendingsM', USDT_pendingsM.paidUSDT);

		// this.getHolders_getting_rewards() 
		// this.getTotalPaidUSDTM()
		// this.getHolders_getting_rewardsM()



		this.setState({
			SalaryBalance: tokenBalance,
			PendingUSDT: USDT_pendings.paidUSDT,
			USDTPaid: USDT_pendings.pendingUSDT,
			position: USDT_pendings.position,
			LastPayout: USDT_pendings.lastPAY,

			SalaryBalanceM: tokenBalanceM,
			PendingUSDTM: USDT_pendingsM.paidUSDT,
			USDTPaidM: USDT_pendingsM.pendingUSDT,
			positionM: USDT_pendingsM.position,
			LastPayoutM: USDT_pendingsM.lastPAY,
		})
	};
	getpricedata() {
		const query = `
        {
            ethereum(network: bsc) {
              dexTrades(
                options: {desc: ["block.height", "tradeIndex"], limit: 1, offset: 0}
                baseCurrency: {is: "0x8619c4b2ecdcb716cd162ec73f332c4d7dc06f1e"}
              ) {
                block {
                  height
                }
                tradeIndex     
                baseAmount
                tradeAmount(in: USD)
              }
            }
          }
          
        `;



		const url = "https://graphql.bitquery.io/";
		const opts = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-API-KEY": "BQYNebMBV72Av20gOE4ajX0ebCCe53xT"
			},
			body: JSON.stringify({
				query
			})
		};
		fetch(url, opts)
			.then(res => res.json())
			.then((data) => {
				var price = 0;
				data.data.ethereum.dexTrades.map((e) => {
					price = e.tradeAmount / e.baseAmount;
				}
				)
				this.setState({
					SlaryPrice: price
				});
			})
			.catch(console.error)
	}
	getpricedataM() {
		const query = `
        {
            ethereum(network: bsc) {
              dexTrades(
                options: {desc: ["block.height", "tradeIndex"], limit: 1, offset: 0}
                baseCurrency: {is: "0x15ada4ea653e6e87b7f981c943965b20b2dcf703"}
              ) {
                block {
                  height
                }
                tradeIndex     
                baseAmount
                tradeAmount(in: USD)
              }
            }
          }
          
        `;



		const url = "https://graphql.bitquery.io/";
		const opts = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-API-KEY": "BQYNebMBV72Av20gOE4ajX0ebCCe53xT"
			},
			body: JSON.stringify({
				query
			})
		};
		fetch(url, opts)
			.then(res => res.json())
			.then((data) => {
				console.log(data)
				var price = 0;
				data.data.ethereum.dexTrades.map((e) => {
					price = e.tradeAmount / e.baseAmount;
				}
				)
				this.setState({
					SlaryPriceM: price
				});
			})
			.catch(console.error)
	}
	getTransactions() {


		const query = `
		query ($network: EthereumNetwork!, $token: String!, $limit: Int!, $offset: Int!, $from: ISO8601DateTime, $till: ISO8601DateTime) {
			ethereum(network: $network) {
			  dexTrades(
				options: {desc: ["block.height", "tradeIndex"], limit: $limit, offset: $offset}
				date: {since: $from, till: $till}
				baseCurrency: {is: $token}
			  ) {
				block {
				  timestamp {
					time(format: "%Y-%m-%d %H:%M:%S")
				  }
				  height
				}
				tradeIndex
				protocol
				exchange {
				  fullName
				}
				smartContract {
				  address {
					address
					annotation
				  }
				}
				baseAmount
				baseCurrency {
				  address
				  symbol
				}
				quoteAmount
				  tradeAmount(in: USD)
				quoteCurrency {
				  address
				  symbol
				}
				transaction {
				  hash
				}
			  }
			}
		  }
		  
		`;

		const variables = {
			"limit": 10,
			"offset": 0,
			"network": "bsc",
			"token": "0x8619c4b2ecdcb716cd162ec73f332c4d7dc06f1e",

			"dateFormat": "%Y-%m-%d"
		};


		//   "from": "2022-03-28",
		//   "till": "2022-04-04T23:59:59",

		const url = "https://graphql.bitquery.io/";
		const opts = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-API-KEY": "BQYNebMBV72Av20gOE4ajX0ebCCe53xT"
			},
			body: JSON.stringify({
				query, variables
			})
		};


		fetch(url, opts)
			.then(res => res.json())
			.then((data) => {
				this.setState({
					LastTransaction: data.data.ethereum.dexTrades
				});
			})
			.catch(console.error);

	}


	getTransactionsM() {


		const query = `
		query ($network: EthereumNetwork!, $token: String!, $limit: Int!, $offset: Int!, $from: ISO8601DateTime, $till: ISO8601DateTime) {
			ethereum(network: $network) {
			  dexTrades(
				options: {desc: ["block.height", "tradeIndex"], limit: $limit, offset: $offset}
				date: {since: $from, till: $till}
				baseCurrency: {is: $token}
			  ) {
				block {
				  timestamp {
					time(format: "%Y-%m-%d %H:%M:%S")
				  }
				  height
				}
				tradeIndex
				protocol
				exchange {
				  fullName
				}
				smartContract {
				  address {
					address
					annotation
				  }
				}
				baseAmount
				baseCurrency {
				  address
				  symbol
				}
				quoteAmount
				  tradeAmount(in: USD)
				quoteCurrency {
				  address
				  symbol
				}
				transaction {
				  hash
				}
			  }
			}
		  }
		  
		`;

		const variables = {
			"limit": 10,
			"offset": 0,
			"network": "bsc",
			"token": "0x15ada4ea653e6e87b7f981c943965b20b2dcf703",

			"dateFormat": "%Y-%m-%d"
		};


		//   "from": "2022-03-28",
		//   "till": "2022-04-04T23:59:59",

		const url = "https://graphql.bitquery.io/";
		const opts = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-API-KEY": "BQYNebMBV72Av20gOE4ajX0ebCCe53xT"
			},
			body: JSON.stringify({
				query, variables
			})
		};


		fetch(url, opts)
			.then(res => res.json())
			.then((data) => {
				this.setState({
					LastTransactionM: data.data.ethereum.dexTrades
				});
			})
			.catch(console.error);

	}
	getVolume() {
		const query = `
		query ($network: EthereumNetwork!, $dateFormat: String!, $token: String!, $from: ISO8601DateTime, $till: ISO8601DateTime) {
			ethereum(network: $network) {
			  dexTrades(
				options: {asc: "date.date"}
				date: {since: $from, till: $till}
				baseCurrency: {is: $token}
			  ) {
				date: date {
				  date(format: $dateFormat)
				}
				trades: countBigInt
				amount: baseAmount
				baseCurrency {
				  symbol
				}
				contracts: countBigInt(uniq: smart_contracts)
				currencies: countBigInt(uniq: quote_currency)
			  }
			}
		  }
		  
		`;

		const variables = {

			"offset": 0,
			"network": "bsc",
			"token": "0x8619c4b2ecdcb716cd162ec73f332c4d7dc06f1e",

			"dateFormat": "%Y-%m-%d"
		};

		const url = "https://graphql.bitquery.io/";
		const opts = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-API-KEY": "BQYNebMBV72Av20gOE4ajX0ebCCe53xT"
			},
			body: JSON.stringify({
				query, variables
			})
		};


		fetch(url, opts)
			.then(res => res.json())
			.then((data) => {
				this.setState({
					DailyTradingVolume: data.data.ethereum.dexTrades[data.data.ethereum.dexTrades.length - 1].amount,
					TotalTradingVolume: data.data.ethereum.dexTrades,

				})

				setTimeout(() => {
					this.setState({

						TotalTradingVolumeTABLE: this.reverseArray(data.data.ethereum.dexTrades),
					})
				}, 1000);
				// setListChart(data.data.ethereum.dexTrades);

			})
			.catch(console.error);

	}
	getVolumeM() {
		const query = `
		query ($network: EthereumNetwork!, $dateFormat: String!, $token: String!, $from: ISO8601DateTime, $till: ISO8601DateTime) {
			ethereum(network: $network) {
			  dexTrades(
				options: {asc: "date.date"}
				date: {since: $from, till: $till}
				baseCurrency: {is: $token}
			  ) {
				date: date {
				  date(format: $dateFormat)
				}
				trades: countBigInt
				amount: baseAmount
				baseCurrency {
				  symbol
				}
				contracts: countBigInt(uniq: smart_contracts)
				currencies: countBigInt(uniq: quote_currency)
			  }
			}
		  }
		  
		`;

		const variables = {

			"offset": 0,
			"network": "bsc",
			"token": "0x15ada4ea653e6e87b7f981c943965b20b2dcf703",

			"dateFormat": "%Y-%m-%d"
		};

		const url = "https://graphql.bitquery.io/";
		const opts = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-API-KEY": "BQYNebMBV72Av20gOE4ajX0ebCCe53xT"
			},
			body: JSON.stringify({
				query, variables
			})
		};


		fetch(url, opts)
			.then(res => res.json())
			.then((data) => {


				console.log(data)

				this.setState({
					DailyTradingVolumeM: data.data.ethereum.dexTrades[data.data.ethereum.dexTrades.length - 1].amount,
					TotalTradingVolumeM: data.data.ethereum.dexTrades,

				})

				setTimeout(() => {
					this.setState({

						TotalTradingVolumeTABLEM: this.reverseArray(data.data.ethereum.dexTrades),

					});
					console.log(this.state.TotalTradingVolumeTABLEM)
				}, 1000);
				// setListChart(data.data.ethereum.dexTrades);

			})
			.catch(console.error);

	}
	componentDidMount() {
		const handler = e => this.setState({ matches: e.matches });
		window.matchMedia("(min-width: 991px)").addEventListener('change', handler);
	}

	reverseArray(arr) {
		var newArray = [];
		for (var i = arr.length - 1; i >= 0; i--) {
			newArray.push(arr[i]);
		}
		return newArray;
	}



	getTotalVolumeOld() {


		const query = `
		query ($network: EthereumNetwork!, $token: String!, $from: ISO8601DateTime, $till: ISO8601DateTime) {
			ethereum(network: $network) {
			  dexTrades(
				options: {desc: "amount"}
				date: {since: $from, till: $till}
				baseCurrency: {is: $token}
			  ) {
				exchange {
				  fullName
				}
				trades: count
				takers: count(uniq: takers)
				makers: count(uniq: makers)
				amount: baseAmount
				baseCurrency {
				  symbol
				}
			  }
			}
		  }
		  
		`;

		const variables = {
			"limit": 10,
			"offset": 0,
			"network": "bsc",
			"token": "0xC24796458fbea043780eeA59EbBA4ad40E87C29b",

			"dateFormat": "%Y-%m-%d"
		};

		const url = "https://graphql.bitquery.io/";
		const opts = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-API-KEY": "BQYNebMBV72Av20gOE4ajX0ebCCe53xT"
			},
			body: JSON.stringify({
				query, variables
			})
		};

		var t1 = 0;
		fetch(url, opts)
			.then(res => res.json())
			.then((data) => {
				this.setState({ TotalUSDTHoldersOld: data.data.ethereum.dexTrades[0].amount })
			})
			.catch(console.error);

	}
	getTotalVolume() {


		const query = `
		query ($network: EthereumNetwork!, $token: String!, $from: ISO8601DateTime, $till: ISO8601DateTime) {
			ethereum(network: $network) {
			  dexTrades(
				options: {desc: "amount"}
				date: {since: $from, till: $till}
				baseCurrency: {is: $token}
			  ) {
				exchange {
				  fullName
				}
				trades: count
				takers: count(uniq: takers)
				makers: count(uniq: makers)
				amount: baseAmount
				baseCurrency {
				  symbol
				}
			  }
			}
		  }
		  
		`;

		const variables = {

			"offset": 0,
			"network": "bsc",
			"token": "0x8619c4b2ecdcb716cd162ec73f332c4d7dc06f1e",

			"dateFormat": "%Y-%m-%d"
		};

		const url = "https://graphql.bitquery.io/";
		const opts = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-API-KEY": "BQYNebMBV72Av20gOE4ajX0ebCCe53xT"
			},
			body: JSON.stringify({
				query, variables
			})
		};

		var t1 = 0;
		fetch(url, opts)
			.then(res => res.json())
			.then((data) => {
				this.setState({ TotalUSDTHoldersNew: data.data.ethereum.dexTrades[0].amount })

			})
			.catch(console.error);

	}
	getTotalVolumeM() {


		const query = `
		query ($network: EthereumNetwork!, $token: String!, $from: ISO8601DateTime, $till: ISO8601DateTime) {
			ethereum(network: $network) {
			  dexTrades(
				options: {desc: "amount"}
				date: {since: $from, till: $till}
				baseCurrency: {is: $token}
			  ) {
				exchange {
				  fullName
				}
				trades: count
				takers: count(uniq: takers)
				makers: count(uniq: makers)
				amount: baseAmount
				baseCurrency {
				  symbol
				}
			  }
			}
		  }
		  
		`;

		const variables = {

			"offset": 0,
			"network": "bsc",
			"token": "0x15ada4ea653e6e87b7f981c943965b20b2dcf703",

			"dateFormat": "%Y-%m-%d"
		};

		const url = "https://graphql.bitquery.io/";
		const opts = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-API-KEY": "BQYNebMBV72Av20gOE4ajX0ebCCe53xT"
			},
			body: JSON.stringify({
				query, variables
			})
		};

		var t1 = 0;
		fetch(url, opts)
			.then(res => res.json())
			.then((data) => {
				console.log(data)
				this.setState({ TotalUSDTHoldersNewM: data.data.ethereum.dexTrades[0].amount })

			})
			.catch(console.error);

	}






	getBalance_Liquidity_SLR(){
        const query = `
        query ($network: EthereumNetwork!, $address: String!) {
			ethereum(network: $network) {
			  address(address: {is: $address}) {
				balances {
				  value
				  currency {
					address
					symbol
					tokenType
				  }
				}
			  }
			}
		  }
        `;
        
        const variables = {
			 
			"offset": 0,
			"network": "bsc",
			"address": "0xb45962cb111b10183ecc5aaeee346d82cb130cef"
		  };
        
        const url = "https://graphql.bitquery.io/";
        const opts = {
             method: "POST",
             headers: {
                "Content-Type": "application/json",
                "X-API-KEY": "BQYNebMBV72Av20gOE4ajX0ebCCe53xT"
            },
            body: JSON.stringify({
                query , variables
            })
        };
        fetch(url, opts)
        .then(res => res.json())
        .then((data) => {

			// [
				 
			// 	{
			// 		"value": 46.047586505940366,
			// 		"currency": {
			// 			"address": "-",
			// 			"symbol": "BNB",
			// 			"tokenType": ""
			// 		}
			// 	}
			// ]


		

			console.log(data.data.ethereum.address[0])
			var price=0;
			var priceM=0;
            data.data.ethereum.address[0].balances.map((e) => {      
				
				if(e.currency.address == "0x8619c4b2ecdcb716cd162ec73f332c4d7dc06f1e"){
					price=  e.value ;
					console.log("SELECTED")
					console.log(e)
					console.log(price);
				}
				// if(e.currency.address == "0x15ada4ea653e6e87b7f981c943965b20b2dcf703"){
				// 	// priceM=e.value;
				// 	priceM=  e.value ;
				// 	console.log("SELECTED")
				// 	console.log(e)
				// 	console.log(priceM);
				// }
				 
				 
					this.setState({
						SalaryBalanceOnLiquidity : price.toFixed(2),
						// SalaryBalanceOnPinkLock: price.toFixed(2),
						// SalaryMiningBalanceOnPinkLock: priceM.toFixed(2),
					  }); 
				 
             }
             )
			
            
        })
        .catch(console.error)
    }

	getBalance_Liquidity_SLRM(){
        const query = `
        query ($network: EthereumNetwork!, $address: String!) {
			ethereum(network: $network) {
			  address(address: {is: $address}) {
				balances {
				  value
				  currency {
					address
					symbol
					tokenType
				  }
				}
			  }
			}
		  }
        `;
        
        const variables = {
			 
			"offset": 0,
			"network": "bsc",
			"address": "0x0cacf36ebc7d8bd9d4d608a353ebfd7d4b52776d"
		  };
        
        const url = "https://graphql.bitquery.io/";
        const opts = {
             method: "POST",
             headers: {
                "Content-Type": "application/json",
                "X-API-KEY": "BQYNebMBV72Av20gOE4ajX0ebCCe53xT"
            },
            body: JSON.stringify({
                query , variables
            })
        };
        fetch(url, opts)
        .then(res => res.json())
        .then((data) => {

			 
			var price=0;
			 
            data.data.ethereum.address[0].balances.map((e) => {      
				
				if(e.currency.address == "0x15ada4ea653e6e87b7f981c943965b20b2dcf703"){
					price=  e.value ;
					console.log("SELECTED")
					console.log(e)
					console.log(price);
				}
				 
				 
				 
					this.setState({
						SalaryMiningBalanceOnLiquidity : price.toFixed(2),
						 
					  }); 
				 
             }
             )
			
            
        })
        .catch(console.error)
    }



	getBalance_PinkLock_SLR(){
        const query = `
		{
			ethereum(network: bsc) {
			  address(address: {is: "0x7ee058420e5937496f5a2096f04caa7721cf70cc"}) {
				balances(currency: {is: "0x8619c4b2ecdcb716cd162ec73f332c4d7dc06f1e"}) {
				  value
				}
			  }
			}
		  }
		  
        `;
        
       
        
        const url = "https://graphql.bitquery.io/";
        const opts = {
             method: "POST",
             headers: {
                "Content-Type": "application/json",
                "X-API-KEY": "BQYNebMBV72Av20gOE4ajX0ebCCe53xT"
            },
            body: JSON.stringify({
                query 
            })
        };
        fetch(url, opts)
        .then(res => res.json())
        .then((data) => {  
			 
			 
				this.setState({
					SalaryBalanceOnPinkLock: data.data.ethereum.address[0].balances[0].value.toFixed(2),
					 
				  }); 
			 
			
            
        })
        .catch(console.error)
    }

	
	getBalance_PinkLock_SLRM(){
        const query = `
		{
			ethereum(network: bsc) {
			  address(address: {is: "0x7ee058420e5937496f5a2096f04caa7721cf70cc"}) {
				balances(currency: {is: "0x15ada4ea653e6e87b7f981c943965b20b2dcf703"}) {
				  value
				}
			  }
			}
		  }
		  
        `;
         
        const url = "https://graphql.bitquery.io/";
        const opts = {
             method: "POST",
             headers: {
                "Content-Type": "application/json",
                "X-API-KEY": "BQYNebMBV72Av20gOE4ajX0ebCCe53xT"
            },
            body: JSON.stringify({
                query 
            })
        };
        fetch(url, opts)
        .then(res => res.json())
        .then((data) => {  
			 
			 
				this.setState({
					SalaryMiningBalanceOnPinkLock: data.data.ethereum.address[0].balances[0].value.toFixed(2),
					 
				  }); 
			 
			
            
        })
        .catch(console.error)
    }































	checkAdress = null;
	CheckAdress = (event) => {
		if (event.target.value.length == 42 && event.target.value[0] == 0 && event.target.value[1] == 'x')
			this.checkAdress = true;
		else this.checkAdress = false;
		this.setState({
			address: event.target.value
		})

	}
	getParamFromAdress = async () => {
		console.log(this.state.address);
		if (this.checkAdress) {
		//	localStorage.clear();
			this.getBalanceButton(this.state.address);
			NotificationManager.success("Success");

		}
		else {
			NotificationManager.error('Address not correct', 'Erreur!', 2000);

		}
	}







	render() {
		dataService.getData().subscribe(message => {
			console.log(message);
			this.setState({
				SalaryBalance: message.balance,
				PendingUSDT: message.usdtPending,
				LastPayout: message.LastPaid,
				USDTPaid: message.usdtPaid,
				position: message.position,
				SalaryBalanceM:message.balanceSlm,
		 		PendingUSDTM: message.usdtPendingSlm,
		 		LastPayoutM: message.lastPaidM,
				USDTPaidM:message.usdPaidM,
		     	positionM: message.positionM
			})
		});
		// dataService_SLRM.getData().subscribe(m => {
		// 	console.log("here1");
            
		// 	this.setState({
		// 		SalaryBalanceM: "100000",
		// 		PendingUSDTM: "1000000",
		// 		LastPayoutM: "m.LastPaid",
		// 		USDTPaidM:m.usdtPaid,
		// 		positionM: m.position
		// 	})
		// 	console.log(m);
		// });

		var Labels = [];
		var LabelsM = [];
		var Data = [];
		this.state.TotalTradingVolume.map((item, index) => {
			Labels.push(item.date.date.substring(5));
			Data.push(item.amount * this.state.SlaryPrice)
		});

		var DataM = [];
		this.state.TotalTradingVolumeM.map((item, index) => {
			LabelsM.push(item.date.date.substring(5));
			DataM.push(item.amount * this.state.SlaryPriceM)
		});

		var data = {
			labels: Labels,
			scaleFontColor: 'red',

			datasets: [
				{



					data: Data,
					fill: true,
					backgroundColor: "rgba(75,192,192,0.2)",
					borderColor: "#ffffffaa",
				},

			]




		};

		var dataM = {
			labels: LabelsM,
			scaleFontColor: 'red',

			datasets: [
				{

					data: DataM,
					fill: true,
					backgroundColor: "rgba(75,192,192,0.2)",
					borderColor: "#ffffffaa",
				},

			]
		};
		var gainConfig = {
			plugins: {
				legend: {
					display: false,
					labels: {
						color: 'white'
					}
				}
			},
			responsive: true,
			maintainAspectRatio: true,
			animations: {
				tension: {
					duration: 2500,
					easing: 'easeInQuad',
					from: 1,
					to: 0,
					loop: false
				}
			},
			scales: {
				x: {
					ticks: {
						color: 'white'
					}
				},
				y: {
					ticks: {
						color: 'white'
					}
				}
			},

		}





		return (

			<div>
				<div class="clearfix"></div>
				<div class="content-wrapper">
					<div class="container-fluid">
						<div class="col-12 col-lg-12 col-xl-12">
							<div class="input-group">
								<div class="input-group-prepend">
									<span class="input-group-text"><i class="fa fa-edit"></i></span>
								</div>
								{/*
					<button value="Gem" onClick={addItemToCart}>Gem</button>
					*/} <input type="text" class="form-control"
									placeholder="Enter address here (0x00....)" onChange={this.CheckAdress} />
								<button onClick={this.getParamFromAdress} class="btn btn-primary"><i class="fa fa-check"></i> Submit</button>


							</div>
						</div>
						<div class="card mt-3">

							{
								(Number(localStorage.getItem("Balance_error")) == -1)
									? <div class="alert-danger fade show p-1">
										<div class="text-center">You need to hold at  least 10 SLR to receive rewards.</div>
									</div>
									: <div></div>
							}


							<div class="card-content">
								<div class="row row-group m-0">
									<div class="col-12 col-lg-4 col-xl-4">
										<div class="card bubble">
											<div class="card-body card-block">
												<div class="media align-items-center">
													<div class="media-body">
														<p class="mb-0 text-white">Salary balance</p>
														<h4 class="mb-0 text-white">{new Intl.NumberFormat('en-US').format((Number(this.state.SalaryBalance)).toFixed(3))} SLR</h4>
														<p class="hint">$
															{(Number(this.state.SalaryBalance) * Number(this.state.SlaryPrice)).toFixed(3)}</p>

														<p class="extra-small-font mt-3 mb-0 text-white">Your SLR
															Holdings</p>
														<br />
													</div>
													<div class="position-relative">
														<img src="assets/images/salary.png" width="80" />
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="col-12 col-lg-4 col-xl-4">
										<div class="card bubble">
											<div class="card-body card-block">
												<div class="media align-items-center">
													<div class="media-body">
														<p class="mb-0 text-white">USDT Paid</p>
														<h4 class="mb-0 text-white">{/* {paidUSDT_ ?
									paidUSDT_.toFixed( 2 ) : Number(_USDT_pendings_exact).toFixed(
									2 )} */} {Number(this.state.USDTPaid).toFixed(3)} USDT</h4>



														<p class="hint">Last Payout :

															{
																(this.state.LastPayout === "01/01/1970, 10:00:00" || this.state.LastPayout === "01/01/1970, 00:00:00")
																	? "0"
																	: this.state.LastPayout
															}
														</p>

														<p class="extra-small-font mt-3 mb-0 text-white">Your USDT
															Paid   <b> 	{
																(Number(localStorage.getItem("Balance_error")) > 0 && Number(this.state.USDTPaid) === 0)
																	? " Waiting for next dividend"
																	: ""
															}</b></p>
														<br />
													</div>
													<div class="position-relative">
														<img src="assets/images/teather.png" width="80" />
													</div>

												</div>
											</div>
										</div>
									</div>


									<div class="col-12 col-lg-4 col-xl-4">
										<div class="card bubble">
											<div class="card-body card-block">
												<div class="media align-items-center">
													<div class="media-body">
														<p class="mb-0 text-white">Pending </p>
														<h4 class="mb-0 text-white">
															{Number(this.state.PendingUSDT).toFixed(3)} USDT</h4>
														<p class="hint">
															Queue Position <i data-tip data-for="addTip4" class="fa fa-info-circle"></i> : {this.state.position} {/* <i placement="right"
										class="fa fa-exclamation-circle"></i> */}
														</p>
														<ReactTooltip id="addTip4" place="top" effect="solid">
															means the order of a valid interconnection request,<br></br> relative to all other pending valid interconnection requests
														</ReactTooltip>
														<p class="extra-small-font mt-3 mb-0 text-white">Your
															Pending USDT <b> 	{
																(Number(localStorage.getItem("Balance_error")) > 0 && Number(localStorage.getItem("USDT_pendings")) == 0)
																	? " Waiting for next dividend"
																	: ""
															}</b></p>
														<br />
													</div>
													<div class="position-relative">
														<img src="assets/images/teather.png" width="80" />
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

							</div>

							<div class="card-content">
								<div class="row row-group m-0">
									<div class="col-12 col-lg-4 col-xl-4">
										<div class="card bubble">
											<div class="card-body card-block">
												<div class="media align-items-center">
													<div class="media-body">
														<p class="mb-0 text-white">Salary Mining balance</p>
														<h4 class="mb-0 text-white">{new Intl.NumberFormat('en-US').format((Number(this.state.SalaryBalanceM)).toFixed(3))}  SLRM</h4>
														<p class="hint">$
															{(Number(this.state.SalaryBalanceM) * Number(this.state.SlaryPriceM)).toFixed(3)}</p>

														<p class="extra-small-font mt-3 mb-0 text-white">Your SLRM
															Holdings</p>
														<br />
													</div>
													<div class="position-relative">
														<img src="assets/images/salaryM.png" width="80" />
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="col-12 col-lg-4 col-xl-4">
										<div class="card bubble">
											<div class="card-body card-block">
												<div class="media align-items-center">
													<div class="media-body">
														<p class="mb-0 text-white">SLR Paid</p>
														<h4 class="mb-0 text-white">{/* {paidUSDT_ ?
									paidUSDT_.toFixed( 2 ) : Number(_USDT_pendings_exact).toFixed(
									2 )} */} {Number(this.state.USDTPaidM).toFixed(3)} SLR</h4>



														<p class="hint">Last Payout :

															{
																(this.state.LastPayoutM === "01/01/1970, 10:00:00" || this.state.LastPayoutM === "01/01/1970, 00:00:00")
																	? "0"
																	: this.state.LastPayoutM
															}
														</p>

														<p class="extra-small-font mt-3 mb-0 text-white">Your SLR
															Paid   <b> 	{
																(Number(localStorage.getItem("Balance_error")) > 0 && Number(this.state.USDTPaidM) === 0)
																	? " Waiting for next dividend"
																	: ""
															}</b></p>
														<br />
													</div>
													<div class="position-relative">
														<img src="assets/images/salary.png" width="80" />
													</div>

												</div>
											</div>
										</div>
									</div>


									<div class="col-12 col-lg-4 col-xl-4">
										<div class="card bubble">
											<div class="card-body card-block">
												<div class="media align-items-center">
													<div class="media-body">
														<p class="mb-0 text-white">Pending </p>
														<h4 class="mb-0 text-white">
															{Number(this.state.PendingUSDTM).toFixed(3)} SLR</h4>
														<p class="hint">
															Queue Position <i data-tip data-for="addTip4" class="fa fa-info-circle"></i> : {this.state.positionM} {/* <i placement="right"
										class="fa fa-exclamation-circle"></i> */}
														</p>
														<ReactTooltip id="addTip4" place="top" effect="solid">
															means the order of a valid interconnection request,<br></br> relative to all other pending valid interconnection requests
														</ReactTooltip>
														<p class="extra-small-font mt-3 mb-0 text-white">Your
															Pending SLR <b> 	{
																(Number(localStorage.getItem("Balance_error")) > 0 && Number(localStorage.getItem("USDT_pendingsM")) == 0)
																	? " Waiting for next dividend"
																	: ""
															}</b></p>
														<br />
													</div>
													<div class="position-relative">
														<img src="assets/images/salary.png" width="80" />
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

							</div>


							<div class="card-content">
								<div class="row row-group m-0">
									<div class="float-left col-12 col-lg-6 col-xl-6 border-light">
										 
										<div class="card-body">
											<div class="row m-0 row-group ">
												<div class="col-7">
													<h6 class="text-white mb-0 text-center">
														Total $SLR Paid To all Salary Mining Holders<span class="float-right"> </span>
													</h6>
													<div class="my-3">
														<p></p>
														<div class="progress my-3">
															<div class="progress-bar"></div>
														</div>
													</div>
													<h4 class="mb-0 text-white text-center">{/* {TotalPaidUSDT_ ?
				TotalPaidUSDT_.toFixed( 2 ) : Number(_TotalPaidUSDT).toFixed( 2 )}
				*/}
				
				{new Intl.NumberFormat('en-US').format((Number(localStorage.getItem("TotalPaidUSDT")) + 618887.14).toFixed(3))}
				
				 USDT</h4>
												</div>
												<div class="col-5">
												<h6 class="text-white mb-0 text-center">
												Currently Holders Getting Rewards<span class="float-right"> </span>
													</h6>
													<div class="my-3">
														<p></p>
														<div class="progress my-3">
															<div class="progress-bar"></div>
														</div>
													</div>
													<h4 class="mb-0 text-white text-center"> {localStorage.getItem("H_R")}</h4>
												</div>
											</div>
										</div>
									</div>

									<div class="  col-12 col-lg-6 col-xl-6 border-light">
										<div class="card-body">
											<div class="row m-0 row-group ">
												<div class="col-7">
													<h6 class="text-white mb-0 text-center">
														Total $SLR Paid To all Salary Mining Holders<span class="float-right"> </span>
													</h6>
													<div class="my-3">
														<p></p>
														<div class="progress my-3">
															<div class="progress-bar"></div>
														</div>
													</div>
													<h4 class="mb-0 text-white text-center">{/* {TotalPaidUSDT_ ?
				TotalPaidUSDT_.toFixed( 2 ) : Number(_TotalPaidUSDT).toFixed( 2 )}
				*/}
				{new Intl.NumberFormat('en-US').format((Number(localStorage.getItem("TotalPaidUSDT_M"))).toFixed(3))} SLR</h4>
												</div>
												<div class="col-5">
												<h6 class="text-white mb-0 text-center">
												Currently Holders Getting Rewards<span class="float-right"> </span>
													</h6>
													<div class="my-3">
														<p></p>
														<div class="progress my-3">
															<div class="progress-bar"></div>
														</div>
													</div>
													<h4 class="mb-0 text-white text-center"> {localStorage.getItem("H_R_M")}</h4>
												</div>
											</div>
										</div>
									</div>
								</div>

							</div>





						</div>
						<div class="row">
							<div class="col-12 col-lg-6 col-xl-6">

								<div class="col-12 col-lg-12">
									<div class="card">
										<div class="card-body">
											<p class="text-left">$SLR Daily trading volume 24h <i data-tip data-for="addTip3" class="fa fa-info-circle"></i></p>
											<ReactTooltip id="addTip3" place="top" effect="solid">
												Start cumulation from 00:00 UTC
											</ReactTooltip>
											<h4 class="mb-0 text-left">$ {new Intl.NumberFormat('en-US').format(Number(this.state.DailyTradingVolume * this.state.SlaryPrice).toFixed(3))}  <small class="small-font">
											</small></h4>
										</div>
										<div class="wrapper" >
											{this.state.matches && (<Line height={80} data={data} options={gainConfig} responsive={true} />)}
											{!this.state.matches && <Line height={200} data={data} options={gainConfig} responsive={true} />}



										</div>




									</div>

								</div>
								<div class="card">
									<div class="row m-0 row-group text-center border-top border-light-3">

										<div class="col-12 col-lg-6">
											<div class="p-3">
												<h5 class="mb-0">$ {new Intl.NumberFormat('en-US').format(Number(this.state.DailyTradingVolume * this.state.SlaryPrice).toFixed(3))}   </h5>
												<small class="mb-0">$SLR Trading volume, 24h

												</small>

											</div>
										</div>
										<div class="col-12 col-lg-6">
											<div class="p-3">
												<h5 class="mb-0">$ {Number(this.state.SlaryPrice).toFixed(3)} </h5>
												<small class="mb-0">$SLR Current price <span>

												</span></small>
											</div>
										</div>

									</div>
								</div>




								<div class="card">
									<div class="row m-0 row-group text-center border-top border-light-3">

										<div class="col-3 col-lg-3">
											<div class="p-3">
												<h6 class="mb-0">1,000,000.00<br></br> SLR  </h6>
												<small class="mb-0">Total Supply <span>

												</span></small>
											</div>
										</div>
										<div class="col-3 col-lg-3">
											<div class="p-3">
												<h6 class="mb-0"> {new Intl.NumberFormat('en-US').format(1000000 -(Number(  this.state.SalaryBalanceOnPinkLock) +Number(this.state.SalaryBalanceOnLiquidity)))}  <br></br>SLR  </h6>
												<small class="mb-0">Circulation Supply <span>

												</span></small>
											</div>
										</div>
										<div class="col-3 col-lg-3">
											<div class="p-3">
												<h6 class="mb-0"> {new Intl.NumberFormat('en-US').format(Number(this.state.SalaryBalanceOnPinkLock) +Number(this.state.SalaryBalanceOnLiquidity))}   <br></br>SLR </h6>
												<small class="mb-0">Locked <span>

												</span></small>
											</div>
										</div>
										<div class="col-3 col-lg-3">
											<div class="p-3">
												<h5 class="mb-0">  0<br></br></h5>
												<small class="mb-0">Burned <span>

												</span></small>
											</div>
										</div>



									</div>
								</div>













							</div>
							<div class="col-12 col-lg-6 col-xl-6">

								<div class="col-12 col-lg-12">
									<div class="card">
										<div class="card-body">
											<p class="text-left">$SLRM Daily trading volume 24h <i data-tip data-for="addTip3" class="fa fa-info-circle"></i></p>

											<h4 class="mb-0 text-left">$ { new Intl.NumberFormat('en-US').format( Number(this.state.DailyTradingVolumeM * this.state.SlaryPriceM).toFixed(3))                 }  <small class="small-font">
											</small></h4>
										</div>
										<div class="wrapper" >
											{this.state.matches && (<Line height={80} data={dataM} options={gainConfig} responsive={true} />)}
											{!this.state.matches && <Line height={200} data={dataM} options={gainConfig} responsive={true} />}



										</div>




									</div>

								</div>
								<div class="card">
									<div class="row m-0 row-group text-center border-top border-light-3">

										<div class="col-12 col-lg-6">
											<div class="p-3">

												<h5 class="mb-0">$ {new Intl.NumberFormat('en-US').format(Number(this.state.DailyTradingVolumeM * this.state.SlaryPriceM).toFixed(3))}   </h5>
												<small class="mb-0">$SLRM Trading volume, 24h

												</small>

											</div>
										</div>
										<div class="col-12 col-lg-6">
											<div class="p-3">
												<h5 class="mb-0">$ {Number(this.state.SlaryPriceM).toFixed(6)} </h5>
												<small class="mb-0">$SLRM Current price <span>

												</span></small>
											</div>
										</div>
									</div>
								</div>
								<div class="card">
									<div class="row m-0 row-group text-center border-top border-light-3">

										<div class="col-3 col-lg-3">
											<div class="p-3">
												<h6 class="mb-0">100,000,000.00 <br></br>SLRM  </h6>
												<small class="mb-0">Total Supply <span>

												</span></small>
											</div>
										</div>
										<div class="col-3 col-lg-3">
											<div class="p-3">
												<h6 class="mb-0">{new Intl.NumberFormat('en-US').format( 90000000 - (Number(this.state.SalaryMiningBalanceOnPinkLock) + Number(this.state.SalaryMiningBalanceOnLiquidity)))} <br></br>SLRM  </h6>
												<small class="mb-0">Circulation Supply <span>

												</span></small>
											</div>
										</div>
										<div class="col-3 col-lg-3">
											<div class="p-3">
												<h6 class="mb-0"> {new Intl.NumberFormat('en-US').format(Number(this.state.SalaryMiningBalanceOnPinkLock) + Number(this.state.SalaryMiningBalanceOnLiquidity))} <br></br>SLRM </h6>
												<small class="mb-0">Locked <span>

												</span></small>
											</div>
										</div>
										<div class="col-3 col-lg-3">
											<div class="p-3">
												<h6 class="mb-0">  10,000,000.00 <br></br> SLRM</h6>
												<small class="mb-0">Burned <span>

												</span></small>
											</div>
										</div>



									</div>
								</div>
							</div>

							<div class="col-12 col-lg-12 col-xl-12">
								<div class="card">
									<div class="card-body text-center">

										<div class="icon-box bg-light  mx-auto imp"> <i class="fa fa-exclamation-triangle"></i>
										</div><br></br><h5 class="text-uppercase text-white">Important</h5>
										<p class="my-5 text-white">Rewards are automatically sent every 60 minutes. It can, however, take longer depending on your holdings and trading volume. Rewards will be triggered once they are big enough to cover the gas fees. If you are a smaller holder it may take from a couple hours to a few days for rewards to appear in your wallet.</p>
										{/* style="font-size:15px;margin-bottom: 1em !important;margin-top: 1em !important;" */}
									</div>
								</div>
							</div>




						</div>
						<div class="row">
							<div class="col-12 col-lg-6 col-xl-6">
								<div class="card">

									<div class="card-body text-center">
										<div class="row row-group m-0">
											<div class="col-6">
												<h5 class="text-uppercase text-white"> $SLR <br></br>TOTAL TRADING VOLUME  <br></br>$ {new Intl.NumberFormat('en-US').format((6825941.53 + (Number(this.state.TotalUSDTHoldersNew) * this.state.SlaryPrice)).toFixed(3))}   </h5>
											</div>
											<div class="col-6">
												<h5 class="text-uppercase text-white"> $SLRM <br></br> TOTAL TRADING VOLUME <br></br> $ {new Intl.NumberFormat('en-US').format(((Number(this.state.TotalUSDTHoldersNewM) * this.state.SlaryPriceM)).toFixed(3))}    </h5>
											</div></div>

										{/* <NumberFormat value={2456981} displayType={'text'} thousandSeparator={true} prefix={'$'} /> */}
									</div>

									<div class="table-responsive">
										<table class="table table-hover align-items-center">
											<thead>
												<tr>
													<th>Date</th>
													<th>$SLR Volume</th>
													<th>$SLRM Volume</th>
													{/* <th>Open</th>
                    <th>Close</th> */}
												</tr>
											</thead>
											<tbody  >


												{this.state.TotalTradingVolume.length != 0 ? this.state.TotalTradingVolumeTABLE.map((item, index) => (
													<tr>{index <= 21 ? <td>{item.date.date}</td> : ""}
														{index <= 21 ? <td>{Number(item.amount * this.state.SlaryPrice).toFixed(2)}</td> : ""}
														{(index <= 21) ?




															(this.state.TotalTradingVolumeTABLEM[index] != null) ? <td>{(Number(this.state.TotalTradingVolumeTABLEM[index].amount) * Number(this.state.SlaryPriceM)).toFixed(2)}</td> : <td></td>



															: ''}



														{/* <td></td>
                                <td></td> */}
													</tr>
												)) : <div style={{ margin: '10px 210%' }} class="spinner-grow text-info" role="status">
													<span class="sr-only">Loading...</span>
												</div>}
												{/* <td   ></td>   */}
												{/* <td   ></td>  */}
											</tbody>
										</table>
									</div>
								</div>
							</div>
							<div class="col-12 col-lg-6 col-xl-6">
								<div class="card">

									<div class="card-body text-center">
										<h5 class="text-uppercase text-white">$SLR Last Transactions</h5>
									</div>

									<div class="table-responsive">
										<table class="table table-hover align-items-center">
											<thead>
												<tr>
													<th>Timestamp</th>
													{/* <th>Block</th> */}
													<th>SLR</th>
													<th>BNB	</th>
													<th>USD	</th>
													<th>Hash	</th>
												</tr>
											</thead>
											<tbody  >

												{this.state.LastTransaction.length != 0 ? this.state.LastTransaction.map((item, index) => (
													<tr key={index}>
														<td>{item.block.timestamp.time}</td>
														{/* <td>{item.block.height}</td>    */}
														<td>{item.baseAmount.toFixed(2)} SLR</td>
														<td>{item.quoteAmount.toFixed(4)} BNB</td>
														<td>${item.tradeAmount.toFixed(2)} </td>
														<td><a href={"https://bscscan.com/tx/" + item.transaction.hash} target="_blank">{item.transaction.hash.substring(0, 6)}... </a></td>
													</tr>
												)) : <div style={{ margin: '10px 140%' }} class="spinner-grow text-info" role="status">
													<span class="sr-only">Loading...</span>
												</div>}
												{/* <td   ></td>   */}
												{/* <td   ></td>  */}
											</tbody>
										</table>
									</div>
								</div>
								<div class="card">

									<div class="card-body text-center">
										<h5 class="text-uppercase text-white">$SLRM Last Transactions</h5>
									</div>

									<div class="table-responsive">
										<table class="table table-hover align-items-center">
											<thead>
												<tr>
													<th>Timestamp</th>
													{/* <th>Block</th> */}
													<th>SLRM</th>
													<th>BNB	</th>
													<th>USD	</th>
													<th>Hash	</th>
												</tr>
											</thead>
											<tbody  >

												{this.state.LastTransactionM.length != 0 ? this.state.LastTransactionM.map((item, index) => (
													<tr key={index}>
														<td>{item.block.timestamp.time}</td>
														{/* <td>{item.block.height}</td>    */}
														<td>{item.baseAmount.toFixed(2)} SLRM</td>
														<td>{item.quoteAmount.toFixed(4)} BNB</td>
														<td>${item.tradeAmount.toFixed(2)} </td>
														<td><a href={"https://bscscan.com/tx/" + item.transaction.hash} target="_blank">{item.transaction.hash.substring(0, 6)}... </a></td>
													</tr>
												)) : <div style={{ margin: '10px 140%' }} class="spinner-grow text-info" role="status">
													<span class="sr-only">Loading...</span>
												</div>}
												{/* <td   ></td>   */}
												{/* <td   ></td>  */}
											</tbody>
										</table>
									</div>
								</div>
							</div>


						</div>
						<div class="overlay toggle-menu"></div>
					</div>
				</div>
				<a href="javaScript:void();" class="back-to-top"><i
					class="fa fa-angle-double-up"></i> </a>

			</div>
		)
	}


}
