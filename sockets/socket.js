const {io} = require('../index');

const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand( new Band('Queen'));
bands.addBand( new Band('Mago de Oz'));
bands.addBand( new Band('Metallica'));
bands.addBand( new Band('Debler'));

// Mensajes de sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', ( payload )=>{
        console.log('Mensaje recivido!', payload);

        io.emit('mensaje', {admin: 'Mensje de servidor'})
    })

    client.on('vote-band', (payload) => {
        
        bands.voteBand( payload.id );
        io.emit('active-bands', bands.getBands());
    })

    client.on('add-band', (payload) => {
        
        bands.addBand( new Band(payload.name) );
        io.emit('active-bands', bands.getBands());
    })

    client.on('delete-band', (payload) => {
        
        bands.deleteBand(payload.id)
        io.emit('active-bands', bands.getBands());
    })

    // client.on('emitir-mensaje', ( payload )=>{
    //     console.log(payload);
    //     client.broadcast.emit('nuevo-mensaje', {admin: payload}); // emite a todos menos el que emitió
    // })





});