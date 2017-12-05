import React from 'react'

import { Table, Column, ColumnGroup, Cell } from 'fixed-data-table'
import 'fixed-data-table/dist/fixed-data-table.css'
import './style.scss'

import starImg from './favs.png'
import emptyStarImg from './nofavs.png'

import Dimensions from 'react-dimensions'

const GroupHeader = ({ title }) => (
  <Cell className="Table-Group-Header">
    {title}
  </Cell>
)

const NameColumnHeader = ({ showFavs, onClick }) => {
  const className = 'Table-Column-Header Name'

  return (
    <Cell className={className}>
      <button onClick={onClick}>
        <span className={showFavs ? '' : 'text-bold'}>
          All Coins
        </span>
        |
        <span className={showFavs ? 'text-bold' : ''}>
          Favorites
        </span>
      </button>
    </Cell>
  )
}

const SortableColumnHeader = ({
  value,
  valueSmall,
  outside,
  sortKey,
  sortBy,
  sortDirection,
  onSort,
}) => {
  let className = 'Table-Column-Header Sortable'

  const isActiveSort = sortKey === sortBy

  if (isActiveSort) {
    className = `${className} Sorted ${sortDirection}`
  }

  return (
    <Cell className={className}>
      <button onClick={() => onSort(sortKey)}>
        {value} <small>{valueSmall}</small>
      </button>
      {outside}
    </Cell>
  )
}

const StatCell = ({ cellProps, colorblind, value }) => {
  let color = 'black'

  if (typeof value === 'number') {
    const positiveColor = colorblind ? '#3a77d8' : '#1daa16'
    color = value > 0 ? positiveColor : '#eb2c2c'
  }

  // eslint-disable-next-line eqeqeq
  if (value == '0.00') {
    color = 'black'
  }

  return (
    <Cell {...cellProps}>
      <span style={{ color }}>
        {value}
      </span>
    </Cell>
  )
}

class CoinTable extends React.Component {
  render() {
    const {
      data,
      intervals,
      sortBy,
      sortDirection,
      onSort,
      colorblind,
      containerWidth,
    } = this.props

    const width = containerWidth - 40

    const columns = intervals.map((interval) => {
      const { qty, type, label } = interval
      const intervalShort = `${qty}${type}`

      return (
        <ColumnGroup
          key={intervalShort}
          header={<GroupHeader title={label} />}
        >
          <Column
            header={(
              <SortableColumnHeader
                value="Price"
                valueSmall="%"
                sortKey={`stats.${intervalShort}.priceChange`}
                sortBy={sortBy}
                sortDirection={sortDirection}
                onSort={onSort}
              />
            )}
            cell={({ rowIndex, ...props }) => {
              let value = '-'
              const item = data[rowIndex].stats[intervalShort] || {}

              if (item.priceChange !== undefined) {
                value = item.priceChange
              }

              return (
                <StatCell
                  cellProps={props}
                  value={value}
                  colorblind={colorblind}
                />
              )
            }}
            width={78}
          />
          <Column
            header={(
              <SortableColumnHeader
                value="Volume"
                valueSmall="%"
                sortKey={`stats.${intervalShort}.volumeChange`}
                sortBy={sortBy}
                sortDirection={sortDirection}
                onSort={onSort}
              />
            )}
            cell={({ rowIndex, ...props }) => {
              let value = '-'
              const item = data[rowIndex].stats[intervalShort] || {}

              if (item.volumeChange !== undefined) {
                value = item.volumeChange
              }

              return (
                <StatCell
                  cellProps={props}
                  value={value}
                  colorblind={colorblind}
                />
              )
            }}
            width={78}
          />
        </ColumnGroup>
      )
    })

    return (
      <div style={{ width, margin: 'auto', textAlign: 'center' }}>
        <Table
          rowHeight={46}
          headerHeight={46}
          groupHeaderHeight={50}
          width={width}
          height={window.outerHeight - 315}
          rowsCount={data.length}
        >
          <ColumnGroup
            fixed={true}
            header={<GroupHeader title="Coins" />}
          >
            <Column
              fixed={true}
              header={(
                <NameColumnHeader
                  showFavs={this.props.showFavs}
                  onClick={this.props.onChangeViewMode}
                />
              )}
              cell={({ rowIndex, ...props }) => {
                // eslint-disable-next-line no-underscore-dangle
                const id = data[rowIndex]._id
                const isFav = this.props.favs.includes(id)

                let long = data[rowIndex].marketName
                let short = null

                if (data[rowIndex].marketCurrency) {
                  long = data[rowIndex].marketCurrency.long
                  short = data[rowIndex].marketCurrency.short
                }

                const noFavImage = data[rowIndex].marketLogoURL || emptyStarImg

                return (
                  <Cell {...props} className="Coin-Name-Cell">
                    <button onClick={() => this.props.onToggleFavorite(id, !isFav)}>
                      <img
                        src={isFav ? starImg : noFavImage}
                        height={14}
                        alt=""
                      />
                    </button>

                    <div className="Coin-Name-Long">
                      {long}
                    </div>

                    <div className="Coin-Name-Short">
                      {short}
                    </div>
                  </Cell>
                )
              }}
              width={150}
            />
          </ColumnGroup>

          {/* Current */}
          <ColumnGroup
            header={<GroupHeader title="Current" />}
          >
            <Column
              header={(
                <SortableColumnHeader
                  value={(
                    <div className="Price-Header">
                      Price
                    </div>
                  )}
                  outside={(
                    <div className="Price-Header-Outside">
                      <a
                        className={this.props.showCurrentPriceAsUSD ? 'text-bold' : ''}
                        onClick={() => this.props.onSetCurrentPriceView(true)}
                      >
                        USD
                      </a>
                      <a
                        className={!this.props.showCurrentPriceAsUSD ? 'text-bold' : ''}
                        onClick={() => this.props.onSetCurrentPriceView(false)}
                      >
                        BTC
                      </a>
                    </div>
                  )}
                  sortKey="currentPrice"
                  sortBy={sortBy}
                  sortDirection={sortDirection}
                  onSort={onSort}
                />
              )}
              cell={({ rowIndex, ...props }) => (
                <Cell {...props}>
                  {data[rowIndex].currentPrice}
                </Cell>
              )}
              width={100}
            />
            <Column
              header={(
                <SortableColumnHeader
                  value="Volume"
                  valueSmall="24h"
                  sortKey="currentVolume"
                  sortBy={sortBy}
                  sortDirection={sortDirection}
                  onSort={onSort}
                />
              )}
              cell={({ rowIndex, ...props }) => (
                <Cell {...props}>
                  {data[rowIndex].currentVolume}
                </Cell>
              )}
              width={100}
            />
            <Column
              header={(
                <SortableColumnHeader
                  value="Market Cap"
                  valueSmall="USD"
                  sortKey="currentMarketCap"
                  sortBy={sortBy}
                  sortDirection={sortDirection}
                  onSort={onSort}
                />
              )}
              cell={({ rowIndex, ...props }) => (
                <Cell {...props}>
                  {data[rowIndex].currentMarketCap.toLocaleString()}
                </Cell>
              )}
              width={130}
            />
          </ColumnGroup>

          {/* Intervals */}
          {columns}
        </Table>
      </div>
    )
  }
}

export default Dimensions()(CoinTable)

