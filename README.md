# Tic-Tac-Toe
## 2 independed instances
### Used:
React/TS/SCSS/i18next/API/React-router

### Iteration 1:
Design layout
Tic-Tac-Toe Game logic
Input with player username
Delete profiles from score
Before game begins create profile and select which player is X and O
When game ends then winner will get +1 and looser -1 to the highscore
Keep track of highscore

### Iteration 2: 
Use the i18n plugin (dropdown for language selection between "sk" and "en")
Use SCSS - externalise design tokens (variables)
Select profile from high score for each player (if already existing)
Fetch data from internet: https://randomuser.me/
Set random profile picture for highscore from API

### Iteration 3:
Decouple game logic from UI
Local storage (highscore persistence)
Routing using react-router-dom
Create main menu where you select independent instances of Tic-Tac-Toe game
Instances are same game Tic-Tac-Toe games but with differenct data (highscore)
You can go back and switch to another instance
