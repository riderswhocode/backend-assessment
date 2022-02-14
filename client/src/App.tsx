import { useState } from 'react';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

import './App.css';

import End from './components/End'
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
        { step === 1 && <Signup onQuizStart={setStep} onUserId={setUserId} onClient={client} /> }
        { step === 2 && <QHolder onSetStep={setStep} onCurrentUser={userId} />}
        { step === 3 && <End onCurUserId={userId} />}
      </div>
    </ApolloProvider>
    
    
  )
}

export default App;
