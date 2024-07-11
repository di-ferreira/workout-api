interface iUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

interface iSeries {
  id: number;
}

interface iTraining {
  id: number;
  training: string;
  series: iSeries[];
}

// {
//     "user" = {
//         "trainings": [
//             {
//                 "id": 1,
//                 "training": "Treino 1",
//                 "exercises": [{
//                     "id": 1,
//                     "exercise(id)": 1,
//                     "series": [{
//                         "maximum_repetitions": 15,
//                         "minimum_repetitions": 8,
//                         "speed:": 1 / 1,
//                         "rest": '40s',
//                         "technics": "concentric fail",
//                         "serie_count": [
//                             {
//                                 "weight": 0,
//                                 "repetitions": 0
//                             },
//                             {
//                                 "weight": 0,
//                                 "repetitions": 0
//                             },
//                             {
//                                 "weight": 0,
//                                 "repetitions": 0
//                             }
//                         ]
//                     }]
//                 }],
//             }
//         ]
//     }
// }
