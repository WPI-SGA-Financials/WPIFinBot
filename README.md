# WPIFinBot - A Slack Bot for WPI's Student Government
This bot hooks into WPI's Student Government's Financial Database to provide realtime statistics inside of their internal Slack. 

## Dependencies
-  [Node Version Manager](https://github.com/nvm-sh/nvm) - Used to install and manage node instances.
-  [Yarn](https://classic.yarnpkg.com/en/docs/install#alternatives-stable) - Used inplace of NPM for getting node packages.
-  Creation of a SlackBot in your workspace ([See Notes for a video link](#notes))

## Installation
1. Clone this git repository to an Ubuntu Machine
2. cd into the cloned folder and run `yarn`
3. Once all dependecies are installed, create a file called `secrets.js` with the following content inside of the `src` folder: 
   ```
    export const SLACK_OATH_TOKEN = '[YOUR-TOKEN]'
    export const HOST = 'webdb.wpi.edu'
    export const USER = '[USERNAME]'
    export const PASSWORD = '[PASSWORD]'
   ``` 
4. Edit `constants.js` and designate a channel for spam from the bot (Default is `#bot-spam`)
5. Go back to the main folder (`wpifinbot`) and run `yarn start`.
6. If everything is properly set up, you should see a console command saying `bot started` and `Bot version 0.0.0 online` in the designated bot spam channel.

## Notes
-  To properly install nvm and yarn, I recommend watching this [video from Techno Tim](https://www.youtube.com/watch?v=kL8iGErULiw)
-  This slack bot only works when it is running, meaning a dedicated machine is needed.
-  In order to properly set up a slack bot and gain a Slack OATH Token, follow along with this [video from Techno Tim](https://www.youtube.com/watch?v=AajBk59nOgw&t=255s)
-  The bot must be added to the channel you want results in.

## Commands
-  `!numbers` - Gives the current Budget, FR, and Mandatory Transfer Allocations

#### Planned Commands
-  `!help` - Gives information on current commands and bot version number
-  `!classes` - Returns the Current Class Structure, Number of Clubs in that Class, and a short description
-  `!recents` - Returns the requests from the past week. (If none, return `No requests in the past week`)

## Authorship
This bot was created by [Kevin Bimonte](http://www.github.com/kcbimonte).
