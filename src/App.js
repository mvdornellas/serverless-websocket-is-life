import React from 'react';
import './App.css';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
Amplify.configure(awsconfig);

function App() {
  return (

      <AmplifySignOut />
  
  );
}

export default withAuthenticator(App);
