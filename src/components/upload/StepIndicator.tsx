interface StepIndicatorProps {
  currentStep: number;
}

const steps = [
  { label: 'Upload / Paste Link', number: 1 },
  { label: 'AI Analyze', number: 2 },
  { label: 'Edit & Export', number: 3 }
];

export const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = currentStep >= step.number;
          return (
            <div key={step.number} className="flex flex-1 items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold ${
                  isActive
                    ? 'border-emerald-400 bg-emerald-400/10 text-emerald-200'
                    : 'border-slate-700 bg-slate-900 text-slate-400'
                }`}
              >
                {step.number}
              </div>
              <div className="ml-3 text-sm text-slate-200">{step.label}</div>
              {index < steps.length - 1 && (
                <div className="mx-3 h-[2px] flex-1 rounded-full bg-gradient-to-r from-violet-500 to-emerald-400" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
