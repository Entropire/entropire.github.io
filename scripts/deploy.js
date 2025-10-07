import { execSync } from 'child_process';
import ghpages from 'gh-pages';
import path from 'path';

execSync('npm run build', { stdio: 'inherit' });

const distDir = path.join(process.cwd(), 'dist');

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



