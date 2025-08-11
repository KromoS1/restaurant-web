'use client'

import { useGuestsQuery } from '@/api/guest/guest.query'
import { useCreateReservationMutation } from '@/api/reservation/reservation.mutate'
import { FieldApp } from '@/components/ui/form/field'
import { SelectApp } from '@/components/ui/form/select'
import { ICreateReservation } from '@/types/reservation.interface'
import { ITable } from '@/types/table.interface'
import { useForm } from '@tanstack/react-form'
import React from 'react'
import { toast } from 'react-toastify'

interface ReservationFormProps {
  table: ITable
  onSuccess: () => void
  onCancel: () => void
}

const defaultReservation = {
  guestId: '',
  guestCount: 0,
  reservationDate: new Date().toISOString().slice(0, 16),
  duration: 120,
  specialRequests: '',
  notes: ''
}

export const ReservationForm: React.FC<ReservationFormProps> = ({
  table,
  onSuccess,
  onCancel
}) => {
  const { data: guests, isLoading: isLoadingGuests } = useGuestsQuery()
  const { mutateAsync: createReservation } = useCreateReservationMutation()

  const form = useForm({
    defaultValues: {
      ...defaultReservation,
      guestCount: table.minSeats
    },
    onSubmit: async ({ value }) => {
      if (!value.guestId) {
        toast.error('Пожалуйста, выберите гостя')
        return
      }

      const reservationData: ICreateReservation = {
        guestId: value.guestId,
        tableId: table.id,
        guestCount: value.guestCount,
        reservationDate: new Date(value.reservationDate),
        duration: value.duration,
        specialRequests: value.specialRequests || undefined,
        notes: value.notes || undefined
      }

      try {
        await createReservation(reservationData)
        toast.success('Бронирование успешно создано!')
        onSuccess()
      } catch (error) {
        console.error('Ошибка создания бронирования:', error)
        toast.error('Ошибка при создании бронирования')
      }
    },
  })

  if (isLoadingGuests) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="loading loading-spinner loading-md"></div>
        <span className="ml-2">Загрузка списка гостей...</span>
      </div>
    )
  }

  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="space-y-4"
    >
      <div className="alert alert-info">
        <div>
          <h4 className="font-bold">Столик #{table.number}</h4>
          <div className="text-sm space-y-1">
            <div>Места: {table.minSeats}-{table.maxSeats} человек</div>
            <div>Тип: {table.type}</div>
            {table.location && <div>Расположение: {table.location}</div>}
          </div>
        </div>
      </div>

      <form.Field
        name="guestId"
        children={(field) => (
          <SelectApp
            title="Гость *"
            placeholder="Выберите гостя"
            options={guests?.map((guest) => ({
              value: guest.id,
              label: `${guest.name} (${guest.phone})`
            })) || []}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
          />
        )}
      />

      <form.Field
        name="guestCount"
        children={(field) => (
          <FieldApp
            type="number"
            title="Количество гостей *"
            value={field.state.value.toString()}
            onChange={(e) => field.handleChange(parseInt(e.target.value) || table.minSeats)}
            label={`От ${table.minSeats} до ${table.maxSeats} человек`}
          />
        )}
      />

      <form.Field
        name="reservationDate"
        children={(field) => (
          <FieldApp
            type="datetime-local"
            title="Дата и время бронирования *"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
          />
        )}
      />

      <form.Field
        name="duration"
        children={(field) => (
          <SelectApp
            title="Продолжительность"
            options={[
              { value: '60', label: '1 час' },
              { value: '90', label: '1.5 часа' },
              { value: '120', label: '2 часа' },
              { value: '150', label: '2.5 часа' },
              { value: '180', label: '3 часа' },
            ]}
            value={field.state.value.toString()}
            onChange={(e) => field.handleChange(parseInt(e.target.value))}
          />
        )}
      />

      <form.Field
        name="specialRequests"
        children={(field) => (
          <FieldApp
            type="textarea"
            title="Особые пожелания"
            placeholder="Например: место у окна, детский стульчик..."
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
          />
        )}
      />

      <form.Field
        name="notes"
        children={(field) => (
          <FieldApp
            type="textarea"
            title="Заметки персонала"
            placeholder="Внутренние заметки для персонала..."
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
          />
        )}
      />

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="btn btn-primary flex-1"
          disabled={form.state.isSubmitting}
        >
          {form.state.isSubmitting ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Создание...
            </>
          ) : (
            'Создать бронирование'
          )}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-ghost"
          disabled={form.state.isSubmitting}
        >
          Отмена
        </button>
      </div>
    </form>
  )
}
