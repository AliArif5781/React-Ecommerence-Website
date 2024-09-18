const SkeletonDetail = () => {
  return (
    <div className="flex justify-center items-center h-[100vh] w-full max-w-6xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-10 w-full">
        {/* Image Skeleton */}
        <div className="lg:flex-1 flex justify-center lg:justify-end pt-[400px] lg:pt-0">
          <div className="object-contain w-full h-64 sm:h-80 md:h-96 lg:h-[400px] bg-gray-200 rounded-lg animate-pulse"></div>
        </div>

        {/* Content Skeleton */}
        <div className="text-center lg:text-left lg:flex-1 pt-[100px]">
          {/* Title Skeleton */}
          <div className="h-8 sm:h-10 bg-gray-200 mb-4 rounded animate-pulse w-full mx-auto lg:mx-0"></div>
          <div className="h-8 sm:h-10 bg-gray-200 mb-4 rounded animate-pulse w-3/4 lg:w-1/2 mx-auto lg:mx-0"></div>

          {/* Description Skeleton */}
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full mx-auto lg:mx-0"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full mx-auto lg:mx-0"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full mx-auto lg:mx-0"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full mx-auto lg:mx-0"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full mx-auto lg:mx-0"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full mx-auto lg:mx-0"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mx-auto lg:mx-0"></div>
          </div>

          {/* Price Skeleton */}
          <div className="h-6 bg-gray-200 rounded animate-pulse my-6 w-1/4 mx-auto lg:mx-0"></div>

          {/* Buttons Skeleton */}
          <div className="flex flex-col gap-4 w-full max-w-md lg:max-w-lg mx-auto">
            <div className="h-12 bg-gray-200 rounded animate-pulse w-full"></div>
            <div className="h-12 bg-gray-200 rounded animate-pulse w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonDetail;
