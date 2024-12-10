import Swal from "sweetalert2";

export const useDeleteAlert = async () => {
	const result = await Swal.fire({
		title: "Are you sure?",
		text: "You won't be able to revert this!",
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: "#ff621f",
		cancelButtonColor: "#d33",
		confirmButtonText: "Yes, delete it!",
	});

	return result.isConfirmed;
};

// export const useApproveUserAlert = async (message) => {
// 	const result = await Swal.fire({
// 		title: "Are you sure?",
// 		text: message || "By approving driver can take ride in the platform !",
// 		icon: "warning",
// 		showCancelButton: true,
// 		confirmButtonColor: "#ff621f",
// 		cancelButtonColor: "#d33",
// 		confirmButtonText: "Yes, approve!",
// 	});

// 	return result.isConfirmed;
// };
