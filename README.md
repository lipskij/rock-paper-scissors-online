1. Come in to the site.
2. Allow to choose the username.
3. Each user choosing an option (rock,apaper,scissors)
4. WHEN BOTH users chose their option we desplay the game outcome.
5. Increment users score.
   6.Display opponents hand

{
players: [
username1,
username2
],
player1Choice: String,
player2Choice: String,
}

2.1. after press submit change the player1 to chosen user name.
2.2. Create a gameroom for 2 players
2.3 define an ID of gameroom
2.4 tie those 2 players ids to that room id
2.5 ties the choise to the user id
2.6 compare users choises
2.7 declare winner
2.8 increment users score
2.9 reset user choises

p1 | p2 | result

R | P | p2

R | S | p1

R | R | TIE

---

P | R | p1

P | S | p2

P | P | TIE

---

S | R | p2

S | P | p1

S | S | TIE

# rock-paper-scissors-online

[zaap.site](http://zaap.site)

# Add the waiting room

Room of people that are logged in and available to play with

We can add usernames from gameCollection.
Need to rewrite logic how game is developing:

1. After submitting username no new game is started.
2. Instead all players storred in array.

Method that allows call for a match on click on the user in the waiting room.
(should pop up an invitation request with message 'username' whants to play with you 'accept' or 'decline')
if declined message go away and user can ask another one. no new game is strated.
if accepted new game starts and they are unavailable to call for a game ('currently in game')

Method to quit the game. After that it makes users available for a new game.
And prevent from current game continue

Method that delete person from waiting room if he is disconected.

On mobile after username submit ir shows only waiting room and after game start brings the game play UI
After quitng the current game ir puts them back to waiting room for next game.
