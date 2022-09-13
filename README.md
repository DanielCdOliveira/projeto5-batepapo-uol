<div align="center"><img style = "width:100%;"src="https://i.imgur.com/HzIAv7w.png"></img></div>
<hr>
<h2 align=center>UOL chat room</h2>
<h3 align=center>Web development Project</h3>
<hr>
<h4 align=center>A chat room made in honor of an old brazilian chat made with HTML, CSS and JavaScript</h4>
<h4 align=center>First time using an API for making HTTP requests, controlling data like users and messages.</h4>
<br>
<div align=center style="display:flex; justify-content: center; gap:5%">
        <img style = "height:300px;"src="https://i.imgur.com/GfdU1iU.png">
        <img style = "height:300px;"src="https://i.imgur.com/eE19fMq.png">
        <img style = "height:300px;"src="https://i.imgur.com/0y1gtxz.png">
</div>
<br><hr>

## Features

- Unique user autenthication based on API response
- Users can freely chat on the app
- Private and public messages
- Direct messages (they can be private or public) for a specific user
- Status message for when the users enter or leave the chat
- Working sidebar that shows up when clicked on a button
- Chat scrolls down automatically when receiving a new message

### Deploy

- Deploy using [GitHub Pages](https://danielcdoliveira.github.io/projeto5-batepapo-uol/)

## Requirements

- Layout

  - [x] Apply layout to mobile, following Figma below. It is not necessary to implement a desktop version.

- Chat
    - [x] When entering the site, it must load the messages from the server and display them according to the layout provided
    - [x] There are 3 types of message:
         -  [x]  Status messages (**Entered** or **Leave** the room): must have a gray background
         -  [x]  Reserved messages (**Reservedly**): must have a pink background
         -  [x]  Normal messages: must have a white background
    - [x] Every 3 seconds the site must reload messages from the server to keep it always up to date
    - [x] The chat should have automatic scrolling by default, that is, whenever new messages are added to the end of the chat it should scroll to the end
    - [x] Messages with Privately should only be displayed if the recipient's name is the same as the name of the user who is using the chat (or else he could see messages reserved for other people)

- Entrance to the room
    - [x] When entering the site, the user should be asked with a `prompt` his beautiful name
    - [x] After entering the name, it must be sent to the server to register the user
        - [x] If the server responds successfully, the user will be able to enter the room
        - [x] If the server responds with an error, the user must be asked to enter another name, as it is already in use
    - [x] While the user is in the room, every 5 seconds the site must notify the server that the user is still present, otherwise it will be considered "Leave the room"


- Message sending
    - [x] When sending a message, it must be sent to the server
        - [x] In case the server responds successfully, you must get messages from the server again and update the chat
        - [x] If the server responds with an error, it means that this user is no longer in the room and the page must be updated (and thus returning to the step of asking for the name)
    - [x] In this sending, the sender, the recipient and if the message is reserved or not must be informed.

## BONUS

- Active participants
    - [x] By clicking on the participants' top right icon, the side menu should open above the chat according to the layout. A semi-transparent dark background should be above the chat.
    - [x] When clicking on the dark background, the side menu should be hidden again
    - [x] The site must get the participant list as soon as it enters the chat and must update the list every 10 seconds
    - [x] When clicking on a person or in public/privately, the option clicked must be marked with a check and the others unmarked
    - [x] In addition to the check above, when changing these parameters, the sentence that informs the recipient must also be changed, which is below the message input

- Input screen
    - [x] Instead of a prompt, make a splash screen


- Send with enter
    - [x] Make it so that, if the user presses Enter in the message field, it will be sent (that is, it should have the same behavior if the user clicks on the send button)


### Built with

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)
![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

### Contact

[![LinkedIn][linkedin-shield]][linkedin-url]

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=blue
[linkedin-url]: https://www.linkedin.com/in/danielcdoliveira/
