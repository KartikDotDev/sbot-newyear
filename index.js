const sbot = require('discord.js-selfbot-v13')
require('dotenv').config();
const TOKEN = process.env.TOKEN

const client = new sbot.Client()

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);
    
    try {
        const relationships = client.relationships.friendCache;
        console.log('Total relationships found:', relationships.size);

        for (const friend of relationships.values()) {
            if (!friend) {
                console.log('Encountered undefined friend, skipping...');
                continue;
            }

            try {   
                console.log(`Processing friend:`, friend.id);
                
                const dmChannel = await friend.createDM();
                
                await dmChannel.send("Happy New Year! 🎉🎊");
        
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                console.log(`Sent message to ${friend.username} - ${friend.displayName} - ${friend.id}`);
            } catch (error) {
                console.error(`Failed to send message to friend ${friend.id}:`, error);
            }
        }
        
        console.log('Finished sending messages to all friends!');
    } catch (error) {
        console.error('An error occurred:', error);
    }
});

client.login(TOKEN)

