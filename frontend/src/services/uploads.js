import axios from "axios";

export const uploadFileService = async ({picture, name, typology, description, muscles }) => {

   const toUpload = new FormData();
   toUpload.append("name", name);
   toUpload.append("typology", typology);
   toUpload.append("description", description);
   toUpload.append("muscles", muscles);

   const {data} = axios.post(`${serverRoot}/newExercise`,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
   )

    return data;
}