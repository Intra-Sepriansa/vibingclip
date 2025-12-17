import { useMemo, useState } from 'react';
import { PlatformPerformance } from '../../types/analytics';
import { Card } from '../common/Card';
import { classNames } from '../../utils/classNames';

interface PlatformPerformanceTabsProps {
  platforms: PlatformPerformance[];
}

const platformLabels: Record<string, string> = {
  youtube: 'YouTube',
  tiktok: 'TikTok',
  instagram: 'Instagram',
  other: 'Other'
};

export const PlatformPerformanceTabs = ({ platforms }: PlatformPerformanceTabsProps) => {
  const [selected, setSelected] = useState(platforms[0]?.platform ?? 'youtube');

  const current = useMemo(
    () => platforms.find((p) => p.platform === selected) ?? platforms[0],
    [platforms, selected]
  );

  if (!current) {
    return null;
  }

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Platform performance</h3>
        <div className="inline-flex rounded-lg border border-slate-800 bg-slate-900 p-1 text-sm">
          {platforms.map((platform) => (
            <button
              key={platform.platform}
              onClick={() => setSelected(platform.platform)}
              className={classNames(
                'rounded-md px-3 py-1 capitalize transition-colors',
                selected === platform.platform
                  ? 'bg-gradient-to-r from-violet-500 to-emerald-400 text-slate-900'
                  : 'text-slate-300 hover:bg-slate-800'
              )}
            >
              {platformLabels[platform.platform] ?? platform.platform}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Stat label="Views" value={current.views.toLocaleString()} />
        <Stat label="Watch time" value={`${current.watchTimeHours.toLocaleString()} hrs`} />
        <Stat label="Avg retention" value={`${current.avgRetention}%`} />
        <Stat label="CTR" value={`${current.clickThroughRate}%`} />
        <Stat label="Conversion" value={`${current.conversionRate}%`} />
      </div>
    </Card>
  );
};

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2">
    <p className="text-xs text-slate-400">{label}</p>
    <p className="text-lg font-semibold text-white">{value}</p>
  </div>
);
