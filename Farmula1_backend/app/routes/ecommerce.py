from fastapi import APIRouter, Query
from math import radians, cos, sin, sqrt, atan2

router = APIRouter(prefix="/shops", tags=["Agri Shops"])


SHOPS = [
    
{
  "shop_name": "Pestfield Business centre",
  "category": "Pesticide & Insecticide",
  "district": "Erode",
  "lat": 11.3499861,
  "lng": 77.7166438,
  "map_url": "https://www.google.com/maps/place/Pestfield+Business+centre/@11.3499861,77.7001643,15z/data=!4m10!1m2!2m1!1spesticide+and+insecticide++shop+erode+!3m6!1s0x3ba859ed4041c4e9:0x944e4871f13f90d3!8m2!3d11.3499861!4d77.7166438!15sCiVwZXN0aWNpZGUgYW5kIGluc2VjdGljaWRlICBzaG9wIGVyb2RlWiYiJHBlc3RpY2lkZSBhbmQgaW5zZWN0aWNpZGUgc2hvcCBlcm9kZZIBFmFncm9jaGVtaWNhbHNfc3VwcGxpZXKaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVTXpiM1ZFVEUxbkVBReABAPoBBAgAECM!16s%2Fg%2F11g1qgvs3n?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "09786260160",
  "rating": 5.0,
  "image_url": "https://www.google.com/maps/place/Pestfield+Business+centre/@11.3498737,77.7169022,3a,75y,294.99h,90t/data=!3m7!1e1!3m5!1sZ9YZZc5SvSdABR3zqnzOCA!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0%26panoid%3DZ9YZZc5SvSdABR3zqnzOCA%26yaw%3D294.98514!7i16384!8i8192!4m13!1m2!2m1!1spesticide+and+insecticide++shop+erode+!3m9!1s0x3ba859ed4041c4e9:0x944e4871f13f90d3!8m2!3d11.3499861!4d77.7166438!10e5!14m1!1BCgIgARICCAI!15sCiVwZXN0aWNpZGUgYW5kIGluc2VjdGljaWRlICBzaG9wIGVyb2RlWiYiJHBlc3RpY2lkZSBhbmQgaW5zZWN0aWNpZGUgc2hvcCBlcm9kZZIBFmFncm9jaGVtaWNhbHNfc3VwcGxpZXKaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVTXpiM1ZFVEUxbkVBReABAPoBBAgAECM!16s%2Fg%2F11g1qgvs3n?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoASAFQAw%3D%3D#"
},
{
  "shop_name": "GLOBAL CENTURY SEEDS AND AGRO CHEMICALS CENTRE - Erode",
  "category": "Pesticide & Insecticide",
  "district": "Erode",
  "lat": 11.3499861,
  "lng": 77.7166438,
  "map_url": "https://www.google.com/maps/place/GLOBAL+CENTURY+SEEDS+AND+AGRO+CHEMICALS+CENTRE+-+Erode/@11.3445881,77.7047552,15z/data=!4m10!1m2!2m1!1spesticide++shop+erode+!3m6!1s0x3ba96f3819e2a2b1:0x5ada543918cf3e96!8m2!3d11.3445881!4d77.7212347!15sChVwZXN0aWNpZGUgIHNob3AgZXJvZGVaFiIUcGVzdGljaWRlIHNob3AgZXJvZGWSAQ1zZWVkX3N1cHBsaWVymgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVU5SYXpsRVZtRlJFQUXgAQD6AQQIABAz!16s%2Fg%2F1q69m_758?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "09443316072",
  "rating": 4.4,
  "image_url": "https://www.google.com/maps/place/GLOBAL+CENTURY+SEEDS+AND+AGRO+CHEMICALS+CENTRE+-+Erode/@11.3445287,77.7213256,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipPAouFnkq1Muv5NWo-IWg6wYY4OsDBxldR2uSjJ!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fp%2FAF1QipPAouFnkq1Muv5NWo-IWg6wYY4OsDBxldR2uSjJ%3Dw203-h360-k-no!7i1080!8i1920!4m11!1m2!2m1!1spesticide++shop+erode+!3m7!1s0x3ba96f3819e2a2b1:0x5ada543918cf3e96!8m2!3d11.3445881!4d77.7212347!10e5!15sChVwZXN0aWNpZGUgIHNob3AgZXJvZGVaFiIUcGVzdGljaWRlIHNob3AgZXJvZGWSAQ1zZWVkX3N1cHBsaWVymgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVU5SYXpsRVZtRlJFQUXgAQD6AQQIABAz!16s%2Fg%2F1q69m_758?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoASAFQAw%3D%3D#"

},
{
  "shop_name": "Arunai Marketing",
  "category": "Pesticide & Insecticide",
  "district": "Erode",
  "lat": 11.3499861,
  "lng": 77.7166438,
  "map_url": "https://www.google.com/maps/place/Arunai+Marketing/@11.3496112,77.7115288,15z/data=!4m10!1m2!2m1!1spesticide++shop+erode+!3m6!1s0x3ba96fbe786cf911:0x7efbf7cbc945951a!8m2!3d11.3496112!4d77.7295532!15sChVwZXN0aWNpZGUgIHNob3AgZXJvZGVaFiIUcGVzdGljaWRlIHNob3AgZXJvZGWSARZhZ3JvY2hlbWljYWxzX3N1cHBsaWVymgEkQ2hkRFNVaE5NRzluUzBWSlEwRm5TVVJ0TkZrMlR5MVJSUkFC4AEA-gEECAAQEg!16s%2Fg%2F11gy3j1zs9?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "09865230700",
  "rating": 5.0,
  "image_url": "https://content.jdmagicbox.com/comp/erode/t8/9999px424.x424.180503102019.t6t8/catalogue/arunai-marketing-erode-c1702-250.jpg"

},
{
  "shop_name": "S.K. Samy & Sons",
  "category": "Pesticide & Insecticide",
  "district": "Erode",
  "lat": 11.3499861,
  "lng": 77.7166438,
  "map_url": "https://www.google.com/maps/place/S.K.+Samy+%26+Sons/@11.3477333,77.704147,15z/data=!4m10!1m2!2m1!1spesticide++shop+erode+!3m6!1s0x3ba96f37b91370c1:0xd4fc0fcaef244a01!8m2!3d11.3477333!4d77.7206265!15sChVwZXN0aWNpZGUgIHNob3AgZXJvZGVaFiIUcGVzdGljaWRlIHNob3AgZXJvZGWSARNmZXJ0aWxpemVyX3N1cHBsaWVymgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVVJLY0RScVdtUlJFQUXgAQD6AQQIABAy!16s%2Fg%2F11c6s_5d59?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "04242210334",
  "rating": 4.5,
  "image_url":"https://lh4.googleusercontent.com/i-3d8srWAcuEVGz_aHZ4-ClzeJ9-HAbVBtOCQtYk8sToa0GNuyvZ4UpPUkXbZhvPaQ=w408-h306-k-no"

},

{
  "shop_name": "Sree Traders",
  "category": "Fertilizer",
  "district": "Erode",
  "lat": 11.3499861,
  "lng": 77.7166438,
  "map_url": "https://www.google.com/maps/place/Sree+Traders/@11.3477329,77.7041041,15z/data=!4m10!1m2!2m1!1sfertilizer+shop+erode+!3m6!1s0x3ba96fed36fba85b:0x448927015b29066e!8m2!3d11.2949481!4d77.7253058!15sChVmZXJ0aWxpemVyIHNob3AgZXJvZGVaFyIVZmVydGlsaXplciBzaG9wIGVyb2RlkgETZmVydGlsaXplcl9zdXBwbGllcpoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VOdWFHODNOM0ZCUlJBQuABAPoBBAgAECY!16s%2Fg%2F11v3xb2ltc?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "09894203443",
  "rating": 5.0},
{
  "shop_name": "Sri Balamurugan Agro Agencies",
  "category": "Fertilizer",
  "district": "Erode",
  "lat": 11.3499861,
  "lng": 77.7166438,
  "map_url": "https://www.google.com/maps/place/Sri+Balamurugan+Agro+Agencies/@11.3388183,77.7126127,15z/data=!4m10!1m2!2m1!1sfertilizer+shop+erode+!3m6!1s0x3ba96f43c41b7e7b:0x3fd00aa40cc1b021!8m2!3d11.3388183!4d77.7290922!15sChVmZXJ0aWxpemVyIHNob3AgZXJvZGVaFyIVZmVydGlsaXplciBzaG9wIGVyb2RlkgEWYWdyb2NoZW1pY2Fsc19zdXBwbGllcpoBI0NoWkRTVWhOTUc5blMwVkpRMEZuU1VSb2NUWllhMHRuRUFF4AEA-gEECAAQPA!16s%2Fg%2F11dxc82n5g?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "09443700688",
  "rating": 4.6},

{
  "shop_name": "SENTHUR AGRO AGENCIES & YAAZH VENDAN DRONE SERVICE",
  "category": "Fertilizer",
  "district": "Erode",
  "lat": 11.3499861,
  "lng": 77.7166438,
  "map_url": "https://www.google.com/maps/place/SENTHUR+AGRO+AGENCIES+%26+YAAZH+VENDAN+DRONE+SERVICE/@11.5085664,77.3922726,15z/data=!4m10!1m2!2m1!1sfertilizer+shop+erode+!3m6!1s0x3ba93d686c1feaf5:0xb4faf0a17e8da767!8m2!3d11.5085664!4d77.4087521!15sChVmZXJ0aWxpemVyIHNob3AgZXJvZGVaFyIVZmVydGlsaXplciBzaG9wIGVyb2RlkgETZmVydGlsaXplcl9zdXBwbGllcpoBI0NoWkRTVWhOTUc5blMwVkpRMEZuU1VSTU5IRlhaVkZSRUFF4AEA-gEECFYQJA!16s%2Fg%2F11v_19hdhd?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "08072992378",
  "rating": 5.0},

{
  "shop_name": "Shri Angalaparameshwari Agro Agencies",
  "category": "Fertilizer",
  "district": "Erode",
  "lat": 11.3499861,
  "lng": 77.7166438,
  "map_url": "https://www.google.com/maps/place/Shri+Angalaparameshwari+Agro+Agencies/@11.4162867,77.5486762,15z/data=!4m10!1m2!2m1!1sfertilizer+shop+erode+!3m6!1s0x3ba96b7c6d29a7c9:0x825a8450fa1b9937!8m2!3d11.4162867!4d77.5651557!15sChVmZXJ0aWxpemVyIHNob3AgZXJvZGVaFyIVZmVydGlsaXplciBzaG9wIGVyb2RlkgEWYWdyb2NoZW1pY2Fsc19zdXBwbGllcuABAA!16s%2Fg%2F11mhq223vf?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "08056422229",
  "rating": 5.0},
{
  "shop_name": "The Agri World",
  "category": "Equipment",
  "district": "Erode",
  "lat": 11.3499861,
  "lng": 77.7166438,
  "map_url": "https://www.google.com/maps/place/The+Agri+World/@11.5083801,77.0722239,10z/data=!4m10!1m2!2m1!1sagiculture+tool+shop+erode+!3m6!1s0x3ba96f7577d89dcf:0xb1df52647d142168!8m2!3d11.3373715!4d77.6595176!15sChxhZ3JpY3VsdHVyZSB0b29scyBzaG9wIGVyb2RlWh4iHGFncmljdWx0dXJlIHRvb2xzIHNob3AgZXJvZGWSARRhZ3JpY3VsdHVyYWxfc2VydmljZZoBI0NoWkRTVWhOTUc5blMwVkpRMEZuVFVSSk0zQmZTbHAzRUFF4AEA-gEECAAQOg!16s%2Fg%2F11n00bl8df?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "09840267095",
  "rating": 4.6},

{
  "shop_name": "GAJA HITECH AGRO",
  "category": "Equipment",
  "district": "Erode",
  "lat": 11.3499861,
  "lng": 77.7166438,
  "map_url": "https://www.google.com/maps/place/GAJA+HITECH+AGRO+%7C+AGRI+MACHINERIES+ERODE/@11.3038002,76.7875017,9.24z/data=!4m10!1m2!2m1!1sagiculture+tool+shop+erode+!3m6!1s0x3ba96fa7da344e75:0xe325236727d2f3c6!8m2!3d11.2986403!4d77.7264647!15sChxhZ3JpY3VsdHVyZSB0b29scyBzaG9wIGVyb2RlWh4iHGFncmljdWx0dXJlIHRvb2xzIHNob3AgZXJvZGWSASNhZ3JpY3VsdHVyYWxfbWFjaGluZXJ5X21hbnVmYWN0dXJlcpoBRENpOURRVWxSUVVOdlpFTm9kSGxqUmpsdlQyMUtOR0ZWVGtoTVZFWnBaVlpyTTJOR2JFMWxWekZwVlZkYWFVMXVZeEFC4AEA-gEECAAQHw!16s%2Fg%2F11pcv8jysb?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "09489817787",
  "rating": 2.8},


{
  "shop_name": "Nagaraja Engineering Work Shop",
  "category": "Equipment",
  "district": "Erode",
  "lat": 11.3499861,
  "lng": 77.7166438,
  "map_url": "https://www.google.com/maps/place/Nagaraja+Engineering+Work+Shop/@11.2449886,77.6376082,12z/data=!4m10!1m2!2m1!1sagiculture+equipment++shop+erode+!3m6!1s0x3ba97aefae3e7a0b:0xedf35903678d5d0e!8m2!3d11.2642736!4d77.761341!15sCiBhZ3JpY3VsdHVyZSBlcXVpcG1lbnQgc2hvcCBlcm9kZVoiIiBhZ3JpY3VsdHVyZSBlcXVpcG1lbnQgc2hvcCBlcm9kZZIBDGNoaWNrZW5fc2hvcOABAA!16s%2Fg%2F12ll2jrrl?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "09443127040",
  "rating": 4.7},

{
  "shop_name": "Valasumani Farm Machines Private Limited",
  "category": "Equipment",
  "district": "Erode",
  "lat": 11.3499861,
  "lng": 77.7166438,
  "map_url": "https://www.google.com/maps/place/Valasumani+Farm+Machines+Private+Limited/@11.2449886,77.6376082,12z/data=!4m10!1m2!2m1!1sagiculture+equipment++shop+erode+!3m6!1s0x3ba9785c5838e5d9:0x3536b4dad103ed75!8m2!3d11.118445!4d77.782517!15sCiBhZ3JpY3VsdHVyZSBlcXVpcG1lbnQgc2hvcCBlcm9kZVoiIiBhZ3JpY3VsdHVyZSBlcXVpcG1lbnQgc2hvcCBlcm9kZZIBDG1hbnVmYWN0dXJlcpoBI0NoWkRTVWhOTUc5blMwVkpRMEZuU1VSbE9UUkhlRUZSRUFF4AEA-gEECAAQHg!16s%2Fg%2F11g_w5_d8?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "09443140478",
  "rating": 4.4},


{
  "shop_name": "Kubota Tractor - Erode Tractorss",
  "category": "Tractor rental",
  "district": "Erode",
  "lat": 11.3499861,
  "lng": 77.7166438,
  "map_url": "https://www.google.com/maps/place/Kubota+Tractor+-+Erode+Tractorss/@11.244966,77.6372647,12z/data=!4m10!1m2!2m1!1stractor+shop+erode+!3m6!1s0x3ba96f94bbafdf83:0x22f420cd8823b7c1!8m2!3d11.3106901!4d77.6635075!15sChJ0cmFjdG9yIHNob3AgZXJvZGVaFCISdHJhY3RvciBzaG9wIGVyb2RlkgEOdHJhY3Rvcl9kZWFsZXLgAQA!16s%2Fg%2F11gy1qznfc?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "06746172402",
  "rating": 4.5},

{
  "shop_name": "Swaraj Tractors - M/S Saaral Motors",
  "category": "Tractor rental",
  "district": "Erode",
  "lat": 11.3499861,
  "lng": 77.7166438,
  "map_url": "https://www.google.com/maps/place/Swaraj+Tractors+-+M%2FS+Saaral+Motors/@11.244966,77.6372647,12z/data=!4m10!1m2!2m1!1stractor+shop+erode+!3m6!1s0x3ba96f4cc6f29275:0x39edfbbeee5bbd0f!8m2!3d11.451698!4d77.4676839!15sChJ0cmFjdG9yIHNob3AgZXJvZGVaFCISdHJhY3RvciBzaG9wIGVyb2RlkgEOdHJhY3Rvcl9kZWFsZXLgAQA!16s%2Fg%2F11mvp44lp4?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "08071325976",
  "rating": 4.5},

{
  "shop_name": "SHRI SAKTHI MINI TRACTORS AND TILLERS,ERODE",
  "category": "Tractor rental",
  "district": "Erode",
  "lat": 11.3499861,
  "lng": 77.7166438,
  "map_url": "https://www.google.com/maps/place/SHRI+SAKTHI+MINI+TRACTORS+AND+TILLERS,ERODE/@11.244966,77.6372647,12z/data=!4m10!1m2!2m1!1stractor+shop+erode+!3m6!1s0x3ba96f7c23aa0861:0x85023fd7f2c19117!8m2!3d11.3494587!4d77.717198!15sChJ0cmFjdG9yIHNob3AgZXJvZGVaFCISdHJhY3RvciBzaG9wIGVyb2RlkgEKd2hvbGVzYWxlcuABAA!16s%2Fg%2F11h1drcj_8?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "09443357961",
  "rating": 4.9},

{
  "shop_name": "Arunachala Tractor - John Deere - Erode",
  "category": "Tractor rental",
  "district": "Erode",
  "lat": 11.3499861,
  "lng": 77.7166438,
  "map_url": "https://www.google.com/maps/place/Arunachala+Tractor+-+John+Deere+-+Erode/@11.3829169,77.5225964,12z/data=!4m10!1m2!2m1!1stractor+shop+erode+!3m6!1s0x3ba96d3df2343c5d:0x4f7f3a90952a41e1!8m2!3d11.3829169!4d77.6544323!15sChJ0cmFjdG9yIHNob3AgZXJvZGVaFCISdHJhY3RvciBzaG9wIGVyb2RlkgEOdHJhY3Rvcl9kZWFsZXLgAQA!16s%2Fg%2F11jv61n_v7?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "08220005310",
  "rating": 4.1},


{
  "shop_name": "MORINGA INTERNATIONAL (P) LTD",
  "category": "Seed dealers",
  "district": "Erode",
  "lat": 11.3499861,
  "lng": 77.7166438,
  "map_url": "https://www.google.com/maps/place/MORINGA+INTERNATIONAL+(P)+LTD/@11.382894,77.5222529,12z/data=!4m10!1m2!2m1!1sagriculture+seed+shop+erode+!3m6!1s0x3ba96f239a2b3925:0x5412738dac888312!8m2!3d11.2996168!4d77.6678898!15sChthZ3JpY3VsdHVyZSBzZWVkIHNob3AgZXJvZGVaHSIbYWdyaWN1bHR1cmUgc2VlZCBzaG9wIGVyb2RlkgENc2VlZF9zdXBwbGllcpoBRENpOURRVWxSUVVOdlpFTm9kSGxqUmpsdlQydFNNVlZWVVhsVlIxcFBXVmh2ZDFWNlFuVlRNMmhwWVhreGFXVnNSUkFC4AEA-gEECAAQLQ!16s%2Fg%2F11h_1kxggr?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "09442092686",
  "rating": 4.7},


{
  "shop_name": "TOTAL AGRO VET-CARE",
  "category": "Seed dealers",
  "district": "Erode",
  "lat": 11.3499861,
  "lng": 77.7166438,
  "map_url": "https://www.google.com/maps/place/TOTAL+AGRO+VET-CARE/@11.382894,77.5222529,12z/data=!4m10!1m2!2m1!1sagriculture+seed+shop+erode+!3m6!1s0x3b00aebf48f6ba49:0x9ada6b1cd2fa0d61!8m2!3d11.3522812!4d77.7258052!15sChthZ3JpY3VsdHVyZSBzZWVkIHNob3AgZXJvZGVaHSIbYWdyaWN1bHR1cmUgc2VlZCBzaG9wIGVyb2RlkgENc2VlZF9zdXBwbGllcpoBRENpOURRVWxSUVVOdlpFTm9kSGxqUmpsdlQyNXdXV1ZyVmpGVVZHTjZaVmhvYWxsclZuWmphMDAxVDFWYVQxTkdSUkFC4AEA-gEECA8QJg!16s%2Fg%2F11bzzrxm9q?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "09994574445",
  "rating": 4.9},

{
  "shop_name": "Krishna Seeds",
  "category": "Seed dealers",
  "district": "Erode",
  "lat": 11.3499861,
  "lng": 77.7166438,
  "map_url": "https://www.google.com/maps/place/Krishna+Seeds/@11.2592904,77.6046326,12z/data=!4m10!1m2!2m1!1sagriculture+seed+shop+erode+!3m6!1s0x3ba913c8757b1fc9:0xbe0bcdc5e270d430!8m2!3d11.3138937!4d77.4915659!15sChthZ3JpY3VsdHVyZSBzZWVkIHNob3AgZXJvZGVaHSIbYWdyaWN1bHR1cmUgc2VlZCBzaG9wIGVyb2RlkgENc2VlZF9zdXBwbGllcpoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VSQ2RrcGxhRFJuUlJBQuABAPoBBAgAECc!16s%2Fg%2F11c5t2lfh4?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "09952595526",
  "rating": 4.4},

{
  "shop_name": "Azolla Beds & Vermi Beds .. MURUGAN FARMERS STORE",
  "category": "Seed dealers",
  "district": "Erode",
  "lat": 11.3499861,
  "lng": 77.7166438,
  "map_url": "https://www.google.com/maps/place/Azolla+Beds+%26+Vermi+Beds+..+MURUGAN+FARMERS+STORE../@11.4321843,77.5284664,12z/data=!4m10!1m2!2m1!1sagriculture+seed+shop+erode+!3m6!1s0x3ba969af0189e067:0x2f8561d5ed14389!8m2!3d11.4321843!4d77.6603023!15sChthZ3JpY3VsdHVyZSBzZWVkIHNob3AgZXJvZGVaHSIbYWdyaWN1bHR1cmUgc2VlZCBzaG9wIGVyb2RlkgENc2VlZF9zdXBwbGllcpoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VNeU5qaFBSbDlSUlJBQuABAPoBBAgAEAw!16s%2Fg%2F11h52mgwfn?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "07010529207",
  "rating": 4.1},
{
  "shop_name": "Sri Saraswathi Agencies",
  "category": "Pesticide & Insecticide",
  "district": "Thanjavur",
  "lat": 10.7867,
  "lng": 79.1378,
"map_url":"https://www.google.com/maps/place/Sri+Saraswathi+Agencies/@10.7946721,79.1030909,11z/data=!4m10!1m2!2m1!1s+pesticide+shop+thanjavur!3m6!1s0x3baab887d4908927:0xc6202a5e35363dbf!8m2!3d10.7783106!4d79.1521513!15sChhwZXN0aWNpZGUgc2hvcCB0aGFuamF2dXJaGiIYcGVzdGljaWRlIHNob3AgdGhhbmphdnVykgEUYWdyaWN1bHR1cmFsX3NlcnZpY2WaASRDaGREU1VoTk1HOW5TMFZKUTBGblNVUjRObkZNTTNoUlJSQULgAQD6AQQIABAj!16s%2Fg%2F11c6039pkd?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "09443426947",
  "rating": 4.0
},
{
  "shop_name": "NAVEEN ENTERPRISES",
  "category": "Pesticide & Insecticide",
  "district": "Thanjavur",
  "lat": 10.7867,
  "lng": 79.1378,
"map_url":"https://www.google.com/maps/place/NAVEEN+ENTERPRISES/@10.2903595,78.4410314,9z/data=!4m10!1m2!2m1!1sinsecticide++shop+thanjavur!3m6!1s0x3baac766a47b0db5:0xc6a802e73badf01c!8m2!3d10.7952096!4d79.1373127!15sChtpbnNlY3RpY2lkZSAgc2hvcCB0aGFuamF2dXJaHCIaaW5zZWN0aWNpZGUgc2hvcCB0aGFuamF2dXKSARRhZ3JpY3VsdHVyYWxfc2VydmljZZoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VNeGMyTnBSblozUlJBQuABAPoBBAgAEC4!16s%2Fg%2F11c604g731?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "09443924250",
  "rating": 3.6
},

{
  "shop_name": "Tari Bio-Tech",
  "category": "Pesticide & Insecticide",
  "district": "Thanjavur",
  "lat": 10.7867,
  "lng": 79.1378,
"map_url":"https://www.google.com/maps/place/Tari+Bio-Tech/@10.2903595,78.4410314,9z/data=!4m10!1m2!2m1!1sinsecticide++shop+thanjavur!3m6!1s0x3baab90c9d22a8e3:0xc202cdc871d55969!8m2!3d10.7807858!4d79.132132!15sChtpbnNlY3RpY2lkZSAgc2hvcCB0aGFuamF2dXJaHCIaaW5zZWN0aWNpZGUgc2hvcCB0aGFuamF2dXKSARZhZ3JvY2hlbWljYWxzX3N1cHBsaWVymgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVU53TjNVeVRVWm5FQUXgAQD6AQQIABAi!16s%2Fg%2F11l539__yc?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "04362238959",
  "rating": 4.5
},

{
  "shop_name": "Uzhavan Agri Clinic",
  "category": "Pesticide & Insecticide",
  "district": "Thanjavur",
  "lat": 10.7867,
  "lng": 79.1378,
"map_url":"https://www.google.com/maps/place/Uzhavan+Agri+Clinic/@10.2903595,78.4410314,9z/data=!4m10!1m2!2m1!1sinsecticide++shop+thanjavur!3m6!1s0x3baab91835476145:0x4b7bad7013eb3ba0!8m2!3d10.7809144!4d79.1722422!15sChtpbnNlY3RpY2lkZSAgc2hvcCB0aGFuamF2dXJaHCIaaW5zZWN0aWNpZGUgc2hvcCB0aGFuamF2dXKSARRhZ3JpY3VsdHVyYWxfc2VydmljZZoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VSd2FUbDFXVzVuUlJBQuABAPoBBAgAECM!16s%2Fg%2F11l1y07cys?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "08760685858",
  "rating": 5.0
},

{
  "shop_name": "THULIR FERTILIZER",
  "category": "Fertilizer",
  "district": "Thanjavur",
  "lat": 10.7867,
  "lng": 79.1378,
  "map_url": "https://www.google.com/maps/place/THULIR+FERTILIZER/@10.2903595,78.4410314,9z/data=!4m10!1m2!2m1!1sinsecticide++shop+thanjavur!3m6!1s0x3baac765853f048b:0xab8b42e0315e2833!8m2!3d10.7948124!4d79.1372382!15sChtpbnNlY3RpY2lkZSAgc2hvcCB0aGFuamF2dXJaHCIaaW5zZWN0aWNpZGUgc2hvcCB0aGFuamF2dXKSARNmZXJ0aWxpemVyX3N1cHBsaWVy4AEA!16s%2Fg%2F11gf00glmh?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "07339589353",
  "rating": 4.8},
{
  "shop_name": "N.S.Nallathambi Chettiar Agency",
  "category": "Fertilizer",
  "district": "Thanjavur",
  "lat": 10.7867,
  "lng": 79.1378,
  "map_url": "https://www.google.com/maps/place/N.S.Nallathambi+Chettiar+Agency/@10.2903595,78.4410314,9z/data=!4m10!1m2!2m1!1sinsecticide++shop+thanjavur!3m6!1s0x3baaca766bfe387b:0xd8c84108816c7b6c!8m2!3d10.7965531!4d79.3202149!15sChtpbnNlY3RpY2lkZSAgc2hvcCB0aGFuamF2dXJaHCIaaW5zZWN0aWNpZGUgc2hvcCB0aGFuamF2dXKSARNmZXJ0aWxpemVyX3N1cHBsaWVymgEkQ2hkRFNVaE5NRzluUzBWSlEwRm5TVU5YTkU1MVR6UjNSUkFC4AEA-gEECDwQJQ!16s%2Fg%2F11c1q8rn_l?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "09791012867",
  "rating": 4.5},

{
  "shop_name": "Kannagi stores fertilizer and pesticides",
  "category": "Fertilizer",
  "district": "Thanjavur",
  "lat": 10.7867,
  "lng": 79.1378,
  "map_url": "https://www.google.com/maps/place/Kannagi+stores+fertilizer+and+pesticides/@10.2903595,78.4410314,9z/data=!4m10!1m2!2m1!1sinsecticide++shop+thanjavur!3m6!1s0x3baaad0039b58a6d:0xf81b7ee2dd5c148e!8m2!3d10.57345!4d79.3801621!15sChtpbnNlY3RpY2lkZSAgc2hvcCB0aGFuamF2dXJaHCIaaW5zZWN0aWNpZGUgc2hvcCB0aGFuamF2dXKSARNmZXJ0aWxpemVyX3N1cHBsaWVymgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVVJmYldScVJrUjNFQUXgAQD6AQQIABBJ!16s%2Fg%2F11w_cwp4wd?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "09443589247",
  "rating": 5.0},
{
  "shop_name": "Sami Agencies",
  "category": "Fertilizer",
  "district": "Thanjavur",
  "lat": 10.7867,
  "lng": 79.1378,
  "map_url": "https://www.google.com/maps/place/Sami+Agencies/@10.2903595,78.4410314,9z/data=!4m10!1m2!2m1!1sinsecticide++shop+thanjavur!3m6!1s0x3baab7f8a0727ba5:0x46cf003695116fdb!8m2!3d10.783904!4d79.199925!15sChtpbnNlY3RpY2lkZSAgc2hvcCB0aGFuamF2dXKSARNmZXJ0aWxpemVyX3N1cHBsaWVy4AEA!16s%2Fg%2F11g6nw2v00?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "09443355752",
  "rating": 4.1},

{
  "shop_name": "Chithra Agencies ",
  "category": "Equipment",
  "district": "Thanjavur",
  "lat": 10.7867,
  "lng": 79.1378,
  "map_url": "https://www.google.com/maps/place/Chithra+Agencies+-+Thanjavur+(Borewell+Works,+CRI+Pump+Dealer,+Drip+Irrigation,+Plumbing+Supplies)/@10.7535068,78.9893651,12z/data=!4m11!1m3!2m2!1sagiculture+equipment+shop+thanjavur!6e6!3m6!1s0x3baab8b4ff647f4f:0xc651d65d7ff408b8!8m2!3d10.7685317!4d79.1124767!15sCiRhZ3JpY3VsdHVyZSBlcXVpcG1lbnQgc2hvcCB0aGFuamF2dXKSARN3YXRlcl9wdW1wX3N1cHBsaWVy4AEA!16s%2Fg%2F11b_3h0q8_?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "09443123184",
  "rating": 3.5},
{
  "shop_name": "Santhosh Traders (agro)",
  "category": "Equipment",
  "district": "Thanjavur",
  "lat": 10.7867,
  "lng": 79.1378,
  "map_url": "https://www.google.com/maps/place/Santhosh+Traders+(agro)/@10.7534851,78.9890216,12z/data=!4m10!1m2!2m1!1sagiculture+tools+shop+thanjavur!3m6!1s0x3baab94a9d7ecd3b:0x359c64edff5383a8!8m2!3d10.7737445!4d79.1410257!15sCiBhZ3JpY3VsdHVyZSB0b29scyBzaG9wIHRoYW5qYXZ1cpIBI2FncmljdWx0dXJhbF9tYWNoaW5lcnlfbWFudWZhY3R1cmVy4AEA!16s%2Fg%2F11ljysqn4h?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "06386232250",
  "rating": 4.8},
{
  "shop_name": "Sayee Enterprises",
  "category": "Equipment",
  "district": "Thanjavur",
  "lat": 10.7867,
  "lng": 79.1378,
  "map_url": "https://www.google.com/maps/place/Sayee+Enterprises/@10.7534851,78.9890216,12z/data=!4m10!1m2!2m1!1sagiculture+tools+shop+thanjavur!3m6!1s0x3baac76277de230d:0xc5bda162ac738f6a!8m2!3d10.7953114!4d79.1373545!15sCiBhZ3JpY3VsdHVyZSB0b29scyBzaG9wIHRoYW5qYXZ1cloiIiBhZ3JpY3VsdHVyZSB0b29scyBzaG9wIHRoYW5qYXZ1cpIBFGFncmljdWx0dXJhbF9zZXJ2aWNlmgEkQ2hkRFNVaE5NRzluUzBWSlEwRm5TVVJtY21OUWFDMVJSUkFC4AEA-gEECAAQFQ!16s%2Fg%2F11rqpp13g6?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "08072866539",
  "rating": 4.8},
{
  "shop_name": "Sri Sabari Power Tools",
  "category": "Equipment",
  "district": "Thanjavur",
  "lat": 10.7867,
  "lng": 79.1378,
  "map_url": "https://www.google.com/maps/place/Sri+Sabari+Power+Tools+Thanjavur/@10.7534851,78.9890216,12z/data=!4m10!1m2!2m1!1sagiculture+tools+shop+thanjavur!3m6!1s0x3baab918c47c727d:0xf9d5cbd9696f55fa!8m2!3d10.7773023!4d79.1478792!15sCiBhZ3JpY3VsdHVyZSB0b29scyBzaG9wIHRoYW5qYXZ1cloiIiBhZ3JpY3VsdHVyZSB0b29scyBzaG9wIHRoYW5qYXZ1cpIBCnRvb2xfc3RvcmXgAQA!16s%2Fg%2F11sh7bgts_?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "09677766730",
  "rating": 4.8},

{
  "shop_name": "T.P & SONS AGRO CORPORATION ( MF tractors)",
  "category": "Tractor rental",
  "district": "Thanjavur",
  "lat": 10.7867,
  "lng": 79.1378,
  "map_url": "https://www.google.com/maps/place/T.P+%26+SONS+AGRO+CORPORATION+(+MF+tractors)/@10.7585207,79.1410335,14z/data=!4m10!1m2!2m1!1stractor+shop+thanjavur!3m6!1s0x3baab9c450e4d0ed:0xebdb06f3e9a19689!8m2!3d10.7585207!4d79.1739925!15sChZ0cmFjdG9yIHNob3AgdGhhbmphdnVyWhgiFnRyYWN0b3Igc2hvcCB0aGFuamF2dXKSAQ50cmFjdG9yX2RlYWxlcuABAA!16s%2Fg%2F11ql7lvw0m?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "07338846525",
  "rating": 4.5},
  {
  "shop_name": "Swaraj Tractors - M/S Padmavathi Enterprises",
  "category": "Tractor rental",
  "district": "Thanjavur",
  "lat": 10.7867,
  "lng": 79.1378,
  "map_url": "https://www.google.com/maps/place/Swaraj+Tractors+-+M%2FS+Padmavathi+Enterprises/@10.7585207,79.1410335,14z/data=!4m10!1m2!2m1!1stractor+shop+thanjavur!3m6!1s0x3baab8314d4d1281:0x9e83a0d66aaccf4d!8m2!3d10.7521128!4d79.1830435!15sChZ0cmFjdG9yIHNob3AgdGhhbmphdnVyWhgiFnRyYWN0b3Igc2hvcCB0aGFuamF2dXKSAQ50cmFjdG9yX2RlYWxlcuABAA!16s%2Fg%2F11g01sg2v9?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "08071325973",
  "rating": 4.3},

{
  "shop_name": "Mahindra Tractors - Sakthi Tractors",
  "category": "Tractor rental",
  "district": "Thanjavur",
  "lat": 10.7867,
  "lng": 79.1378,
  "map_url": "https://www.google.com/maps/place/Mahindra+Tractors+-+Sakthi+Tractors/@10.7585207,79.1410335,14z/data=!4m10!1m2!2m1!1stractor+shop+thanjavur!3m6!1s0x3baabf30dec317d9:0x82d8f0bf19434cf6!8m2!3d10.7583971!4d79.100988!15sChZ0cmFjdG9yIHNob3AgdGhhbmphdnVyWhgiFnRyYWN0b3Igc2hvcCB0aGFuamF2dXKSAQ50cmFjdG9yX2RlYWxlcuABAA!16s%2Fg%2F11c2pm0jp0?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "08071639290",
  "rating": 4.2},

{
  "shop_name": "Senthil agencies STIHL Dealer",
  "category": "Tractor rental",
  "district": "Thanjavur",
  "lat": 10.7867,
  "lng": 79.1378,
  "map_url": "https://www.google.com/maps/place/Senthil+agencies+STIHL+Dealer/@10.7585207,79.1410335,14z/data=!4m10!1m2!2m1!1stractor+shop+thanjavur!3m6!1s0x3baab87d4c83c24b:0x4879878cc61dd6ce!8m2!3d10.7782838!4d79.155856!15sChZ0cmFjdG9yIHNob3AgdGhhbmphdnVyWhgiFnRyYWN0b3Igc2hvcCB0aGFuamF2dXKSAQ50cmFjdG9yX2RlYWxlcuABAA!16s%2Fg%2F11c3189j9l?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "09787772135",
  "rating": 4.1},

{
  "shop_name": "Uzhavan Agri Clinic",
  "category": "Seed dealers",
  "district": "Thanjavur",
  "lat": 10.7867,
  "lng": 79.1378,
  "map_url": "https://www.google.com/maps/place/Uzhavan+Agri+Clinic/@10.783904,79.0680891,12z/data=!4m10!1m2!2m1!1sseed+shop+thanjavur!3m6!1s0x3baab91835476145:0x4b7bad7013eb3ba0!8m2!3d10.7809144!4d79.1722422!15sChNzZWVkIHNob3AgdGhhbmphdnVyWhUiE3NlZWQgc2hvcCB0aGFuamF2dXKSARRhZ3JpY3VsdHVyYWxfc2VydmljZZoBRENpOURRVWxSUVVOdlpFTm9kSGxqUmpsdlQydGFNVll3WjNkVldIQlNWRzFHU2xNelpESmtiRTVTV2tkNE5HSXlZeEFC4AEA-gEECAAQMw!16s%2Fg%2F11l1y07cys?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "08760685858",
  "rating": 5.0},
{
  "shop_name": "MOTCHAM PLANT NURSERY",
  "category": "Seed dealers",
  "district": "Thanjavur",
  "lat": 10.7867,
  "lng": 79.1378,
  "map_url": "https://www.google.com/maps/place/MOTCHAM+PLANT+NURSERY/@10.7838822,79.0677456,12z/data=!4m10!1m2!2m1!1snursery++shop+thanjavur!3m6!1s0x3baabf60cbeeb9b7:0xde5ee19b3a31c430!8m2!3d10.7057069!4d79.0845618!15sChdudXJzZXJ5ICBzaG9wIHRoYW5qYXZ1cloYIhZudXJzZXJ5IHNob3AgdGhhbmphdnVykgEKbGFuZHNjYXBlcuABAA!16s%2Fg%2F11lxwff3zx?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "09600462036",
  "rating": 5.0},

{
  "shop_name": "Isha Nursery, Thanjavur",
  "category": "Seed dealers",
  "district": "Thanjavur",
  "lat": 10.7867,
  "lng": 79.1378,
  "map_url": "https://www.google.com/maps/place/Isha+Nursery,+Thanjavur/@10.7838822,79.0677456,12z/data=!4m10!1m2!2m1!1snursery++shop+thanjavur!3m6!1s0x3baab9636da57409:0x9d59dfd86ea2d281!8m2!3d10.7042394!4d79.1415757!15sChdudXJzZXJ5ICBzaG9wIHRoYW5qYXZ1cloYIhZudXJzZXJ5IHNob3AgdGhhbmphdnVykgENcGxhbnRfbnVyc2VyeZoBRENpOURRVWxSUVVOdlpFTm9kSGxqUmpsdlQyNVdWR0ZZYjNoVmJHaHpVVEZTVkZsV2FFZE9SVFZYVlROT2ExRXdSUkFC4AEA-gEECAAQPA!16s%2Fg%2F11bw4ty79j?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "09442590069",
  "rating": 4.9},

{
  "shop_name": "Arul Nursery",
  "category": "Seed dealers",
  "district": "Thanjavur",
  "lat": 10.7867,
  "lng": 79.1378,
  "map_url": "https://www.google.com/maps/place/Arul+Nursery/@10.7838822,79.0677456,12z/data=!4m10!1m2!2m1!1snursery++shop+thanjavur!3m6!1s0x3baab894196d2bb5:0x5befac26c64ecc1!8m2!3d10.7693215!4d79.1396266!15sChdudXJzZXJ5ICBzaG9wIHRoYW5qYXZ1cloYIhZudXJzZXJ5IHNob3AgdGhhbmphdnVykgENcGxhbnRfbnVyc2VyeZoBI0NoWkRTVWhOTUc5blMwVkpRMEZuU1VRM2VFNXFObUZSRUFF4AEA-gEECAAQOg!16s%2Fg%2F1tph054s?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "06385511708",
  "rating": 4.5},
  {
  "shop_name": "SREE VELAVAN ENTERPRISES Organic Fertilizer and Pesticides",
  "category": "Pesticide & Insecticide",
  "district": "Salem",
  "lat": 11.6643,
  "lng": 78.1460,
"map_url":"https://www.google.com/maps/place/SREE+VELAVAN+ENTERPRISES+Organic+Fertilizer+and+Pesticides/@11.6081385,77.9999788,12z/data=!4m10!1m2!2m1!1spesticide+shp+salem+!3m6!1s0x3babf15a1bf7811f:0x4f995e7c1244678d!8m2!3d11.678551!4d78.1684189!15sChNwZXN0aWNpZGUgc2hwIHNhbGVtWhUiE3Blc3RpY2lkZSBzaHAgc2FsZW2SARNmZXJ0aWxpemVyX3N1cHBsaWVymgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVVF0TW5OUFprOTNFQUXgAQD6AQQIABAt!16s%2Fg%2F11rqy_13kf?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "09750598330",
  "rating": 4.9
},

{
  "shop_name": "BioNature",
  "category": "Pesticide & Insecticide",
  "district": "Salem",
  "lat": 11.6643,
  "lng": 78.1460,
"map_url":"https://www.google.com/maps/place/BioNature/@11.6791879,78.0468917,12z/data=!4m10!1m2!2m1!1spesticide+shp+salem+!3m6!1s0x3babf1514ba9b09f:0x28041f110a2c3f2b!8m2!3d11.6791879!4d78.1787276!15sChNwZXN0aWNpZGUgc2hwIHNhbGVtWhUiE3Blc3RpY2lkZSBzaHAgc2FsZW2SARRhZ3JpY3VsdHVyYWxfc2VydmljZZoBI0NoWkRTVWhOTUc5blMwVkpRMEZuU1VOQ2NUbHlSVTFuRUFF4AEA-gEFCIEBECU!16s%2Fg%2F11h3nh4_gs?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "09566753333",
  "rating": 4.9
},
{
  "shop_name": "SRI MURUGAN AGRO SERVICE",
  "category": "Pesticide & Insecticide",
  "district": "Salem",
  "lat": 11.6643,
  "lng": 78.1460,
"map_url":"https://www.google.com/maps/place/SRI+MURUGAN+AGRO+SERVICE/@11.7029424,77.9702517,12z/data=!4m10!1m2!2m1!1spesticide+shp+salem+!3m6!1s0x3babfa722d6df1e3:0x2d644d04ec604efb!8m2!3d11.7029424!4d78.1020876!15sChNwZXN0aWNpZGUgc2hwIHNhbGVtWhUiE3Blc3RpY2lkZSBzaHAgc2FsZW2SARdmYXJtX2VxdWlwbWVudF9zdXBwbGllcpoBI0NoWkRTVWhOTUc5blMwVkpRMEZuU1VSQ2JuSlVhVXhCRUFF4AEA-gEECAAQLQ!16s%2Fg%2F11d_74x1ql?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "09791792220",
  "rating": 5.0
},

{
  "shop_name": "ARUNAI AGRO MARKETING",
  "category": "Pesticide & Insecticide",
  "district": "Salem",
  "lat": 11.6643,
  "lng": 78.1460,
"map_url":"https://www.google.com/maps/place/ARUNAI+AGRO+MARKETING/@11.7029424,77.9702517,12z/data=!4m10!1m2!2m1!1spesticide+shp+salem+!3m6!1s0x3babf108053730d3:0x426f342229fc8e84!8m2!3d11.6661874!4d78.1333541!15sChNwZXN0aWNpZGUgc2hwIHNhbGVtWhUiE3Blc3RpY2lkZSBzaHAgc2FsZW2SARZhZ3JvY2hlbWljYWxzX3N1cHBsaWVymgEkQ2hkRFNVaE5NRzluUzBWSlEwRm5TVVF4TUc5UWQyMVJSUkFC4AEA-gEECAAQIg!16s%2Fg%2F11f0wj3yvd?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "09965533003",
  "rating": 4.8
},
{
  "shop_name": "Sakthi Fertilizers & Chemicals",
  "category": "Fertilizer",
  "district": "Salem",
  "lat": 11.6643,
  "lng": 78.1460,
  "map_url": "https://www.google.com/maps/place/Sakthi+Fertilizers+%26+Chemicals/@11.7028953,77.9695647,12z/data=!4m10!1m2!2m1!1sfertilizer+shop+salem+!3m6!1s0x3babf18d2080a15b:0x6f92a21fda07b37b!8m2!3d11.6507406!4d78.1266021!15sChVmZXJ0aWxpemVyIHNob3Agc2FsZW1aFyIVZmVydGlsaXplciBzaG9wIHNhbGVtkgETZmVydGlsaXplcl9zdXBwbGllcpoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VOaU5UbHFWR3hCUlJBQuABAPoBBAgAEDw!16s%2Fg%2F11srzlclzn?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "09788873999",
  "rating": 5.0},
{
  "shop_name": "Kavitha Traders ( Fertilizer & Chemicals)",
  "category": "Fertilizer",
  "district": "Salem",
  "lat": 11.6643,
  "lng": 78.1460,
  "map_url": "https://www.google.com/maps/place/Kavitha+Traders+(+Fertilizer+%26+Chemicals)/@11.5889238,78.6327586,12z/data=!4m10!1m2!2m1!1sfertilizer+shop+salem+!3m6!1s0x3bab718c331384d7:0x7fca688a11f6d28d!8m2!3d11.5889238!4d78.7645945!15sChVmZXJ0aWxpemVyIHNob3Agc2FsZW1aFyIVZmVydGlsaXplciBzaG9wIHNhbGVtkgETZmVydGlsaXplcl9zdXBwbGllcpoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VOT2QzRmhNamwzUlJBQuABAPoBBAgAEB8!16s%2Fg%2F11ff54nq2y?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "09884799234",
  "rating": 4.5},
{
  "shop_name": "Green Capital Agro Private Limited",
  "category": "Fertilizer",
  "district": "Salem",
  "lat": 11.6643,
  "lng": 78.1460,
  "map_url": "https://www.google.com/maps/place/Green+Capital+Agro+Private+Limited/@11.5889238,78.6327586,12z/data=!4m10!1m2!2m1!1sfertilizer+shop+salem+!3m6!1s0x3babf1a5435d1867:0x2106fa60d855723f!8m2!3d11.6556754!4d78.1403865!15sChVmZXJ0aWxpemVyIHNob3Agc2FsZW2SAR9hZ3JpY3VsdHVyYWxfcHJvZHVjdF93aG9sZXNhbGVy4AEA!16s%2Fg%2F11yj366c1x?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "09362115762",
  "rating": 5.0},
{
  "shop_name": "Jagan Bio Vermicompost",
  "category": "Fertilizer",
  "district": "Salem",
  "lat": 11.6643,
  "lng": 78.1460,
  "map_url": "https://www.google.com/maps/place/Jagan+Bio+Vermicompost/@11.6536392,77.867509,12z/data=!4m10!1m2!2m1!1sfertilizer+shop+salem+!3m6!1s0x3babfd745ca2addd:0x4b35ec24b19ea587!8m2!3d11.6536392!4d77.9993449!15sChVmZXJ0aWxpemVyIHNob3Agc2FsZW1aFyIVZmVydGlsaXplciBzaG9wIHNhbGVtkgETZmVydGlsaXplcl9zdXBwbGllcpoBI0NoWkRTVWhOTUc5blMwVkpRMEZuU1VSd2FEUTNlR0puRUFF4AEA-gEECAAQJw!16s%2Fg%2F11kbtm9c9h?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "08883825266",
  "rating": 4.9},
{
  "shop_name": "Rasi Agriculture and Construction Equipments",
  "category": "Equipment",
  "district": "Salem",
  "lat": 11.6643,
  "lng": 78.1460,
  "map_url": "https://www.google.com/maps/place/Rasi+Agriculture+and+Construction+Equipments/@11.6534391,77.6194107,10z/data=!4m10!1m2!2m1!1sagriculture+equipment++shop+salem+!3m6!1s0x3babf06abfec8f55:0x45cd0607f2f06b47!8m2!3d11.6937589!4d78.1096772!15sCiFhZ3JpY3VsdHVyZSBlcXVpcG1lbnQgIHNob3Agc2FsZW1aIiIgYWdyaWN1bHR1cmUgZXF1aXBtZW50IHNob3Agc2FsZW2SAQ50cmFjdG9yX2RlYWxlcpoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VNeWQwNURXRGRSUlJBQuABAPoBBAgAEBM!16s%2Fg%2F1q6j28wty?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "07639900044",
  "rating": 4.8},
{
  "shop_name": "Massey Ferguson - Sree Amman Farm Equipments Agencies",
  "category": "Equipment",
  "district": "Salem",
  "lat": 11.6643,
  "lng": 78.1460,
  "map_url": "https://www.google.com/maps/place/Massey+Ferguson+-+Sree+Amman+Farm+Equipments+Agencies/@11.6534391,77.6194107,10z/data=!4m10!1m2!2m1!1sagriculture+equipment++shop+salem+!3m6!1s0x3babf06ea3e44b5b:0xd691e31e5d9230de!8m2!3d11.6701652!4d78.1268068!15sCiFhZ3JpY3VsdHVyZSBlcXVpcG1lbnQgIHNob3Agc2FsZW1aIiIgYWdyaWN1bHR1cmUgZXF1aXBtZW50IHNob3Agc2FsZW2SAQ50cmFjdG9yX2RlYWxlcuABAA!16s%2Fg%2F11ff5l28xf?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "08044924317",
  "rating": 4.3},
{
  "shop_name": "Guru Agro Agencies",
  "category": "Equipment",
  "district": "Salem",
  "lat": 11.6643,
  "lng": 78.1460,
  "map_url": "https://www.google.com/maps/place/Guru+Agro+Agencies/@11.6534391,77.6194107,10z/data=!4m10!1m2!2m1!1sagriculture+equipment++shop+salem+!3m6!1s0x3babf1d3bb62c219:0x2cc7237230000000!8m2!3d11.6507094!4d78.1604319!15sCiFhZ3JpY3VsdHVyZSBlcXVpcG1lbnQgIHNob3Agc2FsZW1aIiIgYWdyaWN1bHR1cmUgZXF1aXBtZW50IHNob3Agc2FsZW2SAR9hZ3JpY3VsdHVyYWxfcHJvZHVjdF93aG9sZXNhbGVymgEkQ2hkRFNVaE5NRzluUzBWSlEwRm5TVVF0YVhKNVpIUkJSUkFC4AEA-gEECAAQGQ!16s%2Fg%2F11s0fjgptd?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "09944999866",
  "rating": 4.9},

{
  "shop_name": "Sri Prabha Agrro Tools",
  "category": "Equipment",
  "district": "Salem",
  "lat": 11.6643,
  "lng": 78.1460,
  "map_url": "https://www.google.com/maps/place/Sri+Prabha+Agrro+Tools/@11.6534391,77.6194107,10z/data=!4m10!1m2!2m1!1sagriculture+equipment++shop+salem+!3m6!1s0x3babf1d38ade6573:0xa63c6f9b64d1914c!8m2!3d11.6495004!4d78.1604531!15sCiFhZ3JpY3VsdHVyZSBlcXVpcG1lbnQgIHNob3Agc2FsZW1aIiIgYWdyaWN1bHR1cmUgZXF1aXBtZW50IHNob3Agc2FsZW2SAQp0b29sX3N0b3Jl4AEA!16s%2Fg%2F11ggt5mp6w?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "09788936999",
  "rating": 4.5},


{
  "shop_name": "T V SWAMY AGENCIES ",
  "category": "Tractor rental",
  "district": "Salem",
  "lat": 11.6643,
  "lng": 78.1460,
  "map_url": "https://www.google.com/maps/place/T+V+SWAMY+AGENCIES+-+kubota+Dealer+in+Salem,Tractors+Dealer+in+Salem/@11.6526888,77.6166594,10z/data=!4m10!1m2!2m1!1stractor+agriculture+shop+salem+!3m6!1s0x3babfbff2c7b7991:0x877c66047e9d581f!8m2!3d11.7033777!4d78.1011474!15sCh50cmFjdG9yIGFncmljdWx0dXJlIHNob3Agc2FsZW1aICIedHJhY3RvciBhZ3JpY3VsdHVyZSBzaG9wIHNhbGVtkgEOdHJhY3Rvcl9kZWFsZXLgAQA!16s%2Fg%2F11h6xbwjdl?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "09080013430",
  "rating": 4.6},

{
  "shop_name": "SPS Agencies",
  "category": "Tractor rental",
  "district": "Salem",
  "lat": 11.6643,
  "lng": 78.1460,
  "map_url": "https://www.google.com/maps/place/SPS+Agencies+-+Solis+Yanmar+Tractors+(Salem+Dist.)/@11.6526888,77.6166594,10z/data=!4m10!1m2!2m1!1stractor+agriculture+shop+salem+!3m6!1s0x3babf90a180b7ad3:0x73f359dc9c6ae8e7!8m2!3d11.7289401!4d78.0628911!15sCh50cmFjdG9yIGFncmljdWx0dXJlIHNob3Agc2FsZW1aICIedHJhY3RvciBhZ3JpY3VsdHVyZSBzaG9wIHNhbGVtkgEOdHJhY3Rvcl9kZWFsZXLgAQA!16s%2Fg%2F11lrgktr8n?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "09566850273",
  "rating": 4.8},


{
  "shop_name": "RACES John Deere",
  "category": "Tractor rental",
  "district": "Salem",
  "lat": 11.6643,
  "lng": 78.1460,
  "map_url": "https://www.google.com/maps/place/RACES+John+Deere/@11.6526888,77.6166594,10z/data=!4m10!1m2!2m1!1stractor+agriculture+shop+salem+!3m6!1s0x3babf06abf8726df:0xb141806aa091530e!8m2!3d11.6935754!4d78.1099902!15sCh50cmFjdG9yIGFncmljdWx0dXJlIHNob3Agc2FsZW1aICIedHJhY3RvciBhZ3JpY3VsdHVyZSBzaG9wIHNhbGVtkgEOdHJhY3Rvcl9kZWFsZXLgAQA!16s%2Fg%2F1s049d98h?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "07530066777",
  "rating": 4.4},
{
  "shop_name": "Indo Farm Tractors",
  "category": "Tractor rental",
  "district": "Salem",
  "lat": 11.6643,
  "lng": 78.1460,
  "map_url": "https://www.google.com/maps/place/Indo+Farm+Tractors+(VIN+Traders)/@11.6526888,77.6166594,10z/data=!4m10!1m2!2m1!1stractor+agriculture+shop+salem+!3m6!1s0x3babe5c4441ae4cf:0xa16aee3ddabbc31f!8m2!3d11.5860249!4d78.0759876!15sCh50cmFjdG9yIGFncmljdWx0dXJlIHNob3Agc2FsZW2SAQ50cmFjdG9yX2RlYWxlcuABAA!16s%2Fg%2F11ylr4khql?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "09698034626",
  "rating": 5.0},

{
  "shop_name": "Pooja Seeds",
  "category": "Seed dealers",
  "district": "Salem",
  "lat": 11.6643,
  "lng": 78.1460,
  "map_url": "https://www.google.com/maps/place/Pooja+Seeds/@11.6658494,77.6045868,10z/data=!4m10!1m2!2m1!1sseed+shop+salem!3m6!1s0x3babf13d5a6c9abf:0xcd50d46465360c5!8m2!3d11.6677335!4d78.1356162!15sCg9zZWVkIHNob3Agc2FsZW2SAQ1zZWVkX3N1cHBsaWVy4AEA!16s%2Fg%2F11ghtd5hnj?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "04274030201",
  "rating": 4.4},

{
  "shop_name": "Subhiksha Organics",
  "category": "Seed dealers",
  "district": "Salem",
  "lat": 11.6643,
  "lng": 78.1460,
  "map_url": "https://www.google.com/maps/place/Subhiksha+Organics/@11.6658494,77.6045868,10z/data=!3m1!5s0x3babf04a39949dd1:0x838112e3d4a2a683!4m10!1m2!2m1!1sseed+shop+salem!3m6!1s0x3babf17469533b69:0x8d2875ba163d3aeb!8m2!3d11.6671124!4d78.1524125!15sCg9zZWVkIHNob3Agc2FsZW1aESIPc2VlZCBzaG9wIHNhbGVtkgENZ2FyZGVuX2NlbnRlcuABAA!16s%2Fg%2F11hzcyr5s0?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "09443777778",
  "rating": 4.8},

{
  "shop_name": "Sri Subhalakshmi Trading Co",
  "category": "Seed dealers",
  "district": "Salem",
  "lat": 11.6643,
  "lng": 78.1460,
  "map_url": "https://www.google.com/maps/place/Sri+Subhalakshmi+Trading+Co/@11.6658494,77.6045868,10z/data=!3m1!5s0x3babf04a39949dd1:0x838112e3d4a2a683!4m10!1m2!2m1!1sseed+shop+salem!3m6!1s0x3babf06ad4268ad5:0x627d1429f1adc7ef!8m2!3d11.6646049!4d78.1332095!15sCg9zZWVkIHNob3Agc2FsZW2SAQ1zZWVkX3N1cHBsaWVy4AEA!16s%2Fg%2F11gbt72bch?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "04272440229",
  "rating": 4.9},

{
  "shop_name": "Sri Annamalaiyar Agro Corporates",
  "category": "Seed dealers",
  "district": "Salem",
  "lat": 11.6643,
  "lng": 78.1460,
  "map_url": "https://www.google.com/maps/place/Sri+Annamalaiyar+Agro+Corporates/@11.6658494,77.6045868,10z/data=!4m10!1m2!2m1!1sseed+shop+salem!3m6!1s0x3babf027168ad381:0x6886bc53d1faea07!8m2!3d11.6467976!4d78.1433588!15sCg9zZWVkIHNob3Agc2FsZW1aESIPc2VlZCBzaG9wIHNhbGVtkgENc2VlZF9zdXBwbGllcpoBI0NoWkRTVWhOTUc5blMwVkpRMEZuU1VOU1p6UlVWMUJuRUFF4AEA-gEECAAQJA!16s%2Fg%2F11fz0y4vgv?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "04272211565",
  "rating": 4.1},
  {
  "shop_name": "Farm Aid Service",
  "category": "Pesticide & Insecticide",
  "district": "Madurai",
  "lat": 9.9252,
  "lng": 78.1198,
  "map_url": "https://www.google.com/maps/place/Farm+Aid+Service/@9.9219453,78.0899229,13z/data=!4m10!1m2!2m1!1spesticide+shop+near+Madurai+agricutuere!3m6!1s0x3b00c577d5517497:0xc0535be36dac6f50!8m2!3d9.9219453!4d78.1249418!15sCidwZXN0aWNpZGUgc2hvcCBuZWFyIE1hZHVyYWkgYWdyaWN1bHR1cmVaKSIncGVzdGljaWRlIHNob3AgbmVhciBtYWR1cmFpIGFncmljdWx0dXJlkgEfYWdyaWN1bHR1cmFsX3Byb2R1Y3Rfd2hvbGVzYWxlcpoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VSUWFuRnBUbTUzUlJBQuABAPoBBAgAEEk!16s%2Fg%2F11s2341jw4?entry=ttu&g_ep=EgoyMDI2MDExMS4wIKXMDSoASAFQAw%3D%3D",
  "contact": "09944187722",
  "rating": 4.3
},
{
  "shop_name": "VELAANMAI STORE MADURAI",
  "category": "Pesticide & Insecticide",
  "district": "Madurai",
  "lat": 9.9252,
  "lng": 78.1198,
  "map_url": "https://www.google.com/maps/place/VELAANMAI+STORE+MADURAI/@9.922455,78.0898711,13z/data=!4m10!1m2!2m1!1spesticide+shop+near+Madurai+agricutuere!3m6!1s0x3b00c59a54e2b5af:0x790ff1d0bc428f5a!8m2!3d9.922455!4d78.12489!15sCidwZXN0aWNpZGUgc2hvcCBuZWFyIE1hZHVyYWkgYWdyaWN1bHR1cmVaKSIncGVzdGljaWRlIHNob3AgbmVhciBtYWR1cmFpIGFncmljdWx0dXJlkgEUYWdyaWN1bHR1cmFsX3NlcnZpY2WaASRDaGREU1VoTk1HOW5TMFZKUTBGblNVUlRkRGRtZEROblJSQULgAQD6AQQIABAy!16s%2Fg%2F12cpg8njg?entry=ttu&g_ep=EgoyMDI2MDExMS4wIKXMDSoASAFQAw%3D%3D",
  "contact": "09843187357",
  "rating": 4.6
},

{
  "shop_name": "Linga Chemicals",
  "category": "Pesticide & Insecticide",
  "district": "Madurai",
  "lat": 9.9252,
  "lng": 78.1198,
  "map_url": "https://www.google.com/maps/place/Linga+Chemicals/@9.9219808,78.0898509,13z/data=!4m10!1m2!2m1!1spesticide+shop+near+Madurai+agricutuere!3m6!1s0x3b00c59ad0bfb413:0xd56f9cd9ae2b5a2b!8m2!3d9.9184595!4d78.1241592!15sCidwZXN0aWNpZGUgc2hvcCBuZWFyIE1hZHVyYWkgYWdyaWN1bHR1cmVaKSIncGVzdGljaWRlIHNob3AgbmVhciBtYWR1cmFpIGFncmljdWx0dXJlkgEWYWdyb2NoZW1pY2Fsc19zdXBwbGllcpoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VOc2EzWnlYM04zUlJBQuABAPoBBAgAEAw!16s%2Fg%2F1wbrw67m?entry=ttu&g_ep=EgoyMDI2MDExMS4wIKXMDSoASAFQAw%3D%3D",
  "contact": "18001023700",
  "rating": 4.0
},

{
  "shop_name": "RUKCHO BIOTECH",
  "category": "Pesticide & Insecticide",
  "district": "Madurai",
  "lat": 9.9252,
  "lng": 78.1198,
  "map_url": "https://www.google.com/maps/place/RUKCHO+BIOTECH/@9.9219808,78.0898509,13z/data=!4m10!1m2!2m1!1spesticide+shop+near+Madurai+agricutuere!3m6!1s0x3b00c585ca75e8bd:0x8d45a4cc7c8ef21b!8m2!3d9.9215409!4d78.1183178!15sCidwZXN0aWNpZGUgc2hvcCBuZWFyIE1hZHVyYWkgYWdyaWN1bHR1cmVaKSIncGVzdGljaWRlIHNob3AgbmVhciBtYWR1cmFpIGFncmljdWx0dXJlkgEUYWdyaWN1bHR1cmFsX3NlcnZpY2XgAQA!16s%2Fg%2F11v05ykxqp?entry=ttu&g_ep=EgoyMDI2MDExMS4wIKXMDSoASAFQAw%3D%3D",
  "contact": "08838448221",
  "rating": 4.9
},


{
  "shop_name": "Kissan fertilizer company",
  "category": "Fertilizer",
  "district": "Madurai",
  "lat": 9.9252,
  "lng": 78.1198,
  "map_url": "https://www.google.com/maps/place/Kissan+fertilizer+company/@9.9219808,78.0898509,13z/data=!4m10!1m2!2m1!1sfertilizer+shop+Madurai!3m6!1s0x3b00c5cbf5a1bc9b:0x278a463454ad0c8d!8m2!3d9.9413935!4d78.1518815!15sChdmZXJ0aWxpemVyIHNob3AgTWFkdXJhaVoZIhdmZXJ0aWxpemVyIHNob3AgbWFkdXJhaZIBE2ZlcnRpbGl6ZXJfc3VwcGxpZXKaASRDaGREU1VoTk1HOW5TMFZKUTBGblNVTjFialJ1VWpWM1JSQULgAQD6AQQIABAm!16s%2Fg%2F11b8_j19_7?entry=ttu&g_ep=EgoyMDI2MDExMS4wIKXMDSoASAFQAw%3D%3D",
  "contact": "09842129924",
  "rating": 4.3},

{
  "shop_name": "VIJAYALAKSHMI STORE",
  "category": "Fertilizer",
  "district": "Madurai",
  "lat": 9.9252,
  "lng": 78.1198,
  "map_url": "https://www.google.com/maps/place/VIJAYALAKSHMI+STORE/@9.9219808,78.0898509,13z/data=!4m10!1m2!2m1!1sfertilizer+shop+Madurai!3m6!1s0x3b00c5cc0573d87b:0x4281d2b4ff9ea191!8m2!3d9.9421164!4d78.1514309!15sChdmZXJ0aWxpemVyIHNob3AgTWFkdXJhaZIBDWdlbmVyYWxfc3RvcmXgAQA!16s%2Fg%2F11ckqsvy35?entry=ttu&g_ep=EgoyMDI2MDExMS4wIKXMDSoASAFQAw%3D%3D",
  "contact": "09842324680",
  "rating": 4.5},
{
  "shop_name": "Sri Balaji Fertlizer Depo",
  "category": "Fertilizer",
  "district": "Madurai",
  "lat": 9.9252,
  "lng": 78.1198,
  "map_url": "https://www.google.com/maps/place/Sri+Balaji+Fertlizer+Depot/@9.9219808,78.0898509,13z/data=!4m10!1m2!2m1!1sfertilizer+shop+Madurai!3m6!1s0x3b00c59ba0aaf84d:0xde614c57d898d7e5!8m2!3d9.9231719!4d78.1244158!15sChdmZXJ0aWxpemVyIHNob3AgTWFkdXJhaVoZIhdmZXJ0aWxpemVyIHNob3AgbWFkdXJhaZIBDXNlZWRfc3VwcGxpZXKaAURDaTlEUVVsUlFVTnZaRU5vZEhsalJqbHZUMnQ0UzAxWE9WVlViVXA2VmpJeFJWSkVRbEZqTTBwWFlWaFdXRm96WXhBQuABAPoBBAgAEA0!16s%2Fg%2F11fz0d4ctw?entry=ttu&g_ep=EgoyMDI2MDExMS4wIKXMDSoASAFQAw%3D%3D",
  "contact": "09944470470",
  "rating": 4.8},
{
  "shop_name": "Karumbu Selvam Ura Depo",
  "category": "Fertilizer",
  "district": "Madurai",
   "lat": 9.9252,
  "lng": 78.1198,
  "map_url": "https://www.google.com/maps/place/Karumbu+Selvam+Ura+Depo/@9.9219808,78.0898509,13z/data=!4m10!1m2!2m1!1sfertilizer+shop+Madurai!3m6!1s0x3b00c530292941a3:0x358d2876ea1c7193!8m2!3d9.9231288!4d78.1244721!15sChdmZXJ0aWxpemVyIHNob3AgTWFkdXJhaZIBE2ZlcnRpbGl6ZXJfc3VwcGxpZXLgAQA!16s%2Fg%2F11n6d_qc65?entry=ttu&g_ep=EgoyMDI2MDExMS4wIKXMDSoASAFQAw%3D%3D",
  "contact": "07598276745",
  "rating": 4.8},

{
  "shop_name": "Vedham Agri Engineering",
  "category": "Equipment",
  "district": "Madurai",
   "lat": 9.9252,
  "lng": 78.1198,
  "map_url": "https://www.google.com/maps/place/Vedham+Agri+Engineering/@9.9219808,78.0898509,13z/data=!4m10!1m2!2m1!1sagriculture+equipment++Madurai!3m6!1s0x3b00c59af5b4c5cb:0xc75f89e72f53b0da!8m2!3d9.9219808!4d78.1248698!15sCh5hZ3JpY3VsdHVyZSBlcXVpcG1lbnQgIE1hZHVyYWlaHyIdYWdyaWN1bHR1cmUgZXF1aXBtZW50IG1hZHVyYWmSARdmYXJtX2VxdWlwbWVudF9zdXBwbGllcpoBI0NoWkRTVWhOTUc5blMwVkpRMEZuU1VOdU1rNWZOVlYzRUFF4AEA-gEECAAQMg!16s%2Fg%2F1tdcvjpc?entry=ttu&g_ep=EgoyMDI2MDExMS4wIKXMDSoASAFQAw%3D%3D",
  "contact": "09865333317",
  "rating": 4.0},

{
  "shop_name": "Parani Mill Stores",
  "category": "Equipment",
  "district": "Madurai",
   "lat": 9.9252,
  "lng": 78.1198,
  "map_url": "https://www.google.com/maps/place/Parani+Mill+Stores/@9.9219808,78.0898509,13z/data=!4m10!1m2!2m1!1sagriculture+equipment++Madurai!3m6!1s0x3b00c580bfba178f:0x66bfbe1d0a2a8594!8m2!3d9.9169815!4d78.1121363!15sCh5hZ3JpY3VsdHVyZSBlcXVpcG1lbnQgIE1hZHVyYWlaHyIdYWdyaWN1bHR1cmUgZXF1aXBtZW50IG1hZHVyYWmSAR9hZ3JpY3VsdHVyYWxfcHJvZHVjdF93aG9sZXNhbGVymgFEQ2k5RFFVbFJRVU52WkVOb2RIbGpSamx2VDIxTk1HSnJOVFZhYXpWTVpESk5kMlJWT1c5VlJFNTVUMGN3TkUxVlJSQULgAQD6AQQIABAz!16s%2Fg%2F1tdj2m_d?entry=ttu&g_ep=EgoyMDI2MDExMS4wIKXMDSoASAFQAw%3D%3D",
  "contact": "09500823452",
  "rating": 4.5},


{
  "shop_name": "TAFE",
  "category": "Equipment",
  "district": "Madurai",
   "lat": 9.9252,
  "lng": 78.1198,
  "map_url": "https://www.google.com/maps/place/TAFE/@9.9219808,78.0898509,13z/data=!3m1!5s0x3b00c588e7f27b49:0xaa8fa9bfa35b329b!4m10!1m2!2m1!1sagriculture+equipment++Madurai!3m6!1s0x3b00c588e83d43d9:0xb09883f4708a8c7d!8m2!3d9.925838!4d78.1150584!15sCh5hZ3JpY3VsdHVyZSBlcXVpcG1lbnQgIE1hZHVyYWlaHyIdYWdyaWN1bHR1cmUgZXF1aXBtZW50IG1hZHVyYWmSARdmYXJtX2VxdWlwbWVudF9zdXBwbGllcpoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VSVGJqaFljSHBCUlJBQuABAPoBBAgAECw!16s%2Fg%2F11b80765ht?entry=ttu&g_ep=EgoyMDI2MDExMS4wIKXMDSoASAFQAw%3D%3D",
  "contact": "04466919000",
  "rating": 4.3},


{
  "shop_name": "ANIRUDHA FARM EQUIPMENTS",
  "category": "Equipment",
  "district": "Madurai",
   "lat": 9.9252,
  "lng": 78.1198,
  "map_url": "https://www.google.com/maps/place/ANIRUDHA+FARM+EQUIPMENTS/@9.8487542,78.0641469,13z/data=!4m10!1m2!2m1!1sagriculture+equipment++Madurai!3m6!1s0x3b00c52eb3283055:0x29b0a9b1cdfb21d!8m2!3d9.8487542!4d78.0991658!15sCh5hZ3JpY3VsdHVyZSBlcXVpcG1lbnQgIE1hZHVyYWlaHyIdYWdyaWN1bHR1cmUgZXF1aXBtZW50IG1hZHVyYWmSAR9hZ3JpY3VsdHVyYWxfcHJvZHVjdF93aG9sZXNhbGVymgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVU10ZW5GcWMxbDNFQUXgAQD6AQQIABAi!16s%2Fg%2F11h1b98s_b?entry=ttu&g_ep=EgoyMDI2MDExMS4wIKXMDSoASAFQAw%3D%3D",
  "contact": "08220589988",
  "rating": 4.9},

{
  "shop_name": "ANIRUDHA TRACTORS TAFE MF DEALER MADURAI",
  "category": "Tractor rental",
  "district": "Madurai",
   "lat": 9.9252,
  "lng": 78.1198,
  "map_url": "https://www.google.com/maps/place/ANIRUDHA+TRACTORS+TAFE+MF+DEALER+MADURAI/@9.8487379,78.0641377,13z/data=!4m10!1m2!2m1!1stractor+rente++Madurai!3m6!1s0x3b00d138f82b976d:0xb9db4c5ebcc976cd!8m2!3d9.8487379!4d78.0991566!15sChZ0cmFjdG9yIHJlbnRlICBNYWR1cmFpWhciFXRyYWN0b3IgcmVudGUgbWFkdXJhaZIBDnRyYWN0b3JfZGVhbGVy4AEA!16s%2Fg%2F11v5p0sw5b?entry=ttu&g_ep=EgoyMDI2MDExMS4wIKXMDSoASAFQAw%3D%3D",
  "contact": "08220589988",
  "rating": 4.9},
{
  "shop_name": "kannan tractor Deals",
  "category": "Tractor rental",
  "district": "Madurai",
   "lat": 9.9252,
  "lng": 78.1198,
  "map_url": "https://www.google.com/maps/place/kannan+tractor+Deals/@9.9219808,78.0898509,13z/data=!4m10!1m2!2m1!1stractor+rente++Madurai!3m6!1s0x3b00cf4574d8b2e5:0x96034eb1c185cc0c!8m2!3d9.9437214!4d78.0966692!15sChZ0cmFjdG9yIHJlbnRlICBNYWR1cmFpWhciFXRyYWN0b3IgcmVudGUgbWFkdXJhaZIBDnRyYWN0b3JfZGVhbGVy4AEA!16s%2Fg%2F11clvvl9gt?entry=ttu&g_ep=EgoyMDI2MDExMS4wIKXMDSoASAFQAw%3D%3D",
  "contact": "09443167460",
  "rating": 4.5},

{
  "shop_name": "Mahindra Tractor - Sri Sudhan Tractors",
  "category": "Tractor rental",
  "district": "Madurai",
   "lat": 9.9252,
  "lng": 78.1198,
  "map_url": "https://www.google.com/maps/place/Mahindra+Tractor+-+Sri+Sudhan+Tractors/@9.9219808,78.0898509,13z/data=!4m10!1m2!2m1!1stractor+++Madurai!3m6!1s0x3b00c99677b7928b:0xbd35668e4e5eddd5!8m2!3d9.9737769!4d78.0973257!15sChF0cmFjdG9yICAgTWFkdXJhaVoRIg90cmFjdG9yIG1hZHVyYWmSAQ50cmFjdG9yX2RlYWxlcuABAA!16s%2Fg%2F11rf88gsr9?entry=ttu&g_ep=EgoyMDI2MDExMS4wIKXMDSoASAFQAw%3D%3D",
  "contact": "08071639220",
  "rating": 4.5},
{
  "shop_name": "John Deere Jayaraj Tractors",
  "category": "Tractor rental",
  "district": "Madurai",
   "lat": 9.9252,
  "lng": 78.1198,
  "map_url": "https://www.google.com/maps/place/John+Deere+Jayaraj+Tractors/@9.9219808,78.0898509,13z/data=!4m10!1m2!2m1!1stractor+++Madurai!3m6!1s0x3b00cf4ff0677605:0xc6946f09e7d12a!8m2!3d9.9459095!4d78.0987539!15sChF0cmFjdG9yICAgTWFkdXJhaVoRIg90cmFjdG9yIG1hZHVyYWmSAQ50cmFjdG9yX2RlYWxlcuABAA!16s%2Fg%2F11b7xry6t7?entry=ttu&g_ep=EgoyMDI2MDExMS4wIKXMDSoASAFQAw%3D%3D",
  "contact": "04522669147",
  "rating": 3.9},
{
  "shop_name": "Dharneesh and Co",
  "category": "Seed dealers",
  "district": "Madurai",
   "lat": 9.9252,
  "lng": 78.1198,
  "map_url": "https://www.google.com/maps/place/Dharneesh+and+Co/@11.644016,76.1746628,8z/data=!4m19!1m12!4m11!1m3!2m2!1d77.4139189!2d10.850172!1m6!1m2!1s0x3b00c5c0f5a26517:0xd480bdc22afbb7a5!2s2%2F239,+Thandal+Muthu+Konar+St,+near+manthaiyamman+Kovil,+Narayanapuram,+Mahalakshmi+Nagar,+Madurai,+Tamil+Nadu+625002!2m2!1d78.1330941!2d9.9576238!3m5!1s0x3b00c5c0f5a26517:0xd480bdc22afbb7a5!8m2!3d9.9576238!4d78.1330941!16s%2Fg%2F11fmgbr0mp?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "08248494932",
  "rating": 4.8},
{
  "shop_name": "Jeyaram Agro Trader",
  "category": "Seed dealers",
  "district": "Madurai",
   "lat": 9.9252,
  "lng": 78.1198,
  "map_url": "https://www.google.com/maps/place/9%C2%B049'28.4%22N+77%C2%B059'01.2%22E/@9.8245649,77.9836731,17z/data=!3m1!4b1!4m4!3m3!8m2!3d9.8245649!4d77.9836731?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "07947150777",
  "rating": 4.8},
{
  "shop_name": "Sri Balaji Fertlizer Depot",
  "category": "Seed dealers",
  "district": "Madurai",
   "lat": 9.9252,
  "lng": 78.1198,
  "map_url": "https://www.google.com/maps/place/Sri+Balaji+Fertlizer+Depot/@9.9231719,78.0584978,13z/data=!4m10!1m2!2m1!1sseed+shop+madurai+!3m6!1s0x3b00c59ba0aaf84d:0xde614c57d898d7e5!8m2!3d9.9231719!4d78.1244158!15sChFzZWVkIHNob3AgbWFkdXJhaVoTIhFzZWVkIHNob3AgbWFkdXJhaZIBDXNlZWRfc3VwcGxpZXKaAURDaTlEUVVsUlFVTnZaRU5vZEhsalJqbHZUMnQ0UzAxWE9WVlViVXA2VmpJeFJWSkVRbEZqTTBwWFlWaFdXRm96WXhBQuABAPoBBAgAEA0!16s%2Fg%2F11fz0d4ctw?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "09944470470",
  "rating": 4.8},
{
  "shop_name": "ARS Nursery & Agro",
  "category": "Seed dealers",
  "district": "Madurai",
   "lat": 9.9252,
  "lng": 78.1198,
  "map_url": "https://www.google.com/maps/place/ARS+Nursery+%26+Agro/@9.9231669,78.0584978,13z/data=!4m10!1m2!2m1!1sseed+and+nursery++madurai+!3m6!1s0x3b00c59a8deab75d:0x4a96b64bdc99875d!8m2!3d9.9229849!4d78.1244573!15sChlzZWVkIGFuZCBudXJzZXJ5ICBtYWR1cmFpWhoiGHNlZWQgYW5kIG51cnNlcnkgbWFkdXJhaZIBDXBsYW50X251cnNlcnmaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVUmZYMDloVDA1bkVBReABAPoBBQiYAhA9!16s%2Fg%2F11ggpy2nft?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
  "contact": "07845076776",
  "rating": 4.5},
  
{
  "shop_name": "MEGIDDO PEST CONTROL",
  "category": "Pesticide & Insecticide",
  "district": "Coimbatore",
  "lat": 11.0168,
  "lng": 76.9558,
  "map_url": "https://www.google.com/maps/place/MEGIDDO+PEST+CONTROL/@11.0238563,76.8878243,13z/data=!4m10!1m2!2m1!1spesticide+shop+near+Coimbatore!3m6!1s0x3ba8585154076127:0x8d1e50d272e5219e!8m2!3d11.0238563!4d76.964042!15sCh5wZXN0aWNpZGUgc2hvcCBuZWFyIENvaW1iYXRvcmVaICIecGVzdGljaWRlIHNob3AgbmVhciBjb2ltYmF0b3JlkgEUcGVzdF9jb250cm9sX3NlcnZpY2XgAQA!16s%2Fg%2F11bxfz75lt?entry=ttu&g_ep=EgoyMDI2MDExMS4wIKXMDSoASAFQAw%3D%3D",
  "contact": "+91 9894166788",
  "rating": 4.9
},

{
  "shop_name": "Sri Sakthi Agro Service",
  "category": "Pesticide & Insecticide",
  "district": "Coimbatore",
  "lat": 11.0168,
  "lng": 76.9558,
  "map_url": "https://www.google.com/maps/place/Sri+Sakthi+Agro+Service/@11.0238563,76.8878243,13z/data=!4m10!1m2!2m1!1spesticide+shop+near+Coimbatore!3m6!1s0x3ba858e008b03b89:0xe1f3ea35459387a4!8m2!3d11.0135279!4d76.941583!15sCh5wZXN0aWNpZGUgc2hvcCBuZWFyIENvaW1iYXRvcmVaICIecGVzdGljaWRlIHNob3AgbmVhciBjb2ltYmF0b3JlkgENc2VlZF9zdXBwbGllcpoBI0NoWkRTVWhOTUc5blMwVkpRMEZuU1VSUE5GODNlRkJSRUFF4AEA-gEECAAQJw!16s%2Fg%2F11b5zzrj2k?entry=ttu&g_ep=EgoyMDI2MDExMS4wIKXMDSoASAFQAw%3D%3D",
  "contact": "04222436735",
  "rating": 3.9
},

{
  "shop_name": "Kumaran Agro Service",
  "category": "Pesticide & Insecticide",
  "district": "Coimbatore",
  "lat": 11.0168,
  "lng": 76.9558,
  "map_url": "https://www.google.com/maps/place/Kumaran+Agro+Service/@11.0238563,76.8878243,13z/data=!4m10!1m2!2m1!1spesticide+shop+near+Coimbatore!3m6!1s0x3ba859a9a2fe3e69:0xc2a4f13dd1ebee7f!8m2!3d11.0268762!4d76.9510159!15sCh5wZXN0aWNpZGUgc2hvcCBuZWFyIENvaW1iYXRvcmVaICIecGVzdGljaWRlIHNob3AgbmVhciBjb2ltYmF0b3JlkgETZmVydGlsaXplcl9zdXBwbGllcpoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VONE1UVlViak5uUlJBQuABAPoBBAgAEA8!16s%2Fg%2F1tfmltwk?entry=ttu&g_ep=EgoyMDI2MDExMS4wIKXMDSoASAFQAw%3D%3D",
  "contact": "09443175179",
  "rating": 3.3
},

{
  "shop_name": "Eco Pest Control People",
  "category": "Pesticide & Insecticide",
  "district": "Coimbatore",
  "lat": 11.0168,
  "lng": 76.9558,
  "map_url": "https://www.google.com/maps/place/Eco+Pest+Control+People/@11.0238563,76.8878243,13z/data=!4m10!1m2!2m1!1spesticide+shop+near+Coimbatore!3m6!1s0x3ba85995ce8634df:0x533a7e340dba6a26!8m2!3d11.0227438!4d76.9451227!15sCh5wZXN0aWNpZGUgc2hvcCBuZWFyIENvaW1iYXRvcmVaICIecGVzdGljaWRlIHNob3AgbmVhciBjb2ltYmF0b3JlkgEUcGVzdF9jb250cm9sX3NlcnZpY2XgAQA!16s%2Fg%2F11g07tlpzm?entry=ttu&g_ep=EgoyMDI2MDExMS4wIKXMDSoASAFQAw%3D%3D",
  "contact": "+91 9894166788",
  "rating": 4.5
},
{
  "shop_name": "Green Way Agro Products",
  "category": "Fertilizer",
  "district": "Coimbatore",
  "lat": 11.0168,
  "lng": 76.9558,
  "map_url": "https://www.google.com/maps/place/Green+Way+Agro+Products/@11.0238563,76.8878243,13z/data=!4m10!1m2!2m1!1sfertilizer+dealer+near+Coimbatore!3m6!1s0x3ba858c632eaef4d:0xa959c70a78d03b6c!8m2!3d11.0582342!4d76.9133768!15sCiFmZXJ0aWxpemVyIGRlYWxlciBuZWFyIENvaW1iYXRvcmVaIyIhZmVydGlsaXplciBkZWFsZXIgbmVhciBjb2ltYmF0b3JlkgETZmVydGlsaXplcl9zdXBwbGllcpoBI0NoWkRTVWhOTUc5blMwVkpRMEZuVFVObmVEWnVUbU4zRUFF4AEA-gEFCPcDEC4!16s%2Fg%2F11svpjp0m3?entry=ttu&g_ep=EgoyMDI2MDExMS4wIKXMDSoASAFQAw%3D%3D",
  "contact": "09361804445",
  "rating": 5.0},
{
  "shop_name": "P. Namachivayam Fertilizer Store",
  "category": "Fertilizer",
  "district": "Coimbatore",
  "lat": 11.0168,
  "lng": 76.9558,
  "map_url": "https://www.google.com/maps/place/P.+Namachivayam+Fertilizer+Store/@10.9924298,76.9247639,13z/data=!4m10!1m2!2m1!1sfertilizer+dealer+near+Coimbatore!3m6!1s0x3ba8590b46c3c8b9:0xe71219814097929f!8m2!3d10.9924298!4d76.9597828!15sCiFmZXJ0aWxpemVyIGRlYWxlciBuZWFyIENvaW1iYXRvcmVaIyIhZmVydGlsaXplciBkZWFsZXIgbmVhciBjb2ltYmF0b3JlkgETZmVydGlsaXplcl9zdXBwbGllcpoBJENoZERTVWhOTUc5blMwVk1kVmg0WTFOb2VqVlFZWE5uUlJBQuABAPoBBAgAEBw!16s%2Fg%2F1q64crs7h?entry=ttu&g_ep=EgoyMDI2MDExMS4wIKXMDSoASAFQAw%3D%3D",
  "contact": "04222390962",
  "rating": 4.4},

{
  "shop_name": "Farmmetrix India Pvt Ltd",
  "category": "Fertilizer",
  "district": "Coimbatore",
  "lat": 11.0168,
  "lng": 76.9558,
  "map_url": "https://www.google.com/maps/place/Farmmetrix+India+Pvt+Ltd/@11.0238563,76.8878243,13z/data=!4m10!1m2!2m1!1sfertilizer+dealer+near+Coimbatore!3m6!1s0x3ba8f7160aeaa9eb:0x74b17b2a1ff0ef4f!8m2!3d11.0678572!4d76.9492213!15sCiFmZXJ0aWxpemVyIGRlYWxlciBuZWFyIENvaW1iYXRvcmVaIyIhZmVydGlsaXplciBkZWFsZXIgbmVhciBjb2ltYmF0b3JlkgETZmVydGlsaXplcl9zdXBwbGllcpoBRENpOURRVWxSUVVOdlpFTm9kSGxqUmpsdlQyMWthMDVVUW5OYVNHZzFVekJXYkZvelVrMVBWbEp5V2xSc2NGWXpZeEFC4AEA-gEECAAQDA!16s%2Fg%2F11hxzt_r85?entry=ttu&g_ep=EgoyMDI2MDExMS4wIKXMDSoASAFQAw%3D%3D",
  "contact": "09384054859",
  "rating": 4.8},

{
  "shop_name": "Green Way Agro Products",
  "category": "Fertilizer",
  "district": "Coimbatore",
  "lat": 11.0168,
  "lng": 76.9558,
  "map_url": "https://www.google.com/maps/place/Green+Way+Agro+Products/@11.0238563,76.8878243,13z/data=!4m10!1m2!2m1!1sfertilizer+dealer+near+Coimbatore!3m6!1s0x3ba858c632eaef4d:0xa959c70a78d03b6c!8m2!3d11.0582342!4d76.9133768!15sCiFmZXJ0aWxpemVyIGRlYWxlciBuZWFyIENvaW1iYXRvcmVaIyIhZmVydGlsaXplciBkZWFsZXIgbmVhciBjb2ltYmF0b3JlkgETZmVydGlsaXplcl9zdXBwbGllcpoBI0NoWkRTVWhOTUc5blMwVkpRMEZuVFVObmVEWnVUbU4zRUFF4AEA-gEFCPcDEC4!16s%2Fg%2F11svpjp0m3?entry=ttu&g_ep=EgoyMDI2MDExMS4wIKXMDSoASAFQAw%3D%3D",
  "contact": "09361804445",
  "rating": 5.0},

{
  "shop_name": "Venkateshwara Agro Centre",
  "category": "Equipment",
  "district": "Coimbatore",
  "lat": 11.0168,
  "lng": 76.9558,
  "map_url": "https://www.google.com/maps/place/Venkateshwara+Agro+Centre/@11.035918,76.926547,13z/data=!4m10!1m2!2m1!1sagriculture+equipment+store+Coimbatore!3m6!1s0x3ba8585560d86aab:0x3c03656b8667b69c!8m2!3d11.0155714!4d76.9647114!15sCiZhZ3JpY3VsdHVyZSBlcXVpcG1lbnQgc3RvcmUgQ29pbWJhdG9yZVooIiZhZ3JpY3VsdHVyZSBlcXVpcG1lbnQgc3RvcmUgY29pbWJhdG9yZZIBH2FncmljdWx0dXJhbF9wcm9kdWN0X3dob2xlc2FsZXKaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVUjBlV1oxYlZObkVBReABAPoBBAgMECQ!16s%2Fg%2F1vp6ymnb?entry=ttu&g_ep=EgoyMDI2MDExMS4wIKXMDSoASAFQAw%3D%3D",
  "contact": "09362138292",
  "rating": 3.3},

{
  "shop_name": "Hi-5 Agricultural Equipment",
  "category": "Equipment",
  "district": "Coimbatore",
  "lat": 11.0168,
  "lng": 76.9558,
  "map_url": "https://www.google.com/maps/place/Hi-5+Agricultural+Equipment/@11.035918,76.926547,13z/data=!4m10!1m2!2m1!1sagriculture+equipment+store+Coimbatore!3m6!1s0x3ba8585566a2631b:0xf432b24fce934437!8m2!3d11.0156278!4d76.9658179!15sCiZhZ3JpY3VsdHVyZSBlcXVpcG1lbnQgc3RvcmUgQ29pbWJhdG9yZZIBH2FncmljdWx0dXJhbF9wcm9kdWN0X3dob2xlc2FsZXLgAQA!16s%2Fg%2F11g7ks4ksn?entry=ttu&g_ep=EgoyMDI2MDExMS4wIKXMDSoASAFQAw%3D%3D",
  "contact": "09626012555",
  "rating": 3.0},

{
  "shop_name": "Vijaya Agro Agencies",
  "category": "Equipment",
  "district": "Coimbatore",
  "lat": 11.0168,
  "lng": 76.9558,
  "map_url": "https://www.google.com/maps/place/Vijaya+Agro+Agencies/@11.035918,76.926547,13z/data=!3m1!5s0x3ba858556b64f49f:0x21b22ad2448d41ea!4m10!1m2!2m1!1sagriculture+equipment+store+Coimbatore!3m6!1s0x3ba8eeba8f846439:0xb47aef1b8678f0fd!8m2!3d11.0155679!4d76.9656306!15sCiZhZ3JpY3VsdHVyZSBlcXVpcG1lbnQgc3RvcmUgQ29pbWJhdG9yZVooIiZhZ3JpY3VsdHVyZSBlcXVpcG1lbnQgc3RvcmUgY29pbWJhdG9yZZIBBXN0b3Jl4AEA!16s%2Fg%2F1thgfg8t?entry=ttu&g_ep=EgoyMDI2MDExMS4wIKXMDSoASAFQAw%3D%3D",
  "contact": "04222235677",
  "rating": 4.0},

{
  "shop_name": "GREEN KRAFT",
  "category": "Equipment",
  "district": "Coimbatore",
  "lat": 11.0168,
  "lng": 76.9558,
  "map_url": "https://www.google.com/maps/place/GREEN+KRAFT/@11.035918,76.926547,13z/data=!4m10!1m2!2m1!1sagriculture+equipment+store+Coimbatore!3m6!1s0x3ba85855672aceef:0x938a041ba4351a20!8m2!3d11.0152977!4d76.9646475!15sCiZhZ3JpY3VsdHVyZSBlcXVpcG1lbnQgc3RvcmUgQ29pbWJhdG9yZVooIiZhZ3JpY3VsdHVyZSBlcXVpcG1lbnQgc3RvcmUgY29pbWJhdG9yZZIBF2Zhcm1fZXF1aXBtZW50X3N1cHBsaWVymgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVVJJYzNGaWFVeFJFQUXgAQD6AQQIABBB!16s%2Fg%2F11c529b2lq?entry=ttu&g_ep=EgoyMDI2MDExMS4wIKXMDSoASAFQAw%3D%3D",
  "contact": "08046060193",
  "rating": 4.1},

{
  "shop_name": "AADHAVAN EARTH MOVERS",
  "category": "Tractor rental",
  "district": "Coimbatore",
  "lat": 11.0168,
  "lng": 76.9558,
  "map_url": "https://www.google.com/maps/place/AADHAVAN+EARTH+MOVERS/@11.0787881,77.0405972,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba85950a710638f:0x4309b667c4c0655a!8m2!3d11.0787881!4d77.0454681!16s%2Fg%2F11rtc_nr16?entry=ttu&g_ep=EgoyMDI2MDExMS4wIKXMDSoASAFQAw%3D%3D",
  "contact": "09842279996",
  "rating": 4.9},
{
  "shop_name": "Kovai Tractors & Farm Equipments",
  "category": "Tractor rental",
  "district": "Coimbatore",
  "lat": 11.0168,
  "lng": 76.9558,
  "map_url": "https://www.google.com/maps/place/Kovai+Tractors+%26+Farm+Equipments/@11.004201,76.358753,10z/data=!4m20!1m13!4m12!1m4!2m2!1d77.4701604!2d10.9910432!4e1!1m6!1m2!1s0x3ba859a8ebbc9bed:0xb01ffc790f3bc63c!2sKovai+Tractors+%26+Farm+Equipments,+Shop+No.7,+Addis+St,+Grey+Town,+ATT+Colony,+Gopalapuram,+Coimbatore,+Tamil+Nadu+641018!2m2!1d76.9683775!2d11.0045103!3m5!1s0x3ba859a8ebbc9bed:0xb01ffc790f3bc63c!8m2!3d11.0045103!4d76.9683775!16s%2Fg%2F1q6jj77g_?entry=ttu&g_ep=EgoyMDI2MDExMS4wIKXMDSoASAFQAw%3D%3D",
  "contact": "09443914224",
  "rating": 4.0},
{
  "shop_name": "RK Nursery and Seeds",
  "category": "Seed dealers",
  "district": "Coimbatore",
  "lat": 11.0168,
  "lng": 76.9558,
  "map_url": "https://www.google.com/maps/place/RK+Nursery+and+Seeds/@11.0139356,76.8848326,12z/data=!4m10!1m2!2m1!1sSeed+Dealers+coimbatore!3m6!1s0x3ba8ef75abcdee69:0xefa44d0c814c6599!8m2!3d11.026769!4d76.9057724!15sChdTZWVkIERlYWxlcnMgY29pbWJhdG9yZVoZIhdzZWVkIGRlYWxlcnMgY29pbWJhdG9yZZIBDXNlZWRfc3VwcGxpZXKaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVTmxPWFZ4ZWtoUkVBReABAPoBBAgAEEo!16s%2Fg%2F11s2lccrqk?entry=ttu&g_ep=EgoyMDI2MDExMS4wIKXMDSoASAFQAw%3D%3D",
  "contact": "09943517361",
  "rating": 4.8},
{
  "shop_name": "Empee Agro Tech",
  "category": "Seed dealers",
  "district": "Coimbatore",
  "lat": 11.0168,
  "lng": 76.9558,
  "map_url": "https://www.google.com/maps/place/Empee+Agro+Tech/@11.0139356,76.8848326,12z/data=!4m10!1m2!2m1!1sSeed+Dealers+coimbatore!3m6!1s0x3ba851d880def93f:0x7c8c5f670fcc49b0!8m2!3d10.9430388!4d76.9863578!15sChdTZWVkIERlYWxlcnMgY29pbWJhdG9yZVoZIhdzZWVkIGRlYWxlcnMgY29pbWJhdG9yZZIBDXNlZWRfc3VwcGxpZXKaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVTlNaM0JtY2tKUkVBReABAPoBBAgAEA0!16s%2Fg%2F11fknbspm4?entry=ttu&g_ep=EgoyMDI2MDExMS4wIKXMDSoASAFQAw%3D%3D",
  "contact": "08870600820",
  "rating": 4.5},
{
  "shop_name": "Sri Sakthi Agro Service",
  "category": "Seed dealers",
  "district": "Coimbatore",
  "lat": 11.0168,
  "lng": 76.9558,
  "map_url": "https://www.google.com/maps/place/Sri+Sakthi+Agro+Service/@11.0139356,76.8848326,12z/data=!4m10!1m2!2m1!1sSeed+Dealers+coimbatore!3m6!1s0x3ba858e008b03b89:0xe1f3ea35459387a4!8m2!3d11.0135279!4d76.941583!15sChdTZWVkIERlYWxlcnMgY29pbWJhdG9yZVoZIhdzZWVkIGRlYWxlcnMgY29pbWJhdG9yZZIBDXNlZWRfc3VwcGxpZXKaASRDaGREU1VoTk1HOW5TMFZKUTBGblNVTlhkM0pNYjJ0blJSQULgAQD6AQQIABBI!16s%2Fg%2F11b5zzrj2k?entry=ttu&g_ep=EgoyMDI2MDExMS4wIKXMDSoASAFQAw%3D%3D",
  "contact": "04222436735",
  "rating": 3.9},
{
  "shop_name": "Seed Centre",
  "category": "Seed dealers",
  "district": "Coimbatore",
  "lat": 11.0168,
  "lng": 76.9558,
  "map_url": "https://www.google.com/maps/place/Seed+Centre/@11.0139356,76.8848326,12z/data=!4m10!1m2!2m1!1sSeed+Dealers+coimbatore!3m6!1s0x3ba858d8eb3568eb:0x3654e2e61f058345!8m2!3d11.0138599!4d76.9337904!15sChdTZWVkIERlYWxlcnMgY29pbWJhdG9yZZIBEnJlc2VhcmNoX2luc3RpdHV0ZeABAA!16s%2Fg%2F11b6q5lt05?entry=ttu&g_ep=EgoyMDI2MDExMS4wIKXMDSoASAFQAw%3D%3D",
  "contact": "04226611432",
  "rating": 4.0},

]
def calculate_distance(lat1, lon1, lat2, lon2):
    R = 6371  # Earth radius in KM
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)

    a = (
        math.sin(dlat / 2) ** 2
        + math.cos(math.radians(lat1))
        * math.cos(math.radians(lat2))
        * math.sin(dlon / 2) ** 2
    )
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c


# ======================================================
# 🔹 GET ALL SHOPS (FILTERABLE)
# ======================================================
@router.get("/")
def get_shops(
    district: str | None = Query(None),
    category: str | None = Query(None)
):
    results = SHOPS

    if district:
        results = [s for s in results if s["district"].lower() == district.lower()]

    if category:
        results = [s for s in results if s["category"].lower() == category.lower()]

    return results

