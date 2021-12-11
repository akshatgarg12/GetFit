import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography  from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from 'react-router-dom';

interface ProgressDivProps {
    
}
const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
    },
]
const ProgressDiv: React.FC<ProgressDivProps> = () => {

    return (
        <Box>
            <Box sx={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                <Typography sx={{fontSize:"1.5rem", fontWeight:"bold"}}>Date of upload</Typography>
                <Link style={{margin:"auto 1px", color:"blue", textDecoration:"none"}} to="/progress/1">
                    full details
                </Link>
            </Box>
            <ImageList sx={{ width: "100%" }} cols={3} rowHeight="auto">
                {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                    <img
                        src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                    />
                    </ImageListItem>
                ))}
            </ImageList>
        </Box>
    );
}
 
export default ProgressDiv;