const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const path = require( 'path' );
const PORT = process.env.PORT || 4000;

const app = express();

app.use( express.static( path.join( __dirname, 'client/dist/voice-recorder' ) ) );
app.use( bodyParser.json() );

app.get( '/api', ( req, res ) => {
  res.json( { message: 'Novelty EmsWebPortal is up running.' } );
} );

app.get( '*', ( req, res ) => {
  res.sendFile( path.join( __dirname + '/client/dist/voice-recorder/index.html' ) );
} );

app.listen( PORT, () => console.log( `server started at ${PORT}` ) );
