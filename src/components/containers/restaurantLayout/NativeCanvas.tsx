'use client'

import { useBoolean } from '@/hooks/useBoolean'
import { ITable, TableStatus, TableType } from '@/types/table.interface'
import React, { useEffect, useRef, useState } from 'react'

interface TablePosition {
  x: number
  y: number
  shape: 'circle' | 'rect' | 'ellipse'
  width?: number
  height?: number
  radius?: number
}

const defaultTablePositions: Record<number, TablePosition> = {
  1: { x: 100, y: 100, shape: 'circle', radius: 40 },
  2: { x: 250, y: 100, shape: 'circle', radius: 40 },
  3: { x: 400, y: 100, shape: 'rect', width: 80, height: 60 },
  4: { x: 550, y: 100, shape: 'rect', width: 80, height: 60 },
  5: { x: 100, y: 250, shape: 'ellipse', width: 90, height: 60 },
  6: { x: 250, y: 250, shape: 'ellipse', width: 90, height: 60 },
  7: { x: 400, y: 250, shape: 'circle', radius: 45 },
  8: { x: 550, y: 250, shape: 'rect', width: 100, height: 70 },
  9: { x: 100, y: 400, shape: 'rect', width: 120, height: 80 },
  10: { x: 300, y: 400, shape: 'circle', radius: 50 },
}

interface TableData {
  table: ITable
  position: TablePosition
}

interface NativeCanvasProps {
  tables: ITable[]
  selectedTable: ITable | null
  onTableSelect: (table: ITable | null) => void
  onTableMove?: (tableId: string, x: number, y: number) => void
  stageSize: { width: number; height: number }
}

