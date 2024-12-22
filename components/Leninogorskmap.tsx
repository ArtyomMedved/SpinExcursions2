import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';

const LeninogorskMap = () => {
    const region = {
        latitude: 54.599028, // Центр Лениногорска
        longitude: 52.442676,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    };

    // Координаты дорог
    const roads = [
      [
        {
          "latitude": 54.58671609331,
          "longitude": 52.4318182704
        },
        {
          "latitude": 54.5866570933,
          "longitude": 52.4316854704
        },
        {
          "latitude": 54.58636859327,
          "longitude": 52.4310184704
        },
        {
          "latitude": 54.58634039327,
          "longitude": 52.4309519704
        },
        {
          "latitude": 54.58562239319,
          "longitude": 52.4292626704
        },
        {
          "latitude": 54.58442529305,
          "longitude": 52.4265308704
        },
        {
          "latitude": 54.58412129302,
          "longitude": 52.4257862704
        },
        {
          "latitude": 54.58351419295,
          "longitude": 52.4242995704
        },
        {
          "latitude": 54.58250959283,
          "longitude": 52.4219528704
        },
        {
          "latitude": 54.5821656928,
          "longitude": 52.4210694704
        },
        {
          "latitude": 54.58153099272,
          "longitude": 52.4196319704
        },
        {
          "latitude": 54.58100739267,
          "longitude": 52.4183577704
        },
        {
          "latitude": 54.58013069257,
          "longitude": 52.4162834704
        },
        {
          "latitude": 54.57995519255,
          "longitude": 52.4158568704
        },
        {
          "latitude": 54.57911839245,
          "longitude": 52.4139104704
        }
      ],
      [
        {
          "latitude": 54.57693999221,
          "longitude": 52.4510817704
        },
        {
          "latitude": 54.57829139236,
          "longitude": 52.4515006704
        },
        {
          "latitude": 54.57877989241,
          "longitude": 52.4516559704
        },
        {
          "latitude": 54.57916009246,
          "longitude": 52.4517687704
        },
        {
          "latitude": 54.57988579254,
          "longitude": 52.4519709704
        },
        {
          "latitude": 54.58014609257,
          "longitude": 52.4520559704
        },
        {
          "latitude": 54.58037259259,
          "longitude": 52.4521122704
        },
        {
          "latitude": 54.58060389262,
          "longitude": 52.4521623704
        },
        {
          "latitude": 54.58095449266,
          "longitude": 52.4522419704
        },
        {
          "latitude": 54.5812905927,
          "longitude": 52.4523411704
        },
        {
          "latitude": 54.58155819273,
          "longitude": 52.4524408704
        },
        {
          "latitude": 54.58178779275,
          "longitude": 52.4525363704
        }
      ],
      [
        {
          "latitude": 54.58656949329,
          "longitude": 52.4329457704
        },
        {
          "latitude": 54.58520209314,
          "longitude": 52.4346411704
        },
        {
          "latitude": 54.58480299309,
          "longitude": 52.4351537704
        },
        {
          "latitude": 54.58326209292,
          "longitude": 52.4370973704
        },
        {
          "latitude": 54.58320559291,
          "longitude": 52.4371685704
        },
        {
          "latitude": 54.58254779284,
          "longitude": 52.4379971704
        },
        {
          "latitude": 54.58231269281,
          "longitude": 52.4382237704
        },
        {
          "latitude": 54.5821950928,
          "longitude": 52.4383011704
        },
        {
          "latitude": 54.58192629277,
          "longitude": 52.4383188704
        },
        {
          "latitude": 54.58165619274,
          "longitude": 52.4382370704
        },
        {
          "latitude": 54.58147839272,
          "longitude": 52.4382920704
        },
        {
          "latitude": 54.5813292927,
          "longitude": 52.4384827704
        },
        {
          "latitude": 54.58126299269,
          "longitude": 52.4387682704
        },
        {
          "latitude": 54.58118569269,
          "longitude": 52.4392414704
        },
        {
          "latitude": 54.58089919265,
          "longitude": 52.4409949704
        },
        {
          "latitude": 54.5804060926,
          "longitude": 52.4440309704
        },
        {
          "latitude": 54.58030129259,
          "longitude": 52.4443040704
        },
        {
          "latitude": 54.58017969257,
          "longitude": 52.4444167704
        },
        {
          "latitude": 54.58006379256,
          "longitude": 52.4443971704
        },
        {
          "latitude": 54.57819349235,
          "longitude": 52.4437416704
        },
        {
          "latitude": 54.57669799218,
          "longitude": 52.4431868704
        },
        {
          "latitude": 54.57636439214,
          "longitude": 52.4430702704
        },
        {
          "latitude": 54.57527519202,
          "longitude": 52.4426894704
        },
        {
          "latitude": 54.57503359199,
          "longitude": 52.4428457704
        }
      ],
      [
        {
          "latitude": 54.5936994941,
          "longitude": 52.4909381704
        },
        {
          "latitude": 54.59359949409,
          "longitude": 52.4897510704
        },
        {
          "latitude": 54.59355519408,
          "longitude": 52.4889447704
        },
        {
          "latitude": 54.59353719408,
          "longitude": 52.4880420704
        },
        {
          "latitude": 54.59356109408,
          "longitude": 52.4872665704
        },
        {
          "latitude": 54.59357509409,
          "longitude": 52.4870907704
        },
        {
          "latitude": 54.59363139409,
          "longitude": 52.4863808704
        },
        {
          "latitude": 54.5937401941,
          "longitude": 52.4855494704
        },
        {
          "latitude": 54.59380259411,
          "longitude": 52.4851355704
        },
        {
          "latitude": 54.59389769412,
          "longitude": 52.4845533704
        },
        {
          "latitude": 54.59397139413,
          "longitude": 52.4840816704
        },
        {
          "latitude": 54.59433199417,
          "longitude": 52.4817734704
        },
        {
          "latitude": 54.59439509418,
          "longitude": 52.4813604704
        },
        {
          "latitude": 54.59448209419,
          "longitude": 52.4807437704
        },
        {
          "latitude": 54.5945858942,
          "longitude": 52.4801533704
        },
        {
          "latitude": 54.59465749421,
          "longitude": 52.4797511704
        },
        {
          "latitude": 54.59476149422,
          "longitude": 52.4790901704
        },
        {
          "latitude": 54.59486669423,
          "longitude": 52.4784240704
        },
        {
          "latitude": 54.59536779429,
          "longitude": 52.4752508704
        },
        {
          "latitude": 54.59539769429,
          "longitude": 52.4750024704
        },
        {
          "latitude": 54.59552439431,
          "longitude": 52.4741634704
        },
        {
          "latitude": 54.59591339435,
          "longitude": 52.4717341704
        },
        {
          "latitude": 54.59609939437,
          "longitude": 52.4705176704
        },
        {
          "latitude": 54.59623339439,
          "longitude": 52.4696510704
        },
        {
          "latitude": 54.59669509444,
          "longitude": 52.4668378704
        },
        {
          "latitude": 54.59680519445,
          "longitude": 52.4661601704
        },
        {
          "latitude": 54.59689269446,
          "longitude": 52.4655829704
        },
        {
          "latitude": 54.59698359447,
          "longitude": 52.4646081704
        },
        {
          "latitude": 54.59699619447,
          "longitude": 52.4639492704
        },
        {
          "latitude": 54.59698079447,
          "longitude": 52.4631820704
        },
        {
          "latitude": 54.59690469446,
          "longitude": 52.4620146704
        },
        {
          "latitude": 54.59679939445,
          "longitude": 52.4614692704
        },
        {
          "latitude": 54.59678299445,
          "longitude": 52.4613708704
        },
        {
          "latitude": 54.59673699444,
          "longitude": 52.4611602704
        },
        {
          "latitude": 54.59671919444,
          "longitude": 52.4610737704
        },
        {
          "latitude": 54.59668709444,
          "longitude": 52.4609250704
        }
      ],
      [
        {
          "latitude": 54.59609939437,
          "longitude": 52.4705176704
        },
        {
          "latitude": 54.59669039444,
          "longitude": 52.4707741704
        },
        {
          "latitude": 54.59751339453,
          "longitude": 52.4711285704
        },
        {
          "latitude": 54.59776479456,
          "longitude": 52.4712367704
        },
        {
          "latitude": 54.59852159465,
          "longitude": 52.4716291704
        },
        {
          "latitude": 54.59891129469,
          "longitude": 52.4718312704
        },
        {
          "latitude": 54.59961859477,
          "longitude": 52.4721918704
        },
        {
          "latitude": 54.59978639479,
          "longitude": 52.4722669704
        }
      ],
      [
        {
          "latitude": 54.60811579573,
          "longitude": 52.4647253704
        },
        {
          "latitude": 54.60804329572,
          "longitude": 52.4648991704
        },
        {
          "latitude": 54.60795159571,
          "longitude": 52.4651706704
        },
        {
          "latitude": 54.6078722957,
          "longitude": 52.4655815704
        },
        {
          "latitude": 54.60763939568,
          "longitude": 52.4668439704
        },
        {
          "latitude": 54.60754309567,
          "longitude": 52.4673657704
        },
        {
          "latitude": 54.60749859566,
          "longitude": 52.4676156704
        },
        {
          "latitude": 54.60734769564,
          "longitude": 52.4684633704
        },
        {
          "latitude": 54.60725049563,
          "longitude": 52.4690095704
        },
        {
          "latitude": 54.60705379561,
          "longitude": 52.4701845704
        },
        {
          "latitude": 54.60700559561,
          "longitude": 52.4704725704
        },
        {
          "latitude": 54.60687559559,
          "longitude": 52.4714065704
        },
        {
          "latitude": 54.60685799559,
          "longitude": 52.4717458704
        }
      ],
      [
        {
          "latitude": 54.60965939591,
          "longitude": 52.4818076704
        },
        {
          "latitude": 54.60991189593,
          "longitude": 52.4811288704
        },
        {
          "latitude": 54.61012009596,
          "longitude": 52.4807298704
        },
        {
          "latitude": 54.61100519606,
          "longitude": 52.4793165704
        },
        {
          "latitude": 54.61176779614,
          "longitude": 52.4781453704
        },
        {
          "latitude": 54.61221599619,
          "longitude": 52.4773765704
        },
        {
          "latitude": 54.61262699624,
          "longitude": 52.4762017704
        },
        {
          "latitude": 54.61276209626,
          "longitude": 52.4758423704
        },
        {
          "latitude": 54.61309289629,
          "longitude": 52.4749813704
        },
        {
          "latitude": 54.61322339631,
          "longitude": 52.4747292704
        },
        {
          "latitude": 54.61341909633,
          "longitude": 52.4742920704
        },
        {
          "latitude": 54.61392749639,
          "longitude": 52.4732240704
        },
        {
          "latitude": 54.61437009644,
          "longitude": 52.4724264704
        },
        {
          "latitude": 54.61448149645,
          "longitude": 52.4722481704
        },
        {
          "latitude": 54.61479889649,
          "longitude": 52.4716953704
        },
        {
          "latitude": 54.61526899654,
          "longitude": 52.4709073704
        },
        {
          "latitude": 54.61556139657,
          "longitude": 52.4703824704
        },
        {
          "latitude": 54.6157636966,
          "longitude": 52.4699185704
        },
        {
          "latitude": 54.61589739661,
          "longitude": 52.4694693704
        },
        {
          "latitude": 54.61595399662,
          "longitude": 52.4689150704
        },
        {
          "latitude": 54.61600349662,
          "longitude": 52.4684420704
        }
      ],
      [
        {
          "latitude": 54.59978639479,
          "longitude": 52.4722669704
        },
        {
          "latitude": 54.5999277948,
          "longitude": 52.4720711704
        },
        {
          "latitude": 54.60025789484,
          "longitude": 52.4715575704
        },
        {
          "latitude": 54.60056709488,
          "longitude": 52.4710908704
        },
        {
          "latitude": 54.60069919489,
          "longitude": 52.4708735704
        },
        {
          "latitude": 54.6007550949,
          "longitude": 52.4707957704
        },
        {
          "latitude": 54.60136189497,
          "longitude": 52.4698878704
        },
        {
          "latitude": 54.60237019508,
          "longitude": 52.4683419704
        }
      ],
      [
        {
          "latitude": 54.59978639479,
          "longitude": 52.4722669704
        },
        {
          "latitude": 54.5998476948,
          "longitude": 52.4724922704
        },
        {
          "latitude": 54.59999449481,
          "longitude": 52.4729010704
        },
        {
          "latitude": 54.60036719485,
          "longitude": 52.4737561704
        },
        {
          "latitude": 54.60055329488,
          "longitude": 52.4741831704
        },
        {
          "latitude": 54.60124989495,
          "longitude": 52.4755603704
        },
        {
          "latitude": 54.60171659501,
          "longitude": 52.4764205704
        },
        {
          "latitude": 54.60216359506,
          "longitude": 52.4772505704
        },
        {
          "latitude": 54.60226229507,
          "longitude": 52.4774315704
        },
        {
          "latitude": 54.60294849515,
          "longitude": 52.4787027704
        },
        {
          "latitude": 54.6043403953,
          "longitude": 52.4812118704
        },
        {
          "latitude": 54.60451689532,
          "longitude": 52.4815132704
        },
        {
          "latitude": 54.60496669537,
          "longitude": 52.4822240704
        },
        {
          "latitude": 54.60559589545,
          "longitude": 52.4831211704
        },
        {
          "latitude": 54.60572939546,
          "longitude": 52.4833114704
        },
        {
          "latitude": 54.60622409552,
          "longitude": 52.4840621704
        },
        {
          "latitude": 54.60642949554,
          "longitude": 52.4843279704
        },
        {
          "latitude": 54.6069862956,
          "longitude": 52.4850125704
        },
        {
          "latitude": 54.60816789574,
          "longitude": 52.4859505704
        }
      ],
      [
        {
          "latitude": 54.60349799521,
          "longitude": 52.4931203704
        },
        {
          "latitude": 54.60320279518,
          "longitude": 52.4935466704
        },
        {
          "latitude": 54.60196639504,
          "longitude": 52.4953921704
        },
        {
          "latitude": 54.60182379502,
          "longitude": 52.4955893704
        },
        {
          "latitude": 54.60138979497,
          "longitude": 52.4961808704
        },
        {
          "latitude": 54.60043029486,
          "longitude": 52.4973339704
        },
        {
          "latitude": 54.59965889477,
          "longitude": 52.4983830704
        },
        {
          "latitude": 54.59932069474,
          "longitude": 52.4988211704
        },
        {
          "latitude": 54.59882519468,
          "longitude": 52.4995188704
        },
        {
          "latitude": 54.59775399456,
          "longitude": 52.5010386704
        },
        {
          "latitude": 54.5971979945,
          "longitude": 52.5019045704
        },
        {
          "latitude": 54.59677819445,
          "longitude": 52.5025583704
        },
        {
          "latitude": 54.59572249433,
          "longitude": 52.5038595704
        }
      ],
      [
        {
          "latitude": 54.60548799543,
          "longitude": 52.4930153704
        },
        {
          "latitude": 54.60566499545,
          "longitude": 52.4927966704
        },
        {
          "latitude": 54.60601739549,
          "longitude": 52.4920883704
        },
        {
          "latitude": 54.6060725955,
          "longitude": 52.4919481704
        },
        {
          "latitude": 54.60656139555,
          "longitude": 52.4905980704
        },
        {
          "latitude": 54.6069881956,
          "longitude": 52.4893942704
        },
        {
          "latitude": 54.60742509565,
          "longitude": 52.4881433704
        },
        {
          "latitude": 54.60816789574,
          "longitude": 52.4859505704
        }
      ],
      [
        {
          "latitude": 54.60349799521,
          "longitude": 52.4931203704
        },
        {
          "latitude": 54.60372499523,
          "longitude": 52.4930451704
        },
        {
          "latitude": 54.60425429529,
          "longitude": 52.4929739704
        },
        {
          "latitude": 54.60475849535,
          "longitude": 52.4929561704
        },
        {
          "latitude": 54.60508219539,
          "longitude": 52.4929941704
        },
        {
          "latitude": 54.60548799543,
          "longitude": 52.4930153704
        }
      ],
      [
        {
          "latitude": 54.60685799559,
          "longitude": 52.4717458704
        },
        {
          "latitude": 54.60687309559,
          "longitude": 52.4721303704
        },
        {
          "latitude": 54.6069807956,
          "longitude": 52.4726697704
        },
        {
          "latitude": 54.60708729561,
          "longitude": 52.4731857704
        },
        {
          "latitude": 54.60722779563,
          "longitude": 52.4738663704
        },
        {
          "latitude": 54.60760229567,
          "longitude": 52.4756558704
        },
        {
          "latitude": 54.60770279568,
          "longitude": 52.4760635704
        },
        {
          "latitude": 54.60776379569,
          "longitude": 52.4762316704
        },
        {
          "latitude": 54.6078624957,
          "longitude": 52.4765036704
        },
        {
          "latitude": 54.60796149571,
          "longitude": 52.4767474704
        },
        {
          "latitude": 54.60815629574,
          "longitude": 52.4772267704
        },
        {
          "latitude": 54.60834699576,
          "longitude": 52.4776831704
        },
        {
          "latitude": 54.60858049578,
          "longitude": 52.4781378704
        },
        {
          "latitude": 54.60920219585,
          "longitude": 52.4792704704
        },
        {
          "latitude": 54.60938829587,
          "longitude": 52.4795840704
        },
        {
          "latitude": 54.60990749593,
          "longitude": 52.4804135704
        },
        {
          "latitude": 54.61012009596,
          "longitude": 52.4807298704
        }
      ],
      [
        {
          "latitude": 54.60816789574,
          "longitude": 52.4859505704
        },
        {
          "latitude": 54.60895719583,
          "longitude": 52.4837363704
        }
      ],
      [
        {
          "latitude": 54.60895719583,
          "longitude": 52.4837363704
        },
        {
          "latitude": 54.60965939591,
          "longitude": 52.4818076704
        }
      ],
      [
        {
          "latitude": 54.59389769412,
          "longitude": 52.4845533704
        },
        {
          "latitude": 54.59424549416,
          "longitude": 52.4846742704
        },
        {
          "latitude": 54.59654709442,
          "longitude": 52.4850740704
        },
        {
          "latitude": 54.59676389445,
          "longitude": 52.4851506704
        },
        {
          "latitude": 54.59691529446,
          "longitude": 52.4852819704
        },
        {
          "latitude": 54.59700379447,
          "longitude": 52.4853587704
        },
        {
          "latitude": 54.59729049451,
          "longitude": 52.4860377704
        },
        {
          "latitude": 54.59890799469,
          "longitude": 52.4897814704
        },
        {
          "latitude": 54.59894789469,
          "longitude": 52.4898806704
        },
        {
          "latitude": 54.59936979474,
          "longitude": 52.4908803704
        },
        {
          "latitude": 54.59951899476,
          "longitude": 52.4913038704
        },
        {
          "latitude": 54.59973989478,
          "longitude": 52.4920256704
        },
        {
          "latitude": 54.59983559479,
          "longitude": 52.4925329704
        },
        {
          "latitude": 54.60003999482,
          "longitude": 52.4931976704
        },
        {
          "latitude": 54.60027839484,
          "longitude": 52.4937679704
        },
        {
          "latitude": 54.60071739489,
          "longitude": 52.4944441704
        },
        {
          "latitude": 54.60142749497,
          "longitude": 52.4955260704
        },
        {
          "latitude": 54.601619895,
          "longitude": 52.4956454704
        },
        {
          "latitude": 54.60182379502,
          "longitude": 52.4955893704
        }
      ],
      [
        {
          "latitude": 54.60124989495,
          "longitude": 52.4755603704
        },
        {
          "latitude": 54.60095489492,
          "longitude": 52.4762948704
        },
        {
          "latitude": 54.60069569489,
          "longitude": 52.4769987704
        },
        {
          "latitude": 54.60029429485,
          "longitude": 52.4780072704
        },
        {
          "latitude": 54.5999272948,
          "longitude": 52.4790029704
        },
        {
          "latitude": 54.59954059476,
          "longitude": 52.4799507704
        },
        {
          "latitude": 54.59932289474,
          "longitude": 52.4806047704
        },
        {
          "latitude": 54.5990214947,
          "longitude": 52.4815278704
        },
        {
          "latitude": 54.59862619466,
          "longitude": 52.4826878704
        },
        {
          "latitude": 54.59842229463,
          "longitude": 52.4832849704
        },
        {
          "latitude": 54.5980952946,
          "longitude": 52.4842342704
        },
        {
          "latitude": 54.59775949456,
          "longitude": 52.4851385704
        },
        {
          "latitude": 54.59729049451,
          "longitude": 52.4860377704
        }
      ],
      [
        {
          "latitude": 54.60175099501,
          "longitude": 52.4531482704
        },
        {
          "latitude": 54.60284499513,
          "longitude": 52.4549627704
        },
        {
          "latitude": 54.60289929514,
          "longitude": 52.4550581704
        }
      ],
      [
        {
          "latitude": 54.60351299521,
          "longitude": 52.4489404704
        },
        {
          "latitude": 54.60326299518,
          "longitude": 52.4485478704
        },
        {
          "latitude": 54.60217399506,
          "longitude": 52.4468064704
        },
        {
          "latitude": 54.60085189491,
          "longitude": 52.4446845704
        },
        {
          "latitude": 54.6007763949,
          "longitude": 52.4445556704
        },
        {
          "latitude": 54.60066859489,
          "longitude": 52.4443906704
        },
        {
          "latitude": 54.59981169479,
          "longitude": 52.4430105704
        },
        {
          "latitude": 54.59946269475,
          "longitude": 52.4424499704
        },
        {
          "latitude": 54.59934229474,
          "longitude": 52.4422418704
        },
        {
          "latitude": 54.59930159473,
          "longitude": 52.4420674704
        }
      ],
      [
        {
          "latitude": 54.60289929514,
          "longitude": 52.4550581704
        },
        {
          "latitude": 54.60262139511,
          "longitude": 52.4555890704
        },
        {
          "latitude": 54.60211719505,
          "longitude": 52.4565230704
        },
        {
          "latitude": 54.60131499496,
          "longitude": 52.4579996704
        },
        {
          "latitude": 54.60121089495,
          "longitude": 52.4581952704
        },
        {
          "latitude": 54.60048939487,
          "longitude": 52.4594964704
        },
        {
          "latitude": 54.60045769486,
          "longitude": 52.4595501704
        },
        {
          "latitude": 54.59980049479,
          "longitude": 52.4606634704
        },
        {
          "latitude": 54.59970399478,
          "longitude": 52.4608399704
        }
      ],
      [
        {
          "latitude": 54.60016559483,
          "longitude": 52.4382347704
        },
        {
          "latitude": 54.60046099486,
          "longitude": 52.4376969704
        },
        {
          "latitude": 54.60070779489,
          "longitude": 52.4372476704
        },
        {
          "latitude": 54.60094049492,
          "longitude": 52.4368300704
        },
        {
          "latitude": 54.60174719501,
          "longitude": 52.4353920704
        },
        {
          "latitude": 54.60245009509,
          "longitude": 52.4341941704
        },
        {
          "latitude": 54.60271289512,
          "longitude": 52.4336668704
        },
        {
          "latitude": 54.6034460952,
          "longitude": 52.4323631704
        },
        {
          "latitude": 54.60369469523,
          "longitude": 52.4320096704
        },
        {
          "latitude": 54.60396789526,
          "longitude": 52.4316695704
        },
        {
          "latitude": 54.6043002953,
          "longitude": 52.4312411704
        },
        {
          "latitude": 54.60442899531,
          "longitude": 52.4311733704
        },
        {
          "latitude": 54.60454139533,
          "longitude": 52.4311475704
        }
      ],
      [
        {
          "latitude": 54.59970399478,
          "longitude": 52.4608399704
        },
        {
          "latitude": 54.59994579481,
          "longitude": 52.4611749704
        },
        {
          "latitude": 54.60000829481,
          "longitude": 52.4610614704
        },
        {
          "latitude": 54.60028169484,
          "longitude": 52.4605627704
        },
        {
          "latitude": 54.60062159488,
          "longitude": 52.4599486704
        },
        {
          "latitude": 54.60113949494,
          "longitude": 52.4590369704
        },
        {
          "latitude": 54.60144419498,
          "longitude": 52.4585594704
        },
        {
          "latitude": 54.60153749499,
          "longitude": 52.4583777704
        },
        {
          "latitude": 54.6025498951,
          "longitude": 52.4565375704
        },
        {
          "latitude": 54.6025647951,
          "longitude": 52.4565142704
        },
        {
          "latitude": 54.60314229517,
          "longitude": 52.4554417704
        }
      ],
      [
        {
          "latitude": 54.60371989523,
          "longitude": 52.4440002704
        },
        {
          "latitude": 54.60348469521,
          "longitude": 52.4444305704
        },
        {
          "latitude": 54.60293779515,
          "longitude": 52.4454219704
        },
        {
          "latitude": 54.60260789511,
          "longitude": 52.4460198704
        },
        {
          "latitude": 54.60240949509,
          "longitude": 52.4463794704
        },
        {
          "latitude": 54.60217399506,
          "longitude": 52.4468064704
        },
        {
          "latitude": 54.60190519503,
          "longitude": 52.4472942704
        },
        {
          "latitude": 54.601654895,
          "longitude": 52.4477473704
        },
        {
          "latitude": 54.60143779498,
          "longitude": 52.4481408704
        },
        {
          "latitude": 54.60089999491,
          "longitude": 52.4491158704
        },
        {
          "latitude": 54.60033949485,
          "longitude": 52.4501317704
        },
        {
          "latitude": 54.60022689484,
          "longitude": 52.4503358704
        },
        {
          "latitude": 54.60011429483,
          "longitude": 52.4505399704
        }
      ],
      [
        {
          "latitude": 54.59711329449,
          "longitude": 52.4512482704
        },
        {
          "latitude": 54.59712529449,
          "longitude": 52.4514981704
        },
        {
          "latitude": 54.59716709449,
          "longitude": 52.4516271704
        },
        {
          "latitude": 54.5972661945,
          "longitude": 52.4517967704
        },
        {
          "latitude": 54.59750539453,
          "longitude": 52.4521829704
        },
        {
          "latitude": 54.59816379461,
          "longitude": 52.4533301704
        },
        {
          "latitude": 54.59839909463,
          "longitude": 52.4537126704
        },
        {
          "latitude": 54.59957219476,
          "longitude": 52.4555488704
        },
        {
          "latitude": 54.59967269478,
          "longitude": 52.4556838704
        },
        {
          "latitude": 54.59970819478,
          "longitude": 52.4557314704
        },
        {
          "latitude": 54.59979779479,
          "longitude": 52.4558836704
        },
        {
          "latitude": 54.59982889479,
          "longitude": 52.4559264704
        },
        {
          "latitude": 54.5999227948,
          "longitude": 52.4560695704
        },
        {
          "latitude": 54.60008639482,
          "longitude": 52.4563482704
        },
        {
          "latitude": 54.60085079491,
          "longitude": 52.4575957704
        },
        {
          "latitude": 54.60099229493,
          "longitude": 52.4578374704
        },
        {
          "latitude": 54.60106879493,
          "longitude": 52.4579626704
        },
        {
          "latitude": 54.60112669494,
          "longitude": 52.4580574704
        },
        {
          "latitude": 54.60121089495,
          "longitude": 52.4581952704
        },
        {
          "latitude": 54.60144419498,
          "longitude": 52.4585594704
        },
        {
          "latitude": 54.60148559498,
          "longitude": 52.4586267704
        },
        {
          "latitude": 54.60199399504,
          "longitude": 52.4594531704
        },
        {
          "latitude": 54.60276179513,
          "longitude": 52.4607009704
        },
        {
          "latitude": 54.60354259521,
          "longitude": 52.4619700704
        },
        {
          "latitude": 54.60357459522,
          "longitude": 52.4620220704
        },
        {
          "latitude": 54.60387639525,
          "longitude": 52.4624966704
        },
        {
          "latitude": 54.60411209528,
          "longitude": 52.4626869704
        },
        {
          "latitude": 54.60455919533,
          "longitude": 52.4629565704
        },
        {
          "latitude": 54.60467629534,
          "longitude": 52.4630290704
        },
        {
          "latitude": 54.6052219954,
          "longitude": 52.4633029704
        },
        {
          "latitude": 54.60537929542,
          "longitude": 52.4633822704
        }
      ],
      [
        {
          "latitude": 54.60542149543,
          "longitude": 52.4629965704
        },
        {
          "latitude": 54.60534599542,
          "longitude": 52.4630200704
        },
        {
          "latitude": 54.60524949541,
          "longitude": 52.4630078704
        },
        {
          "latitude": 54.60470319534,
          "longitude": 52.4627203704
        },
        {
          "latitude": 54.60418429529,
          "longitude": 52.4624478704
        },
        {
          "latitude": 54.60392539526,
          "longitude": 52.4622799704
        },
        {
          "latitude": 54.60380329524,
          "longitude": 52.4621218704
        },
        {
          "latitude": 54.60264299511,
          "longitude": 52.4602067704
        },
        {
          "latitude": 54.601661895,
          "longitude": 52.4585835704
        },
        {
          "latitude": 54.60158089499,
          "longitude": 52.4584495704
        },
        {
          "latitude": 54.60153749499,
          "longitude": 52.4583777704
        },
        {
          "latitude": 54.60140559497,
          "longitude": 52.4581634704
        },
        {
          "latitude": 54.60131499496,
          "longitude": 52.4579996704
        },
        {
          "latitude": 54.60122789495,
          "longitude": 52.4578595704
        },
        {
          "latitude": 54.60016439483,
          "longitude": 52.4561482704
        },
        {
          "latitude": 54.5999205948,
          "longitude": 52.4557434704
        },
        {
          "latitude": 54.5998443948,
          "longitude": 52.4556169704
        },
        {
          "latitude": 54.59976289479,
          "longitude": 52.4554909704
        },
        {
          "latitude": 54.59968779478,
          "longitude": 52.4553749704
        },
        {
          "latitude": 54.59910239471,
          "longitude": 52.4544145704
        },
        {
          "latitude": 54.59892749469,
          "longitude": 52.4541230704
        },
        {
          "latitude": 54.59819879461,
          "longitude": 52.4529513704
        },
        {
          "latitude": 54.59799189459,
          "longitude": 52.4526222704
        }
      ],
      [
        {
          "latitude": 54.60144769498,
          "longitude": 52.4526472704
        },
        {
          "latitude": 54.60154899499,
          "longitude": 52.4524769704
        },
        {
          "latitude": 54.60208569505,
          "longitude": 52.4515752704
        },
        {
          "latitude": 54.60233899508,
          "longitude": 52.4511139704
        },
        {
          "latitude": 54.6025369951,
          "longitude": 52.4507533704
        },
        {
          "latitude": 54.60262859511,
          "longitude": 52.4505864704
        },
        {
          "latitude": 54.60287089514,
          "longitude": 52.4501450704
        },
        {
          "latitude": 54.60290319514,
          "longitude": 52.4500862704
        },
        {
          "latitude": 54.60295919515,
          "longitude": 52.4499834704
        },
        {
          "latitude": 54.60301049515,
          "longitude": 52.4498894704
        },
        {
          "latitude": 54.60325179518,
          "longitude": 52.4494466704
        },
        {
          "latitude": 54.60351299521,
          "longitude": 52.4489404704
        },
        {
          "latitude": 54.60419409529,
          "longitude": 52.4477122704
        },
        {
          "latitude": 54.6043028953,
          "longitude": 52.4475176704
        },
        {
          "latitude": 54.60496209537,
          "longitude": 52.4462978704
        },
        {
          "latitude": 54.60504009538,
          "longitude": 52.4461502704
        }
      ],
      [
        {
          "latitude": 54.59880959468,
          "longitude": 52.4431161704
        },
        {
          "latitude": 54.59895119469,
          "longitude": 52.4433057704
        },
        {
          "latitude": 54.60001469481,
          "longitude": 52.4450480704
        },
        {
          "latitude": 54.60007899482,
          "longitude": 52.4451480704
        },
        {
          "latitude": 54.60023919484,
          "longitude": 52.4454134704
        },
        {
          "latitude": 54.60038339486,
          "longitude": 52.4456505704
        },
        {
          "latitude": 54.60048299487,
          "longitude": 52.4458217704
        },
        {
          "latitude": 54.601654895,
          "longitude": 52.4477473704
        },
        {
          "latitude": 54.60201049504,
          "longitude": 52.4483815704
        },
        {
          "latitude": 54.60272739512,
          "longitude": 52.4495534704
        },
        {
          "latitude": 54.60291399514,
          "longitude": 52.4498466704
        },
        {
          "latitude": 54.60290319514,
          "longitude": 52.4500862704
        },
        {
          "latitude": 54.60322119518,
          "longitude": 52.4505821704
        },
        {
          "latitude": 54.60390079525,
          "longitude": 52.4516413704
        }
      ],
      [
        {
          "latitude": 54.60016559483,
          "longitude": 52.4382347704
        },
        {
          "latitude": 54.60025379484,
          "longitude": 52.4383777704
        },
        {
          "latitude": 54.60044039486,
          "longitude": 52.4386804704
        },
        {
          "latitude": 54.6007869949,
          "longitude": 52.4392426704
        },
        {
          "latitude": 54.60117659495,
          "longitude": 52.4398746704
        },
        {
          "latitude": 54.60203459504,
          "longitude": 52.4412597704
        },
        {
          "latitude": 54.60209139505,
          "longitude": 52.4413585704
        },
        {
          "latitude": 54.60220069506,
          "longitude": 52.4415357704
        },
        {
          "latitude": 54.60230039507,
          "longitude": 52.4416974704
        },
        {
          "latitude": 54.60243359509,
          "longitude": 52.4419135704
        },
        {
          "latitude": 54.6025314951,
          "longitude": 52.4420724704
        },
        {
          "latitude": 54.60322029518,
          "longitude": 52.4431897704
        },
        {
          "latitude": 54.60336299519,
          "longitude": 52.4434212704
        },
        {
          "latitude": 54.60371989523,
          "longitude": 52.4440002704
        },
        {
          "latitude": 54.60406899527,
          "longitude": 52.4445665704
        },
        {
          "latitude": 54.60495609537,
          "longitude": 52.4460134704
        },
        {
          "latitude": 54.60504009538,
          "longitude": 52.4461502704
        }
      ],
      [
        {
          "latitude": 54.61600349662,
          "longitude": 52.4684420704
        },
        {
          "latitude": 54.61616569664,
          "longitude": 52.4681769704
        },
        {
          "latitude": 54.61635859666,
          "longitude": 52.4680339704
        },
        {
          "latitude": 54.61656329669,
          "longitude": 52.4679897704
        },
        {
          "latitude": 54.6167064967,
          "longitude": 52.4679455704
        }
      ],
      [
        {
          "latitude": 54.60365439523,
          "longitude": 52.4562846704
        },
        {
          "latitude": 54.60425529529,
          "longitude": 52.4572637704
        },
        {
          "latitude": 54.6051713954,
          "longitude": 52.4586655704
        },
        {
          "latitude": 54.60531819541,
          "longitude": 52.4590290704
        },
        {
          "latitude": 54.60533689542,
          "longitude": 52.4591337704
        },
        {
          "latitude": 54.60539179542,
          "longitude": 52.4594291704
        },
        {
          "latitude": 54.60542049543,
          "longitude": 52.4597307704
        },
        {
          "latitude": 54.60561999545,
          "longitude": 52.4618245704
        },
        {
          "latitude": 54.60568469546,
          "longitude": 52.4625031704
        }
      ],
      [
        {
          "latitude": 54.60632079553,
          "longitude": 52.4534169704
        },
        {
          "latitude": 54.60638099553,
          "longitude": 52.4535108704
        },
        {
          "latitude": 54.60716419562,
          "longitude": 52.4547182704
        },
        {
          "latitude": 54.60724849563,
          "longitude": 52.4549063704
        },
        {
          "latitude": 54.60730139564,
          "longitude": 52.4551500704
        },
        {
          "latitude": 54.60731189564,
          "longitude": 52.4554133704
        },
        {
          "latitude": 54.60732349564,
          "longitude": 52.4559149704
        },
        {
          "latitude": 54.60731389564,
          "longitude": 52.4562255704
        },
        {
          "latitude": 54.60730259564,
          "longitude": 52.4564649704
        },
        {
          "latitude": 54.60729239564,
          "longitude": 52.4566242704
        },
        {
          "latitude": 54.60727909564,
          "longitude": 52.4568109704
        },
        {
          "latitude": 54.60724109563,
          "longitude": 52.4571527704
        },
        {
          "latitude": 54.60725459563,
          "longitude": 52.4579954704
        },
        {
          "latitude": 54.60726709563,
          "longitude": 52.4582720704
        },
        {
          "latitude": 54.60731979564,
          "longitude": 52.4590014704
        },
        {
          "latitude": 54.60737999565,
          "longitude": 52.4595300704
        },
        {
          "latitude": 54.60746179566,
          "longitude": 52.4602211704
        },
        {
          "latitude": 54.60761959567,
          "longitude": 52.4613493704
        },
        {
          "latitude": 54.60767819568,
          "longitude": 52.4617908704
        },
        {
          "latitude": 54.6078190957,
          "longitude": 52.4627778704
        },
        {
          "latitude": 54.60793609571,
          "longitude": 52.4635641704
        },
        {
          "latitude": 54.60803769572,
          "longitude": 52.4640324704
        },
        {
          "latitude": 54.60807019573,
          "longitude": 52.4641824704
        },
        {
          "latitude": 54.60813959573,
          "longitude": 52.4643537704
        }
      ],
      [
        {
          "latitude": 54.60264299511,
          "longitude": 52.4602067704
        },
        {
          "latitude": 54.60357189522,
          "longitude": 52.4585112704
        },
        {
          "latitude": 54.60385269525,
          "longitude": 52.4579987704
        },
        {
          "latitude": 54.60403489527,
          "longitude": 52.4576661704
        },
        {
          "latitude": 54.60410159528,
          "longitude": 52.4575442704
        },
        {
          "latitude": 54.60425529529,
          "longitude": 52.4572637704
        },
        {
          "latitude": 54.60436709531,
          "longitude": 52.4570599704
        },
        {
          "latitude": 54.60487749536,
          "longitude": 52.4561299704
        },
        {
          "latitude": 54.60547679543,
          "longitude": 52.4550045704
        },
        {
          "latitude": 54.60565329545,
          "longitude": 52.4546731704
        },
        {
          "latitude": 54.60569709546,
          "longitude": 52.4545909704
        }
      ],
      [
        {
          "latitude": 54.60596099549,
          "longitude": 52.4634592704
        },
        {
          "latitude": 54.60643129554,
          "longitude": 52.4636740704
        },
        {
          "latitude": 54.60796139571,
          "longitude": 52.4643729704
        },
        {
          "latitude": 54.60807599573,
          "longitude": 52.4644451704
        }
      ],
      [
        {
          "latitude": 54.60828709575,
          "longitude": 52.4646449704
        },
        {
          "latitude": 54.60830039575,
          "longitude": 52.4645600704
        },
        {
          "latitude": 54.60829639575,
          "longitude": 52.4644958704
        },
        {
          "latitude": 54.60827799575,
          "longitude": 52.4644285704
        }
      ],
      [
        {
          "latitude": 54.60813959573,
          "longitude": 52.4643537704
        },
        {
          "latitude": 54.60810529573,
          "longitude": 52.4643865704
        },
        {
          "latitude": 54.60807599573,
          "longitude": 52.4644451704
        }
      ],
      [
        {
          "latitude": 54.60807599573,
          "longitude": 52.4644451704
        },
        {
          "latitude": 54.60805979572,
          "longitude": 52.4645590704
        },
        {
          "latitude": 54.60807909573,
          "longitude": 52.4646628704
        },
        {
          "latitude": 54.60811579573,
          "longitude": 52.4647253704
        }
      ],
      [
        {
          "latitude": 54.60811579573,
          "longitude": 52.4647253704
        },
        {
          "latitude": 54.60815709574,
          "longitude": 52.4647536704
        },
        {
          "latitude": 54.60821199574,
          "longitude": 52.4647500704
        }
      ],
      [
        {
          "latitude": 54.60827799575,
          "longitude": 52.4644285704
        },
        {
          "latitude": 54.60825209575,
          "longitude": 52.4643828704
        },
        {
          "latitude": 54.60822069574,
          "longitude": 52.4643537704
        },
        {
          "latitude": 54.60817169574,
          "longitude": 52.4643421704
        },
        {
          "latitude": 54.60813959573,
          "longitude": 52.4643537704
        }
      ],
      [
        {
          "latitude": 54.60821199574,
          "longitude": 52.4647500704
        },
        {
          "latitude": 54.60825619575,
          "longitude": 52.4647105704
        },
        {
          "latitude": 54.60828709575,
          "longitude": 52.4646449704
        }
      ],
      [
        {
          "latitude": 54.60237019508,
          "longitude": 52.4683419704
        },
        {
          "latitude": 54.60299919515,
          "longitude": 52.4673934704
        },
        {
          "latitude": 54.60323949518,
          "longitude": 52.4670311704
        },
        {
          "latitude": 54.6042710953,
          "longitude": 52.4654755704
        },
        {
          "latitude": 54.60492499537,
          "longitude": 52.4645788704
        },
        {
          "latitude": 54.60524829541,
          "longitude": 52.4640905704
        }
      ],
      [
        {
          "latitude": 54.60596099549,
          "longitude": 52.4634592704
        },
        {
          "latitude": 54.60585879548,
          "longitude": 52.4633607704
        },
        {
          "latitude": 54.60576319546,
          "longitude": 52.4631916704
        }
      ],
      [
        {
          "latitude": 54.60569629546,
          "longitude": 52.4635051704
        },
        {
          "latitude": 54.60582529547,
          "longitude": 52.4634607704
        },
        {
          "latitude": 54.60596099549,
          "longitude": 52.4634592704
        }
      ],
      [
        {
          "latitude": 54.60568469546,
          "longitude": 52.4625031704
        },
        {
          "latitude": 54.60562449545,
          "longitude": 52.4626827704
        },
        {
          "latitude": 54.60556979544,
          "longitude": 52.4628036704
        },
        {
          "latitude": 54.60547689543,
          "longitude": 52.4629289704
        }
      ],
      [
        {
          "latitude": 54.60572449546,
          "longitude": 52.4630326704
        },
        {
          "latitude": 54.60568469546,
          "longitude": 52.4625031704
        }
      ],
      [
        {
          "latitude": 54.60524829541,
          "longitude": 52.4640905704
        },
        {
          "latitude": 54.60546629543,
          "longitude": 52.4637247704
        },
        {
          "latitude": 54.60555559544,
          "longitude": 52.4635904704
        }
      ],
      [
        {
          "latitude": 54.60542829543,
          "longitude": 52.4635002704
        },
        {
          "latitude": 54.60540729542,
          "longitude": 52.4636330704
        },
        {
          "latitude": 54.60537369542,
          "longitude": 52.4637765704
        },
        {
          "latitude": 54.60524829541,
          "longitude": 52.4640905704
        }
      ],
      [
        {
          "latitude": 54.60576319546,
          "longitude": 52.4631916704
        },
        {
          "latitude": 54.60572449546,
          "longitude": 52.4630326704
        },
        {
          "latitude": 54.60566559545,
          "longitude": 52.4629424704
        },
        {
          "latitude": 54.60560129545,
          "longitude": 52.4629009704
        },
        {
          "latitude": 54.60553259544,
          "longitude": 52.4628990704
        },
        {
          "latitude": 54.60547689543,
          "longitude": 52.4629289704
        },
        {
          "latitude": 54.60542149543,
          "longitude": 52.4629965704
        },
        {
          "latitude": 54.60538029542,
          "longitude": 52.4630994704
        },
        {
          "latitude": 54.60536239542,
          "longitude": 52.4632470704
        },
        {
          "latitude": 54.60537929542,
          "longitude": 52.4633822704
        },
        {
          "latitude": 54.60542829543,
          "longitude": 52.4635002704
        },
        {
          "latitude": 54.60548189543,
          "longitude": 52.4635606704
        },
        {
          "latitude": 54.60555559544,
          "longitude": 52.4635904704
        },
        {
          "latitude": 54.60562079545,
          "longitude": 52.4635765704
        },
        {
          "latitude": 54.60569629546,
          "longitude": 52.4635051704
        },
        {
          "latitude": 54.60574239546,
          "longitude": 52.4634042704
        },
        {
          "latitude": 54.60576299546,
          "longitude": 52.4632966704
        },
        {
          "latitude": 54.60576319546,
          "longitude": 52.4631916704
        }
      ],
      [
        {
          "latitude": 54.60460009533,
          "longitude": 52.4527632704
        },
        {
          "latitude": 54.60542399543,
          "longitude": 52.4541359704
        },
        {
          "latitude": 54.60569709546,
          "longitude": 52.4545909704
        }
      ],
      [
        {
          "latitude": 54.60410779528,
          "longitude": 52.4528032704
        },
        {
          "latitude": 54.6034060952,
          "longitude": 52.4541315704
        },
        {
          "latitude": 54.60305269516,
          "longitude": 52.4547382704
        }
      ],
      [
        {
          "latitude": 54.60569709546,
          "longitude": 52.4545909704
        },
        {
          "latitude": 54.60602029549,
          "longitude": 52.4539826704
        },
        {
          "latitude": 54.60632079553,
          "longitude": 52.4534169704
        }
      ],
      [
        {
          "latitude": 54.60632079553,
          "longitude": 52.4534169704
        },
        {
          "latitude": 54.60497709538,
          "longitude": 52.4512873704
        },
        {
          "latitude": 54.60466269534,
          "longitude": 52.4507806704
        },
        {
          "latitude": 54.60351299521,
          "longitude": 52.4489404704
        }
      ],
      [
        {
          "latitude": 54.60314229517,
          "longitude": 52.4554417704
        },
        {
          "latitude": 54.60324619518,
          "longitude": 52.4552366704
        },
        {
          "latitude": 54.60354449521,
          "longitude": 52.4546775704
        },
        {
          "latitude": 54.60456199533,
          "longitude": 52.4528342704
        },
        {
          "latitude": 54.60460009533,
          "longitude": 52.4527632704
        }
      ],
      [
        {
          "latitude": 54.60289929514,
          "longitude": 52.4550581704
        },
        {
          "latitude": 54.60301479515,
          "longitude": 52.4552465704
        },
        {
          "latitude": 54.60314229517,
          "longitude": 52.4554417704
        },
        {
          "latitude": 54.60322999518,
          "longitude": 52.4555929704
        },
        {
          "latitude": 54.60335549519,
          "longitude": 52.4557930704
        },
        {
          "latitude": 54.60365439523,
          "longitude": 52.4562846704
        }
      ],
      [
        {
          "latitude": 54.60305269516,
          "longitude": 52.4547382704
        },
        {
          "latitude": 54.60289929514,
          "longitude": 52.4550581704
        }
      ],
      [
        {
          "latitude": 54.60390079525,
          "longitude": 52.4516413704
        },
        {
          "latitude": 54.6043506953,
          "longitude": 52.4523433704
        }
      ],
      [
        {
          "latitude": 54.6043506953,
          "longitude": 52.4523433704
        },
        {
          "latitude": 54.60448299532,
          "longitude": 52.4525547704
        },
        {
          "latitude": 54.60460009533,
          "longitude": 52.4527632704
        }
      ],
      [
        {
          "latitude": 54.6043506953,
          "longitude": 52.4523433704
        },
        {
          "latitude": 54.6043087953,
          "longitude": 52.4524226704
        },
        {
          "latitude": 54.60410779528,
          "longitude": 52.4528032704
        }
      ],
      [
        {
          "latitude": 54.60504009538,
          "longitude": 52.4461502704
        },
        {
          "latitude": 54.6051480954,
          "longitude": 52.4459536704
        },
        {
          "latitude": 54.60529289541,
          "longitude": 52.4456903704
        },
        {
          "latitude": 54.60534149542,
          "longitude": 52.4456012704
        },
        {
          "latitude": 54.60539119542,
          "longitude": 52.4455099704
        },
        {
          "latitude": 54.60590449548,
          "longitude": 52.4445693704
        },
        {
          "latitude": 54.60661699556,
          "longitude": 52.4433149704
        }
      ],
      [
        {
          "latitude": 54.59030639372,
          "longitude": 52.4403175704
        },
        {
          "latitude": 54.59056019375,
          "longitude": 52.4399838704
        },
        {
          "latitude": 54.59076149377,
          "longitude": 52.4397208704
        },
        {
          "latitude": 54.59099159379,
          "longitude": 52.4394382704
        },
        {
          "latitude": 54.59127589383,
          "longitude": 52.4390533704
        },
        {
          "latitude": 54.59149239385,
          "longitude": 52.4388024704
        },
        {
          "latitude": 54.59164759387,
          "longitude": 52.4387155704
        }
      ],
      [
        {
          "latitude": 54.59579989434,
          "longitude": 52.4575688704
        },
        {
          "latitude": 54.59555149431,
          "longitude": 52.4578386704
        },
        {
          "latitude": 54.59551149431,
          "longitude": 52.4578821704
        },
        {
          "latitude": 54.59541369429,
          "longitude": 52.4580098704
        },
        {
          "latitude": 54.59493869424,
          "longitude": 52.4586301704
        },
        {
          "latitude": 54.59466819421,
          "longitude": 52.4589710704
        },
        {
          "latitude": 54.5946124942,
          "longitude": 52.4590412704
        },
        {
          "latitude": 54.5945427942,
          "longitude": 52.4591405704
        },
        {
          "latitude": 54.59428629417,
          "longitude": 52.4595059704
        },
        {
          "latitude": 54.59333879406,
          "longitude": 52.4601672704
        },
        {
          "latitude": 54.59295139402,
          "longitude": 52.4604415704
        },
        {
          "latitude": 54.59263459398,
          "longitude": 52.4606766704
        },
        {
          "latitude": 54.59231169394,
          "longitude": 52.4607636704
        },
        {
          "latitude": 54.59184519389,
          "longitude": 52.4606329704
        },
        {
          "latitude": 54.59067339376,
          "longitude": 52.4602294704
        },
        {
          "latitude": 54.58955789363,
          "longitude": 52.4598915704
        },
        {
          "latitude": 54.58874079354,
          "longitude": 52.4595705704
        },
        {
          "latitude": 54.58858009352,
          "longitude": 52.4595314704
        },
        {
          "latitude": 54.58847679351,
          "longitude": 52.4597114704
        },
        {
          "latitude": 54.58829519349,
          "longitude": 52.4598798704
        },
        {
          "latitude": 54.58803939346,
          "longitude": 52.4599777704
        },
        {
          "latitude": 54.58760519341,
          "longitude": 52.4599974704
        },
        {
          "latitude": 54.58707899335,
          "longitude": 52.4598524704
        },
        {
          "latitude": 54.58640509328,
          "longitude": 52.4595595704
        },
        {
          "latitude": 54.58630139326,
          "longitude": 52.4594021704
        }
      ],
      [
        {
          "latitude": 54.59111019381,
          "longitude": 52.4422005704
        },
        {
          "latitude": 54.59080179377,
          "longitude": 52.4414647704
        }
      ],
      [
        {
          "latitude": 54.59659719443,
          "longitude": 52.4448419704
        },
        {
          "latitude": 54.59652149442,
          "longitude": 52.4449634704
        },
        {
          "latitude": 54.59647859441,
          "longitude": 52.4450323704
        },
        {
          "latitude": 54.59609789437,
          "longitude": 52.4456837704
        },
        {
          "latitude": 54.59578169434,
          "longitude": 52.4462470704
        },
        {
          "latitude": 54.59539899429,
          "longitude": 52.4469526704
        },
        {
          "latitude": 54.59507719426,
          "longitude": 52.4475315704
        },
        {
          "latitude": 54.59505149425,
          "longitude": 52.4475777704
        },
        {
          "latitude": 54.59497099424,
          "longitude": 52.4477225704
        },
        {
          "latitude": 54.59492269424,
          "longitude": 52.4478114704
        },
        {
          "latitude": 54.59489369424,
          "longitude": 52.4478629704
        },
        {
          "latitude": 54.59469229421,
          "longitude": 52.4482207704
        },
        {
          "latitude": 54.59463079421,
          "longitude": 52.4483306704
        },
        {
          "latitude": 54.59427419417,
          "longitude": 52.4490026704
        },
        {
          "latitude": 54.59418209415,
          "longitude": 52.4491810704
        }
      ],
      [
        {
          "latitude": 54.58943009362,
          "longitude": 52.4527672704
        },
        {
          "latitude": 54.58958089363,
          "longitude": 52.4527598704
        },
        {
          "latitude": 54.58997669368,
          "longitude": 52.4529140704
        },
        {
          "latitude": 54.59145959385,
          "longitude": 52.4533941704
        },
        {
          "latitude": 54.59237639395,
          "longitude": 52.4536619704
        },
        {
          "latitude": 54.59305539403,
          "longitude": 52.4538569704
        },
        {
          "latitude": 54.59336969406,
          "longitude": 52.4539472704
        },
        {
          "latitude": 54.59384719412,
          "longitude": 52.4541144704
        },
        {
          "latitude": 54.59411029415,
          "longitude": 52.4542136704
        },
        {
          "latitude": 54.59421019416,
          "longitude": 52.4542513704
        },
        {
          "latitude": 54.59432219417,
          "longitude": 52.4542775704
        },
        {
          "latitude": 54.59441979418,
          "longitude": 52.4542793704
        },
        {
          "latitude": 54.59450939419,
          "longitude": 52.4542626704
        },
        {
          "latitude": 54.59467559421,
          "longitude": 52.4541810704
        }
      ],
      [
        {
          "latitude": 54.5989602947,
          "longitude": 52.4486989704
        },
        {
          "latitude": 54.5990167947,
          "longitude": 52.4487951704
        },
        {
          "latitude": 54.59913979472,
          "longitude": 52.4490046704
        },
        {
          "latitude": 54.59920219472,
          "longitude": 52.4491006704
        },
        {
          "latitude": 54.59934059474,
          "longitude": 52.4493136704
        },
        {
          "latitude": 54.59970679478,
          "longitude": 52.4499053704
        },
        {
          "latitude": 54.59975509479,
          "longitude": 52.4499780704
        },
        {
          "latitude": 54.59997109481,
          "longitude": 52.4503184704
        },
        {
          "latitude": 54.60007279482,
          "longitude": 52.4504756704
        },
        {
          "latitude": 54.60011429483,
          "longitude": 52.4505399704
        }
      ],
      [
        {
          "latitude": 54.59357319409,
          "longitude": 52.4489185704
        },
        {
          "latitude": 54.59353419408,
          "longitude": 52.4487348704
        },
        {
          "latitude": 54.59349029408,
          "longitude": 52.4485652704
        },
        {
          "latitude": 54.59339169407,
          "longitude": 52.4481773704
        }
      ],
      [
        {
          "latitude": 54.58774849343,
          "longitude": 52.4342514704
        },
        {
          "latitude": 54.58797479345,
          "longitude": 52.4339722704
        },
        {
          "latitude": 54.58803409346,
          "longitude": 52.4338982704
        },
        {
          "latitude": 54.58811519347,
          "longitude": 52.4337932704
        },
        {
          "latitude": 54.58820729348,
          "longitude": 52.4336740704
        },
        {
          "latitude": 54.58849289351,
          "longitude": 52.4333020704
        },
        {
          "latitude": 54.58904459357,
          "longitude": 52.4325801704
        },
        {
          "latitude": 54.5892556936,
          "longitude": 52.4323116704
        },
        {
          "latitude": 54.5893096936,
          "longitude": 52.4322426704
        },
        {
          "latitude": 54.58937269361,
          "longitude": 52.4321625704
        },
        {
          "latitude": 54.58951289363,
          "longitude": 52.4319840704
        },
        {
          "latitude": 54.58964299364,
          "longitude": 52.4318876704
        },
        {
          "latitude": 54.58978859366,
          "longitude": 52.4318396704
        },
        {
          "latitude": 54.59002569368,
          "longitude": 52.4318220704
        },
        {
          "latitude": 54.59146759385,
          "longitude": 52.4317591704
        },
        {
          "latitude": 54.59179149388,
          "longitude": 52.4317364704
        },
        {
          "latitude": 54.59225029394,
          "longitude": 52.4317073704
        },
        {
          "latitude": 54.59248309396,
          "longitude": 52.4316866704
        },
        {
          "latitude": 54.59264679398,
          "longitude": 52.4316721704
        },
        {
          "latitude": 54.59273349399,
          "longitude": 52.4316644704
        },
        {
          "latitude": 54.592825694,
          "longitude": 52.4316592704
        },
        {
          "latitude": 54.59299369402,
          "longitude": 52.4316498704
        },
        {
          "latitude": 54.59343439407,
          "longitude": 52.4316251704
        },
        {
          "latitude": 54.59356859409,
          "longitude": 52.4316166704
        },
        {
          "latitude": 54.59378679411,
          "longitude": 52.4316040704
        },
        {
          "latitude": 54.59388629412,
          "longitude": 52.4315983704
        }
      ],
      [
        {
          "latitude": 54.59497099424,
          "longitude": 52.4477225704
        },
        {
          "latitude": 54.59504169425,
          "longitude": 52.4478438704
        },
        {
          "latitude": 54.59506939426,
          "longitude": 52.4478914704
        },
        {
          "latitude": 54.59518559427,
          "longitude": 52.4480908704
        },
        {
          "latitude": 54.59606949437,
          "longitude": 52.4495581704
        },
        {
          "latitude": 54.59670269444,
          "longitude": 52.4505435704
        },
        {
          "latitude": 54.59699589447,
          "longitude": 52.4510270704
        },
        {
          "latitude": 54.59705239448,
          "longitude": 52.4511284704
        },
        {
          "latitude": 54.59711329449,
          "longitude": 52.4512482704
        }
      ],
      [
        {
          "latitude": 54.58909289358,
          "longitude": 52.4374751704
        },
        {
          "latitude": 54.58933919361,
          "longitude": 52.4371499704
        },
        {
          "latitude": 54.58951189363,
          "longitude": 52.4369273704
        },
        {
          "latitude": 54.58975189365,
          "longitude": 52.4366178704
        },
        {
          "latitude": 54.59030529372,
          "longitude": 52.4359043704
        },
        {
          "latitude": 54.59061169375,
          "longitude": 52.4354928704
        },
        {
          "latitude": 54.59074399377,
          "longitude": 52.4353662704
        },
        {
          "latitude": 54.59088269378,
          "longitude": 52.4352980704
        },
        {
          "latitude": 54.59097319379,
          "longitude": 52.4352721704
        },
        {
          "latitude": 54.59112699381,
          "longitude": 52.4352570704
        },
        {
          "latitude": 54.59151119385,
          "longitude": 52.4352504704
        }
      ],
      [
        {
          "latitude": 54.60120329495,
          "longitude": 52.4310681704
        },
        {
          "latitude": 54.60107619493,
          "longitude": 52.4313064704
        },
        {
          "latitude": 54.60103669493,
          "longitude": 52.4313806704
        },
        {
          "latitude": 54.6007746949,
          "longitude": 52.4318718704
        },
        {
          "latitude": 54.60046909487,
          "longitude": 52.4324449704
        },
        {
          "latitude": 54.60027709484,
          "longitude": 52.4328049704
        },
        {
          "latitude": 54.60024349484,
          "longitude": 52.4328779704
        },
        {
          "latitude": 54.59947669475,
          "longitude": 52.4342270704
        },
        {
          "latitude": 54.59912029471,
          "longitude": 52.4348539704
        },
        {
          "latitude": 54.59921039472,
          "longitude": 52.4353635704
        },
        {
          "latitude": 54.59921249472,
          "longitude": 52.4356587704
        },
        {
          "latitude": 54.59922489473,
          "longitude": 52.4374458704
        },
        {
          "latitude": 54.59922709473,
          "longitude": 52.4377642704
        },
        {
          "latitude": 54.59923089473,
          "longitude": 52.4382981704
        },
        {
          "latitude": 54.59923399473,
          "longitude": 52.4389493704
        },
        {
          "latitude": 54.59924699473,
          "longitude": 52.4395548704
        },
        {
          "latitude": 54.59925599473,
          "longitude": 52.4400912704
        },
        {
          "latitude": 54.59930159473,
          "longitude": 52.4420674704
        }
      ],
      [
        {
          "latitude": 54.59409629415,
          "longitude": 52.4432745704
        },
        {
          "latitude": 54.59409379414,
          "longitude": 52.4431308704
        },
        {
          "latitude": 54.59408259414,
          "longitude": 52.4424939704
        },
        {
          "latitude": 54.59407799414,
          "longitude": 52.4422321704
        },
        {
          "latitude": 54.59404769414,
          "longitude": 52.4405014704
        },
        {
          "latitude": 54.59402379414,
          "longitude": 52.4391368704
        },
        {
          "latitude": 54.59401409414,
          "longitude": 52.4385820704
        },
        {
          "latitude": 54.59399879413,
          "longitude": 52.4377111704
        },
        {
          "latitude": 54.59397849413,
          "longitude": 52.4365523704
        },
        {
          "latitude": 54.59396929413,
          "longitude": 52.4360251704
        },
        {
          "latitude": 54.59396529413,
          "longitude": 52.4357995704
        },
        {
          "latitude": 54.59396329413,
          "longitude": 52.4356840704
        },
        {
          "latitude": 54.59395339413,
          "longitude": 52.4351227704
        }
      ],
      [
        {
          "latitude": 54.59151119385,
          "longitude": 52.4352504704
        },
        {
          "latitude": 54.59207639392,
          "longitude": 52.4352204704
        },
        {
          "latitude": 54.59340479407,
          "longitude": 52.4351512704
        },
        {
          "latitude": 54.59395339413,
          "longitude": 52.4351227704
        },
        {
          "latitude": 54.59404359414,
          "longitude": 52.4351180704
        },
        {
          "latitude": 54.5945791942,
          "longitude": 52.4350902704
        },
        {
          "latitude": 54.59476769422,
          "longitude": 52.4350803704
        },
        {
          "latitude": 54.59551729431,
          "longitude": 52.4350414704
        },
        {
          "latitude": 54.59563269432,
          "longitude": 52.4350353704
        },
        {
          "latitude": 54.59590769435,
          "longitude": 52.4350210704
        },
        {
          "latitude": 54.5963889944,
          "longitude": 52.4349960704
        },
        {
          "latitude": 54.59685209446,
          "longitude": 52.4349719704
        },
        {
          "latitude": 54.59702979448,
          "longitude": 52.4349627704
        },
        {
          "latitude": 54.59712619449,
          "longitude": 52.4349576704
        },
        {
          "latitude": 54.59783959457,
          "longitude": 52.4349205704
        },
        {
          "latitude": 54.59834359463,
          "longitude": 52.4348943704
        },
        {
          "latitude": 54.59859289465,
          "longitude": 52.4348813704
        },
        {
          "latitude": 54.59912029471,
          "longitude": 52.4348539704
        }
      ],
      [
        {
          "latitude": 54.59659719443,
          "longitude": 52.4448419704
        },
        {
          "latitude": 54.59658679443,
          "longitude": 52.4444740704
        },
        {
          "latitude": 54.59656369442,
          "longitude": 52.4433695704
        },
        {
          "latitude": 54.59655959442,
          "longitude": 52.4431716704
        },
        {
          "latitude": 54.59655659442,
          "longitude": 52.4430259704
        },
        {
          "latitude": 54.59647379441,
          "longitude": 52.4390578704
        },
        {
          "latitude": 54.59646099441,
          "longitude": 52.4384437704
        },
        {
          "latitude": 54.59644299441,
          "longitude": 52.4375820704
        },
        {
          "latitude": 54.59643389441,
          "longitude": 52.4371401704
        },
        {
          "latitude": 54.59641809441,
          "longitude": 52.4363776704
        },
        {
          "latitude": 54.59640659441,
          "longitude": 52.4358216704
        },
        {
          "latitude": 54.5963889944,
          "longitude": 52.4349960704
        }
      ],
      [
        {
          "latitude": 54.59409629415,
          "longitude": 52.4432745704
        },
        {
          "latitude": 54.59418049415,
          "longitude": 52.4432742704
        },
        {
          "latitude": 54.59421069416,
          "longitude": 52.4432741704
        },
        {
          "latitude": 54.59438239418,
          "longitude": 52.4432735704
        },
        {
          "latitude": 54.59484149423,
          "longitude": 52.4432520704
        },
        {
          "latitude": 54.5954425943,
          "longitude": 52.4432219704
        },
        {
          "latitude": 54.59620609438,
          "longitude": 52.4431890704
        },
        {
          "latitude": 54.59645159441,
          "longitude": 52.4431769704
        },
        {
          "latitude": 54.59655959442,
          "longitude": 52.4431716704
        },
        {
          "latitude": 54.59668529444,
          "longitude": 52.4431699704
        },
        {
          "latitude": 54.59686219446,
          "longitude": 52.4431675704
        },
        {
          "latitude": 54.59762019454,
          "longitude": 52.4431344704
        },
        {
          "latitude": 54.59801299459,
          "longitude": 52.4431095704
        },
        {
          "latitude": 54.59867409466,
          "longitude": 52.4430676704
        },
        {
          "latitude": 54.59880959468,
          "longitude": 52.4431161704
        }
      ],
      [
        {
          "latitude": 54.59164759387,
          "longitude": 52.4387155704
        },
        {
          "latitude": 54.59214039392,
          "longitude": 52.4386889704
        },
        {
          "latitude": 54.59230679394,
          "longitude": 52.4386799704
        },
        {
          "latitude": 54.59264049398,
          "longitude": 52.4386599704
        },
        {
          "latitude": 54.592779494,
          "longitude": 52.4386516704
        },
        {
          "latitude": 54.59307629403,
          "longitude": 52.4386349704
        },
        {
          "latitude": 54.59401409414,
          "longitude": 52.4385820704
        },
        {
          "latitude": 54.59409889415,
          "longitude": 52.4385772704
        },
        {
          "latitude": 54.59473509422,
          "longitude": 52.4385413704
        },
        {
          "latitude": 54.59475809422,
          "longitude": 52.4385400704
        },
        {
          "latitude": 54.59515529426,
          "longitude": 52.4385175704
        },
        {
          "latitude": 54.59568729433,
          "longitude": 52.4384874704
        },
        {
          "latitude": 54.59646099441,
          "longitude": 52.4384437704
        },
        {
          "latitude": 54.59675619445,
          "longitude": 52.4384272704
        },
        {
          "latitude": 54.59708909448,
          "longitude": 52.4384084704
        },
        {
          "latitude": 54.5972291945,
          "longitude": 52.4384005704
        },
        {
          "latitude": 54.59750299453,
          "longitude": 52.4383850704
        },
        {
          "latitude": 54.59821639461,
          "longitude": 52.4383421704
        },
        {
          "latitude": 54.59848959464,
          "longitude": 52.4383303704
        },
        {
          "latitude": 54.59923089473,
          "longitude": 52.4382981704
        },
        {
          "latitude": 54.60016559483,
          "longitude": 52.4382347704
        }
      ],
      [
        {
          "latitude": 54.59846989464,
          "longitude": 52.4479021704
        },
        {
          "latitude": 54.59838149463,
          "longitude": 52.4477566704
        },
        {
          "latitude": 54.59829309462,
          "longitude": 52.4476110704
        },
        {
          "latitude": 54.59821639461,
          "longitude": 52.4474847704
        },
        {
          "latitude": 54.5981194946,
          "longitude": 52.4473250704
        }
      ],
      [
        {
          "latitude": 54.59707909448,
          "longitude": 52.4456513704
        },
        {
          "latitude": 54.59664099443,
          "longitude": 52.4449154704
        },
        {
          "latitude": 54.59659719443,
          "longitude": 52.4448419704
        }
      ],
      [
        {
          "latitude": 54.59871419467,
          "longitude": 52.4482928704
        },
        {
          "latitude": 54.59846989464,
          "longitude": 52.4479021704
        }
      ],
      [
        {
          "latitude": 54.59760869454,
          "longitude": 52.4465082704
        },
        {
          "latitude": 54.59707909448,
          "longitude": 52.4456513704
        }
      ],
      [
        {
          "latitude": 54.59871419467,
          "longitude": 52.4482928704
        },
        {
          "latitude": 54.5989602947,
          "longitude": 52.4486989704
        }
      ],
      [
        {
          "latitude": 54.59781139457,
          "longitude": 52.4468324704
        },
        {
          "latitude": 54.59760869454,
          "longitude": 52.4465082704
        }
      ],
      [
        {
          "latitude": 54.5981194946,
          "longitude": 52.4473250704
        },
        {
          "latitude": 54.59781139457,
          "longitude": 52.4468324704
        }
      ],
      [
        {
          "latitude": 54.59222109393,
          "longitude": 52.4448747704
        },
        {
          "latitude": 54.59150479385,
          "longitude": 52.4431439704
        }
      ],
      [
        {
          "latitude": 54.59243149396,
          "longitude": 52.4445980704
        },
        {
          "latitude": 54.59250489397,
          "longitude": 52.4445055704
        },
        {
          "latitude": 54.59320509404,
          "longitude": 52.4436287704
        },
        {
          "latitude": 54.59339029407,
          "longitude": 52.4433744704
        },
        {
          "latitude": 54.59347949408,
          "longitude": 52.4433513704
        },
        {
          "latitude": 54.59357529409,
          "longitude": 52.4433265704
        },
        {
          "latitude": 54.5936866941,
          "longitude": 52.4433154704
        },
        {
          "latitude": 54.59376339411,
          "longitude": 52.4433077704
        },
        {
          "latitude": 54.59409629415,
          "longitude": 52.4432745704
        }
      ],
      [
        {
          "latitude": 54.59263499398,
          "longitude": 52.4458750704
        },
        {
          "latitude": 54.59255849397,
          "longitude": 52.4456900704
        },
        {
          "latitude": 54.59222109393,
          "longitude": 52.4448747704
        }
      ],
      [
        {
          "latitude": 54.59269139399,
          "longitude": 52.4460113704
        },
        {
          "latitude": 54.59263499398,
          "longitude": 52.4458750704
        }
      ],
      [
        {
          "latitude": 54.592794194,
          "longitude": 52.4462960704
        },
        {
          "latitude": 54.59269139399,
          "longitude": 52.4460113704
        }
      ],
      [
        {
          "latitude": 54.59339169407,
          "longitude": 52.4481773704
        },
        {
          "latitude": 54.59337479406,
          "longitude": 52.4481123704
        }
      ],
      [
        {
          "latitude": 54.59222109393,
          "longitude": 52.4448747704
        },
        {
          "latitude": 54.59243149396,
          "longitude": 52.4445980704
        }
      ],
      [
        {
          "latitude": 54.59323549405,
          "longitude": 52.4476612704
        },
        {
          "latitude": 54.59315519404,
          "longitude": 52.4474013704
        }
      ],
      [
        {
          "latitude": 54.59308409403,
          "longitude": 52.4471782704
        },
        {
          "latitude": 54.59290769401,
          "longitude": 52.4466242704
        },
        {
          "latitude": 54.592794194,
          "longitude": 52.4462960704
        }
      ],
      [
        {
          "latitude": 54.59315519404,
          "longitude": 52.4474013704
        },
        {
          "latitude": 54.59308409403,
          "longitude": 52.4471782704
        }
      ],
      [
        {
          "latitude": 54.59337479406,
          "longitude": 52.4481123704
        },
        {
          "latitude": 54.59323549405,
          "longitude": 52.4476612704
        }
      ],
      [
        {
          "latitude": 54.59150479385,
          "longitude": 52.4431439704
        },
        {
          "latitude": 54.59111019381,
          "longitude": 52.4422005704
        }
      ],
      [
        {
          "latitude": 54.59395339413,
          "longitude": 52.4351227704
        },
        {
          "latitude": 54.59394439413,
          "longitude": 52.4346345704
        },
        {
          "latitude": 54.59393279413,
          "longitude": 52.4340408704
        },
        {
          "latitude": 54.59392429413,
          "longitude": 52.4335908704
        },
        {
          "latitude": 54.59390489412,
          "longitude": 52.4325726704
        },
        {
          "latitude": 54.59389749412,
          "longitude": 52.4321879704
        },
        {
          "latitude": 54.59388879412,
          "longitude": 52.4317306704
        },
        {
          "latitude": 54.59388629412,
          "longitude": 52.4315983704
        },
        {
          "latitude": 54.59388379412,
          "longitude": 52.4314669704
        },
        {
          "latitude": 54.59387629412,
          "longitude": 52.4310732704
        },
        {
          "latitude": 54.59386769412,
          "longitude": 52.4306254704
        },
        {
          "latitude": 54.59385199412,
          "longitude": 52.4298008704
        },
        {
          "latitude": 54.59384129412,
          "longitude": 52.4292371704
        },
        {
          "latitude": 54.59381909411,
          "longitude": 52.4280723704
        },
        {
          "latitude": 54.59379529411,
          "longitude": 52.4268258704
        }
      ],
      [
        {
          "latitude": 54.5998443948,
          "longitude": 52.4556169704
        },
        {
          "latitude": 54.59970819478,
          "longitude": 52.4557314704
        },
        {
          "latitude": 54.59964559477,
          "longitude": 52.4558658704
        },
        {
          "latitude": 54.59911589471,
          "longitude": 52.4568540704
        },
        {
          "latitude": 54.59895059469,
          "longitude": 52.4571278704
        },
        {
          "latitude": 54.59891319469,
          "longitude": 52.4571971704
        },
        {
          "latitude": 54.59840389463,
          "longitude": 52.4581690704
        },
        {
          "latitude": 54.59836919463,
          "longitude": 52.4582304704
        },
        {
          "latitude": 54.59829729462,
          "longitude": 52.4583575704
        },
        {
          "latitude": 54.59827219462,
          "longitude": 52.4584042704
        },
        {
          "latitude": 54.59706659448,
          "longitude": 52.4606776704
        },
        {
          "latitude": 54.59686289446,
          "longitude": 52.4610553704
        },
        {
          "latitude": 54.59673699444,
          "longitude": 52.4611602704
        }
      ],
      [
        {
          "latitude": 54.59650299442,
          "longitude": 52.4601738704
        },
        {
          "latitude": 54.59609789437,
          "longitude": 52.4586716704
        },
        {
          "latitude": 54.59591189435,
          "longitude": 52.4579818704
        }
      ],
      [
        {
          "latitude": 54.59678299445,
          "longitude": 52.4613708704
        },
        {
          "latitude": 54.59691099446,
          "longitude": 52.4612538704
        },
        {
          "latitude": 54.59713069449,
          "longitude": 52.4608334704
        },
        {
          "latitude": 54.59714449449,
          "longitude": 52.4608087704
        },
        {
          "latitude": 54.59840049463,
          "longitude": 52.4584465704
        },
        {
          "latitude": 54.59845129464,
          "longitude": 52.4583710704
        },
        {
          "latitude": 54.5989645947,
          "longitude": 52.4574285704
        },
        {
          "latitude": 54.5990035947,
          "longitude": 52.4573565704
        },
        {
          "latitude": 54.59908339471,
          "longitude": 52.4572094704
        },
        {
          "latitude": 54.59972719478,
          "longitude": 52.4560030704
        },
        {
          "latitude": 54.59979779479,
          "longitude": 52.4558836704
        },
        {
          "latitude": 54.5998443948,
          "longitude": 52.4556169704
        }
      ],
      [
        {
          "latitude": 54.59660009443,
          "longitude": 52.4605487704
        },
        {
          "latitude": 54.59655459442,
          "longitude": 52.4603684704
        },
        {
          "latitude": 54.59650299442,
          "longitude": 52.4601738704
        }
      ],
      [
        {
          "latitude": 54.5998443948,
          "longitude": 52.4556169704
        },
        {
          "latitude": 54.5998743948,
          "longitude": 52.4555613704
        },
        {
          "latitude": 54.60006679482,
          "longitude": 52.4552043704
        },
        {
          "latitude": 54.60057799488,
          "longitude": 52.4542559704
        },
        {
          "latitude": 54.60112539494,
          "longitude": 52.4532403704
        },
        {
          "latitude": 54.60120909495,
          "longitude": 52.4530850704
        },
        {
          "latitude": 54.60135649497,
          "longitude": 52.4528145704
        },
        {
          "latitude": 54.60144769498,
          "longitude": 52.4526472704
        }
      ],
      [
        {
          "latitude": 54.59892749469,
          "longitude": 52.4541230704
        },
        {
          "latitude": 54.5998865948,
          "longitude": 52.4523663704
        },
        {
          "latitude": 54.60022449484,
          "longitude": 52.4517674704
        },
        {
          "latitude": 54.60052419487,
          "longitude": 52.4511984704
        }
      ],
      [
        {
          "latitude": 54.59975509479,
          "longitude": 52.4499780704
        },
        {
          "latitude": 54.59952169476,
          "longitude": 52.4504162704
        },
        {
          "latitude": 54.59893609469,
          "longitude": 52.4515251704
        },
        {
          "latitude": 54.59819879461,
          "longitude": 52.4529513704
        }
      ],
      [
        {
          "latitude": 54.60144769498,
          "longitude": 52.4526472704
        },
        {
          "latitude": 54.60151369498,
          "longitude": 52.4527562704
        },
        {
          "latitude": 54.60175099501,
          "longitude": 52.4531482704
        }
      ],
      [
        {
          "latitude": 54.60052419487,
          "longitude": 52.4511984704
        },
        {
          "latitude": 54.60138539497,
          "longitude": 52.4525494704
        },
        {
          "latitude": 54.60144769498,
          "longitude": 52.4526472704
        }
      ],
      [
        {
          "latitude": 54.60011429483,
          "longitude": 52.4505399704
        },
        {
          "latitude": 54.60018859483,
          "longitude": 52.4506592704
        },
        {
          "latitude": 54.60028669485,
          "longitude": 52.4508168704
        },
        {
          "latitude": 54.60052419487,
          "longitude": 52.4511984704
        }
      ],
      [
        {
          "latitude": 54.59957219476,
          "longitude": 52.4555488704
        },
        {
          "latitude": 54.59962639477,
          "longitude": 52.4556080704
        },
        {
          "latitude": 54.59967619478,
          "longitude": 52.4555786704
        },
        {
          "latitude": 54.59969889478,
          "longitude": 52.4554762704
        },
        {
          "latitude": 54.59968779478,
          "longitude": 52.4553749704
        }
      ],
      [
        {
          "latitude": 54.59799189459,
          "longitude": 52.4526222704
        },
        {
          "latitude": 54.59749899453,
          "longitude": 52.4517773704
        }
      ],
      [
        {
          "latitude": 54.59749899453,
          "longitude": 52.4517773704
        },
        {
          "latitude": 54.59728609451,
          "longitude": 52.4514080704
        },
        {
          "latitude": 54.5972440945,
          "longitude": 52.4513632704
        },
        {
          "latitude": 54.59711329449,
          "longitude": 52.4512482704
        }
      ],
      [
        {
          "latitude": 54.59970399478,
          "longitude": 52.4608399704
        },
        {
          "latitude": 54.59959619477,
          "longitude": 52.4610373704
        },
        {
          "latitude": 54.59936849474,
          "longitude": 52.4614520704
        },
        {
          "latitude": 54.59932559474,
          "longitude": 52.4615309704
        },
        {
          "latitude": 54.59911659471,
          "longitude": 52.4619149704
        },
        {
          "latitude": 54.5990458947,
          "longitude": 52.4620443704
        },
        {
          "latitude": 54.59873639467,
          "longitude": 52.4626105704
        },
        {
          "latitude": 54.59825279462,
          "longitude": 52.4634955704
        }
      ],
      [
        {
          "latitude": 54.59668709444,
          "longitude": 52.4609250704
        },
        {
          "latitude": 54.59660009443,
          "longitude": 52.4605487704
        }
      ],
      [
        {
          "latitude": 54.59380749411,
          "longitude": 52.4493420704
        },
        {
          "latitude": 54.5937256941,
          "longitude": 52.4492032704
        },
        {
          "latitude": 54.5936735941,
          "longitude": 52.4491163704
        },
        {
          "latitude": 54.59363209409,
          "longitude": 52.4490437704
        },
        {
          "latitude": 54.59357319409,
          "longitude": 52.4489185704
        }
      ],
      [
        {
          "latitude": 54.59531189428,
          "longitude": 52.4556568704
        },
        {
          "latitude": 54.59509069426,
          "longitude": 52.4547950704
        },
        {
          "latitude": 54.59499119425,
          "longitude": 52.4544007704
        },
        {
          "latitude": 54.59489519424,
          "longitude": 52.4540369704
        }
      ],
      [
        {
          "latitude": 54.59375989411,
          "longitude": 52.4498926704
        },
        {
          "latitude": 54.59399419413,
          "longitude": 52.4504684704
        }
      ],
      [
        {
          "latitude": 54.59380749411,
          "longitude": 52.4493420704
        },
        {
          "latitude": 54.59375729411,
          "longitude": 52.4493696704
        },
        {
          "latitude": 54.5937145941,
          "longitude": 52.4494226704
        },
        {
          "latitude": 54.5936832941,
          "longitude": 52.4494957704
        },
        {
          "latitude": 54.5936665941,
          "longitude": 52.4495819704
        },
        {
          "latitude": 54.5936644941,
          "longitude": 52.4496426704
        },
        {
          "latitude": 54.5936696941,
          "longitude": 52.4497028704
        },
        {
          "latitude": 54.5936819941,
          "longitude": 52.4497597704
        }
      ],
      [
        {
          "latitude": 54.5936819941,
          "longitude": 52.4497597704
        },
        {
          "latitude": 54.5936963941,
          "longitude": 52.4498009704
        },
        {
          "latitude": 54.5937144941,
          "longitude": 52.4498374704
        },
        {
          "latitude": 54.5937358941,
          "longitude": 52.4498682704
        },
        {
          "latitude": 54.59375989411,
          "longitude": 52.4498926704
        },
        {
          "latitude": 54.59381599411,
          "longitude": 52.4499199704
        }
      ],
      [
        {
          "latitude": 54.59399509413,
          "longitude": 52.4497122704
        },
        {
          "latitude": 54.59404479414,
          "longitude": 52.4495775704
        },
        {
          "latitude": 54.59408819414,
          "longitude": 52.4494536704
        },
        {
          "latitude": 54.59418209415,
          "longitude": 52.4491810704
        }
      ],
      [
        {
          "latitude": 54.59489519424,
          "longitude": 52.4540369704
        },
        {
          "latitude": 54.59399419413,
          "longitude": 52.4504684704
        }
      ],
      [
        {
          "latitude": 54.59399419413,
          "longitude": 52.4504684704
        },
        {
          "latitude": 54.59398209413,
          "longitude": 52.4503126704
        },
        {
          "latitude": 54.59397509413,
          "longitude": 52.4501315704
        },
        {
          "latitude": 54.59397199413,
          "longitude": 52.4500375704
        },
        {
          "latitude": 54.59396929413,
          "longitude": 52.4498943704
        },
        {
          "latitude": 54.59396939413,
          "longitude": 52.4498022704
        }
      ],
      [
        {
          "latitude": 54.59418209415,
          "longitude": 52.4491810704
        },
        {
          "latitude": 54.59412369415,
          "longitude": 52.4492166704
        },
        {
          "latitude": 54.59407919414,
          "longitude": 52.4492450704
        },
        {
          "latitude": 54.59401569414,
          "longitude": 52.4492749704
        },
        {
          "latitude": 54.59396549413,
          "longitude": 52.4492977704
        },
        {
          "latitude": 54.59386019412,
          "longitude": 52.4493424704
        }
      ],
      [
        {
          "latitude": 54.59386019412,
          "longitude": 52.4493424704
        },
        {
          "latitude": 54.59380749411,
          "longitude": 52.4493420704
        }
      ],
      [
        {
          "latitude": 54.59399509413,
          "longitude": 52.4497122704
        },
        {
          "latitude": 54.59400169413,
          "longitude": 52.4496145704
        },
        {
          "latitude": 54.59398909413,
          "longitude": 52.4495186704
        },
        {
          "latitude": 54.59395879413,
          "longitude": 52.4494353704
        },
        {
          "latitude": 54.59391409412,
          "longitude": 52.4493743704
        },
        {
          "latitude": 54.59386019412,
          "longitude": 52.4493424704
        }
      ],
      [
        {
          "latitude": 54.59396939413,
          "longitude": 52.4498022704
        },
        {
          "latitude": 54.59399509413,
          "longitude": 52.4497122704
        }
      ],
      [
        {
          "latitude": 54.59381599411,
          "longitude": 52.4499199704
        },
        {
          "latitude": 54.59387409412,
          "longitude": 52.4499127704
        },
        {
          "latitude": 54.59392729413,
          "longitude": 52.4498719704
        },
        {
          "latitude": 54.59396939413,
          "longitude": 52.4498022704
        }
      ],
      [
        {
          "latitude": 54.59467559421,
          "longitude": 52.4541810704
        },
        {
          "latitude": 54.59489519424,
          "longitude": 52.4540369704
        }
      ],
      [
        {
          "latitude": 54.59591189435,
          "longitude": 52.4579818704
        },
        {
          "latitude": 54.59579989434,
          "longitude": 52.4575688704
        },
        {
          "latitude": 54.59531189428,
          "longitude": 52.4556568704
        }
      ],
      [
        {
          "latitude": 54.59357319409,
          "longitude": 52.4489185704
        },
        {
          "latitude": 54.5936665941,
          "longitude": 52.4495819704
        }
      ],
      [
        {
          "latitude": 54.58672239331,
          "longitude": 52.4559695704
        },
        {
          "latitude": 54.58511839313,
          "longitude": 52.4553543704
        },
        {
          "latitude": 54.58247989283,
          "longitude": 52.4543423704
        }
      ],
      [
        {
          "latitude": 54.58294489288,
          "longitude": 52.4512116704
        },
        {
          "latitude": 54.58709939335,
          "longitude": 52.4528752704
        },
        {
          "latitude": 54.58918809359,
          "longitude": 52.4536557704
        }
      ],
      [
        {
          "latitude": 54.58882069355,
          "longitude": 52.4566425704
        },
        {
          "latitude": 54.58892179356,
          "longitude": 52.4559809704
        },
        {
          "latitude": 54.58896669357,
          "longitude": 52.4555723704
        },
        {
          "latitude": 54.58902219357,
          "longitude": 52.4549648704
        },
        {
          "latitude": 54.58918809359,
          "longitude": 52.4536557704
        },
        {
          "latitude": 54.58933569361,
          "longitude": 52.4528917704
        },
        {
          "latitude": 54.58943009362,
          "longitude": 52.4527672704
        }
      ],
      [
        {
          "latitude": 54.58858009352,
          "longitude": 52.4595314704
        },
        {
          "latitude": 54.58860529352,
          "longitude": 52.4589191704
        },
        {
          "latitude": 54.58869939353,
          "longitude": 52.4580954704
        },
        {
          "latitude": 54.58871869354,
          "longitude": 52.4578833704
        },
        {
          "latitude": 54.58878529354,
          "longitude": 52.4570372704
        },
        {
          "latitude": 54.58882069355,
          "longitude": 52.4566425704
        }
      ],
      [
        {
          "latitude": 54.58672239331,
          "longitude": 52.4559695704
        },
        {
          "latitude": 54.58657709329,
          "longitude": 52.4571248704
        },
        {
          "latitude": 54.58643319328,
          "longitude": 52.4582483704
        },
        {
          "latitude": 54.58630139326,
          "longitude": 52.4594021704
        }
      ],
      [
        {
          "latitude": 54.58294489288,
          "longitude": 52.4512116704
        },
        {
          "latitude": 54.58268029285,
          "longitude": 52.4530500704
        },
        {
          "latitude": 54.58247989283,
          "longitude": 52.4543423704
        }
      ],
      [
        {
          "latitude": 54.58178779275,
          "longitude": 52.4525363704
        },
        {
          "latitude": 54.58185819276,
          "longitude": 52.4526075704
        },
        {
          "latitude": 54.58187969276,
          "longitude": 52.4526345704
        }
      ],
      [
        {
          "latitude": 54.58187969276,
          "longitude": 52.4526345704
        },
        {
          "latitude": 54.58202909278,
          "longitude": 52.4527912704
        },
        {
          "latitude": 54.58268029285,
          "longitude": 52.4530500704
        }
      ],
      [
        {
          "latitude": 54.59030639372,
          "longitude": 52.4403175704
        },
        {
          "latitude": 54.58909289358,
          "longitude": 52.4374751704
        }
      ],
      [
        {
          "latitude": 54.58671609331,
          "longitude": 52.4318182704
        },
        {
          "latitude": 54.58674769331,
          "longitude": 52.4319832704
        },
        {
          "latitude": 54.58677179332,
          "longitude": 52.4321971704
        },
        {
          "latitude": 54.58676669332,
          "longitude": 52.4323507704
        }
      ],
      [
        {
          "latitude": 54.58955429363,
          "longitude": 52.4293798704
        },
        {
          "latitude": 54.58934039361,
          "longitude": 52.4302056704
        },
        {
          "latitude": 54.5884099935,
          "longitude": 52.4312774704
        },
        {
          "latitude": 54.58768469342,
          "longitude": 52.4321130704
        },
        {
          "latitude": 54.58742919339,
          "longitude": 52.4324073704
        }
      ],
      [
        {
          "latitude": 54.58909289358,
          "longitude": 52.4374751704
        },
        {
          "latitude": 54.58774849343,
          "longitude": 52.4342514704
        }
      ],
      [
        {
          "latitude": 54.58699149334,
          "longitude": 52.4323249704
        },
        {
          "latitude": 54.58671609331,
          "longitude": 52.4318182704
        }
      ],
      [
        {
          "latitude": 54.58656949329,
          "longitude": 52.4329457704
        },
        {
          "latitude": 54.58674259331,
          "longitude": 52.4327890704
        },
        {
          "latitude": 54.58675879332,
          "longitude": 52.4327789704
        },
        {
          "latitude": 54.58679859332,
          "longitude": 52.4327578704
        },
        {
          "latitude": 54.58682829332,
          "longitude": 52.4327419704
        },
        {
          "latitude": 54.58687809333,
          "longitude": 52.4327343704
        }
      ],
      [
        {
          "latitude": 54.58700769334,
          "longitude": 52.4323640704
        },
        {
          "latitude": 54.58699149334,
          "longitude": 52.4323249704
        },
        {
          "latitude": 54.58693549334,
          "longitude": 52.4322771704
        },
        {
          "latitude": 54.58689229333,
          "longitude": 52.4322601704
        },
        {
          "latitude": 54.58684829333,
          "longitude": 52.4322681704
        },
        {
          "latitude": 54.58680799332,
          "longitude": 52.4323003704
        },
        {
          "latitude": 54.58676669332,
          "longitude": 52.4323507704
        }
      ],
      [
        {
          "latitude": 54.58675119331,
          "longitude": 52.4324295704
        },
        {
          "latitude": 54.58672509331,
          "longitude": 52.4325181704
        },
        {
          "latitude": 54.58669839331,
          "longitude": 52.4326155704
        },
        {
          "latitude": 54.5866510933,
          "longitude": 52.4327486704
        },
        {
          "latitude": 54.58656949329,
          "longitude": 52.4329457704
        }
      ],
      [
        {
          "latitude": 54.58689899333,
          "longitude": 52.4327338704
        },
        {
          "latitude": 54.58696349334,
          "longitude": 52.4327687704
        },
        {
          "latitude": 54.58705519335,
          "longitude": 52.4328398704
        },
        {
          "latitude": 54.58714999336,
          "longitude": 52.4329149704
        },
        {
          "latitude": 54.58720829337,
          "longitude": 52.4329994704
        }
      ],
      [
        {
          "latitude": 54.58774849343,
          "longitude": 52.4342514704
        },
        {
          "latitude": 54.58727999337,
          "longitude": 52.4331824704
        }
      ],
      [
        {
          "latitude": 54.58727999337,
          "longitude": 52.4331824704
        },
        {
          "latitude": 54.58723239337,
          "longitude": 52.4330584704
        },
        {
          "latitude": 54.58720829337,
          "longitude": 52.4329994704
        }
      ],
      [
        {
          "latitude": 54.58677929332,
          "longitude": 52.4326397704
        },
        {
          "latitude": 54.58681269332,
          "longitude": 52.4326906704
        },
        {
          "latitude": 54.58687809333,
          "longitude": 52.4327343704
        },
        {
          "latitude": 54.58689899333,
          "longitude": 52.4327338704
        }
      ],
      [
        {
          "latitude": 54.58675119331,
          "longitude": 52.4324295704
        },
        {
          "latitude": 54.58674909331,
          "longitude": 52.4324973704
        },
        {
          "latitude": 54.58675729332,
          "longitude": 52.4325729704
        },
        {
          "latitude": 54.58677929332,
          "longitude": 52.4326397704
        }
      ],
      [
        {
          "latitude": 54.58676669332,
          "longitude": 52.4323507704
        },
        {
          "latitude": 54.58675119331,
          "longitude": 52.4324295704
        }
      ],
      [
        {
          "latitude": 54.58689899333,
          "longitude": 52.4327338704
        },
        {
          "latitude": 54.58694119334,
          "longitude": 52.4327042704
        },
        {
          "latitude": 54.58697789334,
          "longitude": 52.4326607704
        },
        {
          "latitude": 54.58700439334,
          "longitude": 52.4325990704
        },
        {
          "latitude": 54.58701789334,
          "longitude": 52.4325257704
        },
        {
          "latitude": 54.58701689334,
          "longitude": 52.4324488704
        },
        {
          "latitude": 54.58700769334,
          "longitude": 52.4323640704
        }
      ],
      [
        {
          "latitude": 54.58710259335,
          "longitude": 52.4326534704
        },
        {
          "latitude": 54.58725849337,
          "longitude": 52.4325418704
        },
        {
          "latitude": 54.58742919339,
          "longitude": 52.4324073704
        }
      ],
      [
        {
          "latitude": 54.58720829337,
          "longitude": 52.4329994704
        },
        {
          "latitude": 54.58710259335,
          "longitude": 52.4326534704
        }
      ],
      [
        {
          "latitude": 54.58710259335,
          "longitude": 52.4326534704
        },
        {
          "latitude": 54.58700769334,
          "longitude": 52.4323640704
        }
      ],
      [
        {
          "latitude": 54.58689899333,
          "longitude": 52.4327338704
        },
        {
          "latitude": 54.58710259335,
          "longitude": 52.4326534704
        }
      ],
      [
        {
          "latitude": 54.58742919339,
          "longitude": 52.4324073704
        },
        {
          "latitude": 54.58719659336,
          "longitude": 52.4324021704
        },
        {
          "latitude": 54.58700769334,
          "longitude": 52.4323640704
        }
      ],
      [
        {
          "latitude": 54.59080179377,
          "longitude": 52.4414647704
        },
        {
          "latitude": 54.59053679374,
          "longitude": 52.4408451704
        }
      ],
      [
        {
          "latitude": 54.59053679374,
          "longitude": 52.4408451704
        },
        {
          "latitude": 54.59030639372,
          "longitude": 52.4403175704
        }
      ],
      [
        {
          "latitude": 54.57317109178,
          "longitude": 52.4603956704
        },
        {
          "latitude": 54.57309949177,
          "longitude": 52.4615707704
        },
        {
          "latitude": 54.57306769177,
          "longitude": 52.4626091704
        },
        {
          "latitude": 54.57303619176,
          "longitude": 52.4641731704
        },
        {
          "latitude": 54.57290259175,
          "longitude": 52.4680534704
        },
        {
          "latitude": 54.57289819175,
          "longitude": 52.4712123704
        },
        {
          "latitude": 54.57288819175,
          "longitude": 52.4719212704
        },
        {
          "latitude": 54.57288399175,
          "longitude": 52.4722151704
        },
        {
          "latitude": 54.57287599175,
          "longitude": 52.4727816704
        },
        {
          "latitude": 54.57280969174,
          "longitude": 52.4745994704
        },
        {
          "latitude": 54.57279139174,
          "longitude": 52.4751026704
        },
        {
          "latitude": 54.57275789173,
          "longitude": 52.4775233704
        }
      ],
      [
        {
          "latitude": 54.57605469211,
          "longitude": 52.4023491704
        },
        {
          "latitude": 54.57654899216,
          "longitude": 52.4057651704
        }
      ],
      [
        {
          "latitude": 54.57725319224,
          "longitude": 52.4074289704
        },
        {
          "latitude": 54.57729139224,
          "longitude": 52.4072458704
        },
        {
          "latitude": 54.57729389225,
          "longitude": 52.4071521704
        },
        {
          "latitude": 54.57729019224,
          "longitude": 52.4070371704
        },
        {
          "latitude": 54.57726549224,
          "longitude": 52.4068095704
        },
        {
          "latitude": 54.57717359223,
          "longitude": 52.4061710704
        },
        {
          "latitude": 54.57695099221,
          "longitude": 52.4046656704
        }
      ],
      [
        {
          "latitude": 54.57726429224,
          "longitude": 52.4033811704
        },
        {
          "latitude": 54.57707549222,
          "longitude": 52.4033878704
        },
        {
          "latitude": 54.57696799221,
          "longitude": 52.4033287704
        },
        {
          "latitude": 54.5768544922,
          "longitude": 52.4031779704
        },
        {
          "latitude": 54.57666689217,
          "longitude": 52.4027732704
        }
      ],
      [
        {
          "latitude": 54.57695099221,
          "longitude": 52.4046656704
        },
        {
          "latitude": 54.57694389221,
          "longitude": 52.4043813704
        },
        {
          "latitude": 54.57696939221,
          "longitude": 52.4040503704
        },
        {
          "latitude": 54.57703349222,
          "longitude": 52.4038196704
        },
        {
          "latitude": 54.57709879222,
          "longitude": 52.4036336704
        },
        {
          "latitude": 54.57726429224,
          "longitude": 52.4033811704
        }
      ],
      [
        {
          "latitude": 54.57695099221,
          "longitude": 52.4046656704
        },
        {
          "latitude": 54.57666689217,
          "longitude": 52.4027732704
        }
      ],
      [
        {
          "latitude": 54.5760143921,
          "longitude": 52.4020675704
        },
        {
          "latitude": 54.57605469211,
          "longitude": 52.4023491704
        }
      ],
      [
        {
          "latitude": 54.57666689217,
          "longitude": 52.4027732704
        },
        {
          "latitude": 54.57661589217,
          "longitude": 52.4025157704
        },
        {
          "latitude": 54.57654139216,
          "longitude": 52.4021924704
        },
        {
          "latitude": 54.57645199215,
          "longitude": 52.4019065704
        },
        {
          "latitude": 54.57632899214,
          "longitude": 52.4016816704
        },
        {
          "latitude": 54.57621899212,
          "longitude": 52.4016256704
        },
        {
          "latitude": 54.57615829212,
          "longitude": 52.4016378704
        },
        {
          "latitude": 54.57610329211,
          "longitude": 52.4016945704
        },
        {
          "latitude": 54.5760377921,
          "longitude": 52.4018141704
        },
        {
          "latitude": 54.5760143921,
          "longitude": 52.4020675704
        }
      ],
      [
        {
          "latitude": 54.57580409208,
          "longitude": 52.4006244704
        },
        {
          "latitude": 54.5760143921,
          "longitude": 52.4020675704
        }
      ],
      [
        {
          "latitude": 54.57632899214,
          "longitude": 52.4016816704
        },
        {
          "latitude": 54.57612779211,
          "longitude": 52.4013914704
        },
        {
          "latitude": 54.5760243921,
          "longitude": 52.4012242704
        },
        {
          "latitude": 54.57596489209,
          "longitude": 52.4010912704
        },
        {
          "latitude": 54.57587159208,
          "longitude": 52.4008598704
        },
        {
          "latitude": 54.57580409208,
          "longitude": 52.4006244704
        }
      ],
      [
        {
          "latitude": 54.57659959217,
          "longitude": 52.4060664704
        },
        {
          "latitude": 54.57675169218,
          "longitude": 52.4070440704
        }
      ],
      [
        {
          "latitude": 54.57675169218,
          "longitude": 52.4070440704
        },
        {
          "latitude": 54.5768730922,
          "longitude": 52.4073139704
        },
        {
          "latitude": 54.57694469221,
          "longitude": 52.4074076704
        },
        {
          "latitude": 54.57701009221,
          "longitude": 52.4074693704
        },
        {
          "latitude": 54.57705699222,
          "longitude": 52.4074906704
        },
        {
          "latitude": 54.57712729223,
          "longitude": 52.4074991704
        },
        {
          "latitude": 54.57717539223,
          "longitude": 52.4074821704
        },
        {
          "latitude": 54.57725319224,
          "longitude": 52.4074289704
        }
      ],
      [
        {
          "latitude": 54.57654899216,
          "longitude": 52.4057651704
        },
        {
          "latitude": 54.57659959217,
          "longitude": 52.4060664704
        }
      ],
      [
        {
          "latitude": 54.57719339223,
          "longitude": 52.4091709704
        },
        {
          "latitude": 54.57710029222,
          "longitude": 52.4088377704
        }
      ],
      [
        {
          "latitude": 54.57675169218,
          "longitude": 52.4070440704
        },
        {
          "latitude": 54.5769214922,
          "longitude": 52.4081240704
        },
        {
          "latitude": 54.57695199221,
          "longitude": 52.4083048704
        },
        {
          "latitude": 54.57710029222,
          "longitude": 52.4088377704
        }
      ],
      [
        {
          "latitude": 54.57764009228,
          "longitude": 52.4104634704
        },
        {
          "latitude": 54.57741549226,
          "longitude": 52.4098820704
        },
        {
          "latitude": 54.57719339223,
          "longitude": 52.4091709704
        }
      ],
      [
        {
          "latitude": 54.57911839245,
          "longitude": 52.4139104704
        },
        {
          "latitude": 54.57764009228,
          "longitude": 52.4104634704
        }
      ],
      [
        {
          "latitude": 54.57635719214,
          "longitude": 52.4067403704
        },
        {
          "latitude": 54.57655719216,
          "longitude": 52.4068610704
        },
        {
          "latitude": 54.57675169218,
          "longitude": 52.4070440704
        }
      ],
      [
        {
          "latitude": 54.57659959217,
          "longitude": 52.4060664704
        },
        {
          "latitude": 54.57659429217,
          "longitude": 52.4063737704
        },
        {
          "latitude": 54.57654269216,
          "longitude": 52.4065641704
        },
        {
          "latitude": 54.57646929215,
          "longitude": 52.4066737704
        },
        {
          "latitude": 54.57635719214,
          "longitude": 52.4067403704
        }
      ],
      [
        {
          "latitude": 54.57710029222,
          "longitude": 52.4088377704
        },
        {
          "latitude": 54.57703679222,
          "longitude": 52.4084357704
        },
        {
          "latitude": 54.57702129221,
          "longitude": 52.4082587704
        },
        {
          "latitude": 54.57704769222,
          "longitude": 52.4080521704
        },
        {
          "latitude": 54.57708039222,
          "longitude": 52.4079019704
        },
        {
          "latitude": 54.57714409223,
          "longitude": 52.4077196704
        },
        {
          "latitude": 54.57720009223,
          "longitude": 52.4075774704
        },
        {
          "latitude": 54.57722339224,
          "longitude": 52.4075184704
        },
        {
          "latitude": 54.57725319224,
          "longitude": 52.4074289704
        }
      ],
      [
        {
          "latitude": 54.57503359199,
          "longitude": 52.4428457704
        },
        {
          "latitude": 54.57489019197,
          "longitude": 52.4431193704
        },
        {
          "latitude": 54.57456719194,
          "longitude": 52.4454340704
        },
        {
          "latitude": 54.57450209193,
          "longitude": 52.4460779704
        },
        {
          "latitude": 54.57431079191,
          "longitude": 52.4478356704
        },
        {
          "latitude": 54.57428839191,
          "longitude": 52.4480408704
        },
        {
          "latitude": 54.5742471919,
          "longitude": 52.4484027704
        },
        {
          "latitude": 54.57417199189,
          "longitude": 52.4492550704
        },
        {
          "latitude": 54.57412649189,
          "longitude": 52.4495263704
        },
        {
          "latitude": 54.57404149188,
          "longitude": 52.4502558704
        },
        {
          "latitude": 54.57397609187,
          "longitude": 52.4510678704
        },
        {
          "latitude": 54.57398489187,
          "longitude": 52.4517209704
        },
        {
          "latitude": 54.57400779187,
          "longitude": 52.4519786704
        },
        {
          "latitude": 54.57407299188,
          "longitude": 52.4530633704
        },
        {
          "latitude": 54.57415819189,
          "longitude": 52.4554367704
        },
        {
          "latitude": 54.57417169189,
          "longitude": 52.4561176704
        },
        {
          "latitude": 54.57416099189,
          "longitude": 52.4562983704
        },
        {
          "latitude": 54.57412149189,
          "longitude": 52.4564530704
        },
        {
          "latitude": 54.57401079187,
          "longitude": 52.4568317704
        },
        {
          "latitude": 54.57380689185,
          "longitude": 52.4572529704
        },
        {
          "latitude": 54.57359529183,
          "longitude": 52.4577232704
        },
        {
          "latitude": 54.57344369181,
          "longitude": 52.4580845704
        },
        {
          "latitude": 54.5733437918,
          "longitude": 52.4584772704
        },
        {
          "latitude": 54.57327239179,
          "longitude": 52.4589343704
        },
        {
          "latitude": 54.57325119179,
          "longitude": 52.4592330704
        },
        {
          "latitude": 54.57324019179,
          "longitude": 52.4595022704
        },
        {
          "latitude": 54.57317109178,
          "longitude": 52.4603956704
        }
      ],
      [
        {
          "latitude": 54.57404149188,
          "longitude": 52.4502558704
        },
        {
          "latitude": 54.5742348919,
          "longitude": 52.4502262704
        },
        {
          "latitude": 54.57447919193,
          "longitude": 52.4502528704
        },
        {
          "latitude": 54.57488759197,
          "longitude": 52.4503971704
        },
        {
          "latitude": 54.5760003921,
          "longitude": 52.4507478704
        },
        {
          "latitude": 54.57693999221,
          "longitude": 52.4510817704
        }
      ],
      [
        {
          "latitude": 54.57275789173,
          "longitude": 52.4775233704
        },
        {
          "latitude": 54.57268289172,
          "longitude": 52.4777997704
        },
        {
          "latitude": 54.5724849917,
          "longitude": 52.4782255704
        },
        {
          "latitude": 54.57218869167,
          "longitude": 52.4787337704
        },
        {
          "latitude": 54.57208389166,
          "longitude": 52.4788612704
        },
        {
          "latitude": 54.57198499164,
          "longitude": 52.4789444704
        },
        {
          "latitude": 54.57184559163,
          "longitude": 52.4789939704
        },
        {
          "latitude": 54.57170499161,
          "longitude": 52.4789769704
        },
        {
          "latitude": 54.57153359159,
          "longitude": 52.4788696704
        },
        {
          "latitude": 54.57102119154,
          "longitude": 52.4785029704
        },
        {
          "latitude": 54.57049879148,
          "longitude": 52.4781667704
        },
        {
          "latitude": 54.57018479144,
          "longitude": 52.4778879704
        },
        {
          "latitude": 54.56990239141,
          "longitude": 52.4775205704
        },
        {
          "latitude": 54.56818049121,
          "longitude": 52.4748190704
        },
        {
          "latitude": 54.5680332912,
          "longitude": 52.4746796704
        },
        {
          "latitude": 54.56782609117,
          "longitude": 52.4746100704
        },
        {
          "latitude": 54.56751379114,
          "longitude": 52.4746450704
        },
        {
          "latitude": 54.56686409107,
          "longitude": 52.4749731704
        }
      ]
    ];
    
    

    return (
        <View style={styles.container}>
            <MapView style={styles.map} initialRegion={region}>
                {roads.map((road, index) => (
                    <Polyline
                        key={index}
                        coordinates={road}
                        strokeColor="red" // Цвет дорог
                        strokeWidth={4}    // Ширина линий дорог
                    />
                ))}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default LeninogorskMap;
