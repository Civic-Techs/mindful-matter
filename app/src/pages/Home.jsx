import './Home.css'
import { allChallenges } from '../adapters/challengesFetch'

export default function HomePage() {

    return (
      <>
      <button onClick={() => window.location.href = '/login'}>Join Today</button>
      <div>
        <h3>What is Mindful Motion?</h3>
        <p>Mindful Motion is a platform to maximize teenagers’ productivity and ultimately boost their ambition by creating a web app that allows for users to continue to get their dopamine rush obtained from scrolling on an app, but control the content being fed to them by only hosting projects and challenges to our users.</p>
      </div>

      
        
      </>
      )}