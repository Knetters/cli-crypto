# cli-Crypto
<img width="1680" alt="Screenshot 2024-04-03 at 09 39 59" src="https://github.com/Knetters/cli-crypto/assets/60781257/b8f4be42-24a7-4633-9c35-f9144528e3bb">
<img width="1920" alt="Screenshot 2024-05-15 at 11 54 19" src="https://github.com/Knetters/cli-crypto/assets/60781257/849131e9-35cf-49aa-a196-bb9480feef58">
<br>
<br>
cli-Crypto is a command-line interface (CLI) application built using SvelteKit with TypeScript. It integrates Google Sign-In for authentication, Supabase for database operations, and the Coinbase API for accessing cryptocurrency data. With cli-Crypto, users can manage their cryptocurrency portfolios through simple commands.

## Features
Add Coins: Add coins to your portfolio with the add command. Provide the amount and the coin symbol.
Remove Coins: Remove coins from your portfolio using the remove command. Specify the coin symbol.
Clear History: Clear your transaction history with the clear command.
Reset Portfolio: Reset your entire portfolio and transaction history with the reset command.

## Commands
### add
Add coins to your portfolio.

Syntax: add <amount> <coin>

Example: add 10 BTC

### remove
Remove coins from your portfolio.

Syntax: remove <coin>

Example: remove BTC

### clear
Clear your transaction history.

Syntax: clear

### reset
Reset your entire portfolio and transaction history. You will be prompted for confirmation.

Syntax: reset

### help
Display a list of available commands.

Syntax: help

## Usage
1. Clone the repository.
1. Install dependencies using npm install.
1. Start the application using npm run dev.
1. Sign in with your Google account.
1. Use the listed commands to manage your cryptocurrency portfolio.

## Technologies Used
- SvelteKit
- TypeScript
- Google Sign-In
- Supabase
- Coinbase API

## Author
Thomas Scheepers

## License
This project is licensed under the MIT License.
