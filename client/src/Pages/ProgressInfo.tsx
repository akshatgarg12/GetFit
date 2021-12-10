import Container from "@mui/material/Container";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import * as React from 'react';
import Table from '@mui/material/Table';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";
interface ProgressInfoPageProps {
    
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

const ProgressInfoPage: React.FC<ProgressInfoPageProps> = () => {
    // show a btn to edit or delete the exercise
    const navigate = useNavigate()
    const onClickGoBackHandler = () => {
        navigate(-1);
    }

    return (
        <Container  sx={{paddingTop:"2rem"}}>
            <Button sx={{marginBottom : "1rem"}} onClick={onClickGoBackHandler} startIcon={<ArrowBackIcon fontSize="large" color="disabled" />}>
                Go Back
            </Button>
            <Typography variant="h3" gutterBottom component="div">
                Date of upload
            </Typography>
            <Typography variant="h6" gutterBottom component="div">
                Photos : 
            </Typography>
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
            <Typography variant="h6" gutterBottom component="div">
                Weight : 
            </Typography>
            <Typography variant="h6" gutterBottom component="div">
                height : 
            </Typography>
            <Typography variant="h6" gutterBottom component="div">
                BMI : 
            </Typography>
            <Typography variant="h6" gutterBottom component="div">
                Measurements : 
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 250 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Units (in inch)</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {[{name:"bust", measure:"12"}, {name:"calves", measure:"10"}, {name:"arms", measure:"12"}].map((row) => (
                        <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{row.measure}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography variant="body1" gutterBottom>
            Bust: Measure around the chest right at the nipple line, but don't pull the tape too tight.<br/>
            Calves: Measure around the largest part of each calf.<br/>
            Chest: Measure just under your bust.<br/>
            Forearm: Measure around the largest part of the arm below the elbow.<br/>
            Hips: Place the tape measure around the biggest part of your hips.<br/>
            Thighs: Measure around the biggest part of each thigh.<br/>
            Upper arm: Measure around the largest part of each arm above the elbow.<br/>
            Waist: Measure a half-inch above your belly button or at the smallest part of your waist.<br/>
            </Typography>
        </Container>
    );
}
 
export default ProgressInfoPage;