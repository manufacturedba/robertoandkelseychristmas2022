import hapi from '@hapi/hapi';
import inert from '@hapi/inert';
import path from 'path';
import { fileURLToPath } from 'url';

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

const PORT = process.env.PORT || 8000;

(async () => {
  const server = hapi.server({
    port: PORT,
    host: '0.0.0.0',
    routes: {
      files: {
        relativeTo: path.join(dirName, 'app'),
      },
    },
  });

  await server.register(inert);

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '.',
        redirectToSlash: false,
      },
    },
  });

  await server.start();

  console.log(`Server running on ${PORT}`);
})();