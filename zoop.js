const zoopChat = require('./zoop_chat.json');

const zoopMessages = zoopChat.messages;

let participants = zoopChat.participants;
let people = {}

participants.forEach(participant=>{
	const id = participant.name.split(' ')[0].toLowerCase();
	people[id] = {}
	people[id].name = participant.name;
	people[id].total = 0;
	people[id].upvoted = 0;
	people[id].downvoted = 0;
	people[id].downvotesGiven = 0;
	people[id].upvotesGiven = 0;
	people[id].selfUpvotes = 0;
	people[id].selfDownvotes = 0;
})

const thumbsUp = "\u00f0\u009f\u0091\u008d"
const thumbsDown = "\u00f0\u009f\u0091\u008e"


function score(name,change,type){
	const id = (function(name){
		for(person in people){
			if(people[person].name == name){
				return person
				break;
			}
		}
	})(name);

	switch(type){
		case('sender'):
			people[id].total += change;
			if(change === -1){
				people[id].downvoted++
			} else if(change === 1){
				people[id].upvoted++
			}
			break
		case('actor'):
			if(change === -1){
				people[id].downvotesGiven++
			} else if(change === 1){
				people[id].upvotesGiven++
			}
			break
		case('cunt'):
			if(change === -1){
				people[id].selfDownvotes++
			} else if(change === 1){
				people[id].selfUpvotes++
			}
	}
}


zoopMessages.forEach(message=>{
	const reactions = message.reactions;
	if(reactions){
		const sender = message.sender_name;
		reactions.forEach(react=>{
			const actor = react.actor
			const reaction = react.reaction;
			if(reaction == thumbsDown){
				if(sender != actor){
					score(sender, -1, 'sender')
				} else {
					score(sender, -1, 'cunt');
				}
				score(actor, -1, 'actor')
			} else if (reaction == thumbsUp){
				if(sender != actor){
					score(sender, 1, 'sender')
				} else {
					score(sender, 1, 'cunt');
				}
				score(actor, 1, 'actor')
			}
		})
	}
})

console.log(people);
