import type { LoaderFunctionArgs } from '@remix-run/node' 
import { json } from "@remix-run/node"
import { useLoaderData } from '@remix-run/react'
import { CurrentHeatingSystem } from '../../components/ui/heat/CaseSummaryComponents/CurrentHeatingSystem.tsx'
import { getSession } from '../homes.tsx'

export async function loader({request}: LoaderFunctionArgs) {
	const session = await getSession(request.headers.get("Cookie"))	

	const formData = session.get("formData")

	console.log("from inputs2 loader: ", formData)

	return json(formData)
}

export default function Inputs2() {
	const formData = useLoaderData<typeof loader>()

	console.log("from client useLoader: ", formData)
	return (
		<div>
			<CurrentHeatingSystem />
		</div>
	)
}
