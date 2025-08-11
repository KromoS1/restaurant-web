'use client'

import { useMaintenanceTableMutation, useUpdateTablePositionMutation } from '@/api/table/table.mutate'
import { useTablesQuery } from '@/api/table/table.query'
import { Modal } from '@/components/ui/modal/modal'
import { useBoolean } from '@/hooks/useBoolean'
import { ITableWithRelations, TableStatus, TableType } from '@/types/table.interface'
import dynamic from 'next/dynamic'
import React, { useEffect, useRef, useState } from 'react'
import { ReservationForm } from '../reservationForm/reservationForm'
import { ReservationStatusModal } from '../reservationStatusModal/reservationStatusModal'

const NativeCanvas = dynamic(
  () => import('./NativeCanvas').then((mod) => ({ default: mod.NativeCanvas })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg text-gray-600">Загрузка схемы ресторана...</div>
      </div>
    ),
  }
)

export const RestaurantLayout: React.FC = () => {
  const { data: tables, isLoading, error } = useTablesQuery()
  const updateTablePositionMutation = useUpdateTablePositionMutation()
  const maintenanceTableMutation = useMaintenanceTableMutation()

  const [selectedTable, setSelectedTable] = useState<ITableWithRelations | null>(null)

  React.useEffect(() => {
    if (tables) {
      console.log('Загруженные столики:', tables)
      const table120 = tables.find(t => t.number === 120)
      if (table120) {
        console.log('Столик 120 найден:', table120)
      } else {
        console.log('Столик 120 не найден. Все номера столиков:', tables.map(t => t.number))
      }
    }
  }, [tables])
  const [stageSize, setStageSize] = useState({ width: 800, height: 600 })
  const containerRef = useRef<HTMLDivElement>(null)

  const { value: isReservationModalOpen, setTrue: openReservationModal, setFalse: closeReservationModal } = useBoolean()
  const { value: isStatusModalOpen, setTrue: openStatusModal, setFalse: closeStatusModal } = useBoolean()

  useEffect(() => {
    if (selectedTable) {
      setSelectedTable(tables?.find(table => table.id === selectedTable.id) || null)
    }
  }, [tables])  

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const container = containerRef.current

        const computedStyle = window.getComputedStyle(container)
        const paddingLeft = parseFloat(computedStyle.paddingLeft)
        const paddingRight = parseFloat(computedStyle.paddingRight)
        const paddingTop = parseFloat(computedStyle.paddingTop)
        const paddingBottom = parseFloat(computedStyle.paddingBottom)
        
        const availableWidth = container.clientWidth - paddingLeft - paddingRight
        const availableHeight = container.clientHeight - paddingTop - paddingBottom
        
        const canvasWidth = Math.max(availableWidth, 400)
        const canvasHeight = Math.max(availableHeight, 300)
        
        setStageSize({
          width: canvasWidth,
          height: canvasHeight
        })
      }
    }

    let resizeObserver: ResizeObserver | null = null
    
    if (containerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        updateSize()
      })
      resizeObserver.observe(containerRef.current)
    }

    window.addEventListener('resize', updateSize)
    
    const timeoutId = setTimeout(updateSize, 100)
    
    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
      window.removeEventListener('resize', updateSize)
      clearTimeout(timeoutId)
    }
  }, [])

  const handleTableSelect = (table: ITableWithRelations | null) => {
    setSelectedTable(table)
  }

  const handleTableMove = (tableId: string, x: number, y: number) => {
    updateTablePositionMutation.mutate({
      id: tableId,
      positionX: x,
      positionY: y
    })
  }

  const handleReservationSuccess = () => {
    closeReservationModal()
    setSelectedTable(null)
  }

  const handleReservationCancel = () => {
    closeReservationModal()
  }

  const toggleMaintenanceMode = () => {
    if (!selectedTable) return

    const newStatus = selectedTable.status === TableStatus.MAINTENANCE 
      ? TableStatus.AVAILABLE 
      : TableStatus.MAINTENANCE

    maintenanceTableMutation.mutate({
      tableId: selectedTable.id,
      status: newStatus
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg text-gray-600">Загрузка схемы ресторана...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg text-red-600">Ошибка загрузки столиков</div>
      </div>
    )
  }

  return (
    <div className="w-full h-full">
      <div className="flex flex-col lg:flex-row gap-6 h-full">
        <div 
          ref={containerRef}
          className="flex-1 border-2 border-gray-200 rounded-lg bg-gray-50 overflow-hidden p-4"
        >
          <NativeCanvas
            tables={tables || []}
            selectedTable={selectedTable}
            onTableSelect={handleTableSelect}
            onTableMove={handleTableMove}
            stageSize={stageSize}
          />
        </div>

        <div className="w-full lg:w-80 space-y-4 overflow-y-auto lg:max-h-full">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-3">Легенда</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm">Доступен</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-sm">Занят</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span className="text-sm">Забронирован</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-500 rounded"></div>
                <span className="text-sm">Обслуживание</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-500 rounded"></div>
                <span className="text-sm">VIP столик</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-cyan-500 rounded"></div>
                <span className="text-sm">Семейный столик</span>
              </div>
            </div>
          </div>

          {selectedTable && (
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-3">
                Столик #{selectedTable.number}
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Места:</span>
                  <span className="font-medium">
                    {selectedTable.minSeats}-{selectedTable.maxSeats} человек
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Тип:</span>
                  <span className="font-medium">
                    {selectedTable.type === TableType.VIP && 'VIP'}
                    {selectedTable.type === TableType.FAMILY && 'Семейный'}
                    {selectedTable.type === TableType.REGULAR && 'Обычный'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Статус:</span>
                  <span className={`font-medium ${
                    selectedTable.status === TableStatus.AVAILABLE ? 'text-green-600' :
                    selectedTable.status === TableStatus.OCCUPIED ? 'text-red-600' :
                    selectedTable.status === TableStatus.RESERVED ? 'text-yellow-600' :
                    'text-gray-600'
                  }`}>
                    {selectedTable.status === TableStatus.AVAILABLE && 'Доступен'}
                    {selectedTable.status === TableStatus.OCCUPIED && 'Занят'}
                    {selectedTable.status === TableStatus.RESERVED && 'Забронирован'}
                    {selectedTable.status === TableStatus.MAINTENANCE && 'Обслуживание'}
                  </span>
                </div>
                {selectedTable.location && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Расположение:</span>
                    <span className="font-medium">{selectedTable.location}</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-2 mt-4">
                {selectedTable.status === TableStatus.AVAILABLE && (
                  <button 
                    onClick={openReservationModal}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Забронировать столик
                  </button>
                )}
                
                <button 
                  onClick={toggleMaintenanceMode}
                  disabled={maintenanceTableMutation.isPending}
                  className={`w-full py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                    selectedTable.status === TableStatus.MAINTENANCE
                      ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white'
                      : 'bg-orange-600 hover:bg-orange-700 focus:ring-orange-500 text-white'
                  } ${maintenanceTableMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {maintenanceTableMutation.isPending 
                    ? 'Обновление...' 
                    : selectedTable.status === TableStatus.MAINTENANCE 
                      ? 'Завершить обслуживание' 
                      : 'Начать обслуживание (уборка)'
                  }
                </button>
                
                <button 
                  onClick={openStatusModal}
                  className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                >
                  Управление резервированиями
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedTable && isReservationModalOpen && (
        <Modal
          isOpen={isReservationModalOpen}
          onClose={closeReservationModal}
          title={`Бронирование столика #${selectedTable.number}`}
          size="lg"
        >
          <ReservationForm
            table={selectedTable}
            onSuccess={handleReservationSuccess}
            onCancel={handleReservationCancel}
          />
        </Modal>
      )}

      {selectedTable && (
        <ReservationStatusModal
          isOpen={isStatusModalOpen}
          onClose={closeStatusModal}
          table={selectedTable}
        />
      )}
    </div>
  )
}
