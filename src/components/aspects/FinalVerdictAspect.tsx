import {Card, CircularProgress, Divider, Stack, Typography} from "@mui/joy";

export type FinalVerdictAspectProps = {
    authenticity: number;
    body: string;
    displayText: string;
    verdict: string;
}

function getColor(value: number) {
    if (value < 40) return '#f44336'; // Red
    if (value < 70) return '#ff9800'; // Orange
    return '#4caf50'; // Green
}

export function FinalVerdictAspect({authenticity, body, displayText, verdict}: FinalVerdictAspectProps) {
    const strokeColor = getColor(authenticity);

    return (
        <Card>
            <Stack direction="row" spacing={2}>
                <Stack spacing={2}>
                    <Typography typography="title-lg">Final Verdict</Typography>
                    <Typography typography="body-sm">{body}</Typography>
                    {/*<Divider/>*/}
                    {/*<Card color="primary">*/}
                    {/*    <Typography typography="h3">{displayText}</Typography>*/}
                    {/*</Card>*/}
                    {/*<Typography>{verdict}</Typography>*/}
                </Stack>
                <Stack alignItems="center" justifyContent="center" spacing={1}>
                    <CircularProgress
                        determinate
                        value={authenticity}
                        size="lg"
                        thickness={6}
                        sx={{
                            scale: "100%",
                            '--CircularProgress-progressColor': strokeColor,
                        }}>
                        <Typography level="title-lg">{authenticity}%</Typography>
                    </CircularProgress>
                    <Typography typography="body-sm">Authenticity</Typography>
                </Stack>
            </Stack>
        </Card>
    )
}