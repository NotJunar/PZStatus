# PZStatus


## Description

PZStatus is a Discord bot designed to monitor the status of your Minecraft server. It provides real-time updates on server availability, player counts, and version information.

## Features

- Real-time server status checks
- Player count monitoring
- Version information display
- Customizable configuration
- Notification through Discord embeds

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/NotJunar/PZStatus.git
   cd PZStatus
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the bot:
   - Update `config.yml` with your server details and Discord bot token.

## Usage

- Run the bot:
  ```bash
  node index.js
  ```

- Commands:
  - `!trigger-check` - Manually trigger a server status check.

## Configuration

Example `config.yml`:
```yaml
ipAddress: "localhost"
port: 25565
check_interval: 60
channel_id: "YOUR_CHANNEL_ID"
token: "YOUR_BOT_TOKEN"
```

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-branch
   ```
3. Make your changes.
4. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
5. Push to the branch:
   ```bash
   git push origin feature-branch
   ```
6. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- Author: NotJunar
- [GitHub](https://github.com/NotJunar)
- [Discord](https://dsc.gg/joinjnmc) <!-- Replace with actual Discord link -->

## Acknowledgements

- [discord.js](https://discord.js.org/) - The library used to interact with Discord's API.
- [node-fetch](https://www.npmjs.com/package/node-fetch) - For making HTTP requests to the server status API.

![GitHub stars](https://img.shields.io/github/stars/NotJunar/PZStatus?style=social) ![GitHub forks](https://img.shields.io/github/forks/NotJunar/PZStatus?style=social)
