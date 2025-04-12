// src/mockData.ts
export const mockAnalysisResponse = {
    finalVerdict: {
        body: "The evidence from multiple reliable sources strongly supports the claim about Ukrainian troops in Belgorod and operations in other regions.",
        displayText: "Claim is True",
        authenticity: 95.0,
        verdict: "True"
    },
    factualClarification: {
        body: "It is true that Zelensky has acknowledged Ukrainian operations in Russia's Belgorod region and that other regions are mentioned.",
        analysis: "Each source provides clear confirmation of Ukrainian troop activities in Belgorod, consistent with the claim that operations are acknowledged in two regions."
    },
    sourceSupport: {
        body: "All sources confirm that Zelensky has acknowledged the Ukrainian military's activities in the Belgorod region, and some explicitly mention operations in additional regions.",
        sources: [
            {
                title: "Zelensky Acknowledges Ukrainian Operations in Belgorod Region",
                url: "https://www.reuters.com/world/europe/zelensky-says-ukrainian-troops-have-entered-russia-belgorod-region-2024-11-01/",
                date: "2024-11-01",
                body: "Zelensky states that Ukrainian troops are present in Russia’s Belgorod region.",
                support: "Strongly Support"
            },
            {
                title: "Ukrainian Troops Engage Inside Russian Territory",
                url: "https://www.cnn.com/2024/11/01/europe/ukraine-belgorod-operations/index.html",
                date: "2024-11-01",
                body: "The article discusses the engagement of Ukrainian troops in Belgorod and mentions operations in other regions.",
                support: "Strongly Support"
            }
        ]
    },
    propaganda: {
        body: "Some sources use emotionally charged language when referring to 'incursions' or 'violations', which may suggest bias toward portraying Ukraine's actions as aggressive.",
        leftSideName: "Ukrainian Government",
        rightSideName: "Russian State Media",
        biasSlider: 40
    },
    persuasiveStrategies: {
        body: "Certain headlines and quotes appear to use persuasive techniques aimed at amplifying the threat or urgency of the situation.",
        techniques: [
            {
                name: "Loaded Language",
                description: "Phrases like 'deep incursion' or 'brazen violation' are used to evoke emotional reactions."
            },
            {
                name: "Appeal to Fear",
                description: "Descriptions emphasize the potential for escalation or broader conflict, likely to provoke anxiety."
            }
        ]
    }
};
