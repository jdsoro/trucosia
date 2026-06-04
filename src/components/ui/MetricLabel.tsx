type MetricLabelProps = {
  label: string;
  value: string;
};

export function MetricLabel({ label, value }: MetricLabelProps) {
  return (
    <div className="metric-label">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
