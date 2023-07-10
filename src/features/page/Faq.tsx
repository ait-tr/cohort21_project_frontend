import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { Container } from '@mui/material';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />))(({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
    }));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function Faq() {
    const [expanded, setExpanded] = React.useState<string | false>('panel1');

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    return (
        <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
            <Typography variant="h4" component="h1" sx={{ marginBottom: '1rem' }}>
                FAQ
            </Typography>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography>How To become a Helper</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Create an account to get started. Provide your necessary details to complete the registration process.
                        <Typography>TypographyOnce signed up, you will have access to your personal profile page. Here, you can manage your information and settings.
                        </Typography>On your profile page, you will find an option to add a HelpCard. Click on it to create a new card.
                        Select the category and subcategory that best represents the type of help you can offer.
                        Write a concise  description that will be displayed on the small view of cards on the start page. This description should briefly explain how you can assist others.
                        Include a comprehensive and detailed description of the help you are offering. This description will be displayed on the detail page when users click on your card.
                        Upload a relevant picture that represents your service.
                        Once you have filled in all the necessary information, save your HelpCard. It will be automatically shown on the start page, where users can browse.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Typography>Payments</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        When a user is interested in your services, they will reach out to you and become your contact. This can be done through the contact information you provide on your HelpCard or through the messaging system within the platform.
                        It is up to you and the user to decide on the payment method and details privately. Get Help does not provide a built-in payment system, and therefore, any financial transactions and agreements should be discussed and agreed upon between you and the user.
                        It is important to note that any financial transactions related to your services should comply with local laws and regulations. Ensure that you familiarize yourself with the legal requirements regarding self-employment, taxes, and any necessary permits or licenses. Seek professional advice if needed to ensure compliance.
                        As a self-employed individual, you are responsible for reporting and paying taxes on your earnings. Keep accurate records of your income and expenses, and consult with a tax professional or relevant government agencies to understand your tax obligations and ensure proper compliance.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                    <Typography>How to delete my Account</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Send an email or message to our support team stating your request to delete your account.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Container>
    );
}