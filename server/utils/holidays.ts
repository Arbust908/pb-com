import { type Output, isoDate, minLength, number, object, optional, partial, string } from 'valibot'

// Validation schemas for holidays
export const HolidaySchema = object({
  id: optional(number()),
  name: string([minLength(1, 'Name is required')]),
  date: string([isoDate('Invalid date format')]),
  endDate: optional(string([isoDate('Invalid end date format')])),
  createdAt: optional(string()),
  updatedAt: optional(string()),
})

// Schema for creating holidays
export const CreateHolidaySchema = object({
  name: string([minLength(1, 'Name is required')]),
  date: string([isoDate('Invalid date format')]),
  endDate: optional(string([isoDate('Invalid end date format')])),
})

// Custom validator for date comparison
export function validateHolidayDates(input: Output<typeof CreateHolidaySchema>) {
  if (input.endDate) {
    const startDate = new Date(input.date)
    const endDate = new Date(input.endDate)
    const oneDayLater = new Date(startDate)
    oneDayLater.setDate(oneDayLater.getDate() + 1)
    if (endDate < oneDayLater) {
      throw new Error('End date must be at least 1 day after start date')
    }
  }
  return input
}

export const UpdateHolidaySchema = partial(CreateHolidaySchema)

export type Holiday = Output<typeof HolidaySchema>
export type CreateHoliday = Output<typeof CreateHolidaySchema>
export type UpdateHoliday = Output<typeof UpdateHolidaySchema>
