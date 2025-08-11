import { CreateTable } from '@/components/containers/tablesRestaurant/createTable';
import { TablesRestaurant } from '@/components/containers/tablesRestaurant/tablesRestaurant';


export default function TablesPage() {
	return <div className="p-4">
		<CreateTable/>
		<TablesRestaurant/>
	</div>;
}