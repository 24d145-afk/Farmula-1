from fastapi import APIRouter
from datetime import datetime

router = APIRouter(prefix="/policy", tags=["Policy"])
SCHEMES = [
    {
        "id": 1,
        "title": "PM-KISAN Direct Benefit Transfer",
        "short_description": "₹6000 per year income support to farmers",
        "full_description": "This government scheme provides direct financial support to eligible farmers to improve income stability and agricultural sustainability. The assistance is transferred directly to beneficiaries’ bank accounts, ensuring transparency, reducing dependency on intermediaries, and supporting timely investment in essential farming activities.",
        "category": "subsidy",
        "scheme_type": "central",
        "status": "Active",
        "deadline": "31 Dec 2025",
        "benefits": [
            "₹2000 per installment",
            "Direct bank transfer",
            "No intermediaries",
            "Covers small and marginal farmers"
        ],
        "apply_url": "https://pmkisan.gov.in"
    },
    {
        "id": 2,
        "title": "Pradhan Mantri Fasal Bima Yojana",
        "short_description": "Crop insurance against natural calamities",
        "full_description": "This scheme offers insurance protection to farmers against crop losses caused by natural calamities, pests, and diseases. It aims to reduce financial risks, stabilize agricultural income, encourage crop diversification, and support farmers in continuing cultivation despite unexpected environmental challenges.",
        "category": "insurance",
        "scheme_type": "central",
        "status": "Available",
        "deadline": "15 Jan 2026",
        "benefits": [
            "Low premium rates",
            "Fast claim settlement",
            "Wide crop coverage",
            "Protection against crop loss"
        ],
        "apply_url": "https://pmfby.gov.in"
    },
    {
        "id": 3,
        "title": "Soil Health Card Scheme",
        "short_description": "Soil testing and nutrient recommendations",
        "full_description": "This scheme helps farmers assess soil quality by providing scientific soil testing and crop-specific nutrient recommendations. It promotes balanced fertilizer usage, improves soil fertility, reduces input costs, and supports sustainable agricultural practices that enhance long-term productivity and environmental health.",
        "category": "subsidy",
        "scheme_type": "central",
        "status": "Active",
        "deadline": "Open",
        "benefits": [
            "Free soil testing",
            "Better fertilizer usage",
            "Improved productivity",
            "Reduced cultivation cost"
        ],
        "apply_url": "https://soilhealth.dac.gov.in"
    },
    {
        "id": 4,
        "title": "Kisan Credit Card",
        "short_description": "Easy credit for agricultural needs",
        "full_description": "This scheme enables farmers to access timely and affordable credit for agricultural and allied activities. It supports smooth cash flow, reduces dependency on informal lenders, offers flexible repayment options, and helps farmers manage cultivation expenses efficiently throughout the cropping cycle.",
        "category": "insurance",
        "scheme_type": "central",
        "status": "Active",
        "deadline": "Open",
        "benefits": [
            "Low interest loans",
            "Flexible repayment",
            "Insurance coverage",
            "Easy renewal process"
        ],
        "apply_url": "https://www.myscheme.gov.in/schemes/kcc"
    },
    {
        "id": 5,
        "title": "Organic Farming Subsidy",
        "short_description": "Support for organic farming practices",
        "full_description": "This scheme encourages farmers to adopt organic farming practices by providing financial assistance, certification support, and technical guidance. It aims to improve soil health, reduce chemical dependency, promote eco-friendly cultivation methods, and enhance market opportunities for organically produced crops.",
        "category": "subsidy",
        "scheme_type": "state",
        "status": "New",
        "deadline": "28 Feb 2026",
        "benefits": [
            "50% input subsidy",
            "Free organic certification",
            "Market linkage",
            "Improved soil health"
        ],
        "apply_url": "https://pgsindia-ncof.gov.in"
    },
    {
        "id": 6,
        "title": "Modern Farming Equipment Subsidy",
        "short_description": "Subsidy on modern agricultural machinery",
        "full_description": "This scheme supports farmers in purchasing modern agricultural machinery by offering financial subsidies and technical assistance. It aims to increase farm efficiency, reduce labor dependency, improve operational precision, and enable farmers to adopt advanced mechanized practices for higher productivity.",
        "category": "equipment",
        "scheme_type": "state",
        "status": "Active",
        "deadline": "30 Jun 2026",
        "benefits": [
            "Up to 40% subsidy",
            "Technical training",
            "Warranty support",
            "Reduced labor dependency"
        ],
        "apply_url": "https://agrimachinery.nic.in"
    },
    {
        "id": 7,
        "title": "Drip Irrigation Subsidy",
        "short_description": "Water-efficient irrigation systems",
        "full_description": "This scheme supports farmers in purchasing modern agricultural machinery by offering financial subsidies and technical assistance. It aims to increase farm efficiency, reduce labor dependency, improve operational precision, and enable farmers to adopt advanced mechanized practices for higher productivity.",
        "category": "subsidy",
        "scheme_type": "state",
        "status": "Available",
        "deadline": "31 Mar 2026",
        "benefits": [
            "Water saving",
            "Higher crop yield",
            "Energy efficiency",
            "Reduced water wastage"
        ],
        "apply_url": "https://pmksy.gov.in"
    },
    {
        "id": 8,
        "title": "Seed Distribution Scheme",
        "short_description": "High-quality seeds at subsidized rates",
        "full_description": "This scheme ensures farmers receive high-quality, certified seeds at subsidized rates to improve crop performance. It supports timely seed availability, enhances germination quality, increases agricultural productivity, and helps farmers achieve better yields through improved varietal selection.",
        "category": "subsidy",
        "scheme_type": "state",
        "status": "Active",
        "deadline": "Seasonal",
        "benefits": [
            "Improved crop yield",
            "Affordable prices",
            "Quality assurance",
            "Timely seed availability"
        ],
        "apply_url": "https://www.myscheme.gov.in"
    },
    {
  "id": 9,
  "title": "National Agriculture Market (e-NAM)",
  "short_description": "Online trading platform for agricultural produce",
  "full_description": "This scheme connects farmers to a nationwide digital market for transparent price discovery and better sales opportunities. It reduces middlemen involvement, improves market access, ensures fair pricing, enhances logistics coordination, and enables farmers to sell produce efficiently across multiple regions.",
  "category": "market",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "Open",
  "benefits": [
    "Better price discovery",
    "Online trading access",
    "Reduced middlemen",
    "Wider market reach"
  ],
  "apply_url": "https://www.enam.gov.in"
},
{
  "id": 10,
  "title": "Pradhan Mantri Krishi Sinchai Yojana",
  "short_description": "Improved irrigation infrastructure support",
  "full_description": "This scheme improves irrigation facilities by promoting efficient water usage and expanding irrigation coverage. It supports water conservation, micro irrigation systems, watershed development, and better farm productivity while reducing dependency on rainfall and increasing crop sustainability.",
  "category": "irrigation",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "Open",
  "benefits": [
    "Improved water availability",
    "Micro irrigation support",
    "Higher crop productivity",
    "Water conservation"
  ],
  "apply_url": "https://pmksy.gov.in"
},
{
  "id": 11,
  "title": "National Livestock Mission",
  "short_description": "Support for livestock development and productivity",
  "full_description": "This scheme supports livestock farmers through breeding improvement, fodder development, veterinary services, and entrepreneurship promotion. It enhances animal productivity, strengthens rural income sources, improves animal healthcare access, and encourages sustainable livestock management practices for long term economic stability.",
  "category": "livestock",
  "scheme_type": "central",
  "status": "Available",
  "deadline": "31 Dec 2026",
  "benefits": [
    "Better animal health",
    "Fodder development",
    "Income generation",
    "Skill training"
  ],
  "apply_url": "https://nlm.udyamimitra.in"
},
{
  "id": 12,
  "title": "Solar Pump Subsidy Scheme",
  "short_description": "Solar powered irrigation pump assistance",
  "full_description": "This scheme promotes renewable energy adoption by providing subsidies for solar powered irrigation pumps. It reduces electricity costs, ensures reliable water supply, supports eco friendly farming, decreases carbon emissions, and enables farmers to achieve sustainable irrigation with minimal operational expenses.",
  "category": "energy",
  "scheme_type": "state",
  "status": "New",
  "deadline": "30 Sep 2026",
  "benefits": [
    "Reduced electricity cost",
    "Eco friendly energy",
    "Reliable irrigation",
    "Low maintenance"
  ],
  "apply_url": "https://mnre.gov.in"
},
{
  "id": 13,
  "title": "Cold Storage Infrastructure Scheme",
  "short_description": "Post harvest storage support for farmers",
  "full_description": "This scheme supports farmers in building cold storage facilities to reduce post harvest losses and preserve crop quality. It improves shelf life, stabilizes market supply, enhances farmer income, enables better price realization, and strengthens agricultural supply chain efficiency.",
  "category": "infrastructure",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "31 Mar 2027",
  "benefits": [
    "Reduced crop wastage",
    "Better storage facilities",
    "Improved income",
    "Market stability"
  ],
  "apply_url": "https://mofpi.gov.in"
},
{
  "id": 14,
  "title": "Farmer Producer Organization Scheme",
  "short_description": "Collective farming and marketing support",
  "full_description": "This scheme encourages farmers to form producer organizations for collective input procurement, production planning, processing, and marketing. It strengthens bargaining power, improves access to credit, enhances market linkages, increases profitability, and promotes sustainable farmer entrepreneurship.",
  "category": "organization",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "Open",
  "benefits": [
    "Collective bargaining",
    "Better market access",
    "Credit support",
    "Higher profitability"
  ],
  "apply_url": "https://sfacindia.com"
},
{
  "id": 15,
  "title": "Rashtriya Krishi Vikas Yojana",
  "short_description": "State agriculture development funding support",
  "full_description": "This scheme provides financial assistance to states for strengthening agriculture infrastructure, improving farm productivity, promoting innovation, and supporting agribusiness development. It enables flexible planning based on regional needs, enhances farmer income, and accelerates sustainable agricultural growth across districts.",
  "category": "development",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "Open",
  "benefits": ["Infrastructure funding", "State flexibility", "Productivity improvement", "Innovation support"],
  "apply_url": "https://rkvy.nic.in"
},
{
  "id": 16,
  "title": "Paramparagat Krishi Vikas Yojana",
  "short_description": "Organic cluster farming promotion",
  "full_description": "This scheme promotes organic farming through cluster-based certification, input assistance, training programs, and market linkage support. It reduces chemical dependency, improves soil fertility, increases organic produce quality, enhances farmer income, and encourages environmentally sustainable cultivation practices across participating farming communities.",
  "category": "organic",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "Open",
  "benefits": ["Organic inputs", "Certification support", "Training programs", "Market linkage"],
  "apply_url": "https://pgsindia-ncof.gov.in"
},
{
  "id": 17,
  "title": "National Mission on Sustainable Agriculture",
  "short_description": "Climate resilient farming practices",
  "full_description": "This scheme promotes climate resilient agriculture through water conservation, soil health improvement, efficient irrigation, and climate smart technologies. It strengthens farmers’ adaptive capacity, improves productivity during extreme weather, reduces cultivation risks, and supports long term environmental sustainability across vulnerable agricultural regions.",
  "category": "sustainability",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "Open",
  "benefits": ["Climate resilience", "Water efficiency", "Soil improvement", "Risk reduction"],
  "apply_url": "https://nmsa.dac.gov.in"
},
{
  "id": 18,
  "title": "Sub Mission on Agricultural Mechanization",
  "short_description": "Farm mechanization subsidy support",
  "full_description": "This scheme supports farmers in purchasing modern farm machinery through financial assistance, custom hiring centers, and training programs. It improves operational efficiency, reduces labor dependency, enhances crop productivity, encourages mechanized farming adoption, and enables small farmers to access advanced equipment affordably.",
  "category": "equipment",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "31 Dec 2026",
  "benefits": ["Machinery subsidy", "Custom hiring centers", "Training support", "Higher efficiency"],
  "apply_url": "https://agrimachinery.nic.in"
},
{
  "id": 19,
  "title": "National Food Security Mission",
  "short_description": "Increase production of food crops",
  "full_description": "This scheme aims to increase production of rice, wheat, pulses, and coarse cereals through improved seed distribution, nutrient management, mechanization, and farmer training. It enhances national food security, stabilizes crop yields, improves farm profitability, and strengthens agricultural sustainability.",
  "category": "food",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "Open",
  "benefits": ["Improved seeds", "Yield enhancement", "Training programs", "Food security"],
  "apply_url": "https://nfsm.gov.in"
},
{
  "id": 20,
  "title": "Mission for Integrated Development of Horticulture",
  "short_description": "Horticulture crop development support",
  "full_description": "This scheme promotes holistic development of horticulture crops through nursery development, post harvest management, irrigation, protected cultivation, and capacity building. It increases crop diversification, improves farmer income, enhances nutritional security, and strengthens supply chain infrastructure across horticulture clusters.",
  "category": "horticulture",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "Open",
  "benefits": ["Nursery support", "Post harvest management", "Protected cultivation", "Income growth"],
  "apply_url": "https://midh.gov.in"
},
{
  "id": 21,
  "title": "National Bamboo Mission",
  "short_description": "Bamboo cultivation and marketing support",
  "full_description": "This scheme promotes bamboo plantation, processing units, skill development, and market linkage creation. It improves rural employment, supports sustainable raw material production, strengthens value chains, increases farmer income, and encourages eco friendly alternatives for industrial and household applications.",
  "category": "forestry",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "31 Mar 2027",
  "benefits": ["Plantation subsidy", "Skill training", "Market linkage", "Employment generation"],
  "apply_url": "https://nbm.gov.in"
},
{
  "id": 22,
  "title": "Pradhan Mantri Matsya Sampada Yojana",
  "short_description": "Fisheries and aquaculture development",
  "full_description": "This scheme supports fisheries infrastructure development, aquaculture expansion, cold chain facilities, and fisher livelihood improvement. It increases fish production, improves export potential, generates employment, strengthens value chains, and promotes sustainable fisheries management across inland and coastal regions.",
  "category": "fisheries",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "31 Mar 2026",
  "benefits": ["Infrastructure development", "Higher production", "Employment creation", "Cold chain support"],
  "apply_url": "https://pmmsy.dof.gov.in"
},
{
  "id": 23,
  "title": "National Beekeeping and Honey Mission",
  "short_description": "Beekeeping entrepreneurship promotion",
  "full_description": "This scheme promotes scientific beekeeping through training, equipment subsidy, honey processing infrastructure, and market linkage support. It increases pollination benefits, improves crop yield, diversifies farmer income, enhances rural entrepreneurship, and strengthens honey quality standards nationwide.",
  "category": "allied",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "Open",
  "benefits": ["Equipment subsidy", "Training support", "Market linkage", "Income diversification"],
  "apply_url": "https://nbhm.gov.in"
},
{
  "id": 24,
  "title": "Agri Infrastructure Fund",
  "short_description": "Post harvest infrastructure financing",
  "full_description": "This scheme provides medium to long term financing support for building warehouses, cold storage, grading units, and processing facilities. It reduces post harvest losses, improves value addition, strengthens supply chains, enhances farmer market access, and increases overall agricultural competitiveness.",
  "category": "infrastructure",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "31 Mar 2030",
  "benefits": ["Low interest loans", "Credit guarantee", "Infrastructure development", "Value addition"],
  "apply_url": "https://agriinfra.dac.gov.in"
},
{
  "id": 25,
  "title": "PM Formalisation of Micro Food Processing Enterprises",
  "short_description": "Food processing MSME support",
  "full_description": "This scheme supports micro food processing enterprises with financial assistance, skill development, branding support, and technology upgradation. It strengthens rural entrepreneurship, improves product quality, increases market reach, enhances income generation, and promotes local agri based industries sustainably.",
  "category": "processing",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "31 Mar 2026",
  "benefits": ["Capital subsidy", "Branding support", "Skill training", "Market expansion"],
  "apply_url": "https://pmfme.mofpi.gov.in"
},
{
  "id": 26,
  "title": "National Project on Organic Farming",
  "short_description": "Organic input production support",
  "full_description": "This scheme promotes production of organic inputs such as compost, bio fertilizers, and bio pesticides through infrastructure grants and technical guidance. It reduces chemical dependency, improves soil health, supports sustainable farming systems, and strengthens organic agriculture supply chains nationally.",
  "category": "organic",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "Open",
  "benefits": ["Organic input subsidy", "Infrastructure support", "Technical guidance", "Soil improvement"],
  "apply_url": "https://ncof.dac.gov.in"
},
{
  "id": 27,
  "title": "Dairy Entrepreneurship Development Scheme",
  "short_description": "Dairy business establishment support",
  "full_description": "This scheme supports establishment of dairy farms, milk processing units, and cold chain facilities through credit linked subsidies. It improves milk production capacity, generates rural employment, strengthens dairy value chains, enhances farmer income, and promotes organized dairy entrepreneurship.",
  "category": "dairy",
  "scheme_type": "central",
  "status": "Available",
  "deadline": "31 Dec 2026",
  "benefits": ["Subsidy support", "Credit assistance", "Infrastructure creation", "Employment generation"],
  "apply_url": "https://nabard.org"
},
{
  "id": 28,
  "title": "National Mission on Oilseeds and Oil Palm",
  "short_description": "Edible oil production enhancement",
  "full_description": "This scheme promotes oilseed and oil palm cultivation through quality planting material, irrigation support, mechanization, and farmer training. It increases domestic edible oil production, reduces import dependency, improves farmer profitability, and strengthens long term agricultural sustainability.",
  "category": "oilseeds",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "31 Mar 2027",
  "benefits": ["Planting material subsidy", "Irrigation support", "Training programs", "Higher yield"],
  "apply_url": "https://nmoop.gov.in"
},
{
  "id": 29,
  "title": "National Mission on Edible Oils Oil Palm",
  "short_description": "Oil palm area expansion support",
  "full_description": "This scheme focuses on expanding oil palm cultivation area through assured planting material, irrigation infrastructure, intercropping support, and price assurance mechanisms. It strengthens domestic edible oil security, generates rural employment, enhances farmer income, and improves long term crop sustainability.",
  "category": "oilseeds",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "31 Mar 2028",
  "benefits": ["Area expansion", "Price assurance", "Planting subsidy", "Income stability"],
  "apply_url": "https://nmeo.dac.gov.in"
},
{
  "id": 30,
  "title": "Pradhan Mantri Annadata Aay Sanrakshan Abhiyan",
  "short_description": "Price support for farmers",
  "full_description": "This scheme protects farmers against market price fluctuations through price deficiency payment, procurement support, and stock management interventions. It ensures fair remuneration, stabilizes agricultural markets, reduces distress sales, improves farmer confidence, and strengthens national food supply stability.",
  "category": "price_support",
  "scheme_type": "central",
  "status": "Available",
  "deadline": "Open",
  "benefits": ["Price protection", "Procurement support", "Income stability", "Market assurance"],
  "apply_url": "https://pib.gov.in"
},
{
  "id": 31,
  "title": "Weather Based Crop Insurance Scheme",
  "short_description": "Weather risk insurance protection",
  "full_description": "This scheme provides insurance coverage against adverse weather conditions such as rainfall deficit, temperature variation, and humidity fluctuations. It protects farmers from climate related losses, stabilizes income, encourages investment in agriculture, and reduces financial vulnerability during extreme weather events.",
  "category": "insurance",
  "scheme_type": "state",
  "status": "Available",
  "deadline": "Seasonal",
  "benefits": ["Weather protection", "Income security", "Low premium", "Fast settlement"],
  "apply_url": "https://www.aicofindia.com"
},
{
  "id": 32,
  "title": "National Agricultural Extension Management",
  "short_description": "Farmer training and extension services",
  "full_description": "This scheme strengthens agricultural extension services through farmer training programs, demonstration plots, digital advisory platforms, and capacity building initiatives. It improves knowledge dissemination, promotes modern farming practices, increases productivity, and empowers farmers with timely technical guidance.",
  "category": "training",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "Open",
  "benefits": ["Skill training", "Digital advisory", "Demonstration farms", "Knowledge sharing"],
  "apply_url": "https://atma.gov.in"
},
{
  "id": 33,
  "title": "National Rainfed Area Authority Programs",
  "short_description": "Rainfed farming development support",
  "full_description": "This scheme supports rainfed agriculture through watershed management, soil conservation, integrated farming systems, and climate adaptation strategies. It enhances water availability, improves crop resilience, stabilizes yields, strengthens rural livelihoods, and promotes sustainable resource management in dryland regions.",
  "category": "water",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "Open",
  "benefits": ["Watershed development", "Soil conservation", "Yield stability", "Climate resilience"],
  "apply_url": "https://nraa.gov.in"
},
{
  "id": 34,
  "title": "Integrated Scheme for Agricultural Marketing",
  "short_description": "Market infrastructure modernization",
  "full_description": "This scheme modernizes agricultural markets by upgrading mandis, building cold storage facilities, improving grading infrastructure, and strengthening market information systems. It enhances transparency, reduces post harvest losses, improves farmer price realization, and strengthens efficient commodity trading mechanisms.",
  "category": "market",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "31 Mar 2027",
  "benefits": ["Market modernization", "Better price discovery", "Infrastructure upgrade", "Reduced losses"],
  "apply_url": "https://isam.gov.in"
},
{
  "id": 35,
  "title": "National Mission on Medicinal Plants",
  "short_description": "Medicinal crop cultivation support",
  "full_description": "This scheme encourages cultivation of medicinal and aromatic plants through quality planting material, technical training, processing infrastructure, and assured marketing support. It diversifies farm income, strengthens herbal industry supply chains, promotes sustainable cultivation, and increases rural livelihood opportunities.",
  "category": "horticulture",
  "scheme_type": "central",
  "status": "Available",
  "deadline": "31 Dec 2026",
  "benefits": ["Planting subsidy", "Market linkage", "Training support", "Income diversification"],
  "apply_url": "https://nmpb.nic.in"
},
{
  "id": 36,
  "title": "National Livestock Health Mission",
  "short_description": "Animal healthcare improvement program",
  "full_description": "This scheme strengthens animal healthcare services through vaccination drives, disease surveillance, mobile veterinary units, and diagnostic infrastructure. It reduces livestock mortality, improves productivity, protects farmer income, enhances biosecurity measures, and supports sustainable livestock management nationwide.",
  "category": "livestock",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "Open",
  "benefits": ["Vaccination coverage", "Disease control", "Veterinary services", "Higher productivity"],
  "apply_url": "https://dahd.nic.in"
},
{
  "id": 37,
  "title": "Soil and Water Conservation Scheme",
  "short_description": "Land resource protection support",
  "full_description": "This scheme supports soil conservation structures, contour bunding, terracing, and water harvesting systems. It prevents soil erosion, improves groundwater recharge, enhances moisture retention, stabilizes crop productivity, and promotes long term land sustainability in vulnerable agricultural regions.",
  "category": "conservation",
  "scheme_type": "state",
  "status": "Active",
  "deadline": "Open",
  "benefits": ["Soil protection", "Water harvesting", "Improved fertility", "Sustainable farming"],
  "apply_url": "https://soilconservation.gov.in"
},
{
  "id": 38,
  "title": "Farmer Training and Skill Development Program",
  "short_description": "Capacity building for farmers",
  "full_description": "This scheme provides structured training programs on modern cultivation techniques, financial literacy, digital tools, and agribusiness management. It enhances farmer skills, improves adoption of innovative practices, increases productivity, strengthens entrepreneurship capabilities, and supports long term income growth.",
  "category": "training",
  "scheme_type": "state",
  "status": "Available",
  "deadline": "31 Mar 2026",
  "benefits": ["Skill enhancement", "Digital literacy", "Entrepreneurship training", "Higher income"],
  "apply_url": "https://agritraining.gov.in"
},
{
  "id": 39,
  "title": "Rural Godown Storage Scheme",
  "short_description": "Village level storage infrastructure",
  "full_description": "This scheme supports construction of rural godowns and storage facilities to prevent post harvest losses and improve market timing. It enhances crop preservation, strengthens supply chain efficiency, increases bargaining power for farmers, and promotes scientific storage practices across rural areas.",
  "category": "storage",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "31 Dec 2027",
  "benefits": ["Storage subsidy", "Reduced wastage", "Better price realization", "Infrastructure support"],
  "apply_url": "https://dmi.gov.in"
},
{
  "id": 40,
  "title": "Pradhan Mantri Krishi Udan Yojana",
  "short_description": "Air transport support for farm produce",
  "full_description": "This scheme facilitates air transportation of perishable agricultural produce to domestic and international markets. It reduces transit time, minimizes spoilage losses, improves farmer price realization, expands export opportunities, and strengthens high value crop supply chains through improved logistics connectivity.",
  "category": "logistics",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "31 Mar 2027",
  "benefits": ["Faster transport", "Reduced spoilage", "Export access", "Better pricing"],
  "apply_url": "https://www.civilaviation.gov.in"
},
{
  "id": 41,
  "title": "National Agriculture Infra Financing Facility",
  "short_description": "Credit support for agri infrastructure",
  "full_description": "This scheme provides affordable long term credit for creation of agricultural infrastructure including warehouses, cold chains, processing units, and logistics facilities. It improves post harvest management, strengthens supply chains, enhances value addition, and supports private sector investment in agriculture.",
  "category": "finance",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "31 Mar 2030",
  "benefits": ["Low interest loans", "Credit guarantee", "Infrastructure creation", "Private investment"],
  "apply_url": "https://agriinfra.dac.gov.in"
},
{
  "id": 42,
  "title": "National Seed Mission",
  "short_description": "Quality seed production and distribution",
  "full_description": "This scheme strengthens seed research, breeder seed production, certification systems, and distribution networks to ensure timely availability of quality seeds. It improves crop productivity, enhances varietal diversity, increases farmer confidence, and supports long term food security goals nationally.",
  "category": "seeds",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "Open",
  "benefits": ["Quality seed supply", "Research support", "Timely availability", "Higher productivity"],
  "apply_url": "https://seednet.gov.in"
},
{
  "id": 43,
  "title": "Integrated Nutrient Management Scheme",
  "short_description": "Balanced fertilizer usage promotion",
  "full_description": "This scheme promotes balanced use of chemical fertilizers, organic manure, bio fertilizers, and soil amendments. It improves soil fertility, reduces environmental impact, enhances nutrient efficiency, increases crop productivity, and supports sustainable soil health management practices among farmers.",
  "category": "soil",
  "scheme_type": "state",
  "status": "Available",
  "deadline": "31 Dec 2026",
  "benefits": ["Soil fertility improvement", "Reduced chemical use", "Higher yield", "Eco friendly practices"],
  "apply_url": "https://fert.nic.in"
},
{
  "id": 44,
  "title": "National Watershed Development Project",
  "short_description": "Rainwater harvesting and land development",
  "full_description": "This scheme supports watershed treatment activities including check dams, farm ponds, contour bunds, and afforestation. It improves groundwater recharge, reduces soil erosion, enhances crop resilience, stabilizes farm productivity, and promotes sustainable land resource management in drought prone regions.",
  "category": "water",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "31 Mar 2028",
  "benefits": ["Water harvesting", "Soil conservation", "Groundwater recharge", "Yield stability"],
  "apply_url": "https://dolr.gov.in"
},
{
  "id": 45,
  "title": "Sub Mission on Plant Protection",
  "short_description": "Pest management and crop safety",
  "full_description": "This scheme strengthens plant protection services through integrated pest management training, surveillance systems, bio pesticide promotion, and diagnostic laboratories. It reduces crop losses, minimizes chemical pesticide usage, improves food safety, enhances farmer awareness, and supports environmentally responsible pest control practices.",
  "category": "plant_protection",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "Open",
  "benefits": ["Pest control training", "Reduced pesticide use", "Crop protection", "Food safety"],
  "apply_url": "https://ppqs.gov.in"
},
{
  "id": 46,
  "title": "Agricultural Marketing Infrastructure Scheme",
  "short_description": "Warehouse and market yard development",
  "full_description": "This scheme provides subsidy support for construction of warehouses, grading units, cold storage, and rural market yards. It improves post harvest handling, reduces losses, enhances farmer market access, increases price transparency, and strengthens agricultural marketing infrastructure nationwide.",
  "category": "market",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "31 Mar 2027",
  "benefits": ["Warehouse subsidy", "Better storage", "Market access", "Reduced wastage"],
  "apply_url": "https://dmi.gov.in"
},
{
  "id": 47,
  "title": "National Mission on Natural Farming",
  "short_description": "Chemical free farming promotion",
  "full_description": "This scheme promotes natural farming practices through farmer training, bio input preparation, field demonstrations, certification support, and market development. It improves soil health, reduces cultivation costs, enhances ecological balance, increases consumer trust, and supports sustainable agricultural transition nationally.",
  "category": "organic",
  "scheme_type": "central",
  "status": "New",
  "deadline": "31 Mar 2027",
  "benefits": ["Low input cost", "Soil health improvement", "Eco friendly farming", "Market support"],
  "apply_url": "https://naturalfarming.dac.gov.in"
},
{
  "id": 48,
  "title": "Pradhan Mantri Garib Kalyan Anna Yojana",
  "short_description": "Free food grain distribution",
  "full_description": "This scheme ensures food security for vulnerable households by providing free food grains through public distribution channels. It stabilizes nutrition intake, protects low income families from inflation, strengthens food supply systems, and supports national welfare objectives during economic disruptions.",
  "category": "welfare",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "31 Dec 2026",
  "benefits": ["Free food grains", "Nutrition security", "Inflation protection", "Welfare support"],
  "apply_url": "https://nfsa.gov.in"
},
{
  "id": 49,
  "title": "National Cooperative Development Corporation Scheme",
  "short_description": "Cooperative society financial support",
  "full_description": "This scheme provides financial assistance and capacity building support to cooperative societies engaged in agriculture, processing, storage, and marketing. It strengthens cooperative institutions, improves governance efficiency, enhances member income, and promotes inclusive rural economic development sustainably.",
  "category": "cooperative",
  "scheme_type": "central",
  "status": "Available",
  "deadline": "Open",
  "benefits": ["Loan assistance", "Capacity building", "Institution strengthening", "Income growth"],
  "apply_url": "https://ncdc.in"
},
{
  "id": 50,
  "title": "Sub Mission on Agroforestry",
  "short_description": "Tree based farming systems promotion",
  "full_description": "This scheme promotes integration of trees with crops and livestock through quality planting material, technical advisory, and market linkage support. It improves soil fertility, enhances carbon sequestration, diversifies farm income, strengthens climate resilience, and supports sustainable land use systems.",
  "category": "forestry",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "31 Mar 2027",
  "benefits": ["Planting material", "Technical guidance", "Income diversification", "Climate resilience"],
  "apply_url": "https://smaf.dac.gov.in"
},
{
  "id": 51,
  "title": "National Agricultural Innovation Fund",
  "short_description": "Agri startup and innovation funding",
  "full_description": "This scheme supports agri startups, research institutions, and innovators through grant funding, incubation support, mentorship programs, and technology commercialization assistance. It accelerates agricultural innovation, improves productivity solutions, encourages entrepreneurship, and strengthens digital transformation across farming ecosystems.",
  "category": "innovation",
  "scheme_type": "central",
  "status": "New",
  "deadline": "31 Dec 2027",
  "benefits": ["Grant funding", "Incubation support", "Mentorship", "Technology commercialization"],
  "apply_url": "https://icar.org.in"
},
{
  "id": 52,
  "title": "National Mission on Agricultural Education",
  "short_description": "Agricultural skill development initiatives",
  "full_description": "This scheme strengthens agricultural education institutions, curriculum modernization, digital learning platforms, and student skill development programs. It improves workforce readiness, enhances research capacity, promotes innovation culture, and supports long term human resource development in agriculture sector nationally.",
  "category": "education",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "Open",
  "benefits": ["Modern curriculum", "Digital learning", "Skill development", "Research support"],
  "apply_url": "https://icar.org.in"
},
{
  "id": 53,
  "title": "Sub Mission on Seed and Planting Material",
  "short_description": "Seed quality improvement support",
  "full_description": "This scheme supports production of breeder seeds, certified planting material, nursery infrastructure, and seed testing laboratories. It ensures timely availability of quality planting inputs, improves crop performance, enhances varietal adoption, and strengthens agricultural productivity sustainably.",
  "category": "seeds",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "31 Mar 2027",
  "benefits": ["Quality seeds", "Nursery infrastructure", "Testing facilities", "Higher productivity"],
  "apply_url": "https://seednet.gov.in"
},
{
  "id": 54,
  "title": "National Mission on Precision Agriculture",
  "short_description": "Smart farming technology adoption",
  "full_description": "This scheme promotes adoption of precision agriculture technologies including sensors, drones, satellite monitoring, and decision support systems. It optimizes input usage, increases productivity, reduces environmental impact, improves farm profitability, and supports data driven agricultural management practices nationally.",
  "category": "technology",
  "scheme_type": "central",
  "status": "New",
  "deadline": "31 Mar 2028",
  "benefits": ["Smart farming tools", "Input optimization", "Higher productivity", "Digital monitoring"],
  "apply_url": "https://agrimachinery.nic.in"
},
{
  "id": 55,
  "title": "Rural Livelihood Mission Agriculture Support",
  "short_description": "Farmer livelihood enhancement",
  "full_description": "This scheme supports small and marginal farmers through livelihood diversification, skill training, credit linkage, and community institution strengthening. It enhances income opportunities, improves financial inclusion, promotes women participation, and strengthens sustainable rural economic development across villages.",
  "category": "livelihood",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "Open",
  "benefits": ["Skill development", "Credit access", "Women empowerment", "Income generation"],
  "apply_url": "https://aajeevika.gov.in"
},
{
  "id": 56,
  "title": "Integrated Pest Management Program",
  "short_description": "Eco friendly pest control support",
  "full_description": "This scheme promotes biological pest control, pheromone traps, resistant crop varieties, and farmer training programs. It reduces pesticide dependency, improves crop safety, protects beneficial insects, enhances soil health, and supports environmentally sustainable pest management practices nationwide.",
  "category": "plant_protection",
  "scheme_type": "state",
  "status": "Available",
  "deadline": "31 Dec 2026",
  "benefits": ["Reduced pesticide use", "Eco friendly control", "Crop protection", "Farmer training"],
  "apply_url": "https://ppqs.gov.in"
},
{
  "id": 57,
  "title": "Farm Mechanization Training Program",
  "short_description": "Machinery operation skill development",
  "full_description": "This scheme provides hands on training for farmers and rural youth on operation, maintenance, and safety of agricultural machinery. It improves machine utilization efficiency, reduces equipment breakdowns, enhances employment opportunities, and supports mechanization adoption across farming communities.",
  "category": "training",
  "scheme_type": "state",
  "status": "Active",
  "deadline": "31 Mar 2026",
  "benefits": ["Hands on training", "Skill certification", "Employment opportunities", "Safety awareness"],
  "apply_url": "https://agrimachinery.nic.in"
},
{
  "id": 58,
  "title": "Integrated Farming System Scheme",
  "short_description": "Multi enterprise farm model support",
  "full_description": "This scheme promotes integration of crops, livestock, fisheries, and horticulture within a single farm system. It improves resource utilization efficiency, diversifies income sources, reduces production risk, enhances ecological sustainability, and increases overall farm profitability for small farmers.",
  "category": "farming",
  "scheme_type": "state",
  "status": "Available",
  "deadline": "31 Mar 2027",
  "benefits": ["Income diversification", "Resource efficiency", "Risk reduction", "Higher profitability"],
  "apply_url": "https://agricoop.gov.in"
},
{
  "id": 59,
  "title": "Rural Infrastructure Development Fund Agriculture",
  "short_description": "Village infrastructure financing",
  "full_description": "This scheme provides long term financing for rural infrastructure projects such as irrigation canals, rural roads, storage facilities, and market yards. It improves agricultural connectivity, enhances productivity, strengthens market access, and supports sustainable rural economic development nationally.",
  "category": "infrastructure",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "31 Mar 2030",
  "benefits": ["Infrastructure financing", "Better connectivity", "Market access", "Productivity growth"],
  "apply_url": "https://nabard.org"
},
{
  "id": 60,
  "title": "National Mission on Micro Irrigation",
  "short_description": "Drip and sprinkler irrigation promotion",
  "full_description": "This scheme promotes adoption of drip and sprinkler irrigation systems through subsidy support, technical guidance, and farmer training. It improves water use efficiency, increases crop yield, reduces energy consumption, enhances drought resilience, and supports sustainable water resource management nationally.",
  "category": "irrigation",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "31 Mar 2027",
  "benefits": ["Water efficiency", "Higher yield", "Energy saving", "Subsidy support"],
  "apply_url": "https://pmksy.gov.in"
},
{
  "id": 61,
  "title": "National Mission on Post Harvest Management",
  "short_description": "Reduce crop losses after harvest",
  "full_description": "This scheme supports development of grading units, pack houses, cold storage, transportation systems, and processing facilities. It reduces post harvest losses, improves produce quality, enhances shelf life, strengthens market competitiveness, and increases farmer income through value addition.",
  "category": "post_harvest",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "31 Mar 2028",
  "benefits": ["Loss reduction", "Quality improvement", "Cold chain support", "Value addition"],
  "apply_url": "https://mofpi.gov.in"
},
{
  "id": 62,
  "title": "Organic Certification Assistance Scheme",
  "short_description": "Certification support for organic farmers",
  "full_description": "This scheme provides financial support for organic certification costs, inspection fees, documentation, and compliance management. It improves farmer access to premium markets, enhances consumer trust, strengthens traceability systems, increases export opportunities, and promotes organic agriculture credibility.",
  "category": "organic",
  "scheme_type": "state",
  "status": "Available",
  "deadline": "31 Dec 2026",
  "benefits": ["Certification subsidy", "Market access", "Traceability", "Export support"],
  "apply_url": "https://apeda.gov.in"
},
{
  "id": 63,
  "title": "Digital Agriculture Mission",
  "short_description": "Farm digitization and data platforms",
  "full_description": "This scheme builds digital infrastructure for farmer databases, satellite monitoring, advisory services, and smart service delivery platforms. It improves decision making, enhances transparency, enables precision agriculture adoption, strengthens policy planning, and modernizes agricultural governance nationwide.",
  "category": "digital",
  "scheme_type": "central",
  "status": "New",
  "deadline": "31 Mar 2028",
  "benefits": ["Digital platforms", "Smart advisory", "Data integration", "Transparency"],
  "apply_url": "https://agricoop.gov.in"
},
{
  "id": 64,
  "title": "Agricultural Export Promotion Scheme",
  "short_description": "Boost agricultural exports",
  "full_description": "This scheme supports export infrastructure development, quality certification, branding initiatives, logistics improvement, and market intelligence services. It enhances global competitiveness of Indian agricultural products, increases foreign exchange earnings, strengthens farmer linkages to international markets, and promotes export diversification.",
  "category": "export",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "31 Mar 2027",
  "benefits": ["Export infrastructure", "Quality certification", "Market intelligence", "Global access"],
  "apply_url": "https://apeda.gov.in"
},
{
  "id": 65,
  "title": "Pradhan Mantri Krishi Suraksha Abhiyan",
  "short_description": "Comprehensive farm risk protection",
  "full_description": "This scheme provides integrated protection against crop loss, livestock disease, market volatility, and natural disasters through insurance coverage, emergency relief, and advisory services. It improves farmer resilience, stabilizes income, encourages investment confidence, and strengthens rural risk management systems nationally.",
  "category": "insurance",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "31 Dec 2027",
  "benefits": ["Risk protection", "Income stability", "Disaster support", "Farmer security"],
  "apply_url": "https://www.myscheme.gov.in"
},
{
  "id": 66,
  "title": "Smart Greenhouse Development Scheme",
  "short_description": "Protected cultivation infrastructure support",
  "full_description": "This scheme supports construction of climate controlled greenhouses, drip systems, sensors, and automation technologies. It improves crop quality, increases year round production, reduces pest risk, enhances water efficiency, and enables farmers to adopt high value protected cultivation practices sustainably.",
  "category": "technology",
  "scheme_type": "state",
  "status": "Available",
  "deadline": "31 Mar 2027",
  "benefits": ["Higher yield", "Climate control", "Water efficiency", "Premium crops"],
  "apply_url": "https://horticulture.gov.in"
},
{
  "id": 67,
  "title": "Village Seed Bank Scheme",
  "short_description": "Community seed availability support",
  "full_description": "This scheme establishes village level seed banks to ensure timely access to quality seeds during emergencies and planting seasons. It improves seed security, reduces dependency on external suppliers, strengthens community resilience, and supports local crop diversity conservation initiatives.",
  "category": "seeds",
  "scheme_type": "state",
  "status": "Active",
  "deadline": "Open",
  "benefits": ["Seed availability", "Community resilience", "Local conservation", "Emergency access"],
  "apply_url": "https://seednet.gov.in"
},
{
  "id": 68,
  "title": "Rural Solar Drying Units Scheme",
  "short_description": "Crop drying and value addition support",
  "full_description": "This scheme supports installation of solar drying units for fruits, vegetables, spices, and medicinal crops. It reduces post harvest losses, improves product quality, extends shelf life, increases farmer income through value addition, and promotes renewable energy usage in rural processing activities.",
  "category": "processing",
  "scheme_type": "state",
  "status": "Available",
  "deadline": "30 Jun 2027",
  "benefits": ["Value addition", "Reduced losses", "Renewable energy", "Higher income"],
  "apply_url": "https://mofpi.gov.in"
},
{
  "id": 69,
  "title": "Integrated Aquaponics Promotion Scheme",
  "short_description": "Fish and vegetable integrated farming",
  "full_description": "This scheme promotes aquaponics systems combining fish rearing and vegetable cultivation through training, infrastructure subsidy, and technical guidance. It improves water efficiency, maximizes land utilization, diversifies income sources, enhances food security, and supports sustainable intensive farming practices.",
  "category": "farming",
  "scheme_type": "state",
  "status": "New",
  "deadline": "31 Mar 2028",
  "benefits": ["Water efficiency", "Dual income", "High productivity", "Sustainable farming"],
  "apply_url": "https://fisheries.gov.in"
},
{
  "id": 70,
  "title": "Rural Agri Drone Service Scheme",
  "short_description": "Drone spraying and monitoring services",
  "full_description": "This scheme supports establishment of drone service centers for crop spraying, mapping, and health monitoring. It improves precision input application, reduces labor dependency, enhances crop protection efficiency, generates rural employment, and accelerates digital transformation in agricultural operations.",
  "category": "technology",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "31 Dec 2027",
  "benefits": ["Precision spraying", "Reduced labor", "Digital monitoring", "Employment generation"],
  "apply_url": "https://agrimachinery.nic.in"
},
{
  "id": 71,
  "title": "Farm Pond Construction Assistance Scheme",
  "short_description": "On farm water storage support",
  "full_description": "This scheme provides financial assistance for construction of farm ponds to harvest rainwater and store irrigation water. It improves water availability, increases cropping intensity, enhances drought resilience, stabilizes yields, and promotes efficient water resource management practices on farms.",
  "category": "water",
  "scheme_type": "state",
  "status": "Active",
  "deadline": "31 Mar 2027",
  "benefits": ["Water storage", "Drought resilience", "Higher yield", "Rainwater harvesting"],
  "apply_url": "https://pmksy.gov.in"
},
{
  "id": 72,
  "title": "Rural Bio Gas Plant Promotion Scheme",
  "short_description": "Clean energy from farm waste",
  "full_description": "This scheme promotes installation of biogas plants using animal waste and crop residues for clean energy generation. It reduces fuel costs, improves waste management, enhances soil fertility through slurry usage, supports renewable energy adoption, and improves rural household sustainability.",
  "category": "energy",
  "scheme_type": "state",
  "status": "Available",
  "deadline": "31 Dec 2027",
  "benefits": ["Clean energy", "Waste recycling", "Organic manure", "Cost savings"],
  "apply_url": "https://mnre.gov.in"
},
{
  "id": 73,
  "title": "Rural Pack House Development Scheme",
  "short_description": "Sorting and grading infrastructure support",
  "full_description": "This scheme supports establishment of pack houses for cleaning, grading, sorting, and packaging of horticultural produce. It improves product quality, reduces post harvest losses, enhances export readiness, increases farmer price realization, and strengthens organized agricultural supply chains.",
  "category": "post_harvest",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "31 Mar 2028",
  "benefits": ["Quality improvement", "Reduced losses", "Export readiness", "Better pricing"],
  "apply_url": "https://midh.gov.in"
},
{
  "id": 74,
  "title": "Community Vermicompost Units Scheme",
  "short_description": "Organic manure production support",
  "full_description": "This scheme supports establishment of community vermicompost units for producing organic manure using biodegradable waste. It improves soil fertility, reduces chemical fertilizer usage, creates rural employment opportunities, strengthens circular economy practices, and promotes sustainable organic nutrient management.",
  "category": "organic",
  "scheme_type": "state",
  "status": "Active",
  "deadline": "31 Mar 2027",
  "benefits": ["Organic manure", "Soil fertility", "Waste recycling", "Employment"],
  "apply_url": "https://ncof.dac.gov.in"
},
{
  "id": 75,
  "title": "Rural Agri Startup Incubation Scheme",
  "short_description": "Startup mentoring and funding support",
  "full_description": "This scheme supports rural agri startups through incubation facilities, seed funding, mentorship programs, market access, and technology validation support. It accelerates innovation adoption, encourages youth entrepreneurship, improves farm solutions scalability, and strengthens rural innovation ecosystems sustainably.",
  "category": "innovation",
  "scheme_type": "central",
  "status": "New",
  "deadline": "31 Dec 2028",
  "benefits": ["Seed funding", "Mentorship", "Market access", "Startup incubation"],
  "apply_url": "https://icar.org.in"
},
{
  "id": 76,
  "title": "Women Farmer Empowerment Scheme",
  "short_description": "Support for women in agriculture",
  "full_description": "This scheme empowers women farmers through skill training, credit access, leadership development, group farming support, and market linkage programs. It improves financial inclusion, strengthens decision making capacity, enhances livelihood security, promotes gender equity, and increases agricultural productivity sustainably.",
  "category": "livelihood",
  "scheme_type": "state",
  "status": "Active",
  "deadline": "31 Mar 2027",
  "benefits": ["Skill training", "Credit access", "Leadership support", "Income growth"],
  "apply_url": "https://aajeevika.gov.in"
},
{
  "id": 77,
  "title": "Rural Cold Chain Transport Scheme",
  "short_description": "Refrigerated transport support",
  "full_description": "This scheme supports acquisition of refrigerated vehicles and mobile cold storage units for transporting perishable produce. It reduces spoilage, maintains product quality, improves market reach, enhances export potential, and strengthens integrated cold chain infrastructure for agricultural logistics.",
  "category": "logistics",
  "scheme_type": "central",
  "status": "Available",
  "deadline": "31 Mar 2028",
  "benefits": ["Reduced spoilage", "Quality preservation", "Market expansion", "Cold transport"],
  "apply_url": "https://mofpi.gov.in"
},
{
  "id": 78,
  "title": "Integrated Sericulture Development Scheme",
  "short_description": "Silk farming promotion support",
  "full_description": "This scheme supports mulberry plantation, silkworm rearing infrastructure, disease control measures, and skill training for sericulture farmers. It enhances silk productivity, diversifies rural income sources, strengthens textile value chains, generates employment, and promotes sustainable sericulture development.",
  "category": "farming",
  "scheme_type": "state",
  "status": "Active",
  "deadline": "31 Dec 2027",
  "benefits": ["Income diversification", "Skill training", "Infrastructure support", "Employment"],
  "apply_url": "https://csb.gov.in"
},
{
  "id": 79,
  "title": "Urban Rooftop Farming Promotion Scheme",
  "short_description": "City based food production support",
  "full_description": "This scheme promotes rooftop gardening through input kits, training programs, compost support, and technical advisory services. It improves household food security, reduces urban heat impact, encourages community participation, enhances green cover, and promotes sustainable urban agriculture practices.",
  "category": "farming",
  "scheme_type": "state",
  "status": "New",
  "deadline": "31 Mar 2028",
  "benefits": ["Fresh produce", "Green environment", "Food security", "Community engagement"],
  "apply_url": "https://urbanagriculture.gov.in"
},
{
  "id": 80,
  "title": "Rural Market Digitalization Scheme",
  "short_description": "Digital tools for rural markets",
  "full_description": "This scheme supports deployment of digital weighing systems, e payment platforms, price display boards, and online trading interfaces in rural markets. It improves transparency, reduces transaction disputes, enhances farmer confidence, accelerates digital adoption, and strengthens efficient agricultural marketing operations.",
  "category": "digital",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "31 Dec 2027",
  "benefits": ["Digital payments", "Price transparency", "Efficient trading", "Farmer trust"],
  "apply_url": "https://enam.gov.in"
},
{
  "id": 81,
  "title": "Community Fish Feed Production Scheme",
  "short_description": "Local fish feed manufacturing support",
  "full_description": "This scheme supports establishment of community fish feed production units through equipment subsidy, formulation training, and quality certification. It reduces feed costs, improves fish growth performance, strengthens local aquaculture supply chains, increases profitability, and promotes self reliance in fisheries sector.",
  "category": "fisheries",
  "scheme_type": "state",
  "status": "Available",
  "deadline": "31 Mar 2027",
  "benefits": ["Reduced feed cost", "Better growth", "Local production", "Higher profit"],
  "apply_url": "https://fisheries.gov.in"
},
{
  "id": 82,
  "title": "Integrated Goat Farming Promotion Scheme",
  "short_description": "Small ruminant livelihood support",
  "full_description": "This scheme supports goat farming through breed improvement, shed construction, vaccination programs, fodder development, and market linkage. It improves rural income security, enhances meat production, strengthens livelihood diversification, increases employment opportunities, and supports sustainable livestock management practices.",
  "category": "livestock",
  "scheme_type": "state",
  "status": "Active",
  "deadline": "31 Dec 2027",
  "benefits": ["Breed improvement", "Veterinary support", "Income security", "Market linkage"],
  "apply_url": "https://dahd.nic.in"
},
{
  "id": 83,
  "title": "Rural Seed Processing Unit Scheme",
  "short_description": "Seed cleaning and grading support",
  "full_description": "This scheme supports establishment of seed processing units for cleaning, grading, treatment, and packaging of certified seeds. It improves seed quality, reduces post harvest contamination, enhances market value, increases farmer trust, and strengthens local seed supply chains sustainably.",
  "category": "seeds",
  "scheme_type": "central",
  "status": "Available",
  "deadline": "31 Mar 2028",
  "benefits": ["Quality seeds", "Value addition", "Local supply", "Market trust"],
  "apply_url": "https://seednet.gov.in"
},
{
  "id": 84,
  "title": "Rural Herbal Garden Promotion Scheme",
  "short_description": "Medicinal plant cultivation support",
  "full_description": "This scheme promotes cultivation of medicinal plants through planting material subsidy, technical training, organic certification support, and assured buyback linkages. It diversifies farmer income, strengthens herbal medicine supply chains, promotes biodiversity conservation, and supports sustainable agro forestry practices.",
  "category": "horticulture",
  "scheme_type": "state",
  "status": "Active",
  "deadline": "31 Mar 2027",
  "benefits": ["Medicinal crops", "Buyback assurance", "Income diversification", "Biodiversity"],
  "apply_url": "https://nmpb.nic.in"
},
{
  "id": 85,
  "title": "Rural Farm Machinery Hiring Hub Scheme",
  "short_description": "Shared machinery access for farmers",
  "full_description": "This scheme supports establishment of custom hiring centers providing affordable access to tractors, harvesters, planters, and implements. It reduces capital burden, improves mechanization reach, increases operational efficiency, generates rural employment, and supports small and marginal farmers.",
  "category": "equipment",
  "scheme_type": "state",
  "status": "Active",
  "deadline": "31 Dec 2027",
  "benefits": ["Affordable access", "Reduced capital cost", "Higher efficiency", "Employment"],
  "apply_url": "https://agrimachinery.nic.in"
},
{
  "id": 86,
  "title": "Organic Input Production Training Scheme",
  "short_description": "Bio input preparation skill support",
  "full_description": "This scheme trains farmers in preparation of bio fertilizers, bio pesticides, compost, and natural growth promoters. It reduces dependency on chemical inputs, lowers cultivation costs, improves soil health, enhances crop resilience, and promotes eco friendly sustainable farming practices.",
  "category": "organic",
  "scheme_type": "state",
  "status": "Available",
  "deadline": "31 Mar 2027",
  "benefits": ["Skill training", "Low input cost", "Soil improvement", "Eco friendly"],
  "apply_url": "https://ncof.dac.gov.in"
},
{
  "id": 87,
  "title": "Rural Agri Tourism Development Scheme",
  "short_description": "Farm tourism entrepreneurship support",
  "full_description": "This scheme supports development of farm stays, demonstration farms, visitor facilities, and marketing promotion for agri tourism enterprises. It diversifies rural income, creates employment opportunities, strengthens cultural exchange, increases farm profitability, and promotes sustainable rural tourism models.",
  "category": "livelihood",
  "scheme_type": "state",
  "status": "New",
  "deadline": "31 Dec 2028",
  "benefits": ["Tourism income", "Employment", "Cultural promotion", "Diversified revenue"],
  "apply_url": "https://tourism.gov.in"
},
{
  "id": 88,
  "title": "Rural Weather Advisory Service Scheme",
  "short_description": "Localized weather forecast support",
  "full_description": "This scheme provides localized weather forecasts, crop advisories, disaster alerts, and mobile notifications to farmers. It improves decision making accuracy, reduces climate risks, optimizes input application timing, enhances crop protection, and strengthens climate smart agricultural planning practices.",
  "category": "digital",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "Open",
  "benefits": ["Weather alerts", "Crop advisory", "Risk reduction", "Better planning"],
  "apply_url": "https://mausam.imd.gov.in"
},
{
  "id": 89,
  "title": "Community Fodder Bank Scheme",
  "short_description": "Livestock feed security support",
  "full_description": "This scheme establishes community fodder banks for storing dry fodder, silage, and feed during drought and lean seasons. It improves livestock nutrition, reduces distress sales, stabilizes milk production, enhances farmer resilience, and strengthens disaster preparedness mechanisms.",
  "category": "livestock",
  "scheme_type": "state",
  "status": "Available",
  "deadline": "31 Mar 2027",
  "benefits": ["Feed security", "Drought resilience", "Stable production", "Disaster preparedness"],
  "apply_url": "https://dahd.nic.in"
},
{
  "id": 90,
  "title": "Rural Digital Soil Mapping Scheme",
  "short_description": "Soil health digitization support",
  "full_description": "This scheme creates digital soil maps using satellite imagery, laboratory testing, and geographic information systems. It improves fertilizer recommendation accuracy, enhances land use planning, supports precision agriculture adoption, strengthens soil conservation efforts, and modernizes soil health management systems.",
  "category": "technology",
  "scheme_type": "central",
  "status": "New",
  "deadline": "31 Mar 2029",
  "benefits": ["Digital soil maps", "Precision farming", "Better planning", "Soil conservation"],
  "apply_url": "https://soilhealth.dac.gov.in"
},
{
  "id": 91,
  "title": "Rural Flower Cultivation Promotion Scheme",
  "short_description": "Commercial floriculture support",
  "full_description": "This scheme supports commercial flower cultivation through greenhouse subsidy, planting material supply, cold chain support, and market linkage. It increases export potential, improves farmer income, strengthens floriculture value chains, generates employment, and promotes high value horticulture enterprises.",
  "category": "horticulture",
  "scheme_type": "state",
  "status": "Active",
  "deadline": "31 Mar 2027",
  "benefits": ["High value crops", "Market linkage", "Export potential", "Income growth"],
  "apply_url": "https://horticulture.gov.in"
},
{
  "id": 92,
  "title": "Integrated Mushroom Cultivation Scheme",
  "short_description": "Indoor mushroom farming support",
  "full_description": "This scheme promotes mushroom cultivation through spawn supply, training programs, controlled environment infrastructure, and marketing support. It generates quick income, utilizes agricultural waste, creates rural employment, strengthens nutrition security, and supports sustainable small scale agribusiness development.",
  "category": "farming",
  "scheme_type": "state",
  "status": "Available",
  "deadline": "31 Dec 2027",
  "benefits": ["Quick income", "Waste utilization", "Employment", "Nutrition"],
  "apply_url": "https://icar.org.in"
},
{
  "id": 93,
  "title": "Rural Honey Processing Cluster Scheme",
  "short_description": "Honey processing and branding support",
  "full_description": "This scheme supports establishment of honey processing clusters including extraction units, quality testing laboratories, packaging facilities, and branding support. It improves product quality, enhances export readiness, increases beekeeper income, strengthens rural enterprise development, and promotes organized apiculture value chains.",
  "category": "processing",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "31 Mar 2028",
  "benefits": ["Processing infrastructure", "Branding support", "Export readiness", "Income growth"],
  "apply_url": "https://nbhm.gov.in"
},
{
  "id": 94,
  "title": "Rural Irrigation Automation Scheme",
  "short_description": "Automated irrigation systems support",
  "full_description": "This scheme promotes installation of automated irrigation controllers, soil moisture sensors, and smart valves for efficient water management. It reduces water wastage, improves crop yield, lowers labor requirements, enhances irrigation precision, and supports adoption of smart farming technologies.",
  "category": "irrigation",
  "scheme_type": "state",
  "status": "New",
  "deadline": "31 Mar 2028",
  "benefits": ["Water savings", "Automation", "Higher efficiency", "Smart irrigation"],
  "apply_url": "https://pmksy.gov.in"
},
{
  "id": 95,
  "title": "Rural Organic Market Development Scheme",
  "short_description": "Organic produce marketing support",
  "full_description": "This scheme supports development of dedicated organic markets, branding initiatives, certification facilitation, and consumer awareness programs. It improves price realization for organic farmers, strengthens trust in organic products, expands market access, and promotes sustainable consumption patterns.",
  "category": "market",
  "scheme_type": "state",
  "status": "Available",
  "deadline": "31 Dec 2027",
  "benefits": ["Better pricing", "Brand visibility", "Consumer trust", "Market access"],
  "apply_url": "https://apeda.gov.in"
},
{
  "id": 96,
  "title": "Rural Farmer Digital Literacy Scheme",
  "short_description": "Technology adoption training for farmers",
  "full_description": "This scheme provides digital literacy training on smartphones, mobile applications, online services, and e governance platforms. It improves access to information, enhances financial inclusion, increases service utilization efficiency, empowers farmers digitally, and accelerates rural digital transformation initiatives.",
  "category": "education",
  "scheme_type": "state",
  "status": "Active",
  "deadline": "31 Mar 2027",
  "benefits": ["Digital skills", "Service access", "Financial inclusion", "Empowerment"],
  "apply_url": "https://digitalindia.gov.in"
},
{
  "id": 97,
  "title": "Rural Compostable Packaging Scheme",
  "short_description": "Eco friendly packaging adoption support",
  "full_description": "This scheme promotes adoption of biodegradable and compostable packaging materials for agricultural produce and food products. It reduces plastic waste, improves environmental sustainability, enhances export compliance, strengthens green branding, and supports circular economy practices in rural enterprises.",
  "category": "processing",
  "scheme_type": "state",
  "status": "New",
  "deadline": "31 Dec 2028",
  "benefits": ["Eco packaging", "Plastic reduction", "Green branding", "Export compliance"],
  "apply_url": "https://moef.gov.in"
},
{
  "id": 98,
  "title": "Rural Climate Smart Villages Scheme",
  "short_description": "Climate adaptation village model",
  "full_description": "This scheme develops climate smart villages through renewable energy adoption, water conservation structures, climate resilient crops, and digital advisory services. It enhances community resilience, reduces environmental impact, improves livelihood sustainability, and demonstrates scalable climate adaptation practices in rural regions.",
  "category": "sustainability",
  "scheme_type": "central",
  "status": "New",
  "deadline": "31 Mar 2029",
  "benefits": ["Climate resilience", "Renewable energy", "Water conservation", "Sustainable livelihoods"],
  "apply_url": "https://nmsa.dac.gov.in"
},
{
  "id": 99,
  "title": "Rural Smart Storage Sensor Scheme",
  "short_description": "IoT based storage monitoring",
  "full_description": "This scheme promotes installation of temperature, humidity, and pest monitoring sensors in warehouses and godowns. It reduces storage losses, improves quality control, enables remote monitoring, enhances supply chain transparency, and supports adoption of smart infrastructure technologies in agriculture logistics.",
  "category": "technology",
  "scheme_type": "state",
  "status": "Available",
  "deadline": "31 Dec 2028",
  "benefits": ["Loss prevention", "Remote monitoring", "Quality control", "Smart infrastructure"],
  "apply_url": "https://agrimachinery.nic.in"
},
{
  "id": 100,
  "title": "Rural Export Facilitation Cell Scheme",
  "short_description": "Export guidance and certification support",
  "full_description": "This scheme establishes export facilitation cells providing quality certification assistance, documentation support, logistics coordination, and market intelligence services. It simplifies export procedures, enhances farmer exporter participation, increases foreign market access, and strengthens agricultural export competitiveness sustainably.",
  "category": "export",
  "scheme_type": "central",
  "status": "Active",
  "deadline": "31 Mar 2029",
  "benefits": ["Export guidance", "Certification support", "Market intelligence", "Global access"],
  "apply_url": "https://apeda.gov.in"
}


]

