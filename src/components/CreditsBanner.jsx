export default function CreditsBanner({ team = 3 }) {
  return (
    <div className="credits enter">
      <span><b>You are in.</b> Hackathon credits are on your account.</span>
      <span className="team-n">Team of {team} · every member is covered</span>
    </div>
  )
}
