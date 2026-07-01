const fs = require('fs');
const path = require('path');

// Read .env file manually
const envPath = path.join(__dirname, '.env');
let envVars = {};

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split(/\r?\n/).forEach(line => {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const index = trimmedLine.indexOf('=');
      if (index !== -1) {
        const key = trimmedLine.substring(0, index).trim();
        const val = trimmedLine.substring(index + 1).trim().replace(/^['"]|['"]$/g, '');
        envVars[key] = val;
      }
    }
  });
}

const envDirectory = path.join(__dirname, 'src', 'environments');
if (!fs.existsSync(envDirectory)) {
  fs.mkdirSync(envDirectory, { recursive: true });
}

const targetPath = path.join(envDirectory, 'environment.ts');
const targetPathDev = path.join(envDirectory, 'environment.development.ts');

const apiKey = envVars['NEWS_API_KEY'] || '';
const apiUrl = envVars['NEWS_API_URL'] || 'https://newsapi.org/v2/';

const envConfigFile = `export const environment = {
  production: true,
  apiKey: '${apiKey}',
  apiUrl: '${apiUrl}'
};
`;

const envConfigFileDev = `export const environment = {
  production: false,
  apiKey: '${apiKey}',
  apiUrl: '${apiUrl}'
};
`;

fs.writeFileSync(targetPath, envConfigFile);
fs.writeFileSync(targetPathDev, envConfigFileDev);

console.log('Angular environment files generated successfully.');
