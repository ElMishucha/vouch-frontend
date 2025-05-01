import {Alert, Box, CircularProgress, IconButton, Sheet, Stack, Typography} from "@mui/joy";
import {FinalVerdictAspect, FinalVerdictAspectProps} from "./components/aspects/FinalVerdictAspect.tsx";
import {
    FactualClarificationAspect, FactualClarificationAspectProps
} from "./components/aspects/FactualClarificationAspect.tsx"
import {SourceSupportAspect, SourceSupportAspectProps} from "./components/aspects/SourceSupportAspect.tsx";
import {PropagandaAspect, PropagandaAspectProps} from "./components/aspects/PropagandaAspect.tsx";
import {
    PersuasiveStrategiesAspect, PersuasiveStrategiesAspectProps
} from "./components/aspects/PersuasiveStrategiesAspect.tsx";
import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import {mockAnalysisResponse} from "./MockData.ts";
import {mockDataITDWILOResponse} from "./MockDataIllegalToDriveWithInteriorLightOn.ts";
import CloseIcon from "@mui/icons-material/Close";


export type DataType = {
    finalVerdict: FinalVerdictAspectProps | null;
    factualClarification: FactualClarificationAspectProps | null;
    propaganda: PropagandaAspectProps | null;
    sourceSupport: SourceSupportAspectProps | null;
    persuasiveStrategies: PersuasiveStrategiesAspectProps | null;
    error: string | null;
};

function App() {
    const MotionBox = motion(Box);


    const [selectedText, setSelectedText] = useState<string | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [data, setData] = useState<DataType | null>(null);
    const [dataLoading, setDataLoading] = useState(false);

    const [error, setError] = useState<string | null>(null);

    // Control Sidebar's position
    useEffect(() => {
        const container = document.getElementById('vouch-sidebar-container');
        if (container) {
            container.style.transition = 'right 0.3s ease';
            container.style.right = sidebarOpen ? '0px' : '-600px'; // or -100% if fully hidden
            document.body.style.transition = 'margin-right 0.3s ease';
            document.body.style.marginRight = sidebarOpen ? '600px' : '0px';
        }
    }, [sidebarOpen]);

    // Listen to FactCheck event
    useEffect(() => {
        const handleFactCheckEvent = (event: Event) => {
            const customEvent = event as CustomEvent<string>;
            console.log("Received fact check:", customEvent.detail);

            handleFactCheck(event);
        };

        window.addEventListener("vouch-fact-check", handleFactCheckEvent);

        return () => {
            window.removeEventListener("vouch-fact-check", handleFactCheckEvent);
        };
    }, []);

    // Handle FactCheck event
    const handleFactCheck = (event: Event) => {
        const customEvent = event as CustomEvent<string>;
        const text = customEvent.detail;

        setData(null);
        setError(null);
        setSelectedText(text);
        setSidebarOpen(true);
        setDataLoading(true);

        // 👇 Simulate API call or replace with real one
        // setTimeout(() => {
        //     setData(mockAnalysisResponse); // Replace with real fetch call
        //     setDataLoading(false);
        // }, 3000);

        // MDITDWILO Mock Data
        // setTimeout(() => {
        //     setData(mockDataITDWILOResponse); // Replace with real fetch call
        //     setDataLoading(false);
        // }, 7500);

        // Real Fetch:
        setTimeout(() => {
            fetch("http://localhost:8081/fact_check", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({claim: text})
            })
                .then(res => res.json())
                .then(res => {
                    if (res.error != null) {
                        console.error(res.error);
                        setError(res.error);
                        return;
                    }

                    if (res.analysisResponse == null) {
                        console.error("res.analysisResponse is null");
                        setError("Something went wrong. Please try again later.");
                        return;
                    }

                    setData(res.analysisResponse);
                })
                .catch(err => {
                    console.error("Failed to fetch:", err);
                    setError("Something went wrong. Please try again later.");
                })
                .finally(() => setDataLoading(false));
        }, 3000);
    };

    // Handle Close Button
    const handleClose = () => {
        setSidebarOpen(false);
    }


    return (
        <Sheet
            variant="plain"
            sx={{
                height: '100vh',
                overflowY: 'auto',
                p: 2,
                backgroundColor: 'background.body',
                fontFamily: 'Inter, sans-serif',
            }}
        >
            <Stack spacing={2} sx={{width: "100%", height: "100%", flexGrow: 1}}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={1}>
                        <Typography typography="h2" textColor="primary.500">Vouch</Typography>
                    </Stack>
                    <IconButton>
                        <CloseIcon onClick={handleClose}/>
                    </IconButton>
                </Stack>
                <Stack sx={{width: "100%", height: "100%", flexGrow: 1, paddingBottom: "1rem"}} spacing={2}>
                    {selectedText ? (
                        <Typography>
                            <b>Fact-Checking:</b> {selectedText.length > 200 ? `${selectedText.slice(0, 200)}...` : selectedText}
                        </Typography>
                    ) : null}


                    {/*Handle Loading*/}
                    {dataLoading ? (
                            <Box sx={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <CircularProgress size="lg" thickness={7}/>
                            </Box>
                        )
                        :
                        // Handle Errors
                        error != null ? (
                            <motion.div
                                initial={{opacity: 0, x: -20}}
                                animate={{opacity: 1, x: 0}}
                                transition={{duration: 0.4}}
                            >
                                <Alert color="danger" variant="soft">{error}</Alert>
                            </motion.div>
                        ) : data != null ? (
                            <Stack sx={{paddingBottom: "60px"}} spacing={2}>
                                {[
                                    data.finalVerdict && <FinalVerdictAspect {...data.finalVerdict} />,
                                    data.factualClarification && <FactualClarificationAspect {...data.factualClarification} />,
                                    data.sourceSupport && <SourceSupportAspect {...data.sourceSupport} />,
                                    data.propaganda && <PropagandaAspect {...data.propaganda} />,
                                    data.persuasiveStrategies && <PersuasiveStrategiesAspect {...data.persuasiveStrategies} />,
                                ]
                                    .filter(Boolean)
                                    .map((Component, index) => (
                                        <MotionBox
                                            key={index}
                                            initial={{opacity: 0, x: -30}}
                                            animate={{opacity: 1, x: 0}}
                                            transition={{delay: index * 0.2, duration: 0.5}}
                                        >
                                            {Component}
                                        </MotionBox>
                                    ))}

                                <Box sx={{mt: 4, pt: 2, borderTop: '1px solid', borderColor: 'divider'}}>
                                    <Typography typography="body-sm" textAlign="center" color="neutral"
                                                textColor="neutral.400">
                                        © 2025 Vouch • All rights reserved
                                    </Typography>
                                </Box>
                            </Stack>) : null
                    }
                </Stack>
            </Stack>
        </Sheet>
    )
}

export default App
