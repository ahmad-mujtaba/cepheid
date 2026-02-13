import { CelestialObject } from "./app/types/celestialobject.type";

// Popular astrophotography targets not in Messier or Caldwell catalogs
// Includes dark nebulae, emission nebulae, and other photogenic deep sky objects
export const astrophotoObjects: Array<CelestialObject> = [

    // === DARK NEBULAE ===
    {
        "catalogue": "B33 / IC 434",
        "common_name": "Horsehead Nebula",
        "type": "Dark Nebula",
        "magnitude": 6.8,
        "dimensions": "6'x4'",
        "ra": "05h 40m 59s",
        "dec": "-02° 27' 30\"",
        "constellation": "Orion"
    },
    {
        "catalogue": "B68",
        "common_name": "Barnard 68",
        "type": "Dark Nebula",
        "magnitude": 99.0,
        "dimensions": "5'",
        "ra": "17h 22m 39s",
        "dec": "-23° 49' 48\"",
        "constellation": "Ophiuchus"
    },
    {
        "catalogue": "B72",
        "common_name": "Snake Nebula",
        "type": "Dark Nebula",
        "magnitude": 99.0,
        "dimensions": "30'",
        "ra": "17h 23m 30s",
        "dec": "-23° 38' 00\"",
        "constellation": "Ophiuchus"
    },
    {
        "catalogue": "B59",
        "common_name": "Pipe Nebula (Bowl)",
        "type": "Dark Nebula",
        "magnitude": 99.0,
        "dimensions": "300'x60'",
        "ra": "17h 27m 00s",
        "dec": "-27° 23' 00\"",
        "constellation": "Ophiuchus"
    },
    {
        "catalogue": "B78",
        "common_name": "Pipe Nebula (Stem)",
        "type": "Dark Nebula",
        "magnitude": 99.0,
        "dimensions": "200'x15'",
        "ra": "17h 33m 00s",
        "dec": "-26° 30' 00\"",
        "constellation": "Ophiuchus"
    },
    {
        "catalogue": "B86",
        "common_name": "Inkspot Nebula",
        "type": "Dark Nebula",
        "magnitude": 99.0,
        "dimensions": "5'",
        "ra": "18h 02m 42s",
        "dec": "-27° 53' 00\"",
        "constellation": "Sagittarius"
    },
    {
        "catalogue": "B92",
        "common_name": "Barnard 92",
        "type": "Dark Nebula",
        "magnitude": 99.0,
        "dimensions": "15'x12'",
        "ra": "18h 15m 42s",
        "dec": "-18° 14' 00\"",
        "constellation": "Sagittarius"
    },
    {
        "catalogue": "B142/143",
        "common_name": "Barnard's E Nebula",
        "type": "Dark Nebula",
        "magnitude": 99.0,
        "dimensions": "80'x50'",
        "ra": "19h 40m 42s",
        "dec": "+10° 31' 00\"",
        "constellation": "Aquila"
    },
    {
        "catalogue": "B150",
        "common_name": "Barnard 150",
        "type": "Dark Nebula",
        "magnitude": 99.0,
        "dimensions": "35'",
        "ra": "20h 51m 06s",
        "dec": "+60° 11' 00\"",
        "constellation": "Cepheus"
    },
    {
        "catalogue": "LDN 1622",
        "common_name": "Boogeyman Nebula",
        "type": "Dark Nebula",
        "magnitude": 99.0,
        "dimensions": "30'x10'",
        "ra": "05h 54m 24s",
        "dec": "+01° 46' 00\"",
        "constellation": "Orion"
    },
    {
        "catalogue": "LDN 673",
        "common_name": "Dark Nebula in Aquila",
        "type": "Dark Nebula",
        "magnitude": 99.0,
        "dimensions": "15'",
        "ra": "19h 20m 54s",
        "dec": "+11° 17' 00\"",
        "constellation": "Aquila"
    },
    {
        "catalogue": "Coalsack",
        "common_name": "Coalsack Nebula",
        "type": "Dark Nebula",
        "magnitude": 99.0,
        "dimensions": "420'x300'",
        "ra": "12h 50m 00s",
        "dec": "-62° 30' 00\"",
        "constellation": "Crux"
    },
    {
        "catalogue": "LDN 1251",
        "common_name": "LDN 1251",
        "type": "Dark Nebula",
        "magnitude": 99.0,
        "dimensions": "30'x10'",
        "ra": "22h 35m 30s",
        "dec": "+75° 17' 00\"",
        "constellation": "Cepheus"
    },
    {
        "catalogue": "B352",
        "common_name": "Barnard 352",
        "type": "Dark Nebula",
        "magnitude": 99.0,
        "dimensions": "10'x5'",
        "ra": "21h 01m 00s",
        "dec": "+68° 08' 00\"",
        "constellation": "Cepheus"
    },

    // === EMISSION & REFLECTION NEBULAE ===
    {
        "catalogue": "IC 1805",
        "common_name": "Heart Nebula",
        "type": "Emission Nebula",
        "magnitude": 6.5,
        "dimensions": "150'x150'",
        "ra": "02h 32m 42s",
        "dec": "+61° 27' 00\"",
        "constellation": "Cassiopeia"
    },
    {
        "catalogue": "IC 1848",
        "common_name": "Soul Nebula",
        "type": "Emission Nebula",
        "magnitude": 6.5,
        "dimensions": "150'x75'",
        "ra": "02h 51m 06s",
        "dec": "+60° 24' 00\"",
        "constellation": "Cassiopeia"
    },
    {
        "catalogue": "NGC 7380",
        "common_name": "Wizard Nebula",
        "type": "Emission Nebula",
        "magnitude": 7.2,
        "dimensions": "25'x25'",
        "ra": "22h 47m 00s",
        "dec": "+58° 07' 54\"",
        "constellation": "Cepheus"
    },
    {
        "catalogue": "NGC 281",
        "common_name": "Pacman Nebula",
        "type": "Emission Nebula",
        "magnitude": 7.4,
        "dimensions": "35'x30'",
        "ra": "00h 52m 24s",
        "dec": "+56° 37' 00\"",
        "constellation": "Cassiopeia"
    },
    {
        "catalogue": "IC 1396",
        "common_name": "Elephant's Trunk Nebula",
        "type": "Emission Nebula",
        "magnitude": 3.5,
        "dimensions": "170'x140'",
        "ra": "21h 38m 57s",
        "dec": "+57° 30' 00\"",
        "constellation": "Cepheus"
    },
    {
        "catalogue": "IC 5070",
        "common_name": "Pelican Nebula",
        "type": "Emission Nebula",
        "magnitude": 8.0,
        "dimensions": "60'x50'",
        "ra": "20h 50m 48s",
        "dec": "+44° 21' 00\"",
        "constellation": "Cygnus"
    },
    {
        "catalogue": "IC 2177",
        "common_name": "Seagull Nebula",
        "type": "Emission Nebula",
        "magnitude": 7.0,
        "dimensions": "120'x40'",
        "ra": "07h 04m 06s",
        "dec": "-10° 27' 00\"",
        "constellation": "Monoceros"
    },
    {
        "catalogue": "IC 443",
        "common_name": "Jellyfish Nebula",
        "type": "Supernova Remnant",
        "magnitude": 12.0,
        "dimensions": "50'x40'",
        "ra": "06h 17m 00s",
        "dec": "+22° 47' 00\"",
        "constellation": "Gemini"
    },
    {
        "catalogue": "NGC 2174",
        "common_name": "Monkey Head Nebula",
        "type": "Emission Nebula",
        "magnitude": 6.8,
        "dimensions": "40'x30'",
        "ra": "06h 09m 24s",
        "dec": "+20° 39' 36\"",
        "constellation": "Orion"
    },
    {
        "catalogue": "IC 2118",
        "common_name": "Witch Head Nebula",
        "type": "Reflection Nebula",
        "magnitude": 13.0,
        "dimensions": "180'x60'",
        "ra": "05h 06m 54s",
        "dec": "-07° 13' 00\"",
        "constellation": "Eridanus"
    },
    {
        "catalogue": "NGC 1977",
        "common_name": "Running Man Nebula",
        "type": "Reflection Nebula",
        "magnitude": 7.0,
        "dimensions": "20'x10'",
        "ra": "05h 35m 18s",
        "dec": "-04° 52' 00\"",
        "constellation": "Orion"
    },
    {
        "catalogue": "Sh2-101",
        "common_name": "Tulip Nebula",
        "type": "Emission Nebula",
        "magnitude": 9.0,
        "dimensions": "16'x9'",
        "ra": "19h 59m 36s",
        "dec": "+35° 17' 00\"",
        "constellation": "Cygnus"
    },
    {
        "catalogue": "IC 4592",
        "common_name": "Blue Horsehead Nebula",
        "type": "Reflection Nebula",
        "magnitude": 7.0,
        "dimensions": "60'x40'",
        "ra": "16h 12m 00s",
        "dec": "-19° 28' 00\"",
        "constellation": "Scorpius"
    },
    {
        "catalogue": "Sh2-106",
        "common_name": "Sharpless 106",
        "type": "Emission Nebula",
        "magnitude": 14.0,
        "dimensions": "3'x2'",
        "ra": "20h 27m 27s",
        "dec": "+37° 22' 36\"",
        "constellation": "Cygnus"
    },
    {
        "catalogue": "IC 1318",
        "common_name": "Sadr Region",
        "type": "Emission Nebula",
        "magnitude": 5.0,
        "dimensions": "180'x180'",
        "ra": "20h 22m 14s",
        "dec": "+40° 15' 00\"",
        "constellation": "Cygnus"
    },
    {
        "catalogue": "NGC 7822",
        "common_name": "Question Mark Nebula",
        "type": "Emission Nebula",
        "magnitude": 7.0,
        "dimensions": "60'x30'",
        "ra": "00h 03m 36s",
        "dec": "+68° 37' 00\"",
        "constellation": "Cepheus"
    },
    {
        "catalogue": "Sh2-132",
        "common_name": "Lion Nebula",
        "type": "Emission Nebula",
        "magnitude": 10.0,
        "dimensions": "40'x30'",
        "ra": "22h 19m 06s",
        "dec": "+56° 05' 00\"",
        "constellation": "Cepheus"
    },
    {
        "catalogue": "Abell 21",
        "common_name": "Medusa Nebula",
        "type": "Planetary Nebula",
        "magnitude": 10.0,
        "dimensions": "10'x10'",
        "ra": "07h 29m 02s",
        "dec": "+13° 14' 48\"",
        "constellation": "Gemini"
    },
    {
        "catalogue": "Sh2-129",
        "common_name": "Flying Bat Nebula",
        "type": "Emission Nebula",
        "magnitude": 12.0,
        "dimensions": "200'x150'",
        "ra": "21h 11m 48s",
        "dec": "+59° 59' 00\"",
        "constellation": "Cepheus"
    },
    {
        "catalogue": "Ou4",
        "common_name": "Squid Nebula",
        "type": "Emission Nebula",
        "magnitude": 14.0,
        "dimensions": "60'x30'",
        "ra": "21h 11m 48s",
        "dec": "+59° 59' 00\"",
        "constellation": "Cepheus"
    },
    {
        "catalogue": "Sh2-240",
        "common_name": "Spaghetti Nebula",
        "type": "Supernova Remnant",
        "magnitude": 12.0,
        "dimensions": "180'",
        "ra": "05h 40m 54s",
        "dec": "+28° 00' 00\"",
        "constellation": "Taurus"
    },
    {
        "catalogue": "vdB 152",
        "common_name": "Wolf's Cave Nebula",
        "type": "Reflection Nebula",
        "magnitude": 9.3,
        "dimensions": "5'x3'",
        "ra": "22h 13m 24s",
        "dec": "+70° 15' 00\"",
        "constellation": "Cepheus"
    },
    {
        "catalogue": "Sh2-308",
        "common_name": "Dolphin Head Nebula",
        "type": "Emission Nebula",
        "magnitude": 8.0,
        "dimensions": "40'x30'",
        "ra": "06h 54m 12s",
        "dec": "-23° 55' 00\"",
        "constellation": "Canis Major"
    },

    // === GALAXIES ===
    {
        "catalogue": "NGC 3628",
        "common_name": "Hamburger Galaxy",
        "type": "Spiral Galaxy",
        "magnitude": 9.5,
        "dimensions": "15'x3'",
        "ra": "11h 20m 17s",
        "dec": "+13° 35' 23\"",
        "constellation": "Leo"
    },
    {
        "catalogue": "NGC 3521",
        "common_name": "Bubble Galaxy",
        "type": "Spiral Galaxy",
        "magnitude": 9.0,
        "dimensions": "13'x6'",
        "ra": "11h 05m 49s",
        "dec": "-00° 02' 09\"",
        "constellation": "Leo"
    },
    {
        "catalogue": "NGC 2841",
        "common_name": "Tiger's Eye Galaxy",
        "type": "Spiral Galaxy",
        "magnitude": 9.2,
        "dimensions": "8'x4'",
        "ra": "09h 22m 02s",
        "dec": "+50° 58' 35\"",
        "constellation": "Ursa Major"
    },
    {
        "catalogue": "NGC 2976",
        "common_name": "NGC 2976",
        "type": "Spiral Galaxy",
        "magnitude": 10.2,
        "dimensions": "6'x3'",
        "ra": "09h 47m 15s",
        "dec": "+67° 54' 59\"",
        "constellation": "Ursa Major"
    },
    {
        "catalogue": "NGC 4656",
        "common_name": "Hockey Stick Galaxy",
        "type": "Irregular Galaxy",
        "magnitude": 10.5,
        "dimensions": "15'x3'",
        "ra": "12h 43m 57s",
        "dec": "+32° 10' 05\"",
        "constellation": "Canes Venatici"
    },
    {
        "catalogue": "NGC 7217",
        "common_name": "NGC 7217",
        "type": "Spiral Galaxy",
        "magnitude": 10.1,
        "dimensions": "4'x3'",
        "ra": "22h 07m 52s",
        "dec": "+31° 21' 33\"",
        "constellation": "Pegasus"
    },
    {
        "catalogue": "NGC 4395",
        "common_name": "NGC 4395",
        "type": "Spiral Galaxy",
        "magnitude": 10.2,
        "dimensions": "13'x11'",
        "ra": "12h 25m 49s",
        "dec": "+33° 32' 48\"",
        "constellation": "Canes Venatici"
    },

    // === STAR CLUSTERS ===
    {
        "catalogue": "Mel 111",
        "common_name": "Coma Star Cluster",
        "type": "Open Cluster",
        "magnitude": 1.8,
        "dimensions": "275'",
        "ra": "12h 25m 06s",
        "dec": "+26° 06' 00\"",
        "constellation": "Coma Berenices"
    },
    {
        "catalogue": "Stock 2",
        "common_name": "Muscle Man Cluster",
        "type": "Open Cluster",
        "magnitude": 4.4,
        "dimensions": "60'",
        "ra": "02h 15m 00s",
        "dec": "+59° 16' 00\"",
        "constellation": "Cassiopeia"
    },
    {
        "catalogue": "Cr 399",
        "common_name": "Coathanger Cluster",
        "type": "Asterism",
        "magnitude": 3.6,
        "dimensions": "60'",
        "ra": "19h 25m 24s",
        "dec": "+20° 11' 00\"",
        "constellation": "Vulpecula"
    },
    {
        "catalogue": "NGC 1502",
        "common_name": "Kemble's Cascade Cluster",
        "type": "Open Cluster",
        "magnitude": 5.7,
        "dimensions": "8'",
        "ra": "04h 07m 48s",
        "dec": "+62° 19' 54\"",
        "constellation": "Camelopardalis"
    },
    {
        "catalogue": "NGC 6939",
        "common_name": "NGC 6939",
        "type": "Open Cluster",
        "magnitude": 7.8,
        "dimensions": "8'",
        "ra": "20h 31m 24s",
        "dec": "+60° 39' 42\"",
        "constellation": "Cepheus"
    }
];
