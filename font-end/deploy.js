const fs = require('fs');
const path = require('path');
const FtpDeploy = require('ftp-deploy');
const ftpDeploy = new FtpDeploy();

const buildPath = path.join(__dirname, 'build'); // Path to your build directory

if (fs.existsSync(buildPath)) {
  const config = {
    user: 'username',
    password: 'password',
    host: 'ftp.naveenportfolio.site',
    port: 21,
    localRoot: buildPath,
    remoteRoot: '/',
    include: ['*', '**/*', '.htaccess'],
    exclude: [],
    deleteRemote: true,
  };

  ftpDeploy.deploy(config, err => {
    if (err) console.error(err);
    else console.log('Deployment successful!');
  });
} else {
  console.log('Build directory not found. Run "npm run build" to generate the build files.');
}
