import {Avatar, FormLabel, Card, Link, Stack, Typography, Radio, Tooltip, IconButton, Box} from "@mui/joy";
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';

// Support levels mapped to index (0 = Strongly Deny, 4 = Strongly Support)
const supportLevels = [
    "Strongly Deny",
    "Deny",
    "Neutral",
    "Support",
    "Strongly Support",
];

type SupportProps = {
    value: string;
};

export function SupportIndicator({value}: SupportProps) {
    const selectedIndex = supportLevels.indexOf(value);

    return (
        <Stack direction="row" spacing={5} sx={{
            mt: 2,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto"
        }}>
            {supportLevels.map((level, idx) => (
                <Stack direction="column" alignItems="center" key={level}>
                    <FormLabel>
                        <Radio
                            value={level}
                            disabled
                            checked={idx === selectedIndex}
                            color="neutral"
                            size="sm"
                        />
                    </FormLabel>
                    <Typography typography="body-sm" fontSize="12px">{level}</Typography>
                </Stack>
            ))}
        </Stack>
    );
}

type SourceProps = {
    title: string;
    url: string;
    date: string;
    body: string;
    support: string;
};

export function Source({title, url, date, body, support}: SourceProps) {
    return (
        <Card>
            <Stack direction="row" spacing={1} sx={{display: "flex", alignItems: "center"}}>
                <Avatar src={"https://www.google.com/s2/favicons?domain=" + url + "&sz=256"} size="sm"
                        sx={{scale: "75%"}}/>
                <Link href={url} underline="always" color="neutral" target="_blank" rel="noopener noreferrer">
                    <Typography typography="title-sm">{title}</Typography>
                </Link>
            </Stack>

            <Typography typography="body-sm">
                {body}
            </Typography>

            <SupportIndicator value={support}/>

            <Stack alignItems="end" spacing={1}>
                <Typography typography="body-sm" fontSize="12px" color="neutral">{date}</Typography>
            </Stack>
        </Card>
    )
}

export type SourceSupportAspectProps = {
    body: string;
    sources: SourceProps[];
};

export function SourceSupportAspect({body, sources}: SourceSupportAspectProps) {
    return (
        <Card>
            <Stack justifyContent="space-between" direction="row">
                <Typography typography="title-lg">Source Support</Typography>
                <Tooltip
                    title={
                        <Box sx={{maxWidth: "400px"}}>
                            <Typography typography="body-sm" noWrap={false}>Shows how each source evaluates the claim —
                                whether it supports, denies, or remains neutral — with a short summary and confidence
                                level.
                            </Typography>
                        </Box>
                    }
                    variant="outlined"
                    placement="top"
                >
                    <IconButton size="sm">
                        <InfoOutlineIcon/>
                    </IconButton>
                </Tooltip>
            </Stack>
            <Typography typography="body-sm">{body}</Typography>

            {sources.map(source => (
                <Source
                    title={source.title}
                    url={source.url}
                    date={source.date}
                    body={source.body}
                    support={source.support}
                />
            ))}

            {/*<Source*/}
            {/*    title="Dow Jones Plunges Amid Tariff Concerns"*/}
            {/*    url="https://www.bloomberg.com/news/articles/2024-11-01/dow-jones-plunges-amid-tariff-concerns"*/}
            {/*    date="2024-11-01"*/}
            {/*    body="The article discusses the market's adverse reaction to tariff announcements without specifying a drop of 2,000 points."*/}
            {/*    support="Neutral"*/}
            {/*/>*/}
            {/*<Source*/}
            {/*    title="Market Reaction to Tariff Announcement"*/}
            {/*    url="https://www.reuters.com/markets/us-shares-sink-tariff-revisions-2024-11-01/"*/}
            {/*    date="2024-11-01"*/}
            {/*    body="The piece states that U.S. shares, including the Dow, sank amid fears of revised tariffs but lacks specific point details."*/}
            {/*    support="Neutral"*/}
            {/*/>*/}
            {/*<Source*/}
            {/*    title="Dow Jones Experiences Severe Losses After Tariff News"*/}
            {/*    url="https://www.cnbc.com/2024/11/01/dow-jones-experiences-severe-losses-after-tariff-news.html"*/}
            {/*    date="2024-11-01"*/}
            {/*    body="The report elaborates on the overall drop in the Dow without specifying that it was 2,000 points."*/}
            {/*    support="Neutral"*/}
            {/*/>*/}
        </Card>
    )
}