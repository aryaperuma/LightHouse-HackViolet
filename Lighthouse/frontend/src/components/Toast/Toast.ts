export function toast(messege: string, duration = 2000) {
	const toast = document.createElement("ion-toast");
	toast.message = messege;
	toast.duration = duration;

	document.body.appendChild(toast);
	return toast.present();
}
