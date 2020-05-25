# Node.js developer Air Quality API

#### Warning! Your ip might not be on Cloud's white list. To use local db change branch to mamajjo_local

To enable local db you have to install MongoDB

> https://docs.mongodb.com/manual/installation/



# Steps to take to run the app

## Download node.js if not present on your computer

> https://nodejs.org/en/

## Open root directory

## Install install missing dependencies

```
yarn install
```
or
```
npm install
```

then 
```
yarn start
```
or 
```
npm start
```

Application should start on port 3000. It connects to mongodb database.

Applications daily updates data at 10:10pm.

If there is data in database you can query it using following:
(under condition that application runs on 3000 port)

To get all stations from MongoDB
> http://localhost:3000/station/findAll

To get latest sensor data for station with {stationID}
> http://localhost:3000/sensors/{stationID}

To get averaged sensor data for station with {stationID} from {date} (yyyy-mm-dd)
> http://localhost:3000/sensors/{stationID}/date/{date}

To get averaged sensor data for station with {stationID} from {date} (yyyy-mm-dd) to {date} (yyyy-mm-dd)
> http://localhost:3000/sensors/{stationID}/from/{date}/to/{date}

### Tests

```
yarn test
```
or
```
npm run test
```
