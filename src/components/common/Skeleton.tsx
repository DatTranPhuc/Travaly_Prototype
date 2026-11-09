import React from 'react';

export const SkeletonShimmer: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse bg-slate-200/80 rounded-xl ${className}`} />
);

export const PlaceCardSkeleton: React.FC = () => (
  <div className="flex flex-col bg-white p-3 shadow-md rounded-[28px] border border-slate-100 animate-pulse">
    <div className="w-full h-[210px] rounded-[24px] bg-slate-200/80" />
    <div className="pt-3 pb-1 px-1 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="h-4 w-36 bg-slate-200 rounded-md" />
        <div className="h-4 w-12 bg-slate-200 rounded-md" />
      </div>
      <div className="h-3 w-48 bg-slate-100 rounded-md" />
    </div>
  </div>
);

export const ItineraryItemSkeleton: React.FC = () => (
  <div className="flex items-start gap-3 p-3 rounded-2xl bg-white border border-slate-100 shadow-2xs animate-pulse">
    <div className="w-12 h-12 rounded-xl bg-slate-200 shrink-0" />
    <div className="flex-1 space-y-2 py-1">
      <div className="h-3.5 w-32 bg-slate-200 rounded-md" />
      <div className="h-3 w-20 bg-slate-100 rounded-md" />
    </div>
    <div className="w-12 h-4 bg-slate-100 rounded-md shrink-0" />
  </div>
);

