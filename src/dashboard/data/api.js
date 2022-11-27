import axios from "axios";
import Swal from "sweetalert2";

export const multipleFilesUpload=async(formData)=>{
    try {
        const getToken = localStorage.getItem("accessToken");
        console.log(getToken)
        await axios.post(`product/addproduct`,formData,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${getToken}`
            },
        })
        .then((response)=>{
            if(response.data.message=="You have successfully Posted Product"){
                new Swal("You have Post a new Car Successfully")
                window.location.reload();
                console.log(response)
            }else{
                new Swal("something Went Wrong")
                console.log("error")
            }
        })
    } catch (error) {
        console.log(error)
        /* if (error.response.data === "Empty Input Fields!" || error.response.status === 500) {
            new Swal("Empty Input Fields! Please Check");
       }  */
    }
}