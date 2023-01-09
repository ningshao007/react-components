import React from 'react';

export interface progressProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
	type?: 'line' | 'circle';
	percent?: number;
	size?: 'small' | 'medium' | 'large';
	status?: 'active' | 'exception';
	children?: React.ReactNode;
	style?: React.CSSProperties;
}

const Progress = (props: progressProps) => {
	const { className, percent = 0, status, type = 'line', children, style, ...others } = props;
	let processColor = 'blue';

	if (status === 'exception') {
		processColor = '#ff4d4f';
	}

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				gap: 8,
			}}>
			<div style={{ background: '#0000000a', borderRadius: 100, width: '100%' }}>
				<div style={{ background: processColor, width: `${percent}%`, height: 8, borderRadius: 100, transition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)' }}></div>
			</div>
			<div>{percent}%</div>
		</div>
	);
};

export default Progress;
