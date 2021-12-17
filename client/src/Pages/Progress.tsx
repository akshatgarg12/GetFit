import Container  from "@mui/material/Container";
import * as React from 'react';
import ProgressDiv from "../components/ProgressDiv";

interface ProgressPageProps {
    
}
 
const ProgressPage: React.FC<ProgressPageProps> = () => {
    return (
        <Container>
            btn to add progress
            {
                [1, 2, 3].map((id) => (
                    <ProgressDiv key={id} />
                ))
            }
        </Container>
    );
}
 
export default ProgressPage;