import multer from "multer";
const storage=multer.diskStorage({
    destination:(req,file,cd)=>{
         cd(null,'uploads/')
    },
    filename:(req,file,cd)=>{
         cd(null,Date.now()+'_'+file.originalname)
    }
})
const upload=multer({storage})
export default upload;