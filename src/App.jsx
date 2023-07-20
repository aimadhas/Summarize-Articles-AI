import Hero from './Compoenents/Hero'
import Demo from './Compoenents/Demo'
import './App.css'

function App() {

  return (
    <main>
      <div className='main'>
        <div className='gradient'></div>
      </div>
      <div className='app'>
        <Hero></Hero>
        <Demo></Demo>

      </div>
    </main>
  )
}

export default App
