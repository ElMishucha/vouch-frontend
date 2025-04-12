import {Card, Slider, Stack, Typography} from "@mui/joy";

export type PropagandaAspectProps = {
    body: string;
    leftSideName: string;
    rightSideName: string;
    biasSlider: number;
}

export function PropagandaAspect({body, leftSideName, rightSideName, biasSlider}: PropagandaAspectProps) {
    return (
        <Card>
            <Typography typography="title-lg">Propaganda</Typography>
            <Typography typography="body-sm">{body}</Typography>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                <Typography typography="body-sm">{leftSideName}</Typography>
                <Slider disabled value={biasSlider} track={false} marks step={50} size="md" sx={{width: "40%"}}></Slider>
                <Typography typography="body-sm">{rightSideName}</Typography>
            </Stack>
        </Card>
    )
}