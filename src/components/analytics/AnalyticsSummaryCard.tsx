import { SummaryMetric } from '../../types/analytics';
import { Card } from '../common/Card';
import { classNames } from '../../utils/classNames';

interface AnalyticsSummaryCardProps {
  metric: SummaryMetric;
}

export const AnalyticsSummaryCard = ({ metric }: AnalyticsSummaryCardProps) => {
  const { label, value, delta, helperText } = metric;
  const deltaPositive = delta !== undefined ? delta >= 0 : true;

  return (
    <Card className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">{label}</p>
        {delta !== undefined ? (
          <span
            className={classNames(
              'text-xs font-semibold',
              deltaPositive ? 'text-emerald-400' : 'text-rose-400'
            )}
          >
            {deltaPositive ? '+' : ''}
            {delta}%
          </span>
        ) : null}
      </div>
      <div className="text-2xl font-semibold text-white">{value}</div>
      {helperText ? <p className="text-xs text-slate-500">{helperText}</p> : null}
    </Card>
  );
};
