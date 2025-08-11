import { CreateGuest } from '@/components/containers/guestTable/createGuest'
import { GuestTable } from '@/components/containers/guestTable/guestTable'

export default function GuestPage() {
	return (
		<div className="container mx-auto py-6">
			<div className="mb-6">
				<h1 className="text-2xl font-bold text-gray-900">Гости</h1>
				<p className="text-gray-600">Управление базой данных гостей ресторана</p>
			</div>
			
			<div className="mb-4">
				<CreateGuest />
			</div>

			<GuestTable />
		</div>
	)
}