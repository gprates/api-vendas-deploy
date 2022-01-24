import server from './server';

const startServer = async () => {
    const app = await server();

    app.listen(3232, () => {
        console.log('Server started on port 3232');
    });
};

startServer();