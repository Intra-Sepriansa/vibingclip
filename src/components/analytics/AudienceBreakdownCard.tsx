import { AudienceBreakdown } from '../../types/analytics';
import { Card } from '../common/Card';
import { classNames } from '../../utils/classNames';

interface AudienceBreakdownCardProps {
  audience: AudienceBreakdown;
}

export const AudienceBreakdownCard = ({ audience }: AudienceBreakdownCardProps) => {
  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Audience breakdown</h3>
        <span className="text-xs text-slate-400">{audience.primeTime}</span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <SegmentList title="Age" segments={audience.ageGroups} />
        <SegmentList title="Regions" segments={audience.regions} />
        <SegmentList title="Devices" segments={audience.devices} />
      </div>
    </Card>
  );
};

const SegmentList = ({
  title,
  segments
}: {
  title: string;
  segments: AudienceBreakdown['ageGroups'];
}) => (
  <div className="space-y-2">
    <p className="text-sm font-semibold text-white">{title}</p>
    <div className="space-y-2">
      {segments.map((segment) => (
        <div key={segment.label} className="space-y-1">
          <div className="flex items-center justify-between text-sm text-slate-200">
            <span>{segment.label}</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">{segment.value}%</span>
              {segment.delta !== undefined ? (
                <span
                  className={classNames(
                    'text-xs',
                    segment.delta >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  )}
                >
                  {segment.delta >= 0 ? '+' : ''}
                  {segment.delta}%
                </span>
              ) : null}
            </div>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-emerald-400"
              style={{ width: `${segment.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);
