var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// File Appender
var fs = require('fs');

// Array of Truth Questions
var truthArray = ["Have you ever blamed your sibling for something you did just so that you wouldn’t get in trouble?", "Have you ever contemplated suicide?", "What food do you hate?", "Favorite gif?", "What's your middle name?", "Pancakes, Waffles, or French Toast?", "Hot Chocolate or Apple Cider?", "If you had to kill one person, who would it be?", "What is your kink?", "WHat is the most embarrassing thing in your room?", "WHat is the stupidest thing you have ever done?", "What is the most disgusting habit you have?", "Tell me about the last time someone unexpectedly walked in on you while you were naked.", "What is the most embarrassing nickname you have ever had?", "Tell me something you don't want me to know", "What's the worst and best thing about being a girl/boy?", "If you had to have a child with any historical figure, who would it be and why?", "WHat would you NOT do for 5M dollars", "WHat is the weirdest habit you had as a child?", "If you had to do the naughty with one character from Seasame Street who would it be and why?", "Have you every flashed something or someone", "What is your guilty pleasure?", "Do you sing in the shower?", "List all the people who have seen you naked",  "If you had to make out with any Disney character who would it be?", "Have you ever tasted a booger?", "Do you dance when you're by yourself?", "WHat is something you don't want your crush(or bf or gf) to know about you that is embarrassing?", "Who is the hottest? Hagrid, DUmbledore, or Dobby?", "WHat would be in your web history that you'd be embarrassed if someone saw?", "Would you rather be caught picking your nose or picking a wedgie?", "Have you ever tried to take a sexy picture of yourself?", "If you were invisible would you sneak a peak in the other locker room?", "What is the most embarrassing thing your parents have caught you doing?"];

//Array of Dares

var dareArray = ["You have to tell the last person you texted or called that you love them and you can't tell them it was a dare until the next day", "You must replace all your 'e's with '3's for the next five minutes", "You have to say you love men in SVTFOD General and you can't say it was a dare", "You must act like a cat for the next 3 minutes", "Everyone must be as lewd as Starry", "You have to act like Queen for 5 minutes", "You must act like Starry for 5 minutes", "You must act like Anjukk for 5 minutes", "You must act like a love struck girl who has seen her crushes abs for 10 minutes", "Take an embarrassing selfie and post it as your pfp", "Find the last person on Discord that you DM'd and say I love u to them but you can't stop saying it until they say i love u back.", "Ask your mom if your Bootylicious and you can't tell her it was a dare and u have to tell Everyone what she said", "You must get one person in general to say you a 10 in hotness", "Say that Queen is not cute", "what are the smexiest clothes you own?", "You have to fite your spouse or if single propose to someone random", "Cheat on your discord spouse", "Tell your crush that they smell gross"];

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = 'debug';

// Initialize Discord bot
var bot = new Discord.Client({
  token: auth.token,
  autorun: true
});

bot.on('ready', function (evt) {
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
  // Let bot know if it will execute a command
  // It will listen for messages that will start with '+'
  if (message.substring(0,1) == '+') {
    var args = message.substring(1).split(' ');
    var cmd = args[0];

    args = args.splice(1);
    switch(cmd) {
      // +ping
      case 'ping':
        bot.sendMessage({
          to: channelID,
          message: 'No'
        });
        break;

      // +truth
      case 'truth':
        bot.sendMessage({
          to: channelID,
          message: 'TRUTH!   "' + fileArray(truthArray) + '"'
        });
        break;
      // +addtruth
	    case 'addtruth':
	  	  var question = message.substring(10);

	      arrayAdd(truthArray, question);
		    bot.sendMessage({
	        to: channelID,
          message: 'Question added!'
	      });
	      break;

      // +punishment
      case 'punishment':
        bot.sendMessage({
          to: channelID,
          message: 'SOMEONE DID NOT TELL THE TRUTH! This is the liars punishment:      "' + fileArray(dareArray) + '"'
        });
        break;
      // +dare
      case 'dare':
        bot.sendMessage({
          to: channelID,
          message: 'DARE!    "' + fileArray(dareArray) + '"'
        });
        break;
      // +adddare
      case 'adddare':
        var dare = message.substring(9);
        dareAdd(dare);
        bot.sendMessage({
          to: channelID,
          message: 'Dare added!'
        });
        break;

	    // List Truths
      case 'listtruths':
	      bot.sendMessage({
          to: channelID,
          message: listQuestions(truthArray)
	      });
        break;
      // List Dares
      case 'listdares':
        bot.sendMessage({
          to: channelID,
          message: listQuestions(dareArray)
        });
        break;

      // +help
      case 'help':
        var help = " ``` +truth : I'll ask you a question and you will answer it without lying \n +addtruth <Question> : Add a Truth Question \n +punishment : Give a liar a dare as punishment \n +dare : call upon a dare directly \n +adddare <Question> : Add a Dare \n +listtruths : See the latest 3 truths \n +listdares : See the latest 3 dares \n +ping : Do not mess with me \n +badadvice : Enjoy some advice```";

        bot.sendMessage({
         to: channelID,
         message: help
	      });
        break;
    }
  }
});

function fileArray(array){
	var rand = Math.floor(Math.random() * array.length);

	return array[rand];
};
function dareAdd(str){
  dareArray.push(str);
  fs.appendFile('dare.txt', str + '  |  ', function(err){
    if (err) {
      return;
    }else{
      //done
    }
  })
};
function arrayAdd(array, str){
	array.push(str);
	fs.appendFile('text.txt', str + '  |  ', function(err){
	if (err) {
		return;
	}else{
		//done
	}
	})
};
function listQuestions(array){
	var str = "```Here are the latest 3 questions: \n \n";

	for(i = array.length -1; i > array.length - 4; i--){
		str += array[i] + "                    \n";
	}
	str = str + "```";
	return str;
};
