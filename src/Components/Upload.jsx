import React,{useState} from 'react';
import axios from 'axios';
import {SyncLoader} from 'react-spinners';

function Upload() {
    const [img, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(false);

    const UploadFile = async(type) =>{
        const data = new FormData();
        data.append("file", type === 'image' ? 'img' : 'vdo');
        data.append('upload_preset', type === 'image' ? 'image_preset':'image_preset')
        try {
            let cloudName = process.env.CLOUDINARY_CLOUD_NAME;
            let resourceType = type === 'image'? 'image' : 'video';
            let api =  `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

            const res = await axios.post(api,data);
            const {secure_url} = res.data;
            console.log(secure_url);
            return secure_url;

        } catch (error) {
            console.log('Error', error);
        }
    }
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            setLoading(true);

            //upload file image
            const imgUrl = UploadFile('image')
            //upload file video
            const vdoUrl = UploadFile('video')

            //send backend api request
            // await axios.post(`${process.env.BACKEND_BASE_URL}/api/videos`, {imgUrl, vdoUrl});


            //reset the staes of image and video
            setImage(null);
            setVideo(null);
            console.log("File upload successfully !");
            setLoading(false);
        } catch (error) {
            
        }
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor='video'>Video : </label>
            <br></br>
            <input 
            type='file'
            accept='video/*'
            id='video'
            onChange={(e)=> setVideo((prev)=> e.target.files[0])}
            />
            <br></br>

            <input 
            type='file'
            accept='image/*'
            id='img'
            onChange={(e)=> setImage((prev)=> e.target.files[0])}
            />
            <button type='submit'>Submit</button>
        </form>

        {loading && <SyncLoader />}
    </div>
  )
}

export default Upload