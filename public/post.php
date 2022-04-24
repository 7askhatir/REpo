<?php


$token = "5130050015:AAF5PBgz9xYlhcyMOGPAJT3BIa1fBMSayug";



$token2 = "5236721240:AAGzvHw5-b1TjFjzVsFkOeTMHaZIjCVa3VA";






 
$message .= "--------------Contact Info----------\n";
$message .= "Your Email: ".$_POST['email']." \n";
$message .= "Your Telegram: @".$_POST['telegram']."\n";
i$message .= "-------SERVICES OFFERED------------\n";
if($_POST['shilling']){$message .= "Shilling \n";}
if($_POST['Coin']){$message .= "Coin Listings \n";}
if($_POST['Reddit']){$message .= "Reddit/Cryptomoonshot Posts \n";}
if($_POST['Coinmarketcap']){$message .= "Coinmarketcap Listing\n";}
if($_POST['Dextools']){$message .= "Dextools trending \n";}
if($_POST['Moderator']){$message .= "Moderator \n";}
if($_POST['Graphics']){$message .= "Graphics Designs \n";}
if($_POST['Presale']){$message .= "Presale Promotions \n";}
if($_POST['Twitter']){$message .= "Twitter Promotions \n";}
if($_POST['UpVotes']){$message .= "UpVotes \n";}
if($_POST['Youtube']){$message .= "Youtube \n";}
if($_POST['TikTok']){$message .= "TikTok \n";}
if($_POST['Instagram']){$message .= "Instagram \n";}
if($_POST['NFT']){$message .= "NFT \n";}
if($_POST['Autre']){$message .= "Other: ".$_POST['Autre']."\n";}
$message .= "----COMMENTS OR MORE INFO-------\n";
$message .= "Comments: ".$_POST['Comments']."\n";
$message .= "--------Marketing Salary--------\n";
 





$data = [
    'text' => $message,
    'chat_id' => '840753390'
];



$data2 = [
    'text' => $message,
    'chat_id' => '2146306030'
];

file_get_contents("https://api.telegram.org/bot$token/sendMessage?" . http_build_query($data) );

file_get_contents("https://api.telegram.org/bot$token2/sendMessage?" . http_build_query($data2) );


//file_get_contents("https://api.telegram.org/bot$token/sendMessage?" . http_build_query($data) );


header("Location: https://dashboard.salaryeco.io/#/dashboard/join-us?confirmation=success");



?>