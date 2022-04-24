import React, { Component } from 'react'  
  
import ReactTooltip from "react-tooltip";


	var HNT_PRICE=19.65;

 
	
	const spots = 100;
	const mined = 0;
	const totale_rewards = 0;
const	items= []



const price_click = false;

export class Calculator extends Component {  
	
    toutaleSuplay=726875;
	dailyVolum=1000;
	Balance=1000;
	PRICE=1;


	 mined_for_one_spote = 7.5;


	constructor (props) {
		super(props);
		this.state = {
			updatable: false,
			hold: "0.1",
			rewardWeek :"0.000",
			rewardMonth : "0.000",
			rewardYear : "0.000",
			balanceWeek :"0.000",
			balanceMonth : "0.000",
			balanceYear :"0.000",
			hnt_usd: "0.000",
			spots: "100",
			mined: "0.000",
			hnt_gain: "0.000",
			price_click : false,
			minted_click : false,
			spots_click : false,
           
		};
		this.getpricedata();
		this.getVolume();
	//	 this.checkEvent_init();
		 this.componentDidMount()




setTimeout(() => {
	
this.handleClick_pointer_spots(true);

}, 10);
 
 setTimeout(() => {
	  
	const yourSalary = 1000;
		   
	var  hold=parseInt(yourSalary)*100/(this.toutaleSuplay);
	if(yourSalary<=0) hold=0;
	var rewardWeek=(((this.dailyVolum * 0.08 )* Number(hold) / 100)*7).toFixed(3);
	var rewardMonth=(((this.dailyVolum * 0.08 )* Number(hold) / 100)*30).toFixed(3);
	var rewardYear = (((this.dailyVolum * 0.08 )* Number(hold) / 100)*365.25).toFixed(3);
	var balanceWeek = ((rewardWeek/this.PRICE) + Number(yourSalary) ).toFixed(3);
	var balanceMonth = (rewardMonth/this.PRICE  + Number(yourSalary)).toFixed(3) ;
	var balanceYear = (rewardYear/this.PRICE + Number(yourSalary) ).toFixed(3);
	
	 this.setState({
		 hold: hold,
		 rewardWeek:rewardWeek,
		 rewardMonth:rewardMonth,
		 rewardYear:rewardYear,
		 balanceWeek:balanceWeek,
		 balanceMonth:balanceMonth,
		 balanceYear:balanceYear,
		 
 
		});
 }, 1000);





	  }
	  





 
	  handleClick_pointer_price= (event)=>{


		let price_click = true
		
		//return true
		this.setState({
			price_click : price_click,
			spots_click : false,
			minted_click : false,
			 
	   });
	   console.log(this.state.price_click)
	   console.log("this.state.price_click"+price_click) 
	  };
	

 
	  handleClick_pointer_mined= (event)=>{


		let price_click = true
		
		//return true
		this.setState({
			minted_click : price_click,
			// this.price_click = true;

			spots_click : false,
			 
			price_click : false
	   });
	   console.log(this.state.price_click)
	   console.log("this.state.price_click"+price_click) 
	  };

	  
	  handleClick_pointer_spots= (event)=>{


		let price_click = true
		
		//return true
		this.setState({
			spots_click : price_click,
			minted_click : false,
			price_click : false
			// this.price_click = true;
	   });
	   console.log(this.state.price_click)
	   console.log("this.state.price_click"+price_click) 
	  };
	
	  
    // ComponentDidMount is used to
    // execute the code 
    componentDidMount() {  
		
		
		fetch("https://api.coingecko.com/api/v3/simple/price?ids=helium&vs_currencies=usd").then((res) => res.json())
            .then((json) => {
              //  this.setState({
                 //   this.items= json;
					console.log(json)
					let HNT_PRICE_ = json.helium["usd"]
					this.setState({
						hnt_usd: HNT_PRICE_,
						
				   });
					console.log(HNT_PRICE_)
                 //   DataisLoaded: true
             //   });
            })


			this.setState({
				//hold: hold,
			//	hnt_usd: "0.000",
			spots: "100",
			mined: 100 * this.mined_for_one_spote,
			// mined: String(100 * this.mined_for_one_spote),
			//hnt_gain: this.state.mined,
		   });	



		   setTimeout(() => {
			 

			this.setState({
				
				hnt_gain: (this.state.mined * this.state.hnt_usd).toFixed(3),

			   });	
		   }, 1000);







			
    }








