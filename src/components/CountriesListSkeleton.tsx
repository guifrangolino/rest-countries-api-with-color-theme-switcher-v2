import { Skeleton } from "./ui/skeleton";

export function CountriesListSkeleton() {

  return (
    <>
      {Array.from({ length: 12 }, (_, i) => i + 1).map((_, index) => (
        <li key={index}>
          <div className="w-[275px] h-[325px] rounded-md shadow overflow-hidden bg-primary" >
            <Skeleton className="w-full h-[150px] object-cover shadow bg-gray-200 dark:bg-gray-700" />
            <div className="p-6">
              <Skeleton className="w-52 h-6 mb-3 bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="w-36 h-4 mb-2 bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="w-36 h-4 mb-2 bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="w-36 h-4 mb-2 bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        </li>
      ))}
    </>
  )
}