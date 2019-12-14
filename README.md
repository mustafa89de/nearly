# nearly


### Prerequisites

Make sure you have installed the following prerequisites:
- Node.js - Download & Install Node.js and the npm package manager.
- MongoDB - Download & Install MongoDB and setup a database for this app.

### Environment variables

Set the following environment variables before starting the app:

- `DB_URL`: MongoDB connection string to your database, f.e.: `mongodb://localhost:27017/nearly`
- `MAPBOX_TOKEN`: Your Mapbox API access token
- `JWT_SECRET`: A secret to sign the JSON Web Token for authentication
- `PUBLIC_VAPID_KEY`: Public VAPID authentication key for push notifications 
- `PRIVATE_VAPID_KEY`: Private VAPID authentication key for push notifications
    - [How to generate VAPID keys?](#how-to-generate-vapid-keys)

### Dependencies

To install all needed dependencies run:
```
npm install
```

### Development

To start the app in developer mode run:
```
npm run dev
```

### Production

To build the app for production run:
```
npm run build
```

To start it in production run: 
```
npm start
````

### How to generate VAPID keys

To generate your VAPID key pair run:
``` 
./node_modules/.bin/web-push generate-vapid-keys
```

