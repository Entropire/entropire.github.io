import { execSync } from 'child_process';
import ghpages from 'gh-pages';

execSync('npm run build', { stdio: 'inherit' });

ghpages.publish('dist', {
  branch: 'live',
  repo: 'git@github.com:entropire/Portfolio.git',
  message: 'Deploy via deploy.js',
  dotfiles: true,
  cname: 'entropire.com',
}, (err) => {
  if (err) {
    console.error('Deployment failed:', err);
    process.exit(1);
  }
  console.log('Deployed successfully!');
});
