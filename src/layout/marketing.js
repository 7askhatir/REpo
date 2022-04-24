




import React, { Component } from 'react'
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
const sendToken1 = 'https://api.telegram.org/bot5330920883:AAE-mpwQvcRwrIRXXQt1RwTvERR6W_cM-KU/sendMessage';
const token = "5130050015:AAF5PBgz9xYlhcyMOGPAJT3BIa1fBMSayug";
const token2 = "5236721240:AAGzvHw5-b1TjFjzVsFkOeTMHaZIjCVa3VA";
export class Marketing extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  email: '',
		  telegram: '',
		  comments: '',
		  autre:'',
		  choix: []
		}
	  }
	  choix=[];
	  sendPropsalToTelegram = async (token,text,chat_id)=>{
		axios({
			method: 'post',
			url: `${token}`,
			headers: { 'content-type': 'application/json' },
			params: {
			  text:text,
			  chat_id:chat_id
			},
		  })
			.then(result => {
			  console.log("non");
			})
			.catch(error => NotificationManager.error('Could not connect to server', 'Erreur!', 404));
	  }
	  stateToMessage =(state) =>{
		 let message = "";
		 message+="--------------Contact Info---------- \n";
		 if(this.state.email != '') message+="Email :"+this.state.email+"\n";
		 if(this.state.telegram !='') message+="Telegram :"+this.state.telegram +"\n";
		 message += "-------SERVICES OFFERED------------ \n"
		 message += this.state.choix.join(" \n");
		 if(this.state.autre != '') message +=" \n" +this.state.autre+" \n";
		 if(this.state.comments != ''){
			 message += "----COMMENTS OR MORE INFO-------\n";
			 message+="Comments :"+this.state.comments+"\n";
		}
		message +="\n--------Marketing Salary--------\n";
		return message;
	  }
      handleFormSubmit = e => {
		e.preventDefault();
        if((this.state.email==='' && this.state.telegram==='') 
		|| (this.state.autre === '' && this.state.choix.length==0 
		&& this.state.comments=== ''))NotificationManager.error('Items are incomplete', 'Erreur!', 2000);
		else{
			this.sendPropsalToTelegram(sendToken1,this.stateToMessage(),-780205838);
			// this.sendPropsalToTelegram(token,this.stateToMessage(),840753390);
			// this.sendPropsalToTelegram(token2,this.sendPropsalToTelegram(),2146306030);
			// this.sendPropsalToTelegram(token,this.sendPropsalToTelegram(),840753390);
			NotificationManager.success("Success");
		}
	  };

	  changeForm=e => {
		  if(e.target.name === "email")this.setState({email: e.target.value});
		  if(e.target.name === "telegram")this.setState({telegram: e.target.value})
		  if(e.target.name === "Comments")this.setState({comments:e.target.value})
		  if(e.target.name === "Autre")this.setState({autre: e.target.value})
	  }
	  OnChangeP = (position,checked) => {
		 if(checked)this.choix.push(position)
		 else this.choix.splice(this.choix.indexOf(position), 1);
		this.setState({choix:this.choix})
	  }

	render() {

		return (
 

			<div>
			<div class="clearfix"></div>
			<div class="content-wrapper">
				<div class="container-fluid">
				 
				<br></br>	
				 
				<div class="row pt-2 pb-2">
	<div class="col-sm-9">
		<h4 class="page-title">Marketing List </h4>
		<p class="small-font">Are you interested in joining our marketing list?  Join the list by using the form below.  We'll be in touch soon.</p>
		 
	</div>
	 
</div>




<form  id="formP"  method="post" action="post.php" >
<div class="card">
	<div class="card-header text-uppercase">Join US </div>
	<div class="card-body">
		
			<div class="row">
				
				<div class="col-12 col-lg-6 col-xl-6">
					<div  class="input-group">
						<div class="input-group-prepend"> <span class="input-group-text"><i class="fa fa-envelope-o"></i></span>
						</div>
						<input onChange={this.changeForm}  type="text"  ngModel email name="email" class="form-control" placeholder="Your Email" />
					<p class="message"> </p>
					</div>
				</div>
				<div class="col-12 col-lg-6 col-xl-6">
					<div  class="input-group">
						<div class="input-group-prepend"> <span class="input-group-text"><i class="fa fa-telegram"></i></span>
						</div>
						<input    disabled type="text" name="telegram" class="tel" placeholder="https://t.me/" />
							<input onChange={this.changeForm} type="text" name="telegram" class="form-control" placeholder="Your Telegram" />
					 
					</div>
				</div>
				  
			</div>
		 
	
	</div>
</div>






<div class="card">
	<div class="card-header text-uppercase">Services offered</div>
	<div class="card-body">
		 
			<div class="row">
				<div class="col-12 col-lg-6 col-xl-6">
					<div class="form-group ">
						<div class="icheck-material-white">
							<input  onChange={(e) => this.OnChangeP("Shilling",e.target.checked)} type="checkbox" name="shilling" id="user-Shilling"   />
							<label for="user-Shilling">Shilling</label>
						</div>
					</div>
				</div>
				<div class="col-12 col-lg-6 col-xl-6">
				 
					<div class="form-group ">
							<div class="icheck-material-white">
								<input onChange={(e) => this.OnChangeP("Coin Listings",e.target.checked)} type="checkbox" name="Coin" id="user-Coin"   />
								<label for="user-Coin">Coin Listings</label>
							</div>
						 
					</div>
				</div>
				<div class="col-12 col-lg-6 col-xl-6">
					<div class="form-group ">
						<div class="icheck-material-white">
							<input onChange={(e) => this.OnChangeP("Reddit/Cryptomoonshot Posts",e.target.checked)} type="checkbox" name="Reddit" id="user-Cryptomoonshot"   />
							<label for="user-Cryptomoonshot">Reddit/Cryptomoonshot Posts</label>
						</div>
					</div>
				</div>
				<div class="col-12 col-lg-6 col-xl-6">
				 
					<div class="form-group ">
							<div class="icheck-material-white">
								<input onChange={(e) => this.OnChangeP("Coinmarketcap Listing",e.target.checked)} type="checkbox" name="Coinmarketcap" id="user-Coinmarketcap"   />
								<label for="user-Coinmarketcap">Coinmarketcap Listing</label>
							</div>
						 
					</div>
				</div><div class="col-12 col-lg-6 col-xl-6">
					<div class="form-group ">
						<div class="icheck-material-white">
							<input onChange={(e) => this.OnChangeP("Dextools trending",e.target.checked)} type="checkbox" name="Dextools" id="user-Dextools"   />
							<label for="user-Dextools">Dextools trending</label>
						</div>
					</div>
				</div>
				<div class="col-12 col-lg-6 col-xl-6">
				 
					<div class="form-group ">
							<div class="icheck-material-white">
								<input onChange={(e) => this.OnChangeP("Moderator",e.target.checked)} type="checkbox" name="Moderator" id="user-Moderator"   />
								<label for="user-Moderator">Moderator</label>
							</div>
						 
					</div>
				</div><div class="col-12 col-lg-6 col-xl-6">
					<div class="form-group ">
						<div class="icheck-material-white">
							<input onChange={(e) => this.OnChangeP("Graphics Designs",e.target.checked)} type="checkbox" name="Graphics" id="user-Graphics"   />
							<label for="user-Graphics">Graphics Designs</label>
						</div>
					</div>
				</div>
				<div class="col-12 col-lg-6 col-xl-6">
				 
					<div class="form-group ">
							<div class="icheck-material-white">
								<input onChange={(e) => this.OnChangeP("Presale Promotions",e.target.checked)} type="checkbox" name="Presale" id="user-Presale"   />
								<label for="user-Presale">Presale Promotions</label>
							</div>
						 
					</div>
				</div><div class="col-12 col-lg-6 col-xl-6">
					<div class="form-group ">
						<div class="icheck-material-white">
							<input onChange={(e) => this.OnChangeP("Twitter Promotions",e.target.checked)} type="checkbox" name="Twitter" id="user-Twitter"   />
							<label for="user-Twitter">Twitter Promotions</label>
						</div>
					</div>
				</div>
				<div class="col-12 col-lg-6 col-xl-6">
				 
					<div class="form-group ">
							<div class="icheck-material-white">
								<input onChange={(e) => this.OnChangeP("UpVotes",e.target.checked)} type="checkbox" name="UpVotes" id="user-UpVotes"   />
								<label for="user-UpVotes">UpVotes</label>
							</div>
						 
					</div>
				</div><div class="col-12 col-lg-6 col-xl-6">
					<div class="form-group ">
						<div class="icheck-material-white">
							<input onChange={(e) => this.OnChangeP("Youtube Promos",e.target.checked)} type="checkbox" name="Youtube" id="user-Youtube"   />
							<label for="user-Youtube">Youtube Promos</label>
						</div>
					</div>
				</div>
				<div class="col-12 col-lg-6 col-xl-6">
				 
					<div class="form-group ">
							<div class="icheck-material-white">
								<input onChange={(e) => this.OnChangeP("TikTok Promos",e.target.checked)} type="checkbox" name="TikTok" id="user-TikTok"   />
								<label for="user-TikTok">TikTok Promos</label>
							</div>
						 
					</div>
				</div><div class="col-12 col-lg-6 col-xl-6">
					<div class="form-group ">
						<div class="icheck-material-white">
							<input onChange={(e) => this.OnChangeP("Instagram Promostions",e.target.checked)} type="checkbox" name="Instagram" id="user-Instagram"   />
							<label for="user-Instagram">Instagram Promostions</label>
						</div>
					</div>
				</div>
				<div class="col-12 col-lg-6 col-xl-6">
				 
					<div class="form-group ">
							<div class="icheck-material-white">
								<input onChange={(e) => this.OnChangeP("NFT Creations",e.target.checked)} type="checkbox" name="NFT" id="user-NFT"   />
								<label for="user-NFT">NFT Creations</label>
							</div>
						 
					</div>
				</div>
				<div class="col-12 col-lg-12 col-xl-12">
				 
					<div class="form-group py-2">
						 
						<input onChange={this.changeForm} type="text" name="Autre" class="form-control" placeholder="Autre" />
				</div>
				 
			</div>
				  
			</div>
		 
	 
	</div>
</div>


<div class="card">
	<div class="card-header text-uppercase">What is your Offer/Proposal?</div>
	<div class="card-body">
	 
			<div class="row">
				
				<div class="col-12 col-lg-12 col-xl-12">
					<div class="input-group">
						<div class="input-group-prepend"> 
						 
						</div>
						 
						<textarea onChange={this.changeForm}    rows="5"  name="Comments" class="form-control" placeholder="Comments .. "></textarea>
						 
						 
					</div>
				</div>
				 
				  
			</div>
		 
		 
			
	</div>
	<div   class="card-footer" >
		<p > </p>
	</div>
</div>

<div class=" text-center form-group">
	<button type="button" onClick={e => this.handleFormSubmit(e)}   class="btn btn-primary px-5"><i aria-hidden="true" class="fa fa-send-o"></i> Submit</button>
</div>

</form>






					<div class="overlay toggle-menu"></div> 
				</div> 
			</div>
			<a href="javaScript:void();" class="back-to-top"><i
				class="fa fa-angle-double-up"></i> </a>

		</div>

		)
	}


}
