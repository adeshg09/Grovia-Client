import { View, Text, StyleSheet, Image } from 'react-native'
import React, { FC, useMemo } from 'react'
import AutoScroll from '@homielab/react-native-auto-scroll'
import { productImageData } from '../../../constants/data'
import {
	refHeightCalc,
	refWidthCalc,
	windowWidth,
} from '../../../static/dimensions'

const ProductSlider = () => {
	const rows = useMemo(() => {
		const result = []
		for (let i = 0; i < productImageData.length; i += 4) {
			result.push(productImageData.slice(i, i + 4))
		}
		return result
	}, [])

	return (
		<View pointerEvents="none">
			<AutoScroll
				style={styles.autoScroll}
				endPaddingWidth={0}
				duration={10000}>
				<View style={styles.gridContainer}>
					{rows?.map((row: any, rowIndex: number) => {
						return <MemoizedRow key={rowIndex} row={row} rowIndex={rowIndex} />
					})}
				</View>
			</AutoScroll>
		</View>
	)
}

const Row: FC<{ row: typeof productImageData; rowIndex: number }> = ({
	row,
	rowIndex,
}) => {
	return (
		<View style={styles.row}>
			{row.map((image, imageIndex) => {
				const horizontalShift = rowIndex % 2 === 0 ? -18 : 18
				return (
					<View
						key={`${rowIndex}-${imageIndex}`} // Unique key combining rowIndex and imageIndex
						style={[
							styles.itemContainer,
							{ transform: [{ translateX: horizontalShift }] },
						]}>
						<Image source={image} style={styles.image} />
					</View>
				)
			})}
		</View>
	)
}

const MemoizedRow = React.memo(Row)

const styles = StyleSheet.create({
	itemContainer: {
		marginBottom: 12 * refWidthCalc,
		marginHorizontal: 10 * refHeightCalc,
		width: windowWidth * 0.26,
		height: windowWidth * 0.26,
		backgroundColor: '#e9f7f8',
		justifyContent: 'center',
		borderRadius: 25 * refWidthCalc,
		alignItems: 'center',
	},
	image: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain',
	},
	autoScroll: {},
	gridContainer: {
		justifyContent: 'center',
		overflow: 'visible',
		alignItems: 'center',
	},
	row: {
		flexDirection: 'row',
	},
})
export default ProductSlider
