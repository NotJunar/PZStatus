import { Client, GatewayIntentBits, Events, EmbedBuilder, Colors } from 'discord.js';
import YAML from 'yamljs';
import fs from 'fs';
import fetch from 'node-fetch';

let config;
const configFilePath = 'config.yml';

if (fs.existsSync(configFilePath)) {
    config = YAML.load(configFilePath);
} else {
    config = {
        ipAddress: "localhost",
        port: 25565,
        check_interval: 60,
        channel_id: "YOUR_CHANNEL_ID",
        token: "YOUR_BOT_TOKEN"
    };
    fs.writeFileSync(configFilePath, YAML.stringify(config, 4));
}

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.once(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user.tag}`);
    startServerStatusCheck();
});

function startServerStatusCheck() {
    const { ipAddress, check_interval, channel_id, port } = config;

    setInterval(async () => {
        const status = await checkServerStatus(ipAddress, port);
        const channel = client.channels.cache.get(channel_id);

        if (channel) {
            const embed = new EmbedBuilder()
                .setColor(status.online ? Colors.Green : Colors.Red)
                .setTitle(`Server Status: ${status.online ? 'Online' : 'Offline'}`)
                .addFields(
                    { name: 'Server IP', value: ipAddress, inline: true },
                    { name: 'Version', value: status.version || 'Unknown', inline: true },
                    { name: 'Connected', value: `${status.playersOnline || 0} players`, inline: true },
                    { name: 'Maximum', value: `${status.maxPlayers || 0} players`, inline: true },
                    { name: 'Latency', value: status.latency ? `${status.latency} ms` : 'N/A', inline: true }
                );

            if (status.online) {
                channel.send({ embeds: [embed] });
            } else {
                embed.setDescription('The server is currently offline.');
                channel.send({ embeds: [embed] });
            }
        }
    }, check_interval * 1000);
}

async function checkServerStatus(ip, port) {
    try {
        const res = await fetch(`https://api.mcsrvstat.us/3/${ip}${port ? `?port=${port}` : ''}`);
        
        if (!res.ok) {
            return {
                online: false,
                message: "Looks like your server is not reachable... Please verify it's online and it isn't blocking access!"
            };
        }

        const body = await res.json();
        
        return {
            online: body.online,
            version: body.version || 'Unknown',
            playersOnline: body.players?.online || 0,
            maxPlayers: body.players?.max || 0,
            latency: body.debug?.ping || null
        };
    } catch (error) {
        console.error('Error fetching server status:', error);
        return { online: false };
    }
}

client.on(Events.MessageCreate, message => {
    if (message.content === '!trigger-check') {
        const { ipAddress, port } = config;
        checkServerStatus(ipAddress, port).then(status => {
            const embed = new EmbedBuilder()
                .setColor(status.online ? Colors.Green : Colors.Red)
                .setTitle(`Server Status: ${status.online ? 'Online' : 'Offline'}`)
                .addFields(
                    { name: 'Server IP', value: ipAddress, inline: true },
                    { name: 'Version', value: status.version || 'Unknown', inline: true },
                    { name: 'Connected', value: `${status.playersOnline || 0} players`, inline: true },
                    { name: 'Maximum', value: `${status.maxPlayers || 0} players`, inline: true },
                    { name: 'Latency', value: status.latency ? `${status.latency} ms` : 'N/A', inline: true }
                );

            message.channel.send({ embeds: [embed] });
        });
    }
});

client.login(config.token);
