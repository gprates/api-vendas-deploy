import server from './server';
import typeorm from 'typeorm';

const startServer = async () => {
    const app = await server();

    app.listen(3232, () => {
        console.log('Server started on port 3232!');
    });
};

startServer();