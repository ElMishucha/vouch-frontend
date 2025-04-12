import {Card, Typography} from "@mui/joy";

export type FactualClarificationAspectProps = {
    body: string;
    analysis: string;
};

export function FactualClarificationAspect({body, analysis}: FactualClarificationAspectProps) {
    return (
        <Card>
            <Typography typography="title-lg">Factual Clarification</Typography>
            <Typography typography="body-sm">{body}</Typography>
            <Typography typography="body-sm"><b>Analysis</b></Typography>
            <Typography typography="body-sm">{analysis}</Typography>
        </Card>
    )
}