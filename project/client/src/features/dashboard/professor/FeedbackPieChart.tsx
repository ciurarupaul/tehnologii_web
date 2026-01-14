import styles from './FeedbackPieChart.module.scss';

type FeedbackData = {
  label: string
  count: number
  color: string
};

type FeedbackPieChartProps = {
  data: FeedbackData[]
};

export default function FeedbackPieChart({ data }: FeedbackPieChartProps) {
  const total = data.reduce((sum, item) => sum + item.count, 0);

  if (total === 0) {
    return (
      <div className={styles.chart}>
        <p className={styles.chart__empty}>No feedback data available</p>
      </div>
    );
  }

  const size = 200;
  const center = size / 2;
  const radius = size / 2 - 10;

  let currentAngle = -90; // Start at top

  const slices = data.map((item) => {
    const percentage = (item.count / total) * 100;
    const sliceAngle = (percentage / 100) * 360;

    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;

    // Convert to radians
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    // Calculate arc points
    const x1 = center + radius * Math.cos(startRad);
    const y1 = center + radius * Math.sin(startRad);
    const x2 = center + radius * Math.cos(endRad);
    const y2 = center + radius * Math.sin(endRad);

    const largeArcFlag = sliceAngle > 180 ? 1 : 0;

    const pathData = [
      `M ${center} ${center}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z',
    ].join(' ');

    currentAngle = endAngle;

    return {
      path: pathData,
      color: item.color,
      label: item.label,
      count: item.count,
      percentage: percentage.toFixed(1),
    };
  });

  return (
    <div className={styles.chart}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className={styles.chart__svg}
      >
        {slices.map((slice, index) => (
          <path
            key={index}
            d={slice.path}
            fill={slice.color}
            className={styles.chart__slice}
          />
        ))}
      </svg>

      <div className={styles.chart__legend}>
        {slices.map((slice, index) => (
          <div key={index} className={styles.chart__legend__item}>
            <span
              className={styles.chart__legend__color}
              style={{ backgroundColor: slice.color }}
            />
            <span className={styles.chart__legend__label}>
              {slice.label}
              :
              {' '}
              {slice.count}
              {' '}
              (
              {slice.percentage}
              %)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
