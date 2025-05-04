import { config } from 'dotenv';
config();

if (typeof process === 'undefined') {
  global.process = {
    env: {
      NODE_ENV: 'development',
      REACT_APP_API_BASE_URL: 'http://localhost:5002',
      REACT_APP_STRIPE_PUBLIC_KEY: 'your_key_here'
    }
  };
}