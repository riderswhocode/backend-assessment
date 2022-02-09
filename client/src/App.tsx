import { useState } from 'react';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

import './App.css';

import Start from './components/Start'
import Signup from './components/Signup'
import QHolder from './components/QHolder'

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache()
})

const App = () => {

  const [step, setStep] = useState(2)
  
  const signUp = () => {
    setStep(2)
  }

  return (
    <ApolloProvider client={client}>
      <div className='App'>
        { step === 1 && <Signup onSignup={signUp} /> }
        { step === 2 && <Start onQuizStart={setStep} /> }
        { step === 3 && <QHolder onSetStep={setStep} />}
      </div>
    </ApolloProvider>
    
    
  )
}

export default App;
