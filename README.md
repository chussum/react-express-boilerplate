## Getting started

### Prerequisites

- Node.js 6^
- npm 3^
- yarn 0^

### Usage

1. Install yarn and pm2

    ```
    npm install -g yarn pm2
    ```
2. Rename config file and then edit the file.

    `.envcpy` to `.env`
    ```
    PORT=4000
    DEVPORT=3000
    SECRET_KEY="SECRET_KEY"
    ```
    
3. Run server
    ```
    for development
      $ yarn start:dev
    for production (using pm2)
      $ yarn start:prod
    ```
     
## License

MIT
