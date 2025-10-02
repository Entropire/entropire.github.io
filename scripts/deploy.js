import { execSync } from 'child_process';
import ghpages from 'gh-pages';
import fs from 'fs';
import path from 'path';

execSync('npm run build', { stdio: 'inherit' });

const distDir = path.join(process.cwd(), 'dist');
const indexFile = path.join(distDir, 'index.html');
const notFoundFile = path.join(distDir, '404.html');

if (fs.existsSync(indexFile)) {
  fs.copyFileSync(indexFile, notFoundFile);
  console.log('Created 404.html from index.html');
} else {
  console.error('index.html not found in dist');
  process.exit(1);
}

ghpages.publish(
  'dist',
  {
    branch: 'live',
    repo: 'git@github.com:entropire/Portfolio.git',
    message: 'Deploy via deploy.js',
    dotfiles: true,
    cname: 'quintenduijster.nl',
  },
  (err) => {
    if (err) {
      console.error('Deployment failed:', err);
      process.exit(1);
    }
    console.log('Deployed successfully!');
  }
);