# =====================================================
# APPLIED SCHEMES TRACKING
# =====================================================

APPLIED_SCHEMES = []  # stores {scheme_id, applied_at}

# =====================================================
# ROUTES
# =====================================================

@router.get("/schemes")
def get_schemes(
    scheme_type: str | None = None,
    category: str | None = None
):
    data = SCHEMES

    if scheme_type:
        data = [s for s in data if s["scheme_type"] == scheme_type]

    if category:
        data = [s for s in data if s["category"] == category]

    return data


@router.post("/apply/{scheme_id}")
def apply_scheme(scheme_id: int):
    if not any(s["scheme_id"] == scheme_id for s in APPLIED_SCHEMES):
        APPLIED_SCHEMES.append({
            "scheme_id": scheme_id,
            "applied_at": datetime.utcnow().isoformat()
        })
    return {"message": "Scheme application recorded"}


@router.get("/applied")
def applied_schemes():
    return {
        "applied_count": len(APPLIED_SCHEMES),
        "applied_scheme_ids": [s["scheme_id"] for s in APPLIED_SCHEMES]
    }


@router.get("/stats")
def scheme_stats():
    return {
        "total_schemes": len(SCHEMES),
        "applied_schemes": len(APPLIED_SCHEMES),
        "central_schemes": len([s for s in SCHEMES if s["scheme_type"] == "central"]),
        "state_schemes": len([s for s in SCHEMES if s["scheme_type"] == "state"])
    }
