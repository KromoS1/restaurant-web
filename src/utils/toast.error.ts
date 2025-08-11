import { IError } from "@/types/error.interface"
import { toast } from "react-toastify"

export const toastError = (error?: IError) => {
	if(!error) return
	if(Array.isArray(error.message)) {
		error.message.forEach(message => toast.error(message))
	} else {
		toast.error(error.message)
	}
}