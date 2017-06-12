# market-place-server

The node.js server side for sample market place.

## Prerequisites

1) node.js
2) npm
3) mongodb
4) nodemon ,would be convenient if installed.

## Setup instructions

1) Start the mongod service to host the database locally.Run
    ```sh
    $ sudo service mongod start
    ```
    This should start the mongod service and host the database on the default port ,i.e,27017.
2) Clone and install dependencies:
    ```sh
    $ git clone https://github.com/dart-wakar/market-place-server.git
    $ cd market-place-server
    $ npm install
    ```
3) Run the server locally:
    ```sh
    $ nodemon server.js
    ```
    If everything worked properly the following should be logged on the node terminal.
    ```sh
    Server running on port 3003
    Connected to database!
    ```