	checkEventPrice= (event)=>{
		let HNT_PRICE = event.target.value;

		
		this.setState({
	hnt_usd : HNT_PRICE,
		// mined: spots * this.mined_for_one_spote,
	
	   });	

	   setTimeout(() => {
			 

		this.setState({
			hnt_gain: (this.state.mined * this.state.hnt_usd).toFixed(3),
		   });	
	   }, 500);




    };

 
	checkEventSpot= (event)=>{
		let spots = event.target.value;

		
		this.setState({
	
		mined: spots * this.mined_for_one_spote,
	
	   });	

	   setTimeout(() => {
			 

		this.setState({
			hnt_gain: (this.state.mined * this.state.hnt_usd).toFixed(3),
		   });	
	   }, 500);




    };

	
 
	checkEventMined= (event)=>{
		let Mined = event.target.value;

		
		this.setState({
	
		mined: Mined,
	spots: (Mined / this.mined_for_one_spote).toFixed(0)
	   });	

	   setTimeout(() => {
			 

		this.setState({
			hnt_gain: (this.state.mined * this.state.hnt_usd).toFixed(3),
		   });	
	   }, 500);




    };






	  checkEvent = (event)=>{
		const yourSalary = event.target.value;
		this.Balance = event.target.value;
		var  hold=parseInt(yourSalary)*100/(this.toutaleSuplay);
		if(yourSalary<=0) hold=0;
		var rewardWeek=(((this.dailyVolum * 0.08 )* Number(hold) / 100)*7).toFixed(3);
		var rewardMonth=(((this.dailyVolum * 0.08 )* Number(hold) / 100)*30).toFixed(3);
		var rewardYear = (((this.dailyVolum * 0.08 )* Number(hold) / 100)*365.25).toFixed(3);
		var balanceWeek = ((rewardWeek/this.PRICE) + Number(yourSalary) ).toFixed(3);
        var balanceMonth = (rewardMonth/this.PRICE  + Number(yourSalary)).toFixed(3) ;
        var balanceYear = (rewardYear/this.PRICE + Number(yourSalary) ).toFixed(3);
		console.log(yourSalary);
		this.setState({
			hold: hold,
			rewardWeek:rewardWeek,
			rewardMonth:rewardMonth,
			rewardYear:rewardYear,
			balanceWeek:balanceWeek,
			balanceMonth:balanceMonth,
			balanceYear:balanceYear
	   });
    };
	
