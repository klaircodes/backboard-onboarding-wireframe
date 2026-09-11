// Hackathon step 3 header (slides 15–17): credits confirmed, team size shown.
export default function CreditsBanner({ team = 1 }) {
  return (
    <div className="credits">
      <strong>You are in. Hackathon credits are on your account.</strong>
      <span>Team of {team} · every member is covered</span>
    </div>
  )
}
