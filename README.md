# WPIFinBot - A Slack Bot for WPI's Student Government
This bot hooks into WPI's Student Government's Financial Database to provide realtime statistics inside of their internal Slack. 

## Dependencies
-  [Node Version Manager](https://github.com/nvm-sh/nvm) - Used to install and manage node instances.
-  [Yarn](https://classic.yarnpkg.com/en/docs/install#alternatives-stable) - Used inplace of NPM for getting node packages.
-  [Docker](https://docs.docker.com/get-docker/) - Used in the Docker install
-  Creation of a SlackBot in your workspace ([See Notes for a video link](#notes))

## Installation
There are two ways to install this slack bot: With Yarn, and with Docker.
### Yarn
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
6. If everything is properly set up, you should see a console command saying `bot started` and `Bot version 0.0.2 online` in the designated bot spam channel.
### Docker
1. Clone this git repository to a machine runnning docker
2. cd into the cloned folder and run `docker build --tag wpifinbot:0.0.2`
3. run the following command with the taking note of the required fields
```
docker run --name wpifinbot \
 -e BOT_SPAM_CHANNEL=[spam-channel] \
 -e DB_DATABASE=[dbname] \
 -e DB_HOST=[dbhost] \
 -e DB_PASS=[dbpass] \
 -e DB_USER=[dbuser] \
 -e SLACK_OATH_TOKEN=[token] \
 wpifinbot:0.0.2
```
4. If everything is properly set up, you should see a console command saying `bot started` and `Bot version 0.0.2 online` in the designated bot spam channel.

## Notes
-  To properly install nvm and yarn, I recommend watching this [video from Techno Tim](https://www.youtube.com/watch?v=kL8iGErULiw)
-  This slack bot only works when it is running, meaning a dedicated machine is needed.
-  In order to properly set up a slack bot and gain a Slack OATH Token, follow along with this [video from Techno Tim](https://www.youtube.com/watch?v=AajBk59nOgw&t=255s)
-  The bot must be added to the channel you want results in.
-  For the docker install, the spam channel must have the leading pound sign. Example: `BOT_SPAM_CHANNEL=#bot-spam`

## Commands
-  `!numbers` - Gives the current Budget, FR, Mandatory Transfer Allocations, and Number of Active/Inactive Clubs
-  `!recents` - Returns the requests from the past week. (If none, return `No requests in the past seven days!`)

#### Planned Commands
-  `!help` - Gives information on current commands and bot version number
-  `!classes` - Returns the Current Class Structure, Number of Clubs in that Class, and a short description

## Authorship
This bot was created by [Kevin Bimonte](http://www.github.com/kcbimonte).
