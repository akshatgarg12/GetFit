import Container  from "@mui/material/Container";
import * as React from 'react';
import ProgressDiv from "../components/ProgressDiv";

interface ProgressPageProps {
    
}
 
const ProgressPage: React.FC<ProgressPageProps> = () => {
    return (
        <Container>
            btn to add progress
            contain three pics of each 15 days
            {
                [1, 2, 3].map((id) => (
                    <ProgressDiv />
                ))
            }
        </Container>
    );
}
 
export default ProgressPage;