import { CreateTable } from '@/components/containers/tablesRestaurant/createTable'
import { TablesRestaurant } from '@/components/containers/tablesRestaurant/tablesRestaurant.table'

export default function TablesPage() {
	return (
		<div className="container mx-auto py-6">
			<div className="mb-6">
				<h1 className="text-2xl font-bold text-gray-900">Столики</h1>
				<p className="text-gray-600">Управление столиками ресторана</p>
			</div>
			
			<div className="mb-4">
				<CreateTable />
			</div>

			<TablesRestaurant />
		</div>
	)
}