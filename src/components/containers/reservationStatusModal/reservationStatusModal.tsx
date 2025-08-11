'use client'

import {
  useChangeStatusReservationMutation
} from '@/api/reservation/reservation.mutate'
import { Modal } from '@/components/ui/modal/modal'
import { ReservationStatus } from '@/types/reservation.interface'
import { ITableWithRelations } from '@/types/table.interface'
import React from 'react'
import { toast } from 'react-toastify'

interface ReservationStatusModalProps {
  isOpen: boolean
  onClose: () => void
  table: ITableWithRelations
}

export const ReservationStatusModal: React.FC<ReservationStatusModalProps> = ({
  isOpen,
  onClose,
  table
}) => {
  const {mutateAsync, isPending} = useChangeStatusReservationMutation()

  const reservations = table.reservations || []

  const getIntoByStatus = (status: ReservationStatus) => {
    switch (status) {
      case ReservationStatus.PENDING:
        return {
          label: 'Ожидает подтверждения',
          badgeClass: 'badge-warning'
        }
      case ReservationStatus.CONFIRMED:
        return {
          label: 'Подтверждено',
          badgeClass: 'badge-info'
        }
      case ReservationStatus.SEATED:
        return {
          label: 'Размещены',
          badgeClass: 'badge-primary'
        }
      case ReservationStatus.COMPLETED:
        return {
          label: 'Завершено',
          badgeClass: 'badge-success'
        }
      case ReservationStatus.CANCELLED:
        return {
          label: 'Отменено',
          badgeClass: 'badge-error'
        }
      case ReservationStatus.NO_SHOW:
        return {
          label: 'Не явился',
          badgeClass: 'badge-ghost'
        }
      default:
        return status
    }
  }

  const handleStatusChange = async (reservationId: string, action: ReservationStatus) => {
    try {
      await mutateAsync({ id: reservationId, status: action })

      switch (action) {
        case ReservationStatus.CONFIRMED:
          toast.success('Резервирование подтверждено')
          break
        case ReservationStatus.SEATED:
          toast.success('Гости размещены')
          break
        case ReservationStatus.COMPLETED:
          toast.success('Резервирование завершено')
          break
        case ReservationStatus.CANCELLED:
          toast.success('Резервирование отменено')
          break
        case ReservationStatus.NO_SHOW:
          toast.success('Отмечено как неявка')
          break
      }
      onClose()
    } catch (error) {
      console.error('Ошибка изменения статуса:', error)
    }
  }

  const getAvailableActions = (status: ReservationStatus) => {
    switch (status) {
      case ReservationStatus.PENDING:
        return [
          { action: ReservationStatus.CONFIRMED, label: 'Подтвердить', class: 'btn-info' },
          { action: ReservationStatus.CANCELLED, label: 'Отменить', class: 'btn-error' }
        ]
      case ReservationStatus.CONFIRMED:
        return [
          { action: ReservationStatus.SEATED, label: 'Разместить', class: 'btn-primary' },
          { action: ReservationStatus.NO_SHOW, label: 'Не явился', class: 'btn-ghost' },
          { action: ReservationStatus.CANCELLED, label: 'Отменить', class: 'btn-error' }
        ]
      case ReservationStatus.SEATED:
        return [
          { action: ReservationStatus.COMPLETED, label: 'Завершить', class: 'btn-success' }
        ]
      default:
        return []
    }
  }

  const activeReservations = reservations.filter(r => 
    r.status !== ReservationStatus.COMPLETED && 
    r.status !== ReservationStatus.CANCELLED && 
    r.status !== ReservationStatus.NO_SHOW
  )

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Резервирования столика #${table.number}`} size="lg">
      <div className="space-y-6">
        {activeReservations.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-500">
              Нет активных резервирований для этого столика
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {activeReservations.map((reservation) => (
              <div key={reservation.id} className="card bg-base-100 border border-base-300">
                <div className="card-body p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">ID: {reservation.id.slice(0, 8)}</h4>
                        <div className={`badge ${getIntoByStatus(reservation.status).badgeClass}`}>
                          {getIntoByStatus(reservation.status).label}
                        </div>
                      </div>
                      
                      <div className="text-sm space-y-1">
                        <div>
                          <span className="text-gray-600">Дата:</span>{' '}
                          <span className="font-medium">
                            {new Date(reservation.reservationDate).toLocaleString('ru-RU')}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Гостей:</span>{' '}
                          <span className="font-medium">{reservation.guestCount}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Продолжительность:</span>{' '}
                          <span className="font-medium">{reservation.duration} мин</span>
                        </div>
                        {reservation.specialRequests && (
                          <div>
                            <span className="text-gray-600">Пожелания:</span>{' '}
                            <span className="font-medium">{reservation.specialRequests}</span>
                          </div>
                        )}
                        {reservation.notes && (
                          <div>
                            <span className="text-gray-600">Заметки:</span>{' '}
                            <span className="font-medium">{reservation.notes}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    {getAvailableActions(reservation.status).map(({ action, label, class: btnClass }) => (
                      <button
                        key={action}
                        onClick={() => handleStatusChange(reservation.id, action)}
                        className={`btn btn-sm ${btnClass}`}
                        disabled={isPending}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  )
}
