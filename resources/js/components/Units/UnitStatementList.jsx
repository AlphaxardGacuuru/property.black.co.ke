import React, { useEffect, useState } from "react"

import StatementList from "@/components/Statements/StatementList"

const UnitStatementList = ({
	unit = { id: "" },
	userUnitId = "",
	...props
}) => {
	const [statements, setStatements] = useState([])

	useEffect(() => {
		// Fetch Statements
		if (unit?.id || props.tenant?.userUnitId) {
			props.getPaginated(
				`statements/unit?
				unitId=${unit?.id}&
				userUnitId=${props.tenant?.userUnitId}&`,
				setStatements
			)
		}
	}, [unit, props.tenant])

	return (
		<StatementList
			{...props}
			unit={unit}
			userUnitId={userUnitId}
			statements={statements}
			setStatements={setStatements}
		/>
	)
}

export default UnitStatementList
