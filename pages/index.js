import Abc from '@/components/abc'
import Sectorentry from '@/components/Sectorentry'
import { useEffect, useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import TeamForm from '@/components/teamform'
import Cities from '@/components/Cities'

export default function Home() {

  const { data: session, status } = useSession()
  const [cityName, setCityName] = useState("DELHI")
  const [industryName, setIndustryName] = useState("FASHION")

  const [hasTeamDetails, setHasTeamDetails] = useState(true)
  const [currentRound, setCurrentRound] = useState("Round 1")

  const [stage, setStage] = useState("cities")

  const teamName = "Asdf";
  const teamNumber = "1234";
  const leaderEmail = "abc@vitstudent.ac.in";

  return (
    <div>
      {session ? <div>
        {
          hasTeamDetails ?
            <div id="teamDetailsFilled" class="teamDetailsFilled">
              {/* <p>Logged in, {session.user.name}</p> */}
              <p class="visionQuest">Vision Quest</p>
              {/* {currentPage} */}
              <div class="info">
              <span class="first">TeamName: {teamName}</span>
              <span class="second">TeamNumber: {teamNumber}</span>
              <span class="third">LeaderEmail: {leaderEmail}</span>
              </div>
              <span class="round">{currentRound}</span>
              <span class="log"><button  onClick={() => signOut()}>Log Out</button></span>
              {/* <button onClick={() => { NextButtonClick() }}>Next</button> */}
            </div>
            :
            <div id="teamDetailsNotFilled" class="teamDetailsNotFilled">
              <TeamForm onNext={() => setHasTeamDetails(true)} />
            </div>
        }
      </div>
        :
        <div id="getStarted" class="getStarted">
        <button onClick={() => signIn('google')}>Get Started</button>
        </div>
      }
    </div>

  )
}
