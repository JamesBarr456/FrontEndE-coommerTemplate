import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

import { Skeleton } from "../ui/skeleton";

export const GridProductsSkeleton = () => {
  return (
    <section className="flex flex-col  items-center px-3 gap-6 w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 w-full">
        {[...Array(10)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </section>
  );
};

function SkeletonCard() {
  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden">
      <CardHeader className="grid grid-cols-2 items-center  w-full p-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-6 w-full rounded-md" />
      </CardHeader>
      <CardContent className="p-3">
        <Skeleton className="h-48 w-full rounded-md" />
      </CardContent>
      <CardFooter className="flex w-full flex-col items-start gap-3 p-3 mb-3">
        <Skeleton className="h-10 w-full" />
        <div className="flex w-full justify-between ">
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>
      </CardFooter>
    </Card>
  );
}
