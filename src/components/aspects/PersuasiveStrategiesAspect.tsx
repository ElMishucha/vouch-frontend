import {Card, Typography} from "@mui/joy";

type techniqueProps = {
    name: string;
    description: string;
};

export function Technique({name, description}: techniqueProps) {
    return (
        <Card>
            <Typography typography="title-sm">{name}</Typography>
            <Typography typography="body-sm">{description}</Typography>
        </Card>
    )
}

export type PersuasiveStrategiesAspectProps = {
    body: string;
    techniques: techniqueProps[];
};

export function PersuasiveStrategiesAspect({body, techniques}: PersuasiveStrategiesAspectProps) {
    return (
        <Card>
            <Typography typography="title-lg">Persuasive Strategies</Typography>
            <Typography typography="body-sm">{body}</Typography>
            {techniques.map(technique => (
                <Technique name={technique.name} description={technique.description} />
            ))}
        </Card>
    )
}