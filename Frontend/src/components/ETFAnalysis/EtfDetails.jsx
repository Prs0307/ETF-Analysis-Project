import { useParams } from "react-router-dom"

function EtfDetails() {
  const {id}=useParams()
  return (
    <div>
      <div className="w-full bg-primary h-96 text-white">
        <h1 className="text-3xl">ETF Details For : {id}</h1>
      </div>
    </div>
  )
}

export default EtfDetails
