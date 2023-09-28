import { Skeleton } from "./ui/skeleton";

export function CountryDataSkeleton() {

  return (
    <div className="flex justify-between gap-5 details-break:flex-col details-break:items-center details-break:gap-12">
      <Skeleton className="max-w-[520px] w-full h-[340px] my-auto bg-gray-200 dark:bg-gray-700" />
      <div className="max-w-[50%] w-full flex flex-col justify-evenly mx-auto details-break:max-w-none details-break:gap-7">
        <Skeleton className="w-72 h-8 bg-gray-200 dark:bg-gray-700" />
        <div className="flex justify-evenly gap-3 details-break:flex-col details-break:gap-6">
          <div className="flex flex-col gap-y-2 w-1/2 details-break:w-full">
            <Skeleton className="w-40 h-4 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="w-40 h-4 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="w-40 h-4 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="w-40 h-4 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="w-40 h-4 bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="flex flex-col gap-y-2 w-1/2 details-break:w-full">
            <Skeleton className="w-40 h-4 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="w-40 h-4 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="w-40 h-4 bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
        <div className="flex items-center gap-x-3 gap-y-2 flex-wrap">
          <Skeleton className="w-40 h-4 mr-1 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="w-14 h-6 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="w-14 h-6 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="w-14 h-6 bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  )
}