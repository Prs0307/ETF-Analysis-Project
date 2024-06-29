import { useParams } from "react-router-dom"
import Table from "./Table"
function EtfDetails() {
  const {id}=useParams() //{ } object with 65
  return (
    <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-4">
    <div className="w-full bg-white text-primary">
        <h1 className="text-2xl font-bold pt-4 mt-10 text-justify selection:none ml-2">ETF / {id}</h1>
      </div>
      <section className="mt-6" id="table">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <Table/>
        </div>
        <div className="text-center text-primary text-4xl p-10 font-semibold justify-center">
          ...
        </div>
      </section>
      <section id="filterData" className="mt-6">

      </section>
    </div>
  )

}

export default EtfDetails
