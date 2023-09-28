import axios from "axios"
import { useQuery } from "react-query"
import { Button } from "./ui/button"
import { MoveLeft } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { CountryDataSkeleton } from "./CountryDataSkeleton"

type DataProps = {
  name: {
    common: string
    nativeName: {
      [x: string]: {
        common: string
      }
    }
  }
  flags: {
    png: string
  }
  population: number
  region: string
  subregion: string
  capital: string[]
  tld: string[]
  currencies: {
    [x: string]: {
      name: string
    }
  }
  languages: {
    [x: string]: string
  }
  borders: string[]
}

export function CountryData() {
  const { alphaCode } = useParams()

  const { data, isFetching } = useQuery<DataProps>(
    ['country-data', alphaCode],
    async () => {
      const response = await axios.get(`https://restcountries.com/v3.1/alpha/${alphaCode}?fields=name,flags,population,region,subregion,capital,tld,currencies,languages,borders`)
      return response.data
    },
    {
      staleTime: 1000 * 60, // 1 minuto
    },
  )

  function getNativeName() {
    const names = []

    for (const key in data?.name.nativeName) {
      names.push(data?.name.nativeName[key].common)
    }

    return [...new Set(names)]
  }

  function getCurrencies() {
    const currencies = []

    for (const key in data?.currencies) {
      currencies.push(data?.currencies[key].name)
    }

    return [...new Set(currencies)]
  }

  function getLanguages() {
    const languages = []

    for (const key in data?.languages) {
      languages.push(data?.languages[key])
    }

    return [...new Set(languages)]
  }

  function numberWithCommas(number: number) {
    return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <main className="w-full max-w-[1440px] m-auto px-4 details-break:pb-10">
      <Button asChild variant={"outline"} className="font-semibold mt-4 mb-10 shadow-sm bg-primary w-fit">
        <Link to={'/'} className="flex px-6">
          <MoveLeft className="w-5 h-5 mr-2" />
          Back
        </Link>
      </Button>
      {!isFetching ?
        <div className="flex justify-between gap-5 details-break:flex-col details-break:items-center details-break:gap-12">

          <motion.img
            src={data?.flags.png}
            alt={`${data?.name} flag`}
            className="max-w-[520px] w-full h-fit shadow-strong-thin my-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />

          <div className="max-w-[50%] w-full flex flex-col justify-evenly mx-auto details-break:max-w-none details-break:gap-7">

            <motion.h2
              className="font-bold text-3xl"
              initial={{ opacity: 0, x: '-10%' }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >{data?.name.common}</motion.h2>

            <div className="flex justify-evenly gap-3 details-break:flex-col details-break:gap-6">
              <motion.div
                className="flex flex-col gap-y-2 w-1/2 details-break:w-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-sm"><span className="font-bold">Native Name: </span>{getNativeName().join(', ')}</p>
                <p className="text-sm"><span className="font-bold">Population: </span>{numberWithCommas(data?.population || 0)}</p>
                <p className="text-sm"><span className="font-bold">Region: </span>{data?.region}</p>
                <p className="text-sm"><span className="font-bold">Sub Region: </span>{data?.subregion}</p>
                <p className="text-sm"><span className="font-bold">Capital: </span>{data?.capital.join(', ')}</p>
              </motion.div>
              <motion.div
                className="flex flex-col gap-y-2 w-1/2 details-break:w-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-sm"><span className="font-bold">Top Level Domain: </span>{data?.tld.join(', ')}</p>
                <p className="text-sm"><span className="font-bold">Currencies: </span>{getCurrencies().join(', ')}</p>
                <p className="text-sm"><span className="font-bold">Languages: </span>{getLanguages().join(', ')}</p>
              </motion.div>
            </div>

            <ul className="flex items-center gap-x-3 gap-y-2 flex-wrap">
              <motion.span
                className="text-sm font-bold"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >Borde Countries: </motion.span>
              {data?.borders.map((border, index) => (
                <motion.li key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    ease: [0, 0.71, 0.2, 1.01],
                    duration: 1,
                    delay: index / 5 + 0.2,
                  }}
                >
                  <Button asChild variant={"outline"} className="shadow-sm w-fit text-xs py-1 bg-primary">
                    <Link to={`/${border}`} className="flex w-full h-full">{border}</Link>
                  </Button>
                </motion.li>
              ))}
              {data?.borders.length !== undefined && data?.borders.length === 0 &&
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    ease: [0, 0.71, 0.2, 1.01],
                    duration: 1,
                    delay: 0.4,
                  }}
                >
                  Country has no borders
                </motion.span>
              }
            </ul>

          </div>
        </div>
        : <CountryDataSkeleton />}
    </main>
  )
}