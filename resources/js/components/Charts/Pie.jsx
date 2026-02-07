import React, { useEffect, useRef } from "react"

const Pie = ({ cutout = "60%", size = "1em", ...props }) => {
	const ctx = useRef()

	var delayed

	const config = {
		type: "pie",
		options: {
			radius: "100%",
			animation: {
				onComplete: () => {
					delayed = true
				},
				delay: (context) => {
					let delay = 0
					if (
						context.type === "data" &&
						context.mode === "default" &&
						!delayed
					) {
						delay = context.dataIndex * 300 + context.datasetIndex * 100
					}
					return delay
				},
			},
			...props.options,
		},
		data: {
			labels: props.labels,
			datasets: props.datasets,
		},
	}

	const chartRef = useRef(null)

	useEffect(() => {
		if (chartRef.current) {
			chartRef.current.destroy()
		}

		chartRef.current = new window.Chart(ctx.current, config)

		return () => {
			if (chartRef.current) {
				chartRef.current.destroy()
			}
		}
	}, [props.labels, props.datasets, props.options])

	return (
		<div className="p-2">
			<canvas ref={ctx}></canvas>
		</div>
	)
}

export default Pie
