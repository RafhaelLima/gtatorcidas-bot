require('dotenv/config');

const Discord = require('discord.js');
const Mongoose = require('mongoose');

const Client = new Discord.Client();

client.on('ready', () => {
    console.log('Conectado')
    client.user.setActivity('GTA Torcidas', {type: 'WATCHING'})
})

if(process.env.DB_URL != undefined){
    Mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

const Ready = require('./controllers/Ready');
const Message = require('./controllers/Message');
const GuildMemberAdd = require('./controllers/GuildMemberAdd');
const ChannelCreate = require('./controllers/ChannelCreate');

Client.on('ready', () => Ready(Client));
Client.on('message', (m) => Message(m, Client));
Client.on('guildMemberAdd', (u) => GuildMemberAdd(u));
Client.on('channelCreate', ChannelCreate);

Client.login(process.env.TOKEN);