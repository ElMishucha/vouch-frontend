import {Box, Button, Card, CircularProgress, Stack} from "@mui/joy";
import Grid from "@mui/joy/Grid"
import {FinalVerdictAspect, FinalVerdictAspectProps} from "./components/aspects/FinalVerdictAspect.tsx";
import {
    FactualClarificationAspect,
    FactualClarificationAspectProps
} from "./components/aspects/FactualClarificationAspect.tsx"
import {SourceSupportAspect, SourceSupportAspectProps} from "./components/aspects/SourceSupportAspect.tsx";
import {PropagandaAspect, PropagandaAspectProps} from "./components/aspects/PropagandaAspect.tsx";
import {
    PersuasiveStrategiesAspect,
    PersuasiveStrategiesAspectProps
} from "./components/aspects/PersuasiveStrategiesAspect.tsx";
import {useState} from "react";

import {mockAnalysisResponse} from "./MockData.ts";

type DataType = {
    finalVerdict: FinalVerdictAspectProps;
    factualClarification: FactualClarificationAspectProps;
    propaganda: PropagandaAspectProps;
    sourceSupport: SourceSupportAspectProps;
    persuasiveStrategies: PersuasiveStrategiesAspectProps;
};

function App() {
    const [data, setData] = useState<DataType>();
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        setLoading(false);
        setData(mockAnalysisResponse);
        // axios
        //     .post("http://localhost:8081/fact_check", {claim: "Zelensky confirms Ukraine troops in Russia's Belgorod region; Ukraine's operations in a second region in Russia are explicitly acknowledged for the first time."})
        //     .then(res => setData(res.data.analysisResponse))
        //     .catch(err => console.log("Failed to fetch: ", err))
        //     .finally(() => setLoading(false));
    }

    return (
        <Stack sx={{width: "600px", height: "550px", maxWidth: "600px", maxHeight: "550px"}} spacing={2}>
            <Button onClick={handleSubmit}>Submit Claim</Button>

            {loading ? <CircularProgress /> : null}
            {data && (
                <>
                    <Grid container spacing={2} columns={6}>
                        <Grid xs={6}>
                            <FinalVerdictAspect {...data.finalVerdict} />
                        </Grid>
                        <Grid xs={6}>
                            <FactualClarificationAspect {...data.factualClarification} />
                        </Grid>
                        <Grid xs={6}>
                            <PropagandaAspect {...data.propaganda} />
                        </Grid>
                        <Grid xs={6}>
                            <SourceSupportAspect {...data.sourceSupport} />
                        </Grid>
                        <Grid xs={6}>
                            <PersuasiveStrategiesAspect {...data.persuasiveStrategies} />
                        </Grid>
                    </Grid>
                    {console.log(data)}
                </>
            )}
        </Stack>
    )
}

export default App
