import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const Card = () => {
  return (
    <div className="border rounded p-6 bg-white shadow-sm flex">
      <div className=" flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
  );
};

const SkeletonCard = () => {
  return (
    <div className="flex flex-col gap-y-2 m-8">
      <Card />
      <Card />
    </div>
  );
};

export default SkeletonCard;
