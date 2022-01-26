import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography  from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from 'react-router-dom';

interface ProgressDivProps {
    front_img : string | null,
    back_img : string | null,
    side_img : string | null,
    createdAt : Date,
    _id : string 
}
const ProgressDiv: React.FC<ProgressDivProps> = ({front_img, back_img, side_img, createdAt, _id}) => {
    return (
        <Box>
            <Box sx={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                <Typography sx={{fontSize:"1.5rem", fontWeight:"bold"}}>{new Date(createdAt).toLocaleDateString()}</Typography>
                <Link style={{margin:"auto 1px", color:"blue", textDecoration:"none"}} to={`/progress/${_id}`}>
                    full details
                </Link>
            </Box>
            <ImageList sx={{ width: "100%" }} cols={3} rowHeight="auto">
                {[front_img, side_img, back_img].map((item, idx) => (
                    item && <ImageListItem key={idx}>
                    <img
                        src={item ? item : ""}
                        alt='img not avialable'
                        loading="lazy"
                        style={{ width: "100%", height:"33vh", objectFit:"cover" }}
                    />
                    </ImageListItem>
                ))}
            </ImageList>
        </Box>
    );
}
 
export default ProgressDiv;