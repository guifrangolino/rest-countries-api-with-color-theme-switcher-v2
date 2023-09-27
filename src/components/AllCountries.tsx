import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { CountriesList } from "./CountriesList";
import { useState } from "react"

export function AllCountries() {
  const [search, setSearch] = useState<string>("")
  const [region, setRegion] = useState<string>("")

  return (
    <main className="w-full max-w-[1440px] m-auto px-4">

      <div className="my-6 flex justify-between flex-wrap mobile-break:gap-5">
        <div className="relative max-w-sm w-full">
          <Search className="absolute top-0 bottom-0 w-4 h-4 my-auto left-4" />
          <Input
            type="text"
            placeholder="Search for a country..."
            className="pl-12 pr-4 text-sm py-5 shadow bg-primary"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Select onValueChange={(e) => setRegion(e)}>
          <SelectTrigger className="w-[180px] shadow py-5 bg-primary">
            <SelectValue placeholder="Filter by Region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="africa">Africa</SelectItem>
            <SelectItem value="america">America</SelectItem>
            <SelectItem value="asia">Asia</SelectItem>
            <SelectItem value="europe">Europe</SelectItem>
            <SelectItem value="oceania">Oceania</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <CountriesList search={search} region={region} />
    </main>
  )
}