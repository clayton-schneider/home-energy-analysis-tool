import type {
	ActionFunctionArgs,
} from "@remix-run/node";
import { redirect, createCookieSessionStorage } from "@remix-run/node"

export async function action({
	request
}: ActionFunctionArgs) {

	const session = await getSession(
		request.headers.get("Cookie")
	)

	const formData = await request.formData()

	// can't just dump formData
	const returnData = {}
	formData.forEach((val, key) => returnData[key] = val)  

	session.set("formData", returnData)
	console.log("from homes action: ", session.data)


	return redirect("/inputs2", {
		headers: {
			"Set-Cookie": await commitSession(session)
		}
	})
}


// added to make cookie session work

type SessionData = {
	// we can set this to an object of that represents the shape of the form data
	formData: any
}

type SessionFlashData = {
	error: string
}

const { getSession, commitSession, destroySession } =
	createCookieSessionStorage<SessionData, SessionFlashData>(
		{
			// a Cookie from `createCookie` or the CookieOptions to create one
			cookie: {
				name: "__session",
			},
		}
	);

export { getSession, commitSession, destroySession };
