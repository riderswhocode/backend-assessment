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

  const [step, setStep] = useState(1)
  const [userId, setUserId] = useState('')

  return (
    <ApolloProvider client={client}>
      <div className='App'>
        {/* { step === 1 && <Signup onSignup={signUp} onQuizStart={setStep} /> } */}
        {/* { step === 2 && <Start onQuizStart={setStep} /> } */}
        { step === 1 && <Signup onQuizStart={setStep} onUserId={setUserId} /> }
        { step === 2 && <QHolder onSetStep={setStep} onCurrentUser={userId} />}
        { step === 3 && <Start onQuizStart={setStep} />}
      </div>
    </ApolloProvider>
    
    
  )
}

export default App;
