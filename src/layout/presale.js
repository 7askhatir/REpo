 



import React, { Component } from 'react'  
import { getContract, slrContract, contractAddress, gerUserTokenBalance, address } from '../Helpers/contract';
import { NotificationManager } from 'react-notifications';
import {dataService} from '../Helpers/storageService';
import {Line} from 'react-chartjs-2';




export class Presale extends Component{
	 

 
    constructor(props) {
	 
        super(props);
		 
		this.getpricedata();
		 
        this.state = {
           SalaryBalance: "Loading ..",
          percent : "0"
        }


    }   
	 
     getpricedata(){
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
			"limit": 10,
			"offset": 0,
			"network": "bsc",
			"address": "0xa1B5dfeDe9C378CD179E7487ecC7a0097ad7f6b0"
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
            data.data.ethereum.address[0].balances.map((e) => {      
				
				if(e.currency.symbol == "BNB"){
					price=e.value;
					console.log("SELECTED")
					console.log(price)
				}
				// console.log(price)
				// console.log(e.currency.symbol)
				
             }
             )
             this.setState({
				SalaryBalance: price.toFixed(4),
				percent : (price*100/150)
			  });
        })
        .catch(console.error)
    }
  


	
    

    render() {
		    
 
        return(
			<div>
                


			<div class="clearfix"></div>
		<div class="content-wrapper">
			<div class="container-fluid">
	 
	
	
		 
		 
			<div class="col-12 col-lg-12 col-xl-12">
				<div class="card bubble">
					<div class="card-body card-block">
						<div class="media align-items-center">
							<div class="media-body text-center">
							   
			 


          






        

							<div class="card">
				<div class="card-header text-uppercase text-center"> <h3>‼️💥SALARY MINING PRESALE💥‼️</h3>  </div>
				<div class="card-content">
					<div class="row row-group m-0">
						<div class="col-12 col-md-12 col-lg-12 col-xl-12">
							<div class="card-body text-center px-0">


 
 
							<img src="assets/images/SLRM_120X120.png"  />

								


								{/* <input step="1" class="form-control"  type="number" rang min="0" placeholder="100"  /> <h6></h6> */}
								<p class="mb-0 "><h4>SALARY MINING</h4> is the second token to be released from <b>Salary Eco Finance</b>.<br></br><br></br>
								
								 <b class="bigg">$SLRM</b> is the first reflections-based token designed to establish and grow a physical crypto mining farm/network.<br></br>
								 
								  Revenue earned from mining is distributed to Holders regularly via Salary Eco Finance’s native token,<b class="bigg">SALARY ($SLR)</b> .<br></br><br></br>
	
								  <b class="bigg">$SLRM</b> is uniquely positioned by offering Holders access to lucrative mining opportunities – without the hassle of owning any equipment.<br></br>
								   
									Simply hold $SLRM and reap the benefits! DOXXED TEAM & KYC by Pinksale<br></br><br></br>
	
	{/* <b>🚨COMPETE FOR YOUR SHARE OF 15 BNB’S🚨😱</b> */}
	
	</p>
<a href="https://www.pinksale.finance/#/launchpad/0xa1B5dfeDe9C378CD179E7487ecC7a0097ad7f6b0?chain=BSC" target="_blank" class="btn btn-primary" >Join Presale</a>
	
	<br></br>
	<br></br>
	<br></br>

	<h4>🚨 IMPORTANT ANNOUNCEMENT 🚨</h4>
	<h4>📣SLRM PRESALE📣</h4>

<p> 

After not filling our previous Presale of 350/700 BNB, Salary Mining is pleased to re-list our Presale, now with a 75 BNB/150 BNB hard cap.

We are confident this Presale will fill very quickly.<br></br>

After being filled, 90% of the proceeds will be directly loaded into Pancakeswap for liquidity, with 10% reserved for Marketing costs.<br></br>


With such a low market cap, you can expect a very quick fill of the SC/HC!<br></br>


For more details on our Project, which is the first token tied to a Physical Mining Farm, please visit our website and Telegram!<br></br>

</p><br></br>
<h5>🚨SALARY MINING TOKEN ($SLRM) 🚨</h5>

<p>

$SLRM is the FIRST Rewards token tied to an actual, physical crypto mining farm in the real world.  Buy/Sell taxes are used to buy mining equipment and subsequently grow the farm. ⛏👨‍🌾<br></br>

‼️NOTE‼️ - The SLRM MINING FARM IS ALREADY DEPLOYED AND MINING IN PARTS OF GERMANY AND TURKEY.  $SLRM is launching as a WORKING PRODUCT💥💥💥<br></br>

💰Profits from the mining farm are distributed to $SLRM holders as $SLR (Native token of Salary Eco Finance, which ALSO pays 8% Rewards to Holders in $USDT🤯 )</p>

{/* <b class="bigg">LFG</b> */}
	{/* <h4>🚨 Salary Mining Whitelist Competition 🚨</h4>
 
<p>Only 30 wallets have the chance to win a Whitelist spot. <br></br>

Follow the gleam rules to participate.  
</p> */}
{/* <h5><a style={{color:'#bbc3ff'}} href="https://gleam.io/49Y9C/salary-mining" target="_blank">👉 SALARY MINING WHITELIST COMPETITON 👈</a></h5> */}

	<br></br>
	<br></br>
	<br></br>

	{/* <h3 id="demo"></h3> */}

	<h4 >Congrats for all our Diamond Hand. Presale is filled. </h4> <h5 >We will launch after 24h. Stay tuned and keep the hype for launch 👏👏👏 </h5>
<div class="progress-outer progress-outer2">
<div class="progress">
<div class="progress-bar progress-bar2 progress-bar-info progress-bar-striped active" style={{width:"100%" }}  ></div>
<div class="progress-value">{Number(this.state.percent).toFixed(0)  }%</div>
</div>
</div>
<h5>{this.state.SalaryBalance} BNB</h5><br></br>
							</div>
						</div>
	
	
	
	
	
	{/* 
	
						Presale Address	0x7751c0Fc80e4f79141DC0dA65cE296C6EB408eed
	Token Name	SalaryMining
	Token Symbol	SLRM
	Token Decimals	18
	Token Address	0x600B335D037E69B4d723e369F58167B6C4622727
	(Do not send BNB to the token address!)
	
	Total Supply	100,000,000 SLRM
	Tokens For Presale	21,000,000 SLRM
	Tokens For Liquidity	12,180,000 SLRM
	Presale Rate	1 BNB = 30,000 SLRM
	First Release For Presale	50%
	Vesting For Presale	50% each 7 days
	Listing Rate	1 BNB = 29,000 SLRM
	Initial Market Cap (estimate)	$1,438,068
	Soft Cap	350 BNB
	Hard Cap	700 BNB
	Unsold Tokens	Burn
	Presale Start Time	2022.04.18 20:00 (UTC)
	Presale End Time	2022.04.20 20:00 (UTC)
	Listing On	Pancakeswap
	Liquidity Percent	60%
	Liquidity Lockup Time	1825 days after pool ends
	Tokens release each cycle	50% each 7 days
	
	
	 */}
	
	
	
	
	<div class="col-12 col-md-6 col-lg-6 col-xl-6">
							{/* <div class="card-body text-center px-0"> */}
								<h4 class="mb-0">75 BNB</h4><h6></h6>
								<p class="mb-0">Soft Cap</p>
							{/* </div> */}
						</div>
	
						
	<div class="col-12 col-md-6 col-lg-6 col-xl-6">
							{/* <div class="card-body text-center px-0"> */}
								<h4 class="mb-0">150 BNB</h4><h6></h6>
								<p class="mb-0">Hard Cap</p>
							{/* </div> */}
	
	</div>
	<br></br>
	<br></br>
	<br></br>
	<br></br>
	
	
	
	
	
	
						<div class="col-12 col-md-4 col-lg-4 col-xl-4">
							<div class="card-body text-center px-0">
								<h4 class="mb-0"> SalaryMining</h4><h6></h6>
								<p class="mb-0">Token Name</p>
							</div>
						</div>
						<div class="col-12 col-md-4 col-lg-4 col-xl-4">
							<div class="card-body text-center px-0">
								<h4 class="mb-0">SLRM</h4><h6></h6>
								<p class="mb-0">Token Symbol</p>
							</div>
						</div>
						<div class="col-12 col-md-4 col-lg-4 col-xl-4">
							<div class="card-body text-center px-0">
								<h4 class="mb-0">18</h4><h6></h6>
								<p class="mb-0">Token Decimals</p>
							</div>
						</div>
						
	
	<div class="col-12">
							<div class="card-body text-center px-0">
								<h4 class="mb-0">Token Address</h4><h6></h6>
								<p class="mb-0 text-small"  >0x15adA4EA653e6E87B7F981C943965b20b2DCF703<br></br> (Do not send BNB to the token address!)</p>
							</div>
						</div>
	
	
	
						<div class="col-12 col-md-3 col-lg-3 col-xl-3">
							<div class="card-body text-center px-0">
								<h4 class="mb-0">100M SLRM</h4><h6></h6>
								<p class="mb-0">Total Supply </p>
							</div>
						</div>
						<div class="col-12 col-md-3 col-lg-3 col-xl-3">
							<div class="card-body text-center px-0">
								<h4 class="mb-0">4.5M SLRM</h4><h6></h6>
								<p class="mb-0"> Tokens For Presale </p>
							</div>
						</div>
						<div class="col-12 col-md-3 col-lg-3 col-xl-3">
							<div class="card-body text-center px-0">
								<h4 class="mb-0">3.9M SLRM </h4><h6></h6>
								<p class="mb-0">Tokens For Liquidity</p>
							</div>
						</div>
						<div class="col-12 col-md-3 col-lg-3 col-xl-3">
							<div class="card-body text-center px-0">
								<h4 class="mb-0">40M SLRM </h4><h6></h6>
								<p class="mb-0">Locked for Burn</p>
							</div>
						</div>
	 
	
	
	
						<div class="col-12 col-md-3 col-lg-3 col-xl-3">
							<div class="card-body text-center px-0">
								<h5 class="mb-0">1 BNB = 30,000 SLRM</h5><h6></h6>
								<p class="mb-0">Presale Rate</p>
							</div>
						</div>
	
						
						<div class="col-12 col-md-3 col-lg-3 col-xl-3">
							<div class="card-body text-center px-0">
								<h5 class="mb-0">1 BNB = 29,000 SLRM</h5><h6></h6>
								<p class="mb-0">Listing Rate</p>
							</div>
						</div>
	

						<div class="col-12 col-md-3 col-lg-3 col-xl-3">
							<div class="card-body text-center px-0">
								<h5 class="mb-0">2022.04.20 20:00 (UTC)</h5><h6></h6>
								<p class="mb-0">Presale Start Time</p>
							</div>
						</div>
	
						
						<div class="col-12 col-md-3 col-lg-3 col-xl-3">
							<div class="card-body text-center px-0">
								<h5 class="mb-0">2022.04.22 23:59 (UTC)</h5><h6></h6>
								<p class="mb-0">Presale End Time</p>
							</div>
						</div>

							 
							
		
	
						
							{/* 1 BNB = 29,000 SLRM */}
	
	 
					</div>
				</div>

				
				{/* <div class="card-footer text-center">
					Estimations are based on the current Salary price $ {this.PRICE}
				</div> */}
			</div>
	
	
	 
	
	
	
	</div></div></div></div></div>
	 
	
	
		  
	{/*  */}
			 
			 
	
	
	
	
	 
	
	
	
	
				<div class="overlay toggle-menu"></div>
	
			</div>
	
		</div><a href="javaScript:void();" class="back-to-top"><i class="fa fa-angle-double-up"></i> </a>
	
		</div>
        )
    }

	
}
