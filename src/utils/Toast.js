import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notifyError = (msg) => toast.error(msg);
export const notifyInfo = (msg) => toast.info(msg);
export const notifyWarning = (msg) => toast.warning(msg);
export const notifySuccess = (msg) => toast.success(msg);