export const NativeCanvas: React.FC<NativeCanvasProps> = ({
  tables,
  selectedTable,
  onTableSelect,
  onTableMove,
  stageSize
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [tablesData, setTablesData] = useState<TableData[]>([])
  const { value: isDragging, setTrue: startDragging, setFalse: stopDragging } = useBoolean()
  const [dragTable, setDragTable] = useState<ITable | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState({ x: 0, y: 0 })

  const getTablePosition = (table: ITable): TablePosition => {

    if (table.positionX !== undefined && table.positionY !== undefined) {
      return {
        x: table.positionX,
        y: table.positionY,
        shape: table.shape || 'circle',
        width: table.width,
        height: table.height,
        radius: table.radius
      }
    }
    
    const defaultPos = defaultTablePositions[table.number]
    if (defaultPos) {
      return defaultPos
    }
    

    const baseX = 200
    const baseY = 150
    const offset = (table.number - 11) * 60 
    
    return {
      x: baseX + offset,
      y: baseY,
      shape: 'circle',
      radius: 40
    }
  }

  const getTableColor = (table: ITable, isSelected: boolean) => {
    if (isSelected) return '#3B82F6'
    
    switch (table.status) {
      case TableStatus.AVAILABLE:
        return '#10B981' 
      case TableStatus.OCCUPIED:
        return '#EF4444' 
      case TableStatus.RESERVED:
        return '#F59E0B' 
      case TableStatus.MAINTENANCE:
        return '#6B7280' 
      default:
        return '#10B981'
    }
  }

  const getTypeColor = (table: ITable, isSelected: boolean) => {
    switch (table.type) {
      case TableType.VIP:
        return '#8B5CF6'
      case TableType.FAMILY:
        return '#06B6D4'
      default:
        return getTableColor(table, isSelected)
    }
  }

  const isPointInTable = (x: number, y: number, position: TablePosition): boolean => {
    switch (position.shape) {
      case 'circle':
        const dx = x - position.x
        const dy = y - position.y
        return Math.sqrt(dx * dx + dy * dy) <= position.radius!
      
      case 'rect':
        const halfWidth = position.width! / 2
        const halfHeight = position.height! / 2
        return (
          x >= position.x - halfWidth &&
          x <= position.x + halfWidth &&
          y >= position.y - halfHeight &&
          y <= position.y + halfHeight
        )
      
      case 'ellipse':
        const radiusX = position.width! / 2
        const radiusY = position.height! / 2
        const deltaX = x - position.x
        const deltaY = y - position.y
        return (
          (deltaX * deltaX) / (radiusX * radiusX) +
          (deltaY * deltaY) / (radiusY * radiusY)
        ) <= 1
      
      default:
        return false
    }
  }

  const drawTable = (
    ctx: CanvasRenderingContext2D,
    table: ITable,
    position: TablePosition,
    isSelected: boolean
  ) => {
    const color = getTypeColor(table, isSelected)
    const isDraggingThis = isDragging && dragTable?.id === table.id
    const isNewTable = table.positionX === undefined || table.positionY === undefined
    
    ctx.fillStyle = color
    ctx.strokeStyle = isSelected ? '#1D4ED8' : isNewTable ? '#F59E0B' : '#374151'
    ctx.lineWidth = isSelected ? 3 : isNewTable ? 2 : 1
    
    if (isDraggingThis) {
      ctx.globalAlpha = 0.7
      ctx.strokeStyle = '#3B82F6'
      ctx.lineWidth = 2
    } else {
      ctx.globalAlpha = 1.0
    }

    ctx.shadowColor = isSelected ? '#1D4ED8' : 'rgba(0, 0, 0, 0.1)'
    ctx.shadowBlur = 5
    ctx.shadowOffsetX = 2
    ctx.shadowOffsetY = 2

    ctx.beginPath()

    switch (position.shape) {
      case 'circle':
        ctx.arc(position.x, position.y, position.radius!, 0, 2 * Math.PI)
        break
      
      case 'rect':
        const halfWidth = position.width! / 2
        const halfHeight = position.height! / 2
        ctx.roundRect(
          position.x - halfWidth,
          position.y - halfHeight,
          position.width!,
          position.height!,
          8
        )
        break
      
      case 'ellipse':
        ctx.ellipse(
          position.x,
          position.y,
          position.width! / 2,
          position.height! / 2,
          0,
          0,
          2 * Math.PI
        )
        break
    }

    ctx.fill()
    ctx.stroke()

    ctx.shadowColor = 'transparent'
    ctx.shadowBlur = 0
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0

    ctx.fillStyle = 'white'
    ctx.font = 'bold 16px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(table.number.toString(), position.x, position.y - 5)

    ctx.font = '12px Arial'
    ctx.fillText(`${table.minSeats}-${table.maxSeats}`, position.x, position.y + 12)
    
    ctx.globalAlpha = 1.0
  }

  const draw = React.useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = '#F9FAFB'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.save()
    ctx.translate(canvasOffset.x, canvasOffset.y)

    console.log('Отрисовываем столиков:', tablesData.length)
    tablesData.forEach(({ table, position }) => {
      console.log(`Рисуем столик #${table.number} на позиции (${position.x}, ${position.y})`)
      const isSelected = selectedTable?.id === table.id
      drawTable(ctx, table, position, isSelected)
    })

    ctx.restore()
  }, [tablesData, selectedTable, stageSize, canvasOffset])

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left - canvasOffset.x
    const y = event.clientY - rect.top - canvasOffset.y

    if (event.button === 2) {
      setIsPanning(true)
      setPanStart({ x: event.clientX, y: event.clientY })
      return
    }

    for (const { table, position } of tablesData) {
      if (isPointInTable(x, y, position)) {
        onTableSelect(table)
        
        startDragging()
        setDragTable(table)
        setDragOffset({
          x: x - position.x,
          y: y - position.y
        })
        return
      }
    }

    onTableSelect(null)
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (isPanning) {
      const deltaX = event.clientX - panStart.x
      const deltaY = event.clientY - panStart.y
      setCanvasOffset(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }))
      setPanStart({ x: event.clientX, y: event.clientY })
      return
    }

    if (!isDragging || !dragTable) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left - canvasOffset.x
    const y = event.clientY - rect.top - canvasOffset.y

    const newX = x - dragOffset.x
    const newY = y - dragOffset.y

    setTablesData(prev => 
      prev.map(tableData => 
        tableData.table.id === dragTable.id
          ? {
              ...tableData,
              position: { ...tableData.position, x: newX, y: newY }
            }
          : tableData
      )
    )
  }

  const handleMouseUp = () => {
    if (isPanning) {
      setIsPanning(false)
    }

    if (isDragging && dragTable && onTableMove) {
      const tableData = tablesData.find(td => td.table.id === dragTable.id)
      if (tableData) {
        onTableMove(dragTable.id, tableData.position.x, tableData.position.y)
      }
    }

    stopDragging()
    setDragTable(null)
    setDragOffset({ x: 0, y: 0 })
  }

  useEffect(() => {
    console.log('NativeCanvas: получено столиков:', tables.length)
    console.log('NativeCanvas: список столиков:', tables.map(t => `#${t.number} (${t.id})`))
    
    const newTablesData: TableData[] = tables
      .map((table) => {
        const position = getTablePosition(table)
        console.log(`Столик #${table.number}: позиция (${position.x}, ${position.y})`)
        return { table, position }
      })

    setTablesData(newTablesData)
  }, [tables, stageSize])

  useEffect(() => {
    draw()
  }, [draw])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = stageSize.width
    canvas.height = stageSize.height
    draw()
  }, [stageSize, draw])

  return (
    <canvas
      ref={canvasRef}
      width={stageSize.width}
      height={stageSize.height}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onContextMenu={(e) => e.preventDefault()}
      style={{
        cursor: isPanning ? 'move' : isDragging ? 'grabbing' : 'grab',
        display: 'block',
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
      }}
    />
  )
}