	checkEventVolum = (event)=>{
		this.dailyVolum = event.target.value;
		var  hold=parseInt(this.Balance)*100/(this.toutaleSuplay);
	//	if(yourSalary<=0) hold=0;
		var rewardWeek=(((this.dailyVolum * 0.08 )* Number(hold) / 100)*7).toFixed(3);
		var rewardMonth=(((this.dailyVolum * 0.08 )* Number(hold) / 100)*30).toFixed(3);
		var rewardYear = (((this.dailyVolum * 0.08 )* Number(hold) / 100)*365.25).toFixed(3);
		var balanceWeek = ((rewardWeek/this.PRICE) + Number(this.Balance) ).toFixed(3);
        var balanceMonth = (rewardMonth/this.PRICE  + Number(this.Balance)).toFixed(3) ;
        var balanceYear = (rewardYear/this.PRICE + Number(this.Balance) ).toFixed(3);
		//console.log(yourSalary);
		this.setState({
			hold: hold,
			rewardWeek:rewardWeek,
			rewardMonth:rewardMonth,
			rewardYear:rewardYear,
			balanceWeek:balanceWeek,
			balanceMonth:balanceMonth,
			balanceYear:balanceYear
	   });
    };








      
	 getVolume(){


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
			"limit": 10,
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
			 
		//    console.log(data)
			 
			data.data.ethereum.dexTrades.map((e) => {
				console.log(this.PRICE);
				this.dailyVolum =  (e.amount*this.PRICE).toFixed(3);
			   // const newList = list.concat({ amount, id: 'c' });
			//	setList(newList);
			
			}
				 
	
			)
	
		})
		.catch(console.error);
		
	}
	
	
	getpricedata(){


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
		
		const variables = {
			"limit": 10,
			"offset": 0,
			"network": "bsc",
			"token": "0x8619c4b2ecdcb716cd162ec73f332c4d7dc06f1e",
			"from": "2022-03-27",
			"till": "2022-04-03T23:59:59",
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
				query
			})
		};
		
		fetch(url, opts)
		.then(res => res.json())
		.then((data) => {
			 
		    console.log(data)
		   // setList(data.data.ethereum.dexTrades);
			 data.data.ethereum.dexTrades.map((e) => {
			// console.log(e.tradeAmount);
			// console.log(e.baseAmount);
			this.PRICE = ((e.tradeAmount / e.baseAmount)).toFixed(3);
			











			
			
			 }
				 
	
			 )
	
		})
		.catch(console.error);
		 
		



		
	}
	












    render() {  


		var className_mined = this.state.minted_click ? 'hide' : ' ';
		var className_Mined_iput = this.state.minted_click ? 'mb-0' : 'hide ';
		
		var className_spot = this.state.spots_click ? 'hide' : ' ';
		var className_spot_input = this.state.spots_click ? ' ' : ' hide';
		 
		
		var className_price = this.state.price_click ? 'hide' : ' ';
		var className_price_input = this.state.price_click ? '' : ' hide';
		 


        return (  
            <div>
                <div class="clearfix"></div> 
            <div class="content-wrapper">
                <div class="container-fluid">

                 
<div class="row pt-2 pb-2">
	<div class="col-sm-9">
		<h3 class="page-title text-left">Calculator For $SLR Rewards   	 
	{/* <div className={className} onClick={this.handleClick_pointer}>click here</div> */}
	</h3>
		 
	</div>
	  <div class="col-sm-3">
		 
	</div> 
</div>
 
<div class="card">
	<div class="card-header text-uppercase text-left">SALARY Rewards Calculator</div>
	<div class="card-body">
		<form>
			<div class="row">
			
				<div class="col-12 col-lg-6 col-xl-6">
					<div class="form-group row">
						<label class="col-sm-4 col-form-label"  >Your salary*</label>
						<div class="col-sm-8">
							<input type="number"  onChange={this.checkEvent } placeholder="1000" class="form-control" />
						</div>
					</div>
				</div>
				<div class="col-12 col-lg-6 col-xl-6">
					<div class="form-group row">
						<label class="col-sm-4 col-form-label">Daily volume*</label>
						<div class="col-sm-8">
							<input type="text" onChange={this.checkEventVolum } placeholder={this.dailyVolum}        class="form-control"  />
						</div>
					</div>
				</div>
				<div class="col-12 col-lg-6 col-xl-6">
					<div class="form-group row">
						<label class="col-sm-4 col-form-label">Circulating Supply <i data-tip data-for="addTip2" class="fa fa-info-circle"></i></label>
						<ReactTooltip id="addTip2" place="top" effect="solid">
						CEX & Staking wallet is locked and excluded : 150000 SLR<br></br>
Liquidity wallet is locked and excluded : 123125 SLR
      </ReactTooltip>
						<div class="col-sm-4">
							<input type="text" disabled="disabled"  class="form-control" value="726,875.00" />
						</div>
						<div class="col-sm-4">
							<input type="text" disabled="disabled"   class="form-control" value={"Holding: "+Number(this.state.hold).toFixed(3)+"%"}/>
						</div>
					</div>
				</div>
				  <div class="col-12 col-lg-6 col-xl-6">
					<div class="form-group row">
					<label class="col-sm-4 col-form-label">Rewards in %</label>
						<div class="col-sm-8">
							<input type="text" disabled="disabled"  class="form-control" value="8%" />
						</div>
					</div>
				</div>  
				
				 
			</div>
		</form>
	</div>
</div>



<div class="row">
	<div class="col-12 col-lg-12 col-xl-6">
		<div class="card">
			<div class="card-header text-uppercase">Rewards USDT  </div>
			<div class="card-content">
				<div class="row row-group m-0">
					<div class="col-12 col-md-4 col-lg-4 col-xl-4">
						<div class="card-body text-center px-0">
							 
							<h4 class="mb-0"> {this.state.rewardWeek}
							</h4><h6> USDT</h6>
							<p class="mb-0">Rewards week</p>
						</div>
					</div>
					<div class="col-12 col-md-4 col-lg-4 col-xl-4">
						<div class="card-body text-center px-0">
							 
							<h4 class="mb-0">{this.state.rewardMonth} </h4><h6>USDT</h6>
							<p class="mb-0">Rewards Month</p>
						</div>
					</div>
					<div class="col-12 col-md-4 col-lg-4 col-xl-4">
						<div class="card-body text-center px-0">
							 
							<h4 class="mb-0">
							{this.state.rewardYear}
							</h4><h6>USDT</h6>
							<p class="mb-0">Rewards Year</p>
						</div>
					</div>
				</div>
			</div>
			<div class="card-footer text-center" >
				Estimations are based on the current volume of $ {this.dailyVolum}
			</div>
		</div>
	</div>
	<div class="col-12 col-lg-12 col-xl-6">
		
		<div class="card">
			<div class="card-header text-uppercase">By reinvesting your USDT rewards </div>
			<div class="card-content">
				<div class="row row-group m-0">
					<div class="col-12 col-md-4 col-lg-4 col-xl-4">
						<div class="card-body text-center px-0">
							<h4 class="mb-0">{this.state.balanceWeek} </h4><h6>SLR</h6>
							<p class="mb-0">Balance Week</p>
						</div>
					</div>
					<div class="col-12 col-md-4 col-lg-4 col-xl-4">
						<div class="card-body text-center px-0">
							<h4 class="mb-0"> {this.state.balanceMonth}</h4><h6>SLR</h6>
							<p class="mb-0">Balance Month</p>
						</div>
					</div>
					<div class="col-12 col-md-4 col-lg-4 col-xl-4">
						<div class="card-body text-center px-0">
							<h4 class="mb-0"> {this.state.balanceYear}</h4><h6>SLR</h6>
							<p class="mb-0">Balance Year</p>
						</div>
					</div>
				</div>
			</div>
			<div class="card-footer text-center">
				Estimations are based on the current Salary price $ {this.PRICE}
			</div>
		</div>
	</div>
</div>



                 
<div class="row pt-2 pb-2">
	<div class="col-sm-9">
		<h3 class="page-title text-left">Calculator For $SLRM Rewards</h3>
		 
	</div>
	  <div class="col-sm-3">
		 
	</div> 
</div>


<div class="row">
	<div class="col-12 col-lg-12 col-xl-12">
		
		<div class="card">
			{/* <div class="card-header text-uppercase">By reinvesting your USDT rewards </div> */}
			<div class="card-content">
				<div class="row row-group m-0">
					<div class="col-12 col-md-3 col-lg-3 col-xl-3">
						<div class="card-body text-center px-0">

						<input className={className_spot_input+' form-control'} type="number" min="0" onChange={this.checkEventSpot } placeholder={this.state.spots}  class="form-control" />
						<h4 className={className_spot}>{this.state.spots}</h4>
							<p class="mb-0">Hot Spots <i  onClick={this.handleClick_pointer_spots} className={className_spot+" fa fa-hand-pointer-o pointer"}></i></p>
						</div>
					</div>
					<div class="col-12 col-md-3 col-lg-3 col-xl-3">
						<div class="card-body text-center px-0">
						<input type="number" className={className_price_input+' form-control'}  onChange={this.checkEventPrice } placeholder={this.state.hnt_usd} class="form-control hide" />
							<h4   className={className_price}  >$ {this.state.hnt_usd}</h4><h6></h6>
							<p class="mb-0">HNT Price (current) <i  onClick={this.handleClick_pointer_price} className={className_price+" fa fa-hand-pointer-o pointer"} ></i> </p>
{/* <button><i class="fa fa-cursor"></i></button> */}
{/* CEX & Staking wallet is locked and excluded. 150000 SLR
Liquidity wallet is locked and excluded. 123125 SLR */}

						</div>
					</div>
					<div class="col-12 col-md-3 col-lg-3 col-xl-3">
						<div class="card-body text-center px-0">
						<input type="number"  className={className_Mined_iput+' form-control'} onChange={this.checkEventMined } placeholder={this.state.mined}     />
							<h4     className={className_mined}   >{this.state.mined}</h4>
							<p class="mb-0">HNT Mined  (per Month) <i  onClick={this.handleClick_pointer_mined} className={className_mined+" fa fa-hand-pointer-o pointer"}></i> </p>
						</div>
					</div>
					<div class="col-12 col-md-3 col-lg-3 col-xl-3">
						<div class="card-body text-center px-0">
							<h4 class="mb-0">${this.state.hnt_gain}</h4><h6></h6>
							<p class="mb-0">HNT GAINS (per Month)</p>
						</div>
					</div>
				</div>
			</div>
			{/* <div class="card-footer text-center">
				Estimations are based on the current Salary price $ {this.PRICE}
			</div> */}
		</div>
	</div>
</div>

                    <div class="overlay toggle-menu"></div>

                </div>

            </div><a href="javaScript:void();" class="back-to-top"><i class="fa fa-angle-double-up"></i> </a>
            </div>
   
         
        )  
    }  
}  
  
export default Calculator  