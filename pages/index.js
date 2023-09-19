import SectorEntry from '@/components/SectorEntry'
import { useEffect, useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import TeamDetails from '@/components/TeamDetails'
import Cities from '@/components/Cities'
import Waiting from '@/components/Waiting'
import End from '@/components/End'
import InvestorInfo from '@/components/InvestorInfo'
import InvestmentInfo from '@/components/InverstmentInfo'
import '@/styles/index.css'

export default function Home() {

  const backendUrl = process.env.NEXT_PUBLIC_SERVER

  const { data: session, status } = useSession()

  const [cityName, setCityName] = useState("MUMBAI")
  const [industryName, setIndustryName] = useState("PETROCHEMICAL")

  const [hasTeamDetails, setHasTeamDetails] = useState(true)
  const [currentRound, setCurrentRound] = useState("Round 1")

  const [stage, setStage] = useState("cities")
  const [vps, setVps] = useState(15000)

  const teamName = "Asdf";
  const teamNumber = "1234";
  const leaderName = "Arde";

  useEffect(() => {
    console.log(session)
    // initial fetch
    if (session) {
      console.log("fetching")
      fetch(backendUrl + "/team/getTeam/", {
        content: "application/json",
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessTokenBackend}`,
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
        });
    }
  }, [session])

  return (
    <div className='indexPage'>
      {session ? <div>
        {
          hasTeamDetails ?
            <div id="teamDetailsFilled" className="teamDetailsFilled">
              {/* <p>Logged in, {session.user.name}</p> */}
              <div id="nav" className="navBar">
                <img src="vg.svg" alt="visionQuestLogo" className="image"></img>
                <img src="ecellLogo.png" alt="visionQuestLogo" className="image"></img>
              </div>
              <div id="header" className="header">
        
                <div className="first">TeamName: {teamName}</div>
                <div className="second">TeamNumber: {teamNumber}</div>
                <div className="third">Vps: {vps}</div>
                <div className="fourth">LeaderName: {leaderName}</div>
              
              </div>

              <div id="Content">
                {stage == "cities" && <Cities onProceed={() => { setStage("sectors") }} />}
                {stage == "sectors" && <SectorEntry cityName={cityName} industryName={industryName} setVps={setVps} vps={vps} onProceed={() => { setStage("wait") }} />}
                {stage == "wait" && <Waiting vps={vps} onProceed={() => { setStage("investorsInfo") }} />}
                {stage == "investorsInfo" && <InvestorInfo onProceed={() => { setStage("investmentInfo") }} />}
                {stage == "investmentInfo" && <InvestmentInfo onProceed={() => { setStage("end") }} />}
                {stage == "end" && <End />}
              </div>

              <div className="log"><button onClick={() => signOut()}>Log Out</button></div>
            </div>
            :
            <div id="teamDetailsNotFilled" className="teamDetailsNotFilled">
              <TeamDetails onNext={() => setHasTeamDetails(true)} />
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
