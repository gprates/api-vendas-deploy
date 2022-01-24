import server from './server';

const startServer = async () => {
    const app = await server();

    app.listen(3333, () => {
        console.log('Server started on port 3333');
    });
};

startServer();