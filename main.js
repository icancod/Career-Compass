// // // var del = document.getElementById('delete')
// // // del.addEventListener('click', function () {

// // //     const programId = document.getElementById('programId').value;
// // //           const programName = document.getElementById('programName').value;
      
// // //           console.log('Button clicked');
// // //           console.log('Program ID:', programId);
// // //           console.log('Program Name:', programName);
      
// // //           if (!programId || !programName) {
// // //             console.error('Program ID and Name are required');
// // //             return;
// // //           }
// // // 	fetch('users', {
// // // 		method: 'delete',
// // // 		headers: {
// // // 			'Content-Type': 'application/json'
// // // 		},
// // // 		body: JSON.stringify({
// // // 			programId: programId,
// // //               programName: programName
// // // 		})
// // // 	})
// // // 	.then(res => {
// // // 		if (res.ok) return res.json()
// // // 	}).
// // // 	then(data => {
// // // 		console.log(data)
// // // 		window.location.reload(true)
// // // 	})
// // // })



// // document.getElementById('delete').addEventListener('click', function() {
// //     const programId = prompt('Enter the Program ID to delete:'); // Or get this value from an input field in your form

// //     if (!programId) {
// //         alert('Program ID is required');
// //         return;
// //     }

// //     fetch('/users', {
// //         method: 'DELETE',
// //         headers: {
// //             'Content-Type': 'application/json'
// //         },
// //         body: JSON.stringify({ programId: programId })
// //     })
// //     .then(response => response.json())
// //     .then(data => {
// //         if (data.error) {
// //             alert(`Error: ${data.error}`);
// //         } else {
// //             alert(data.message);
// //         }
// //     })
// //     .catch(error => {
// //         console.error('Error:', error);
// //         alert('An error occurred while deleting the record.');
// //     });
// // });

// var del = document.getElementById('delete').del.addEventListener('click', function () {

//     const programId = document.getElementById('programId').value;
//           const programName = document.getElementById('programName').value;
     
//           console.log('Button clicked');
//           console.log('Program ID:', programId);
//           console.log('Program Name:', programName);
     
//           if (!programId || !programName) {
//            console.error('Program ID and Name are required');
//             return;
//           }
//     fetch('users', {
//         method: 'delete',
//        headers: {
//            'Content-Type': 'application/json'
//        },
//         body: JSON.stringify({
//             programId: programId,
//               programName: programName
//         })
//     })
//     .then(res => {
//         if (res.ok) return res.json()
//     }).
//     then(data => {
//         console.log(data)
//        window.location.reload(true)
//     })
// })
          
