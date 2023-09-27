import axios from "axios"
import { useQuery } from "react-query"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { CountriesListSkeleton } from "./CountriesListSkeleton"

type DataProps = {
  name: {
    common: string
  }
  capital: string[]
  population: number
  flags: {
    png: string
  }
  cca3: string
  region: string
}

type Props = {
  search: string
  region: string
}

export function CountriesList({ search, region }: Props) {
  const [renderQnt, setRenderQnt] = useState<number>(12)

  const { data, isFetching } = useQuery<DataProps[]>(
    ['all-countries'],
    async () => {
      const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags,cca3')
      return response.data
    },
    {
      staleTime: 1000 * 60, // 1 minuto
    },
  )

  function dataFilter() {
    const searchFilter = search.length > 0
      ? data?.filter((country) => country.name.common.toLowerCase().includes(search.toLowerCase()))
      : data

    const regionFilter = region.length > 0
      ? searchFilter?.filter((country) => country.region.toLowerCase().includes(region.toLowerCase()))
      : searchFilter

    return regionFilter || []
  }

  const filteredData = dataFilter().slice(0, renderQnt)

  function numberWithCommas(number: number) {
    return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
        setRenderQnt(current => current + 12)
      }
    })
  }, [])

  return (
    <ul className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-12 justify-items-center pb-32 mt-12">
      {!isFetching ? filteredData?.map((country, index) => (
        <motion.li
          key={index}
          className="w-[275px] h-[325px] rounded-md shadow overflow-hidden bg-primary mobile-break:w-[250px]"
          initial="hidden"
          animate="visible"
          transition={{
            ease: [0, 0.71, 0.2, 1.01],
            duration: 1,
            // delay: index / 20,
            delay: 0.3,
          }}
          variants={{
            visible: { opacity: 1, scale: 1 },
            hidden: { opacity: 0, scale: 0 },
          }}>
          <Link to={`${country.cca3}`} className="flex flex-col w-full h-full hover:scale-110 transition-transform">
            <img src={country.flags.png} alt={`${country.name} flag`} className="w-full h-[150px] object-cover shadow" />
            <div className="p-6">
              <h2 className="font-bold text-xl mb-3">{country.name.common}</h2>
              <p className="text-sm">
                <span className="font-bold">Population: </span>
                {numberWithCommas(country.population)}
              </p>
              <p className="text-sm">
                <span className="font-bold">Region: </span>
                {country.region}
              </p>
              <p className="text-sm">
                <span className="font-bold">Capital: </span>
                {country.capital[0]}
              </p>
            </div>
          </Link>
        </motion.li>
      )) : <CountriesListSkeleton />}
    </ul>
  )
}